const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/Roy/Downloads/Bitumen calculator';

// Content blocks per page slug
const content = {

'calculators/asphalt-tonnage-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Asphalt Tonnage Calculation Formula</h2>
      <p>Understanding the formula helps you verify estimates and spot errors before ordering.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Step 1 — Calculate Volume</div>
        <div class="formula-expr">Volume (m³) = Length × Width × Thickness</div>
        <p>All dimensions must be in metres. Convert mm thickness by dividing by 1,000 (e.g. 50 mm = 0.05 m).</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Step 2 — Calculate Weight</div>
        <div class="formula-expr">Weight (t) = Volume (m³) × Density (kg/m³) ÷ 1,000</div>
        <p>Standard Dense HMA density is 2,300–2,400 kg/m³. Use your mix design sheet for accuracy.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Worked Example</div>
        <div class="formula-expr">50 m × 6 m × 0.05 m × 2,350 kg/m³ ÷ 1,000 = <strong>35.25 t</strong></div>
        <p>A 50 m long, 6 m wide road lane paved 50 mm deep at 2,350 kg/m³ requires 35.25 metric tonnes. Add 8% waste → order <strong>38 t</strong>.</p>
      </div>
    </div>
    <div class="info-box" style="margin-top:1.5rem;">
      <span class="info-icon">💡</span>
      <div><strong style="color:var(--text);display:block;margin-bottom:.25rem;">Always Add a Waste Factor</strong>
      <p style="margin:0;font-size:.9rem;">Order 5–10% extra for rectangular areas and 10–15% for irregular shapes, hand-work around edges, and material left in trucks. Running short mid-pour is costly — a small surplus is always safer. Use our <a href="/calculators/asphalt-cost-calculator">asphalt cost calculator</a> to price the complete order including waste allowance.</p></div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>Common Use Cases</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🏠</div>
        <h3>Driveways</h3>
        <p>A standard residential driveway (10 m × 3 m, 50 mm thick) requires approximately 3.5 tonnes of dense HMA. Add 10% for hand compaction near edges — order 4 tonnes. For large driveways, split into a 100 mm base layer and 40 mm wearing course using our <a href="/calculators/asphalt-material-calculator">material calculator</a>.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🅿️</div>
        <h3>Car Parks</h3>
        <p>Commercial car parks typically need 60–75 mm of compacted asphalt. A 50-space car park (1,500 m²) at 70 mm depth with 2,350 kg/m³ requires approximately 247 tonnes. Most suppliers set a minimum delivery of 20–25 tonnes, so smaller projects may need to combine orders.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🛣️</div>
        <h3>Roads &amp; Highways</h3>
        <p>Multi-layer road construction uses this calculator for each lift separately: typically a 150–200 mm granular base, 75–100 mm binder course, and 40–50 mm wearing course. Run our <a href="/calculators/road-asphalt-calculator">road asphalt calculator</a> for lane-kilometre based estimates common in highway projects.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'How many tonnes of asphalt per square metre?', a: 'For a 50 mm (2-inch) thick layer at 2,350 kg/m³: 0.05 m × 2,350 = 117.5 kg/m² = 0.1175 t/m². A 100 m² area at 50 mm depth needs approximately 11.75 tonnes. For a 25 mm overlay, halve that to about 5.9 tonnes. Our <a href="/calculators/bitumen-square-meters-calculator">square metres calculator</a> can compute this directly if you prefer to enter area rather than length and width.' },
    { q: 'How do I calculate asphalt tonnage for a driveway?', a: 'Measure the driveway length and width in metres, then decide on compacted thickness (typically 40–75 mm for residential). Multiply: Length × Width × (Thickness ÷ 1000) × Density ÷ 1000. For example, a 15 m × 4 m driveway at 50 mm depth and 2,350 kg/m³ = 15 × 4 × 0.05 × 2350 ÷ 1000 = 7.05 tonnes. Order 7.8 tonnes (adding 10% for waste).' },
    { q: 'What is the difference between tonnes and short tons for asphalt?', a: 'A metric tonne = 1,000 kg (2,204.6 lb). A US short ton = 2,000 lb (907 kg). Asphalt suppliers in the US typically quote short tons; most other countries use metric tonnes. The difference is about 10%: 1 metric tonne ≈ 1.102 short tons. Confirm with your supplier which unit they use to avoid ordering errors.' },
  ]
},

