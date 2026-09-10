# BitumenCalc — Complete Website Image SEO & Generation Plan

This file contains:

- SEO-friendly filenames
- Image alt text
- Recommended page/section placement
- Ready-to-paste image generation prompts
- Suggested dimensions and aspect ratios
- WebP optimization guidance
- A complete extended image roadmap for future BitumenCalc pages

---

# 1. Global Image Rules for BitumenCalc

## Preferred visual style

Use a consistent visual identity across the website:

- Professional civil-engineering aesthetic
- Realistic asphalt, aggregate, soil, and bitumen textures
- Dark charcoal / asphalt gray as the dominant material color
- Natural stone gray and brown for aggregate and subgrade
- Restrained construction-yellow or orange accents for measurement arrows
- Clean white or light warm-gray backgrounds for diagrams
- Minimal visual clutter
- No logos inside generated images
- No watermarks
- Avoid excessive text inside images
- Avoid fake calculator interfaces unless the image is specifically showing a calculator UI
- Avoid decorative stock-photo style compositions
- Keep technical diagrams accurate and visually understandable

## Preferred output formats

| Image Type | Recommended Size | Aspect Ratio | Preferred Format |
|---|---:|---:|---|
| Featured article image | 1200 × 630 | 1.91:1 | WebP |
| Standard educational infographic | 1200 × 675 | 16:9 | WebP |
| Calculator section illustration | 1200 × 675 | 16:9 | WebP |
| Open Graph image | 1200 × 630 | 1.91:1 | WebP/JPG fallback |
| Small inline diagram | 800 × 450 | 16:9 | WebP |
| Square social/supporting graphic | 1080 × 1080 | 1:1 | WebP |

## WebP target sizes

- Featured images: ideally **80–180 KB**
- Educational diagrams: ideally **70–160 KB**
- Small inline images: ideally **40–100 KB**
- Avoid images above **250 KB** unless texture/detail truly requires it.

## Loading recommendations

Use `loading="lazy"` for images below the fold.

For the main hero/featured image:

- do not lazy-load
- use `fetchpriority="high"`
- provide explicit width and height
- use responsive `srcset` where possible

Example:

```html
<img
  src="/images/asphalt-tonnage-calculator.webp"
  alt="Asphalt tonnage calculation using road length, width and pavement thickness"
  width="1200"
  height="630"
  fetchpriority="high"
  decoding="async"
/>
```

## Alt-text rules

Good alt text should:

- describe the actual image
- naturally include the page topic where relevant
- stay concise
- avoid keyword stuffing
- not start with “image of”
- not repeat surrounding heading text word-for-word

Recommended length: **70–140 characters**.

---

# 2. Images Already Created

## Image 01 — Bitumen and Asphalt Quantity Calculation Overview

**Filename**

`bitumen-asphalt-quantity-calculation-road-section.webp`

**Recommended placement**

- Homepage
- Main asphalt calculator page
- “How the calculator works” section
- Introductory educational guide

**Alt text**

`Isometric asphalt road section showing length, width, thickness and the workflow from volume to asphalt tonnage and cost`

**Generation prompt**

```text
Create a premium technical infographic for a professional civil engineering website called BitumenCalc.

Show a clean isometric asphalt road section being measured for a bitumen and asphalt quantity calculation.

The graphic must visually explain these dimensions:

- Length
- Width
- Asphalt thickness

Show a realistic cutaway road pavement with:
- dark asphalt surface layer
- binder course
- crushed aggregate base
- compacted sub-base

Include subtle engineering measurement arrows and dimension lines around the pavement.

Also visually communicate the calculation workflow:

Length × Width × Thickness
↓
Volume
↓
Asphalt Weight / Tonnage
↓
Bitumen + Aggregate
↓
Estimated Cost

Use a modern professional civil-engineering infographic style, not cartoonish.

Background: clean white or very light warm gray.

Use dark charcoal asphalt, natural aggregate textures and restrained construction-yellow/orange accents.

Minimal visual clutter.

Extremely sharp edges and realistic pavement material texture.

No people.
No company logos.
No watermark.
No unnecessary decorative text.
No spelling errors.

Leave generous empty space around the composition so it integrates naturally into a website.

Landscape 16:9 composition.

Target output approximately 1200 × 675 pixels.

Designed specifically for conversion to lightweight WebP for a fast-loading SEO website.
```

---

## Image 02 — Asphalt Pavement Layer Cross-Section

**Filename**

`asphalt-pavement-layer-cross-section.webp`

**Recommended placement**

- Asphalt thickness guide
- Asphalt pavement design guide
- Calculator methodology page
- Educational section below calculators

**Alt text**

`Asphalt pavement cross-section showing surface course, binder course, aggregate base and compacted sub-base`

**Generation prompt**

```text
Create a highly accurate civil engineering educational illustration showing an asphalt pavement cross-section.

Use a clean isometric cutaway diagram.

Clearly show four horizontal layers:

1. Asphalt Surface Course
2. Asphalt Binder Course
3. Aggregate Base Course
4. Compacted Sub-base / Soil

Make the layers visibly different through realistic material textures.

Show a vertical dimension arrow beside the asphalt layers indicating pavement thickness.

Include subtle callout lines pointing toward each pavement layer.

The asphalt surface should be dark charcoal with realistic fine aggregate texture.
The binder layer should be slightly coarser.
The aggregate base should show crushed stone.
The lowest layer should resemble compacted granular soil.

Professional civil engineering textbook-quality visualization.

Clean white background.

No vehicles.
No workers.
No unnecessary scenery.
No logos or watermarks.

Typography, if included, must be extremely clean, minimal and technically correct.

Leave comfortable margins.

Landscape 16:9.
Approximately 1200 × 675 pixels.
Optimized conceptually for WebP use on a fast technical calculator website.
```

---

## Image 03 — Asphalt Tonnage Formula Infographic

**Filename**

`asphalt-tonnage-calculation-formula.webp`

**Recommended placement**

- Asphalt Tonnage Calculator
- “How to calculate asphalt tonnage” guide
- Formula explanation section

**Alt text**

`Asphalt slab diagram showing length, width and thickness with the calculation from area and volume to asphalt tonnage`

**Generation prompt**

