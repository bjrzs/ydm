"use strict";(global.webpackChunkmarktext=global.webpackChunkmarktext||[]).push([[77734],{77734:(n,t,e)=>{e.r(t),e.d(t,{default:()=>u});var o=e(59713),r=e.n(o),c=e(59796),a=e.n(c),s=e(4734);class u{constructor(){r()(this,"encodedInput","")}static parse(n){const t=new u;return t.encodedInput=u.encode(n),t}static encode(n){const t=decodeURIComponent(encodeURIComponent(n));return function(n,t,e){return[...e].map((e=>function(n,t,e){return t[n.indexOf(e)]}(n,t,e))).join("")}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/","0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_",a().deflateSync(t,{level:3}).toString("base64"))}insertImgElement(n){const t="string"==typeof n?document.getElementById(n):n;if(null===t||!t.tagName)throw new Error("Invalid container: "+n);const e=`https://www.plantuml.com/plantuml/svg/~1${this.encodedInput}`,o=(0,s.h)("img",{attrs:{src:e}});t.innerHTML=(0,s.io)(o)}}}}]);
//# sourceMappingURL=77734.js.map