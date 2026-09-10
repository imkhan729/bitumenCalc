'use strict';
const fs = require('node:fs');
const {chromium} = require('playwright');
const origin = process.env.IMAGE_TEST_ORIGIN || 'http://127.0.0.1:4173';
const routes = ['/', '/calculators/asphalt-tonnage-calculator/', '/calculators/asphalt-cost-calculator/', '/calculators/road-asphalt-calculator/', '/calculators/asphalt-repair-calculator/', '/calculators/asphalt-millings-calculator/', '/calculators/tack-coat-calculator/', '/blog/asphalt-density-guide/', '/blog/asphalt-thickness-guide/', '/blog/bitumen-content-asphalt-guide/'];
(async () => {
  const browser = await chromium.launch({channel: 'msedge', headless: true});
  const page = await browser.newPage({viewport: {width: 390, height: 844}});
  await page.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
  const results = [];
  for (const route of routes) {
    let response = await page.goto(origin + route, {waitUntil: 'networkidle'});
    // Hostinger occasionally presents a transient browser-check response to a fresh headless session.
    if (response.status() === 403 || await page.locator('img[src*="/assets/illustrations/"]').count() === 0) {
      response = await page.goto(origin + route, {waitUntil: 'networkidle'});
    }
    const image = page.locator('img[src*="/assets/illustrations/"]');
    await image.scrollIntoViewIfNeeded();
    await image.waitFor({state: 'visible'});
    results.push({route, status: response.status(), loaded: await image.evaluate(node => node.complete && node.naturalWidth > 0), alt: await image.getAttribute('alt'), width: await image.getAttribute('width'), height: await image.getAttribute('height'), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)});
  }
  await browser.close();
  fs.writeFileSync('SEO-GENERATED-IMAGE-QA.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  if (results.some(row => row.status !== 200 || !row.loaded || row.overflow || !row.alt || row.width !== '1200' || row.height !== '675')) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