'calculators/asphalt-cost-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Asphalt Cost Calculation Formula</h2>
      <p>The total project cost is calculated in two stages: weight estimation then pricing.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Weight Calculation</div>
        <div class="formula-expr">Weight (t) = L × W × T (m) × Density (kg/m³) ÷ 1,000</div>
        <p>First determine how many tonnes your project needs. Density ranges from 1,900 kg/m³ (porous) to 2,400 kg/m³ (dense HMA).</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Cost Calculation</div>
        <div class="formula-expr">Total Cost = Weight (t) × Price per Tonne</div>
        <p>Multiply total mix weight by your supplier's price per tonne. Include a 5–10% waste allowance in your weight before pricing.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Worked Example</div>
        <div class="formula-expr">200 m × 7 m × 0.05 m × 2,350 ÷ 1,000 = 164.5 t × $180 = <strong>$29,610</strong></div>
        <p>A 200 m road section, 7 m wide, 50 mm thick at $180/t. Add 8% waste → 177.7 t → <strong>$31,986</strong> total project cost estimate.</p>
      </div>
    </div>
    <div class="info-box" style="margin-top:1.5rem;">
      <span class="info-icon">💡</span>
      <div><strong style="color:var(--text);display:block;margin-bottom:.25rem;">Cost Estimation Best Practices</strong>
      <p style="margin:0;font-size:.9rem;">This calculator estimates <em>material cost only</em>. A full project budget should also include: plant hire and paving machinery, labour, sub-base preparation, tack coat (<a href="/calculators/tack-coat-calculator">use the tack coat calculator</a>), line marking, and contractor margins. Always get 3 quotes from local suppliers as prices vary significantly by region and project size.</p></div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>Budgeting for Different Project Types</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🏠</div>
        <h3>Residential Driveways</h3>
        <p>A typical residential driveway (50 m², 50 mm HMA) uses approximately 6 tonnes of asphalt. At $150–200/t, material cost runs $900–$1,200. Total installed cost (including labour and plant) typically ranges from $2,000–$4,000. Use the <a href="/calculators/asphalt-tonnage-calculator">tonnage calculator</a> to confirm your weight estimate first.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏗️</div>
        <h3>Commercial Projects</h3>
        <p>Large-scale commercial paving (car parks, industrial yards) benefits from bulk pricing — often 10–20% lower per tonne than small residential orders. A 5,000 m² car park at 70 mm depth requires approximately 823 tonnes. Budget for at least 3 pavement layers and separate cost estimates per layer using this tool.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🌍</div>
        <h3>International Projects</h3>
        <p>This calculator supports 7 currencies (USD, AUD, CAD, NZD, GBP, EUR, INR) for regional cost estimation. For Australian projects, see the <a href="/calculators/australia-bitumen-calculator">Australian bitumen calculator</a> with AUD defaults. For Canadian projects, use the <a href="/calculators/canada-bitumen-calculator">Canada bitumen calculator</a> with CAD pricing.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'What is the average cost of asphalt per tonne?', a: 'Asphalt prices vary significantly by region and mix type. In the US, hot mix asphalt typically costs $80–$160 per short ton for supply only. In Australia, prices range from AUD $120–$280/t; in the UK, £80–£140/t; in Canada, CAD $100–$180/t. Polymer-modified and specialty mixes command a 15–30% premium over standard dense HMA. Always get current quotes from local suppliers as prices fluctuate with bitumen crude oil prices.' },
    { q: 'Does this calculator include labour and installation costs?', a: 'No — this calculator estimates material cost only (asphalt supply price per tonne × total weight). A complete project budget must add: paving machine hire, labour costs, sub-base preparation, tack coat application, compaction equipment, and contractor overhead/profit. These vary enormously by location and project size. Use this tool as a starting point for material cost, then get contractor quotes for the full installed price.' },
    { q: 'How accurate are asphalt cost estimates?', a: 'Material cost estimates are highly accurate if you use the correct density and current supplier pricing. The formula itself has no approximation error — it is exact mathematics. Practical variables include: actual compacted density vs assumed density (±3–5%), waste factor (5–15%), and price fluctuations. For a reliable budget, use the calculated material cost as a baseline and add a 10–15% contingency for density and waste variation.' },
  ]
},

'calculators/asphalt-material-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Mix Component Calculation Formula</h2>
      <p>Breaking total asphalt weight into bitumen binder and aggregate components.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Total Mix Weight</div>
        <div class="formula-expr">Mix Weight (t) = Volume (m³) × Density (kg/m³) ÷ 1,000</div>
        <p>Calculate total weight of compacted asphalt mix first. The density depends on your mix type — dense HMA, SMA, OGFC, or porous.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Bitumen Content</div>
        <div class="formula-expr">Bitumen (t) = Mix Weight × (Bitumen % ÷ 100)</div>
        <p>Bitumen content is expressed as a percentage by mass of total mix. Dense HMA: 5.0–6.5%. SMA: 6.0–7.5%. OGFC: 5.0–6.0%.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Aggregate Content</div>
        <div class="formula-expr">Aggregate (t) = Mix Weight − Bitumen Weight</div>
        <p>Aggregate makes up 93–95% of total mix weight. Knowing this figure helps when coordinating separate aggregate and bitumen supply contracts.</p>
      </div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>When to Use the Material Calculator</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">📋</div>
        <h3>Bill of Quantities</h3>
        <p>Quantity surveyors use this calculator to prepare accurate Bills of Quantities (BoQ) for tender documents. The bitumen and aggregate breakdown lets you price components separately and cross-check contractor quotes. Combine with the <a href="/calculators/asphalt-cost-calculator">cost calculator</a> to produce a detailed material cost schedule.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏭</div>
        <h3>Plant Batch Scheduling</h3>
        <p>Asphalt plant operators use mix component data to schedule batch production and pre-order aggregate and bitumen supplies. Knowing exact bitumen tonnes needed helps logistics teams schedule tanker deliveries — bitumen is typically delivered in 20–25 tonne loads by road tanker.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🌿</div>
        <h3>Recycled Mixes (RAP)</h3>
        <p>For Reclaimed Asphalt Pavement (RAP) mixes, the bitumen content determines how much additional virgin bitumen is needed alongside the recycled material. RAP mixes typically contain 4.0–5.0% total bitumen with 20–40% RAP substitution. Use the <a href="/calculators/asphalt-millings-calculator">millings calculator</a> alongside this tool for RAP planning.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'What is bitumen content in asphalt mix design?', a: 'Bitumen content (also called binder content) is the percentage of bitumen by mass of the total asphalt mix. For dense HMA it typically ranges 5.0–6.5%; for SMA 6.0–7.5%; for OGFC 5.0–6.0%; for WMA (Warm Mix) 5.0–6.5%. The optimum bitumen content is determined by mix design testing (Marshall or Superpave method) to achieve target air void content, Marshall stability, and durability.' },
    { q: 'How do I calculate how much bitumen I need separately from aggregate?', a: 'Use this calculator to get total mix weight, then multiply by your bitumen content percentage. For example: 100 tonnes of mix at 5.5% bitumen content = 5.5 tonnes of bitumen and 94.5 tonnes of aggregate. Bitumen is ordered by the tonne (liquid) or as drum/bag quantities for small projects. Note that liquid bitumen weighs approximately 1.02–1.05 t/m³ depending on grade and temperature.' },
    { q: 'Which mix type should I select for my project?', a: 'For standard road and driveway wearing courses: Dense-Graded HMA. For high-traffic arterial roads requiring high rut resistance: SMA (Stone Mastic Asphalt). For noise reduction and drainage: OGFC (Open-Graded Friction Course). For warm-climate energy reduction: WMA (Warm Mix Asphalt). For sustainability projects incorporating recycled material: RAP. When in doubt, consult your local road authority specification or pavement design engineer.' },
  ]
},

