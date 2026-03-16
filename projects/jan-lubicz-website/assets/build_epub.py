#!/usr/bin/env python3
"""
Build EPUB from PDF: Sztuka akcji. Dziesięć zdarzeń w Polsce by Jan Przyłuski
Uses PyMuPDF for text extraction and ebooklib for EPUB creation.

ALL content pages in this PDF use a two-column layout:
  - Left column: x ~ 45-80
  - Right column: x ~ 500-540
  - Page width: 907, height: 595
  - Reading order: left column top-to-bottom, then right column top-to-bottom

Chapter boundaries occur on split pages where one column ends a chapter
and the other column begins the next:
  - Page 4: left=epigraphs, right=introduction body
  - Page 5: left=intro end + signature, right=Chapter I start
  - Page 18: left=Chapter I end, right=Chapter II start
  - Page 27: left=Chapter II end, right=Chapter III start
"""

import fitz
import re
import html as html_module
from ebooklib import epub

PDF_PATH = "/Users/user/Desktop/CLAUDE CODE/inne projekty/jan-lubicz-website/assets/Sztuka_akcji_Dziesiec_zdarzen_w_Polsce.pdf"
EPUB_PATH = "/Users/user/Desktop/CLAUDE CODE/inne projekty/jan-lubicz-website/assets/Sztuka_akcji_Dziesiec_zdarzen_w_Polsce.epub"

CHAPTER_TITLES = {
    "chapter1": ("Rozdział I", "Happening, czyli o realności"),
    "chapter2": ("Rozdział II", "Antyhappening. Czas przełomu, koniec awangardy i alternatywa"),
    "chapter3": ("Rozdział III", "Performance. O sztuce postartystycznej"),
}

CSS_CONTENT = """
@charset "utf-8";
body { font-family: "Georgia", "Times New Roman", serif; line-height: 1.6; margin: 1em; color: #1a1a1a; }
h1 { font-size: 1.8em; text-align: center; margin-top: 2em; margin-bottom: 0.3em; font-weight: bold; line-height: 1.3; }
h1.title-page { font-size: 2.2em; margin-top: 3em; }
h2 { font-size: 1.0em; text-align: center; margin-top: 0.5em; margin-bottom: 2em; font-weight: normal; font-variant: small-caps; letter-spacing: 0.05em; }
h2.subtitle { font-size: 1.2em; font-variant: normal; letter-spacing: normal; margin-top: 0.2em; margin-bottom: 1em; }
p { text-align: justify; text-indent: 1.5em; margin: 0.3em 0; font-size: 1em; }
p.no-indent { text-indent: 0; }
p.center { text-align: center; text-indent: 0; }
p.author-name { text-align: center; font-size: 1.3em; margin-top: 3em; margin-bottom: 0.5em; text-indent: 0; }
p.publisher { text-align: center; font-size: 0.9em; margin-top: 2em; text-indent: 0; }
p.year { text-align: center; font-size: 0.9em; text-indent: 0; }
p.dedication { text-align: center; font-style: italic; margin-top: 4em; font-size: 1.1em; text-indent: 0; }
blockquote { margin: 1.5em 2em; font-style: italic; font-size: 0.95em; line-height: 1.5; }
blockquote p { text-indent: 0; text-align: left; }
p.quote-attribution { text-align: right; font-size: 0.85em; font-style: normal; margin-top: 0.3em; margin-right: 2em; text-indent: 0; color: #444; }
p.author-bio { margin-top: 2em; font-size: 0.95em; text-indent: 0; }
p.author-bio-signature { text-align: right; font-weight: bold; margin-top: 1em; text-indent: 0; }
.footnote { font-size: 0.85em; line-height: 1.4; margin-top: 2em; padding-top: 0.5em; border-top: 1px solid #ccc; }
.footnote p { text-indent: 0; margin: 0.5em 0; }
p.bib-entry { text-indent: -1.5em; margin-left: 1.5em; margin-bottom: 0.6em; text-align: left; }
hr.section-break { border: none; border-top: 1px solid #999; margin: 2em auto; width: 30%; }
"""


# ─── Header/Footer Detection ────────────────────────────────────────────────