```text
Design a modern technical infographic explaining how asphalt tonnage is calculated.

Show an isometric rectangular asphalt pavement slab.

Mark:

Length = L
Width = W
Thickness = T

Use engineering-style measurement arrows.

Next to the slab show the calculation process visually:

Area = Length × Width

Volume = Area × Thickness

Weight = Volume × Density

Tonnage = Weight ÷ 1000

Show the final output using a subtle construction truck or asphalt pile icon representing tonnes of asphalt.

The graphic should communicate the concept visually even before the text is read.

Professional civil engineering aesthetic.

Dark asphalt gray, stone gray, white background, subtle construction orange/yellow accent.

Flat infographic + realistic material texture hybrid.

Avoid excessive text.

No fake calculator interface.
No branding.
No watermark.
No clutter.
No spelling mistakes.

Landscape 16:9.
1200 × 675.
Suitable for WebP web optimization.
```

---

## Image 04 — Asphalt Driveway Cost Calculation

**Filename**

`asphalt-driveway-cost-calculation.webp`

**Recommended placement**

- Asphalt Driveway Cost Calculator
- Driveway cost guide
- Residential asphalt guide

**Alt text**

`Residential asphalt driveway with length, width and thickness measurements plus a pavement cutaway for cost estimation`

**Generation prompt**

```text
Create a realistic architectural and civil engineering illustration for an article about asphalt driveway cost calculation.

Show a modern residential house with a newly paved black asphalt driveway viewed from a slightly elevated three-quarter angle.

Overlay clean professional measurement arrows showing:

Length
Width
Asphalt Thickness

At the edge of the driveway, include a small cutaway revealing:
- asphalt surface
- aggregate base
- compacted ground

Subtly represent the calculation concept with small minimal symbols for:

Area
Tonnage
Price per Ton
Total Cost

The image should feel useful and instructional rather than decorative.

Realistic asphalt surface texture.
Professional residential environment.
Natural daylight.
Clean contemporary house.
No visible brand names.
No people prominently featured.
No watermark.

Avoid exaggerated luxury-house imagery.

Landscape 16:9.
1200 × 675 pixels.
Made for an authoritative asphalt calculator website and WebP optimization.
```

---

## Image 05 — Asphalt Thickness Comparison

**Filename**

`asphalt-pavement-thickness-comparison.webp`

**Recommended placement**

- Asphalt thickness guide
- Driveway thickness guide
- Commercial pavement guide
- Tonnage calculator help section

**Alt text**

`Comparison of 50, 75, 100 and 150 millimeter asphalt pavement thicknesses for residential and heavy-duty use`

**Generation prompt**

```text
Create an accurate civil engineering infographic comparing asphalt pavement thicknesses.

Show four separate asphalt cross-section blocks arranged horizontally from thinnest to thickest.

Represent:

50 mm – light residential driveway
75 mm – standard residential driveway
100 mm – heavier vehicle use
150 mm – commercial or heavy-duty pavement

Each block should show:
- dark asphalt layers
- aggregate base
- compacted subgrade
- vertical thickness measurement arrow

Use visual proportions that clearly demonstrate increasing asphalt thickness.

Professional technical diagram.

White/light-gray background.

Dark asphalt charcoal, natural gravel colors, subtle construction-orange dimension markers.

Simple, clean, highly legible.

No people.
No road scenery.
No logos.
No watermark.
No decorative filler.

Landscape 16:9.
1200 × 675.
Intended for conversion to optimized WebP.
```

---

## Image 06 — Asphalt Density Comparison

**Filename**

`asphalt-density-comparison.webp`

**Recommended placement**

- Asphalt Density Calculator
- Density reference guide
- Asphalt tonnage calculator explanation

**Alt text**

`Three equal one-cubic-meter asphalt samples showing how different mix densities produce different weights`

**Generation prompt**

```text
Create a scientific but easy-to-understand infographic explaining asphalt density.

Show three equal transparent cubic-meter boxes containing different asphalt mixtures:

- porous / open-graded asphalt
- standard dense-graded asphalt
- stone mastic or dense asphalt

The physical cube sizes must remain identical while the internal aggregate structure and compactness visibly differ.

Show a simple balance or weight concept below each cube to indicate that the same volume can have different mass.

Visually communicate:

Volume + Density = Weight

Use realistic asphalt aggregate particles inside the blocks.

Professional materials-engineering illustration.

White background.
Dark gray asphalt.
Natural stone textures.
Subtle blue-gray and construction-orange highlights.

No fake laboratory numbers unless absolutely necessary.
No people.
No watermark.
No logos.

Landscape 16:9.
1200 × 675 pixels.
Clean enough for use as a WebP educational image on a civil engineering calculator website.
```

---

## Image 07 — Bitumen vs Asphalt

**Filename**

`bitumen-vs-asphalt-difference.webp`

**Recommended placement**

- Bitumen vs Asphalt article
- What is Bitumen guide
- What is Asphalt guide
- Homepage educational section

**Alt text**

`Bitumen binder compared with asphalt mix made from bitumen and crushed stone aggregate`

**Generation prompt**

```text
Create an educational split-screen engineering infographic explaining the difference between bitumen and asphalt.

LEFT SIDE:
Show pure black viscous bitumen binder being poured slowly from an industrial laboratory container.

Label conceptually:
BITUMEN
Binder material

RIGHT SIDE:
Show finished asphalt mixture containing visible crushed aggregate coated with black binder.

Label conceptually:
ASPHALT
Bitumen + Aggregate

Between the two sides, show a subtle arrow demonstrating:

Bitumen + Stone Aggregate → Asphalt Mix

Make both materials extremely realistic.

Use a clean white industrial/scientific background.

Strong texture detail.
Professional civil engineering educational style.

No road construction workers.
No branding.
No watermark.
No unrelated machinery.

Landscape 16:9.
1200 × 675 pixels.
Suitable for WebP compression while retaining material texture.
```

---

## Image 08 — Asphalt Mix Composition

**Filename**

`asphalt-mix-composition-bitumen-aggregate.webp`

**Recommended placement**

- Asphalt mix calculator
- Bitumen percentage calculator
- Asphalt mix design guide
- Educational article

**Alt text**

`Asphalt mix composition showing approximately 5.5 percent bitumen binder and 94.5 percent aggregate`

**Generation prompt**

```text
Create a clean professional materials-engineering infographic explaining asphalt mix composition.

Show a realistic pile or cutaway sample of asphalt mixture.

Separate the composition visually into:

Bitumen binder — small percentage
Aggregate — dominant percentage

Use an elegant donut chart or proportional visual beside the physical material sample.

Example educational values may show:

5.5% Bitumen
94.5% Aggregate

Clearly indicate that values vary according to mix design.

Show close-up crushed stone particles coated with black bitumen.

Professional civil engineering laboratory aesthetic.

White background.
Dark charcoal, natural aggregate gray and a restrained construction-yellow accent.

Minimal text.
No logos.
No watermark.
No people.

Landscape 16:9.
1200 × 675.
Designed for lightweight WebP use.
```

