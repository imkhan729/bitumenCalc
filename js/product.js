'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const header=document.querySelector('.site-header');
  if(header){
    const reflectScroll=()=>header.classList.toggle('is-scrolled',window.scrollY>8);
    reflectScroll(); window.addEventListener('scroll',reflectScroll,{passive:true});
  }
  document.querySelectorAll('.tool-menu,.mobile-navigation').forEach(menu => {
    document.addEventListener('click', e => { if (!menu.contains(e.target)) menu.open=false; });
    menu.addEventListener('keydown', e => { if(e.key==='Escape'){menu.open=false;menu.querySelector('summary').focus();} });
  });
  const search=document.getElementById('calculatorDirectorySearch');
  if(search){
    const status=document.createElement('p');status.className='filter-status';status.setAttribute('role','status');search.closest('.directory-controls').append(status);
    const update=()=>{document.querySelectorAll('.directory-group').forEach(group=>group.hidden=!group.querySelector('.dir-card:not([hidden])'));const count=document.querySelectorAll('.dir-card:not([hidden])').length;status.textContent=count?`${count} calculators found`:'No matching calculators. Try a different term or select All.';};
    search.addEventListener('input',update);document.querySelectorAll('.directory-chip').forEach(b=>b.addEventListener('click',update)); update();
  }
  document.querySelectorAll('.article-toc').forEach(toc=>{
    if(toc.tagName==='DETAILS')return;
    const details=document.createElement('details'),summary=document.createElement('summary'); details.className='article-toc';summary.textContent='On this page';details.append(summary);
    const list=toc.querySelector('ul,ol');if(list)details.append(list);else return;
    details.open=window.innerWidth>900;toc.replaceWith(details);
  });
  document.querySelectorAll('#calculator .calc-wrap').forEach(enhanceCalculator);
  enhancePresentation();
});
function enhancePresentation(){
  const modes={modeQtoR:'Quantity → Rate',modeRtoQ:'Rate → Quantity',modeSpray:'Spray Rate',modePothole:'Pothole Repair',modeCrack:'Crack Sealing',modeArea:'Area Repair'};
  for(const[id,label]of Object.entries(modes)){const button=document.getElementById(id);if(!button)continue;button.textContent=label;button.classList.add('mode-button');button.setAttribute('aria-pressed',String(id==='modeQtoR'||id==='modePothole'));button.addEventListener('click',()=>{button.parentElement.querySelectorAll('.mode-button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));});}
  document.querySelectorAll('.article-toc').forEach(toc=>{
    const sidebar=document.querySelector('.resource-stack');if(!sidebar)return;
    const marker=document.createComment('Contents position on small screens');toc.before(marker);
    const desktop=window.matchMedia('(min-width:901px)');
    const place=()=>{if(desktop.matches){sidebar.prepend(toc);toc.open=true;}else marker.after(toc);};
    place();desktop.addEventListener('change',place);
    const links=[...toc.querySelectorAll('a[href^="#"]')];
    if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;links.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}},{rootMargin:'-90px 0px -60% 0px'});links.forEach(a=>{const section=document.getElementById(a.hash.slice(1));if(section)observer.observe(section);});}
  });
  document.querySelectorAll('.mobile-navigation').forEach(menu=>{
    const summary=menu.querySelector('summary');
    menu.addEventListener('toggle',()=>{summary.setAttribute('aria-expanded',String(menu.open));document.body.classList.toggle('navigation-open',menu.open);});
    menu.addEventListener('keydown',e=>{
      if(e.key!=='Tab'||!menu.open)return;
      const links=[summary,...menu.querySelectorAll('a[href]')],first=links[0],last=links.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.open=false));
  });
  document.querySelectorAll('.calc-wrap').forEach((shell,index)=>{
    const tabs=shell.querySelectorAll('.calc-tab'),cost=shell.querySelector('.cost-field-group');
    if(tabs.length!==2||!cost)return;
    const label=document.createElement('label');label.className='cost-switch';
    const toggle=document.createElement('input');toggle.type='checkbox';toggle.id='includeCost-'+index;
    toggle.checked=tabs[1].classList.contains('active');label.append(toggle,document.createTextNode('Include Cost Estimate'));
    cost.id=cost.id||'costFields-'+index;toggle.setAttribute('aria-controls',cost.id);
    tabs[0].parentElement.classList.add('enhanced-cost-tabs');tabs[0].parentElement.after(label);
    toggle.addEventListener('change',()=>tabs[toggle.checked?1:0].click());
    tabs.forEach((tab,i)=>tab.addEventListener('click',()=>{toggle.checked=i===1;toggle.setAttribute('aria-expanded',String(toggle.checked));}));
  });
  document.querySelectorAll('.table-tabs-wrap').forEach((wrap,index)=>{
    const tabs=[...wrap.querySelectorAll('.table-tab')],panels=[...wrap.querySelectorAll('.table-panel')];
    if(!tabs.length)return;tabs[0].parentElement.setAttribute('role','tablist');
    const sync=()=>tabs.forEach(tab=>{const active=tab.classList.contains('active');tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
    tabs.forEach((tab,i)=>{tab.id=tab.id||`reference-tab-${index}-${i}`;tab.setAttribute('role','tab');const panel=panels.find(p=>p.dataset.panel===tab.dataset.tab);if(panel){panel.id=panel.id||`reference-panel-${index}-${i}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);tab.setAttribute('aria-controls',panel.id);}tab.addEventListener('click',sync);tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].click();tabs[next].focus();}});});sync();
  });
  document.querySelectorAll('.formula-step-chip').forEach(button=>{button.parentElement.removeAttribute('role');const sync=()=>button.setAttribute('aria-pressed',String(button.classList.contains('active')));sync();button.parentElement.addEventListener('click',sync);});
  document.querySelectorAll('.calc-results').forEach(panel=>{panel.setAttribute('aria-live','polite');panel.setAttribute('aria-atomic','false');});
  document.querySelectorAll('.card-icon').forEach(icon=>{icon.setAttribute('aria-hidden','true');icon.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2"/></svg>';});
}
function enhanceCalculator(shell) {
  const inputs=shell.querySelector('.calc-inputs'),results=shell.querySelector('.calc-results');
  if(!inputs||!results)return;
  let fields=[...inputs.querySelectorAll('input[id],select[id]')];
  const action=shell.querySelector('.calc-btn');
  const suffix=document.getElementById('lengthFull')?'Full':'';
  const el=id=>inputs.querySelector('[id="'+id+suffix+'"]');
  const standard=!!el('length')&&!!el('width')&&!!el('thickness')&&!!el('density');
  if(standard){
    const toolbar=document.createElement('div');toolbar.className='estimate-tools';toolbar.innerHTML='<span class="tools-label">Measurement system</span><button type="button" data-system="metric">Metric</button><button type="button" data-system="imperial">Imperial</button><span class="tools-label">Try example dimensions</span><button type="button" data-example="driveway">Driveway</button><button type="button" data-example="parking">Parking area</button>';
    inputs.prepend(toolbar);
    const conversions={length:{m:1,ft:.3048,yd:.9144,km:1000,mi:1609.344},width:{m:1,ft:.3048,yd:.9144},thickness:{mm:.001,cm:.01,m:1,in:.0254,ft:.3048},density:{'kg/m3':1,'lb/ft3':16.0185,'t/m3':1000}};
    const sync=()=>toolbar.querySelectorAll('[data-system]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.system===(el('lengthUnit').value==='ft'?'imperial':'metric'))));sync();
    toolbar.addEventListener('click',e=>{
      const system=e.target.dataset.system,example=e.target.dataset.example;
      if(system){for(const [name,factors] of Object.entries(conversions)){const input=el(name),unit=el(name+'Unit');if(!input||!unit)continue;const target=system==='metric'?({length:'m',width:'m',thickness:'mm',density:'kg/m3'})[name]:({length:'ft',width:'ft',thickness:'in',density:'lb/ft3'})[name];if(![...unit.options].some(o=>o.value===target))continue;if(input.value!=='')input.value=Number((Number(input.value)*factors[unit.value]/factors[target]).toPrecision(12));unit.value=target;}sync(); if(el('length').value&&el('width').value&&el('thickness').value)action.click();}
      if(example){[['length',example==='driveway'?10:30],['width',example==='driveway'?3:20],['thickness',50]].forEach(([name,value])=>{const unit=el(name+'Unit');el(name).value=Number((value*(name==='thickness'?.001:1)/conversions[name][unit.value]).toPrecision(10));});action.click();}
    });
    el('lengthUnit').addEventListener('change',sync);
    // Mix presets define density in kg/m³; express the selected preset in the current display unit.
    el('mixType')?.addEventListener('change',()=>{const factor=conversions.density[el('densityUnit').value];if(el('mixType').value!=='custom'&&factor!==1){el('density').value=Number((Number(el('density').value)/factor).toPrecision(10));window.BitCalc.run();}});
    inputs.querySelectorAll('.input-set').forEach(set=>{if(set.querySelector('[id^="price"]'))set.classList.add('cost-field-group');});
    const tabs=shell.querySelectorAll('.calc-tab');if(tabs.length>1){const cost=inputs.querySelector('.cost-field-group');if(cost)cost.style.display=tabs[1].classList.contains('active')?'':'none';}
    const planning=document.createElement('details');planning.className='planning-options';planning.innerHTML='<summary>Order planning (optional)</summary><div class="planning-fields"><div class="field"><label for="orderAllowance">Site allowance (%)</label><input id="orderAllowance" type="number" value="0" min="0" step="any" inputmode="decimal"><p class="field-hint">Optional trimming or site variation allowance; confirm for your project.</p></div><div class="field"><label for="truckCapacity">Truck capacity (metric tonnes)</label><input id="truckCapacity" type="number" placeholder="e.g. 20" min="0" step="any" inputmode="decimal"><p class="field-hint">Use the legal payload for the actual vehicle and route.</p></div></div>';
    (action.closest('.calc-actions-row')||action).before(planning);
    const output=document.createElement('p');output.className='estimate-note';output.setAttribute('role','status');results.append(output);
    const updatePlanning=()=>{
      const l=Number(el('length').value),w=Number(el('width').value),t=Number(el('thickness').value),d=Number(el('density').value);
      const allowance=Number(document.getElementById('orderAllowance').value),capacity=Number(document.getElementById('truckCapacity').value);
      if(![l,w,t,d].every(v=>Number.isFinite(v)&&v>0)){output.textContent='';return;}
      if(!Number.isFinite(allowance)||allowance<0||!Number.isFinite(capacity)||capacity<0){output.textContent='Enter a non-negative allowance and a positive truck capacity, or leave capacity blank.';return;}
      const base=l*conversions.length[el('lengthUnit').value]*w*conversions.width[el('widthUnit').value]*t*conversions.thickness[el('thicknessUnit').value]*d*conversions.density[el('densityUnit').value]/1000;
      const ordered=base*(1+allowance/100);output.textContent=`Base quantity: ${base.toFixed(3)} metric tonnes. With ${allowance}% site allowance: ${ordered.toFixed(3)} metric tonnes.`+(capacity>0?` Delivery planning: ${Math.ceil(ordered/capacity)} loads at ${capacity} tonnes per load.`:'');
    };
    inputs.addEventListener('input',updatePlanning);inputs.addEventListener('change',updatePlanning);action.addEventListener('click',updatePlanning);
    inputs.querySelector('.reset-btn')?.addEventListener('click',()=>{document.getElementById('orderAllowance').value='0';document.getElementById('truckCapacity').value='';output.textContent='';});
    action.addEventListener('click',()=>{for(const name of ['length','width','thickness','density']){const field=el(name);const invalid=!(Number(field.value)>0);field.setAttribute('aria-invalid',String(invalid));let error=document.getElementById(field.id+'Error');if(!error){error=document.createElement('p');error.id=field.id+'Error';error.className='field-error';field.closest('.field').append(error);field.setAttribute('aria-describedby',error.id);}error.textContent=invalid?'Enter a value greater than 0.':'';}});
  }
  fields=[...inputs.querySelectorAll('input[id],select[id]')];
  const label=field=>inputs.querySelector(`label[for="${field.id}"]`)?.textContent.trim()||field.getAttribute('aria-label')||field.id;
  const report=()=>{
    const data=[document.querySelector('h1').textContent.replace(/\s+/g,' ').trim(),'Estimate · '+new Date().toLocaleDateString(),'','Inputs',...fields.filter(f=>f.value!=='').map(f=>`${label(f)}: ${f.tagName==='SELECT'?f.selectedOptions[0]?.textContent:f.value}`),'','Results',...[...results.querySelectorAll('.result-card')].filter(c=>c.getBoundingClientRect().height>0).map(c=>c.innerText.replace(/\s+/g,' ').trim()),''];
    if(standard)data.push('Formula: area = length × width; volume = area × compacted thickness; mass = volume × mix density. Binder = mass × binder percentage.');
    data.push(results.querySelector('.estimate-note')?.textContent||'','Planning estimate. Check project specifications, density and units before ordering.',document.querySelector('link[rel=canonical]').href);return data.join('\n');
  };
  const actions=document.createElement('div');actions.className='calc-actions';actions.innerHTML='<button class="calc-action" type="button" data-do="copy">Copy summary</button><button class="calc-action" type="button" data-do="share">Share estimate</button><button class="calc-action" type="button" data-do="print">Print estimate</button><p class="action-status" role="status"></p>';results.append(actions);
  const status=actions.querySelector('.action-status');
  const print=document.createElement('pre');print.className='print-report';document.body.append(print);window.addEventListener('beforeprint',()=>print.textContent=report());
  actions.addEventListener('click',async e=>{
    const kind=e.target.dataset.do;if(!kind)return;
    if(kind==='print'){print.textContent=report();window.print();return;}
    const url=new URL(document.querySelector('link[rel=canonical]').href);
    fields.forEach(f=>{if(f.value!=='')url.searchParams.set('bc_'+f.id,f.value);});
    const value=kind==='copy'?report():url.href;
    try{await navigator.clipboard.writeText(value);status.textContent=kind==='copy'?'Summary copied.':'Estimate link copied.';}
    catch{let box=results.querySelector('.share-output');if(!box){box=document.createElement('textarea');box.className='share-output';box.setAttribute('aria-label','Copy estimate text');results.append(box);}box.value=value;box.focus();box.select();status.textContent='Select and copy the text below.';}
  });
  const params=new URLSearchParams(location.search);let restored=false;
  for(const field of fields){const value=params.get('bc_'+field.id);if(value===null||value.length>80)continue;if(field.tagName==='SELECT'&&![...field.options].some(o=>o.value===value))continue;if(field.type==='number'&&(!Number.isFinite(Number(value))||value.trim()===''))continue;field.value=value;restored=true;}
  if(restored){if(standard&&el('price')?.value){const cost=inputs.querySelector('.cost-field-group');if(cost)cost.style.display='';}action?.click();}
}
