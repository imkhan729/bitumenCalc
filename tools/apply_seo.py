import os
import re
import datetime

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BASE_URL = 'https://www.bitumencalc.com'
DEFAULT_IMAGE = 'https://www.bitumencalc.com/assets/og-image.jpg'
DEFAULT_AUTHOR = 'BitumenCalc'
THEME_COLOR = '#f59e0b'
EXCLUDE_FILES = {'google5993f549b22db87c.html'}


def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()


def write_file(path, text):
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)


def ensure_tag(text, pattern, insert_text, insert_after=None):
    if re.search(pattern, text, flags=re.IGNORECASE):
        return text
    if insert_after is None:
        return insert_text + text
    return re.sub(insert_after, lambda m: m.group(0) + insert_text, text, count=1, flags=re.IGNORECASE)


def add_main_wrapper(text):
    if '<main' in text.lower():
        return text
    if '</header>' in text.lower():
        text = re.sub(r'(</header>)', r'\1\n<main id="main-content">\n', text, flags=re.IGNORECASE, count=1)
    if '</body>' in text.lower() and not re.search(r'</main>', text, flags=re.IGNORECASE):
        text = re.sub(r'(</body>)', r'</main>\n\1', text, flags=re.IGNORECASE, count=1)
    return text


def update_head(text):
    original = text
    # Normalize <html> tag
    text = re.sub(r'<html(?![^>]*\blang\b)([^>]*)>', r'<html lang="en-US"\1>', text, flags=re.IGNORECASE)

    # Meta tags
    text = ensure_tag(
        text,
        r'<meta\s+name="author"',
        '  <meta name="author" content="{}" />\n'.format(DEFAULT_AUTHOR),
        insert_after=r'(<meta\s+name="description"[^>]*>\s*)'
    )

    text = ensure_tag(
        text,
        r'<meta\s+name="theme-color"',
        '  <meta name="theme-color" content="{}" />\n'.format(THEME_COLOR),
        insert_after=r'(<meta\s+name="viewport"[^>]*>\s*)'
    )

    text = ensure_tag(
        text,
        r'<meta\s+name="msapplication-TileColor"',
        '  <meta name="msapplication-TileColor" content="{}" />\n'.format(THEME_COLOR),
        insert_after=r'(<meta\s+name="viewport"[^>]*>\s*)'
    )

    text = ensure_tag(
        text,
        r'<meta\s+name="robots"',
        '  <meta name="robots" content="index, follow" />\n',
        insert_after=r'(<meta\s+name="description"[^>]*>\s*)'
    )

    text = ensure_tag(
        text,
        r'<meta\s+property="og:locale"',
        '  <meta property="og:locale" content="en_US" />\n',
        insert_after=r'(<meta\s+property="og:type"[^>]*>\s*)'
    )

    text = ensure_tag(
        text,
        r'<meta\s+property="og:image:alt"',
        '  <meta property="og:image:alt" content="BitumenCalc tool and guide preview image" />\n',
        insert_after=r'(<meta\s+property="og:image"[^>]*>\s*)'
    )

    text = ensure_tag(
        text,
        r'<meta\s+name="twitter:image:alt"',
        '  <meta name="twitter:image:alt" content="BitumenCalc tool and guide preview image" />\n',
        insert_after=r'(<meta\s+name="twitter:image"[^>]*>\s*)'
    )

    text = ensure_tag(
        text,
        r'<meta\s+name="twitter:creator"',
        '  <meta name="twitter:creator" content="@BitumenCalc" />\n',
        insert_after=r'(<meta\s+name="twitter:card"[^>]*>\s*)'
    )

    # Add hreflang on canonical URL pages
    match = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"\s*/?>', text, flags=re.IGNORECASE)
    if match and not re.search(r'<link\s+rel="alternate"\s+hreflang="en"', text, flags=re.IGNORECASE):
        canonical_url = match.group(1)
        insert = f'  <link rel="alternate" hreflang="en" href="{canonical_url}" />\n'
        text = re.sub(r'(<link\s+rel="canonical"[^>]*>\s*)', r'\1' + insert, text, flags=re.IGNORECASE, count=1)

    text = add_main_wrapper(text)
    return text, text != original


def generate_sitemap(paths):
    date = datetime.date.today().isoformat()
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]

    for path in sorted(paths):
        priority = '0.5'
        changefreq = 'monthly'
        if path == '/':
            priority = '1.0'
            changefreq = 'weekly'
        elif path == '/calculators/':
            priority = '0.9'
            changefreq = 'weekly'
        elif path.startswith('/calculators/'):
            priority = '0.8'
            changefreq = 'monthly'
        elif path == '/blog/':
            priority = '0.8'
            changefreq = 'weekly'
        elif path.startswith('/blog/'):
            priority = '0.7'
            changefreq = 'monthly'
        elif path in ['/about-us/', '/contact-us/']:
            priority = '0.6'
            changefreq = 'monthly'
        elif path in ['/privacy-policy/', '/terms-and-conditions/']:
            priority = '0.3'
            changefreq = 'yearly'

        lines.append('  <url><loc>{}</loc><lastmod>{}</lastmod><changefreq>{}</changefreq><priority>{}</priority></url>'.format(
            BASE_URL.rstrip('/') + path,
            date,
            changefreq,
            priority
        ))

    lines.append('</urlset>')
    return '\n'.join(lines) + '\n'


def build_url_path(html_path):
    rel = os.path.relpath(html_path, ROOT_DIR).replace('\\', '/')
    if rel == 'index.html':
        return '/'
    if rel.endswith('/index.html'):
        return '/' + rel[:-len('index.html')]
    if rel.endswith('.html'):
        return '/' + rel
    return None


def main():
    html_paths = []
    for dirpath, dirnames, filenames in os.walk(ROOT_DIR):
        dirnames[:] = [d for d in dirnames if d not in {'assets', 'css', 'js'}]
        for filename in filenames:
            if not filename.lower().endswith('.html'):
                continue
            if filename in EXCLUDE_FILES:
                continue
            html_paths.append(os.path.join(dirpath, filename))

    updated = 0
    for path in html_paths:
        text = read_file(path)
        new_text, changed = update_head(text)
        if changed:
            write_file(path, new_text)
            updated += 1

    sitemap_paths = []
    for path in html_paths:
        url_path = build_url_path(path)
        if url_path:
            if url_path == '/google5993f549b22db87c.html':
                continue
            sitemap_paths.append(url_path)

    sitemap_xml = generate_sitemap(sorted(set(sitemap_paths)))
    write_file(os.path.join(ROOT_DIR, 'sitemap.xml'), sitemap_xml)

    print(f'Updated {updated} HTML files and regenerated sitemap.xml')


if __name__ == '__main__':
    main()
