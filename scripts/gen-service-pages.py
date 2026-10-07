# -*- coding: utf-8 -*-
"""Pages de service du site : mentions légales, confidentialité, méthodologie,
widget et page d'iframe (RECETTE-SITE.md §2.2 et §13).

Le pied de page renvoyait vers /legal/, /privacy/ et /methodology/ depuis les
vingt pages du site, et aucune des trois n'existait : trois liens en 404 sur
chaque page, et un site qui ne dit nulle part qui le publie. Les pages sont
écrites ici plutôt qu'à la main pour que l'en-tête, le pied et l'identité de
l'éditeur restent ceux des autres pages.
"""
import os
import re

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "https://bumpweek.com"
MAJ = "26 September 2026"
MAJ_ISO = "2026-09-26"

_modele = open(os.path.join(RACINE, "about", "index.html"), encoding="utf-8").read()
HEAD = _modele[: _modele.index('  <script type="application/ld+json">')]
ENTETE = _modele[_modele.index("<body>") : _modele.index('  <nav aria-label="Breadcrumb"')]
PIED = _modele[_modele.index('  <footer class="site-footer">') :]


def page(slug, titre, description, fil, corps, h1=None, robots=""):
    head = HEAD
    for motif, valeur in (
        (r"<title>.*?</title>", f"<title>{titre}</title>"),
        (r'(<meta name="description" content=")[^"]*"', rf'\g<1>{description}"'),
        (r'(<link rel="canonical" href=")[^"]*"', rf'\g<1>{URL}/{slug}/"'),
        (r'(<meta property="og:title" content=")[^"]*"', rf'\g<1>{titre}"'),
        (r'(<meta property="og:description" content=")[^"]*"', rf'\g<1>{description}"'),
        (r'(<meta property="og:url" content=")[^"]*"', rf'\g<1>{URL}/{slug}/"'),
        (r'(<meta property="og:image" content=")[^"]*"', rf'\g<1>{URL}/img/og/accueil.png"'),
        (r'(<meta property="og:image:alt" content=")[^"]*"', rf'\g<1>{titre}"'),
        (r'(<meta name="twitter:image" content=")[^"]*"', rf'\g<1>{URL}/img/og/accueil.png"'),
    ):
        head = re.sub(motif, valeur, head, count=1, flags=re.S)
    if robots:
        head = head.replace("  <link rel=\"icon\"", f'  <meta name="robots" content="{robots}">\n\n  <link rel="icon"')
    ldjson = f"""  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{titre}",
    "description": "{description}",
    "url": "{URL}/{slug}/",
    "author": {{
      "@type": "Organization",
      "name": "Radif Partners",
      "url": "{URL}/about/",
      "foundingDate": "2026",
      "publishingPrinciples": "{URL}/methodology/",
      "knowsAbout": [
        "Family Budget",
        "Cost of Raising a Child",
        "Childcare Costs",
        "Parental Leave",
        "Personal Finance"
      ]
    }},
    "publisher": {{
      "@type": "Organization",
      "name": "BumpWeek",
      "url": "{URL}/"
    }},
    "dateModified": "{MAJ_ISO}",
    "mainEntityOfPage": "{URL}/{slug}/"
  }}
  </script>

"""
    fil_html = "\n".join(f"      <li><a href=\"{h}\">{l}</a></li>" for h, l in fil)
    return f"""{head}{ldjson}</head>

{ENTETE}  <nav aria-label="Breadcrumb" class="breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
{fil_html}
    </ol>
  </nav>

  <main>
    <article class="container">
      <h1>{h1 or titre}</h1>
      <p class="page-byline" data-author="Radif Partners">Published by Radif Partners · Updated <time datetime="{MAJ_ISO}">{MAJ}</time></p>

{corps}
    </article>
  </main>

{PIED}"""


PAGES = {}

