const StringUtils = require("./string-utils");

module.exports = {
    /**
     * 是否可迭代
     * @param obj {Object}
     * @return {boolean}
     */
    isIterable(obj) {
        return typeof obj[Symbol.iterator] === 'function';
    },
    /**
     * 对象是否为空
     * @param obj {Object}
     * @return {boolean}
     */
    isEmpty(obj = {}) {
        if (!obj) {
            return true;
        }
        return Object.keys(obj).length <= 0;
    },

    /**
     * 去除空字段
     * @param obj
     */
    clearFieldIfNull(obj = {}) {
        const temp = Object.assign({}, obj);
        Object.keys(temp).forEach(key => {
            if (StringUtils.isBlank(temp[key]) || key.startsWith("$")) {
                delete temp[key];
            }
        })
        return temp;
    },

    isSameObject(obj1 = {}, obj2 = {}) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    },

    /**
     * 对象是否为空
     * @param obj
     * @return {boolean}
     */
    isNotEmpty(obj = {}) {
        return !isEmpty(obj);
    }
}
