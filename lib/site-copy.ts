import type { Lang } from "@/components/LanguageProvider";

type SiteCopy = {
  nav: string[];
  tagline: string;
  plan: string;
  footer: string;
  email: string;
  whatsapp: string;
  home: {
    eyebrow: string;
    title: string;
    intro: string;
    explore: string;
    localLife: string;
    localLifeIntro: string;
    featured: string;
    viewAll: string;
  };
  experiences: {
    eyebrow: string;
    title: string;
    intro: string;
    view: string;
    duration: string;
    about: string;
    highlights: string;
    destination: string;
    plan: string;
    locations: string;
    chooseLocation: string;
    locationTitle: string;
    locationIntro: string;
  };
  destinations: {
    eyebrow: string;
    title: string;
    intro: string;
    back: string;
    destination: string;
    famous: string;
    related: string;
    discover: string;
    provinceCta: string;
    plan: string;
    attractionAbout: string;
    attractionIdeas: string[];
    recommendationEyebrow: string;
    recommendationIntro: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body1: string;
    body2: string;
    cta: string;
    pillars: [string, string][];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: [string, string][];
    consultTitle: string;
    consultBody: string;
    cta: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: [string, string][];
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    name: string;
    email: string;
    message: string;
    send: string;
    direct: string;
  };
  car: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    exterior: string;
    exteriorBody: string;
    cabin: string;
    cabinBody: string;
    ride: string;
    rideBody: string;
    mapTitle: string;
    mapBody: string;
    formTitle: string;
    days: string;
    destination: string;
    group: string;
    needs: string;
    options: string[];
    features: [string, string][];
  };
};