PAGES["legal"] = dict(
    h1="Legal notice",
    titre="Legal Notice: Who Publishes BumpWeek and Its Limits",
    description="Who publishes BumpWeek, who answers for the figures on it, how to reach the editor, where the site is hosted, and what the baby cost estimates are not.",
    fil=[("/legal/", "Legal notice")],
    corps="""      <p>This page says who publishes BumpWeek, who answers for what is written on it, and where it is hosted. A reader who plans a household budget around a figure found here is entitled to know who stands behind that figure, on what it is based, and whom to write to when it is wrong. Everything below is stated in plain terms rather than by reference to a policy document.</p>

      <h2>Publisher</h2>

      <p>BumpWeek (<a href="https://bumpweek.com/">https://bumpweek.com</a>) is published by <strong>Radif Partners</strong>, a company which acts both as publisher and as the party responsible for content. Radif Partners answers for the editorial content of every page on this domain. It does not answer for the content of external sites reached through links, which remains the responsibility of their own publishers.</p>

      <p>Correspondence, corrections and legal notices: <a href="mailto:contact@bumpweek.com">contact@bumpweek.com</a>. Corrections to a published figure are the messages we act on fastest; if you can name the page and the number, we can usually check it the same week.</p>

      <h2>Hosting</h2>

      <p>The site is a set of static pages hosted by <strong>OVH SAS</strong>, 2 rue Kellermann, 59100 Roubaix, France (<a href="https://www.ovhcloud.com/" rel="nofollow">ovhcloud.com</a>). As a technical host, OVH exercises no editorial control over the content. There are no user accounts, no comment system and no server-side processing: the calculators run entirely in the visitor's browser, and no amount typed into one of them is transmitted anywhere.</p>

      <h2>Nature of the information</h2>

      <p>Every figure on this site is an estimate. The costs of pregnancy, birth, childcare and the first years of a child's life depend on the country, the state or region, the insurance contract, the employer and choices that only the family can make. The numbers published here describe what typical arrangements produce, drawn from public statistics and official schedules; they are not financial, tax, insurance or medical advice, and they cannot anticipate an individual case. Where a figure here and an official schedule disagree, the official schedule governs. The <a href="/methodology/">methodology page</a> sets out where each class of figure comes from.</p>

      <h2>Intellectual property</h2>

      <p>The texts, tables, comparisons and calculators on this site are original work and are protected by copyright. They may be quoted, briefly and with a visible link to the page quoted, for information purposes. They may not be republished in full, translated wholesale or used to train a commercial dataset without written permission. The official statistics and legal schedules referenced are public documents and are linked rather than reproduced.</p>

      <h2>Terms of use</h2>

      <p>The site is free to use and carries no registration. We use reasonable means to keep it available and accurate, but we accept no obligation of result: access may be interrupted for maintenance, and a page may be out of date between an official rate change and our next revision. Use of the calculators, and any decision taken on the strength of their output, is at the visitor's own risk.</p>

      <h2>Privacy</h2>

      <p>BumpWeek sets no cookies and Radif Partners records no personal data about its readers. The only measurement is an anonymous, cookieless check of site stability with Microsoft Clarity, described with its provider, retention period and the way to object on the <a href="/privacy/">privacy policy</a>.</p>""",
)

