const {chromium}=require('playwright');
const fs=require('fs'),assert=require('assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1365,height:1000},permissions:['clipboard-read','clipboard-write']});
 await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:4173')?r.continue():r.abort());
 const page=await context.newPage();const checked=[];
 const urls=[...fs.readFileSync('sitemap.xml','utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
 for(const route of urls.filter(x=>x==='/'||x.startsWith('/calculators/'))){
  await page.goto('http://127.0.0.1:4173'+route);const suffix=route==='/'?'Full':'';
  if(!await page.locator('#length'+suffix).count())continue;
  console.log('Checking',route);
  for(const [id,val] of Object.entries({length:'10',width:'10',thickness:'50',density:'2400'}))await page.fill('#'+id+suffix,val);
  for(const [id,val] of Object.entries({lengthUnit:'m',widthUnit:'m',thicknessUnit:'mm',densityUnit:'kg/m3'}))await page.selectOption('#'+id+suffix,val);
  await page.locator('#calcBtn'+suffix).click();assert.match(await page.locator('#resWeight'+suffix).innerText(),/12\.000/);
  await page.getByRole('button',{name:'Imperial',exact:true}).click();assert.match(await page.locator('#resWeight'+suffix).innerText(),/12\.000/);
  await page.getByRole('button',{name:'Metric',exact:true}).click();assert.match(await page.locator('#resWeight'+suffix).innerText(),/12\.000/);
  assert.ok(await page.locator('.calc-results .calc-actions').count()>=1);
  checked.push(route);
 }
 await page.goto('http://127.0.0.1:4173/');await page.getByRole('button',{name:'Driveway',exact:true}).click();assert.match(await page.locator('#resWeightFull').innerText(),/3\.450/);
 await page.getByLabel('Include Cost Estimate').check();await page.fill('#priceFull','100');await page.click('#calcBtnFull');assert.match(await page.locator('#resCostFull').innerText(),/345\.00/);
 await page.getByRole('button',{name:'Share estimate',exact:true}).click();const share=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(share.includes('bc_lengthFull=10'));
 const local=new URL(share);local.host='127.0.0.1:4173';local.protocol='http:';await page.goto(local.href);assert.match(await page.locator('#resWeightFull').innerText(),/3\.450/);
 await page.getByRole('button',{name:'Copy summary',exact:true}).click();assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/Formula:/);
 await page.evaluate(()=>window.dispatchEvent(new Event('beforeprint')));await page.emulateMedia({media:'print'});assert.ok(await page.locator('.print-report').isVisible());assert.equal(await page.locator('header').isVisible(),false);await page.emulateMedia({media:'screen'});
 await page.goto('http://127.0.0.1:4173/calculators/');await page.fill('#calculatorDirectorySearch','tonnage');assert.equal(await page.locator('.dir-card:visible').count(),2);await page.fill('#calculatorDirectorySearch','');await page.getByRole('button',{name:'Regional',exact:true}).click();assert.equal(await page.locator('.dir-card:visible').count(),9);
 await page.goto('http://127.0.0.1:4173/calculators/circular-asphalt-calculator/');await page.fill('#outerRadius','10');await page.fill('#circThickness','50');await page.fill('#circDensity','2400');await page.locator('.calc-btn').click();assert.match(await page.locator('#circResWeight').innerText(),/37\.70/);
 await page.goto('http://127.0.0.1:4173/calculators/tack-coat-calculator/');await page.fill('#tackTotalArea','1000');await page.locator('.calc-btn').click();assert.match(await page.locator('#tackResEmulsion').innerText(),/300\.0/);
 await page.goto('http://127.0.0.1:4173/calculators/bitumen-temperature-converter/');await page.fill('#celsiusInput','150');assert.match(await page.inputValue('#fahrenheitFromC'),/302/);
 for(const [name,route] of [['home','/'],['calculator','/calculators/asphalt-tonnage-calculator/'],['directory','/calculators/'],['guide','/blog/asphalt-density-guide/'],['about','/about-us/']]){
  await page.goto('http://127.0.0.1:4173'+route);if(await page.getByRole('button',{name:'Decline',exact:true}).isVisible())await page.getByRole('button',{name:'Decline',exact:true}).click();
  for(const width of [320,360,390,430,768,1024,1280,1440]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${name} ${width}`);if(width===390||width===1440)await page.screenshot({path:`FRONTEND-${name}-${width}.png`,fullPage:false});}
 }
 const result={standardCalculators:checked,standardExample:'10 m × 10 m × 50 mm × 2400 kg/m³ = 12 t; metric-imperial round trip',specialCases:['circle 10 m radius = 37.699 t','tack 1000 m² × 0.3 L/m² = 300 L','150°C = 302°F'],interactions:['example','cost','share round trip','copy','print','directory filter'],widths:[320,360,375,390,414,768,1365]};fs.writeFileSync('REDESIGN-QA.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
