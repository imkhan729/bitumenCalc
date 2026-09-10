from pathlib import Path
from bs4 import BeautifulSoup
import json, re
ROOT = Path(__file__).resolve().parent.parent
files = [ROOT/'index.html'] + [p for d in ['calculators','blog','about-us','authors','contact-us','disclaimer','editorial-policy','privacy-policy','terms-and-conditions'] for p in (ROOT/d).rglob('index.html')]
inventory=[]
groups={'Quantity & cost':[('asphalt-tonnage-calculator','Asphalt tonnage'),('asphalt-cost-calculator','Project cost'),('road-asphalt-calculator','Road quantity')], 'Coverage & materials':[('square-feet-to-tons-calculator','Square feet to tons'),('bitumen-square-meters-calculator','Square metres'),('asphalt-millings-calculator','Asphalt millings'),('tack-coat-calculator','Tack coat')]}
links=lambda pairs: ''.join(f'<a href="/calculators/{slug}/">{label}</a>' for slug,label in pairs)
header='''<header class="site-header"><div class="container"><nav class="nav-inner" aria-label="Main navigation"><a href="/" class="nav-logo"><span class="nav-logo-icon">B</span><span class="nav-logo-text">Bitumen<span>Calc</span></span></a><div class="desktop-nav"><details class="tool-menu"><summary>Calculators</summary><div class="tool-menu-panel">'''+''.join(f'<div><strong>{name}</strong>{links(items)}</div>' for name,items in groups.items())+'''<a class="menu-all" href="/calculators/">Explore all calculators →</a></div></details><a href="/blog/">Guides</a><a href="/editorial-policy/">Methodology</a><a href="/about-us/">About</a></div><a class="nav-search" href="/calculators/#calculatorDirectorySearch" aria-label="Search calculators">Search tools <span aria-hidden="true">⌕</span></a><details class="mobile-navigation"><summary aria-label="Open navigation">Menu</summary><div class="mobile-navigation-panel"><a href="/calculators/">All calculators</a>'''+''.join(f'<details><summary>{name}</summary>{links(items)}</details>' for name,items in groups.items())+'''<a href="/blog/">Guides</a><a href="/editorial-policy/">Methodology</a><a href="/about-us/">About</a><a href="/contact-us/">Contact</a></div></details></nav></div></header>'''
footer='''<footer class="site-footer"><div class="container"><div class="footer-top"><div class="footer-brand"><a class="nav-logo" href="/"><span class="nav-logo-icon">B</span><span class="nav-logo-text">Bitumen<span>Calc</span></span></a><p>Practical pavement estimates.<br>Clear inputs. Transparent formulas.</p><a href="/editorial-policy/">How we check our calculations →</a></div><div class="footer-col"><p class="footer-label">Popular calculators</p><ul>'''+''.join(f'<li><a href="/calculators/{s}/">{l}</a></li>' for s,l in groups['Quantity & cost'])+'''<li><a href="/calculators/">All calculators</a></li></ul></div><div class="footer-col"><p class="footer-label">Resources</p><ul><li><a href="/blog/">Engineering guides</a></li><li><a href="/blog/asphalt-density-guide/">Density reference</a></li><li><a href="/blog/asphalt-thickness-guide/">Thickness guide</a></li><li><a href="/authors/jimmy/">Author</a></li></ul></div><div class="footer-col"><p class="footer-label">BitumenCalc</p><ul><li><a href="/about-us/">About us</a></li><li><a href="/contact-us/">Contact</a></li><li><a href="/editorial-policy/">Editorial policy</a></li><li><a href="/disclaimer/">Calculator limitations</a></li></ul></div></div><div class="footer-bottom"><p>© 2026 BitumenCalc</p><div class="footer-bottom-links"><a href="/privacy-policy/">Privacy</a><a href="/terms-and-conditions/">Terms</a><a href="#" onclick="if(window.openConsentPreferences){window.openConsentPreferences();}return false;">Cookie Preferences</a></div></div></div></footer>'''
for p in files:
 text=p.read_text(encoding='utf-8').replace('/ inputmode="decimal"','inputmode="decimal" /')
 soup=BeautifulSoup(text,'html.parser')
 inventory.append({'path':str(p.relative_to(ROOT)), 'title':str(soup.title), 'canonical':str(soup.select_one('link[rel=canonical]')), 'schemas':[s.string for s in soup.select('script[type="application/ld+json"]')]})
 for el in soup.select('#critical-css, link[as=image][href="/assets/hero-road.webp"]'): el.decompose()
 for el in soup.select('link[href*="style.min.css"]'):
  if el.find_parent('noscript'): el.parent.decompose(); continue
  el.attrs={'rel':'stylesheet','href':'/css/style.min.css?v=7'}
 for el in soup.select('link[href*="seo-accessibility.css"]'): el['href']='/css/seo-accessibility.css?v=5'
 for el in soup.select('[src*="app.min.js"],link[href*="app.min.js"]'):
  attr='src' if el.has_attr('src') else 'href'; el[attr]='/js/app.min.js?v=10'
 soup.head.append(BeautifulSoup('<link rel="stylesheet" href="/css/product.css?v=1"><script defer src="/js/product.js?v=1"></script>','html.parser'))
 if soup.select_one('header.site-header'): soup.select_one('header.site-header').replace_with(BeautifulSoup(header,'html.parser'))
 if soup.select_one('footer.site-footer'): soup.select_one('footer.site-footer').replace_with(BeautifulSoup(footer,'html.parser'))
 main=soup.select_one('main')
 if main:
  # Previous SEO sections sometimes followed the footer. Keep them in the main reading flow.
  for section in list(soup.select('section.seo-answer')):
   section.extract(); main.append(section)
  foot=soup.select_one('footer.site-footer'); foot.extract(); main.insert_after(foot)
 calc=soup.select_one('section#calculator')
 hero=soup.select_one('.hero, .page-hero')
 if calc and hero: calc.extract(); hero.insert_after(calc)
 if p==ROOT/'index.html':
  h=soup.select_one('.hero-title'); h.clear(); h.append('Bitumen Calculator'); h.append(BeautifulSoup('<span class="hero-subtitle">Plan your next pour.<br>Know your quantities.</span>','html.parser'))
  soup.select_one('.hero-desc').string='Estimate asphalt, binder, aggregate and material cost. Enter your dimensions below, choose your mix and see the calculation behind every result.'
  for el in soup.select('.hero-stats,.hero-actions,.hero-overlay,.hero-road'): el.decompose()
  soup.select_one('.hero-tag').string='FREE PAVEMENT ESTIMATION TOOLS'
  section=soup.select_one('.calc-section-header')
  if section: section.decompose()
 for crumb in soup.select('.breadcrumb'): crumb.name='nav'; crumb['aria-label']='Breadcrumb'
 for item in soup.select('.faq-item'):
  q=item.select_one('.faq-q'); a=item.select_one('.faq-a')
  if q and a:
   item.name='details'; item['class']=['question']; q.name='summary'; q.attrs={}
   for icon in q.select('.faq-icon'): icon.decompose()
   a['class']=['question-answer']
 for icon in soup.select('.result-card-icon,.placeholder-icon,.dir-card-icon,.trust-item-icon,.info-icon'): icon.decompose()
 for weight in soup.select('[id^="resWeight"]'):
  if 'Sub' in weight.get('id',''): continue
  card=weight.find_parent(class_='result-card')
  if card: parent=card.parent; card.extract(); parent.insert(0,card)
 for th in soup.select('th'): th['scope']=th.get('scope','col')
 for btn in soup.select('.calc-btn'): btn.string='Calculate estimate'
 if p.parent.name=='calculators':
  for sec in soup.select('section'):
   if sec.select('.dir-card'): sec['class']=sec.get('class',[])+['directory-group']
 p.write_text(str(soup),encoding='utf-8')
(ROOT/'REDESIGN-BASELINE.json').write_text(json.dumps(inventory,indent=2),encoding='utf-8')
print(f'Redesigned structure for {len(files)} routes')