---

## Image 09 — Road Asphalt Quantity Estimation

**Filename**

`road-asphalt-quantity-estimation.webp`

**Recommended placement**

- Road Asphalt Calculator
- Asphalt quantity calculator
- Highway paving guide

**Alt text**

`Two-lane road with length, width and asphalt thickness measurements used to estimate road asphalt tonnage`

**Generation prompt**

```text
Create a professional isometric road construction illustration explaining asphalt quantity estimation.

Show a straight two-lane road segment from an elevated three-quarter perspective.

Overlay measurement arrows showing:

Road Length
Road Width
Asphalt Layer Thickness

At one end, cut away the pavement so the asphalt surface, binder and aggregate base layers are visible.

Include a subtle visual calculation flow:

Dimensions
→ Volume
→ Tonnes
→ Asphalt Required

Add one asphalt paving machine and one roller in the distance for context, but keep the measurement diagram as the dominant subject.

Realistic civil infrastructure style.

No brand logos.
No workers close to camera.
No text-heavy design.
No watermark.

White/light neutral peripheral background so it works inside a website content section.

Landscape 16:9.
1200 × 675 pixels.
WebP-ready.
```

---

## Image 10 — Pothole Repair Asphalt Calculation

**Filename**

`pothole-repair-asphalt-calculation.webp`

**Recommended placement**

- Pothole Repair Calculator
- Asphalt patch calculator
- Pothole repair guide

**Alt text**

`Pothole repair diagram showing length, width and depth measurements used to calculate asphalt patch volume and weight`

**Generation prompt**

```text
Create a technical civil engineering illustration showing how to calculate asphalt required for a pothole repair.

Show a realistic rectangular pothole cut into an asphalt road.

Expose the broken asphalt edge and base material underneath.

Overlay measurement arrows:

Length
Width
Repair Depth

Beside it, show the repaired version filled with compacted asphalt.

Communicate the formula visually:

Repair Volume = Length × Width × Depth

Then:
Volume × Density = Asphalt Weight

Clean technical infographic style.

Detailed road texture.
Professional engineering appearance.
White or subtle gray surrounding background.
Small construction-orange measurement lines.

No logos.
No people.
No watermark.

Landscape 16:9.
1200 × 675 pixels.
Suitable for WebP.
```

---

## Image 11 — Recycled Asphalt Pavement / RAP

**Filename**

`recycled-asphalt-pavement-rap-process.webp`

**Recommended placement**

- RAP calculator
- Recycled asphalt guide
- Sustainability article
- Asphalt recycling page

**Alt text**

`Asphalt milling process showing old pavement being reclaimed and processed into recycled asphalt pavement material`

**Generation prompt**

```text
Create a realistic educational image explaining recycled asphalt pavement, commonly called RAP.

Show an asphalt milling machine removing the upper pavement surface.

Behind the machine, show textured asphalt millings being collected.

On the side, include a clean cutaway comparison:

Existing Asphalt Pavement
→ Milling
→ Reclaimed Asphalt Pavement
→ Recycled Asphalt Mix

Make the reclaimed material look like realistic dark crushed asphalt fragments.

Professional road engineering and sustainability aesthetic.

Daylight.
Neutral industrial environment.
No company branding.
No watermark.
No prominent workers.

Keep the illustration instructional and uncluttered.

Landscape 16:9.
1200 × 675 pixels.
Optimized conceptually for WebP website usage.
```

---

## Image 12 — Asphalt Tack Coat Application

**Filename**

`asphalt-tack-coat-application.webp`

**Recommended placement**

- Tack Coat Calculator
- Tack coat application rate guide
- Asphalt overlay guide

**Alt text**

`Tack coat application between existing asphalt and a fresh asphalt overlay showing the thin bonding layer`

**Generation prompt**

```text
Create an accurate civil engineering illustration explaining asphalt tack coat application.

Show a road cross-section and paving process.

Existing asphalt layer at the bottom.
A thin uniform tack coat layer sprayed across the surface.
Fresh asphalt overlay placed above it.

Include a paving spray truck in the background applying tack coat evenly.

Use a magnified cutaway area showing the extremely thin bonding layer between old and new asphalt.

Communicate visually that tack coat creates adhesion between pavement layers.

Professional highway engineering diagram.

Dark asphalt textures.
Subtle amber-brown tack coat layer.
Clean neutral background.

No company branding.
No watermark.
No unnecessary people.

Landscape 16:9.
1200 × 675 pixels.
Suitable for efficient WebP delivery.
```

---

## Image 13 — Asphalt Tonnage Calculator Featured Image

**Filename**

`asphalt-tonnage-calculator-featured.webp`

**Recommended placement**

- Asphalt Tonnage Calculator hero
- Featured article thumbnail
- Open Graph/social preview

**Alt text**

`Fresh asphalt pavement with engineering measurement lines for length, width and thickness used in tonnage calculation`

**Generation prompt**

```text
Create a premium editorial featured image for BitumenCalc, a professional asphalt and civil engineering calculator website.

Topic:
Asphalt Tonnage Calculator

Show a dramatic but technically accurate close-up of newly laid asphalt road beside a clean engineering measurement visualization showing length, width and pavement thickness.

Use an elegant dark charcoal asphalt palette with restrained construction-yellow accents.

Keep the right 35% of the image relatively uncluttered for optional website title overlay.

Professional, authoritative, modern civil-engineering publication aesthetic.

Photorealistic asphalt texture combined with subtle technical diagram elements.

No people as the main subject.
No logos.
No watermark.
Do not render long text inside the image.

Aspect ratio approximately 1.91:1.
1200 × 630 pixels.

Optimized to remain visually strong after WebP compression.
```

---

# 3. Extended Image Plan for the Entire BitumenCalc Website

The following images should be created as the website grows.

---

## Image 14 — Asphalt Calculator Homepage Hero

**Filename**

`asphalt-calculator-homepage-hero.webp`

**Suggested page**

Homepage

**Alt text**

`Civil engineering asphalt road cutaway with measurement dimensions representing asphalt quantity, tonnage and cost calculations`

**Prompt**

```text
Create a premium homepage hero image for BitumenCalc, a professional asphalt and bitumen calculator website.

Show a technically accurate isometric road pavement cutaway with a realistic asphalt surface, binder course, aggregate base and compacted subgrade.

Overlay restrained engineering dimension arrows for:
Length
Width
Thickness

Include subtle visual symbols representing:
volume
tonnage
bitumen
aggregate
cost

Keep the left and center visually strong while leaving approximately 35% clean negative space on the right for website headline and call-to-action text.

Use realistic asphalt and aggregate textures.

Professional civil engineering publication aesthetic.

Dark charcoal asphalt, natural stone gray, warm subgrade brown and restrained construction-yellow accents.

Clean white to light-gray background.

No branding inside the image.
No watermark.
No prominent people.
No excessive labels.

Landscape 1.91:1.
1200 × 630 pixels.
Designed for efficient WebP compression and strong Core Web Vitals performance.
```

