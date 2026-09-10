'use strict';
const fs = require('node:fs');

const calculatorImages = [
  ['calculators/asphalt-tonnage-calculator/index.html', 'asphalt-tonnage-calculation-formula.webp', 'Asphalt slab diagram showing length, width and thickness with the calculation from area and volume to asphalt tonnage', 'See the dimensions and mass-conversion steps that the tonnage calculator applies to your entered values.'],
  ['calculators/asphalt-cost-calculator/index.html', 'asphalt-driveway-cost-calculation.webp', 'Residential asphalt driveway with length, width and thickness measurements plus a pavement cutaway for cost estimation', 'A cost estimate starts with measurable pavement area, specified depth and the quoted price for the material.'],
  ['calculators/road-asphalt-calculator/index.html', 'road-paving-quantity-calculation.webp', 'Road pavement section showing length, width, thickness and the sequence from volume to asphalt quantity', 'Measure the road section first, then use a density that matches the material condition.'],
  ['calculators/asphalt-repair-calculator/index.html', 'pothole-repair-asphalt-calculation.webp', 'Pothole repair area showing length, width and depth measurements used to estimate asphalt repair quantity', 'Measure each repair separately where the damaged area has irregular edges or a changing depth.'],
  ['calculators/asphalt-millings-calculator/index.html', 'recycled-asphalt-pavement-rap-process.webp', 'Recycled asphalt pavement process showing reclaimed material from removal and milling through reuse as RAP', 'RAP is reclaimed asphalt pavement; use a measured bulk density that matches the loose or compacted condition.'],
  ['calculators/tack-coat-calculator/index.html', 'asphalt-tack-coat-rate-calculator.webp', 'Tack coat being sprayed between pavement layers to create a bond before the next asphalt lift', 'Confirm whether the entered rate is residual binder or delivered emulsion before converting area to volume.']
];

function illustration(src, alt, caption) {
  return `<!-- GENERATED IMAGE: ${src} -->\n<section class="section-sm generated-illustration"><div class="container"><figure><img src="/assets/illustrations/${src}" alt="${alt}" width="1200" height="675" loading="lazy" decoding="async" /><figcaption>${caption}</figcaption></figure></div></section>\n`;
}

for (const [file, src, alt, caption] of calculatorImages) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes(`GENERATED IMAGE: ${src}`)) {
    if (!html.includes('<!-- INFO CARDS -->')) throw new Error(`Insert marker not found in ${file}`);
    html = html.replace('<!-- INFO CARDS -->', illustration(src, alt, caption) + '<!-- INFO CARDS -->');
    fs.writeFileSync(file, html);
  }
}

const replacements = [
  ['blog/asphalt-density-guide/index.html', '/assets/blog/asphalt-density-lab-guide.webp', '/assets/illustrations/asphalt-density-comparison.webp', 'Three equal-volume asphalt samples illustrating that density changes the resulting material weight', 'Equal volumes can have different weights. Use the density specified for the actual mix and condition.'],
  ['blog/asphalt-thickness-guide/index.html', '/assets/blog/asphalt-thickness-guide.webp', '/assets/illustrations/asphalt-pavement-layer-cross-section.webp', 'Asphalt pavement cross-section showing surface course, binder course, aggregate base and compacted sub-base', 'A quantity takeoff should identify which layer and which compacted thickness are being measured.'],
  ['blog/bitumen-content-asphalt-guide/index.html', '/assets/blog/asphalt-mix-design-lab.webp', '/assets/illustrations/asphalt-mix-composition-bitumen-aggregate.webp', 'Asphalt mix composition showing bitumen binder coating crushed stone aggregate', 'The binder percentage must state whether it is measured against total mix mass or aggregate mass.']
];
for (const [file, oldSrc, src, alt, caption] of replacements) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.split(oldSrc).join(src);
  html = html.replace(/alt="[^"]+"\r?\n             width="1200" height="675"\r?\n             style="width:100%;height:auto;display:block;object-fit:cover;"\r?\n             loading="eager" decoding="async" fetchpriority="high" \/>\r?\n        <figcaption[^>]*>[^<]*<\/figcaption>/, `alt="${alt}"\n             width="1200" height="675"\n             style="width:100%;height:auto;display:block;object-fit:cover;"\n             loading="eager" decoding="async" fetchpriority="high" />\n        <figcaption style="background:#1a2332;color:rgba(255,255,255,.68);font-size:.8rem;padding:.5rem 1.25rem;">${caption}</figcaption>`);
  const oldAlts = {
    'Asphalt laboratory density testing equipment and compacted mix samples': 'Three equal-volume asphalt samples illustrating that density changes the resulting material weight',
    'Asphalt pavement core and measuring tools used to check compacted layer thickness': 'Asphalt pavement cross-section showing surface course, binder course, aggregate base and compacted sub-base',
    'Asphalt laboratory test equipment used to check optimum bitumen content in hot mix asphalt': 'Asphalt mix composition showing bitumen binder coating crushed stone aggregate'
  };
  html = html.split(Object.keys(oldAlts).find(key => html.includes(key)) || '').join(oldAlts[Object.keys(oldAlts).find(key => html.includes(key))] || '');
  fs.writeFileSync(file, html);
}
console.log(`Applied image markup to ${calculatorImages.length + replacements.length} pages.`);
