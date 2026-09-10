const fs = require('fs');
const html = fs.readFileSync('blog/index.html', 'utf8');

const urls = [
  '/blog/how-to-calculate-bitumen-quantity-for-road/',
  '/blog/bitumen-content-asphalt-guide/',
  '/blog/asphalt-density-guide/',
  '/blog/asphalt-millings-calculator-guide/',
  '/blog/asphalt-thickness-guide/',
  '/blog/prime-coat-vs-tack-coat/',
  '/blog/tack-coat-calculator-guide/',
  '/blog/bitumen-spray-rate-chip-seal/',
  '/blog/how-much-asphalt-do-i-need/',
  '/blog/asphalt-tonnage-calculator-guide/',
  '/blog/asphalt-driveway-cost-calculator/',
  '/blog/tons-of-asphalt-per-cubic-yard/',
  '/blog/modified-bitumen-roofing-calculator/',
  '/blog/bitumen-density-volume-cargo-calculations/'
];

let pass = 0, missing = [];
urls.forEach(u => {
  if (html.includes('href="' + u + '"')) pass++;
  else missing.push(u);
});

console.log('Article URLs found: ' + pass + '/' + urls.length);
if (missing.length) console.log('Missing URLs:', missing);

// Check SEO recovery
console.log('SEO guide-directory present:', html.includes('id="guide-directory"'));

// Check Schema
const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (schemaMatch) {
  try {
    const data = JSON.parse(schemaMatch[1].trim());
    console.log('Schema valid:', data['@type']);
  } catch(e) {
    console.log('Schema parse error:', e.message);
  }
}
