(global.webpackChunkmarktext=global.webpackChunkmarktext||[]).push([[83e3],{83e3:()=>{var e;(e=Prism).languages.erb={delimiter:{pattern:/^(\s*)<%=?|%>(?=\s*$)/,lookbehind:!0,alias:"punctuation"},ruby:{pattern:/\s*\S[\s\S]*/,alias:"language-ruby",inside:e.languages.ruby}},e.hooks.add("before-tokenize",(function(a){e.languages["markup-templating"].buildPlaceholders(a,"erb",/<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g)})),e.hooks.add("after-tokenize",(function(a){e.languages["markup-templating"].tokenizePlaceholders(a,"erb")}))}}]);
//# sourceMappingURL=83000.js.map