export const siteCopy: Record<Lang, SiteCopy> = {
  en: {
    nav: ["Experiences", "Private Car", "Local Life", "Destinations", "About Me", "Contact"],
    tagline: "Travel like a local",
    plan: "Plan My Journey",
    footer: "Local China. Real moments, thoughtful routes, private comfort.",
    email: "Email",
    whatsapp: "WhatsApp",
    home: { eyebrow: "Private journeys through real China", title: "Real China. Real moments.", intro: "A local guide with 40 years in China, creating calm private journeys through food, villages, culture and everyday life.", explore: "Explore experiences", localLife: "Ways into local life", localLifeIntro: "Each choice opens a real destination and a story worth staying for.", featured: "Featured experiences", viewAll: "View all experiences" },
    experiences: { eyebrow: "Local China experiences", title: "Choose a real moment in China.", intro: "Private experiences designed around local people, food, culture, villages and an unhurried pace.", view: "View experience", duration: "Duration", about: "About this experience", highlights: "What you will experience", destination: "Explore the destination", plan: "Plan this experience", locations: "selected locations", chooseLocation: "Choose a location", locationTitle: "Five places to experience it", locationIntro: "Open a location to see its specific project and local context." },
    destinations: { eyebrow: "Explore China by province", title: "Hover the map. Find your China.", intro: "Pause over any province to see its name, then open it for carefully matched places and experiences.", back: "Back to China map", destination: "China destination", famous: "Nine recommended places and experiences", related: "Experiences in this region", discover: "Discover more", provinceCta: "See the province with local context.", plan: "Start planning", attractionAbout: "About this place and experience", attractionIdeas: ["A locally paced visit", "Cultural and historical context", "Flexible private transport"], recommendationEyebrow: "Selected for this region", recommendationIntro: "Each recommendation pairs a real destination with an experience suited to its landscape, heritage and local life." },
    about: { eyebrow: "About your guide", title: "Forty years inside the rhythm of China.", body1: "I am a local guide who has lived in China for 40 years. I help foreign guests move beyond the surface and understand the people, customs and daily life behind each place.", body2: "The style is private, calm and personal: useful context, flexible pacing and practical support from arrival to departure.", cta: "Start a conversation", pillars: [["Local fluency", "Language, etiquette, history and the small human cues that make travel graceful."], ["Private pacing", "Days shaped around your energy, the weather and genuine curiosity."], ["Real access", "Neighborhoods, food, crafts, homes and cultural moments chosen for meaning."]] },
    services: { eyebrow: "China travel services", title: "Private journeys with cultural depth.", intro: "For couples, families, solo travelers and small groups who want China to feel elegant, understandable and alive.", groups: [["Bespoke itinerary design", "A route built around your dates, interests, hotels, food preferences and pace."], ["Cultural guiding", "Clear context for history, traditions, architecture, family life and modern China."], ["Premium logistics", "Support with drivers, trains, domestic flights, restaurants, local apps and changes on the road."], ["Hidden local experiences", "Tea, markets, craftspeople, countryside stays, neighborhood walks and local conversations."]], consultTitle: "Every journey begins with a personal consultation.", consultBody: "Tell me who is traveling, what you hope to feel and how you like to move. I will shape the route, rhythm, stays and experiences around you.", cta: "Request a private proposal" },
    faq: { eyebrow: "FAQ for foreign travelers", title: "Clear answers before China opens around you.", intro: "Practical notes for comfort, cultural understanding and fewer surprises on the ground.", items: [["Is China comfortable for first-time visitors?", "Yes. Private guidance makes language, payments, stations and local etiquette much easier."], ["Can the trip feel refined and still authentic?", "Yes. Thoughtful hotels and smooth logistics can sit alongside local restaurants, quiet streets and genuine cultural moments."], ["Do you work with families and older travelers?", "Yes. Walking distance, transport, meals and rest time are adjusted to your group."], ["Which parts of China can be included?", "Major cities and quieter regional routes can be combined according to season and trip length."], ["How early should I enquire?", "One to three months is ideal, with more time for public holidays and complex routes."]], cta: "Ask a private question" },
    contact: { eyebrow: "Contact", title: "Begin with the journey you imagine.", intro: "Share your dates, group size, destinations and the kind of China you hope to experience.", name: "Name", email: "Email", message: "Tell me about your ideal China journey", send: "Send enquiry", direct: "Prefer direct email?" },
    car: { eyebrow: "New-energy private car from Wuhan", title: "A quieter, more comfortable way to cross China.", intro: "A spacious new-energy private vehicle service from Wuhan to destinations across China, with flexible days, routes and stops.", cta: "Design my car journey", exterior: "A confident new-energy touring SUV", exteriorBody: "Generous luggage space, a calm cabin and long-distance comfort suit city arrivals, scenic drives and multi-day routes.", cabin: "A private cabin between places", cabinBody: "Comfortable seating, panoramic views and an intelligent cabin make the hours between destinations part of the journey.", ride: "Calm, considered travel", rideBody: "Door-to-door pickup, an experienced local driver, planned rest stops and room to change the day as you go.", mapTitle: "Wuhan to anywhere in China", mapBody: "Begin in central China and build a private route north, south, east or west.", formTitle: "Shape the service", days: "Travel days", destination: "Destinations", group: "Group size", needs: "Special requests", options: ["1 day", "2-3 days", "4-7 days", "8+ days"], features: [["Custom days", "Choose a single transfer, a scenic day or a multi-day journey."], ["Custom destinations", "Plan one city, several provinces or a route built around a theme."], ["Private groups", "Suitable for couples, families and small private groups."], ["Door-to-door support", "Airport, station, hotel and residential pickup with flexible stops."]] },
  },
  "zh-CN": {
    nav: ["体验", "私人用车", "本地生活", "目的地", "关于我", "联系"], tagline: "像本地人一样旅行", plan: "定制我的旅程", footer: "Local China。真实时刻，用心路线，舒适私享。", email: "邮箱", whatsapp: "WhatsApp",
    home: { eyebrow: "走进真实中国的私人旅行", title: "真实中国，真实时刻。", intro: "一位在中国生活40年的本地向导，为你设计从容、私密且深入日常生活的中国旅程。", explore: "探索体验", localLife: "走进本地生活", localLifeIntro: "每个选择都对应真实目的地，也通向一段值得停留的故事。", featured: "精选体验", viewAll: "查看全部体验" },
    experiences: { eyebrow: "Local China 本地体验", title: "在中国，选择一个真实时刻。", intro: "围绕当地人、饮食、文化、村落与从容节奏设计的私人体验。", view: "查看体验", duration: "时长", about: "体验介绍", highlights: "你将体验", destination: "深入了解目的地", plan: "定制这项体验", locations: "个精选地点", chooseLocation: "选择体验地点", locationTitle: "五个适合体验的主要地点", locationIntro: "展开地点可查看具体体验项目、当地特色与对应目的地。" },
    destinations: { eyebrow: "按省份探索中国", title: "停留在地图上，找到你的中国。", intro: "鼠标停留即可查看省份名称，点击进入当地匹配的推荐地点与体验项目。", back: "返回中国地图", destination: "中国目的地", famous: "九个推荐地点与体验项目", related: "当地可体验项目", discover: "查看详情", provinceCta: "用本地视角认识这里。", plan: "开始定制", attractionAbout: "地点与体验详情", attractionIdeas: ["按照你的节奏游览", "深入的历史文化讲解", "灵活的私人交通安排"], recommendationEyebrow: "为这一地区精选", recommendationIntro: "每个推荐都把真实地点与适合当地景观、文化遗产和生活方式的体验项目对应起来。" },
    about: { eyebrow: "关于你的向导", title: "在中国生活四十年，熟悉这里的真实节奏。", body1: "我是一名在中国生活40年的本地向导，帮助外国客人越过表面观光，理解每个地方背后的人、习俗与日常生活。", body2: "旅程私密、从容且个性化：需要时提供背景，想停留时放慢节奏，并从抵达到离开给予实际支持。", cta: "开始沟通", pillars: [["熟悉本地", "语言、礼仪、历史与细微的人情方式，让旅行更自然。"], ["私人节奏", "根据体力、天气、季节与兴趣安排每一天。"], ["真实进入", "社区、饮食、手艺、家庭与有意义的文化时刻。"]] },
    services: { eyebrow: "中国私人旅行服务", title: "有文化深度的私人旅程。", intro: "适合情侣、家庭、独自旅行者与小型团体，让中国之旅舒适、清晰且鲜活。", groups: [["专属行程设计", "围绕日期、兴趣、酒店、饮食偏好与节奏设计路线。"], ["文化向导", "讲清历史、传统、建筑、家庭生活与当代中国。"], ["高品质交通协调", "协助司机、高铁、国内航班、餐厅、本地应用与途中调整。"], ["隐藏的本地体验", "茶、市场、手艺人、乡村住宿、社区漫步与当地交流。"]], consultTitle: "每段旅程都从一次个人沟通开始。", consultBody: "告诉我同行者、期待的感受和旅行方式，我会据此设计路线、节奏、住宿和体验。", cta: "申请私人方案" },
    faq: { eyebrow: "外国旅行者常见问题", title: "出发前，把重要问题说清楚。", intro: "关于舒适度、文化理解与落地旅行的实用说明。", items: [["第一次来中国会方便吗？", "会。私人向导可帮助处理语言、支付、车站与本地礼仪。"], ["高品质旅行还能保持真实吗？", "可以。舒适酒店和顺畅交通可以与本地餐馆、安静街区和真实文化体验并存。"], ["可以接待家庭和年长旅行者吗？", "可以。步行距离、交通、餐食和休息时间都会按团队情况调整。"], ["可以去中国哪些地方？", "可根据季节和天数组合经典城市与更安静的区域路线。"], ["应该提前多久咨询？", "通常提前一至三个月较合适，节假日和复杂路线建议更早。"]], cta: "咨询私人问题" },
    contact: { eyebrow: "联系", title: "从你想象中的旅程开始。", intro: "告诉我日期、人数、目的地，以及你希望体验怎样的中国。", name: "姓名", email: "邮箱", message: "请描述你理想中的中国旅程", send: "发送咨询", direct: "也可以直接发邮件：" },
    car: { eyebrow: "武汉出发的新能源私人用车", title: "更安静、更舒适地驶向中国各地。", intro: "从武汉出发，按天数、目的地和停留节奏定制的新能源私人包车服务。", cta: "定制用车旅程", exterior: "适合长途旅行的新能源SUV", exteriorBody: "充裕行李空间、安静座舱与舒适乘坐感，适合城市接送、景观公路和多日线路。", cabin: "移动中的私人空间", cabinBody: "舒适座椅、开阔视野与智能座舱，让目的地之间的时间也成为旅程。", ride: "从容而周到的乘坐体验", rideBody: "点到点接送、本地司机、合理休息停靠，并可随时调整当天安排。", mapTitle: "从武汉出发，通达全国", mapBody: "以中国中部为起点，向东南西北自由组合私人路线。", formTitle: "定制服务方式", days: "用车天数", destination: "目的地", group: "同行人数", needs: "特殊需求", options: ["1天", "2-3天", "4-7天", "8天以上"], features: [["定制天数", "可安排单程接送、景观一日游或多日旅行。"], ["定制目的地", "可选择单个城市、跨省路线或主题旅程。"], ["多人包车", "适合情侣、家庭与小型私人团队。"], ["点到点服务", "机场、车站、酒店和住址接送，沿途灵活停靠。"]] },
  },
  "zh-TW": {} as SiteCopy,
  es: {} as SiteCopy,
  pt: {} as SiteCopy,
  ar: {} as SiteCopy,
};

