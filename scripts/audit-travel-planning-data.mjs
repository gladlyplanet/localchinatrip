import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const routeSource = fs.readFileSync(path.join(root, "lib", "travel-planning-routes.ts"), "utf8");
const editorialSource = fs.readFileSync(path.join(root, "lib", "travel-planning-editorial.ts"), "utf8");
const featuredSource = fs.readFileSync(path.join(root, "lib", "featured-travel-plans.ts"), "utf8");

const routeRows = [...routeSource.matchAll(/\{ id: "([^"]+)"[^\n]+stops: \[([^\]]*)\][^\n]+image:/g)].map((match) => ({
  id: match[1],
  stops: [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1])
}));

const editorialRows = new Map(
  [...editorialSource.matchAll(/^  "([^"]+)": \{\s*\n\s*daySpans: \[([^\]]*)\]/gm)].map((match) => [
    match[1],
    match[2].split(",").map((value) => Number(value.trim())).filter(Number.isFinite)
  ])
);

const logisticsSection = (editorialSource.split("const routeLogistics")[1] ?? "").split("export function getRouteEditorial")[0] ?? "";
const logisticsRows = new Set(
  [...logisticsSection.matchAll(/^  "([^"]+)": \{/gm)].map((match) => match[1])
);

const transferSection = editorialSource.split("const routeTransfers")[1] ?? "";
const transferRows = new Map(
  [...transferSection.matchAll(/^  "([^"]+)": \[([^\]]*)\]/gm)].map((match) => [
    match[1],
    [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1])
  ])
);

const problems = [];

const featuredPlans = [
  {
    id: "china-culture-7",
    images: ["culture-great-wall.jpg", "culture-suzhou-garden.jpg", "culture-tea-garden.jpg", "culture-shanghai-skyline.jpg"]
  },
  {
    id: "sanya-wellness-14",
    images: ["wellness-sanya-hotel.jpg", "wellness-medical-assessment.jpg", "wellness-taiji.jpg", "wellness-hotel-room.jpg", "wellness-hainan-food.jpg"]
  }
];

for (const plan of featuredPlans) {
  if (!featuredSource.includes(`id: "${plan.id}"`)) problems.push(`${plan.id}: missing featured plan data`);
  if (!featuredSource.includes(`"${plan.id}"`)) problems.push(`${plan.id}: missing featured plan id export`);
  for (const image of plan.images) {
    if (!featuredSource.includes(`image("${image}")`)) problems.push(`${plan.id}: image is not referenced: ${image}`);
    if (!fs.existsSync(path.join(root, "public", "images", "travel-planning", "featured", image))) problems.push(`${plan.id}: missing featured image: ${image}`);
  }
}
for (const route of routeRows) {
  const daySpans = editorialRows.get(route.id);
  const transfers = transferRows.get(route.id);
  const duration = Number(route.id.match(/-(\d+)$/)?.[1]);

  if (!daySpans) problems.push(`${route.id}: missing editorial day spans`);
  if (daySpans && daySpans.length !== route.stops.length) problems.push(`${route.id}: day spans do not match stops`);
  if (daySpans && daySpans.reduce((sum, days) => sum + days, 0) !== duration) problems.push(`${route.id}: day spans do not total ${duration}`);
  if (!transfers) problems.push(`${route.id}: missing transfer plan`);
  if (transfers && transfers.length !== Math.max(0, route.stops.length - 1)) problems.push(`${route.id}: transfer count does not connect every stop`);
  if (!logisticsRows.has(route.id)) problems.push(`${route.id}: missing arrival and departure guidance`);
  if (!fs.existsSync(path.join(root, "public", "images", "travel-planning", `${route.id}.jpg`))) problems.push(`${route.id}: missing route image`);
}

const routeIds = new Set(routeRows.map((route) => route.id));
for (const id of editorialRows.keys()) {
  if (!routeIds.has(id)) problems.push(`${id}: editorial exists without a route`);
}
for (const id of transferRows.keys()) {
  if (!routeIds.has(id)) problems.push(`${id}: transfer plan exists without a route`);
}
for (const id of logisticsRows) {
  if (!routeIds.has(id)) problems.push(`${id}: arrival and departure guidance exists without a route`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Travel planning audit passed: ${routeRows.length} inspiration routes and ${featuredPlans.length} featured plans; all images, day spans, transfer plans and arrival/departure guidance present.`);
}
