(global.webpackChunkmarktext=global.webpackChunkmarktext||[]).push([[26280],{26280:()=>{!function(a){var e=/(?:\b[a-zA-Z]\w*|[|\\[\]])+/.source;a.languages.phpdoc=a.languages.extend("javadoclike",{parameter:{pattern:RegExp("(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:"+e+"\\s+)?)\\$\\w+"),lookbehind:!0}}),a.languages.insertBefore("phpdoc","keyword",{"class-name":[{pattern:RegExp("(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)"+e),lookbehind:!0,inside:{keyword:/\b(?:array|bool|boolean|callback|double|false|float|int|integer|mixed|null|object|resource|self|string|true|void)\b/,punctuation:/[|\\[\]()]/}}]}),a.languages.javadoclike.addSupport("php",a.languages.phpdoc)}(Prism)}}]);
//# sourceMappingURL=26280.js.map