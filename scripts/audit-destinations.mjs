import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const recommendationsSource = fs.readFileSync(path.join(root, "lib/province-recommendations.ts"), "utf8");
const enrichmentSource = fs.readFileSync(path.join(root, "lib/content-enrichment.ts"), "utf8");
const destinationPhotoSource = fs.readFileSync(path.join(root, "components/DestinationPhoto.tsx"), "utf8");
const provincesSource = fs.readFileSync(path.join(root, "lib/provinces.ts"), "utf8");

const mojibakePattern = /[鍠搴瑗閿俙�]/;
const stockPattern = /alamy|shutterstock|watermark|零食很忙|Discover Wuzhishan/i;
const genericImages = new Set([
  "/images/experience-beijing-hutong.jpg",
  "/images/experience-guilin-ride.jpg",
  "/images/real-night-market.jpg",
  "/images/experience-suzhou-craft.jpg",
  "/images/real-hero-hongcun.jpg",
  "/images/experience-chengdu-market.jpg",
  "/images/experience-longjing-tea.jpg"
]);

const provinces = [...provincesSource.matchAll(/\{\s*slug:"([^"]+)",name:"([^"]+)"/g)].map((match) => ({
  slug: match[1],
  name: match[2]
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
      focusZh: match[5]
    });
  }
}

const explicitImages = new Map();
const imageBlockMatch = enrichmentSource.match(/const verifiedRecommendationImages:[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
if (imageBlockMatch) {
  for (const match of imageBlockMatch[1].matchAll(/"([^"]+)":\s*([^,\n]+)/g)) {
    explicitImages.set(match[1], match[2].trim());
  }
}

const wikiAliases = new Set();
const aliasBlockMatch = destinationPhotoSource.match(/const wikiTitleAliases:[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
if (aliasBlockMatch) {
  for (const match of aliasBlockMatch[1].matchAll(/"([^"]+)":/g)) wikiAliases.add(match[1]);
}

const issues = [];

if (mojibakePattern.test(recommendationsSource + provincesSource)) issues.push("Found mojibake-like characters in destination data.");
if (stockPattern.test(recommendationsSource + enrichmentSource + destinationPhotoSource)) {
  const onlyFilterRule = /!\/alamy\|shutterstock\|watermark\/i\.test/.test(destinationPhotoSource);
  const withoutFilter = (recommendationsSource + enrichmentSource + destinationPhotoSource).replace(/!\/alamy\|shutterstock\|watermark\/i\.test\(value\)/g, "");
  if (stockPattern.test(withoutFilter) || !onlyFilterRule) issues.push("Found stock/watermark-like text outside the filter rule.");
}

for (const province of provinces) {
  const items = recommendations.filter((item) => item.provinceSlug === province.slug);
  if (items.length !== 9) issues.push(`${province.slug} has ${items.length} recommendation items, expected 9.`);
}

for (const item of recommendations) {
  if (!item.name || !item.nameZh || !item.focus || !item.focusZh) issues.push(`${item.provinceSlug}/${item.name} has an empty required field.`);
  if (item.focus.length < 24 || item.focusZh.length < 10) issues.push(`${item.provinceSlug}/${item.name} has a weak description.`);
  const hasExplicit = explicitImages.has(item.name);
  const hasAlias = wikiAliases.has(item.name);
  if (!hasExplicit && !hasAlias) issues.push(`${item.provinceSlug}/${item.name} has no explicit image and no wiki alias.`);
  const explicit = explicitImages.get(item.name) ?? "";
  if ([...genericImages].some((image) => explicit.includes(image))) issues.push(`${item.provinceSlug}/${item.name} maps to a generic image: ${explicit}`);
}

const duplicateNames = recommendations
  .map((item) => item.name)
  .filter((name, index, list) => list.indexOf(name) !== index);
if (duplicateNames.length > 0) issues.push(`Duplicate destination names: ${[...new Set(duplicateNames)].join(", ")}`);

console.log(JSON.stringify({
  provinces: provinces.length,
  recommendations: recommendations.length,
  explicitImages: [...explicitImages.keys()].filter((name) => recommendations.some((item) => item.name === name)).length,
  wikiAliases: [...wikiAliases].filter((name) => recommendations.some((item) => item.name === name)).length,
  issues
}, null, 2));

if (issues.length > 0) process.exit(1);
