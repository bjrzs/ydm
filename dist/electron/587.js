(global.webpackChunkmarktext=global.webpackChunkmarktext||[]).push([[587],{587:()=>{!function(t){function a(t){return RegExp("(^(?:"+t+"):[ \t]*(?![ \t]))[^]+","i")}t.languages.http={"request-line":{pattern:/^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:t.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[\d.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[\d.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[\d.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},header:{pattern:/^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,inside:{"header-value":[{pattern:a("Content-Security-Policy"),lookbehind:!0,alias:["csp","languages-csp"],inside:t.languages.csp},{pattern:a("Public-Key-Pins(?:-Report-Only)?"),lookbehind:!0,alias:["hpkp","languages-hpkp"],inside:t.languages.hpkp},{pattern:a("Strict-Transport-Security"),lookbehind:!0,alias:["hsts","languages-hsts"],inside:t.languages.hsts},{pattern:a("[^:]+"),lookbehind:!0}],"header-name":{pattern:/^[^:]+/,alias:"keyword"},punctuation:/^:/}}};var e,n,s,i=t.languages,p={"application/javascript":i.javascript,"application/json":i.json||i.javascript,"application/xml":i.xml,"text/xml":i.xml,"text/html":i.html,"text/css":i.css,"text/plain":i.plain},r={"application/json":!0,"application/xml":!0};for(var l in p)if(p[l]){e=e||{};var o=r[l]?(s=(n=l).replace(/^[a-z]+\//,""),"(?:"+n+"|\\w+/(?:[\\w.-]+\\+)+"+s+"(?![+\\w.-]))"):l;e[l.replace(/\//g,"-")]={pattern:RegExp("(content-type:\\s*"+o+"(?:(?:\r\n?|\n)[\\w-].*)*(?:\r(?:\n|(?!\n))|\n))[^ \t\\w-][^]*","i"),lookbehind:!0,inside:p[l]}}e&&t.languages.insertBefore("http","header",e)}(Prism)}}]);
//# sourceMappingURL=587.js.map