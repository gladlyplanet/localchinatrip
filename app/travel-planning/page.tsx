"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { featuredPlans, getPlanText } from "@/lib/featured-travel-plans";
import {
  cityNames,
  travelRoutes,
  type CityId,
  type Interest,
  type Region,
  type TravelRoute
} from "@/lib/travel-planning-routes";
import { getEditorialText, getRouteEditorial } from "@/lib/travel-planning-editorial";

type Localized = Record<Lang, string>;
type FilterMode = "duration" | "region" | "interest";

const localized = (en: string, zhCN: string, zhTW: string, es: string, pt: string, ar: string): Localized => ({
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  es,
  pt,
  ar
});

const routes: TravelRoute[] = travelRoutes;

const pageCopy = {
  en: {
    eyebrow: "PLAN YOUR JOURNEY",
    title: "Choose your travel rhythm, then discover your China.",
    intro: "Every route is a starting point. Time, interests and daily pace can all be adjusted around you.",
    process: ["Get in touch", "Free first plan", "Review together", "Confirm with deposit", "Begin the journey"],
    processNote: "The first route proposal is free. We move into execution only after you are happy with the plan.",
    libraryEyebrow: "ROUTE INSPIRATION",
    libraryTitle: "China route inspiration library",
    libraryIntro: "The same number of days can reveal a completely different China.",
    modes: { duration: "By duration", region: "By region", interest: "By interest" },
    all: "All",
    dayUnit: "days",
    dayRange: (start: number, end: number) => start === end ? `Day ${start}` : `Days ${start}–${end}`,
    regions: { north: "North China", east: "East China", south: "South China", central: "Central China", southwest: "Southwest", northwest: "Northwest", northeast: "Northeast" },
    interests: { history: "History", food: "Food & local life", nature: "Nature", village: "Villages", craft: "Crafts", city: "City life", firstTrip: "First China trip" },
    seasons: { allYear: "All year", springAutumn: "Spring / autumn", summerAutumn: "Summer / autumn", winter: "Winter" },
    paces: { easy: "Easy", balanced: "Balanced", active: "Active" },
    season: "Best season",
    pace: "Travel pace",
    view: "View route rhythm",
    countPrefix: "Showing",
    countSuffix: "reference routes",
    showMore: "Show more routes",
    showLess: "Show fewer routes",
    notPackage: "Reference routes are not fixed tours. Every destination and experience can be replaced.",
    selectedEyebrow: "ROUTE RHYTHM",
    routeFlow: "Suggested flow",
    routeNote: "Use this structure to understand travel time and pace. The final route will be rebuilt around your priorities.",
    start: "Use this route as a starting point",
    adjustTitle: "What can be adjusted",
    adjust: [["Cities", "Change the route or focus on one region."], ["Nature", "Balance landscapes with city time."], ["Food", "Markets, home-style meals and local specialties."], ["Culture", "History, crafts and everyday life."], ["Transport", "Rail, flights or private car where useful."], ["Daily pace", "More rest, more walking or flexible mornings."]],
    finalTitle: "A route should fit you, not the other way around.",
    finalBody: "Tell me your dates, interests and preferred pace. I will prepare a free first route for us to review together.",
    contact: "Tell me about my trip"
  },
  "zh-CN": {
    eyebrow: "规划你的旅行",
    title: "先选择旅行节奏，再找到适合你的中国。",
    intro: "每条路线都是参考起点，可以根据时间、兴趣和每天的体力重新调整。",
    process: ["建立联系", "免费初步计划", "一起核对调整", "确认并支付定金", "开始执行"],
    processNote: "初步路线设计免费，确认满意后再进入执行阶段。",
    libraryEyebrow: "路线灵感",
    libraryTitle: "中国路线灵感库",
    libraryIntro: "同样的天数，也可以看到完全不同的中国。",
    modes: { duration: "按天数", region: "按地区", interest: "按兴趣" },
    all: "全部",
    dayUnit: "天",
    dayRange: (start: number, end: number) => start === end ? `第${start}天` : `第${start}–${end}天`,
    regions: { north: "华北", east: "华东", south: "华南", central: "华中", southwest: "西南", northwest: "西北", northeast: "东北" },
    interests: { history: "历史文化", food: "美食生活", nature: "自然山水", village: "村落", craft: "手工艺", city: "城市生活", firstTrip: "第一次来中国" },
    seasons: { allYear: "全年", springAutumn: "春秋", summerAutumn: "夏秋", winter: "冬季" },
    paces: { easy: "舒缓", balanced: "适中", active: "充实" },
    season: "推荐季节",
    pace: "旅行强度",
    view: "查看路线节奏",
    countPrefix: "当前共有",
    countSuffix: "条参考路线",
    showMore: "查看更多路线",
    showLess: "收起部分路线",
    notPackage: "参考路线不是固定旅行团，每个目的地和体验都可以替换。",
    selectedEyebrow: "路线节奏",
    routeFlow: "建议动线",
    routeNote: "先用这条动线理解交通和停留节奏，最终路线会根据你的重点重新设计。",
    start: "用这条路线开始沟通",
    adjustTitle: "你可以调整什么",
    adjust: [["城市", "更换目的地，或集中体验一个地区。"], ["自然", "调整山水与城市停留的比例。"], ["饮食", "加入市场、家常菜和地方特色。"], ["文化", "选择历史、手艺或日常生活主题。"], ["交通", "合理组合高铁、飞机和私人用车。"], ["每天强度", "增加休息、减少步行或保留自由时间。"]],
    finalTitle: "路线应该适合你，而不是让你适应路线。",
    finalBody: "告诉我日期、兴趣和喜欢的旅行节奏，我会先免费准备一版路线，再和你一起核对。",
    contact: "告诉我你的旅行想法"
  },
  "zh-TW": {
    eyebrow: "規劃你的旅行",
    title: "先選擇旅行節奏，再找到適合你的中國。",
    intro: "每條路線都是參考起點，可以依照時間、興趣和每天的體力重新調整。",
    process: ["建立聯絡", "免費初步計畫", "一起核對調整", "確認並支付訂金", "開始執行"],
    processNote: "初步路線設計免費，確認滿意後再進入執行階段。",
    libraryEyebrow: "路線靈感",
    libraryTitle: "中國路線靈感庫",
    libraryIntro: "同樣的天數，也可以看到完全不同的中國。",
    modes: { duration: "按天數", region: "按地區", interest: "按興趣" },
    all: "全部",
    dayUnit: "天",
    dayRange: (start: number, end: number) => start === end ? `第${start}天` : `第${start}–${end}天`,
    regions: { north: "華北", east: "華東", south: "華南", central: "華中", southwest: "西南", northwest: "西北", northeast: "東北" },
    interests: { history: "歷史文化", food: "美食生活", nature: "自然山水", village: "村落", craft: "手工藝", city: "城市生活", firstTrip: "第一次來中國" },
    seasons: { allYear: "全年", springAutumn: "春秋", summerAutumn: "夏秋", winter: "冬季" },
    paces: { easy: "舒緩", balanced: "適中", active: "充實" },
    season: "推薦季節",
    pace: "旅行強度",
    view: "查看路線節奏",
    countPrefix: "目前共有",
    countSuffix: "條參考路線",
    showMore: "查看更多路線",
    showLess: "收起部分路線",
    notPackage: "參考路線不是固定旅行團，每個目的地和體驗都可以替換。",
    selectedEyebrow: "路線節奏",
    routeFlow: "建議動線",
    routeNote: "先用這條動線理解交通和停留節奏，最終路線會依照你的重點重新設計。",
    start: "用這條路線開始溝通",
    adjustTitle: "你可以調整什麼",
    adjust: [["城市", "更換目的地，或集中體驗一個地區。"], ["自然", "調整山水與城市停留的比例。"], ["飲食", "加入市場、家常菜和地方特色。"], ["文化", "選擇歷史、手藝或日常生活主題。"], ["交通", "合理組合高鐵、飛機和私人用車。"], ["每天強度", "增加休息、減少步行或保留自由時間。"]],
    finalTitle: "路線應該適合你，而不是讓你適應路線。",
    finalBody: "告訴我日期、興趣和喜歡的旅行節奏，我會先免費準備一版路線，再和你一起核對。",
    contact: "告訴我你的旅行想法"
  },
  es: {
    eyebrow: "PLANIFICA TU VIAJE",
    title: "Elige tu ritmo y descubre tu propia China.",
    intro: "Cada ruta es un punto de partida que puede adaptarse a tu tiempo, intereses y energía diaria.",
    process: ["Primer contacto", "Primer plan gratuito", "Revisión conjunta", "Confirmación y depósito", "Comienza el viaje"],
    processNote: "La primera propuesta es gratuita. Solo pasamos a la ejecución cuando el plan te convence.",
    libraryEyebrow: "INSPIRACIÓN DE RUTAS",
    libraryTitle: "Biblioteca de rutas por China",
    libraryIntro: "El mismo número de días puede mostrarte una China completamente distinta.",
    modes: { duration: "Por duración", region: "Por región", interest: "Por interés" },
    all: "Todas",
    dayUnit: "días",
    dayRange: (start: number, end: number) => start === end ? `Día ${start}` : `Días ${start}–${end}`,
    regions: { north: "Norte", east: "Este", south: "Sur", central: "Centro", southwest: "Suroeste", northwest: "Noroeste", northeast: "Noreste" },
    interests: { history: "Historia", food: "Comida y vida local", nature: "Naturaleza", village: "Pueblos", craft: "Artesanía", city: "Vida urbana", firstTrip: "Primer viaje a China" },
    seasons: { allYear: "Todo el año", springAutumn: "Primavera / otoño", summerAutumn: "Verano / otoño", winter: "Invierno" },
    paces: { easy: "Tranquilo", balanced: "Equilibrado", active: "Activo" },
    season: "Mejor época",
    pace: "Ritmo",
    view: "Ver el ritmo de la ruta",
    countPrefix: "Mostrando",
    countSuffix: "rutas de referencia",
    showMore: "Ver más rutas",
    showLess: "Ver menos rutas",
    notPackage: "Son rutas de referencia, no circuitos fijos. Cada destino y experiencia se puede cambiar.",
    selectedEyebrow: "RITMO DE LA RUTA",
    routeFlow: "Recorrido sugerido",
    routeNote: "Esta estructura ayuda a entender traslados y ritmo. La ruta final se rediseña según tus prioridades.",
    start: "Empezar desde esta ruta",
    adjustTitle: "Qué puedes ajustar",
    adjust: [["Ciudades", "Cambia destinos o concéntrate en una región."], ["Naturaleza", "Equilibra paisajes y tiempo urbano."], ["Comida", "Mercados, cocina casera y especialidades."], ["Cultura", "Historia, artesanía y vida cotidiana."], ["Transporte", "Tren, avión o coche privado cuando convenga."], ["Ritmo diario", "Más descanso, menos caminata o mañanas libres."]],
    finalTitle: "La ruta debe adaptarse a ti, no al revés.",
    finalBody: "Cuéntame tus fechas, intereses y ritmo. Prepararé una primera ruta gratuita para revisarla juntos.",
    contact: "Contarme mi idea de viaje"
  },
  pt: {
    eyebrow: "PLANEJE SUA VIAGEM",
    title: "Escolha seu ritmo e descubra a sua China.",
    intro: "Cada roteiro é um ponto de partida que pode mudar conforme seu tempo, interesses e energia diária.",
    process: ["Primeiro contato", "Primeiro plano gratuito", "Revisão em conjunto", "Confirmação e sinal", "Começa a viagem"],
    processNote: "A primeira proposta é gratuita. Só seguimos para a execução quando você estiver satisfeito.",
    libraryEyebrow: "INSPIRAÇÃO DE ROTEIROS",
    libraryTitle: "Biblioteca de roteiros pela China",
    libraryIntro: "O mesmo número de dias pode revelar uma China completamente diferente.",
    modes: { duration: "Por duração", region: "Por região", interest: "Por interesse" },
    all: "Todos",
    dayUnit: "dias",
    dayRange: (start: number, end: number) => start === end ? `Dia ${start}` : `Dias ${start}–${end}`,
    regions: { north: "Norte", east: "Leste", south: "Sul", central: "Centro", southwest: "Sudoeste", northwest: "Noroeste", northeast: "Nordeste" },
    interests: { history: "História", food: "Comida e vida local", nature: "Natureza", village: "Vilarejos", craft: "Artesanato", city: "Vida urbana", firstTrip: "Primeira viagem à China" },
    seasons: { allYear: "Ano inteiro", springAutumn: "Primavera / outono", summerAutumn: "Verão / outono", winter: "Inverno" },
    paces: { easy: "Tranquilo", balanced: "Equilibrado", active: "Ativo" },
    season: "Melhor época",
    pace: "Ritmo",
    view: "Ver ritmo do roteiro",
    countPrefix: "Mostrando",
    countSuffix: "roteiros de referência",
    showMore: "Ver mais roteiros",
    showLess: "Ver menos roteiros",
    notPackage: "São roteiros de referência, não excursões fixas. Cada destino e experiência pode mudar.",
    selectedEyebrow: "RITMO DO ROTEIRO",
    routeFlow: "Percurso sugerido",
    routeNote: "Esta estrutura ajuda a entender deslocamentos e ritmo. O roteiro final será redesenhado para você.",
    start: "Começar por este roteiro",
    adjustTitle: "O que pode ser ajustado",
    adjust: [["Cidades", "Troque destinos ou concentre-se em uma região."], ["Natureza", "Equilibre paisagens e tempo urbano."], ["Comida", "Mercados, comida caseira e especialidades."], ["Cultura", "História, artesanato e vida cotidiana."], ["Transporte", "Trem, avião ou carro privado quando fizer sentido."], ["Ritmo diário", "Mais descanso, menos caminhada ou manhãs livres."]],
    finalTitle: "O roteiro deve se adaptar a você, não o contrário.",
    finalBody: "Conte suas datas, interesses e ritmo. Prepararei uma primeira rota gratuita para revisarmos juntos.",
    contact: "Contar minha ideia de viagem"
  },
  ar: {
    eyebrow: "خطط لرحلتك",
    title: "اختر إيقاع رحلتك واكتشف الصين التي تناسبك.",
    intro: "كل مسار نقطة بداية قابلة للتعديل حسب وقتك واهتماماتك وطاقة كل يوم.",
    process: ["التواصل", "خطة أولية مجانية", "المراجعة معا", "التأكيد ودفع العربون", "بدء الرحلة"],
    processNote: "اقتراح المسار الأول مجاني، ولا ننتقل إلى التنفيذ إلا بعد رضاك عن الخطة.",
    libraryEyebrow: "أفكار للمسارات",
    libraryTitle: "مكتبة مسارات السفر في الصين",
    libraryIntro: "يمكن لنفس عدد الأيام أن يكشف لك صينا مختلفة تماما.",
    modes: { duration: "حسب المدة", region: "حسب المنطقة", interest: "حسب الاهتمام" },
    all: "الكل",
    dayUnit: "أيام",
    dayRange: (start: number, end: number) => start === end ? `اليوم ${start}` : `الأيام ${start}–${end}`,
    regions: { north: "شمال الصين", east: "شرق الصين", south: "جنوب الصين", central: "وسط الصين", southwest: "الجنوب الغربي", northwest: "الشمال الغربي", northeast: "الشمال الشرقي" },
    interests: { history: "التاريخ", food: "الطعام والحياة المحلية", nature: "الطبيعة", village: "القرى", craft: "الحرف", city: "حياة المدن", firstTrip: "الزيارة الأولى للصين" },
    seasons: { allYear: "طوال العام", springAutumn: "الربيع / الخريف", summerAutumn: "الصيف / الخريف", winter: "الشتاء" },
    paces: { easy: "هادئ", balanced: "متوازن", active: "نشيط" },
    season: "أفضل موسم",
    pace: "إيقاع الرحلة",
    view: "عرض إيقاع المسار",
    countPrefix: "يتم عرض",
    countSuffix: "مسارا مرجعيا",
    showMore: "عرض مسارات أكثر",
    showLess: "عرض مسارات أقل",
    notPackage: "هذه مسارات مرجعية وليست جولات ثابتة، ويمكن تغيير كل وجهة وتجربة.",
    selectedEyebrow: "إيقاع المسار",
    routeFlow: "المسار المقترح",
    routeNote: "يساعدك هذا الهيكل على فهم التنقل والإيقاع، ثم يعاد تصميم المسار النهائي حسب أولوياتك.",
    start: "ابدأ النقاش من هذا المسار",
    adjustTitle: "ما الذي يمكن تعديله",
    adjust: [["المدن", "غيّر الوجهات أو ركز على منطقة واحدة."], ["الطبيعة", "وازن بين المناظر ووقت المدن."], ["الطعام", "أسواق ووجبات منزلية وتخصصات محلية."], ["الثقافة", "تاريخ وحرف وحياة يومية."], ["النقل", "قطار أو طائرة أو سيارة خاصة عند الحاجة."], ["إيقاع اليوم", "راحة أكثر أو مشي أقل أو صباح مرن."]],
    finalTitle: "يجب أن يناسبك المسار، لا أن تتكيف أنت معه.",
    finalBody: "أخبرني بالتواريخ والاهتمامات والإيقاع، وسأجهز مسارا أوليا مجانيا لنراجعه معا.",
    contact: "أخبرني بفكرة رحلتي"
  }
} satisfies Record<Lang, Record<string, unknown>>;