'calculators/bitumen-square-feet-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Square Feet to Asphalt Weight Formula</h2>
      <p>Converting imperial area and thickness measurements to asphalt weight in tons or tonnes.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Imperial to Metric Conversion</div>
        <div class="formula-expr">Area: 1 ft² = 0.0929 m² &nbsp;|&nbsp; Thickness: 1 in = 25.4 mm</div>
        <p>The calculator converts imperial inputs to metric internally, computes weight, then presents results in both systems.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Weight Formula</div>
        <div class="formula-expr">Tons = Area (ft²) × Thickness (in) × 0.0254 × 0.0929 × Density (kg/m³) ÷ 1,000</div>
        <p>This gives metric tonnes. To convert to US short tons, multiply by 1.102. The calculator shows both automatically.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Quick Reference Rule</div>
        <div class="formula-expr">~1 ton per 100 ft² at 2-inch depth (standard HMA)</div>
        <p>A useful rule of thumb: one short ton covers approximately 100 square feet at 2 inches of compacted depth at standard HMA density (145 lb/ft³).</p>
      </div>
    </div>
    <div class="info-box" style="margin-top:1.5rem;">
      <span class="info-icon">💡</span>
      <div><strong style="color:var(--text);display:block;margin-bottom:.25rem;">Prefer Working in Metric?</strong>
      <p style="margin:0;font-size:.9rem;">If your measurements are in metres and millimetres, use the <a href="/calculators/bitumen-square-meters-calculator">square metres calculator</a> or the <a href="/calculators/asphalt-tonnage-calculator">full tonnage calculator</a> instead. Need to convert square feet to tons as a quick lookup? See the <a href="/calculators/square-feet-to-tons-calculator">square feet to tons calculator</a>.</p></div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>Common Square Feet Asphalt Projects</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🚗</div>
        <h3>Residential Driveways</h3>
        <p>A typical US residential driveway is 600–1,200 sq ft. At 2.5-inch compacted depth and 145 lb/ft³ density, a 900 sq ft driveway needs approximately 4.1 short tons of hot mix asphalt. Always add 10% waste for irregular shapes and hand work near garage aprons and property edges.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏫</div>
        <h3>School &amp; Municipal Lots</h3>
        <p>Municipal car parks and school lots are often specified in square feet in US project documents. A 50-space lot covering 20,000 sq ft at 3-inch asphalt depth requires approximately 27.5 short tons. Use the <a href="/calculators/asphalt-cost-calculator">cost calculator</a> to estimate material cost with current $/ton pricing.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🔧</div>
        <h3>Pothole &amp; Patch Repairs</h3>
        <p>Small repairs are often measured in square feet. A 20 sq ft pothole repair at 4-inch depth needs approximately 0.38 short tons of cold patch or HMA. For projects involving multiple small patches, add the areas first then calculate total tonnage. See the <a href="/calculators/asphalt-repair-calculator">repair calculator</a> for patch-specific estimates.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'How many square feet does a ton of asphalt cover?', a: 'At 2-inch compacted depth and standard HMA density (145 lb/ft³): 1 short ton covers approximately 100 sq ft. At 1-inch depth, 1 ton covers about 200 sq ft. At 3 inches, approximately 65 sq ft. This rule of thumb is useful for quick estimates — for precise calculations, use this square feet calculator with your specific mix density.' },
    { q: 'How much does it cost to pave 1,000 square feet of asphalt?', a: 'Material cost: 1,000 sq ft at 2-inch depth requires approximately 10 short tons of HMA. At $100–160/ton supply price, material alone costs $1,000–$1,600. Total installed cost (including base prep, labour, and equipment) typically runs $2,500–$5,000 for 1,000 sq ft depending on site conditions and location. Use our <a href="/calculators/asphalt-cost-calculator">cost calculator</a> to estimate materials with your local pricing.' },
    { q: 'What thickness should I use for a residential driveway?', a: 'For a standard residential driveway over a compacted gravel base: 2–3 inches (50–75 mm) of compacted hot mix asphalt is typical. If you are paving over an existing concrete or asphalt surface (overlay), 1.5–2 inches is usually sufficient. Heavy vehicle access (trucks, RVs) may require 3–4 inches. Always install on a stable, compacted sub-base — asphalt thickness alone cannot compensate for a weak foundation.' },
  ]
},

'calculators/australia-bitumen-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Australian Bitumen Calculation Method</h2>
      <p>Based on Austroads AP-T295/14 and AS 2150 (Hot Mix Asphalt) mix design standards.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Volume (Austroads Method)</div>
        <div class="formula-expr">Volume (m³) = Length (m) × Width (m) × Compacted Thickness (m)</div>
        <p>Use compacted (in-place) thickness, not loose (uncompacted) thickness. Compaction factor for dense-graded HMA is typically 1.20–1.25 (loose thickness = compacted × 1.2).</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Metric Tonne Weight</div>
        <div class="formula-expr">Mass (t) = Volume (m³) × Bulk Density (kg/m³) ÷ 1,000</div>
        <p>DG14 Dense-Graded: 2,300–2,400 kg/m³. SMA: 2,250–2,350 kg/m³. OGFC: 1,950–2,100 kg/m³. Use laboratory bulk density from mix design testing.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Worked Example (Austroads)</div>
        <div class="formula-expr">100 m × 3.5 m × 0.045 m × 2,350 kg/m³ ÷ 1,000 = <strong>36.9 t</strong></div>
        <p>One lane (100 m × 3.5 m) of DG14 wearing course at 45 mm. Per Austroads guidelines, order 36.9 t + 5% site waste = <strong>38.7 t</strong>.</p>
      </div>
    </div>
    <div class="info-box" style="margin-top:1.5rem;">
      <span class="info-icon">🇦🇺</span>
      <div><strong style="color:var(--text);display:block;margin-bottom:.25rem;">State Road Authority Variations</strong>
      <p style="margin:0;font-size:.9rem;">Each Australian state has supplementary specifications: VicRoads (Victoria), TMR (Queensland), RMS/TfNSW (New South Wales), DPTI (South Australia), and Main Roads WA. Default bitumen contents may differ slightly — always check the project specification. Compare with international standards using the <a href="/calculators/canada-bitumen-calculator">Canada</a> or <a href="/calculators/new-zealand-bitumen-calculator">New Zealand</a> calculators.</p></div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>Australian Pavement Project Types</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🛣️</div>
        <h3>State Highway Maintenance</h3>
        <p>State road authorities typically specify DG14 Dense-Graded Asphalt for wearing course overlays on arterial roads. A 1 km, 7.3 m wide carriageway at 45 mm DG14 (density 2,350 kg/m³) requires approximately 768 tonnes. Use this calculator for each lane separately and multiply by the number of lanes for total project quantities.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏘️</div>
        <h3>Residential Subdivisions</h3>
        <p>Local council roads in Australian residential subdivisions commonly use DG10 (thin wearing course, 25–35 mm) over DG14 intermediate and sub-base courses. Calculate each layer separately. Typical council specification: 30 mm DG10 wearing + 50 mm DG14 binder. For AUD cost estimates, current supply prices range AUD $130–$200/t ex-plant depending on state and distance.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏋️</div>
        <h3>High-Traffic & Heavy Vehicle</h3>
        <p>Ports, intermodal logistics centres, and heavy vehicle access roads require SMA (Stone Mastic Asphalt) for superior rutting resistance. SMA at 40–50 mm uses 6.0–7.0% bitumen and 2,250–2,350 kg/m³ density. Polymer-modified binders (PMB) are standard for heavy freight routes. See the <a href="/calculators/road-asphalt-calculator">road asphalt calculator</a> for project-scale estimates.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'What is DG14 asphalt and when is it used in Australia?', a: 'DG14 (Dense-Graded 14 mm nominal maximum aggregate size) is the most commonly specified asphalt mix in Australia for wearing course applications. It is used on arterial roads, local council streets, car parks, and driveways. Per Austroads AP-T295/14, DG14 has a typical bitumen content of 5.0–6.0% and a compacted density of 2,300–2,400 kg/m³. It provides excellent durability and skid resistance for most traffic conditions.' },
    { q: 'How does the Australian bitumen calculator differ from a standard calculator?', a: 'This calculator uses Australian-specific mix type presets (DG14, DG10, SMA, OGFC, WMA, and RAP) with default bitumen contents and densities aligned to Austroads and state road authority specifications. It defaults to AUD currency and metric (SI) units. The mix presets are calibrated to AS 2150 and Austroads AP-T295/14 rather than US Superpave or UK TRL standards used by other regional calculators.' },
    { q: 'What is the typical cost of asphalt paving in Australia?', a: 'Asphalt supply prices in Australia typically range from AUD $120–$200/t for standard DG14, with SMA and PMB mixes commanding a 15–25% premium. Total installed costs (including plant, labour, and traffic management) typically range from AUD $60–$120/m² depending on state, layer thickness, and project size. Use this calculator to estimate supply tonnage and multiply by current quoted prices from local asphalt plants. Compare with New Zealand pricing via the <a href="/calculators/new-zealand-bitumen-calculator">NZ bitumen calculator</a>.' },
  ]
},

