const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage();
 await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:4173')?r.continue():r.abort());
 const urls=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
 const results=[];
 for(const url of urls){
  const errors=[];const onError=e=>errors.push(e.message);page.on('pageerror',onError);
  await page.goto('http://127.0.0.1:4173'+url);
  const overflow=[];
  for(const width of [320,375,390,414,768,1280]){
   await page.setViewportSize({width,height:900});
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)) overflow.push(width);
  }
  const schema=await page.locator('script[type="application/ld+json"]').evaluateAll(es=>es.map(e=>JSON.parse(e.textContent)['@type']));
  results.push({url,errors,overflow,schema});page.off('pageerror',onError);
 }
 console.log(JSON.stringify({pages:results.length,failures:results.filter(r=>r.errors.length||r.overflow.length)},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
