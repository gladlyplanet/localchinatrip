import type { Lang } from "@/components/LanguageProvider";

export type ExperienceLocation = {
  slug: string;
  name: string;
  nameZh: string;
  region: string;
  regionZh: string;
  provinceSlug: string;
  project: string;
  projectZh: string;
  description: string;
  descriptionZh: string;
};

export type Experience = {
  slug: string;
  image: string;
  duration: string;
  locations: ExperienceLocation[];
};

const place = (
  slug: string, name: string, nameZh: string, region: string, regionZh: string,
  provinceSlug: string, project: string, projectZh: string, description: string, descriptionZh: string
): ExperienceLocation => ({ slug, name, nameZh, region, regionZh, provinceSlug, project, projectZh, description, descriptionZh });

export const experiences: Experience[] = [
  {
    slug: "village-life", image: "/images/experience-hongcun.jpg", duration: "5-7 h", locations: [
      place("hongcun", "Hongcun", "宏村", "Anhui", "安徽", "anhui", "Huizhou Courtyard Day", "徽州村落生活一日", "Follow ancient waterways, enter traditional courtyards and understand how Huizhou village life grew around family, trade and architecture.", "沿着古老水系漫步，走进传统院落，了解徽州村落围绕家族、商贸与建筑形成的生活方式。"),
      place("beiji-village", "Beiji Village, Mohe", "漠河北极村", "Heilongjiang", "黑龙江", "heilongjiang", "Far-North Village Life", "中国最北村落生活", "Experience a border village shaped by forests, the Heilong River and dramatic seasonal light, with time for local homes and regional food.", "体验由森林、黑龙江与鲜明四季塑造的边境村落生活，探访当地人家并品尝东北风味。"),
      place("guoliang", "Guoliang Village", "郭亮村", "Henan", "河南", "henan", "Cliff Village Walk", "太行山悬崖村体验", "Walk a Taihang Mountains village known for its cliff setting, stone homes and the hand-built road carved through the rock.", "走进太行山悬崖村，参观石头民居与人工开凿的挂壁公路，了解山区生活。"),
      place("azheke", "Azheke Village, Yuanyang", "元阳阿者科村", "Yunnan", "云南", "yunnan", "Hani Terrace Village Day", "哈尼梯田村落生活", "Explore a Hani village among rice terraces, forest and irrigation channels, with local insight into farming rhythms and mushroom-shaped homes.", "在梯田、森林与水渠之间探访哈尼村寨，了解农耕节奏、蘑菇房与传统生态系统。"),
      place("pingan", "Ping'an Village, Longji", "龙脊平安寨", "Guangxi", "广西", "guangxi", "Terrace and Zhuang Village Day", "壮寨梯田生活体验", "Walk through layered rice terraces and a Zhuang village, meeting local residents and learning how mountain farming changes with the seasons.", "穿行层叠梯田与壮族村寨，认识当地居民，了解山地农耕如何随四季变化。")
    ]
  },
  {
    slug: "night-food-tour", image: "/images/experience-xian-night.jpg", duration: "3-5 h", locations: [
      place("xian-muslim-quarter", "Muslim Quarter, Xi'an", "西安回民街及周边老巷", "Shaanxi", "陕西", "shaanxi", "Northwest Night Flavors", "西北夜食寻味", "Taste grilled meats, breads, noodles and sweets while exploring the food traditions of Xi'an's historic Muslim community.", "品尝烤肉、馍、面食与甜点，了解西安历史悠久的穆斯林饮食传统。"),
      place("chengdu-kuixinglou", "Kuixinglou Area, Chengdu", "成都奎星楼街区", "Sichuan", "四川", "sichuan", "Chengdu After Dark", "成都夜味体验", "Move between trusted snack shops for skewers, wontons and Sichuan specialties, balancing spice with neighborhood stories.", "穿梭本地小店，品尝串串、抄手与川味小吃，在麻辣之间听街区故事。"),
      place("changsha-dongguashan", "Dongguashan, Changsha", "长沙冬瓜山", "Hunan", "湖南", "hunan", "Changsha Late-Night Food Walk", "长沙深夜食堂漫步", "Discover Hunan's bold flavors through grilled snacks, rice noodles and late-night neighborhood favorites.", "从烧烤、米粉到夜宵小店，感受湖南鲜辣直接的城市味道。"),
      place("kaifeng-drum-tower", "Drum Tower Night Market, Kaifeng", "开封鼓楼夜市", "Henan", "河南", "henan", "Old Capital Night Market", "古都夜市体验", "Sample Henan snacks in an old-capital setting, with stories connecting market food to Kaifeng's long urban history.", "在古都街区品尝河南小吃，了解夜市饮食与开封城市历史的联系。"),
      place("guangzhou-xihua", "Xihua Road, Guangzhou", "广州西华路", "Guangdong", "广东", "guangdong", "Cantonese Evening Bites", "广府夜间小吃体验", "Visit long-running neighborhood shops for rice rolls, wonton noodles, desserts and other Cantonese comfort food.", "探访老字号与街坊小店，品尝肠粉、云吞面、糖水等广府日常味道。")
    ]
  },
  {
    slug: "local-market-walk", image: "/images/experience-chengdu-market.jpg", duration: "3-4 h", locations: [
      place("kunming-zhuanxin", "Zhuanxin Market, Kunming", "昆明篆新农贸市场", "Yunnan", "云南", "yunnan", "Yunnan Ingredient Discovery", "云南食材发现之旅", "Meet vendors and decode Yunnan mushrooms, herbs, pickles, flowers and regional cooked foods in a vivid city market.", "跟随摊主认识云南菌菇、香草、腌菜、鲜花与各地熟食，读懂丰富的高原食材。"),
      place("chengdu-neighborhood", "Neighborhood Market, Chengdu", "成都社区菜市场", "Sichuan", "四川", "sichuan", "Sichuan Pantry Walk", "川味厨房市场漫步", "Learn the building blocks of Sichuan cooking, from fermented sauces and chilies to seasonal vegetables and fresh noodles.", "认识豆瓣、辣椒、时令蔬菜与鲜面等川菜基础食材，观察成都人的日常采购。"),
      place("kashgar-bazaar", "Kashgar Bazaar", "喀什巴扎", "Xinjiang", "新疆", "xinjiang", "Silk Road Market Morning", "丝路巴扎晨间体验", "Explore spices, dried fruit, bread, textiles and craft stalls while learning how oasis trade still shapes local life.", "在香料、干果、馕、织物与手工摊位之间漫步，了解绿洲贸易如何影响当地生活。"),
      place("shanghai-caoyang", "Caoyang Market, Shanghai", "上海曹杨社区市场", "Shanghai", "上海", "shanghai", "Shanghai Neighborhood Pantry", "上海街坊菜场体验", "See the everyday side of Shanghai through seasonal produce, freshwater foods, prepared dishes and conversations with local shoppers.", "从时令蔬菜、河鲜、熟食与街坊交流中，看见上海最日常的一面。"),
      place("guangzhou-liwan", "Liwan Food Market, Guangzhou", "广州荔湾街坊市场", "Guangdong", "广东", "guangdong", "Cantonese Fresh Market Walk", "广府鲜味市场漫步", "Discover the fresh ingredients, roast meats, soups and preserved foods that anchor Cantonese home cooking.", "认识支撑广府家常菜的鲜活食材、烧味、汤料与腌制食品。")
    ]
  },
  {
    slug: "craft-and-culture", image: "/images/experience-suzhou-craft.jpg", duration: "3-5 h", locations: [
      place("suzhou-embroidery", "Suzhou", "苏州", "Jiangsu", "江苏", "jiangsu", "Suzhou Embroidery Studio", "苏绣工坊体验", "Meet an embroidery practitioner, study silk-thread techniques and try a small guided piece alongside Suzhou's canal-side culture.", "拜访苏绣手艺人，了解丝线针法并尝试小幅作品，同时感受苏州水巷文化。"),
      place("jingdezhen-ceramics", "Jingdezhen", "景德镇", "Jiangxi", "江西", "jiangxi", "Porcelain Workshop Day", "景德镇制瓷工坊体验", "Visit working studios to learn forming, glazing and firing, then make or decorate a simple porcelain piece.", "走进仍在生产的工作室，了解拉坯、施釉与烧制，并亲手制作或装饰一件瓷器。"),
      place("kaili-miao", "Kaili and Miao Villages", "凯里及苗族村寨", "Guizhou", "贵州", "guizhou", "Miao Textile and Silver Craft", "苗族织绣与银饰体验", "Learn how embroidery, indigo, weaving and silver ornament carry family memory and community identity.", "了解刺绣、蓝染、织造与银饰如何承载家族记忆和族群身份。"),
      place("quanzhou-puppets", "Quanzhou", "泉州", "Fujian", "福建", "fujian", "Puppet Craft and Maritime Culture", "木偶工艺与海丝文化", "Enter a local workshop to see puppet carving and performance traditions within Quanzhou's layered maritime culture.", "走进本地工坊，了解木偶雕刻与表演传统，以及泉州多元海洋文化。"),
      place("shiwan-ceramics", "Shiwan, Foshan", "佛山石湾", "Guangdong", "广东", "guangdong", "Shiwan Ceramic Sculpture", "石湾陶塑体验", "Discover expressive Lingnan ceramic sculpture, traditional kilns and hands-on clay techniques with a local maker.", "认识富有表现力的岭南陶塑、传统窑火，并跟随手艺人体验泥塑技法。")
    ]
  },
  {
    slug: "local-family-cooking", image: "/images/experience-chengdu-cooking.jpg", duration: "4-5 h", locations: [
      place("chengdu-family", "Chengdu", "成都", "Sichuan", "四川", "sichuan", "Sichuan Family Kitchen", "川味家庭厨房", "Shop for ingredients with your host, cook several home-style Sichuan dishes and share the meal around a family table.", "与主人一起买菜，制作几道家常川菜，再围坐家庭餐桌共同用餐。"),
      place("beijing-hutong-family", "Beijing Hutong", "北京胡同", "Beijing", "北京", "beijing", "Hutong Dumpling Kitchen", "胡同家庭饺子厨房", "Enter a courtyard home to prepare dumplings, noodles and seasonal northern dishes while hearing stories of hutong life.", "走进胡同院落，制作饺子、面食与北方时令家常菜，听主人讲述胡同生活。"),
      place("yangshuo-farmhouse", "Yangshuo Countryside", "阳朔乡村", "Guangxi", "广西", "guangxi", "Guangxi Farmhouse Cooking", "广西农家饭体验", "Gather seasonal produce and cook a relaxed farmhouse meal using local methods and ingredients from the karst countryside.", "采集时令食材，用当地做法烹制一桌轻松的农家饭，感受喀斯特乡村日常。"),
      place("suzhou-family", "Suzhou Old Town", "苏州古城", "Jiangsu", "江苏", "jiangsu", "Jiangnan Seasonal Home Cooking", "江南时令家常菜", "Prepare delicate Jiangnan home dishes centered on fresh river-and-lake ingredients and the season's produce.", "围绕河湖鲜味与时令蔬菜，制作清雅细致的江南家常菜。"),
      place("xian-family", "Xi'an", "西安", "Shaanxi", "陕西", "shaanxi", "Shaanxi Noodle and Dumpling Table", "陕西面食家庭餐桌", "Learn hand-shaped noodles, dumplings and a family-style northwest meal with a local host.", "跟随当地家庭学习手工面、饺子和西北家常菜，一起围桌用餐。")
    ]
  },
  {
    slug: "tea-village-experience", image: "/images/experience-longjing-tea.jpg", duration: "5-7 h", locations: [
      place("longjing", "Longjing and Meijiawu", "龙井与梅家坞", "Zhejiang", "浙江", "zhejiang", "West Lake Longjing Day", "西湖龙井茶村一日", "Walk tea slopes, meet a grower and compare seasonal Longjing through picking, hand-firing demonstrations and tasting.", "漫步茶坡，拜访茶农，通过采摘、手工炒制演示与品鉴认识当季西湖龙井。"),
      place("wuyi", "Wuyi Mountains", "武夷山", "Fujian", "福建", "fujian", "Rock Tea Valley Walk", "武夷岩茶山场体验", "Follow tea paths through the dramatic rock landscape and learn how place, roasting and craft shape Wuyi rock tea.", "穿行岩壁茶径，了解山场、焙火与制茶技艺如何共同塑造武夷岩茶。"),
      place("anxi", "Anxi Tea Villages", "安溪茶村", "Fujian", "福建", "fujian", "Tieguanyin Craft Day", "铁观音制作体验", "Visit family tea gardens and learn the shaking, oxidation and roasting stages behind traditional Tieguanyin.", "拜访家庭茶园，了解传统铁观音摇青、发酵与焙火的关键过程。"),
      place("jingmai", "Jingmai Mountain", "景迈山", "Yunnan", "云南", "yunnan", "Ancient Tea Forest Journey", "古茶林村寨体验", "Explore ancient tea forests and villages where tea cultivation, belief and community life have developed together for centuries.", "走进古茶林与村寨，了解茶树栽培、信仰与社区生活数百年来如何共生。"),
      place("mengding", "Mengding Mountain", "蒙顶山", "Sichuan", "四川", "sichuan", "Mengding Tea Heritage Day", "蒙顶山茶文化体验", "Walk historic tea gardens near Ya'an and discover green-tea making, local tea rituals and the mountain's long tea history.", "漫步雅安附近的历史茶园，了解绿茶制作、当地茶礼与蒙顶山悠久茶史。")
    ]
  },
  {
    slug: "private-ride", image: "/images/experience-guilin-ride.jpg", duration: "1-8 days", locations: [
      place("guilin-yangshuo", "Guilin to Yangshuo", "桂林至阳朔", "Guangxi", "广西", "guangxi", "Karst Landscape Road Day", "喀斯特山水公路体验", "A flexible private route linking rivers, villages and viewpoints through Guilin's karst countryside.", "以灵活节奏连接河流、村落与观景点，穿行桂林喀斯特山水。"),
      place("dali-lijiang", "Dali, Shaxi and Lijiang", "大理、沙溪与丽江", "Yunnan", "云南", "yunnan", "Northwest Yunnan Heritage Route", "滇西北古镇路线", "Travel between old towns, mountain landscapes and village stays with room for slower, meaningful stops.", "连接古城、山地景观与村落住宿，保留充足时间深入停留。"),
      place("western-sichuan", "Kangding and Danba", "康定与丹巴", "Sichuan", "四川", "sichuan", "Western Sichuan Mountain Route", "川西山地路线", "Cross high valleys from Chengdu toward Tibetan and Qiang communities, with adaptable scenic and cultural stops.", "从成都进入高山峡谷与藏羌聚落，按天气和兴趣灵活安排风景与文化停靠。"),
      place("ili", "Yining, Nalati and Tekes", "伊宁、那拉提与特克斯", "Xinjiang", "新疆", "xinjiang", "Ili Grassland Journey", "伊犁草原公路体验", "Connect flower-filled valleys, grasslands and small towns across Ili on a comfortable multi-day private journey.", "以舒适的多日私人行程连接伊犁河谷、草原与小城。"),
      place("qinghai-gansu", "Qinghai Lake to Zhangye", "青海湖至张掖", "Qinghai and Gansu", "青海与甘肃", "qinghai", "Plateau and Hexi Corridor Route", "高原与河西走廊路线", "Link Qinghai Lake, plateau scenery and the Hexi Corridor with flexible stops adapted to altitude and distance.", "连接青海湖、高原风光与河西走廊，并根据海拔和路程灵活调整停靠。")
    ]
  },
  {
    slug: "custom-day", image: "/images/experience-beijing-hutong.jpg", duration: "Flexible", locations: [
      place("beijing-day", "Beijing", "北京", "Beijing", "北京", "beijing", "Hutongs, History and Local Food", "胡同、历史与本地饮食", "Build a private day around courtyard neighborhoods, imperial history, contemporary life and food matched to your interests.", "围绕胡同院落、皇家历史、当代生活与个人饮食兴趣定制私人一日。"),
      place("shanghai-day", "Shanghai", "上海", "Shanghai", "上海", "shanghai", "Lanes, Design and Waterfront", "里弄、设计与滨水城市", "Combine historic lanes, architecture, local food and the waterfront for a layered view of Shanghai.", "组合历史里弄、建筑、本地饮食与滨水空间，看见层次丰富的上海。"),
      place("hangzhou-day", "Hangzhou", "杭州", "Zhejiang", "浙江", "zhejiang", "West Lake and Tea Village", "西湖与茶村一日", "Balance West Lake scenery, a tea village and quiet local neighborhoods in one unhurried day.", "在从容的一天里连接西湖风景、茶村与安静的本地社区。"),
      place("guangzhou-day", "Guangzhou", "广州", "Guangdong", "广东", "guangdong", "Old City and Cantonese Food", "老城与广府饮食", "Explore arcades, ancestral halls, markets and Cantonese food through the everyday rhythm of the old city.", "沿着骑楼、祠堂、市场与广府饮食，感受广州老城的日常节奏。"),
      place("wuhan-day", "Wuhan", "武汉", "Hubei", "湖北", "hubei", "Yangtze, East Lake and Neighborhoods", "长江、东湖与街区生活", "Connect the Yangtze riverfront, East Lake, historic streets and Wuhan's direct, lively food culture.", "连接长江江岸、东湖、历史街区与武汉鲜明热烈的饮食文化。")
    ]
  }
];

