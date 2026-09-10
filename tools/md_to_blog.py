import sys
from pathlib import Path
import re

# Minimal frontmatter parser

def parse_frontmatter(text):
    fm = {}
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m:
        return fm, text
    body = text[m.end():]
    for line in m.group(1).splitlines():
        if ':' in line:
            key, val = line.split(':', 1)
            fm[key.strip()] = val.strip().strip('"')
    return fm, body

# Minimal markdown to HTML fallback converter

def simple_markdown_to_html(md):
    html_lines = []
    in_list = False
    for line in md.splitlines():
        line = line.rstrip()
        if not line:
            if in_list:
                html_lines.append('</ul>')
                in_list = False
            html_lines.append('')
            continue
        if line.startswith('### '):
            html_lines.append('<h3>' + line[4:] + '</h3>')
            continue
        if line.startswith('## '):
            html_lines.append('<h2>' + line[3:] + '</h2>')
            continue
        if line.startswith('# '):
            html_lines.append('<h1>' + line[2:] + '</h1>')
            continue
        if line.startswith('- '):
            if not in_list:
                html_lines.append('<ul>')
                in_list = True
            html_lines.append('<li>' + line[2:] + '</li>')
            continue
        # Simple bold/italic
        line = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', line)
        line = re.sub(r'\*(.*?)\*', r'<em>\1</em>', line)
        # Links [text](url)
        line = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', line)
        html_lines.append('<p>' + line + '</p>')
    if in_list:
        html_lines.append('</ul>')
    return '\n'.join(html_lines)


