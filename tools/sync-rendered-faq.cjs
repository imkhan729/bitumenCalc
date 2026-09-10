'use strict';
// Read text through the HTML parser so entities and inline tags match rendered answers exactly.
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try {
  const page=await browser.newPage({javaScriptEnabled:false});
  await page.route('**/*',r=>r.abort());
  const files=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).map(p=>p==='/'?'index.html':p.slice(1)+'index.html');
  let updated=0;
  for(const file of files){
   const full=path.join(root,file);let html=fs.readFileSync(full,'utf8');if(!html.includes('class="faq-q"'))continue;
   await page.setContent(html,{waitUntil:'domcontentloaded'});
   const mainEntity=await page.locator('.faq-item').evaluateAll(es=>es.map(e=>({'@type':'Question',name:e.querySelector('.faq-q').textContent.replace(/\+\s*$/,'').replace(/\s+/g,' ').trim(),acceptedAnswer:{'@type':'Answer',text:e.querySelector('.faq-a').textContent.replace(/\s+/g,' ').trim()}})));
   if(!mainEntity.length)continue;
   let done=false;
   html=html.replace(/<script\b([^>]*type="application\/ld\+json"[^>]*)>([\s\S]*?)<\/script>/g,(whole,attrs,raw)=>{const data=JSON.parse(raw);if(data['@type']!=='FAQPage')return whole;if(done)return '';done=true;return `<script${attrs}>\n${JSON.stringify({...data,mainEntity},null,2)}\n</script>`;});
   if(!done)html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity})}</script>\n</head>`);
   fs.writeFileSync(full,html);updated++;
  }
  console.log(JSON.stringify({faqPagesSynced:updated}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
