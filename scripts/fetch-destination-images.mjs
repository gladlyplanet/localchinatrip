import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const outDir = path.join(root, "public/images/destinations");
const manifestPath = path.join(root, "public/data/destination-images.json");
const recommendationsSource = fs.readFileSync(path.join(root, "lib/province-recommendations.ts"), "utf8");
const destinationPhotoSource = fs.readFileSync(path.join(root, "components/DestinationPhoto.tsx"), "utf8");

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.dirname(manifestPath), { recursive: true });

const stockPattern = /alamy|shutterstock|watermark|dreamstime|istock|getty|depositphotos/i;
const badTitlePattern = /map|logo|icon|diagram|svg|locator|seal|flag|emblem|coat of arms|route|blank/i;

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function hash(value) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 10);
}

function extensionFromUrl(url) {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".png")) return ".png";
  if (clean.endsWith(".webp")) return ".webp";
  return ".jpg";
}

function parseRecommendations() {
  const blockPattern = /(?:^|\n)\s*"?([a-z-]+)"?:\s*\[([\s\S]*?)\n\s*\]/g;
  const recommendationPattern = /spot\("([^"]+)","([^"]+)","([^"]+)","([^"]+)","([^"]+)"\)/g;
  const items = [];
  for (const blockMatch of recommendationsSource.matchAll(blockPattern)) {
    const provinceSlug = blockMatch[1];
    for (const match of blockMatch[2].matchAll(recommendationPattern)) {
      items.push({ provinceSlug, name: match[1], nameZh: match[2], kind: match[3], focus: match[4], focusZh: match[5] });
    }
  }
  return items;
}

function parseAliases() {
  const aliases = {};
  const aliasBlockMatch = destinationPhotoSource.match(/const wikiTitleAliases:[\s\S]*?=\s*\{([\s\S]*?)\n\};/);
  if (!aliasBlockMatch) return aliases;
  for (const match of aliasBlockMatch[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) aliases[match[1]] = match[2];
  return aliases;
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(url, { headers: { "User-Agent": "LocalChinaTripImageAudit/1.0" }, signal: controller.signal });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function wikipediaImage(title) {
  const data = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
  const image = data?.originalimage?.source ?? data?.thumbnail?.source;
  if (typeof image === "string" && !stockPattern.test(image)) return image;
  return null;
}

async function commonsImage(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "12",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url|mime",
    iiurlwidth: "1400",
    format: "json",
    origin: "*"
  });
  const data = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
  const pages = Object.values(data?.query?.pages ?? {});
  for (const page of pages) {
    const title = page.title ?? "";
    const info = page.imageinfo?.[0];
    const url = info?.thumburl ?? info?.url;
    if (!url || stockPattern.test(url) || badTitlePattern.test(title)) continue;
    if (info?.mime && !String(info.mime).startsWith("image/")) continue;
    return url;
  }
  return null;
}

async function download(url, outputPath) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, { headers: { "User-Agent": "LocalChinaTripImageAudit/1.0" }, signal: controller.signal });
    if (!response.ok) throw new Error(`download failed ${response.status}`);
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) throw new Error(`not image: ${contentType}`);
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(arrayBuffer));
  } finally {
    clearTimeout(timeout);
  }
}

const existingManifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
const manifest = { ...existingManifest };
const aliases = parseAliases();
const items = parseRecommendations();
const failures = [];
const limit = Number(process.argv[2] ?? items.length);

let completed = 0;
let checked = 0;
for (const item of items) {
  if (checked >= limit) break;
  if (manifest[item.name] && fs.existsSync(path.join(root, manifest[item.name].replace(/^\//, "")))) continue;
  checked += 1;
  console.log(`CHECK ${item.provinceSlug}/${item.name}`);
  const title = aliases[item.name] ?? item.name;
  const queries = [
    title
  ];
  let imageUrl = null;
  for (const query of queries) {
    imageUrl = await wikipediaImage(query) ?? await commonsImage(query);
    if (imageUrl) break;
  }
  if (!imageUrl) {
    failures.push(`${item.provinceSlug}/${item.name}: no image`);
    continue;
  }
  const filename = `${item.provinceSlug}-${slugify(item.name)}-${hash(imageUrl)}${extensionFromUrl(imageUrl)}`;
  const outputPath = path.join(outDir, filename);
  try {
    await download(imageUrl, outputPath);
    manifest[item.name] = `/images/destinations/${filename}`;
    completed += 1;
    console.log(`OK ${completed}: ${item.provinceSlug}/${item.name}`);
  } catch (error) {
    failures.push(`${item.provinceSlug}/${item.name}: ${error.message}`);
  }
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ downloaded: completed, manifestEntries: Object.keys(manifest).length, failures: failures.slice(0, 60) }, null, 2));
if (failures.length > 0 && completed === 0) process.exit(1);