def is_header_footer(text, size, y=None, page_h=None):
    """Detect running headers/footers and standalone page numbers."""
    t = text.strip()
    if not t:
        return True
    # Pure page numbers / arrow patterns
    if re.match(r'^[\d\s\-—>►←→*«■•,.]+$', t):
        return True
    if re.match(r'^[→—>►←\-\s*&KMW]+$', t):
        return True
    if re.match(r'^[KM\sW*←→—>►\-&4]+$', t):
        return True
    if t in ('BW W', '&', '4'):
        return True

    header_words = ['przyl', 'przyłusk', 'sztuka akc', 'szluka akc', 'sztuka akqi',
                    'dziesi', 'zdarze', 'zdarzeń']
    t_lower = t.lower()

    # Small text matching header patterns
    if size < 5.0 and len(t) < 80:
        for hw in header_words:
            if hw in t_lower:
                return True

    # Text at bottom of page matching header patterns
    if y is not None and page_h is not None and y > page_h * 0.92 and size < 9.0:
        for hw in header_words:
            if hw in t_lower:
                return True

    return False


# ─── Span/Line Extraction ───────────────────────────────────────────────────

def get_page_spans(doc, pg1):
    """Get all text spans from a page (1-indexed), filtered for headers/footers."""
    page = doc[pg1 - 1]
    page_h = page.rect.height
    page_w = page.rect.width
    blocks = page.get_text("dict", flags=fitz.TEXT_INHIBIT_SPACES)["blocks"]

    spans = []
    for b in blocks:
        if b["type"] != 0:
            continue
        for line in b["lines"]:
            lx, ly = line["bbox"][0], line["bbox"][1]
            for span in line["spans"]:
                txt = span["text"]
                sz = span["size"]
                if not txt.strip():
                    continue
                if is_header_footer(txt, sz, ly, page_h):
                    continue
                spans.append({
                    "text": txt, "size": sz, "x": lx, "y": ly,
                    "italic": bool(span["flags"] & 2),
                    "bold": bool(span["flags"] & 16),
                    "page": pg1, "page_h": page_h, "page_w": page_w,
                })
    return spans


def group_into_lines(spans, y_tol=2.5):
    """Group spans by y-coordinate into lines, sorted by y then x."""
    if not spans:
        return []
    spans_sorted = sorted(spans, key=lambda s: (s["y"], s["x"]))
    lines = []
    cur = [spans_sorted[0]]
    cur_y = spans_sorted[0]["y"]
    for s in spans_sorted[1:]:
        if abs(s["y"] - cur_y) <= y_tol:
            cur.append(s)
        else:
            lines.append(cur)
            cur = [s]
            cur_y = s["y"]
    if cur:
        lines.append(cur)
    return lines


def line_text(ln):
    return "".join(s["text"] for s in ln).strip()

def line_avg_size(ln):
    return sum(s["size"] for s in ln) / len(ln) if ln else 0

def line_y_pos(ln):
    return ln[0]["y"] if ln else 0

def line_x_pos(ln):
    return min(s["x"] for s in ln) if ln else 0


# ─── Column Extraction ──────────────────────────────────────────────────────

MID_X = 420  # x-position threshold separating left and right columns
              # Left column: x < 420 (body text at x~48-80, some items at x~300-350)
              # Right column: x >= 420 (body text at x~500-540)
              # Gap between columns: ~80-500 (author signature at x=325 is left column)

def _process_column_spans(col_spans, page_h, skip_headings):
    """Process spans from a single column into line tuples."""
    lines = group_into_lines(col_spans)
    result = []
    for ln in lines:
        text = line_text(ln)
        avg_sz = line_avg_size(ln)
        y = line_y_pos(ln)
        if not text:
            continue
        if skip_headings and avg_sz > 8.0:
            continue
        is_fn = avg_sz < 5.5 and y > page_h * 0.62
        result.append((text, avg_sz, y, is_fn))
    return result


def extract_column_lines(doc, pg1, column="both", skip_headings=True):
    """
    Extract lines from a page column.
    column: "left", "right", or "both" (left then right, reading order)
    Returns: list of (text, avg_size, y, is_footnote_zone) tuples

    IMPORTANT: When column="both", each column is processed separately
    to avoid mixing lines from different columns at the same y-coordinate.
    """
    spans = get_page_spans(doc, pg1)
    if not spans:
        return []

    page_h = spans[0]["page_h"] if spans else 595

    if column == "left":
        return _process_column_spans(
            [s for s in spans if s["x"] < MID_X], page_h, skip_headings)
    elif column == "right":
        return _process_column_spans(
            [s for s in spans if s["x"] >= MID_X], page_h, skip_headings)
    else:
        # "both": process each column independently, then concatenate
        # This preserves reading order: left column top-to-bottom, then right
        left_result = _process_column_spans(
            [s for s in spans if s["x"] < MID_X], page_h, skip_headings)
        right_result = _process_column_spans(
            [s for s in spans if s["x"] >= MID_X], page_h, skip_headings)
        return left_result + right_result

    return result


