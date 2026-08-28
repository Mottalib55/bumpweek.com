/* ============================================
   BUMPWEEK.COM — Tools JS
   Registry Checklist, Daycare Map, Financial Checklist
   ============================================ */

/* --- Registry Items Data --- */
const REGISTRY_ITEMS = [
  {
    category: "Nursery", icon: "\ud83d\udecf\ufe0f",
    items: [
      { id: 0, name: "Crib", priceMin: 150, priceMax: 500, secondhand: true },
      { id: 1, name: "Crib mattress", priceMin: 50, priceMax: 200, secondhand: false },
      { id: 2, name: "Fitted sheets (\u00d73)", priceMin: 25, priceMax: 60, secondhand: true },
      { id: 3, name: "Baby monitor", priceMin: 40, priceMax: 300, secondhand: true },
      { id: 4, name: "Nightlight", priceMin: 10, priceMax: 30, secondhand: true },
      { id: 5, name: "Dresser / changing table", priceMin: 150, priceMax: 400, secondhand: true },
      { id: 6, name: "Glider or rocker", priceMin: 150, priceMax: 500, secondhand: true },
      { id: 7, name: "Swaddle blankets (\u00d73)", priceMin: 20, priceMax: 50, secondhand: true }
    ]
  },
  {
    category: "Gear & Travel", icon: "\ud83d\ude97",
    items: [
      { id: 8, name: "Infant car seat", priceMin: 100, priceMax: 350, secondhand: false },
      { id: 9, name: "Stroller", priceMin: 100, priceMax: 800, secondhand: true },
      { id: 10, name: "Baby carrier or wrap", priceMin: 30, priceMax: 200, secondhand: true },
      { id: 11, name: "Diaper bag", priceMin: 30, priceMax: 150, secondhand: true },
      { id: 12, name: "Play mat", priceMin: 20, priceMax: 80, secondhand: true }
    ]
  },
  {
    category: "Feeding", icon: "\ud83c\udf7c",
    items: [
      { id: 13, name: "Bottles (\u00d76)", priceMin: 15, priceMax: 50, secondhand: false },
      { id: 14, name: "Breast pump", priceMin: 0, priceMax: 300, secondhand: false },
      { id: 15, name: "Nursing pillow", priceMin: 25, priceMax: 60, secondhand: true },
      { id: 16, name: "Burp cloths (\u00d76)", priceMin: 10, priceMax: 25, secondhand: true },
      { id: 17, name: "Bibs (\u00d76)", priceMin: 10, priceMax: 25, secondhand: true },
      { id: 18, name: "Bottle brush", priceMin: 5, priceMax: 15, secondhand: false },
      { id: 19, name: "Highchair", priceMin: 50, priceMax: 200, secondhand: true }
    ]
  },
  {
    category: "Diapering", icon: "\ud83e\uddf7",
    items: [
      { id: 20, name: "Diapers (starter pack)", priceMin: 25, priceMax: 50, secondhand: false },
      { id: 21, name: "Wipes (bulk)", priceMin: 15, priceMax: 30, secondhand: false },
      { id: 22, name: "Diaper cream", priceMin: 8, priceMax: 15, secondhand: false },
      { id: 23, name: "Changing pad", priceMin: 15, priceMax: 40, secondhand: true },
      { id: 24, name: "Diaper pail", priceMin: 25, priceMax: 70, secondhand: true }
    ]
  },
  {
    category: "Bath & Grooming", icon: "\ud83d\udec1",
    items: [
      { id: 25, name: "Baby bathtub", priceMin: 15, priceMax: 40, secondhand: true },
      { id: 26, name: "Hooded towels (\u00d72)", priceMin: 10, priceMax: 25, secondhand: true },
      { id: 27, name: "Baby wash & shampoo", priceMin: 5, priceMax: 15, secondhand: false },
      { id: 28, name: "Baby nail clippers", priceMin: 5, priceMax: 12, secondhand: false },
      { id: 29, name: "Digital thermometer", priceMin: 8, priceMax: 30, secondhand: false }
    ]
  },
  {
    category: "Clothing", icon: "\ud83d\udc55",
    items: [
      { id: 30, name: "Onesies (\u00d78)", priceMin: 20, priceMax: 50, secondhand: true },
      { id: 31, name: "Sleepers / pajamas (\u00d75)", priceMin: 15, priceMax: 40, secondhand: true },
      { id: 32, name: "Socks (pack)", priceMin: 6, priceMax: 15, secondhand: true },
      { id: 33, name: "Hats (\u00d72)", priceMin: 5, priceMax: 15, secondhand: true },
      { id: 34, name: "Mittens (\u00d72 pairs)", priceMin: 5, priceMax: 12, secondhand: true },
      { id: 35, name: "Season-appropriate jacket", priceMin: 15, priceMax: 40, secondhand: true }
    ]
  },
  {
    category: "Health & Safety", icon: "\ud83c\udfe5",
    items: [
      { id: 36, name: "Baby first aid kit", priceMin: 15, priceMax: 30, secondhand: false },
      { id: 37, name: "Nasal aspirator", priceMin: 8, priceMax: 30, secondhand: false },
      { id: 38, name: "Infant pain reliever", priceMin: 6, priceMax: 12, secondhand: false },
      { id: 39, name: "Humidifier", priceMin: 20, priceMax: 60, secondhand: true },
      { id: 40, name: "Outlet covers (pack)", priceMin: 5, priceMax: 12, secondhand: false },
      { id: 41, name: "Cabinet locks (pack)", priceMin: 8, priceMax: 20, secondhand: false }
    ]
  }
];