siteCopy["zh-TW"] = {
  ...siteCopy["zh-CN"],
  nav: ["體驗", "私人用車", "在地生活", "目的地", "關於我", "聯絡"],
  tagline: "像在地人一樣旅行",
  plan: "訂製我的旅程",
  home: { ...siteCopy["zh-CN"].home, eyebrow: "走進真實中國的私人旅行", title: "真實中國，真實時刻。", explore: "探索體驗", localLife: "走進在地生活", featured: "精選體驗", viewAll: "查看全部體驗" },
  experiences: { ...siteCopy["zh-CN"].experiences, title: "在中國，選擇一個真實時刻。", view: "查看體驗", duration: "時長", about: "體驗介紹", plan: "訂製這項體驗", locations: "個精選地點", chooseLocation: "選擇體驗地點", locationTitle: "五個適合體驗的主要地點", locationIntro: "展開地點可查看具體體驗項目、當地特色與對應目的地。" },
  destinations: { ...siteCopy["zh-CN"].destinations, title: "停留在地圖上，找到你的中國。", intro: "滑鼠停留即可查看省份名稱，點擊進入當地匹配的推薦地點與體驗項目。", back: "返回中國地圖", famous: "九個推薦地點與體驗項目", related: "當地可體驗項目", discover: "查看詳情", attractionAbout: "地點與體驗詳情", recommendationEyebrow: "為這一地區精選", recommendationIntro: "每個推薦都把真實地點與適合當地景觀、文化遺產和生活方式的體驗項目對應起來。" },
  contact: { ...siteCopy["zh-CN"].contact, eyebrow: "聯絡", title: "從你想像中的旅程開始。", name: "姓名", email: "電子郵件", send: "發送諮詢" },
  about: { eyebrow: "關於你的嚮導", title: "在中國生活四十年，熟悉這裡的真實節奏。", body1: "我是一名在中國生活40年的在地嚮導，協助外國旅客理解每個地方背後的人、習俗與日常生活。", body2: "旅程私密、從容且個人化，包含清楚的文化背景、彈性節奏與實際協助。", cta: "開始溝通", pillars: [["熟悉在地", "語言、禮儀、歷史與細微的人情方式。"], ["私人節奏", "依照體力、天氣、季節與興趣安排每一天。"], ["真實進入", "社區、飲食、手藝、家庭與文化時刻。"]] },
  services: { eyebrow: "中國私人旅行服務", title: "有文化深度的私人旅程。", intro: "適合情侶、家庭、獨自旅行者與小型團體。", groups: [["專屬行程設計", "依照日期、興趣、飯店、飲食偏好與節奏設計路線。"], ["文化嚮導", "說明歷史、傳統、建築、家庭生活與當代中國。"], ["高品質交通協調", "協助司機、高鐵、航班、餐廳與途中調整。"], ["隱藏的在地體驗", "茶、市場、手藝人、鄉村住宿與社區漫步。"]], consultTitle: "每段旅程都從一次個人溝通開始。", consultBody: "告訴我同行者、期待與旅行方式，我會設計路線、節奏、住宿和體驗。", cta: "申請私人方案" },
  faq: { eyebrow: "外國旅客常見問題", title: "出發前，把重要問題說清楚。", intro: "關於舒適度、文化理解與落地旅行的實用說明。", items: [["第一次來中國方便嗎？", "私人嚮導可協助語言、支付、車站與在地禮儀。"], ["高品質旅行也能保持真實嗎？", "可以，舒適住宿能與在地餐館和真實文化體驗並存。"], ["可以接待家庭與年長旅客嗎？", "可以，步行、交通、餐食與休息都會調整。"], ["可以去哪些地方？", "可依季節和天數組合經典城市與區域路線。"], ["應該提前多久詢問？", "通常提前一至三個月較合適。"]], cta: "詢問私人問題" },
  car: { ...siteCopy["zh-CN"].car, eyebrow: "武漢出發的新能源私人用車", title: "更安靜、更舒適地駛向中國各地。", intro: "從武漢出發，依天數、目的地和停留節奏訂製新能源私人包車服務。", cta: "訂製用車旅程", exterior: "適合長途旅行的新能源 SUV", exteriorBody: "充裕行李空間、安靜座艙與舒適乘坐感，適合城市接送和多日路線。", cabin: "移動中的私人空間", cabinBody: "舒適座椅、開闊視野與智慧座艙，讓途中時間也成為旅程。", ride: "從容而周到的乘坐體驗", rideBody: "點到點接送、本地司機、合理休息停靠，並可彈性調整。", mapTitle: "從武漢出發，通達全國", formTitle: "訂製服務方式", days: "用車天數", destination: "目的地", group: "同行人數", needs: "特殊需求", options: ["1天", "2-3天", "4-7天", "8天以上"], features: [["訂製天數", "單程接送、一日遊或多日旅行。"], ["訂製目的地", "單一城市、跨省或主題路線。"], ["多人包車", "適合情侶、家庭與小型團體。"], ["點到點服務", "機場、車站、飯店接送與彈性停靠。"]] },
};

