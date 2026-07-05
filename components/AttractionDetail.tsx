"use client";

import Link from "next/link";
import { DestinationPhoto } from "@/components/DestinationPhoto";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { getRecommendationEnrichment } from "@/lib/content-enrichment";
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
    "zh-CN": "根据您的需求，选择合适的陪同与服务方式。",
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
    lead: phrase("Let the landscape set the rhythm instead of rushing between viewpoints.", "让山水本身决定节奏，不为赶景点错过真正舒适的观看方式。", "讓山水本身決定節奏，不為趕景點錯過真正舒適的觀看方式。", "Deja que el paisaje marque el ritmo, sin correr entre miradores.", "Deixe a paisagem definir o ritmo, sem correr entre mirantes.", "دع المشهد يحدد الإيقاع بدلا من الإسراع بين النقاط."),
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
    { icon: "shoe" as IconName, title: simplePhrase("Walk and observe", "步行与观察结合", "步行與觀察結合"), body: simplePhrase("Keep the route comfortable, with pauses for details and local scenes.", "路线不赶，给细节、街巷和本地生活留出停留时间。", "路線不趕，給細節、街巷和在地生活留出停留時間。") },
    { icon: "mountain" as IconName, title: simplePhrase("Understand the setting", "理解现场背景", "理解現場背景"), body: simplePhrase("Connect scenery, history, daily life and local habits instead of only taking photos.", "把风景、历史、日常生活和当地习惯联系起来，不只是拍照打卡。", "把風景、歷史、日常生活和當地習慣聯繫起來，不只是拍照打卡。") },
    { icon: "hat" as IconName, title: simplePhrase("Stay flexible", "保持从容", "保持從容"), body: simplePhrase("Leave space for weather, energy and small discoveries along the way.", "给天气、体力和路上的小发现留出调整空间。", "給天氣、體力和路上的小發現留出調整空間。") }
  ];
}

function sharedGuide(kind: RecommendationKind) {
  const routeTitle = kind === "road" ? ["Private route", "私人路线", "私人路線"] : ["Route by rhythm", "按节奏游览", "按節奏遊覽"];
  return [
    { icon: "route" as IconName, title: simplePhrase(routeTitle[0], routeTitle[1], routeTitle[2]), body: simplePhrase("Plan the order around season, distance, light and the group's energy.", "根据季节、距离、光线和团队体力安排顺序。", "根據季節、距離、光線和團隊體力安排順序。") },
    { icon: "book" as IconName, title: simplePhrase("Local interpretation", "在地文化讲解", "在地文化講解"), body: simplePhrase("Use stories, maps and details to explain why the place matters.", "通过故事、地图和细节说明这个地点为什么重要。", "通過故事、地圖和細節說明這個地點為什麼重要。") },
    { icon: "car" as IconName, title: simplePhrase("Flexible transport", "灵活交通安排", "靈活交通安排"), body: simplePhrase("Add private transfers when entrances, viewpoints or villages are far apart.", "入口、观景点或村镇分散时，可安排包车或接驳。", "入口、觀景點或村鎮分散時，可安排包車或接駁。") }
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

function destinationPhrase(en: string, zhCN: string): Phrase {
  return {
    en,
    "zh-CN": zhCN,
    "zh-TW": zhCN,
    es: en,
    pt: en,
    ar: en
  };
}

function destinationFocusMeta(attraction: ProvinceRecommendation, base: (typeof kindMeta)[RecommendationKind]) {
  return {
    ...base,
    subtitle: destinationPhrase(attraction.focus, attraction.focusZh),
    keywords: destinationPhrase(attraction.focus, attraction.focusZh),
    lead: destinationPhrase(
      `Start from ${attraction.name}'s own setting: ${attraction.focus}. The visit should explain this place directly, not reuse a generic attraction story.`,
      `先围绕${attraction.nameZh}本身的${attraction.focusZh}来理解。页面介绍、游览建议和导览节奏都要扣住这个地点，不套用泛泛的景点文案。`
    )
  };
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

const destinationMeta: Record<string, { subtitle: Phrase; season: Phrase; pace: Phrase; people: Phrase; keywords: Phrase; lead: Phrase; advice: Array<{ icon: IconName; title: Phrase; body: Phrase }>; guide: Array<{ icon: IconName; title: Phrase; body: Phrase }> }> = {
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

export function AttractionDetail({ province, attraction }: { province: Province; attraction: ProvinceRecommendation }) {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).destinations;
  const provinceLabel = getProvinceName(province.slug, lang);
  const itemCopy = getRecommendationCopy(lang, attraction);
  const enrichment = getRecommendationEnrichment(lang, attraction, province.name);
  const meta = destinationMeta[attraction.name] ?? destinationFocusMeta(attraction, kindMeta[attraction.kind]);
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
              <h1 className="mt-7 font-serif text-5xl font-semibold leading-none sm:text-7xl lg:text-8xl">{itemCopy.name}</h1>
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
                  <p className="mt-2 text-base leading-7 text-mist">{l(lang, text.howToVisitLead)}</p>
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
