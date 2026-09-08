/* ============================================================
   Bitumen Calculator - App JavaScript
   ============================================================ */

'use strict';

/* -- Nav / Mobile Menu --------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollTop();
  initFAQ();
  initTableTabs();
  initCalculator();
  initContactForm();
  setActiveNav();
  animateOnScroll();
  scheduleAds();
});

function scheduleAds() {
  const loadAds = () => {
    if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.adsbygoogleLoader = 'true';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6438644207209483';
    document.head.appendChild(script);
  };

  const deferLoad = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadAds, { timeout: 3500 });
    } else {
      window.setTimeout(loadAds, 2500);
    }
  };

  if (document.readyState === 'complete') {
    deferLoad();
  } else {
    window.addEventListener('load', deferLoad, { once: true });
  }
}

function initNav() {
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.querySelectorAll('span')[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
      toggle.querySelectorAll('span')[1].style.opacity   = open ? '0' : '1';
      toggle.querySelectorAll('span')[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdown toggle (for keyboard/click support)
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    let closeTimer;
    const openDropdown = () => {
      clearTimeout(closeTimer);
      dropdown.classList.add('hovering');
    };
    const closeDropdown = () => {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        dropdown.classList.remove('hovering');
      }, 140);
    };

    dropdown.addEventListener('mouseenter', openDropdown);
    dropdown.addEventListener('mouseleave', closeDropdown);
    dropdown.addEventListener('focusin', openDropdown);
    dropdown.addEventListener('focusout', (e) => {
      if (!dropdown.contains(e.relatedTarget)) closeDropdown();
    });
  });

  document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.closest('.nav-dropdown');
      const wasOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
      if (!wasOpen) dropdown.classList.add('open');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown.open, .nav-dropdown.hovering').forEach(d => {
      d.classList.remove('open');
      d.classList.remove('hovering');
    });
  });
}

function setActiveNav() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href || href.startsWith('#')) return;
    const normalizedHref = href.replace(/\/+$/, '') || '/';
    if (normalizedHref === path) {
      a.classList.add('active');
    }
  });
}

/* -- Scroll-to-top ------------------------------------------- */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* -- FAQ Accordion ------------------------------------------- */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach((q, index) => {
    const answer = q.closest('.faq-item').querySelector('.faq-a');
    if (answer) {
      answer.id = answer.id || 'faq-answer-' + index;
      q.setAttribute('aria-controls', answer.id);
    }
    q.setAttribute('aria-expanded', q.closest('.faq-item').classList.contains('open') ? 'true' : 'false');
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) item.classList.add('open');
      q.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });
}

/* -- Reference Table Tabs ------------------------------------ */
function initTableTabs() {
  document.querySelectorAll('.table-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      const container = tab.closest('.table-tabs-wrap');
      if (!container) return;
      container.querySelectorAll('.table-tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.table-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = container.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  /* Calc tabs (Standard Pavement / With Cost Estimate) */
  document.querySelectorAll('.calc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const wrap = tab.closest('.calc-wrap');
      if (!wrap) return;
      wrap.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const idx = [...tab.parentElement.children].indexOf(tab);
      const s = SUFFIX;
      const costField = wrap.querySelector('.cost-field-group');
      if (costField) costField.style.display = idx === 1 ? '' : 'none';
    });
  });
}

/* -- Scroll Animations --------------------------------------- */
function animateOnScroll() {
  if (!window.IntersectionObserver) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-fadeInUp');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.step-card, .formula-card, .dir-card, .pillar-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/* -- Contact Form -------------------------------------------- */
/* This is a static site with no server-side mail handler. Rather than
   pretend a submission was delivered, the form composes a mailto: draft
   in the visitor's own mail client. The success panel says so explicitly. */
const CONTACT_ADDRESS = 'info@bitumencalc.com';

const SUBJECT_LABELS = {
  bug:      'Bug report / incorrect result',
  feature:  'Feature request',
  regional: 'New regional calculator',
  question: 'General question',
  other:    'Website enquiry'
};

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const val = (id) => (document.getElementById(id)?.value || '').trim();
    const name = [val('firstName'), val('lastName')].filter(Boolean).join(' ');
    const subject = SUBJECT_LABELS[val('subject')] || 'Website enquiry';

    const body = [
      val('message'),
      '',
      '---',
      name ? 'From: ' + name : null,
      val('email') ? 'Reply to: ' + val('email') : null,
      'Sent from bitumencalc.com/contact-us/'
    ].filter(v => v !== null).join('\n');

    const href = 'mailto:' + CONTACT_ADDRESS +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = href;

    form.style.display = 'none';
    const success = document.getElementById('formSuccess');
    if (success) success.style.display = 'block';
  });
}

