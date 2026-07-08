"use client";

import Link from "next/link";
import { DestinationPhoto } from "@/components/DestinationPhoto";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { getRecommendationEnrichment } from "@/lib/content-enrichment";
import { toTraditionalChinese } from "@/lib/chinese-text";
import { getProvinceName, type Province } from "@/lib/provinces";
import { getRecommendationCopy, type ProvinceRecommendation, type RecommendationKind } from "@/lib/province-recommendations";
import { getSiteCopy } from "@/lib/site-copy";

type IconName = "leaf" | "clock" | "people" | "star" | "camera" | "shoe" | "mountain" | "hat" | "route" | "book" | "car";

type Phrase = Record<Lang, string>;

const text = {
  eyebrow: {
    en: "Place and experience details",
    "zh-CN": "地点与体验详情",
    "zh-TW": "地點與體驗詳情",
    es: "Detalles del lugar y la experiencia",
    pt: "Detalhes do lugar e da experiência",
    ar: "تفاصيل المكان والتجربة"
  },
  travelNotes: {
    en: "Travel Notes",
    "zh-CN": "游览建议",
    "zh-TW": "遊覽建議",
    es: "Consejos de visita",
    pt: "Sugestões de visita",
    ar: "ملاحظات الزيارة"
  },
  howToVisit: {
    en: "How to Visit",
    "zh-CN": "导览方式",
    "zh-TW": "導覽方式",
    es: "Cómo visitar",
    pt: "Como visitar",
    ar: "كيفية الزيارة"
  },
  howToVisitLead: {
    en: "Choose the guiding style and service level that fit your group.",
    "zh-CN": "导览会围绕地点本身、现场动线和实际交通安排。",
    "zh-TW": "根據您的需求，選擇合適的陪同與服務方式。",
    es: "Elige el estilo de guía y servicio que encaja con tu grupo.",
    pt: "Escolha o estilo de guia e serviço que combina com seu grupo.",
    ar: "اختر أسلوب الإرشاد ومستوى الخدمة المناسب لمجموعتك."
  },
  bestSeason: {
    en: "Best season",
    "zh-CN": "适合季节",
    "zh-TW": "適合季節",
    es: "Mejor temporada",
    pt: "Melhor época",
    ar: "أفضل موسم"
  },
  pace: {
    en: "Pace",
    "zh-CN": "游览节奏",
    "zh-TW": "遊覽節奏",
    es: "Ritmo",
    pt: "Ritmo",
    ar: "الإيقاع"
  },
  goodFor: {
    en: "Good for",
    "zh-CN": "适合人群",
    "zh-TW": "適合人群",
    es: "Ideal para",
    pt: "Ideal para",
    ar: "مناسب لـ"
  },
  keywords: {
    en: "Keywords",
    "zh-CN": "体验关键词",
    "zh-TW": "體驗關鍵詞",
    es: "Claves",
    pt: "Palavras-chave",
    ar: "كلمات مفتاحية"
  }
} satisfies Record<string, Phrase>;

const kindMeta: Record<RecommendationKind, { subtitle: Phrase; season: Phrase; pace: Phrase; people: Phrase; keywords: Phrase; lead: Phrase; advice: Array<{ icon: IconName; title: Phrase; body: Phrase }>; guide: Array<{ icon: IconName; title: Phrase; body: Phrase }> }> = {
  heritage: {
    subtitle: phrase("Historic layers · Architecture · Local memory", "历史层次 · 建筑空间 · 城市记忆", "歷史層次 · 建築空間 · 城市記憶", "Historia · Arquitectura · Memoria local", "História · Arquitetura · Memória local", "طبقات تاريخية · عمارة · ذاكرة محلية"),
    season: phrase("Spring and autumn for mild walking weather", "春秋舒适，适合慢走与拍照", "春秋舒適，適合慢走與拍照", "Primavera y otoño, clima cómodo para caminar", "Primavera e outono, clima agradável para caminhar", "الربيع والخريف للمشي المريح"),
    pace: phrase("Half day or a relaxed full day", "半日到一日，节奏放缓", "半日到一日，節奏放緩", "Medio día o un día completo tranquilo", "Meio dia ou um dia completo tranquilo", "نصف يوم أو يوم كامل بهدوء"),
    people: phrase("History, architecture and photography lovers", "历史、建筑与摄影爱好者", "歷史、建築與攝影愛好者", "Amantes de historia, arquitectura y fotografía", "Quem gosta de história, arquitetura e fotografia", "محبو التاريخ والعمارة والتصوير"),
    keywords: phrase("Old city, stories, local context", "古城肌理 · 历史讲解 · 在地视角", "古城肌理 · 歷史講解 · 在地視角", "Ciudad antigua, historias, contexto local", "Cidade antiga, histórias, contexto local", "مدينة قديمة، قصص، سياق محلي"),
    lead: phrase("Read the place slowly through scale, details and the city around it.", "顺着历史空间慢慢看，让建筑、街巷与城市关系变得清晰。", "順著歷史空間慢慢看，讓建築、街巷與城市關係變得清晰。", "Lee el lugar con calma a través de su escala, detalles y ciudad cercana.", "Leia o lugar com calma por sua escala, detalhes e cidade ao redor.", "اقرأ المكان بهدوء من خلال حجمه وتفاصيله والمدينة حوله."),
    advice: sharedAdvice("heritage"),
    guide: sharedGuide("heritage")
  },
  nature: {
    subtitle: phrase("Seasonal scenery · Light · Slow travel", "季节风景 · 光线节奏 · 慢旅行", "季節風景 · 光線節奏 · 慢旅行", "Paisaje estacional · Luz · Viaje lento", "Paisagem sazonal · Luz · Viagem lenta", "مناظر موسمية · ضوء · سفر بطيء"),
    season: phrase("Choose by flowers, water, snow or clear skies", "按花期、水量、雪景或晴朗天气选择", "按花期、水量、雪景或晴朗天氣選擇", "Elige según flores, agua, nieve o cielos claros", "Escolha por flores, água, neve ou céu limpo", "اختر حسب الزهور أو الماء أو الثلج أو السماء الصافية"),
    pace: phrase("Half day to full day with scenic pauses", "半日到一日，预留观景停留", "半日到一日，預留觀景停留", "De medio día a un día con pausas escénicas", "De meio dia a um dia com pausas para paisagem", "نصف يوم إلى يوم مع توقفات للمنظر"),
    people: phrase("Families, photographers and nature lovers", "家庭、摄影爱好者与自然爱好者", "家庭、攝影愛好者與自然愛好者", "Familias, fotógrafos y amantes de la naturaleza", "Famílias, fotógrafos e amantes da natureza", "العائلات والمصورون ومحبو الطبيعة"),
    keywords: phrase("Light, terrain, timing, quiet views", "光线 · 地形 · 节奏 · 安静观景", "光線 · 地形 · 節奏 · 安靜觀景", "Luz, terreno, horario, vistas tranquilas", "Luz, terreno, tempo e vistas tranquilas", "ضوء، تضاريس، توقيت، مشاهد هادئة"),
    lead: phrase("Read the landscape through terrain, light, season and walking conditions.", "从地形、光线、季节和步行条件来读山水，行程要给真正好看的位置留时间。", "從地形、光線、季節和步行條件來讀山水，行程要給真正好看的位置留時間。", "Lee el paisaje por terreno, luz, temporada y caminata.", "Leia a paisagem por relevo, luz, estação e caminhada.", "اقرأ المشهد من التضاريس والضوء والموسم وظروف المشي."),
    advice: sharedAdvice("nature"),
    guide: sharedGuide("nature")
  },
  food: foodLike("Food and local life", "饮食与本地生活", "飲食與在地生活"),
  village: villageLike("Village and local life", "村落与本地生活", "村落與在地生活"),
  craft: craftLike(),
  spiritual: {
    subtitle: phrase("Ritual · Architecture · Respectful visit", "礼仪传统 · 建筑空间 · 尊重参观", "禮儀傳統 · 建築空間 · 尊重參觀", "Ritual · Arquitectura · Visita respetuosa", "Ritual · Arquitetura · Visita respeitosa", "طقوس · عمارة · زيارة محترمة"),
    season: phrase("Morning or quiet non-peak hours", "清晨或非高峰时段更安静", "清晨或非高峰時段更安靜", "Mañana o horas tranquilas", "Manhã ou horários mais tranquilos", "الصباح أو الأوقات الهادئة"),
    pace: phrase("Slow visit with quiet pauses", "慢节奏，留出安静停留", "慢節奏，留出安靜停留", "Visita lenta con pausas", "Visita lenta com pausas", "زيارة هادئة مع توقفات"),
    people: phrase("Culture, architecture and belief studies", "文化、建筑与信仰兴趣者", "文化、建築與信仰興趣者", "Cultura, arquitectura y creencias", "Cultura, arquitetura e crenças", "الثقافة والعمارة والطقوس"),
    keywords: phrase("Etiquette, ritual, living faith", "礼仪 · 香火 · 信仰生活", "禮儀 · 香火 · 信仰生活", "Etiqueta, ritual, fe viva", "Etiqueta, ritual, fé viva", "آداب، طقوس، إيمان حي"),
    lead: phrase("Visit with quiet attention and clear etiquette.", "以安静、有分寸的方式参观，先理解礼仪，再进入空间。", "以安靜、有分寸的方式參觀，先理解禮儀，再進入空間。", "Visita con atención tranquila y etiqueta clara.", "Visite com atenção tranquila e etiqueta clara.", "زر المكان بانتباه هادئ وآداب واضحة."),
    advice: sharedAdvice("spiritual"),
    guide: sharedGuide("spiritual")
  },
  city: cityLike(),
  road: roadLike(),
  market: foodLike("Market and daily life", "市场与日常生活", "市場與日常生活"),
  tea: {
    subtitle: phrase("Fields · Processing · Tasting", "茶园风土 · 制作过程 · 品饮体验", "茶園風土 · 製作過程 · 品飲體驗", "Campos · Elaboración · Cata", "Campos · Produção · Degustação", "حقول · معالجة · تذوق"),
    season: phrase("Tea harvest seasons are most vivid", "采茶季最有现场感", "採茶季最有現場感", "La cosecha del té es la época más viva", "A colheita do chá é a época mais viva", "موسم حصاد الشاي هو الأكثر حيوية"),
    pace: phrase("Half day with tasting time", "半日体验，留出品饮时间", "半日體驗，留出品飲時間", "Medio día con tiempo para catar", "Meio dia com tempo para degustar", "نصف يوم مع وقت للتذوق"),
    people: phrase("Tea, nature and culture lovers", "茶文化、自然与慢旅行爱好者", "茶文化、自然與慢旅行愛好者", "Amantes del té, naturaleza y cultura", "Amantes de chá, natureza e cultura", "محبو الشاي والطبيعة والثقافة"),
    keywords: phrase("Fields, makers, aroma, tasting", "茶园 · 茶农 · 香气 · 品鉴", "茶園 · 茶農 · 香氣 · 品鑑", "Campos, productores, aroma, cata", "Campos, produtores, aroma, degustação", "حقول، صناع، رائحة، تذوق"),
    lead: phrase("Tea is best understood from the field to the cup.", "茶最好从茶园看到杯中，才真正理解风土。", "茶最好從茶園看到杯中，才真正理解風土。", "El té se entiende mejor del campo a la taza.", "O chá se entende melhor do campo à xícara.", "يفهم الشاي من الحقل إلى الكوب."),
    advice: sharedAdvice("tea"),
    guide: sharedGuide("tea")
  },
  coast: {
    subtitle: phrase("Sea views · Harbor life · Local food", "海岸风景 · 港口生活 · 地方海味", "海岸風景 · 港口生活 · 地方海味", "Mar · Puerto · Comida local", "Mar · Porto · Comida local", "بحر · ميناء · طعام محلي"),
    season: phrase("Clear weather and comfortable sea breeze", "天气晴朗、海风舒适时最佳", "天氣晴朗、海風舒適時最佳", "Cielo claro y brisa cómoda", "Tempo claro e brisa confortável", "طقس صاف ونسيم مريح"),
    pace: phrase("Half day with meal or sunset", "半日游，可结合用餐或日落", "半日遊，可結合用餐或日落", "Medio día con comida o atardecer", "Meio dia com refeição ou pôr do sol", "نصف يوم مع وجبة أو غروب"),
    people: phrase("Families, seafood lovers and slow travelers", "家庭、海鲜爱好者与慢旅行者", "家庭、海鮮愛好者與慢旅行者", "Familias, amantes del marisco y viajeros lentos", "Famílias, amantes de frutos do mar e viajantes lentos", "العائلات ومحبو المأكولات البحرية والسفر البطيء"),
    keywords: phrase("Harbor, fishing, old streets, sea breeze", "港口 · 渔船 · 老街 · 海风", "港口 · 漁船 · 老街 · 海風", "Puerto, pesca, calles antiguas, brisa", "Porto, pesca, ruas antigas, brisa", "ميناء، صيد، شوارع قديمة، نسيم البحر"),
    lead: phrase("The coast is strongest when scenery and working harbor life are seen together.", "海岸最动人的地方，是风景和真实港口生活一起出现。", "海岸最動人的地方，是風景和真實港口生活一起出現。", "La costa se entiende mejor cuando paisaje y puerto vivo aparecen juntos.", "A costa ganha força quando paisagem e vida portuária aparecem juntas.", "الساحل أجمل عندما يجتمع المنظر مع حياة الميناء اليومية."),
    advice: sharedAdvice("coast"),
    guide: sharedGuide("coast")
  }
};

function phrase(en: string, zhCN: string, zhTW: string, es: string, pt: string, ar: string): Phrase {
  return { en, "zh-CN": zhCN, "zh-TW": zhTW, es, pt, ar };
}

function simplePhrase(en: string, zhCN: string, zhTW: string): Phrase {
  const translated: Partial<Record<string, Pick<Phrase, "es" | "pt" | "ar">>> = {
    "Best moment": { es: "Mejor momento", pt: "Melhor momento", ar: "أفضل وقت" },
    "Start local": { es: "Empieza en lo local", pt: "Comece pelo local", ar: "ابدأ بالمحلي" },
    "Walk and observe": { es: "Caminar y observar", pt: "Caminhar e observar", ar: "امش وراقب" },
    "Understand the setting": { es: "Entender el contexto", pt: "Entender o contexto", ar: "افهم السياق" },
    "Stay flexible": { es: "Mantener flexibilidad", pt: "Mantenha flexibilidade", ar: "حافظ على المرونة" },
    "Route by rhythm": { es: "Ruta por ritmo", pt: "Rota pelo ritmo", ar: "مسار حسب الإيقاع" },
    "Private route": { es: "Ruta privada", pt: "Rota privada", ar: "مسار خاص" },
    "Local interpretation": { es: "Interpretación local", pt: "Interpretação local", ar: "شرح محلي" },
    "Flexible transport": { es: "Transporte flexible", pt: "Transporte flexível", ar: "نقل مرن" },
    "Use morning or late afternoon when light, crowds and pace are usually softer.": {
      es: "Usa la mañana o el final de la tarde, cuando la luz, la gente y el ritmo suelen ser más suaves.",
      pt: "Use a manhã ou o fim da tarde, quando luz, público e ritmo costumam ser mais suaves.",
      ar: "اختر الصباح أو آخر النهار عندما يكون الضوء والزحام والإيقاع أهدأ."
    },
    "Begin with a market, old shop or neighborhood street before sitting down.": {
      es: "Empieza por un mercado, una tienda antigua o una calle de barrio antes de sentarte.",
      pt: "Comece por um mercado, uma loja antiga ou uma rua de bairro antes de se sentar.",
      ar: "ابدأ بسوق أو متجر قديم أو شارع حي قبل الجلوس."
    },
    "Keep the route comfortable, with pauses for details and local scenes.": {
      es: "Mantén la ruta cómoda, con pausas para detalles y escenas locales.",
      pt: "Mantenha a rota confortável, com pausas para detalhes e cenas locais.",
      ar: "اجعل المسار مريحا مع توقفات للتفاصيل والمشاهد المحلية."
    },
    "Connect scenery, history, daily life and local habits instead of only taking photos.": {
      es: "Conecta paisaje, historia, vida diaria y costumbres locales, no solo fotos.",
      pt: "Conecte paisagem, história, vida diária e hábitos locais, não apenas fotos.",
      ar: "اربط المنظر بالتاريخ والحياة اليومية والعادات المحلية، لا بالتصوير فقط."
    },
    "Leave space for weather, energy and small discoveries along the way.": {
      es: "Deja margen para el clima, la energía y pequeños hallazgos del camino.",
      pt: "Deixe espaço para clima, energia e pequenas descobertas no caminho.",
      ar: "اترك مجالا للطقس والطاقة والاكتشافات الصغيرة في الطريق."
    },
    "Plan the order around season, distance, light and the group's energy.": {
      es: "Ordena el día según temporada, distancia, luz y energía del grupo.",
      pt: "Organize o dia conforme temporada, distância, luz e energia do grupo.",
      ar: "رتب اليوم حسب الموسم والمسافة والضوء وطاقة المجموعة."
    },
    "Use stories, maps and details to explain why the place matters.": {
      es: "Usa historias, mapas y detalles para explicar por qué importa el lugar.",
      pt: "Use histórias, mapas e detalhes para explicar por que o lugar importa.",
      ar: "استخدم القصص والخرائط والتفاصيل لشرح أهمية المكان."
    },
    "Add private transfers when entrances, viewpoints or villages are far apart.": {
      es: "Añade traslados privados cuando entradas, miradores o aldeas estén separados.",
      pt: "Inclua traslados privados quando entradas, mirantes ou vilas estiverem distantes.",
      ar: "أضف نقلا خاصا عندما تكون المداخل أو نقاط المشاهدة أو القرى متباعدة."
    }
  };
  const extra = translated[en];
  return {
    en,
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    es: extra?.es ?? en,
    pt: extra?.pt ?? en,
    ar: extra?.ar ?? en
  };
}

function sharedAdvice(kind: RecommendationKind) {
  const first = kind === "food" || kind === "market"
    ? ["Start local", "从本地场景开始", "從在地場景開始", "Begin with a market, old shop or neighborhood street before sitting down.", "先看市场、老店或社区街巷，再坐下来吃，会更有理解。", "先看市場、老店或社區街巷，再坐下來吃，會更有理解。"]
    : ["Best moment", "最佳体验时段", "最佳體驗時段", "Use morning or late afternoon when light, crowds and pace are usually softer.", "清晨或傍晚通常光线更柔和，人也更少，适合慢慢看。", "清晨或傍晚通常光線更柔和，人也更少，適合慢慢看。"];
  return [
    { icon: "camera" as IconName, title: simplePhrase(first[0], first[1], first[2]), body: simplePhrase(first[3], first[4], first[5]) },
    { icon: "shoe" as IconName, title: simplePhrase("Walk and observe", "步行细看", "步行細看"), body: simplePhrase("Keep pauses for materials, routes, local use and visible details.", "路线不赶，给材质、动线、现场使用方式和可见细节留出时间。", "路線不趕，給材質、動線、現場使用方式和可見細節留出時間。") },
    { icon: "mountain" as IconName, title: simplePhrase("Understand the setting", "理解地点关系", "理解地點關係"), body: simplePhrase("Explain why this place belongs here through terrain, craft, foodways, buildings or community use.", "从地形、工艺、饮食、建筑或社区使用方式说明这个地点为什么在这里成立。", "從地形、工藝、飲食、建築或社區使用方式說明這個地點為什麼在這裡成立。") },
    { icon: "hat" as IconName, title: simplePhrase("Stay flexible", "留出调整空间", "留出調整空間"), body: simplePhrase("Leave room for opening hours, weather, crowds and actual walking conditions.", "给开放时间、天气、人流和实际步行条件留出调整空间。", "給開放時間、天氣、人流和實際步行條件留出調整空間。") }
  ];
}

