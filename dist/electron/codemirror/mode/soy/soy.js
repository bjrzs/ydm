!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed"],t):t(CodeMirror)}((function(t){"use strict";var e={noEndTag:!0,soyState:"param-def"},a={alias:{noEndTag:!0},delpackage:{noEndTag:!0},namespace:{noEndTag:!0,soyState:"namespace-def"},"@attribute":e,"@attribute?":e,"@param":e,"@param?":e,"@inject":e,"@inject?":e,"@state":e,template:{soyState:"templ-def",variableScope:!0},extern:{soyState:"param-def"},export:{soyState:"export"},literal:{},msg:{},fallbackmsg:{noEndTag:!0,reduceIndent:!0},select:{},plural:{},let:{soyState:"var-def"},if:{},javaimpl:{},jsimpl:{},elseif:{noEndTag:!0,reduceIndent:!0},else:{noEndTag:!0,reduceIndent:!0},switch:{},case:{noEndTag:!0,reduceIndent:!0},default:{noEndTag:!0,reduceIndent:!0},foreach:{variableScope:!0,soyState:"for-loop"},ifempty:{noEndTag:!0,reduceIndent:!0},for:{variableScope:!0,soyState:"for-loop"},call:{soyState:"templ-ref"},param:{soyState:"param-ref"},print:{noEndTag:!0},deltemplate:{soyState:"templ-def",variableScope:!0},delcall:{soyState:"templ-ref"},log:{},element:{variableScope:!0},velog:{},const:{soyState:"const-def"}},n=Object.keys(a).filter((function(t){return!a[t].noEndTag||a[t].reduceIndent}));t.defineMode("soy",(function(e){var r=t.getMode(e,"text/plain"),o={html:t.getMode(e,{name:"text/html",multilineTagIndentFactor:2,multilineTagIndentPastTag:!1,allowMissingTagName:!0}),attributes:r,text:r,uri:r,trusted_resource_uri:r,css:t.getMode(e,"text/css"),js:t.getMode(e,{name:"text/javascript",statementIndent:2*e.indentUnit})};function s(t){return t[t.length-1]}function l(t,e,a){if(t.sol()){for(var n=0;n<e.indent&&t.eat(/\s/);n++);if(n)return null}var r=t.string,o=a.exec(r.substr(t.pos));o&&(t.string=r.substr(0,t.pos+o.index));var l=t.hideFirstChars(e.indent,(function(){var a=s(e.localStates);return a.mode.token(t,a.state)}));return t.string=r,l}function i(t,e){return{element:e,next:t}}function p(t){t.context&&(t.context.scope&&(t.variables=t.context.scope),t.context=t.context.previousContext)}function c(t,e,a){return function(t,e){for(;t;){if(t.element===e)return!0;t=t.next}return!1}(t,e)?"variable-2":a?"variable":"variable-2 error"}function u(t,e,a){this.previousContext=t,this.tag=e,this.kind=null,this.scope=a}function m(t,e){var a;return t.match(/[[]/)?(e.soyState.push("list-literal"),e.context=new u(e.context,"list-literal",e.variables),e.lookupVariables=!1,null):t.match(/\bmap(?=\()/)?(e.soyState.push("map-literal"),"keyword"):t.match(/\brecord(?=\()/)?(e.soyState.push("record-literal"),"keyword"):t.match(/([\w]+)(?=\()/)?"variable callee":(a=t.match(/^["']/))?(e.soyState.push("string"),e.quoteKind=a[0],"string"):t.match(/^[(]/)?(e.soyState.push("open-parentheses"),null):t.match(/(null|true|false)(?!\w)/)||t.match(/0x([0-9a-fA-F]{2,})/)||t.match(/-?([0-9]*[.])?[0-9]+(e[0-9]*)?/)?"atom":t.match(/(\||[+\-*\/%]|[=!]=|\?:|[<>]=?)/)?"operator":(a=t.match(/^\$([\w]+)/))?c(e.variables,a[1],!e.lookupVariables):(a=t.match(/^\w+/))?/^(?:as|and|or|not|in|if)$/.test(a[0])?"keyword":null:(t.next(),null)}return{startState:function(){return{soyState:[],variables:i(null,"ij"),scopes:null,indent:0,quoteKind:null,context:null,lookupVariables:!0,localStates:[{mode:o.html,state:t.startState(o.html)}]}},copyState:function(e){return{tag:e.tag,soyState:e.soyState.concat([]),variables:e.variables,context:e.context,indent:e.indent,quoteKind:e.quoteKind,lookupVariables:e.lookupVariables,localStates:e.localStates.map((function(e){return{mode:e.mode,state:t.copyState(e.mode,e.state)}}))}},token:function(r,d){switch(s(d.soyState)){case"comment":if(r.match(/^.*?\*\//)?d.soyState.pop():r.skipToEnd(),!d.context||!d.context.scope)for(var y=/@param\??\s+(\S+)/g,h=r.current();f=y.exec(h);)d.variables=i(d.variables,f[1]);return"comment";case"string":var f;return(f=r.match(/^.*?(["']|\\[\s\S])/))?f[1]==d.quoteKind&&(d.quoteKind=null,d.soyState.pop()):r.skipToEnd(),"string"}if(!d.soyState.length||"literal"!=s(d.soyState)){if(r.match(/^\/\*/))return d.soyState.push("comment"),"comment";if(r.match(r.sol()?/^\s*\/\/.*/:/^\s+\/\/.*/))return"comment"}switch(s(d.soyState)){case"templ-def":return(f=r.match(/^\.?([\w]+(?!\.[\w]+)*)/))?(d.soyState.pop(),"def"):(r.next(),null);case"templ-ref":return(f=r.match(/(\.?[a-zA-Z_][a-zA-Z_0-9]+)+/))?(d.soyState.pop(),"."==f[0][0]?"variable-2":"variable"):(f=r.match(/^\$([\w]+)/))?(d.soyState.pop(),c(d.variables,f[1],!d.lookupVariables)):(r.next(),null);case"namespace-def":return(f=r.match(/^\.?([\w\.]+)/))?(d.soyState.pop(),"variable"):(r.next(),null);case"param-def":return(f=r.match(/^\*/))?(d.soyState.pop(),d.soyState.push("param-type"),"type"):(f=r.match(/^\w+/))?(d.variables=i(d.variables,f[0]),d.soyState.pop(),d.soyState.push("param-type"),"def"):(r.next(),null);case"param-ref":return(f=r.match(/^\w+/))?(d.soyState.pop(),"property"):(r.next(),null);case"open-parentheses":return r.match(/[)]/)?(d.soyState.pop(),null):m(r,d);case"param-type":var S=r.peek();return-1!="}]=>,".indexOf(S)?(d.soyState.pop(),null):"["==S?(d.soyState.push("param-type-record"),null):"("==S?(d.soyState.push("param-type-template"),null):"<"==S?(d.soyState.push("param-type-parameter"),null):(f=r.match(/^([\w]+|[?])/))?"type":(r.next(),null);case"param-type-record":return"]"==(S=r.peek())?(d.soyState.pop(),null):r.match(/^\w+/)?(d.soyState.push("param-type"),"property"):(r.next(),null);case"param-type-parameter":return r.match(/^[>]/)?(d.soyState.pop(),null):r.match(/^[<,]/)?(d.soyState.push("param-type"),null):(r.next(),null);case"param-type-template":return r.match(/[>]/)?(d.soyState.pop(),d.soyState.push("param-type"),null):r.match(/^\w+/)?(d.soyState.push("param-type"),"def"):(r.next(),null);case"var-def":return(f=r.match(/^\$([\w]+)/))?(d.variables=i(d.variables,f[1]),d.soyState.pop(),"def"):(r.next(),null);case"for-loop":return r.match(/\bin\b/)?(d.soyState.pop(),"keyword"):"$"==r.peek()?(d.soyState.push("var-def"),null):(r.next(),null);case"record-literal":return r.match(/^[)]/)?(d.soyState.pop(),null):r.match(/[(,]/)?(d.soyState.push("map-value"),d.soyState.push("record-key"),null):(r.next(),null);case"map-literal":return r.match(/^[)]/)?(d.soyState.pop(),null):r.match(/[(,]/)?(d.soyState.push("map-value"),d.soyState.push("map-value"),null):(r.next(),null);case"list-literal":return r.match("]")?(d.soyState.pop(),d.lookupVariables=!0,p(d),null):r.match(/\bfor\b/)?(d.lookupVariables=!0,d.soyState.push("for-loop"),"keyword"):m(r,d);case"record-key":return r.match(/[\w]+/)?"property":r.match(/^[:]/)?(d.soyState.pop(),null):(r.next(),null);case"map-value":return")"==r.peek()||","==r.peek()||r.match(/^[:)]/)?(d.soyState.pop(),null):m(r,d);case"import":return r.eat(";")?(d.soyState.pop(),d.indent-=2*e.indentUnit,null):r.match(/\w+(?=\s+as\b)/)?"variable":(f=r.match(/\w+/))?/\b(from|as)\b/.test(f[0])?"keyword":"def":(f=r.match(/^["']/))?(d.soyState.push("string"),d.quoteKind=f[0],"string"):(r.next(),null);case"tag":void 0===d.tag?(k=!0,E=""):E=(k="/"==d.tag[0])?d.tag.substring(1):d.tag;var x=a[E];if(r.match(/^\/?}/)){var g="/}"==r.current();return g&&!k&&p(d),"/template"==d.tag||"/deltemplate"==d.tag?(d.variables=i(null,"ij"),d.indent=0):d.indent-=e.indentUnit*(g||-1==n.indexOf(d.tag)?2:1),d.soyState.pop(),"keyword"}if(r.match(/^([\w?]+)(?==)/)){if(d.context&&d.context.tag==E&&"kind"==r.current()&&(f=r.match(/^="([^"]+)/,!1))){var b=f[1];d.context.kind=b;var v=o[b]||o.html;(j=s(d.localStates)).mode.indent&&(d.indent+=j.mode.indent(j.state,"","")),d.localStates.push({mode:v,state:t.startState(v)})}return"attribute"}return m(r,d);case"template-call-expression":return r.match(/^([\w-?]+)(?==)/)?"attribute":r.eat(">")||r.eat("/>")?(d.soyState.pop(),"keyword"):m(r,d);case"literal":return r.match("{/literal}",!1)?(d.soyState.pop(),this.token(r,d)):l(r,d,/\{\/literal}/);case"export":if(f=r.match(/\w+/)){if(d.soyState.pop(),"const"==f)return d.soyState.push("const-def"),"keyword";if("extern"==f)return d.soyState.push("param-def"),"keyword"}else r.next();return null;case"const-def":return r.match(/^\w+/)?(d.soyState.pop(),"def"):(r.next(),null)}if(r.match("{literal}"))return d.indent+=e.indentUnit,d.soyState.push("literal"),d.context=new u(d.context,"literal",d.variables),"keyword";if(f=r.match(/^\{([/@\\]?\w+\??)(?=$|[\s}]|\/[/*])/)){var w=d.tag;d.tag=f[1];var k="/"==d.tag[0],T=!!a[d.tag],E=k?d.tag.substring(1):d.tag;x=a[E];"/switch"!=d.tag&&(d.indent+=((k||x&&x.reduceIndent)&&"switch"!=w?1:2)*e.indentUnit),d.soyState.push("tag");var I=!1;if(x)if(k||x.soyState&&d.soyState.push(x.soyState),x.noEndTag||!T&&k){if(k){var U="extern"==E&&d.context&&"export"==d.context.tag;if(!d.context||d.context.tag!=E&&!U)I=!0;else if(d.context){var j;if(d.context.kind)d.localStates.pop(),(j=s(d.localStates)).mode.indent&&(d.indent-=j.mode.indent(j.state,"",""));p(d)}}}else d.context=new u(d.context,d.tag,x.variableScope?d.variables:null);else k&&(I=!0);return(I?"error ":"")+"keyword"}return r.eat("{")?(d.tag="print",d.indent+=2*e.indentUnit,d.soyState.push("tag"),"keyword"):!d.context&&r.sol()&&r.match(/import\b/)?(d.soyState.push("import"),d.indent+=2*e.indentUnit,"keyword"):(f=r.match("<{"))?(d.soyState.push("template-call-expression"),d.indent+=2*e.indentUnit,d.soyState.push("tag"),"keyword"):(f=r.match("</>"))?(d.indent-=1*e.indentUnit,"keyword"):l(r,d,/\{|\s+\/\/|\/\*/)},indent:function(a,n,r){var o=a.indent,l=s(a.soyState);if("comment"==l)return t.Pass;if("literal"==l)/^\{\/literal}/.test(n)&&(o-=e.indentUnit);else{if(/^\s*\{\/(template|deltemplate)\b/.test(n))return 0;/^\{(\/|(fallbackmsg|elseif|else|ifempty)\b)/.test(n)&&(o-=e.indentUnit),"switch"!=a.tag&&/^\{(case|default)\b/.test(n)&&(o-=e.indentUnit),/^\{\/switch\b/.test(n)&&(o-=e.indentUnit)}var i=s(a.localStates);return o&&i.mode.indent&&(o+=i.mode.indent(i.state,n,r)),o},innerMode:function(t){return t.soyState.length&&"literal"!=s(t.soyState)?null:s(t.localStates)},electricInput:/^\s*\{(\/|\/template|\/deltemplate|\/switch|fallbackmsg|elseif|else|case|default|ifempty|\/literal\})$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",useInnerComments:!1,fold:"indent"}}),"htmlmixed"),t.registerHelper("wordChars","soy",/[\w$]/),t.registerHelper("hintWords","soy",Object.keys(a).concat(["css","debugger"])),t.defineMIME("text/x-soy","soy")}));