/* ============================================================
   CALCULATOR ENGINE
   Supports both home page (IDs with 'Full' suffix) and
   calculator sub-pages (IDs without suffix) automatically.
   ============================================================ */
const CALC_DEFAULTS = {
  bitumenContent: 5.5,
  density: 2300,
};

/* Detect which page we're on: home uses 'Full' suffix IDs */
const SUFFIX = document.getElementById('calcFormFull') ? 'Full' : '';

function initCalculator() {
  const form = document.getElementById('calcForm' + SUFFIX);
  if (!form) return;

  form.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', debounce(runCalculation, 200));
  });

  const calcBtn = document.getElementById('calcBtn' + SUFFIX);
  if (calcBtn) calcBtn.addEventListener('click', runCalculation);

  const resetBtn = document.getElementById('resetBtn' + SUFFIX);
  if (resetBtn) resetBtn.addEventListener('click', resetCalculator);

  const mixSelect = document.getElementById('mixType' + SUFFIX);
  if (mixSelect) {
    mixSelect.addEventListener('change', applyMixPreset);
  }
}

/* -- Conversion helpers -------------------------------------- */
const toMeters = {
  m:  v => v,
  ft: v => v * 0.3048,
  km: v => v * 1000,
  yd: v => v * 0.9144,
  mi: v => v * 1609.344,
};

const thicknessToMeters = {
  mm: v => v / 1000,
  cm: v => v / 100,
  m:  v => v,
  in: v => v * 0.0254,
  ft: v => v * 0.3048,
};

const densityToKgM3 = {
  'kg/m3': v => v,
  'lb/ft3': v => v * 16.0185,
  't/m3':  v => v * 1000,
};

function getVal(id, fallback = 0) {
  const el = document.getElementById(id);
  if (!el) return fallback;
  const v = parseFloat(el.value);
  return isNaN(v) ? fallback : v;
}