function sharedGuide(kind: RecommendationKind) {
  const routeTitle = kind === "road" ? ["Private route", "私人路线", "私人路線"] : ["Site route", "按现场动线游览", "按現場動線遊覽"];
  return [
    { icon: "route" as IconName, title: simplePhrase(routeTitle[0], routeTitle[1], routeTitle[2]), body: simplePhrase("Plan the order by what the place actually needs: access, viewing points, openings and walking time.", "按地点实际需要安排顺序：入口、看点、开放时间和步行时间都要说清。", "按地點實際需要安排順序：入口、看點、開放時間和步行時間都要說清。") },
    { icon: "book" as IconName, title: simplePhrase("Specific interpretation", "针对性讲解", "針對性講解"), body: simplePhrase("Explain the site's own topic, visible details and local use instead of generic background.", "讲清地点自己的主题、可见细节和本地使用方式，避免空泛背景。", "講清地點自己的主題、可見細節和在地使用方式，避免空泛背景。") },
    { icon: "car" as IconName, title: simplePhrase("Access support", "交通与预约协助", "交通與預約協助"), body: simplePhrase("Add transfer, reservation or timing support only when the site needs it.", "根据地点距离、开放时间、预约和返程条件安排接送或协助。", "根據地點距離、開放時間、預約和返程條件安排接送或協助。") }
  ];
}

function foodLike(en: string, zhCN: string, zhTW: string) {
  return {
    subtitle: simplePhrase(`${en} · Ingredients · Table culture`, `${zhCN} · 地方食材 · 餐桌文化`, `${zhTW} · 地方食材 · 餐桌文化`),
    season: simplePhrase("Morning markets, lunch or evening streets", "早市、午餐或夜间街巷最合适", "早市、午餐或夜間街巷最合適"),
    pace: simplePhrase("Two to four hours, with tasting stops", "2-4小时，边走边尝", "2-4小時，邊走邊嘗"),
    people: simplePhrase("Food lovers and curious travelers", "美食爱好者与好奇型旅行者", "美食愛好者與好奇型旅行者"),
    keywords: simplePhrase("Markets, ingredients, local habits", "市场 · 食材 · 本地吃法", "市場 · 食材 · 在地吃法"),
    lead: simplePhrase("Taste is only the beginning; ingredients and habits make the place memorable.", "味道只是开始，真正值得看的是食材、做法和当地人的日常吃法。", "味道只是開始，真正值得看的是食材、做法和當地人的日常吃法。"),
    advice: sharedAdvice("food"),
    guide: sharedGuide("food")
  };
}

function villageLike(en: string, zhCN: string, zhTW: string) {
  return {
    subtitle: simplePhrase(`${en} · Homes · Everyday rhythm`, `${zhCN} · 民居街巷 · 日常节奏`, `${zhTW} · 民居街巷 · 日常節奏`),
    season: simplePhrase("Spring, autumn or festival periods", "春秋舒适，也可结合节庆", "春秋舒適，也可結合節慶"),
    pace: simplePhrase("Slow half day or overnight stay", "慢半日或住一晚更好", "慢半日或住一晚更好"),
    people: simplePhrase("Families, culture lovers and slow travelers", "家庭、文化爱好者与慢旅行者", "家庭、文化愛好者與慢旅行者"),
    keywords: simplePhrase("Homes, lanes, fields, daily life", "民居 · 巷道 · 田地 · 日常", "民居 · 巷道 · 田地 · 日常"),
    lead: simplePhrase("Move slowly and respectfully; this is a lived place, not a stage.", "放慢脚步、保持分寸，把这里当作真实生活空间来理解。", "放慢腳步、保持分寸，把這裡當作真實生活空間來理解。"),
    advice: sharedAdvice("village"),
    guide: sharedGuide("village")
  };
}

function craftLike() {
  return {
    subtitle: simplePhrase("Materials · Process · Local aesthetics", "材料工序 · 匠人经验 · 地方审美", "材料工序 · 匠人經驗 · 地方審美"),
    season: simplePhrase("Workshop hours, with advance booking", "工作室开放时段，建议提前预约", "工作室開放時段，建議提前預約"),
    pace: simplePhrase("Two to three hours for close looking", "2-3小时，适合细看", "2-3小時，適合細看"),
    people: simplePhrase("Design, craft and culture lovers", "设计、手作与文化爱好者", "設計、手作與文化愛好者"),
    keywords: simplePhrase("Makers, tools, materials, details", "匠人 · 工具 · 材料 · 细节", "匠人 · 工具 · 材料 · 細節"),
    lead: simplePhrase("The value is in process and detail, not just the finished object.", "重点不是只看成品，而是看材料、工序和匠人的判断。", "重點不是只看成品，而是看材料、工序和匠人的判斷。"),
    advice: sharedAdvice("craft"),
    guide: sharedGuide("craft")
  };
}

function cityLike() {
  return {
    subtitle: simplePhrase("Streets · Neighborhoods · Contemporary life", "街区肌理 · 城市生活 · 当代中国", "街區肌理 · 城市生活 · 當代中國"),
    season: simplePhrase("Year-round, adjusted by weather", "四季皆可，按天气调整", "四季皆可，按天氣調整"),
    pace: simplePhrase("Half day or evening walk", "半日或夜间漫步", "半日或夜間漫步"),
    people: simplePhrase("Urban culture and photography lovers", "城市文化与摄影爱好者", "城市文化與攝影愛好者"),
    keywords: simplePhrase("Streets, skyline, local routines", "街巷 · 天际线 · 本地日常", "街巷 · 天際線 · 在地日常"),
    lead: simplePhrase("A city is best understood through both landmarks and daily routines.", "理解一座城市，不只看地标，也要看街巷里的日常。", "理解一座城市，不只看地標，也要看街巷裡的日常。"),
    advice: sharedAdvice("city"),
    guide: sharedGuide("city")
  };
}

function roadLike() {
  return {
    subtitle: simplePhrase("Road scenery · Flexible stops · Private comfort", "沿途风景 · 灵活停靠 · 私人舒适", "沿途風景 · 靈活停靠 · 私人舒適"),
    season: simplePhrase("Choose by weather and road conditions", "按天气与路况选择", "按天氣與路況選擇"),
    pace: simplePhrase("Full day or multi-day route", "一日或多日路线", "一日或多日路線"),
    people: simplePhrase("Families and travelers who prefer flexible pacing", "家庭与喜欢灵活节奏的旅行者", "家庭與喜歡靈活節奏的旅行者"),
    keywords: simplePhrase("Roads, stops, scenery, comfort", "公路 · 停靠 · 风景 · 舒适", "公路 · 停靠 · 風景 · 舒適"),
    lead: simplePhrase("The route itself can be part of the journey, with stops chosen by season and mood.", "路线本身也可以成为旅程的一部分，停靠点按季节与心情调整。", "路線本身也可以成為旅程的一部分，停靠點按季節與心情調整。"),
    advice: sharedAdvice("road"),
    guide: sharedGuide("road")
  };
}

function l(lang: Lang, phraseValue: Phrase) {
  return phraseValue[lang] ?? phraseValue.en;
}

function destinationPhrase(en: string, zhCN: string, es?: string, pt?: string, ar?: string): Phrase {
  return {
    en,
    "zh-CN": zhCN,
    "zh-TW": toTraditionalChinese(zhCN),
    es: es ?? en,
    pt: pt ?? en,
    ar: ar ?? en
  };
}

function destinationFocusMeta(attraction: ProvinceRecommendation, base: (typeof kindMeta)[RecommendationKind]) {
  const focus = attraction.focus;
  const focusZh = attraction.focusZh;
  const name = attraction.name;
  const nameZh = attraction.nameZh;
  const byKind: Record<RecommendationKind, { season: string; pace: string; people: string; lead: string }> = {
    heritage: {
      season: "春秋或清晨傍晚更适合慢走、拍照和听讲解",
      pace: "半日到一日，按重点街区或核心遗存慢慢看",
      people: "历史、建筑、城市记忆和摄影爱好者",
      lead: `${nameZh}适合从${focusZh}进入，把真实可见的现场细节、地方记忆和城市背景串起来。`
    },
    nature: {
      season: "按花期、水量、雪景或晴朗天气选择",
      pace: "半日到一日，预留观景、步行和天气调整时间",
      people: "家庭、摄影爱好者和自然旅行者",
      lead: `${nameZh}适合顺着${focusZh}安排节奏，让地形、季节和光线本身说明这里的特点。`
    },
    food: {
      season: "早市、午餐或夜间街巷最适合",
      pace: "2-4小时，边走边尝，留出排队和交流时间",
      people: "美食爱好者、好奇型旅行者和本地生活观察者",
      lead: `${nameZh}要从${focusZh}进入，看食材、做法、点单习惯和街区日常如何连在一起。`
    },
    village: {
      season: "春秋舒适，节庆或农事季更有现场感",
      pace: "半日到一日，在聚落或古镇内部慢走停留",
      people: "家庭、摄影爱好者、古镇和在地文化旅行者",
      lead: `${nameZh}需要把${focusZh}放回真实聚落现场，连同民居、巷道、水系、院落和日常使用方式一起看。`
    },
    craft: {
      season: "工作室开放时段最佳，建议提前确认体验时间",
      pace: "2-3小时，留给工序、材料和手艺人讲解",
      people: "设计、手作、工艺和文化爱好者",
      lead: `${nameZh}适合从${focusZh}展开，把材料、工具、制作过程和仍在工作的手艺现场讲清楚。`
    },
    spiritual: {
      season: "清晨或非高峰时段更安静",
      pace: "半日到一日，保持安静节奏",
      people: "文化、建筑、信仰空间和慢行旅行者",
      lead: `${nameZh}适合从${focusZh}理解，同时注意礼仪、空间格局和当地人今天怎样使用这里。`
    },
    city: {
      season: "早晚光线柔和，工作日更适合观察日常",
      pace: "2-4小时，按街区和交通节点串联",
      people: "城市漫步、建筑、交通和本地生活爱好者",
      lead: `${nameZh}需要从${focusZh}看街区如何运转，把建筑、店铺、交通和普通日常放在一起。`
    },
    road: {
      season: "按路况、天气和沿途景观季节选择",
      pace: "一日或多日，按停靠点和交通距离安排",
      people: "自驾、摄影和深度路线旅行者",
      lead: `${nameZh}的重点是${focusZh}，移动过程、停靠点和沿途变化本身就是体验。`
    },
    market: {
      season: "清晨或本地采购高峰最有现场感",
      pace: "1-3小时，边看边聊，适合慢慢比较摊位",
      people: "美食、摄影、市场和本地生活爱好者",
      lead: `${nameZh}要从${focusZh}看摊位、货品、摊主、采购习惯和街坊交流。`
    },
    tea: {
      season: "采茶季最有现场感，也可按茶园景色选择",
      pace: "半日体验，留出步行、制茶和品饮时间",
      people: "茶文化、自然和慢旅行爱好者",
      lead: `${nameZh}要把${focusZh}与茶园环境、采摘、制作和品饮连起来。`
    },
    coast: {
      season: "天气晴朗、海风舒适时最佳",
      pace: "半日游，可结合用餐、港口或日落",
      people: "家庭、海鲜爱好者和慢旅行者",
      lead: `${nameZh}要通过${focusZh}连接海岸景色、港口生活、老街和地方海味。`
    }
  };
  const specific = byKind[attraction.kind];
  return {
    ...base,
    subtitle: destinationPhrase(focus, focusZh, `Enfoque: ${focus}`, `Foco: ${focus}`, `Focus: ${focus}`),
    season: destinationPhrase(base.season.en, specific.season, base.season.es, base.season.pt, base.season.ar),
    pace: destinationPhrase(base.pace.en, specific.pace, base.pace.es, base.pace.pt, base.pace.ar),
    people: destinationPhrase(base.people.en, specific.people, base.people.es, base.people.pt, base.people.ar),
    keywords: destinationPhrase(focus, focusZh, `Claves: ${focus}`, `Palavras-chave: ${focus}`, `Keywords: ${focus}`),
    lead: destinationPhrase(
      `${name} should be read through ${focus}, with the route shaped by real details, local rhythm and the setting on site.`,
      specific.lead,
      `Usa ${focus} como hilo principal de ${name}, con detalles reales del lugar.`,
      `Use ${focus} como fio principal de ${name}, com detalhes reais do lugar.`,
      `${name} should be read through ${focus}.`
    )
  };
  return {
    ...base,
    subtitle: destinationPhrase(
      attraction.focus,
      attraction.focusZh,
      `Enfoque: ${attraction.focus}`,
      `Foco: ${attraction.focus}`,
      `التركيز: ${attraction.focus}`
    ),
    keywords: destinationPhrase(
      attraction.focus,
      attraction.focusZh,
      `Claves: ${attraction.focus}`,
      `Palavras-chave: ${attraction.focus}`,
      `كلمات مفتاحية: ${attraction.focus}`
    ),
    lead: destinationPhrase(
      `Start from ${attraction.focus}, then choose timing, walking distance and explanation depth around the group's pace.`,
      `${attraction.nameZh}适合从${attraction.focusZh}进入，再根据时间、体力和现场人流安排停留、讲解和拍照节奏。`,
      `Usa ${attraction.focus} como hilo principal de ${attraction.name}, ajustando horarios, distancia a pie y explicación al ritmo del grupo.`,
      `Use ${attraction.focus} como fio principal de ${attraction.name}, ajustando horários, caminhada e explicação ao ritmo do grupo.`,
      `اجعل ${attraction.focus} هو خيط الزيارة الرئيسي في ${attraction.name}، ثم اضبط الوقت والمشي والشرح حسب إيقاع المجموعة.`
    )
  };
}

function auditedDestinationMeta(attraction: ProvinceRecommendation) {
  const name = attraction.name;
  const nameZh = attraction.nameZh || attraction.name;
  const focus = attraction.focus;
  const focusZh = attraction.focusZh || attraction.focus;
  const kind = attraction.kind;
  const isShortTransport = /Ferry|Cableway|Light Rail|Walk|Mid-Levels|Escalator/i.test(name);
  const tone: Record<RecommendationKind, { season: string; pace: string; people: string; lead: string }> = {
    heritage: {
      season: "春秋和清晨、傍晚更适合慢走、拍照和听讲解",
      pace: "半日到一日，按核心遗存、街巷和现场细节慢慢看",
      people: "历史、建筑、城市记忆和摄影爱好者",
      lead: `${nameZh}要从${focusZh}进入，把这个地点自己的核心空间、可见细节和历史背景讲清楚。`
    },
    nature: {
      season: "按花期、水量、雪景或晴朗天气选择",
      pace: "半日到一日，预留观景、步行和天气调整时间",
      people: "家庭、摄影爱好者和自然旅行者",
      lead: `${nameZh}要顺着${focusZh}安排节奏，让地形、季节和光线说明这里的特点。`
    },
    food: {
      season: "早市、午餐或夜间街巷最适合",
      pace: "2-4小时，边走边尝，留出排队和交流时间",
      people: "美食爱好者、好奇型旅行者和本地生活观察者",
      lead: `${nameZh}要从${focusZh}进入，看食材、做法、点单习惯和街区日常如何连在一起。`
    },
    village: {
      season: "春秋舒适，节庆或农事季更有现场感",
      pace: "半日到一日，在聚落、古镇或村路内部慢走停留",
      people: "家庭、摄影爱好者、古镇和在地文化旅行者",
      lead: `${nameZh}需要把${focusZh}放回真实聚落现场，把民居、巷道、水系和日常使用方式连起来看。`
    },
    craft: {
      season: "工作室开放时段最佳，建议提前确认体验时间",
      pace: "2-3小时，留给工序、材料和手艺人讲解",
      people: "设计、手作、工艺和文化爱好者",
      lead: `${nameZh}要从${focusZh}进入，把材料、工具、制作过程和仍在工作的手艺现场讲清楚。`
    },
    spiritual: {
      season: "清晨或非高峰时段更安静",
      pace: "半日到一日，保持安静节奏",
      people: "文化、建筑、信仰空间和慢行旅行者",
      lead: `${nameZh}适合从${focusZh}理解，同时注意礼仪、空间格局和当地人今天怎样使用这里。`
    },
    city: {
      season: "早晚光线柔和，工作日更适合观察日常",
      pace: "2-4小时，按街区和交通节点串联",
      people: "城市漫步、建筑、交通和本地生活爱好者",
      lead: `${nameZh}需要从${focusZh}看街区如何运转，把建筑、店铺、交通和普通日常放在一起。`
    },
    road: {
      season: isShortTransport ? "晴朗或傍晚更适合，需注意运营时间和天气" : "按路况、天气和沿途景观季节选择",
      pace: isShortTransport ? "30分钟到2小时，可与前后街区或观景点串联" : "一日或多日，按停靠点和交通距离安排",
      people: isShortTransport ? "城市交通、港口景观和慢旅行爱好者" : "自驾、摄影和深度路线旅行者",
      lead: `${nameZh}的重点是${focusZh}，移动过程、停靠点和沿途变化本身就是体验。`
    },
    market: {
      season: "清晨或本地采购高峰最有现场感",
      pace: "1-3小时，边看边聊，适合慢慢比较摊位",
      people: "美食、摄影、市场和本地生活爱好者",
      lead: `${nameZh}要从${focusZh}看摊位、货品、摊主、采购习惯和街坊交流。`
    },
    tea: {
      season: "采茶季最有现场感，也可按茶园景色选择",
      pace: "半日体验，留出步行、制茶和品饮时间",
      people: "茶文化、自然和慢旅行爱好者",
      lead: `${nameZh}要把${focusZh}与茶园环境、采摘、制作和品饮连起来。`
    },
    coast: {
      season: "天气晴朗、海风舒适时最佳",
      pace: "半日游，可结合用餐、港口或日落",
      people: "家庭、海鲜爱好者和慢旅行者",
      lead: `${nameZh}要通过${focusZh}连接海岸景色、港口生活、老街和地方海味。`
    }
  };
  const item = tone[kind];
  return {
    subtitle: destinationPhrase(focus, focusZh, `Enfoque: ${focus}`, `Foco: ${focus}`, `Focus: ${focus}`),
    season: destinationPhrase("Choose the season and hour around the site itself.", item.season),
    pace: destinationPhrase("Keep the route paced around real stops and local rhythm.", item.pace),
    people: destinationPhrase("Travelers who want local detail rather than a quick photo stop.", item.people),
    keywords: destinationPhrase(focus, focusZh, `Claves: ${focus}`, `Palavras-chave: ${focus}`, `Keywords: ${focus}`),
    lead: destinationPhrase(
      `${name} should be read through ${focus}, with the route shaped by real details, local rhythm and the setting on site.`,
      item.lead,
      `Usa ${focus} como hilo principal de ${name}, con detalles reales del lugar.`,
      `Use ${focus} como fio principal de ${name}, com detalhes reais do lugar.`,
      `${name} should be read through ${focus}.`
    ),
    advice: destinationAdvice(attraction),
    guide: destinationGuide(attraction)
  };
}

