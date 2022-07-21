(function(n,p){typeof exports=="object"&&typeof module!="undefined"?p(exports,require("@swc/wasm"),require("path-browserify"),require("magic-string")):typeof define=="function"&&define.amd?define(["exports","@swc/wasm","path-browserify","magic-string"],p):(n=typeof globalThis!="undefined"?globalThis:n||self,p(n.BridgeSandbox={},n.init,n.pathBrowserify,n.MagicString))})(this,function(n,p,f,w){"use strict";function y(c){return c&&typeof c=="object"&&"default"in c?c:{default:c}}var h=y(p),v=y(w);function m(c,e,r=0){const s=new v.default(c),o=(t,a,i)=>s.overwrite(t-r,a-r,i),l=(t,a)=>s.slice(t-r,a-r),u=(t,a)=>s.appendRight(t-r,a);return e.forEach(t=>{if(t.type==="ExportDefaultDeclaration")o(t.span.start,t.span.end,`___module.exports.__default__ = ${l(t.decl.span.start,t.decl.span.end)}`);else if(t.type==="ExportDeclaration")o(t.span.start,t.span.end,l(t.declaration.span.start,t.declaration.span.end)),t.declaration.type==="ClassDeclaration"||t.declaration.type==="FunctionDeclaration"?u(t.span.end,`
___module.exports.${t.declaration.identifier.value} = ${t.declaration.identifier.value}`):t.declaration.type==="VariableDeclaration"&&t.declaration.declarations.forEach(a=>{u(t.span.end,`
___module.exports.${a.id.value} = ${a.id.value}`)});else if(t.type==="ImportDeclaration")if(t.specifiers.length===1&&t.specifiers[0].type==="ImportNamespaceSpecifier")o(t.span.start,t.span.end,`const ${t.specifiers[0].local.value} = await ___require(${t.source.raw})`);else{const a=[];t.specifiers.forEach(i=>{i.type==="ImportDefaultSpecifier"?a.push(`__default__: ${i.local.value}`):i.type==="ImportSpecifier"&&a.push(`${i.imported.value}: ${i.local.value}`)}),o(t.span.start,t.span.end,`const {${a.join(", ")}} = await ___require(${t.source.raw})`)}}),s.toString()}class ${constructor(){this.evaluatedModules=new Map,this.baseModules=new Map}async eval(e,r){const s=this.evaluatedModules.get(e);if(s)return s;const o=f.dirname(e);if(r||(r=await this.readFile(e).catch(()=>{})),!r)throw new Error(`File "${e}" not found`);await h.default;const{type:l,body:u}=p.parseSync(r,{syntax:e.endsWith(".js")?"ecmascript":"typescript",target:"es2022"}),t=u[0].span.start,a=m(r,u,t);let i=a;e.endsWith(".ts")&&(i=p.transformSync(a,{filename:f.basename(e),jsc:{parser:{syntax:"typescript"},target:"es2020"}}).code);const d={exports:{}};try{await this.run(i,{___module:d,___require:_=>this.require(_,o)})}catch(_){throw new Error(`Error in ${e}: ${_}`)}return this.evaluatedModules.set(e,d),d.exports}async require(e,r){const s=this.baseModules.get(e);if(s)return s;e.startsWith(".")&&(e=f.join(r,e));const o=[".ts",".js"];for(const l of o){const u=`${e}${l}`,t=await this.readFile(u).catch(()=>{});if(!!t)return await this.eval(u,t)}throw new Error(`Module "${e}" not found`)}async run(e,r){return new Function(...Object.keys(r),`return (async () => {
${e}
})()`)(...Object.values(r))}}n.Runtime=$,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
