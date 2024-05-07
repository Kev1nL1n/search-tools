const StringUtils = require("./string-utils");

/**
 * 转换参数为where条件
 * @param alias 表别名
 * @param params 参数
 * @return {string}
 */
function parseParams2Condition(alias, params) {
    if (!params) {
        return "";
    }
    const conditions = [];
    for (let key of Object.keys(params)) {
        let value = params[key];
        if (StringUtils.isBlank(value)) {
            continue;
        }
        if (typeof value === "string") {
            conditions.push(`${alias}.${key} = '${value}'`);
        } else {
            conditions.push(`${alias}.${key} = ${value}`);
        }
    }
    if (conditions.length > 0) {
        return "where " + conditions.join(" and ");
    }
    return "";
}

/**
 * 转换参数为插入语句
 * @param table
 * @param params
 * @return {string}
 */
function parseParams2Insert(table, params) {
    if (!params) {
        return "";
    }
    const fields = [], values = [];
    for (const key of Object.keys(params)) {
        fields.push(key);
        const value = params[key];
        if (typeof value === "string") {
            values.push(`'${value}'`);
        } else if (value === null) {
            values.push("null");
        } else {
            values.push(value);
        }
    }
    return `insert into ${table} (${fields.join(",")}) VALUES (${values.join(",")})`;
}

module.exports = {
    parseParams2Condition,
    parseParams2Insert
}