'calculators/asphalt-repair-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Asphalt Repair Material Calculation</h2>
      <p>Estimating material for patching, mill-and-fill, and overlay repairs.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Patch Area Volume</div>
        <div class="formula-expr">Volume (m³) = Patch Length × Patch Width × Repair Depth</div>
        <p>Measure the full saw-cut area (always square or rectangular cuts — never patch feathered edges). Repair depth should be to a sound pavement layer, typically 50–100 mm.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Multiple Patches</div>
        <div class="formula-expr">Total Volume = Sum of all individual patch volumes</div>
        <p>Add up all patch volumes before calculating weight. For uniform-depth repairs, sum the areas first: Total Area × Depth × Density.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Worked Example</div>
        <div class="formula-expr">3 patches: (0.6×0.6) + (1.2×0.8) + (0.5×0.4) × 0.08 m × 2,300 = <strong>0.39 t</strong></div>
        <p>Three typical pothole patches at 80 mm depth. A 25 kg bag of cold mix covers approximately 0.1 m² at 50 mm depth — so order 4 bags or arrange a hot mix delivery.</p>
      </div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>Types of Asphalt Repair</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🕳️</div>
        <h3>Pothole Repairs</h3>
        <p>Potholes should be saw-cut to clean vertical edges before patching. Typical repair dimensions: 0.5–1.5 m², depth 50–100 mm. Apply tack coat to all cut surfaces before placing hot mix. Use our <a href="/calculators/tack-coat-calculator">tack coat calculator</a> to estimate primer quantities. For cold patch repairs, calculate the same way — 1 tonne of cold mix typically covers 5–8 m² at 50 mm depth.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🔄</div>
        <h3>Mill and Fill</h3>
        <p>Mill-and-fill repairs remove the damaged wearing course to a set milling depth (typically 40–75 mm) then lay fresh HMA. The volume removed by milling equals the volume of new material needed. Use the <a href="/calculators/asphalt-removal-calculator">removal calculator</a> to estimate milled material weight for disposal, then this repair calculator to estimate replacement tonnage.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏫</div>
        <h3>Preventive Maintenance</h3>
        <p>Thin overlays (20–40 mm) over deteriorating surfaces are the most cost-effective pavement preservation strategy. A 25 mm overlay over 1,000 m² requires approximately 61 tonnes of dense HMA. Compare the overlay cost using the <a href="/calculators/asphalt-cost-calculator">cost calculator</a> vs. full reconstruction — overlays typically cost 30–50% of full depth replacement.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'How much asphalt do I need to repair a pothole?', a: 'A typical pothole 0.5 m × 0.5 m × 80 mm deep requires approximately 0.047 m³ of asphalt = 0.11 tonnes (110 kg) at 2,300 kg/m³. That is roughly 4–5 bags of cold patch mix (25 kg each). For hot mix asphalt, minimum delivery charges usually cover 1–2 tonnes, making small repairs uneconomical alone — combine multiple repairs into a single order.' },
    { q: 'Should I use hot mix or cold patch for pothole repair?', a: 'Hot mix asphalt (HMA) is the gold standard for permanent repairs — it bonds properly, compacts uniformly, and lasts 10–20 years. Cold patch is a temporary fix suitable for filling potholes to maintain trafficability until permanent repairs can be scheduled. Cold patch softens in heat and is prone to displacement under heavy traffic. For any repair expected to last, always use hot mix asphalt placed and compacted per specification.' },
    { q: 'What is the recommended repair depth for asphalt patching?', a: 'Repair depth should extend to a sound, stable layer. For surface-only deterioration: 50–75 mm. Where the binder course is also damaged: 75–125 mm. Full-depth repairs extending into the base: 125–200 mm. Shallow repairs (less than 40 mm) often fail quickly because there is insufficient material to compact properly and the bond to surrounding pavement is weak.' },
  ]
},

