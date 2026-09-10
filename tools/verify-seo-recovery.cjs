'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const origin=process.env.SEO_TEST_ORIGIN||'http://127.0.0.1:4173';
const {docs}=require('./seo-recovery-content.cjs');
let activeBrowser;
(async()=>{
 const browser=activeBrowser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage();
 await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 const routes=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
 const results=[];
 for(const route of routes){
  const errors=[];const handler=e=>errors.push(e.message);page.on('pageerror',handler);
  const response=await page.goto(origin+route,{waitUntil:'networkidle'});
  const data=await page.evaluate(()=>{
   const clean=s=>s.replace(/\s+/g,' ').trim();
   const schemas=[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent));
   const faq=schemas.filter(x=>x['@type']==='FAQPage').flatMap(x=>x.mainEntity||[]);
   const visibleFaq=[...document.querySelectorAll('.faq-item')].map(el=>({q:clean((el.querySelector('.faq-q')?.textContent||'').replace(/\+\s*$/,'')),a:clean(el.querySelector('.faq-a')?.textContent||'')}));
   const brokenFragments=[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1&&!document.getElementById(decodeURIComponent(h.slice(1))));
   const imageFailures=[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'));
   return {h1:document.querySelectorAll('h1').length,schemas:schemas.length,faqMismatch:faq.filter(x=>!visibleFaq.some(y=>y.q===clean(x.name)&&y.a===clean(x.acceptedAnswer.text))).map(x=>x.name),brokenFragments,imageFailures,articleWords:document.querySelector('article')?.textContent.trim().split(/\s+/).length||0,canonical:document.querySelector('link[rel=canonical]')?.href};
  });
  const overflow=[];
  for(const width of [320,375,390,414,768,1280]){await page.setViewportSize({width,height:900});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))overflow.push(width);}
  results.push({route,status:response.status(),errors,overflow,...data});page.off('pageerror',handler);
  if(results.length%10===0)console.log('Checked routes:',results.length);
 }
 fs.writeFileSync(path.join(root,'SEO-RECOVERY-BROWSER-QA.json'),JSON.stringify({origin,pages:results.length,results},null,2));
 console.log('Completed route checks:',results.length);
 // A meaningful regression fixture checks the displayed calculation against independent unit arithmetic.
 await page.goto(origin+'/calculators/square-feet-to-tons-calculator/');
 await page.fill('#length','50');await page.selectOption('#lengthUnit','ft');await page.fill('#width','20');await page.selectOption('#widthUnit','ft');await page.fill('#thickness','2');await page.selectOption('#thicknessUnit','in');await page.fill('#density','2322.677189');await page.selectOption('#densityUnit','kg/m3');await page.evaluate(()=>window.BitCalc.run());
 assert.match(await page.locator('#resWeight').innerText(),/10\.962/);
 assert.match(await page.locator('#resWeightSub').innerText(),/12\.083/);
 const text=await page.locator('table').first().innerText();assert.match(text,/12\.08/);assert.match(text,/82\.8/);assert.doesNotMatch(text,/8\.74/);
 for(const doc of docs){await page.goto(origin+'/blog/'+doc.slug+'/');const count=await page.locator('.faq-item').count();assert.equal(count,doc.faqs.length);await page.locator('.faq-q').first().click();assert.equal(await page.locator('.faq-item').first().evaluate(e=>e.classList.contains('open')),true);}
 const failures=results.filter(x=>x.status!==200||x.h1!==1||x.errors.length||x.overflow.length||x.faqMismatch.length||x.brokenFragments.length||x.imageFailures.length);
 const report={origin,pages:results.length,failures,results};
 fs.writeFileSync(path.join(root,'SEO-RECOVERY-BROWSER-QA.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify({pages:results.length,failures,arithmetic:'PASS: 1,000 ft² at 2 in and 145 lb/ft³ = 12.083 short tons / 10.962 t; reference table agrees',articleFaqs:'PASS'},null,2));
 await page.screenshot({path:path.join(root,'SEO-RECOVERY-MOBILE.png'),fullPage:true});
 await browser.close();if(failures.length)process.exitCode=1;
})().catch(async e=>{console.error(e);if(activeBrowser)await activeBrowser.close();process.exitCode=1;});
