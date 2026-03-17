#!/usr/bin/env python3
"""
Convert iWeb archive pages to modern ShowStudio-style HTML.
Extracts content from old iWeb pages, wraps in clean modern template.
"""

import os
import re
import glob
from html.parser import HTMLParser
from pathlib import Path

SOURCE = Path("/Users/user/Desktop/jan-new-projects/archive/original/JAN_LUBICZ")
DEST = Path("/Users/user/Desktop/jan-new-projects/archive/pages")

# Also convert Bellmer Society and Towarzystwo
EXTRA_SOURCES = {
    "BELLMER_SOCIETY": Path("/Users/user/Desktop/jan-new-projects/archive/original/BELLMER_SOCIETY"),
    "TOWARZYSTWO_BELLMER": Path("/Users/user/Desktop/jan-new-projects/archive/original/TOWARZYSTWO_BELLMER"),
}

TEMPLATE_CSS = """
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --bg: #ffffff;
    --bg-alt: #f8f8f8;
    --border: #e0e0e0;
    --border-light: #f0f0f0;
    --text: #1a1a1a;
    --text-secondary: #666666;
    --text-tertiary: #999999;
    --accent: #000000;
    --hover: #0055ff;
    --font: 'Helvetica Neue', 'Inter', Helvetica, Arial, sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: var(--font);
    background: var(--bg);
    color: var(--text);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: #000; color: #fff; }

  .topbar {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.9rem 2.5rem;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-light);
  }
  .topbar-brand {
    font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--text); text-decoration: none;
  }
  .topbar-nav { display: flex; gap: 1.8rem; }
  .topbar-nav a {
    font-size: 0.7rem; font-weight: 400;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--text-tertiary); text-decoration: none;
    transition: color 0.2s;
  }
  .topbar-nav a:hover { color: var(--text); }

  .page-container {
    max-width: 780px;
    margin: 0 auto;
    padding: 3rem 2.5rem 5rem;
  }

  .page-title {
    font-size: 2.2rem;
    font-weight: 300;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  .page-meta {
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .content p {
    font-size: 1.05rem;
    font-weight: 400;
    line-height: 1.8;
    margin-bottom: 1rem;
    color: var(--text);
  }

  .content p:empty { margin-bottom: 0.4rem; }

  .content a {
    color: var(--text);
    text-decoration: underline;
    text-decoration-color: var(--border);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s, color 0.2s;
  }

  .content a:hover {
    color: var(--hover);
    text-decoration-color: var(--hover);
  }

  .content .img-block {
    margin: 2rem 0;
    text-align: center;
  }

  .content .img-block img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  .content .img-caption {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-top: 0.5rem;
    font-weight: 400;
  }

  .content .vimeo-embed {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    margin: 2rem 0;
    background: var(--bg-alt);
  }

  .content .vimeo-embed iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border: none;
  }

  .content ul, .content ol {
    margin: 0.5rem 0 1rem 1.5rem;
    font-size: 1.05rem;
    font-weight: 400;
  }

  .content li {
    margin-bottom: 0.4rem;
    line-height: 1.7;
  }

  .content .separator {
    border: none;
    border-top: 1px solid var(--border-light);
    margin: 2rem 0;
  }

  .content h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 2rem 0 1rem;
    letter-spacing: -0.01em;
  }

  .content h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 1.8rem 0 0.8rem;
  }

  .content h3 {
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin: 2rem 0 0.8rem;
  }

  .content blockquote {
    border-left: 2px solid var(--border);
    padding-left: 1.2rem;
    margin: 1.5rem 0;
    color: var(--text-secondary);
    font-style: italic;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .back-link:hover { color: var(--text); }

  .page-footer {
    border-top: 1px solid var(--border);
    margin-top: 3rem;
    padding-top: 1.5rem;
    font-size: 0.65rem;
    color: var(--text-tertiary);
    display: flex;
    justify-content: space-between;
  }

  .page-footer a {
    color: var(--text-tertiary);
    text-decoration: none;
    transition: color 0.2s;
  }

  .page-footer a:hover { color: var(--text); }

  @media (max-width: 700px) {
    .topbar { padding: 0.7rem 1rem; }
    .topbar-brand { font-size: 0.6rem; letter-spacing: 0.1em; }
    .topbar-nav { gap: 0.8rem; }
    .topbar-nav a { font-size: 0.55rem; letter-spacing: 0.08em; }
    .page-container { padding: 2rem 1.2rem 3rem; }
    .page-title { font-size: 1.5rem; }
  }
</style>
"""