'calculators/tack-coat-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Tack Coat Calculation Formula</h2>
      <p>Accurate tack coat quantities ensure proper inter-layer bonding in multi-lift asphalt construction.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Emulsion Volume</div>
        <div class="formula-expr">Volume (L) = Area (m²) × Application Rate (L/m²)</div>
        <p>Standard application rates: 0.15–0.30 L/m² of residual bitumen. Emulsion is typically 60–65% residual bitumen, so apply 0.25–0.50 L/m² of emulsion to achieve target residual rate.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Residual Bitumen</div>
        <div class="formula-expr">Residual (L) = Emulsion Volume × (Residual % ÷ 100)</div>
        <p>For SS-1, CSS-1 emulsions (60% residual): to apply 0.20 L/m² residual, spray 0.33 L/m² of emulsion. SS-1h and CRS-2 have different residual contents — check product data sheet.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Worked Example</div>
        <div class="formula-expr">2,500 m² × 0.30 L/m² = <strong>750 L</strong> emulsion required</div>
        <p>A 2,500 m² car park overlay requires 750 litres of CSS-1 tack coat emulsion at 0.30 L/m². Standard tanker delivery is 4,000–10,000 litres — combine with other jobs to avoid minimum charge.</p>
      </div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>When Tack Coat is Required</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🛣️</div>
        <h3>Multi-Lift Road Paving</h3>
        <p>Tack coat is mandatory between every asphalt lift in road construction to ensure inter-layer shear bonding. Without it, layers can slide relative to each other under traffic loading, causing shear failure. Apply after the lower lift has cooled to below 50°C and just before placing the upper layer — never leave tack coat exposed overnight if avoidable.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🔄</div>
        <h3>Overlays on Existing Surfaces</h3>
        <p>Before placing any asphalt overlay, the existing surface must be clean, dry, and tack-coated. Increase the application rate on aged, oxidised surfaces (0.35–0.50 L/m²) and reduce it on fresh, clean asphalt (0.15–0.25 L/m²). Use our <a href="/calculators/asphalt-repair-calculator">repair calculator</a> to estimate overlay tonnage and this calculator for tack coat quantities simultaneously.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏗️</div>
        <h3>Bridge Decks &amp; Structures</h3>
        <p>Bridge deck waterproofing systems often use modified bitumen tack coats applied at higher rates (0.5–1.0 kg/m² of polymer-modified emulsion or mastic asphalt). This provides both bonding and waterproofing. Calculate waterproofing membrane quantities separately from standard road tack coat — application rates and materials differ significantly.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'What is the correct tack coat application rate?', a: 'AASHTO and most road authorities specify residual tack coat rates of 0.10–0.25 L/m² (bitumen only, not emulsion). For emulsified tack coats (60–65% residual content), apply 0.15–0.40 L/m² of emulsion. Higher rates apply to rough, milled, or dry surfaces; lower rates to smooth, clean, recently placed asphalt. Over-application causes tack coat to squeeze up through the overlay under compaction, creating a slip plane rather than a bond.' },
    { q: 'What types of tack coat emulsion are used in paving?', a: 'The most common types are: SS-1 and SS-1h (slow-setting, cationic) — general purpose, safe for most surfaces; CSS-1 and CSS-1h — cationic slow-set, better adhesion to aggregate; CRS-2 — cationic rapid-set, used for higher-temperature spray applications; and polymer-modified (PMBE) — for bridge decks and high-stress applications. Rapid-set emulsions are preferred where traffic must return quickly. Always check compatibility with the existing surface before specifying.' },
    { q: 'Can I skip tack coat on a thin asphalt overlay?', a: 'No. Skipping tack coat is one of the most common causes of premature overlay failure, regardless of thickness. Even a 25 mm thin overlay can delaminate and rut if placed without proper bond coat. The only exception is when placing asphalt directly onto fresh, hot, uncompacted asphalt from the preceding paver pass in an echelon paving configuration. In all other cases, always apply tack coat per specification.' },
  ]
},

'calculators/asphalt-millings-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Asphalt Millings (RAP) Calculation</h2>
      <p>Reclaimed Asphalt Pavement (RAP) millings are calculated the same way as fresh asphalt but with adjusted density values.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Loose Millings Volume</div>
        <div class="formula-expr">Loose Volume = Milled Area × Milling Depth × Swell Factor (1.25)</div>
        <p>Milled asphalt swells approximately 20–30% vs compacted density. Use a swell factor of 1.25 for truck loading and stockpile volume calculations.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Millings Weight</div>
        <div class="formula-expr">Weight (t) = Area × Depth × In-Place Density (kg/m³) ÷ 1,000</div>
        <p>In-place (compacted) RAP density is typically 2,100–2,300 kg/m³ for standard HMA millings. Use 2,200 kg/m³ as a default for dense-graded mixes.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Coverage as Base Material</div>
        <div class="formula-expr">Area covered = Millings Weight (t) × 1,000 ÷ (Depth (m) × Loose Density 1,800 kg/m³)</div>
        <p>Loose millings used as gravel driveway base material have a density of approximately 1,600–1,800 kg/m³. A tonne covers roughly 1 m² at 100 mm loose depth.</p>
      </div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>Uses for Asphalt Millings</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">♻️</div>
        <h3>Hot Mix RAP Recycling</h3>
        <p>Modern asphalt plants can incorporate 20–40% RAP millings into new hot mix without significant quality loss. Using RAP reduces virgin aggregate demand, lowers bitumen requirements, and cuts CO₂ emissions. Use this calculator to determine how many tonnes of millings will be generated from milling operations, then coordinate with the plant for RAP acceptance rates.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏠</div>
        <h3>Unpaved Driveways &amp; Paths</h3>
        <p>Loose asphalt millings make an excellent driveway surface: they compact well under traffic, resist erosion, and are low cost (often free or $10–30/t as plant waste). Calculate coverage depth using the loose density formula above. Compact with a vibrating plate to 75–100 mm depth for best results. Not recommended where drainage must be maintained — use permeable gravel instead.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🛤️</div>
        <h3>Sub-base &amp; Access Roads</h3>
        <p>Millings are widely used as temporary haul road surfaces and permanent sub-base material. A 150 mm deep millings sub-base for a 500 m² haul road requires approximately 165 tonnes of loose millings. Use the <a href="/calculators/asphalt-removal-calculator">removal calculator</a> to estimate the tonnage generated from milling existing roads before deciding how much to stockpile for reuse.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'Are asphalt millings the same as recycled asphalt pavement (RAP)?', a: 'Yes — asphalt millings and RAP (Reclaimed Asphalt Pavement) refer to the same material: the granular product from cold-milling or breaking up existing asphalt pavement. The term "millings" is used more often for loose, unprocessed material used directly as a surface. "RAP" is the industry term used in mix design when the material is processed and incorporated into new asphalt at a plant.' },
    { q: 'How many tons of asphalt millings do I need for a driveway?', a: 'For a compacted 4-inch (100 mm) deep millings driveway, you need approximately 1 tonne per 10 sq ft (0.93 m²) of area. A 1,000 sq ft driveway at 4-inch depth requires about 12–15 tons of millings (accounting for compaction and loose-to-compact ratio). Millings compact to approximately 85–90% of their loose volume. Always order 10–15% extra for settling.' },
    { q: 'What is the compaction ratio for asphalt millings?', a: 'Asphalt millings have a compaction ratio of approximately 1.15–1.25 (loose to compact). This means 1.2 tonnes of loose millings compact to approximately 1 tonne of material in place. For volume calculations: 1 cubic yard of loose millings compacts to about 0.8 cubic yards, or 1 m³ loose becomes approximately 0.80–0.85 m³ compacted. Always purchase loose volume and calculate on in-place volume for coverage planning.' },
  ]
},