def separate_body_footnotes(line_tuples):
    """Separate body lines from footnote lines."""
    body = [t[0] for t in line_tuples if not t[3]]
    fn = [t[0] for t in line_tuples if t[3]]
    return body, fn


# ─── Text Merging ───────────────────────────────────────────────────────────

def clean_text(text):
    text = text.replace('\u00ad', '')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def merge_lines_into_paragraphs(lines):
    """Merge broken text lines into proper paragraphs."""
    if not lines:
        return []

    paragraphs = []
    current = ""

    for text in lines:
        text = text.strip()
        if not text:
            continue

        if not current:
            current = text
            continue

        prev = current.rstrip()
        curr = text.lstrip()

        new_para = False

        # Sentence end + uppercase start = new paragraph
        if prev and prev[-1] in '.!?"\u201d:' and curr and curr[0].isupper():
            new_para = True

        # Opening quote after end of sentence = new paragraph
        if curr and curr[0] in '\u201e\u201c"(' and prev and prev[-1] in '.!?"\u201d':
            new_para = True

        # Soft hyphen at line end: join without hyphen
        if prev.endswith('\u00ad'):
            current = current.rstrip('\u00ad') + text
        elif prev.endswith('-') and curr and curr[0].islower():
            current = current[:-1] + text
        elif new_para:
            paragraphs.append(clean_text(current))
            current = text
        else:
            current = current.rstrip() + " " + text.lstrip()

    if current.strip():
        paragraphs.append(clean_text(current))

    return [p for p in paragraphs if p]


def merge_footnote_lines(fn_lines):
    """Merge footnote lines into individual entries."""
    if not fn_lines:
        return []
    footnotes = []
    current = ""
    for text in fn_lines:
        text = text.strip()
        if not text:
            continue
        if re.match(r'^[\'\"\*\d¹²³⁴⁵⁶⁷⁸⁹⁰]+\s', text) or re.match(r'^\d+[.\s]', text):
            if current:
                footnotes.append(clean_text(current))
            current = text
        else:
            if current:
                if current.endswith('\u00ad'):
                    current = current.rstrip('\u00ad') + text
                elif current.endswith('-') and text and text[0].islower():
                    current = current[:-1] + text
                else:
                    current += " " + text
            else:
                current = text
    if current:
        footnotes.append(clean_text(current))
    return footnotes


# ─── Section Extractors ─────────────────────────────────────────────────────

def extract_introduction(doc):
    """
    Extract introduction from pages 4-5.
    Page 4 left = epigraphs, Page 4 right = intro body
    Page 5 left = intro end + author signature
    """
    # Page 4 LEFT: epigraphs
    spans_left = [s for s in get_page_spans(doc, 4) if s["x"] < MID_X]
    spans_left.sort(key=lambda s: (s["y"], s["x"]))
    left_lines = group_into_lines(spans_left)

    epigraphs = []
    current_quote = []
    current_attrib = []
    in_attrib = False

    attrib_starters = ["Pablo Picasso", "Jean Duvignaud", "Witold Gombrowicz",
                       "z Picassem", "red. Jan"]

    for ln in left_lines:
        text = line_text(ln)
        avg_sz = line_avg_size(ln)
        y = line_y_pos(ln)
        if not text or (avg_sz < 5.0 and y > 400):
            continue

        is_attrib_start = any(text.startswith(a) for a in attrib_starters)
        is_attrib_cont = in_attrib and not any(s["italic"] for s in ln) and avg_sz < 6.5

        if is_attrib_start or is_attrib_cont:
            in_attrib = True
            current_attrib.append(text)
        else:
            if in_attrib and current_quote:
                q = clean_text(" ".join(current_quote))
                a = clean_text(" ".join(current_attrib))
                epigraphs.append((q, a))
                current_quote = []
                current_attrib = []
                in_attrib = False
            current_quote.append(text)

    if current_quote:
        q = clean_text(" ".join(current_quote))
        a = clean_text(" ".join(current_attrib)) if current_attrib else ""
        epigraphs.append((q, a))

    # Page 4 RIGHT: intro body
    lt = extract_column_lines(doc, 4, "right", skip_headings=True)
    body_p4, _ = separate_body_footnotes(lt)

    # Page 5 LEFT: intro end + author signature
    lt = extract_column_lines(doc, 5, "left", skip_headings=True)
    body_p5_raw, _ = separate_body_footnotes(lt)

    intro_lines_p5 = []
    author_bio = []
    found_sig = False
    for text in body_p5_raw:
        if text.strip() == "Jan Przyłuski":
            found_sig = True
            author_bio.append(text)
        elif found_sig:
            author_bio.append(text)
        else:
            intro_lines_p5.append(text)

    all_intro_lines = body_p4 + intro_lines_p5
    intro_paragraphs = merge_lines_into_paragraphs(all_intro_lines)

    return epigraphs, intro_paragraphs, author_bio


