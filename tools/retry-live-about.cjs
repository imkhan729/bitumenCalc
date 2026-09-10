const fs=require('fs');const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});const p=await b.newPage();
 await p.route('**/*',r=>r.request().url().startsWith('https://www.bitumencalc.com')?r.continue():r.abort());
 const checks=[];
 for(let i=0;i<3;i++){
 const r=await p.goto('https://www.bitumencalc.com/about-us/',{waitUntil:'networkidle'});
 const data=await p.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)).length,canonical:document.querySelector('link[rel="canonical"]')?.href}));
 const overflow=[];for(const width of [320,375,390,414,768,1280]){await p.setViewportSize({width,height:900});if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))overflow.push(width);}
 checks.push({status:r.status(),...data,overflow});
 }
 fs.writeFileSync('SEO-LIVE-ABOUT-RETRY.json',JSON.stringify(checks,null,2));console.log(JSON.stringify(checks));await b.close();
})().catch(e=>{console.error(e);process.exitCode=1});
