/* ============================================================
   BitumenCalc — Executive Professional PDF Report & Direct Downloader
   Matches exact civil engineering takeoff specification with 1-click download
   ============================================================ */

let html2pdfPromise = null;
function loadHtml2Pdf() {
  if (window.html2pdf) return Promise.resolve(window.html2pdf);
  if (html2pdfPromise) return html2pdfPromise;

  html2pdfPromise = new Promise((resolve, reject) => {
    if (window.html2pdf) return resolve(window.html2pdf);

    const existing = document.querySelector('script[src*="html2pdf"]');
    if (existing) {
      let attempts = 0;
      const interval = setInterval(() => {
        if (window.html2pdf) {
          clearInterval(interval);
          resolve(window.html2pdf);
        } else if (++attempts > 40) {
          clearInterval(interval);
          reject(new Error('Timed out waiting for html2pdf library'));
        }
      }, 100);
      return;
    }

    const s = document.createElement('script');
    s.src = '/js/vendor/html2pdf.bundle.min.js';
    s.async = true;
    s.onload = () => {
      if (window.html2pdf) {
        resolve(window.html2pdf);
      } else {
        reject(new Error('html2pdf library loaded but not available on window'));
      }
    };
    s.onerror = () => {
      const cdn = document.createElement('script');
      cdn.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      cdn.async = true;
      cdn.onload = () => {
        if (window.html2pdf) {
          resolve(window.html2pdf);
        } else {
          reject(new Error('html2pdf CDN loaded but not available on window'));
        }
      };
      cdn.onerror = (err) => reject(err);
      document.head.appendChild(cdn);
    };
    document.head.appendChild(s);
  });

  return html2pdfPromise;
}

