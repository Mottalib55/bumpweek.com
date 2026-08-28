/* ============================================
   BUMPWEEK.COM — Calculators JS
   Baby Cost Calculator, Budget Planner, Tax Savings, Work Calculator, IVF Estimator, Formula Slider, Quiz
   ============================================ */

/* --- Baby Cost Data (sourced from USDA, Brookings, Child Care Aware, ONS, GOV.UK, MOHAP) --- */
const BABY_COST_DATA = {
  us: {
    currency: "USD",
    sym: "$",
    birth: {
      vaginal_insured: { min: 2800, max: 4500 },
      vaginal_uninsured: { min: 18000, max: 30000 },
      csection_insured: { min: 4000, max: 8000 },
      csection_uninsured: { min: 25000, max: 50000 },
      birth_center: { min: 2000, max: 6000 },
      home_birth: { min: 3000, max: 8000 }
    },
    childcare_annual: {
      "Alabama": { center: 7560, home: 5400 },
      "Alaska": { center: 12180, home: 8700 },
      "Arizona": { center: 10200, home: 7440 },
      "Arkansas": { center: 7080, home: 5280 },
      "California": { center: 16950, home: 11760 },
      "Colorado": { center: 15660, home: 11400 },
      "Connecticut": { center: 15600, home: 11280 },
      "Delaware": { center: 11400, home: 8280 },
      "Florida": { center: 9360, home: 7200 },
      "Georgia": { center: 8760, home: 6480 },
      "Hawaii": { center: 13200, home: 9600 },
      "Idaho": { center: 8640, home: 6360 },
      "Illinois": { center: 14520, home: 10440 },
      "Indiana": { center: 11160, home: 7800 },
      "Iowa": { center: 10800, home: 7560 },
      "Kansas": { center: 10680, home: 7440 },
      "Kentucky": { center: 8160, home: 5880 },
      "Louisiana": { center: 7320, home: 5160 },
      "Maine": { center: 11400, home: 8040 },
      "Maryland": { center: 16200, home: 11160 },
      "Massachusetts": { center: 20880, home: 13800 },
      "Michigan": { center: 10560, home: 7680 },
      "Minnesota": { center: 16440, home: 11040 },
      "Mississippi": { center: 6240, home: 4560 },
      "Missouri": { center: 10080, home: 7080 },
      "Montana": { center: 9600, home: 7080 },
      "Nebraska": { center: 11280, home: 7920 },
      "Nevada": { center: 10680, home: 7800 },
      "New Hampshire": { center: 13200, home: 9600 },
      "New Jersey": { center: 14520, home: 10200 },
      "New Mexico": { center: 9240, home: 6720 },
      "New York": { center: 16200, home: 11400 },
      "North Carolina": { center: 9960, home: 7320 },
      "North Dakota": { center: 10080, home: 7200 },
      "Ohio": { center: 10320, home: 7440 },
      "Oklahoma": { center: 8520, home: 6120 },
      "Oregon": { center: 14160, home: 10080 },
      "Pennsylvania": { center: 12720, home: 8880 },
      "Rhode Island": { center: 13800, home: 9720 },
      "South Carolina": { center: 8040, home: 5880 },
      "South Dakota": { center: 9000, home: 6600 },
      "Tennessee": { center: 8760, home: 6360 },
      "Texas": { center: 9480, home: 6960 },
      "Utah": { center: 10200, home: 7440 },
      "Vermont": { center: 13080, home: 9360 },
      "Virginia": { center: 14400, home: 10080 },
      "Washington": { center: 16560, home: 11640 },
      "West Virginia": { center: 7440, home: 5400 },
      "Wisconsin": { center: 12360, home: 8640 },
      "Wyoming": { center: 9840, home: 7200 },
      "District of Columbia": { center: 22680, home: 14400 },
      "national_average": { center: 12500, home: 8800 }
    },
    feeding_annual: {
      breastfeeding: { min: 0, max: 300 },
      formula: { min: 1200, max: 2800 },
      mixed: { min: 600, max: 1500 }
    },
    diapers_annual: {
      disposable: { min: 800, max: 1200 },
      cloth: { min: 300, max: 500 },
      mixed: { min: 500, max: 800 }
    },
    gear: {
      all_new: { min: 2000, max: 5000 },
      secondhand: { min: 500, max: 1500 },
      mixed: { min: 1000, max: 3000 }
    },
    clothing_annual: { min: 500, max: 1500 },
    health_annual: { min: 500, max: 2000 },
    misc_annual: { min: 500, max: 1500 }
  },
  uk: {
    currency: "GBP",
    sym: "£",
    birth: {
      nhs: { min: 0, max: 200 },
      private: { min: 10000, max: 20000 }
    },
    childcare_annual: {
      "London": { center: 18000, home: 14400 },
      "South East": { center: 14400, home: 11400 },
      "Rest of England": { center: 12600, home: 9600 },
      "Scotland": { center: 11400, home: 8400 },
      "Wales": { center: 10800, home: 8400 },
      "Northern Ireland": { center: 9600, home: 7200 },
      "national_average": { center: 13200, home: 10200 }
    },
    feeding_annual: {
      breastfeeding: { min: 0, max: 200 },
      formula: { min: 600, max: 1400 },
      mixed: { min: 300, max: 800 }
    },
    diapers_annual: {
      disposable: { min: 400, max: 700 },
      cloth: { min: 200, max: 350 },
      mixed: { min: 300, max: 500 }
    },
    gear: {
      all_new: { min: 1500, max: 3500 },
      secondhand: { min: 400, max: 1000 },
      mixed: { min: 800, max: 2000 }
    },
    clothing_annual: { min: 300, max: 1000 },
    health_annual: { min: 0, max: 200 },
    misc_annual: { min: 300, max: 1000 }
  },
  uae: {
    currency: "AED",
    sym: "AED ",
    birth: {
      vaginal_insured: { min: 5000, max: 12000 },
      vaginal_self_pay: { min: 13000, max: 22000 },
      csection_insured: { min: 8000, max: 18000 },
      csection_self_pay: { min: 18000, max: 35000 }
    },
    childcare_annual: {
      "Dubai": { center: 42000, home: 36000 },
      "Abu Dhabi": { center: 36000, home: 30000 },
      "Other": { center: 30000, home: 24000 },
      "national_average": { center: 36000, home: 30000 }
    },
    nanny_annual: {
      "Dubai": { live_in: 42000, live_out: 66000 },
      "Abu Dhabi": { live_in: 36000, live_out: 60000 },
      "Other": { live_in: 30000, live_out: 48000 }
    },
    feeding_annual: {
      breastfeeding: { min: 0, max: 500 },
      formula: { min: 3000, max: 6000 },
      mixed: { min: 1500, max: 3500 }
    },
    diapers_annual: {
      disposable: { min: 2400, max: 3600 },
      cloth: { min: 800, max: 1500 },
      mixed: { min: 1500, max: 2500 }
    },
    gear: {
      all_new: { min: 8000, max: 18000 },
      secondhand: { min: 2000, max: 5000 },
      mixed: { min: 4000, max: 10000 }
    },
    clothing_annual: { min: 2000, max: 5000 },
    health_annual: { min: 2000, max: 6000 },
    misc_annual: { min: 2000, max: 5000 }
  }
};

