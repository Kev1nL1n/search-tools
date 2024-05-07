(function(){"use strict";var e={995:function(e,t,n){var r=n(471),o=n(353);const i={state:{},mutations:{}};var a=i;const u={};var c=u;r["default"].use(o.Ay);const l=new o.Ay.Store({modules:{common:a},getters:c});var f=l,s=n(928),d=n.n(s),h=n(173);const p=[{path:"/",meta:{title:"资料检索工具"},component:()=>n.e(101).then(n.bind(n,101))},{path:"/search/index",meta:{title:"聚合搜索"},component:()=>Promise.all([n.e(477),n.e(715),n.e(339)]).then(n.bind(n,339))},{path:"/search/engine",meta:{title:"搜索结果"},component:()=>Promise.all([n.e(477),n.e(715),n.e(709)]).then(n.bind(n,709))},{path:"/search/result",meta:{title:"查询列表"},component:()=>Promise.all([n.e(477),n.e(515)]).then(n.bind(n,918))},{path:"/browser/index",meta:{title:"内置浏览器"},component:()=>Promise.all([n.e(477),n.e(715),n.e(359)]).then(n.bind(n,359))}];var m=p,v=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app-main"}},[t("router-view")],1)},b=[],g={data(){return{location:null}},created(){this.location=location.pathname},computed:{isNotIndex(){return"/"!==this.$route.path}},methods:{toUrl(){this.$router.push(this.location)},refresh(){location.reload()},back(){this.$router.back()}}},y=g,w=n(656),k=(0,w.A)(y,v,b,!1,null,"d2e43a94",null),O=k.exports;r["default"].use(h.Ay),r["default"].use(d());const A={mode:"history",routes:m},C=new h.Ay(A);C.beforeEach(((e,t,n)=>{d().LoadingBar.start(),window.document.title=e.meta.title,n()})),C.afterEach(((e,t,n)=>{d().LoadingBar.finish(),window.scrollTo(0,0)}));new r["default"]({store:f,router:C,render:e=>e(O)}).$mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,i){if(!r){var a=1/0;for(f=0;f<e.length;f++){r=e[f][0],o=e[f][1],i=e[f][2];for(var u=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(u=!1,i<a&&(a=i));if(u){e.splice(f--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[r,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{101:"10246f5c",339:"65ad24f8",359:"35278807",477:"6de4a359",515:"c9e38453",709:"6841d87e",715:"ac4ca1f1"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{101:"5554e4fa",339:"47a9880e",359:"ff051a18",515:"608dd2c6",709:"d3d29abf",715:"3c0b515c"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="tools-ui-new:";n.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var u,c;if(void 0!==i)for(var l=document.getElementsByTagName("script"),f=0;f<l.length;f++){var s=l[f];if(s.getAttribute("src")==r||s.getAttribute("data-webpack")==t+i){u=s;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+i),u.src=r),e[r]=[o];var d=function(t,n){u.onerror=u.onload=null,clearTimeout(h);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(n)})),t)return t(n)},h=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,r,o,i){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",n.nc&&(a.nonce=n.nc);var u=function(n){if(a.onerror=a.onload=null,"load"===n.type)o();else{var r=n&&n.type,u=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+u+")");c.name="ChunkLoadError",c.code="CSS_CHUNK_LOAD_FAILED",c.type=r,c.request=u,a.parentNode&&a.parentNode.removeChild(a),i(c)}};return a.onerror=a.onload=u,a.href=t,r?r.parentNode.insertBefore(a,r.nextSibling):document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],i=o.getAttribute("data-href");if(i===e||i===t)return o}},r=function(r){return new Promise((function(o,i){var a=n.miniCssF(r),u=n.p+a;if(t(a,u))return o();e(r,u,null,o,i)}))},o={524:0};n.f.miniCss=function(e,t){var n={101:1,339:1,359:1,515:1,709:1,715:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else if(715!=t){var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var a=n.p+n.u(t),u=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,o[1](u)}};n.l(a,c,"chunk-"+t,t)}else e[t]=0},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,a=r[0],u=r[1],c=r[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(c)var f=c(n)}for(t&&t(r);l<a.length;l++)i=a[l],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(f)},r=self["webpackChunktools_ui_new"]=self["webpackChunktools_ui_new"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(995)}));r=n.O(r)})();
//# sourceMappingURL=app.80023dbc.js.map