function destinationAdvice(attraction: ProvinceRecommendation) {
  const name = attraction.name;
  const nameZh = attraction.nameZh || attraction.name;
  const focus = attraction.focus;
  const focusZh = attraction.focusZh || attraction.focus;
  const card = (icon: IconName, enTitle: string, zhTitle: string, enBody: string, zhBody: string) => ({
    icon,
    title: destinationPhrase(enTitle, zhTitle),
    body: destinationPhrase(enBody, zhBody)
  });

  if (attraction.kind === "heritage") {
    return [
      card("camera", "Read the core space", "看核心空间", `Start ${name} from the spaces tied to ${focus}.`, `${nameZh}先看${focusZh}能落到哪几个具体空间，入口、主体建筑、遗存或街区关系不要跳过。`),
      card("shoe", "Slow down for details", "放慢看细部", `Use material, scale and visible traces to understand ${name}.`, `把材质、尺度、碑刻、屋顶线条或遗存边界逐项讲清，避免只说“历史悠久”。`),
      card("book", "Connect the city", "连接城市记忆", `${name} is stronger when its old layers are linked with today's city.`, `说明${nameZh}和今天的道路、社区、商业或城市记忆怎样相互叠加。`),
      card("hat", "Choose quiet light", "选择安静时段", `Pick calmer light and fewer crowds for the main details of ${name}.`, `清晨、傍晚或非高峰更适合观察重点细节，也方便讲解和拍照。`)
    ];
  }

  if (attraction.kind === "nature") {
    return [
      card("camera", "Watch the defining view", "看标志景观", `Read ${name} through ${focus}, not as a generic landscape stop.`, `${nameZh}先抓住${focusZh}，再看地形、水系、植被、云雾或季节颜色如何形成辨识度。`),
      card("shoe", "Match the walking route", "匹配步行路线", `Choose paths and viewpoints that fit the terrain of ${name}.`, `步道、观景台和停留点要按实际地形安排，给上下坡、排队和返回留余量。`),
      card("mountain", "Wait for light and weather", "等光线与天气", `Light and weather often decide how ${name} reads.`, `山水类地点不要赶，云雾、日照、水量和能见度会直接影响观看体验。`),
      card("hat", "Keep safety margins", "保留安全余量", `Keep time for weather, visibility and group energy at ${name}.`, `雨雪、雾气、海拔或湿滑路面都要预留调整空间，不把行程压得太满。`)
    ];
  }

  if (attraction.kind === "food" || attraction.kind === "market") {
    return [
      card("camera", "Start with ingredients", "从食材摊位开始", `Begin ${name} with ingredients, vendors and ordering habits.`, `${nameZh}先看${focusZh}对应的食材、摊位、厨房或排队方式，再决定怎么吃。`),
      card("shoe", "Taste in small steps", "边走边少量尝", `Taste across a few stops instead of compressing ${name} into one dish.`, `适合小份试吃，比较做法、调味、火候和本地人的选择，不把体验压缩成一道菜。`),
      card("book", "Ask about local habits", "问清本地吃法", `Local habits explain why ${name} matters.`, `讲清什么时候吃、怎么点、配什么、为什么这样做，体验才不会只剩拍照。`),
      card("hat", "Respect market rhythm", "尊重市场节奏", `Crowds, vendors and table turnover shape the visit at ${name}.`, `早市、饭点或夜市人流不同，拍摄和停留要避开摊主忙碌时刻。`)
    ];
  }

  if (attraction.kind === "village") {
    return [
      card("camera", "Observe lived spaces", "看真实生活空间", `Read ${name} through homes, lanes and public spaces tied to ${focus}.`, `${nameZh}重点看${focusZh}如何出现在民居、巷道、水系、田地或公共空间里。`),
      card("shoe", "Walk without rushing", "慢走村巷", `A slower walk keeps ${name} from becoming a quick photo stop.`, `路线不必求全，给转角、门前、河边和村民日常留出停顿。`),
      card("book", "Understand local use", "理解当地使用方式", `Explain how people still use the spaces of ${name}.`, `讲清这些空间今天怎样被居住、买卖、祭祀、劳动或休闲使用。`),
      card("hat", "Keep quiet manners", "保持安静分寸", `Visit ${name} respectfully because it is also someone's home.`, `遇到住宅、老人、孩子或私人院落时放低声音，先确认再拍摄。`)
    ];
  }

  if (attraction.kind === "craft") {
    return [
      card("camera", "Watch the making", "看制作现场", `At ${name}, the process behind ${focus} matters more than display shelves.`, `${nameZh}重点不是陈列成品，而是看${focusZh}怎样落实到材料、工具、手上动作和工序判断。`),
      card("shoe", "Compare close details", "比较细节差异", `Look closely at texture, color, tools and hand movement at ${name}.`, `把针脚、泥性、火候、纹样、色阶或刀工放近看，差别才会变得清楚。`),
      card("book", "Ask about standards", "问清判断标准", `The maker's criteria explain the value of ${name}.`, `让师傅讲什么算好作品、哪里最难、为什么需要时间，而不只听成品价格。`),
      card("hat", "Book the right time", "提前确认时段", `Demonstrations at ${name} may depend on workshop hours.`, `工坊开放、示范和可体验内容经常不同，适合提前确认，不临时硬闯。`)
    ];
  }

  if (attraction.kind === "spiritual") {
    return [
      card("camera", "Respect the ritual space", "先尊重礼仪空间", `Read ${name} through etiquette, route and the living faith behind ${focus}.`, `${nameZh}先看礼仪、动线和${focusZh}，再进入殿堂、院落或山路。`),
      card("shoe", "Follow the temple rhythm", "跟着寺院节奏", `The sequence of halls, paths and courtyards matters at ${name}.`, `不要只拍大门或主殿，适合按山门、院落、殿堂、香火和周边空间慢慢走。`),
      card("book", "Separate history and belief", "区分历史与信仰", `Explain ${name} through both history and present-day practice.`, `讲解要分清历史背景、建筑格局、传说故事和今天仍在延续的信仰生活。`),
      card("hat", "Choose quieter hours", "选择清静时段", `Quiet hours make ${name} easier to understand respectfully.`, `清晨或非高峰更适合安静参观，也减少对礼佛、诵经或本地香客的打扰。`)
    ];
  }

  if (attraction.kind === "city") {
    return [
      card("camera", "Read the street level", "从街面看城市", `Understand ${name} from the street level tied to ${focus}.`, `${nameZh}不要只看远景，要把${focusZh}放到街面、店铺、交通、人流和建筑尺度里看。`),
      card("shoe", "Walk between nodes", "串联关键节点", `A city route works best when ${name} links several real nodes.`, `选择几个真实节点慢慢串联，转角、天桥、老店、车站或社区入口都可能是重点。`),
      card("book", "Explain daily routines", "讲清日常运转", `Daily routines make ${name} more than a skyline.`, `说明当地人怎样通勤、购物、休闲、吃饭，这比单看地标更能理解城市。`),
      card("hat", "Leave room for detours", "留出转弯时间", `Small detours often reveal the character of ${name}.`, `城市漫步要给临时发现留时间，不把路线排成连续拍照点。`)
    ];
  }

  if (attraction.kind === "road") {
    return [
      card("camera", "Treat movement as the view", "把移动当体验", `${name} is understood through movement, stops and changing views.`, `${nameZh}的重点是${focusZh}，车程、船程、步行段或索道视角本身就是内容。`),
      card("shoe", "Choose real stops", "选择有效停靠", `Stops should explain the route, not only interrupt the drive at ${name}.`, `停靠点要能看到地形、港口、桥梁、村镇或城市边界的变化，不随便停。`),
      card("book", "Explain the route logic", "讲清路线逻辑", `The route at ${name} needs context for why it exists.`, `说明这条路、船线或交通方式为什么形成，和本地生活、贸易、通勤或观景有什么关系。`),
      card("hat", "Check timing and operations", "核对时间与运营", `Timing, weather and operations matter for ${name}.`, `提前看运营时间、潮汐、路况、天气和返程方式，避免只到现场碰运气。`)
    ];
  }

  if (attraction.kind === "tea") {
    return [
      card("camera", "Start in the tea field", "从茶园开始", `Read ${name} from fields and terrain before tasting.`, `${nameZh}先看${focusZh}里的茶园位置、坡度、树种和采摘环境，再进入品饮。`),
      card("shoe", "Follow the process", "看完整工序", `The process from leaf to cup explains ${name}.`, `把采摘、摊晾、杀青、揉捻、烘焙或冲泡顺序讲清，茶味才有来处。`),
      card("book", "Compare aroma and season", "比较香气与季节", `Season and processing shape the flavor at ${name}.`, `春茶、秋茶、焙火、山场或树龄都会影响口感，适合边闻边问。`),
      card("hat", "Leave tasting time", "留足品饮时间", `Good tea visits at ${name} should not rush the cup.`, `品茶要留时间，不要把茶园、制茶和喝茶压成几分钟拍照。`)
    ];
  }

  return [
    card("camera", "Read the coast itself", "看海岸本身", `Read ${name} through ${focus}, harbor life and shoreline details.`, `${nameZh}要把${focusZh}和海岸线、港口、渔船、市场或老街一起看。`),
    card("shoe", "Walk by tide and wind", "按潮汐海风安排", `Tide, wind and light decide the rhythm at ${name}.`, `海边路线要看潮汐、风力、日照和安全边界，别只按地图距离走。`),
    card("book", "Connect seafood and work", "连接海味与劳作", `Food and harbor work explain the coast at ${name}.`, `如果有海鲜市场、码头或渔船，应讲清捕捞、交易、做法和本地吃法。`),
    card("hat", "Keep weather flexibility", "保留天气弹性", `Coastal visits need room for weather changes at ${name}.`, `海雾、强风、雨天或晒热都会影响体验，行程要预留调整空间。`)
  ];
}

function destinationGuide(attraction: ProvinceRecommendation) {
  const name = attraction.name;
  const nameZh = attraction.nameZh || attraction.name;
  const focus = attraction.focus;
  const focusZh = attraction.focusZh || attraction.focus;
  const card = (icon: IconName, enTitle: string, zhTitle: string, enBody: string, zhBody: string) => ({
    icon,
    title: destinationPhrase(enTitle, zhTitle),
    body: destinationPhrase(enBody, zhBody)
  });

  const routeByKind: Record<RecommendationKind, [string, string, string, string]> = {
    heritage: ["Layered heritage route", "历史层次导览", `Arrange ${name} from arrival space to core remains and surrounding context.`, `${nameZh}按入口、核心遗存、细部观察和周边城市关系来走。`],
    nature: ["Viewpoint and trail route", "观景与步道导览", `Match ${name} to viewpoints, trail difficulty and weather windows.`, `${nameZh}按观景点、步道难度、天气窗口和返程时间安排。`],
    food: ["Market-to-table walk", "从食材到餐桌", `Use vendors, kitchens and tasting stops to explain ${name}.`, `${nameZh}从摊位、厨房、点单和品尝串起来讲，不只安排吃饭。`],
    village: ["Lived-village walk", "村落生活导览", `Read ${name} through homes, lanes, water, fields and public spaces.`, `${nameZh}按民居、巷道、水系、田地和公共空间慢慢走。`],
    craft: ["Workshop process route", "工序导览", `Explain ${name} from materials and tools to handwork and finished judgment.`, `${nameZh}从材料、工具、制作步骤到成品判断标准逐步讲清。`],
    spiritual: ["Ritual-space route", "礼仪空间导览", `Visit ${name} through etiquette, courtyards, halls and belief context.`, `${nameZh}按礼仪、院落、殿堂、山路或信仰背景安排顺序。`],
    city: ["Street-level route", "街面城市导览", `Read ${name} through streets, transport, storefronts and everyday routines.`, `${nameZh}从街面、交通、店铺、人流和日常使用方式看城市。`],
    road: ["Flexible private route", "灵活私人路线", `Plan ${name} by operating time, stops, road or water conditions and return options.`, `${nameZh}按运营时间、停靠点、路况或水况和返程方式安排。`],
    market: ["Market rhythm walk", "市场节奏导览", `Follow buying times, vendor sections and tasting stops at ${name}.`, `${nameZh}按采购时间、摊位分区、试吃点和人流节奏来走。`],
    tea: ["Field-to-cup route", "从茶园到杯中", `Connect fields, making, tasting and season at ${name}.`, `${nameZh}把茶园、采制、冲泡、品鉴和季节差异连起来。`],
    coast: ["Harbor and shore route", "港口海岸导览", `Connect shore views, harbor work, seafood and old streets at ${name}.`, `${nameZh}把海岸视野、码头劳作、海鲜市场和老街生活串起来。`]
  };
  const route = routeByKind[attraction.kind];
  return [
    card("route", route[0], route[1], route[2], route[3]),
    card("book", "Site-specific interpretation", "针对性讲解", `Use ${focus} to explain why ${name} is worth seeing.`, `讲解要紧扣${focusZh}，说明${nameZh}自己的来历、看点和现场细节。`),
    card("car", "Service matched to the site", "按地点匹配服务", `Choose walking, transfer, reservation or translation support according to ${name}.`, `根据${nameZh}的距离、开放时间、人流、预约和交通条件安排步行、接送或翻译协助。`)
  ];
}

function destinationHowToVisitLead(attraction: ProvinceRecommendation) {
  const name = attraction.name;
  const nameZh = attraction.nameZh || attraction.name;
  const focus = attraction.focus;
  const focusZh = attraction.focusZh || attraction.focus;
  return destinationPhrase(
    `Guiding for ${name} should be arranged around ${focus}, on-site details and practical access.`,
    `${nameZh}的导览应根据${focusZh}、现场细节和实际交通来安排。`
  );
}