/* --- Formula Brand Data (sources: Walmart, Target, Costco, brand sites, 2025-2026) --- */
const FORMULA_BRANDS = [
  { name: "Enfamil NeuroPro", size_oz: 20.7, price: 37, per_oz: 1.79, type: "Premium", organic: false },
  { name: "Similac 360 Total Care", size_oz: 20.6, price: 36, per_oz: 1.75, type: "Premium", organic: false },
  { name: "Kirkland Signature (Costco)", size_oz: 42, price: 30, per_oz: 0.71, type: "Store Brand", organic: false },
  { name: "Parent's Choice (Walmart)", size_oz: 36, price: 22, per_oz: 0.61, type: "Store Brand", organic: false },
  { name: "Up & Up (Target)", size_oz: 36, price: 20, per_oz: 0.56, type: "Store Brand", organic: false },
  { name: "Bobbie", size_oz: 20, price: 28, per_oz: 1.40, type: "Premium", organic: true },
  { name: "ByHeart", size_oz: 24, price: 36, per_oz: 1.50, type: "Premium", organic: false },
  { name: "HiPP (imported)", size_oz: 28, price: 40, per_oz: 1.43, type: "European", organic: true }
];

/* Formula consumption by age (oz per day) */
const FORMULA_CONSUMPTION = [
  { month: 0, label: "Newborn", oz_per_day: 20 },
  { month: 1, label: "1 month", oz_per_day: 24 },
  { month: 2, label: "2 months", oz_per_day: 28 },
  { month: 3, label: "3 months", oz_per_day: 30 },
  { month: 4, label: "4 months", oz_per_day: 32 },
  { month: 5, label: "5 months", oz_per_day: 32 },
  { month: 6, label: "6 months", oz_per_day: 28 },
  { month: 7, label: "7 months", oz_per_day: 26 },
  { month: 8, label: "8 months", oz_per_day: 24 },
  { month: 9, label: "9 months", oz_per_day: 22 },
  { month: 10, label: "10 months", oz_per_day: 20 },
  { month: 11, label: "11 months", oz_per_day: 18 },
  { month: 12, label: "12 months", oz_per_day: 16 }
];

