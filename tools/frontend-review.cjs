const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const routes=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const widths=[320,360,390,430,768,1024,1280,1440];
const mode=process.argv[2]||'baseline';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:4173')?r.continue():r.abort());
 const rows=[];
 for(const route of routes){
  const errors=[];const handler=e=>errors.push(e.message);page.on('pageerror',handler);
  const response=await page.goto('http://127.0.0.1:4173'+route);
  const file=path.join(root,route,'index.html'),html=fs.readFileSync(file,'utf8');
  const protectedData={metadata:html.match(/<meta\b[^>]*>|<title[^>]*>[\s\S]*?<\/title>|<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>/gi),schema:html.match(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi),links:[...html.matchAll(/<a\b[^>]*href="([^"]*)"/gi)].map(m=>m[1]),headings:html.match(/<h[123]\b[^>]*>[\s\S]*?<\/h[123]>/gi)};
  const ui=await page.evaluate(()=>({inputs:[...document.querySelectorAll('input,select')].map(e=>({id:e.id,type:e.type,value:e.value})),broken:[...document.querySelectorAll('a[href^="#"]')].map(e=>e.getAttribute('href')).filter(h=>h.length>1&&!document.getElementById(h.slice(1))),images:[...document.images].filter(e=>!e.width||!e.height).map(e=>e.src)}));
  const overflows=[];
  for(const width of widths){await page.setViewportSize({width,height:1000});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)){overflows.push({width,elements:await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&!e.closest('table')).slice(0,8).map(e=>({tag:e.tagName,cls:e.className,width:e.getBoundingClientRect().width})))});}}
  rows.push({route,status:response.status(),errors,overflows,...ui,protectedData});page.off('pageerror',handler);
  if(rows.length%10===0)console.log('Reviewed',rows.length);
 }
 await page.goto('http://127.0.0.1:4173/');
 await page.locator('#bc-consent button').first().click().catch(()=>{});
 for(const width of [390,1440]){await page.setViewportSize({width,height:1000});await page.screenshot({path:path.join(root,`FRONTEND-${mode}-${width}.png`),fullPage:true});}
 fs.writeFileSync(path.join(root,`FRONTEND-${mode}.json`),JSON.stringify(rows,null,2));
 console.log(JSON.stringify({pages:rows.length,failures:rows.filter(r=>r.status!==200||r.errors.length||r.overflows.length||r.broken.length).map(({protectedData,inputs,...r})=>r)},null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
