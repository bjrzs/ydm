(global.webpackChunkmarktext=global.webpackChunkmarktext||[]).push([[33989],{33989:()=>{!function(e){function s(e,s){for(var a=0;a<s;a++)e=e.replace(/<self>/g,(function(){return"(?:"+e+")"}));return e.replace(/<self>/g,"[^\\s\\S]").replace(/<str>/g,'(?:@(?!")|"(?:[^\r\n\\\\"]|\\\\.)*"|@"(?:[^\\\\"]|""|\\\\[^])*"(?!")|\'(?:(?:[^\r\n\'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})\'|(?=[^\\\\](?!\'))))').replace(/<comment>/g,"(?:/(?![/*])|//.*[\r\n]|/\\*[^*]*(?:\\*(?!/)[^*]*)*\\*/)")}var a=s("\\((?:[^()'\"@/]|<str>|<comment>|<self>)*\\)",2),r=s("\\[(?:[^\\[\\]'\"@/]|<str>|<comment>|<self>)*\\]",2),t=s("\\{(?:[^{}'\"@/]|<str>|<comment>|<self>)*\\}",2),n=s("<(?:[^<>'\"@/]|<str>|<comment>|<self>)*>",2),l="(?:\\s(?:\\s*[^\\s>/=]+(?:\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))|(?=[\\s/>])))+)?",i="(?!\\d)[^\\s>/=$<%]+"+l+"\\s*/?>",o="\\B@?(?:<([a-zA-Z][\\w:]*)"+l+"\\s*>(?:[^<]|</?(?!\\1\\b)"+i+"|"+s("<\\1"+l+"\\s*>(?:[^<]|</?(?!\\1\\b)"+i+"|<self>)*</\\1\\s*>",2)+")*</\\1\\s*>|<"+i+")";e.languages.cshtml=e.languages.extend("markup",{});var g={pattern:/\S[\s\S]*/,alias:"language-csharp",inside:e.languages.insertBefore("csharp","string",{html:{pattern:RegExp(o),greedy:!0,inside:e.languages.cshtml}},{csharp:e.languages.extend("csharp",{})})};e.languages.insertBefore("cshtml","prolog",{"razor-comment":{pattern:/@\*[\s\S]*?\*@/,greedy:!0,alias:"comment"},block:{pattern:RegExp("(^|[^@])@(?:"+[t,"(?:code|functions)\\s*"+t,"(?:for|foreach|lock|switch|using|while)\\s*"+a+"\\s*"+t,"do\\s*"+t+"\\s*while\\s*"+a+"(?:\\s*;)?","try\\s*"+t+"\\s*catch\\s*"+a+"\\s*"+t+"\\s*finally\\s*"+t,"if\\s*"+a+"\\s*"+t+"(?:\\s*else(?:\\s+if\\s*"+a+")?\\s*"+t+")*"].join("|")+")"),lookbehind:!0,greedy:!0,inside:{keyword:/^@\w*/,csharp:g}},directive:{pattern:/^([ \t]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\s).*/m,lookbehind:!0,greedy:!0,inside:{keyword:/^@\w+/,csharp:g}},value:{pattern:RegExp("(^|[^@])@(?:await\\b\\s*)?(?:\\w+\\b|"+a+")(?:[?!]?\\.\\w+\\b|"+a+"|"+r+"|"+n+a+")*"),lookbehind:!0,greedy:!0,alias:"variable",inside:{keyword:/^@/,csharp:g}},"delegate-operator":{pattern:/(^|[^@])@(?=<)/,lookbehind:!0,alias:"operator"}}),e.languages.razor=e.languages.cshtml}(Prism)}}]);
//# sourceMappingURL=33989.js.map