def build_html(fm, body_html):
    title = fm.get('meta_title') or fm.get('title') or 'Blog Post'
    desc = fm.get('meta_description','')
    slug = fm.get('slug','post')
    canonical = f"https://www.bitumencalc.com/blog/{slug}/"
    hero_title = fm.get('title', title)
    hero_desc = desc

    head = '''<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6438644207209483"
     crossorigin="anonymous"></script>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | BitumenCalc</title>
  <meta name="description" content="{desc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{canonical}" />

  <meta property="og:type" content="article" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:image" content="https://www.bitumencalc.com/assets/og-image.jpg" />
  <meta property="og:site_name" content="BitumenCalc" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{desc}" />
  <meta name="twitter:image" content="https://www.bitumencalc.com/assets/og-image.jpg" />
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "{hero_title}",
    "description": "{desc}",
    "url": "{canonical}",
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-01",
    "author": {{ "@type": "Organization", "name": "BitumenCalc" }},
    "publisher": {{ "@type": "Organization", "name": "BitumenCalc", "url": "https://www.bitumencalc.com" }},
    "image": "https://www.bitumencalc.com/assets/og-image.jpg",
    "mainEntityOfPage": {{ "@type": "WebPage", "@id": "{canonical}" }}
  }}
  </script>
  <link rel="stylesheet" href="/css/style.css?v=2" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&display=swap" rel="stylesheet" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23f59e0b'/><text y='.9em' font-size='80' x='10'>🛣️</text></svg>" />
</head>
<body>

<header class="site-header">
  <div class="container">
    <nav class="nav-inner">
      <a href="/" class="nav-logo">
        <div class="nav-logo-icon">B</div>
        <div class="nav-logo-text">Bitumen<span>Calc</span></div>
      </a>
      <div class="nav-links">
        <a href="/">Home</a>
        <div class="nav-dropdown">
          <button class="nav-dropdown-btn">Calculators <span class="nav-dropdown-arrow">▾</span></button>
          <div class="nav-dropdown-menu">
            <div class="nav-dropdown-col">
              <h6>Regional</h6>
              <a href="/calculators/australia-bitumen-calculator/">Australia</a>
              <a href="/calculators/canada-bitumen-calculator/">Canada</a>
              <a href="/calculators/new-zealand-bitumen-calculator/">New Zealand</a>
              <a href="/calculators/california-asphalt-calculator/">California</a>
              <a href="/calculators/virginia-asphalt-calculator/">Virginia</a>
              <a href="/calculators/colorado-asphalt-calculator/">Colorado</a>
              <a href="/calculators/minnesota-asphalt-calculator/">Minnesota</a>
              <a href="/calculators/new-jersey-asphalt-calculator/">New Jersey</a>
              <a href="/calculators/north-carolina-asphalt-calculator/">North Carolina</a>
            </div>
            <div class="nav-dropdown-col">
              <h6>Area &amp; Unit Conversion</h6>
              <a href="/calculators/bitumen-square-feet-calculator/">Square Feet</a>
              <a href="/calculators/square-feet-to-tons-calculator/">Sq Ft to Tons</a>
              <a href="/calculators/bitumen-square-meters-calculator/">Square Meters</a>
              <a href="/calculators/bitumen-square-yards-calculator/">Square Yards</a>
              <a href="/calculators/metric-bitumen-calculator/">Metric</a>
              <a href="/calculators/asphalt-measurement-calculator/">Measurement</a>
              <h6 style="margin-top:.9rem;">Thickness / Temp / Radius</h6>
              <a href="/calculators/asphalt-thickness-calculator/">Thickness</a>
              <a href="/calculators/bitumen-temperature-converter/">Temperature</a>
              <a href="/calculators/circular-asphalt-calculator/">Radius (Circular)</a>
            </div>
            <div class="nav-dropdown-col">
              <h6>Material &amp; Quantity</h6>
              <a href="/calculators/asphalt-material-calculator/">Material</a>
              <a href="/calculators/asphalt-millings-calculator/">Millings (RAP)</a>
              <a href="/calculators/asphalt-tonnage-calculator/">Tonnage</a>
              <a href="/calculators/tack-coat-calculator/">Tack Coat</a>
              <a href="/calculators/road-asphalt-calculator/">Road</a>
              <a href="/calculators/roofing-bitumen-calculator/">Roofing</a>
              <a href="/calculators/asphalt-repair-calculator/">Repair</a>
              <a href="/calculators/asphalt-removal-calculator/">Removal</a>
              <h6 style="margin-top:.9rem;">Cost &amp; Rate</h6>
              <a href="/calculators/asphalt-cost-calculator/">Cost Calculator</a>
              <a href="/calculators/asphalt-application-rate-calculator/">Rate Calculator</a>
            </div>
          </div>
        </div>
        <a href="/blog/" class="active">Blog</a>
        <a href="/about-us/">About Us</a>
      </div>
      <a href="/calculators/roofing-bitumen-calculator/" class="btn btn-primary btn-sm nav-cta">Roofing Calculator</a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/">🏠 Home</a>
    <a href="/calculators/">🧮 All Calculators</a>
    <a href="/blog/">📝 Blog</a>
    <a href="/about-us/">ℹ️ About Us</a>
  </div>
</header>

<section class="page-hero">
  <div class="container page-hero-inner">
    <div class="eyebrow">{}</div>
    <h1>{}</h1>
    <p>{}</p>
    <div class="region-meta">
      <span class="badge badge-orange">Guide</span>
    </div>
    <div class="breadcrumb"><a href="/">Home</a><span class="sep">/</span><a href="/blog/">Blog</a><span class="sep">/</span><span>{}</span></div>
  </div>
</section>

<section class="section">
  <div class="container article-layout">
    <article class="article-card">

{}

    </article>
    <aside class="resource-stack">
      <div class="resource-panel">
        <h3>Related Tools</h3>
        <ul>
          <li><a href="/calculators/tonnage/">Tonnage Calculator</a><p>Quick tonnage estimates from area and thickness.</p></li>
          <li><a href="/calculators/cost/">Cost Calculator</a><p>Turn material quantities into project budgets.</p></li>
          <li><a href="/calculators/asphalt-application-rate-calculator/">Rate Calculator</a><p>Compare coverage and application rates.</p></li>
        </ul>
      </div>
    </aside>
  </div>
</section>

<footer style="padding:2.5rem 0;text-align:center;color:var(--text-muted);">
  <div class="container">© 2026 Bitumen Calculator. All rights reserved.</div>
</footer>

</body>
</html>'''
    return head.format('Knowledge Hub', hero_title, hero_desc, hero_title, body_html,
               title=title, desc=desc, canonical=canonical,
               hero_title=hero_title, hero_desc=hero_desc)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python md_to_blog.py <path-to-md-file>')
        sys.exit(1)
    p = Path(sys.argv[1])
    if not p.exists():
        print('File not found:', p)
        sys.exit(1)
    text = p.read_text(encoding='utf-8')
    fm, body = parse_frontmatter(text)
    # try to use markdown package if available
    try:
        import markdown
        body_html = markdown.markdown(body, extensions=['fenced_code', 'tables'])
    except Exception:
        body_html = simple_markdown_to_html(body)
    slug = fm.get('slug') or p.stem
    outdir = Path('blog') / slug
    outdir.mkdir(parents=True, exist_ok=True)
    outpath = outdir / 'index.html'
    html = build_html(fm, body_html)
    outpath.write_text(html, encoding='utf-8')
    print('Wrote', outpath)
