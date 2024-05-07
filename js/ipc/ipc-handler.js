const typeHandleMap = {};

/**
 * 注册类型处理
 * @param type {String}
 * @param handle {Function}
 */
function regHandleByType(type, handle) {
    typeHandleMap[type] = handle;
}

/**
 * 获取处理
 * @param type {String}
 * @return {Function}
 */
function getHandleByType(type) {
    return typeHandleMap[type];
}

module.exports = {
    regHandleByType,
    getHandleByType
}
