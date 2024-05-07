const sqlUtils = require("../../utils/sql-utils");
//AES加密工具
const {encryptWithKey, decryptWithKey} = require("../../utils/aes-utils");

/**
 * 插入链接数据
 * @param linkData
 * @param secretKey
 * @param iv
 * @return {Promise}
 */
async function insert(linkData, {secretKey, iv}) {
    //字段加密
    linkData.content = encryptWithKey(linkData.content, secretKey, iv);
    await global.sqlite.run("insert into t_link_data (id, result_id, link_id, type, content) VALUES (null, ?, ?, ?, ?)", Object.values(linkData));
}

/**
 * 查询所有数据
 * @return {Promise}
 */
async function page({params, page, pageSize}, {secretKey, iv}) {
    const list = await global.sqlite.query(`select data.*, link.content as link from t_link_data data LEFT JOIN t_link link on link.id = data.link_id ${sqlUtils.parseParams2Condition("data", params)} group by data.content order by id desc limit ?,?`, [(page - 1) * pageSize, pageSize]);
    for (let item of list) {
        item.content = decryptWithKey(item.content, secretKey, iv);
    }
    return list;
}

/**
 * 查询所有数据
 * @return {Promise}
 */
async function list({params}, {secretKey, iv}) {
    const list = await global.sqlite.query(`select data.*, link.content as link from t_link_data data LEFT JOIN t_link link on link.id = data.link_id ${sqlUtils.parseParams2Condition("data", params)} group by data.content order by data.id desc`, []);
    for (let item of list) {
        item.content = decryptWithKey(item.content, secretKey, iv);
    }
    return list;
}

/**
 * 统计所有条数
 * @return {Promise}
 */
async function count({params}) {
    let result = await global.sqlite.one(`select count(1) as total from (select * from t_link_data data ${sqlUtils.parseParams2Condition("data", params)} group by data.content)`, []);
    return result.total;
}

/**
 * 删除记录
 * @param resultId {Number}
 * @return {Promise<void>}
 */
async function removeByResultId(resultId) {
    await global.sqlite.run("delete from t_link_data where result_id = ?", [resultId]);
}

module.exports = {
    insert,
    count,
    page,
    list,
    removeByResultId
}