def extract_chapter(doc, chapter_key):
    """
    Extract chapter text using column-aware reading.

    Chapter 1: page 5 right, pages 6-17 both, page 18 left
    Chapter 2: page 18 right, pages 19-26 both, page 27 left
    Chapter 3: page 27 right, pages 28-37 both
    """
    if chapter_key == "chapter1":
        cols = [(5, "right")] + [(p, "both") for p in range(6, 18)] + [(18, "left")]
    elif chapter_key == "chapter2":
        cols = [(18, "right")] + [(p, "both") for p in range(19, 27)] + [(27, "left")]
    elif chapter_key == "chapter3":
        cols = [(27, "right")] + [(p, "both") for p in range(28, 38)]
    else:
        return [], []

    all_body = []
    all_fn = []

    for pg, col in cols:
        lt = extract_column_lines(doc, pg, col, skip_headings=True)
        body, fn = separate_body_footnotes(lt)
        all_body.extend(body)
        all_fn.extend(fn)

    body_paragraphs = merge_lines_into_paragraphs(all_body)
    footnotes = merge_footnote_lines(all_fn)

    return body_paragraphs, footnotes


def extract_bibliography(doc):
    """
    Extract bibliography from pages 38-39.

    Page 38 layout:
      - Far left (x<400): decorative noise (KM W patterns) - SKIP
      - Left bib column (x~536): bibliography entries
      - Right bib column (x~707): bibliography entries (with "Bibliografia:" heading)

    Page 39 layout:
      - Left bib column (x~42): bibliography entries (continued)
      - Right bib column (x~214): bibliography entries (continued)
      - Far right columns (x~536, x~706): INDEX entries - SKIP (not bibliography!)
    """
    all_bib_lines = []

    # ── Page 38: bibliography at x >= 500 ──
    spans_38 = get_page_spans(doc, 38)
    if spans_38:
        bib_spans = [s for s in spans_38 if s["x"] >= 500 and s["size"] <= 10]
        bib_mid = 620
        left_col = sorted([s for s in bib_spans if s["x"] < bib_mid], key=lambda s: (s["y"], s["x"]))
        right_col = sorted([s for s in bib_spans if s["x"] >= bib_mid], key=lambda s: (s["y"], s["x"]))
        for col in [left_col, right_col]:
            if not col:
                continue
            lines = group_into_lines(col)
            for ln in lines:
                text = line_text(ln)
                if text:
                    all_bib_lines.append(text)

    # ── Page 39: bibliography at x < 400 (skip index at x >= 500) ──
    spans_39 = get_page_spans(doc, 39)
    if spans_39:
        bib_spans = [s for s in spans_39 if s["x"] < 400 and s["size"] <= 10]
        bib_mid = 130  # split between x~42 and x~214 columns
        left_col = sorted([s for s in bib_spans if s["x"] < bib_mid], key=lambda s: (s["y"], s["x"]))
        right_col = sorted([s for s in bib_spans if s["x"] >= bib_mid], key=lambda s: (s["y"], s["x"]))
        for col in [left_col, right_col]:
            if not col:
                continue
            lines = group_into_lines(col)
            for ln in lines:
                text = line_text(ln)
                if text:
                    all_bib_lines.append(text)

    # Merge into bibliography entries
    # Key heuristic: a new entry starts with a name (First Last) ONLY if
    # the previous line ended with a period or closing paren (i.e., complete entry).
    # If the previous line ends with a comma, "przeł.", "red.", etc., the current
    # line is a continuation even if it starts with a capitalized name.
    entries = []
    current = ""

    for text in all_bib_lines:
        text = text.strip()
        if not text:
            continue
        if re.match(r'^[KMW\s*←→—>►\-&4]+$', text) or text in ('4', '&'):
            continue

        # Check if this looks like the start of a new bibliography entry
        looks_like_new = False
        if re.match(r'^[A-ZŁŚŻŹĆĘĄÓ][a-złśżźćęąó]+\s+[A-ZŁŚŻŹĆĘĄÓ]', text):
            looks_like_new = True
        elif re.match(r'^(Odwilż|Refleksja|SIGMA|Sto lektur|Laozi)', text):
            looks_like_new = True

        # But only start a new entry if the PREVIOUS text is a complete entry
        prev_complete = False
        if current:
            prev = current.rstrip()
            # Ends with period or closing punctuation
            if prev and prev[-1] in '.)\u201d':
                prev_complete = True
            # Ends with a year (4 digits, optionally followed by period)
            if re.search(r'\d{4}\s*\.?\s*$', prev):
                prev_complete = True
            # Ends with page number like "s. 123" or "s. 123-456"
            if re.search(r's\.\s*\d[\d\-,.\s]*\.?\s*$', prev):
                prev_complete = True
            # Ends with "nr X" pattern (journal issue)
            if re.search(r'nr\s*\d+\s*\.?\s*$', prev):
                prev_complete = True
        else:
            prev_complete = True  # no previous = start of first entry

        is_new = looks_like_new and prev_complete

        if is_new and current:
            entries.append(clean_text(current))
            current = text
        elif current:
            if current.endswith('\u00ad'):
                current = current.rstrip('\u00ad') + text
            elif current.endswith('-') and text and text[0].islower():
                current = current[:-1] + text
            else:
                current += " " + text
        else:
            current = text

    if current:
        entries.append(clean_text(current))

    return entries