type Copy = { title: string; intro: string; description: string; highlights: string[] };

const en: Record<string, Copy> = {
  "village-life": { title: "China Rural Life", intro: "Step into the rhythms of village life across China.", description: "Choose from five distinctive rural communities, each shaped by its own landscape, architecture, food and living traditions.", highlights: ["Village walks", "Local households", "Rural traditions"] },
  "night-food-tour": { title: "China Night Food Experience", intro: "Taste how Chinese cities come alive after dark.", description: "Explore trusted stalls and neighborhood shops in five food cities, with a local guide explaining ingredients, customs and regional flavor.", highlights: ["Local tasting", "Night streets", "Food stories"] },
  "local-market-walk": { title: "Chinese Local Market Walk", intro: "Understand daily life through the local market.", description: "Meet vendors, decode regional ingredients and see how households shop and cook in five very different Chinese cities.", highlights: ["Seasonal produce", "Vendor encounters", "Regional ingredients"] },
  "craft-and-culture": { title: "Traditional Chinese Craft Experience", intro: "Meet the hands keeping traditions alive.", description: "Enter working studios in five renowned craft regions and learn through conversation, demonstration and a simple hands-on session.", highlights: ["Working studios", "Master techniques", "Hands-on making"] },
  "local-family-cooking": { title: "Cook with a Chinese Family", intro: "Share a kitchen, a table and real conversation.", description: "Choose one of five regional family kitchens, shop for ingredients and prepare an everyday meal together with your local host.", highlights: ["Home kitchen", "Market ingredients", "Shared family meal"] },
  "tea-village-experience": { title: "Chinese Tea Village Experience", intro: "Walk tea landscapes and taste the season.", description: "Visit one of five major tea regions to meet growers and understand how landscape, cultivar and craftsmanship shape the cup.", highlights: ["Tea-garden walk", "Making process", "Guided tasting"] },
  "private-ride": { title: "China Scenic Private Ride", intro: "See China's landscapes at your own pace.", description: "Select one of five scenic road journeys with a private new-energy vehicle, local driver and flexible stops along the way.", highlights: ["Private vehicle", "Flexible stops", "Multi-day options"] },
  "custom-day": { title: "Custom Local Day in China", intro: "One private day designed around you.", description: "Start with one of five cities, then shape the day around your interests, energy, food preferences and preferred pace.", highlights: ["Personal route", "Local context", "Flexible pace"] }
};