function reviewedDestinationTone(attraction: ProvinceRecommendation) {
  const nameZh = attraction.nameZh || attraction.name;
  const focusZh = attraction.focusZh || attraction.focus;
  const isShortTransport = /Ferry|Cableway|Light Rail|Walk|Mid-Levels|Escalator/i.test(attraction.name);
  const custom: Record<string, { lead: string; notesLead: string; guideLead: string }> = {
    "婺源村落": {
      lead: "婺源村落需要把白墙黑瓦、溪流巷道、田野花期和晒秋场景放回真实村落现场，看徽派民居、祠堂、水口和田埂怎样组成仍在使用的乡村生活。",
      notesLead: "婺源村落要从村口、水系、巷道、祠堂、田地和季节活动慢慢进入，把风景、居住、农事和地方记忆连起来看。",
      guideLead: "婺源村落的导览要按村口进入、巷道转折、水系、祠堂、田地和季节活动来安排，不只是介绍几处拍照点。"
    },
    "青岛老城": {
      lead: "青岛老城要把圣弥厄尔教堂、德式街区、红瓦坡屋顶、老街坡道和海边转场放在一起看，重点是山海之间的老城尺度，而不是现代天际线。",
      notesLead: "青岛老城适合从教堂和老街坡道出发，串联江苏路、广西路一带的德式立面、街区小店、栈桥方向和海风里的城市记忆。",
      guideLead: "青岛老城的导览要按教堂、德式街区、坡道街巷、红瓦屋顶视角和海边转场来安排，讲清它和现代海湾景观的区别。"
    },
    "蓬莱阁": {
      lead: "蓬莱阁要看丹崖山上的主阁、庙宇院落、海防城墙、炮台和观海视野如何叠在一起，重点是“海上仙山”传说与真实海防遗存的关系。",
      notesLead: "蓬莱阁游览应从山门、城墙和院落动线进入，停在主阁、天后宫、龙王宫、吕祖殿、炮台和观海平台前，把八仙传说、登州海防和胶东海岸地形讲清楚。",
      guideLead: "蓬莱阁的导览要按山门进入、城墙上行、主阁院落、庙宇建筑、炮台和观海平台安排，不把它简化成一段海边城墙。"
    },
    "潭门渔港": {
      lead: "潭门渔港要看成排渔船、码头补给、海鲜上岸、渔具修整和临港街巷怎样构成琼海东海岸的渔业日常，而不是游客坐船合影。",
      notesLead: "潭门渔港游览应围绕渔船靠岸、卸货分拣、海鲜市场、港边餐馆和老街生活展开，把南海捕捞、港口补给和本地餐桌连起来。",
      guideLead: "潭门渔港的导览要按码头、渔船、卸货点、海鲜市场和港边街巷安排，避开只把它做成海上体验照片。"
    },
    "青铜峡一百零八塔": {
      lead: "青铜峡一百零八塔要看黄河西岸山坡上的佛塔群本体：奇数层级、三角阵列、塔身形制、台阶动线和山河关系，而不是青铜峡水利枢纽。",
      notesLead: "青铜峡一百零八塔参观应从下方平台和正面视角开始，观察塔群层级、单塔形制、登高动线和背后山体，再联系黄河通道与宁夏佛教史。",
      guideLead: "青铜峡一百零八塔的导览要按塔群正面、层级排列、台阶上行、单塔细节和黄河岸线关系安排，不使用闸桥或水利工程作为主图。"
    },
    "布达拉宫": {
      lead: "布达拉宫要放在拉萨红山和老城的关系中看：白宫、红宫、佛殿、台阶动线和城市天际线共同构成它的宫堡层次。",
      notesLead: "布达拉宫游览要按预约时段和高原体力慢慢上行，把楼梯、殿堂、壁画、宫殿功能和回望拉萨城的视角串起来。",
      guideLead: "布达拉宫的导览要结合预约、海拔体力、殿堂顺序和参观礼仪来安排，重点是空间层次而不是只看外观。"
    }
  };
  const byKind: Record<RecommendationKind, { season: string; pace: string; people: string; lead: string; notesLead: string; guideLead: string }> = {
    heritage: {
      season: "春秋或清晨傍晚更适合慢走、拍照和听讲解",
      pace: "半日到一日，按核心遗存、街巷和现场细节慢慢看",
      people: "历史、建筑、城市记忆和摄影爱好者",
      lead: `${nameZh}要把${focusZh}落到真实参观现场：入口、院落、碑刻、展陈、街区或城墙怎样组织动线，它和周边城市或村落是什么关系。`,
      notesLead: `${nameZh}游览要停在最能代表它的几个可见细节前，把建筑形制、人物故事、城市位置和今天的使用方式讲清楚。`,
      guideLead: `${nameZh}的导览要按入口空间、核心遗存、细部观察和周边城市关系来安排，让历史背景落到现场。`
    },
    nature: {
      season: "按花期、水量、雪景或晴朗天气选择",
      pace: "半日到一日，预留观景、步行和天气调整时间",
      people: "家庭、摄影爱好者和自然旅行者",
      lead: `${nameZh}的辨识度来自${focusZh}。山体、水面、植被、季节和光线会直接改变观感，说明时要落到真实可见的地貌和动线。`,
      notesLead: `${nameZh}游览应挑选能说明特点的观景点、步道或水边停留，给天气变化、空间尺度和安静观察留出时间。`,
      guideLead: `${nameZh}的导览要结合观景点、步道难度、天气窗口和返程时间，不把自然景观写成一句泛泛的风景。`
    },
    food: {
      season: "早市、午餐或夜间街巷最适合",
      pace: "2-4小时，边走边尝，留出排队和交流时间",
      people: "美食爱好者、好奇型旅行者和本地生活观察者",
      lead: `${nameZh}要写到${focusZh}背后的具体食材、摊位或厨房、点单方式、口味层次和当地人日常怎么吃。`,
      notesLead: `${nameZh}应选择几个真实停留点，比较做法、火候、调味和街区节奏，让它不只是菜名或市场名。`,
      guideLead: `${nameZh}的导览要按摊位、厨房、点单和品尝顺序展开，讲清味道和街区日常。`
    },
    village: {
      season: "春秋舒适，节庆或农事季更有现场感",
      pace: "半日到一日，在聚落、古镇或村路内部慢走停留",
      people: "家庭、摄影爱好者、古镇和在地文化旅行者",
      lead: `${nameZh}需要把${focusZh}放回真实聚落现场：民居沿什么水系和巷道展开，田地、院落、祠堂或公共空间今天如何被使用。`,
      notesLead: `${nameZh}游览要在村落内部慢下来，看建筑如何被使用，地方产业、家庭记忆、农事节奏和日常生活如何连在一起。`,
      guideLead: `${nameZh}的导览要按村口、巷道、水系、公共空间和季节活动组织，不只停留在外观照片。`
    },
    craft: {
      season: "工作室开放时段最佳，建议提前确认体验时间",
      pace: "2-3小时，留给工序、材料和手艺人讲解",
      people: "设计、手作、工艺和文化爱好者",
      lead: `${nameZh}要写出${focusZh}背后的制作现场：材料从哪里来，工具怎么用，手艺人怎样判断火候、针法、泥性、纹样或色阶。`,
      notesLead: `${nameZh}体验要看见工序和手上动作，再把技法、材料、地方审美和仍在做这门手艺的人联系起来。`,
      guideLead: `${nameZh}的导览要从材料、工具、制作步骤到成品判断标准逐步讲清。`
    },
    spiritual: {
      season: "清晨或非高峰时段更安静",
      pace: "半日到一日，保持安静节奏",
      people: "文化、建筑、信仰空间和慢行旅行者",
      lead: `${nameZh}的核心不只是建筑外观，而是${focusZh}与参拜动线、殿堂格局、礼仪方式和今天仍在延续的信仰生活。`,
      notesLead: `${nameZh}游览应保持安静节奏，讲清殿堂顺序、仪式含义、地方习惯和游客需要遵守的礼貌。`,
      guideLead: `${nameZh}的导览要按礼仪、院落、殿堂、山路或信仰背景安排顺序。`
    },
    city: {
      season: "早晚光线柔和，工作日更适合观察日常",
      pace: "2-4小时，按街区和交通节点串联",
      people: "城市漫步、建筑、交通和本地生活爱好者",
      lead: `${nameZh}的城市性体现在${focusZh}。街区、建筑、交通、店铺和普通日常要同时出现，页面才会像真实的地面现场。`,
      notesLead: `${nameZh}城市漫步应比较街巷、店招、建筑立面和生活细节，说明当地人如何使用这个地方。`,
      guideLead: `${nameZh}的导览要从街面、交通、店铺、人流和日常使用方式看城市。`
    },
    road: {
      season: isShortTransport ? "晴朗或傍晚更适合，需注意运营时间和天气" : "按路况、天气和沿途景观季节选择",
      pace: isShortTransport ? "30分钟到2小时，可与前后街区或观景点串联" : "一日或多日，按停靠点和交通距离安排",
      people: isShortTransport ? "城市交通、港口景观和慢旅行爱好者" : "自驾、摄影和深度路线旅行者",
      lead: `${nameZh}的重点在${focusZh}带来的移动过程、停靠点、交通节奏和沿途变化，移动本身就是体验的一部分。`,
      notesLead: `${nameZh}路线应把乘坐或行车时段、接驳方式、观景停留和前后街区一起安排。`,
      guideLead: `${nameZh}的导览要按运营时间、停靠点、路况或水况和返程方式安排。`
    },
    market: {
      season: "清晨或本地采购高峰最有现场感",
      pace: "1-3小时，边看边聊，适合慢慢比较摊位",
      people: "美食、摄影、市场和本地生活爱好者",
      lead: `${nameZh}的现场感来自${focusZh}。摊位、货品、摊主、价格、采购习惯和街坊交流都要写进页面。`,
      notesLead: `${nameZh}市场漫步应在具体摊位前慢下来，说明本地人买什么、什么时候来，以及市场如何连接日常饮食。`,
      guideLead: `${nameZh}的导览要按采购时间、摊位分区、试吃点和人流节奏来走。`
    },
    tea: {
      season: "采茶季最有现场感，也可按茶园景色选择",
      pace: "半日体验，留出步行、制茶和品饮时间",
      people: "茶文化、自然和慢旅行爱好者",
      lead: `${nameZh}要把${focusZh}与茶园或茶林环境、采摘季节、制作流程、冲泡方式和待客习惯连起来。`,
      notesLead: `${nameZh}茶体验应从景观走到工艺，再进入品鉴，说明山场、手法和杯中风味之间的关系。`,
      guideLead: `${nameZh}的导览要把茶园、采制、冲泡、品鉴和季节差异连起来。`
    },
    coast: {
      season: "天气晴朗、海风舒适时最佳",
      pace: "半日游，可结合用餐、港口或日落",
      people: "家庭、海鲜爱好者和慢旅行者",
      lead: `${nameZh}的海岸气质来自${focusZh}，也来自港口生活、海鲜处理、老街空间和当地人的日常节奏。`,
      notesLead: `${nameZh}海岸路线应结合潮水时间、小镇生活、港口节奏和饮食背景，让海景和生活现场同时成立。`,
      guideLead: `${nameZh}的导览要把海岸视野、码头劳作、海鲜市场和老街生活串起来。`
    }
  };
  return { ...byKind[attraction.kind], ...custom[nameZh] };
}

function reviewedDestinationMeta(attraction: ProvinceRecommendation, base: (typeof kindMeta)[RecommendationKind]) {
  const name = attraction.name;
  const nameZh = attraction.nameZh || attraction.name;
  const focus = attraction.focus;
  const focusZh = attraction.focusZh || attraction.focus;
  const tone = reviewedDestinationTone(attraction);
  return {
    ...base,
    subtitle: destinationPhrase(focus, focusZh, `Enfoque: ${focus}`, `Foco: ${focus}`, `Focus: ${focus}`),
    season: destinationPhrase(base.season.en, tone.season, base.season.es, base.season.pt, base.season.ar),
    pace: destinationPhrase(base.pace.en, tone.pace, base.pace.es, base.pace.pt, base.pace.ar),
    people: destinationPhrase(base.people.en, tone.people, base.people.es, base.people.pt, base.people.ar),
    keywords: destinationPhrase(focus, focusZh, `Claves: ${focus}`, `Palavras-chave: ${focus}`, `Keywords: ${focus}`),
    lead: destinationPhrase(
      `${name} should be interpreted through ${focus}, with visible site details, local use and route context explained together.`,
      tone.notesLead,
      `Usa ${focus} como hilo principal de ${name}, con detalles reales del lugar.`,
      `Use ${focus} como fio principal de ${name}, com detalhes reais do lugar.`,
      `${name} should be interpreted through ${focus}.`
    ),
    advice: reviewedDestinationAdvice(attraction),
    guide: reviewedDestinationGuide(attraction)
  };
}

function reviewedDestinationAdvice(attraction: ProvinceRecommendation) {
  const name = attraction.name;
  const nameZh = attraction.nameZh || attraction.name;
  const focus = attraction.focus;
  const focusZh = attraction.focusZh || attraction.focus;
  const tone = reviewedDestinationTone(attraction);
  const card = (icon: IconName, enTitle: string, zhTitle: string, enBody: string, zhBody: string) => ({
    icon,
    title: destinationPhrase(enTitle, zhTitle),
    body: destinationPhrase(enBody, zhBody)
  });
  return [
    card("camera", "Best viewing moments", "最佳体验时段", `Choose light, crowd level and opening time around ${name}.`, `${tone.season}，并结合开放时间和现场人流安排。`),
    card("shoe", "Walk with the site", "步行与观察结合", `Keep time for the real route, not only the headline sight.`, `${nameZh}要留出现场停步时间，把${focusZh}、可见细节和实际动线连起来看。`),
    card("mountain", "Read the local context", "理解现场背景", `Connect ${focus} with streets, terrain, daily use or local memory.`, `讲解要把${focusZh}和道路、空间、日常使用或地方记忆联系起来。`),
    card("hat", "Leave room for rhythm", "保持从容", `Adjust the visit to weather, access and the way ${name} actually works.`, `根据天气、交通、开放条件和${nameZh}本身的节奏调整停留。`)
  ];
}

function reviewedDestinationGuide(attraction: ProvinceRecommendation) {
  const name = attraction.name;
  const nameZh = attraction.nameZh || attraction.name;
  const focus = attraction.focus;
  const focusZh = attraction.focusZh || attraction.focus;
  const tone = reviewedDestinationTone(attraction);
  const card = (icon: IconName, enTitle: string, zhTitle: string, enBody: string, zhBody: string) => ({
    icon,
    title: destinationPhrase(enTitle, zhTitle),
    body: destinationPhrase(enBody, zhBody)
  });
  return [
    card("route", "Route built for this place", "按现场动线游览", `Arrange ${name} by arrival, route order, stops and return options.`, tone.guideLead),
    card("book", "Site-specific interpretation", "针对性讲解", `Use ${focus} to explain why ${name} is worth seeing.`, `讲解要紧扣${focusZh}，说明${nameZh}自己的来历、看点和现场细节。`),
    card("car", "Practical service match", "按地点匹配服务", `Choose walking, transfer, reservation or translation support according to ${name}.`, `根据${nameZh}的距离、开放时间、人流、预约和交通条件安排步行、接送或翻译协助。`)
  ];
}

function reviewedHowToVisitLead(attraction: ProvinceRecommendation) {
  const name = attraction.name;
  const focus = attraction.focus;
  const tone = reviewedDestinationTone(attraction);
  return destinationPhrase(
    `Guiding for ${name} should follow ${focus}, the route on site and practical access.`,
    tone.guideLead
  );
}

function Icon({ name }: { name: IconName }) {
  const common = "h-6 w-6";
  if (name === "clock") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></svg>;
  if (name === "people") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M16 12a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" /><path d="M3.5 19c.6-3.2 2.2-5 4.5-5s3.9 1.8 4.5 5" /><path d="M13 18.5c.5-2.4 1.7-3.7 3.3-3.7 1.8 0 3 1.4 3.4 3.7" /></svg>;
  if (name === "star") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></svg>;
  if (name === "camera") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8h3l1.5-2h5L16 8h3v10H5V8Z" /><circle cx="12" cy="13" r="3" /></svg>;
  if (name === "shoe") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 14c4.5.2 7.3-2.2 8-7l5 6c1.4 1.6.5 4-1.7 4H6.5C5.6 17 5 16.3 5 15.4V14Z" /><path d="M11 11.5 14 14" /></svg>;
  if (name === "mountain") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 18 6.5-11 4 6 2-3 5.5 8H3Z" /></svg>;
  if (name === "hat") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 15c2 1 12 1 14 0" /><path d="M8 14c.4-4 2-6 4-6s3.6 2 4 6" /><path d="M3 17c4 2 14 2 18 0" /></svg>;
  if (name === "route") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 5h.1" /><path d="M18 19h.1" /><path d="M7 5c7 0 10 2 10 5s-3 5-10 5c-2 0-3 1-3 2s1 2 3 2h10" /></svg>;
  if (name === "book") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 5.5c2.5 0 4.5.5 7 2v11c-2.5-1.5-4.5-2-7-2v-11Z" /><path d="M19 5.5c-2.5 0-4.5.5-7 2v11c2.5-1.5 4.5-2 7-2v-11Z" /></svg>;
  if (name === "car") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 14h14l-1.5-4.5h-11L5 14Z" /><path d="M5 14v4h2" /><path d="M19 14v4h-2" /><circle cx="8" cy="17" r="1.4" /><circle cx="16" cy="17" r="1.4" /></svg>;
  return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12c5.5 0 7-5 7-8 4.5 3 6.8 7.6 3.8 12.1C13.1 20.2 7.2 20 5 15.8V12Z" /><path d="M5 12c3.8.4 6.5 2.1 8 5" /></svg>;
}

function detailMeta(kind: RecommendationKind, en: string, zhCN: string, zhTW: string, season: string, pace: string, people: string, keywords: string, lead: string) {
  const enCopy: Record<string, string> = {
    "春秋舒适，夏季清凉，冬季需注意山路天气": "Spring and autumn are comfortable; summer is cool; winter needs road checks.",
    "半日到一日，按寺院分区与交通安排": "Half day to one day, arranged by temple clusters and transport.",
    "佛教文化、建筑与山地摄影爱好者": "Buddhist culture, architecture and mountain photography lovers.",
    "五台山 · 寺院群 · 文殊信仰 · 朝台路线": "Wutai Mountain, monastery clusters, Manjusri belief, pilgrimage routes",
    "五台山要把台怀镇寺院群、山地地形和朝拜传统放在一起看，而不是只看一座白塔或单个庙门。": "Read Wutai Mountain through Taihuai's temple clusters, mountain terrain and pilgrimage tradition, not only one white pagoda or temple gate.",
    "四季皆可，春秋步行最舒适": "Year-round, with spring and autumn best for walking.",
    "2-4小时，适合步行与短暂停留": "Two to four hours, best as a walk with short stops.",
    "城市漫步、建筑与咖啡街区爱好者": "Urban walkers, architecture lovers and cafe-neighborhood travelers.",
    "梧桐树 · 里弄 · 老洋房 · 社区街巷": "Plane trees, lane houses, old villas, neighborhood streets",
    "原法租界要看街道尺度、梧桐树荫、里弄和老洋房如何组成上海日常，而不是把它当成一张区域地图。": "The Former French Concession should be read through street scale, plane-tree shade, lanes and villas that form everyday Shanghai, not as a district map.",
    "春秋舒适，雨后和冬雪各有特色": "Spring and autumn are comfortable; after rain and winter snow each have character.",
    "一日到两日，需按索道、步道和天气安排": "One to two days, planned around cable cars, trails and weather.",
    "山水摄影、徒步与自然景观爱好者": "Landscape photographers, hikers and nature lovers.",
    "黄山松 · 云海 · 花岗岩峰林 · 日出": "Huangshan pines, cloud seas, granite peaks, sunrise",
    "黄山的重点是峰林、松树、云海和山路视角的变化，行程要跟天气和体力走，而不是只赶一个观景台。": "Huangshan is about peaks, pines, cloud seas and changing trail viewpoints; the route should follow weather and energy rather than chase one platform.",
    "春秋舒适，法会和节庆期间人流更集中": "Spring and autumn are comfortable; Buddhist events and holidays are busier.",
    "半日到一日，寺院与山路结合": "Half day to one day, combining temples and mountain paths.",
    "佛教文化、山地建筑与慢旅行爱好者": "Buddhist culture, mountain architecture and slow-travel lovers.",
    "九华山 · 寺院群 · 地藏信仰 · 山路": "Jiuhua Mountain, temples, Ksitigarbha belief, mountain paths",
    "九华山要把寺院、山村、香火和地藏信仰连起来看，不是只拍一座牌坊或山门。": "Jiuhua Mountain should connect temples, mountain villages, incense life and Ksitigarbha belief, not only a gate or archway photo.",
    "工作坊开放时段最佳，建议提前确认": "Best during workshop hours; confirm in advance.",
    "1-3小时，重点看工序和讲解": "One to three hours, focused on process and explanation.",
    "手工艺、书画与传统材料爱好者": "Craft, calligraphy, painting and traditional-material lovers.",
    "宣纸 · 捞纸 · 晒纸 · 文房四宝": "Xuan paper, sheet forming, drying, scholar tools",
    "宣城宣纸工坊要看青檀皮、稻草、浆料、捞纸和晒纸等工序，重点是纸如何被做出来。": "Xuancheng Xuan Paper Workshop should show bark, straw, pulp, sheet forming and drying so visitors understand how the paper is made.",
    "春秋舒适，雨后云雾更有层次": "Spring and autumn are comfortable; mist after rain adds depth.",
    "一日为宜，按索道与栈道体力安排": "One day works well, planned around cable cars, cliff paths and energy.",
    "山水摄影、徒步和自然景观爱好者": "Landscape photographers, hikers and nature lovers.",
    "三清山 · 奇峰 · 云雾 · 栈道": "Sanqing Mountain, peaks, mist, cliff paths",
    "三清山要看奇峰、云雾、栈道和道教山水意象如何叠在一起，而不是用一张地图代替现场。": "Sanqing Mountain should be read through peaks, mist, paths and Daoist mountain imagery, not replaced by a map.",
    "春秋舒适，雨雾天需预留弹性": "Spring and autumn are comfortable; keep flexibility for rain and mist.",
    "一日，按索道、排队和天气安排": "One day, planned around cable cars, queues and weather.",
    "山地摄影、自然和佛教文化爱好者": "Mountain photography, nature and Buddhist-culture lovers.",
    "梵净山 · 红云金顶 · 云海 · 黔东山地": "Fanjing Mountain, Red Cloud Golden Summit, cloud seas, eastern Guizhou mountains",
    "梵净山的核心是孤峰、红云金顶、云雾和黔东山地生态，行程要给天气变化留余地。": "Fanjing Mountain centers on isolated peaks, Red Cloud Golden Summit, mist and eastern Guizhou ecology; the plan needs weather flexibility.",
    "秋冬较舒适，晴天适合海岛视野": "Autumn and winter are more comfortable; clear days suit island views.",
    "半日到一日，可结合大佛、昂坪或大澳": "Half day to one day, combining the Buddha, Ngong Ping or Tai O.",
    "家庭、海岛步行与香港文化爱好者": "Families, island walkers and Hong Kong culture lovers.",
    "大屿山 · 天坛大佛 · 昂坪 · 大澳": "Lantau Island, Tian Tan Buddha, Ngong Ping, Tai O",
    "大屿山要把天坛大佛、山地步道、离岛村落和海岸交通连起来看，不是一张行政地图。": "Lantau Island should connect the Tian Tan Buddha, hill trails, island villages and coastal transport, not an administrative map.",
    "晴朗天气和海风舒适时最佳": "Best with clear weather and comfortable sea breeze.",
    "半日游，可结合海岸、河口和小镇街区": "Half day, combining coast, river mouth and town streets.",
    "家庭、海岸休闲与慢旅行爱好者": "Families, coastal leisure and slow-travel lovers.",
    "博鳌 · 玉带滩 · 万泉河口 · 海岸小镇": "Boao, Jade Belt Beach, Wanquan River mouth, seaside town",
    "博鳌要看玉带滩、河海交汇、海岸街区和小镇生活。": "Boao should show Jade Belt Beach, river-sea scenery, seaside streets and town life.",
    "春秋与晴朗天气最佳，雨雾天需看能见度和水位": "Spring, autumn and clear days are best; misty days need visibility and water-level checks.",
    "半日到一日，按观景点、船只和车程安排": "Half day to one day, planned around viewpoints, boats and driving time.",
    "山水摄影、长江文化和工程背景爱好者": "Landscape photographers, Yangtze culture and engineering-history lovers.",
    "西陵峡 · 长江航道 · 峭壁 · 宜昌": "Xiling Gorge, Yangtze shipping route, cliffs, Yichang",
    "湖北三峡段要看长江如何穿过峡谷、城镇和工程景观，不是东湖湖景或普通山谷。": "The Hubei Three Gorges section should show how the Yangtze passes through gorges, towns and engineering landscapes, not East Lake or a generic canyon.",
    "清晨最合适，早餐高峰前后最有现场感": "Early morning is best, especially around the breakfast rush.",
    "1-3小时，边走边吃，适合小店串联": "One to three hours, walking and tasting across small shops.",
    "美食爱好者、城市日常和街巷文化爱好者": "Food lovers, urban daily-life observers and neighborhood-culture travelers.",
    "热干面 · 豆皮 · 面窝 · 过早": "Hot dry noodles, doupi, mianwo, guozao breakfast culture",
    "武汉过早要看早点铺、排队、端碗站吃和通勤节奏，不是城市天际线。": "Wuhan breakfast culture should show breakfast shops, queues, standing meals and commute rhythm, not the city skyline."
  };
  const enFor = (value: string) => enCopy[value] ?? value;
  return {
    subtitle: simplePhrase(en, zhCN, zhTW),
    season: simplePhrase(enFor(season), season, toTraditionalChinese(season)),
    pace: simplePhrase(enFor(pace), pace, toTraditionalChinese(pace)),
    people: simplePhrase(enFor(people), people, toTraditionalChinese(people)),
    keywords: simplePhrase(enFor(keywords), keywords, toTraditionalChinese(keywords)),
    lead: simplePhrase(enFor(lead), lead, toTraditionalChinese(lead)),
    advice: sharedAdvice(kind),
    guide: sharedGuide(kind)
  };
}

