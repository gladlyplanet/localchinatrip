import type { Lang } from "@/components/LanguageProvider";
import type { ExperienceLocation } from "@/lib/experiences";
import type { ProvinceRecommendation, RecommendationKind } from "@/lib/province-recommendations";

type Localized = {
  en: string;
  zh: string;
};

type MediaText = {
  image: string;
  fallbackImage?: string;
  caption: Localized;
  overview: Localized;
  experience: Localized;
};

const kindImages: Record<RecommendationKind, string> = {
  heritage: "/images/experience-beijing-hutong.jpg",
  nature: "/images/experience-guilin-ride.jpg",
  food: "/images/real-night-market.jpg",
  village: "/images/experience-hongcun.jpg",
  craft: "/images/experience-suzhou-craft.jpg",
  spiritual: "/images/real-hero-hongcun.jpg",
  city: "/images/experience-beijing-hutong.jpg",
  road: "/images/experience-guilin-ride.jpg",
  market: "/images/experience-chengdu-market.jpg",
  tea: "/images/experience-longjing-tea.jpg",
  coast: "/images/experience-guilin-ride.jpg"
};

const realImages = {
  suzhouCuisine: "/images/experience-suzhou-cuisine.jpg",
  yangshuoFarmFood: "/images/experience-yangshuo-farm-food.jpg",
  xianFoodTable: "/images/experience-xian-noodles.jpg",
  beijingDumplings: "/images/experience-beijing-dumplings.jpg",
  suzhouEmbroidery: "/images/experience-suzhou-embroidery.jpg",
  jingdezhenPorcelain: "/images/experience-jingdezhen-porcelain.jpg",
  miaoCraft: "/images/experience-miao-craft.jpg",
  quanzhouPuppets: "/images/experience-quanzhou-puppet.jpg",
  shiwanCeramics: "/images/experience-shiwan-ceramics.jpg",
  longjingFields: "/images/experience-longjing-fields.jpg",
  wuyiTea: "/images/experience-wuyi-tea.jpg",
  guoliangVillage: "/images/experience-guoliang-village.jpg",
  yuanyangTerraces: "/images/experience-yuanyang-terraces.jpg",
  longjiTerraces: "/images/experience-longji-terraces.jpg",
  chengduFood: "/images/experience-chengdu-food.jpg",
  changshaFood: "/images/experience-changsha-food.jpg",
  guangzhouFood: "/images/experience-guangzhou-xihua-snacks-real.jpg",
  guangzhouOldCity: "/images/experience-guangzhou-qilou-street-real.jpg?v=2",
  kashgarBazaar: "/images/experience-kashgar-bazaar.jpg",
  guangzhouMarket: "/images/destination-liwan-market-interior-crop-real.jpg?v=2",
  guangzhouFreshMarket: "/images/experience-liwan-fresh-market-stalls-real.jpg?v=2",
  shanghaiLanes: "/images/experience-shanghai-lanes.jpg",
  westLake: "/images/experience-west-lake.jpg",
  beijiVillage: "/images/experience-beiji-village-real.jpg",
  kaifengNightMarket: "/images/experience-kaifeng-night-market-real.jpg",
  kunmingZhuanxinMarket: "/images/experience-kunming-zhuanxin-market.jpg",
  shanghaiWetMarket: "/images/experience-shanghai-wet-market.jpg",
  mengdingTea: "/images/experience-mengding-tea.jpg",
  wuhanEastLake: "/images/experience-wuhan-east-lake-real.jpg",
  anxiTeaGarden: "/images/experience-anxi-tea-garden.jpg",
  jingmaiTeaForest: "/images/experience-jingmai-tea-forest-real.png",
  daliShaxi: "/images/experience-dali-shaxi-real.jpg",
  westernSichuanDanba: "/images/experience-western-sichuan-danba-real.jpg",
  iliNalati: "/images/experience-ili-nalati-real.jpg",
  qinghaiZhangye: "/images/experience-qinghai-zhangye-real.webp"
};

const verifiedRecommendationImages: Record<string, string> = {
  "Hongcun": "/images/experience-hongcun.jpg",
  "Zhangjiajie": "/images/destination-zhangjiajie-real.jpg",
  "Zhangjiajie National Forest Park": "/images/destination-zhangjiajie-real.jpg",
  "Longjing Village": realImages.longjingFields,
  "West Lake": realImages.westLake,
  "Changsha Night Food": realImages.changshaFood,
  "Guilin Rice Noodle Trail": realImages.yangshuoFarmFood,
  "Chengdu Market Cooking": realImages.chengduFood,
  "Chengdu Teahouses": realImages.chengduFood,
  "Wuhan Breakfast Streets": realImages.wuhanEastLake,
  "Xi'an City Wall": realImages.xianFoodTable,
  "Muslim Quarter Xi'an": realImages.xianFoodTable,
  "Kaifeng Night Market": realImages.kaifengNightMarket,
  "Kaifeng Old City": realImages.kaifengNightMarket,
  "Kunming Zhuanxin Market": realImages.kunmingZhuanxinMarket,
  "Liwan Food Market": realImages.guangzhouMarket,
  "Nanning Morning Market": realImages.guangzhouFreshMarket,
  "Kaili Market": realImages.guangzhouFreshMarket,
  "Red Market Macau": "/images/destination-macau-red-market-real.jpg",
  "Caoyang Community Market": realImages.shanghaiWetMarket,
  "Shanghai Breakfast Trail": realImages.shanghaiWetMarket,
  "Shanghai Museum": realImages.shanghaiLanes,
  "Shikumen Lanes": realImages.shanghaiLanes,
  "Former French Concession": realImages.shanghaiLanes,
  "Kashgar Old City": realImages.kashgarBazaar,
  "Kashgar Bazaar": realImages.kashgarBazaar,
  "Hotan Bazaar": realImages.kashgarBazaar,
  "Anxi Tea Villages": realImages.anxiTeaGarden,
  "Jingmai Mountain Tea Forest": realImages.jingmaiTeaForest,
  "Wuyi Mountains": realImages.wuyiTea,
  "Lushan Cloud Tea": realImages.mengdingTea,
  "Ya'an Mengding Tea Mountain": realImages.mengdingTea,
  "Wuhan Breakfast Walk": realImages.wuhanEastLake,
  "Guangzhou Old City": realImages.guangzhouOldCity,
  "Chen Clan Ancestral Hall": realImages.guangzhouOldCity,
  "Foshan Ancestral Temple": realImages.guangzhouOldCity,
  "Chaozhou Old Town": realImages.guangzhouOldCity,
  "Dali Old Town and Erhai": realImages.daliShaxi,
  "Shaxi Ancient Town": realImages.daliShaxi,
  "Lijiang Old Town": realImages.daliShaxi,
  "Nalati Grassland": realImages.iliNalati,
  "Hulunbuir Grassland": realImages.iliNalati,
  "Zhangye Danxia": realImages.qinghaiZhangye,
  "Kuqa Grand Canyon": "/images/destination-kuqa-grand-canyon-real.jpg",
  "Mogao Caves": realImages.qinghaiZhangye,
  "Hexi Corridor Road": realImages.qinghaiZhangye,
  "Kanas Lake": "https://commons.wikimedia.org/wiki/Special:FilePath/Kanas%20Lake.jpg",
  "Yabuli": "https://commons.wikimedia.org/wiki/Special:FilePath/Sun%20Mountain%20Yabuli.jpg",
  "Yabuli Ski Area": "https://commons.wikimedia.org/wiki/Special:FilePath/Sun%20Mountain%20Yabuli.jpg",
  "Harbin Ice and Snow World": realImages.beijiVillage,
  "Beiji Village Mohe": realImages.beijiVillage,
  "Wuzhishan Rainforest": "https://commons.wikimedia.org/wiki/Special:FilePath/Wuzhi_Shan_Hainan_China.jpg",
  "Yalong Bay Tropical Forest": "/images/about-me-beach-group.jpg",
  "Sanya Coast": "/images/about-me-beach-group.jpg",
  "Boao Town": "/images/about-me-beach-group.jpg",
  "Haikou Qilou Old Street": realImages.guangzhouOldCity,
  "Tanmen Fishing Port": "/images/about-me-boat-seafood.jpg",
  "Hainan Family Kitchen": "/images/about-me-dinner-table.jpg",
  "Danba Tibetan Villages": realImages.westernSichuanDanba,
  "Jiuzhaigou Valley": realImages.westernSichuanDanba,
  "Li River": "/images/experience-guilin-ride.jpg",
  "Yangshuo Countryside": realImages.yangshuoFarmFood,
  "Longji Rice Terraces": realImages.longjiTerraces,
  "Yuanyang Rice Terraces": realImages.yuanyangTerraces,
  "Guoliang Village": realImages.guoliangVillage,
  "Beiji Village, Mohe": realImages.beijiVillage,
  "Jingdezhen": realImages.jingdezhenPorcelain,
  "Jingdezhen Porcelain Workshops": realImages.jingdezhenPorcelain,
  "Yixing Zisha Teapot Studio": realImages.jingdezhenPorcelain,
  "Suzhou Embroidery Studio": realImages.suzhouEmbroidery,
  "Suzhou Silk Embroidery": realImages.suzhouEmbroidery,
  "Suzhou Classical Gardens": realImages.suzhouCuisine,
  "Huaiyang Cuisine Kitchen": realImages.suzhouCuisine,
  "Quanzhou Puppet Workshop": realImages.quanzhouPuppets,
  "Quanzhou Maritime Heritage": realImages.quanzhouPuppets,
  "Shiwan Ceramic Studio": realImages.shiwanCeramics,
  "Miao Embroidery Workshop": realImages.miaoCraft,
  "Xijiang Miao Village": realImages.miaoCraft,
  "Red Market": "/images/destination-macau-red-market-real.jpg"
};