---

## Image 15 — Asphalt Volume Calculator

**Filename**

`asphalt-volume-calculator.webp`

**Alt text**

`Rectangular asphalt pavement slab showing length, width and thickness dimensions used to calculate pavement volume`

**Prompt**

```text
Create a clean civil engineering infographic for an Asphalt Volume Calculator.

Show a realistic rectangular asphalt slab in isometric view.

Mark:
Length = L
Width = W
Thickness = T

Use precise engineering dimension arrows.

Visually communicate:
Volume = Length × Width × Thickness

Show a subtle cubic-meter volume block beside the pavement slab.

Professional materials-engineering aesthetic.

White background.
Dark asphalt charcoal.
Subtle construction-yellow/orange dimension lines.
Minimal text.
No people.
No branding.
No watermark.

Landscape 16:9.
1200 × 675 pixels.
WebP-ready.
```

---

## Image 16 — Asphalt Weight Calculator

**Filename**

`asphalt-weight-calculator.webp`

**Alt text**

`Asphalt volume converted to pavement weight using material density in a technical engineering diagram`

**Prompt**

```text
Create a professional engineering infographic for an Asphalt Weight Calculator.

Show an equal-volume asphalt cube on one side and an industrial weighing platform on the other.

Use a clean visual flow:

Asphalt Volume
×
Asphalt Density
=
Asphalt Weight

Show realistic dense asphalt aggregate texture.

Do not include arbitrary numerical values.

Use dark charcoal asphalt, stone-gray materials, white background and subtle construction-yellow accents.

Minimal technical labeling.
No people.
No logos.
No watermark.

Landscape 16:9.
1200 × 675 pixels.
Designed for WebP use.
```

---

## Image 17 — Asphalt Cost Calculator

**Filename**

`asphalt-cost-calculator.webp`

**Alt text**

`Asphalt tonnage and price per ton combined to calculate total paving material cost`

**Prompt**

```text
Create a professional civil engineering infographic explaining asphalt cost calculation.

Show a realistic pile of hot mix asphalt and a dump truck silhouette or minimal truck icon.

Visually communicate:

Required Asphalt Tonnes
×
Price per Ton
=
Estimated Material Cost

Include a subtle road slab with measurement arrows in the background.

Avoid currency-specific values.

Clean white/light-gray background.
Dark charcoal asphalt.
Natural aggregate texture.
Restrained construction-yellow accents.

Modern engineering publication aesthetic.

No people.
No branding.
No watermark.
Minimal text.

Landscape 16:9.
1200 × 675.
WebP-ready.
```

---

## Image 18 — Asphalt Driveway Calculator Featured Image

**Filename**

`asphalt-driveway-calculator-featured.webp`

**Alt text**

`Residential asphalt driveway with engineering measurement lines for driveway length, width and pavement thickness`

**Prompt**

```text
Create a premium editorial featured image for an Asphalt Driveway Calculator.

Show a realistic modern but modest residential property with a newly paved black asphalt driveway.

Use a slightly elevated three-quarter viewpoint.

Overlay subtle engineering measurement lines showing:
driveway length
driveway width
asphalt thickness

Keep approximately 35% of the right side uncluttered for optional website title overlay.

Natural daylight.
Realistic asphalt texture.
Professional construction and residential engineering aesthetic.

No visible branding.
No prominent people.
No watermark.
No long text.

Landscape 1.91:1.
1200 × 630 pixels.
Optimized for WebP.
```

---

## Image 19 — Asphalt Parking Lot Calculator

**Filename**

`asphalt-parking-lot-calculator.webp`

**Alt text**

`Commercial parking lot with length, width and asphalt thickness measurements for pavement quantity estimation`

**Prompt**

```text
Create a professional civil engineering illustration for an Asphalt Parking Lot Calculator.

Show a medium-size commercial parking lot from an elevated three-quarter perspective.

Keep the lot mostly empty so the pavement geometry is easy to understand.

Overlay engineering measurement arrows showing:
overall length
overall width
asphalt layer thickness

Include a small pavement edge cutaway showing:
asphalt surface
binder layer
aggregate base
subgrade

Use clean parking markings without logos or business names.

Professional civil infrastructure aesthetic.
Natural daylight.
No prominent people.
No watermark.

Landscape 16:9.
1200 × 675 pixels.
WebP-ready.
```

---

## Image 20 — Asphalt Road Calculator Featured Image

**Filename**

`asphalt-road-calculator-featured.webp`

**Alt text**

`Two-lane asphalt road with length, width and pavement thickness measurements for road quantity calculation`

**Prompt**

```text
Create a premium featured image for an Asphalt Road Calculator.

Show a straight newly paved two-lane road from a dramatic but technically clear elevated perspective.

Overlay restrained engineering measurement arrows showing:
Road Length
Road Width
Asphalt Thickness

Include a clean cutaway at the near edge revealing asphalt, binder, aggregate base and compacted subgrade.

Keep the right 35% visually calm for headline overlay.

Realistic road texture.
Professional highway engineering publication style.

Dark charcoal asphalt.
Natural aggregate gray.
Construction-yellow measurement accents.

No logos.
No prominent workers.
No watermark.
No long text.

Landscape 1.91:1.
1200 × 630.
Optimized for WebP.
```

---

## Image 21 — Asphalt Density Reference Chart Visual

**Filename**

`asphalt-density-reference-guide.webp`

**Alt text**

`Comparison of porous, dense-graded and stone mastic asphalt structures showing increasing material density`

**Prompt**

```text
Create a clean technical materials-engineering illustration comparing asphalt density by mix structure.

Show three equal-size cutaway asphalt blocks:

Open-Graded Asphalt
Dense-Graded Asphalt
Stone Mastic Asphalt

Keep external dimensions identical.

Make internal void space and aggregate packing visibly different.

Use a simple low-to-high density visual scale beneath the samples without specific numeric values.

White background.
Dark asphalt charcoal.
Natural aggregate textures.
Subtle blue-gray and construction-yellow accents.

No people.
No branding.
No watermark.
Minimal text.

Landscape 16:9.
1200 × 675.
```

---

## Image 22 — Bitumen Percentage Calculator

**Filename**

`bitumen-percentage-calculator.webp`

**Alt text**