PAGES["privacy"] = dict(
    h1="Privacy policy",
    titre="Privacy Policy: What BumpWeek Collects and Never Does",
    description="BumpWeek sets no cookies and keeps no personal data: the baby cost calculators run in your browser, and only anonymous, cookieless stability checks are made.",
    fil=[("/privacy/", "Privacy policy")],
    corps="""      <p>BumpWeek is a set of static pages about the cost of having a baby, with calculators that run in your browser. That shapes everything below: the due date, salary, childcare quote or registry items you enter stay on your device and are never sent to us, because there is no server here to receive them. This site sets no cookie, and Radif Partners keeps no personal data about the people who read it. The only thing measured is whether the pages work properly, anonymously, as explained here.</p>

      <h2>Who is responsible</h2>

      <p>The publisher of BumpWeek is <strong>Radif Partners</strong>, reachable at <a href="mailto:contact@bumpweek.com">contact@bumpweek.com</a>. Full publisher details are on the <a href="/legal/">legal notice</a>.</p>

      <h2>What the baby cost calculators do with your figures</h2>

      <p>Nothing leaves your browser and nothing is kept on your device. The baby cost calculator, the budget planner, the formula calculator and the registry checklist compute their results with JavaScript on your own screen; when you close or reload the page, the figures are gone. They write nothing to cookies, local storage or session storage, and we have no copy of what you typed.</p>

      <h2>No cookies</h2>

      <p>No cookie is set by BumpWeek, by its calculators or by the stability measurement described below: no <code>_clck</code>, <code>_clsk</code>, <code>MUID</code> or <code>CLID</code>, and no advertising or audience cookie of any kind. Because there is nothing to accept or refuse, there is no cookie banner on this site.</p>

      <h2>Anonymous measurement of site stability</h2>

      <p>To spot broken pages, we use Microsoft Clarity in its cookieless mode. It reports technical signals only: script errors, loading times, clicks that do nothing (a button that fails on a phone, for instance) and how far a page is scrolled. Each page view receives its own random identifier, so two pages read by the same person are not linked together and no visitor can be followed from one visit to the next. The text of the pages and everything typed into the calculators is masked in your browser before anything is sent, so Clarity never sees a due date, a salary or an amount.</p>

      <ul>
        <li><strong>Provider:</strong> Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Ireland (<a href="https://privacy.microsoft.com/privacystatement" rel="nofollow noopener" target="_blank">Microsoft privacy statement</a>). Data may be processed by Microsoft Corporation in the United States under the EU–U.S. Data Privacy Framework.</li>
        <li><strong>Purpose:</strong> finding and fixing technical faults on the guides and calculators, nothing else. No profile is built and nothing is sold or used for advertising.</li>
        <li><strong>Retention:</strong> 30 days for the anonymous page-view records, 13 months for aggregated statistics.</li>
        <li><strong>Legal basis:</strong> our legitimate interest in keeping a free site working (Article 6(1)(f) GDPR, and the equivalent provision of the UK GDPR).</li>
        <li><strong>How to object:</strong> block the domain clarity.ms in your browser or with a content blocker, or write to <a href="mailto:contact@bumpweek.com">contact@bumpweek.com</a>. Every page and every calculator works the same without it.</li>
      </ul>

      <h2>Hosting and other technical requests</h2>

      <p>The site is hosted by OVH SAS in France. Like any web server, it keeps short technical logs (IP address, page requested, date) for security and to keep the service running; we do not use them to identify readers. Pages load fonts from Google Fonts, which receives your IP address in order to send the font file, without setting a cookie. If you write to us by e-mail, your message is kept only as long as needed to answer it. Links to external sites lead to pages whose own policy then applies.</p>

      <h2>Your rights</h2>

      <p>Under the GDPR and the UK GDPR you may ask for access to, correction or erasure of any personal data about you, and you may object to the stability measurement. As we hold no file in which a reader can be identified, the usual answer to an access request is that there is nothing to disclose, and we will confirm that in writing if you ask at <a href="mailto:contact@bumpweek.com">contact@bumpweek.com</a>. You may also complain to a data protection authority: the CNIL in France (<a href="https://www.cnil.fr/" rel="nofollow">cnil.fr</a>), where the publisher is established, the ICO in the United Kingdom (<a href="https://ico.org.uk/" rel="nofollow">ico.org.uk</a>), or the authority of your own country.</p>""",
)

