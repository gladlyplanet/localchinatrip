import type { Lang } from "@/components/LanguageProvider";
import { toTraditionalChinese } from "@/lib/chinese-text";

type BaseLang = Exclude<Lang, "zh-TW">;

export type PlanText = Record<BaseLang, string>;

export type FeaturedPlan = {
  id: "china-culture-7" | "sanya-wellness-14";
  kind: "journey" | "wellness";
  duration: number;
  nights: number;
  heroImage: string;
  gallery: { src: string; alt: PlanText }[];
  eyebrow: PlanText;
  title: PlanText;
  cardTitle: PlanText;
  summary: PlanText;
  route: PlanText;
  idealFor: PlanText;
  season: PlanText;
  pace: PlanText;
  intro: PlanText[];
  timeline: {
    days: string;
    place: PlanText;
    title: PlanText;
    body: PlanText;
  }[];
  choices: {
    title: PlanText;
    intro: PlanText;
    options: { title: PlanText; body: PlanText }[];
  }[];
  included: PlanText[];
  excluded: PlanText[];
  practical: PlanText[];
  disclaimer?: PlanText;
};

const text = (en: string, zhCN: string, es: string, pt: string, ar: string): PlanText => ({ en, "zh-CN": zhCN, es, pt, ar });

export function getPlanText(value: PlanText, lang: Lang) {
  if (lang === "zh-TW") return toTraditionalChinese(value["zh-CN"]);
  return value[lang];
}

const image = (name: string) => `/images/travel-planning/featured/${name}`;

