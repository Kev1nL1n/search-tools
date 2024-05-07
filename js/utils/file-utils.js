const fs = require('fs');

/**
 * 创建目录
 * @param dirPath
 */
function mkdir(dirPath) {
    if (fs.existsSync(dirPath)) {
        return;
    }
    //创建目录并创建所需中间目录
    fs.mkdirSync(dirPath, {recursive: true});
}

module.exports = {
    mkdir
}
