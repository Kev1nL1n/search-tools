"use strict";(self["webpackChunktools_ui_new"]=self["webpackChunktools_ui_new"]||[]).push([[430],{871:function(e,t,n){n.d(t,{A:function(){return u}});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"result-entry"},[t("span",{ref:"dest",staticClass:"tips-fixed",on:{click:e.showResultList}},[t("Icon",{attrs:{type:"md-archive"}}),e._v(" 打开检索列表 或 拖动超链接到此处 ")],1),t("Drawer",{attrs:{transfer:!1,title:"检索列表",width:e.width,closable:!1},model:{value:e.resultVisible,callback:function(t){e.resultVisible=t},expression:"resultVisible"}},[t("result-list",{ref:"result-list",attrs:{"show-back":!1}})],1)],1)},o=[],s=n(87),r=n(283),a={name:"result-entry",components:{ResultList:s.A},data(){return{resultVisible:!1}},computed:{width(){return window.screen.availWidth-200}},methods:{showResultList(){this.resultVisible=!0;let e=this.$refs["result-list"];e&&e.listResult()}},mounted(){this.$refs.dest.ondrop=e=>{e.preventDefault();const t=e.dataTransfer.getData("text/plain");if(r.A.isNotBlank(t))try{let e=JSON.parse(t);electronAPI.invoke({type:"saveResult",content:e}).then((e=>{const{type:t,content:n}=e.content;this.$Message[t]({content:n})}))}catch(n){this.$Message.error("添加结果列表失败")}},document.ondragover=function(e){return!1},document.ondrop=function(e){return!1}}},c=a,l=n(656),d=(0,l.A)(c,i,o,!1,null,"36e918c0",null),u=d.exports},430:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var i=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"search-engine"}},[t("div",{attrs:{id:"options"}},[t("Button",{attrs:{icon:"md-arrow-back"},on:{click:e.back}},[e._v("返 回")]),t("Select",{staticStyle:{width:"110px"},on:{"on-change":e.engineLenChange},model:{value:e.engineLen,callback:function(t){e.engineLen=t},expression:"engineLen"}},e._l(e.maxEngineLen,(function(n){return t("Option",{key:n,attrs:{value:n}},[e._v(e._s(n)+" 个引擎")])})),1),t("div",{staticClass:"engine-select"},e._l(e.engineLen,(function(n){return t("div",{staticClass:"engine"},[t("Select",{staticStyle:{width:"110px"},on:{"on-change":e.engineSelectChange},model:{value:e.engineSelect[n],callback:function(t){e.$set(e.engineSelect,n,t)},expression:"engineSelect[num]"}},e._l(e.engines,(function(i,o){return t("Option",{key:`${n}-${o}`,attrs:{value:i.id}},[e._v(" "+e._s(i.name)+" ")])})),1)],1)})),0),t("div",{staticClass:"form"},[t("AutoComplete",{attrs:{clearable:"",data:e.keywordHistory,"filter-method":e.filterMethod,placeholder:"输入需要搜索的关键字，多个关键字使用[ , ]隔开"},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}}),t("Button",{staticClass:"search-btn",attrs:{icon:"md-search",type:"primary"},on:{click:function(t){return e.onSearchClick(!0)}}},[e._v("搜 索")]),e.isMultiKeywords?t("Button",{staticClass:"search-btn",attrs:{icon:"md-search",type:"primary"},on:{click:function(t){return e.onSearchClick(!1)}}},[e._v(" 搜索第"+e._s(e.keywordIndex+1)+"个 ")]):e._e()],1),e.page>1?t("Button",{attrs:{type:"text"},on:{click:e.prevPage}},[e._v("上一页")]):e._e(),t("Button",{attrs:{type:"text"},on:{click:e.nextPage}},[e._v("下一页")])],1),t("div",{attrs:{id:"content"}},e._l(e.engineLen,(function(n,i){return t("iframe",{key:i,ref:`iframe-${e.engineSelect[n]}`,refInFor:!0,attrs:{height:"100%",width:"100%",src:e.getEngine(e.engineSelect[n]).home}})})),0),t("result-entry")],1)},o=[],s=n(513),r=n(283),a=n(761),c=n(894),l=n(871);function d(){const e=window.location.search,t=new URLSearchParams(e);return Object.fromEntries(t.entries())}function u(e){const t=new XMLHttpRequest;if(t.open("GET",e,!1),t.send(null),200===t.status)return t.responseText;throw new Error("Failed to load CSS file: "+t.status)}const g=u("/style/inject.css");var h={name:"engine",components:{ResultEntry:l.A},data(){return{signalMode:!0,keywordIndex:0,keywordHistory:[],isInit:!1,page:1,pageSize:10,sizeSelect:[10,20,30,50,100],keyword:null,maxEngineLen:s.A.length,engineSelect:{1:s.A[0].id,2:s.A[0].id,3:s.A[0].id},engineLen:1,engines:s.A}},computed:{isMultiKeywords(){return this.keyword.split(",").length>1}},methods:{onSearchClick(e){(this.signalMode=e)&&(this.keywordIndex=0),this.engineSearch()},filterMethod(e,t){return!r.A.isBlank(e)&&!r.A.isBlank(t)&&-1!==t.toUpperCase().indexOf(e.toUpperCase())},engineLenChange(e){(0,a.k3)({name:"engine_len",content:e}),this.engineSearch()},pageSizeChange(e){(0,a.k3)({name:"page_size",content:e}),this.engineSearch()},engineSelectChange(e){(0,a.k3)({name:"engine_select",content:this.engineSelect}),this.engineSearch()},prevPage(){(this.page-=1)<1&&(this.page=1),this.$nextTick(this.engineSearch)},nextPage(){this.page+=1,this.$nextTick(this.engineSearch)},getEngine(e){return this.engines.find((t=>t.id===e))},back(){this.$router.push("/search/index")},engineSearch(){let{keyword:e,page:t,pageSize:n,engineLen:i,engineSelect:o}=this;r.A.isBlank(e)||((0,c.ig)(e),this.$nextTick((()=>{if(!this.signalMode){let t=e.split(",");e=t[this.keywordIndex],(this.keywordIndex+=1)>t.length-1&&(this.keywordIndex=0)}e=encodeURIComponent(e);for(let s=1;s<=i;s++){let i=this.getEngine(o[s]);if(!i)continue;let r=this.inject2Engine(i);r&&(r.src=`${i.getSearchURI(e,t,n)}`)}})))},getIframe(e){let t=this.$refs[`iframe-${e}`];return t&&0!==t.length?t[0]:null},show:function(){this.visible=!0},inject2Engine(e){const t=this;let n=this.getIframe(e.id);return n&&(n.onload=null,n.onload=function(){const i=n.contentDocument||n.contentWindow.document,o=i.createElement("style");o.type="text/css",o.innerHTML=g;const s=i.getElementsByTagName("head")[0];s.appendChild(o);let r=e.getResultElement(i);r.forEach((n=>{const o=i.createElement("button");o.classList.add("ivu-btn"),o.classList.add("ivu-btn-primary"),o.innerHTML="<span>添加链接到数据库</span>",o.addEventListener("click",(n=>{t.sendLinkData2IPC(e.getLinkData(n.target.parentNode.parentNode))})),n.insertBefore(o,n.children[0])})),i.querySelectorAll("a").forEach((t=>{t.ondragstart=function(t){t.dataTransfer.setData("text/plain",JSON.stringify({eng_id:e.id,eng_name:e.name,href:t.target.href,title:t.target.innerText}))},t.addEventListener("click",(()=>{event.stopPropagation(),event.stopImmediatePropagation();const e=["_blank","_top","_parent"];t.target&&!e.includes(t.target)||(event.preventDefault(),electronAPI.invoke({type:"openWindow",content:{url:t.href}}))}))})),n.contentWindow.open=e=>{electronAPI.invoke({type:"openWindow",content:{url:e}})}}),n},async sendLinkData2IPC(e){electronAPI.invoke({type:"saveResult",content:e}).then((e=>{const{type:t,content:n}=e.content;this.$Message[t]({content:n})}))}},created(){let e=(0,a.KA)({name:"engine_select"});e&&(this.engineSelect=e);let t=(0,a.KA)({name:"engine_len"});t&&(this.engineLen=t);let n=(0,a.KA)({name:"page_size"});n&&(this.pageSize=n);let i=d();i.hasOwnProperty("keyword")?r.A.isNotBlank(this.keyword=i.keyword)&&this.$nextTick((()=>{this.engineSearch()})):this.engineSearch(),this.keywordHistory=(0,c.FA)(),document.addEventListener("keydown",(e=>{13===e.keyCode&&(e.preventDefault(),this.engineSearch())}))}},p=h,_=n(656),m=(0,_.A)(p,i,o,!1,null,"60377c34",null),f=m.exports},894:function(e,t,n){n.d(t,{FA:function(){return l},FN:function(){return c},ig:function(){return a}});var i=n(761),o=n(283);const s="kw_his",r=200;function a(e){if(o.A.isBlank(e))return;let t=l();t.length>r&&t.splice(0,r/2);let n=t.findIndex((t=>t===e));-1!==n&&t.splice(n,1),t.unshift(e),(0,i.k3)({name:s,content:t})}function c(e){let t=(0,i.KA)({name:s})||[],n=t.findIndex((t=>t===e));return-1!==n&&t.splice(n,1),(0,i.k3)({name:s,content:t}),t}function l(){return(0,i.KA)({name:s})||[]}},761:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{KA:function(){return getStore},k3:function(){return setStore}});var _string_utils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(283);const keyName="tools-",setStore=(e={})=>{let{name:t,content:n,type:i}=e;t=keyName+t;let o={dataType:typeof n,content:n,type:i,datetime:(new Date).getTime()};i?window.sessionStorage.setItem(t,JSON.stringify(o)):window.localStorage.setItem(t,JSON.stringify(o))},getStore=(params={})=>{let{name:name,debug:debug}=params,obj,content;if(name=keyName+name,obj=window.sessionStorage.getItem(name),_string_utils_js__WEBPACK_IMPORTED_MODULE_0__.A.isBlank(obj)&&(obj=window.localStorage.getItem(name)),!_string_utils_js__WEBPACK_IMPORTED_MODULE_0__.A.isBlank(obj)){try{obj=JSON.parse(obj)}catch(ignored){return obj}return debug?obj:("string"===obj.dataType?content=obj.content:"number"===obj.dataType?content=Number(obj.content):"boolean"===obj.dataType?content=eval(obj.content):"object"===obj.dataType&&(content=obj.content),content)}},removeStore=(e={})=>{let{name:t,type:n}=e;t=keyName+t,n?window.sessionStorage.removeItem(t):window.localStorage.removeItem(t)},getAllStore=(e={})=>{let t=[],{type:n}=e;if(n)for(let i=0;i<=window.sessionStorage.length;i++)t.push({name:window.sessionStorage.key(i),content:getStore({name:window.sessionStorage.key(i),type:"session"})});else for(let i=0;i<=window.localStorage.length;i++)t.push({name:window.localStorage.key(i),content:getStore({name:window.localStorage.key(i)})});return t},clearStore=(e={})=>{let{type:t}=e;t?window.sessionStorage.clear():window.localStorage.clear()}}}]);
//# sourceMappingURL=430.d8420601.js.map