const destinationMeta: Record<string, { subtitle: Phrase; season: Phrase; pace: Phrase; people: Phrase; keywords: Phrase; lead: Phrase; advice: Array<{ icon: IconName; title: Phrase; body: Phrase }>; guide: Array<{ icon: IconName; title: Phrase; body: Phrase }> }> = {
  "Wutai Mountain": detailMeta("spiritual", "Buddhist mountain · Monastery routes · Pilgrimage culture", "佛教名山 · 寺院路线 · 朝台文化", "佛教名山 · 寺院路線 · 朝台文化", "春秋舒适，夏季清凉，冬季需注意山路天气", "半日到一日，按寺院分区与交通安排", "佛教文化、建筑与山地摄影爱好者", "五台山 · 寺院群 · 文殊信仰 · 朝台路线", "五台山要把台怀镇寺院群、山地地形和朝拜传统放在一起看，而不是只看一座白塔或单个庙门。"),
  "Former French Concession": detailMeta("city", "Plane-tree streets · Lane houses · Shanghai neighborhood life", "梧桐街道 · 里弄住宅 · 上海街区生活", "梧桐街道 · 里弄住宅 · 上海街區生活", "四季皆可，春秋步行最舒适", "2-4小时，适合步行与短暂停留", "城市漫步、建筑与咖啡街区爱好者", "梧桐树 · 里弄 · 老洋房 · 社区街巷", "原法租界要看街道尺度、梧桐树荫、里弄和老洋房如何组成上海日常，而不是把它当成一张区域地图。"),
  "Huangshan": detailMeta("nature", "Granite peaks · Pines · Cloud seas", "奇松怪石 · 云海日出 · 山路节奏", "奇松怪石 · 雲海日出 · 山路節奏", "春秋舒适，雨后和冬雪各有特色", "一日到两日，需按索道、步道和天气安排", "山水摄影、徒步与自然景观爱好者", "黄山松 · 云海 · 花岗岩峰林 · 日出", "黄山的重点是峰林、松树、云海和山路视角的变化，行程要跟天气和体力走，而不是只赶一个观景台。"),
  "Jiuhua Mountain": detailMeta("spiritual", "Buddhist temples · Mountain village routes · Anhui pilgrimage", "佛教寺院 · 山中聚落 · 安徽朝山路线", "佛教寺院 · 山中聚落 · 安徽朝山路線", "春秋舒适，法会和节庆期间人流更集中", "半日到一日，寺院与山路结合", "佛教文化、山地建筑与慢旅行爱好者", "九华山 · 寺院群 · 地藏信仰 · 山路", "九华山要把寺院、山村、香火和地藏信仰连起来看，不是只拍一座牌坊或山门。"),
  "Xuancheng Xuan Paper Workshop": detailMeta("craft", "Xuan paper craft · Water and fibers · Scholar tools", "宣纸工艺 · 捞纸晒纸 · 文房传统", "宣紙工藝 · 撈紙曬紙 · 文房傳統", "工作坊开放时段最佳，建议提前确认", "1-3小时，重点看工序和讲解", "手工艺、书画与传统材料爱好者", "宣纸 · 捞纸 · 晒纸 · 文房四宝", "宣城宣纸工坊要看青檀皮、稻草、浆料、捞纸和晒纸等工序，重点是纸如何被做出来。"),
  "Sanqing Mountain": detailMeta("nature", "Granite peaks · Daoist imagery · Mountain trails", "花岗岩峰林 · 道教意象 · 山间栈道", "花崗岩峰林 · 道教意象 · 山間棧道", "春秋舒适，雨后云雾更有层次", "一日为宜，按索道与栈道体力安排", "山水摄影、徒步和自然景观爱好者", "三清山 · 奇峰 · 云雾 · 栈道", "三清山要看奇峰、云雾、栈道和道教山水意象如何叠在一起，而不是用一张地图代替现场。"),
  "Fanjing Mountain": detailMeta("nature", "Red Cloud Golden Summit · Biodiversity · Mountain weather", "红云金顶 · 黔东山地 · 生物多样性", "紅雲金頂 · 黔東山地 · 生物多樣性", "春秋舒适，雨雾天需预留弹性", "一日，按索道、排队和天气安排", "山地摄影、自然和佛教文化爱好者", "梵净山 · 红云金顶 · 云海 · 黔东山地", "梵净山的核心是孤峰、红云金顶、云雾和黔东山地生态，行程要给天气变化留余地。"),
  "Lantau Island": detailMeta("nature", "Tian Tan Buddha · Villages · Island trails", "天坛大佛 · 离岛村落 · 海岛步道", "天壇大佛 · 離島村落 · 海島步道", "秋冬较舒适，晴天适合海岛视野", "半日到一日，可结合大佛、昂坪或大澳", "家庭、海岛步行与香港文化爱好者", "大屿山 · 天坛大佛 · 昂坪 · 大澳", "大屿山要把天坛大佛、山地步道、离岛村落和海岸交通连起来看，不是一张行政地图。"),
  "Boao Town": detailMeta("coast", "Jade Belt Beach · River mouth · Qionghai seaside town", "玉带滩 · 河海交汇 · 琼海海岸小镇", "玉帶灘 · 河海交匯 · 瓊海海岸小鎮", "晴朗天气和海风舒适时最佳", "半日游，可结合海岸、河口和小镇街区", "家庭、海岸休闲与慢旅行爱好者", "博鳌 · 玉带滩 · 万泉河口 · 海岸小镇", "博鳌要看玉带滩、河海交汇、海岸街区和小镇生活。"),
  "Three Gorges Hubei Section": detailMeta("nature", "Xiling Gorge · Yangtze cliffs · River towns", "西陵峡 · 长江峭壁 · 江边城镇", "西陵峽 · 長江峭壁 · 江邊城鎮", "春秋与晴朗天气最佳，雨雾天需看能见度和水位", "半日到一日，按观景点、船只和车程安排", "山水摄影、长江文化和工程背景爱好者", "西陵峡 · 长江航道 · 峭壁 · 宜昌", "湖北三峡段要看长江如何穿过峡谷、城镇和工程景观，不是东湖湖景或普通山谷。"),
  "Wuhan Breakfast Streets": detailMeta("food", "Hot dry noodles · Doupi · Morning street life", "热干面 · 豆皮 · 面窝 · 过早文化", "熱乾麵 · 豆皮 · 麵窩 · 過早文化", "清晨最合适，早餐高峰前后最有现场感", "1-3小时，边走边吃，适合小店串联", "美食爱好者、城市日常和街巷文化爱好者", "热干面 · 豆皮 · 面窝 · 过早", "武汉过早要看早点铺、排队、端碗站吃和通勤节奏，不是城市天际线。"),
  "Fenyang Fenjiu Culture": {
    subtitle: phrase("Fenjiu heritage · Xinghua Village · Shanxi banquet customs", "汾酒传承 · 杏花村 · 山西宴席习俗", "汾酒傳承 · 杏花村 · 山西宴席習俗", "Patrimonio Fenjiu · Xinghua Village · banquetes de Shanxi", "Patrimônio Fenjiu · Xinghua Village · banquetes de Shanxi", "تراث فينجيو · قرية شينغهوا · عادات موائد شانشي"),
    season: phrase("Year-round, with indoor museum and workshop visits", "四季皆可，适合博物馆与老作坊参观", "四季皆可，適合博物館與老作坊參觀", "Todo el año, con museo y talleres históricos", "Todo o ano, com museu e oficinas antigas", "طوال العام مع زيارة المتحف والورش القديمة"),
    pace: phrase("Half day with tasting and cultural explanation", "半日左右，留出讲解与品鉴时间", "半日左右，留出講解與品鑑時間", "Medio día con explicación y degustación", "Meio dia com explicação e degustação", "نصف يوم مع شرح وتذوق"),
    people: phrase("Liquor culture, local history and food-culture lovers", "酒文化、地方历史与宴席文化爱好者", "酒文化、地方歷史與宴席文化愛好者", "Amantes de cultura del licor, historia local y mesa regional", "Quem gosta de cultura de bebida, história local e mesa regional", "لمهتمي ثقافة الشراب والتاريخ المحلي وآداب المائدة"),
    keywords: phrase("Xinghua Village, Fenjiu craft, sorghum spirit, banquet etiquette", "杏花村 · 汾酒工艺 · 高粱酒 · 宴席礼俗", "杏花村 · 汾酒工藝 · 高粱酒 · 宴席禮俗", "Xinghua Village, técnica Fenjiu, licor de sorgo, etiqueta", "Xinghua Village, técnica Fenjiu, licor de sorgo, etiqueta", "قرية شينغهوا، صناعة فينجيو، شراب الذرة الرفيعة، آداب الولائم"),
    lead: phrase("Connect the workshop, vessels, aroma style and banquet customs instead of treating it as a food street.", "把老作坊、酒器、清香型风味和山西宴席习俗连起来看，而不是当作普通美食街。", "把老作坊、酒器、清香型風味和山西宴席習俗連起來看，而不是當作普通美食街。", "Conecta taller, recipientes, aroma y costumbres de banquete, no una calle de comida.", "Conecte oficina, recipientes, aroma e costumes de banquete, não uma rua de comida.", "اربط الورشة والأواني والرائحة وعادات الولائم، لا كشارع طعام عادي."),
    advice: [
      { icon: "book", title: phrase("Start with the story", "先理解杏花村故事", "先理解杏花村故事", "Empieza por la historia", "Comece pela história", "ابدأ بالقصة"), body: phrase("Place Fenjiu in the history of Xinghua Village, Shanxi trade and hospitality customs.", "先把汾酒放进杏花村、山西商贸和待客礼俗的背景里看。", "先把汾酒放進杏花村、山西商貿和待客禮俗的背景裡看。", "Sitúa Fenjiu en Xinghua Village, comercio de Shanxi y hospitalidad.", "Coloque Fenjiu em Xinghua Village, comércio de Shanxi e hospitalidade.", "ضع فينجيو ضمن تاريخ شينغهوا وتجارة شانشي والضيافة.") },
      { icon: "camera", title: phrase("Look at craft details", "看工艺细节", "看工藝細節", "Observa el proceso", "Observe o processo", "لاحظ تفاصيل الحرفة"), body: phrase("Focus on sorghum, fermentation, distilling, vessels and old workshop spaces.", "重点看高粱、发酵、蒸馏、酒器和老作坊空间。", "重點看高粱、發酵、蒸餾、酒器和老作坊空間。", "Fíjate en sorgo, fermentación, destilación, vasijas y talleres.", "Observe sorgo, fermentação, destilação, recipientes e oficinas.", "ركز على الذرة الرفيعة والتخمير والتقطير والأواني والورش.") },
      { icon: "shoe", title: phrase("Keep a calm pace", "节奏放缓", "節奏放緩", "Ritmo tranquilo", "Ritmo tranquilo", "إيقاع هادئ"), body: phrase("Leave time for exhibits, smells, labels and tasting context instead of rushing through photos.", "给展陈、气味、文字说明和品鉴背景留时间，不只是快速拍照。", "給展陳、氣味、文字說明和品鑑背景留時間，不只是快速拍照。", "Deja tiempo para vitrinas, aromas, textos y contexto de cata.", "Deixe tempo para exposições, aromas, textos e contexto de prova.", "اترك وقتا للمعروضات والروائح والنصوص وسياق التذوق.") },
      { icon: "hat", title: phrase("Link it to the table", "连到山西餐桌", "連到山西餐桌", "Conecta con la mesa", "Conecte com a mesa", "اربطه بالمائدة"), body: phrase("Explain how liquor culture appears in banquets, toasts and local hospitality.", "讲清酒文化如何出现在宴席、敬酒和地方待客方式里。", "講清酒文化如何出現在宴席、敬酒和地方待客方式裡。", "Explica brindis, banquetes y hospitalidad local.", "Explique brindes, banquetes e hospitalidade local.", "اشرح حضور الشراب في الولائم والأنخاب والضيافة.") }
    ],
    guide: [
      { icon: "route", title: phrase("Museum and workshop route", "博物馆与老作坊路线", "博物館與老作坊路線", "Ruta museo-taller", "Rota museu-oficina", "مسار المتحف والورشة"), body: phrase("Connect the museum, old workshop areas and Xinghua Village context in one route.", "把博物馆、老作坊空间和杏花村背景串成一条路线。", "把博物館、老作坊空間和杏花村背景串成一條路線。", "Une museo, talleres antiguos y contexto de Xinghua Village.", "Una museu, oficinas antigas e contexto de Xinghua Village.", "اربط المتحف والورش القديمة وسياق شينغهوا.") },
      { icon: "book", title: phrase("Local culture explanation", "地方文化讲解", "地方文化講解", "Explicación local", "Explicação local", "شرح محلي"), body: phrase("Use stories, vessels and craft steps to explain why Fenjiu matters in Shanxi.", "用故事、酒器和工艺步骤说明汾酒为什么对山西重要。", "用故事、酒器和工藝步驟說明汾酒為什麼對山西重要。", "Usa historias, vasijas y pasos técnicos para explicar su valor.", "Use histórias, recipientes e etapas técnicas para explicar seu valor.", "استخدم القصص والأواني وخطوات الحرفة لشرح أهميته.") },
      { icon: "car", title: phrase("Flexible transfer", "灵活接驳", "靈活接駁", "Traslado flexible", "Traslado flexível", "تنقل مرن"), body: phrase("Private transport helps connect Fenyang, Xinghua Village and nearby Shanxi stops.", "可用包车串联汾阳、杏花村和周边山西行程点。", "可用包車串聯汾陽、杏花村和周邊山西行程點。", "El traslado privado conecta Fenyang, Xinghua Village y otros puntos.", "Transporte privado conecta Fenyang, Xinghua Village e outros pontos.", "يساعد النقل الخاص في ربط فينيانغ وشينغهوا ونقاط شانشي.") }
    ]
  },
  "Chengyang Wind and Rain Bridge": {
    subtitle: phrase("Dong bridge architecture · Village life · Timber craft", "侗族木桥 · 村寨公共空间 · 木构工艺", "侗族木橋 · 村寨公共空間 · 木構工藝", "Puente dong · Vida de aldea · Carpintería", "Ponte dong · Vida de aldeia · Carpintaria", "جسر دونغ · حياة القرية · حرفة الخشب"),
    season: phrase("Spring and autumn are comfortable; festival days add Dong village atmosphere.", "春秋慢走最舒适，若遇侗族节庆更能看到村寨生活。", "春秋慢走最舒適，若遇侗族節慶更能看到村寨生活。", "Primavera y otoño son cómodos; los festivales añaden vida local.", "Primavera e outono são confortáveis; festivais trazem vida local.", "الربيع والخريف مريحان، وأيام المهرجانات تضيف حياة محلية."),
    pace: phrase("Half day, with time for the bridge, nearby villages and drum towers.", "半日游，给桥身、邻近侗寨和鼓楼都留出停留时间。", "半日遊，給橋身、鄰近侗寨和鼓樓都留出停留時間。", "Medio día, con tiempo para puente, aldeas y torres del tambor.", "Meio dia, com tempo para ponte, aldeias e torres do tambor.", "نصف يوم للجسر والقرى وأبراج الطبول القريبة."),
    people: phrase("Architecture, folk culture, photography and slow-travel lovers.", "适合建筑、民俗文化、摄影和慢旅行爱好者。", "適合建築、民俗文化、攝影和慢旅行愛好者。", "Arquitectura, cultura local, fotografía y viaje lento.", "Arquitetura, cultura local, fotografia e viagem lenta.", "لمحبي العمارة والثقافة المحلية والتصوير والسفر الهادئ."),
    keywords: phrase("Wind-rain bridge · Dong village · Drum tower · Timber structure", "风雨桥 · 侗寨 · 鼓楼 · 木构", "風雨橋 · 侗寨 · 鼓樓 · 木構", "Puente cubierto · Aldea dong · Torre del tambor · Madera", "Ponte coberta · Aldeia dong · Torre do tambor · Madeira", "جسر مغطى · قرية دونغ · برج الطبول · هيكل خشبي"),
    lead: phrase("Read the bridge as part of Dong village life, not as a generic landscape viewpoint.", "把风雨桥放回侗寨生活里看，而不是当成普通山水观景点。", "把風雨橋放回侗寨生活裡看，而不是當成普通山水觀景點。", "Lee el puente como parte de la vida dong, no como un mirador genérico.", "Veja a ponte como parte da vida dong, não como um mirante genérico.", "اقرأ الجسر كجزء من حياة قرى دونغ، لا كنقطة منظر عامة."),
    advice: [
      { icon: "shoe", title: phrase("Walk the bridge slowly", "慢慢走桥", "慢慢走橋", "Cruzar despacio", "Cruzar devagar", "اعبر ببطء"), body: phrase("Look at the covered corridor, roof layers, timber joints and how people use the bridge.", "看廊道、屋顶层次、木构节点，也看村民如何在桥上停留和通行。", "看廊道、屋頂層次、木構節點，也看村民如何在橋上停留和通行。", "Observa el corredor, los techos, la madera y el uso cotidiano.", "Observe o corredor, os telhados, a madeira e o uso cotidiano.", "لاحظ الممر والسقف والخشب والاستخدام اليومي.") },
      { icon: "book", title: phrase("Connect village context", "连到侗寨背景", "連到侗寨背景", "Conectar con la aldea", "Conectar com a aldeia", "اربطها بالقرية"), body: phrase("The bridge makes most sense together with drum towers, village paths, fields and Dong customs.", "风雨桥要和鼓楼、寨路、田地、侗族习俗一起看才完整。", "風雨橋要和鼓樓、寨路、田地、侗族習俗一起看才完整。", "El puente se entiende con torres, caminos, campos y costumbres dong.", "A ponte se entende com torres, caminhos, campos e costumes dong.", "يفهم الجسر مع الأبراج والطرق والحقول وعادات دونغ.") },
      { icon: "camera", title: phrase("Choose soft light", "选择柔和光线", "選擇柔和光線", "Luz suave", "Luz suave", "اختر ضوءا ناعما"), body: phrase("Morning or late afternoon is better for bridge details and village scenes.", "清晨或傍晚更适合看桥体细节、溪流和村寨环境。", "清晨或傍晚更適合看橋體細節、溪流和村寨環境。", "Mañana o tarde son mejores para detalles y escenas locales.", "Manhã ou fim da tarde são melhores para detalhes e cenas locais.", "الصباح أو آخر النهار أفضل للتفاصيل والمشاهد المحلية.") },
      { icon: "hat", title: phrase("Keep the pace respectful", "保持分寸", "保持分寸", "Ritmo respetuoso", "Ritmo respeitoso", "وتيرة محترمة"), body: phrase("It is a lived village space, so photography and stopping points should not disturb local life.", "这里是仍在使用的村寨空间，拍照和停留都要不打扰当地生活。", "這裡是仍在使用的村寨空間，拍照和停留都要不打擾當地生活。", "Es un espacio vivo; fotos y pausas no deben molestar.", "É um espaço vivo; fotos e pausas não devem incomodar.", "إنه مكان معيش، فلا تزعج الصور والتوقفات الحياة المحلية.") }
    ],
    guide: [
      { icon: "route", title: phrase("Bridge and village route", "桥与侗寨路线", "橋與侗寨路線", "Ruta puente-aldea", "Rota ponte-aldeia", "مسار الجسر والقرية"), body: phrase("Arrange the bridge, nearby Dong villages, drum towers and fields as one route.", "把风雨桥、邻近侗寨、鼓楼和田地安排成一条完整路线。", "把風雨橋、鄰近侗寨、鼓樓和田地安排成一條完整路線。", "Une puente, aldeas, torres y campos en una ruta.", "Una ponte, aldeias, torres e campos em uma rota.", "اجمع الجسر والقرى والأبراج والحقول في مسار واحد.") },
      { icon: "book", title: phrase("Dong culture interpretation", "侗族文化讲解", "侗族文化講解", "Contexto dong", "Contexto dong", "شرح ثقافة دونغ"), body: phrase("Explain wind-rain bridges, drum towers, timber craft and Dong singing traditions.", "讲清风雨桥、鼓楼、木构工艺和侗族大歌之间的关系。", "講清風雨橋、鼓樓、木構工藝和侗族大歌之間的關係。", "Explica puentes, torres, madera y canto dong.", "Explique pontes, torres, madeira e canto dong.", "اشرح الجسور والأبراج والخشب وغناء دونغ.") },
      { icon: "car", title: phrase("Flexible transfer", "灵活接驳", "靈活接駁", "Traslado flexible", "Traslado flexível", "تنقل مرن"), body: phrase("Use private transfer when connecting Sanjiang, villages and surrounding viewpoints.", "串联三江、村寨和周边观景点时，可安排包车接驳。", "串聯三江、村寨和周邊觀景點時，可安排包車接駁。", "Usa traslado privado para Sanjiang, aldeas y miradores.", "Use traslado privado para Sanjiang, aldeias e mirantes.", "استخدم نقلا خاصا بين سانجيانغ والقرى ونقاط المشاهدة.") }
    ]
  }
};