PAGES["methodology"] = dict(
    h1="Methodology",
    titre="Baby Cost Data Methodology: Sources, Ranges, Updates",
    description="The sources behind every cost on BumpWeek, how ranges rather than averages are built, how currencies and years are handled, and how errors get corrected.",
    fil=[("/methodology/", "Methodology")],
    corps="""      <p>Every number on this site can be traced to a published source, and this page explains how we get from that source to the figure you read. Baby costs are unusually easy to get wrong: the widely quoted totals mix years, mix countries, mix households and are then repeated without their assumptions. Our rule is that a figure is only worth publishing if we can say who measured it, when, for whom, and what it excludes. Where we cannot, we say the number is an estimate and give the range instead of a false precision.</p>

      <h2>Which sources we use</h2>

      <ul>
        <li><strong>Official statistics first.</strong> The <a href="https://www.usda.gov/" rel="nofollow">US Department of Agriculture</a> expenditure study for the cost of raising a child, the <a href="https://www.bls.gov/cex/" rel="nofollow">Bureau of Labor Statistics</a> Consumer Expenditure Survey for household spending, the <a href="https://www.ons.gov.uk/" rel="nofollow">Office for National Statistics</a> for UK prices and earnings.</li>
        <li><strong>Government schedules for anything a rule sets.</strong> Tax credits from the <a href="https://www.irs.gov/" rel="nofollow">IRS</a>, UK entitlements from <a href="https://www.gov.uk/" rel="nofollow">GOV.UK</a>, childcare programmes from <a href="https://childcare.gov/" rel="nofollow">childcare.gov</a>, leave rights from the <a href="https://www.dol.gov/" rel="nofollow">Department of Labor</a>. These are copied, not estimated.</li>
        <li><strong>Sector surveys where no public body measures the market</strong>, such as nursery and nanny rates, and only where the sample and the date are disclosed.</li>
        <li><strong>Published prices</strong> for consumables like formula and nappies, collected from national retailers and stated as a range across brands.</li>
      </ul>

      <h2>Why we publish ranges</h2>

      <p>An average hides the thing that matters most. Infant childcare in the United States runs from roughly $6,000 a year in parts of the South to over $26,000 in Massachusetts and the District of Columbia; the national mean describes almost nobody. So costs appear here as a low-to-high range with the driver of the spread named next to it, and the calculators let you replace the range with your own figure. Where a single number is unavoidable, we say which household it describes.</p>

      <h2>Years, inflation and currencies</h2>

      <p>Each figure carries the year of its source. Older statistics are adjusted to current prices with the relevant national consumer price index, and we say when we have done so rather than presenting a restated figure as a fresh measurement. Cross-country comparisons are shown in local currency first, with an indicative conversion at the rate of the month of publication; exchange rates move, and a converted total is an illustration, not a quote.</p>

      <h2>What we exclude</h2>

      <p>Totals described as birth-to-eighteen stop at eighteen and exclude higher education, which is a separate and largely optional cost. Housing is included only as the marginal cost attributable to the child, not as the whole rent or mortgage. Lost earnings from a career break are treated separately in the going-back-to-work guide, because counting them inside a spending total double-counts the same decision.</p>

      <h2>Updating and corrections</h2>

      <p>Pages carry the date of their last review. Anything driven by an official schedule, tax credits, statutory pay, benefit caps, is checked when the schedule changes; market prices are reviewed annually. If you find a figure that is wrong or out of date, write to <a href="mailto:contact@bumpweek.com">contact@bumpweek.com</a> with the page and the number. Corrections are made on the page itself and the review date is moved, rather than quietly edited.</p>

      <h2>Independence</h2>

      <p>No brand, nursery chain, insurer or retailer pays for placement on this site, and no figure or recommendation is influenced by a commercial relationship. Where a product is named, it is named because its price is a data point.</p>""",
)

