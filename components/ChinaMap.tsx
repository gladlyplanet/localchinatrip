"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { getProvinceName, provinces } from "@/lib/provinces";

type Geometry = { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] };
type Feature = { properties?: { adcode?: number }; geometry: Geometry };
const adcodeToSlug: Record<string, string> = {"110000":"beijing","120000":"tianjin","130000":"hebei","140000":"shanxi","150000":"inner-mongolia","210000":"liaoning","220000":"jilin","230000":"heilongjiang","310000":"shanghai","320000":"jiangsu","330000":"zhejiang","340000":"anhui","350000":"fujian","360000":"jiangxi","370000":"shandong","410000":"henan","420000":"hubei","430000":"hunan","440000":"guangdong","450000":"guangxi","460000":"hainan","500000":"chongqing","510000":"sichuan","520000":"guizhou","530000":"yunnan","540000":"tibet","610000":"shaanxi","620000":"gansu","630000":"qinghai","640000":"ningxia","650000":"xinjiang","810000":"hong-kong","820000":"macau"};
function point([lon, lat]: number[]) { return `${(((lon - 72) / 64) * 1000).toFixed(1)},${(((55 - lat) / 38) * 700).toFixed(1)}`; }
function polygonPath(rings: number[][][]) { return rings.map((ring) => ring.map((coord, index) => `${index === 0 ? "M" : "L"}${point(coord)}`).join(" ") + " Z").join(" "); }
function geometryPath(geometry: Geometry) { return geometry.type === "Polygon" ? polygonPath(geometry.coordinates as number[][][]) : (geometry.coordinates as number[][][][]).map(polygonPath).join(" "); }

export function ChinaMap() {
  const { lang } = useLanguage();
  const [features, setFeatures] = useState<Feature[] | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => { fetch("/data/china-provinces.json").then((r) => r.ok ? r.json() : Promise.reject()).then((data) => setFeatures(data.features ?? null)).catch(() => setFeatures(null)); }, []);
  const updateTooltip = (event: React.MouseEvent, slug: string) => {
    const rect = container.current?.getBoundingClientRect();
    if (rect) setTooltip({ name: getProvinceName(slug, lang), x: event.clientX - rect.left, y: event.clientY - rect.top });
  };
  if (features) return (
    <div ref={container} className="relative mx-auto aspect-[10/7] w-full max-w-5xl overflow-hidden rounded-lg border hairline bg-[#e9ddc4] p-3 shadow-card">
      <svg viewBox="0 0 1000 700" className="h-full w-full" role="img" aria-label="Clickable map of China">
        {features.map((feature, index) => {
          const slug = adcodeToSlug[String(feature.properties?.adcode ?? "")];
          if (!slug) return null;
          const name = getProvinceName(slug, lang);
          return <path key={`${slug}-${index}`} data-province={slug} d={geometryPath(feature.geometry)} role="link" tabIndex={0} aria-label={name} onClick={() => window.location.assign(`/destinations/${slug}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") window.location.assign(`/destinations/${slug}`); }} onMouseEnter={(e) => updateTooltip(e, slug)} onMouseMove={(e) => updateTooltip(e, slug)} onMouseLeave={() => setTooltip(null)} onFocus={() => setTooltip({ name, x: 500, y: 70 })} onBlur={() => setTooltip(null)} className="cursor-pointer fill-[#d7c49b] stroke-cream stroke-[1.5] transition duration-200 hover:fill-moss focus:fill-moss focus:outline-none" vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      {tooltip && <div className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[120%] rounded-md bg-ink px-3 py-2 text-sm font-semibold text-cream shadow-soft" style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.name}</div>}
    </div>
  );
  return <div className="relative mx-auto aspect-[10/7] w-full max-w-5xl rounded-lg border hairline bg-[#e9ddc4]">{provinces.map((p) => <Link key={p.slug} href={`/destinations/${p.slug}`} style={{ left:`${p.x}%`,top:`${p.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-moss px-2 py-1 text-xs font-bold text-cream">{getProvinceName(p.slug, lang)}</Link>)}</div>;
}
