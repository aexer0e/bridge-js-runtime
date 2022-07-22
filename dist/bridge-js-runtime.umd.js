(function(r,p){typeof exports=="object"&&typeof module!="undefined"?p(exports,require("@swc/wasm-web"),require("path-browserify"),require("magic-string")):typeof define=="function"&&define.amd?define(["exports","@swc/wasm-web","path-browserify","magic-string"],p):(r=typeof globalThis!="undefined"?globalThis:r||self,p(r.BridgeJsRuntime={},r.init,r.pathBrowserify,r.MagicString))})(this,function(r,p,d,w){"use strict";function h(l){return l&&typeof l=="object"&&"default"in l?l:{default:l}}var v=h(p),y=h(w);function $(l,t,a=0){const i=new y.default(l),n=(e,s,f)=>i.overwrite(e-a,s-a,f),o=(e,s)=>i.slice(e-a,s-a);let u="";return t.forEach(e=>{if(e.type==="ExportDefaultDeclaration")n(e.span.start,e.span.end,`
___module.__default__ = ${o(e.decl.span.start,e.decl.span.end)};`);else if(e.type==="ExportDefaultExpression")n(e.span.start,e.span.end,`
___module.__default__ = ${o(e.expression.span.start,e.expression.span.end)};`);else if(e.type==="ExportDeclaration")n(e.span.start,e.span.end,o(e.declaration.span.start,e.declaration.span.end)),e.declaration.type==="ClassDeclaration"||e.declaration.type==="FunctionDeclaration"?u+=`
___module.${e.declaration.identifier.value} = ${e.declaration.identifier.value};`:e.declaration.type==="VariableDeclaration"&&e.declaration.declarations.forEach(s=>{u+=`
___module.${s.id.value} = ${s.id.value};`});else if(e.type==="ExportNamedDeclaration"){let s="";for(const{orig:f,exported:c}of e.specifiers)c.value==="default"?s+=`
___module.__default__ = ${f.value};`:s+=`
___module.${c.value} = ${f.value};`;n(e.span.start,e.span.end,s)}else if(e.type==="ImportDeclaration")if(e.specifiers.length===1&&e.specifiers[0].type==="ImportNamespaceSpecifier")n(e.span.start,e.span.end,`
const ${e.specifiers[0].local.value} = await ___require(${e.source.raw});`);else{const s=[];e.specifiers.forEach(c=>{c.type==="ImportDefaultSpecifier"?s.push(`__default__: ${c.local.value}`):c.type==="ImportSpecifier"&&s.push(`${c.imported.value}: ${c.local.value}`)});const f=s.length===0?`
await ___require(${e.source.raw});`:`
const {${s.join(", ")}} = await ___require(${e.source.raw});`;n(e.span.start,e.span.end,f)}}),i.toString()+u}class g{constructor(t){if(this.evaluatedModules=new Map,this.baseModules=new Map,this.env={},t)for(const[a,i]of t)this.registerModule(a,i)}async run(t,a={},i){return this.env=a,await this.eval(t,i)}clearCache(){this.evaluatedModules.clear()}registerModule(t,a){this.baseModules.set(t,a)}async eval(t,a){const i=this.evaluatedModules.get(t);if(i)return i;const n=d.dirname(t),o=t.endsWith(".js")?"ecmascript":"typescript";if(a||(a=await this.readFile(t).catch(()=>{})),!a)throw new Error(`File "${t}" not found`);if(r.loadedWasm===null)throw new Error("You must call initRuntimes() before using the runtime");await r.loadedWasm;let u=p.minifySync(p.transformSync(a,{filename:d.basename(t),jsc:{parser:{syntax:o,preserveAllComments:!1,topLevelAwait:!0},target:"es2020"}}).code,{compress:!1,mangle:!1,format:{beautify:!0}}).code;const{type:e,body:s}=p.parseSync(u,{syntax:o,target:"es2022"}),f=s[0].span.start,c=$(u,s,f),_={};try{await this.runSrc(c,Object.assign({},this.env,{___module:_,___require:m=>this.require(m,n)}))}catch(m){throw new Error(`Error in ${t}: ${m}`)}return this.evaluatedModules.set(t,_),_}async require(t,a){const i=this.baseModules.get(t);if(i)return i;if(t.startsWith("https://")){const u=await(await fetch(t)).text();return this.eval(t,u)}t.startsWith(".")&&(t=d.join(a,t));const n=[".ts",".js"];for(const o of n){const u=`${t}${o}`,e=await this.readFile(u).catch(()=>{});if(!!e)return await this.eval(u,e)}throw new Error(`Module "${t}" not found`)}async runSrc(t,a){return new Function(...Object.keys(a),`return (async () => {
${t}
})()`)(...Object.values(a))}}r.loadedWasm=null;function M(l){r.loadedWasm=v.default(l).then(()=>null)}r.Runtime=g,r.initRuntimes=M,Object.defineProperties(r,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
