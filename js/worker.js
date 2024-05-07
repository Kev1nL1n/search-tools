const {parentPort} = require('worker_threads');
const {WAIT, SEARCHING, ERROR, DONE} = require('./constants/link-status');
const resultService = require('./database/service/result');
const linkService = require('./database/service/link');
const linkDataService = require('./database/service/link-data');
const crawler = require('./crawler');
//数据库封装对象
const Sqlite = require('./database/sqlite');
//path
const path = require('path');
//sqlite数据库实例
global.sqlite = new Sqlite(path.join(process.cwd(), "database.db"));

let worker = null;

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
            const linkData = await crawler.resolveLinkData(link, this.config.search);
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
