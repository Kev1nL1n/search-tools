const sqlUtils = require("../../utils/sql-utils");

/**
 * 插入链接数据
 * @param link {Object}
 * @return {Promise}
 */
async function insert(link) {
    await global.sqlite.run(sqlUtils.parseParams2Insert("t_result", link));
    let result = await global.sqlite.getSeq("t_result");
    if (result.length === 1) {
        return result[0].seq;
    } else {
        return 0;
    }
}

/**
 * 查询所有数据
 * @return {Promise}
 */
async function page({params, page, pageSize}) {
    return await global.sqlite.query(`
    select result.*,
       sum(case when link.result_id is not null then 1 else 0 end)                     as total_link_count,
       sum(case when link.result_id is not null and link.status = 0 then 1 else 0 end) as wait_link_count,
       sum(case when link.result_id is not null and link.status = 2 then 1 else 0 end) as fail_link_count,
       sum(case when link.result_id is not null and link.status = 9 then 1 else 0 end) as finish_link_count
    from t_result result
             left join
         t_link link on link.result_id = result.id
    ${sqlUtils.parseParams2Condition("result", params)}
    group by result.id order by result.id desc limit ?,?;
    `, [(page - 1) * pageSize, pageSize]);
}

/**
 * 查询所有数据
 * @return {Promise}
 */
async function list({params}) {
    return await global.sqlite.query(`
    select result.*,
       sum(case when link.result_id is not null then 1 else 0 end)                     as total_link_count,
       sum(case when link.result_id is not null and link.status = 0 then 1 else 0 end) as wait_link_count,
       sum(case when link.result_id is not null and link.status = 2 then 1 else 0 end) as fail_link_count,
       sum(case when link.result_id is not null and link.status = 9 then 1 else 0 end) as finish_link_count
    from t_result result
             left join
         t_link link on link.result_id = result.id
    ${sqlUtils.parseParams2Condition("result", params)}
    group by result.id order by result.id desc;
    `, []);
}

/**
 * 统计所有条数
 * @return {Promise}
 */
async function count({params}) {
    let result = await global.sqlite.one(`select count(1) as total from t_result result ${sqlUtils.parseParams2Condition("result", params)}`, []);
    return result.total;
}

/**
 * 更新一条记录的状态
 * @param id {Number}
 * @param status {Number}
 * @return {Promise<void>}
 */
async function updateStatus(id, status) {
    await global.sqlite.run("update t_result set status = ? where id = ?", [status, id]);
}

/**
 * 删除记录
 * @param id {Number}
 * @return {Promise<void>}
 */
async function remove(id) {
    await global.sqlite.run("delete from t_result where id = ?", [id]);
}

/**
 * 获取等待检索
 * @return {Promise}
 */
async function getWait() {
    return await global.sqlite.one(`select * from t_result where status < 2`, []);
}

module.exports = {
    insert,
    page,
    list,
    count,
    remove,
    updateStatus,
    getWait
}