'calculators/california-asphalt-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Caltrans Asphalt Calculation Method</h2>
      <p>California DOT (Caltrans) uses Superpave mix design and specifies mix properties in accordance with AASHTO and ASTM standards.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Caltrans Volume Formula</div>
        <div class="formula-expr">Volume (ft³) = Length (ft) × Width (ft) × Thickness (in) ÷ 12</div>
        <p>Caltrans typically specifies in imperial units. The calculator accepts both imperial and metric inputs and converts internally.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Metric Weight</div>
        <div class="formula-expr">Tons = Volume (ft³) × Density (lb/ft³) ÷ 2,000</div>
        <p>Standard Caltrans HMA density: 140–150 lb/ft³ (2,243–2,403 kg/m³). Use project-specific Superpave mix design data where available.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Typical CA Road Example</div>
        <div class="formula-expr">1 lane-mile (5,280 ft × 12 ft × 0.17 ft × 148 lb/ft³ ÷ 2,000) = <strong>2,534 short tons</strong></div>
        <p>One lane-mile of 2-inch HMA overlay at Caltrans standard 148 lb/ft³ density. Convert to metric: × 0.907 = 2,298 metric tonnes.</p>
      </div>
    </div>
    <div class="info-box" style="margin-top:1.5rem;">
      <span class="info-icon">🏔️</span>
      <div><strong style="color:var(--text);display:block;margin-bottom:.25rem;">California Climate Considerations</strong>
      <p style="margin:0;font-size:.9rem;">California's climate ranges from hot desert (Inland Empire, Central Valley) to coastal temperate and mountain alpine conditions. Caltrans specifies PG (Performance Grade) binders by region — PG 64-16 for moderate coastal climates and PG 76-22 or higher for hot inland and high-traffic routes. Density and bitumen content vary by PG binder and aggregate type. Compare with other warm-climate regions using the <a href="/calculators/virginia-asphalt-calculator">Virginia</a> or <a href="/calculators/colorado-asphalt-calculator">Colorado</a> calculators.</p></div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>California Paving Project Types</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🛣️</div>
        <h3>State Highway Resurfacing</h3>
        <p>Caltrans uses this calculator type for pavement management and resurfacing bid estimates. HMA overlays of 2–3 inches are the most common maintenance treatment on California state highways. A 10-mile resurfacing project on a 4-lane freeway (48 ft wide) at 2.5 inches requires approximately 63,000 short tons of HMA mix — a major logistics operation requiring plant scheduling weeks in advance.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">☀️</div>
        <h3>Hot Climate &amp; Rutting Resistance</h3>
        <p>California's Central Valley and Southern California highway network experiences extreme summer heat (pavement surface temperatures 60–70°C+). Caltrans specifies high-performance PG 76-22 and PG 82-16 binders for these zones. Higher PG binders increase material cost by 10–20% but dramatically reduce rutting and shoving. Use the <a href="/calculators/asphalt-cost-calculator">cost calculator</a> to model the cost difference between standard and performance binder grades.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🚴</div>
        <h3>Bike Paths &amp; Multi-Use Trails</h3>
        <p>California is a leading state for cycling infrastructure. Shared-use paths are typically 8–14 ft wide with 2–3 inch asphalt surface on compacted DG (Decomposed Granite) or AB (Aggregate Base). A 1-mile paved bike path (10 ft wide, 2.5-inch surface) requires approximately 330 short tons. This calculator handles both lane-width road estimates and narrow path construction equally well.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'What asphalt mix specifications does Caltrans use?', a: 'Caltrans uses Superpave mix design per California Test Method CT-367. Common mixes include: HMA Type A (dense-graded, ½-inch NMAS, surface layer), HMA Type B (¾-inch NMAS, intermediate/base), OGFC (Open-Graded Friction Course, noise/drainage), RAC-G (Rubberised Asphalt Concrete, gap-graded with 18–20% crumb rubber), and RAC-O (rubberised OGFC). RAC mixes using recycled tyre rubber are particularly common in California to meet TPMA (Tyre-derived material mandate).' },
    { q: 'How much does asphalt cost per ton in California?', a: 'California asphalt prices (supply only) typically range from $90–160 per short ton for standard HMA, varying by region (San Francisco Bay Area and LA Basin tend to be higher than Central Valley). Polymer-modified and rubberised mixes (RAC) cost $120–200/ton. Total installed paving costs run $1.50–$3.50/sq ft depending on lift thickness and project complexity. Prices fluctuate significantly with crude oil prices — always get current quotes.' },
    { q: 'What is OGFC and where is it used in California?', a: 'OGFC (Open-Graded Friction Course) is a gap-graded porous asphalt layer placed as a thin wearing course (1–1.5 inch) on high-speed highways to improve wet-weather skid resistance, reduce spray, and lower tyre-pavement noise. Caltrans uses OGFC on high-volume Interstate and State Route corridors in urban areas. Its density (1,800–2,100 kg/m³) is lower than dense HMA, and it requires a rubberised binder for durability in California conditions.' },
  ]
},