const TOTAL_ITEMS = 42;

(function() {
  'use strict';

  /* ===========================
     REGISTRY CHECKLIST
     =========================== */
  var registryContainer = document.getElementById('registry-checklist');
  if (registryContainer) {
    var checkedItems = new Set();
    var readonlyMode = false;
    var currentFilter = 'all';

    // Read state from URL
    var params = new URLSearchParams(window.location.search);
    var encoded = params.get('c');
    if (encoded) {
      var bits = parseInt(encoded, 36);
      for (var i = 0; i < TOTAL_ITEMS; i++) {
        if (bits & (1 << i)) checkedItems.add(i);
      }
      if (params.get('shared') === '1') readonlyMode = true;
    }

    function render() {
      var html = '';

      // Read-only banner
      if (readonlyMode) {
        html += '<div class="readonly-banner" style="display:block">This is someone\'s baby checklist. Items they still need are unchecked. <a href="/tools/baby-registry-checklist/">Create your own checklist \u2192</a></div>';
      }

      // Filters
      html += '<div class="filter-group">';
      ['all', 'need', 'have'].forEach(function(f) {
        var label = f === 'all' ? 'All items' : f === 'need' ? 'Still need' : 'Already have';
        html += '<button class="filter-btn' + (currentFilter === f ? ' active' : '') + '" data-filter="' + f + '">' + label + '</button>';
      });
      html += '</div>';

      // Calculate totals
      var totalCostRemaining = 0;
      var totalCostAll = 0;
      REGISTRY_ITEMS.forEach(function(cat) {
        cat.items.forEach(function(item) {
          var avg = Math.round((item.priceMin + item.priceMax) / 2);
          totalCostAll += avg;
          if (!checkedItems.has(item.id)) totalCostRemaining += avg;
        });
      });

      // Categories
      REGISTRY_ITEMS.forEach(function(cat) {
        var visibleItems = cat.items.filter(function(item) {
          if (currentFilter === 'need') return !checkedItems.has(item.id);
          if (currentFilter === 'have') return checkedItems.has(item.id);
          return true;
        });
        if (visibleItems.length === 0) return;

        html += '<div class="checklist-category"><h3>' + cat.icon + ' ' + cat.category + '</h3>';
        visibleItems.forEach(function(item) {
          var checked = checkedItems.has(item.id);
          html += '<div class="checklist-item">';
          html += '<input type="checkbox" ' + (checked ? 'checked' : '') + ' data-id="' + item.id + '"' + (readonlyMode ? ' disabled' : '') + '>';
          html += '<div class="item-info"><span class="item-name">' + item.name + '</span>';
          html += '<span class="item-price">$' + item.priceMin + '\u2013$' + item.priceMax + '</span></div>';
          html += '<span class="item-badge ' + (item.secondhand ? 'badge-ok-used' : 'badge-buy-new') + '">' + (item.secondhand ? 'OK used' : 'Buy new') + '</span>';
          html += '</div>';
        });
        html += '</div>';
      });

      // Share section
      if (!readonlyMode) {
        html += '<div style="margin-top:24px"><button class="btn-primary" id="share-registry" style="font-size:14px;padding:10px 20px">Share your list</button></div>';
        html += '<div class="share-panel" id="share-panel"></div>';
      }

      registryContainer.innerHTML = html;

      // Update progress bar
      updateProgress();
    }

    function updateProgress() {
      var progressDiv = document.getElementById('registry-progress');
      if (!progressDiv) return;
      var pct = Math.round((checkedItems.size / TOTAL_ITEMS) * 100);

      var totalCostRemaining = 0;
      REGISTRY_ITEMS.forEach(function(cat) {
        cat.items.forEach(function(item) {
          if (!checkedItems.has(item.id)) {
            totalCostRemaining += Math.round((item.priceMin + item.priceMax) / 2);
          }
        });
      });

      progressDiv.innerHTML = '<div class="container-wide" style="display:flex;align-items:center;gap:16px">' +
        '<span class="progress-text">' + checkedItems.size + ' of ' + TOTAL_ITEMS + ' (' + pct + '%)</span>' +
        '<div class="progress-bar"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="progress-text">Remaining: ~$' + totalCostRemaining.toLocaleString() + '</span></div>';
    }

    // Event delegation
    registryContainer.addEventListener('change', function(e) {
      if (readonlyMode) return;
      var checkbox = e.target.closest('input[type="checkbox"]');
      if (!checkbox) return;
      var id = parseInt(checkbox.getAttribute('data-id'));
      if (checkbox.checked) {
        checkedItems.add(id);
      } else {
        checkedItems.delete(id);
      }
      updateProgress();
    });

    registryContainer.addEventListener('click', function(e) {
      var filterBtn = e.target.closest('[data-filter]');
      if (filterBtn) {
        currentFilter = filterBtn.getAttribute('data-filter');
        render();
        return;
      }

      if (e.target.id === 'share-registry') {
        showSharePanel();
      }
    });

    function getEncodedState() {
      var bits = 0;
      checkedItems.forEach(function(id) { bits |= (1 << id); });
      return bits.toString(36);
    }

    function showSharePanel() {
      var panel = document.getElementById('share-panel');
      if (!panel) return;
      var url = window.location.origin + '/tools/baby-registry-checklist/?c=' + getEncodedState() + '&shared=1';
      panel.className = 'share-panel visible';
      panel.innerHTML = '<p><strong>Share your list</strong> — anyone with this link can see what you still need.</p>' +
        '<div class="share-url"><input type="text" value="' + url + '" readonly id="share-url-input"><button class="share-btn" onclick="document.getElementById(\'share-url-input\').select();document.execCommand(\'copy\');this.textContent=\'Copied!\'">Copy</button></div>' +
        '<div class="share-btns">' +
        '<a class="share-btn" href="https://wa.me/?text=' + encodeURIComponent('My baby registry checklist: ' + url) + '" target="_blank">WhatsApp</a>' +
        '<a class="share-btn" href="mailto:?subject=My%20Baby%20Registry&body=' + encodeURIComponent('Here\'s my baby checklist: ' + url) + '">Email</a>' +
        '</div>';
    }

    render();
  }


  /* ===========================
     DAYCARE COST MAP
     =========================== */
  var mapContainer = document.getElementById('daycare-map');
  if (mapContainer) {
    var stateDetail = document.getElementById('state-detail');
    var stateData = window.BABY_COST_DATA ? window.BABY_COST_DATA.us.childcare_annual : {};

    // Median household income by state (US Census, 2023-2024 estimates)
    var medianIncome = {
      "Alabama": 56950, "Alaska": 80370, "Arizona": 65740, "Arkansas": 52520, "California": 84090,
      "Colorado": 82250, "Connecticut": 83770, "Delaware": 72730, "Florida": 63060, "Georgia": 64030,
      "Hawaii": 84900, "Idaho": 64930, "Illinois": 72200, "Indiana": 61940, "Iowa": 65570,
      "Kansas": 64520, "Kentucky": 55580, "Louisiana": 52940, "Maine": 64770, "Maryland": 90200,
      "Massachusetts": 89640, "Michigan": 63490, "Minnesota": 77720, "Mississippi": 46500, "Missouri": 60600,
      "Montana": 60560, "Nebraska": 66590, "Nevada": 64640, "New Hampshire": 83300, "New Jersey": 87730,
      "New Mexico": 53280, "New York": 74310, "North Carolina": 61850, "North Dakota": 68130,
      "Ohio": 61440, "Oklahoma": 56920, "Oregon": 70080, "Pennsylvania": 67590, "Rhode Island": 71160,
      "South Carolina": 58020, "South Dakota": 62520, "Tennessee": 59700, "Texas": 66940,
      "Utah": 74200, "Vermont": 64170, "Virginia": 80660, "Washington": 82180, "West Virginia": 50280,
      "Wisconsin": 66030, "Wyoming": 69490, "District of Columbia": 101700
    };

    // Click handler for SVG paths
    mapContainer.addEventListener('click', function(e) {
      var path = e.target.closest('path[data-state]');
      if (!path) return;
      var stateName = path.getAttribute('data-state');
      showStateDetail(stateName);
    });

    function showStateDetail(stateName) {
      if (!stateDetail) return;
      var data = stateData[stateName];
      var income = medianIncome[stateName];
      if (!data) {
        stateDetail.innerHTML = '<p>Data not available for ' + stateName + '</p>';
        return;
      }
      var pct = income ? ((data.center / income) * 100).toFixed(1) : 'N/A';

      stateDetail.innerHTML =
        '<h3>' + stateName + '</h3>' +
        '<table><tbody>' +
        '<tr><td><strong>Infant center-based care</strong></td><td>$' + data.center.toLocaleString() + '/year</td></tr>' +
        '<tr><td><strong>Home-based care</strong></td><td>$' + data.home.toLocaleString() + '/year</td></tr>' +
        '<tr><td><strong>% of median household income</strong></td><td>' + pct + '%</td></tr>' +
        '</tbody></table>';
    }

    // Sort table functionality
    var sortTable = document.getElementById('daycare-table');
    if (sortTable) {
      sortTable.querySelectorAll('th.sortable').forEach(function(th) {
        th.addEventListener('click', function() {
          var tbody = sortTable.querySelector('tbody');
          var rows = Array.from(tbody.querySelectorAll('tr'));
          var colIndex = Array.from(this.parentNode.children).indexOf(this);
          var dir = this.getAttribute('data-sort-dir') === 'asc' ? 'desc' : 'asc';

          sortTable.querySelectorAll('th.sortable').forEach(function(h) { h.setAttribute('data-sort-dir', 'none'); });
          this.setAttribute('data-sort-dir', dir);

          rows.sort(function(a, b) {
            var aVal = a.children[colIndex].textContent.replace(/[$,%]/g, '').trim();
            var bVal = b.children[colIndex].textContent.replace(/[$,%]/g, '').trim();
            var aNum = parseFloat(aVal);
            var bNum = parseFloat(bVal);
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return dir === 'asc' ? aNum - bNum : bNum - aNum;
            }
            return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
          });
          rows.forEach(function(r) { tbody.appendChild(r); });
        });
      });
    }
  }


  /* ===========================
     FINANCIAL CHECKLIST
     =========================== */
  var finChecklist = document.getElementById('financial-checklist');
  if (finChecklist) {
    var checkedCount = 0;
    var totalChecks = finChecklist.querySelectorAll('.accordion-header .check').length;

    finChecklist.addEventListener('click', function(e) {
      // Toggle checkbox
      var checkEl = e.target.closest('.check');
      if (checkEl) {
        checkEl.classList.toggle('checked');
        checkedCount = finChecklist.querySelectorAll('.check.checked').length;
        updateFinProgress();
        e.stopPropagation();
        return;
      }

      // Toggle accordion
      var header = e.target.closest('.accordion-header');
      if (header) {
        var expanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', !expanded);
        var body = header.nextElementSibling;
        if (body) body.classList.toggle('open');
      }
    });

    function updateFinProgress() {
      var bar = document.getElementById('fin-progress-bar');
      var text = document.getElementById('fin-progress-text');
      if (bar) bar.style.width = Math.round((checkedCount / totalChecks) * 100) + '%';
      if (text) text.textContent = checkedCount + ' of ' + totalChecks + ' completed';
    }
  }

})();
