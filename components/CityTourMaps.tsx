type Stop = {
  name: string;
  x: number;
  y: number;
};

type CityTourMap = {
  city: string;
  subtitle: string;
  pace: string;
  route: string;
  stops: Stop[];
  highlights: string[];
};

const maps: CityTourMap[] = [
  {
    city: "Beijing",
    subtitle: "Imperial axis, hutongs, and the Great Wall",
    pace: "3-4 days",
    route: "M70 235 C125 120 205 105 260 185 S385 260 448 116",
    stops: [
      { name: "Forbidden City", x: 78, y: 226 },
      { name: "Temple of Heaven", x: 166, y: 124 },
      { name: "Hutong Dinner", x: 260, y: 185 },
      { name: "Summer Palace", x: 356, y: 266 },
      { name: "Great Wall", x: 448, y: 116 }
    ],
    highlights: ["Sunrise wall walk", "Private courtyard meal", "Old city storytelling"]
  },
  {
    city: "Shanghai",
    subtitle: "Waterfront glamour, design, and neighborhood texture",
    pace: "2-3 days",
    route: "M64 214 C132 116 214 110 276 190 S380 266 452 128",
    stops: [
      { name: "The Bund", x: 64, y: 214 },
      { name: "Former French Concession", x: 154, y: 123 },
      { name: "Design Galleries", x: 276, y: 190 },
      { name: "Local Lilong", x: 374, y: 259 },
      { name: "Pudong Night View", x: 452, y: 128 }
    ],
    highlights: ["Art deco walk", "Contemporary galleries", "Evening skyline"]
  },
  {
    city: "Xi'an",
    subtitle: "Ancient capitals, city walls, and Silk Road echoes",
    pace: "2-3 days",
    route: "M72 118 C150 220 220 240 286 154 S398 92 450 218",
    stops: [
      { name: "City Wall", x: 72, y: 118 },
      { name: "Muslim Quarter", x: 166, y: 218 },
      { name: "Great Mosque", x: 286, y: 154 },
      { name: "Terracotta Army", x: 386, y: 96 },
      { name: "Tang Dinner", x: 450, y: 218 }
    ],
    highlights: ["Early museum entry", "Street food with context", "Dynasty history"]
  },
  {
    city: "Chengdu",
    subtitle: "Teahouses, Sichuan flavor, and relaxed city life",
    pace: "2-4 days",
    route: "M66 194 C122 104 214 95 260 178 S358 274 452 182",
    stops: [
      { name: "People's Park", x: 66, y: 194 },
      { name: "Old Teahouse", x: 154, y: 108 },
      { name: "Panda Base", x: 260, y: 178 },
      { name: "Sichuan Kitchen", x: 356, y: 268 },
      { name: "Kuanzhai Alleys", x: 452, y: 182 }
    ],
    highlights: ["Tea culture", "Market-to-table flavors", "Slow local rhythm"]
  },
  {
    city: "Hangzhou",
    subtitle: "West Lake, tea fields, and Song dynasty elegance",
    pace: "2-3 days",
    route: "M58 220 C116 112 198 88 256 162 S368 256 454 124",
    stops: [
      { name: "West Lake", x: 58, y: 220 },
      { name: "Lingyin Temple", x: 146, y: 116 },
      { name: "Longjing Tea Fields", x: 256, y: 162 },
      { name: "Craft Studio", x: 366, y: 254 },
      { name: "Lakeside Dinner", x: 454, y: 124 }
    ],
    highlights: ["Tea village morning", "Temple quiet hours", "Lakefront evening"]
  },
  {
    city: "Suzhou",
    subtitle: "Gardens, canals, silk, and literati aesthetics",
    pace: "1-2 days",
    route: "M70 148 C138 224 216 232 278 154 S382 86 450 196",
    stops: [
      { name: "Classical Garden", x: 70, y: 148 },
      { name: "Canal Walk", x: 166, y: 224 },
      { name: "Silk Workshop", x: 278, y: 154 },
      { name: "Pingjiang Road", x: 374, y: 92 },
      { name: "Private Tea", x: 450, y: 196 }
    ],
    highlights: ["Garden symbolism", "Canal photography", "Silk heritage"]
  },
  {
    city: "Guilin",
    subtitle: "Karst peaks, river light, and village landscapes",
    pace: "2-4 days",
    route: "M62 236 C126 108 208 94 274 164 S374 280 456 124",
    stops: [
      { name: "Guilin Arrival", x: 62, y: 236 },
      { name: "Li River", x: 154, y: 112 },
      { name: "Yangshuo", x: 274, y: 164 },
      { name: "Countryside Ride", x: 372, y: 276 },
      { name: "Karst Viewpoint", x: 456, y: 124 }
    ],
    highlights: ["Private river timing", "Village paths", "Landscape photography"]
  },
  {
    city: "Yunnan",
    subtitle: "Old towns, mountain roads, and minority cultures",
    pace: "5-8 days",
    route: "M58 134 C120 238 214 252 264 168 S366 86 456 210",
    stops: [
      { name: "Kunming", x: 58, y: 134 },
      { name: "Dali", x: 154, y: 232 },
      { name: "Shaxi", x: 264, y: 168 },
      { name: "Lijiang", x: 368, y: 92 },
      { name: "Snow Mountain", x: 456, y: 210 }
    ],
    highlights: ["Ancient tea route", "Boutique courtyard stays", "Mountain culture"]
  }
];

