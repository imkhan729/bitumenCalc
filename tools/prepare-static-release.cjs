'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const release=path.join(os.tmpdir(),'bitumencalc-static-release-20260908');
const dirs=['about-us','assets','authors','blog','calculators','contact-us','css','disclaimer','editorial-policy','js','privacy-policy','terms-and-conditions'];
const files=['.htaccess','404.html','ads.txt','google5993f549b22db87c.html','index.html','robots.txt','sitemap.xml'];
// Explicit public-content allowlist: no GSC exports, credentials, authoring tools or local settings.
for(const target of [release,path.join(root,'hostinger-public'),path.join(root,'bitumencalc-hostinger-static')]){
 fs.mkdirSync(target,{recursive:true});
 for(const d of dirs)fs.cpSync(path.join(root,d),path.join(target,d),{recursive:true});
 for(const f of files)fs.copyFileSync(path.join(root,f),path.join(target,f));
}
const manifest=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name==='.git')continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else manifest.push({path:path.relative(release,full).replace(/\\/g,'/'),bytes:fs.statSync(full).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex')});}}
walk(release);
if(manifest.some(x=>/GSC|\.claude|settings\.local|seo-recovery-manifest/.test(x.path)))throw Error('Private or development content in release');
fs.writeFileSync(path.join(root,'SEO-RELEASE-MANIFEST.json'),JSON.stringify({release,files:manifest},null,2));
console.log(JSON.stringify({release,fileCount:manifest.length,htmlPages:manifest.filter(x=>x.path.endsWith('index.html')).length,bytes:manifest.reduce((n,x)=>n+x.bytes,0)}));
