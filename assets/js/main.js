/* =============================================================================
   Eigenraum.ki – Landingpage
   Interaktion: Navigation, Akkordeons, Rollenfilter, Scroll-Spy
   ============================================================================= */
(function () {
  'use strict';

  // Markiert, dass JavaScript läuft. Ohne diese Klasse zeigt das Stylesheet
  // die Navigation als normale Liste, statt sie in ein Panel zu legen,
  // das sich ohne JavaScript nicht öffnen ließe.
  document.documentElement.classList.add('js');

  /* ---------------------------------------------------------------------------
     Header-Höhe als CSS-Variable bereitstellen
     Sie steuert scroll-margin-top der Abschnitte und die Position des Menüs.
     --------------------------------------------------------------------------- */
  var headerEl = document.querySelector('.site-header');

  function updateHeaderHeight() {
    if (!headerEl) return;
    document.documentElement.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
  }

  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener('orientationchange', updateHeaderHeight);
  window.addEventListener('load', updateHeaderHeight);

  /* ---------------------------------------------------------------------------
     Aus- und Einklappen von Panels

     Die Höhe wird in Pixeln gesetzt, statt im Stylesheet einen festen
     Grenzwert zu hinterlegen: ein solcher Wert schneidet lange Inhalte ab,
     sobald der Text am Telefon einspaltig umbricht – genau das passierte
     hier zuvor bei den FAQ-Antworten und beim Kernteam.
     Beim Drehen des Geräts werden offene Panels neu vermessen.
     --------------------------------------------------------------------------- */
  function klappe(panel, offen) {
    if (!panel) return;

    // scrollHeight liefert die volle Inhaltshöhe, unabhängig vom gesetzten
    // max-height – auch im zugeklappten Zustand.
    if (offen) {
      panel.classList.add('is-offen');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      panel.classList.remove('is-offen');
      panel.style.maxHeight = '0px';
    }
  }

  // Beim Drehen des Geräts bricht der Text anders um: offene Panels neu vermessen
  var messTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(messTimer);
    messTimer = setTimeout(function () {
      document.querySelectorAll('.is-offen').forEach(function (p) {
        p.style.maxHeight = p.scrollHeight + 'px';
      });
    }, 120);
  });

  /* ---------------------------------------------------------------------------
     Zu einem Abschnitt springen

     Bewusst ohne weiche Bewegung. Die Seite ist rund 19 Bildschirmhöhen
     lang; über solche Distanzen führen Browser ein smooth-Scrolling teils
     gar nicht aus. Dann bewegt sich überhaupt nichts und jeder Link wirkt
     tot – genau dieser Fehler trat auf dem iPhone auf. Ein sofortiger
     Sprung ist das Standardverhalten des Webs und funktioniert überall.
     --------------------------------------------------------------------------- */
  function springeZu(ziel) {
    var y = (typeof ziel === 'number')
      ? ziel
      : Math.round(ziel.getBoundingClientRect().top + window.pageYOffset
                   - ((headerEl ? headerEl.offsetHeight : 0) + 18));
    if (y < 0) y = 0;

    var start = window.pageYOffset;
    if (Math.abs(y - start) < 2) return;

    try {
      // 'instant' erzwingt den Sprung; 'auto' würde den CSS-Wert verwenden.
      window.scrollTo({ top: y, behavior: 'instant' });
    } catch (e) {
      // Ältere Browser kennen die Objektform nicht
      window.scrollTo(0, y);
    }

    // Sicherheitsnetz, falls der Sprung dennoch ausbleibt
    if (Math.abs(window.pageYOffset - start) < 4) window.scrollTo(0, y);
  }

  /* ---------------------------------------------------------------------------
     Mobile Navigation
     --------------------------------------------------------------------------- */
  (function () {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('siteNav');
    var backdrop = document.getElementById('navBackdrop');
    if (!toggle || !nav) return;

    function istMobil() {
      return window.matchMedia('(max-width: 1000px)').matches;
    }

    function setNav(offen) {
      toggle.setAttribute('aria-expanded', offen ? 'true' : 'false');
      nav.classList.toggle('is-open', offen);
      if (backdrop) {
        if (offen) {
          backdrop.hidden = false;
          // Erzwingt einen Frame, damit die Einblendung animiert
          requestAnimationFrame(function () { backdrop.classList.add('is-open'); });
        } else {
          backdrop.classList.remove('is-open');
          setTimeout(function () {
            if (toggle.getAttribute('aria-expanded') !== 'true') backdrop.hidden = true;
          }, 230);
        }
      }
    }

    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    if (backdrop) backdrop.addEventListener('click', function () { setNav(false); });

    // Nach der Auswahl eines Menüpunkts schließt sich das Panel
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });

    // Beim Wechsel auf Desktopbreite darf kein gesperrter Scroll zurückbleiben
    window.addEventListener('resize', function () {
      if (!istMobil() && toggle.getAttribute('aria-expanded') === 'true') setNav(false);
    });
  })();

  /* ---------------------------------------------------------------------------
     Zurück nach oben – erscheint erst nach etwas Scrollweg
     --------------------------------------------------------------------------- */
  (function () {
    var btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      springeZu(0);
    });

    var sichtbar = false;
    function pruefen() {
      var soll = window.scrollY > window.innerHeight * 0.9;
      if (soll !== sichtbar) {
        sichtbar = soll;
        btn.classList.toggle('is-visible', soll);
      }
    }
    window.addEventListener('scroll', pruefen, { passive: true });
    pruefen();
  })();

  /* ---------------------------------------------------------------------------
     Demoflow: Schrittliste und Nummernpunkte im Schaubild
     --------------------------------------------------------------------------- */
  (function () {
    var stepsWrap = document.getElementById('demoflowSteps');
    var visual = document.getElementById('demoflowVisual');
    if (!stepsWrap) return;

    var steps = Array.prototype.slice.call(stepsWrap.querySelectorAll('.demoflow__step'));
    var hotspots = visual ? Array.prototype.slice.call(visual.querySelectorAll('.demoflow__badge')) : [];

    function setHotspot(num) {
      hotspots.forEach(function (h) {
        h.classList.toggle('is-active', h.getAttribute('data-hotspot') === String(num));
      });
    }

    steps.forEach(function (step) {
      var head = step.querySelector('.demoflow__step-head');
      if (!head) return;
      head.addEventListener('click', function () {
        var warOffen = step.classList.contains('is-open');
        steps.forEach(function (s) {
          s.classList.remove('is-open');
          var b = s.querySelector('.demoflow__step-head');
          if (b) b.setAttribute('aria-expanded', 'false');
          klappe(s.querySelector('.demoflow__step-body'), false);
        });
        if (!warOffen) {
          step.classList.add('is-open');
          head.setAttribute('aria-expanded', 'true');
          klappe(step.querySelector('.demoflow__step-body'), true);
          setHotspot(step.getAttribute('data-step'));
        } else {
          setHotspot(null);
        }
      });
    });

    // Der erste Schritt ist im Markup bereits aufgeklappt
    var ersterOffen = stepsWrap.querySelector('.demoflow__step.is-open');
    if (ersterOffen) klappe(ersterOffen.querySelector('.demoflow__step-body'), true);

    setHotspot('1');
  })();

  /* ---------------------------------------------------------------------------
     Karten mit Sprungziel (Klick-Demo)
     --------------------------------------------------------------------------- */
  (function () {
    var jumpCards = document.querySelectorAll('[data-jump-target]');
    Array.prototype.forEach.call(jumpCards, function (card) {
      var ankunftTimer = null;
      function jump() {
        var target = document.getElementById(card.getAttribute('data-jump-target'));
        if (!target) return;
        springeZu(target);
        // Kurzes Ankunftssignal, damit klar ist, wohin der Sprung geführt hat
        clearTimeout(ankunftTimer);
        target.classList.remove('is-angekommen');
        void target.offsetWidth;
        target.classList.add('is-angekommen');
        ankunftTimer = setTimeout(function () {
          target.classList.remove('is-angekommen');
        }, 1800);
      }
      card.addEventListener('click', jump);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          jump();
        }
      });
    });
  })();

  /* ---------------------------------------------------------------------------
     FAQ-Akkordeon
     --------------------------------------------------------------------------- */
  (function () {
    var items = document.querySelectorAll('.faq__item');
    Array.prototype.forEach.call(items, function (item) {
      var btn = item.querySelector('.faq__question');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var offen = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', offen ? 'true' : 'false');
        klappe(item.querySelector('.faq__answer'), offen);
      });
    });
  })();

  /* ---------------------------------------------------------------------------
     Kernteam ein- und ausklappen
     --------------------------------------------------------------------------- */
  (function () {
    var btn = document.getElementById('teamToggleBtn');
    var panel = document.getElementById('kernteam');
    if (!btn || !panel) return;

    var label = btn.querySelector('.team-toggle__label');
    btn.addEventListener('click', function () {
      var offen = panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', offen ? 'true' : 'false');
      if (label) label.textContent = offen ? 'Team ausblenden' : 'Team anzeigen';
      klappe(panel, offen);
      if (offen && panel.getBoundingClientRect().top > window.innerHeight * 0.7) {
        springeZu(panel);
      }
    });
  })();

  /* ---------------------------------------------------------------------------
     Rollenfilter für Tools und Workflows
     --------------------------------------------------------------------------- */
  (function () {
    var switchEl = document.getElementById('roleSwitch');
    if (!switchEl) return;

    var buttons = Array.prototype.slice.call(switchEl.querySelectorAll('.role-switch__btn'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.usecase-card[data-roles]'));
    var avatars = Array.prototype.slice.call(document.querySelectorAll('.role-avatar img[data-avatar]'));
    var hinweis = document.getElementById('roleHinweis');
    var spalten = Array.prototype.slice.call(document.querySelectorAll('.suite-split__col'));

    function zaehleHervorgehoben(spalte) {
      if (!spalte) return 0;
      return Array.prototype.slice.call(spalte.querySelectorAll('.usecase-card[data-roles]'))
        .filter(function (c) { return !c.classList.contains('is-muted'); }).length;
    }

    // Die gefilterten Karten liegen am Telefon rund anderthalb Bildschirmhöhen
    // tiefer. Ohne eine Rückmeldung direkt am Schalter wirkt das Umschalten
    // wie ein Klick ins Leere.
    function zeigeRueckmeldung(btn) {
      if (!hinweis) return;
      var rolle = (btn.textContent || '').replace(/^Für\s+/, '').trim();
      var werkzeuge = zaehleHervorgehoben(spalten[0]);
      var ablaeufe = zaehleHervorgehoben(spalten[1]);
      hinweis.innerHTML = 'In der Übersicht unten hervorgehoben: <strong>' +
        werkzeuge + (werkzeuge === 1 ? ' Werkzeug' : ' Werkzeuge') + '</strong> und <strong>' +
        ablaeufe + (ablaeufe === 1 ? ' Workflow' : ' Workflows') + '</strong> für ' + rolle;
    }

    function applyFilter(role) {
      cards.forEach(function (card) {
        var roles = (card.getAttribute('data-roles') || '').split(' ');
        card.classList.toggle('is-muted', roles.indexOf(role) === -1);
      });
      avatars.forEach(function (img) {
        img.classList.toggle('is-active', img.getAttribute('data-avatar') === role);
      });

      var aktiverKnopf = null;
      buttons.forEach(function (b) {
        var aktiv = b.getAttribute('data-role') === role;
        b.classList.toggle('is-active', aktiv);
        b.setAttribute('aria-pressed', aktiv ? 'true' : 'false');
        if (aktiv) aktiverKnopf = b;
      });
      if (aktiverKnopf) zeigeRueckmeldung(aktiverKnopf);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyFilter(btn.getAttribute('data-role'));
      });
    });

    applyFilter('pruefung');
  })();

  /* ---------------------------------------------------------------------------
     Sanftes Scrollen und aktiver Menüpunkt
     --------------------------------------------------------------------------- */
  (function () {
    var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.site-header__nav a[href^="#"]')
    );

    var linkById = {};
    navLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      if (id) linkById[id] = a;
    });

    var currentActive = null;
    function setActive(id) {
      if (id === currentActive) return;
      navLinks.forEach(function (a) { a.classList.remove('is-active'); });
      var active = linkById[id];
      if (active) {
        active.classList.add('is-active');
        currentActive = id;
      }
    }

    // Sprungmarken im gesamten Dokument sanft anfahren
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      springeZu(target);
      if (linkById[id]) setActive(id);
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });

    // Der Menüpunkt wechselt, sobald ein Abschnitt die halbe Bildschirmhöhe füllt
    function updateActiveOnScroll() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var bestId = null;
      var bestRatio = 0;
      sections.forEach(function (sec) {
        var rect = sec.getBoundingClientRect();
        var visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        if (visible < 0) visible = 0;
        var ratio = visible / vh;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = sec.id;
        }
      });
      if (bestId && bestRatio >= 0.5) setActive(bestId);
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        updateActiveOnScroll();
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateActiveOnScroll();
  })();
})();