def extract_vimeo_ids(html_content, files_dir):
    """Extract Vimeo IDs from widget markup files."""
    vimeo_ids = []
    # Find widget references
    widget_pattern = re.compile(r'widget\d+_markup\.html')
    for match in widget_pattern.finditer(html_content):
        markup_file = files_dir / match.group()
        if markup_file.exists():
            try:
                markup = markup_file.read_text(encoding='utf-8', errors='replace')
                vimeo_match = re.search(r'player\.vimeo\.com/video/(\d+)', markup)
                if vimeo_match:
                    vimeo_ids.append(vimeo_match.group(1))
            except:
                pass

    # Also check for direct vimeo links in content
    for match in re.finditer(r'vimeo\.com/(\d+)', html_content):
        vid = match.group(1)
        if vid not in vimeo_ids:
            vimeo_ids.append(vid)

    return vimeo_ids


def extract_content(html_content, source_file):
    """Extract meaningful content from iWeb HTML."""
    # Get title
    title_match = re.search(r'<title>(.*?)</title>', html_content)
    title = title_match.group(1) if title_match else source_file.stem
    title = title.replace('_', ' ').strip()

    # Get files directory name
    stem = source_file.stem
    files_dir = source_file.parent / f"{stem}_files"

    # Extract header_layer content (some iWeb pages put content here)
    header_match = re.search(r'id="header_layer"[^>]*>(.*?)(?=<div[^>]*id="body_layer")',
                             html_content, re.DOTALL)
    header_content = header_match.group(1) if header_match else ''

    # Extract body_layer content
    body_match = re.search(r'id="body_layer"[^>]*>(.*?)(?=<div[^>]*id="footer_layer")',
                           html_content, re.DOTALL)
    if not body_match:
        body_match = re.search(r'id="body_layer"[^>]*>(.*?)$', html_content, re.DOTALL)

    body_content = (header_content + '\n' + (body_match.group(1) if body_match else '')) or html_content

    # Extract text paragraphs
    paragraphs = []
    # Extract all paragraphs from text-content areas in header+body
    # (directly searching <p> tags avoids nested div regex issues)
    for p_match in re.finditer(r'<p[^>]*>(.*?)</p>', body_content, re.DOTALL):
        if True:
            p_content = p_match.group(1)
            # Clean up
            p_content = re.sub(r'<span[^>]*class="Bullet"[^>]*>.*?</span>', '', p_content)
            p_content = re.sub(r'<span[^>]*class="inline-block"[^>]*>.*?</span>', '', p_content)
            p_content = re.sub(r'<span[^>]*style="[^"]*font-size[^"]*"[^>]*>(.*?)</span>', r'\1', p_content)
            p_content = re.sub(r'<span[^>]*class="style\w*"[^>]*>(.*?)</span>', r'\1', p_content)
            # Keep links
            p_content = re.sub(r'onclick="[^"]*"', '', p_content)
            p_content = re.sub(r'onkeypress="[^"]*"', '', p_content)
            p_content = re.sub(r'onmouseover="[^"]*"', '', p_content)
            p_content = re.sub(r'onmouseout="[^"]*"', '', p_content)
            p_content = re.sub(r'\s+class="[^"]*"', '', p_content)
            p_content = re.sub(r'\s+title="[^"]*"', '', p_content)
            # Clean br tags
            p_content = re.sub(r'<br\s*/?>', '', p_content)
            p_content = p_content.strip()

            if p_content and p_content not in ('', '&nbsp;'):
                # Skip copyright/boilerplate lines (only actual copyright notices)
                p_clean = re.sub(r'<[^>]+>', '', p_content).strip().lower()
                if ('copyright' in p_clean and ('rights' in p_clean or 'website' in p_clean)) or \
                   'all rights reserved' in p_clean:
                    continue
                paragraphs.append(p_content)


    # Extract images
    images = []
    for img_match in re.finditer(r'<img[^>]*src="([^"]*)"[^>]*>', body_content):
        src = img_match.group(1)
        # Skip navigation/stroke/shape images
        if any(skip in src.lower() for skip in ['stroke', 'shapeimage', 'widget', 'nav_', 'button']):
            continue
        if '_files/' in src:
            images.append(src)

    # Also check header for images
    header_match = re.search(r'id="header_layer"[^>]*>(.*?)(?=<div[^>]*id="body_layer")',
                             html_content, re.DOTALL)

    # Extract Vimeo IDs
    vimeo_ids = extract_vimeo_ids(html_content, files_dir)

    return {
        'title': title,
        'paragraphs': paragraphs,
        'images': images,
        'vimeo_ids': vimeo_ids,
        'files_dir': stem + '_files',
    }


