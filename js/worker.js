const axios = require('axios');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const {URL} = require('url');
const {parentPort} = require('worker_threads');
const StringUtils = require("./utils/string-utils");
const FileUtils = require("./utils/file-utils");
const {FILE} = require("./constants/link-data-type");
const {WAIT, SEARCHING, ERROR, DONE} = require('./constants/link-status');
const resultService = require('./database/service/result');
const linkService = require('./database/service/link');
const linkDataService = require('./database/service/link-data');
const Sqlite = require('./database/sqlite');
global.sqlite = new Sqlite(path.join(process.cwd(), "database.db"));

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#?&//=]+/;
let browser = null;
let worker = null;

//初始化一级主机解析库
const PublicSuffixList = require('publicsuffixlist');
//创建顶级域名解析实例
const psl = new PublicSuffixList({});
psl.initializeSync();

parentPort.on('message', async (config) => {
    if (!worker) {
        worker = new ResultWorker(config);
        await worker.doSearchResult(config);
        worker = null;
    }
    parentPort.postMessage({});
});

async function delay(ms) {
    if (ms < 500) {
        ms = 500
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 是否已启动浏览器
 * @return {boolean}
 */
function isBrowserLaunch() {
    return !!(browser);
}

/**
 * 检查是否为下载链接
 * @param url
 * @param downloadSuffixes
 * @param downloadContentTypes
 * @param timeout 超时时间
 * @return {Promise<boolean>}
 */
async function isDownloadURL(url, {downloadSuffixes, downloadContentTypes, timeout}) {
    let url1 = new URL(url);
    let pathname = url1.pathname;
    // 是否为文件后缀
    if (downloadSuffixes.includes(pathname.substring(pathname.lastIndexOf(".")))) {
        return true;
    }
    // 发送HEAD请求检查内容类型
    const response = await axios.head(url, {timeout});
    const contentType = response.headers['content-type'];
    const contentDisposition = response.headers['content-disposition'];
    // Content-Disposition指示下载
    return contentType && downloadContentTypes.includes(contentType) ||
        contentDisposition && contentDisposition.includes('attachment');
}

/**
 * 处理文件链接
 * @param id
 * @param result_id
 * @param url
 * @return {Promise<{linkList: Set<any>, dataList: Set<{linkId: *, type: *, content: *}>}>}
 */
async function handleFile({id, result_id, content: url}) {
    let url1 = new URL(url);
    let hostname = url1.hostname.replace(/\./g, "_");
    const response = await axios.get(url, {
        responseType: 'stream'
    });
    let fileName = path.basename(url1.pathname);
    let fileDir = path.join(process.cwd(), `downloads/${hostname}`);
    // 创建目录
    FileUtils.mkdir(fileDir);
    // 创建文件写入流
    const file = fs.createWriteStream(path.join(fileDir, fileName));
    response.data.pipe(file); // 将数据流管道到文件
    await new Promise(resolve => {
        file.on('finish', resolve);
    });
    return {linkList: new Set(), dataList: new Set([createLinkData(result_id, id, FILE, file.path)])};
}

/**
 * 查询链接数据
 * @param data {Object}
 * @param search {Object}
 * @return {any}
 */
async function resolveLinkData(data, search) {
    const {content: url} = data;
    const isFileUrl = await isDownloadURL(url, search);
    if (isFileUrl) {
        return handleFile(data);
    } else {
        return handlePage(data, search);
    }
}

/**
 * 处理页面链接
 * @param id
 * @param url
 * @param result_id
 * @param rules
 * @param ignoreHrefs
 * @param noDeepDomains
 * @return {Promise<unknown>}
 */
async function handlePage({id, content: url, result_id}, {rules, ignoreHrefs, noDeepDomains, timeout}) {
    //没有启动无头浏览器则启动
    if (!isBrowserLaunch()) {
        browser = await puppeteer.launch();
    }
    //防止报错，打开新的页面
    const page = await browser.newPage();
    // 导航到目标网页
    page.goto(url, {timeout}).catch(err => {
        console.error(err);
    });

    await onPageLoad(page);
    // console.log('页面加载完成');
    // 获取渲染后的HTML内容
    const content = await page.content().catch(err => {
        console.error(err);
    });
    if (StringUtils.isBlank(content)) {
        return new Promise(((resolve, reject) => {
            reject(new Error("HTML内容为空"));
        }))
    }
    // 使用cheerio或其他库解析HTML
    const $ = cheerio.load(content);
    // 提取到的数据集合
    const dataListOfLink = [];
    /*console.log('Title:', title);
    console.log('Links:', linkList);*/
    let text = $("body").text().replace(/\n/g, "");
    // 数据规则查询
    for (let rule of rules) {
        const {type, regexp, flag} = rule;
        const pattern = new RegExp(regexp, flag);
        // 规则匹配
        let matches = text.match(pattern);
        if (matches) {
            matches.forEach(m =>
                dataListOfLink.push(createLinkData(result_id, id, type, m)));
        }
    }
    const links = [], allowLinks = [];
    let url1 = new URL(url);
    if (!noDeepDomains.find(d => url1.hostname.endsWith(d))) {
        $('a').each((index, element) => {
            let href = $(element).attr('href');
            if (StringUtils.isNotBlank(href) && !ignoreHrefs.includes(href)) {
                links.push(href);
            }
        });
    }

    // 在页面上下文中执行 JavaScript 代码来获取 host
    const pageLocation = await page.evaluate(() => {
        return window.location;
    });
    for (let link of links) {
        if (link === pageLocation.href) {
            continue;
        }
        if (link.startsWith(".")) {
            link = link.substr(1, link.length);
        }
        if (!urlRegex.test(link)) {
            const {protocol, hostname} = pageLocation;
            link = `${protocol}//${hostname}${link.startsWith("\/") ? '' : '/'}${link}`;
            allowLinks.push(createLinkWithResult(link, result_id));
        } else if (areDomainsSameLevel(url, link)) {
            allowLinks.push(createLinkWithResult(link, result_id));
        }
    }
    await page.close();
    return {
        linkList: new Set(allowLinks),
        dataList: new Set(dataListOfLink)
    }
}

async function onPageLoad(page) {
    return new Promise((resolve => {
        page.on('load', () => {
            resolve();
        })
    }))
}

/**
 * 创建链接数据
 * @param resultId
 * @param linkId
 * @param type
 * @param content
 * @return {{linkId: *, type: *, content: *}}
 */
function createLinkData(resultId, linkId, type, content) {
    return {
        resultId,
        linkId,
        type,
        content
    }
}

/**
 * 创建链接数据
 * @param link
 * @param resultId
 * @return {{resultId: *, content: *}}
 */
function createLinkWithResult(link, resultId) {
    return {
        resultId: resultId,
        content: link
    }
}

/**
 * 解析URL主机
 * @param urlString
 * @return {string}
 */
function parseDomain(urlString) {
    const parsedUrl = new URL(urlString);
    const hostname = parsedUrl.hostname;
    return psl.domain(hostname);
}

/**
 * 是否为相同主机
 * @param url1
 * @param url2
 * @return {boolean}
 */
function areDomainsSameLevel(url1, url2) {
    const domain1 = parseDomain(url1);
    const domain2 = parseDomain(url2);
    return domain1 === domain2;
}

class ResultWorker {
    /**
     * 配置参数
     */
    config

    constructor(config) {
        this.config = config;
    }

    async doSearchResult() {
        const {search} = this.config;
        try {
            if (!global.sqlite.isOpen()) {
                await global.sqlite.open();
            }
            //获取等待检索的结果
            let result = null;
            while ((result = await resultService.getWait())) {
                //如果为等待检索
                if (result.status === WAIT) {
                    await resultService.updateStatus(result.id, SEARCHING);
                }
                //获取等待检索的链接
                let link = null;
                //有就继续检索
                while ((link = await linkService.getWait(result.id))) {
                    await this.doSearchLink(link);
                    //等待
                    await delay(search.interval);
                }
                //设置状态为检索完成
                await resultService.updateStatus(result.id, DONE);
            }
        } finally {
            await global.sqlite.close();
        }
    }

    async doSearchLink(link) {
        if (link.status === WAIT) {
            //更新为搜索中
            await linkService.updateStatus(link.id, SEARCHING);
        }
        try {
            const linkData = await resolveLinkData(link, this.config.search);
            if (linkData) {
                try {
                    //开始事务
                    await global.sqlite.run('BEGIN TRANSACTION;');
                    //已删除则不再添加
                    if (!await linkService.isExist(link.id)) {
                        return;
                    }
                    for (const cLink of linkData.linkList) {
                        let result = await linkService.countSame(cLink);
                        if (result.count > 0) {
                            continue;
                        }
                        await linkService.insert(cLink);
                    }
                    for (const lData of linkData.dataList) {
                        await linkDataService.insert(lData, this.config);
                    }
                    //更新为已完成
                    await linkService.updateStatus(link.id, DONE);
                } finally {
                    //提交事务
                    await global.sqlite.run('COMMIT;');
                }
            }
        } catch (e) {
            //更新为错误
            await linkService.updateStatus(link.id, ERROR);
        }
    }
}
