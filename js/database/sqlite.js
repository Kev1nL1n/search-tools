const sqlite3 = require('sqlite3').verbose();

class Sqlite {
    /**
     * 数据库文件
     * @param file {String} 数据库文件
     */
    constructor(file) {
        this.file = file;
        /**
         *
         * @type {sqlite3.Database}
         */
        this.db = null;
    }

    /**
     * 是否打开连接
     * @return {boolean}
     */
    isOpen() {
        return !!(this.db);
    }

    /**
     * 查询表自增ID
     * @param tableName
     * @return {Promise}
     */
    async getSeq(tableName) {
        return this.query("select seq from sqlite_sequence where name='" + tableName + "'");
    }

    /**
     * 打开数据库连接
     * @return {Promise}
     */
    async open() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.file, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                    console.log('Connected to the in-memory Sqlite database.');
                }
            });
        });
    }

    /**
     * 数据库查询
     * @param sql {String}
     * @param params {Array}
     * @return {Promise}
     */
    async query(sql, params) {
        if (!this.isOpen()) {
            return null;
        }
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        })
    }

    /**
     * 数据库执行
     * @param sql {String}
     * @return {Promise}
     */
    async run(sql) {
        if (!this.isOpen()) {
            return null;
        }
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        })
    }

    /**
     * 数据库执行
     * @param sql {String}
     * @param params {Array}
     * @return {Promise}
     */
    async run(sql, params) {
        if (!this.isOpen()) {
            return null;
        }
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(sql);
            stmt.run(params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
                stmt.finalize();
            });
        })
    }

    /**
     * 查询单个数据
     * @param sql {String}
     * @param params {Array}
     * @return {Promise}
     */
    async one(sql, params) {
        let result = await global.sqlite.query(sql, params);
        if (result.length > 0) {
            return new Promise(resolve => {
                resolve(result[0]);
            })
        } else {
            return new Promise(resolve => {
                resolve(null);
            })
        }
    }

    /**
     * 关闭数据库连接
     * @return {Promise}
     */
    async close() {
        if (!this.isOpen()) {
            return null;
        }
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                    this.db = null;
                    console.log('Close the database connection.');
                }
            });
        });
    }
}

module.exports = Sqlite;
