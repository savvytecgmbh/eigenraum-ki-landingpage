# Changelog

Alle nennenswerten Änderungen an der Eigenraum.ki-Landingpage.
Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## [1.1.0] – 2026-09-17

Vier Befunde aus dem Praxistest, dazu drei weitere aus dem eigenen Durchgang.

### Behoben

- **Rückmeldezeile lag auf dem „DATEV verbunden"-Etikett.** Die Zeile aus 1.0.2
  saß in der klebenden Leiste; beim Scrollen schwebt die Leiste über dem Inhalt,
  und Text ohne Hintergrund landete mitten auf dem Etikett. Die Zeile steht jetzt
  unterhalb der Leiste im normalen Fluss – die weiße Pille darf schweben, der
  Text nicht.

- **Zwei verwaiste Pfeile unter den Säulen.** Sie sollten sagen: „Die Toolbox
  und die Workflows werden unten aufgeschlüsselt" – standen aber unverbunden im
  Raum, weil die Säulen in vier Spalten stehen (Mitten 37,5 / 62,5 %), die Listen
  darunter in zwei (25 / 75 %). Jetzt führen Verbindungslinien mit Knick von der
  Säule zum jeweiligen Listentitel, und beide Titel tragen das Symbol ihrer Säule.
  Die Linien erscheinen nur, solange die Säulen vierspaltig stehen (> 980 px).

- **Word-Schaubild am Telefon.** Dokument und Add-in wurden untereinander
  gestapelt; das ergibt ein anderes Bild als Word mit seitlichem Aufgabenbereich.
  Beide bleiben jetzt auf jeder Breite nebeneinander – das Dokument schmal, das
  Add-in in Mockup-Schriftgröße.

- **Karten versprachen einen Klick, dem nichts folgte.** Säulen und Werkzeugkarten
  hoben sich beim Überfahren an, waren aber reine Beschreibungen. Der Effekt
  bleibt nur auf der Karte, die tatsächlich etwas tut (Klick-Demo). Zu Modalen
  siehe unten.

- **Kopfbereich zwischen 901 und 999 px zweizeilig.** Die Desktop-Navigation
  braucht rund 1000 px; darunter rutschte „Demo anfragen" unter das Logo. Die
  Burger-Navigation greift jetzt ab 1000 px (statt 900). iPad quer mit 1024 px
  bleibt Desktop.

