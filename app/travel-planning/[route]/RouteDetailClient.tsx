"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import {
  getCityName,
  getRouteFlow,
  getRouteName,
  travelRoutes,
  type Interest,
  type Pace,
  type Season
} from "@/lib/travel-planning-routes";
import {
  getCityEditorial,
  getEditorialText,
  getRouteEditorial,
  getRouteLogistics,
  getRouteTransfers,
  type TransferMode
} from "@/lib/travel-planning-editorial";

type Copy = {
  back: string;
  eyebrow: string;
  dayUnit: string;
  routeSummary: (flow: string, days: number) => string;
  flexible: string;
  duration: string;
  season: string;
  pace: string;
  interestsTitle: string;
  itineraryTitle: string;
  itineraryIntro: string;
  logisticsTitle: string;
  logisticsFallback: (first: string, last: string) => string;
  day: string;
  days: string;
  stopText: (city: string) => string;
  whyTitle: string;
  whyBody: (count: number) => string;
  adjustTitle: string;
  adjustBody: string;
  contact: string;
  seasons: Record<Season, string>;
  paces: Record<Pace, string>;
  interests: Record<Interest, string>;
};

const copy: Record<Lang, Copy> = {
  en: {
    back: "All route ideas",
    eyebrow: "FLEXIBLE ROUTE IDEA",
    dayUnit: "days",
    routeSummary: (flow, days) => `${days} days connecting ${flow}, with time reserved for local streets, food and unhurried discoveries.`,
    flexible: "This is a planning framework, not a fixed group tour. Stops, transport and daily pace can all be changed.",
    duration: "Duration",
    season: "Best season",
    pace: "Travel pace",
    interestsTitle: "Main interests",
    itineraryTitle: "Suggested route rhythm",
    itineraryIntro: "The day ranges below show a comfortable starting rhythm. Exact trains, flights and driving time are arranged after your dates are confirmed.",
    logisticsTitle: "Arrival and departure",
    logisticsFallback: (first, last) => `Enter through ${first} and leave from ${last}. Exact airports, stations and transfer time are confirmed after the travel dates are known.`,
    day: "Day",
    days: "Days",
    stopText: (city) => `Use ${city} as a real base, with time for its defining sights and everyday neighborhoods.`,
    whyTitle: "Why this route works",
    whyBody: (count) => `The route limits itself to ${count} main stops so travel time does not consume the experience. Longer stays can be added where your interests are strongest.`,
    adjustTitle: "Build your version of this route",
    adjustBody: "Tell me your dates, preferred pace, must-see places and what you would rather skip. I will prepare a free first version for us to review together.",
    contact: "Start with this route",
    seasons: { allYear: "All year", springAutumn: "Spring / autumn", summerAutumn: "Summer / autumn", winter: "Winter" },
    paces: { easy: "Easy", balanced: "Balanced", active: "Active" },
    interests: { history: "History", food: "Food & local life", nature: "Nature", village: "Villages", craft: "Crafts", city: "City life", firstTrip: "First China trip" }
  },
  "zh-CN": {
    back: "返回全部路线",
    eyebrow: "可调整的路线参考",
    dayUnit: "天",
    routeSummary: (flow, days) => `${days} 天串联 ${flow}，在主要地点之间留出时间体验街巷、饮食和真实的本地日常。`,
    flexible: "这是一条用于沟通的路线框架，不是固定旅行团。目的地、交通方式和每天的强度都可以调整。",
    duration: "旅行天数",
    season: "推荐季节",
    pace: "旅行强度",
    interestsTitle: "主要体验",
    itineraryTitle: "建议路线节奏",
    itineraryIntro: "下面的停留天数是一版舒适的起点。确认日期后，再根据高铁、航班和用车时间细化每天安排。",
    logisticsTitle: "抵达与离开",
    logisticsFallback: (first, last) => `经${first}进入，从${last}离开。确认日期后再核对具体机场、车站和接驳时间。`,
    day: "第",
    days: "天",
    stopText: (city) => `以${city}为真实停留点，不只看代表景点，也为街区和本地生活保留时间。`,
    whyTitle: "这条路线为什么合理",
    whyBody: (count) => `全程控制在 ${count} 个主要停留点，避免把大量时间消耗在赶路上。你更感兴趣的地点可以增加停留。`,
    adjustTitle: "把它改成你的路线",
    adjustBody: "告诉我日期、喜欢的节奏、一定想去和不想去的地方，我会先免费整理一版方案，再和你一起核对。",
    contact: "从这条路线开始沟通",
    seasons: { allYear: "全年", springAutumn: "春秋", summerAutumn: "夏秋", winter: "冬季" },
    paces: { easy: "舒缓", balanced: "适中", active: "充实" },
    interests: { history: "历史文化", food: "美食生活", nature: "自然山水", village: "村落", craft: "手工艺", city: "城市生活", firstTrip: "第一次来中国" }
  },
  "zh-TW": {
    back: "返回全部路線",
    eyebrow: "可調整的路線參考",
    dayUnit: "天",
    routeSummary: (flow, days) => `${days} 天串聯 ${flow}，在主要地點之間留出時間體驗街巷、飲食和真實的在地日常。`,
    flexible: "這是一條用於溝通的路線框架，不是固定旅行團。目的地、交通方式和每天的強度都可以調整。",
    duration: "旅行天數",
    season: "推薦季節",
    pace: "旅行強度",
    interestsTitle: "主要體驗",
    itineraryTitle: "建議路線節奏",
    itineraryIntro: "下面的停留天數是一版舒適的起點。確認日期後，再依照高鐵、航班和用車時間細化每天安排。",
    logisticsTitle: "抵達與離開",
    logisticsFallback: (first, last) => `經${first}進入，從${last}離開。確認日期後再核對具體機場、車站和接駁時間。`,
    day: "第",
    days: "天",
    stopText: (city) => `以${city}為真實停留點，不只看代表景點，也為街區和在地生活保留時間。`,
    whyTitle: "這條路線為什麼合理",
    whyBody: (count) => `全程控制在 ${count} 個主要停留點，避免把大量時間消耗在趕路上。你更感興趣的地點可以增加停留。`,
    adjustTitle: "把它改成你的路線",
    adjustBody: "告訴我日期、喜歡的節奏、一定想去和不想去的地方，我會先免費整理一版方案，再和你一起核對。",
    contact: "從這條路線開始溝通",
    seasons: { allYear: "全年", springAutumn: "春秋", summerAutumn: "夏秋", winter: "冬季" },
    paces: { easy: "舒緩", balanced: "適中", active: "充實" },
    interests: { history: "歷史文化", food: "美食生活", nature: "自然山水", village: "村落", craft: "手工藝", city: "城市生活", firstTrip: "第一次來中國" }
  },
  es: {
    back: "Todas las rutas",
    eyebrow: "IDEA DE RUTA FLEXIBLE",
    dayUnit: "días",
    routeSummary: (flow, days) => `${days} días conectando ${flow}, con tiempo para calles locales, comida y descubrimientos sin prisa.`,
    flexible: "Es una base de planificación, no un circuito fijo. Se pueden cambiar paradas, transporte y ritmo diario.",
    duration: "Duración",
    season: "Mejor época",
    pace: "Ritmo",
    interestsTitle: "Intereses principales",
    itineraryTitle: "Ritmo sugerido",
    itineraryIntro: "Estos rangos son un punto de partida cómodo. Trenes, vuelos y traslados se concretan al confirmar las fechas.",
    logisticsTitle: "Llegada y salida",
    logisticsFallback: (first, last) => `La ruta entra por ${first} y sale desde ${last}. Aeropuertos, estaciones y traslados se confirman al conocer las fechas.`,
    day: "Día",
    days: "Días",
    stopText: (city) => `Usa ${city} como base real, con tiempo para sus lugares esenciales y barrios cotidianos.`,
    whyTitle: "Por qué funciona",
    whyBody: (count) => `La ruta se limita a ${count} paradas principales para que los traslados no se coman la experiencia. Podemos ampliar tus lugares favoritos.`,
    adjustTitle: "Crea tu versión",
    adjustBody: "Cuéntame fechas, ritmo, imprescindibles y lo que prefieres evitar. Prepararé una primera versión gratuita para revisarla juntos.",
    contact: "Empezar con esta ruta",
    seasons: { allYear: "Todo el año", springAutumn: "Primavera / otoño", summerAutumn: "Verano / otoño", winter: "Invierno" },
    paces: { easy: "Tranquilo", balanced: "Equilibrado", active: "Activo" },
    interests: { history: "Historia", food: "Comida y vida local", nature: "Naturaleza", village: "Pueblos", craft: "Artesanía", city: "Vida urbana", firstTrip: "Primer viaje a China" }
  },
  pt: {
    back: "Todos os roteiros",
    eyebrow: "IDEIA DE ROTEIRO FLEXÍVEL",
    dayUnit: "dias",
    routeSummary: (flow, days) => `${days} dias ligando ${flow}, com tempo para ruas locais, comida e descobertas sem pressa.`,
    flexible: "É uma base de planejamento, não uma excursão fixa. Paradas, transporte e ritmo diário podem mudar.",
    duration: "Duração",
    season: "Melhor época",
    pace: "Ritmo",
    interestsTitle: "Interesses principais",
    itineraryTitle: "Ritmo sugerido",
    itineraryIntro: "Estes períodos são um ponto de partida confortável. Trens, voos e traslados são definidos após confirmar as datas.",
    logisticsTitle: "Chegada e saída",
    logisticsFallback: (first, last) => `O roteiro entra por ${first} e termina em ${last}. Aeroportos, estações e traslados são confirmados após definir as datas.`,
    day: "Dia",
    days: "Dias",
    stopText: (city) => `Use ${city} como base real, com tempo para os pontos essenciais e os bairros do cotidiano.`,
    whyTitle: "Por que funciona",
    whyBody: (count) => `O roteiro fica em ${count} paradas principais para que deslocamentos não consumam a experiência. Podemos ampliar seus lugares favoritos.`,
    adjustTitle: "Crie sua versão",
    adjustBody: "Conte datas, ritmo, lugares indispensáveis e o que prefere evitar. Prepararei uma primeira versão gratuita para revisarmos juntos.",
    contact: "Começar com este roteiro",
    seasons: { allYear: "Ano inteiro", springAutumn: "Primavera / outono", summerAutumn: "Verão / outono", winter: "Inverno" },
    paces: { easy: "Tranquilo", balanced: "Equilibrado", active: "Ativo" },
    interests: { history: "História", food: "Comida e vida local", nature: "Natureza", village: "Vilarejos", craft: "Artesanato", city: "Vida urbana", firstTrip: "Primeira viagem à China" }
  },
  ar: {
    back: "كل أفكار المسارات",
    eyebrow: "فكرة مسار مرنة",
    dayUnit: "أيام",
    routeSummary: (flow, days) => `${days} أيام تربط ${flow}، مع وقت للشوارع المحلية والطعام والاكتشاف الهادئ.`,
    flexible: "هذا إطار للتخطيط وليس جولة جماعية ثابتة. يمكن تغيير المحطات والنقل وإيقاع كل يوم.",
    duration: "المدة",
    season: "أفضل موسم",
    pace: "إيقاع الرحلة",
    interestsTitle: "الاهتمامات الرئيسية",
    itineraryTitle: "إيقاع المسار المقترح",
    itineraryIntro: "فترات الإقامة أدناه نقطة بداية مريحة. نحدد القطارات والرحلات والقيادة بعد تأكيد التواريخ.",
    logisticsTitle: "الوصول والمغادرة",
    logisticsFallback: (first, last) => `يبدأ المسار عبر ${first} وينتهي في ${last}. نؤكد المطارات والمحطات ووقت النقل بعد تحديد التواريخ.`,
    day: "اليوم",
    days: "الأيام",
    stopText: (city) => `اجعل ${city} محطة إقامة حقيقية مع وقت لمعالمها الأساسية وأحيائها اليومية.`,
    whyTitle: "لماذا يعمل هذا المسار",
    whyBody: (count) => `يقتصر المسار على ${count} محطات رئيسية حتى لا يستهلك التنقل التجربة. ويمكن زيادة الوقت في الأماكن الأهم لك.`,
    adjustTitle: "اصنع نسختك من المسار",
    adjustBody: "أخبرني بالتواريخ والإيقاع والأماكن الضرورية وما تفضل تجنبه. سأعد نسخة أولى مجانية لنراجعها معا.",
    contact: "ابدأ بهذا المسار",
    seasons: { allYear: "طوال العام", springAutumn: "الربيع / الخريف", summerAutumn: "الصيف / الخريف", winter: "الشتاء" },
    paces: { easy: "هادئ", balanced: "متوازن", active: "نشيط" },
    interests: { history: "التاريخ", food: "الطعام والحياة المحلية", nature: "الطبيعة", village: "القرى", craft: "الحرف", city: "حياة المدن", firstTrip: "الزيارة الأولى للصين" }
  }
};