siteCopy.es = {
  ...siteCopy.en,
  nav: ["Experiencias", "Auto privado", "Vida local", "Destinos", "Sobre mí", "Contacto"], tagline: "Viaja como una persona local", plan: "Diseñar mi viaje", footer: "China local. Momentos reales, rutas cuidadas y comodidad privada.", email: "Correo", whatsapp: "WhatsApp",
  home: { eyebrow: "Viajes privados por la China real", title: "China real. Momentos reales.", intro: "Un guía local con 40 años en China crea viajes tranquilos y privados por su comida, pueblos, cultura y vida cotidiana.", explore: "Explorar experiencias", localLife: "Formas de entrar en la vida local", localLifeIntro: "Cada opción abre un destino real y una historia que merece tiempo.", featured: "Experiencias destacadas", viewAll: "Ver todas" },
  experiences: { eyebrow: "Experiencias de China local", title: "Elige un momento real en China.", intro: "Experiencias privadas en torno a personas, comida, cultura, pueblos y un ritmo sin prisas.", view: "Ver experiencia", duration: "Duración", about: "Sobre esta experiencia", highlights: "Qué vivirás", destination: "Explorar el destino", plan: "Diseñar esta experiencia", locations: "lugares seleccionados", chooseLocation: "Elige un lugar", locationTitle: "Cinco lugares para vivirlo", locationIntro: "Abre un lugar para ver su proyecto específico y contexto local." },
  destinations: { ...siteCopy.en.destinations, eyebrow: "Explora China por provincia", title: "Pasa sobre el mapa. Encuentra tu China.", intro: "Detén el cursor para ver cada provincia y abre nueve lugares con experiencias relacionadas.", back: "Volver al mapa", famous: "Nueve lugares y experiencias recomendados", related: "Experiencias de la región", discover: "Ver detalles", provinceCta: "Descubre la provincia con contexto local.", plan: "Empezar a planear", attractionAbout: "Detalles del lugar y la experiencia", attractionIdeas: ["Visita a tu propio ritmo", "Contexto histórico y cultural", "Transporte privado flexible"], recommendationEyebrow: "Seleccionado para esta región", recommendationIntro: "Cada recomendación combina un destino real con una experiencia apropiada para su paisaje, patrimonio y vida local." },
  about: { eyebrow: "Sobre tu guía", title: "Cuarenta años dentro del ritmo de China.", body1: "Soy un guía local que ha vivido 40 años en China y ayudo a comprender las personas, costumbres y vida cotidiana detrás de cada lugar.", body2: "El estilo es privado, tranquilo y personal, con contexto útil, ritmo flexible y apoyo práctico.", cta: "Iniciar una conversación", pillars: [["Fluidez local", "Idioma, etiqueta, historia y pequeños códigos humanos."], ["Ritmo privado", "Días adaptados a tu energía, clima e intereses."], ["Acceso real", "Barrios, comida, artesanía, hogares y cultura con sentido."]] },
  services: { eyebrow: "Servicios de viaje en China", title: "Viajes privados con profundidad cultural.", intro: "Para parejas, familias, viajeros solos y grupos pequeños.", groups: [["Itinerario a medida", "Ruta según fechas, intereses, hoteles, comida y ritmo."], ["Guía cultural", "Historia, tradiciones, arquitectura, familias y China moderna."], ["Logística de calidad", "Conductores, trenes, vuelos, restaurantes y ajustes en ruta."], ["Experiencias locales", "Té, mercados, artesanos, campo y paseos por barrios."]], consultTitle: "Cada viaje empieza con una conversación personal.", consultBody: "Cuéntame quién viaja y cómo quieres moverte; diseñaré ruta, ritmo, estancias y experiencias.", cta: "Solicitar una propuesta" },
  faq: { eyebrow: "Preguntas frecuentes", title: "Respuestas claras antes de viajar a China.", intro: "Notas prácticas para viajar con comodidad y comprensión cultural.", items: [["¿China es cómoda para una primera visita?", "Sí. La guía privada facilita idioma, pagos, estaciones y etiqueta local."], ["¿Puede ser refinado y auténtico?", "Sí. Buenos hoteles pueden convivir con restaurantes locales y momentos reales."], ["¿Trabajas con familias y mayores?", "Sí. Ajustamos caminatas, transporte, comidas y descansos."], ["¿Qué regiones se pueden incluir?", "Ciudades clásicas y rutas tranquilas según temporada y duración."], ["¿Con cuánta antelación?", "Lo ideal es consultar entre uno y tres meses antes."]], cta: "Hacer una pregunta" },
  contact: { eyebrow: "Contacto", title: "Empieza con el viaje que imaginas.", intro: "Comparte fechas, tamaño del grupo, destinos y la China que deseas conocer.", name: "Nombre", email: "Correo", message: "Cuéntame tu viaje ideal por China", send: "Enviar consulta", direct: "¿Prefieres correo directo?" },
  car: { ...siteCopy.en.car, eyebrow: "Vehículo privado de nueva energía desde Wuhan", title: "Una forma más silenciosa y cómoda de recorrer China.", intro: "Servicio privado de nueva energía desde Wuhan hacia toda China, con días, rutas y paradas flexibles.", cta: "Diseñar viaje en auto", exterior:"SUV de nueva energía para largas distancias", exteriorBody:"Espacio para equipaje, cabina silenciosa y comodidad para rutas de varios días.", cabin:"Un espacio privado en movimiento", cabinBody:"Asientos cómodos, buenas vistas y cabina inteligente.", ride:"Un viaje tranquilo y cuidado", rideBody:"Recogida puerta a puerta, conductor local y paradas flexibles.", mapTitle: "De Wuhan a cualquier lugar de China", mapBody: "Comienza en el centro de China y construye tu ruta privada.", formTitle: "Configura el servicio", days: "Días de viaje", destination: "Destinos", group: "Personas", needs: "Solicitudes especiales", options: ["1 día", "2-3 días", "4-7 días", "8+ días"], features:[["Días a medida","Traslado, excursión o ruta de varios días."],["Destinos a medida","Una ciudad, varias provincias o una ruta temática."],["Grupos privados","Para parejas, familias y grupos pequeños."],["Puerta a puerta","Aeropuerto, estación, hotel y paradas flexibles."]] },
};

