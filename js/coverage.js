'use strict';
const coverageForm = document.getElementById('coverageForm');
if (coverageForm) {
  const field = id => document.getElementById(id);
  function updateCoverage() {
    const toArea = field('coverageDirection').value === 'area';
    field('coverageValueLabel').textContent = toArea ? 'Asphalt mass (metric tonnes)' : 'Area (m²)';
    const values = ['coverageValue', 'coverageThickness', 'coverageDensity'].map(id => Number(field(id).value));
    const output = field('coverageResult');
    if (!values.every(v => Number.isFinite(v) && v > 0)) {
      output.textContent = 'Enter positive mass or area, thickness, and density.';
      return;
    }
    const [value, thickness, density] = values;
    const massPerArea = thickness / 1000 * density / 1000;
    const result = toArea ? value / massPerArea : value * massPerArea;
    output.textContent = Number.isFinite(result) ? result.toFixed(3) + (toArea ? ' m² covered' : ' metric tonnes required') : 'These inputs exceed the supported calculation range.';
  }
  coverageForm.addEventListener('submit', event => { event.preventDefault(); updateCoverage(); });
  coverageForm.addEventListener('input', updateCoverage);
  coverageForm.addEventListener('reset', () => setTimeout(updateCoverage, 0));
}
