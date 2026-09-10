'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const {docs,table,nist}=require('./seo-recovery-content.cjs');
const root=path.resolve(__dirname,'..'), origin='https://www.bitumencalc.com', date='2026-09-08';
const backup=path.join(os.tmpdir(),'bitumencalc-before-seo-20260908');
const touched=new Set();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
function write(p,text){const old=read(p);if(old===text)return;const b=path.join(backup,p);if(!fs.existsSync(b)){fs.mkdirSync(path.dirname(b),{recursive:true});fs.copyFileSync(path.join(root,p),b);}fs.writeFileSync(path.join(root,p),text);touched.add(p);}
const plain=s=>s.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&mdash;/g,'—').replace(/&ndash;/g,'–').replace(/&sup2;/g,'²').replace(/&sup3;/g,'³').replace(/&times;/g,'×').replace(/&divide;/g,'÷').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
function metadata(html,title,description){
 if(title)html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(title)}</title>`).replace(/(<meta\s+(?:property|name)="(?:og:title|twitter:title)"\s+content=")[^"]*/g,`$1${esc(title)}`);
 if(description)html=html.replace(/(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*/g,`$1${esc(description)}`);
 return html;
}
function block(html,id,content){
 const wrapped=`<!-- SEO-RECOVERY:${id} -->\n${content}\n<!-- /SEO-RECOVERY:${id} -->`;
 const re=new RegExp(`<!-- SEO-RECOVERY:${id} -->[\\s\\S]*?<!-- /SEO-RECOVERY:${id} -->`);
 if(re.test(html))return html.replace(re,wrapped);
 return html.replace(/<\/main>/,wrapped+'\n</main>');
}
const section=(id,title,body)=>`<section class="section section-alt seo-answer" id="${id}"><div class="container container-sm"><h2 style="color:var(--text)">${title}</h2>${body}</div></section>`;
// Replace only article content; retain the existing hero image, navigation and sidebars.
for(const doc of docs){
 const p=`blog/${doc.slug}/index.html`;let html=read(p);
 const article=html.match(/<article class="article-card">([\s\S]*?)<\/article>/);
 if(!article)throw Error(`Missing article: ${p}`);
 const figure=article[1].match(/<figure\b[\s\S]*?<\/figure>/)?.[0]||'';
 const toc=`<nav class="article-toc" aria-label="On this page"><strong>On this page</strong><ul>${doc.toc.map(([id,t])=>`<li><a href="#${id}">${t}</a></li>`).join('')}<li><a href="#questions">Questions and answers</a></li></ul></nav>`;
 const faq=`<h2 id="questions" style="color:var(--text)">Questions and answers</h2><div class="faq-list">${doc.faqs.map(([q,a])=>`<div class="faq-item"><button type="button" class="faq-q">${esc(q)} <span class="faq-icon">+</span></button><div class="faq-a"><p>${esc(a)}</p></div></div>`).join('')}</div>`;
 html=html.replace(article[0],`<article class="article-card"><p class="answer-summary">${doc.answer}</p>${toc}${figure}${doc.body}${faq}</article>`);
 html=metadata(html,doc.title,doc.description).replace(/<h1[^>]*>[\s\S]*?<\/h1>/,`<h1 style="color:#fff">${doc.h1}</h1>`);
 html=html.replace(/(<div class="[^"]*page-hero-inner[^"]*"[\s\S]*?<p>)[\s\S]*?<\/p>/,`$1${doc.answer}</p>`);
 html=html.replace(/Last reviewed <time datetime="[^"]*">[^<]*<\/time>/g,`Updated <time datetime="${date}">8 September 2026</time>`);
 html=html.replace(/("dateModified"\s*:\s*")[^"]*/g,`$1${date}`);
 write(p,html);
 console.log('Article prepared:',p);
}
// Correct a reference table that contradicted the page's own formula and calculator.
{
 const p='calculators/square-feet-to-tons-calculator/index.html';let html=read(p);
 const start=html.indexOf('<h2>Tons per 1,000 Square Feet</h2>');if(start<0)throw Error('Missing conversion table');
 const end=html.indexOf('</table>',start)+8;
 const rows=table('Asphalt quantity at exactly 145 lb/ft³; before allowance',['Thickness','Metric tonnes / 1,000 ft²','US short tons / 1,000 ft²','ft² per US short ton'],[1.5,2,2.5,3,4].map(d=>[`${d} in (${(d*25.4).toFixed(1)} mm)`,(1000*d/12*145*.45359237/1000).toFixed(2),(1000*d/12*145/2000).toFixed(2),(2000/(d/12*145)).toFixed(1)]));
 // Leave the section-header wrapper intact.
 html=html.slice(0,start)+'<h2>Tons per 1,000 Square Feet</h2><p>Calculated at 145 lb/ft³ (approximately 2,322.68 kg/m³). Short tons and metric tonnes are listed separately.</p></div>'+rows+html.slice(end);
 html=html.replace(/~0\.0606 tons per sq ft per inch/g,'0.0060417 US short tons per sq ft per inch');
 html=html.replace(/1 ton of standard HMA covers approximately 80–120 sq ft at 2–3 in thick\./g,'At 145 lb/ft³, one US short ton covers about 82.8 sq ft at 2 inches or 55.2 sq ft at 3 inches.');
 html=html.replace(/The most searched asphalt calculation in the US — /g,'A practical conversion for ');
 html=html.replace(/Add 5–8% waste = order <strong>12\.7 tons<\/strong>\./g,'An illustrative 5% allowance gives <strong>12.69 US short tons</strong>; choose an allowance for the actual job.');
 html=html.replace(/If a plant quotes in metric tonnes, divide the short ton result from this calculator by 1\.102 to get the equivalent metric tonne order\./g,'The calculator shows metric tonnes (t) as its main result and US short tons below it. One US short ton equals 0.90718474 metric tonnes. Use the unit your supplier quotes.');
 html=html.replace(/<div class="faq-a"><p>Yes — industry standard practice is to add 5–10%[\s\S]*?<\/p><\/div>/g,'<div class="faq-a"><p>Choose an allowance for measured irregularities, trimming and delivery planning with your installer. For example, a 5% allowance multiplies the calculated mass by 1.05. The calculator already uses compacted thickness and density, so do not add a second blanket compaction multiplier. Keep the allowance separate from the calculated weight.</p></div>');
 html=block(html,'square-foot-answer',section('coverage-per-ton','How many square feet does a ton of asphalt cover?',`<p>At 145 lb/ft³, a US short ton covers <strong>82.8 ft² at 2 inches</strong>. A metric tonne covers about 91.2 ft² at the same depth and density. The unit, compacted depth and density must accompany every coverage figure.</p><div class="formula-inline">Area (ft²) = US short tons × 2,000 ÷ [density (lb/ft³) × depth (in) ÷ 12]</div><p>For 1,000 ft² at 2 inches, the result is <strong>12.083 short tons or 10.962 metric tonnes</strong> before allowance. Read the main calculator's t value as metric tonnes; its secondary weight states US short tons. For density selection see the <a href="/blog/asphalt-density-guide/">asphalt density guide</a>; for volume conversions see <a href="/blog/tons-of-asphalt-per-cubic-yard/">tons per cubic yard</a>.</p>`));
 write(p,html);
}
const additions={
 'index.html':['bitumen-answer','What does a bitumen calculator calculate?',`<p>This bitumen calculator estimates the <strong>whole asphalt mixture first</strong>, then splits that weight into binder and aggregate using your chosen binder percentage. It uses length, width, compacted depth and mix density. Liquid bitumen, tack coat emulsion and finished asphalt are different materials.</p><div class="formula-inline">Mix mass = length × width × compacted depth × mix density<br>Binder mass = mix mass × binder percentage ÷ 100</div><p>For example, 100 m² at 50 mm and 2,400 kg/m³ needs 12 metric tonnes of mixture. At an assumed 5% binder content by total mix mass, that contains 600 kg of binder and 11,400 kg of aggregate. Use the specified mix design percentage; this calculation is not a mix-design test.</p><p>Choose <a href="/calculators/bitumen-square-meters-calculator/">m² to tonnes and one-tonne coverage</a> for metric area conversion, <a href="/calculators/square-feet-to-tons-calculator/">square feet to US short tons</a> for imperial takeoffs, or the <a href="/calculators/tack-coat-calculator/">tack coat calculator</a> for emulsion volume. Read the <a href="/blog/asphalt-density-guide/">density guide</a> and <a href="/blog/asphalt-thickness-guide/">compacted thickness guide</a> when choosing inputs.</p>`],
 'calculators/bitumen-square-meters-calculator/index.html':['metric-answer','How many m² does 1 ton of asphalt cover?',`<p><strong>One metric tonne covers 8.333 m² at 50 mm</strong> when density is 2,400 kg/m³. One US short ton covers 7.560 m² with those same inputs. “Ton” must be defined before comparing estimates. Use the coverage converter above for both directions.</p><div class="formula-inline">Area (m²) = mass (kg) ÷ [density (kg/m³) × depth (mm) ÷ 1,000]<br>Metric tonnes = area (m²) × depth (mm) × density (kg/m³) ÷ 1,000,000</div>${table('One metric tonne at 2,400 kg/m³',['Compacted depth','m² covered'],[25,40,50,60,75,100].map(d=>[`${d} mm`,(1000/(2400*d/1000)).toFixed(3)]))}<p>For example, 75 m² at 40 mm needs 7.2 metric tonnes before allowance. Area alone cannot be converted into mass without thickness and density. Use the <a href="/blog/asphalt-density-guide/">density conversion table</a> to match the material, and <a href="/blog/asphalt-thickness-guide/">the layer-depth guide</a> to distinguish a finished layer from loose material.</p>`],
 'calculators/asphalt-millings-calculator/index.html':['millings-answer','Asphalt millings coverage: match density to condition',`<p>At an illustrative 125 lb/ft³, one US short ton of millings covers 48 ft² at 4 inches. That value applies only when your density and depth describe the same material condition. Use the supplier's loose density with loose volume, or compacted density with finished layer volume.</p><p>The <a href="/blog/asphalt-millings-calculator-guide/">millings coverage guide</a> provides a depth table, a 720 ft² driveway example and delivery checks. For mass-to-volume conversion use the <a href="/blog/tons-of-asphalt-per-cubic-yard/">cubic yards to tons guide</a>. No universal compaction factor or local material price is assumed.</p>`],
 'calculators/asphalt-thickness-calculator/index.html':['thickness-answer','Estimate a specified layer, then check the design',`<p>At a fixed area and density, a 3-inch layer needs 50% more material than a 2-inch layer. Enter the specified compacted thickness for each lift. The calculator estimates quantities; it cannot determine whether a pavement will support a particular traffic load.</p><p>Read the <a href="/blog/asphalt-thickness-guide/">asphalt thickness and lift guide</a> for a two-layer worked example, aggregate-size context and depth-measurement checks. Use the <a href="/blog/asphalt-density-guide/">density guide</a> to keep density and placement condition consistent.</p>`],
 'calculators/asphalt-tonnage-calculator/index.html':['tonnage-answer','Asphalt tonnage from area, thickness and density',`<p>For a specified finished layer, multiply area by compacted thickness and mix density. At 2,400 kg/m³, 100 m² at 50 mm needs 12 metric tonnes before allowance. The main result is metric tonnes, with US short tons identified separately.</p><p>If your takeoff starts with volume, see <a href="/blog/tons-of-asphalt-per-cubic-yard/">tons of asphalt per cubic yard</a>. Read <a href="/blog/asphalt-density-guide/">the density guide</a> for unit conversions and <a href="/blog/asphalt-thickness-guide/">the thickness guide</a> for separate lift calculations.</p>`],
 'calculators/bitumen-square-yards-calculator/index.html':['yards-answer','Square yards to tons of asphalt',`<p>Square yards measure area, while tons measure mass. At 145 lb/ft³ and 2 inches, one square yard requires 0.10875 US short tons. Thus 100 yd² needs 10.875 short tons, or about 9.866 metric tonnes, before an allowance.</p><div class="formula-inline">US short tons = area (yd²) × 9 × depth (in) ÷ 12 × density (lb/ft³) ÷ 2,000</div><p>A square yard is 9 square feet; a cubic yard is 27 cubic feet. Use the <a href="/blog/tons-of-asphalt-per-cubic-yard/">cubic-yard conversion guide</a> when volume, rather than area, is known. This distinction prevents a threefold conversion error.</p>`],
 'calculators/bitumen-temperature-converter/index.html':['temperature-answer','Convert bitumen temperature without changing its specification',`<p>Use °F = (°C × 9/5) + 32, or °C = (°F − 32) × 5/9. For example, 150°C is 302°F, and 300°F is about 148.9°C. These are unit conversions, not recommended heating or application temperatures.</p><p>Follow the product data sheet and project specification for storage, mixing and application limits. Modified binders and emulsions can have different requirements. For volume-to-mass estimates, consult <a href="/blog/bitumen-density-volume-cargo-calculations/">bitumen density at the reference temperature</a>; a temperature converter does not correct tank volume for thermal expansion.</p>`],
 'blog/tack-coat-calculator-guide/index.html':['tack-guide-answer','Tack coat spray rate: which quantity is specified?',`<p>Record whether your specified rate refers to sprayed emulsion or residual binder. Emulsion quantity in litres equals area in m² multiplied by the specified spray rate in L/m². For example, 1,000 m² at 0.30 L/m² requires 300 L of sprayed emulsion.</p><p>Do not substitute a residual rate directly into a total-emulsion field. Use the project's approved conversion for emulsion content, dilution and density. A product's residue percentage is often mass-based, so litres multiplied by that percentage are only an approximation of residual volume.</p><p>Use the <a href="/calculators/tack-coat-calculator/">tack coat quantity calculator</a> for the measured area and approved spray rate. Consult <a href="https://dot.ca.gov/-/media/dot-media/programs/construction/documents/construction-standards/hma-intelligent-compaction-construction/minimum-tack-coat-spray-rates.pdf">Caltrans' spray-rate calculation guidance</a> as an example of why specifications distinguish rate bases; use the authority and product instructions applicable to your project.</p>`],
 'calculators/tack-coat-calculator/index.html':['tack-rate-answer','Use an approved emulsion spray rate',`<p>This calculator multiplies area by the <strong>total emulsion spray rate</strong> in L/m². It does not select a design rate. The residual output is an approximate volume based on the entered percentage; residue specified by mass needs product-specific density conversion before comparison with a mass-based requirement.</p><p>For 1,000 m² at 0.30 L/m², spray volume is 300 L. Use the <a href="/blog/tack-coat-calculator-guide/">tack coat rate and dilution guide</a> to check the basis. Do not dilute an emulsion unless its supplier and project specification permit it.</p>`],
 'calculators/index.html':['directory-intent','Choose a calculator by the quantity you know',`<p>Use the <a href="/">bitumen calculator</a> for total mix, binder and aggregate mass. Choose <a href="/calculators/square-feet-to-tons-calculator/">square feet to tons</a> or <a href="/calculators/bitumen-square-meters-calculator/">m² to tonnes</a> for area conversion. Choose <a href="/calculators/tack-coat-calculator/">tack coat</a> for emulsion volume, or <a href="/calculators/asphalt-millings-calculator/">millings</a> for recycled material.</p><p>Before calculating, check <a href="/blog/asphalt-density-guide/">material density</a>, <a href="/blog/asphalt-thickness-guide/">finished depth</a> and <a href="/blog/tons-of-asphalt-per-cubic-yard/">the difference between tons and cubic yards</a>.</p>`],
 'blog/index.html':['guide-directory','Measurement guides for asphalt estimates',`<p>Start with <a href="/blog/asphalt-density-guide/">asphalt density and unit conversions</a>, then check <a href="/blog/asphalt-thickness-guide/">compacted thickness and lifts</a>. For volume-based orders, read <a href="/blog/tons-of-asphalt-per-cubic-yard/">tons per cubic yard</a>. For recycled material, use <a href="/blog/asphalt-millings-calculator-guide/">millings coverage per ton</a>. Each guide states its assumptions and links to the relevant calculation tool.</p>`]
};
for(const [p,[id,title,body]] of Object.entries(additions))write(p,block(read(p),id,section(id,title,body)));
const meta={
 'index.html':['Bitumen Calculator: Asphalt, Binder & Aggregate Quantity','Calculate asphalt mix, bitumen binder and aggregate quantities from area, compacted depth and density. Get metric tonnes, US short tons and material cost.'],
 'calculators/bitumen-square-meters-calculator/index.html':['Asphalt m² to Tonnes Calculator & 1 Ton Coverage','Convert asphalt square metres to tonnes or tonnes to m² using depth and density. Compare metric tonnes and US short tons with formulas and worked examples.'],
 'calculators/asphalt-repair-calculator/index.html':['Asphalt Repair Calculator: Pothole, Patch & Overlay',null],
 'blog/bitumen-spray-rate-chip-seal/index.html':['Bitumen Spray Rate for Chip Seal: Calculation Guide',null],
 'blog/bitumen-density-volume-cargo-calculations/index.html':['Bitumen Density: Volume, Mass & Temperature Guide',null],
 'blog/tack-coat-calculator-guide/index.html':['Tack Coat Application Rate: Emulsion & Residual Guide',null],
 'calculators/index.html':['Asphalt Calculator Directory: Choose a Quantity Tool',null],
 'about-us/index.html':[null,'Learn about BitumenCalc, its free asphalt and bitumen quantity tools, calculation methods, editorial approach and contact details.'],
 'editorial-policy/index.html':[null,'Read how BitumenCalc sources, checks and updates calculator guidance, explains assumptions, and handles corrections to technical content.']
};
for(const [p,[title,description]] of Object.entries(meta))write(p,metadata(read(p),title,description));
// Small presentation, metadata and schema improvements across public routes.
const pages=[...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).map(p=>p==='/'?'index.html':p.slice(1)+'index.html');
for(const p of pages){
 let html=read(p);
 html=html.replace(/Recommended Featured Snippet Answer/g,'Calculation summary').replace(/For more detail, you can internally link to your blog on <strong>tons of asphalt per cubic yard<\/strong>\./g,'For a volume-based estimate, read <a href="/blog/tons-of-asphalt-per-cubic-yard/">tons of asphalt per cubic yard</a>.');
 // The existing app loader schedules ads after load/idle. Avoid loading the same SDK eagerly in the head.
 html=html.replace(/<script\b[^>]*src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^"\s]*"[^>]*>\s*<\/script>\s*/g,'');
 html=html.replace(/\/css\/seo-accessibility\.css\?v=1/g,'/css/seo-accessibility.css?v=2');
 html=html.replace(/https:\/\/www\.bitumencalc\.com\/assets\/og-image\.jpg/g,origin+'/assets/hero-road.webp');
 const faq=[];
 for(const m of html.matchAll(/<button\b[^>]*class="faq-q"[^>]*>([\s\S]*?)<\/button>\s*<div class="faq-a">([\s\S]*?)<\/div>/g))faq.push({'@type':'Question',name:plain(m[1].replace(/<span\b[\s\S]*?<\/span>/g,'')),acceptedAnswer:{'@type':'Answer',text:plain(m[2])}});
 let faqWritten=false;
 html=html.replace(/<script\b([^>]*type="application\/ld\+json"[^>]*)>([\s\S]*?)<\/script>/g,(whole,attrs,raw)=>{
  const data=JSON.parse(raw);const type=data['@type'];
  if(type==='FAQPage'&&faq.length){if(faqWritten)return '';data.mainEntity=faq;faqWritten=true;}
  function enrich(x){if(!x||typeof x!=='object')return;
   if(x['@type']==='Organization'&&(!x.name||/BitumenCalc|Big Techies/.test(x.name))){x.logo=origin+'/assets/logo.svg';x.url=x.url||origin+'/';x['@id']=x['@id']||origin+'/#organization';}
   for(const v of Object.values(x))if(v&&typeof v==='object')Array.isArray(v)?v.forEach(enrich):enrich(v);
  }enrich(data);
  if(type==='BlogPosting'&&touched.has(p)){data.dateModified=date;data.headline=plain(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]||data.headline);data.description=html.match(/<meta name="description" content="([^"]*)/)?.[1]||data.description;}
  return `<script${attrs}>\n${JSON.stringify(data,null,2)}\n</script>`;
 });
 if(faq.length&&!faqWritten)html=html.replace('</head>',`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq})}</script>\n</head>`);
 if(touched.has(p))html=html.replace(/(?:Last reviewed|Updated) <time datetime="[^"]*">[^<]*<\/time>/g,`Updated <time datetime="${date}">8 September 2026</time>`);
 write(p,html);
}
let ht=read('.htaccess');
if(!ht.includes('# SEO recovery legacy blog redirects'))ht=ht.replace('RewriteEngine On',`RewriteEngine On\n\n# SEO recovery legacy blog redirects: exact article equivalents.\nRewriteRule ^blog/how-to-calculate-quantity-of-bitumen-for-road/?$ https://www.bitumencalc.com/blog/how-to-calculate-bitumen-quantity-for-road/ [R=301,L]\nRewriteRule ^blog/modified-bitumen-roof-calculator/?$ https://www.bitumencalc.com/blog/modified-bitumen-roofing-calculator/ [R=301,L]`);
write('.htaccess',ht);
let sitemap=read('sitemap.xml');
sitemap=sitemap.replace(/<url>([\s\S]*?)<\/url>/g,(whole,inner)=>{const url=inner.match(/<loc>(.*?)<\/loc>/)?.[1];if(!url)return whole;const route=new URL(url).pathname;const p=route==='/'?'index.html':route.slice(1)+'index.html';if(!touched.has(p))return whole;return '<url>'+(/<lastmod>/.test(inner)?inner.replace(/<lastmod>[^<]*<\/lastmod>/,`<lastmod>${date}</lastmod>`):inner.replace('</loc>',`</loc>\n    <lastmod>${date}</lastmod>`))+'</url>';});
write('sitemap.xml',sitemap);
fs.writeFileSync(path.join(root,'tools/seo-recovery-manifest.json'),JSON.stringify({date,backup,changed:[...touched],files:[...touched].map(p=>({path:p,sha256:crypto.createHash('sha256').update(read(p)).digest('hex')}))},null,2));
console.log(JSON.stringify({changed:touched.size,backup}));
