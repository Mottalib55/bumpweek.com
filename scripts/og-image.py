# -*- coding: utf-8 -*-
"""Images Open Graph du site (§11).

Aucune page ne déclarait og:image : partagée, chaque page sortait sans vignette.
Une carte par page, dessinée aux couleurs du site (#1a1a2e, #e63946), à partir
du <title> et de la meta description déjà rédigés.
"""
import html
import os
import re

from PIL import Image, ImageDraw, ImageFont

ROUGE = (230, 57, 70)
FONCE = (26, 26, 46)
BLANC = (255, 255, 255)
CLAIR = (226, 226, 236)
GRAS = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
NORMAL = "/System/Library/Fonts/Supplemental/Arial.ttf"
RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SORTIE = os.path.join(RACINE, "img", "og")


def lignes_de(d, texte, police, largeur):
    mots, ligne, lignes = texte.split(), "", []
    for mot in mots:
        essai = (ligne + " " + mot).strip()
        if d.textlength(essai, font=police) > largeur:
            lignes.append(ligne)
            ligne = mot
        else:
            ligne = essai
    lignes.append(ligne)
    return lignes


def carte(titre, sous_titre, chemin):
    img = Image.new("RGB", (1200, 630), FONCE)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 1200, 12], fill=ROUGE)
    d.text((80, 84), "BumpWeek", font=ImageFont.truetype(GRAS, 44), fill=ROUGE)
    police = ImageFont.truetype(GRAS, 68)
    lignes = lignes_de(d, titre, police, 1040)[:3]
    y = 210
    for l in lignes:
        d.text((80, y), l, font=police, fill=BLANC)
        y += 84
    if sous_titre:
        petite = ImageFont.truetype(NORMAL, 34)
        toutes = lignes_de(d, sous_titre, petite, 1040)
        gardees = toutes[:2]
        # une description coupée en plein milieu se lit mal : on le signale
        if len(toutes) > 2:
            gardees[-1] = gardees[-1].rstrip(" ,;") + "\u2026"
        for l in gardees:
            d.text((80, y + 14), l, font=petite, fill=CLAIR)
            y += 46
    d.text((80, 548), "bumpweek.com", font=ImageFont.truetype(NORMAL, 30), fill=ROUGE)
    img.save(chemin, "PNG", optimize=True)


def texte(balise, page):
    m = re.search(balise, page, re.S | re.I)
    return html.unescape(re.sub(r"\s+", " ", m.group(1))).strip() if m else ""


if __name__ == "__main__":
    os.makedirs(SORTIE, exist_ok=True)
    for racine, dossiers, fichiers in os.walk(RACINE):
        dossiers[:] = [x for x in dossiers if x not in ("node_modules", ".git", "img", "css", "js", "scripts")]
        if "index.html" not in fichiers:
            continue
        page = open(os.path.join(racine, "index.html"), encoding="utf-8").read()
        rel = os.path.relpath(racine, RACINE)
        nom = ("accueil" if rel == "." else rel.replace("/", "-")) + ".png"
        # le titre de la carte est celui de la page, sans le suffixe de marque
        titre = re.split(r"\s+[|—]\s+", texte(r"<title>(.*?)</title>", page))[0]
        sous = texte(r'<meta name="description" content="(.*?)"', page)
        carte(titre, sous, os.path.join(SORTIE, nom))
        print("  ", nom)