`Asphalt mix sample illustrating the proportion of bitumen binder compared with mineral aggregate`

**Prompt**

```text
Create a professional infographic for a Bitumen Percentage Calculator.

Show a realistic compacted asphalt sample with a close-up cutaway revealing aggregate particles coated by bitumen.

Beside it, use a clean proportional graphic showing:

Bitumen Binder — small share
Aggregate — dominant share

Do not rely on one fixed mix percentage; visually indicate that the exact ratio depends on mix design.

Professional asphalt laboratory aesthetic.

White background.
Dark charcoal.
Natural stone gray.
Subtle construction-yellow highlight.

No people.
No logos.
No watermark.
Minimal text.

Landscape 16:9.
1200 × 675.
```

---

## Image 23 — Aggregate Calculator for Asphalt

**Filename**

`asphalt-aggregate-calculator.webp`

**Alt text**

`Crushed stone aggregate used in asphalt mix shown with volume and weight estimation concepts`

**Prompt**

```text
Create a professional civil engineering infographic for an Asphalt Aggregate Calculator.

Show several realistic crushed aggregate sizes grouped beside a compacted asphalt sample.

Visually demonstrate that aggregate makes up the dominant mineral portion of asphalt mix.

Include subtle engineering symbols for:
volume
density
weight

Use realistic crushed stone texture.

White background.
Natural stone gray and beige.
Dark asphalt charcoal.
Restrained construction-yellow accents.

No logos.
No people.
No watermark.
Minimal text.

Landscape 16:9.
1200 × 675 pixels.
```

---

## Image 24 — Asphalt Milling Calculator

**Filename**

`asphalt-milling-calculator.webp`

**Alt text**

`Asphalt milling machine removing pavement to a measured depth for reclaimed asphalt quantity calculation`

**Prompt**

```text
Create a realistic highway engineering illustration for an Asphalt Milling Calculator.

Show a milling machine removing a controlled depth of existing asphalt pavement.

Overlay technical dimension arrows showing:
milling length
milling width
milling depth

Show the milled surface behind the machine and reclaimed asphalt fragments being conveyed into a truck.

Include a small cutaway demonstrating the removed asphalt layer thickness.

Professional road rehabilitation aesthetic.

Natural daylight.
No company branding.
No prominent workers.
No watermark.

Landscape 16:9.
1200 × 675.
WebP-ready.
```

---

## Image 25 — Asphalt Overlay Calculator

**Filename**

`asphalt-overlay-calculator.webp`

**Alt text**

`Fresh asphalt overlay placed over existing pavement with overlay thickness and road dimensions marked`

**Prompt**

```text
Create a professional civil engineering illustration for an Asphalt Overlay Calculator.

Show an existing asphalt pavement with a fresh new overlay placed above it.

Use a clean cutaway showing:
new asphalt overlay
tack coat
existing asphalt layer
base layer

Overlay dimension arrows for:
surface area
overlay thickness

Show a paver in the distance for context.

Keep technical geometry and pavement cross-section as the dominant subject.

Dark asphalt charcoal.
Subtle amber tack coat line.
Construction-yellow measurement accents.
Neutral background.

No logos.
No watermark.
No unnecessary people.

Landscape 16:9.
1200 × 675.
```

---

## Image 26 — Tack Coat Application Rate Calculator

**Filename**

`asphalt-tack-coat-rate-calculator.webp`

**Alt text**

`Tack coat spray applied uniformly over existing pavement before a new asphalt overlay`

**Prompt**

```text
Create a clean technical infographic for a Tack Coat Application Rate Calculator.

Show an asphalt distributor truck spraying tack coat uniformly over an existing pavement surface.

Overlay a simple measured rectangular road area with:
Length
Width

Include a magnified cross-section showing the extremely thin tack coat film between old asphalt and a new overlay.

Visually communicate:
Surface Area × Application Rate = Tack Coat Quantity

Use amber-brown tack coat.
Dark asphalt textures.
Clean light-gray background.
Construction-yellow measurement arrows.

No branding.
No watermark.
No prominent workers.

Landscape 16:9.
1200 × 675.
```

---

## Image 27 — Prime Coat Calculator

**Filename**

`asphalt-prime-coat-calculator.webp`

**Alt text**

`Prime coat being applied to an aggregate base before asphalt paving in a highway pavement cross-section`

**Prompt**

```text
Create an accurate civil engineering infographic explaining prime coat application.

Show a prepared granular aggregate base before asphalt paving.

A distributor truck should apply a thin prime coat evenly over the base.

Use a cutaway showing:
future asphalt layer position
prime coat penetrating the granular base
aggregate base
subgrade

Visually communicate that prime coat penetrates and prepares an untreated granular surface before asphalt placement.

Professional highway engineering style.

Natural aggregate textures.
Amber-brown prime coat.
Clean neutral background.
Construction-yellow annotations.

No logos.
No watermark.
No prominent people.

Landscape 16:9.
1200 × 675.
```

---

## Image 28 — Asphalt Compaction Guide

**Filename**

`asphalt-compaction-roller-guide.webp`

**Alt text**

`Road roller compacting freshly laid asphalt with a technical comparison of loose and compacted pavement thickness`

**Prompt**

```text
Create a realistic civil engineering infographic explaining asphalt compaction.

Show a road roller compacting newly placed hot mix asphalt.

Include a technical side diagram comparing:

Loose Asphalt Layer
→ Compaction
→ Final Compacted Thickness

Show aggregate particles becoming more tightly packed after compaction.

Professional highway materials aesthetic.

Dark charcoal asphalt.
Natural daylight.
Subtle construction-yellow arrows and dimension markers.
Neutral background.

No company logos.
No watermark.
No prominent people.

Landscape 16:9.
1200 × 675.
```

---

## Image 29 — Asphalt Waste Factor Illustration

**Filename**

`asphalt-waste-factor-calculation.webp`

**Alt text**

`Asphalt quantity estimate showing calculated tonnage plus a small additional material allowance for waste and site variation`

**Prompt**

```text
Create a professional technical infographic explaining asphalt waste allowance.

Show a calculated asphalt volume block leading to a realistic asphalt pile or truckload.

Use a visual flow:

Calculated Quantity
+
Small Waste Allowance
=
Order Quantity

Represent the waste allowance as a small additional highlighted segment, not an exaggerated amount.

Include subtle construction context such as pavement edges and trimming losses.

White/light-gray background.
Dark asphalt charcoal.
Construction-yellow highlights.

Minimal text.
No logos.
No watermark.
No people.

Landscape 16:9.
1200 × 675.
```

---

## Image 30 — Asphalt Temperature Guide

**Filename**

