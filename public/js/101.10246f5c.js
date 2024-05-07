"use strict";(self["webpackChunktools_ui_new"]=self["webpackChunktools_ui_new"]||[]).push([[101],{101:function(e,t,a){a.r(t),a.d(t,{default:function(){return b}});var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"index"},[t("Row",{staticClass:"main",attrs:{gutter:16}},e._l(e.modules,(function(a,r){return t("Col",{key:r,attrs:{span:6}},[t("Card",{staticClass:"module",nativeOn:{click:function(t){return e.toModule(a)}}},[t("div",{staticStyle:{"text-align":"center"}},[t("Icon",{staticClass:"icon",attrs:{type:a.icon,color:a.color}}),t("h3",{staticClass:"name"},[e._v(e._s(a.name))]),t("span",{staticClass:"desc"},[e._v(e._s(a.desc))])],1)])],1)})),1),t("div",{staticClass:"sidebar"},[e.user?t("Avatar",{style:{background:"#f56a00"}},[e._v(e._s(e.user.name))]):e._e(),t("settings")],1),t("div",{staticClass:"floor"},[t("span",{staticClass:"notice",on:{click:e.showNotice}},[e._v("使用注意事项")])])],1)},n=[],s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"settings"},[t("Icon",{staticClass:"setting",attrs:{type:"md-cog"},on:{click:e.open}}),t("Modal",{attrs:{fullscreen:"",title:"设置",width:"800","ok-text":"保存设置"},on:{"on-ok":e.save,"on-cancel":e.cancel},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[t("div",{staticClass:"settings-main"},[e.config?t("Form",{attrs:{model:e.config,"label-position":"left","label-width":120}},[t("Alert",{attrs:{type:"info","show-icon":""}},[e._v("当前设备ID："+e._s(e.machineId)+"，默认提供本地认证可自行修改认证地址")]),t("Alert",{attrs:{type:"warning","show-icon":""}},[e._v("页面地址修改后重启应用程序生效，如输入无效地址将导致程序无法使用")]),t("FormItem",{attrs:{label:"页面地址"}},[t("Input",{model:{value:e.config.host,callback:function(t){e.$set(e.config,"host",t)},expression:"config.host"}})],1),t("FormItem",{attrs:{label:"认证地址"}},[t("Input",{model:{value:e.config.allowCodes,callback:function(t){e.$set(e.config,"allowCodes",t)},expression:"config.allowCodes"}})],1),t("Row",{attrs:{gutter:16}},[t("Col",{attrs:{span:"12"}},[t("FormItem",{attrs:{label:"查询间隔（ms）"}},[t("Input",{attrs:{type:"number"},model:{value:e.config.search.interval,callback:function(t){e.$set(e.config.search,"interval",t)},expression:"config.search.interval"}})],1)],1),t("Col",{attrs:{span:"12"}},[t("FormItem",{attrs:{label:"超时时间（ms）"}},[t("Input",{attrs:{type:"number"},model:{value:e.config.search.timeout,callback:function(t){e.$set(e.config.search,"timeout",t)},expression:"config.search.timeout"}})],1)],1)],1),t("FormItem",{attrs:{label:"搜索规则"}},e._l(e.config.search.rules,(function(a,r){return t("Row",{key:r,staticClass:"rules-input"},[t("Col",{attrs:{span:"2"}},[t("FormItem",[t("Input",{attrs:{placeholder:"Type"},model:{value:a.type,callback:function(t){e.$set(a,"type",t)},expression:"rule.type"}})],1)],1),t("Col",{attrs:{span:"4"}},[t("FormItem",[t("Input",{attrs:{placeholder:"Name"},model:{value:a.name,callback:function(t){e.$set(a,"name",t)},expression:"rule.name"}})],1)],1),t("Col",{attrs:{span:"13"}},[t("FormItem",[t("Input",{attrs:{placeholder:"RegExp"},model:{value:a.regexp,callback:function(t){e.$set(a,"regexp",t)},expression:"rule.regexp"}})],1)],1),t("Col",{attrs:{span:"2"}},[t("FormItem",[t("Input",{attrs:{placeholder:"Flag"},model:{value:a.flag,callback:function(t){e.$set(a,"flag",t)},expression:"rule.flag"}})],1)],1),t("Col",{attrs:{span:"3"}},[t("FormItem",[t("Button",{attrs:{type:"error",icon:"md-close"},on:{click:function(t){return e.removeRule(r)}}}),r===e.config.search.rules.length-1?t("Button",{attrs:{type:"primary",icon:"md-add"},on:{click:function(t){return e.addRule(r)}}}):e._e()],1)],1)],1)})),1),t("FormItem",{attrs:{label:"禁止深度搜索主机"}},[e._l(e.config.search.noDeepDomains,(function(a,r){return t("Tag",{key:r,attrs:{name:a,closable:""},on:{"on-close":function(t){return e.removeDomains(r)}}},[e._v(e._s(a)+" ")])})),t("Button",{attrs:{icon:"ios-add",type:"dashed",size:"small"},on:{click:e.inputDomains}},[e._v("添加主机")])],2),t("FormItem",{attrs:{label:"忽略超链接"}},[e._l(e.config.search.ignoreHrefs,(function(a,r){return t("Tag",{key:r,attrs:{name:a,closable:""},on:{"on-close":function(t){return e.removeIgnoreHref(r)}}},[e._v(e._s(a)+" ")])})),t("Button",{attrs:{icon:"ios-add",type:"dashed",size:"small"},on:{click:e.inputHref}},[e._v("添加超链接")])],2),t("FormItem",{attrs:{label:"下载文件类型"}},[e._l(e.config.search.downloadContentTypes,(function(a,r){return t("Tag",{key:r,attrs:{name:a,closable:""},on:{"on-close":function(t){return e.removeContentType(r)}}},[e._v(e._s(a)+" ")])})),t("Button",{attrs:{icon:"ios-add",type:"dashed",size:"small"},on:{click:e.inputContentType}},[e._v("添加类型")])],2),t("FormItem",{attrs:{label:"下载文件后缀"}},[e._l(e.config.search.downloadSuffixes,(function(a,r){return t("Tag",{key:r,attrs:{name:a,closable:""},on:{"on-close":function(t){return e.removeSuffixes(r)}}},[e._v(e._s(a)+" ")])})),t("Button",{attrs:{icon:"ios-add",type:"dashed",size:"small"},on:{click:e.inputSuffixes}},[e._v("添加后缀")])],2),t("Alert",{attrs:{type:"warning","show-icon":""}},[e._v("此密钥为默认生成用于加密数据字段，修改AES密钥后将无法解密修改前的数据，请及时导出数据")]),t("FormItem",{attrs:{label:"AES密钥"}},[t("Input",{attrs:{type:"textarea",rows:2,placeholder:"请输入AES密钥"},model:{value:e.config.secretKey,callback:function(t){e.$set(e.config,"secretKey",t)},expression:"config.secretKey"}})],1),t("Alert",{attrs:{type:"warning","show-icon":""}},[e._v("向量为默认生成用于加密数据字段，修改AES向量后将无法解密修改前的数据，请及时导出数据")]),t("FormItem",{attrs:{label:"AES初始化向量"}},[t("Input",{attrs:{type:"textarea",rows:2,placeholder:"请输入AES初始化向量"},model:{value:e.config.iv,callback:function(t){e.$set(e.config,"iv",t)},expression:"config.iv"}})],1)],1):e._e()],1)])],1)},o=[],i=a(283),l={name:"settings",data(){return{machineId:null,show:!1,config:null,form:{contentType:null,suffix:null,href:null,domain:null}}},methods:{inputDomains(){this.$Modal.confirm({render:e=>e("Input",{props:{value:this.value,autofocus:!0,placeholder:"请输入主机域名或后缀"},on:{input:e=>{this.form.domain=e}}}),onOk:this.addDomains})},addDomains(){let e=this.form.domain;this.config.search.noDeepDomains.push(e),this.form.domain=null},removeDomains(e){this.config.search.noDeepDomains.splice(e,1)},addRule(){this.config.search.rules.push({})},removeRule(e){this.config.search.rules.splice(e,1),0===this.config.search.rules.length&&this.config.search.rules.push({})},inputHref(){this.$Modal.confirm({render:e=>e("Input",{props:{value:this.value,autofocus:!0,placeholder:"请输入超链接"},on:{input:e=>{this.form.href=e}}}),onOk:this.addIgnoreHref})},addIgnoreHref(){let e=this.form.href;this.config.search.ignoreHrefs.push(e),this.form.href=null},removeIgnoreHref(e){this.config.search.ignoreHrefs.splice(e,1)},inputContentType(){this.$Modal.confirm({render:e=>e("Input",{props:{value:this.value,autofocus:!0,placeholder:"请输入文件类型"},on:{input:e=>{this.form.contentType=e}}}),onOk:this.addContentType})},addContentType(){let e=this.form.contentType;i.A.isBlank(e)?this.$Message.error("文件类型不能为空"):(this.config.search.downloadContentTypes.push(e),this.form.contentType=null)},removeContentType(e){this.config.search.downloadContentTypes.splice(e,1)},inputSuffixes(){this.$Modal.confirm({render:e=>e("Input",{props:{value:this.value,autofocus:!0,placeholder:"请输入文件后缀"},on:{input:e=>{this.form.suffix=e}}}),onOk:this.addSuffixes})},addSuffixes(){let e=this.form.suffix;i.A.isBlank(e)?this.$Message.error("文件后缀不能为空"):(this.config.search.downloadSuffixes.push(e),this.form.suffix=null)},removeSuffixes(e){this.config.search.downloadSuffixes.splice(e,1)},open(){electronAPI.invoke({type:"getMachineId"}).then((e=>{this.machineId=e,electronAPI.invoke({type:"getConfig"}).then((e=>{this.config=e,this.show=!0}))}))},save(){electronAPI.invoke({type:"saveConfig",content:this.config}).then((()=>{this.$Message.success("保存设置成功")})).catch((e=>{this.$Message.error("保存设置失败:"+e.message)}))},cancel(){}}},c=l,u=a(656),p=(0,u.A)(c,s,o,!1,null,"736bdfe7",null),h=p.exports,m=a(761),d={components:{Settings:h},data(){return{user:null,modules:[{name:"聚合搜索引擎",icon:"md-search",color:"#2db7f5",desc:"集成多个搜索引擎聚合搜索相关关键字并支持将搜索结果添加至结果汇总列表",path:"search/index"},{name:"搜索结果队列",icon:"md-list",color:"#19be6b",desc:"将聚合搜索引擎结果汇总并查看列表",path:"search/result"}]}},methods:{showNotice(){electronAPI.invoke({type:"getReadme"}).then((e=>{this.$Modal.info({title:"使用注意事项",width:700,content:e})}))},toModule(e){this.$router.push(e.path)}},created(){electronAPI.invoke({type:"getUser"}).then((e=>{this.user=e}))},mounted(){(0,m.KA)({name:"show_notice"})||(this.showNotice(),(0,m.k3)({name:"show_notice",content:!0}))}},f=d,g=(0,u.A)(f,r,n,!1,null,"6f2eabae",null),b=g.exports},761:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{KA:function(){return getStore},k3:function(){return setStore}});var _string_utils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(283);const keyName="tools-",setStore=(e={})=>{let{name:t,content:a,type:r}=e;t=keyName+t;let n={dataType:typeof a,content:a,type:r,datetime:(new Date).getTime()};r?window.sessionStorage.setItem(t,JSON.stringify(n)):window.localStorage.setItem(t,JSON.stringify(n))},getStore=(params={})=>{let{name:name,debug:debug}=params,obj,content;if(name=keyName+name,obj=window.sessionStorage.getItem(name),_string_utils_js__WEBPACK_IMPORTED_MODULE_0__.A.isBlank(obj)&&(obj=window.localStorage.getItem(name)),!_string_utils_js__WEBPACK_IMPORTED_MODULE_0__.A.isBlank(obj)){try{obj=JSON.parse(obj)}catch(ignored){return obj}return debug?obj:("string"===obj.dataType?content=obj.content:"number"===obj.dataType?content=Number(obj.content):"boolean"===obj.dataType?content=eval(obj.content):"object"===obj.dataType&&(content=obj.content),content)}},removeStore=(e={})=>{let{name:t,type:a}=e;t=keyName+t,a?window.sessionStorage.removeItem(t):window.localStorage.removeItem(t)},getAllStore=(e={})=>{let t=[],{type:a}=e;if(a)for(let r=0;r<=window.sessionStorage.length;r++)t.push({name:window.sessionStorage.key(r),content:getStore({name:window.sessionStorage.key(r),type:"session"})});else for(let r=0;r<=window.localStorage.length;r++)t.push({name:window.localStorage.key(r),content:getStore({name:window.localStorage.key(r)})});return t},clearStore=(e={})=>{let{type:t}=e;t?window.sessionStorage.clear():window.localStorage.clear()}},283:function(e,t){const a={isEmpty(e){return e=e.replaceAll("\r",""),null==e||""===e},isNotEmpty(e){return!this.isEmpty(e)},isBlank(e){return null==e||/^\s*$/.test(e)},isNotBlank(e){return!this.isBlank(e)},trim(e){return e.replace(/^\s+|\s+$/,"")},trimToEmpty(e){return null==e?"":this.trim(e)},startsWith(e,t){return 0===e.indexOf(t)},endsWith(e,t){return 0===e.lastIndexOf(t)},contains(e,t){return e.indexOf(t)>=0},equals(e,t){return e===t},equalsIgnoreCase(e,t){return e.toLocaleLowerCase()===t.toLocaleLowerCase()},containsWhitespace(e){return this.contains(e," ")},repeat(e,t){let a="";for(let r=0;r<t;r++)a+=e;return a},deleteWhitespace(e){return e.replace(/\s+/g,"")},rightPad(e,t,a){return e+this.repeat(a,t)},leftPad(e,t,a){return this.repeat(a,t)+e},capitalize(e){let t=0;return null==e||0===(t=e.length)?e:e.replace(/^[a-z]/,(function(e){return e.toLocaleUpperCase()}))},uncapitalize(e){let t=0;return null==e||0===(t=e.length)?e:e.replace(/^[A-Z]/,(function(e){return e.toLocaleLowerCase()}))},swapCase(e){return e.replace(/[a-z]/gi,(function(e){return e>="A"&&e<="Z"?e.toLocaleLowerCase():e>="a"&&e<="z"?e.toLocaleUpperCase():void 0}))},countMatches(e,t){if(this.isEmpty(e)||this.isEmpty(t))return 0;let a=0,r=0;while(-1!==(r=e.indexOf(t,r)))r+=t.length,a++;return a},isAlpha(e){return/^[a-z]+$/i.test(e)},isAlphaSpace(e){return/^[a-z\s]*$/i.test(e)},isAlphanumeric(e){return/^[a-z0-9]+$/i.test(e)},isAlphanumericSpace(e){return/^[a-z0-9\s]*$/i.test(e)},isNumeric(e){return/^\d+$/.test(e)},isDecimal(e){return/^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(e)},isNegativeDecimal(e){return/^\-?(?:0|[1-9]\d*)\.\d+$/.test(e)},isPositiveDecimal(e){return/^\+?(?:0|[1-9]\d*)\.\d+$/.test(e)},isInteger(e){return/^[-+]?(?:0|[1-9]\d*)$/.test(e)},isPositiveInteger(e){return/^\+?(?:0|[1-9]\d*)$/.test(e)},isNegativeInteger(e){return/^\-?(?:0|[1-9]\d*)$/.test(e)},isNumericSpace(e){return/^[\d\s]*$/.test(e)},isWhitespace(e){return/^\s*$/.test(e)},isAllLowerCase(e){return/^[a-z]+$/.test(e)},isAllUpperCase(e){return/^[A-Z]+$/.test(e)},isURL(e){return/^https?:\/\//.test(e)},isPhoneNumber(e){return/^(0|86|17951)?(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/.test(e)},defaultString(e,t){return null==e?t:e},defaultIfBlank(e,t){return this.isBlank(e)?t:e},defaultIfEmpty(e,t){return this.isEmpty(e)?t:e},reverse(e){return this.isBlank(e)?e:e.split("").reverse().join("")},removeSpecialCharacter(e){return e.replace(/[!-/:-@\[-`{-~]/g,"")},isSpecialCharacterAlphanumeric(e){return/^[!-~]+$/.test(e)},isPatternMustExcludeSomeStr(e,t){let r=t.matcherFlag,n=t.excludeStrArr,s=t.length,o=t.ignoreCase,i=n.length,l=0===i?"^":"^(?!.*(?:{0}))",c="";for(let p=0;p<i;p++)n[p]=a.escapeMetacharacterOfStr(n[p]),c+=n[p],p!==i-1&&(c+="|");switch(l=this.format(l,[c]),r){case"0":l+="\\d";break;case"1":l+="[a-zA-Z]";break;case"2":l+="[a-z]";break;case"3":l+="[A-Z]";break;case"4":l+="[!-/:-@[-`{-~]";break;case"5":l+="[一-龥]";break;case"6":l+="[a-zA-Z0-9]";break;case"7":l+="[a-z0-9]";break;case"8":l+="[A-Z0-9]";break;case"9":l+="[!-~]";break;case"10":l+="[0-9一-龥]";break;case"11":l+="[a-z!-/:-@[-`{-~]";break;case"12":l+="[A-Z!-/:-@[-`{-~]";break;case"13":l+="[a-zA-Z!-/:-@[-`{-~]";break;case"14":l+="[a-z一-龥]";break;case"15":l+="[A-Z一-龥]";break;case"16":l+="[a-zA-Z一-龥]";break;case"17":l+="[一-龥!-/:-@[-`{-~]";break;case"18":l+="[一-龥!-~]";break;case"19":l+="[a-z一-龥!-/:-@[-`{-~]";break;case"20":l+="[A-Z一-龥!-/:-@[-`{-~]";break;case"100":l+="[sS]";break;default:alert(r+":This type is not supported!")}l+=this.isNotBlank(s)?"{"+s+"}":"+",l+="$";let u=new RegExp(l,o?"i":"");return u.test(e)},format(e,t){return e.replace(/{(\d+)}/g,(function(e,a){return t[a]}))},compressRepeatedStr(e,t){let a=new RegExp("([a-z])\\1+",t?"ig":"g");return e.replace(a,(function(e,t){return e.length+t}))},isPatternMustContainSomeStr(e,t){let r=t.matcherFlag,n=t.containStrArr,s=t.length,o=t.ignoreCase,i=n.length,l="^",c="";for(let p=0;p<i;p++)n[p]=a.escapeMetacharacterOfStr(n[p]),c+="(?=.*"+n[p]+")";switch(l+=c,r){case"0":l+="\\d";break;case"1":l+="[a-zA-Z]";break;case"2":l+="[a-z]";break;case"3":l+="[A-Z]";break;case"4":l+="[!-/:-@[-`{-~]";break;case"5":l+="[一-龥]";break;case"6":l+="[a-zA-Z0-9]";break;case"7":l+="[a-z0-9]";break;case"8":l+="[A-Z0-9]";break;case"9":l+="[!-~]";break;case"10":l+="[0-9一-龥]";break;case"11":l+="[a-z!-/:-@[-`{-~]";break;case"12":l+="[A-Z!-/:-@[-`{-~]";break;case"13":l+="[a-zA-Z!-/:-@[-`{-~]";break;case"14":l+="[a-z一-龥]";break;case"15":l+="[A-Z一-龥]";break;case"16":l+="[a-zA-Z一-龥]";break;case"17":l+="[一-龥!-/:-@[-`{-~]";break;case"18":l+="[一-龥!-~]";break;case"19":l+="[a-z一-龥!-/:-@[-`{-~]";break;case"20":l+="[A-Z一-龥!-/:-@[-`{-~]";break;case"100":l+="[sS]";break;default:alert(r+":This type is not supported!")}l+=this.isNotBlank(s)?"{"+s+"}":"+",l+="$";let u=new RegExp(l,o?"i":"");return u.test(e)},isChinese(e){return/^[\u4E00-\u9FA5]+$/.test(e)},removeChinese(e){return e.replace(/[\u4E00-\u9FA5]+/gm,"")},escapeMetacharacter(e){let t="^$()*+.[]|\\-?{}|";return t.indexOf(e)>=0&&(e="\\"+e),e},escapeMetacharacterOfStr(e){return e.replace(/[\^\$\*\+\.\|\\\-\?\{\}\|]/gm,"\\$&")},formatPlaceholder(e,t={}){if(a.isEmpty(e)||0===Object.keys(t).length)return e;for(let a in t)e=e.replace(new RegExp("\\{\\{"+a+"\\}\\}","g"),t[a]);return s},S4(){return(65536*(1+Math.random())|0).toString(16).substring(1)},guid(){return a.S4()+a.S4()+"-"+a.S4()+"-"+a.S4()+"-"+a.S4()+"-"+a.S4()+a.S4()+a.S4()},formatKeyword(e="",t,a){return e.replace(new RegExp(`{${t}}`,"g"),a)}};t.A=a}}]);
//# sourceMappingURL=101.10246f5c.js.map