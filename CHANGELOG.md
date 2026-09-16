# Changelog

Alle nennenswerten Änderungen an der Eigenraum.ki-Landingpage.
Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [1.0.0] – 2026-09-16

Überarbeitung der Entwurfsfassung `Eigenraum-ki_landing-page_komplett_vENTWURF.html`
zu einer Seite, die auf Telefon, Tablet und Desktop funktioniert.

### Behoben

- **Kein Viewport-Meta-Tag.** Die Ursache dafür, dass die Seite am iPhone wie eine
  herausgezoomte Desktop-Seite aussah: ohne dieses Tag rendert iOS mit 980 px
  Breite und skaliert herunter – sämtliche vorhandenen Media Queries liefen
  dadurch ins Leere.
- **Sieben Links zeigten auf `#`** und taten nichts: zweimal „Demo anfragen",
  „Wie es funktioniert", „Nach oben" sowie Impressum, AGB und Datenschutz.
  Alle haben jetzt ein Ziel.
- **FAQ-Antworten wurden abgeschnitten.** `max-height: 480px` reicht, solange der
  Text breit läuft; am Telefon bricht er einspaltig um und wurde mittendrin
  gekappt. Die Höhe wird jetzt aus dem Inhalt berechnet.
- **Das Kernteam war am Telefon unvollständig.** Gleiche Ursache, `max-height: 2400px`
  bei acht Personen untereinander.
- **Überzählige `}` im Stylesheet** hinter der Hover-Regel der Use-Case-Karten.
- **Feste Kartenhöhe** (`height: 266px`) sprengte umbrechenden Text auf schmalen
  Schirmen; jetzt `min-height`.
- **Zusammenklebende Wörter** im Word-Schaubild („LageberichtderMusterUnternehmen"),
  sobald die Zeilenumbrüche am Telefon entfielen.
- **Hover-Effekte blieben auf Touchscreens kleben** – sie gelten jetzt nur noch
  für Geräte mit echtem Zeiger.

### Geändert

- **Navigation.** Ab 900 px Breite ein Burger-Menü als Panel unter dem Kopfbereich,
  mit abdunkelndem Hintergrund, Schließen per Escape, Rücktaste oder Tippen daneben.
  Vorher brachen sechs Menüpunkte samt Schaltfläche unkontrolliert um.
- **Hero am Telefon:** zuerst die Überschrift, dann das Produktbild. Vorher landete
  man auf einem Screenshot ohne Kontext.
- **Schaubild „Datengrundlage".** Sieben Spalten à 142 px passen auf kein Telefon.
  Die Pfeilreihe entfällt unterhalb 900 px, die Quellen werden zum Raster
  (3 → 2 → 1 Spalte); der Hinweis auf das DATEVconnect Gateway wandert dabei
  direkt an die DATEV-Quelle, damit die Information nicht verloren geht.
- **Word-Schaubild** unterhalb 700 px einspaltig, Nummernpunkte bleiben im Bild.
- **Kernteam** am Telefon zweispaltig: Foto links, Angaben rechts.
- **Schrift lokal ausgeliefert** statt über das Google-Fonts-CDN. Eine Seite, die
  mit Datenhoheit ohne US-Anbieter wirbt, sollte nicht die IP jedes Besuchers an
  Google übertragen. Als variabler Schnitt deckt eine Datei alle Gewichte ab.
- **Dateigröße:** 1,4 MB → rund 190 KB. Die 17 eingebetteten Base64-Bilder liegen
  jetzt als WebP-Dateien vor (992 → 156 KB) und sind damit auch zwischenspeicherbar.
- **Aufteilung** in `index.html`, `assets/css/styles.css` und `assets/js/main.js`.

### Neu

- Kontaktabschnitt `#kontakt` am Seitenende als Ziel der „Demo anfragen"-Schaltflächen,
  mit E-Mail-Verweis. Der Footer nutzt jetzt die Gestaltung, die im Stylesheet
  bereits angelegt, aber nie eingebunden war.
- `impressum.html`, `datenschutz.html`, `agb.html` – mit gelb markierten Feldern
  für die noch fehlenden Angaben.
- Zurück-nach-oben-Schaltfläche, die nach einer Bildschirmhöhe erscheint.
- Favicon und Apple-Touch-Icon.
- `robots.txt` und `noindex`, solange die Seite Entwurf ist.
- Zugänglichkeit: Sprunglink zum Inhalt, sichtbarer Tastaturfokus, `aria-expanded`
  und `aria-controls` an allen Akkordeons, Tippflächen ab 44 px, Rücksicht auf
  „Bewegung reduzieren", Druckausgabe.
- Unterstützung für die Notch-Bereiche im Querformat (`env(safe-area-inset-*)`).

### Geprüft

- Kein seitliches Scrollen bei 320, 375, 393, 430, 744, 820, 1024 und 1440 px –
  auch mit ausgeklappten Akkordeons.
- Alle internen Sprungmarken und Dateiverweise lösen auf; die vier externen
  Verweise (GHJ, savvytec, Q-FOX, Handelsblatt) antworten mit HTTP 200.
- Keine Fehler in der Browser-Konsole.