siteCopy.pt = {
  ...siteCopy.es,
  nav: ["Experiências", "Carro privado", "Vida local", "Destinos", "Sobre mim", "Contato"], tagline: "Viaje como uma pessoa local", plan: "Criar minha viagem", footer: "China local. Momentos reais, rotas cuidadosas e conforto privado.", email: "E-mail",
  home: { ...siteCopy.es.home, eyebrow: "Viagens privadas pela China real", title: "China real. Momentos reais.", intro: "Um guia local com 40 anos na China cria viagens tranquilas e privadas por comida, vilas, cultura e vida cotidiana.", explore: "Explorar experiências", localLife: "Caminhos para a vida local", localLifeIntro: "Cada escolha abre um destino real e uma história que merece tempo.", featured: "Experiências em destaque", viewAll: "Ver todas" },
  experiences: { ...siteCopy.es.experiences, eyebrow: "Experiências da China local", title: "Escolha um momento real na China.", intro: "Experiências privadas com pessoas, comida, cultura, vilas e um ritmo sem pressa.", view: "Ver experiência", duration: "Duração", about: "Sobre a experiência", highlights: "O que você viverá", destination: "Explorar o destino", plan: "Planejar esta experiência", locations: "locais selecionados", chooseLocation: "Escolha um local", locationTitle: "Cinco lugares para viver a experiência", locationIntro: "Abra um local para ver seu projeto e contexto específico." },
  destinations: { ...siteCopy.es.destinations, eyebrow: "Explore a China por província", title: "Passe sobre o mapa. Encontre sua China.", intro: "Pare o cursor para ver cada província e abra nove lugares com experiências relacionadas.", back: "Voltar ao mapa", famous: "Nove lugares e experiências recomendados", related: "Experiências da região", discover: "Ver detalhes", plan: "Começar a planejar", attractionAbout: "Detalhes do lugar e da experiência", recommendationEyebrow: "Selecionado para esta região", recommendationIntro: "Cada recomendação combina um destino real com uma experiência adequada à paisagem, ao patrimônio e à vida local." },
  about: { eyebrow:"Sobre seu guia",title:"Quarenta anos dentro do ritmo da China.",body1:"Sou um guia local que vive na China há 40 anos e ajudo visitantes a compreender pessoas, costumes e vida cotidiana.",body2:"O estilo é privado, tranquilo e pessoal, com contexto, ritmo flexível e apoio prático.",cta:"Iniciar uma conversa",pillars:[["Fluência local","Idioma, etiqueta, história e pequenos códigos humanos."],["Ritmo privado","Dias adaptados à energia, clima e interesses."],["Acesso real","Bairros, comida, artesanato, casas e cultura com significado."]] },
  services: { eyebrow:"Serviços de viagem na China",title:"Viagens privadas com profundidade cultural.",intro:"Para casais, famílias, viajantes solo e pequenos grupos.",groups:[["Roteiro personalizado","Datas, interesses, hotéis, comida e ritmo."],["Guia cultural","História, tradições, arquitetura e China moderna."],["Logística premium","Motoristas, trens, voos, restaurantes e ajustes."],["Experiências locais","Chá, mercados, artesãos, campo e bairros."]],consultTitle:"Cada viagem começa com uma conversa pessoal.",consultBody:"Conte quem viaja e como prefere se mover; criarei rota, ritmo e experiências.",cta:"Solicitar proposta" },
  faq: { eyebrow:"Perguntas frequentes",title:"Respostas claras antes de viajar.",intro:"Notas práticas para conforto e compreensão cultural.",items:[["A China é confortável para a primeira visita?","Sim. O guia privado ajuda com idioma, pagamentos, estações e etiqueta."],["Pode ser sofisticado e autêntico?","Sim. Bons hotéis combinam com restaurantes locais e momentos reais."],["Atende famílias e idosos?","Sim. Ajustamos caminhada, transporte, refeições e descanso."],["Quais regiões podem entrar?","Cidades clássicas e rotas tranquilas conforme época e duração."],["Quando consultar?","O ideal é um a três meses antes."]],cta:"Fazer uma pergunta" },
  contact: { eyebrow: "Contato", title: "Comece pela viagem que você imagina.", intro: "Compartilhe datas, tamanho do grupo, destinos e a China que deseja conhecer.", name: "Nome", email: "E-mail", message: "Conte como seria sua viagem ideal pela China", send: "Enviar consulta", direct: "Prefere e-mail direto?" },
  car: { ...siteCopy.es.car, eyebrow: "Veículo privado de nova energia saindo de Wuhan", title: "Uma forma mais silenciosa e confortável de cruzar a China.", intro: "Serviço privado de nova energia de Wuhan para toda a China, com dias, rotas e paradas flexíveis.", cta: "Criar viagem de carro", exterior:"SUV de nova energia para longas distâncias",exteriorBody:"Espaço de bagagem, cabine silenciosa e conforto para vários dias.",cabin:"Espaço privado em movimento",cabinBody:"Assentos confortáveis, boa visão e cabine inteligente.",ride:"Viagem tranquila e cuidadosa",rideBody:"Porta a porta, motorista local e paradas flexíveis.", mapTitle: "De Wuhan para qualquer lugar da China", formTitle: "Personalize o serviço", days: "Dias de viagem", destination: "Destinos", group: "Pessoas", needs: "Pedidos especiais", options: ["1 dia", "2-3 dias", "4-7 dias", "8+ dias"],features:[["Dias personalizados","Traslado, passeio ou viagem de vários dias."],["Destinos personalizados","Uma cidade, províncias ou tema."],["Grupos privados","Casais, famílias e pequenos grupos."],["Porta a porta","Aeroporto, estação, hotel e paradas."]] },
};