function buildPrintReport() {
  let root = document.getElementById('printReportRoot');
  if (!root) {
    root = document.createElement('div');
    root.id = 'printReportRoot';
    root.className = 'print-report-root';
    document.body.appendChild(root);
  }

  const h1El = document.querySelector('h1, .article-title');
  const rawTitle = (h1El ? h1El.textContent.trim() : 'Asphalt Tonnage Calculator');
  const docTitle = document.title || '';
  const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
  const subtitleText = docTitle.includes('—') ? docTitle : (rawTitle + ' — ' + (metaDesc.slice(0, 75) || 'Civil Engineering Material Takeoff'));

  const canonicalEl = document.querySelector('link[rel="canonical"]');
  let displayUrl = canonicalEl
    ? canonicalEl.href.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : ('bitumencalc.com' + window.location.pathname.replace(/\/$/, ''));
  displayUrl = displayUrl.replace(/^www\./, '');

  const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
  const reportRef = 'BC-' + hash;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                + ' · ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' UTC';

  // 1. EXTRACT PARAMETER CARDS
  const formCards = document.querySelectorAll(
    '#calcForm .calc-form-card, .calc-inputs-column .calc-form-card, form .calc-form-card, #calcFormFull .input-set, .calc-inputs .input-set'
  );
  let paramCardsHtml = '';
  let stepCounter = 1;

  formCards.forEach(card => {
    // Skip unit selector / presets or hidden cards
    if (card.querySelector('.unit-toggle-segmented, .presets-group, .preset-btn')) return;
    if (card.style.display === 'none' || (window.getComputedStyle && window.getComputedStyle(card).display === 'none')) return;

    const titleEl = card.querySelector('.calc-card-title, .input-set-title, h2, h3');
    const rawCardTitle = titleEl ? titleEl.textContent.trim() : ('Parameter Group ' + stepCounter);
    const cleanTitle = rawCardTitle.replace(/^\d+[\.\s]+/, '');

    // Skip inactive/empty cost estimation card if price is 0 or disabled
    const isCostCard = card.querySelector('#price, #priceFull, [id*="price" i], [id*="cost" i], .cost-field-group') || /cost/i.test(cleanTitle);
    if (isCostCard) {
      const priceInput = card.querySelector('input[id*="price" i], input[id*="cost" i], #price, #priceFull');
      const priceVal = priceInput ? parseFloat(priceInput.value || 0) : 0;
      const costCheck = card.querySelector('input[type="checkbox"]') || document.getElementById('calcCostCheck') || document.querySelector('input[type="checkbox"][id*="cost" i]');
      const isCostActive = (costCheck && costCheck.checked) || (priceVal > 0 && !isNaN(priceVal));
      if (!isCostActive) return; // Skip card when cost is 0 or disabled
    }

    const subEl = card.querySelector('.calc-card-subtitle, p');
    const cleanSub = subEl ? subEl.textContent.trim() : '';

    const iconSvg = card.querySelector('.calc-tile-icon svg')?.outerHTML || `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
      </svg>
    `;

    let fieldsHtml = '';
    const fieldRows = card.querySelectorAll('.calc-field-row, .calc-field-row-2, .field-grid-2col, .field-grid-2');
    const processed = new Set();
    if (fieldRows.length > 0) {
      fieldRows.forEach(row => {
        const inputs = row.querySelectorAll('.calc-field, .form-group, .input-group, .field');
        if (inputs.length === 2) {
          fieldsHtml += '<div class="param-row-2col">';
          inputs.forEach(f => {
            processed.add(f);
            fieldsHtml += renderField(f);
          });
          fieldsHtml += '</div>';
        } else {
          inputs.forEach(f => {
            processed.add(f);
            fieldsHtml += renderField(f);
          });
        }
      });
    }

    // Process standalone fields that are not in multi-column rows
    const allCandidateFields = card.querySelectorAll('.calc-field, .field, .form-group, .field-wrap');
    allCandidateFields.forEach(f => {
      if (processed.has(f)) return;
      if (f.closest('.calc-field-row, .calc-field-row-2, .field-grid-2col, .field-grid-2')) return;
      processed.add(f);
      fieldsHtml += renderField(f);
    });

    if (!fieldsHtml) {
      const allFields = card.querySelectorAll('.calc-field, .field, .form-group, .field-wrap');
      allFields.forEach(f => { fieldsHtml += renderField(f); });
    }

    // Notice box
    const noticeEl = card.querySelector('.calc-notice-box, .calc-ranges-box, [class*="ranges-box"], [class*="notice-box"]');
    let noticeHtml = '';
    if (noticeEl) {
      const innerText = noticeEl.querySelector('span')?.innerHTML || noticeEl.innerHTML.replace(/<svg[\s\S]*?<\/svg>/gi, '').trim();
      noticeHtml = `
        <div class="report-notice-box">
          <div class="notice-icon">i</div>
          <div class="notice-text">${innerText}</div>
        </div>
      `;
    }

    paramCardsHtml += `
      <div class="report-param-card ${stepCounter > 1 ? 'mt-10' : ''}">
        <div class="param-card-header">
          <div class="param-step-badge">${stepCounter}</div>
          <div class="param-header-icon">${iconSvg}</div>
          <div class="param-header-text">
            <div class="param-title">${cleanTitle}</div>
            ${cleanSub ? `<div class="param-sub">${cleanSub}</div>` : ''}
          </div>
        </div>
        ${fieldsHtml}
        ${noticeHtml}
      </div>
    `;

    stepCounter++;
  });

  function renderField(fieldContainer) {
    const labelEl = fieldContainer.querySelector('label, .calc-field-label, .field-label');
    const labelText = labelEl ? labelEl.textContent.trim().toUpperCase() : '';

    const input = fieldContainer.querySelector('input');
    const select = fieldContainer.querySelector('select');

    if (input) {
      const val = input.value !== '' ? input.value : (input.placeholder || '0');
      let unitText = '';
      if (select) {
        unitText = select.options[select.selectedIndex]?.text || select.value;
      } else {
        const unitEl = fieldContainer.querySelector('.input-unit, .unit-select, .calc-select-inline');
        if (unitEl) {
          unitText = unitEl.tagName === 'SELECT' ? (unitEl.options[unitEl.selectedIndex]?.text || unitEl.value) : unitEl.textContent.trim();
        }
      }
      return `
        <div class="param-field mt-6">
          ${labelText ? `<label class="param-label">${labelText}</label>` : ''}
          <div class="param-input-box">
            <span class="param-val">${val}</span>
            ${unitText ? `<span class="param-unit">${unitText}</span>` : ''}
          </div>
        </div>
      `;
    }

    if (select) {
      const selectedText = select.options[select.selectedIndex]?.text || select.value;
      const hintEl = fieldContainer.querySelector('.field-hint, .calc-card-subtitle, small');
      const hintText = hintEl ? hintEl.textContent.trim() : '';
      return `
        <div class="param-field mt-6">
          ${labelText ? `<label class="param-label">${labelText}</label>` : ''}
          <div class="param-select-box">
            <span class="select-text">${selectedText}</span>
            <svg class="chevron-down-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          ${hintText ? `<div class="param-hint">${hintText}</div>` : ''}
        </div>
      `;
    }
    return '';
  }

  // 2. EXTRACT RESULTS
  let heroLabel = 'ESTIMATED ASPHALT (MIX MASS)';
  let heroNum = '0.00';
  let heroUnit = 't';
  let heroSub = 'Total asphalt mixture required for this project.';

  const heroHighlight = document.querySelector('.hud-hero-highlight');
  if (heroHighlight) {
    heroLabel = heroHighlight.querySelector('.hud-hero-label')?.textContent.trim() || heroLabel;
    heroNum = heroHighlight.querySelector('.hud-hero-number')?.textContent.trim() || heroNum;
    heroUnit = heroHighlight.querySelector('.hud-hero-unit')?.textContent.trim() || heroUnit;
    heroSub = heroHighlight.querySelector('.hud-hero-sub')?.textContent.trim() || heroSub;
  } else {
    // Homepage / standard result card fallback
    const resWeightEl = document.getElementById('resWeightFull') || document.getElementById('resWeight') || document.querySelector('.calc-results .result-card.highlighted .result-card-value');
    if (resWeightEl) {
      const fullText = resWeightEl.textContent.trim();
      const match = fullText.match(/^([0-9.,]+)\s*(.*)$/);
      if (match) {
        heroNum = match[1];
        heroUnit = match[2] || 't';
      } else {
        heroNum = fullText;
        heroUnit = '';
      }
      const labelEl = resWeightEl.closest('.result-card')?.querySelector('.result-card-label');
      if (labelEl) heroLabel = labelEl.textContent.trim().toUpperCase();
      const subEl = document.getElementById('resWeightSubFull') || document.getElementById('resWeightSub') || resWeightEl.closest('.result-card')?.querySelector('.result-card-sub');
      if (subEl && subEl.textContent.trim()) heroSub = subEl.textContent.trim();
    }
  }

  const bentoCards = document.querySelectorAll('.hud-bento-grid .hud-bento-card');
  let bentoHtml = '';
  if (bentoCards.length > 0) {
    bentoCards.forEach(b => {
      const title = b.querySelector('.hud-bento-title')?.textContent.trim() || '';
      const sub = b.querySelector('.hud-bento-sub')?.textContent.trim() || '';
      const val = b.querySelector('.hud-bento-val')?.textContent.trim() || '0';
      const iconEl = b.querySelector('.hud-bento-icon');
      const iconSvg = iconEl?.querySelector('svg')?.outerHTML || '';
      const iconClass = iconEl ? [...iconEl.classList].find(c => ['blue','green','amber','red','slate'].includes(c)) || 'blue' : 'blue';

      bentoHtml += `
        <div class="report-bento-tile">
          <div class="bento-tile-top">
            <div class="bento-icon-box ${iconClass}">
              ${iconSvg}
            </div>
            <div>
              <div class="bento-title">${title}</div>
              ${sub ? `<div class="bento-sub">${sub}</div>` : ''}
            </div>
          </div>
          <div class="bento-val ${iconClass === 'amber' ? 'text-amber' : ''}">${val}</div>
        </div>
      `;
    });
  } else {
    // Homepage or 2x2 grid fallback
    const altCards = document.querySelectorAll('#results-data-full .result-grid-2x2 .result-card, .result-grid-2x2 .result-card');
    const defaultIcons = [
      { color: 'blue', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"></path></svg>' },
      { color: 'green', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>' },
      { color: 'amber', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>' },
      { color: 'slate', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>' }
    ];

    altCards.forEach((b, idx) => {
      const title = b.querySelector('.result-card-label')?.textContent.trim() || '';
      const sub = b.querySelector('.result-card-sub')?.textContent.trim() || '';
      const val = b.querySelector('.result-card-value')?.textContent.trim() || '0';
      const iconMeta = defaultIcons[idx % defaultIcons.length];

      bentoHtml += `
        <div class="report-bento-tile">
          <div class="bento-tile-top">
            <div class="bento-icon-box ${iconMeta.color}">
              ${iconMeta.svg}
            </div>
            <div>
              <div class="bento-title">${title}</div>
              ${sub ? `<div class="bento-sub">${sub}</div>` : ''}
            </div>
          </div>
          <div class="bento-val ${iconMeta.color === 'amber' ? 'text-amber' : ''}">${val}</div>
        </div>
      `;
    });
  }

  // Cost card (if applicable)
  const costCard = document.querySelector('#resCostCard, #resCostCardFull, .cost-estimate-card, .hud-cost-panel, #tackResCostCard');
  let costCardHtml = '';
  if (costCard && window.getComputedStyle(costCard).display !== 'none') {
    const costAmount = costCard.querySelector('#resCost, #resCostFull, #tackResCost, .cost-amount, .hud-cost-amount, .result-card-value')?.textContent.trim() || '';
    const costDetail = costCard.querySelector('#resCostDetail, .cost-detail, .result-card-sub')?.textContent.trim() || '';
    if (costAmount && costAmount !== '$0.00' && costAmount !== '0' && costAmount !== '$0' && costAmount !== '—') {
      costCardHtml = `
        <div class="report-cost-card mt-10">
          <div class="cost-card-header">
            <span class="cost-card-label">ESTIMATED COMMERCIAL COST</span>
            <span class="cost-card-badge">Material Only</span>
          </div>
          <div class="cost-card-amount">${costAmount}</div>
          ${costDetail ? `<div class="cost-card-detail">${costDetail}</div>` : ''}
        </div>
      `;
    }
  }

  // 3. RENDER CONTAINER
  root.innerHTML = `
    <div class="report-page-container">
      <!-- Top Header -->
      <div class="report-top-header">
        <div class="report-brand">
          <div class="report-logo-badge">B</div>
          <div class="report-brand-text">
            <div class="report-logo-title">Bitumen<span>Calc</span></div>
            <div class="report-logo-sub">CIVIL PAVEMENT ENGINEERING CALCULATIONS</div>
          </div>
        </div>
        <div class="report-meta-block">
          <div class="report-meta-row"><strong>Report Ref:</strong> <span class="ref-code">${reportRef}</span></div>
          <div class="report-meta-row"><strong>Generated:</strong> <span>${dateStr}</span></div>
          <div class="report-meta-row"><strong>Specification:</strong> <span>ASTM D2726 / EN 12697</span></div>
        </div>
      </div>

      <!-- Title Banner -->
      <div class="report-title-banner">
        <div class="report-title-content">
          <h1 class="report-title">${rawTitle} Takeoff Report</h1>
          <div class="report-subtitle">${subtitleText}</div>
        </div>
        <div class="report-title-right">
          <svg class="road-watermark-svg" viewBox="0 0 140 60" fill="none">
            <polygon points="15,60 55,5 85,5 125,60" fill="#3b82f6" opacity="0.10"/>
            <line x1="70" y1="8" x2="70" y2="18" stroke="#ffffff" stroke-width="2.5"/>
            <line x1="70" y1="24" x2="70" y2="36" stroke="#ffffff" stroke-width="2.5"/>
            <line x1="70" y1="42" x2="70" y2="58" stroke="#ffffff" stroke-width="2.5"/>
          </svg>
          <div class="report-canonical-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span>${displayUrl}</span>
          </div>
        </div>
      </div>

      <!-- Two Columns -->
      <div class="report-two-columns">
        <!-- Left: Parameters -->
        <div class="report-col report-col-params">
          <div class="report-col-header header-navy">
            <div class="col-header-left">
              <div class="col-header-icon-circle">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <span class="col-header-title">PROJECT PARAMETERS</span>
            </div>
            <span class="col-header-sub">Input data for cost estimation</span>
          </div>
          <div class="report-col-body body-navy-border">
            ${paramCardsHtml}
          </div>
        </div>

        <!-- Right: Results -->
        <div class="report-col report-col-results">
          <div class="report-col-header header-amber">
            <div class="col-header-left">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span class="col-header-title">CALCULATION RESULTS</span>
            </div>
            <span class="col-header-sub">Material quantities from your inputs</span>
          </div>
          <div class="report-col-body body-amber-border">
            <div class="results-subhead-row">
              <div class="results-subhead-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1e293b" stroke-width="2.5">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                <div>
                  <div class="subhead-title">Estimation Results</div>
                  <div class="subhead-desc">Calculated material quantities based on your inputs.</div>
                </div>
              </div>
              <div class="results-pill-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Results calculated</span>
              </div>
            </div>

            <div class="report-hero-card">
              <div class="hero-top-badge-row">
                <div class="hero-icon-square">
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                    <polygon points="16,4 23,15 9,15" fill="#ffffff" opacity="0.95"/>
                    <polygon points="8,17 14,27 2,27" fill="#ffffff" opacity="0.9"/>
                    <polygon points="24,17 30,27 18,27" fill="#ffffff" opacity="0.9"/>
                  </svg>
                </div>
                <span class="hero-card-label">${heroLabel}</span>
              </div>
              <div class="hero-num-row">
                <span class="hero-huge-num">${heroNum}</span>
                <span class="hero-unit-tag">${heroUnit}</span>
              </div>
              <div class="hero-sub-text">${heroSub}</div>
            </div>

            <div class="report-bento-grid">
              ${bentoHtml}
            </div>

            ${costCardHtml}
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="report-bottom-footer">
        <div class="footer-left-col">
          <div class="footer-shield-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#3b82f6" opacity="0.2"/>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2563eb" stroke-width="2" fill="none"/>
              <path d="m9 12 2 2 4-4" stroke="#2563eb" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="footer-notice-text">
            <div><strong>Engineering Quality Notice:</strong> Theoretical quantities calculated using input compacted density and geometry.</div>
            <div>Always add a 5–10% safety margin for compaction variability, base irregularity, and jobsite haul loss. Certified by BitumenCalc Engineering Methodology.</div>
          </div>
        </div>
        <div class="footer-right-col">
          <div class="footer-suite-name"><strong>BitumenCalc Civil Suite</strong></div>
          <div class="footer-suite-status">Methodology Verified</div>
          <div class="footer-suite-url">bitumencalc.com</div>
        </div>
        <div class="footer-page-col">
          <span class="footer-page-num">1/1</span>
        </div>
      </div>
    </div>
  `;
}

let isGeneratingPdf = false;

async function downloadPdfReport() {
  if (isGeneratingPdf) return;

  const requiredFields = Array.from(document.querySelectorAll('[data-pdf-required]'));
  const invalidField = requiredFields.find(field => {
    const raw = (field.value || '').trim().replace(',', '.');
    const value = parseFloat(raw);
    return raw === '' || !Number.isFinite(value) || value <= 0;
  });

  if (invalidField) {
    invalidField.setCustomValidity(`Enter a value greater than zero for ${invalidField.dataset.pdfRequired}.`);
    invalidField.reportValidity();
    invalidField.setCustomValidity('');
    invalidField.focus();
    return;
  }

  buildPrintReport();
  const root = document.getElementById('printReportRoot');
  if (!root) {
    window.print();
    return;
  }

  const btns = document.querySelectorAll('#btnPrintEstimate, [data-action="download-pdf"], [onclick*="window.print"]');
  btns.forEach(btn => {
    btn.dataset.prevHtml = btn.innerHTML;
    btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> Generating PDF...</span>';
    btn.disabled = true;
  });

  let slug = window.location.pathname.replace(/^\/calculators\//, '').replace(/\/$/, '') || 'bitumen-takeoff';
  if (!slug || slug === '/') slug = 'bitumen-takeoff';
  const filename = `${slug}-report.pdf`;

  try {
    isGeneratingPdf = true;
    const html2pdf = await loadHtml2Pdf();
    root.classList.add('pdf-capture-active');
    root.style.setProperty('display', 'block', 'important');
    root.style.setProperty('position', 'fixed', 'important');
    root.style.setProperty('top', '0', 'important');
    root.style.setProperty('left', '0', 'important');
    root.style.setProperty('z-index', '9999999', 'important');
    root.style.setProperty('width', '685px', 'important');
    const reportPage = root.querySelector('.report-page-container') || root;

    const opt = {
      margin: [10, 14, 10, 14], // EXACT 10mm top, 14mm left, 10mm bottom, 14mm right
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false,
        scrollY: 0,
        scrollX: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    await html2pdf().set(opt).from(reportPage).save();
  } catch (err) {
    console.warn('Direct PDF download failed, falling back to print dialog:', err);
    window.print();
  } finally {
    isGeneratingPdf = false;
    root.classList.remove('pdf-capture-active');
    root.style.removeProperty('display');
    root.style.removeProperty('position');
    root.style.removeProperty('top');
    root.style.removeProperty('left');
    root.style.removeProperty('z-index');
    root.style.removeProperty('width');
    btns.forEach(btn => {
      if (btn.dataset.prevHtml) btn.innerHTML = btn.dataset.prevHtml;
      btn.disabled = false;
    });
  }
}

function initPrintReport() {
  loadHtml2Pdf().catch(() => {});

  window.addEventListener('beforeprint', buildPrintReport);

  const downloadIconSvg = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;

  document.querySelectorAll('#btnPrintEstimate, [data-action="download-pdf"], [onclick*="window.print"]').forEach(btn => {
    btn.id = 'btnPrintEstimate';
    const spanEl = btn.querySelector('span');
    if (spanEl && (/print/i.test(spanEl.textContent) || /download/i.test(spanEl.textContent))) {
      spanEl.textContent = 'Download PDF Report';
    }
    const iconEl = btn.querySelector('svg');
    if (iconEl && !iconEl.classList.contains('spin-icon')) {
      iconEl.outerHTML = downloadIconSvg;
    }
    btn.removeAttribute('onclick');
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      downloadPdfReport();
      return false;
    };
  });
}

// Global delegated capture listener: intercepts click on any print/download button everywhere
document.addEventListener('click', function(e) {
  const btn = e.target.closest('#btnPrintEstimate, [data-action="download-pdf"], [onclick*="window.print"]');
  if (btn) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (typeof window.downloadPdfReport === 'function') {
      window.downloadPdfReport();
    } else if (typeof downloadPdfReport === 'function') {
      downloadPdfReport();
    } else {
      window.print();
    }
  }
}, true);

// Auto-initialize when script executes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPrintReport);
} else {
  initPrintReport();
}

// Expose globally
window.loadHtml2Pdf = loadHtml2Pdf;
window.buildPrintReport = buildPrintReport;
window.downloadPdfReport = downloadPdfReport;
window.initPrintReport = initPrintReport;


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
    if (q.tagName !== 'BUTTON') {
      q.setAttribute('role', 'button');
      q.tabIndex = 0;
      q.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          q.click();
        }
      });
    }
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

/* Lightweight calculator-directory filtering: rendered links remain ordinary
   crawlable HTML and this enhancement does not need a dependency. */
function initDirectoryFilter() {
  const search = document.getElementById('calculatorDirectorySearch');
  if (!search) return;
  const cards = [...document.querySelectorAll('.dir-card')];
  const chips = [...document.querySelectorAll('.directory-chip')];
  let category = 'all';
  const filter = () => {
    const query = search.value.trim().toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const matchesCategory = category === 'all' || (card.dataset.category || '').split(' ').includes(category);
      card.hidden = !(matchesCategory && text.includes(query));
    });
  };
  search.addEventListener('input', filter);
  chips.forEach(chip => chip.addEventListener('click', () => {
    category = chip.dataset.category || 'all';
    chips.forEach(item => item.setAttribute('aria-pressed', String(item === chip)));
    filter();
  }));
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
