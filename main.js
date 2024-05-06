//数据库封装对象
const StringUtils = require("./js/utils/string-utils");
const express = require('express');
const os = require('os');
//获取机器码
const {machineIdSync} = require('node-machine-id');
const axios = require('axios');
const Sqlite = require('./js/database/sqlite');
//IPC处理器封装对象
const {getHandleByType, regHandleByType} = require('./js/ipc/ipc-handler');
//electron
const {app, ipcMain, BrowserWindow, dialog} = require('electron');
//path
const path = require('path');
const fs = require('fs');
//部分iframe请求头
const HEADERS_TO_STRIP_LOWERCASE = [
    'content-security-policy',
    'x-frame-options',
];
const dbPath = path.join(process.cwd(), "database.db");
//是否需要初始化
const isNeedInitDB = !fs.existsSync(dbPath)
//sqlite数据库实例
global.sqlite = new Sqlite(dbPath);
//工作线程
const {Worker} = require('worker_threads');
const XLSX = require('xlsx');
//数据库实体封装
const resultService = require("./js/database/service/result");
const linkService = require("./js/database/service/link");
const linkDataService = require("./js/database/service/link-data");
const dataType = require("./js/constants/link-data-type");
//状态常量
const {SKIP} = require('./js/constants/link-status');
//创建工作线程
const worker = new Worker(path.join(__dirname, './js/worker.js'));
const copyPaste = require('copy-paste');
const {exec} = require('child_process');
let server = null;
//配置文件
let config = JSON.parse(fs.readFileSync(path.join(process.cwd(), "config.json"), {encoding: "utf-8"}));
let isUpdateConfig = false;
//是否有加密密钥，没有则生成一个
if (StringUtils.isBlank(config.secretKey)) {
    const {randomBytes} = require("./js/utils/aes-utils");
    let secretKey = randomBytes(32);
    config.secretKey = secretKey.toJSON().data.join(",");
    isUpdateConfig = true;
}
//是否有初始化向量，没有则生成一个
if (StringUtils.isBlank(config.iv)) {
    const {randomBytes} = require("./js/utils/aes-utils");
    let iv = randomBytes(16);
    config.iv = iv.toJSON().data.join(",");
    isUpdateConfig = true;
}
//是否需要更新密钥
if (isUpdateConfig) {
    updateConfig(config);
}

const {host, allowCodes} = config;

async function exportExcel2File(list = [], filePath) {
// 创建一个新的工作簿，并将工作表添加到工作簿中
    const wb = XLSX.utils.book_new();
    for (let key of Object.keys(dataType)) {
        const type = dataType[key];
        // 将JSON数据转换为工作表对象
        const ws = XLSX.utils.json_to_sheet(list.filter(item => item.type === type).map(item => {
            return {
                id: item.id,
                content: item.content,
                link: item.link
            }
        }));
        ws['A1'] = {t: 's', v: '编号'};
        ws['B1'] = {t: 's', v: '数据'};
        ws['C1'] = {t: 's', v: '来源'};
        XLSX.utils.book_append_sheet(wb, ws, key);
    }
    // 将工作簿写入文件
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'buffer'});

    return new Promise((resolve, reject) => {
        // 将缓冲区数据写入文件
        fs.writeFile(filePath, excelBuffer, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(filePath);
            }
        });
    })
}

function getFileSavePath() {
    return dialog.showSaveDialog({
        title: '选择保存位置',
        defaultPath: `数据导出${new Date().getTime()}.xlsx`, // 默认文件名
        filters: [
            {name: 'Excel Files', extensions: ['xlsx']}, // 可选的文件类型
            {name: 'All Files', extensions: ['*']}
        ]
    });
}

function createServer() {
    // 设置并启动 HTTP 服务器
    const appPort = 3000; // 选择一个端口号
    const expressApp = express(); // 创建 Express 应用实例
    // 设置静态资源目录（可选）
    expressApp.use(express.static(path.join(process.cwd(), 'ui')));
    // 兼容Vue-router的History模式
    expressApp.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), 'ui', 'index.html')); // 假设你的构建输出在 'dist' 文件夹中
    });
    server = expressApp.listen(appPort, () => {
        console.log(`Server is running on port ${appPort}`);
    });
}

/**
 * 创建窗口
 */