const transferCopy: Record<Lang, { next: string; modes: Record<TransferMode, string> }> = {
  en: {
    next: "Continue to",
    modes: {
      rail: "High-speed rail",
      privateCar: "Private car",
      railOrCar: "Rail or private car",
      boatOrCar: "Li River cruise or private car",
      railAndCar: "High-speed rail and local car",
      carAndRail: "Private car and high-speed rail",
      flight: "Flight",
      flightOrRail: "Flight or high-speed rail",
      overnightRailOrFlight: "Overnight rail or flight"
    }
  },
  "zh-CN": {
    next: "下一站",
    modes: {
      rail: "高铁",
      privateCar: "私人用车",
      railOrCar: "城际铁路或私人用车",
      boatOrCar: "漓江游船或私人用车",
      railAndCar: "高铁衔接当地用车",
      carAndRail: "私人用车衔接高铁",
      flight: "航班",
      flightOrRail: "航班或高铁",
      overnightRailOrFlight: "夜间列车或航班"
    }
  },
  "zh-TW": {
    next: "下一站",
    modes: {
      rail: "高鐵",
      privateCar: "私人用車",
      railOrCar: "城際鐵路或私人用車",
      boatOrCar: "灕江遊船或私人用車",
      railAndCar: "高鐵銜接當地用車",
      carAndRail: "私人用車銜接高鐵",
      flight: "航班",
      flightOrRail: "航班或高鐵",
      overnightRailOrFlight: "夜間列車或航班"
    }
  },
  es: {
    next: "Siguiente parada",
    modes: {
      rail: "Tren de alta velocidad",
      privateCar: "Coche privado",
      railOrCar: "Tren o coche privado",
      boatOrCar: "Crucero por el río Li o coche privado",
      railAndCar: "Tren de alta velocidad y coche local",
      carAndRail: "Coche privado y tren de alta velocidad",
      flight: "Vuelo",
      flightOrRail: "Vuelo o tren de alta velocidad",
      overnightRailOrFlight: "Tren nocturno o vuelo"
    }
  },
  pt: {
    next: "Próxima parada",
    modes: {
      rail: "Trem de alta velocidade",
      privateCar: "Carro privado",
      railOrCar: "Trem ou carro privado",
      boatOrCar: "Cruzeiro pelo rio Li ou carro privado",
      railAndCar: "Trem de alta velocidade e carro local",
      carAndRail: "Carro privado e trem de alta velocidade",
      flight: "Voo",
      flightOrRail: "Voo ou trem de alta velocidade",
      overnightRailOrFlight: "Trem noturno ou voo"
    }
  },
  ar: {
    next: "المحطة التالية",
    modes: {
      rail: "قطار فائق السرعة",
      privateCar: "سيارة خاصة",
      railOrCar: "قطار أو سيارة خاصة",
      boatOrCar: "رحلة نهر لي أو سيارة خاصة",
      railAndCar: "قطار فائق السرعة ثم سيارة محلية",
      carAndRail: "سيارة خاصة ثم قطار فائق السرعة",
      flight: "رحلة جوية",
      flightOrRail: "رحلة جوية أو قطار فائق السرعة",
      overnightRailOrFlight: "قطار ليلي أو رحلة جوية"
    }
  }
};