siteCopy.ar = {
  ...siteCopy.en,
  nav: ["التجارب", "سيارة خاصة", "الحياة المحلية", "الوجهات", "عني", "اتصل بنا"], tagline: "سافر مثل السكان المحليين", plan: "خطط لرحلتي", footer: "الصين المحلية: لحظات حقيقية وطرق مدروسة وراحة خاصة.", email: "البريد الإلكتروني", whatsapp: "واتساب",
  home: { eyebrow: "رحلات خاصة في الصين الحقيقية", title: "الصين الحقيقية. لحظات حقيقية.", intro: "دليل محلي عاش في الصين 40 عاماً يصمم رحلات خاصة وهادئة عبر الطعام والقرى والثقافة والحياة اليومية.", explore: "استكشف التجارب", localLife: "طرق إلى الحياة المحلية", localLifeIntro: "كل اختيار يفتح وجهة حقيقية وقصة تستحق الوقت.", featured: "تجارب مختارة", viewAll: "عرض جميع التجارب" },
  experiences: { eyebrow: "تجارب الصين المحلية", title: "اختر لحظة حقيقية في الصين.", intro: "تجارب خاصة حول الناس والطعام والثقافة والقرى وبإيقاع هادئ.", view: "عرض التجربة", duration: "المدة", about: "عن هذه التجربة", highlights: "ما ستعيشه", destination: "استكشف الوجهة", plan: "خطط لهذه التجربة", locations: "مواقع مختارة", chooseLocation: "اختر موقعًا", locationTitle: "خمسة أماكن لخوض التجربة", locationIntro: "افتح الموقع لعرض برنامجه المحدد وسياقه المحلي." },
  destinations: { ...siteCopy.en.destinations, eyebrow: "استكشف الصين حسب المقاطعة", title: "مرر فوق الخريطة واعثر على صينك.", intro: "توقف فوق أي مقاطعة ثم افتح تسعة أماكن مع تجارب مرتبطة بها.", back: "العودة إلى الخريطة", famous: "تسعة أماكن وتجارب موصى بها", related: "تجارب في المنطقة", discover: "عرض التفاصيل", provinceCta: "شاهد المقاطعة بمنظور محلي.", plan: "ابدأ التخطيط", attractionAbout: "تفاصيل المكان والتجربة", attractionIdeas: ["زيارة بإيقاع مريح", "سياق تاريخي وثقافي", "نقل خاص مرن"], recommendationEyebrow: "مختار لهذه المنطقة", recommendationIntro: "تجمع كل توصية بين وجهة حقيقية وتجربة تناسب طبيعتها وتراثها وحياتها المحلية." },
  about: { eyebrow:"عن دليلك",title:"أربعون عاماً داخل إيقاع الصين.",body1:"أنا دليل محلي عشت في الصين 40 عاماً وأساعد الضيوف على فهم الناس والعادات والحياة اليومية.",body2:"الأسلوب خاص وهادئ وشخصي مع شرح مفيد وإيقاع مرن ودعم عملي.",cta:"ابدأ المحادثة",pillars:[["معرفة محلية","اللغة والعادات والتاريخ والتفاصيل الإنسانية."],["إيقاع خاص","أيام تناسب الطاقة والطقس والاهتمامات."],["وصول حقيقي","أحياء وطعام وحرف ومنازل وثقافة ذات معنى."]] },
  services: { eyebrow:"خدمات السفر في الصين",title:"رحلات خاصة بعمق ثقافي.",intro:"للأزواج والعائلات والمسافرين المنفردين والمجموعات الصغيرة.",groups:[["مسار مخصص","حسب التواريخ والاهتمامات والفنادق والطعام."],["إرشاد ثقافي","التاريخ والتقاليد والعمارة والصين الحديثة."],["تنظيم متميز","السائقون والقطارات والرحلات والمطاعم."],["تجارب محلية","الشاي والأسواق والحرف والريف والأحياء."]],consultTitle:"كل رحلة تبدأ بمحادثة شخصية.",consultBody:"أخبرني بمن يسافر وطريقة الحركة وسأصمم المسار والإيقاع والتجارب.",cta:"اطلب مقترحاً خاصاً" },
  faq: { eyebrow:"أسئلة المسافرين",title:"إجابات واضحة قبل السفر إلى الصين.",intro:"ملاحظات عملية للراحة والفهم الثقافي.",items:[["هل الصين مريحة للزيارة الأولى؟","نعم، ويساعد الدليل الخاص في اللغة والدفع والمحطات والعادات."],["هل يمكن الجمع بين الجودة والأصالة؟","نعم، مع فنادق مريحة ومطاعم محلية وتجارب حقيقية."],["هل تناسب العائلات وكبار السن؟","نعم، نعدل المشي والنقل والوجبات والراحة."],["ما المناطق الممكنة؟","مدن شهيرة ومسارات هادئة حسب الموسم والمدة."],["متى يجب الاستفسار؟","يفضل قبل شهر إلى ثلاثة أشهر."]],cta:"اسأل سؤالاً خاصاً" },
  contact: { eyebrow: "اتصل بنا", title: "ابدأ بالرحلة التي تتخيلها.", intro: "شارك تواريخك وعدد المسافرين والوجهات ونوع الصين التي تريد تجربتها.", name: "الاسم", email: "البريد الإلكتروني", message: "أخبرني عن رحلتك المثالية في الصين", send: "إرسال الطلب", direct: "تفضل البريد المباشر؟" },
  car: { ...siteCopy.en.car, eyebrow:"سيارة خاصة بالطاقة الجديدة من ووهان",title:"طريقة أكثر هدوءاً وراحة للسفر عبر الصين.",intro:"خدمة سيارة خاصة بالطاقة الجديدة من ووهان إلى أنحاء الصين بأيام ومسارات مرنة.",cta:"صمم رحلة السيارة",exterior:"سيارة طاقة جديدة للطرق الطويلة",exteriorBody:"مساحة أمتعة ومقصورة هادئة وراحة لرحلات متعددة الأيام.",cabin:"مساحة خاصة أثناء الحركة",cabinBody:"مقاعد مريحة ورؤية واسعة ومقصورة ذكية.",ride:"سفر هادئ ومدروس",rideBody:"من الباب إلى الباب مع سائق محلي وتوقفات مرنة.",mapTitle:"من ووهان إلى أي مكان في الصين",mapBody:"ابدأ من وسط الصين وابن مسارك الخاص.",formTitle:"خصص الخدمة",days:"أيام السفر",destination:"الوجهات",group:"عدد المسافرين",needs:"طلبات خاصة",options:["يوم واحد","2-3 أيام","4-7 أيام","8 أيام أو أكثر"],features:[["أيام مخصصة","نقل أو جولة أو رحلة متعددة الأيام."],["وجهات مخصصة","مدينة أو مقاطعات أو موضوع."],["مجموعات خاصة","للأزواج والعائلات والمجموعات الصغيرة."],["من الباب إلى الباب","المطار والمحطة والفندق وتوقفات مرنة."]] },
};

export function getSiteCopy(lang: Lang) {
  return siteCopy[lang] ?? siteCopy.en;
}