const specificRecommendationText: Record<string, MediaText> = {
  "Kuqa Grand Canyon": {
    image: realImages.qinghaiZhangye,
    caption: { en: "Kuqa red canyon landscape", zh: "库车红色峡谷地貌" },
    overview: { en: "Kuqa Grand Canyon is about dry red-rock valleys, narrow passages and the desert edge of southern Xinjiang, not a generic mountain view.", zh: "库车大峡谷应围绕南疆红色峡谷、干旱山体、狭窄谷道和天山南麓地貌来理解，而不是普通山景。" },
    experience: { en: "A good route should follow light, walking safety and canyon sections, while explaining how wind, water and desert climate shaped the rock walls.", zh: "游览应根据光线、步行安全和峡谷段落安排，讲清风、水和干旱气候如何塑造红色岩壁。" }
  },
  "Kanas Lake": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kanas%20Lake.jpg",
    caption: { en: "Kanas Lake, Altay, Xinjiang", zh: "新疆阿勒泰喀纳斯湖" },
    overview: { en: "Kanas Lake sits in the Altai Mountains of northern Xinjiang, where glacier-fed water, forested slopes and Tuva-Kazakh settlement create a distinct borderland landscape.", zh: "喀纳斯湖位于新疆北部阿尔泰山中，冰川水、森林山坡和图瓦、哈萨克等边地生活共同构成这里的核心气质。" },
    experience: { en: "The visit should combine lake viewpoints, village context and seasonal color, with time to understand how people live with forest, pasture and long winters.", zh: "游览应结合湖景观景点、村落背景和季节色彩，并留出时间理解当地人如何与森林、牧场和漫长冬季共处。" }
  },
  "Yabuli": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sun%20Mountain%20Yabuli.jpg",
    caption: { en: "Yabuli winter mountain area", zh: "亚布力冬季山地" },
    overview: { en: "Yabuli is known for Heilongjiang winter sports, snow-covered mountain terrain and ski facilities southeast of Harbin.", zh: "亚布力应围绕黑龙江冬季运动、哈尔滨东南方向的雪山地形和滑雪设施来介绍。" },
    experience: { en: "The route should focus on snow season, mountain views, winter clothing preparation and the wider northeast winter-travel atmosphere.", zh: "体验应聚焦雪季、山地视野、防寒准备，以及东北冬季旅行的整体氛围。" }
  },
  "Wuzhishan Rainforest": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Wuzhi_Shan_Hainan_China.jpg",
    caption: { en: "Wuzhi Mountain, central Hainan", zh: "海南中部五指山" },
    overview: { en: "Wuzhishan represents Hainan's central mountain rainforest, with humid valleys, tropical vegetation and Li ethnic cultural surroundings.", zh: "五指山雨林代表海南中部山地雨林，重点是湿润山谷、热带植被和黎族文化环境。" },
    experience: { en: "A suitable visit should be slower and nature-focused, pairing rainforest walking with local mountain-village context instead of beach-style sightseeing.", zh: "合适的体验应放慢节奏，把雨林步行与山地村落背景结合起来，而不是按海滨景点方式浏览。" }
  },
  "Yalong Bay Tropical Forest": {
    image: "/images/experience-guilin-ride.jpg",
    caption: { en: "Tropical forest viewpoint above Yalong Bay", zh: "亚龙湾上方的热带森林视野" },
    overview: { en: "Yalong Bay Tropical Forest should be introduced as a forested hill and viewpoint area above Sanya's coast, linking sea views with tropical vegetation.", zh: "亚龙湾热带森林应作为三亚海岸上方的山地森林和观景区域介绍，把海景、山路和热带植被联系起来。" },
    experience: { en: "The route should balance viewpoints, shaded walking, heat management and quieter stops away from the busiest photo platforms.", zh: "路线应平衡观景点、林荫步道、防暑节奏，并避开过度拥挤的拍照平台。" }
  },
  "Tanmen Fishing Port": {
    image: "/images/about-me-boat-seafood.jpg",
    caption: { en: "Hainan fishing and seafood experience", zh: "海南渔船与海鲜体验" },
    overview: { en: "Tanmen is best understood as a working fishing-port community on Hainan's east coast, where boats, seafood and harbor routines shape local life.", zh: "潭门渔港应作为海南东海岸仍在运转的渔港社区来理解，渔船、海鲜和港口日常是核心。" },
    experience: { en: "The visit should focus on harbor rhythm, seafood handling and fishing-family life rather than only taking a harbor panorama photo.", zh: "体验应关注港口节奏、海鲜处理和渔家生活，而不只是拍一张港口全景。" }
  },
  "Hainan Family Kitchen": {
    image: "/images/about-me-dinner-table.jpg",
    caption: { en: "Shared local meal in China", zh: "本地家庭式餐桌" },
    overview: { en: "A Hainan family-kitchen experience should center on tropical island ingredients, seafood, coconut, local sauces and the relaxed rhythm of eating together.", zh: "海南家庭厨房应围绕热带岛屿食材、海鲜、椰子、本地酱料和轻松的围桌用餐节奏展开。" },
    experience: { en: "The meal should explain ingredients, home-style preparation and how Hainan's climate and sea shape everyday food.", zh: "体验应讲清食材、家常做法，以及海南气候和海洋如何影响日常饮食。" }
  }
};