# ─── HTML Builders ───────────────────────────────────────────────────────────

def escape(text):
    text = html_module.escape(text)
    text = text.replace('\u00ad', '')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def build_title_html():
    return """<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl">
<head><title>Sztuka akcji. Dziesięć zdarzeń w Polsce</title>
<link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<p class="author-name">Jan Przyłuski</p>
<h1 class="title-page">Sztuka akcji</h1>
<h2 class="subtitle">Dziesięć zdarzeń w Polsce</h2>
<p class="publisher">Bałtycka Galeria Sztuki Współczesnej</p>
<p class="year">2007</p>
</body></html>"""


def build_dedication_html():
    return """<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl">
<head><title>Dedykacja</title>
<link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<p class="dedication">Dla Leszka Kolankiewicza</p>
</body></html>"""


def build_introduction_html(epigraphs, intro_paras, author_bio):
    parts = ["""<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl">
<head><title>Wstęp</title>
<link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
"""]
    for qt, at in epigraphs:
        parts.append(f"<blockquote>\n<p>{escape(qt)}</p>\n</blockquote>\n")
        if at:
            parts.append(f'<p class="quote-attribution">{escape(at)}</p>\n')
        parts.append("\n")

    parts.append('<hr class="section-break"/>\n\n')

    for i, p in enumerate(intro_paras):
        cls = ' class="no-indent"' if i == 0 else ''
        parts.append(f"<p{cls}>{escape(p)}</p>\n")

    if author_bio:
        parts.append('<hr class="section-break"/>\n')
        for line in author_bio:
            line = line.strip()
            if line == "Jan Przyłuski":
                parts.append(f'<p class="author-bio-signature">{escape(line)}</p>\n')
            else:
                parts.append(f'<p class="author-bio">{escape(line)}</p>\n')

    parts.append("\n</body>\n</html>")
    return "".join(parts)


def build_chapter_html(chapter_key, body_paras, footnotes):
    ch_num, ch_title = CHAPTER_TITLES[chapter_key]
    parts = [f"""<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl">
<head><title>{escape(ch_title)}</title>
<link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<h2>{escape(ch_num)}</h2>
<h1>{escape(ch_title)}</h1>
"""]
    for i, p in enumerate(body_paras):
        cls = ' class="no-indent"' if i == 0 else ''
        parts.append(f"<p{cls}>{escape(p)}</p>\n")

    if footnotes:
        parts.append('\n<div class="footnote">\n')
        for fn in footnotes:
            parts.append(f"<p>{escape(fn)}</p>\n")
        parts.append("</div>\n")

    parts.append("\n</body>\n</html>")
    return "".join(parts)