function getStr(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function runCalculation() {
  const s = SUFFIX;
  const length    = getVal('length' + s);
  const width     = getVal('width' + s);
  const thickness = getVal('thickness' + s);
  const bitPct    = getVal('bitumenContent' + s, CALC_DEFAULTS.bitumenContent);
  const density   = getVal('density' + s, CALC_DEFAULTS.density);
  const price     = getVal('price' + s, 0);

  const lengthUnit    = getStr('lengthUnit' + s)    || 'm';
  const widthUnit     = getStr('widthUnit' + s)     || 'm';
  const thicknessUnit = getStr('thicknessUnit' + s) || 'mm';
  const densityUnit   = getStr('densityUnit' + s)   || 'kg/m3';
  const currency      = getStr('currency' + s)      || 'USD';

  const valid = [length, width, thickness, density].every(v => Number.isFinite(v) && v > 0)
    && Number.isFinite(bitPct) && bitPct >= 0 && bitPct <= 100
    && Number.isFinite(price) && price >= 0;
  let error = document.getElementById('calcError' + s);
  if (!error) {
    const form = document.getElementById('calcForm' + s);
    if (form) {
      error = document.createElement('p');
      error.id = 'calcError' + s;
      error.setAttribute('role', 'status');
      form.appendChild(error);
    }
  }
  if (error) error.textContent = valid ? '' : 'Enter positive dimensions and density, binder content from 0 to 100%, and a non-negative price.';
  if (!valid) {
    resetResults();
    return;
  }

  const lm  = (toMeters[lengthUnit]             || toMeters.m)(length);
  const wm  = (toMeters[widthUnit]              || toMeters.m)(width);
  const tm  = (thicknessToMeters[thicknessUnit] || thicknessToMeters.mm)(thickness);
  const rho = (densityToKgM3[densityUnit]       || densityToKgM3['kg/m3'])(density);

  const volume    = lm * wm * tm;
  const weightKg  = volume * rho;
  const weightT   = weightKg / 1000;
  const bitWeight = weightT * (bitPct / 100);
  const aggWeight = weightT - bitWeight;
  const area      = lm * wm;

  const currSymbols = { USD: '$', AUD: 'A$', CAD: 'C$', NZD: 'NZ$', GBP: '£', EUR: '€', INR: '₹' };
  const sym  = currSymbols[currency] || '$';
  const quoteWeight = getStr('priceUnit' + s) === 'short-ton' ? weightT / 0.90718474 : weightT;
  const cost = price > 0 ? quoteWeight * price : null;

  displayResults({ volume, weightT, bitWeight, aggWeight, area, bitPct, cost, sym });
}

function displayResults({ volume, weightT, bitWeight, aggWeight, area, bitPct, cost, sym }) {
  const s    = SUFFIX;
  const wrap = document.getElementById('calcResults' + s);
  if (!wrap) return;
  wrap.classList.add('has-results');

  /* Home page: manually show/hide (no CSS rule covers *-full IDs) */
  if (s === 'Full') {
    const emptyEl = document.getElementById('results-empty-full');
    const dataEl  = document.getElementById('results-data-full');
    if (emptyEl) emptyEl.style.display = 'none';
    if (dataEl)  dataEl.style.display  = 'flex';
  }

  setResultVal('resVolume'    + s, volume.toFixed(3)    + ' m³');
  setResultVal('resWeight'    + s, weightT.toFixed(3)   + ' t');
  setResultVal('resBitumen'   + s, bitWeight.toFixed(3) + ' t');
  setResultVal('resAggregate' + s, aggWeight.toFixed(3) + ' t');
  setResultVal('resArea'      + s, area.toFixed(2)      + ' m²');

  if (cost !== null) {
    setResultVal('resCost' + s, sym + cost.toFixed(2));
    show('resCostCard' + s);
  } else {
    hide('resCostCard' + s);
  }

  const bitPctBar = document.getElementById('bitPctBar'    + s);
  const bitLegend = document.getElementById('bitLegendPct' + s);
  const aggLegend = document.getElementById('aggLegendPct' + s);
  if (bitPctBar) bitPctBar.style.width = bitPct + '%';
  if (bitLegend) bitLegend.textContent = bitPct.toFixed(1) + '% Bitumen';
  if (aggLegend) aggLegend.textContent = (100 - bitPct).toFixed(1) + '% Aggregate';

  setSubVal('resBitumenSub'   + s, '(' + (bitWeight * 1000).toFixed(0) + ' kg)');
  setSubVal('resAggregateSub' + s, '(' + (aggWeight * 1000).toFixed(0) + ' kg)');
  setSubVal('resWeightSub'    + s, (weightT / 0.90718474).toFixed(3) + ' US short tons · ' + (weightT * 1000).toFixed(0) + ' kg');
}

function setResultVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setSubVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function show(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }
function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

function resetResults() {
  const s    = SUFFIX;
  const wrap = document.getElementById('calcResults' + s);
  if (wrap) wrap.classList.remove('has-results');
  if (s === 'Full') {
    const emptyEl = document.getElementById('results-empty-full');
    const dataEl  = document.getElementById('results-data-full');
    if (emptyEl) emptyEl.style.display = '';
    if (dataEl)  dataEl.style.display  = 'none';
  }
}

function resetCalculator() {
  const s    = SUFFIX;
  const form = document.getElementById('calcForm' + s);
  if (form) form.reset();
  resetResults();
  const error = document.getElementById('calcError' + s);
  if (error) error.textContent = '';
}

/* -- Mix presets -------------------------------------------- */
const MIX_PRESETS = {
  dense:   { content: 5.5, density: 2350 },
  sma:     { content: 6.5, density: 2300 },
  ogfc:    { content: 5.0, density: 2100 },
  hma:     { content: 6.0, density: 2280 },
  wma:     { content: 5.5, density: 2300 },
  porous:  { content: 4.5, density: 2000 },
  rap:     { content: 4.5, density: 2250 },
  custom:  { content: null, density: null },
};

function applyMixPreset() {
  const s       = SUFFIX;
  const mixType = getStr('mixType' + s);
  const preset  = MIX_PRESETS[mixType];
  if (!preset || mixType === 'custom') return;

  const bcEl = document.getElementById('bitumenContent' + s);
  const dnEl = document.getElementById('density' + s);
  if (bcEl && preset.content !== null) bcEl.value = preset.content;
  if (dnEl && preset.density !== null) dnEl.value = preset.density;

  runCalculation();
}

/* -- Utility ------------------------------------------------- */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/* -- Page-specific defaults (called by sub-pages) ------------ */
window.BitCalc = {
  run: runCalculation,
  reset: resetCalculator,
  setDefaults(opts) {
    const s = SUFFIX;
    if (opts.bitumenContent) {
      const el = document.getElementById('bitumenContent' + s);
      if (el) el.value = el.defaultValue = opts.bitumenContent;
    }
    if (opts.density) {
      const el = document.getElementById('density' + s);
      if (el) el.value = el.defaultValue = opts.density;
    }
    if (opts.currency) {
      const el = document.getElementById('currency' + s);
      if (el) {
        el.value = opts.currency;
        [...el.options].forEach(option => option.defaultSelected = option.value === opts.currency);
      }
    }
  }
};