function fallbackRecommendationText(item: ProvinceRecommendation, provinceName?: string): MediaText {
  const place = provinceName ? `${item.name}, ${provinceName}` : item.name;
  const placeZh = item.nameZh;
  const kind = genericByKind[item.kind];
  const actionByKind: Record<RecommendationKind, Localized> = {
    heritage: { en: `Use ${place} to read local history through architecture, streets, objects and the people who still live around the site.`, zh: `${placeZh}适合从建筑、街巷、遗存和周边生活读懂当地历史，而不是只停留在打卡。` },
    nature: { en: `${place} should be introduced through its specific terrain, season, weather and the way local life adapts to that landscape.`, zh: `${placeZh}应结合具体地貌、季节天气和当地生活如何适应自然环境来介绍。` },
    food: { en: `${place} is a food stop where ingredients, local habits and table culture matter more than simply eating one famous dish.`, zh: `${placeZh}应围绕食材、吃法和地方餐桌习惯展开，而不是只介绍一道名菜。` },
    village: { en: `${place} is best experienced as a living community shaped by homes, lanes, work, food and family memory.`, zh: `${placeZh}应作为仍在生活的社区来理解，重点是民居、巷道、劳作、饮食和家族记忆。` },
    craft: { en: `${place} should focus on makers, materials, tools and the local aesthetic behind the craft.`, zh: `${placeZh}应聚焦手艺人、材料、工具和背后的地方审美。` },
    spiritual: { en: `${place} needs respectful pacing, with context on belief, ritual space, architecture and living practice.`, zh: `${placeZh}需要以尊重的节奏参观，讲清信仰、仪式空间、建筑和现实生活。` },
    city: { en: `${place} is best understood through streets, neighborhoods, transport, food and ordinary daily routines.`, zh: `${placeZh}最适合从街道、社区、交通、饮食和日常节奏中理解。` },
    road: { en: `${place} works as a private scenic route, with the transfer itself becoming part of the landscape experience.`, zh: `${placeZh}适合作为私人风景路线，让路途本身也成为体验的一部分。` },
    market: { en: `${place} should show vendors, ingredients, household routines and the direct conversations of daily shopping.`, zh: `${placeZh}应呈现摊主、食材、家庭采购和日常交流，而不是只看市场外观。` },
    tea: { en: `${place} should connect tea fields, growers, processing, tasting and the landscape that shapes the cup.`, zh: `${placeZh}应把茶园、茶农、制作、品鉴和山地风土联系起来。` },
    coast: { en: `${place} should link sea views with harbor life, fishing communities, temples, trade and local food.`, zh: `${placeZh}应把海景、港口生活、渔村、庙宇、贸易和地方饮食联系起来。` }
  };

  return {
    image: kind.image,
    caption: { en: place, zh: placeZh },
    overview: actionByKind[item.kind],
    experience: { en: `The route should be paced around your energy and the best local timing, with explanation tied directly to ${item.name}.`, zh: `路线应根据体力和当地最合适的时间安排，讲解内容直接围绕${placeZh}展开。` }
  };
}

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;

const recommendationMedia: Record<string, Partial<MediaText>> = {
  Hongcun: {
    image: "/images/experience-hongcun.jpg",
    caption: { en: "Hongcun, Yi County, Anhui", zh: "安徽黟县宏村" },
    overview: {
      en: "Hongcun is a Huizhou village in Yi County, near Huangshan. Its preserved waterways, white walls and courtyard houses make it one of the clearest places to understand traditional Anhui village planning.",
      zh: "宏村位于安徽黟县、靠近黄山，是典型徽州古村落。水系、白墙黛瓦和传统院落保存完整，适合了解徽州村落规划与生活方式。"
    },
    experience: {
      en: "The visit works best as a slow village walk: trace the water system, read ancestral halls and homes, then connect the architecture to family life, trade and farming rhythms.",
      zh: "这里适合用慢节奏村落漫步体验：沿水系行走，进入祠堂和民居，把建筑、家族生活、商贸历史和乡村日常联系起来。"
    }
  },
  Huangshan: {
    image: "/images/experience-guilin-ride.jpg",
    caption: { en: "Huangshan, Anhui", zh: "安徽黄山" },
    overview: {
      en: "Huangshan is known for granite peaks, pine trees, hot springs, winter snow and cloud-sea views. It is also a major subject in Chinese painting and landscape imagination.",
      zh: "黄山以花岗岩峰林、黄山松、温泉、冬雪和云海闻名，也是中国山水画和传统审美中极具代表性的景观。"
    },
    experience: {
      en: "A private day can be paced around weather and walking ability, choosing viewpoints, cableways and quieter paths so the mountain is experienced rather than rushed.",
      zh: "私人行程可根据天气和体力调整，选择观景点、索道和较安静的步道，让黄山成为真正的景观体验，而不是赶路打卡。"
    }
  },
  "Longjing Village": {
    image: "/images/experience-longjing-tea.jpg",
    caption: { en: "Longjing tea country, Hangzhou", zh: "杭州龙井茶区" },
    overview: {
      en: "Longjing is the tea-growing area in Hangzhou associated with Dragon Well green tea, tea villages, plantations and tea houses around West Lake.",
      zh: "龙井是杭州西湖周边重要茶区，与龙井绿茶、茶村、茶园和茶馆文化紧密相关。"
    },
    experience: {
      en: "The experience should include a tea-field walk, a grower conversation and a tasting that explains picking, pan-firing and seasonal differences.",
      zh: "体验重点包括茶园步行、与茶农交流，以及通过品鉴理解采摘、炒制和不同季节茶叶的差异。"
    }
  },
  "Kashgar Old City": {
    image: "/images/experience-beijing-hutong.jpg",
    caption: { en: "Kashgar Old City, Xinjiang", zh: "新疆喀什古城" },
    overview: {
      en: "Kashgar is an oasis city on the old Silk Road. The old city area, bazaars and mosque surroundings are central to understanding Uyghur urban life and trade culture.",
      zh: "喀什是古丝绸之路上的绿洲城市，古城、巴扎和清真寺周边街区是理解维吾尔城市生活与商贸文化的重要入口。"
    },
    experience: {
      en: "A good visit connects lanes, workshops, bread ovens and market life, with careful local context rather than a surface-level photo stop.",
      zh: "好的游览应把街巷、手工铺、馕坑和市场生活串联起来，配合本地背景讲解，而不是只停留在拍照。"
    }
  },
  "Forbidden City": {
    image: "/images/real-hero-hongcun.jpg",
    caption: { en: "Forbidden City, Beijing", zh: "北京故宫" },
    overview: {
      en: "The Forbidden City was the ceremonial and political center of imperial Beijing. Its axis, halls and courtyards are best understood through hierarchy, ritual and daily palace function.",
      zh: "故宫曾是北京皇城的礼制与政治中心。理解这里要从中轴线、宫殿等级、礼仪制度和宫廷日常功能入手。"
    },
    experience: {
      en: "The route can focus on quieter side courtyards, symbolic details and the contrast between imperial scale and human-scale palace life.",
      zh: "路线可避开单纯拥挤的中轴打卡，加入侧院、建筑细节和宫廷生活层面的讲解。"
    }
  },
  "West Lake": {
    image: "/images/real-hero-hongcun.jpg",
    caption: { en: "West Lake, Hangzhou", zh: "杭州西湖" },
    overview: {
      en: "West Lake is Hangzhou's classic cultural landscape, shaped by causeways, gardens, temples, water views and centuries of poetry and painting.",
      zh: "西湖是杭州最具代表性的文化景观，由堤岸、园林、寺院、水景和长期诗画传统共同塑造。"
    },
    experience: {
      en: "A private route should balance the lake, nearby neighborhoods and tea country, avoiding the busiest sections when possible.",
      zh: "私人路线应把湖景、周边街区和茶区结合起来，并尽量避开最拥挤的动线。"
    }
  }
};