/* --- Tax Benefits Data (IRS, 2025-2026) --- */
const TAX_DATA = {
  child_tax_credit: 2000,
  dependent_care_fsa_limit: 5000,
  medical_deduction_threshold: 0.075,
  hsa_family_limit: 8550,
  head_of_household_deduction: 22200,
  single_deduction: 15700,
  state_credits: [
    { state: "California", name: "Young Child Tax Credit", amount: 1117 },
    { state: "Colorado", name: "Child Tax Credit", amount: 1200 },
    { state: "Connecticut", name: "Child Tax Rebate", amount: 250 },
    { state: "Idaho", name: "Child Tax Credit", amount: 205 },
    { state: "Maine", name: "Dependent Exemption Credit", amount: 300 },
    { state: "Maryland", name: "Child Tax Credit", amount: 500 },
    { state: "Massachusetts", name: "Child & Dependent Credit", amount: 240 },
    { state: "Minnesota", name: "Child Tax Credit", amount: 1750 },
    { state: "New Jersey", name: "Child Tax Credit", amount: 1000 },
    { state: "New Mexico", name: "Child Income Tax Credit", amount: 600 },
    { state: "New York", name: "Empire State Child Credit", amount: 330 },
    { state: "Oregon", name: "Oregon Kids Credit", amount: 1000 },
    { state: "Vermont", name: "Child Tax Credit", amount: 1000 }
  ]
};

/* --- Readiness Quiz Questions --- */
const READINESS_QUESTIONS = [
  {
    id: 1,
    question: "Do you have at least 3 months of living expenses saved in an emergency fund?",
    noAdvice: "Start with a target of $1,000, then build to 3 months of expenses. Automate a monthly transfer — even $100/month adds up. You have roughly 9 months of pregnancy to build this up."
  },
  {
    id: 2,
    question: "Are you free of high-interest debt (credit cards, payday loans)?",
    noAdvice: "High-interest debt eats your budget alive. Focus on paying off cards above 15% APR before the baby arrives. Consider the avalanche method (highest rate first) or the snowball method (smallest balance first) — both work."
  },
  {
    id: 3,
    question: "Do you have health insurance that covers maternity care?",
    noAdvice: "In the US, check Healthcare.gov for marketplace plans or see if you qualify for Medicaid (income limits are higher for pregnant women in most states). In the UAE, check if your employer plan covers maternity — many have a 12-month waiting period.",
    link: "/cost-of-giving-birth/"
  },
  {
    id: 4,
    question: "Have you researched childcare costs in your area?",
    noAdvice: "This is likely your biggest expense. Use our <a href='/daycare-cost-by-state/'>Daycare Cost by State</a> map or <a href='/childcare-cost-comparison/'>Childcare Cost Comparison</a> to see what you're looking at. In many cities, the waitlist is 6-12 months — start now."
  },
  {
    id: 5,
    question: "Could your household survive on one income for 3-6 months?",
    noAdvice: "If not, start testing now. Try living on one income for a month and save the other — you'll see where the pressure points are and build savings at the same time."
  },
  {
    id: 6,
    question: "Do you have life insurance?",
    noAdvice: "Term life insurance is surprisingly affordable when you're young and healthy. A 20-year, $500K policy can cost less than $30/month. Once a child depends on your income, this is essential."
  },
  {
    id: 7,
    question: "Is your housing stable for the next 2+ years?",
    noAdvice: "Moving with a newborn is extremely stressful and expensive. If you're going to need a bigger place, do it before the baby — you'll have more energy and flexibility to negotiate."
  },
  {
    id: 8,
    question: "Do you have a monthly budget you actually follow?",
    noAdvice: "You don't need a fancy app. A simple spreadsheet with income, fixed costs, and a 'baby fund' line works. Try our <a href='/tools/baby-budget-planner/'>Baby Budget Planner</a> to see what your monthly expenses will look like with a baby."
  },
  {
    id: 9,
    question: "Have you talked with your partner about the financial plan?",
    noAdvice: "This is the most important conversation you'll have. Who takes leave? For how long? Who goes back to work first? How do you split expenses? Do it before the sleep deprivation hits."
  },
  {
    id: 10,
    question: "Do you know your employer's parental leave policy?",
    noAdvice: "Ask HR directly — don't assume. Ask about paid leave, unpaid leave, short-term disability, and whether you can use sick days or vacation days. Read our <a href='/paternity-leave-guide/'>Paternity Leave Guide</a> for negotiation tips."
  }
];


