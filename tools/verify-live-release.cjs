const fs=require('node:fs'),crypto=require('node:crypto');
const origin='https://www.bitumencalc.com';
(async()=>{
 const manifest=JSON.parse(fs.readFileSync('SEO-RELEASE-MANIFEST.json','utf8'));
 const targets=manifest.files.filter(x=>x.path!=='.htaccess');
 const results=[];
 for(let i=0;i<targets.length;i+=6) await Promise.all(targets.slice(i,i+6).map(async f=>{
  const route=f.path==='index.html'?'/':f.path.endsWith('/index.html')?'/'+f.path.slice(0,-10):'/'+f.path;
  try {const r=await fetch(origin+route);const b=Buffer.from(await r.arrayBuffer());const local=fs.readFileSync(f.path);const same=crypto.createHash('sha256').update(b).digest('hex')===f.sha256;
  results.push({route,status:r.status,match:same||b.toString().replace(/\r\n/g,'\n')===local.toString().replace(/\r\n/g,'\n'),noindex:/noindex/i.test(r.headers.get('x-robots-tag')||'')||(/\.html$/.test(f.path)&&/<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex)/i.test(b.toString()))});}catch(e){results.push({route,error:e.message});}
 }));
 const redirects=[];
 for(const route of ['/index.html','/index','/blog/how-to-calculate-quantity-of-bitumen-for-road/','/blog/modified-bitumen-roof-calculator/','/seo-test-nonexistent-20260908/']){const r=await fetch(origin+route,{redirect:'manual'});redirects.push({route,status:r.status,location:r.headers.get('location')});}
 const report={checkedAt:new Date().toISOString(),files:results.length,failures:results.filter(x=>!x.match||(x.noindex&&x.route!=='/404.html')||(x.status!==200&&x.route!=='/404.html')),redirects,results};
 fs.writeFileSync('SEO-LIVE-RELEASE-QA.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({...report,results:undefined},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
