(global.webpackChunkmarktext=global.webpackChunkmarktext||[]).push([[26141],{26141:()=>{!function(e){var a="(?:"+["[a-zA-Z_\\x80-\\uFFFF][\\w\\x80-\\uFFFF]*","-?(?:\\.\\d+|\\d+(?:\\.\\d*)?)",'"[^"\\\\]*(?:\\\\[^][^"\\\\]*)*"',"<(?:[^<>]|(?!\x3c!--)<(?:[^<>\"']|\"[^\"]*\"|'[^']*')+>|\x3c!--(?:[^-]|-(?!->))*--\x3e)*>"].join("|")+")",n={markup:{pattern:/(^<)[\s\S]+(?=>$)/,lookbehind:!0,alias:["language-markup","language-html","language-xml"],inside:e.languages.markup}};function t(e,n){return RegExp(e.replace(/<ID>/g,(function(){return a})),n)}e.languages.dot={comment:{pattern:/\/\/.*|\/\*[\s\S]*?\*\/|^#.*/m,greedy:!0},"graph-name":{pattern:t("(\\b(?:digraph|graph|subgraph)[ \t\r\n]+)<ID>","i"),lookbehind:!0,greedy:!0,alias:"class-name",inside:n},"attr-value":{pattern:t("(=[ \t\r\n]*)<ID>"),lookbehind:!0,greedy:!0,inside:n},"attr-name":{pattern:t("([\\[;, \t\r\n])<ID>(?=[ \t\r\n]*=)"),lookbehind:!0,greedy:!0,inside:n},keyword:/\b(?:digraph|edge|graph|node|strict|subgraph)\b/i,"compass-point":{pattern:/(:[ \t\r\n]*)(?:[ewc_]|[ns][ew]?)(?![\w\x80-\uFFFF])/,lookbehind:!0,alias:"builtin"},node:{pattern:t("(^|[^-.\\w\\x80-\\uFFFF\\\\])<ID>"),lookbehind:!0,greedy:!0,inside:n},operator:/[=:]|-[->]/,punctuation:/[\[\]{};,]/},e.languages.gv=e.languages.dot}(Prism)}}]);
//# sourceMappingURL=26141.js.map