function createWindow(url) {
    const win = new BrowserWindow({
        icon: path.join(__dirname, "images/favicon.ico"),
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, './js/preload.js'),
            webSecurity: false, // 禁用同源策略
            allowRunningInsecureContent: true, // 允许运行不安全的内容
            contextIsolation: false, // 禁用上下文隔离，以便主页面和iframe可以共享相同的Node.js环境
            nodeIntegration: true, // 启用Node集成，以便在iframe中可以使用Node.js功能
        },
        autoHideMenuBar: true // 隐藏菜单栏
    })
    //窗口最大化
    win.maximize();
    //加载页面
    //win.loadFile('index.html');
    win.loadURL(url);
    //打开开发者工具
    win.webContents.openDevTools({mode: 'bottom'});
    // 获取当前窗口的 webContents
    const webContents = win.webContents;
    // 获取对应的 session
    const sessionInstance = webContents.session;
    // 拦截所有网页请求
    sessionInstance.webRequest.onHeadersReceived({
        urls: ['*://*/*']
    }, (details, callback) => {
        // 修改请求头
        Object.keys(details.responseHeaders).forEach(key => {
            if (HEADERS_TO_STRIP_LOWERCASE.includes(key.toLowerCase())) {
                delete details.responseHeaders[key];
            }
        })
        // 必须调用 callback 来继续请求
        callback({responseHeaders: details.responseHeaders});
    });
}

async function checkAuth() {
    let id = machineIdSync(true);
    let result = true;
    try {
        let response = await axios.get(allowCodes);
        if (response.status === 200) {
            const list = response.data;
            let item = list.find(item => item.code === id);
            if (!item) {
                copyPaste.copy(id);
                await dialog.showMessageBox({
                    type: 'info',
                    title: '未授权提示',
                    message: `ID已复制，请注册当前ID后重试：${id}`,
                    buttons: ['确定']
                });
                result = false;
            }
        } else {
            await dialog.showMessageBox({
                type: 'info',
                title: '未授权提示',
                message: '当前授权服务不可用，请稍候重试',
                buttons: ['确定']
            });
            result = false;
        }
    } catch (e) {
        await dialog.showMessageBox({
            type: 'info',
            title: '未授权提示',
            message: '当前授权服务不可用，请稍候重试',
            buttons: ['确定']
        });
        result = false;
    }
    return result;
}

function openBrowser(url) {
    let openCmd;

    switch (os.platform()) {
        case 'darwin': // macOS
            openCmd = `open "${url}"`;
            break;
        case 'win32': // Windows
            openCmd = `start "" "${url}"`;
            break;
        default: // 假设其他平台（如Linux）使用xdg-open
            openCmd = `xdg-open "${url}"`;
    }

    exec(openCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行错误: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

//关闭网站隔离
app.commandLine.appendSwitch("disable-site-isolation-trials");

app.whenReady().then(async () => {
    let authPass = await checkAuth();
    if (!authPass) {
        await app.quit();
        return;
    }
    await global.sqlite.open();
    if (isNeedInitDB) {
        const initSql = fs.readFileSync(path.join(process.cwd(), "init.sql"), {encoding: "utf-8"});
        // 将文件内容分割成多个SQL语句
        const sqlStatements = initSql.split(';');
        // 逐个执行SQL语句
        for (let sql of sqlStatements) {
            if (sql.trim() === '') {
                continue;
            }
            await global.sqlite.run(sql);
        }
    }
    createServer();
    // 发送消息给工作线程
    worker.postMessage(config);
    initIpcHandle();
    //监听IPC通信
    ipcMain.handle('invoke', handleIpcInvoke)
    createWindow(host);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(host);
        }
    })
})

app.on('window-all-closed', async () => {
    await global.sqlite.close();
    if (process.platform !== 'darwin') {
        server.close(() => {
            console.log('Express server closed');
            app.quit(); // 确保在服务器关闭后退出应用
        });

        setTimeout(() => {
            console.error('Could not close server, forcing app to quit');
            app.quit();
        }, 5000); // 如果服务器在5秒内没有关闭，则强制退出应用
    }
})

/**
 * 处理IPC通信
 * @param event {IpcMainInvokeEvent}
 * @param data {Object}
 */
async function handleIpcInvoke(event, data) {
    const {type, content} = data;
    try {
        let handleFn = getHandleByType(type);
        if (handleFn) {
            return handleFn(content);
        }
    } catch (e) {
        return {
            type: "message",
            content: {
                type: "error",
                content: `调用IPC失败：${e.message}`
            }
        }
    }
}

function updateConfig(data) {
    config = data;
    return fs.writeFileSync(path.join(process.cwd(), "config.json"), JSON.stringify(data), {encoding: "utf-8"});
}

/**
 * 初始化IPC通信处理器
 */