const titles: Record<Lang, string[]> = {
  en: experiences.map((item) => en[item.slug].title),
  "zh-CN": ["中国农村生活体验", "中国夜市美食体验", "中国本地市场体验", "中国传统手工艺体验", "体验中式家庭做饭", "中国茶村体验", "中国山水私人用车体验", "中国本地定制一日体验"],
  "zh-TW": ["中國農村生活體驗", "中國夜市美食體驗", "中國本地市場體驗", "中國傳統手工藝體驗", "體驗中式家庭做飯", "中國茶村體驗", "中國山水私人用車體驗", "中國本地訂製一日體驗"],
  es: ["Vida rural china", "Comida nocturna china", "Mercado local chino", "Artesanía tradicional china", "Cocina con una familia china", "Pueblos de té chinos", "Ruta panorámica privada", "Día local a medida"],
  pt: ["Vida rural chinesa", "Comida noturna chinesa", "Mercado local chinês", "Artesanato tradicional chinês", "Cozinhe com uma família chinesa", "Vilas de chá chinesas", "Rota panorâmica privada", "Dia local personalizado"],
  ar: ["تجربة الحياة الريفية الصينية", "تجربة طعام الليل الصيني", "جولة في سوق صيني محلي", "تجربة الحرف الصينية التقليدية", "الطبخ مع عائلة صينية", "تجربة قرى الشاي الصينية", "رحلة صينية خاصة ذات مناظر خلابة", "يوم محلي مصمم حسب الطلب"]
};