`asphalt-temperature-paving-guide.webp`

**Alt text**

`Hot mix asphalt being paved and compacted with temperature stages from delivery to rolling`

**Prompt**

```text
Create a professional civil engineering educational illustration explaining temperature control during asphalt paving.

Show hot mix asphalt arriving in a dump truck, being placed by a paver and compacted by a roller.

Use subtle temperature icons or thermal-color indicators to communicate:

Hot at delivery
Warm during placement
Cooling during compaction

Do not use exact temperatures unless intentionally added later by the website design.

Professional highway engineering style.
Natural daylight.
Dark asphalt.
Restrained orange and warm-red thermal accents.

No company logos.
No watermark.
No prominent people.
No excessive text.

Landscape 16:9.
1200 × 675.
```

---

## Image 31 — Asphalt vs Concrete Driveway Comparison

**Filename**

`asphalt-vs-concrete-driveway.webp`

**Alt text**

`Side-by-side comparison of a black asphalt driveway and a light concrete driveway at similar residential properties`

**Prompt**

```text
Create a professional split-screen construction comparison between asphalt and concrete driveways.

LEFT:
Realistic black asphalt driveway with fine aggregate texture.

RIGHT:
Realistic light-gray concrete driveway with subtle joints.

Use similar modest residential surroundings so the material difference is the main focus.

Include minimal technical labels:
Asphalt
Concrete

Clean daylight.
Professional home improvement and civil engineering aesthetic.

No luxury mansion styling.
No brand names.
No prominent people.
No watermark.

Landscape 16:9.
1200 × 675.
```

---

## Image 32 — Asphalt vs Gravel Driveway

**Filename**

`asphalt-vs-gravel-driveway.webp`

**Alt text**

`Side-by-side comparison of a paved asphalt driveway and a loose gravel driveway`

**Prompt**

```text
Create a realistic split-screen engineering comparison of asphalt and gravel driveways.

Show the same general driveway geometry on both sides.

LEFT:
Smooth compacted asphalt surface.

RIGHT:
Loose compacted gravel surface with visible crushed stone.

Keep surrounding landscaping simple and consistent.

Professional educational comparison style.
Natural daylight.
No logos.
No prominent people.
No watermark.
Minimal text.

Landscape 16:9.
1200 × 675.
```

---

## Image 33 — Asphalt Layers Explained Featured Image

**Filename**

`asphalt-pavement-layers-explained.webp`

**Alt text**

`Detailed pavement cutaway showing asphalt surface, binder, aggregate base and compacted subgrade layers`

**Prompt**

```text
Create a premium editorial civil engineering image explaining asphalt pavement layers.

Show a dramatic isometric cutaway of a road pavement.

Clearly distinguish:
surface course
binder course
aggregate base
sub-base
compacted subgrade

Use highly realistic asphalt, stone and soil textures.

Add only subtle technical callout lines.

Keep approximately 30% negative space for optional article title overlay.

Professional engineering publication aesthetic.

White-to-light-gray background.
Dark charcoal asphalt.
Natural aggregate tones.
Construction-yellow accents.

No people.
No logos.
No watermark.
No excessive text.

Landscape 1.91:1.
1200 × 630.
```

---

## Image 34 — Hot Mix Asphalt vs Warm Mix Asphalt

**Filename**

`hot-mix-vs-warm-mix-asphalt.webp`

**Alt text**

`Technical comparison of hot mix asphalt and warm mix asphalt production and paving concepts`

**Prompt**

```text
Create a professional split-screen asphalt engineering infographic comparing hot mix asphalt and warm mix asphalt.

LEFT:
Hot Mix Asphalt
Show a fresh dark asphalt mixture with stronger heat/steam cues.

RIGHT:
Warm Mix Asphalt
Show a similar asphalt mixture with reduced heat cues.

Keep the material visually similar while communicating different production-temperature concepts.

Use subtle thermometer icons without fake numerical values.

Clean industrial background.
Dark charcoal asphalt.
Restrained orange and blue-gray accents.

No branding.
No watermark.
No prominent people.
Minimal text.

Landscape 16:9.
1200 × 675.
```

---

## Image 35 — Porous Asphalt Illustration

**Filename**

`porous-asphalt-drainage.webp`

**Alt text**

`Porous asphalt cross-section showing water draining through interconnected voids into the aggregate base`

**Prompt**

```text
Create an accurate civil engineering illustration explaining porous asphalt drainage.

Show a clean cutaway of porous asphalt pavement.

Include:
porous asphalt surface
open-graded stone reservoir
underlying subgrade

Show rainwater passing vertically through interconnected voids in the asphalt and draining into the stone base.

Use subtle blue water arrows.

Professional sustainable drainage engineering aesthetic.

White/light-gray background.
Dark asphalt.
Natural stone.
Subtle blue and construction-yellow accents.

No people.
No logos.
No watermark.
Minimal text.

Landscape 16:9.
1200 × 675.
```

---

## Image 36 — Asphalt Core Sample / Laboratory Testing

**Filename**

`asphalt-core-sample-testing.webp`

**Alt text**

`Civil engineering asphalt core sample showing pavement thickness and internal aggregate structure for laboratory testing`

**Prompt**

```text
Create a realistic civil engineering laboratory illustration showing an asphalt core sample.

Show a cylindrical pavement core extracted from a road.

The core should clearly reveal asphalt texture and aggregate structure.

Include a precise ruler or caliper indicating sample thickness.

Add a subtle road cutout in the background showing where the core was extracted.

Professional pavement materials testing aesthetic.
Clean white laboratory-style background.
Dark asphalt charcoal.
Metallic gray measuring tools.
Construction-yellow detail accents.

No people.
No branding.
No watermark.

Landscape 16:9.
1200 × 675.
```

---

## Image 37 — Asphalt Calculator Formula Guide Featured Image

**Filename**

`asphalt-calculation-formulas-featured.webp`

**Alt text**

`Technical asphalt pavement diagram representing area, volume, density, tonnage and cost calculation formulas`

**Prompt**

```text
Create a premium featured editorial image for an article about asphalt calculation formulas.

Show a realistic isometric asphalt pavement slab with dimension arrows for length, width and thickness.

Surround it with subtle minimal engineering symbols representing:
area
volume
density
weight
tonnage
cost

Do not include long formula text.

Keep the right 35% relatively uncluttered for optional article title overlay.

Professional modern civil-engineering publication style.
Dark charcoal asphalt.
White-to-dark neutral background transition.
Construction-yellow accents.

No people.
No logos.
No watermark.

Landscape 1.91:1.
1200 × 630.
```

---

## Image 38 — Asphalt Calculator Units Conversion