def fix_links(html_text, page_name, rel_path_to_original=''):
    """Convert old .html links to new page links, fix file paths."""
    def replace_link(match):
        full = match.group(0)
        href = match.group(1)
        # External links - keep as is
        if href.startswith('http') or href.startswith('mailto:') or href.startswith('../'):
            return full
        # Internal .html links
        if href.endswith('.html'):
            new_href = href
            return full.replace(match.group(1), new_href)
        # Links to files in _files/ directories (PDFs, images, etc.)
        if '_files/' in href and rel_path_to_original:
            new_href = f"{rel_path_to_original}/{href}"
            return full.replace(match.group(1), new_href)
        return full

    return re.sub(r'href="([^"]*)"', replace_link, html_text)


def detect_separators(paragraphs):
    """Detect lines that are just dashes (separators)."""
    result = []
    for p in paragraphs:
        clean = re.sub(r'<[^>]+>', '', p).strip()
        if re.match(r'^-{5,}$', clean):
            result.append(('separator', p))
        elif clean.endswith(':') and len(clean) < 80 and not '<a' in p:
            # Looks like a section heading
            result.append(('heading', clean.rstrip(':')))
        else:
            result.append(('text', p))
    return result


def generate_page(data, rel_path_to_original, original_filename):
    """Generate modern HTML page from extracted content."""
    title = data['title']

    # Build content HTML
    content_parts = []

    # Process paragraphs — separate credits from regular content
    classified = detect_separators(data['paragraphs'])
    credit_keywords = ['realizacja', 'reżyseria', 'zdjęcia', 'montaż', 'scenariusz',
                       'produkcja', 'muzyka', 'dźwięk', 'scenografia', 'kostiumy',
                       'choreografia', 'obsada', 'występują', 'wykonanie', 'kamera',
                       'operator', 'realization', 'directed', 'camera', 'editing',
                       'photography', 'cast', 'music', 'sound']
    credit_parts = []
    regular_classified = []
    for ptype, content in classified:
        if ptype == 'text':
            clean_check = re.sub(r'<[^>]+>', '', content).strip().lower()
            if any(kw in clean_check for kw in credit_keywords) and len(clean_check) < 500:
                credit_parts.append(content)
                continue
        regular_classified.append((ptype, content))

    # Add credits right at the top (under title)
    for cp in credit_parts:
        cp = fix_links(cp, original_filename, rel_path_to_original)
        content_parts.append(f'<p>{cp}</p>')

    # Add Vimeo embeds
    for vid in data['vimeo_ids']:
        content_parts.append(
            f'<div class="vimeo-embed">'
            f'<iframe src="https://player.vimeo.com/video/{vid}" '
            f'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
            f'</div>'
        )

    # Add images (first few at top, rest interspersed)
    top_images = data['images'][:3]
    remaining_images = data['images'][3:]

    for img in top_images:
        img_src = f"{rel_path_to_original}/{img}"
        content_parts.append(
            f'<div class="img-block"><img src="{img_src}" alt="{title}" loading="lazy"></div>'
        )

    # Regular paragraphs
    img_idx = 0

    for ptype, content in regular_classified:
        if ptype == 'separator':
            content_parts.append('<hr class="separator">')
        elif ptype == 'heading':
            content_parts.append(f'<h3>{content}</h3>')
        else:
            # Fix internal links
            content = fix_links(content, original_filename, rel_path_to_original)
            content_parts.append(f'<p>{content}</p>')

            # Intersperse remaining images
            if remaining_images and img_idx < len(remaining_images):
                if len(content_parts) % 5 == 0:
                    img_src = f"{rel_path_to_original}/{remaining_images[img_idx]}"
                    content_parts.append(
                        f'<div class="img-block"><img src="{img_src}" alt="" loading="lazy"></div>'
                    )
                    img_idx += 1

    # Add any remaining images at the end
    for img in remaining_images[img_idx:]:
        img_src = f"{rel_path_to_original}/{img}"
        content_parts.append(
            f'<div class="img-block"><img src="{img_src}" alt="" loading="lazy"></div>'
        )

    content_html = '\n      '.join(content_parts)

    # If content is empty, show a note
    if not content_parts:
        content_html = '<p style="color: var(--text-tertiary);">Tresc dostepna w <a href="' + rel_path_to_original + '/' + original_filename + '">oryginalnym archiwum</a>.</p>'

    return f"""<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Archiwum</title>
{TEMPLATE_CSS}
</head>
<body>

<nav class="topbar">
  <a href="../index.html" class="topbar-brand">Jan Lubicz Przyluski</a>
  <div class="topbar-nav">
    <a href="../index.html">Archiwum</a>
    <a href="../../index.html">Future Show &nearr;</a>
  </div>
</nav>

<div class="page-container">
  <a href="../index.html" class="back-link">&larr; Archiwum</a>

  <h1 class="page-title">{title}</h1>
  <div class="page-meta">Jan Lubicz Przyluski</div>

  <div class="content">
      {content_html}
  </div>

  <footer class="page-footer">
    <span>&copy; Jan Lubicz Przyluski</span>
    <a href="{rel_path_to_original}/{original_filename}">Oryginal (iWeb) &nearr;</a>
  </footer>
</div>

</body>
</html>"""