export const featuredPlans: FeaturedPlan[] = [
  {
    id: "china-culture-7",
    kind: "journey",
    duration: 7,
    nights: 6,
    heroImage: image("culture-great-wall.jpg"),
    gallery: [
      { src: image("culture-suzhou-garden.jpg"), alt: text("Classical garden in Suzhou", "苏州古典园林", "Jardín clásico de Suzhou", "Jardim clássico de Suzhou", "حديقة سوتشو الكلاسيكية") },
      { src: image("culture-tea-garden.jpg"), alt: text("Tea garden near Suzhou", "苏州周边茶园", "Jardín de té cerca de Suzhou", "Jardim de chá perto de Suzhou", "مزرعة شاي قرب سوتشو") },
      { src: image("culture-shanghai-skyline.jpg"), alt: text("Shanghai skyline", "上海陆家嘴天际线", "Horizonte de Shanghái", "Horizonte de Xangai", "أفق شنغهاي") }
    ],
    eyebrow: text("FEATURED CULTURAL JOURNEY", "精选文化路线", "VIAJE CULTURAL DESTACADO", "ROTEIRO CULTURAL EM DESTAQUE", "رحلة ثقافية مختارة"),
    title: text("Seven days through China's cultural thread", "7天6晚：中国文化体验之旅", "Siete días por el hilo cultural de China", "Sete dias pelo fio cultural da China", "سبعة أيام عبر النسيج الثقافي للصين"),
    cardTitle: text("Beijing, Suzhou and Shanghai in 7 days", "北京、苏州与上海7天文化之旅", "Pekín, Suzhou y Shanghái en 7 días", "Pequim, Suzhou e Xangai em 7 dias", "بكين وسوتشو وشنغهاي في 7 أيام"),
    summary: text(
      "Move from imperial history and Beijing neighborhood life to Suzhou gardens and living crafts, then finish with Shanghai's contemporary skyline and technology.",
      "从北京的皇家历史与胡同日常，进入苏州园林和仍在延续的江南手艺，最后抵达上海的现代科技与城市天际线。",
      "Del pasado imperial y la vida de barrio de Pekín a los jardines y oficios vivos de Suzhou, para terminar en la tecnología y el horizonte contemporáneo de Shanghái.",
      "Da história imperial e da vida de bairro de Pequim aos jardins e ofícios vivos de Suzhou, terminando na tecnologia e no horizonte contemporâneo de Xangai.",
      "من التاريخ الإمبراطوري والحياة اليومية في بكين إلى حدائق سوتشو وحرفها الحية، ثم ختام مع شنغهاي المعاصرة وتقنياتها."
    ),
    route: text("Beijing → Suzhou → Dongshan or Yixing → Shanghai", "北京 → 苏州 → 东山或宜兴 → 上海", "Pekín → Suzhou → Dongshan o Yixing → Shanghái", "Pequim → Suzhou → Dongshan ou Yixing → Xangai", "بكين ← سوتشو ← دونغشان أو ييشينغ ← شنغهاي"),
    idealFor: text("First-time visitors who want history, craft, food and modern China in one coherent route", "希望一次理解中国历史、手艺、饮食与现代城市的首次访华游客", "Primer viaje con interés en historia, artesanía, gastronomía y China contemporánea", "Primeira viagem com interesse em história, artesanato, gastronomia e China contemporânea", "للزيارة الأولى مع اهتمام بالتاريخ والحرف والطعام والصين المعاصرة"),
    season: text("Spring and autumn; the tea branch is strongest in spring", "春秋舒适；茶文化分支以春季体验最佳", "Primavera y otoño; la opción del té destaca en primavera", "Primavera e outono; a opção do chá é melhor na primavera", "الربيع والخريف، ويكون مسار الشاي أفضل في الربيع"),
    pace: text("Balanced, with two nights in each main city", "节奏适中，北京、苏州、上海各住2晚", "Equilibrado, con dos noches en cada ciudad principal", "Equilibrado, com duas noites em cada cidade principal", "متوازن مع ليلتين في كل مدينة رئيسية"),
    intro: [
      text("This route is designed as a cultural progression rather than a checklist of famous sights.", "这条路线不是把著名景点排成清单，而是按照中国文化的脉络逐步展开。", "La ruta avanza como una historia cultural, no como una lista de monumentos.", "O roteiro avança como uma narrativa cultural, não como uma lista de atrações.", "صُمم المسار كتدرج ثقافي لا كقائمة من المعالم."),
      text("The morning choices and the Dongshan/Yixing branch let the same seven days reflect different interests without breaking the travel rhythm.", "北京代表性历史体验以及东山茶文化、宜兴紫砂两个分支，让同样的7天可以根据兴趣调整而不打乱交通节奏。", "Las alternativas de Pekín y la elección Dongshan/Yixing permiten adaptar los mismos siete días sin romper el ritmo.", "As escolhas em Pequim e a opção Dongshan/Yixing adaptam os mesmos sete dias sem quebrar o ritmo.", "تتيح خيارات بكين وفرع دونغشان أو ييشينغ تخصيص الأيام السبعة من دون إرباك الإيقاع.")
    ],
    timeline: [
      { days: "1", place: text("Beijing", "北京", "Pekín", "Pequim", "بكين"), title: text("Arrival and a gentle first evening", "抵达、接机与轻松适应", "Llegada y primera tarde tranquila", "Chegada e primeira noite tranquila", "الوصول ومساء هادئ"), body: text("Private airport transfer, hotel check-in, payment and connectivity check, then rest or a short neighborhood walk according to the flight time.", "私人接机后入住酒店，协助检查支付、网络和通讯工具；根据航班时间休息或在酒店附近轻松散步。", "Traslado privado, registro, revisión de pagos y conexión, y descanso o paseo corto según el vuelo.", "Traslado privado, check-in, revisão de pagamentos e conexão, com descanso ou caminhada curta conforme o voo.", "استقبال خاص وتسجيل الفندق وفحص وسائل الدفع والاتصال، ثم راحة أو نزهة قصيرة حسب موعد الرحلة.") },
      { days: "2", place: text("Beijing", "北京", "Pekín", "Pequim", "بكين"), title: text("Imperial history, craft and Beijing flavors", "皇家历史、非遗手作与京味", "Historia imperial, artesanía y sabores de Pekín", "História imperial, artesanato e sabores de Pequim", "التاريخ الإمبراطوري والحرف ونكهات بكين"), body: text("Choose the Forbidden City or a Great Wall section in the morning, then enter a small workshop for cloisonné, inner painting, opera motifs, calligraphy or seal carving.", "上午在故宫深度参观和长城参观中二选一；下午进入小型工坊，体验景泰蓝、内画、京剧纹样、书法或篆刻。", "Elige Ciudad Prohibida o Gran Muralla por la mañana y un taller artesanal por la tarde.", "Escolha Cidade Proibida ou Grande Muralha pela manhã e uma oficina artesanal à tarde.", "اختر المدينة المحرمة أو سور الصين صباحا، ثم ورشة حرفية صغيرة بعد الظهر.") },
      { days: "3", place: text("Beijing → Suzhou", "北京 → 苏州", "Pekín → Suzhou", "Pequim → Suzhou", "بكين ← سوتشو"), title: text("Local morning and high-speed rail south", "从胡同日常乘高铁进入江南", "Mañana local y tren rápido hacia el sur", "Manhã local e trem rápido para o sul", "صباح محلي ثم القطار السريع جنوبا"), body: text("Choose a neighborhood market or city park, eat a simple Beijing lunch, then take the high-speed train to Suzhou and settle in for Suzhou noodles.", "在社区菜市场或城市公园中二选一，品尝北京家常午餐后乘高铁前往苏州，晚餐以苏式汤面和小吃为主。", "Mercado o parque de barrio, almuerzo sencillo y tren de alta velocidad a Suzhou.", "Mercado ou parque de bairro, almoço simples e trem de alta velocidade para Suzhou.", "سوق حي أو حديقة محلية ثم غداء بسيط وقطار سريع إلى سوتشو.") },
      { days: "4", place: text("Suzhou", "苏州", "Suzhou", "Suzhou", "سوتشو"), title: text("Read a garden, print a picture, hear the evening", "读园林、印年画、听江南夜色", "Leer un jardín, imprimir una estampa y escuchar la noche", "Ler um jardim, imprimir uma gravura e ouvir a noite", "قراءة حديقة وطباعة لوحة وسماع المساء"), body: text("Walk the Humble Administrator's Garden through framing, borrowed scenery and water space; print a Taohuawu woodblock image, then continue with Suzhou storytelling and a garden evening.", "从框景、借景和水面空间理解拙政园；亲手完成桃花坞木版年画，晚上结合苏州评弹与园林夜游。", "Jardín del Administrador Humilde, grabado Taohuawu y noche de narración y jardín.", "Jardim do Administrador Humilde, gravura Taohuawu e noite de narrativa e jardim.", "حديقة المسؤول المتواضع ثم طباعة تاوهواوو وأمسية حكاية وحديقة.") },
      { days: "5", place: text("Dongshan or Yixing → Shanghai", "东山或宜兴 → 上海", "Dongshan o Yixing → Shanghái", "Dongshan ou Yixing → Xangai", "دونغشان أو ييشينغ ← شنغهاي"), title: text("Choose tea or purple-clay craft", "在茶与紫砂之间选择一门江南技艺", "Elegir té o cerámica de arcilla púrpura", "Escolher chá ou cerâmica de argila roxa", "اختيار الشاي أو خزف الطين البنفسجي"), body: text("Spend the day in Dongshan learning seasonal tea work or in Yixing following clay, forming and firing. Continue by private car to Shanghai after the experience.", "前往东山了解季节性茶事与冲泡，或到宜兴丁蜀镇理解泥料、成型和烧制；体验结束后包车前往上海。", "Día de té en Dongshan o de arcilla púrpura en Yixing, seguido de traslado privado a Shanghái.", "Dia de chá em Dongshan ou de argila roxa em Yixing, seguido de carro privado até Xangai.", "يوم للشاي في دونغشان أو للطين البنفسجي في ييشينغ، ثم سيارة خاصة إلى شنغهاي.") },
      { days: "6", place: text("Shanghai", "上海", "Shanghái", "Xangai", "شنغهاي"), title: text("Robotics, urban height and the Huangpu at night", "机器人、城市高度与黄浦江夜色", "Robótica, altura urbana y Huangpu nocturno", "Robótica, altura urbana e Huangpu à noite", "الروبوتات ومرتفعات المدينة ونهر هوانغبو ليلا"), body: text("See a contemporary robotics experience, read the Lujiazui skyline from street and observation level, then finish with Shanghai food and an evening river cruise.", "近距离了解机器人应用，从街面和高层观景空间理解陆家嘴，晚上品尝本帮菜并乘船观看黄浦江两岸。", "Experiencia robótica, Lujiazui desde la calle y un mirador, cocina local y crucero nocturno.", "Experiência robótica, Lujiazui da rua e de um mirante, cozinha local e cruzeiro noturno.", "تجربة روبوتات ولوجياتسوي من الشارع ومنصة مرتفعة، ثم طعام شنغهاي ورحلة نهرية ليلية.") },
      { days: "7", place: text("Shanghai", "上海", "Shanghái", "Xangai", "شنغهاي"), title: text("A calm departure day", "为离境留出从容", "Una salida sin prisas", "Uma partida sem pressa", "يوم مغادرة هادئ"), body: text("If the flight is late, use the morning for Yuyuan gifts and a light meal; otherwise leave directly after breakfast with a private airport transfer.", "航班较晚可安排豫园区域伴手礼和简餐；航班较早则早餐后直接私人送机。", "Con vuelo tardío, regalos y almuerzo ligero en Yuyuan; con vuelo temprano, traslado directo.", "Com voo tarde, presentes e almoço leve em Yuyuan; com voo cedo, traslado direto.", "إذا كانت الرحلة متأخرة يمكن زيارة يوييوان ووجبة خفيفة، وإلا فالتوجه مباشرة إلى المطار.") }
    ],
    choices: [
      { title: text("Day 2 morning", "第2天上午", "Mañana del día 2", "Manhã do dia 2", "صباح اليوم الثاني"), intro: text("Both choices explain how power, architecture and landscape shaped northern China.", "两个选择都围绕权力、建筑与地形理解北方中国。", "Ambas opciones explican poder, arquitectura y paisaje.", "As duas opções explicam poder, arquitetura e paisagem.", "يشرح الخياران علاقة السلطة والعمارة والطبيعة."), options: [
        { title: text("Forbidden City in depth", "故宫深度参观", "Ciudad Prohibida en profundidad", "Cidade Proibida em profundidade", "المدينة المحرمة بعمق"), body: text("Ceremonial space, court life, color, scale and the logic of the central axis.", "从礼制空间、宫廷生活、色彩、尺度与中轴线理解明清皇城。", "Espacio ceremonial, vida de corte, color, escala y eje central.", "Espaço cerimonial, vida da corte, cor, escala e eixo central.", "الفضاء الاحتفالي وحياة البلاط والألوان والمحور المركزي.") },
        { title: text("Great Wall section", "长城参观", "Tramo de la Gran Muralla", "Trecho da Grande Muralha", "مقطع من سور الصين"), body: text("Mountain defense, watchtowers and a walking distance matched to the guest's strength.", "理解山地防御、敌楼和交通逻辑，并按客人体力调整步行距离。", "Defensa de montaña, torres y distancia adaptada al visitante.", "Defesa de montanha, torres e distância adaptada ao visitante.", "الدفاع الجبلي والأبراج ومسافة مشي تناسب قدرة الضيف.") }
      ] },
      { title: text("Day 5 cultural branch", "第5天文化分支", "Rama cultural del día 5", "Ramo cultural do dia 5", "المسار الثقافي في اليوم الخامس"), intro: text("Choose one full craft context rather than rushing through two places.", "不赶两个地点，而是完整进入一门仍在延续的江南技艺。", "Se elige un contexto artesanal completo, sin correr entre dos lugares.", "Escolhe-se um contexto artesanal completo, sem correr entre dois lugares.", "يتم اختيار سياق حرفي كامل بدلا من المرور السريع بمكانين."), options: [
        { title: text("Dongshan tea culture", "洞庭东山茶文化", "Cultura del té de Dongshan", "Cultura do chá de Dongshan", "ثقافة شاي دونغشان"), body: text("Tea garden, seasonal processing, local lunch, brewing and tasting. Spring offers the strongest field experience.", "茶园、季节性制茶、地方午餐、冲泡与品鉴；春季的田间体验最完整。", "Jardín, elaboración estacional, almuerzo local, preparación y cata.", "Jardim, produção sazonal, almoço local, preparo e degustação.", "مزرعة الشاي والمعالجة الموسمية والغداء المحلي والتحضير والتذوق.") },
        { title: text("Yixing purple-clay culture", "宜兴丁蜀镇紫砂文化", "Cerámica de Yixing", "Cerâmica de Yixing", "خزف ييشينغ"), body: text("Clay, teapot forms, workshop process and a small hands-on object; firing and international shipping are confirmed separately.", "认识泥料、壶型和工坊流程，并完成小型手作；烧制与国际邮寄另行确认。", "Arcilla, formas, taller y una pieza sencilla; cocción y envío se confirman aparte.", "Argila, formas, oficina e uma peça simples; queima e envio são confirmados à parte.", "الطين والأشكال وعمل الورشة وقطعة بسيطة، مع تأكيد الحرق والشحن منفصلين.") }
      ] }
    ],
    included: [
      text("Six nights in well-located star-rated hotels with agreed breakfasts", "北京、苏州、上海共6晚交通便利的星级酒店及约定早餐", "Seis noches en hoteles de categoría bien ubicados y desayunos acordados", "Seis noites em hotéis de categoria bem localizados e cafés da manhã acordados", "ست ليال في فنادق جيدة الموقع مع وجبات الإفطار المتفق عليها"),
      text("Airport and station transfers, Beijing-Suzhou high-speed rail and the agreed private-car sections", "机场与车站接送、北京至苏州高铁及约定包车路段", "Traslados, tren Pekín-Suzhou y tramos privados acordados", "Traslados, trem Pequim-Suzhou e trechos privados acordados", "تنقلات المطار والمحطات وقطار بكين سوتشو وأقسام السيارة الخاصة"),
      text("Agreed admissions, workshops, Suzhou evening program, observation deck and Huangpu cruise", "约定景点门票、手作体验、苏州夜间项目、上海高层观景与黄浦江游船", "Entradas, talleres, programa nocturno de Suzhou, mirador y crucero", "Ingressos, oficinas, programa noturno de Suzhou, mirante e cruzeiro", "التذاكر والورش وبرنامج سوتشو المسائي ومنصة المشاهدة والرحلة النهرية"),
      text("Route coordination and on-the-ground support", "全程行程协调与现场支持", "Coordinación de ruta y apoyo local", "Coordenação de roteiro e apoio local", "تنسيق المسار والدعم المحلي")
    ],
    excluded: [
      text("International flights, visa costs and travel insurance", "国际往返机票、签证相关费用和旅行保险", "Vuelos internacionales, visado y seguro", "Voos internacionais, visto e seguro", "الرحلات الدولية والتأشيرة والتأمين"),
      text("Medical care, medicine, emergency rescue and personal communication costs", "医疗、药品、紧急救援及个人通讯费用", "Atención médica, medicamentos, emergencias y comunicación personal", "Cuidados médicos, medicamentos, emergências e comunicação pessoal", "الرعاية الطبية والأدوية والطوارئ والاتصالات الشخصية"),
      text("Shopping, room upgrades and activities added beyond the confirmed plan", "购物、房型升级及确认方案之外新增的项目", "Compras, mejoras de habitación y actividades adicionales", "Compras, upgrades de quarto e atividades adicionais", "التسوق وترقية الغرف والأنشطة الإضافية")
    ],
    practical: [
      text("Forbidden City or Great Wall, craft workshops, Suzhou evening events, robotics and the cruise require advance confirmation.", "故宫或长城、非遗工坊、苏州夜间项目、机器人体验和游船都需要提前确认。", "Ciudad Prohibida o Muralla, talleres, noches de Suzhou, robótica y crucero requieren confirmación previa.", "Cidade Proibida ou Muralha, oficinas, noites de Suzhou, robótica e cruzeiro exigem confirmação prévia.", "تتطلب المدينة المحرمة أو السور والورش وبرامج سوتشو والروبوتات والرحلة النهرية تأكيدا مسبقا."),
      text("Exact hotels, train times, restaurant menus and ticket types are fixed in the final proposal after dates and group size are known.", "具体酒店、车次、菜单和票种会在确认日期、人数后写入最终方案。", "Hoteles, trenes, menús y entradas se fijan al confirmar fechas y grupo.", "Hotéis, trens, menus e ingressos são definidos após confirmar datas e grupo.", "تحدد الفنادق والقطارات والقوائم والتذاكر بعد تأكيد التواريخ وعدد الضيوف.")
    ]
  },
  {
    id: "sanya-wellness-14",
    kind: "wellness",
    duration: 14,
    nights: 13,
    heroImage: image("wellness-sanya-hotel.jpg"),
    gallery: [
      { src: image("wellness-medical-assessment.jpg"), alt: text("Medical assessment and communication", "医生评估与沟通", "Evaluación médica y comunicación", "Avaliação médica e comunicação", "تقييم طبي وتواصل") },
      { src: image("wellness-taiji.jpg"), alt: text("Tai chi by the sea", "海边太极", "Taichí junto al mar", "Tai chi à beira-mar", "تاي تشي قرب البحر") },
      { src: image("wellness-hotel-room.jpg"), alt: text("Quiet Sanya hotel room", "三亚安静的海景客房", "Habitación tranquila en Sanya", "Quarto tranquilo em Sanya", "غرفة هادئة في سانيا") },
      { src: image("wellness-hainan-food.jpg"), alt: text("Hainan food", "海南饮食", "Comida de Hainan", "Comida de Hainan", "طعام هاينان") }
    ],
    eyebrow: text("PRIVATE WELLNESS PLAN", "私人高端康养计划", "PLAN PRIVADO DE BIENESTAR", "PLANO PRIVADO DE BEM-ESTAR", "خطة عافية خاصة"),
    title: text("Fourteen days of TCM-guided wellness and seaside rest in Sanya", "海南三亚14天中医康养与海滨休养计划", "Catorce días de bienestar con medicina china y descanso junto al mar en Sanya", "Quatorze dias de bem-estar com medicina chinesa e descanso à beira-mar em Sanya", "أربعة عشر يوما من العافية بإرشاد الطب الصيني والراحة الساحلية في سانيا"),
    cardTitle: text("Sanya TCM wellness and seaside rest · 14 days", "三亚中医康养与海滨休养 · 14天", "Bienestar con medicina china en Sanya · 14 días", "Bem-estar com medicina chinesa em Sanya · 14 dias", "عافية الطب الصيني والراحة في سانيا · 14 يوما"),
    summary: text("A slow private stay that begins with professional assessment, alternates individually selected wellness sessions with genuine rest, and keeps one stable seaside base for thirteen nights.", "从专业评估开始，把医生建议下的个性化调理与真正的休息交替安排，并在同一家海滨酒店稳定居住13晚。", "Una estancia lenta que comienza con evaluación profesional, alterna sesiones personalizadas con descanso real y mantiene una sola base junto al mar durante trece noches.", "Uma estadia lenta que começa com avaliação profissional, alterna sessões personalizadas com descanso real e mantém uma única base à beira-mar por treze noites.", "إقامة هادئة تبدأ بتقييم مهني وتتناوب فيها جلسات مخصصة مع الراحة الحقيقية مع قاعدة ساحلية واحدة لمدة ثلاث عشرة ليلة."),
    route: text("Sanya · hospital assessment · personalized rhythm · seaside hotel", "三亚 · 医疗评估 · 个性化节奏 · 海滨酒店", "Sanya · evaluación médica · ritmo personal · hotel junto al mar", "Sanya · avaliação médica · ritmo pessoal · hotel à beira-mar", "سانيا · تقييم طبي · إيقاع شخصي · فندق ساحلي"),
    idealFor: text("Guests seeking a calm reset, structured support and an introduction to Chinese wellness practices", "希望真正放慢节奏、获得结构化陪同并了解中国养生方式的客人", "Personas que buscan descanso, apoyo estructurado y una introducción a prácticas chinas de bienestar", "Pessoas que buscam descanso, apoio estruturado e introdução às práticas chinesas de bem-estar", "للضيوف الباحثين عن الراحة والدعم المنظم والتعرف إلى ممارسات العافية الصينية"),
    season: text("Flexible by preference; Sanya is especially attractive during the cooler months", "可按个人偏好安排；三亚在较凉爽季节尤其舒适", "Flexible; Sanya resulta especialmente agradable en los meses más frescos", "Flexível; Sanya é especialmente agradável nos meses mais frescos", "مرن حسب التفضيل، وتكون سانيا جذابة خصوصا في الأشهر الألطف"),
    pace: text("Very slow, with treatment-free rest days and no hotel changes", "非常舒缓，设置无调理项目的完整休息日，全程不更换酒店", "Muy tranquilo, con días completos sin sesiones y sin cambio de hotel", "Muito tranquilo, com dias inteiros sem sessões e sem troca de hotel", "هادئ جدا مع أيام راحة كاملة من دون جلسات ومن دون تغيير الفندق"),
    intro: [
      text("This is not a medical package sold before assessment. The plan starts by understanding the guest's condition and is adjusted by qualified medical professionals.", "这不是在评估前就出售的固定医疗套餐。计划先了解客人的身体情况，再由具备资质的医疗专业人员判断和调整。", "No es un paquete médico vendido antes de evaluar. El plan comienza por comprender a la persona y lo ajustan profesionales cualificados.", "Não é um pacote médico vendido antes da avaliação. O plano começa entendendo a pessoa e é ajustado por profissionais qualificados.", "هذه ليست حزمة طبية تباع قبل التقييم، بل تبدأ بفهم حالة الضيف ويعدلها مختصون مؤهلون."),
      text("Hospital visits occupy only part of the stay. Sleep, quiet meals, gentle movement, sea air and an unchanging hotel base are part of the recovery rhythm.", "医院安排只占整个停留的一部分，稳定睡眠、轻松饮食、温和活动、海风和不更换酒店同样构成康养节奏。", "Las visitas médicas ocupan solo una parte. Sueño, comida tranquila, movimiento suave, aire marino y un hotel estable forman el resto.", "As visitas médicas ocupam apenas uma parte. Sono, alimentação tranquila, movimento leve, ar do mar e hotel estável completam o ritmo.", "تشغل الزيارات الطبية جزءا فقط، بينما يشكل النوم والطعام الهادئ والحركة اللطيفة وهواء البحر والفندق الثابت بقية الإيقاع.")
    ],
    timeline: [
      { days: "1–3", place: text("Understand the body", "了解身体", "Comprender el cuerpo", "Entender o corpo", "فهم الجسم"), title: text("Arrival, assessment and an individual direction", "抵达、健康评估与形成个人方向", "Llegada, evaluación y orientación personal", "Chegada, avaliação e direção pessoal", "الوصول والتقييم وتحديد اتجاه شخصي"), body: text("Day 1 is for arrival and rest. Days 2–3 cover appropriate health checks, TCM assessment, medical consultation and the first gentle session only after professional review.", "第1天抵达后只休息；第2至3天根据需要完成基础检查、中医体质辨识和医生面诊，并在专业判断后开始首次温和调理。", "El día 1 es de descanso. Los días 2–3 incluyen controles adecuados, valoración, consulta y una primera sesión suave solo tras revisión profesional.", "O dia 1 é de descanso. Os dias 2–3 incluem exames adequados, avaliação, consulta e primeira sessão leve após revisão profissional.", "اليوم الأول للراحة، واليومان الثاني والثالث للفحوص المناسبة والتقييم والاستشارة ثم جلسة لطيفة بعد المراجعة المهنية.") },
      { days: "4–7", place: text("Begin the rhythm", "开始调理", "Comenzar el ritmo", "Começar o ritmo", "بدء الإيقاع"), title: text("Selected sessions, gentle movement and a full rest day", "个性化调理、温和活动与完整休息日", "Sesiones elegidas, movimiento suave y un día completo de descanso", "Sessões escolhidas, movimento leve e um dia completo de descanso", "جلسات مختارة وحركة لطيفة ويوم راحة كامل"), body: text("Sessions may include acupuncture, traditional manual therapy or other clinically appropriate support. A complete hotel-and-seaside rest day prevents the schedule from becoming treatment-heavy.", "可能安排针灸、传统手法或其他适合的支持项目，并保留一个只在酒店和海边休息的完整空白日，避免每天都被医疗安排占满。", "Puede incluir acupuntura, terapia manual u otros apoyos adecuados, con un día completo sin sesiones.", "Pode incluir acupuntura, terapia manual ou outros apoios adequados, com um dia inteiro sem sessões.", "قد تشمل الوخز بالإبر أو العلاج اليدوي أو دعما مناسبا آخر، مع يوم كامل بلا جلسات.") },
      { days: "8–11", place: text("Stabilize and review", "稳定恢复", "Estabilizar y revisar", "Estabilizar e rever", "الاستقرار والمراجعة"), title: text("Rest, feedback-led adjustment and Chinese wellness practices", "休息、根据反馈调整并体验中国养生方式", "Descanso, ajustes según respuesta y prácticas chinas de bienestar", "Descanso, ajustes conforme a resposta e práticas chinesas de bem-estar", "راحة وتعديل حسب الاستجابة وممارسات العافية الصينية"), body: text("The middle stage alternates complete rest, a review of how the guest feels, gentle practices such as tai chi or Baduanjin, and only clinically suitable follow-up.", "中段在完整休息、身体感受反馈、太极或八段锦等温和活动之间交替，只继续安排专业人员认为适合的后续内容。", "Se alternan descanso, revisión de sensaciones, taichí o Baduanjin y seguimiento solo si resulta adecuado.", "Alternam-se descanso, revisão das sensações, tai chi ou Baduanjin e acompanhamento apenas quando adequado.", "تتناوب الراحة ومراجعة الشعور وتاي تشي أو بادوانجين والمتابعة المناسبة فقط.") },
      { days: "12–14", place: text("Carry the rhythm home", "把节奏带回家", "Llevar el ritmo a casa", "Levar o ritmo para casa", "حمل الإيقاع إلى المنزل"), title: text("Final rest, review and an unhurried departure", "最终休息、复评与从容离开", "Descanso final, revisión y salida sin prisa", "Descanso final, revisão e partida sem pressa", "راحة أخيرة ومراجعة ومغادرة هادئة"), body: text("A second complete rest day is followed by final consultation and organized records. Day 14 remains light, with breakfast, a seaside walk and private airport transfer.", "第二个完整休息日之后进行最终沟通并整理资料；第14天只保留早餐、海边散步和私人送机。", "Un segundo día de descanso precede a la revisión final y los documentos; el día 14 queda ligero con desayuno, paseo y traslado.", "Um segundo dia de descanso antecede a revisão final e os documentos; o dia 14 fica leve, com café, caminhada e traslado.", "يسبق يوم الراحة الثاني المراجعة الأخيرة وتنظيم السجلات، ويبقى اليوم الرابع عشر خفيفا مع الإفطار والنزهة والنقل الخاص.") }
    ],
    choices: [
      { title: text("Possible areas of focus", "可能关注的方向", "Posibles áreas de enfoque", "Possíveis áreas de foco", "مجالات تركيز محتملة"), intro: text("These are discussion themes, not promised outcomes. Medical suitability is determined after assessment.", "这些只是沟通方向，不代表效果承诺；是否适合需在评估后由专业人员判断。", "Son temas de conversación, no resultados prometidos. La idoneidad se decide tras evaluar.", "São temas de conversa, não resultados prometidos. A adequação é definida após avaliação.", "هذه موضوعات للنقاش وليست نتائج مضمونة، وتحدد الملاءمة بعد التقييم."), options: [
        { title: text("Rest and stress", "身心放松", "Descanso y estrés", "Descanso e estresse", "الراحة والضغط"), body: text("For guests who have been working intensely and want a protected period to slow down.", "适合长期工作紧张，希望获得一段受保护的慢节奏时间。", "Para quienes han trabajado intensamente y necesitan bajar el ritmo.", "Para quem trabalhou intensamente e precisa desacelerar.", "لمن عملوا بكثافة ويرغبون في فترة محمية لإبطاء الإيقاع.") },
        { title: text("Sleep routine", "睡眠节奏", "Rutina de sueño", "Rotina de sono", "إيقاع النوم"), body: text("A calm schedule, sleep review and lifestyle guidance may be discussed with the medical team.", "可与医疗团队讨论稳定作息、睡眠评估和生活方式建议。", "Se puede hablar de horario estable, revisión del sueño y hábitos.", "Pode-se conversar sobre horário estável, avaliação do sono e hábitos.", "يمكن مناقشة جدول ثابت ومراجعة النوم وإرشادات نمط الحياة.") },
        { title: text("Movement and comfort", "活动与身体舒适度", "Movimiento y comodidad", "Movimento e conforto", "الحركة والراحة الجسدية"), body: text("Suitable movement or rehabilitation support depends on professional assessment and the guest's actual ability.", "温和运动或康复支持必须根据专业评估和客人的实际活动能力决定。", "El movimiento o apoyo de rehabilitación depende de la evaluación y capacidad real.", "Movimento ou reabilitação dependem da avaliação e capacidade real.", "تعتمد الحركة أو إعادة التأهيل على التقييم والقدرة الفعلية للضيف.") },
        { title: text("Everyday habits", "生活方式", "Hábitos cotidianos", "Hábitos cotidianos", "العادات اليومية"), body: text("Food, activity, rest and an achievable routine to continue after leaving Sanya.", "围绕饮食、活动、休息和离开三亚后可以继续执行的日常节奏。", "Alimentación, actividad, descanso y una rutina que pueda continuar en casa.", "Alimentação, atividade, descanso e rotina possível de continuar em casa.", "الطعام والنشاط والراحة وروتين يمكن الاستمرار به بعد مغادرة سانيا.") }
      ] }
    ],
    included: [
      text("Thirteen nights in one confirmed seaside hotel and agreed daily breakfast", "同一家确认后的海滨酒店连续住宿13晚及约定早餐", "Trece noches en un único hotel junto al mar y desayuno acordado", "Treze noites em um único hotel à beira-mar e café da manhã acordado", "ثلاث عشرة ليلة في فندق ساحلي واحد مع الإفطار المتفق عليه"),
      text("Private airport transfers and agreed hotel-medical facility transport", "私人机场接送及约定的酒店与医疗机构之间用车", "Traslados privados y transporte acordado entre hotel y centro médico", "Traslados privados e transporte acordado entre hotel e centro médico", "تنقلات خاصة والنقل المتفق عليه بين الفندق والمنشأة الطبية"),
      text("Medical-visit accompaniment, language support and daily coordination", "就诊陪同、语言协助与每日行程协调", "Acompañamiento médico, apoyo lingüístico y coordinación diaria", "Acompanhamento médico, apoio linguístico e coordenação diária", "مرافقة الزيارات الطبية ودعم اللغة والتنسيق اليومي"),
      text("Organization of available examination records and professional recommendations before departure", "离开前整理可提供的检查资料与专业建议", "Organización de informes disponibles y recomendaciones antes de salir", "Organização dos registros disponíveis e recomendações antes da partida", "تنظيم السجلات المتاحة والتوصيات المهنية قبل المغادرة")
    ],
    excluded: [
      text("International flights, visa costs and travel insurance", "国际往返机票、签证相关费用和旅行保险", "Vuelos internacionales, visado y seguro", "Voos internacionais, visto e seguro", "الرحلات الدولية والتأشيرة والتأمين"),
      text("Medical examinations, treatment, medicine and emergency services unless explicitly listed in the final quotation", "最终报价未明确列出的检查、调理、药品和紧急医疗服务", "Pruebas, tratamientos, medicamentos y emergencias no incluidos expresamente en la cotización final", "Exames, tratamentos, medicamentos e emergências não listados na proposta final", "الفحوص والعلاج والأدوية والطوارئ غير المذكورة صراحة في العرض النهائي"),
      text("Spa, room upgrades, personal purchases and optional hotel activities", "水疗、房型升级、个人消费及酒店自选活动", "Spa, mejoras de habitación, compras y actividades opcionales", "Spa, upgrades de quarto, compras e atividades opcionais", "السبا وترقية الغرفة والمشتريات والأنشطة الاختيارية")
    ],
    practical: [
      text("Before confirming, guests must disclose relevant health conditions, mobility limits, allergies and current medication to the appropriate medical provider.", "确认前，客人需要向相应医疗机构如实说明相关健康情况、活动限制、过敏和正在使用的药物。", "Antes de confirmar deben comunicarse al proveedor médico condiciones, movilidad, alergias y medicación.", "Antes de confirmar, condições, mobilidade, alergias e medicamentos devem ser informados ao prestador médico.", "قبل التأكيد يجب إبلاغ الجهة الطبية بالحالات الصحية والقيود الحركية والحساسيات والأدوية الحالية."),
      text("The named medical facility, hotel, room type and individual sessions remain subject to professional assessment, availability and the final written confirmation.", "具体医疗机构、酒店、房型和个人项目均以专业评估、实际可预约情况和最终书面确认单为准。", "Centro médico, hotel, habitación y sesiones dependen de evaluación, disponibilidad y confirmación escrita.", "Centro médico, hotel, quarto e sessões dependem de avaliação, disponibilidade e confirmação por escrito.", "تعتمد المنشأة الطبية والفندق ونوع الغرفة والجلسات على التقييم والتوفر والتأكيد الكتابي النهائي.")
    ],
    disclaimer: text(
      "This travel service does not diagnose, prescribe or guarantee medical outcomes. All medical decisions are made by licensed professionals at the receiving institution. Emergency or hospital care is outside the travel plan unless separately confirmed.",
      "本旅行服务不进行诊断、处方，也不保证医疗效果。所有医疗决定均由接诊机构具备资质的专业人员作出；急救、住院等服务不属于旅行计划，除非另有书面确认。",
      "Este servicio de viaje no diagnostica, prescribe ni garantiza resultados. Las decisiones médicas corresponden a profesionales autorizados. Urgencias y hospitalización quedan fuera salvo confirmación escrita.",
      "Este serviço de viagem não diagnostica, prescreve nem garante resultados. Decisões médicas cabem a profissionais licenciados. Emergência e internação ficam fora, salvo confirmação escrita.",
      "لا تشخص خدمة السفر هذه ولا تصف العلاج ولا تضمن النتائج. تتخذ القرارات الطبية جهات مهنية مرخصة، ولا تشمل الخطة الطوارئ أو الإقامة بالمستشفى إلا بتأكيد مكتوب منفصل."
    )
  }
];

export const featuredPlanIds = featuredPlans.map((plan) => plan.id);

export function getFeaturedPlan(id: string) {
  return featuredPlans.find((plan) => plan.id === id);
}