const featuredCopy: Record<Lang, {
  eyebrow: string;
  title: string;
  intro: string;
  duration: string;
  nights: string;
  route: string;
  idealFor: string;
  view: string;
  note: string;
}> = {
  en: {
    eyebrow: "FEATURED CUSTOMISABLE PLANS",
    title: "Two complete journeys, ready to become yours.",
    intro: "These plans show the real daily rhythm, transport logic and service scope. Keep the structure, or rebuild it around your dates and interests.",
    duration: "days",
    nights: "nights",
    route: "Route",
    idealFor: "Best for",
    view: "View the complete plan",
    note: "Reference plans, not fixed group tours. The first customised proposal is free."
  },
  "zh-CN": {
    eyebrow: "精选可定制方案",
    title: "两套完整行程，先看清楚每天怎么走。",
    intro: "方案展示真实的每日节奏、交通逻辑和服务范围。可以沿用完整框架，也可以根据日期、兴趣和体力重新设计。",
    duration: "天",
    nights: "晚",
    route: "行程动线",
    idealFor: "适合人群",
    view: "查看完整方案",
    note: "这是可调整的参考方案，不是固定旅行团；首次定制方案免费。"
  },
  "zh-TW": {
    eyebrow: "精選可訂製方案",
    title: "兩套完整行程，先看清楚每天怎麼走。",
    intro: "方案展示真實的每日節奏、交通邏輯和服務範圍。可以沿用完整框架，也可以根據日期、興趣和體力重新設計。",
    duration: "天",
    nights: "晚",
    route: "行程動線",
    idealFor: "適合人群",
    view: "查看完整方案",
    note: "這是可調整的參考方案，不是固定旅行團；首次訂製方案免費。"
  },
  es: {
    eyebrow: "PLANES DESTACADOS Y PERSONALIZABLES",
    title: "Dos viajes completos listos para adaptarse a ti.",
    intro: "Cada plan muestra el ritmo diario, la lógica de transporte y el alcance del servicio. Puedes conservar la estructura o rediseñarla según tus fechas e intereses.",
    duration: "días",
    nights: "noches",
    route: "Ruta",
    idealFor: "Ideal para",
    view: "Ver el plan completo",
    note: "Son planes de referencia, no circuitos cerrados. La primera propuesta personalizada es gratuita."
  },
  pt: {
    eyebrow: "PLANOS PERSONALIZÁVEIS EM DESTAQUE",
    title: "Duas viagens completas prontas para se adaptar a você.",
    intro: "Cada plano mostra o ritmo diário, a lógica de transporte e o escopo do serviço. Mantenha a estrutura ou redesenhe conforme suas datas e interesses.",
    duration: "dias",
    nights: "noites",
    route: "Roteiro",
    idealFor: "Ideal para",
    view: "Ver o plano completo",
    note: "São planos de referência, não excursões fixas. A primeira proposta personalizada é gratuita."
  },
  ar: {
    eyebrow: "خطط مختارة قابلة للتخصيص",
    title: "رحلتان متكاملتان يمكن تكييفهما معك.",
    intro: "توضح كل خطة إيقاع الأيام ومنطق التنقل ونطاق الخدمة. يمكنك الاحتفاظ بالهيكل أو إعادة تصميمه حسب مواعيدك واهتماماتك.",
    duration: "أيام",
    nights: "ليال",
    route: "المسار",
    idealFor: "مناسب لـ",
    view: "عرض الخطة الكاملة",
    note: "هذه خطط مرجعية وليست جولات جماعية ثابتة، والمقترح المخصص الأول مجاني."
  }
};