**Filename**

`asphalt-units-conversion-guide.webp`

**Alt text**

`Engineering measurement graphic showing asphalt dimensions converted between metric and imperial units`

**Prompt**

```text
Create a clean technical infographic illustrating unit conversion for asphalt calculations.

Show one asphalt pavement block with dimension arrows.

Around it, display simple paired engineering units conceptually:

meters ↔ feet
millimeters ↔ inches
square meters ↔ square feet
cubic meters ↔ cubic yards
kilograms ↔ pounds
tonnes ↔ tons

Keep text very minimal and exact.

Professional engineering reference-card aesthetic.

White background.
Dark asphalt.
Blue-gray measurement graphics.
Construction-yellow accents.

No people.
No logos.
No watermark.

Landscape 16:9.
1200 × 675.
```

---

## Image 39 — Asphalt Quantity Ordering Workflow

**Filename**

`asphalt-ordering-quantity-workflow.webp`

**Alt text**

`Asphalt ordering workflow from site measurements through volume, tonnage, waste allowance and final truck quantity`

**Prompt**

```text
Create a professional construction planning infographic showing how asphalt quantity is ordered.

Use a clean left-to-right visual workflow:

Measure Site
→ Calculate Area
→ Calculate Volume
→ Convert to Tonnes
→ Add Waste Allowance
→ Order Asphalt

Use realistic technical icons and a small asphalt truck at the final stage.

Keep each stage visually simple.

Professional civil-engineering project planning aesthetic.
White/light-gray background.
Dark charcoal.
Construction-yellow accents.

No logos.
No people.
No watermark.
Minimal text.

Landscape 16:9.
1200 × 675.
```

---

## Image 40 — Road Crossfall / Slope Illustration

**Filename**

`asphalt-road-crossfall-slope.webp`

**Alt text**

`Road cross-section showing asphalt pavement crossfall and drainage slope from the centerline toward the road edge`

**Prompt**

```text
Create an accurate civil engineering diagram explaining road crossfall and pavement slope.

Show a transverse asphalt road cross-section.

Clearly show the road crown or cross slope draining toward both edges.

Use subtle engineering slope arrows.

Include the asphalt surface, base course and subgrade layers.

Professional highway design textbook aesthetic.

White background.
Dark asphalt.
Natural aggregate gray.
Blue drainage arrows.
Construction-yellow measurement accents.

No people.
No vehicles.
No logos.
No watermark.

Landscape 16:9.
1200 × 675.
```

---

# 4. Recommended Page-to-Image Mapping

| Page / Content Type | Primary Image |
|---|---|
| Homepage | `asphalt-calculator-homepage-hero.webp` |
| Asphalt Tonnage Calculator | `asphalt-tonnage-calculator-featured.webp` |
| Asphalt Volume Calculator | `asphalt-volume-calculator.webp` |
| Asphalt Weight Calculator | `asphalt-weight-calculator.webp` |
| Asphalt Cost Calculator | `asphalt-cost-calculator.webp` |
| Asphalt Driveway Calculator | `asphalt-driveway-calculator-featured.webp` |
| Asphalt Road Calculator | `asphalt-road-calculator-featured.webp` |
| Parking Lot Calculator | `asphalt-parking-lot-calculator.webp` |
| Pothole Repair Calculator | `pothole-repair-asphalt-calculation.webp` |
| Asphalt Milling Calculator | `asphalt-milling-calculator.webp` |
| Overlay Calculator | `asphalt-overlay-calculator.webp` |
| Tack Coat Calculator | `asphalt-tack-coat-rate-calculator.webp` |
| Prime Coat Calculator | `asphalt-prime-coat-calculator.webp` |
| Asphalt Density Calculator | `asphalt-density-comparison.webp` |
| Bitumen Percentage Calculator | `bitumen-percentage-calculator.webp` |
| Aggregate Calculator | `asphalt-aggregate-calculator.webp` |
| RAP / Recycled Asphalt | `recycled-asphalt-pavement-rap-process.webp` |
| Bitumen vs Asphalt Article | `bitumen-vs-asphalt-difference.webp` |
| Asphalt Mix Composition | `asphalt-mix-composition-bitumen-aggregate.webp` |
| Pavement Thickness Guide | `asphalt-pavement-thickness-comparison.webp` |
| Pavement Layers Guide | `asphalt-pavement-layers-explained.webp` |
| Porous Asphalt Guide | `porous-asphalt-drainage.webp` |
| Compaction Guide | `asphalt-compaction-roller-guide.webp` |
| Formula Guide | `asphalt-calculation-formulas-featured.webp` |
| Unit Conversion Guide | `asphalt-units-conversion-guide.webp` |

---

# 5. Image Naming Convention

Use:

```text
primary-keyword-secondary-context.webp
```

Good examples:

```text
asphalt-tonnage-calculator.webp
asphalt-density-comparison.webp
asphalt-driveway-cost-calculation.webp
bitumen-vs-asphalt-difference.webp
asphalt-pavement-thickness-comparison.webp
```

Avoid:

```text
image1.webp
new-image-final.webp
road-picture.webp
img-004.webp
bitumencalc-asphalt-asphalt-calculator-best-free-tool.webp
```

Do not stuff filenames with keywords.

---

# 6. Recommended WordPress / Website Image Metadata

For every important image, prepare:

- File name
- Alt text
- Optional title
- Optional caption
- Width
- Height
- WebP version

Example:

```yaml
filename: asphalt-tonnage-calculator-featured.webp
width: 1200
height: 630
alt: Fresh asphalt pavement with engineering measurement lines for length, width and thickness used in tonnage calculation
title: Asphalt Tonnage Calculator
caption: ""
loading: eager
fetchpriority: high
```

For below-the-fold images:

```yaml
loading: lazy
fetchpriority: auto
```

---

# 7. SEO and Performance Rules

## Do

- Use WebP by default.
- Keep original source image outside the production bundle if possible.
- Generate width/height variants for responsive layouts.
- Compress before deployment.
- Add explicit width and height attributes.
- Lazy-load below-the-fold diagrams.
- Keep the hero image high-priority.
- Use descriptive alt text only where the image conveys information.
- Use empty `alt=""` for purely decorative images.
- Place educational images close to the text they explain.
- Reuse an image only where its context genuinely matches.

## Avoid

- Uploading 1–3 MB PNG files directly.
- Repeating the same alt text on many pages.
- Stuffing “asphalt calculator” into every alt attribute.
- Putting large amounts of text inside generated images.
- Relying on image text instead of HTML text.
- Generating fake statistics or engineering values.
- Using unrealistic pavement layer proportions where accuracy matters.
- Using people or construction scenes when the diagram itself should be the primary subject.