const priorityDestinationMeta: typeof destinationMeta = {
  "Longjing Village": {
    subtitle: phrase("Tea fields · Pan-firing · Growers · Dragon Well tasting", "茶园 · 炒制 · 茶农 · 龙井品鉴", "茶園 · 炒製 · 茶農 · 龍井品鑑", "Campos de te · tostado manual · productores · cata Longjing", "Campos de cha · torra manual · produtores · prova Longjing", "Tea fields · pan-firing · growers · tasting"),
    season: phrase("Spring tea season is best; clear mornings suit tea-field walking.", "春茶季最有现场感，晴朗清晨适合茶园步行", "春茶季最有現場感，晴朗清晨適合茶園步行", "La primavera del te es mejor; manana clara para caminar.", "A primavera do cha e melhor; manha clara para caminhar.", "Spring tea season is best; clear mornings suit walking."),
    pace: phrase("Half day, with field walking, maker context and tasting time.", "半日体验，留出茶园步行、制茶讲解和品饮时间", "半日體驗，留出茶園步行、製茶講解和品飲時間", "Medio dia con campos, elaboracion y cata.", "Meio dia com campos, preparo e prova.", "Half day with fields, making context and tasting."),
    people: phrase("Tea lovers, slow travelers and Hangzhou repeat visitors.", "茶文化爱好者、慢旅行者和杭州深度游客", "茶文化愛好者、慢旅行者和杭州深度遊客", "Amantes del te y viaje lento.", "Amantes de cha e viagem lenta.", "Tea lovers and slow travelers."),
    keywords: phrase("Dragon Well tea, tea fields, pan-firing, growers, tasting", "龙井茶 · 茶园 · 炒制 · 茶农 · 品鉴", "龍井茶 · 茶園 · 炒製 · 茶農 · 品鑑", "Longjing, campos, tostado, productores, cata", "Longjing, campos, torra, produtores, prova", "Longjing, tea fields, pan-firing, growers, tasting"),
    lead: phrase("Longjing Village should connect tea fields, hand firing, growers and tasting.", "龙井村要把茶园、手工炒制、茶农和品饮连起来。", "龍井村要把茶園、手工炒製、茶農和品飲連起來。", "Longjing conecta campos, tostado y cata.", "Longjing conecta campos, torra e prova.", "Longjing connects tea fields, firing and tasting."),
    advice: sharedAdvice("tea"),
    guide: sharedGuide("tea")
  },
  "Wuzhen Water Town": {
    subtitle: phrase("Canals · Stone bridges · Waterside houses · Blue calico · Evening lights", "河道 · 石桥 · 临水民居 · 蓝印花布 · 傍晚灯火", "河道 · 石橋 · 臨水民居 · 藍印花布 · 傍晚燈火", "Canales · puentes · casas junto al agua · luces", "Canais · pontes · casas junto a agua · luzes", "Canals · bridges · waterside houses · evening lights"),
    season: phrase("Spring and autumn are comfortable; dusk is best for canal atmosphere.", "春秋舒适，傍晚更适合看河道气氛", "春秋舒適，傍晚更適合看河道氣氛", "Primavera y otono; atardecer para canales.", "Primavera e outono; fim de tarde nos canais.", "Spring and autumn; dusk for canal atmosphere."),
    pace: phrase("Half day to one day, with both workshops and evening canal time.", "半日到一日，兼顾作坊、石桥和傍晚河道", "半日到一日，兼顧作坊、石橋和傍晚河道", "Medio dia a un dia.", "Meio dia a um dia.", "Half day to one day."),
    people: phrase("Water-town walkers, photographers and Jiangnan culture travelers.", "水乡漫步、摄影和江南文化旅行者", "水鄉漫步、攝影和江南文化旅行者", "Caminantes de pueblos de agua y fotografos.", "Caminhantes de vilas de agua e fotografos.", "Water-town walkers and photographers."),
    keywords: phrase("Canals, stone bridges, blue calico, workshops, evening lights", "河道 · 石桥 · 蓝印花布 · 作坊 · 灯火", "河道 · 石橋 · 藍印花布 · 作坊 · 燈火", "Canales, puentes, talleres, luces", "Canais, pontes, oficinas, luzes", "Canals, bridges, workshops, lights"),
    lead: phrase("Wuzhen should feel like a canal route with lanes, workshops and evening water light.", "乌镇要像一条有巷弄、作坊和傍晚水光的河道路线。", "烏鎮要像一條有巷弄、作坊和傍晚水光的河道路線。", "Wuzhen debe sentirse como una ruta de canales.", "Wuzhen deve parecer uma rota de canais.", "Wuzhen should feel like a canal route."),
    advice: sharedAdvice("village"),
    guide: sharedGuide("village")
  },
  "Putuo Mountain": {
    subtitle: phrase("Guanyin island · Puji Temple · Fayu Temple · Huiji Temple · South Sea Guanyin", "观音道场海岛 · 普济寺 · 法雨寺 · 慧济寺 · 南海观音", "觀音道場海島 · 普濟寺 · 法雨寺 · 慧濟寺 · 南海觀音", "Isla de Guanyin · templos · Guanyin del Mar del Sur", "Ilha de Guanyin · templos · Guanyin do Mar do Sul", "Guanyin island · temples · South Sea Guanyin"),
    season: phrase("Clear non-peak days are best; ferry and weather should be checked first.", "晴朗非高峰更合适，先确认轮渡和海上天气", "晴朗非高峰更合適，先確認輪渡和海上天氣", "Dias claros y tranquilos; revisa ferry y clima.", "Dias claros e calmos; confira ferry e clima.", "Clear non-peak days; check ferry and weather."),
    pace: phrase("One day or overnight, planned around ferry, temple order and walking distance.", "一日或住一晚，按轮渡、寺院顺序和步行距离安排", "一日或住一晚，按輪渡、寺院順序和步行距離安排", "Un dia o una noche, segun ferry y templos.", "Um dia ou uma noite, conforme ferry e templos.", "One day or overnight, around ferry and temples."),
    people: phrase("Pilgrimage travelers, Buddhist-culture visitors and island walkers.", "朝山者、佛教文化游客和海岛步行爱好者", "朝山者、佛教文化遊客和海島步行愛好者", "Peregrinos y caminantes de isla.", "Peregrinos e caminhantes de ilha.", "Pilgrimage travelers and island walkers."),
    keywords: phrase("Puji Temple, Fayu Temple, Huiji Temple, Zizhulin, South Sea Guanyin", "普济寺 · 法雨寺 · 慧济寺 · 紫竹林 · 南海观音", "普濟寺 · 法雨寺 · 慧濟寺 · 紫竹林 · 南海觀音", "Puji, Fayu, Huiji, Zizhulin, Guanyin", "Puji, Fayu, Huiji, Zizhulin, Guanyin", "Puji, Fayu, Huiji, Zizhulin, Guanyin"),
    lead: phrase("Putuo Mountain is a sea-facing Guanyin pilgrimage route with temples, ferry arrival and island paths.", "普陀山是一条面向大海的观音朝山路线，寺院、轮渡和海岛步道要一起看。", "普陀山是一條面向大海的觀音朝山路線，寺院、輪渡和海島步道要一起看。", "Putuo es una ruta de peregrinacion frente al mar.", "Putuo e uma rota de peregrinacao frente ao mar.", "Putuo is a sea-facing Guanyin pilgrimage route."),
    advice: sharedAdvice("spiritual"),
    guide: sharedGuide("spiritual")
  },
  "Xitang Ancient Town": {
    subtitle: phrase("Covered corridors · Canals · Stone bridges · Narrow lanes · Night water town", "廊棚 · 河道 · 石桥 · 窄巷 · 夜间水乡", "廊棚 · 河道 · 石橋 · 窄巷 · 夜間水鄉", "Corredores cubiertos · canales · puentes · noche", "Corredores cobertos · canais · pontes · noite", "Covered corridors · canals · bridges · night town"),
    season: phrase("Spring and autumn are comfortable; evening reflections are especially strong.", "春秋舒适，夜间水面倒影更有氛围", "春秋舒適，夜間水面倒影更有氛圍", "Primavera y otono; reflejos nocturnos.", "Primavera e outono; reflexos noturnos.", "Spring and autumn; evening reflections."),
    pace: phrase("Half day to one day, leaving time under the covered corridors.", "半日到一日，给廊棚下的慢走留时间", "半日到一日，給廊棚下的慢走留時間", "Medio dia a un dia.", "Meio dia a um dia.", "Half day to one day."),
    people: phrase("Water-town walkers, night-scene photographers and slow travelers.", "水乡漫步、夜景摄影和慢旅行者", "水鄉漫步、夜景攝影和慢旅行者", "Caminantes, fotografos nocturnos y viajeros lentos.", "Caminhantes, fotografos noturnos e viajantes lentos.", "Water-town walkers and night photographers."),
    keywords: phrase("Covered corridors, canals, stone bridges, night lights", "廊棚 · 河道 · 石桥 · 夜间灯火", "廊棚 · 河道 · 石橋 · 夜間燈火", "Corredores, canales, puentes, luces", "Corredores, canais, pontes, luzes", "Corridors, canals, bridges, lights"),
    lead: phrase("Xitang is about sheltered riverside walking and changing canal light.", "西塘的重点是廊棚下的临河慢走和河道光影变化。", "西塘的重點是廊棚下的臨河慢走和河道光影變化。", "Xitang trata de caminar junto al canal.", "Xitang trata de caminhar junto ao canal.", "Xitang is about covered canal walking."),
    advice: sharedAdvice("village"),
    guide: sharedGuide("village")
  },
  "Ningbo Tianyi Pavilion": {
    subtitle: phrase("Ming library · Book collecting · Courtyards · Fire-prevention layout", "明代藏书楼 · 藏书文化 · 院落 · 防火格局", "明代藏書樓 · 藏書文化 · 院落 · 防火格局", "Biblioteca Ming · libros · patios", "Biblioteca Ming · livros · patios", "Ming library · books · courtyards"),
    season: phrase("Clear mornings or quiet hours suit courtyard details.", "清晨或安静时段更适合看院落细节", "清晨或安靜時段更適合看院落細節", "Manana o horas tranquilas.", "Manha ou horas tranquilas.", "Morning or quiet hours."),
    pace: phrase("Two to three hours, with time for library rooms, courtyards and inscriptions.", "2-3小时，留给藏书楼、院落和题刻", "2-3小時，留給藏書樓、院落和題刻", "Dos a tres horas.", "Duas a tres horas.", "Two to three hours."),
    people: phrase("History, books, gardens and Ningbo culture lovers.", "历史、藏书、园林和宁波文化爱好者", "歷史、藏書、園林和寧波文化愛好者", "Amantes de historia, libros y jardines.", "Amantes de historia, livros e jardins.", "History, books and garden lovers."),
    keywords: phrase("Tianyi Pavilion, book collecting, courtyards, ponds, Ningbo scholarship", "天一阁 · 藏书 · 院落 · 水池 · 宁波文脉", "天一閣 · 藏書 · 院落 · 水池 · 寧波文脈", "Tianyi, libros, patios, estanques", "Tianyi, livros, patios, tanques", "Tianyi, books, courtyards, ponds"),
    lead: phrase("Tianyi Pavilion is a library garden about books, water, walls and family scholarship.", "天一阁是一座关于书籍、水池、墙院和家族学术的藏书园林。", "天一閣是一座關於書籍、水池、牆院和家族學術的藏書園林。", "Tianyi es un jardin biblioteca.", "Tianyi e um jardim biblioteca.", "Tianyi is a library garden."),
    advice: sharedAdvice("heritage"),
    guide: sharedGuide("heritage")
  },
  "Nanxun Ancient Town": {
    subtitle: phrase("Silk merchants · Canals · Gardens · Jiaye Library · Chinese-Western details", "丝商宅第 · 河道 · 园林 · 嘉业堂 · 中西合璧细节", "絲商宅第 · 河道 · 園林 · 嘉業堂 · 中西合璧細節", "Mercaderes de seda · canales · jardines", "Mercadores de seda · canais · jardins", "Silk merchants · canals · gardens"),
    season: phrase("Spring and autumn are comfortable; quiet mornings suit mansions and canals.", "春秋舒适，清晨适合看商宅和河道", "春秋舒適，清晨適合看商宅和河道", "Primavera y otono; manana tranquila.", "Primavera e outono; manha tranquila.", "Spring and autumn; quiet mornings."),
    pace: phrase("Half day to one day, linking mansions, gardens, library and canal walks.", "半日到一日，串联商宅、园林、藏书楼和河道步行", "半日到一日，串聯商宅、園林、藏書樓和河道步行", "Medio dia a un dia.", "Meio dia a um dia.", "Half day to one day."),
    people: phrase("Architecture, gardens, merchant history and Jiangnan culture travelers.", "建筑、园林、商帮历史和江南文化旅行者", "建築、園林、商幫歷史和江南文化旅行者", "Arquitectura, jardines e historia mercantil.", "Arquitetura, jardins e historia mercantil.", "Architecture, gardens and merchant history travelers."),
    keywords: phrase("Xiaolianzhuang, Jiaye Library, canals, merchant mansions", "小莲庄 · 嘉业堂 · 河道 · 商宅", "小蓮莊 · 嘉業堂 · 河道 · 商宅", "Xiaolianzhuang, Jiaye, canales, mansiones", "Xiaolianzhuang, Jiaye, canais, mansoes", "Xiaolianzhuang, Jiaye Library, canals, mansions"),
    lead: phrase("Nanxun is shaped by silk-merchant mansions, gardens, libraries and canals.", "南浔的重点在丝商宅第、园林、藏书楼和河道。", "南潯的重點在絲商宅第、園林、藏書樓和河道。", "Nanxun destaca por mansiones, jardines y biblioteca.", "Nanxun destaca por mansoes, jardins e biblioteca.", "Nanxun stands out through mansions, gardens and libraries."),
    advice: sharedAdvice("village"),
    guide: sharedGuide("village")
  },
  "Zhoushan Fishing Coast": {
    subtitle: phrase("Island harbors · Fishing boats · Seafood markets · East China Sea weather", "海岛港口 · 渔船 · 海鲜市场 · 东海天气", "海島港口 · 漁船 · 海鮮市場 · 東海天氣", "Puertos insulares · barcos · mercados de marisco", "Portos insulares · barcos · mercados de frutos do mar", "Island harbors · fishing boats · seafood markets"),
    season: phrase("Clear weather and stable sea conditions are best.", "天气晴朗、海况稳定时最合适", "天氣晴朗、海況穩定時最合適", "Mejor con clima claro y mar estable.", "Melhor com clima claro e mar estavel.", "Clear weather and stable sea conditions."),
    pace: phrase("Half day to one day, planned around harbor timing and seafood stops.", "半日到一日，按港口时间和海鲜停留安排", "半日到一日，按港口時間和海鮮停留安排", "Medio dia a un dia.", "Meio dia a um dia.", "Half day to one day."),
    people: phrase("Seafood lovers, coastal walkers and island-life observers.", "海鲜爱好者、海岸漫步和海岛生活观察者", "海鮮愛好者、海岸漫步和海島生活觀察者", "Amantes del marisco y vida de isla.", "Amantes de frutos do mar e vida de ilha.", "Seafood lovers and island-life observers."),
    keywords: phrase("Harbor, fishing boats, seafood market, island roads, East China Sea", "港口 · 渔船 · 海鲜市场 · 海岛道路 · 东海", "港口 · 漁船 · 海鮮市場 · 海島道路 · 東海", "Puerto, barcos, mercado, islas", "Porto, barcos, mercado, ilhas", "Harbor, boats, seafood market, islands"),
    lead: phrase("Zhoushan's coast is a working fishing archipelago with harbors, boats, seafood markets and island roads.", "舟山海岸是仍在运转的渔业群岛，要看港口、渔船、海鲜市场和海岛道路。", "舟山海岸是仍在運轉的漁業群島，要看港口、漁船、海鮮市場和海島道路。", "Zhoushan es un archipielago pesquero vivo.", "Zhoushan e um arquipelago pesqueiro vivo.", "Zhoushan is a working fishing archipelago."),
    advice: sharedAdvice("coast"),
    guide: sharedGuide("coast")
  },
  "Shaoxing Old City": {
    subtitle: phrase(
      "Canals · Black-awning boats · Yellow rice wine · Lu Xun memory · Stone bridges",
      "河道 · 乌篷船 · 黄酒 · 鲁迅故里 · 古桥",
      "河道 · 烏篷船 · 黃酒 · 魯迅故里 · 古橋",
      "Canales · barcas negras · vino de arroz · memoria de Lu Xun · puentes",
      "Canais · barcos de toldo preto · vinho de arroz · memoria de Lu Xun · pontes",
      "Canals · black-awning boats · yellow rice wine · Lu Xun memory · bridges"
    ),
    season: phrase(
      "Spring and autumn are comfortable; morning canal light is best for walking.",
      "春秋舒适，清晨河道光线最适合慢走",
      "春秋舒適，清晨河道光線最適合慢走",
      "Primavera y otoño son comodos; la manana junto al canal es mejor.",
      "Primavera e outono sao confortaveis; a manha nos canais e melhor.",
      "Spring and autumn are comfortable; morning canal light is best."
    ),
    pace: phrase(
      "Half day to one day, linking canals, bridges, Lu Xun Native Place and wine culture.",
      "半日到一日，串联河道、古桥、鲁迅故里和黄酒文化",
      "半日到一日，串聯河道、古橋、魯迅故里和黃酒文化",
      "Medio dia a un dia, con canales, puentes, Lu Xun y vino de arroz.",
      "Meio dia a um dia, com canais, pontes, Lu Xun e vinho de arroz.",
      "Half day to one day, linking canals, bridges, Lu Xun and wine culture."
    ),
    people: phrase(
      "Old-town walkers, literature lovers, food travelers and photographers.",
      "老城漫步、文学、黄酒美食和摄影爱好者",
      "老城漫步、文學、黃酒美食和攝影愛好者",
      "Caminantes de casco antiguo, literatura, comida y fotografia.",
      "Caminhantes de cidade antiga, literatura, comida e fotografia.",
      "Old-town walkers, literature lovers, food travelers and photographers."
    ),
    keywords: phrase(
      "Canals, black-awning boats, Lu Xun Native Place, yellow rice wine, stone bridges",
      "河道 · 乌篷船 · 鲁迅故里 · 黄酒 · 古桥",
      "河道 · 烏篷船 · 魯迅故里 · 黃酒 · 古橋",
      "Canales, barcas negras, Lu Xun, vino de arroz, puentes",
      "Canais, barcos de toldo preto, Lu Xun, vinho de arroz, pontes",
      "Canals, black-awning boats, Lu Xun, yellow rice wine, bridges"
    ),
    lead: phrase(
      "Shaoxing Old City should feel like a lived water city: canals, river steps, wine shops, Lu Xun memory and stone bridges.",
      "绍兴老城要像一座仍在生活的水城：河道、河埠头、黄酒铺、鲁迅记忆和古桥都要进入介绍。",
      "紹興老城要像一座仍在生活的水城：河道、河埠頭、黃酒鋪、魯迅記憶和古橋都要進入介紹。",
      "Shaoxing debe sentirse como una ciudad de agua viva, no solo una postal de Jiangnan.",
      "Shaoxing deve parecer uma cidade de agua viva, nao apenas um postal de Jiangnan.",
      "Shaoxing Old City should feel like a lived water city."
    ),
    advice: sharedAdvice("heritage"),
    guide: sharedGuide("heritage")
  },
  "West Lake": {
    subtitle: phrase(
      "Su Causeway · Bai Causeway · Broken Bridge · Three Pools · Leifeng Pagoda views",
      "苏堤白堤 · 断桥 · 三潭印月 · 雷峰塔视线 · 湖滨步行",
      "蘇堤白堤 · 斷橋 · 三潭印月 · 雷峰塔視線 · 湖濱步行",
      "Calzadas Su y Bai · Puente Roto · Tres Estanques · vistas de Leifeng",
      "Calçadas Su e Bai · Ponte Quebrada · Tres Lagos · vista da Pagode Leifeng",
      "Su Causeway · Bai Causeway · Broken Bridge · Three Pools · Leifeng Pagoda"
    ),
    season: phrase(
      "Spring and autumn are most comfortable; early morning and dusk have softer light.",
      "春秋最舒适，清晨和傍晚光线更柔和",
      "春秋最舒適，清晨和傍晚光線更柔和",
      "Primavera y otoño son mas comodas; manana y atardecer tienen luz suave.",
      "Primavera e outono sao mais confortaveis; manha e fim de tarde tem luz suave.",
      "Spring and autumn are most comfortable; morning and dusk are softer."
    ),
    pace: phrase(
      "Half day to one day; choose one or two walking sections instead of rushing the whole lake.",
      "半日到一日，选一到两段步行线，不赶完整绕湖",
      "半日到一日，選一到兩段步行線，不趕完整繞湖",
      "Medio dia a un dia; elige una o dos secciones a pie.",
      "Meio dia a um dia; escolha uma ou duas partes a pe.",
      "Half day to one day; choose one or two walking sections."
    ),
    people: phrase(
      "First-time Hangzhou visitors, garden lovers and slow walkers.",
      "初访杭州者、园林爱好者和慢行旅行者",
      "初訪杭州者、園林愛好者和慢行旅行者",
      "Primer viaje a Hangzhou, amantes de jardines y caminantes tranquilos.",
      "Primeira visita a Hangzhou, amantes de jardins e caminhantes lentos.",
      "First-time Hangzhou visitors, garden lovers and slow walkers."
    ),
    keywords: phrase(
      "Su Causeway, Bai Causeway, Broken Bridge, Three Pools, Leifeng Pagoda",
      "苏堤 · 白堤 · 断桥 · 三潭印月 · 雷峰塔",
      "蘇堤 · 白堤 · 斷橋 · 三潭印月 · 雷峰塔",
      "Su, Bai, Puente Roto, Tres Estanques, Leifeng",
      "Su, Bai, Ponte Quebrada, Tres Lagos, Leifeng",
      "Su Causeway, Bai Causeway, Broken Bridge, Three Pools, Leifeng"
    ),
    lead: phrase(
      "West Lake should be read through causeways, islands, bridges, temples, gardens and poetic views.",
      "西湖要看堤、岛、桥、寺、园林和诗画视线。",
      "西湖要看堤、島、橋、寺、園林和詩畫視線。",
      "West Lake se lee por calzadas, islas, puentes, templos, jardines y vistas poeticas.",
      "West Lake se entende por calçadas, ilhas, pontes, templos, jardins e vistas poeticas.",
      "West Lake is read through causeways, islands, bridges, temples, gardens and poetic views."
    ),
    advice: sharedAdvice("heritage"),
    guide: sharedGuide("heritage")
  },
  "Liaoyang White Pagoda": {
    subtitle: phrase("Guangyou Temple · Liao brick pagoda · Liaoyang old city memory", "广佑寺白塔 · 辽代砖塔 · 辽阳古城记忆", "廣佑寺白塔 · 遼代磚塔 · 遼陽古城記憶", "Templo Guangyou · pagoda de ladrillo Liao · memoria antigua de Liaoyang", "Templo Guangyou · pagode de tijolo Liao · memória antiga de Liaoyang", "賲毓亘丿 睾賵丕賳睾賷賵 路 亘乇噩 丕賱胤賵亘 賱賷丕賵 路 匕丕賰乇丞 賱賷丕賵賷丕賳睾 丕賱賯丿賷賲丞"),
    season: phrase("Clear mornings or quiet non-peak hours are best for tower details.", "清晨或非高峰时段更适合看塔身细节", "清晨或非高峰時段更適合看塔身細節", "Mañanas despejadas u horas tranquilas para ver detalles.", "Manhãs claras ou horários tranquilos para ver detalhes.", "丕賱氐亘丕丨 丕賱氐丕賮賷 兀賵 丕賱兀賵賯丕鬲 丕賱賴丕丿卅丞 兀賮囟賱 賱鬲賮丕氐賷賱 丕賱亘乇噩"),
    pace: phrase("Half day, leaving time for the tower, Guangyou Temple and White Pagoda Park.", "半日，留给白塔、广佑寺和白塔公园", "半日，留給白塔、廣佑寺和白塔公園", "Medio día para la pagoda, Guangyou y el parque.", "Meio dia para a pagode, Guangyou e o parque.", "賳氐賮 賷賵賲 賱賱亘乇噩 賵賲毓亘丿 睾賵丕賳睾賷賵 賵丕賱丨丿賷賯丞"),
    people: phrase("History, Buddhist architecture and old-city walkers.", "历史、佛教建筑和老城漫步爱好者", "歷史、佛教建築和老城漫步愛好者", "Amantes de historia, arquitectura budista y ciudad antigua.", "Quem gosta de história, arquitetura budista e cidade antiga.", "賲丨亘賵 丕賱鬲丕乇賷禺 賵丕賱毓賲丕乇丞 丕賱亘賵匕賷丞 賵丕賱賲丿賳 丕賱賯丿賷賲丞"),
    keywords: phrase("Guangyou Temple, Liao brick pagoda, dense eaves, old city axis", "广佑寺 · 辽代砖塔 · 密檐结构 · 老城中轴", "廣佑寺 · 遼代磚塔 · 密簷結構 · 老城中軸", "Guangyou, pagoda Liao, aleros densos, eje antiguo", "Guangyou, pagode Liao, beirais densos, eixo antigo", "睾賵丕賳睾賷賵貙 亘乇噩 胤賵亘 賱賷丕賵貙 兀賮丕乇賷夭 賰孬賷賮丞貙 賲丨賵乇 丕賱賲丿賷賳丞 丕賱賯丿賷賲丞"),
    lead: phrase("Liaoyang White Pagoda should be read through Guangyou Temple, Liao-dynasty brickwork, tower proportions and old-city memory, not only as a generic pagoda.", "辽阳白塔要从广佑寺、辽代砖塔形制、塔身比例和老城记忆来理解，不只是普通佛塔照片。", "遼陽白塔要從廣佑寺、遼代磚塔形制、塔身比例和老城記憶來理解，不只是普通佛塔照片。", "La pagoda se entiende por Guangyou, ladrillo Liao y memoria urbana, no como una torre genérica.", "A pagode se entende por Guangyou, tijolo Liao e memória urbana, não como torre genérica.", "賷賮賴賲 亘乇噩 賱賷丕賵賷丕賳睾 毓亘乇 睾賵丕賳睾賷賵 賵胤賵亘 賱賷丕賵 賵匕丕賰乇丞 丕賱賲丿賷賳丞 賵賱賷爻 賰亘乇噩 毓丕賲"),
    advice: sharedAdvice("spiritual"),
    guide: sharedGuide("spiritual")
  },
  "Shiwan Ceramic Studio": {
    subtitle: phrase("Kiln memory · Clay shaping · Foshan folk craft", "窑火记忆 · 泥塑造型 · 佛山民间工艺", "窯火記憶 · 泥塑造型 · 佛山民間工藝", "Memoria de horno · Modelado de barro · Artesanía popular de Foshan", "Memória de forno · modelagem em barro · artesanato popular de Foshan", "匕丕賰乇丞 丕賱賮乇賳 路 鬲卮賰賷賱 丕賱胤賷賳 路 丨乇賮 賮賵卮丕賳 丕賱卮毓亘賷丞"),
    season: phrase("Best during workshop opening hours; confirm demonstrations in advance.", "工作坊开放时段最佳，建议提前确认示范时间", "工作坊開放時段最佳，建議提前確認示範時間", "Mejor durante horario de talleres; confirma demostraciones.", "Melhor durante o horário das oficinas; confirme demonstrações.", "兀賮囟賱 禺賱丕賱 爻丕毓丕鬲 丕賱賵乇卮貙 賵賷賮囟賱 鬲兀賰賷丿 丕賱毓乇賵囟 賲爻亘賯丕"),
    pace: phrase("Two to three hours, with time for kiln space, making steps and craft explanation.", "2-3小时，留给窑址空间、制作工序和工艺讲解", "2-3小時，留給窯址空間、製作工序和工藝講解", "Dos a tres horas para horno, proceso y explicación.", "Duas a três horas para forno, processo e explicação.", "爻丕毓鬲丕賳 廿賱賶 孬賱丕孬 爻丕毓丕鬲 賱賲爻丕丨丞 丕賱賮乇賳 賵丕賱毓賲賱賷丞 賵丕賱卮乇丨"),
    people: phrase("Design, handcraft and Lingnan culture lovers.", "设计、手作和岭南文化爱好者", "設計、手作和嶺南文化愛好者", "Amantes de diseño, artesanía y cultura Lingnan.", "Amantes de design, artesanato e cultura Lingnan.", "賲丨亘賵 丕賱鬲氐賲賷賲 賵丕賱丨乇賮 丕賱賷丿賵賷丞 賵孬賯丕賮丞 賱賷賳睾賳丕賳"),
    keywords: phrase("Shiwan kiln, ceramic figures, clay, glaze, Foshan craft", "石湾窑 · 陶塑人物 · 泥料 · 釉色 · 佛山工艺", "石灣窯 · 陶塑人物 · 泥料 · 釉色 · 佛山工藝", "Horno Shiwan, figuras cerámicas, barro, esmalte, artesanía de Foshan", "Forno Shiwan, figuras cerâmicas, barro, esmalte, artesanato de Foshan", "賮乇賳 卮賷賵丕賳貙 卮禺氐賷丕鬲 禺夭賮賷丞貙 胤賷賳貙 鬲夭噩賷噩貙 丨乇賮 賮賵卮丕賳"),
    lead: phrase("Shiwan ceramic culture should be read through kiln space, clay shaping and Lingnan folk aesthetics, not one isolated artifact.", "石湾陶艺要看窑址空间、泥塑造型和岭南民间审美，不是一件孤立陶塑。", "石灣陶藝要看窯址空間、泥塑造型和嶺南民間審美，不是一件孤立陶塑。", "Shiwan se entiende por hornos, modelado y estética Lingnan, no por una pieza aislada.", "Shiwan se entende por fornos, modelagem e estética Lingnan, não por uma peça isolada.", "賷賮賴賲 禺夭賮 卮賷賵丕賳 毓亘乇 丕賱賮乇賳 賵鬲卮賰賷賱 丕賱胤賷賳 賵噩賲丕賱賷丕鬲 賱賷賳睾賳丕賳貙 賱丕 賯胤毓丞 賲毓夭賵賱丞"),
    advice: sharedAdvice("craft"),
    guide: sharedGuide("craft")
  },
  "Xiqiao Mountain": {
    subtitle: phrase("Lingnan mountain · Nanhai Guanyin · Foshan Buddhist landscape", "岭南山水 · 南海观音 · 佛山佛教空间", "嶺南山水 · 南海觀音 · 佛山佛教空間", "Montaña Lingnan · Guanyin de Nanhai · paisaje budista de Foshan", "Montanha Lingnan · Guanyin de Nanhai · paisagem budista de Foshan", "噩亘賱 賱賷賳睾賳丕賳 路 賳丕賳賴丕賷 睾賵丕賳賷賳 路 賲卮賴丿 亘賵匕賷 賮賵卮丕賳"),
    season: phrase("Spring and autumn are comfortable; clear days suit views and temple walking.", "春秋舒适，晴朗天气适合观景和寺院步行", "春秋舒適，晴朗天氣適合觀景和寺院步行", "Primavera y otoño son cómodos; días despejados sirven para vistas y templos.", "Primavera e outono são agradáveis; dias claros servem para vistas e templos.", "丕賱乇亘賷毓 賵丕賱禺乇賷賮 賲乇賷丨丕賳貙 賵丕賱兀賷丕賲 丕賱氐丕賮賷丞 鬲賳丕爻亘 丕賱賲卮丕賴丿 賵丕賱賲卮賷"),
    pace: phrase("Half day to one day, planned around Guanyin plaza, trails and viewpoints.", "半日到一日，按观音广场、步道和观景点安排", "半日到一日，按觀音廣場、步道和觀景點安排", "Medio día a un día, con plaza Guanyin, senderos y miradores.", "Meio dia a um dia, com praça Guanyin, trilhas e mirantes.", "賳氐賮 賷賵賲 廿賱賶 賷賵賲 貙 丨爻亘 爻丕丨丞 睾賵丕賳賷賳 賵丕賱賲爻丕乇丕鬲 賵賳賯丕胤 丕賱賲卮賴丿"),
    people: phrase("Families, Lingnan culture travelers and Buddhist landscape walkers.", "家庭、岭南文化和佛教山水爱好者", "家庭、嶺南文化和佛教山水愛好者", "Familias y viajeros interesados en cultura Lingnan y paisaje budista.", "Famílias e viajantes de cultura Lingnan e paisagem budista.", "毓丕卅賱丕鬲 賵賲丨亘賵 孬賯丕賮丞 賱賷賳睾賳丕賳 賵丕賱賲卮丕賴丿 丕賱亘賵匕賷丞"),
    keywords: phrase("Nanhai Guanyin, volcanic landform, forest trails, Foshan mountain scenery", "南海观音 · 古火山地貌 · 林间步道 · 佛山山水", "南海觀音 · 古火山地貌 · 林間步道 · 佛山山水", "Guanyin de Nanhai, relieve volcánico, senderos, paisaje de Foshan", "Guanyin de Nanhai, relevo vulcânico, trilhas, paisagem de Foshan", "賳丕賳賴丕賷 睾賵丕賳賷賳貙 鬲囟丕乇賷爻 亘乇賰丕賳賷丞貙 賲爻丕乇丕鬲 睾丕亘丕鬲貙 賲賳馗乇 賮賵卮丕賳"),
    lead: phrase("Xiqiao Mountain should connect Foshan's Lingnan mountain scenery, Nanhai Guanyin and Buddhist walking routes, not a city panorama.", "西樵山要看佛山岭南山水、南海观音和佛教步行空间，不是城市俯瞰图。", "西樵山要看佛山嶺南山水、南海觀音和佛教步行空間，不是城市俯瞰圖。", "Xiqiao debe mostrar montaña Lingnan, Guanyin y rutas budistas, no panorama urbano.", "Xiqiao deve mostrar montanha Lingnan, Guanyin e rotas budistas, não panorama urbano.", "噩亘賱 卮賷賯賷丕賵 賷噩亘 兀賳 賷馗賴乇 噩亘丕賱 賱賷賳睾賳丕賳 賵睾賵丕賳賷賳 賵胤乇賯 亘賵匕賷丞貙 賱賷爻 賲賳馗乇丕 丨囟乇賷丕"),
    advice: sharedAdvice("nature"),
    guide: sharedGuide("nature")
  },
  "Liwan Food Market": {
    subtitle: phrase("Cantonese ingredients · Seafood · Soup culture · Neighborhood shopping", "粤菜食材 · 海鲜水产 · 老火汤料 · 街坊采购", "粵菜食材 · 海鮮水產 · 老火湯料 · 街坊採購", "Ingredientes cantoneses · Mariscos · Sopas lentas · Compra vecinal", "Ingredientes cantoneses · frutos do mar · sopas lentas · compras de bairro", "賲賰賵賳丕鬲 賰丕賳鬲賵賳賷丞 路 賲兀賰賵賱丕鬲 亘丨乇賷丞 路 丨爻丕亍 亘胤賷亍 路 鬲爻賵賯 丕賱丨賷"),
    season: phrase("Morning or late afternoon, when stalls and neighborhood shopping feel most alive.", "早市或傍晚最合适，摊位和街坊采购最有现场感", "早市或傍晚最合適，攤位和街坊採購最有現場感", "Mañana o tarde, cuando los puestos y compras vecinales están vivos.", "Manhã ou fim da tarde, quando bancas e compras locais estão vivas.", "丕賱氐亘丕丨 兀賵 丌禺乇 丕賱賳賴丕乇 丨賷孬 鬲賰賵賳 丕賱兀賰卮丕賰 賵鬲爻賵賯 丕賱丨賷 兀賰孬乇 丨賷賵賷丞"),
    pace: phrase("One to two hours, moving slowly through stalls, ingredients and local conversations.", "1-2小时，按摊位、食材和本地交流慢慢看", "1-2小時，按攤位、食材和本地交流慢慢看", "Una a dos horas entre puestos, ingredientes y conversaciones locales.", "Uma a duas horas entre bancas, ingredientes e conversas locais.", "爻丕毓丞 廿賱賶 爻丕毓鬲賷賳 亘賷賳 丕賱兀賰卮丕賰 賵丕賱賲賰賵賳丕鬲 賵丕賱丨賵丕乇丕鬲 丕賱賲丨賱賷丞"),
    people: phrase("Food lovers, market walkers and travelers curious about Cantonese home cooking.", "美食爱好者、市场漫步者和广府家常菜文化爱好者", "美食愛好者、市場漫步者和廣府家常菜文化愛好者", "Amantes de comida, mercados y cocina casera cantonesa.", "Quem gosta de comida, mercados e cozinha caseira cantonesa.", "賲丨亘賵 丕賱胤毓丕賲 賵丕賱兀爻賵丕賯 賵丕賱胤亘禺 丕賱賲賳夭賱賷 丕賱賰丕賳鬲賵賳賷"),
    keywords: phrase("Fresh seafood, soup ingredients, roast meats, dried goods, neighborhood market", "鲜活海鲜 · 老火汤料 · 烧味腊味 · 干货 · 街坊市场", "鮮活海鮮 · 老火湯料 · 燒味臘味 · 乾貨 · 街坊市場", "Marisco fresco, ingredientes de sopa, asados, secos, mercado vecinal", "Frutos do mar frescos, ingredientes de sopa, assados, secos, mercado local", "賲兀賰賵賱丕鬲 亘丨乇賷丞 胤丕夭噩丞貙 賲賰賵賳丕鬲 丨爻丕亍貙 賱丨賵賲 賲卮賵賷丞貙 賲噩賮賮丕鬲貙 爻賵賯 丕賱丨賷"),
    lead: phrase("Liwan Food Market should show Cantonese freshness and everyday shopping habits, not Guangzhou night scenery.", "荔湾食材市场要看广府人怎样买鲜活食材、配汤料和选烧味干货，不是看广州夜景。", "荔灣食材市場要看廣府人怎樣買鮮活食材、配湯料和選燒味乾貨，不是看廣州夜景。", "El mercado de Liwan trata de frescura cantonesa y compra diaria, no de vistas nocturnas.", "O mercado de Liwan trata de frescor cantonês e compras diárias, não de vista noturna.", "爻賵賯 賱賷賵丕賳 毓賳 賳囟丕乇丞 丕賱胤毓丕賲 丕賱賰丕賳鬲賵賳賷 賵毓丕丿丕鬲 丕賱鬲爻賵賯 丕賱賷賵賲賷丞 賵賱賷爻 賲賳馗乇丕 賱賷賱賷丕"),
    advice: sharedAdvice("market"),
    guide: sharedGuide("market")
  },
  "Huaiyang Cuisine Kitchen": {
    subtitle: phrase("Knife skills · Fresh river flavors · Refined Jiangsu cooking", "刀工 · 清鲜河鲜 · 江苏精致烹饪", "刀工 · 清鮮河鮮 · 江蘇精緻烹飪", "Corte fino · Sabores frescos de río · Cocina refinada de Jiangsu", "Corte fino · sabores frescos de rio · culinária refinada de Jiangsu", "賲賴丕乇丕鬲 丕賱爻賰賷賳 路 賳賰賴丕鬲 賳賴乇賷丞 胤丕夭噩丞 路 胤賴賷 噩賷丕賳睾爻賵 丕賱賲賴匕亘"),
    season: phrase("Best for lunch or dinner when the kitchen pace is complete.", "午餐或晚餐最合适，能看到完整厨房与宴席节奏", "午餐或晚餐最合適，能看到完整廚房與宴席節奏", "Mejor en almuerzo o cena, cuando se entiende el ritmo de cocina y mesa.", "Melhor no almoço ou jantar, com ritmo completo de cozinha e mesa.", "丕賱睾丿丕亍 兀賵 丕賱毓卮丕亍 兀賮囟賱 賱乇丐賷丞 廿賷賯丕毓 丕賱賲胤亘禺 賵丕賱賲丕卅丿丞"),
    pace: phrase("Two to three hours, with dishes, technique and explanation paced together.", "2-3小时，菜品、刀工和讲解一起安排", "2-3小時，菜品、刀工和講解一起安排", "Dos a tres horas, combinando platos, técnica y explicación.", "Duas a três horas, combinando pratos, técnica e explicação.", "爻丕毓鬲丕賳 廿賱賶 孬賱丕孬 爻丕毓丕鬲 賲毓 丕賱兀胤亘丕賯 賵丕賱鬲賯賳賷丞 賵丕賱卮乇丨"),
    people: phrase("Food culture travelers, cooking learners and Jiangsu culture lovers.", "美食文化、烹饪体验和江苏地方文化爱好者", "美食文化、烹飪體驗和江蘇地方文化愛好者", "Viajeros de cultura gastronómica y cocina de Jiangsu.", "Viajantes de cultura gastronômica e culinária de Jiangsu.", "賲丨亘賵 孬賯丕賮丞 丕賱胤毓丕賲 賵鬲噩丕乇亘 丕賱胤賴賷 賵孬賯丕賮丞 噩賷丕賳睾爻賵"),
    keywords: phrase("Gansi, clear soup, river fish, shrimp, Yangzhou banquet rhythm", "干丝 · 清汤 · 河鲜 · 虾蟹 · 扬州宴席节奏", "乾絲 · 清湯 · 河鮮 · 蝦蟹 · 揚州宴席節奏", "Gansi, sopa clara, pescado de río, camarón, ritmo de banquete", "Gansi, sopa clara, peixe de rio, camarão, ritmo de banquete", "睾丕賳爻賷貙 丨爻丕亍 氐丕賮貙 兀爻賲丕賰 賳賴乇賷丞貙 乇賵亘賷丕賳貙 廿賷賯丕毓 賵賱賷賲丞 賷丕賳睾夭賵"),
    lead: phrase("Huaiyang cuisine is about precision and restraint: knife work, fresh river ingredients, clear soups and elegant pacing, not one random heavy dish.", "淮扬菜看的是精细与克制：刀工、河鲜、清汤和雅致宴席节奏，不是一盘随意的厚重菜。", "淮揚菜看的是精細與克制：刀工、河鮮、清湯和雅緻宴席節奏，不是一盤隨意的厚重菜。", "La cocina Huaiyang trata de precisión, ingredientes de río, sopas claras y ritmo elegante.", "A cozinha Huaiyang trata de precisão, ingredientes de rio, sopas claras e ritmo elegante.", "賲胤亘禺 賴賵丕賷賷丕賳睾 毓賳 丕賱丿賯丞 賵丕賱賴丿賵亍 賵賲賰賵賳丕鬲 丕賱賳賴乇 賵丕賱丨爻丕亍 丕賱氐丕賮賷"),
    advice: sharedAdvice("food"),
    guide: sharedGuide("food")
  },
  "Shennongjia Forest": {
    subtitle: phrase("Primeval forest · Shennong Peak · Dajiuhu wetlands", "原始森林 · 神农顶 · 大九湖湿地", "原始森林 · 神農頂 · 大九湖濕地", "Bosque primario · Pico Shennong · Humedales Dajiuhu", "Floresta primária · Pico Shennong · pântanos Dajiuhu", "睾丕亘丞 兀賵賱賷丞 路 賯賲丞 卮賳賳賵賳睾 路 兀乇丕囟 賵胤亘丞 丿丕噩賷賵賴賵"),
    season: phrase("Spring and autumn are comfortable; summer is cool; misty days need visibility checks.", "春秋舒适，夏季清凉，雨雾天需看能见度", "春秋舒適，夏季清涼，雨霧天需看能見度", "Primavera y otoño son cómodos; el verano es fresco; con niebla hay que revisar visibilidad.", "Primavera e outono são agradáveis; o verão é fresco; em neblina, confira a visibilidade.", "丕賱乇亘賷毓 賵丕賱禺乇賷賮 賲乇賷丨丕賳貙 丕賱氐賷賮 亘丕乇丿貙 賵賷噩亘 賮丨氐 丕賱乇丐賷丞 賮賷 丕賱囟亘丕亘"),
    pace: phrase("Half day to one day, planned around park transport and weather.", "半日到一日，按景区交通和天气安排", "半日到一日，按景區交通和天氣安排", "Medio día a un día, según transporte interno y clima.", "Meio dia a um dia, conforme transporte do parque e clima.", "賳氐賮 賷賵賲 廿賱賶 賷賵賲 賵丕丨丿貙 丨爻亘 賳賯賱 丕賱賲賳胤賯丞 賵丕賱胤賯爻"),
    people: phrase("Nature observers, photographers and mountain-ecology travelers.", "自然观察、摄影和山地生态爱好者", "自然觀察、攝影和山地生態愛好者", "Observadores de naturaleza, fotógrafos y viajeros de ecología de montaña.", "Observadores da natureza, fotógrafos e viajantes de ecologia de montanha.", "賲乇丕賯亘賵 丕賱胤亘賷毓丞 賵丕賱賲氐賵乇賵賳 賵賲丨亘賵 亘賷卅丞 丕賱噩亘丕賱"),
    keywords: phrase("Shennong Peak, Dajiuhu, snub-nosed monkeys, primeval forest", "神农顶 · 大九湖 · 金丝猴 · 原始林区", "神農頂 · 大九湖 · 金絲猴 · 原始林區", "Pico Shennong, Dajiuhu, monos dorados, bosque primario", "Pico Shennong, Dajiuhu, macacos dourados, floresta primária", "賯賲丞 卮賳賳賵賳睾貙 丿丕噩賷賵賴賵貙 賯乇賵丿 匕賴亘賷丞貙 睾丕亘丞 兀賵賱賷丞"),
    lead: phrase("Shennongjia Forest should show how mountain forest, rare wildlife and alpine wetlands form a protected ecosystem, not village streets.", "神农架森林要看山地森林、珍稀动植物和高山湿地如何组成保护地生态，不是村镇街道。", "神農架森林要看山地森林、珍稀動植物和高山濕地如何組成保護地生態，不是村鎮街道。", "Shennongjia debe mostrar bosque de montaña, fauna rara y humedales alpinos, no calles de pueblo.", "Shennongjia deve mostrar floresta de montanha, vida rara e pântanos alpinos, não ruas de vila.", "賷噩亘 兀賳 鬲馗賴乇 卮賳賳賵賳睾噩賷丕 睾丕亘丞 噩亘賱賷丞 賵丨賷丕丞 賳丕丿乇丞 賵兀乇丕囟 賵胤亘丞 噩亘賱賷丞貙 賱丕 卮賵丕乇毓 賯乇賶"),
    advice: sharedAdvice("nature"),
    guide: sharedGuide("nature")
  }
};