function dayRanges(duration: number, stops: number, spans?: number[]) {
  const validSpans = spans?.length === stops && spans.reduce((total, value) => total + value, 0) === duration
    ? spans
    : null;
  const base = Math.floor(duration / stops);
  const remainder = duration % stops;
  let cursor = 1;
  return Array.from({ length: stops }, (_, index) => {
    const count = validSpans?.[index] ?? base + (index < remainder ? 1 : 0);
    const start = cursor;
    const end = cursor + count - 1;
    cursor = end + 1;
    return { start, end };
  });
}

export function RouteDetailClient({ routeId }: { routeId: string }) {
  const { lang, dir } = useLanguage();
  const t = copy[lang];
  const route = travelRoutes.find((item) => item.id === routeId);

  if (!route) return null;

  const flow = getRouteFlow(route, lang);
  const title = getRouteName(route, lang, t.dayUnit);
  const editorial = getRouteEditorial(route.id);
  const ranges = dayRanges(route.duration, route.stops.length, editorial?.daySpans);
  const transfers = getRouteTransfers(route.id);
  const routeSummary = editorial && (lang === "en" || lang === "zh-CN" || lang === "zh-TW")
    ? getEditorialText(editorial.summary, lang)
    : t.routeSummary(flow, route.duration);
  const whyBody = editorial && (lang === "en" || lang === "zh-CN" || lang === "zh-TW")
    ? getEditorialText(editorial.why, lang)
    : t.whyBody(route.stops.length);
  const firstCity = getCityName(route.stops[0], lang);
  const lastCity = getCityName(route.stops[route.stops.length - 1], lang);
  const logisticsBody = lang === "en" || lang === "zh-CN" || lang === "zh-TW"
    ? getRouteLogistics(route.id, lang) ?? t.logisticsFallback(firstCity, lastCity)
    : t.logisticsFallback(firstCity, lastCity);

  return (
    <>
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20" dir={dir}>
        <section className="paper-texture px-5 py-9 sm:px-8 lg:px-24 lg:py-14">
          <div className="mx-auto max-w-[1488px]">
            <Link href="/travel-planning" className="inline-flex min-h-11 items-center text-sm font-semibold text-moss hover:text-ink">
              <span className="me-2" aria-hidden="true">←</span>{t.back}
            </Link>
            <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="min-w-0">
                <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.eyebrow}</p>
                <h1 className="safe-wrap mt-5 font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl">{title}</h1>
                <p className="safe-wrap mt-6 max-w-2xl text-lg leading-8 text-mist">{routeSummary}</p>
                <p className="safe-wrap mt-5 border-s-2 border-gold ps-4 text-sm leading-6 text-moss">{t.flexible}</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-bone shadow-card">
                <Image src={route.image} alt={title} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y hairline bg-white px-5 py-8 sm:px-8 lg:px-24">
          <div className="mx-auto grid max-w-[1488px] gap-6 sm:grid-cols-3">
            <div className="border-t border-gold/50 pt-4"><p className="text-xs font-semibold uppercase text-mist">{t.duration}</p><p className="safe-wrap mt-2 font-serif text-2xl">{route.duration} {t.dayUnit}</p></div>
            <div className="border-t border-gold/50 pt-4"><p className="text-xs font-semibold uppercase text-mist">{t.season}</p><p className="safe-wrap mt-2 font-serif text-2xl">{t.seasons[route.season]}</p></div>
            <div className="border-t border-gold/50 pt-4"><p className="text-xs font-semibold uppercase text-mist">{t.pace}</p><p className="safe-wrap mt-2 font-serif text-2xl">{t.paces[route.pace]}</p></div>
          </div>
        </section>

        <section className="paper-texture px-5 py-16 sm:px-8 lg:px-24 lg:py-24">
          <div className="mx-auto grid max-w-[1488px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="min-w-0">
              <h2 className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">{t.itineraryTitle}</h2>
              <p className="safe-wrap mt-5 leading-7 text-mist">{t.itineraryIntro}</p>
              <p className="safe-wrap mt-8 text-sm font-semibold text-moss">{t.interestsTitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {route.interests.map((item) => <span key={item} className="rounded border hairline bg-white px-3 py-2 text-xs font-semibold text-moss">{t.interests[item]}</span>)}
              </div>
            </div>
            <ol className="border-t hairline">
              {route.stops.map((city, index) => {
                const cityName = getCityName(city, lang);
                const range = ranges[index];
                const cityDescription = lang === "en" || lang === "zh-CN" || lang === "zh-TW"
                  ? getCityEditorial(city, lang)
                  : null;
                const transfer = transfers[index];
                const nextCity = route.stops[index + 1];
                const dayLabel = range.start === range.end
                  ? `${t.day} ${range.start}`
                  : `${t.days} ${range.start}–${range.end}`;
                return (
                  <li key={city} className="grid gap-3 border-b hairline py-6 sm:grid-cols-[110px_1fr] sm:gap-7">
                    <span className="text-sm font-semibold text-gold">{dayLabel}</span>
                    <div className="min-w-0">
                      <h3 className="safe-wrap font-serif text-2xl font-semibold">{cityName}</h3>
                      <p className="safe-wrap mt-2 leading-7 text-mist">{cityDescription ?? t.stopText(cityName)}</p>
                      {transfer && nextCity ? (
                        <p className="safe-wrap mt-4 border-s-2 border-gold/60 ps-3 text-sm font-semibold leading-6 text-moss">
                          {transferCopy[lang].next}: {getCityName(nextCity, lang)} · {transferCopy[lang].modes[transfer]}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="border-y hairline bg-white px-5 py-12 sm:px-8 lg:px-24">
          <div className="mx-auto grid max-w-[1488px] gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
            <h2 className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">{t.logisticsTitle}</h2>
            <p className="safe-wrap max-w-4xl leading-8 text-mist">{logisticsBody}</p>
          </div>
        </section>

        <section className="border-y hairline bg-bone px-5 py-14 sm:px-8 lg:px-24">
          <div className="mx-auto grid max-w-[1488px] gap-10 lg:grid-cols-2">
            <div>
              <h2 className="safe-wrap font-serif text-3xl font-semibold">{t.whyTitle}</h2>
              <p className="safe-wrap mt-4 max-w-2xl leading-7 text-mist">{whyBody}</p>
            </div>
            <div>
              <h2 className="safe-wrap font-serif text-3xl font-semibold">{t.adjustTitle}</h2>
              <p className="safe-wrap mt-4 max-w-2xl leading-7 text-mist">{t.adjustBody}</p>
              <Link href="/contact" className="safe-wrap mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-moss px-6 py-3 text-center text-sm font-semibold text-cream transition hover:bg-ink">
                {t.contact}<span className="ms-2" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