- **Anrede uneinheitlich.** Vier FAQ-Antworten duzten („Deine Daten bleiben …",
  „lokal auf euren Servern"), der Rest der Seite siezt. Auf Sie-Form vereinheitlicht.
  Unverändert bleibt das Produkt-Mockup im Hero („Stelle deine Frage …") – das
  ist Oberfläche der Suite, nicht Ansprache des Besuchers.

### Neu

- **Ankunftssignal nach dem Sprung von der Klick-Demo-Karte:** Ein
  magentafarbener Balken wächst am Kopf des Demoflow-Abschnitts auf und zieht
  sich zurück – „hier geht es weiter". Vorher wirkte der Sprung wie ein bloßes
  Herunterscrollen.

### Entscheidung: keine Modale für die Werkzeugkarten

Die Karten enthalten bereits ihren gesamten Inhalt (Titel, zwei Sätze,
Berufsgruppen). Ein Modal würde denselben Text noch einmal zeigen – ein Klick,
der nichts Neues bringt. Sobald es pro Werkzeug mehr gibt (Screenshot, Ablauf in
drei Schritten, Beispiel-Prompt), lohnt sich die Modal-Hülle; sie ist dann in
einer Stunde gebaut.

### Geprüft

- Desktop 1180 px: Leiste angeheftet ohne Überlappung, Linien enden über den
  Titeln, Ankunftsbalken (ohne Transition gemessen: scaleX 0 → 1).
- Telefon 393 px: Word-Schaubild 101 + 226 px nebeneinander; Schalter, Hinweis,
  FAQ, Kontakt, Footer.
- 905 / 640 px: Kopfbereich einzeilig bzw. Burger, Säulen 2×2, Linien aus.
- Nach der Änderung nur noch Hover-Regeln auf `.usecase-card--demo`.

## [1.0.3] – 2026-09-16

### Behoben

- **Aktualisierte Dateien kamen bis zu zehn Minuten lang nicht an.** GitHub Pages
  liefert alles mit `cache-control: max-age=600` aus. Nach einem Deploy konnte
  der Browser deshalb neues HTML mit altem Skript kombinieren – die Seite sah
  dann aktuell aus, verhielt sich aber wie vorher. Genau das trat beim Prüfen
  der 1.0.2-Fassung auf: Der Server hatte die neue Datei (gleiche Prüfsumme wie
  lokal), im Browser lief trotzdem die alte.

  `styles.css` und `main.js` werden nun mit `?v=<Version>` eingebunden.
  **Diese Nummer bei jeder Änderung mitziehen** – sie entspricht dem obersten
  Eintrag in dieser Datei.

## [1.0.2] – 2026-09-16

### Behoben

- **Der Berufsgruppen-Schalter wirkte wie tot.** Ein Tippen auf „Für Rechtsanwälte"
  färbte zwar die Schaltfläche, sonst schien nichts zu geschehen. Der Filter
  arbeitete korrekt – nur liegen die Karten, die er hervorhebt, am Telefon
  **1412 px weiter unten**, also rund anderthalb Bildschirmhöhen außerhalb des
  Sichtfelds.

  Unter dem Schalter steht nun eine Zeile, die sich bei jedem Umschalten sichtbar
  ändert und sagt, wo die Wirkung eintritt: „In der Übersicht unten hervorgehoben:
  5 Werkzeuge und 2 Workflows für Rechtsanwälte". Sie ist mit `aria-live`
  ausgezeichnet, wird also auch vorgelesen.

  Bewusst **kein** automatischer Sprung zu den Karten: ein unerwarteter Satz über
  1400 px reißt den Schalter aus dem Bild und desorientiert mehr, als er hilft.

- **Das Wasserzeichen überlappte den Titel.** Auf schmalen Schirmen lief die
  zweizeilige Überschrift „Eigenraum.ki-Suite für (DATEV-)Kanzleien" unter das
  Logo in der Ecke. Unterhalb 760 px wird es ausgeblendet – es ist reine Zierde,
  das Logo steht ohnehin im Kopfbereich.

### Geprüft

- Alle drei Berufsgruppen durchgeschaltet: Die Rückmeldung ändert sich jedes Mal
  (1 bzw. 2 Workflows), die Seite springt dabei nicht.
- 320, 393, 744 und 1440 px: kein seitliches Scrollen, kein Überstand,
  Navigation trifft.

## [1.0.1] – 2026-09-16

### Behoben

- **Kein einziger Sprunglink funktionierte** – weder die Navigation noch die
  „Demo anfragen"-Schaltflächen noch „Wie es funktioniert". Am iPhone tat ein
  Antippen schlicht nichts.

  Ursache war `html { scroll-behavior: smooth }` aus der Entwurfsfassung: Die
  Seite ist rund 19 Bildschirmhöhen lang, und über solche Distanzen führen
  Browser die weiche Bewegung teilweise gar nicht aus. Das Sprungziel wird dann
  nie erreicht. Verschärft wurde es dadurch, dass das Skript zusätzlich
  `preventDefault()` aufrief – damit entfiel auch das native Springen des
  Browsers als Rückfallebene, und der Link war endgültig wirkungslos.

  Nachgewiesen im Browser: Mit `behavior: 'smooth'` blieb `scrollY` auf 0, mit
  `behavior: 'instant'` sprang die Seite korrekt auf 12837. Zu beachten ist,
  dass `behavior: 'auto'` **nicht** „sofort" bedeutet, sondern „nimm den
  CSS-Wert" – also ebenfalls smooth.

  Sämtliche Sprünge laufen jetzt über eine Funktion `springeZu()` und erfolgen
  sofort, mit eigener Berechnung des Abstands zum Kopfbereich.

- **Das Menü konnte unsichtbar bleiben, obwohl es als geöffnet galt.**
  `visibility` wurde mitanimiert; hängt oder unterbleibt die Animation, bleibt
  der Wert auf `hidden`. Es wird jetzt hart geschaltet, animiert werden nur noch
  Deckkraft und Verschiebung.

- **Ohne JavaScript war die Navigation unerreichbar.** Die Menüpunkte lagen in
  einem Panel, das sich nur per Skript öffnen ließ. Die Panel-Darstellung hängt
  jetzt an einer `js`-Klasse; fehlt sie, steht die Navigation als normale Zeile
  unter dem Logo.

### Geprüft

- Alle sechs Navigationsziele, beide Hero-Schaltflächen, die Klick-Demo-Karte
  und „Zurück nach oben" – bei 393 px (Burger-Menü) und 1440 px (Desktop).
  Jeder Abschnitt landet exakt unter dem Kopfbereich.
- Externe Verweise und die Verweise auf Impressum, Datenschutz und AGB werden
  nicht abgefangen, sondern laufen nativ.
- Weiterhin kein seitliches Scrollen auf allen acht geprüften Gerätebreiten.

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
