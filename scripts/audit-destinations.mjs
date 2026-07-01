import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const recommendationsSource = fs.readFileSync(path.join(root, "lib/province-recommendations.ts"), "utf8");
const enrichmentSource = fs.readFileSync(path.join(root, "lib/content-enrichment.ts"), "utf8");
const provincesSource = fs.readFileSync(path.join(root, "lib/provinces.ts"), "utf8");
const destinationPhotoSource = fs.readFileSync(path.join(root, "components/DestinationPhoto.tsx"), "utf8");

const issues = [];
const httpPattern = /https?:\/\//;
const stockPattern = /alamy|shutterstock|watermark/i;

const provinces = [...provincesSource.matchAll(/\{\s*slug:"([^"]+)",name:"([^"]+)"/g)].map((match) => ({
  slug: match[1],
  name: match[2],
}));

const provinceBlocks = new Map();
const blockPattern = /(?:^|\n)\s*"?([a-z-]+)"?:\s*\[([\s\S]*?)\n\s*\]/g;
for (const match of recommendationsSource.matchAll(blockPattern)) {
  provinceBlocks.set(match[1], match[2]);
}

const recommendationPattern = /spot\("([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"\)/g;
const recommendations = [];
for (const [slug, block] of provinceBlocks) {
  for (const match of block.matchAll(recommendationPattern)) {
    recommendations.push({
      provinceSlug: slug,
      name: match[1],
      nameZh: match[2],
      kind: match[3],
      focus: match[4],
      focusZh: match[5],
    });
  }
}

if (httpPattern.test(enrichmentSource + destinationPhotoSource)) {
  issues.push("Destination image code still contains external http image logic.");
}

if (stockPattern.test(enrichmentSource + destinationPhotoSource + recommendationsSource)) {
  issues.push("Destination data still contains stock or watermark image references.");
}

for (const province of provinces) {
  const items = recommendations.filter((item) => item.provinceSlug === province.slug);
  if (items.length !== 9) issues.push(`${province.slug} has ${items.length} recommendation items, expected 9.`);
}

for (const item of recommendations) {
  if (!item.name || !item.nameZh || !item.focus || !item.focusZh) {
    issues.push(`${item.provinceSlug}/${item.name} has an empty required field.`);
  }
  if (item.focus.length < 20 || item.focusZh.length < 8) {
    issues.push(`${item.provinceSlug}/${item.name} has a weak description.`);
  }
}

const localImageMatches = [...enrichmentSource.matchAll(/["'](\/images\/[^"']+)["']/g)];
const localImages = [...new Set(localImageMatches.map((match) => match[1]))];
for (const image of localImages) {
  const cleanPath = image.split("?")[0];
  const filePath = path.join(root, "public", cleanPath);
  if (!fs.existsSync(filePath)) {
    issues.push(`Missing local image file: ${image}`);
  }
}

const duplicateNames = recommendations
  .map((item) => item.name)
  .filter((name, index, list) => list.indexOf(name) !== index);
if (duplicateNames.length > 0) issues.push(`Duplicate destination names: ${[...new Set(duplicateNames)].join(", ")}`);

console.log(JSON.stringify({
  provinces: provinces.length,
  recommendations: recommendations.length,
  localImages: localImages.length,
  issues,
}, null, 2));

if (issues.length > 0) process.exit(1);