def process_directory(source_dir, dest_dir, rel_original_prefix):
    """Process all HTML files in a directory."""
    os.makedirs(dest_dir, exist_ok=True)

    html_files = sorted(source_dir.glob("*.html"))
    processed = 0
    skipped = 0

    for html_file in html_files:
        # Skip index files and feed
        if html_file.name in ('feed.xml',):
            continue

        try:
            content = html_file.read_text(encoding='utf-8', errors='replace')
            data = extract_content(content, html_file)

            # Generate new page
            new_html = generate_page(data, rel_original_prefix, html_file.name)

            # Save
            out_file = dest_dir / html_file.name
            out_file.write_text(new_html, encoding='utf-8')
            processed += 1

        except Exception as e:
            print(f"  ERROR: {html_file.name}: {e}")
            skipped += 1

    return processed, skipped


def main():
    print("Converting iWeb archive to modern ShowStudio style...")
    print(f"Source: {SOURCE}")
    print(f"Destination: {DEST}")
    print()

    # Process main JAN_LUBICZ directory
    print("Processing JAN_LUBICZ...")
    p, s = process_directory(SOURCE, DEST, "../original/JAN_LUBICZ")
    print(f"  Done: {p} converted, {s} skipped")

    # Process extra sources
    for name, src in EXTRA_SOURCES.items():
        if src.exists():
            sub_dest = DEST
            print(f"Processing {name}...")
            p2, s2 = process_directory(src, sub_dest, f"../original/{name}")
            print(f"  Done: {p2} converted, {s2} skipped")

    print()
    print("All done!")
    print(f"Output: {DEST}")


if __name__ == '__main__':
    main()
