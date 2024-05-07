const crypto = require('crypto');
const algorithm = 'aes-256-ctr'; // 使用AES-256-CTR算法
const secretKey = crypto.randomBytes(32); // 生成一个随机的密钥
const iv = crypto.randomBytes(16); // 初始化向量，对于某些模式（如CTR）是必需的

/**
 * AES加密函数
 * @param text
 * @param key {String}
 * @param iv {String}
 * @return {*}
 */
function encryptWithKey(text, key, iv) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key.split(",")), Buffer.from(iv.split(",")));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

/**
 * AES解密函数
 * @param text
 * @param key {String}
 * @param iv {String}
 * @return {*}
 */
function decryptWithKey(text, key, iv) {
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key.split(",")), Buffer.from(iv.split(",")));
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

/**
 * AES加密函数
 * @param text
 * @return {*}
 */
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

/**
 * AES解密函数
 * @param text
 * @return {*}
 */
function decrypt(text) {
    let decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

/**
 * 获取随机生成的密钥
 * @return {Buffer}
 */
function randomBytes(size) {
    return crypto.randomBytes(size);
}

module.exports = {
    decrypt,
    decryptWithKey,
    encrypt,
    encryptWithKey,
    randomBytes
}
