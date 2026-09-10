const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const origin = 'https://www.bitumencalc.com';
const skip = new Set(['.git', 'hostinger-public', 'bitumencalc-hostinger-static', 'node_modules']);
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    if (skip.has(e.name)) continue;
    const p = path.join(dir,e.name);
    if(e.isDirectory()) walk(p);
    else if(e.name === 'index.html') files.push(p);
  }
}
walk(root);
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1].toLowerCase(),m[2]]));
const rows = files.map(file => {
  const html=fs.readFileSync(file,'utf8');
  const route='/'+path.relative(root,path.dirname(file)).split(path.sep).filter(Boolean).join('/')+(path.dirname(file)===root?'':'/');
  const tags=[...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(m=>attrs(m[0]));
  const schemas=[]; const errors=[];
  for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if(attrs(m[1]).type!=='application/ld+json') continue;
    try {schemas.push(JSON.parse(m[2]));} catch(e){errors.push(e.message);}
  }
  return {route,title:(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1],description:tags.find(t=>t.name==='description')?.content,canonicals:tags.filter(t=>t.rel==='canonical').map(t=>t.href),h1Count:[...html.matchAll(/<h1\b/gi)].length,robots:tags.find(t=>t.name==='robots')?.content||'',schemaCount:schemas.length,schemaErrors:errors,links:[...html.matchAll(/<a\b[^>]*>/gi)].map(m=>attrs(m[0]).href).filter(Boolean)};
});
const sitemap=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
const routes=new Set(rows.map(r=>r.route));
const broken=[];
for(const r of rows) for(const href of r.links) {
  let url; try {url=new URL(href,origin+r.route);} catch {continue;}
  if(url.origin!==origin) continue;
  const local=path.join(root,decodeURIComponent(url.pathname));
  if(!routes.has(url.pathname)&&!fs.existsSync(local)) broken.push({from:r.route,to:url.pathname});
}
const duplicates=key=>Object.entries(rows.reduce((groups,r)=>{(groups[r[key]] ||= []).push(r);return groups;},Object.create(null))).filter(([k,v])=>k!=='undefined'&&v.length>1).map(([value,v])=>({value,routes:v.map(r=>r.route)}));
const result={scope:'Source index.html files; generated release mirrors excluded. Schema parsing checks JSON syntax only; links check file/route existence, not fragments or Apache redirects.',pageCount:rows.length,sitemapCount:sitemap.length,missingFromSitemap:rows.filter(r=>!sitemap.includes(origin+r.route)).map(r=>r.route),sitemapMissingLocally:sitemap.filter(u=>!routes.has(new URL(u).pathname)),metadataIssues:rows.filter(r=>!r.title||!r.description||r.h1Count!==1||r.canonicals.length!==1||r.canonicals[0]!==origin+r.route||/noindex/i.test(r.robots)),schemaErrors:rows.filter(r=>r.schemaErrors.length),duplicateTitles:duplicates('title'),duplicateDescriptions:duplicates('description'),brokenLinks:broken,rows};
console.log(JSON.stringify(result,null,2));