'calculators/canada-bitumen-calculator': {
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>Canadian Asphalt Calculation Method</h2>
      <p>Based on CSA A23.1, Superpave Canada, and provincial MOT/MTO specifications for cold-climate asphalt design.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Volume (SI Units)</div>
        <div class="formula-expr">Volume (m³) = Length (m) × Width (m) × Thickness (m)</div>
        <p>Canada uses metric (SI) units. Convert lane widths from feet where needed: 1 ft = 0.3048 m. Standard lane width is 3.5–3.75 m per TAC (Transportation Association of Canada).</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Weight (Metric Tonnes)</div>
        <div class="formula-expr">Mass (t) = Volume (m³) × Density (kg/m³) ÷ 1,000</div>
        <p>SP 12.5 (Superpave 12.5 mm NMAS): 2,300–2,380 kg/m³. Cold climate mixes may use 2,250–2,320 kg/m³. Always use laboratory bulk specific gravity (Gmb) for accurate tonnage.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Worked Example (Canada)</div>
        <div class="formula-expr">200 m × 3.7 m × 0.05 m × 2,320 kg/m³ ÷ 1,000 = <strong>85.8 t</strong></div>
        <p>One lane (200 m × 3.7 m) of SP 12.5 wearing course at 50 mm in Ontario. At CAD $150/t → <strong>CAD $12,876</strong> material cost. Add 7% waste → order 91.8 t.</p>
      </div>
    </div>
    <div class="info-box" style="margin-top:1.5rem;">
      <span class="info-icon">🥶</span>
      <div><strong style="color:var(--text);display:block;margin-bottom:.25rem;">Cold Climate Mix Design Considerations</strong>
      <p style="margin:0;font-size:.9rem;">Canadian winters demand low-temperature bitumen grades (PG -28 to -40 in northern regions) to prevent thermal cracking. Superpave PG grades for Canada range from PG 52-40 in Yukon/NWT to PG 64-28 in southern Ontario and BC. Cold climates also affect compaction windows — asphalt cools faster in cold air, requiring adjusted rolling patterns. Compare with other cold-climate regions using the <a href="/calculators/minnesota-asphalt-calculator">Minnesota</a> or <a href="/calculators/colorado-asphalt-calculator">Colorado</a> calculators.</p></div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>Canadian Paving Project Types</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🍁</div>
        <h3>Provincial Highway Maintenance</h3>
        <p>Provincial Ministries of Transportation (MTO, MOTI, MTQ, etc.) use Superpave SP 12.5 and SP 19 mixes for highway overlay programs. Annual resurfacing budgets across Canada total billions of CAD. Each province has its own Standard Specifications — Ontario uses MTO OPSS, BC uses MOTI specs, and Quebec uses MTQ specifications, each with slightly different mix design requirements.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏙️</div>
        <h3>Urban Municipal Roads</h3>
        <p>Canadian municipalities typically specify HL 3 (Hot Laid surface mix) or SP 12.5 for residential streets and SP 19 for collector and arterial roads. Urban Canadian roads see severe thermal cycling (-30°C to +35°C), requiring flexible, crack-resistant binders. Municipal pavement management programs use estimates from this calculator to allocate annual resurfacing budgets by neighbourhood and road class.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">❄️</div>
        <h3>Northern &amp; Remote Access Roads</h3>
        <p>All-season resource roads (mining, forestry, oil sands) in northern Canada require cold-climate asphalt or cold-mix alternatives that can be applied and compacted at temperatures below 5°C. For remote projects, include trucking distance in cost estimates — in northern BC or NWT, haul distances of 100–500 km from the nearest plant are common. Use the <a href="/calculators/asphalt-cost-calculator">cost calculator</a> with regional pricing for accurate budget estimates.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'What asphalt mix specifications does Canada use?', a: 'Canada primarily uses Superpave mix design per AASHTO SP-2 with Canadian adaptations. Common mixes include SP 9.5, SP 12.5, and SP 19 (Superpave 9.5mm, 12.5mm, and 19mm nominal maximum aggregate size). Ontario uses MTO HL (Hot Laid) designations: HL 1, HL 3, HL 4, and HL 8. Quebec uses MCR (Mélange de type C résistant) designations. The Transportation Association of Canada (TAC) provides national guidance through the Pavement Design and Management Guide.' },
    { q: 'What is the average asphalt price in Canada per tonne?', a: 'Canadian asphalt supply prices (ex-plant) typically range from CAD $100–$180/t for standard SP or HL mixes, varying by province and proximity to plant. Ontario and BC urban areas: $130–$170/t. Prairie provinces (Alberta, Saskatchewan): $110–$150/t. Remote northern projects can exceed $200–$300/t when haul distance is factored in. Total installed costs for municipal road resurfacing typically run CAD $25–$55/m² depending on thickness and local labour rates.' },
    { q: 'What Performance Grade (PG) bitumen is used in Canada?', a: 'PG grade selection depends on regional climate. British Columbia coastal: PG 58-28. Southern Ontario: PG 58-34 to PG 64-34. Prairie provinces: PG 58-34 to PG 52-40. Northern Ontario and Quebec: PG 52-34 to PG 52-40. Yukon, NWT, Nunavut: PG 46-40 or lower. The TAC Superpave design guide provides PG selection maps by climate region. Using too soft a PG causes rutting; too hard a PG causes low-temperature cracking — both are costly failures.' },
  ]
},

};