const localizedHighlights: Record<Exclude<Lang, "en">, string[][]> = {
  "zh-CN": [
    ["村落漫步", "本地人家", "乡村传统"],
    ["可靠摊档", "夜间街巷", "地方风味"],
    ["时令食材", "摊主交流", "日常采购"],
    ["真实工坊", "传统技法", "动手体验"],
    ["家庭厨房", "市场食材", "共用餐桌"],
    ["茶园漫步", "制茶工艺", "品茶讲解"],
    ["私人车辆", "灵活停靠", "多日路线"],
    ["个人路线", "本地背景", "弹性节奏"]
  ],
  "zh-TW": [
    ["村落漫步", "在地人家", "鄉村傳統"],
    ["可靠攤檔", "夜間街巷", "地方風味"],
    ["時令食材", "攤主交流", "日常採買"],
    ["真實工坊", "傳統技法", "動手體驗"],
    ["家庭廚房", "市場食材", "共用餐桌"],
    ["茶園漫步", "製茶工藝", "品茶講解"],
    ["私人車輛", "彈性停靠", "多日路線"],
    ["個人路線", "在地背景", "彈性節奏"]
  ],
  es: [
    ["Pueblos vivos", "Casas locales", "Tradiciones rurales"],
    ["Puestos fiables", "Calles nocturnas", "Sabores regionales"],
    ["Producto de temporada", "Vendedores locales", "Compra diaria"],
    ["Talleres reales", "Tecnicas maestras", "Practica manual"],
    ["Cocina familiar", "Mercado local", "Mesa compartida"],
    ["Campos de te", "Proceso artesanal", "Cata guiada"],
    ["Vehiculo privado", "Paradas flexibles", "Rutas de varios dias"],
    ["Ruta personal", "Contexto local", "Ritmo flexible"]
  ],
  pt: [
    ["Vilas vivas", "Casas locais", "Tradicoes rurais"],
    ["Bancas confiaveis", "Ruas noturnas", "Sabores regionais"],
    ["Produtos da estacao", "Vendedores locais", "Compra diaria"],
    ["Oficinas reais", "Tecnicas tradicionais", "Pratica manual"],
    ["Cozinha familiar", "Mercado local", "Mesa compartilhada"],
    ["Campos de cha", "Processo artesanal", "Degustacao guiada"],
    ["Veiculo privado", "Paradas flexiveis", "Rotas de varios dias"],
    ["Rota pessoal", "Contexto local", "Ritmo flexivel"]
  ],
  ar: [
    ["قرى حية", "بيوت محلية", "تقاليد ريفية"],
    ["أكشاك موثوقة", "شوارع ليلية", "نكهات إقليمية"],
    ["مكونات موسمية", "لقاء الباعة", "تسوق يومي"],
    ["ورش حقيقية", "تقنيات تقليدية", "تجربة يدوية"],
    ["مطبخ عائلي", "مكونات السوق", "مائدة مشتركة"],
    ["مزارع شاي", "صناعة الشاي", "تذوق موجه"],
    ["سيارة خاصة", "توقف مرن", "مسارات متعددة الأيام"],
    ["مسار شخصي", "سياق محلي", "إيقاع مرن"]
  ]
};

