'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const files=[...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname).map(p=>p==='/'?'index.html':p.slice(1)+'index.html');
for(const p of [...files,'404.html']){
 const full=path.join(root,p);let html=fs.readFileSync(full,'utf8');
 html=html.replace(/<select\b([^>]*\bid="([^"]+)"[^>]*)>/g,(whole,attrs,id)=>{
  if(/aria-label=|aria-labelledby=/.test(attrs))return whole;
  const names={lengthUnit:'Length unit',widthUnit:'Width unit',thicknessUnit:'Thickness unit',densityUnit:'Density unit',priceUnit:'Price weight unit',currency:'Currency',areaUnit:'Area unit',tempUnit:'Temperature unit'};
  const key=id.replace(/Full$/,'');return names[key]?`<select${attrs} aria-label="${names[key]}">`:whole;
 });
 html=html.replace(/<h6([^>]*)>([\s\S]*?)<\/h6>/g,(_,attrs,text)=>`<p${attrs.replace(/class="([^"]*)"/, 'class="nav-group-label $1"')}${/class=/.test(attrs)?'':' class="nav-group-label"'}>${text}</p>`);
 html=html.replace(/<footer\b[\s\S]*?<\/footer>/g,footer=>footer.replace(/<h5([^>]*)>([\s\S]*?)<\/h5>/g,(_,attrs,text)=>`<p${attrs} class="footer-label">${text}</p>`));
 html=html.replace(/(<div class="formula-card"[^>]*>\s*)<h4>([\s\S]*?)<\/h4>/g,'$1<h3>$2</h3>');
 html=html.replace(/\/js\/app(?:\.min)?\.js\?v=\d+/g,'/js/app.min.js?v=9');
 html=html.replace(/\/js\/consent(?:\.min)?\.js\?v=\d+/g,'/js/consent.min.js?v=3');
 html=html.replace(/\/css\/seo-accessibility\.css\?v=\d+/g,'/css/seo-accessibility.css?v=3');
 if(!html.includes('rel="preload" as="script" href="/js/app.min.js?v=9"'))html=html.replace('</head>','<link rel="preload" as="script" href="/js/app.min.js?v=9" />\n</head>');
 // Descriptions of the revised guides in the existing article directory.
 html=html.replace('Recommended asphalt thickness tables for driveways, parking lots, roads, overlays, and heavy-duty pavement sections.','Understand compacted lift thickness, compare layer quantities, and check the limits of a calculator before choosing a pavement design.');
 html=html.replace(/\r\n/g,'\n').replace(/[ \t]+$/gm,'');fs.writeFileSync(full,html);
}
console.log('Template labels, headings, script preload and asset versions updated.');