const durations = [3, 5, 7, 10, 15, 21] as const;
const regions: Region[] = ["north", "east", "south", "central", "southwest", "northwest", "northeast"];
const interests: Interest[] = ["history", "food", "nature", "village", "craft", "city", "firstTrip"];

function getCityName(city: CityId, lang: Lang) {
  const [en, zh, ar] = cityNames[city];
  if (lang === "zh-CN" || lang === "zh-TW") return zh;
  if (lang === "ar") return ar;
  return en;
}

export default function TravelPlanningPage() {
  const { lang, dir } = useLanguage();
  const t = pageCopy[lang];
  const featured = featuredCopy[lang];
  const [mode, setMode] = useState<FilterMode>("duration");
  const [duration, setDuration] = useState<(typeof durations)[number]>(7);
  const [region, setRegion] = useState<Region | "all">("all");
  const [interest, setInterest] = useState<Interest | "all">("all");
  const [showAll, setShowAll] = useState(false);

  const filteredRoutes = useMemo(() => {
    if (mode === "duration") return routes.filter((route) => route.duration === duration);
    if (mode === "region") return region === "all" ? routes : routes.filter((route) => route.region === region);
    return interest === "all" ? routes : routes.filter((route) => route.interests.includes(interest));
  }, [duration, interest, mode, region]);

  const visibleRoutes = showAll ? filteredRoutes : filteredRoutes.slice(0, 8);
  const modeItems: { id: FilterMode; label: string }[] = [
    { id: "duration", label: t.modes.duration },
    { id: "region", label: t.modes.region },
    { id: "interest", label: t.modes.interest }
  ];

  const routeName = (route: TravelRoute) => {
    const first = getCityName(route.stops[0], lang);
    const last = getCityName(route.stops[route.stops.length - 1], lang);
    const place = first === last ? first : `${first} — ${last}`;
    return `${place} · ${route.duration} ${t.dayUnit}`;
  };

  const routeFlow = (route: TravelRoute) => route.stops.map((city) => getCityName(city, lang)).join(" — ");

  const routeRhythm = (route: TravelRoute) => {
    const spans = getRouteEditorial(route.id)?.daySpans;
    if (!spans || spans.length !== route.stops.length || spans.reduce((sum, days) => sum + days, 0) !== route.duration) {
      return [];
    }

    let cursor = 1;
    return route.stops.map((city, index) => {
      const start = cursor;
      const end = cursor + spans[index] - 1;
      cursor = end + 1;
      return {
        city,
        label: `${t.dayRange(start, end)} · ${getCityName(city, lang)}`
      };
    });
  };

  const routeCardSummary = (route: TravelRoute) => {
    const editorial = getRouteEditorial(route.id);
    if (!editorial || (lang !== "en" && lang !== "zh-CN" && lang !== "zh-TW")) return null;
    return getEditorialText(editorial.summary, lang);
  };

  return (
    <>
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20" dir={dir}>
        <section className="relative min-h-[480px] overflow-hidden lg:min-h-[560px]">
          <Image src="/images/real-hero-hongcun.jpg" alt={t.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/55" />
          <div className="relative z-10 mx-auto flex min-h-[480px] max-w-[1680px] items-end px-5 pb-14 sm:px-8 lg:min-h-[560px] lg:px-24 lg:pb-20">
            <div className="min-w-0 max-w-4xl text-cream">
              <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.eyebrow}</p>
              <h1 className="safe-wrap mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">{t.title}</h1>
              <p className="safe-wrap mt-6 max-w-2xl text-lg leading-8 text-cream/85 sm:text-xl">{t.intro}</p>
            </div>
          </div>
        </section>

        <section className="border-b hairline bg-cream px-5 py-9 sm:px-8 lg:px-24">
          <div className="mx-auto max-w-[1488px]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {t.process.map((step, index) => (
                <div key={step} className="min-w-0 border-t border-gold/40 pt-4 lg:border-s lg:border-t-0 lg:ps-5 lg:pt-0">
                  <span className="font-serif text-2xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <p className="safe-wrap mt-2 font-semibold leading-6">{step}</p>
                </div>
              ))}
            </div>
            <p className="safe-wrap mt-7 text-center text-sm leading-6 text-mist">{t.processNote}</p>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 lg:px-24 lg:py-24">
          <div className="mx-auto max-w-[1488px]">
            <div className="max-w-4xl">
              <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{featured.eyebrow}</p>
              <h2 className="safe-wrap mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{featured.title}</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">{featured.intro}</p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {featuredPlans.map((plan) => (
                <article key={plan.id} className="group min-w-0 overflow-hidden rounded-md border bg-cream shadow-card hairline">
                  <Link href={`/travel-planning/${plan.id}`} className="block h-full text-start">
                    <div className="relative aspect-[16/9] overflow-hidden bg-bone">
                      <Image
                        src={plan.heroImage}
                        alt={getPlanText(plan.cardTitle, lang)}
                        fill
                        sizes="(min-width:1024px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                      <p className="safe-wrap absolute bottom-4 start-4 rounded bg-cream px-3 py-2 text-xs font-semibold text-ink shadow-sm">
                        {plan.duration} {featured.duration} · {plan.nights} {featured.nights}
                      </p>
                    </div>
                    <div className="p-5 sm:p-7">
                      <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.14em] text-gold">{getPlanText(plan.eyebrow, lang)}</p>
                      <h3 className="safe-wrap mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{getPlanText(plan.cardTitle, lang)}</h3>
                      <p className="safe-wrap mt-4 leading-7 text-mist">{getPlanText(plan.summary, lang)}</p>
                      <dl className="mt-6 grid gap-4 border-t hairline pt-5 sm:grid-cols-2">
                        <div className="min-w-0">
                          <dt className="text-xs font-semibold text-gold">{featured.route}</dt>
                          <dd className="safe-wrap mt-2 text-sm leading-6 text-mist">{getPlanText(plan.route, lang)}</dd>
                        </div>
                        <div className="min-w-0">
                          <dt className="text-xs font-semibold text-gold">{featured.idealFor}</dt>
                          <dd className="safe-wrap mt-2 text-sm leading-6 text-mist">{getPlanText(plan.idealFor, lang)}</dd>
                        </div>
                      </dl>
                      <span className="safe-wrap mt-6 inline-flex text-sm font-semibold text-moss">{featured.view}<span className="ms-2 shrink-0">→</span></span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <p className="safe-wrap mt-7 border-t hairline pt-5 text-sm leading-6 text-mist">{featured.note}</p>
          </div>
        </section>

        <section className="paper-texture px-5 py-16 sm:px-8 lg:px-24 lg:py-24">
          <div className="mx-auto max-w-[1488px]">
            <div className="max-w-3xl">
              <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.libraryEyebrow}</p>
              <h2 className="safe-wrap mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t.libraryTitle}</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">{t.libraryIntro}</p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[360px_1fr] lg:items-start">
              <div className="grid grid-cols-3 overflow-hidden rounded-md border hairline bg-white">
                {modeItems.map((item) => (
                  <button key={item.id} type="button" onClick={() => { setMode(item.id); setShowAll(false); }} className={`safe-wrap min-h-12 px-3 py-2 text-sm font-semibold leading-5 transition ${mode === item.id ? "bg-moss text-cream" : "text-ink hover:bg-moss/10"}`} aria-pressed={mode === item.id}>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                {mode === "duration" && durations.map((item) => (
                  <button key={item} type="button" onClick={() => { setDuration(item); setShowAll(false); }} className={`min-h-11 min-w-20 shrink-0 rounded-md border px-4 text-sm font-semibold transition ${duration === item ? "border-moss bg-moss text-cream" : "hairline bg-white hover:border-moss"}`} aria-pressed={duration === item}>
                    {item} {t.dayUnit}
                  </button>
                ))}
                {mode === "region" && (["all", ...regions] as const).map((item) => (
                  <button key={item} type="button" onClick={() => { setRegion(item); setShowAll(false); }} className={`safe-wrap min-h-11 shrink-0 rounded-md border px-4 text-sm font-semibold leading-5 transition ${region === item ? "border-moss bg-moss text-cream" : "hairline bg-white hover:border-moss"}`} aria-pressed={region === item}>
                    {item === "all" ? t.all : t.regions[item]}
                  </button>
                ))}
                {mode === "interest" && (["all", ...interests] as const).map((item) => (
                  <button key={item} type="button" onClick={() => { setInterest(item); setShowAll(false); }} className={`safe-wrap min-h-11 shrink-0 rounded-md border px-4 text-sm font-semibold leading-5 transition ${interest === item ? "border-moss bg-moss text-cream" : "hairline bg-white hover:border-moss"}`} aria-pressed={interest === item}>
                    {item === "all" ? t.all : t.interests[item]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {visibleRoutes.map((route) => {
                const summary = routeCardSummary(route);
                return (
                  <article key={route.id} className="group min-w-0 overflow-hidden rounded-md border bg-white shadow-card transition duration-300 hairline hover:-translate-y-1 hover:border-moss">
                    <Link href={`/travel-planning/${route.id}`} className="block h-full w-full text-start">
                      <div className="relative aspect-[4/3] overflow-hidden bg-bone">
                        <Image src={route.image} alt={routeName(route)} fill sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                      </div>
                      <div className="p-5">
                        <h3 className="safe-wrap font-serif text-2xl font-semibold leading-tight">{routeName(route)}</h3>
                        <p className="safe-wrap mt-3 text-sm leading-6 text-mist">{routeFlow(route)}</p>
                        {summary ? <p className="safe-wrap mt-3 line-clamp-3 text-sm leading-6 text-mist">{summary}</p> : null}
                        <ol className="mt-4 flex flex-wrap gap-2" aria-label={t.routeFlow}>
                          {routeRhythm(route).map((stop) => (
                            <li key={stop.city} className="safe-wrap rounded border hairline bg-cream px-2.5 py-1.5 text-xs font-semibold leading-5 text-moss">
                              {stop.label}
                            </li>
                          ))}
                        </ol>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {route.interests.slice(0, 3).map((tag) => <span key={tag} className="rounded border hairline bg-cream px-2 py-1 text-[11px] font-semibold text-moss">{t.interests[tag]}</span>)}
                        </div>
                        <dl className="mt-5 grid grid-cols-2 gap-3 border-t hairline pt-4 text-xs">
                          <div><dt className="text-mist">{t.season}</dt><dd className="safe-wrap mt-1 font-semibold">{t.seasons[route.season]}</dd></div>
                          <div><dt className="text-mist">{t.pace}</dt><dd className="safe-wrap mt-1 font-semibold">{t.paces[route.pace]}</dd></div>
                        </dl>
                        <span className="safe-wrap mt-5 inline-flex text-sm font-semibold text-moss">{t.view} <span className="ms-2 shrink-0">→</span></span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t hairline pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="safe-wrap text-mist">{t.countPrefix} <strong className="text-ink">{filteredRoutes.length}</strong> {t.countSuffix}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <p className="safe-wrap max-w-2xl leading-6 text-mist">{t.notPackage}</p>
                {filteredRoutes.length > 8 ? <button type="button" onClick={() => setShowAll((value) => !value)} className="safe-wrap min-h-11 shrink-0 rounded-md border border-moss px-5 py-2 text-sm font-semibold text-moss transition hover:bg-moss hover:text-cream">{showAll ? t.showLess : t.showMore}</button> : null}
              </div>
            </div>

          </div>
        </section>

        <section className="border-y hairline bg-bone px-5 py-16 sm:px-8 lg:px-24">
          <div className="mx-auto max-w-[1488px]">
            <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-4xl">{t.adjustTitle}</h2>
            <div className="mt-9 grid gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {t.adjust.map(([title, body], index) => (
                <div key={title} className="min-w-0 border-t hairline py-5 sm:px-5 lg:border-s lg:border-t-0 lg:py-0">
                  <span className="text-xs font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="safe-wrap mt-2 font-semibold">{title}</h3>
                  <p className="safe-wrap mt-2 text-sm leading-6 text-mist">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
          <div className="mx-auto grid max-w-[1488px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="min-w-0">
              <h2 className="safe-wrap max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">{t.finalTitle}</h2>
              <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-mist">{t.finalBody}</p>
            </div>
            <Link href="/contact" className="safe-wrap inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-7 py-3 text-center text-sm font-semibold leading-5 text-ink transition hover:bg-gold">{t.contact} <span className="ms-2 shrink-0">→</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