(function() {
  'use strict';

  /* ===========================
     BABY COST CALCULATOR
     =========================== */
  var calcForm = document.getElementById('baby-calc');
  if (calcForm) {
    var state = {
      country: null,
      region: null,
      birth: null,
      insurance: null,
      feeding: null,
      childcare: null,
      diapers: null,
      gear: null
    };

    // Country selection
    document.querySelectorAll('[data-country]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('[data-country]').forEach(function(b) { b.classList.remove('selected'); });
        this.classList.add('selected');
        state.country = this.getAttribute('data-country');
        showCountryOptions(state.country);
        calculate();
      });
    });

    // Option buttons
    calcForm.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-option]');
      if (!btn) return;
      var group = btn.getAttribute('data-group');
      calcForm.querySelectorAll('[data-group="' + group + '"]').forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      state[group] = btn.getAttribute('data-option');
      calculate();
    });

    // Region dropdown
    var regionSelect = document.getElementById('calc-region');
    if (regionSelect) {
      regionSelect.addEventListener('change', function() {
        state.region = this.value;
        calculate();
      });
    }

    function showCountryOptions(country) {
      document.querySelectorAll('.country-options').forEach(function(el) {
        el.style.display = el.getAttribute('data-for') === country ? 'block' : 'none';
      });
      // Reset state except country
      state.region = null;
      state.birth = null;
      state.insurance = null;
      state.feeding = null;
      state.childcare = null;
      state.diapers = null;
      state.gear = null;
      // Reset UI
      calcForm.querySelectorAll('.option-btn').forEach(function(b) {
        if (!b.hasAttribute('data-country')) b.classList.remove('selected');
      });
      var selects = calcForm.querySelectorAll('select');
      selects.forEach(function(s) { s.selectedIndex = 0; });
    }

    function mid(range) {
      return Math.round((range.min + range.max) / 2);
    }

    function calculate() {
      if (!state.country) return;
      var d = BABY_COST_DATA[state.country];
      if (!d) return;

      // Birth cost
      var birthCost = 0;
      if (state.country === 'us') {
        if (state.birth === 'vaginal') {
          birthCost = state.insurance === 'uninsured' ? mid(d.birth.vaginal_uninsured) : mid(d.birth.vaginal_insured);
        } else if (state.birth === 'csection') {
          birthCost = state.insurance === 'uninsured' ? mid(d.birth.csection_uninsured) : mid(d.birth.csection_insured);
        } else if (state.birth === 'birth_center') {
          birthCost = mid(d.birth.birth_center);
        } else if (state.birth === 'home_birth') {
          birthCost = mid(d.birth.home_birth);
        }
      } else if (state.country === 'uk') {
        birthCost = state.birth === 'private' ? mid(d.birth.private) : mid(d.birth.nhs);
      } else if (state.country === 'uae') {
        if (state.birth === 'vaginal') {
          birthCost = state.insurance === 'self_pay' ? mid(d.birth.vaginal_self_pay) : mid(d.birth.vaginal_insured);
        } else if (state.birth === 'csection') {
          birthCost = state.insurance === 'self_pay' ? mid(d.birth.csection_self_pay) : mid(d.birth.csection_insured);
        }
      }

      // Childcare
      var childcareCost = 0;
      if (state.childcare === 'daycare' || state.childcare === 'nursery') {
        var region = state.region || 'national_average';
        var cc = d.childcare_annual[region] || d.childcare_annual.national_average;
        childcareCost = cc ? cc.center : 0;
      } else if (state.childcare === 'nanny') {
        if (state.country === 'uae' && d.nanny_annual) {
          var nr = state.region || 'Dubai';
          childcareCost = d.nanny_annual[nr] ? d.nanny_annual[nr].live_out : 60000;
        } else if (state.country === 'us') {
          childcareCost = 35000;
        } else {
          childcareCost = 25000;
        }
      } else if (state.childcare === 'home_daycare') {
        var region2 = state.region || 'national_average';
        var cc2 = d.childcare_annual[region2] || d.childcare_annual.national_average;
        childcareCost = cc2 ? cc2.home : 0;
      }

      // Feeding
      var feedingCost = state.feeding ? mid(d.feeding_annual[state.feeding] || { min: 0, max: 0 }) : 0;

      // Diapers
      var diaperCost = state.diapers ? mid(d.diapers_annual[state.diapers] || { min: 0, max: 0 }) : 0;

      // Gear
      var gearCost = state.gear ? mid(d.gear[state.gear] || { min: 0, max: 0 }) : 0;

      // Fixed costs
      var clothingCost = mid(d.clothing_annual);
      var healthCost = mid(d.health_annual);
      var miscCost = mid(d.misc_annual);

      var total = birthCost + childcareCost + feedingCost + diaperCost + gearCost + clothingCost + healthCost + miscCost;

      displayResults(d.sym, total, [
        { label: "Birth & Medical", value: birthCost, color: "#FF6B6B" },
        { label: "Childcare", value: childcareCost, color: "#2C3E6B", na: state.childcare === 'stay_home' || state.childcare === 'family' },
        { label: "Feeding", value: feedingCost, color: "#2ECC71" },
        { label: "Diapers & Wipes", value: diaperCost, color: "#F39C12" },
        { label: "Gear & Nursery", value: gearCost, color: "#9B59B6" },
        { label: "Clothing", value: clothingCost, color: "#3498DB" },
        { label: "Health Insurance", value: healthCost, color: "#1ABC9C" },
        { label: "Miscellaneous", value: miscCost, color: "#95A5A6" }
      ], state, d);
    }

    function displayResults(sym, total, categories, st, d) {
      var resultsDiv = document.getElementById('calc-results');
      if (!resultsDiv) return;

      categories.sort(function(a, b) { return b.value - a.value; });
      var maxVal = categories[0] ? categories[0].value : 1;

      var html = '<div class="calc-result"><div class="label">Estimated first-year cost</div>';
      html += '<div class="total">' + sym + total.toLocaleString() + '</div></div>';

      html += '<div class="cost-bars">';
      categories.forEach(function(c) {
        if (c.na) {
          html += '<div class="cost-bar-item"><span class="cost-bar-label">' + c.label + '</span>';
          html += '<div class="cost-bar-track"><div class="cost-bar-fill" style="width:0;background:#ddd"></div></div>';
          html += '<span class="cost-bar-value" style="color:#999">N/A</span></div>';
        } else {
          var pct = maxVal > 0 ? Math.round((c.value / maxVal) * 100) : 0;
          html += '<div class="cost-bar-item"><span class="cost-bar-label">' + c.label + '</span>';
          html += '<div class="cost-bar-track"><div class="cost-bar-fill" style="width:' + pct + '%;background:' + c.color + '"></div></div>';
          html += '<span class="cost-bar-value">' + sym + c.value.toLocaleString() + '</span></div>';
        }
      });
      html += '</div>';

      // Savings comparison
      if (st.childcare === 'daycare' || st.childcare === 'nanny' || st.childcare === 'nursery') {
        var savings = categories.find(function(c) { return c.label === 'Childcare'; });
        if (savings && savings.value > 0) {
          html += '<div class="savings-box"><p>If you switched from ' + st.childcare + ' to a stay-at-home parent, you\'d save approximately <span class="savings-amount">' + sym + savings.value.toLocaleString() + '</span> per year.</p></div>';
        }
      }

      html += '<p style="font-size:13px;color:#6B7280;margin-top:16px">Data: USDA, Brookings Institution, Child Care Aware, ONS, GOV.UK, MOHAP. Built by Sarah, MBA (INSEAD), father of two.</p>';

      // Share button
      html += '<div style="margin-top:16px"><button onclick="shareCalcResults()" class="btn-secondary" style="padding:8px 20px;font-size:14px">Copy link to share</button></div>';

      // CTAs
      html += '<div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">';
      html += '<a href="/tools/baby-budget-planner/" class="btn-primary" style="font-size:14px;padding:10px 20px">Plan your monthly budget →</a>';
      html += '<a href="/tools/baby-registry-checklist/" class="btn-secondary" style="font-size:14px;padding:10px 20px">See what gear you\'ll need →</a>';
      html += '</div>';

      resultsDiv.innerHTML = html;
      resultsDiv.style.display = 'block';
    }

    // Read URL params on load
    var params = new URLSearchParams(window.location.search);
    if (params.get('country')) {
      var countryBtn = document.querySelector('[data-country="' + params.get('country') + '"]');
      if (countryBtn) countryBtn.click();
      setTimeout(function() {
        ['birth','insurance','feeding','childcare','diapers','gear'].forEach(function(key) {
          var val = params.get(key);
          if (val) {
            var optBtn = calcForm.querySelector('[data-group="' + key + '"][data-option="' + val + '"]');
            if (optBtn) optBtn.click();
          }
        });
        var regionVal = params.get('region');
        if (regionVal && regionSelect) {
          regionSelect.value = regionVal;
          regionSelect.dispatchEvent(new Event('change'));
        }
      }, 100);
    }
  }

  window.shareCalcResults = function() {
    var p = new URLSearchParams();
    if (state) {
      Object.keys(state).forEach(function(k) { if (state[k]) p.set(k, state[k]); });
    }
    var url = window.location.origin + window.location.pathname + '?' + p.toString();
    navigator.clipboard.writeText(url).then(function() {
      var btn = document.querySelector('.btn-secondary');
      if (btn) { btn.textContent = 'Copied!'; setTimeout(function() { btn.textContent = 'Copy link to share'; }, 2000); }
    });
  };


  /* ===========================
     BUDGET PLANNER
     =========================== */
  var budgetForm = document.getElementById('budget-planner');
  if (budgetForm) {
    var inputs = budgetForm.querySelectorAll('input, select');
    inputs.forEach(function(el) {
      el.addEventListener('input', calculateBudget);
      el.addEventListener('change', calculateBudget);
    });

    function calculateBudget() {
      var income = parseFloat(document.getElementById('bp-income').value) || 0;
      var rent = parseFloat(document.getElementById('bp-rent').value) || 0;
      var fixed = parseFloat(document.getElementById('bp-fixed').value) || 0;
      var childcareCost = parseFloat(document.getElementById('bp-childcare-cost').value) || 0;
      var feedType = document.querySelector('input[name="bp-feeding"]:checked');
      var diaperType = document.querySelector('input[name="bp-diapers"]:checked');

      var feedingMonthly = 0;
      if (feedType) {
        switch (feedType.value) {
          case 'breastfeeding': feedingMonthly = 25; break;
          case 'formula': feedingMonthly = 170; break;
          case 'mixed': feedingMonthly = 90; break;
        }
      }

      var diapersMonthly = 0;
      if (diaperType) {
        diapersMonthly = diaperType.value === 'cloth' ? 30 : 80;
      }

      var healthMonthly = 100;
      var miscMonthly = 80;
      var totalBaby = childcareCost + feedingMonthly + diapersMonthly + healthMonthly + miscMonthly;
      var available = income - rent - fixed;
      var remaining = available - totalBaby;
      var babyPct = income > 0 ? Math.round((totalBaby / income) * 100) : 0;

      // Display
      var resultsDiv = document.getElementById('budget-results');
      if (!resultsDiv || income === 0) return;

      var rentPct = income > 0 ? Math.round((rent / income) * 100) : 0;
      var fixedPct = income > 0 ? Math.round((fixed / income) * 100) : 0;
      var remainPct = Math.max(0, 100 - rentPct - fixedPct - babyPct);

      // Traffic light
      var lightClass = 'green';
      var lightMsg = 'Comfortable — baby costs are under 25% of income.';
      if (babyPct > 40) {
        lightClass = 'red';
        lightMsg = 'Stretched — consider our <a href="/save-money-first-year-baby/">savings tips</a> to reduce costs.';
      } else if (babyPct > 25) {
        lightClass = 'yellow';
        lightMsg = 'Tight but manageable — check our <a href="/save-money-first-year-baby/">savings tips</a>.';
      }

      var html = '<div class="card"><h3>Available for baby: $' + available.toLocaleString() + '/month</h3></div>';

      // Donut chart SVG
      html += '<div class="donut-container"><svg width="200" height="200" viewBox="0 0 200 200">';
      var segments = [
        { pct: rentPct, color: '#2C3E6B', label: 'Housing' },
        { pct: fixedPct, color: '#6B7280', label: 'Fixed' },
        { pct: babyPct, color: '#FF6B6B', label: 'Baby' },
        { pct: remainPct, color: '#2ECC71', label: 'Remaining' }
      ];
      var offset = 0;
      segments.forEach(function(seg) {
        if (seg.pct > 0) {
          var dash = seg.pct * 3.14;
          var gap = 314 - dash;
          html += '<circle cx="100" cy="100" r="50" fill="none" stroke="' + seg.color + '" stroke-width="30" stroke-dasharray="' + dash + ' ' + gap + '" stroke-dashoffset="' + (-offset * 3.14) + '" transform="rotate(-90 100 100)"/>';
          offset += seg.pct;
        }
      });
      html += '<text x="100" y="95" text-anchor="middle" font-family="Inter" font-weight="700" font-size="22" fill="#2C3E50">$' + totalBaby.toLocaleString() + '</text>';
      html += '<text x="100" y="115" text-anchor="middle" font-family="Inter" font-size="12" fill="#6B7280">baby/month</text>';
      html += '</svg></div>';

      // Legend
      html += '<div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-bottom:16px">';
      segments.forEach(function(seg) {
        html += '<span style="font-size:13px"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + seg.color + ';margin-right:4px"></span>' + seg.label + ' ' + seg.pct + '%</span>';
      });
      html += '</div>';

      // Baby breakdown
      html += '<h3>Baby cost breakdown</h3>';
      var babyItems = [
        { label: 'Childcare', value: childcareCost },
        { label: 'Feeding', value: feedingMonthly },
        { label: 'Diapers', value: diapersMonthly },
        { label: 'Health', value: healthMonthly },
        { label: 'Misc', value: miscMonthly }
      ];
      var maxBaby = Math.max.apply(null, babyItems.map(function(b) { return b.value; })) || 1;
      html += '<div class="cost-bars">';
      babyItems.forEach(function(item) {
        var w = Math.round((item.value / maxBaby) * 100);
        html += '<div class="cost-bar-item"><span class="cost-bar-label">' + item.label + '</span>';
        html += '<div class="cost-bar-track"><div class="cost-bar-fill" style="width:' + w + '%;background:#FF6B6B"></div></div>';
        html += '<span class="cost-bar-value">$' + item.value.toLocaleString() + '</span></div>';
      });
      html += '</div>';

      // Traffic light
      html += '<div class="traffic-light ' + lightClass + '">' + lightMsg + '</div>';

      resultsDiv.innerHTML = html;
      resultsDiv.style.display = 'block';
    }
  }


  /* ===========================
     TAX SAVINGS MINI-CALCULATOR
     =========================== */
  var taxCalc = document.getElementById('tax-calc');
  if (taxCalc) {
    taxCalc.addEventListener('input', calculateTaxSavings);

    function calculateTaxSavings() {
      var filing = document.getElementById('tax-filing').value;
      var income = parseFloat(document.getElementById('tax-income').value) || 0;
      var children = parseInt(document.getElementById('tax-children').value) || 1;
      var childcareExp = parseFloat(document.getElementById('tax-childcare').value) || 0;

      var ctc = TAX_DATA.child_tax_credit * children;
      if (income > 200000 && filing === 'single') ctc = Math.max(0, ctc - Math.floor((income - 200000) / 1000) * 50);
      if (income > 400000 && filing !== 'single') ctc = Math.max(0, ctc - Math.floor((income - 400000) / 1000) * 50);

      var fsaSavings = Math.min(childcareExp, TAX_DATA.dependent_care_fsa_limit);
      var marginalRate = income > 182100 ? 0.32 : income > 95375 ? 0.24 : income > 44725 ? 0.22 : 0.12;
      var fsaTaxSaved = Math.round(fsaSavings * marginalRate);

      var hohSavings = 0;
      if (filing === 'single') {
        hohSavings = Math.round((TAX_DATA.head_of_household_deduction - TAX_DATA.single_deduction) * marginalRate);
      }

      var total = ctc + fsaTaxSaved + hohSavings;

      var resultDiv = document.getElementById('tax-results');
      if (resultDiv) {
        resultDiv.innerHTML = '<div class="calc-result" style="padding:20px"><div class="label">Estimated annual tax savings</div><div class="total">$' + total.toLocaleString() + '</div></div>' +
          '<div style="margin-top:12px;font-size:14px"><p>Child Tax Credit: <strong>$' + ctc.toLocaleString() + '</strong></p>' +
          '<p>Dependent Care FSA savings: <strong>$' + fsaTaxSaved.toLocaleString() + '</strong></p>' +
          (hohSavings > 0 ? '<p>Head of Household filing benefit: <strong>$' + hohSavings.toLocaleString() + '</strong></p>' : '') +
          '</div>';
      }
    }
  }


  /* ===========================
     WORK CALCULATOR
     =========================== */
  var workCalc = document.getElementById('work-calc');
  if (workCalc) {
    workCalc.addEventListener('input', calculateWork);

    function calculateWork() {
      var salary = parseFloat(document.getElementById('work-salary').value) || 0;
      var childcare = parseFloat(document.getElementById('work-childcare').value) || 0;
      var commute = parseFloat(document.getElementById('work-commute').value) || 0;
      var extras = parseFloat(document.getElementById('work-extras').value) || 0;

      var netGain = salary - childcare - commute - extras;

      var resultDiv = document.getElementById('work-results');
      if (resultDiv) {
        var color = netGain < 500 ? '#F39C12' : '#2C3E6B';
        resultDiv.innerHTML = '<div class="calc-result" style="background:' + (netGain < 0 ? '#E74C3C' : color) + ';padding:20px"><div class="label">Your net gain from working</div><div class="total">$' + netGain.toLocaleString() + '/month</div></div>';
        if (netGain < 500 && netGain > 0) {
          resultDiv.innerHTML += '<p style="color:#92400E;font-size:14px;margin-top:8px">This is a tight margin. Read the long-term career math below before making a decision.</p>';
        }
      }
    }
  }


  /* ===========================
     IVF ESTIMATOR
     =========================== */
  var ivfCalc = document.getElementById('ivf-calc');
  if (ivfCalc) {
    ivfCalc.addEventListener('input', calculateIVF);

    function calculateIVF() {
      var costPerCycle = parseFloat(document.getElementById('ivf-cost').value) || 15000;
      var cycles = parseInt(document.getElementById('ivf-cycles').value) || 2;
      var meds = parseFloat(document.getElementById('ivf-meds').value) || 5000;
      var extras = parseFloat(document.getElementById('ivf-extras').value) || 3000;

      var total = (costPerCycle * cycles) + (meds * cycles) + extras;

      var resultDiv = document.getElementById('ivf-results');
      if (resultDiv) {
        resultDiv.innerHTML = '<div class="calc-result" style="padding:20px"><div class="label">Total IVF budget estimate</div><div class="total">$' + total.toLocaleString() + '</div></div>' +
          '<p style="font-size:14px;color:#6B7280">Based on ' + cycles + ' cycle(s) at $' + costPerCycle.toLocaleString() + ' each, plus $' + meds.toLocaleString() + '/cycle for medications and $' + extras.toLocaleString() + ' for testing/storage.</p>';
      }
    }
  }


  /* ===========================
     FORMULA SLIDER
     =========================== */
  var formulaSlider = document.getElementById('formula-age-slider');
  if (formulaSlider) {
    formulaSlider.addEventListener('input', updateFormulaCalc);
    updateFormulaCalc();

    function updateFormulaCalc() {
      var month = parseInt(formulaSlider.value);
      var consumption = FORMULA_CONSUMPTION[month] || FORMULA_CONSUMPTION[0];
      var resultsDiv = document.getElementById('formula-results');
      if (!resultsDiv) return;

      var html = '<p style="font-size:15px;margin-bottom:16px">At <strong>' + consumption.label + '</strong>, a baby drinks about <strong>' + consumption.oz_per_day + ' oz/day</strong> of prepared formula.</p>';
      html += '<table><thead><tr><th>Brand</th><th>Type</th><th>Monthly Cost</th><th>Annual Cost</th></tr></thead><tbody>';

      FORMULA_BRANDS.forEach(function(brand) {
        var monthly = Math.round(consumption.oz_per_day * 30 * brand.per_oz);
        var annual = monthly * 12;
        html += '<tr><td>' + brand.name + '</td><td>' + brand.type + '</td><td>$' + monthly.toLocaleString() + '</td><td>$' + annual.toLocaleString() + '</td></tr>';
      });
      html += '</tbody></table>';

      resultsDiv.innerHTML = html;
    }
  }


  /* ===========================
     READINESS QUIZ
     =========================== */
  var quizContainer = document.getElementById('readiness-quiz');
  if (quizContainer) {
    var currentQ = 0;
    var answers = [];

    function renderQuestion() {
      if (currentQ >= READINESS_QUESTIONS.length) {
        showQuizResults();
        return;
      }

      var q = READINESS_QUESTIONS[currentQ];
      quizContainer.innerHTML =
        '<div class="quiz-progress"><div class="progress-bar"><div class="progress-bar-fill" style="width:' + Math.round((currentQ / READINESS_QUESTIONS.length) * 100) + '%"></div></div>' +
        '<span class="progress-text">Q ' + (currentQ + 1) + ' of ' + READINESS_QUESTIONS.length + '</span></div>' +
        '<div class="quiz-question"><p>' + q.question + '</p>' +
        '<div class="quiz-btns"><button class="quiz-btn yes" data-answer="yes">Yes</button>' +
        '<button class="quiz-btn no" data-answer="no">No</button></div></div>';
    }

    quizContainer.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-answer]');
      if (!btn) return;
      answers.push(btn.getAttribute('data-answer'));
      currentQ++;
      renderQuestion();
    });

    function showQuizResults() {
      var yesCount = answers.filter(function(a) { return a === 'yes'; }).length;
      var color, emoji, msg;

      if (yesCount >= 8) {
        color = '#065F46'; emoji = '&#128994;';
        msg = "You're in strong shape financially. You've done the planning most people skip.";
      } else if (yesCount >= 5) {
        color = '#92400E'; emoji = '&#128993;';
        msg = "You're close. Here are the areas to focus on before — or during — your pregnancy.";
      } else {
        color = '#991B1B'; emoji = '&#128308;';
        msg = "There's work to do, but that's exactly why you're here. Every 'no' above is fixable.";
      }

      var html = '<div class="quiz-results" style="display:block">';
      html += '<div class="quiz-score"><div class="score-number">' + yesCount + '/' + READINESS_QUESTIONS.length + '</div>';
      html += '<p style="color:' + color + ';font-weight:600">' + emoji + ' ' + msg + '</p></div>';

      // Show advice for "no" answers
      html += '<div class="quiz-advice">';
      answers.forEach(function(a, i) {
        if (a === 'no') {
          var q = READINESS_QUESTIONS[i];
          html += '<div class="quiz-advice-item"><h4>Q' + (i + 1) + ': ' + q.question + '</h4><p>' + q.noAdvice + '</p></div>';
        }
      });
      html += '</div>';

      html += '<div style="text-align:center;margin-top:24px"><a href="/tools/baby-cost-calculator/" class="btn-primary">Ready to calculate your costs? →</a></div>';
      html += '</div>';

      quizContainer.innerHTML = html;
    }

    renderQuestion();
  }

})();
