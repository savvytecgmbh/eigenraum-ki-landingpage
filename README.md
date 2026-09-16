# Eigenraum.ki – Landingpage

Produktseite der Eigenraum.ki-Suite: eine lokal gehostete KI-Arbeitsumgebung
für Steuerberater, Wirtschaftsprüfer und Rechtsanwälte.

**Live:** https://savvytecgmbh.github.io/eigenraum-ki-landingpage/

## Aufbau

```
index.html            Die Seite
impressum.html        Pflichtangaben nach § 5 DDG  – Registerdaten fehlen noch
datenschutz.html      Datenschutzerklärung        – juristisch noch nicht freigegeben
agb.html              Platzhalter
assets/css/styles.css Stylesheet (ein Bündel, inkl. Responsive-Layer am Ende)
assets/js/main.js     Navigation, Akkordeons, Rollenfilter, Scroll-Spy
assets/img/           Bilder als WebP
assets/fonts/         Quicksand, lokal ausgeliefert
robots.txt            Sperrt Suchmaschinen aus (Entwurfsfassung)
```

Kein Build-Schritt, keine Abhängigkeiten: die Dateien werden direkt ausgeliefert.
Zum lokalen Ansehen genügt

```bash
python3 -m http.server 8000
```

## Technische Eckpunkte

- **Keine externen Aufrufe.** Schriften, Bilder und Skripte kommen vom eigenen
  Server. Das ist bei einer Seite, die mit Datenhoheit ohne US-Beteiligung
  wirbt, keine Kür: ein Google-Fonts-CDN würde die IP jedes Besuchers an Google
  übertragen.
- **Breakpoints:** 1100 / 900 / 700 / 620 / 560 / 400 px. Ab 900 px greift die
  Burger-Navigation. Der Responsive-Layer steht am Ende von `styles.css` und
  überschreibt bewusst das darüberliegende Grundlayout – deshalb sind einzelne
  Blöcke nach unten mit `min-width` begrenzt.
- **Bilder:** WebP, mit `width`/`height` im Markup gegen Layout-Sprünge,
  alles unterhalb des ersten Bildschirms mit `loading="lazy"`.

## Vor dem Livegang

1. Registerdaten im Impressum ergänzen (gelb markiert).
2. Datenschutzerklärung juristisch freigeben lassen.
3. AGB einsetzen oder den Verweis in der Fußzeile entfernen.
4. Hosting nach Deutschland verlegen – GitHub Pages liegt bei GitHub Inc., USA.
5. `noindex` aus allen HTML-Dateien und das `Disallow` aus `robots.txt` entfernen.

Siehe [CHANGELOG.md](CHANGELOG.md) für den Verlauf der Änderungen.