function initIpcHandle() {
    regHandleByType("openBrowser", openBrowser);

    regHandleByType("getReadme", async () => {
        return fs.readFileSync(path.join(process.cwd(), "README",), {encoding: "utf-8"});
    })

    regHandleByType("getConfig", async () => {
        return config;
    })

    regHandleByType("restartTask", async () => {
        // 发送消息给工作线程
        worker.postMessage(config);
    })

    regHandleByType("saveConfig", updateConfig)

    regHandleByType("getFilePath", async () => {
        return getFileSavePath();
    })

    regHandleByType("openWindow", async (data) => {
        createWindow(host + "browser/index?url=" + encodeURIComponent(data.url));
    })

    regHandleByType("openContent", async (data) => {
        const {type, content} = data;
        const {PHONE, TEL, EMAIL, FILE} = dataType;
        return new Promise(resolve => {
            switch (type) {
                case PHONE:
                case TEL:
                case EMAIL:
                    copyPaste.copy(content, function (err) {
                        if (err) {
                            resolve({
                                type: "message",
                                content: {
                                    type: "error",
                                    content: "复制到剪切板失败"
                                }
                            });
                        } else {
                            resolve({
                                type: "message",
                                content: {
                                    type: "success",
                                    content: "已复制到剪切板"
                                }
                            });
                        }
                    });
                    break;
                case FILE:
                    if (process.platform === 'win32') {
                        exec(`start ${content}`) // Windows 命令
                    } else if (process.platform === 'darwin') {
                        exec(`open ${content}`) // macOS 命令
                    } else {
                        exec(`xdg-open ${content}`) // Linux 命令
                    }
                    resolve({
                        type: "message",
                        content: {
                            type: "success",
                            content: "文件已打开"
                        }
                    });
                    break;
                default:
                    resolve({
                        type: "message",
                        content: {
                            type: "error",
                            content: "不支持当前数据类型"
                        }
                    });
                    break;
            }
        })
    });

    regHandleByType("listResultData", async (params) => {
        return {
            data: await linkDataService.page(params, config),
            total: await linkDataService.count(params)
        }
    });

    regHandleByType("listResultLink", async (params) => {
        return {
            data: await linkService.page(params),
            total: await linkService.count(params)
        }
    });

    regHandleByType("listResult", async (params) => {
        return {
            data: await resultService.page(params),
            total: await resultService.count(params)
        }
    });

    regHandleByType("exportResult", async (params) => {
        let data = await linkDataService.list(params, config);
        return exportExcel2File(data, params);
    });

    regHandleByType("skipResult", async (params) => {
        try {
            //开始事务
            await global.sqlite.run('BEGIN TRANSACTION;');
            //更新状态为跳过
            await resultService.updateStatus(params, SKIP);
            //更新状态为跳过
            await linkService.updateStatusByResultId(params, SKIP);
        } finally {
            //提交事务
            await global.sqlite.run('COMMIT;');
        }
    });

    regHandleByType("removeResult", async (params) => {
        try {
            //开始事务
            await global.sqlite.run('BEGIN TRANSACTION;');
            //删除结果
            await resultService.remove(params);
            //删除链接
            await linkService.removeByResultId(params);
            //删除链接数据
            await linkDataService.removeByResultId(params);
        } finally {
            //提交事务
            await global.sqlite.run('COMMIT;');
        }
    });

    regHandleByType("saveResult", async (result) => {
        try {
            //开始事务
            await global.sqlite.run('BEGIN TRANSACTION;');
            //插入搜索结果
            const resultId = await resultService.insert(result);
            //插入结果链接
            await linkService.insert({
                resultId,
                content: result.href
            });
            // 发送消息给工作线程
            worker.postMessage(config);
            return {
                type: "message",
                content: {
                    type: "success",
                    content: "添加检索结果成功"
                }
            };
        } finally {
            //提交事务
            await global.sqlite.run('COMMIT;');
        }
    });

    regHandleByType("saveResultBatch", async (results) => {
        try {
            //开始事务
            await global.sqlite.run('BEGIN TRANSACTION;');
            //批量添加
            for (let result of results) {
                //插入搜索结果
                const resultId = await resultService.insert(result);
                //插入结果链接
                await linkService.insert({
                    resultId,
                    content: result.href
                });
            }
            // 发送消息给工作线程
            worker.postMessage(config);
            return {
                type: "message",
                content: {
                    type: "success",
                    content: "添加检索结果成功"
                }
            };
        } finally {
            //提交事务
            await global.sqlite.run('COMMIT;');
        }
    });
}