export function AttractionDetail({ province, attraction }: { province: Province; attraction: ProvinceRecommendation }) {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).destinations;
  const provinceLabel = getProvinceName(province.slug, lang);
  const itemCopy = getRecommendationCopy(lang, attraction);
  const enrichment = getRecommendationEnrichment(lang, attraction, province.name);
  const baseMeta = priorityDestinationMeta[attraction.name] ?? destinationMeta[attraction.name] ?? auditedDestinationMeta(attraction);
  const meta = reviewedDestinationMeta(attraction, baseMeta);
  const howToVisitLead = reviewedHowToVisitLead(attraction);
  const facts = [
    { icon: "leaf" as IconName, title: text.bestSeason, value: meta.season },
    { icon: "clock" as IconName, title: text.pace, value: meta.pace },
    { icon: "people" as IconName, title: text.goodFor, value: meta.people },
    { icon: "star" as IconName, title: text.keywords, value: meta.keywords }
  ];

  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-32 text-ink sm:px-8 lg:pt-36" dir={dir}>
        <article className="mx-auto max-w-7xl">
          <Link href={`/destinations/${province.slug}`} className="inline-flex items-center text-sm font-semibold text-moss">
            <span aria-hidden="true" className="mr-2">{"<-"}</span>
            {provinceLabel}
          </Link>

          <section className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3 text-gold">
                <span className="h-px w-7 bg-gold" />
                <p className="text-sm font-semibold tracking-[0.22em]">{l(lang, text.eyebrow)}</p>
              </div>
              <h1 className="mt-7 break-words font-serif text-5xl font-semibold leading-none [overflow-wrap:anywhere] sm:text-7xl lg:text-8xl">{itemCopy.name}</h1>
              <div className="mt-7 flex items-center gap-4 text-lg font-semibold text-moss">
                <span className="h-px w-10 bg-gold" />
                <span>{l(lang, meta.subtitle)}</span>
              </div>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">{enrichment.overview}</p>

              <div className="mt-9 grid overflow-hidden rounded-lg border hairline bg-white/82 shadow-card sm:grid-cols-2 xl:grid-cols-4">
                {facts.map((fact) => (
                  <div key={l(lang, fact.title)} className="min-h-[128px] border-b hairline p-5 sm:border-r xl:border-b-0">
                    <div className="flex items-center gap-3 text-moss">
                      <Icon name={fact.icon} />
                      <p className="font-semibold">{l(lang, fact.title)}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-mist">{l(lang, fact.value)}</p>
                  </div>
                ))}
              </div>
            </div>

            <figure className="overflow-hidden rounded-lg border hairline bg-white shadow-card">
              <div className="relative aspect-[16/10]">
                <DestinationPhoto caption={enrichment.caption} fallbackImage={enrichment.image} />
              </div>
              <figcaption className="flex gap-3 px-5 py-5 text-sm leading-6 text-mist">
                <span className="mt-0.5 text-moss"><Icon name="leaf" /></span>
                <span>
                  <strong className="block text-ink">{provinceLabel}</strong>
                  {enrichment.caption}
                </span>
              </figcaption>
            </figure>
          </section>

          <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.8fr]">
            <div className="rounded-lg border hairline bg-white/92 p-7 shadow-card sm:p-8">
              <div className="flex items-start gap-4">
                <span className="text-moss"><Icon name="star" /></span>
                <div>
                  <h2 className="font-serif text-3xl font-semibold">{l(lang, text.travelNotes)}</h2>
                  <p className="mt-2 text-base leading-7 text-mist">{l(lang, meta.lead)}</p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-4">
                {meta.advice.map((item) => (
                  <div key={l(lang, item.title)} className="border-t hairline pt-5 md:border-l md:border-t-0 md:pl-5">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-moss/10 text-moss">
                      <Icon name={item.icon} />
                    </div>
                    <h3 className="font-semibold text-ink">{l(lang, item.title)}</h3>
                    <p className="mt-3 text-sm leading-7 text-mist">{l(lang, item.body)}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border hairline bg-white/92 p-7 shadow-card sm:p-8">
              <div className="flex items-start gap-4">
                <span className="text-moss"><Icon name="people" /></span>
                <div>
                  <h2 className="font-serif text-3xl font-semibold">{l(lang, text.howToVisit)}</h2>
                  <p className="mt-2 text-base leading-7 text-mist">{l(lang, howToVisitLead)}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {meta.guide.map((item) => (
                  <div key={l(lang, item.title)} className="flex gap-4 rounded-lg border hairline p-4">
                    <span className="text-moss"><Icon name={item.icon} /></span>
                    <div>
                      <h3 className="font-semibold">{l(lang, item.title)}</h3>
                      <p className="mt-1 text-sm leading-6 text-mist">{l(lang, item.body)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">{t.plan}</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