function RouteMap({ map }: { map: CityTourMap }) {
  const mapId = map.city.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <article className="overflow-hidden rounded-lg border hairline bg-charcoal shadow-soft">
      <div className="relative aspect-[4/3] bg-ink">
        <svg
          viewBox="0 0 520 360"
          role="img"
          aria-label={`${map.city} private tour map`}
          className="h-full w-full"
        >
          <defs>
            <radialGradient id={`${mapId}-glow`} cx="32%" cy="24%" r="74%">
              <stop offset="0%" stopColor="#C8A96A" stopOpacity="0.22" />
              <stop offset="54%" stopColor="#6F7C63" stopOpacity="0.11" />
              <stop offset="100%" stopColor="#060607" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${mapId}-route`} x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#F4EFE7" stopOpacity="0.92" />
              <stop offset="48%" stopColor="#C8A96A" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#8B2F2A" stopOpacity="0.9" />
            </linearGradient>
            <pattern id={`${mapId}-grid`} width="34" height="34" patternUnits="userSpaceOnUse">
              <path d="M 34 0 L 0 0 0 34" fill="none" stroke="#F4EFE7" strokeOpacity="0.05" />
            </pattern>
          </defs>

          <rect width="520" height="360" fill="#060607" />
          <rect width="520" height="360" fill={`url(#${mapId}-glow)`} />
          <rect width="520" height="360" fill={`url(#${mapId}-grid)`} />
          <path
            d="M38 292 C118 330 214 310 292 336 C384 364 442 304 492 328"
            fill="none"
            stroke="#F4EFE7"
            strokeOpacity="0.06"
            strokeWidth="24"
          />
          <path
            d="M28 74 C108 38 168 68 230 48 C330 16 404 60 492 30"
            fill="none"
            stroke="#F4EFE7"
            strokeOpacity="0.05"
            strokeWidth="18"
          />
          <path d={map.route} fill="none" stroke="#F4EFE7" strokeOpacity="0.1" strokeWidth="14" />
          <path
            d={map.route}
            fill="none"
            stroke={`url(#${mapId}-route)`}
            strokeLinecap="round"
            strokeWidth="4"
          />

          {map.stops.map((stop, index) => (
            <g key={stop.name}>
              <circle cx={stop.x} cy={stop.y} r="13" fill="#060607" stroke="#C8A96A" strokeWidth="2" />
              <circle cx={stop.x} cy={stop.y} r="4" fill="#F4EFE7" />
              <text
                x={stop.x}
                y={stop.y - 23}
                fill="#F4EFE7"
                fontFamily="Inter, Arial, sans-serif"
                fontSize="11"
                textAnchor="middle"
              >
                {String(index + 1).padStart(2, "0")}
              </text>
              <text
                x={stop.x}
                y={stop.y + 31}
                fill="#B9B3A8"
                fontFamily="Inter, Arial, sans-serif"
                fontSize="10"
                textAnchor="middle"
              >
                {stop.name}
              </text>
            </g>
          ))}

          <text x="32" y="46" fill="#F4EFE7" fontFamily="Georgia, serif" fontSize="28">
            {map.city}
          </text>
          <text x="34" y="70" fill="#C8A96A" fontFamily="Inter, Arial, sans-serif" fontSize="10" letterSpacing="3">
            PRIVATE TOUR MAP
          </text>
          <text x="430" y="46" fill="#B9B3A8" fontFamily="Inter, Arial, sans-serif" fontSize="12" textAnchor="end">
            {map.pace}
          </text>
        </svg>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-serif text-3xl text-bone">{map.city}</h3>
            <p className="mt-2 leading-7 text-mist">{map.subtitle}</p>
          </div>
          <span className="w-fit rounded-full border hairline px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gold">
            {map.pace}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {map.highlights.map((highlight) => (
            <span key={highlight} className="rounded-full bg-bone/8 px-3 py-2 text-xs text-bone/78">
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function CityTourMaps() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-[12px] uppercase tracking-[0.32em] text-gold">City tour maps</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-bone sm:text-6xl">
            Route sketches for the classic China plan.
          </h2>
          <p className="mt-6 text-lg leading-8 text-mist">
            Each map shows a refined private route: the main flow, key stops, and the mood of the day. They are designed as planning visuals, not rigid GPS maps.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {maps.map((map) => (
            <RouteMap key={map.city} map={map} />
          ))}
        </div>
      </div>
    </section>
  );
}
