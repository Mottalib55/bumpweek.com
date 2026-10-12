/* ============================================
   BUMPWEEK.COM — Main JS
   Navigation, Hamburger, Tabs, Accordion
   ============================================ */

(function() {
  'use strict';

  // --- Hamburger Menu ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Tabs ---
  document.querySelectorAll('.tabs').forEach(function(tabGroup) {
    var buttons = tabGroup.querySelectorAll('.tab-btn');
    var contentId = tabGroup.getAttribute('data-tabs');
    var contents = document.querySelectorAll('[data-tab-group="' + contentId + '"] .tab-content');

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var target = this.getAttribute('data-tab');

        buttons.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');

        contents.forEach(function(c) {
          c.classList.remove('active');
          if (c.getAttribute('data-tab-id') === target) {
            c.classList.add('active');
          }
        });
      }.bind(btn));
    });
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      var body = this.nextElementSibling;
      if (body && body.classList.contains('accordion-body')) {
        body.classList.toggle('open');
      }
    });
  });

  // --- Table sorting ---
  document.querySelectorAll('th.sortable').forEach(function(th) {
    th.addEventListener('click', function() {
      var table = this.closest('table');
      var tbody = table.querySelector('tbody');
      var rows = Array.from(tbody.querySelectorAll('tr'));
      var colIndex = Array.from(this.parentNode.children).indexOf(this);
      var currentDir = this.getAttribute('data-sort-dir') || 'none';
      var newDir = currentDir === 'asc' ? 'desc' : 'asc';

      // Reset all headers in this table
      table.querySelectorAll('th.sortable').forEach(function(h) {
        h.setAttribute('data-sort-dir', 'none');
      });
      this.setAttribute('data-sort-dir', newDir);

      rows.sort(function(a, b) {
        var aText = a.children[colIndex] ? a.children[colIndex].textContent.trim() : '';
        var bText = b.children[colIndex] ? b.children[colIndex].textContent.trim() : '';

        // Try numeric sort
        var aNum = parseFloat(aText.replace(/[,$%£]/g, ''));
        var bNum = parseFloat(bText.replace(/[,$%£]/g, ''));

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return newDir === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // Fall back to string sort
        return newDir === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });

      rows.forEach(function(row) { tbody.appendChild(row); });
    });
  });

  /* --- Premier écran (RECETTE §5, règle du 2026-10-11) ---
     Chapeau replié : bouton « Read more » ajouté côté client, le texte entier reste dans le HTML.
     Téléphone : tant que le résultat [data-resultat] est sous l'écran, une barre collante en bas
     montre son chiffre clé (attribut data-barre, posé par le calculateur) ; un toucher y descend. */
  document.querySelectorAll('.chapeau-replie').forEach(function(p) {
    if (p.scrollHeight <= p.clientHeight + 2) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chapeau-bouton';
    b.setAttribute('aria-expanded', 'false');
    b.textContent = 'Read more';
    b.addEventListener('click', function() {
      var open = p.classList.toggle('ouvert');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.textContent = open ? 'Show less' : 'Read more';
    });
    p.insertAdjacentElement('afterend', b);
  });

  document.querySelectorAll('[data-resultat][data-barre-label]').forEach(function(res) {
    var bar = document.createElement('button');
    bar.type = 'button';
    bar.className = 'barre-resultat';
    bar.hidden = true;
    bar.setAttribute('aria-hidden', 'true');
    bar.tabIndex = -1;
    var l = document.createElement('span'); l.className = 'barre-label'; l.textContent = res.getAttribute('data-barre-label');
    var v = document.createElement('span'); v.className = 'barre-valeur';
    bar.appendChild(l); bar.appendChild(v);
    document.body.appendChild(bar);
    bar.addEventListener('click', function() { res.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    var below = false;
    function refresh() {
      var val = res.getAttribute('data-barre') || '';
      v.textContent = val;
      bar.hidden = !(below && val);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function(entries) {
        var e = entries[0];
        below = !e.isIntersecting && e.boundingClientRect.top > 0;
        refresh();
      }).observe(res);
    }
    new MutationObserver(refresh).observe(res, { attributes: true, attributeFilter: ['data-barre'] });
    refresh();
  });

})();