const locationMedia: Record<string, MediaText> = {
  hongcun: { image: "/images/experience-hongcun.jpg", caption: { en: "Hongcun, Anhui", zh: "安徽宏村" }, overview: { en: "Hongcun is a Huizhou village known for waterways, ancestral halls and white-walled courtyard homes.", zh: "宏村以水系、祠堂和白墙黛瓦的徽派院落闻名。" }, experience: { en: "The village-life visit focuses on lanes, family halls, water planning and how Huizhou households organized daily life.", zh: "村落体验重点放在街巷、宗族祠堂、水系规划和徽州人家的日常结构。" } },
  "beiji-village": { image: realImages.beijiVillage, caption: { en: "Far-north village life", zh: "中国北方边境村落生活" }, overview: { en: "Beiji Village near Mohe represents China's far north, with forest climate, border culture and strong seasonal contrast.", zh: "漠河北极村代表中国极北地区，森林气候、边境文化和强烈季节变化是核心特点。" }, experience: { en: "The experience should emphasize local homes, northern food, winter and summer rhythms, and life along the Heilong River.", zh: "体验应围绕当地人家、东北饮食、冬夏节奏和黑龙江沿岸生活展开。" } },
  guoliang: { image: realImages.guoliangVillage, caption: { en: "Taihang cliff village", zh: "太行山悬崖村落" }, overview: { en: "Guoliang is associated with Taihang stone houses and the cliff road carved through the mountain.", zh: "郭亮村与太行山石头民居和人工开凿的挂壁公路相关。" }, experience: { en: "The visit should explain mountain survival, stone architecture and why the cliff road changed village mobility.", zh: "体验重点是山地生活、石头建筑，以及挂壁公路如何改变村落交通。" } },
  azheke: { image: realImages.yuanyangTerraces, caption: { en: "Hani terrace village", zh: "哈尼梯田村落" }, overview: { en: "Azheke sits within the Yuanyang Hani rice terrace landscape, where forests, water channels and villages form one system.", zh: "阿者科位于元阳哈尼梯田景观中，森林、水渠、村落和梯田构成完整系统。" }, experience: { en: "The day should connect mushroom-shaped houses, terrace farming, irrigation and Hani community life.", zh: "体验应串联蘑菇房、梯田农耕、水利系统和哈尼社区生活。" } },
  pingan: { image: realImages.longjiTerraces, caption: { en: "Longji rice terraces", zh: "龙脊梯田" }, overview: { en: "Ping'an Village is part of the Longji terrace area, shaped by Zhuang mountain farming and layered rice fields.", zh: "平安寨属于龙脊梯田区域，由壮族山地农耕和层叠稻田塑造。" }, experience: { en: "The route should pair terrace viewpoints with village lanes, seasonal farming and local mountain meals.", zh: "路线应结合梯田观景、村寨街巷、季节农事和山地饭菜。" } },

  "xian-muslim-quarter": { image: "/images/experience-xian-night.jpg", caption: { en: "Xi'an night food lanes", zh: "西安夜间美食街巷" }, overview: { en: "Xi'an's Muslim Quarter reflects Silk Road history and northwest food culture through breads, noodles, grilled meat and sweets.", zh: "西安回民街及周边通过馍、面食、烤肉和甜食呈现丝路历史与西北饮食。" }, experience: { en: "This night route compares trusted stalls and explains how Hui food traditions became part of Xi'an daily life.", zh: "夜食路线应比较可靠小店与摊位，讲清回族饮食传统如何融入西安生活。" } },
  "chengdu-kuixinglou": { image: realImages.chengduFood, caption: { en: "Chengdu evening food", zh: "成都夜间小吃" }, overview: { en: "Kuixinglou and nearby Chengdu food streets are good for skewers, noodles, wontons and informal Sichuan snacks.", zh: "奎星楼一带适合体验串串、面食、抄手和成都街头小吃。" }, experience: { en: "The tasting should balance spice, sauces, teahouse-style ease and neighborhood stories instead of only eating hot dishes.", zh: "体验要把麻辣、蘸料、成都松弛感和街区故事结合起来，而不只是吃辣。" } },
  "changsha-dongguashan": { image: realImages.changshaFood, caption: { en: "Changsha late-night food", zh: "长沙深夜食堂" }, overview: { en: "Dongguashan is associated with Changsha's late-night eating culture, grilled snacks and bold Hunan flavors.", zh: "冬瓜山代表长沙夜宵文化、烧烤小吃和鲜辣直接的湖南味道。" }, experience: { en: "The route should explain Hunan spice, rice noodles, grilled snacks and how locals socialize after dark.", zh: "路线应讲清湖南辣味、米粉、烧烤小吃，以及长沙人的夜间社交方式。" } },
  "kaifeng-drum-tower": { image: realImages.kaifengNightMarket, caption: { en: "Kaifeng old-capital night market", zh: "开封古都夜市" }, overview: { en: "Kaifeng night markets connect Henan snacks with an old capital's urban food tradition.", zh: "开封夜市把河南小吃和古都城市饮食传统连接起来。" }, experience: { en: "The experience should link dishes to Song-dynasty city memory, market routines and local snack culture.", zh: "体验应把小吃、宋都记忆、夜市秩序和本地饮食文化联系起来。" } },
  "guangzhou-xihua": { image: realImages.guangzhouFood, caption: { en: "Guangzhou Xihua Road snack shops", zh: "广州西华路街坊小吃" }, overview: { en: "Xihua Road is a useful window into Cantonese comfort food, breakfast items, desserts and neighborhood shops.", zh: "西华路适合了解广府日常小吃、早茶点心、糖水和街坊老店。" }, experience: { en: "The tasting should be gentle and varied, moving from rice rolls and noodles to soups, desserts and local shop culture.", zh: "品尝应轻松多样，从肠粉、面食到汤水、糖水和街坊店文化。" } },

  "kunming-zhuanxin": { image: realImages.kunmingZhuanxinMarket, caption: { en: "Kunming wet market ingredients", zh: "昆明菜市场食材" }, overview: { en: "Zhuanxin Market is known for Yunnan mushrooms, herbs, flowers, pickles and plateau ingredients.", zh: "篆新市场以云南菌菇、香草、鲜花、腌菜和高原食材见长。" }, experience: { en: "The walk should decode unfamiliar ingredients and explain how Yunnan diversity appears in daily cooking.", zh: "市场漫步应解释陌生食材，并说明云南多元风味如何进入日常餐桌。" } },
  "chengdu-neighborhood": { image: "/images/experience-chengdu-market.jpg", caption: { en: "Chengdu neighborhood market", zh: "成都社区菜市场" }, overview: { en: "A Chengdu neighborhood market reveals the pantry behind Sichuan cooking: doubanjiang, chilies, noodles and greens.", zh: "成都社区菜市能看到川菜厨房基础：豆瓣、辣椒、鲜面和时令蔬菜。" }, experience: { en: "The experience should connect ingredients to dishes guests later recognize at a Sichuan table.", zh: "体验应把食材和之后餐桌上的川味菜品对应起来。" } },
  "kashgar-bazaar": { image: realImages.kashgarBazaar, caption: { en: "Kashgar bazaar", zh: "喀什巴扎" }, overview: { en: "Kashgar bazaars carry oasis trade culture through spices, breads, dried fruit, textiles and craft stalls.", zh: "喀什巴扎通过香料、馕、干果、织物和手工摊位呈现绿洲商贸文化。" }, experience: { en: "The market walk should focus on Silk Road exchange, vendor life and Uyghur food traditions.", zh: "市场体验应聚焦丝路交流、摊主生活和维吾尔饮食传统。" } },
  "shanghai-caoyang": { image: realImages.shanghaiWetMarket, caption: { en: "Shanghai community market", zh: "上海社区市场" }, overview: { en: "Caoyang-style community markets show ordinary Shanghai life through produce, freshwater foods and prepared dishes.", zh: "上海社区市场通过蔬菜、河鲜和熟食呈现城市日常生活。" }, experience: { en: "The visit should read local shopping habits, seasonal foods and how old neighborhoods still function.", zh: "体验应观察本地采购习惯、季节食材和老社区的运转方式。" } },
  "guangzhou-liwan": { image: realImages.guangzhouFreshMarket, caption: { en: "Liwan fresh seafood and market stalls", zh: "荔湾鲜活食材摊位" }, overview: { en: "Liwan markets show Cantonese freshness, roast meats, soups, seafood and preserved foods through everyday shopping.", zh: "荔湾市场通过鲜活海鲜、烧味、汤料、腌制品和街坊采购呈现广府饮食。" }, experience: { en: "The route should explain why Cantonese cooking values freshness, light seasoning, slow soup and the original taste of ingredients.", zh: "路线应讲清广府菜为何重视鲜、清、慢火汤和食材本味。" } },

  "suzhou-embroidery": { image: realImages.suzhouEmbroidery, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Suzhou embroidery craft", zh: "苏州刺绣工艺" }, overview: { en: "Suzhou embroidery is known for fine silk threads, delicate color transitions and patient hand technique.", zh: "苏绣以细丝线、微妙色阶和耐心手工针法著称。" }, experience: { en: "The workshop should focus on needle technique, silk materials and how Jiangnan aesthetics appear in craft.", zh: "工坊体验应围绕针法、丝线材料和江南审美如何体现在手艺中。" } },
  "jingdezhen-ceramics": { image: realImages.jingdezhenPorcelain, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Jingdezhen porcelain studio", zh: "景德镇瓷器工坊" }, overview: { en: "Jingdezhen is China's historic porcelain center, with studios for forming, glazing, painting and firing.", zh: "景德镇是中国历史瓷都，工坊涵盖拉坯、施釉、绘制和烧成。" }, experience: { en: "The session should compare clay, glaze, kiln and hand-painting rather than treating ceramics as a souvenir stop.", zh: "体验应比较泥料、釉色、窑火和手绘，而不是把瓷器当普通纪念品。" } },
  "kaili-miao": { image: realImages.miaoCraft, caption: { en: "Miao textile and silver craft", zh: "苗族织绣与银饰" }, overview: { en: "Kaili and nearby Miao villages are associated with embroidery, indigo dye, weaving and silver ornaments.", zh: "凯里及周边苗寨与刺绣、蓝染、织造和银饰工艺相关。" }, experience: { en: "The visit should explain how patterns, silver and textiles carry identity, family memory and festival meaning.", zh: "体验应说明纹样、银饰和织物如何承载身份、家族记忆和节庆意义。" } },
  "quanzhou-puppets": { image: realImages.quanzhouPuppets, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Quanzhou puppet tradition", zh: "泉州木偶传统" }, overview: { en: "Quanzhou puppet craft sits inside a maritime Silk Road city with layered religious and performance traditions.", zh: "泉州木偶工艺处在海丝城市、多元信仰和表演传统的背景中。" }, experience: { en: "The experience should connect carving, manipulation and local opera with Quanzhou's port-city culture.", zh: "体验应把雕刻、操偶、地方戏和泉州港口文化联系起来。" } },
  "shiwan-ceramics": { image: realImages.shiwanCeramics, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Shiwan ceramic sculpture", zh: "石湾陶塑" }, overview: { en: "Shiwan in Foshan is known for expressive Lingnan ceramic sculpture and kiln traditions.", zh: "佛山石湾以富有表现力的岭南陶塑和窑火传统闻名。" }, experience: { en: "The workshop should highlight sculptural expression, clay handling and Lingnan folk aesthetics.", zh: "工坊体验应突出造型表现、泥塑手感和岭南民间审美。" } },

  "chengdu-family": { image: "/images/experience-chengdu-cooking.jpg", caption: { en: "Home-style Sichuan cooking", zh: "川味家庭厨房" }, overview: { en: "Chengdu home cooking depends on fermented sauces, fresh aromatics, balanced seasoning and relaxed table culture.", zh: "成都家庭菜依靠豆瓣、香料、复合调味和轻松的餐桌氛围。" }, experience: { en: "Shop with the host, prepare daily dishes and sit down to understand Sichuan hospitality around the family table.", zh: "和主人买菜、做家常菜，再围桌用餐，理解四川家庭待客方式。" } },
  "beijing-hutong-family": { image: realImages.beijingDumplings, fallbackImage: "/images/experience-chengdu-cooking.jpg", caption: { en: "Beijing hutong dumpling kitchen", zh: "北京胡同包饺子体验" }, overview: { en: "A hutong kitchen connects courtyard life with northern staples such as dumplings, noodles and seasonal vegetables.", zh: "胡同厨房把院落生活与饺子、面食和北方时令菜联系起来。" }, experience: { en: "The activity should include folding dumplings, hearing courtyard stories and understanding old Beijing family rhythms.", zh: "体验应包含包饺子、听院落故事和理解老北京家庭节奏。" } },
  "yangshuo-farmhouse": { image: realImages.yangshuoFarmFood, fallbackImage: "/images/experience-chengdu-cooking.jpg", caption: { en: "Yangshuo farmhouse food", zh: "阳朔农家饭" }, overview: { en: "Yangshuo farmhouse cooking is shaped by karst countryside, seasonal vegetables and simple rural techniques.", zh: "阳朔农家菜由喀斯特田园、时令蔬菜和朴素乡村做法塑造。" }, experience: { en: "Cook with local produce, compare farmhouse flavors and connect the meal to the surrounding village landscape.", zh: "用本地食材做饭，比较农家风味，并把餐桌和周边乡村景观联系起来。" } },
  "suzhou-family": { image: realImages.suzhouCuisine, fallbackImage: "/images/experience-chengdu-cooking.jpg", caption: { en: "Suzhou seasonal cuisine", zh: "苏州时令家常菜" }, overview: { en: "Suzhou home cooking tends toward seasonal, delicate flavors built around river-and-lake ingredients.", zh: "苏州家常菜偏重时令、细腻和河湖鲜味。" }, experience: { en: "The kitchen experience should explain Jiangnan sweetness, freshness and careful presentation.", zh: "厨房体验应讲清江南菜的清鲜、微甜和细致呈现。" } },
  "xian-family": { image: realImages.xianFoodTable, fallbackImage: "/images/experience-chengdu-cooking.jpg", caption: { en: "Xi'an northwest wheat-food table", zh: "西安西北面食餐桌" }, overview: { en: "Xi'an family cooking is built around wheat foods, hand-shaped noodles, dumplings and bold northwest seasoning.", zh: "西安家庭饮食以小麦面食、手工面、饺子和西北风味为基础。" }, experience: { en: "Guests should learn hand techniques, taste noodle textures and understand why wheat defines the region's table.", zh: "体验应学习手工技法、比较面食口感，并理解小麦如何定义当地餐桌。" } },

  longjing: { image: realImages.longjingFields, caption: { en: "Longjing tea fields near Hangzhou", zh: "杭州龙井茶园" }, overview: { en: "Longjing tea country links West Lake scenery with village tea gardens and pan-fired green tea craft.", zh: "龙井茶区把西湖风景、茶村生活和炒青绿茶工艺连接在一起。" }, experience: { en: "The day should include field walking, tea-maker context and tasting by aroma, leaf shape and firing style.", zh: "体验应包含茶园步行、制茶讲解，以及围绕香气、叶形和炒制的品鉴。" } },
  wuyi: { image: realImages.wuyiTea, caption: { en: "Wuyi rock tea landscape", zh: "武夷岩茶山场" }, overview: { en: "Wuyi tea grows in a dramatic cliff-and-river landscape associated with rock tea and roasting craft.", zh: "武夷茶生长在丹霞岩壁与溪流之间，与岩茶和焙火工艺相关。" }, experience: { en: "The visit should explain mountain terrain, roasting levels and why rock tea tastes mineral and layered.", zh: "体验应说明山场、焙火程度，以及岩茶为何有岩韵和层次。" } },
  anxi: { image: realImages.anxiTeaGarden, caption: { en: "Anxi Tieguanyin tea villages", zh: "安溪铁观音茶村" }, overview: { en: "Anxi is closely linked to Tieguanyin oolong, family tea gardens and complex processing stages.", zh: "安溪与铁观音乌龙茶、家庭茶园和复杂制茶工序紧密相关。" }, experience: { en: "The experience should focus on shaking, oxidation, roasting and how aroma is built step by step.", zh: "体验应聚焦摇青、发酵、焙火，以及香气如何一步步形成。" } },
  jingmai: { image: realImages.jingmaiTeaForest, caption: { en: "Jingmai ancient tea forest", zh: "景迈山古茶林" }, overview: { en: "Jingmai Mountain is known for ancient tea forests where tea, villages and belief systems developed together.", zh: "景迈山以古茶林著称，茶树、村寨和信仰系统长期共生。" }, experience: { en: "The route should connect old tea trees, village life and the cultural landscape of tea cultivation.", zh: "路线应连接古茶树、村寨生活和茶叶种植形成的文化景观。" } },
  mengding: { image: realImages.mengdingTea, caption: { en: "Mengding Mountain tea heritage", zh: "蒙顶山茶文化" }, overview: { en: "Mengding Mountain near Ya'an is associated with historic green-tea culture and mountain tea gardens.", zh: "雅安蒙顶山与历史悠久的绿茶文化和山地茶园相关。" }, experience: { en: "The day should compare heritage stories, green-tea making and quiet mountain tea rituals.", zh: "体验应比较茶史故事、绿茶制作和山中茶礼。" } },

  "guilin-yangshuo": { image: "/images/experience-guilin-ride.jpg", caption: { en: "Guilin to Yangshuo karst road", zh: "桂林至阳朔喀斯特公路" }, overview: { en: "The Guilin-Yangshuo route is defined by rivers, limestone peaks, villages and flexible scenic stops.", zh: "桂林至阳朔路线以河流、峰林、村落和灵活观景点为核心。" }, experience: { en: "A private ride can stop for viewpoints, village lanes and riverside pauses instead of following a fixed group route.", zh: "私人用车可停靠观景点、村巷和河边，而不必跟随固定团队路线。" } },
  "dali-lijiang": { image: realImages.daliShaxi, caption: { en: "Northwest Yunnan road route", zh: "滇西北公路路线" }, overview: { en: "Dali, Shaxi and Lijiang connect old towns, Bai and Naxi culture, mountain roads and village stays.", zh: "大理、沙溪和丽江串联古城、白族与纳西文化、山地公路和村落停留。" }, experience: { en: "The ride should slow down for old towns, mountain views, local meals and minority-cultural context.", zh: "路线应为古镇、山景、本地餐食和民族文化背景留出时间。" } },
  "western-sichuan": { image: realImages.westernSichuanDanba, caption: { en: "Western Sichuan mountain road", zh: "川西山地公路" }, overview: { en: "Kangding and Danba routes move from Chengdu into Tibetan and Qiang mountain communities.", zh: "康定与丹巴路线从成都进入藏羌山地社区。" }, experience: { en: "The journey should account for altitude, weather, valley scenery and respectful village stops.", zh: "行程应考虑海拔、天气、峡谷风景和尊重当地的村落停靠。" } },
  ili: { image: realImages.iliNalati, caption: { en: "Ili grassland journey", zh: "伊犁草原公路" }, overview: { en: "Ili combines grasslands, valleys, small towns and seasonal flower landscapes across western Xinjiang.", zh: "伊犁结合草原、河谷、小城和新疆西部季节花海景观。" }, experience: { en: "The route should be multi-day, flexible and paced around weather, grassland light and local Kazakh life.", zh: "路线适合多日灵活安排，围绕天气、草原光线和哈萨克族生活节奏展开。" } },
  "qinghai-gansu": { image: realImages.qinghaiZhangye, caption: { en: "Qinghai-Gansu plateau route", zh: "青甘高原路线" }, overview: { en: "Qinghai Lake to Zhangye connects plateau lake scenery, open roads and the Hexi Corridor.", zh: "青海湖至张掖连接高原湖泊、开阔公路和河西走廊。" }, experience: { en: "The drive should manage altitude and distance while adding scenic, food and Silk Road stops.", zh: "行程应兼顾海拔和距离，同时加入风景、饮食和丝路停靠。" } },

  "beijing-day": { image: "/images/experience-beijing-hutong.jpg", caption: { en: "Beijing hutong neighborhoods", zh: "北京胡同街区" }, overview: { en: "A Beijing custom day can connect hutongs, imperial history, neighborhood food and contemporary local life.", zh: "北京定制一日可连接胡同、皇家历史、街区饮食和当代生活。" }, experience: { en: "The day should choose fewer stops with better context, based on interest, energy and traffic.", zh: "行程应按兴趣、体力和交通选择少而深入的地点。" } },
  "shanghai-day": { image: realImages.shanghaiLanes, caption: { en: "Shanghai lanes and waterfront", zh: "上海里弄与滨水空间" }, overview: { en: "A Shanghai day can move between old lanes, design streets, neighborhood food and the waterfront.", zh: "上海一日可串联老里弄、设计街区、社区饮食和滨水空间。" }, experience: { en: "The route should compare historic concessions, local neighborhoods and the city's contemporary rhythm.", zh: "路线应比较历史租界、普通社区和当代上海节奏。" } },
  "hangzhou-day": { image: realImages.westLake, caption: { en: "Hangzhou West Lake and tea village", zh: "杭州西湖与茶村" }, overview: { en: "Hangzhou works best when West Lake scenery is paired with tea villages and quieter local neighborhoods.", zh: "杭州最适合把西湖景观、茶村和安静本地街区结合起来。" }, experience: { en: "The custom day should avoid only circling the lake and include tea, gardens and slow neighborhood time.", zh: "定制一日不应只绕湖，应加入茶、园林和慢节奏街区时间。" } },
  "guangzhou-day": { image: realImages.guangzhouOldCity, caption: { en: "Guangzhou old city and food", zh: "广州老城与广府饮食" }, overview: { en: "Guangzhou's old city is read through arcades, ancestral halls, markets, tea and Cantonese food.", zh: "广州老城可通过骑楼、祠堂、市场、茶楼和广府饮食来理解。" }, experience: { en: "The route should connect architecture, markets and food so Cantonese culture feels practical and alive.", zh: "路线应把建筑、市场和饮食连接起来，让广府文化真实可感。" } },
  "wuhan-day": { image: realImages.wuhanEastLake, caption: { en: "Wuhan river city day", zh: "武汉江城一日" }, overview: { en: "Wuhan combines the Yangtze riverfront, East Lake, old streets, breakfast culture and direct local energy.", zh: "武汉结合长江江岸、东湖、老街、过早文化和鲜明城市性格。" }, experience: { en: "A custom day should include breakfast, river views, lake time and neighborhood stories.", zh: "定制一日应包含过早、江景、东湖时间和街区故事。" } }
};

const genericByKind: Record<RecommendationKind, MediaText> = {
  heritage: {
    image: kindImages.heritage,
    caption: { en: "Historic architecture and local context", zh: "历史建筑与本地背景" },
    overview: { en: "This site is best read through its architecture, historical layers and the people who shaped the surrounding city or village.", zh: "这个地点适合从建筑、历史层次和周边城市或村落的人文关系来理解。" },
    experience: { en: "The visit should connect visible details with larger historical context, leaving time for slower observation rather than only taking photos.", zh: "游览应把可见细节与更大的历史背景连接起来，留出观察时间，而不只是拍照。" }
  },
  nature: {
    image: kindImages.nature,
    caption: { en: "Chinese landscape route", zh: "中国自然景观路线" },
    overview: { en: "The value of this place is in its landscape form, seasonal light and how local life adapts to the terrain.", zh: "这里的价值在于地貌、季节光线，以及当地生活如何适应自然环境。" },
    experience: { en: "The route should be paced around weather, walking ability and the best viewpoints of the day.", zh: "路线应根据天气、体力和当天最合适的观景点安排。" }
  },
  food: {
    image: kindImages.food,
    caption: { en: "Local food culture", zh: "地方饮食文化" },
    overview: { en: "Food here is a practical way to understand migration, climate, ingredients and local social life.", zh: "饮食是理解当地迁徙、气候、食材和社会生活的直接方式。" },
    experience: { en: "The experience should compare dishes, ingredients and eating customs, not just move from one snack to another.", zh: "体验应比较菜品、食材和吃法习惯，而不是简单连续吃小吃。" }
  },
  village: {
    image: kindImages.village,
    caption: { en: "Village life and traditional houses", zh: "村落生活与传统民居" },
    overview: { en: "This place is strongest when approached as a living community shaped by homes, fields, water and family memory.", zh: "这里应作为由民居、田地、水系和家族记忆塑造的生活社区来理解。" },
    experience: { en: "A slower walk can connect houses, lanes, food and local routines into one coherent village story.", zh: "慢行可以把民居、巷道、饮食和日常节奏连接成完整的村落故事。" }
  },
  craft: {
    image: kindImages.craft,
    caption: { en: "Traditional Chinese craft", zh: "中国传统手工艺" },
    overview: { en: "The craft value lies in materials, hand skills, local aesthetics and the workshop knowledge passed between makers.", zh: "手工艺的价值在于材料、手上功夫、地方审美和工坊传承。" },
    experience: { en: "A good session combines demonstration, conversation and a simple hands-on element where conditions allow.", zh: "好的体验应包括演示、交流，并在条件允许时加入简单动手环节。" }
  },
  spiritual: {
    image: kindImages.spiritual,
    caption: { en: "Sacred culture and architecture", zh: "宗教文化与建筑" },
    overview: { en: "This place should be visited with respect for belief, ritual space, architecture and living practice.", zh: "这里应以尊重信仰、仪式空间、建筑和当代实践的方式参观。" },
    experience: { en: "The guide should explain etiquette, symbolism and historical context before entering sensitive spaces.", zh: "进入相关空间前，应先讲清礼仪、象征和历史背景。" }
  },
  city: {
    image: kindImages.city,
    caption: { en: "Local city walk", zh: "本地城市漫步" },
    overview: { en: "The city is best understood through streets, neighborhoods, transport, food and the small routines of daily life.", zh: "城市最好从街道、社区、交通、饮食和日常细节中理解。" },
    experience: { en: "The route should mix landmarks with ordinary places so the city feels lived-in, not staged.", zh: "路线应把地标和普通生活场景结合起来，让城市显得真实而不是被包装。" }
  },
  road: {
    image: kindImages.road,
    caption: { en: "Private scenic road journey", zh: "私人风景公路旅行" },
    overview: { en: "This route is about the changing landscape between places, with flexible stops that make the transfer part of the journey.", zh: "这类路线重点在地点之间变化的风景，以及让交通本身成为旅行的一部分。" },
    experience: { en: "Private transport allows better timing, rest stops and short detours when weather or interest changes.", zh: "私人交通可以根据天气、体力和兴趣灵活调整停靠与绕行。" }
  },
  market: {
    image: kindImages.market,
    caption: { en: "Local market life", zh: "本地市场生活" },
    overview: { en: "Markets reveal daily cooking, household routines, regional ingredients and direct local conversations.", zh: "市场能直接呈现日常烹饪、家庭采购、地方食材和本地交流。" },
    experience: { en: "The walk should introduce vendors, ingredients and how those foods appear later on the table.", zh: "市场体验应介绍摊主、食材，以及这些食材如何出现在餐桌上。" }
  },
  tea: {
    image: kindImages.tea,
    caption: { en: "Tea landscape and village culture", zh: "茶山与茶村文化" },
    overview: { en: "Tea places combine landscape, cultivar, craft, tasting and the daily life of growers.", zh: "茶区把山场、品种、工艺、品鉴和茶农日常连接在一起。" },
    experience: { en: "The visit should include walking, maker context and tasting, so the tea is understood from field to cup.", zh: "体验应包含步行、制茶背景和品鉴，让一杯茶从茶园到茶杯都能被理解。" }
  },
  coast: {
    image: kindImages.coast,
    caption: { en: "Coastal life and harbor culture", zh: "海岸生活与港口文化" },
    overview: { en: "Coastal destinations are shaped by sea routes, fishing communities, temples, trade and regional food.", zh: "海岸目的地由海路、渔村、庙宇、贸易和地方饮食共同塑造。" },
    experience: { en: "A good route links scenery with harbor life and food culture, not only beach views.", zh: "好的路线应把风景、港口生活和饮食文化结合，而不只是看海。" }
  }
};

const curatedRecommendationMedia: Record<string, MediaText> = {
  "Kuqa Grand Canyon": {
    image: "/images/destination-kuqa-grand-canyon-real.jpg",
    caption: { en: "Kuqa Grand Canyon, Xinjiang", zh: "新疆库车大峡谷" },
    overview: {
      en: "Kuqa Grand Canyon sits north of Kuqa at the southern foot of the Tianshan range. Its red sandstone walls, narrow passages and dry southern Xinjiang light make it a canyon landscape, not a generic mountain stop.",
      zh: "库车大峡谷位于库车以北、天山南麓一带，重点是红色砂岩峡谷、狭窄谷道和南疆干旱光线形成的地貌层次，不是普通山景。"
    },
    experience: {
      en: "The visit should be arranged around canyon light, walking safety and the best open sections, with context on wind-water erosion and Silk Road geography around Kuqa.",
      zh: "游览应根据峡谷光线、步行安全和开放路段安排，讲清风蚀水蚀如何塑造红色岩壁，以及库车在丝路南疆线路中的位置。"
    }
  },
  "Kanas Lake": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kanas%20Lake.jpg",
    caption: { en: "Kanas Lake, Altay, Xinjiang", zh: "新疆阿勒泰喀纳斯湖" },
    overview: {
      en: "Kanas Lake belongs to the Altai mountain landscape of northern Xinjiang, where glacier-fed water, forested slopes and Tuva-Kazakh settlement create a very different feeling from desert Xinjiang.",
      zh: "喀纳斯湖属于新疆北部阿尔泰山地景观，冰川补给的湖水、森林山坡和图瓦、哈萨克等边地生活共同形成这里的气质。"
    },
    experience: {
      en: "A good visit combines lake viewpoints, village context and seasonal color, with time to understand forest, pasture and long-winter life around the lake.",
      zh: "体验应结合湖景观景点、村落背景和季节色彩，并留出时间理解湖区周边森林、牧场与漫长冬季下的生活方式。"
    }
  },
  "Yabuli": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sun%20Mountain%20Yabuli.jpg",
    caption: { en: "Yabuli winter mountain area", zh: "黑龙江亚布力冬季山地" },
    overview: {
      en: "Yabuli is a winter mountain destination southeast of Harbin, known for snow sports, forested slopes and the wider northeast China winter-travel atmosphere.",
      zh: "亚布力是哈尔滨东南方向的冬季山地目的地，重点是冰雪运动、林区山坡和东北冬季旅行氛围。"
    },
    experience: {
      en: "The route should focus on snow season timing, clothing preparation, mountain views and a realistic pace for winter temperatures.",
      zh: "行程应围绕雪季时间、防寒准备、山地视野和冬季气温下的合理节奏来安排。"
    }
  },
  "Wuzhishan Rainforest": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Wuzhi_Shan_Hainan_China.jpg",
    caption: { en: "Wuzhishan, central Hainan", zh: "海南中部五指山" },
    overview: {
      en: "Wuzhishan represents Hainan's central mountain rainforest, with humid valleys, tropical vegetation and Li ethnic cultural surroundings away from the beach-resort side of the island.",
      zh: "五指山代表海南中部山地雨林，重点是湿润山谷、热带植被和黎族文化环境，和海滨度假型海南完全不同。"
    },
    experience: {
      en: "A suitable visit should be slower and nature-focused, pairing rainforest walking with mountain-village context and local climate awareness.",
      zh: "合适的体验应放慢节奏，把雨林步行、山地村落背景和当地气候特点结合起来。"
    }
  },
  "Yalong Bay Tropical Forest": {
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Yalong%20Bay%20Tropical%20Paradise%20Forest%20Park.jpg",
    caption: { en: "Yalong Bay Tropical Forest, Sanya", zh: "三亚亚龙湾热带森林" },
    overview: {
      en: "Yalong Bay Tropical Forest is a forested hill and viewpoint area above Sanya's coast, linking sea views, tropical vegetation and short mountain walks.",
      zh: "亚龙湾热带森林是三亚海岸上方的山地森林和观景区域，核心是海景、热带植被和轻量山地步行。"
    },
    experience: {
      en: "The route should balance viewpoints, shaded walking, heat management and quieter pauses away from the busiest photo platforms.",
      zh: "路线应平衡观景点、林荫步道、防暑节奏，并避开过度拥挤的拍照平台。"
    }
  },
  "Tanmen Fishing Port": {
    image: "/images/about-me-boat-seafood.jpg",
    caption: { en: "Tanmen fishing and seafood life", zh: "潭门渔港与海鲜生活" },
    overview: {
      en: "Tanmen is best understood as a working fishing-port community on Hainan's east coast, where boats, seafood handling and harbor routines shape daily life.",
      zh: "潭门应作为海南东海岸仍在运转的渔港社区来理解，渔船、海鲜处理和港口日常是这里的核心。"
    },
    experience: {
      en: "The visit should focus on harbor rhythm, seafood selection and fishing-family life rather than only taking a panorama of the port.",
      zh: "体验应关注港口节奏、海鲜挑选和渔家生活，而不是只拍一张港口全景。"
    }
  },
  "Hainan Family Kitchen": {
    image: "/images/about-me-dinner-table.jpg",
    caption: { en: "Hainan family-style meal", zh: "海南家庭式餐桌" },
    overview: {
      en: "A Hainan family-kitchen experience should center on island ingredients, seafood, coconut, local sauces and the relaxed rhythm of eating together.",
      zh: "海南家庭厨房体验应围绕岛屿食材、海鲜、椰子、本地酱料和围桌用餐的轻松节奏展开。"
    },
    experience: {
      en: "The meal should explain ingredients, home-style preparation and how Hainan's climate and sea shape everyday food.",
      zh: "体验应讲清食材、家常做法，以及海南气候和海洋如何影响当地日常饮食。"
    }
  }
};

function localized(lang: Lang, value: Localized) {
  if (lang === "zh-CN" || lang === "zh-TW") return value.zh;
  return value.en;
}

function cleanRecommendationText(item: ProvinceRecommendation, provinceName?: string): MediaText {
  const place = provinceName ? `${item.name}, ${provinceName}` : item.name;
  const placeZh = item.nameZh;
  const kind = genericByKind[item.kind];
  return {
    image: verifiedRecommendationImages[item.name] ?? kind.image,
    fallbackImage: kind.fallbackImage,
    caption: { en: place, zh: placeZh },
    overview: {
      en: `${place} is recommended for ${item.focus}.`,
      zh: `${placeZh}适合围绕${item.focusZh}来理解。`
    },
    experience: {
      en: `A private visit should connect the route, timing and explanation directly to ${item.name}, so the experience feels specific to the destination rather than generic sightseeing.`,
      zh: `私人游览应把路线、时间和讲解都直接围绕${placeZh}展开，让体验和这个地点本身对应，而不是普通打卡。`
    }
  };
}

export function getRecommendationEnrichment(lang: Lang, item: ProvinceRecommendation, provinceName?: string) {
  const media = cleanRecommendationText(item, provinceName);
  return {
    image: media.image,
    fallbackImage: media.fallbackImage,
    caption: localized(lang, media.caption),
    overview: localized(lang, media.overview),
    experience: localized(lang, media.experience)
  };
}

export function getExperienceLocationEnrichment(lang: Lang, location: ExperienceLocation) {
  const media = locationMedia[location.slug] ?? {
    ...genericByKind.village,
    image: kindImages.village,
    caption: { en: `${location.name}, ${location.region}`, zh: `${location.nameZh}，${location.regionZh}` },
    overview: { en: location.description, zh: location.descriptionZh },
    experience: { en: location.project, zh: location.projectZh }
  };
  return {
    image: media.image,
    fallbackImage: media.fallbackImage,
    caption: localized(lang, media.caption),
    overview: localized(lang, media.overview),
    experience: localized(lang, media.experience)
  };
}