// Generic content for pages without specific content
const genericContent = (slug, title) => ({
  formula: `<!-- FORMULA SECTION -->
<section class="section section-alt">
  <div class="container">
    <div class="section-header">
      <div class="label">Formula</div>
      <h2>How the Calculation Works</h2>
      <p>Understanding the underlying formula helps you verify results and adjust for project-specific conditions.</p>
    </div>
    <div class="formula-grid">
      <div class="formula-card">
        <div class="formula-title">Step 1 — Volume</div>
        <div class="formula-expr">Volume (m³) = Length × Width × Thickness (all in metres)</div>
        <p>Convert thickness from mm to m by dividing by 1,000. Example: 50 mm = 0.05 m. All dimensions must be in the same unit before multiplying.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Step 2 — Weight</div>
        <div class="formula-expr">Weight (t) = Volume (m³) × Density (kg/m³) ÷ 1,000</div>
        <p>Standard dense HMA density: 2,300–2,400 kg/m³. Open-graded mixes: 1,900–2,100 kg/m³. Use your mix design sheet for precision.</p>
      </div>
      <div class="formula-card">
        <div class="formula-title">Step 3 — Components</div>
        <div class="formula-expr">Bitumen (t) = Weight × (Content% ÷ 100) &nbsp;|&nbsp; Aggregate (t) = Weight − Bitumen</div>
        <p>Typical bitumen content: 5.0–6.5% for dense HMA. Aggregate makes up 93–95% of total mix weight. Use our <a href="/calculators/asphalt-material-calculator">material calculator</a> for detailed breakdown by mix type.</p>
      </div>
    </div>
    <div class="info-box" style="margin-top:1.5rem;">
      <span class="info-icon">💡</span>
      <div><strong style="color:var(--text);display:block;margin-bottom:.25rem;">Order Extra — Always Add a Waste Factor</strong>
      <p style="margin:0;font-size:.9rem;">Add 5–10% to calculated weight when ordering asphalt. Irregular areas, compaction variation, and material left in delivery trucks all contribute to real-world usage exceeding the theoretical calculation. Use the <a href="/calculators/asphalt-cost-calculator">cost calculator</a> to price your total order including the waste allowance.</p></div>
    </div>
  </div>
</section>`,
  apps: `<!-- APPLICATIONS -->
<section class="section">
  <div class="container">
    <div class="section-header"><div class="label">Applications</div><h2>Common Use Cases</h2></div>
    <div class="grid-3" style="gap:1.5rem;">
      <div class="pillar-card">
        <div class="pillar-icon">🛣️</div>
        <h3>Road &amp; Highway Paving</h3>
        <p>Road paving projects use this tool to estimate material quantities per lane and layer. Multi-layer road construction requires separate calculations for each lift: wearing course, binder course, and base course. See the <a href="/calculators/road-asphalt-calculator">road asphalt calculator</a> for lane-kilometre based estimates suited to highway-scale projects.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏠</div>
        <h3>Residential &amp; Commercial</h3>
        <p>Driveways, car parks, footpaths, and industrial yards are efficiently estimated with this tool. A standard residential driveway (50 m², 50 mm HMA) typically requires 6–7 tonnes of dense mix. Commercial car parks benefit from 60–75 mm of asphalt over a well-prepared sub-base. Use the <a href="/calculators/asphalt-cost-calculator">cost calculator</a> to convert weight to a budget figure.</p>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🔧</div>
        <h3>Maintenance &amp; Rehabilitation</h3>
        <p>Pavement maintenance teams use calculators to estimate materials for overlay programs, pothole repairs, and mill-and-fill operations. Thin overlays (25–40 mm) are cost-effective for pavements with surface distress but good structural integrity. For repair-specific estimates, use the <a href="/calculators/asphalt-repair-calculator">repair calculator</a>. For milling waste quantities, use the <a href="/calculators/asphalt-removal-calculator">removal calculator</a>.</p>
      </div>
    </div>
  </div>
</section>`,
  faqs: [
    { q: 'How accurate is this calculator?', a: 'The calculation formula is mathematically exact — there is no approximation error in the tool itself. Real-world accuracy depends on three input variables: (1) actual compacted dimensions vs. planned dimensions (typically ±2–5%); (2) actual mix density vs. assumed density (±2–4%); and (3) waste and overage factors (5–15% depending on job complexity). For supply ordering, add 8–10% to the calculated result to account for these real-world variables.' },
    { q: 'What units does this calculator support?', a: 'This calculator supports full metric and imperial unit inputs. Length and width can be entered in metres, kilometres, feet, yards, or miles. Thickness can be entered in mm, cm, metres, inches, or feet. Density can be entered in kg/m³, t/m³, or lb/ft³. All results are displayed in metric tonnes (t) and cubic metres (m³). For imperial-first calculations, see the <a href="/calculators/bitumen-square-feet-calculator">square feet calculator</a> or <a href="/calculators/square-feet-to-tons-calculator">sq ft to tons converter</a>.' },
    { q: 'Do I need to account for compaction when calculating asphalt?', a: 'The calculator uses compacted (in-place) density, so the results represent the compacted, finished material weight. When ordering asphalt, you receive it loose from the plant at a higher volume — it compacts to approximately 80–85% of its loose volume during rolling. Your supplier delivers by weight (tonnes), not volume, so compaction does not affect your order quantity. Always order by weight matching the calculator output, plus your waste factor.' },
  ]
});

// Process all calculator pages
const calcDir = path.join(BASE, 'calculators');
const allSlugs = fs.readdirSync(calcDir).filter(d => fs.existsSync(path.join(calcDir, d, 'index.html')));

let updated = 0;
for (const dir of allSlugs) {
  const slug = 'calculators/' + dir;
  const filePath = path.join(BASE, slug, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already has formula section
  if (html.includes('<!-- FORMULA SECTION -->')) {
    console.log('SKIP (already has formula):', slug);
    continue;
  }

  const pageContent = content[slug] || genericContent(slug, dir);

  // 1. Insert formula section + applications before <!-- HOW TO USE -->
  const howToUseMarker = '<!-- HOW TO USE -->';
  if (html.includes(howToUseMarker)) {
    html = html.replace(howToUseMarker, pageContent.formula + '\n\n' + pageContent.apps + '\n\n' + howToUseMarker);
  } else {
    console.log('SKIP (no HOW TO USE marker):', slug);
    continue;
  }

  // 2. Append extra FAQ items before </div>\n</section>\n\n<!-- FOOTER -->
  const faqEndMarker = '</div>\n    </div>\n  </div>\n</section>\n\n<!-- FOOTER -->';
  const altFaqEndMarker = '    </div>\n  </div>\n</section>\n\n<!-- FOOTER -->';

  const newFaqItems = pageContent.faqs.map(f =>
    `      <div class="faq-item">\n        <button class="faq-q">${f.q} <span class="faq-icon">+</span></button>\n        <div class="faq-a"><p>${f.a}</p></div>\n      </div>`
  ).join('\n');

  if (html.includes(faqEndMarker)) {
    html = html.replace(faqEndMarker,
      `${newFaqItems}\n    </div>\n    </div>\n  </div>\n</section>\n\n<!-- FOOTER -->`);
  } else if (html.includes(altFaqEndMarker)) {
    html = html.replace(altFaqEndMarker,
      `${newFaqItems}\n    </div>\n  </div>\n</section>\n\n<!-- FOOTER -->`);
  } else {
    console.log('NOTE: Could not find FAQ end marker for:', slug, '— formula section still added');
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('UPDATED:', slug);
  updated++;
}
console.log('\nDone. Updated', updated, 'pages.');
