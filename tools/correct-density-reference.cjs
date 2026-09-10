const fs = require('node:fs');
const file = 'blog/bitumen-density-volume-cargo-calculations/index.html';
let html = fs.readFileSync(file, 'utf8');
html = html.replace(/<h2>How to Calculate Density of Bitumen<\/h2>[\s\S]*?(?=<h2>How to Calculate Volume)/, `<h2>How to Calculate Density of Bitumen</h2>
<p><strong>Density = mass ÷ volume.</strong> Divide kilograms by cubic metres to obtain kg/m³. For example, a measured 1,010 kg occupying 1 m³ has a density of 1,010 kg/m³, or 1.010 kg/L. This is an illustrative value, not a specification for every grade.</p>
<p>Use the measured density on the supplier's certificate and its reference temperature. A penetration grade alone does not determine density. Match the volume and density temperatures before multiplying them. Bitumen binder is a different material from asphalt mixture, which also contains aggregate; do not substitute compacted asphalt density in a binder cargo calculation.</p>

`);
html = html.replace(/<h2>Temperature Correction<\/h2>[\s\S]*?(?=<h2>Cargo)/, `<h2>Temperature Correction</h2>
<p>Heating changes bitumen volume and density. Use the product's approved volume correction table or method and the reference temperature required by the contract. A single expansion coefficient is not a universal custody-transfer standard.</p>
<div class="formula-inline">Reference volume = observed volume × approved volume correction factor</div>
<p><strong>Illustrative example:</strong> If the approved factor for a shipment were 0.95, an observed volume of 40 m³ would become 38 m³ at the reference temperature. At a density of 1,010 kg/m³ at that same temperature, the calculated mass would be 38.38 metric tonnes. The factor 0.95 is an example, not a factor to use for an actual shipment.</p>
<p>Obtain the applicable factor from the supplier or inspection procedure. The <a href="/calculators/bitumen-temperature-converter/">temperature converter</a> converts °C and °F only; it does not calculate a volume correction factor.</p>

`);
html = html.replace(/<h2>Cargo and Bulk Shipment Calculations<\/h2>[\s\S]*?(?=<h2>Related Reading)/, `<h2>Cargo and Bulk Shipment Calculations</h2>
<ol><li>Use the tank's calibrated measurement procedure to determine observed volume.</li><li>Record the product temperature and the supplier's density with its reference temperature.</li><li>Apply the contractually approved correction method to bring volume and density to the same reference temperature.</li><li>Multiply cubic metres by kg/m³ and divide by 1,000 for metric tonnes.</li><li>Reconcile the result with the delivery documentation and agreed measurement tolerances.</li></ol>
<h2>Storage Tank Planning</h2>
<p>Nominal tank volume is not the same as its permitted working capacity. Use the tank design, operating procedure and supplier guidance for filling limits, heating and storage temperature. Polymer-modified binders may need different handling conditions.</p>
<p>See <a href="https://eurobitume.eu/wp-content/uploads/2024/06/EB-Guidance-for-the-Storage-of-Bitumen.pdf" rel="noopener" target="_blank">Eurobitume's storage guidance</a> and the product safety data sheet. These quantity examples do not specify safe tank operating limits. Once the delivered mass is confirmed, the <a href="/calculators/asphalt-cost-calculator/">cost calculator</a> can multiply tonnes by an entered price.</p>

`);
html = html.replace('a density of 1,020 kg/m³:', 'an assumed density of 1,020 kg/m³ at the same reference temperature:');
html = html.replace('This volume calculation is important for pump-out rates, ISO tank container capacity (typically 24–26 m³), and storage tank inventory management.', 'Check the permitted working capacity of the actual container before using this volume in delivery planning.');
fs.writeFileSync(file, html.replace(/\r\n/g, '\n'));
console.log('Corrected supplier-density and temperature assumptions');