---

# 8. Recommended Generation Order

## Phase 1 — Main calculator pages

1. Homepage Hero
2. Asphalt Tonnage Calculator
3. Asphalt Volume Calculator
4. Asphalt Weight Calculator
5. Asphalt Cost Calculator
6. Driveway Calculator
7. Road Calculator
8. Parking Lot Calculator

## Phase 2 — Specialized calculators

9. Pothole Repair Calculator
10. Asphalt Milling Calculator
11. Asphalt Overlay Calculator
12. Tack Coat Calculator
13. Prime Coat Calculator
14. Density Calculator
15. Bitumen Percentage Calculator
16. Aggregate Calculator

## Phase 3 — Educational / SEO content

17. Bitumen vs Asphalt
18. Asphalt Mix Composition
19. Asphalt Pavement Layers
20. Asphalt Thickness Comparison
21. Recycled Asphalt Pavement
22. Asphalt Compaction
23. Porous Asphalt
24. Asphalt Temperature
25. Asphalt Core Testing

## Phase 4 — Supporting SEO assets

26. Formula Guide Featured Image
27. Unit Conversion Guide
28. Waste Factor Guide
29. Asphalt Ordering Workflow
30. Road Crossfall / Slope
31. Asphalt vs Concrete
32. Asphalt vs Gravel
33. Hot Mix vs Warm Mix Asphalt

---

# 9. Final Consistency Prompt Add-On

Append this block to future BitumenCalc image prompts when visual consistency is important:

```text
BITUMENCALC VISUAL CONSISTENCY:

Use the established BitumenCalc visual language:
- premium professional civil-engineering publication aesthetic
- photorealistic asphalt and aggregate materials
- dark charcoal asphalt
- natural stone-gray aggregate
- warm brown compacted soil
- restrained construction-yellow/orange measurement accents
- white or light-neutral infographic backgrounds
- clean engineering dimension arrows
- sharp, realistic material textures
- minimal text
- generous negative space
- no logos
- no watermark
- no decorative clutter
- no prominent people
- technically plausible pavement geometry
- optimized composition for website WebP use
```

---

# 10. Master Prompt for Future BitumenCalc Images

Use this template whenever a new calculator or article is added:

```text
Create a premium technical illustration for BitumenCalc, a professional asphalt, bitumen and civil-engineering calculator website.

TOPIC:
[INSERT PAGE TOPIC]

PRIMARY VISUAL:
[INSERT THE MAIN ENGINEERING SUBJECT]

TECHNICAL ELEMENTS TO SHOW:
[INSERT DIMENSIONS, LAYERS, FORMULAS OR PROCESS]

STYLE:
Professional civil-engineering publication aesthetic.
Photorealistic construction materials combined with clean technical infographic elements.
Dark charcoal asphalt.
Natural aggregate gray.
Warm compacted-soil brown.
Restrained construction-yellow/orange engineering accents.
White or light-neutral background.

ACCURACY:
Keep pavement structure and proportions technically plausible.
Avoid invented engineering numbers unless explicitly provided.
Keep diagrams understandable without requiring large amounts of text.

COMPOSITION:
Landscape.
Generous negative space.
Main engineering subject must remain visually dominant.
Avoid clutter.

RESTRICTIONS:
No logos.
No watermark.
No unnecessary people.
No brand names.
No decorative filler.
No fake calculator interface.
No spelling mistakes.
Do not render long paragraphs inside the image.

OUTPUT:
1200 × 675 pixels for standard educational images
or
1200 × 630 pixels for featured/hero images.

The image should remain clear and visually strong after conversion to lightweight WebP.
```

---

# 11. Suggested Image Directory Structure

```text
/public/images/
├── calculators/
│   ├── asphalt-tonnage-calculator-featured.webp
│   ├── asphalt-volume-calculator.webp
│   ├── asphalt-weight-calculator.webp
│   ├── asphalt-cost-calculator.webp
│   ├── asphalt-driveway-calculator-featured.webp
│   ├── asphalt-road-calculator-featured.webp
│   ├── asphalt-parking-lot-calculator.webp
│   ├── pothole-repair-asphalt-calculation.webp
│   ├── asphalt-milling-calculator.webp
│   ├── asphalt-overlay-calculator.webp
│   ├── asphalt-tack-coat-rate-calculator.webp
│   ├── asphalt-prime-coat-calculator.webp
│   ├── asphalt-density-comparison.webp
│   ├── bitumen-percentage-calculator.webp
│   └── asphalt-aggregate-calculator.webp
│
├── guides/
│   ├── asphalt-pavement-layer-cross-section.webp
│   ├── asphalt-pavement-thickness-comparison.webp
│   ├── bitumen-vs-asphalt-difference.webp
│   ├── asphalt-mix-composition-bitumen-aggregate.webp
│   ├── recycled-asphalt-pavement-rap-process.webp
│   ├── asphalt-compaction-roller-guide.webp
│   ├── porous-asphalt-drainage.webp
│   ├── asphalt-temperature-paving-guide.webp
│   ├── asphalt-core-sample-testing.webp
│   └── asphalt-road-crossfall-slope.webp
│
├── featured/
│   ├── asphalt-calculator-homepage-hero.webp
│   ├── asphalt-tonnage-calculator-featured.webp
│   ├── asphalt-pavement-layers-explained.webp
│   └── asphalt-calculation-formulas-featured.webp
│
└── comparisons/
    ├── asphalt-vs-concrete-driveway.webp
    ├── asphalt-vs-gravel-driveway.webp
    └── hot-mix-vs-warm-mix-asphalt.webp
```

---

# 12. Implementation Checklist for Codex / Developer

For every image added to BitumenCalc:

- [ ] Generate image using the specified prompt.
- [ ] Inspect technical accuracy.
- [ ] Remove or regenerate images containing spelling errors.
- [ ] Resize to required dimensions.
- [ ] Convert to WebP.
- [ ] Compress to target file size.
- [ ] Use SEO-friendly filename.
- [ ] Add correct alt text.
- [ ] Add explicit `width` and `height`.
- [ ] Use responsive image sizes where possible.
- [ ] Use lazy loading below the fold.
- [ ] Do not lazy-load the main hero image.
- [ ] Keep image close to relevant HTML content.
- [ ] Add image to sitemap only if the framework/site setup supports and benefits from it.
- [ ] Test CLS and LCP after deployment.
- [ ] Confirm no generated text inside the image conflicts with actual page copy.
- [ ] Verify mobile crop does not remove important technical annotations.

---

# End of BitumenCalc Image Plan