PAGES["widget"] = dict(
    h1="Baby cost widget",
    titre="Free Baby Cost Widget for Your Site: Embed in One Line",
    description="Embed the BumpWeek baby cost calculator on your own site with a single line of HTML. Free, no tracking, responsive, and it works on any page or platform.",
    fil=[("/widget/", "Widget")],
    corps="""      <p>The baby cost calculator can be embedded on any website, blog or intranet page with a single line of HTML. It is free, it carries no advertising, it sets no cookie on your visitors, and it resizes to the width of whatever column you put it in. Parenting sites, midwifery practices, employers publishing a parental leave handbook and financial advisers all use it for the same reason: it answers the first question an expecting parent asks, without sending anyone away from the page they are on.</p>

      <h2>The embed code</h2>

      <pre><code>&lt;iframe src="https://bumpweek.com/embed/"
        width="100%" height="720"
        style="border:0;max-width:680px"
        title="Baby cost calculator by BumpWeek"
        loading="lazy"&gt;&lt;/iframe&gt;</code></pre>

      <p>Paste it into your page's HTML where you want the calculator to appear. In WordPress, use a Custom HTML block; in Ghost, an HTML card; in Notion or Squarespace, an embed block pointing at <a href="/embed/">https://bumpweek.com/embed/</a>.</p>

      <h2>Options</h2>

      <ul>
        <li><strong>Height.</strong> 720&nbsp;pixels fits the calculator without an inner scrollbar on desktop. On narrow mobile layouts, 900 is safer.</li>
        <li><strong>Width.</strong> Leave it at 100&nbsp;% and cap it with <code>max-width</code>; the layout is responsive down to 320&nbsp;pixels.</li>
        <li><strong>Lazy loading.</strong> Keep <code>loading="lazy"</code> so the widget costs your page nothing until it scrolls into view.</li>
      </ul>

      <h2>Terms</h2>

      <p>Use of the widget is free for any site, commercial or not, provided the attribution link inside it is left visible. Do not modify the frame's content, and do not present the calculator as your own work. We may change the calculation when an official figure changes; embedded copies update automatically, which is the point of embedding rather than copying.</p>

      <h2>Privacy for your visitors</h2>

      <p>The embedded calculator runs entirely in the visitor's browser. Nothing they type is transmitted, no cookie is set by the frame, and no identifier is shared with the host page. You can embed it without adding a line to your own cookie notice.</p>

      <h2>Support</h2>

      <p>Questions, or a layout the frame does not fit: <a href="mailto:contact@bumpweek.com">contact@bumpweek.com</a>.</p>""",
)

EMBED = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baby Cost Calculator, BumpWeek widget</title>
  <meta name="description" content="Embeddable version of the BumpWeek baby cost calculator: first-year and birth-to-eighteen estimates by country, state and lifestyle.">
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://bumpweek.com/tools/baby-cost-calculator/">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/style.css">
  <style>
    body { margin: 0; padding: 16px; background: #fff; }
    .embed-credit { font-size: .85rem; text-align: right; margin: 12px 0 0; }
  </style>
</head>
<body class="embed">
  <main>
    <h1 class="embed-title">Baby cost calculator</h1>
__CALC__
    <p class="embed-credit">Calculator by <a href="https://bumpweek.com/" target="_blank" rel="noopener">BumpWeek</a></p>
  </main>
  <script src="/js/main.js" defer></script>
</body>
</html>
"""

if __name__ == "__main__":
    for slug, p in PAGES.items():
        os.makedirs(os.path.join(RACINE, slug), exist_ok=True)
        with open(os.path.join(RACINE, slug, "index.html"), "w", encoding="utf-8") as f:
            f.write(page(slug, p["titre"], p["description"], p["fil"], p["corps"], p.get("h1")))
        print("  ", slug)
    os.makedirs(os.path.join(RACINE, "embed"), exist_ok=True)
    # Le calculateur n'est pas recopié : il est repris tel quel de sa page, pour
    # qu'une correction faite là-bas soit servie aussi dans les iframes.
    outil = open(os.path.join(RACINE, "tools", "baby-cost-calculator", "index.html"), encoding="utf-8").read()
    debut = outil.index('      <div id="baby-calc"')
    # fin du bloc : la balise fermante qui ramène la profondeur à zéro
    profondeur, i = 0, debut
    for m in re.finditer(r"<div\b|</div>", outil[debut:]):
        profondeur += 1 if m.group(0) == "<div" else -1
        if not profondeur:
            i = debut + m.end()
            break
    calc = outil[debut:i]
    with open(os.path.join(RACINE, "embed", "index.html"), "w", encoding="utf-8") as f:
        f.write(EMBED.replace("__CALC__", calc))
    print("   embed")
