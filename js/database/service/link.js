const {ERROR} = require('../../constants/link-status');
const sqlUtils = require("../../utils/sql-utils");

/**
 * 插入链接数据
 * @param link {Object}
 * @return {Promise}
 */
async function insert(link) {
    await global.sqlite.run("insert into t_link (id, result_id, content, status) VALUES (null, ?, ?, 0)", Object.values(link));
}

/**
 * 查询所有数据
 * @return {Promise}
 */
async function page({params, page, pageSize}) {
    return await global.sqlite.query(`select * from t_link link ${sqlUtils.parseParams2Condition("link", params)} order by id desc limit ?,?`, [(page - 1) * pageSize, pageSize]);
}

/**
 * 统计所有条数
 * @return {Promise}
 */
async function count({params}) {
    let result = await global.sqlite.one(`select count(1) as total from t_link link ${sqlUtils.parseParams2Condition("link", params)}`, []);
    return result.total;
}

/**
 * 统计是否有相同result和content的记录
 * @return {Promise}
 */
async function countSame(link) {
    return await global.sqlite.one("select count(1) as count from t_link where result_id = ? and content = ?", Object.values(link));
}

/**
 * 查询一条状态为等待处理的数据
 * @return {Promise}
 */
async function getWait(resultId) {
    return await global.sqlite.one("select * from t_link where result_id = ? and status < ? order by id asc limit 1", [resultId, ERROR]);
}

/**
 * 是否存在
 * @return {Promise}
 */
async function isExist(id) {
    return await count({params: {id}}) > 0;
}

/**
 * 更新一条记录的状态
 * @param id {Number}
 * @param status {Number}
 * @return {Promise<void>}
 */
async function updateStatus(id, status) {
    await global.sqlite.run("update t_link set status = ? where id = ?", [status, id]);
}

/**
 * 更新状态
 * @param resultId {Number}
 * @param status {Number}
 * @return {Promise<void>}
 */
async function updateStatusByResultId(resultId, status) {
    await global.sqlite.run("update t_link set status = ? where result_id = ? and status < 2", [status, resultId]);
}

/**
 * 删除记录
 * @param resultId {Number}
 * @return {Promise<void>}
 */
async function removeByResultId(resultId) {
    await global.sqlite.run("delete from t_link where result_id = ?", [resultId]);
}

module.exports = {
    insert,
    page,
    count,
    getWait,
    updateStatus,
    updateStatusByResultId,
    removeByResultId,
    countSame,
    isExist
}
