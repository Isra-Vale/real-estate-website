# Drop your images here

Add image files with these exact names and the site will automatically use
them instead of the generated placeholder art. Any common web image format
works (.jpg, .jpeg, .png, .webp) — just keep the base filename the same and
update the extension in `src/data/mockData.js` if you don't use .jpg.

If a file below is missing, that property/post/agent just keeps showing the
generated placeholder graphic — nothing breaks either way.

## Properties (recommended size: 1600×1200 or larger, landscape)

- oceanfront-villa.jpg
- tropical-island-estate.jpg
- grand-penthouse-suite.jpg
- modern-luxury-villa.jpg
- island-resort-estate.jpg
- countryside-manor.jpg

## Agents (recommended size: 800×1000 or larger, portrait)

- agent-sarah-mitchell.jpg
- agent-marcus-chen.jpg
- agent-isabelle-laurent.jpg

## Journal / blog posts (recommended size: 1200×800 or larger, landscape)

- blog-future-of-architecture.jpg
- blog-off-market-guide.jpg
- blog-coastal-investment.jpg
- blog-staging-secrets.jpg
- blog-historic-estates.jpg
- blog-smart-home.jpg

## Rentals (recommended size: 1200×900 or larger, landscape)

- rental-hamptons-summer-house.jpg
- rental-lake-como-villa.jpg
- rental-aspen-ski-chalet.jpg
- rental-miami-skyline-loft.jpg

## About page

- about-banner.jpg            (wide editorial banner, ~1920×900)
- about-discretion-1.jpg      (portrait, ~3:4 ratio)
- about-discretion-2.jpg      (portrait, ~3:4 ratio)

---

### Using different filenames or a CMS instead?

Open `src/data/mockData.js` and change the `image:` field on any record to
point wherever you like — it can be a local path like the ones above, or a
full URL to an image hosted elsewhere (e.g. a CDN or your CMS).
