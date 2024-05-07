module.exports = {
    isEmpty(input) {
        input = input.replaceAll("\r", "");
        return input == null || input === "";
    },
    isNotEmpty(input) {
        return !this.isEmpty(input);
    },
    isBlank(input) {
        return input == null || /^\s*$/.test(input);
    },
    isNotBlank(input) {
        return !this.isBlank(input);
    },
    trim(input) {
        return input.replace(/^\s+|\s+$/, '');
    },
    trimToEmpty(input) {
        return input == null ? "" : this.trim(input);
    },
    startsWith(input, prefix) {
        return input.indexOf(prefix) === 0;
    },
    endsWith(input, suffix) {
        return input.lastIndexOf(suffix) === 0;
    },
    contains(input, searchSeq) {
        return input.indexOf(searchSeq) >= 0;
    },
    equals(input1, input2) {
        return input1 === input2;
    },
    equalsIgnoreCase(input1, input2) {
        return input1.toLocaleLowerCase() === input2.toLocaleLowerCase();
    },
    containsWhitespace(input) {
        return this.contains(input, ' ');
    },
    //生成指定个数的字符
    repeat(ch, repeatTimes) {
        let result = "";
        for (let i = 0; i < repeatTimes; i++) {
            result += ch;
        }
        return result;
    },
    deleteWhitespace(input) {
        return input.replace(/\s+/g, '');
    },
    rightPad(input, size, padStr) {
        return input + this.repeat(padStr, size);
    },
    leftPad(input, size, padStr) {
        return this.repeat(padStr, size) + input;
    },
    //首小写字母转大写
    capitalize(input) {
        let strLen = 0;
        if (input == null || (strLen = input.length) === 0) {
            return input;
        }
        return input.replace(/^[a-z]/, function (matchStr) {
            return matchStr.toLocaleUpperCase();
        });
    },
    //首大写字母转小写
    uncapitalize(input) {
        let strLen = 0;
        if (input == null || (strLen = input.length) === 0) {
            return input;
        }
        return input.replace(/^[A-Z]/, function (matchStr) {
            return matchStr.toLocaleLowerCase();
        });
    },
    //大写转小写，小写转大写
    swapCase(input) {
        return input.replace(/[a-z]/ig, function (matchStr) {
            if (matchStr >= 'A' && matchStr <= 'Z') {
                return matchStr.toLocaleLowerCase();
            } else if (matchStr >= 'a' && matchStr <= 'z') {
                return matchStr.toLocaleUpperCase();
            }
        });
    },
    //统计含有的子字符串的个数
    countMatches(input, sub) {
        if (this.isEmpty(input) || this.isEmpty(sub)) {
            return 0;
        }
        let count = 0;
        let index = 0;
        while ((index = input.indexOf(sub, index)) !== -1) {
            index += sub.length;
            count++;
        }
        return count;
    },
    //只包含字母
    isAlpha(input) {
        return /^[a-z]+$/i.test(input);
    },
    //只包含字母、空格
    isAlphaSpace(input) {
        return /^[a-z\s]*$/i.test(input);
    },
    //只包含字母、数字
    isAlphanumeric(input) {
        return /^[a-z0-9]+$/i.test(input);
    },
    //只包含字母、数字和空格
    isAlphanumericSpace(input) {
        return /^[a-z0-9\s]*$/i.test(input);
    },
    //数字
    isNumeric(input) {
        return /^\d+$/.test(input);
    },
    //小数
    isDecimal(input) {
        return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input);
    },
    //负小数
    isNegativeDecimal(input) {
        return /^\-?(?:0|[1-9]\d*)\.\d+$/.test(input);
    },
    //正小数
    isPositiveDecimal(input) {
        return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input);
    },
    //整数
    isInteger(input) {
        return /^[-+]?(?:0|[1-9]\d*)$/.test(input);
    },
    //正整数
    isPositiveInteger(input) {
        return /^\+?(?:0|[1-9]\d*)$/.test(input);
    },
    //负整数
    isNegativeInteger(input) {
        return /^\-?(?:0|[1-9]\d*)$/.test(input);
    },
    //只包含数字和空格
    isNumericSpace(input) {
        return /^[\d\s]*$/.test(input);
    },
    isWhitespace(input) {
        return /^\s*$/.test(input);
    },
    isAllLowerCase(input) {
        return /^[a-z]+$/.test(input);
    },
    isAllUpperCase(input) {
        return /^[A-Z]+$/.test(input);
    },
    /**
     * 是否为手机号
     * @param input
     * @return {boolean}
     */
    isPhoneNumber(input) {
        return /^(0|86|17951)?(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/.test(input)
    },
    defaultString(input, defaultStr) {
        return input == null ? defaultStr : input;
    },
    defaultIfBlank(input, defaultStr) {
        return this.isBlank(input) ? defaultStr : input;
    },
    defaultIfEmpty(input, defaultStr) {
        return this.isEmpty(input) ? defaultStr : input;
    },
    //字符串反转
    reverse(input) {
        if (this.isBlank(input)) {
            return input;
        }
        return input.split("").reverse().join("");
    },
    //删掉特殊字符(英文状态下)
    removeSpecialCharacter(input) {
        return input.replace(/[!-/:-@\[-`{-~]/g, "");
    },
    //只包含特殊字符、数字和字母（不包括空格，若想包括空格，改为[ -~]）
    isSpecialCharacterAlphanumeric(input) {
        return /^[!-~]+$/.test(input);
    },
    /**
     * 校验时排除某些字符串，即不能包含某些字符串
     * @param {Object} conditions:里面有多个属性，如下：
     *
     * @param {String} matcherFlag 匹配标识
     * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
     * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
     * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
     * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
     * 100：所有字符;
     * @param {Array} excludeStrArr 排除的字符串，数组格式
     * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
     * @param {Boolean} ignoreCase 是否忽略大小写
     * conditions={matcherFlag:"0",excludeStrArr:[],length:"",ignoreCase:true}
     */
    isPatternMustExcludeSomeStr(input, conditions) {
        //参数
        let matcherFlag = conditions.matcherFlag;
        let excludeStrArr = conditions.excludeStrArr;
        let length = conditions.length;
        let ignoreCase = conditions.ignoreCase;
        //拼正则
        let size = excludeStrArr.length;
        let regex = (size === 0) ? "^" : "^(?!.*(?:{0}))";
        let subPattern = "";
        for (let i = 0; i < size; i++) {
            excludeStrArr[i] = escapeMetacharacterOfStr(excludeStrArr[i]);
            subPattern += excludeStrArr[i];
            if (i !== size - 1) {
                subPattern += "|";
            }
        }
        regex = this.format(regex, [subPattern]);
        switch (matcherFlag) {
            case '0':
                regex += "\\d";
                break;
            case '1':
                regex += "[a-zA-Z]";
                break;
            case '2':
                regex += "[a-z]";
                break;
            case '3':
                regex += "[A-Z]";
                break;
            case '4':
                regex += "[!-/:-@\[-`{-~]";
                break;
            case '5':
                regex += "[\u4E00-\u9FA5]";
                break;
            case '6':
                regex += "[a-zA-Z0-9]";
                break;
            case '7':
                regex += "[a-z0-9]";
                break;
            case '8':
                regex += "[A-Z0-9]";
                break;
            case '9':
                regex += "[!-~]";
                break;
            case '10':
                regex += "[0-9\u4E00-\u9FA5]";
                break;
            case '11':
                regex += "[a-z!-/:-@\[-`{-~]";
                break;
            case '12':
                regex += "[A-Z!-/:-@\[-`{-~]";
                break;
            case '13':
                regex += "[a-zA-Z!-/:-@\[-`{-~]";
                break;
            case '14':
                regex += "[a-z\u4E00-\u9FA5]";
                break;
            case '15':
                regex += "[A-Z\u4E00-\u9FA5]";
                break;
            case '16':
                regex += "[a-zA-Z\u4E00-\u9FA5]";
                break;
            case '17':
                regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
                break;
            case '18':
                regex += "[\u4E00-\u9FA5!-~]";
                break;
            case '19':
                regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                break;
            case '20':
                regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                break;
            case '100':
                regex += "[\s\S]";
                break;
            default:
                alert(matcherFlag + ":This type is not supported!");
        }
        regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
        regex += "$";
        let pattern = new RegExp(regex, ignoreCase ? "i" : "");
        return pattern.test(input);
    },
    /**
     * @param {String} message
     * @param {Array} arr
     * 消息格式化
     */
    format(message, arr) {
        return message.replace(/{(\d+)}/g, function (matchStr, group1) {
            return arr[group1];
        });
    },
    /**
     * 把连续出现多次的字母字符串进行压缩。如输入:aaabbbbcccccd 输出:3a4b5cd
     * @param {String} input
     * @param {Boolean} ignoreCase : true or false
     */
    compressRepeatedStr(input, ignoreCase) {
        let pattern = new RegExp("([a-z])\\1+", ignoreCase ? "ig" : "g");
        return input.replace(pattern, function (matchStr, group1) {
            return matchStr.length + group1;
        });
    },
    /**
     * 校验必须同时包含某些字符串
     * @param {String} input
     * @param {Object} conditions:里面有多个属性，如下：
     *
     * @param {String} matcherFlag 匹配标识
     * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
     * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
     * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
     * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
     * 100：所有字符;
     * @param {Array} excludeStrArr 排除的字符串，数组格式
     * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
     * @param {Boolean} ignoreCase 是否忽略大小写
     * conditions={matcherFlag:"0",containStrArr:[],length:"",ignoreCase:true}
     *
     */
    isPatternMustContainSomeStr(input, conditions) {
        //参数
        let matcherFlag = conditions.matcherFlag;
        let containStrArr = conditions.containStrArr;
        let length = conditions.length;
        let ignoreCase = conditions.ignoreCase;
        //创建正则
        let size = containStrArr.length;
        let regex = "^";
        let subPattern = "";
        for (let i = 0; i < size; i++) {
            containStrArr[i] = escapeMetacharacterOfStr(containStrArr[i]);
            subPattern += "(?=.*" + containStrArr[i] + ")";
        }
        regex += subPattern;
        switch (matcherFlag) {
            case '0':
                regex += "\\d";
                break;
            case '1':
                regex += "[a-zA-Z]";
                break;
            case '2':
                regex += "[a-z]";
                break;
            case '3':
                regex += "[A-Z]";
                break;
            case '4':
                regex += "[!-/:-@\[-`{-~]";
                break;
            case '5':
                regex += "[\u4E00-\u9FA5]";
                break;
            case '6':
                regex += "[a-zA-Z0-9]";
                break;
            case '7':
                regex += "[a-z0-9]";
                break;
            case '8':
                regex += "[A-Z0-9]";
                break;
            case '9':
                regex += "[!-~]";
                break;
            case '10':
                regex += "[0-9\u4E00-\u9FA5]";
                break;
            case '11':
                regex += "[a-z!-/:-@\[-`{-~]";
                break;
            case '12':
                regex += "[A-Z!-/:-@\[-`{-~]";
                break;
            case '13':
                regex += "[a-zA-Z!-/:-@\[-`{-~]";
                break;
            case '14':
                regex += "[a-z\u4E00-\u9FA5]";
                break;
            case '15':
                regex += "[A-Z\u4E00-\u9FA5]";
                break;
            case '16':
                regex += "[a-zA-Z\u4E00-\u9FA5]";
                break;
            case '17':
                regex += "[\u4E00-\u9FA5!-/:-@\[-`{-~]";
                break;
            case '18':
                regex += "[\u4E00-\u9FA5!-~]";
                break;
            case '19':
                regex += "[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                break;
            case '20':
                regex += "[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]";
                break;
            case '100':
                regex += "[\s\S]";
                break;
            default:
                alert(matcherFlag + ":This type is not supported!");
        }
        regex += this.isNotBlank(length) ? "{" + length + "}" : "+";
        regex += "$";
        let pattern = new RegExp(regex, ignoreCase ? "i" : "");
        return pattern.test(input);
    },
    //中文校验
    isChinese(input) {
        return /^[\u4E00-\u9FA5]+$/.test(input);
    },
    //去掉中文字符
    removeChinese(input) {
        return input.replace(/[\u4E00-\u9FA5]+/gm, "");
    },
    //转义元字符
    escapeMetacharacter(input) {
        let metacharacter = "^$()*+.[]|\\-?{}|";
        if (metacharacter.indexOf(input) >= 0) {
            input = "\\" + input;
        }
        return input;
    },
    //转义字符串中的元字符
    escapeMetacharacterOfStr(input) {
        return input.replace(/[\^\$\*\+\.\|\\\-\?\{\}\|]/gm, "\\$&");
    },
    /**
     * 字符串占位符替换
     * @param str
     * @param obj
     * @return {*}
     */
    formatPlaceholder(str, obj = {}) {
        if (isEmpty(str) || Object.keys(obj).length === 0) {
            return str;
        }
        for (let key in obj) {
            str = str.replace(new RegExp("\\{\\{" + key + "\\}\\}", "g"), obj[key]);
        }
        return s;
    },
    //用于生成uuid
    S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    /*String.prototype.format = function() {
        if(arguments.length == 0) return this;
        var obj = arguments[0];
        var s = this;
        for(var key in obj) {
            s = s.replace(new RegExp("\\{\\{" + key + "\\}\\}", "g"), obj[key]);
        }
        return s;
    }*/
    /**
     * 格式化关键字
     * @param string
     * @param keyword
     * @param value
     * @return {string}
     */
    formatKeyword(string = "", keyword, value) {
        return string.replace(new RegExp(`\{${keyword}\}`, "g"), value);
    }
};
