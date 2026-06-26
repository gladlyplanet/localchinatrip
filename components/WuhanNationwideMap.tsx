"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Geometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};

type Feature = {
  properties?: { adcode?: number };
  geometry: Geometry;
};

type Point = { x: number; y: number };

const routes = [
  { key: "urumqi", en: "Urumqi", zh: "乌鲁木齐", lon: 87.62, lat: 43.82, dx: -8, dy: -12 },
  { key: "harbin", en: "Harbin", zh: "哈尔滨", lon: 126.64, lat: 45.75, dx: 8, dy: -10 },
  { key: "beijing", en: "Beijing", zh: "北京", lon: 116.41, lat: 39.90, dx: 8, dy: -9 },
  { key: "shanghai", en: "Shanghai", zh: "上海", lon: 121.47, lat: 31.23, dx: 10, dy: 18 },
  { key: "guangzhou", en: "Guangzhou", zh: "广州", lon: 113.26, lat: 23.13, dx: 8, dy: 22 },
  { key: "kunming", en: "Kunming", zh: "昆明", lon: 102.83, lat: 24.88, dx: -48, dy: 20 },
  { key: "chengdu", en: "Chengdu", zh: "成都", lon: 104.07, lat: 30.67, dx: -48, dy: -10 },
  { key: "xian", en: "Xi'an", zh: "西安", lon: 108.94, lat: 34.34, dx: -36, dy: -10 }
];

function project(lon: number, lat: number): Point {
  return {
    x: ((lon - 72) / 64) * 1000,
    y: ((55 - lat) / 38) * 700
  };
}

function point([lon, lat]: number[]) {
  const projected = project(lon, lat);
  return `${projected.x.toFixed(1)},${projected.y.toFixed(1)}`;
}

function polygonPath(rings: number[][][]) {
  return rings
    .map((ring) => ring.map((coord, index) => `${index === 0 ? "M" : "L"}${point(coord)}`).join(" ") + " Z")
    .join(" ");
}

function geometryPath(geometry: Geometry) {
  if (geometry.type === "Polygon") return polygonPath(geometry.coordinates as number[][][]);
  return (geometry.coordinates as number[][][][]).map(polygonPath).join(" ");
}

function curvedRoute(start: Point, end: Point, index: number) {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const bend = index % 2 === 0 ? 0.11 : -0.11;
  return `M ${start.x} ${start.y} Q ${midX - dy * bend} ${midY + dx * bend} ${end.x} ${end.y}`;
}

export function WuhanNationwideMap({ title }: { title: string }) {
  const { lang } = useLanguage();
  const [features, setFeatures] = useState<Feature[]>([]);
  const wuhan = project(114.31, 30.59);
  const isChinese = lang === "zh-CN" || lang === "zh-TW";

  useEffect(() => {
    fetch("/data/china-provinces.json")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setFeatures(data.features ?? []))
      .catch(() => setFeatures([]));
  }, []);

  return (
    <div className="relative aspect-[10/7] overflow-hidden rounded-lg border border-white/15 bg-[#151713] shadow-soft">
      <svg viewBox="0 0 1000 700" className="h-full w-full" role="img" aria-label={title}>
        <defs>
          <marker id="nationwide-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10Z" fill="#d4b46e" />
          </marker>
          <filter id="route-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g>
          {features.map((feature, index) => (
            <path
              key={`${feature.properties?.adcode ?? "feature"}-${index}`}
              d={geometryPath(feature.geometry)}
              fill="#30352a"
              stroke="#75805f"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g fill="none" stroke="#d4b46e" strokeWidth="2.6" markerEnd="url(#nationwide-arrow)" filter="url(#route-glow)">
          {routes.map((route, index) => {
            const destination = project(route.lon, route.lat);
            return <path key={route.key} d={curvedRoute(wuhan, destination, index)} opacity="0.88" />;
          })}
        </g>

        <g>
          {routes.map((route) => {
            const destination = project(route.lon, route.lat);
            return (
              <g key={route.key}>
                <circle cx={destination.x} cy={destination.y} r="5.5" fill="#d4b46e" stroke="#151713" strokeWidth="2" />
                <text x={destination.x + route.dx} y={destination.y + route.dy} fill="#f5efe2" fontSize="15" fontWeight="650">
                  {isChinese ? route.zh : route.en}
                </text>
              </g>
            );
          })}
        </g>

        <circle cx={wuhan.x} cy={wuhan.y} r="11" fill="#d53a34" stroke="#fff" strokeWidth="3" />
        <circle cx={wuhan.x} cy={wuhan.y} r="20" fill="none" stroke="#d53a34" strokeWidth="2" opacity="0.55" />
        <text x={wuhan.x + 18} y={wuhan.y + 7} fill="#fff" fontSize="20" fontWeight="800">
          {isChinese ? "武汉" : "Wuhan"}
        </text>
      </svg>
    </div>
  );
}