def build_bibliography_html(entries):
    parts = ["""<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl">
<head><title>Bibliografia</title>
<link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<h1>Bibliografia</h1>
"""]
    for entry in entries:
        parts.append(f'<p class="bib-entry">{escape(entry)}</p>\n')
    parts.append("\n</body>\n</html>")
    return "".join(parts)


# ─── EPUB Assembly ───────────────────────────────────────────────────────────

def build_epub():
    print("Opening PDF...")
    doc = fitz.open(PDF_PATH)

    book = epub.EpubBook()
    book.set_identifier("isbn-978-83-922414-9-2")
    book.set_title("Sztuka akcji. Dziesięć zdarzeń w Polsce")
    book.set_language("pl")
    book.add_author("Jan Przyłuski")
    book.add_metadata("DC", "publisher", "Bałtycka Galeria Sztuki Współczesnej")
    book.add_metadata("DC", "date", "2007")
    book.add_metadata("DC", "source", "ISBN 978-83-922414-9-2")

    css = epub.EpubItem(uid="style", file_name="style.css",
                        media_type="text/css", content=CSS_CONTENT.encode("utf-8"))
    book.add_item(css)

    # Title
    print("Building title page...")
    title_ch = epub.EpubHtml(title="Strona tytułowa", file_name="title.xhtml", lang="pl")
    title_ch.set_content(build_title_html().encode("utf-8"))
    title_ch.add_item(css)
    book.add_item(title_ch)

    # Dedication
    print("Building dedication...")
    ded_ch = epub.EpubHtml(title="Dedykacja", file_name="dedication.xhtml", lang="pl")
    ded_ch.set_content(build_dedication_html().encode("utf-8"))
    ded_ch.add_item(css)
    book.add_item(ded_ch)

    # Introduction
    print("Extracting introduction...")
    epi, intro_p, bio = extract_introduction(doc)
    print(f"  {len(epi)} epigraphs, {len(intro_p)} intro paragraphs, {len(bio)} author bio lines")

    intro_ch = epub.EpubHtml(title="Wstęp", file_name="introduction.xhtml", lang="pl")
    intro_ch.set_content(build_introduction_html(epi, intro_p, bio).encode("utf-8"))
    intro_ch.add_item(css)
    book.add_item(intro_ch)

    # Chapters
    ch_items = []
    for ch_key in ["chapter1", "chapter2", "chapter3"]:
        cn, ct = CHAPTER_TITLES[ch_key]
        print(f"Extracting {cn}: {ct}...")
        body, fn = extract_chapter(doc, ch_key)
        print(f"  {len(body)} paragraphs, {len(fn)} footnotes")

        ch = epub.EpubHtml(title=f"{cn}. {ct}", file_name=f"{ch_key}.xhtml", lang="pl")
        ch.set_content(build_chapter_html(ch_key, body, fn).encode("utf-8"))
        ch.add_item(css)
        book.add_item(ch)
        ch_items.append(ch)

    # Bibliography
    print("Extracting bibliography...")
    bib = extract_bibliography(doc)
    print(f"  {len(bib)} bibliography entries")

    bib_ch = epub.EpubHtml(title="Bibliografia", file_name="bibliography.xhtml", lang="pl")
    bib_ch.set_content(build_bibliography_html(bib).encode("utf-8"))
    bib_ch.add_item(css)
    book.add_item(bib_ch)

    # Navigation
    book.toc = [
        epub.Link("title.xhtml", "Strona tytułowa", "title"),
        epub.Link("dedication.xhtml", "Dedykacja", "dedication"),
        epub.Link("introduction.xhtml", "Wstęp", "introduction"),
        epub.Link("chapter1.xhtml", "Rozdział I. Happening, czyli o realności", "chapter1"),
        epub.Link("chapter2.xhtml", "Rozdział II. Antyhappening", "chapter2"),
        epub.Link("chapter3.xhtml", "Rozdział III. Performance", "chapter3"),
        epub.Link("bibliography.xhtml", "Bibliografia", "bibliography"),
    ]
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())
    book.spine = [title_ch, ded_ch, intro_ch] + ch_items + [bib_ch]

    print(f"\nWriting EPUB to: {EPUB_PATH}")
    epub.write_epub(EPUB_PATH, book, {})
    doc.close()
    print("Done!")


if __name__ == "__main__":
    build_epub()
