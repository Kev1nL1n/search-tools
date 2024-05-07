/**
 * 数组对象扁平化普通对象
 *
 * @param array
 * @param key
 * @return {{}}
 */
export function arrayFlat2Object(array = [], key = "id") {
    if (array.length === 0) {
        return {};
    }
    let result = {};
    array.forEach(item => {
        if (item.hasOwnProperty(key)) {
            result[item[key]] = item;
        }
    })
    return result;
}