export function getExperienceCopy(lang: Lang, slug: string): Copy {
  const base = en[slug];
  const index = experiences.findIndex((item) => item.slug === slug);
  if (lang === "en") return base;
  if (lang === "zh-CN" || lang === "zh-TW") return {
    title: titles[lang][index],
    intro: ["走进中国不同地区真实的村落日常。", "在夜色中品尝不同城市的地道味道。", "从菜市场读懂中国人的日常生活。", "走进工坊，认识仍在延续的传统技艺。", "共享厨房、餐桌与真实交流。", "走进茶山与茶村，品尝当季风土。", "按照自己的节奏穿行中国山水。", "完全围绕你的兴趣设计一整天。"][index],
    description: ["从五个各具特色的村落中选择一处，深入了解当地景观、建筑、饮食与生活传统。", "在五座美食城市中探访可靠摊档和街坊小店，由本地向导讲解食材、习俗与地方风味。", "在五座差异鲜明的城市里认识摊主、了解地方食材，观察当地家庭如何采购与烹饪。", "进入五个著名手工艺地区的真实工坊，通过交流、演示与简单动手体验理解传统技艺。", "从五种地域家庭厨房中选择一处，一起买菜、烹饪并与当地家庭共享日常餐桌。", "走进五个主要茶区之一，拜访茶农，了解风土、品种与工艺如何共同塑造一杯茶。", "从五条风景公路路线中选择一条，配备新能源私人用车与本地司机，并可灵活停靠。", "从五座城市中选择起点，再根据兴趣、体力、饮食偏好与旅行节奏定制行程。 "][index],
    highlights: localizedHighlights[lang][index]
  };
  const generic = {
    es: ["Una experiencia privada y auténtica con cinco destinos seleccionados.", "Elige un lugar y descubre su proyecto específico con contexto local."],
    pt: ["Uma experiência privada e autêntica com cinco destinos selecionados.", "Escolha um lugar e conheça seu projeto específico com contexto local."],
    ar: ["تجربة خاصة وأصيلة مع خمسة مواقع مختارة.", "اختر موقعًا واكتشف برنامجه المحدد مع سياق محلي."]
  }[lang];
  return { title: titles[lang][index], intro: generic[0], description: generic[1], highlights: localizedHighlights[lang][index] };
}

export function getExperience(slug: string) {
  return experiences.find((item) => item.slug === slug);
}

export function getExperienceLocationCopy(lang: Lang, location: ExperienceLocation) {
  if (lang === "zh-CN" || lang === "zh-TW") return { name: location.nameZh, region: location.regionZh, project: location.projectZh, description: location.descriptionZh };
  if (lang === "es") return { name: location.name, region: location.region, project: `Experiencia local en ${location.name}`, description: `Un proyecto privado seleccionado para conocer el paisaje, la cultura y la vida cotidiana de ${location.name}, con guía local y un ritmo flexible.` };
  if (lang === "pt") return { name: location.name, region: location.region, project: `Experiência local em ${location.name}`, description: `Um projeto privado selecionado para conhecer a paisagem, a cultura e a vida cotidiana de ${location.name}, com guia local e ritmo flexível.` };
  if (lang === "ar") return { name: location.name, region: location.region, project: `تجربة محلية في ${location.name}`, description: `برنامج خاص مختار للتعرف على طبيعة ${location.name} وثقافتها وحياتها اليومية، مع دليل محلي وإيقاع مرن.` };
  return { name: location.name, region: location.region, project: location.project, description: location.description };
}
