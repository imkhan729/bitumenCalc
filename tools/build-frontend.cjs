// Static presentation build: one CSS bundle, one shared navigation partial.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const routes=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const groups={Popular:[['asphalt-tonnage-calculator','Asphalt tonnage'],['asphalt-cost-calculator','Project cost'],['road-asphalt-calculator','Road quantity']], 'Area & Conversion':[['square-feet-to-tons-calculator','Square feet to tons'],['bitumen-square-meters-calculator','Square metres'],['bitumen-square-yards-calculator','Square yards'],['asphalt-measurement-calculator','Measurement units']], 'Material & Quantity':[['asphalt-material-calculator','Binder & aggregate'],['asphalt-millings-calculator','Asphalt millings'],['asphalt-repair-calculator','Asphalt repair'],['roofing-bitumen-calculator','Roofing bitumen']], 'Thickness / Temperature / Radius':[['asphalt-thickness-calculator','Asphalt thickness'],['bitumen-temperature-converter','Temperature converter'],['circular-asphalt-calculator','Circular pavement']], 'Cost & Rate':[['asphalt-cost-calculator','Cost calculator'],['asphalt-application-rate-calculator','Application rate'],['tack-coat-calculator','Tack coat']]};
const links=items=>items.map(([slug,label])=>`<a href="/calculators/${slug}/">${label}</a>`).join('');
const header=`<header class="site-header"><div class="container"><nav class="nav-inner" aria-label="Main navigation"><a class="nav-logo" href="/"><span class="nav-logo-icon">B</span><span class="nav-logo-text">Bitumen<span>Calc</span></span></a><div class="desktop-nav"><details class="tool-menu"><summary>Calculators</summary><div class="tool-menu-panel">${Object.entries(groups).map(([group,items])=>`<div><strong>${group}</strong>${links(items)}</div>`).join('')}<div><strong>Resources</strong><a href="/blog/">Guides</a><a href="/editorial-policy/">Methodology</a><a href="/about-us/">About</a><a href="/#formulas">Formulas</a><a href="/#reference-tables">Reference</a><a href="/calculators/#calculatorDirectorySearch">Search tools</a></div><a class="menu-all" href="/calculators/">View All Calculators →</a></div></details><a href="/calculators/#regional">Regional</a><a href="/editorial-policy/">Resources</a><a href="/blog/">Blog</a></div><a class="btn-nav-cta" href="/calculators/">All Calculators</a><details class="mobile-navigation"><summary aria-label="Open navigation"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>Menu</span></summary><div class="mobile-navigation-panel"><a href="/calculators/">Calculators</a><a href="/calculators/#regional">Regional Calculators</a><a href="/editorial-policy/">Guides & Methodology</a><a href="/blog/">Blog</a><a href="/about-us/">About</a><strong>Popular calculators</strong>${links(groups.Popular)}<a href="/contact-us/">Contact</a></div></details></nav></div></header>`;
fs.mkdirSync(path.join(root,'partials'),{recursive:true});
fs.writeFileSync(path.join(root,'partials/header.html'),header+'\n');
for(const route of routes){
 const file=path.join(root,route,'index.html');let html=fs.readFileSync(file,'utf8');
 html=html.replace(/<header\b[^>]*class="site-header"[^>]*>[\s\S]*?<\/header>/,header);
 // Homepage had a separate hamburger drawer; the new header owns its drawer.
 html=html.replace(/<div\b[^>]*class="mobile-menu"[^>]*>[\s\S]*?<\/div>/,'');
 html=html.replace(/<link\b[^>]*href="\/css\/(?:style\.min|seo-accessibility|product|saas-design-system|site)\.css[^"\s]*"[^>]*>/g,'');
 html=html.replace('</head>','<link rel="stylesheet" href="/css/site.css?v=20260909c">\n</head>');
 html=html.replace(/\/js\/product\.js\?v=[^"\s]+/g,'/js/product.js?v=20260909c');
 // Correct an existing non-existent guide URL, never migrate a public route.
 html=html.replaceAll('/calculators/asphalt-density-guide/','/blog/asphalt-density-guide/');
 html=html.replaceAll('viewbox=','viewBox=');
 if(route==='/'){
   html=html.replace(/(<div class="relation-box[^"]*">\s*)<h4>(.*?)<\/h4>/g,'$1<h3>$2</h3>');
   html=html.replace(/(<div class="footer-col">\s*)<h4>(.*?)<\/h4>/g,'$1<p class="footer-label">$2</p>');
 }
 fs.writeFileSync(file,html);
}
const sources=['style.min.css','seo-accessibility.css','product.css','saas-design-system.css','frontend.css'];
const css=sources.map(name=>fs.readFileSync(path.join(root,'css',name),'utf8').replace(/@import\s+url\([^)]*\)\s*;/g,'')).join('\n');
let output=css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\n\s*\n/g,'\n');
try{output=require('esbuild').transformSync(output,{loader:'css',minify:true}).code;}catch(error){if(error.code!=='MODULE_NOT_FOUND')throw error;}
fs.writeFileSync(path.join(root,'css/site.css'),output);
console.log('Built shared navigation and CSS for',routes.length,'pages');
