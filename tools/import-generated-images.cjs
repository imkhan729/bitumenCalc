'use strict';

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const temp = 'C:/Users/Roy/AppData/Local/Temp/browser-use/assets';
const images = [
  ['86fc47a6-f0c5-4cfe-a05c-7fde2361378e/fb609895e6d0a4d3', 'asphalt-tonnage-calculation-formula.webp'],
  ['e1b88181-0829-416e-89f7-f7de34c180ff/6206c6888ae0ab2c', 'asphalt-driveway-cost-calculation.webp'],
  ['3615a401-dc35-4e52-9b2c-32066cb7d76a/a718f03097ef3675', 'pothole-repair-asphalt-calculation.webp'],
  ['6fa3a93f-98b3-4072-b5d1-2adb686450ec/4d91d583db4f34c4', 'recycled-asphalt-pavement-rap-process.webp'],
  ['6fa3a93f-98b3-4072-b5d1-2adb686450ec/5f22f8d13a52479c', 'asphalt-tack-coat-rate-calculator.webp'],
  ['cb40f90f-624d-43d8-8bd8-e5a1890f5768/e8f53bbc4e5328f3', 'bitumen-vs-asphalt-difference.webp'],
  ['cb40f90f-624d-43d8-8bd8-e5a1890f5768/ffc3f4c829e0582e', 'asphalt-mix-composition-bitumen-aggregate.webp'],
  ['86fc47a6-f0c5-4cfe-a05c-7fde2361378e/29b311ed762e8371', 'asphalt-pavement-layer-cross-section.webp'],
  ['7897194e-e4c2-46b0-981f-66cbf863d3f5/a256bc993cd93c5e', 'asphalt-density-comparison.webp'],
  ['3615a401-dc35-4e52-9b2c-32066cb7d76a/3671a10f12bb49ab', 'road-paving-quantity-calculation.webp']
];

(async () => {
  const out = path.join(root, 'assets', 'illustrations');
  fs.mkdirSync(out, {recursive: true});
  const report = [];
  for (const [source, name] of images) {
    const input = path.join(temp, source);
    if (!fs.existsSync(input)) throw new Error(`Missing retrieved image: ${input}`);
    const target = path.join(out, name);
    await sharp(input).resize({width: 1200, withoutEnlargement: true}).webp({quality: 82, effort: 6}).toFile(target);
    const metadata = await sharp(target).metadata();
    report.push({name, width: metadata.width, height: metadata.height, bytes: fs.statSync(target).size});
  }
  fs.writeFileSync(path.join(root, 'GENERATED-IMAGE-IMPORT.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
