import type { Lang } from "@/components/LanguageProvider";
import type { ExperienceLocation } from "@/lib/experiences";
import type { ProvinceRecommendation, RecommendationKind } from "@/lib/province-recommendations";
import { toTraditionalChinese } from "@/lib/chinese-text";
import { destinationImages } from "@/lib/generated-destination-media";
import { getAuditedDestinationMedia } from "@/lib/audited-destination-copy";

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

function destinationSlug(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function safeDestinationImage(provinceName: string | undefined, item: ProvinceRecommendation) {
  if (!provinceName) return undefined;
  const image = destinationImages[`${provinceName}::${item.name}`];
  if (!image) return undefined;
  return image.toLowerCase().includes(destinationSlug(item.name)) ? image : undefined;
}

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
  "Guilin Rice Noodle Trail": "/images/destinations/guangxi-guilin-rice-noodle-trail-clean.png",
  "Chengdu Market Cooking": "/images/experience-chengdu-market.jpg",
  "Chengdu Teahouses": "/images/destinations/optimized/wiki-sichuan-chengdu-teahouses.jpg",
  "Wuhan Breakfast Streets": "/images/destinations/hubei-wuhan-breakfast-streets-real.jpg",
  "Xi'an City Wall": realImages.xianFoodTable,
  "Muslim Quarter Xi'an": realImages.xianFoodTable,
  "Kaifeng Night Market": realImages.kaifengNightMarket,
  "Kaifeng Old City": realImages.kaifengNightMarket,
  "Kunming Zhuanxin Market": realImages.kunmingZhuanxinMarket,
  "Stone Forest Kunming": "/images/destinations/yunnan-stone-forest.jpg",
  "Liwan Food Market": "/images/destinations/guangdong-liwan-food-market-real.jpg",
  "Nanning Morning Market": realImages.guangzhouFreshMarket,
  "Kaili Market": "/images/destinations/guizhou-kaili-market-clean.png",
  "Red Market Macau": "/images/destination-macau-red-market-real.jpg",
  "Caoyang Community Market": realImages.shanghaiWetMarket,
  "Shanghai Breakfast Trail": realImages.shanghaiWetMarket,
  "Shanghai Museum": "/images/destinations/shanghai-shanghai-museum-clean.png",
  "Yu Garden and Old City": "/images/destinations/shanghai-yu-garden-old-city-clean.png",
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
  "Kanas Lake": realImages.iliNalati,
  "Yabuli": "/images/destinations/heilongjiang-yabuli.jpg",
  "Yabuli Ski Area": "/images/destinations/heilongjiang-yabuli.jpg",
  "Harbin Ice and Snow World": realImages.beijiVillage,
  "Beiji Village Mohe": realImages.beijiVillage,
  "Wuzhishan Rainforest": "/images/experience-jingmai-tea-forest-real.png",
  "Yalong Bay Tropical Forest": "/images/about-me-beach-group.jpg",
  "Sanya Coast": "/images/about-me-beach-group.jpg",
  "Boao Town": "/images/about-me-beach-group.jpg",
  "Haikou Qilou Old Street": realImages.guangzhouOldCity,
  "Tanmen Fishing Port": "/images/about-me-boat-seafood.jpg",
  "Hainan Family Kitchen": "/images/destinations/hainan-family-kitchen-corrected.png",
  "Danba Tibetan Villages": "/images/destinations/sichuan-danba-tibetan-villages-real.jpg",
  "Jiuzhaigou Valley": realImages.westernSichuanDanba,
  "Li River": "/images/destinations/guangxi-li-river-local.jpg",
  "Yangshuo Countryside": "/images/destinations/guangxi-yangshuo-countryside-clean.png",
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
  "Shiwan Ceramic Studio": "/images/destinations/guangdong-shiwan-ceramic-workshop-real.jpg",
  "Miao Embroidery Workshop": realImages.miaoCraft,
  "Xijiang Miao Village": realImages.miaoCraft,
  "Red Market": "/images/destination-macau-red-market-real.jpg"
};

const provinceFallbackImages: Record<string, Partial<Record<RecommendationKind, string>> & { default: string }> = {
  Xinjiang: {
    default: realImages.iliNalati,
    heritage: realImages.kashgarBazaar,
    city: realImages.kashgarBazaar,
    market: realImages.kashgarBazaar,
    nature: realImages.iliNalati,
    road: realImages.iliNalati
  },
  Tibet: {
    default: realImages.qinghaiZhangye,
    nature: realImages.qinghaiZhangye,
    road: realImages.qinghaiZhangye
  },
  Qinghai: {
    default: realImages.qinghaiZhangye,
    nature: realImages.qinghaiZhangye,
    road: realImages.qinghaiZhangye
  },
  Gansu: {
    default: realImages.qinghaiZhangye,
    nature: realImages.qinghaiZhangye,
    road: realImages.qinghaiZhangye
  },
  "Inner Mongolia": {
    default: realImages.iliNalati,
    nature: realImages.iliNalati,
    village: realImages.iliNalati
  },
  Ningxia: {
    default: realImages.qinghaiZhangye,
    nature: realImages.qinghaiZhangye,
    road: realImages.qinghaiZhangye,
    food: realImages.xianFoodTable
  },
  Heilongjiang: {
    default: realImages.beijiVillage,
    nature: realImages.beijiVillage,
    village: realImages.beijiVillage,
    city: realImages.beijiVillage
  },
  Jilin: {
    default: realImages.beijiVillage,
    nature: realImages.beijiVillage,
    village: realImages.beijiVillage,
    food: realImages.chengduFood
  },
  Liaoning: {
    default: "/images/about-me-beach-group.jpg",
    coast: "/images/about-me-beach-group.jpg",
    city: "/images/experience-beijing-hutong.jpg",
    food: "/images/real-night-market.jpg"
  },
  Beijing: {
    default: "/images/experience-beijing-hutong.jpg",
    food: realImages.beijingDumplings,
    village: "/images/experience-beijing-hutong.jpg",
    market: "/images/experience-beijing-hutong.jpg"
  },
  Tianjin: {
    default: "/images/experience-beijing-hutong.jpg",
    food: "/images/real-night-market.jpg",
    market: "/images/experience-beijing-hutong.jpg",
    city: "/images/experience-beijing-hutong.jpg"
  },
  Hebei: {
    default: "/images/experience-beijing-hutong.jpg",
    coast: "/images/about-me-beach-group.jpg",
    nature: "/images/experience-guilin-ride.jpg"
  },
  Shanxi: {
    default: "/images/experience-beijing-hutong.jpg",
    spiritual: "/images/temple-festival.svg",
    food: realImages.xianFoodTable
  },
  Shaanxi: {
    default: realImages.xianFoodTable,
    food: realImages.xianFoodTable,
    village: realImages.xianFoodTable,
    nature: realImages.qinghaiZhangye
  },
  Shandong: {
    default: "/images/experience-beijing-hutong.jpg",
    coast: "/images/about-me-beach-group.jpg",
    food: "/images/about-me-boat-seafood.jpg",
    nature: "/images/about-me-beach-group.jpg"
  },
  Henan: {
    default: "/images/experience-guoliang-village.jpg",
    heritage: "/images/experience-guoliang-village.jpg",
    village: "/images/experience-guoliang-village.jpg",
    food: realImages.kaifengNightMarket
  },
  Jiangsu: {
    default: realImages.suzhouCuisine,
    craft: realImages.suzhouEmbroidery,
    food: realImages.suzhouCuisine,
    village: realImages.suzhouCuisine
  },
  Shanghai: {
    default: realImages.shanghaiLanes,
    market: realImages.shanghaiWetMarket,
    food: realImages.shanghaiWetMarket,
    city: realImages.shanghaiLanes
  },
  Anhui: {
    default: "/images/experience-hongcun.jpg",
    village: "/images/experience-hongcun.jpg",
    heritage: "/images/experience-hongcun.jpg",
    nature: "/images/real-hero-hongcun.jpg"
  },
  Hubei: {
    default: realImages.wuhanEastLake,
    nature: realImages.wuhanEastLake,
    city: "/images/experience-wuhan-river.jpg",
    food: realImages.wuhanEastLake
  },
  Sichuan: {
    default: realImages.chengduFood,
    nature: realImages.westernSichuanDanba,
    food: realImages.chengduFood,
    market: "/images/experience-chengdu-market.jpg",
    village: realImages.westernSichuanDanba
  },
  Chongqing: {
    default: realImages.chengduFood,
    food: realImages.chengduFood,
    city: realImages.chengduFood,
    nature: realImages.westernSichuanDanba
  },
  Zhejiang: {
    default: realImages.westLake,
    tea: realImages.longjingFields,
    nature: realImages.westLake,
    village: realImages.westLake
  },
  Jiangxi: {
    default: realImages.jingdezhenPorcelain,
    craft: realImages.jingdezhenPorcelain,
    tea: realImages.mengdingTea,
    village: realImages.yuanyangTerraces
  },
  Hunan: {
    default: "/images/destination-zhangjiajie-real.jpg",
    nature: "/images/destination-zhangjiajie-real.jpg",
    food: realImages.changshaFood,
    village: "/images/destination-zhangjiajie-real.jpg"
  },
  Fujian: {
    default: realImages.wuyiTea,
    tea: realImages.wuyiTea,
    craft: realImages.quanzhouPuppets,
    coast: "/images/about-me-beach-group.jpg"
  },
  Guizhou: {
    default: realImages.miaoCraft,
    village: realImages.miaoCraft,
    craft: realImages.miaoCraft,
    market: realImages.miaoCraft
  },
  Yunnan: {
    default: realImages.daliShaxi,
    village: realImages.daliShaxi,
    tea: realImages.jingmaiTeaForest,
    nature: realImages.yuanyangTerraces,
    market: realImages.kunmingZhuanxinMarket
  },
  Guangxi: {
    default: "/images/destinations/guangxi-li-river-local.jpg",
    nature: "/images/destinations/guangxi-li-river-local.jpg",
    village: realImages.yangshuoFarmFood,
    food: realImages.yangshuoFarmFood
  },
  Guangdong: {
    default: realImages.guangzhouOldCity,
    market: realImages.guangzhouMarket,
    food: realImages.guangzhouFood,
    craft: realImages.shiwanCeramics
  },
  "Hong Kong": {
    default: "/images/about-me-beach-group.jpg",
    market: "/images/real-night-market.jpg",
    coast: "/images/about-me-beach-group.jpg",
    village: "/images/about-me-boat-seafood.jpg"
  },
  Macau: {
    default: "/images/destination-macau-red-market-real.jpg",
    market: "/images/destination-macau-red-market-real.jpg",
    food: "/images/destination-macau-red-market-real.jpg"
  },
  Hainan: {
    default: "/images/about-me-beach-group.jpg",
    coast: "/images/about-me-beach-group.jpg",
    nature: "/images/experience-jingmai-tea-forest-real.png",
    food: "/images/about-me-dinner-table.jpg",
    village: "/images/about-me-boat-seafood.jpg"
  }
};

const specificRecommendationText: Record<string, MediaText> = {
  "Kuqa Grand Canyon": {
    image: realImages.qinghaiZhangye,
    caption: { en: "Kuqa red canyon landscape", zh: "库车红色峡谷地貌" },
    overview: { en: "Kuqa Grand Canyon is about dry red-rock valleys, narrow passages and the desert edge of southern Xinjiang, not a generic mountain view.", zh: "库车大峡谷的重点在南疆红色峡谷、干旱山体、狭窄谷道和天山南麓地貌，重点是它自己的地貌细节。" },
    experience: { en: "A good route should follow light, walking safety and canyon sections, while explaining how wind, water and desert climate shaped the rock walls.", zh: "游览应根据光线、步行安全和峡谷段落安排，讲清风、水和干旱气候如何塑造红色岩壁。" }
  },
  "Kanas Lake": {
    image: realImages.iliNalati,
    caption: { en: "Kanas Lake, Altay, Xinjiang", zh: "新疆阿勒泰喀纳斯湖" },
    overview: { en: "Kanas Lake sits in the Altai Mountains of northern Xinjiang, where glacier-fed water, forested slopes and Tuva-Kazakh settlement create a distinct borderland landscape.", zh: "喀纳斯湖位于新疆北部阿尔泰山中，冰川水、森林山坡和图瓦、哈萨克等边地生活共同构成这里的核心气质。" },
    experience: { en: "The visit should combine lake viewpoints, village context and seasonal color, with time to understand how people live with forest, pasture and long winters.", zh: "游览应结合湖景观景点、村落背景和季节色彩，并留出时间理解当地人如何与森林、牧场和漫长冬季共处。" }
  },
  "Yabuli": {
    image: "/images/destinations/heilongjiang-yabuli.jpg",
    caption: { en: "Yabuli winter mountain area", zh: "亚布力冬季山地" },
    overview: { en: "Yabuli is known for Heilongjiang winter sports, snow-covered mountain terrain and ski facilities southeast of Harbin.", zh: "亚布力的重点是黑龙江冬季运动、哈尔滨东南方向的雪山地形和滑雪设施。" },
    experience: { en: "The route is best understood through snow season, mountain views, winter clothing preparation and the wider northeast winter-travel atmosphere.", zh: "体验应聚焦雪季、山地视野、防寒准备，以及东北冬季旅行的整体氛围。" }
  },
  "Wuzhishan Rainforest": {
    image: "/images/experience-jingmai-tea-forest-real.png",
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
    overview: { en: "Tanmen is best understood as a working fishing-port community on Hainan's east coast, where boats, seafood and harbor routines shape local life.", zh: "潭门渔港应呈现为海南东海岸仍在运转的渔港社区，渔船、海鲜和港口日常是核心。" },
    experience: { en: "The visit is best understood through harbor rhythm, seafood handling and fishing-family life rather than only taking a harbor panorama photo.", zh: "体验应关注港口节奏、海鲜处理和渔家生活，而不只是拍一张港口全景。" }
  },
  "Hainan Family Kitchen": {
    image: "/images/about-me-dinner-table.jpg",
    caption: { en: "Shared local meal in China", zh: "本地家庭式餐桌" },
    overview: { en: "A Hainan family-kitchen experience should center on tropical island ingredients, seafood, coconut, local sauces and the relaxed rhythm of eating together.", zh: "海南家庭厨房应从热带岛屿食材、海鲜、椰子、本地酱料和轻松的围桌用餐节奏展开。" },
    experience: { en: "The meal should explain ingredients, home-style preparation and how Hainan's climate and sea shape everyday food.", zh: "体验应讲清食材、家常做法，以及海南气候和海洋如何影响日常饮食。" }
  }
};

function fallbackRecommendationText(item: ProvinceRecommendation, provinceName?: string): MediaText {
  const place = provinceName ? `${item.name}, ${provinceName}` : item.name;
  const placeZh = item.nameZh;
  const kind = genericByKind[item.kind];
  const actionByKind: Record<RecommendationKind, Localized> = {
    heritage: { en: `Use ${place} to read local history through architecture, streets, objects and the people who still live around the site.`, zh: `${placeZh}适合从建筑、街巷、遗存和周边生活读懂当地历史，而需要落到具体现场。` },
    nature: { en: `${place} should be introduced through its specific terrain, season, weather and the way local life adapts to that landscape.`, zh: `${placeZh}应结合具体地貌、季节天气和当地生活如何适应自然环境来介绍。` },
    food: { en: `${place} is a food stop where ingredients, local habits and table culture matter more than simply eating one famous dish.`, zh: `${placeZh}应从食材、吃法和地方餐桌习惯展开，而不是只介绍一道名菜。` },
    village: { en: `${place} is best experienced as a living community shaped by homes, lanes, work, food and family memory.`, zh: `${placeZh}应呈现为仍在生活的社区，重点是民居、巷道、劳作、饮食和家族记忆。` },
    craft: { en: `${place} is best understood through makers, materials, tools and the local aesthetic behind the craft.`, zh: `${placeZh}应聚焦手艺人、材料、工具和背后的地方审美。` },
    spiritual: { en: `${place} needs respectful pacing, with context on belief, ritual space, architecture and living practice.`, zh: `${placeZh}需要以尊重的节奏参观，讲清信仰、仪式空间、建筑和现实生活。` },
    city: { en: `${place} is best understood through streets, neighborhoods, transport, food and ordinary daily routines.`, zh: `${placeZh}最适合从街道、社区、交通、饮食和日常节奏中理解。` },
    road: { en: `${place} works as a private scenic route, with the transfer itself becoming part of the landscape experience.`, zh: `${placeZh}适合作为私人风景路线，让路途本身也成为体验的一部分。` },
    market: { en: `${place} brings together vendors, ingredients, household routines and the direct conversations of daily shopping.`, zh: `${placeZh}应呈现摊主、食材、家庭采购和日常交流，重点是市场内部的真实交流。` },
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

const commons = (file: string) => `/images/${encodeURIComponent(file)}`;

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
      zh: "私人行程可根据天气和体力调整，选择观景点、索道和较安静的步道，让黄山成为真正的景观体验，重点是把天气、体力和山路节奏安排好。"
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
      zh: "好的游览应把街巷、手工铺、馕坑和市场生活串联起来，配合本地背景讲解，重点要落到现场观察。"
    }
  },
  "Forbidden City": {
    image: "/images/real-hero-hongcun.jpg",
    caption: { en: "Forbidden City, Beijing", zh: "北京故宫" },
    overview: {
      en: "The Forbidden City was the ceremonial and political center of imperial Beijing. Its axis, halls and courtyards are best understood through hierarchy, ritual and daily palace function.",
      zh: "故宫曾是北京皇城的礼制与政治中心。理解这里适合从中轴线、宫殿等级、礼仪制度和宫廷日常功能入手。"
    },
    experience: {
      en: "The route can focus on quieter side courtyards, symbolic details and the contrast between imperial scale and human-scale palace life.",
      zh: "路线可避开只挤在中轴线上快速拍照，加入侧院、建筑细节和宫廷生活层面的讲解。"
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
  "beiji-village": { image: realImages.beijiVillage, caption: { en: "Far-north village life", zh: "中国北方边境村落生活" }, overview: { en: "Beiji Village near Mohe represents China's far north, with forest climate, border culture and strong seasonal contrast.", zh: "漠河北极村代表中国极北地区，森林气候、边境文化和强烈季节变化是核心特点。" }, experience: { en: "The experience should emphasize local homes, northern food, winter and summer rhythms, and life along the Heilong River.", zh: "体验应从当地人家、东北饮食、冬夏节奏和黑龙江沿岸生活展开。" } },
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
  "kashgar-bazaar": { image: realImages.kashgarBazaar, caption: { en: "Kashgar bazaar", zh: "喀什巴扎" }, overview: { en: "Kashgar bazaars carry oasis trade culture through spices, breads, dried fruit, textiles and craft stalls.", zh: "喀什巴扎通过香料、馕、干果、织物和手工摊位呈现绿洲商贸文化。" }, experience: { en: "The market walk is best understood through Silk Road exchange, vendor life and Uyghur food traditions.", zh: "市场体验应聚焦丝路交流、摊主生活和维吾尔饮食传统。" } },
  "shanghai-caoyang": { image: realImages.shanghaiWetMarket, caption: { en: "Shanghai community market", zh: "上海社区市场" }, overview: { en: "Caoyang-style community markets show ordinary Shanghai life through produce, freshwater foods and prepared dishes.", zh: "上海社区市场通过蔬菜、河鲜和熟食呈现城市日常生活。" }, experience: { en: "The visit should read local shopping habits, seasonal foods and how old neighborhoods still function.", zh: "体验应观察本地采购习惯、季节食材和老社区的运转方式。" } },
  "guangzhou-liwan": { image: realImages.guangzhouFreshMarket, caption: { en: "Liwan fresh seafood and market stalls", zh: "荔湾鲜活食材摊位" }, overview: { en: "Liwan markets show Cantonese freshness, roast meats, soups, seafood and preserved foods through everyday shopping.", zh: "荔湾市场通过鲜活海鲜、烧味、汤料、腌制品和街坊采购呈现广府饮食。" }, experience: { en: "The route should explain why Cantonese cooking values freshness, light seasoning, slow soup and the original taste of ingredients.", zh: "路线应讲清广府菜为何重视鲜、清、慢火汤和食材本味。" } },

  "suzhou-embroidery": { image: realImages.suzhouEmbroidery, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Suzhou embroidery craft", zh: "苏州刺绣工艺" }, overview: { en: "Suzhou embroidery is known for fine silk threads, delicate color transitions and patient hand technique.", zh: "苏绣以细丝线、微妙色阶和耐心手工针法著称。" }, experience: { en: "The workshop is best understood through needle technique, silk materials and how Jiangnan aesthetics appear in craft.", zh: "工坊体验应从针法、丝线材料和江南审美如何体现在手艺中。" } },
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
  anxi: { image: realImages.anxiTeaGarden, caption: { en: "Anxi Tieguanyin tea villages", zh: "安溪铁观音茶村" }, overview: { en: "Anxi is closely linked to Tieguanyin oolong, family tea gardens and complex processing stages.", zh: "安溪与铁观音乌龙茶、家庭茶园和复杂制茶工序紧密相关。" }, experience: { en: "The experience is best understood through shaking, oxidation, roasting and how aroma is built step by step.", zh: "体验应聚焦摇青、发酵、焙火，以及香气如何一步步形成。" } },
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
  "guangzhou-day": { image: realImages.guangzhouOldCity, caption: { en: "Guangzhou old city and food", zh: "广州老城与广府饮食" }, overview: { en: "Guangzhou's old city is read through arcades, ancestral halls, markets, tea and Cantonese food.", zh: "广州老城可通过骑楼、祠堂、市场、茶楼和广府饮食来展开。" }, experience: { en: "The route should connect architecture, markets and food so Cantonese culture feels practical and alive.", zh: "路线应把建筑、市场和饮食连接起来，让广府文化真实可感。" } },
  "wuhan-day": { image: realImages.wuhanEastLake, caption: { en: "Wuhan river city day", zh: "武汉江城一日" }, overview: { en: "Wuhan combines the Yangtze riverfront, East Lake, old streets, breakfast culture and direct local energy.", zh: "武汉结合长江江岸、东湖、老街、过早文化和鲜明城市性格。" }, experience: { en: "A custom day should include breakfast, river views, lake time and neighborhood stories.", zh: "定制一日应包含过早、江景、东湖时间和街区故事。" } }
};

const genericByKind: Record<RecommendationKind, MediaText> = {
  heritage: {
    image: kindImages.heritage,
    caption: { en: "Historic architecture and local context", zh: "历史建筑与本地背景" },
    overview: { en: "This site is best read through its architecture, historical layers and the people who shaped the surrounding city or village.", zh: "这个地点的核心内容包括建筑、历史层次和周边城市或村落的人文关系。" },
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
    overview: { en: "This place is strongest when approached as a living community shaped by homes, fields, water and family memory.", zh: "这里应呈现为由民居、田地、水系和家族记忆塑造的生活社区。" },
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

const destinationSpecificText: Record<string, MediaText> = {
  "Shanxi::Fenyang Fenjiu Culture": {
    image: "/images/destinations/shanxi-fenyang-fenjiu-culture-clean.png",
    caption: { en: "Fenyang Fenjiu heritage site", zh: "汾阳杏花村汾酒文化" },
    overview: {
      en: "Fenyang Fenjiu Culture is best understood through Xinghua Village, sorghum spirit brewing, old workshop spaces, liquor vessels and the way Fenjiu connects with Shanxi banquet customs.",
      zh: "汾阳汾酒文化的核心内容包括杏花村、汾酒老作坊、高粱酒酿造、酒器陈列和山西宴席习俗。这里要呈现的不是普通餐饮街，而是清香型白酒如何进入地方历史、工艺和待客方式。"
    },
    experience: {
      en: "A good visit should connect the museum or workshop setting with brewing steps, aroma style, local banquet etiquette and the wider story of Shanxi liquor culture.",
      zh: "建议把博物馆或老作坊空间、酿造流程、清香型风味、山西宴席礼俗和杏花村故事串起来看，重点放在酒文化与地方生活的关系。"
    }
  },
  "Hainan::Sanya Coast": {
    image: "/images/destinations/optimized/wiki-hainan-sanya-coast.jpg",
    caption: { en: "Sanya coast and tropical resort shoreline", zh: "三亚热带海岸" },
    overview: {
      en: "Sanya Coast should be introduced through tropical beaches, bays, coconut palms, resort life and the southern-island climate that shapes Hainan's seaside rhythm.",
      zh: "三亚海岸的核心内容包括热带沙滩、海湾、椰林、度假生活和海南南部海岛气候。这里的重点是海岸线、阳光、水上活动和本地海鲜生活共同形成的节奏。"
    },
    experience: {
      en: "A good visit should choose beach sections by weather, crowd level and water conditions, balancing swimming, coastal walks and seafood stops.",
      zh: "行程应根据天气、人流和海况选择海滩段，把下水、海边步行和海鲜停留结合起来，重点是海岸与当地生活。"
    }
  },
  "Hainan::Boao Town": {
    image: "/images/destinations/hainan-boao-town-clean.png",
    caption: { en: "Boao coastline and town scenery", zh: "博鳌海岸与小镇风景" },
    overview: {
      en: "Boao Town brings together Qionghai's coastal town character: Jade Belt Beach, river-mouth scenery, quiet streets and a slower seaside pace.",
      zh: "博鳌小镇要呈现琼海海岸小镇气质：玉带滩、河海交汇、安静街区和相对舒缓的海边生活。"
    },
    experience: {
      en: "A good route links the beach, river-mouth viewpoints and town streets, leaving time for seafood or coffee rather than reducing Boao to one conference building.",
      zh: "游览可把海滩、河口视角和小镇街区串起来，留出吃海鲜或喝咖啡的时间，让博鳌呈现出海边小镇的日常节奏。"
    }
  },
  "Hainan::Tanmen Fishing Port": {
    image: "/images/destinations/hainan-tanmen-fishing-port-corrected.png",
    caption: { en: "Tanmen fishing port, Qionghai", zh: "琼海潭门渔港" },
    overview: {
      en: "Tanmen Fishing Port is about working boats, seafood trade, harbor life and Qionghai's long relationship with the South China Sea.",
      zh: "潭门渔港的核心内容包括渔船、海鲜交易、港口日常和琼海面向南海的渔业传统。"
    },
    experience: {
      en: "A good visit is best understood through the harbor, seafood market rhythm and fishing-community stories, with respectful distance from working areas.",
      zh: "体验应关注港口、海鲜市场节奏和渔民社区故事，同时与作业区域保持合适距离。"
    }
  },
  "Hainan::Haikou Qilou Old Street": {
    image: "/images/destinations/hainan-haikou-qilou-old-street-corrected.png",
    caption: { en: "Haikou Qilou Old Street", zh: "海口骑楼老街" },
    overview: {
      en: "Haikou Qilou Old Street is best read through arcade shopfronts, overseas-Chinese architecture, old signs, snacks and the port-city memory of northern Hainan.",
      zh: "海口骑楼老街的核心内容包括骑楼立面、南洋风格、老招牌、小吃和海口港口城市记忆。"
    },
    experience: {
      en: "A good walk compares facade details, shaded arcades and small food stops, connecting architecture with Haikou's trading history.",
      zh: "适合慢走骑楼廊下，看立面细节、阴影空间和小吃店，把建筑与海口商贸历史联系起来。"
    }
  },
  "Hainan::Dongpo Academy Danzhou": {
    image: "/images/destinations/optimized/wiki-hainan-dongpo-academy-danzhou.jpg",
    caption: { en: "Dongpo Academy, Danzhou", zh: "儋州东坡书院" },
    overview: {
      en: "Dongpo Academy in Danzhou is tied to Su Dongpo's exile years in Hainan, classical learning, courtyard architecture and the literary memory of the island.",
      zh: "儋州东坡书院的介绍应写清苏东坡谪居海南、书院庭院、文人记忆和海南地方文化传播。它不是普通古宅，而是海南文学记忆的重要地点。"
    },
    experience: {
      en: "A good visit should explain Su Dongpo's Hainan period, read the courtyards slowly and connect the academy with Danzhou's local history.",
      zh: "参观应讲清苏东坡在海南的经历，慢看院落与题刻，并把书院放进儋州地方历史中理解。"
    }
  },
  "Hainan::Wuzhishan Rainforest": {
    image: "/images/destinations/optimized/wiki-hainan-wuzhishan-rainforest.jpg",
    caption: { en: "Wuzhishan rainforest and mountain villages", zh: "五指山雨林与山地村落" },
    overview: {
      en: "Wuzhishan Rainforest is Hainan's mountain interior, shaped by tropical forest, clouded peaks, rivers, Li and Miao communities and cooler highland air.",
      zh: "五指山雨林要呈现海南岛中部山地：热带森林、云雾山峰、溪流、黎苗村落和更凉爽的高地气候。"
    },
    experience: {
      en: "A good route should match trail difficulty and weather, linking rainforest ecology with mountain communities rather than treating it as only a viewpoint.",
      zh: "行程要按步道难度和天气安排，把雨林生态与山地社区结合起来，而不是只停一个观景点。"
    }
  },
  "Hainan::Yalong Bay Tropical Forest": {
    image: "/images/destinations/optimized/wiki-hainan-yalong-bay-tropical-forest.jpg",
    caption: { en: "Yalong Bay Tropical Forest Park", zh: "亚龙湾热带天堂森林公园" },
    overview: {
      en: "Yalong Bay Tropical Forest combines rainforest trails, hilltop sea views, suspension bridges and the contrast between Sanya's coast and green mountain slopes.",
      zh: "亚龙湾热带森林的核心内容包括雨林步道、山顶海景、吊桥和三亚海岸与山地森林的对比。"
    },
    experience: {
      en: "A good visit should choose viewpoints by light and visibility, leaving time for forest paths as well as the bay panorama.",
      zh: "游览应根据光线和能见度选择观景点，既看海湾全景，也留时间走森林步道。"
    }
  },
  "Hainan::Binglanggu Li and Miao Culture": {
    image: "/images/destinations/hainan-binglanggu-li-miao-culture-corrected.png",
    caption: { en: "Binglanggu Li and Miao cultural park", zh: "槟榔谷黎苗文化园" },
    overview: {
      en: "Binglanggu Li and Miao Culture brings together Hainan's Li and Miao textile traditions, village forms, performance spaces and island ethnic culture in a complete setting.",
      zh: "槟榔谷黎苗文化要呈现海南黎族、苗族的织锦传统、村寨形态、表演空间和岛屿民族文化。"
    },
    experience: {
      en: "A good visit should connect textile craft, village architecture and performance interpretation, while distinguishing curated displays from everyday community life.",
      zh: "游览应把织锦工艺、村寨建筑和演艺讲解连起来，同时说明景区展示与真实日常生活之间的关系。"
    }
  },
  "Hainan::Hainan Family Kitchen": {
    image: "/images/destinations/hainan-family-kitchen-corrected.png",
    caption: { en: "Hainan local kitchen and home-style dishes", zh: "海南本地厨房与家常菜" },
    overview: {
      en: "Hainan Family Kitchen is best understood through local food culture: Wenchang chicken, coconut, seafood, tropical vegetables, dipping sauces and the relaxed way island families eat together.",
      zh: "海南本地厨房的核心内容包括文昌鸡、椰子、海鲜、热带蔬菜、蘸料和岛上家庭聚餐方式。"
    },
    experience: {
      en: "A good experience should move through markets, ingredients, cooking habits and table culture, making Hainan flavors feel specific rather than generic tropical food.",
      zh: "体验应从市场、食材、烹饪习惯和餐桌文化展开，让海南味道具体到文昌鸡、椰子、海鲜、蘸料和岛上家庭餐桌。"
    }
  },
  "Jilin::Changbai Mountain": {
    image: "/images/destinations/optimized/wiki-jilin-changbai-mountain.jpg",
    caption: { en: "Changbai Mountain alpine scenery", zh: "长白山高山景观" },
    overview: {
      en: "Changbai Mountain is defined by volcanic landforms, Tianchi crater-lake views, alpine forests, waterfalls and the border mountain climate of northeast China.",
      zh: "长白山的核心内容包括火山地貌、天池视野、高山森林、瀑布和东北边境山地气候。它的重点不是单一观景台，而是从林带、山坡到火山口逐层变化的自然景观。"
    },
    experience: {
      en: "A good visit should plan around weather, shuttle timing and viewing-platform access, leaving flexibility because Tianchi visibility changes quickly.",
      zh: "游览要提前考虑天气、景区交通和观景台开放情况。天池能见度变化很快，行程应留有弹性，把瀑布、林带和山地气候一起纳入体验。"
    }
  },
  "Jilin::Jilin Rime Island": {
    image: "/images/destinations/jilin-rime-island-corrected.png",
    caption: { en: "Winter rime beside the Songhua River", zh: "松花江畔冬季雾凇" },
    overview: {
      en: "Jilin Rime Island brings together the winter rime formed along the Songhua River: white-coated riverside trees, cold morning light and the seasonal atmosphere of Jilin city.",
      zh: "吉林雾凇岛的核心是松花江畔冬季雾凇。树枝被霜花包裹，清晨冷光、江雾和岸边村落共同形成吉林冬天最有辨识度的景观。"
    },
    experience: {
      en: "A good route starts early, checks rime forecasts and temperature, and keeps time for quiet walking rather than treating it as a generic snow scene.",
      zh: "适合清晨出发，结合气温、湿度和雾凇预报安排。重点是慢慢看江边树影和霜花层次，而不是把它当成普通雪景。"
    }
  },
  "Jilin::Yanji Food Streets": {
    image: "/images/destinations/jilin-yanji-food-streets-corrected.png",
    caption: { en: "Yanji market snacks and Korean-Chinese food", zh: "延吉市场小吃与朝鲜族风味" },
    overview: {
      en: "Yanji Food Streets are about Korean-Chinese daily flavors: cold noodles, rice cakes, barbecue, markets, cafes and the bilingual street life of Yanbian.",
      zh: "延吉饮食街区的核心内容包括朝鲜族风味和延边日常：冷面、打糕、烤肉、早市小吃、咖啡店和双语招牌共同构成这里的城市气质。"
    },
    experience: {
      en: "A good food walk mixes morning market stalls, trusted noodle or barbecue shops and cafe streets, with attention to ordering rhythm and local etiquette.",
      zh: "合适的路线可把早市、冷面店、烤肉店和咖啡街串起来，讲清食材、点单方式和本地人的吃饭节奏。"
    }
  },
  "Jilin::Koguryo Heritage Ji'an": {
    image: "/images/destinations/optimized/wiki-jilin-koguryo-heritage-ji-an.jpg",
    caption: { en: "Koguryo heritage remains in Ji'an", zh: "集安高句丽遗址" },
    overview: {
      en: "Koguryo Heritage in Ji'an is best understood through ancient tombs, fortress remains, stone inscriptions and the frontier history along the Yalu River.",
      zh: "集安高句丽遗址的核心内容包括古墓群、山城遗址、石刻和鸭绿江边疆历史。它呈现的是东北古代政权、交通与防御体系的空间记忆。"
    },
    experience: {
      en: "A good visit should link tomb murals, fortress sites and river geography, with enough historical context before moving between scattered locations.",
      zh: "游览时应把墓葬壁画、山城遗址和江岸地理联系起来，先补充背景，再按点位慢慢看，避免只停留在外观拍照。"
    }
  },
  "Jilin::Chagan Lake Winter Fishing": {
    image: "/images/destinations/jilin-chagan-lake-winter-fishing-corrected.png",
    caption: { en: "Chagan Lake winter fishing", zh: "查干湖冬捕" },
    overview: {
      en: "Chagan Lake Winter Fishing is a seasonal northeast tradition: frozen lake work, fishing nets, local ceremony and the community rhythm around winter harvest.",
      zh: "查干湖冬捕的重点是冰封湖面上的渔猎传统、下网起鱼、祭湖醒网仪式和冬季社区生活。它应呈现真实冬捕现场，重点是冬捕现场和社区生活。"
    },
    experience: {
      en: "A good visit follows festival dates, cold-weather preparation and safe viewing distance, while explaining why winter fishing remains a living regional custom.",
      zh: "行程要对准冬捕节期，注意保暖和安全观赏距离。讲解应说明冬捕如何与渔村生活、季节劳动和东北民俗相连。"
    }
  },
  "Jilin::Changchun Puppet Palace": {
    image: "/images/destinations/jilin-changchun-puppet-palace-clean.png",
    caption: { en: "Museum of the Imperial Palace of Manchukuo", zh: "长春伪满皇宫博物院" },
    overview: {
      en: "Changchun Puppet Palace should be introduced through Manchukuo history, palace rooms, political symbolism and the modern memory of northeast China.",
      zh: "长春伪满皇宫要放在近代东北历史中理解。宫殿空间、办公与生活陈设、政治象征和殖民时期城市记忆，共同构成这里的参观重点。"
    },
    experience: {
      en: "A good visit should move room by room with historical explanation, separating architecture, exhibition objects and the political context of the site.",
      zh: "适合按展厅和院落慢慢走，区分建筑本身、陈列物和历史背景。重点是理解这处遗址的近代历史意义。"
    }
  },
  "Jilin::Songhua Lake": {
    image: "/images/destinations/jilin-songhua-lake-clean.png",
    caption: { en: "Songhua Lake scenic area", zh: "松花湖风景区" },
    overview: {
      en: "Songhua Lake is a forested reservoir landscape near Jilin city, combining open water, islands, mountain slopes and seasonal outdoor routes.",
      zh: "松花湖要呈现吉林市近郊的森林湖泊景观：开阔水面、岛屿、山坡、游船和四季户外路线。"
    },
    experience: {
      en: "A good route chooses lake viewpoints, boat or shoreline sections by season, and connects the scenery with nearby forest and resort areas.",
      zh: "游览可根据季节选择湖岸观景、游船或山地视角，把水面、森林和度假区动线结合起来。"
    }
  },
  "Jilin::Jingyuetan Forest": {
    image: "/images/destinations/jilin-jingyuetan-forest-clean.png",
    caption: { en: "Jingyuetan forest and lake trails", zh: "净月潭森林与湖畔步道" },
    overview: {
      en: "Jingyuetan Forest is Changchun's large lake-and-forest recreation area, shaped by pine woods, cycling roads, snow season activities and city leisure life.",
      zh: "净月潭森林体现长春城市边缘的湖泊与森林休闲：松林、环湖路、骑行步道、冬季雪上活动和市民周末生活都在这里交织。"
    },
    experience: {
      en: "A good visit should choose walking, cycling or snow-season activities based on weather, with time for both forest shade and lake views.",
      zh: "行程可按季节选择步行、骑行或雪季项目，留出看林荫、湖面和城市休闲节奏的时间。"
    }
  },
  "Jilin::Hunchun Border View": {
    image: "/images/destinations/optimized/wiki-jilin-hunchun-border-view.jpg",
    caption: { en: "Hunchun border landscape", zh: "珲春边境景观" },
    overview: {
      en: "Hunchun Border View is about Tumen River geography, port towns, multi-country frontier context and the layered identities of Yanbian's borderland.",
      zh: "珲春边境眺望的核心内容包括图们江地理、口岸城镇、多国交界背景和延边边境生活。这里的吸引力来自边境空间本身。"
    },
    experience: {
      en: "A good route should combine official viewpoints, river geography and town life, explaining border etiquette and why distances feel so compressed here.",
      zh: "适合把观景点、江岸地理和城镇生活放在一起看，同时说明边境礼仪与多国相邻的空间感。"
    }
  },
  "Liaoning::Shenyang Imperial Palace": {
    image: "/images/destinations/liaoning-shenyang-imperial-palace-corrected.png",
    caption: { en: "Shenyang Imperial Palace", zh: "沈阳故宫" },
    overview: {
      en: "Shenyang Imperial Palace brings together early Qing palace architecture, Manchu political history, courtyard organization and the transition from regional power to imperial rule.",
      zh: "沈阳故宫的核心内容包括清初宫殿建筑、满族政治历史、院落格局和后金到清朝的权力转变。"
    },
    experience: {
      en: "A good visit compares palace halls, courtyard axes and decorative details, linking the site to the broader story of Shenyang before the Qing entered Beijing.",
      zh: "游览应比较殿宇、院落轴线和装饰细节，把这里放进清入关前的沈阳历史中看。"
    }
  },
  "Liaoning::Zhang Family Mansion": {
    image: "/images/destinations/liaoning-zhang-family-mansion-clean.png",
    caption: { en: "Zhang Family Mansion, Shenyang", zh: "沈阳张氏帅府" },
    overview: {
      en: "Zhang Family Mansion brings together Republican-era northeast politics, Zhang Zuolin and Zhang Xueliang, traditional courtyards and western-style buildings inside one compound.",
      zh: "张氏帅府把民国东北政治、张作霖与张学良、大院生活和中西合璧建筑放在同一座院落里。这里适合看历史人物、宅院格局和近代沈阳的城市记忆。"
    },
    experience: {
      en: "A good visit should move between the traditional courtyards and western-style blocks, explaining how private residence, military power and city history overlap.",
      zh: "适合从传统院落走到西式楼房，讲清私人宅邸、军政权力和城市近代史如何在同一院落中叠加。"
    }
  },
  "Liaoning::Dalian Binhai Road": {
    image: "/images/destinations/liaoning-dalian-binhai-road-clean.png",
    caption: { en: "Dalian Binhai Road coastline", zh: "大连滨海路海岸" },
    overview: {
      en: "Dalian Binhai Road follows cliffs, coves, seaside parks, bridges and open sea views, showing how Dalian's city life stays close to the coast.",
      zh: "大连滨海路沿着海岸山崖、海湾视野、公园步道和跨海桥梁展开，能看到大连城市生活与山海岸线贴在一起的状态。"
    },
    experience: {
      en: "A good route selects manageable walking sections and viewpoints by weather, linking the coastline with Dalian's seaside identity.",
      zh: "游览可选择适合体力的一段步行，按天气和光线安排观景点，把海岸线与大连的滨海城市气质连起来。"
    }
  },
  "Liaoning::Panjin Red Beach": {
    image: "/images/destinations/optimized/wiki-liaoning-panjin-red-beach.jpg",
    caption: { en: "Panjin Red Beach wetland", zh: "盘锦红海滩湿地" },
    overview: {
      en: "Panjin Red Beach is shaped by seasonal seepweed wetlands, reed fields, migratory birds and the Liaohe River delta ecosystem.",
      zh: "盘锦红海滩的核心是季节性碱蓬湿地、芦苇荡、候鸟和辽河三角洲生态。红色景观与潮汐、季节和湿地保护密切相关。"
    },
    experience: {
      en: "A good visit should check color season and tide conditions, then use boardwalks and viewing platforms without disturbing wetland habitat.",
      zh: "行程要结合最佳变红季节和潮汐情况，通过栈道和观景台观看，同时注意湿地保护。"
    }
  },
  "Liaoning::Benxi Water Cave": {
    image: "/images/destinations/optimized/wiki-liaoning-benxi-water-cave.jpg",
    caption: { en: "Benxi Water Cave", zh: "本溪水洞" },
    overview: {
      en: "Benxi Water Cave is a karst underground river cave, known for boat passages, limestone formations, cold cave air and eastern Liaoning mountain scenery.",
      zh: "本溪水洞的核心内容包括喀斯特地下河、乘船洞穴通道、钟乳石形态和辽东山地环境。它的特点是水道与洞穴空间结合。"
    },
    experience: {
      en: "A good visit should prepare for cave temperature, boat timing and low-light viewing, focusing on geology rather than rushing through the route.",
      zh: "游览要注意洞内温度、乘船节奏和弱光环境，重点看地质形态和地下河空间。"
    }
  },
  "Liaoning::Dandong Yalu River": {
    image: "/images/destinations/optimized/wiki-liaoning-dandong-yalu-river.jpg",
    caption: { en: "Yalu River, Dandong", zh: "丹东鸭绿江" },
    overview: {
      en: "Dandong Yalu River is a border-river experience, connecting river bridges, waterfront life, modern history and northeast frontier geography.",
      zh: "丹东鸭绿江的核心内容包括边境江景、桥梁遗迹、滨江生活、近现代历史和东北边疆地理。这里的重点是江河如何形成城市与边境的关系。"
    },
    experience: {
      en: "A good route should compare bridge viewpoints, riverside walking and local food streets, with clear explanation of border etiquette.",
      zh: "适合把桥梁视角、江边步行和本地餐饮串起来，同时讲清边境参观礼仪。"
    }
  },
  "Liaoning::Xingcheng Ancient City": {
    image: "/images/destinations/optimized/wiki-liaoning-xingcheng-ancient-city.jpg",
    caption: { en: "Xingcheng Ancient City", zh: "兴城古城" },
    overview: {
      en: "Xingcheng Ancient City is a Ming coastal-defense city, with walls, gates, old streets and the military geography of the Liaodong coast.",
      zh: "兴城古城的核心内容包括明代海防城池、城墙城门、老街生活和辽东海岸军事地理。它不是普通仿古街区，而是真实城防遗存。"
    },
    experience: {
      en: "A good visit should walk the walls and gates, then connect the old city with nearby coastal defense and local daily life.",
      zh: "游览应走城墙和城门，再把古城与周边海防背景、本地日常生活联系起来。"
    }
  },
  "Liaoning::Liaoyang White Pagoda": {
    image: "/images/destinations/optimized/wiki-liaoning-liaoyang-white-pagoda.jpg",
    caption: { en: "Liaoyang White Pagoda", zh: "辽阳白塔" },
    overview: {
      en: "Liaoyang White Pagoda represents Liao-Jin Buddhist architecture, old regional-center history and the layered urban memory of Liaoyang.",
      zh: "辽阳白塔的介绍应写清辽金佛教建筑、古代区域中心和辽阳城市记忆。塔体比例、寺院环境和老城位置共同构成它的价值。"
    },
    experience: {
      en: "A good visit should slow down for pagoda proportions, brick details and surrounding urban context, not just photograph the tower from one angle.",
      zh: "适合慢看塔身比例、砖构细节和周边城市环境，不要只从一个角度拍塔。"
    }
  },
  "Liaoning::Jinzhou Guta Night Food": {
    image: "/images/destinations/liaoning-jinzhou-guta-night-food-clean.png",
    caption: { en: "Jinzhou Guta night market", zh: "锦州古塔夜市" },
    overview: {
      en: "Jinzhou Guta Night Food is about barbecue smoke, night-market stalls, local snacks and the lively evening rhythm around Guta District.",
      zh: "锦州古塔夜食适合从锦州烧烤、夜市摊位、本地小吃和古塔区夜间街头节奏进入。这里看的是东北小城夜晚怎么吃、怎么逛，烟火气比单独看塔楼更重要。"
    },
    experience: {
      en: "A good tasting route can mix skewers, small dishes and local snack stops, explaining ordering habits and why Jinzhou barbecue is regionally famous.",
      zh: "建议傍晚到夜间安排，先逛夜市摊位，再选本地烧烤店或小吃摊，留意蘸料、烤法和当地人点单节奏。"
    }
  },
  "Beijing::Forbidden City": {
    image: "/images/destinations/optimized/wiki-beijing-forbidden-city.jpg",
    caption: { en: "Forbidden City, Beijing", zh: "北京故宫" },
    overview: {
      en: "The Forbidden City is best read through the imperial axis, palace hierarchy, courtyards, ceremonial spaces and Ming-Qing court life.",
      zh: "故宫的核心内容包括中轴线、宫殿等级、院落秩序、礼制空间和明清宫廷生活。它的价值在于整体宫城结构，不只是单个大殿。"
    },
    experience: {
      en: "A good visit should choose a focused route, compare outer and inner court spaces, and leave time for side halls or quieter courtyards.",
      zh: "游览应选择有重点的路线，比较外朝与内廷空间，并给侧殿或安静院落留出时间。"
    }
  },
  "Beijing::Mutianyu Great Wall": {
    image: "/images/destinations/optimized/wiki-beijing-mutianyu-great-wall.jpg",
    caption: { en: "Mutianyu Great Wall", zh: "慕田峪长城" },
    overview: {
      en: "Mutianyu Great Wall combines mountain ridges, watchtowers, restored wall sections and northern-defense history in a greener Beijing landscape.",
      zh: "慕田峪长城的核心内容包括山脊、敌楼、修复墙体和北方防御历史。它的特点是山势开阔、植被丰富，适合看长城如何顺山而行。"
    },
    experience: {
      en: "A good route matches cableway and walking distance to fitness, choosing tower sections by light, crowd level and weather.",
      zh: "路线要按体力选择缆车和步行段，根据光线、人流和天气安排敌楼区间。"
    }
  },
  "Beijing::Temple of Heaven": {
    image: "/images/destinations/optimized/wiki-beijing-temple-of-heaven.jpg",
    caption: { en: "Temple of Heaven", zh: "天坛" },
    overview: {
      en: "Temple of Heaven is about ritual architecture, cosmology, imperial ceremonies and the living morning activity of Beijing residents in the surrounding park.",
      zh: "天坛的核心内容包括祭天建筑、礼制宇宙观、皇家仪式和公园里的北京晨练生活。圜丘、祈年殿和林荫空间要一起看。"
    },
    experience: {
      en: "A good visit starts early if possible, balancing major ritual buildings with local park life and quieter tree-lined paths.",
      zh: "适合早些进入，把主要礼制建筑、本地晨练和林间步道结合起来看。"
    }
  },
  "Beijing::Hutong Family Visit": {
    image: "/images/experience-beijing-hutong.jpg",
    caption: { en: "Beijing hutong courtyard life", zh: "北京胡同与四合院生活" },
    overview: {
      en: "A hutong family visit is best understood through courtyard homes, alley scale, neighborhood routines, local conversation and the changing life of old Beijing lanes.",
      zh: "胡同家庭拜访的介绍应写清四合院、巷道尺度、邻里日常、本地交流和老北京街巷生活变化。它重点是街巷生活和院落关系。"
    },
    experience: {
      en: "A good visit should be respectful and small-scale, with time to understand courtyard layout, family routines and how hutongs are lived in today.",
      zh: "体验应保持小规模和尊重，讲清院落格局、家庭日常和今天胡同如何继续被使用。"
    }
  },
  "Beijing::Summer Palace": {
    image: "/images/destinations/optimized/wiki-beijing-summer-palace.jpg",
    caption: { en: "Summer Palace and Kunming Lake", zh: "颐和园与昆明湖" },
    overview: {
      en: "The Summer Palace combines imperial gardens, Kunming Lake, Longevity Hill, corridors, pavilions and Qing leisure politics.",
      zh: "颐和园的核心内容包括皇家园林、昆明湖、万寿山、长廊、亭台和清代宫廷休闲政治。湖山格局是它的核心。"
    },
    experience: {
      en: "A good route should choose lakeside and hill sections based on time, with attention to viewpoints, painted corridors and seasonal light.",
      zh: "游览可按时间选择湖边与山上路线，重点看视角转换、长廊彩画和季节光线。"
    }
  },
  "Beijing::Lama Temple": {
    image: "/images/destinations/beijing-lama-temple-clean.png",
    caption: { en: "Lama Temple, Beijing", zh: "北京雍和宫" },
    overview: {
      en: "Lama Temple should be understood as a Tibetan Buddhist temple within Beijing's imperial-city context, with ritual practice, halls, incense and Qing history.",
      zh: "雍和宫要放在北京皇城背景中的藏传佛教寺院来展开。殿宇、香火、礼佛秩序和清代历史共同构成这里的气质。"
    },
    experience: {
      en: "A respectful visit should explain prayer etiquette, hall sequence and religious context, keeping a slower and quieter pace.",
      zh: "参观应讲清礼佛礼仪、殿宇顺序和宗教背景，保持较慢、安静的节奏。"
    }
  },
  "Beijing::798 Art District": {
    image: "/images/destinations/optimized/wiki-beijing-798-art-district.jpg",
    caption: { en: "798 Art District", zh: "798艺术区" },
    overview: {
      en: "798 Art District is about factory architecture, industrial reuse, contemporary galleries, design shops and Beijing's creative urban culture.",
      zh: "798艺术区的核心内容包括工厂建筑、工业遗存再利用、当代画廊、设计店和北京创意街区文化。"
    },
    experience: {
      en: "A good visit should move between galleries, old factory details and public art, checking current exhibitions rather than only walking the main street.",
      zh: "适合把画廊、老厂房细节和公共艺术结合起来看，并关注当期展览，而不是只走主街。"
    }
  },
  "Beijing::Panjiayuan Market": {
    image: "/images/destinations/optimized/wiki-beijing-panjiayuan-market.jpg",
    caption: { en: "Panjiayuan Market", zh: "潘家园市场" },
    overview: {
      en: "Panjiayuan Market is a folk-object and antiques market, full of ceramics, old books, beads, crafts, replicas and weekend bargaining culture.",
      zh: "潘家园市场的介绍应写清古玩、旧书、瓷器、珠串、民间物件、仿制品和周末淘货文化。它更像观察北京市场生活的窗口。"
    },
    experience: {
      en: "A good visit should explain browsing and bargaining habits, authenticity caution and the difference between collecting, souvenirs and visual curiosity.",
      zh: "游览要讲清逛摊、议价和真假辨别的基本常识，区分收藏、纪念品和纯粹看热闹的不同体验。"
    }
  },
  "Beijing::Beijing Breakfast Walk": {
    image: "/images/destinations/beijing-breakfast-walk-clean.png",
    caption: { en: "Beijing breakfast: douzhi and jiaoquan", zh: "北京早点：豆汁与焦圈" },
    overview: {
      en: "Beijing Breakfast Walk is best understood through neighborhood morning food such as douzhi, jiaoquan, jianbing, baozi, soy milk and small shop routines.",
      zh: "北京早点漫步的核心内容包括豆汁、焦圈、煎饼、包子、豆浆和社区小店的早晨节奏。"
    },
    experience: {
      en: "A good route starts early, mixes classic and approachable foods, and explains local tastes honestly, especially strong flavors such as douzhi.",
      zh: "合适的路线要早出发，把经典早点和更容易接受的食物搭配起来，也要诚实说明豆汁这类强烈地方口味。"
    }
  },
  "Hebei::Chengde Mountain Resort": {
    image: "/images/destinations/optimized/wiki-hebei-chengde-mountain-resort.jpg",
    caption: { en: "Chengde Mountain Resort", zh: "承德避暑山庄" },
    overview: {
      en: "Chengde Mountain Resort should be understood through Qing imperial gardens, lakes, plains, hills and the political symbolism of ruling a multi-ethnic frontier empire.",
      zh: "承德避暑山庄的核心内容包括清代皇家园林、湖区、平原、山地和多民族边疆治理象征。它不是普通园林，而是政治与景观结合的宫苑。"
    },
    experience: {
      en: "A good visit should divide the large site into lake, plain and hill areas, then connect it with the surrounding temples if time allows.",
      zh: "游览应把湖区、平原区和山区分开安排，再视时间连接外八庙等周边遗产。"
    }
  },
  "Hebei::Shanhaiguan Pass": {
    image: "/images/destinations/optimized/wiki-hebei-shanhaiguan-pass.jpg",
    caption: { en: "Shanhaiguan Pass", zh: "山海关" },
    overview: {
      en: "Shanhaiguan Pass is the Great Wall gateway where mountains, fortress walls and the Bohai Sea meet, carrying strong coastal-defense meaning.",
      zh: "山海关的重点是山、关城、长城和渤海海岸相接的防御格局。它要作为长城入海前后的关隘体系来展开。"
    },
    experience: {
      en: "A good route should compare the gate tower, walls and sea-facing geography, explaining why this pass became so symbolically important.",
      zh: "游览应比较关楼、城墙和面海地理，讲清这里为什么成为长城关隘中极具象征性的地点。"
    }
  },
  "Hebei::Baiyangdian Wetland": {
    image: "/images/destinations/optimized/wiki-hebei-baiyangdian-wetland.jpg",
    caption: { en: "Baiyangdian Wetland", zh: "白洋淀湿地" },
    overview: {
      en: "Baiyangdian Wetland is a North China water landscape of reed lakes, boats, villages, lotus seasons and wetland ecology.",
      zh: "白洋淀的介绍应写清芦苇湖泊、船行水道、水乡村落、荷花季节和华北湿地生态。这里的特点是水网与村庄相互嵌套。"
    },
    experience: {
      en: "A good visit should choose boat routes and viewing seasons carefully, balancing scenery with wetland protection and village context.",
      zh: "行程要根据季节选择船线和停留点，把风景、湿地保护和村落背景结合起来。"
    }
  },
  "Hebei::Mulan Weichang": {
    image: "/images/destinations/hebei-mulan-weichang-corrected.png",
    caption: { en: "Mulan Weichang forest and grassland", zh: "木兰围场森林草原" },
    overview: {
      en: "Mulan Weichang brings together the Saihanba-style mix of grassland, forest, rolling hills and Qing imperial hunting landscape, not rapeseed fields.",
      zh: "木兰围场要呈现塞罕坝一带的森林、草原、丘陵和清代皇家围猎背景。"
    },
    experience: {
      en: "A good visit should follow season, road conditions and viewpoint distances, linking grassland scenery with forest restoration and historical hunting grounds.",
      zh: "游览要结合季节、道路和观景距离，把草原风景、林场恢复和围猎历史一起讲清。"
    }
  },
  "Hebei::Zhaozhou Bridge": {
    image: "/images/destinations/optimized/wiki-hebei-zhaozhou-bridge.jpg",
    caption: { en: "Zhaozhou Bridge", zh: "赵州桥" },
    overview: {
      en: "Zhaozhou Bridge is an ancient open-spandrel stone arch bridge, important for Sui-dynasty engineering, proportions and long structural survival.",
      zh: "赵州桥的核心内容包括隋代石拱桥工程、敞肩拱结构、比例和长期保存。它的价值在于古代桥梁技术本身。"
    },
    experience: {
      en: "A good visit is best understood through arch structure, stonework and river setting, with enough context to appreciate why the bridge is technically significant.",
      zh: "参观应重点看拱券结构、石作细节和河道环境，说明它在古代桥梁工程中的意义。"
    }
  },
  "Hebei::Zhengding Ancient City": {
    image: "/images/destinations/hebei-zhengding-ancient-city-corrected.png",
    caption: { en: "Zhengding Longxing Temple", zh: "正定隆兴寺" },
    overview: {
      en: "Zhengding Ancient City should be introduced through temples, pagodas, old-city layout and especially Longxing Temple's northern Buddhist architecture.",
      zh: "正定古城的核心内容包括寺庙、古塔、老城格局和隆兴寺等北方佛教建筑。它应使用正定实景，而不是其他城市城墙图。"
    },
    experience: {
      en: "A good route should connect Longxing Temple, pagodas and city streets, showing how Zhengding's historic layers sit inside an active county town.",
      zh: "路线可把隆兴寺、古塔和古城街巷串起来，看历史层次如何嵌在今天的县城生活里。"
    }
  },
  "Hebei::Xibaipo": {
    image: "/images/destinations/optimized/wiki-hebei-xibaipo.jpg",
    caption: { en: "Xibaipo revolutionary site", zh: "西柏坡革命旧址" },
    overview: {
      en: "Xibaipo is a modern revolutionary-history site in the Taihang foothills, centered on village offices, meeting rooms and the late-1940s political transition.",
      zh: "西柏坡的核心内容包括太行山前村落、旧址院落、会议空间和近现代革命历史转折。它的重点是历史现场与村庄环境。"
    },
    experience: {
      en: "A good visit should connect exhibition halls with preserved village spaces, keeping historical explanation concrete and site-based.",
      zh: "参观应把展馆和保存下来的村庄空间结合起来，让历史讲解落到具体地点上。"
    }
  },
  "Hebei::Beidaihe Coast": {
    image: "/images/destinations/optimized/wiki-hebei-beidaihe-coast.jpg",
    caption: { en: "Beidaihe coast", zh: "北戴河海滨" },
    overview: {
      en: "Beidaihe Coast combines beaches, seaside villas, birding areas and the summer resort history of North China's Bohai shoreline.",
      zh: "北戴河海滨的介绍应写清沙滩、海滨别墅、观鸟区域和华北渤海岸避暑传统。它的气质来自海岸休闲与历史度假生活。"
    },
    experience: {
      en: "A good visit should match beach time, coastal walking and seasonal birding or villa-history stops, avoiding an overly rushed seaside checklist.",
      zh: "行程可把沙滩、海岸步行、观鸟季节或别墅历史点结合起来，不要只在海边短暂停留。"
    }
  },
  "Hebei::Cangzhou Martial Arts": {
    image: "/images/destinations/hebei-cangzhou-martial-arts-corrected.png",
    caption: { en: "Cangzhou martial arts practice", zh: "沧州武术练习" },
    overview: {
      en: "Cangzhou Martial Arts brings together living northern martial-arts practice, lineages, training spaces and Grand Canal folk culture, not a random plaza sculpture.",
      zh: "沧州武术文化要呈现真实的北方武术练习、门派传承、训练空间和大运河民间文化，而不是用无关雕塑或广场替代。"
    },
    experience: {
      en: "A good visit should connect demonstrations or training halls with local history, explaining how martial arts remain part of Cangzhou's civic identity.",
      zh: "合适的体验应把武术展示、训练场馆和地方历史联系起来，说明武术如何成为沧州城市身份的一部分。"
    }
  },
  "Xinjiang::Kashgar Old City": {
    image: "/images/destinations/optimized/wiki-xinjiang-kashgar-old-city.jpg",
    caption: { en: "Kashgar Old City lanes and bazaar life", zh: "喀什古城街巷与巴扎生活" },
    overview: {
      en: "Kashgar Old City is best read through Uyghur lanes, earthen homes, workshops, tea houses and the Sunday-bazaar rhythm that still shapes the old Silk Road city.",
      zh: "喀什古城的核心内容包括维吾尔族街巷、土黄色民居、手工作坊、茶馆和巴扎节奏。它的吸引力在于仍然活着的丝路老城生活。"
    },
    experience: {
      en: "A good visit should walk slowly through alleys, respect residential space, and connect crafts, food and mosque-area street life instead of only taking gate photos.",
      zh: "游览应慢走街巷，尊重居民生活，把手工艺、饮食、清真寺周边街区和巴扎动线连起来看。"
    }
  },
  "Xinjiang::Tianshan Tianchi": {
    image: "/images/destinations/xinjiang-tianshan-tianchi-corrected.png",
    caption: { en: "Tianshan Tianchi below Bogda Peak", zh: "博格达峰下的天山天池" },
    overview: {
      en: "Tianshan Tianchi is an alpine lake below Bogda Peak, framed by spruce forests, mountain slopes and changing highland weather.",
      zh: "天山天池的核心是博格达峰下的高山湖泊、云杉林、山坡层次和高山天气变化。页面应呈现湖面实景，而不是红色峡谷。"
    },
    experience: {
      en: "A good route should leave time for lake viewpoints, short forest walks and weather changes, with realistic expectations about crowds and mountain visibility.",
      zh: "行程要留出湖边观景、林间短走和等待天气变化的时间，同时对人流和能见度有预期。"
    }
  },
  "Xinjiang::Turpan Grape Valley": {
    image: "/images/destinations/optimized/wiki-xinjiang-turpan-grape-valley.jpg",
    caption: { en: "Turpan oasis vineyards", zh: "吐鲁番绿洲葡萄沟" },
    overview: {
      en: "Turpan Grape Valley is an oasis landscape of grape trellises, drying houses, courtyard shade and karez irrigation culture in one of China's hottest basins.",
      zh: "吐鲁番葡萄沟的介绍应写清绿洲葡萄架、晾房、庭院阴影和坎儿井灌溉文化。它体现的是干旱盆地里的生活智慧。"
    },
    experience: {
      en: "A good visit should connect vineyard shade, drying rooms, local fruit tasting and water-use history, not treat it as a simple garden stop.",
      zh: "游览应把葡萄架、晾房、瓜果品尝和水利历史结合起来，而不是只把它当成普通园林。"
    }
  },
  "Xinjiang::Nalati Grassland": {
    image: "/images/destinations/optimized/wiki-xinjiang-nalati-grassland.jpg",
    caption: { en: "Nalati grassland and Kazakh pasture", zh: "那拉提草原与哈萨克牧场" },
    overview: {
      en: "Nalati Grassland belongs to the Ili valley landscape, where rolling meadows, spruce slopes, herds and Kazakh pastoral life define the experience.",
      zh: "那拉提草原的核心内容包括伊犁河谷草甸、云杉山坡、牧群和哈萨克牧区生活。它的层次来自草原与山地相接。"
    },
    experience: {
      en: "A good route should choose viewing platforms and meadow walks by season, keeping time for weather shifts and local pastoral context.",
      zh: "行程可根据季节选择观景台和草甸步行，留意天气变化，并补充牧区生活背景。"
    }
  },
  "Xinjiang::Karakoram Highway": {
    image: "/images/destinations/xinjiang-karakoram-highway-wiki-real.jpg",
    caption: { en: "Karakoram Highway in the Pamirs", zh: "帕米尔高原上的喀喇昆仑公路" },
    overview: {
      en: "Karakoram Highway brings together the Pamir road itself: snow peaks, high passes, dry valleys, border towns and the feeling of crossing a huge plateau.",
      zh: "喀喇昆仑公路要呈现帕米尔高原道路本身：雪峰、山口、干旱河谷、边境城镇和高原穿行感。"
    },
    experience: {
      en: "A good drive should plan for altitude, checkpoints, road time and photo stops, reading the landscape through distance rather than quick sightseeing.",
      zh: "行程要考虑海拔、检查站、车程和停车点，用路上的距离感理解帕米尔景观。"
    }
  },
  "Xinjiang::Kanas Lake": {
    image: "/images/destinations/optimized/wiki-xinjiang-kanas-lake.jpg",
    caption: { en: "Kanas Lake and Altai forests", zh: "喀纳斯湖与阿尔泰森林" },
    overview: {
      en: "Kanas Lake is defined by glacier-fed water, Altai forests, Tuva village culture and strong northern seasonal color.",
      zh: "喀纳斯湖的核心内容包括冰川补给湖水、阿尔泰森林、图瓦村落和北疆季节色彩。水色与林色是它的辨识度。"
    },
    experience: {
      en: "A good visit should balance lake viewpoints, village stops and shuttle timing, choosing routes by season and weather.",
      zh: "游览应平衡湖景观台、村落停留和区间车时间，根据季节与天气安排路线。"
    }
  },
  "Xinjiang::Hotan Bazaar": {
    image: "/images/destinations/xinjiang-hotan-bazaar-corrected.png",
    caption: { en: "Hotan bazaar food and jade trade", zh: "和田巴扎食物与玉石交易" },
    overview: {
      en: "Hotan Bazaar should be about southern Xinjiang market routines: naan, fruit, spices, carpets, jade trade and the dense everyday rhythm of Hotan streets.",
      zh: "和田巴扎的核心内容包括南疆市场日常：馕、瓜果、香料、地毯、玉石交易和和田街头的生活节奏。"
    },
    experience: {
      en: "A good visit should start with food and craft sections, explain bargaining etiquette and keep the experience grounded in local daily shopping.",
      zh: "适合从食物和手工艺摊位看起，讲清议价习惯和本地采购节奏。"
    }
  },
  "Xinjiang::Kuqa Grand Canyon": {
    image: "/images/destination-kuqa-grand-canyon-real.jpg",
    caption: { en: "Kuqa red sandstone canyon", zh: "库车红色砂岩峡谷" },
    overview: {
      en: "Kuqa Grand Canyon is a dry-land canyon of red sandstone walls shaped by wind, floodwater and southern Xinjiang light.",
      zh: "库车大峡谷的核心内容包括红色砂岩、狭窄谷壁、风蚀水蚀和南疆干燥光线。它的震撼来自岩壁尺度和色彩。"
    },
    experience: {
      en: "A good visit should consider heat, sun, walking distance and light direction, leaving time to notice texture rather than only rushing to the deepest section.",
      zh: "游览要考虑高温、日晒、步行距离和光线方向，留时间看岩层纹理。"
    }
  },
  "Xinjiang::Yining Kazanqi": {
    image: "/images/destinations/xinjiang-yining-kazanqi-corrected.png",
    caption: { en: "Yining Kazanqi colorful homes", zh: "伊宁喀赞其彩色民居" },
    overview: {
      en: "Yining Kazanqi is a living Uyghur neighborhood of colorful homes, courtyards, small shops, food stops and Ili multicultural street life.",
      zh: "伊宁喀赞其要呈现彩色民居、庭院、小店、饮食和伊犁多民族街区生活。它不应只用清真寺夜景概括。"
    },
    experience: {
      en: "A good walk should stay respectful in residential lanes, connect architecture with food and local conversation, and avoid over-staged photo stops.",
      zh: "游览应尊重居住街巷，把民居色彩、饮食和本地交流连起来看，避免只做摆拍。"
    }
  },
  "Tibet::Potala Palace": {
    image: "/images/destinations/optimized/wiki-tibet-potala-palace.jpg",
    caption: { en: "Potala Palace above Lhasa", zh: "拉萨布达拉宫" },
    overview: {
      en: "Potala Palace rises from Marpo Ri above old Lhasa, combining palace-fortress architecture, white and red palace volumes, Buddhist chapels, political memory and the skyline of a high-altitude city.",
      zh: "布达拉宫矗立在拉萨红山上，白宫与红宫层层叠起，把宫堡建筑、佛殿空间、旧拉萨政治记忆和高原城市天际线压在同一个视野里。页面应写出它的高差、体量、殿堂层次和拉萨老城之间的关系。"
    },
    experience: {
      en: "A good visit should prepare timed entry, altitude pacing and the palace route before climbing, then slow down for murals, chapels, stairways and views back toward Lhasa.",
      zh: "参观要提前确认预约时段，按高原体力慢慢上行。进入后应把楼梯动线、壁画、佛殿、宫殿功能和回望拉萨城的视角串起来，重点是进入空间后的层次和动线。"
    }
  },
  "Tibet::Jokhang Temple": {
    image: "/images/destinations/optimized/wiki-tibet-jokhang-temple.jpg",
    caption: { en: "Jokhang Temple and Barkhor pilgrims", zh: "大昭寺与八廓朝圣" },
    overview: {
      en: "Jokhang Temple is the devotional center of old Lhasa, where pilgrimage circuits, incense, temple halls and Barkhor street life belong together.",
      zh: "大昭寺是拉萨老城信仰生活的中心。转经人流、寺前香火、殿堂礼佛秩序和八廓街商铺日常交织在一起，构成这里最重要的现场。"
    },
    experience: {
      en: "A respectful visit should explain pilgrimage etiquette, move slowly and observe Barkhor life without interrupting worship.",
      zh: "参观应先说明转经方向、排队与拍摄礼仪，再进入殿堂和八廓街。节奏要慢，重点看信众如何使用这个空间。"
    }
  },
  "Tibet::Yamdrok Lake": {
    image: "/images/destinations/optimized/wiki-tibet-yamdrok-lake.jpg",
    caption: { en: "Yamdrok Lake highland water", zh: "羊卓雍措高原湖水" },
    overview: {
      en: "Yamdrok Lake is a turquoise highland lake set among pasture, mountain roads and wide plateau light.",
      zh: "羊卓雍措的重点是高原蓝色湖水、牧场、山路和开阔光线。湖岸曲线与山体共同形成景观。"
    },
    experience: {
      en: "A good route should plan viewpoints, wind and altitude, avoiding rushed stops that miss the lake's scale.",
      zh: "行程要考虑观景点、风和海拔，不要只短暂停车拍照而错过湖面尺度。"
    }
  },
  "Tibet::Namtso Lake": {
    image: "/images/destinations/optimized/wiki-tibet-namtso-lake.jpg",
    caption: { en: "Namtso Lake sky and prayer flags", zh: "纳木措湖天光与经幡" },
    overview: {
      en: "Namtso Lake is defined by vast sky, prayer flags, nomadic land, cold wind and high-altitude lake scenery.",
      zh: "纳木措的气质来自高海拔湖面、辽阔天空、经幡、牧区和寒风。湖岸的开阔尺度、远山线条和天气变化，会直接决定现场感受。"
    },
    experience: {
      en: "A good visit needs altitude awareness, warm clothing and time for lakeside walking when weather allows.",
      zh: "游览要注意海拔反应和保暖，天气允许时留出湖边步行时间。"
    }
  },
  "Tibet::Ganden Monastery": {
    image: "/images/destinations/optimized/wiki-tibet-ganden-monastery.jpg",
    caption: { en: "Ganden Monastery on the mountain slope", zh: "山坡上的甘丹寺" },
    overview: {
      en: "Ganden Monastery sits on a mountain slope above the Lhasa valley, connecting Gelug history, monastic courtyards and broad valley views.",
      zh: "甘丹寺坐落在拉萨河谷上方的山坡上，寺院院落、僧院生活、格鲁派历史和俯瞰河谷的视野共同构成它的层次。这里要看寺院如何顺山势展开。"
    },
    experience: {
      en: "A good visit should move gently at altitude, explain monastic history and allow time for the kora route or viewpoints.",
      zh: "参观要放慢高原节奏，讲清寺院历史，并给转山路线或观景点留时间。"
    }
  },
  "Tibet::Tashilhunpo Monastery": {
    image: "/images/destinations/optimized/wiki-tibet-tashilhunpo-monastery.jpg",
    caption: { en: "Tashilhunpo Monastery, Shigatse", zh: "日喀则扎什伦布寺" },
    overview: {
      en: "Tashilhunpo Monastery is central to Shigatse, with large monastic halls, golden roofs, courtyards and Gelug religious history.",
      zh: "扎什伦布寺是日喀则的重要寺院，殿堂、金顶、院落和格鲁派宗教历史构成主要看点。"
    },
    experience: {
      en: "A good visit should explain hall sequence and religious etiquette, keeping enough time for courtyards and surrounding old-town life.",
      zh: "参观应讲清殿堂顺序和宗教礼仪，同时留意寺院周边老城生活。"
    }
  },
  "Tibet::Basum Lake": {
    image: "/images/destinations/optimized/wiki-tibet-basum-lake.jpg",
    caption: { en: "Basum Lake forests and monastery island", zh: "巴松措森林与湖心岛" },
    overview: {
      en: "Basum Lake combines green water, forested slopes, monastery island scenery and the gentler landscape of eastern Tibet.",
      zh: "巴松措呈现的是藏东更湿润的山地景观：绿色湖水、森林山坡、湖心岛寺院和村落道路连在一起，气质不同于西藏中部更开阔干冷的湖泊。"
    },
    experience: {
      en: "A good route should allow time for lake walks, island views and weather changes rather than only a quick platform stop.",
      zh: "游览应留时间走湖边、看湖心岛和观察天气变化。合适的节奏是把湖水颜色、森林层次、寺院位置和林芝山地气候一起看。"
    }
  },
  "Tibet::Yarlung Valley": {
    image: "/images/destinations/optimized/wiki-tibet-yarlung-valley.jpg",
    caption: { en: "Yarlung Valley castles and river landscape", zh: "雅鲁藏布江谷地与古堡景观" },
    overview: {
      en: "Yarlung Valley is tied to early Tibetan history, river terraces, fortress-like sites and the cultural origins around the valley.",
      zh: "雅砻河谷承载早期吐蕃历史，河谷台地、古堡遗址、村落和雅鲁藏布江支流共同构成文化景观。这里要呈现的不是单一景点，而是西藏早期文明如何依托河谷展开。"
    },
    experience: {
      en: "A good visit should connect viewpoints with historical explanation, reading the valley as a cultural landscape rather than only scenery.",
      zh: "行程要把观景点、遗址位置和历史讲解结合起来，说明河谷地形、王室记忆和聚落分布之间的关系。"
    }
  },
  "Tibet::Lhasa Barkhor": {
    image: "/images/destinations/optimized/wiki-tibet-lhasa-barkhor.jpg",
    caption: { en: "Barkhor street life in old Lhasa", zh: "拉萨八廓街生活" },
    overview: {
      en: "Lhasa Barkhor is a devotional and commercial circuit around Jokhang Temple, mixing pilgrims, shops, tea houses and old-city lanes.",
      zh: "八廓街是围绕大昭寺的转经与商业街巷，信众、商铺、茶馆和老城生活交织在一起。"
    },
    experience: {
      en: "A good walk should follow local etiquette, move with the clockwise flow and leave time for tea-house or side-lane observations.",
      zh: "游览要遵守转经方向和礼仪，留时间观察茶馆与支巷生活。"
    }
  },
  "Qinghai::Qinghai Lake": {
    image: "/images/destinations/qinghai-qinghai-lake-corrected.png",
    caption: { en: "Qinghai Lake shoreline and plateau light", zh: "青海湖岸线与高原光线" },
    overview: {
      en: "Qinghai Lake brings together real lakeshore scenery: blue water, grassland, distant mountains, birds and seasonal rapeseed fields along the plateau basin.",
      zh: "青海湖要呈现真实湖岸：蓝色湖水、草原、远山、候鸟和季节性油菜花。它不能使用卫星图替代实景。"
    },
    experience: {
      en: "A good visit should choose shoreline sections by season and light, with care for protected areas and weather changes.",
      zh: "行程要按季节和光线选择湖岸段，注意保护区规定和高原天气变化。"
    }
  },
  "Qinghai::Chaka Salt Lake": {
    image: "/images/destinations/optimized/wiki-qinghai-chaka-salt-lake.jpg",
    caption: { en: "Chaka Salt Lake reflections", zh: "茶卡盐湖倒影" },
    overview: {
      en: "Chaka Salt Lake is known for salt flats, shallow-water reflections, rail tracks and the big-sky visual effect of the Qaidam Basin edge.",
      zh: "茶卡盐湖的核心内容包括盐滩、浅水倒影、小火车轨道和柴达木边缘的大天空视觉。"
    },
    experience: {
      en: "A good visit depends on weather, wind and water level, with realistic expectations when reflections are weak.",
      zh: "游览效果取决于天气、风和水位，倒影不稳定，要有合理预期。"
    }
  },
  "Qinghai::Kumbum Monastery": {
    image: "/images/destinations/qinghai-kumbum-monastery-clean.png",
    caption: { en: "Kumbum Monastery, Qinghai", zh: "青海塔尔寺" },
    overview: {
      en: "Kumbum Monastery is a major Tibetan Buddhist monastery near Xining, known for halls, butter sculpture, murals, thangka traditions and monastic courtyards.",
      zh: "塔尔寺是西宁附近重要藏传佛教寺院，殿堂、酥油花、壁画、唐卡传统和院落空间是核心。"
    },
    experience: {
      en: "A respectful visit should explain religious etiquette and craft traditions while keeping a quiet pace through halls and courtyards.",
      zh: "参观应讲清宗教礼仪和工艺传统，在殿堂与院落中保持安静节奏。"
    }
  },
  "Qinghai::Tongren Thangka Studios": {
    image: "/images/destinations/optimized/wiki-qinghai-tongren-thangka-studios.jpg",
    caption: { en: "Tongren thangka studios", zh: "同仁唐卡工作室" },
    overview: {
      en: "Tongren Thangka Studios are about Regong art, pigments, line drawing, apprenticeship and the patient craft behind Tibetan Buddhist images.",
      zh: "同仁唐卡工作室的介绍应写清热贡艺术、矿物颜料、线描、师徒传承和藏传佛教图像工艺。"
    },
    experience: {
      en: "A good visit is best understood through process and respect studio rules, asking before photographing artists or sacred images.",
      zh: "体验应关注制作过程并尊重工作室规则，拍摄艺人或宗教图像前要先询问。"
    }
  },
  "Qinghai::Guide Yellow River": {
    image: "/images/destinations/optimized/wiki-qinghai-guide-yellow-river.jpg",
    caption: { en: "Guide Yellow River clear-water valley", zh: "贵德黄河清水河谷" },
    overview: {
      en: "Guide Yellow River is known for clearer Yellow River water, Danxia-like banks, orchards and a gentler valley landscape near the plateau edge.",
      zh: "贵德黄河的核心内容包括较清澈的河水、丹霞色河岸、果园和高原边缘较温和的河谷景观。"
    },
    experience: {
      en: "A good route should combine river viewpoints, town stops and seasonal light instead of treating it as any ordinary river bend.",
      zh: "游览可把河岸观景、县城停留和季节光线结合起来，而不是只看普通河湾。"
    }
  },
  "Qinghai::Menyuan Rapeseed Fields": {
    image: "/images/destinations/qinghai-menyuan-rapeseed-fields-clean.png",
    caption: { en: "Menyuan rapeseed fields below mountains", zh: "门源山下油菜花田" },
    overview: {
      en: "Menyuan Rapeseed Fields brings together Qinghai's highland flower fields under mountains, with broad yellow fields, village belts and summer plateau light.",
      zh: ""
    },
    experience: {
      en: "A good visit should follow bloom season and viewpoint conditions, leaving time for wide landscape views rather than only close flower photos.",
      zh: "行程要看花期和观景台条件，重点看大尺度田园与山地背景。"
    }
  },
  "Qinghai::Qilian Grassland": {
    image: "/images/destinations/qinghai-qilian-grassland-clean.png",
    caption: { en: "Qilian grassland and snow peaks", zh: "祁连草原与雪山" },
    overview: {
      en: "Qilian Grassland combines alpine pasture, snow peaks, herds, wildflowers and the mountain edge of northern Qinghai.",
      zh: "祁连草原的核心内容包括高山牧场、雪峰、牧群、野花和青海北部山地边缘。"
    },
    experience: {
      en: "A good route should match road time, weather and grazing areas, keeping stops respectful and low-impact.",
      zh: "行程要考虑车程、天气和牧场区域，停车观景要尊重牧区并减少干扰。"
    }
  },
  "Qinghai::Hoh Xil View Route": {
    image: "/images/destinations/qinghai-hoh-xil-view-route-corrected.png",
    caption: { en: "Hoh Xil plateau wildlife route", zh: "可可西里高原野生动物线路" },
    overview: {
      en: "Hoh Xil View Route brings together plateau wildlife, open road, permafrost land and Tibetan antelope habitat, not city transport.",
      zh: ""
    },
    experience: {
      en: "A good visit should emphasize distance, altitude, wildlife protection and no-chase viewing rules.",
      zh: "行程要强调距离、海拔、野生动物保护和不追逐不投喂的观赏规则。"
    }
  },
  "Qinghai::Dongguan Mosque": {
    image: "/images/destinations/optimized/wiki-qinghai-dongguan-mosque.jpg",
    caption: { en: "Dongguan Mosque, Xining", zh: "西宁东关清真大寺" },
    overview: {
      en: "Dongguan Mosque reflects Xining's Muslim community life, mosque architecture, prayer routines and the city's multi-ethnic food streets.",
      zh: "东关清真大寺体现西宁穆斯林社区生活、清真寺建筑、礼拜秩序和多民族饮食街区。"
    },
    experience: {
      en: "A respectful visit should check visiting times, dress modestly and connect the mosque with surrounding local food streets.",
      zh: "参观要确认开放时间、注意着装，并把清真寺与周边本地饮食街区联系起来。"
    }
  },
  "Gansu::Mogao Caves": {
    image: "/images/destinations/optimized/wiki-gansu-mogao-caves.jpg",
    caption: { en: "Mogao Caves cliff temples", zh: "莫高窟崖壁石窟" },
    overview: {
      en: "Mogao Caves should be understood through Buddhist murals, painted sculpture, cave architecture and Dunhuang's Silk Road exchange history.",
      zh: "莫高窟的核心内容包括佛教壁画、彩塑、洞窟建筑和敦煌丝路交流史。它的重点是石窟内部艺术与历史。"
    },
    experience: {
      en: "A good visit should follow ticket rules, protect the caves from photography damage and use museum context before or after the cave route.",
      zh: "参观要遵守门票和拍摄规定，保护洞窟，并结合数字展示或博物馆补充背景。"
    }
  },
  "Gansu::Mingsha Mountain and Crescent Spring": {
    image: "/images/destinations/optimized/wiki-gansu-mingsha-mountain-and-crescent-spring.jpg",
    caption: { en: "Mingsha Mountain and Crescent Spring", zh: "鸣沙山与月牙泉" },
    overview: {
      en: "Mingsha Mountain and Crescent Spring combine desert dunes, the small oasis spring, camel routes and the edge-of-Dunhuang landscape.",
      zh: "鸣沙山月牙泉的核心内容包括沙丘、月牙形泉水、骆驼线路和敦煌城边的沙漠绿洲关系。"
    },
    experience: {
      en: "A good visit should choose cooler hours, protect from sand and sun, and plan viewpoints for both dunes and the spring.",
      zh: "游览应避开高温，注意防沙防晒，并安排能同时看沙丘和泉水的视角。"
    }
  },
  "Gansu::Jiayuguan Pass": {
    image: "/images/destinations/optimized/wiki-gansu-jiayuguan-pass.jpg",
    caption: { en: "Jiayuguan Pass fortress", zh: "嘉峪关关城" },
    overview: {
      en: "Jiayuguan Pass is a Ming Great Wall fortress at the western corridor, linking walls, gate towers, desert wind and Hexi frontier defense.",
      zh: "嘉峪关的核心内容包括明代长城关城、城楼、荒漠风和河西走廊防御体系。"
    },
    experience: {
      en: "A good visit should compare fortress layout, wall lines and desert surroundings, not isolate the gate as a single photo stop.",
      zh: "游览应比较关城格局、城墙线和荒漠环境，不要只拍城楼。"
    }
  },
  "Gansu::Zhangye Danxia": {
    image: "/images/destinations/optimized/wiki-gansu-zhangye-danxia.jpg",
    caption: { en: "Zhangye Danxia colored hills", zh: "张掖丹霞彩色丘陵" },
    overview: {
      en: "Zhangye Danxia is a landscape of layered colored hills, dry valleys and shifting light across red, yellow and gray rock bands.",
      zh: "张掖丹霞的核心内容包括层状彩丘、干谷地貌和红黄灰岩层在光线中的变化。"
    },
    experience: {
      en: "A good visit should choose sunrise or sunset light when possible and move between platforms without trampling protected landforms.",
      zh: "适合选择日出或日落光线，在观景台之间移动，注意不要踩踏保护地貌。"
    }
  },
  "Gansu::Labrang Monastery": {
    image: "/images/destinations/optimized/wiki-gansu-labrang-monastery.jpg",
    caption: { en: "Labrang Monastery, Xiahe", zh: "夏河拉卜楞寺" },
    overview: {
      en: "Labrang Monastery is a major Tibetan Buddhist monastery in Xiahe, with scripture halls, monk colleges, prayer wheels and grassland-town life.",
      zh: "拉卜楞寺是夏河重要藏传佛教寺院，经堂、学院、转经廊和草原城镇生活构成主要体验。"
    },
    experience: {
      en: "A respectful visit should follow monastery etiquette, allow time for the kora route and connect the site with Xiahe town life.",
      zh: "参观要遵守寺院礼仪，留时间走转经路线，并把寺院与夏河镇生活联系起来。"
    }
  },
  "Gansu::Bingling Temple Grottoes": {
    image: "/images/destinations/optimized/wiki-gansu-bingling-temple-grottoes.jpg",
    caption: { en: "Bingling Temple grottoes by the Yellow River", zh: "黄河边的炳灵寺石窟" },
    overview: {
      en: "Bingling Temple Grottoes sit along the Yellow River canyon, combining cliff carvings, Buddhist sculpture and a boat-or-road approach through rugged scenery.",
      zh: "炳灵寺石窟位于黄河峡谷边，崖壁造像、佛教雕塑和水陆交通线路共同形成体验。"
    },
    experience: {
      en: "A good route should check transport conditions, water levels and time for viewing cliff sculptures carefully.",
      zh: "行程要确认交通、水位和参观时间，留足时间看崖壁造像细节。"
    }
  },
  "Gansu::Maijishan Grottoes": {
    image: "/images/destinations/optimized/wiki-gansu-maijishan-grottoes.jpg",
    caption: { en: "Maijishan Grottoes cliff walkways", zh: "麦积山石窟栈道" },
    overview: {
      en: "Maijishan Grottoes are known for cliff-face caves, narrow walkways, clay sculpture and the dramatic vertical setting near Tianshui.",
      zh: "麦积山石窟的核心内容包括崖面洞窟、窄栈道、泥塑造像和天水山地环境。"
    },
    experience: {
      en: "A good visit should plan for stairs, heights and crowd flow, with time to look at sculpture details from allowed viewpoints.",
      zh: "参观要考虑台阶、高度和人流，按允许视角慢看造像细节。"
    }
  },
  "Gansu::Dunhuang Night Market": {
    image: "/images/destinations/gansu-dunhuang-night-market-corrected.png",
    caption: { en: "Dunhuang Shazhou Night Market", zh: "敦煌沙洲夜市" },
    overview: {
      en: "Dunhuang Night Market brings together Shazhou night-market stalls, lanterns, local snacks, dried fruit, souvenirs and evening traveler energy.",
      zh: ""
    },
    experience: {
      en: "A good visit should mix food tasting with browsing, explain regional flavors and keep practical attention to crowds and prices.",
      zh: "游览可把品尝小吃和逛摊结合起来，讲清地方口味，同时注意人流和价格。"
    }
  },
  "Gansu::Hexi Corridor Road": {
    image: "/images/destinations/optimized/wiki-gansu-hexi-corridor-road.jpg",
    caption: { en: "Hexi Corridor road landscape", zh: "河西走廊路上风景" },
    overview: {
      en: "Hexi Corridor Road is a long landscape of desert edges, oasis towns, Great Wall remains, Danxia hills and Silk Road movement.",
      zh: "河西走廊路上风景的核心内容包括荒漠边缘、绿洲城镇、长城遗存、丹霞丘陵和丝路通行感。"
    },
    experience: {
      en: "A good route should treat drive time as part of the experience, linking stops by geography and history rather than isolated attractions.",
      zh: "行程应把车程本身当成体验，用地理和历史把各个点串起来。"
    }
  },
  "Shaanxi::Terracotta Army": {
    image: "/images/destinations/optimized/wiki-shaanxi-terracotta-army.jpg",
    caption: { en: "Terracotta Army, Xi'an", zh: "西安秦始皇兵马俑" },
    overview: {
      en: "The Terracotta Army is the archaeological entrance to Qin imperial power: underground military formations, individual pottery figures, weapon remains and the burial landscape of the First Emperor.",
      zh: "秦始皇兵马俑适合从秦帝国的地下军阵来看。陶俑队列、面部差异、兵种组合、兵器遗存和秦始皇陵园格局，一起呈现秦代国家力量和陵墓考古的现场。"
    },
    experience: {
      en: "A good visit compares the pits, explains formation and restoration, and connects the army to the wider mausoleum system rather than only photographing Pit 1.",
      zh: "合适的游览应比较不同俑坑，看军阵排列、修复过程和陶俑细节，再把兵马俑放回秦始皇陵体系中理解，而不是只在一号坑拍照。"
    }
  },
  "Shaanxi::Xi'an City Wall": {
    image: "/images/destinations/optimized/wiki-shaanxi-xi-an-city-wall.jpg",
    caption: { en: "Xi'an City Wall", zh: "西安城墙" },
    overview: {
      en: "Xi'an City Wall is one of the clearest places to read the old capital's urban scale: gates, ramparts, corner towers, moat lines and views into both the old city and modern Xi'an.",
      zh: "西安城墙适合从城门、瓮城、马道、角楼、护城河和城内外视野来读。它展示的不只是古墙外观，而是明代城市防御体系和今天西安城市格局之间的关系。"
    },
    experience: {
      en: "The route should choose a gate section with good light, walk or cycle a manageable distance, and explain how the wall still frames the old city.",
      zh: "游览可选择光线好的城门段，步行或骑行一小段即可，不必赶完整圈。重点是看城墙如何组织道路、街区和老城视野。"
    }
  },
  "Shaanxi::Muslim Quarter Xi'an": {
    image: "/images/destinations/optimized/wiki-shaanxi-muslim-quarter-xi-an.jpg",
    caption: { en: "Muslim Quarter, Xi'an", zh: "西安回民街" },
    overview: {
      en: "Xi'an Muslim Quarter is best understood as Hui community life around mosques, breads, noodles, grilled meats, sweets and night food lanes shaped by Silk Road exchange.",
      zh: "西安回民街要和清真寺、回坊街巷、馍、面点、烤肉、甜食和夜间小吃一起看。这里不是单纯小吃街，而是丝路交流、回族社区生活和西安夜食传统重叠的地方。"
    },
    experience: {
      en: "A good food walk balances trusted stalls, mosque context and eating rhythm, with attention to halal customs and crowded evening lanes.",
      zh: "合适的夜食路线应避开只排队拍照，选择可靠摊位和老店，讲清清真饮食习惯、回坊空间和西安人夜间吃法。"
    }
  },
  "Shaanxi::Big Wild Goose Pagoda": {
    image: "/images/destinations/optimized/wiki-shaanxi-big-wild-goose-pagoda.jpg",
    caption: { en: "Big Wild Goose Pagoda, Xi'an", zh: "西安大雁塔" },
    overview: {
      en: "Big Wild Goose Pagoda is tied to Tang Chang'an, Xuanzang's Buddhist translation work, pagoda architecture and the temple-city memory around Da Ci'en Temple.",
      zh: "大雁塔要放在唐长安和大慈恩寺背景中看。玄奘译经、佛教经典收藏、塔式建筑比例和周边城市空间，共同构成它在西安历史中的分量。"
    },
    experience: {
      en: "The visit should connect the pagoda, temple axis and Tang history, then choose nearby viewpoints by light and crowd level.",
      zh: "游览应先看塔与寺院轴线，再讲玄奘和唐代佛教传播，最后根据光线和人流选择广场或周边视角。"
    }
  },
  "Guizhou::Kaili Market": {
    image: "/images/destinations/guizhou-kaili-market-clean.png",
    caption: { en: "Kaili local market and Miao market life", zh: "凯里市集与苗侗日常交易" },
    overview: {
      en: "Kaili Market should be introduced through southeast Guizhou's Miao and Dong daily trade: woven textiles, silver ornaments, sour-soup ingredients, mountain vegetables, rice products and the conversations between vendors and local families.",
      zh: "凯里市集的核心内容包括黔东南苗侗地区的日常交易：织物、银饰、酸汤食材、山野菜、米制品和本地家庭采购都在这里交汇。这里要呈现的不是普通商业街，而是凯里周边乡镇生活、节庆物资和家常饮食如何进入城市。"
    },
    experience: {
      en: "A good visit starts in the morning, follows food stalls and textile sections, explains sour-soup flavors, festival clothing and buying habits, and keeps enough room for respectful conversation rather than staged photos.",
      zh: "合适的游览应放在清晨或上午，从食材摊、织物摊和小吃摊慢慢走起，讲清酸汤口味、节庆服饰、赶集习惯和摊主与顾客的互动。重点是看真实市集节奏，而不是只拍街面外观。"
    }
  },
  "Guangxi::Chengyang Wind and Rain Bridge": {
    image: "/images/destinations/wiki-guangxi-chengyang-wind-and-rain-bridge.jpg",
    caption: { en: "Chengyang Wind and Rain Bridge, Sanjiang", zh: "三江程阳风雨桥" },
    overview: {
      en: "Chengyang Wind and Rain Bridge should be introduced as Dong wooden architecture in Sanjiang: a covered bridge, pavilions, river crossing, village entrances and the public life that gathers around drum towers and wind-rain bridges.",
      zh: "程阳风雨桥的核心内容包括三江侗族木构桥梁：廊桥、亭阁、河道、村寨入口和鼓楼一起组成侗寨公共空间。这里不是桂林山水观景点，也不是普通古城建筑，而是侗族村寨交通、休憩、议事和节庆生活交汇的地方。"
    },
    experience: {
      en: "A good visit should walk the bridge slowly, look at the timber structure and roof layers, then connect the bridge with nearby Dong villages, drum towers, rice fields and local singing or festival traditions.",
      zh: "合适的游览应慢慢走过桥身，看木构榫卯、廊亭屋顶和桥下溪流，再把风雨桥、侗寨、鼓楼、稻田和侗族大歌或节庆习俗连起来讲。重点是理解它为什么是村寨生活的一部分，而不是只拍一张山水照片。"
    }
  },
  "Shaanxi::Huaqing Palace": {
    image: "/images/destinations/optimized/wiki-shaanxi-huaqing-palace.jpg",
    caption: { en: "Huaqing Palace, Lintong, Xi'an", zh: "西安临潼华清宫" },
    overview: {
      en: "Huaqing Palace should be introduced through the Tang imperial hot-spring complex at the foot of Mount Li, the story of Emperor Xuanzong and Yang Guifei, palace garden space and the later historical memory around Lintong.",
      zh: "华清宫要放在临潼骊山脚下来看：唐代皇家温泉、宫苑遗址、唐玄宗与杨贵妃的故事，以及近现代历史记忆共同构成这里。它不是普通仿古建筑，也不只是拍一块题字石，而是理解唐代宫廷生活、温泉文化和骊山历史层次的地点。"
    },
    experience: {
      en: "A good visit connects the spring pools, palace axes, Mount Li backdrop and historical storytelling, with enough time to separate Tang romance, archaeological remains and later political memory.",
      zh: "合适的游览应把温泉池遗址、宫苑动线、骊山背景和历史讲解串起来，区分唐代爱情叙事、遗址本身和后来的近现代记忆。重点是看清华清宫为什么在西安历史中有多重身份，而不是只走一圈外观。"
    }
  },
  "Shaanxi::Mount Hua": {
    image: "/images/destinations/optimized/wiki-shaanxi-mount-hua.jpg",
    caption: { en: "Mount Hua, Shaanxi", zh: "陕西华山" },
    overview: {
      en: "Mount Hua is a steep granite mountain known for sharp peaks, cliff paths, temples and Daoist mountain culture. Its appeal comes from height, exposure and the sequence of ridges between peaks.",
      zh: "华山的气质来自花岗岩峭壁、五峰格局、险峻栈道和道教名山传统。这里要看的是山势如何突然拔起、峰与峰之间如何相连，以及人在险道上行走时对高度和空间的感受。"
    },
    experience: {
      en: "A good route should match cableway choices and walking distance to the group, leaving time for peak views and weather changes instead of forcing every summit.",
      zh: "路线要根据体力选择索道和步行段，不必硬赶所有峰。重点是留出看云雾、山脊和绝壁视野的时间，同时注意天气和安全。"
    }
  },
  "Shaanxi::Yan'an Cave Dwellings": {
    image: "/images/destinations/optimized/wiki-shaanxi-yan-an-cave-dwellings.jpg",
    caption: { en: "Yan'an cave dwellings", zh: "延安窑洞" },
    overview: {
      en: "Yan'an cave dwellings should be introduced through loess plateau living: earth-cut homes, winter-warm summer-cool interiors, village slopes and the modern revolutionary history attached to Yan'an.",
      zh: "延安窑洞的核心内容包括黄土高原生活方式。依山开凿的窑洞、冬暖夏凉的居住经验、坡地村落形态和延安近现代革命记忆，构成这里的核心。"
    },
    experience: {
      en: "The visit should connect cave-house structure with local climate and history, then read Yan'an beyond slogans through everyday plateau life.",
      zh: "游览应把窑洞结构、黄土气候和当地人的居住方式讲清，再把革命历史放进真实的高原村落环境中理解。"
    }
  },
  "Shaanxi::Hanzhong Rapeseed Fields": {
    image: "/images/destinations/hanzhong-rapeseed-fields-corrected.png",
    caption: { en: "Hanzhong spring rapeseed fields", zh: "汉中春季油菜花田" },
    overview: {
      en: "Hanzhong rapeseed fields belong to the spring landscape of the Hanzhong Basin, where yellow flower fields spread between Qinling foothills, villages and river plains.",
      zh: "汉中油菜花田要放在汉中盆地春天来看。大片金黄色花田、秦岭南麓、村落和河谷平原连在一起，形成陕西南部与关中完全不同的温润田园景观。"
    },
    experience: {
      en: "A good visit should follow bloom timing, choose open field viewpoints and combine short village stops, rather than treating it as a generic flower photo stop.",
      zh: "游览要看花期和天气，选择开阔田埂或高处视角，再结合村落和公路沿线停留。重点是看汉中盆地春季农田的尺度和层次，而不是只拍一片黄色背景。"
    }
  },
  "Shaanxi::Famen Temple": {
    image: "/images/destinations/optimized/wiki-shaanxi-famen-temple.jpg",
    caption: { en: "Famen Temple, Shaanxi", zh: "陕西法门寺" },
    overview: {
      en: "Famen Temple is centered on Buddhist relic culture, Tang-dynasty religious patronage and the relationship between the historic temple site and the modern relic museum.",
      zh: "法门寺的核心内容包括佛指舍利、唐代皇家供养和寺院遗址与现代博物馆的关系。这里的重点是宗教记忆、文物展示和唐代礼佛传统如何叠在一起。"
    },
    experience: {
      en: "A respectful visit should explain relic belief, Tang history and museum display logic, with a slower pace through temple and exhibition spaces.",
      zh: "游览应放慢节奏，讲清舍利信仰、唐代历史和展陈逻辑。寺院空间和博物馆空间要分开看，也要连起来展开。"
    }
  },
  "Heilongjiang::Harbin Ice and Snow World": {
    image: "/images/destinations/optimized/wiki-heilongjiang-harbin-ice-and-snow-world.jpg",
    caption: { en: "Harbin Ice and Snow World", zh: "哈尔滨冰雪大世界" },
    overview: {
      en: "Harbin Ice and Snow World is about large-scale ice architecture, colored night lighting, winter festival atmosphere and the northern city's ability to turn cold into public spectacle.",
      zh: "哈尔滨冰雪大世界的核心内容包括大型冰雕建筑、夜间灯光、冬季节庆和北方城市把严寒转化为公共景观的能力。这里的核心不是普通灯会，而是冰、雪、光和城市冬季文化共同形成的现场。"
    },
    experience: {
      en: "A good visit should be planned for evening light, warm clothing, shorter outdoor pacing and enough time to see the ice structures from both close details and wide views.",
      zh: "合适的游览应安排在傍晚到夜间，注意保暖和停留节奏。路线要兼顾大型冰建筑的整体视角、细部纹理和灯光变化，而不是只匆忙拍几张夜景。"
    }
  },
  "Heilongjiang::Saint Sophia Cathedral": {
    image: "/images/destinations/optimized/wiki-heilongjiang-saint-sophia-cathedral.jpg",
    caption: { en: "Saint Sophia Cathedral, Harbin", zh: "哈尔滨圣索菲亚教堂" },
    overview: {
      en: "Saint Sophia Cathedral is best understood as Harbin's Russian-influenced urban memory: brick walls, onion domes, square life and the city's layered railway-and-trade history.",
      zh: "圣索菲亚教堂要放在哈尔滨俄式建筑和近代城市记忆中来看。红砖墙、洋葱头穹顶、广场空间和周边街区共同说明哈尔滨如何因铁路、贸易和移民形成独特城市气质。"
    },
    experience: {
      en: "A good visit should compare the exterior, square and surrounding streets, then connect the building with Harbin's wider Russian-influenced architecture.",
      zh: "合适的游览应先看教堂外观、广场尺度和周边街区，再把它与中央大街等俄式建筑放在一起理解，避免只把它当成单一拍照背景。"
    }
  },
  "Heilongjiang::Central Street Harbin": {
    image: "/images/destinations/optimized/wiki-heilongjiang-central-street-harbin.jpg",
    caption: { en: "Central Street, Harbin", zh: "哈尔滨中央大街" },
    overview: {
      en: "Central Street Harbin is a stone-paved pedestrian street shaped by Russian-style facades, old shops, winter food and the city's everyday commercial memory.",
      zh: "哈尔滨中央大街的核心内容包括石板路、俄式立面、老字号、冰棍与面包等日常饮食，以及冬季步行街氛围。它不是普通商业街，而是哈尔滨近代城市生活的可见轴线。"
    },
    experience: {
      en: "A good walk should slow down for facade details, old shop signs, snacks and side streets, linking the street to Harbin's railway-era growth.",
      zh: "合适的步行应慢看建筑立面、老店招牌、小吃和支路空间，把中央大街与哈尔滨铁路时代的城市发展联系起来，而不是只从街头走到街尾。"
    }
  },
  "Heilongjiang::Wudalianchi": {
    image: "/images/destinations/heilongjiang-wudalianchi-clean.png",
    caption: { en: "Wudalianchi volcanic landscape", zh: "五大连池火山地貌" },
    overview: {
      en: "Wudalianchi should be shown through volcanic landforms, lava fields, crater scenery, mineral springs and cold northern forests, not a railway-station exterior.",
      zh: "五大连池的核心内容包括火山地貌、熔岩台地、火山口、矿泉和北方森林景观。"
    },
    experience: {
      en: "A good visit should connect boardwalks, volcanic rocks, lake views and mineral-spring culture, with timing adjusted for weather and walking conditions.",
      zh: "合适的游览应把栈道、火山石、湖面视角和矿泉文化串联起来，根据天气和步行条件安排停留。重点是看懂火山活动如何塑造这片地貌。"
    }
  },
  "Heilongjiang::Beiji Village Mohe": {
    image: "/images/destinations/heilongjiang-beiji-village-mohe-clean.png",
    caption: { en: "Beiji Village, Mohe", zh: "漠河北极村" },
    overview: {
      en: "Beiji Village near Mohe should be introduced through far-north village life, winter snow, borderland climate, wooden buildings and the idea of China's northernmost settlement.",
      zh: "漠河北极村的核心内容包括中国极北村落生活、冬季雪景、边境气候、木屋街巷和黑龙江沿岸的北方生活。"
    },
    experience: {
      en: "A good visit should leave time for village streets, winter light, local homes and Heilong River context, while managing cold-weather pacing.",
      zh: "合适的游览应给村落街巷、冬季光线、本地人家和黑龙江边境背景留出时间，同时根据气温安排室内外节奏。重点是体会极北生活，重点是体会极北生活。"
    }
  },
  "Heilongjiang::Zhalong Wetland": {
    image: "/images/destinations/optimized/wiki-heilongjiang-zhalong-wetland.jpg",
    caption: { en: "Zhalong Wetland cranes", zh: "扎龙湿地丹顶鹤" },
    overview: {
      en: "Zhalong Wetland is centered on reed marshes, shallow water, red-crowned cranes and northeast wetland conservation. The strongest scene is bird life inside a broad marsh landscape.",
      zh: "扎龙湿地的核心内容包括芦苇沼泽、浅水湿地、丹顶鹤和东北湿地保护。这里要呈现的不是普通草地，而是鸟类栖息、湿地水系和保护区管理共同形成的生态现场。"
    },
    experience: {
      en: "A good visit should respect viewing distances, choose suitable bird-watching times and explain habitat protection rather than only chasing close-up photos.",
      zh: "合适的游览应尊重观鸟距离，选择适合的观鸟时段，讲清湿地栖息地和丹顶鹤保护，而不是只追求近距离拍照。"
    }
  },
  "Heilongjiang::Yabuli Ski Area": {
    image: "/images/destinations/optimized/wiki-heilongjiang-yabuli-ski-area.jpg",
    caption: { en: "Yabuli Ski Area", zh: "亚布力滑雪区" },
    overview: {
      en: "Yabuli Ski Area should be introduced through snowy mountain slopes, ski runs, forested terrain and Heilongjiang winter sports culture.",
      zh: "亚布力滑雪区的核心内容包括雪道、山地坡面、森林背景和黑龙江冬季运动文化。它的重点是雪场地形、运动体验和东北冬季旅游氛围。"
    },
    experience: {
      en: "A good plan should match slope choice with skill level, weather and equipment time, leaving room for mountain views and warm breaks.",
      zh: "合适的安排应根据水平选择雪道，预留装备、热身和休息时间，并结合天气看山地雪景，而不是只把它当作一张滑雪场照片。"
    }
  },
  "Heilongjiang::Volga Manor": {
    image: "/images/destinations/optimized/wiki-heilongjiang-volga-manor.jpg",
    caption: { en: "Volga Manor Russian-style architecture", zh: "伏尔加庄园俄式建筑" },
    overview: {
      en: "Volga Manor is a Russian-style architectural park near Harbin, useful for understanding how the city presents Russian cultural memory through wooden buildings, churches and landscaped grounds.",
      zh: "伏尔加庄园的核心内容包括哈尔滨近郊的俄式建筑、木构空间、教堂意象和园区景观。它展示的是哈尔滨如何把俄式文化记忆转化为可游览的建筑场景。"
    },
    experience: {
      en: "A good visit is best understood through building forms, seasonal scenery and Harbin's Russian-influenced context, not treat the manor as a generic European backdrop.",
      zh: "合适的游览应关注建筑形式、季节景观和哈尔滨俄式文化背景，而不是把庄园当成普通欧式拍照布景。"
    }
  },
  "Heilongjiang::Daqing Petroleum Memory": {
    image: "/images/destinations/heilongjiang-daqing-petroleum-memory-clean.png",
    caption: { en: "Daqing oilfield history exhibition", zh: "大庆油田历史展馆" },
    overview: {
      en: "Daqing Petroleum Memory should use real oilfield and museum scenes: Iron Man Wang Jinxi, workers' culture, production history and the role of Daqing in northeast China's industrial modernization.",
      zh: "大庆石油记忆要用真实油田历史和展馆场景来呈现：铁人王进喜、工人文化、会战记忆、油田生产和东北工业现代化。"
    },
    experience: {
      en: "A good visit should connect exhibition halls, worker stories, oilfield technology and urban memory, so Daqing reads as an industrial-history site rather than a generic city stop.",
      zh: "合适的游览应把展厅、工人故事、油田技术和城市记忆连起来，讲清大庆为什么在中国石油工业史上重要，而不是只看一个符号化的油泵图案。"
    }
  },
  "Tianjin::Five Great Avenues": {
    image: "/images/destinations/optimized/wiki-tianjin-five-great-avenues.jpg",
    caption: { en: "Tianjin Five Great Avenues", zh: "天津五大道" },
    overview: {
      en: "Five Great Avenues is best read through treaty-port villas, tree-lined streets, former residences and the layered urban history of modern Tianjin.",
      zh: "五大道的核心内容包括租界时期别墅、树荫街道、名人旧居和天津近代城市层次。这里的价值在于街区尺度和建筑类型，重点是街区尺度和建筑类型。"
    },
    experience: {
      en: "A good walk should compare different street sections, facade styles and old-residence stories while keeping a neighborhood pace.",
      zh: "合适的步行应比较不同道路、立面风格和旧居故事，保持街区漫步节奏，把建筑和天津近代历史连起来。"
    }
  },
  "Tianjin::Ancient Culture Street": {
    image: "/images/destinations/tianjin-ancient-culture-street-corrected.png",
    caption: { en: "Tianjin Ancient Culture Street", zh: "天津古文化街" },
    overview: {
      en: "Ancient Culture Street brings together Tianjin's folk-culture shopping street: traditional shopfronts, temple-fair atmosphere, crafts, snacks and old-brand signs. It should not use unrelated ancient wall paintings.",
      zh: "天津古文化街要呈现传统商铺、牌楼街巷、民间工艺、小吃、老字号和庙会气氛。"
    },
    experience: {
      en: "A good visit should connect Tianhou Temple context, folk crafts, small snacks and shop signs, while distinguishing living tourist commerce from older temple-fair memory.",
      zh: "合适的游览应把天后宫背景、民间工艺、小吃和老店招牌串起来，也要讲清今天的旅游商业与早期庙会记忆之间的关系。"
    }
  },
  "Tianjin::Haihe River Night Walk": {
    image: "/images/destinations/optimized/wiki-tianjin-haihe-river-night-walk.jpg",
    caption: { en: "Haihe River night view", zh: "海河夜景" },
    overview: {
      en: "Haihe River Night Walk is about Tianjin's bridges, riverside lighting, evening public life and the way the city reads from the water.",
      zh: "海河夜游的核心内容包括桥梁、河岸灯光、夜间散步和城市水岸视角。海河把天津的近代建筑、现代天际线和市民休闲连在同一条夜间动线上。"
    },
    experience: {
      en: "A good route should choose bridge viewpoints, ferry or walking sections by light and weather, leaving time to compare both riverbanks.",
      zh: "合适的路线应根据光线和天气选择桥梁视角、步行段或游船段，留出时间比较两岸建筑和灯光变化。"
    }
  },
  "Tianjin::Porcelain House": {
    image: "/images/destinations/optimized/wiki-tianjin-porcelain-house.jpg",
    caption: { en: "Tianjin Porcelain House", zh: "天津瓷房子" },
    overview: {
      en: "Porcelain House is a highly decorative Tianjin building covered with porcelain fragments, vases and sculptural surfaces, best understood as eccentric urban reuse.",
      zh: "瓷房子的核心内容包括瓷片、瓷瓶、装饰性墙面和城市奇观式再利用。它不是普通小洋楼，而是天津街区中极具辨识度的装饰建筑。"
    },
    experience: {
      en: "A good visit is best understood through material details, facade composition and its place in Tianjin's mixed architectural landscape.",
      zh: "合适的游览应看材料细节、立面构图和它在天津多元建筑景观中的位置，而不是只远远拍一张外观。"
    }
  },
  "Tianjin::Tianjin Eye Area": {
    image: "/images/destinations/optimized/wiki-tianjin-tianjin-eye-area.jpg",
    caption: { en: "Tianjin Eye and Haihe River", zh: "天津之眼与海河" },
    overview: {
      en: "The Tianjin Eye area combines the ferris wheel, Yongle Bridge, riverfront walking and modern skyline views along the Haihe River.",
      zh: "天津之眼周边的核心内容包括摩天轮、永乐桥、海河步道和现代城市天际线。这里的重点是桥上摩天轮与河岸公共空间如何组成天津夜间和白天的城市视角。"
    },
    experience: {
      en: "A good visit should choose daytime or evening viewpoints, combine river walking with bridge views and avoid treating the ferris wheel as the only stop.",
      zh: "合适的游览应根据白天或夜间光线选择观景点，把河岸步行和桥梁视角结合起来，而不是只把摩天轮当成唯一目的。"
    }
  },
  "Tianjin::Yangliuqing New Year Painting": {
    image: "/images/destinations/optimized/wiki-tianjin-yangliuqing-new-year-painting.jpg",
    caption: { en: "Yangliuqing New Year painting", zh: "杨柳青年画" },
    overview: {
      en: "Yangliuqing New Year Painting is a Tianjin folk-art tradition built from woodblock printing, hand coloring, auspicious imagery and New Year customs.",
      zh: "杨柳青年画的核心内容包括木版套印、手工彩绘、吉祥图像和年俗生活。它不是普通画作展示，而是天津民间审美、节庆祝福和家庭空间联系在一起的手艺。"
    },
    experience: {
      en: "A good visit should explain printing blocks, pigments, motifs and the way images entered New Year home life.",
      zh: "合适的体验应讲清版木、颜料、题材和年画如何进入春节家庭生活，必要时结合工坊或展示空间慢看细节。"
    }
  },
  "Tianjin::Italian Style Area": {
    image: "/images/destinations/tianjin-italian-style-area-clean.png",
    caption: { en: "Tianjin Italian Style Area", zh: "天津意式风情区" },
    overview: {
      en: "Italian Style Area brings together Tianjin's former concession streets, European-style facades, cafes and leisure reuse. It should not use an unrelated black-and-white performance photo.",
      zh: "意式风情区要呈现天津原意租界街区、欧式立面、广场、咖啡馆和城市休闲再利用。"
    },
    experience: {
      en: "A good walk should compare street layout, restored facades and today's dining or leisure uses with the concession-era background.",
      zh: "合适的步行应比较街区格局、修复后的立面和今天餐饮休闲功能，再补充租界历史背景，而不是只把它当成欧式布景。"
    }
  },
  "Tianjin::Tianjin Snack Trail": {
    image: "/images/destinations/tianjin-snack-trail-clean.png",
    caption: { en: "Tianjin snacks", zh: "天津小吃" },
    overview: {
      en: "Tianjin Snack Trail is best understood through local foods such as Goubuli buns, mahua, jianbing guozi and neighborhood breakfast habits, not a skyline or ferris-wheel view.",
      zh: "天津小吃路线的核心内容包括狗不理包子、麻花、煎饼果子、早点摊和本地吃法。"
    },
    experience: {
      en: "A good tasting route should mix old-name foods with everyday breakfast stops, explaining texture, ordering habits and northern street-food rhythm.",
      zh: "合适的品尝路线应把老字号和日常早点摊结合起来，讲清口感、点单习惯和北方街头饮食节奏，而不是只列几个名菜名点。"
    }
  },
  "Tianjin::Dule Temple Jizhou": {
    image: "/images/destinations/optimized/wiki-tianjin-dule-temple-jizhou.jpg",
    caption: { en: "Dule Temple, Jizhou", zh: "蓟州独乐寺" },
    overview: {
      en: "Dule Temple in Jizhou should be introduced through its ancient wooden architecture, Guanyin Pavilion, temple courtyards and the older cultural layer of Tianjin beyond the port city.",
      zh: "蓟州独乐寺的核心内容包括古代木构建筑、观音阁、寺院院落和天津北部更早的文化层。它说明天津不只有近代港口城市，也有辽代以来的寺院建筑传统。"
    },
    experience: {
      en: "A good visit should slow down for timber structure, hall proportions and Buddhist context, with enough time to compare it with urban Tianjin sites.",
      zh: "合适的游览应慢看木构、殿阁比例和佛教背景，并把它与天津市区近代建筑区分开来展开。"
    }
  },
  "Sichuan::Chengdu Teahouses": {
    image: "/images/destinations/optimized/wiki-sichuan-chengdu-teahouses.jpg",
    caption: { en: "Chengdu open-air teahouse", zh: "成都露天茶馆" },
    overview: {
      en: "Chengdu teahouses are a window into the city's slow public life: bamboo chairs, covered bowls of tea, neighborhood conversations, shade trees and the rhythm of sitting for an unhurried afternoon.",
      zh: "成都茶馆的核心内容包括竹椅、盖碗茶、摆龙门阵、树荫下的慢坐和街坊日常。这里要呈现的不是一杯茶本身，而是成都人把社交、休闲、信息交换和城市松弛感放在同一个空间里的方式。"
    },
    experience: {
      en: "A good visit should choose a living local teahouse, explain gaiwan etiquette and leave time to sit, listen and observe rather than treating it as a quick photo stop.",
      zh: "合适的体验应选择仍有本地人使用的茶馆，讲清盖碗茶、续水、座位和聊天礼貌，再留出真正坐下来的时间。重点是体会成都茶馆的公共生活节奏，而不是只拍几把竹椅。"
    }
  },
  "Sichuan::Chengdu Panda Base": {
    image: "/images/destinations/optimized/wiki-sichuan-chengdu-panda-base.jpg",
    caption: { en: "Chengdu Research Base of Giant Panda Breeding", zh: "成都大熊猫繁育研究基地" },
    overview: {
      en: "Chengdu Panda Base should be introduced as a conservation and research setting, not only as a place to see cute animals. The visit connects panda habitats, nursery areas, bamboo feeding routines and public education about giant panda protection.",
      zh: "成都大熊猫基地要放在保护、繁育和科普场景里写，而不只是“看熊猫”。熊猫馆舍、竹林环境、饲喂时间、幼年熊猫照护和公众教育共同构成这里的重点。"
    },
    experience: {
      en: "A good route starts early when pandas are more active, keeps expectations realistic, and explains behavior, habitat and conservation work while avoiding noisy or rushed viewing.",
      zh: "合适的游览应尽量安排早些进入，结合熊猫活动时间选择馆区，讲清它们的行为、栖息环境和保护工作。重点是安静观察和理解保护价值，而不是在人最多的时候只挤着拍照。"
    }
  },
  "Sichuan::Jiuzhaigou Valley": {
    image: "/images/destinations/optimized/wiki-sichuan-jiuzhaigou-valley.jpg",
    caption: { en: "Jiuzhaigou Valley lakes and forests", zh: "九寨沟湖泊与森林" },
    overview: {
      en: "Jiuzhaigou is defined by clear mineral lakes, layered waterfalls, forested valleys and strong seasonal color. Its identity comes from water clarity, fallen trunks under the surface and the rhythm of moving between valleys.",
      zh: "九寨沟的核心是高透明度海子、钙华滩流、层层瀑布、森林峡谷和季节色彩。这里不能只写成普通山水，重点应放在水色、倒木、雪山森林背景和沟谷动线如何共同形成九寨沟的辨识度。"
    },
    experience: {
      en: "A good visit follows the shuttle system without overloading the day, chooses lake and waterfall stops by season and light, and leaves time for quieter boardwalk sections.",
      zh: "合适的游览应顺着景区交通和栈道节奏安排，不硬塞所有点位。根据季节和光线选择海子、瀑布和林间步道，给诺日朗、五花海、长海等重点区域留出慢看的时间。"
    }
  },
  "Sichuan::Mount Emei": {
    image: "/images/destinations/optimized/wiki-sichuan-mount-emei.jpg",
    caption: { en: "Mount Emei sea of clouds", zh: "峨眉山云海" },
    overview: {
      en: "Mount Emei combines Buddhist mountain culture, forest roads, temples, macaque zones, high cliffs and the Golden Summit landscape. It is both a sacred mountain and a layered natural route.",
      zh: "峨眉山要把佛教名山、山路森林、寺院体系、猴区、高山云海和金顶视野放在一起理解。它不是单纯登山，也不是只看一座寺，而是一条从山脚到山顶逐渐变化的宗教与自然线路。"
    },
    experience: {
      en: "A good route should match walking distance, cableway use and weather, with clear pacing between temples, forest sections and summit viewpoints.",
      zh: "合适的行程要根据体力选择步行段和索道，提前考虑天气、海拔和返程时间。重点是把寺院、林间路段和金顶视野串起来，重点是把寺院、林间路段和金顶视野串起来。"
    }
  },
  "Sichuan::Leshan Giant Buddha": {
    image: "/images/destinations/optimized/wiki-sichuan-leshan-giant-buddha.jpg",
    caption: { en: "Leshan Giant Buddha by the river", zh: "乐山大佛与江面" },
    overview: {
      en: "Leshan Giant Buddha is best read through its cliff-carved scale, river junction setting and Tang Buddhist engineering. The Buddha faces the meeting of the Min, Dadu and Qingyi rivers, where water, cliff and carving belong together.",
      zh: "乐山大佛的核心内容包括临江石刻、唐代佛教工程和三江汇流的地理位置。大佛不是孤立雕像，它与岷江、大渡河、青衣江交汇处的水势、崖壁和航运记忆连在一起。"
    },
    experience: {
      en: "A good visit can compare the cliff path and boat perspective, explain scale and drainage details, and choose timing based on crowds and river conditions.",
      zh: "合适的游览可比较步行栈道和江面船看两个视角，讲清大佛尺度、排水细节和临江位置。根据人流和江面情况安排节奏，避免只在佛脚排队拍一张照片。"
    }
  },
  "Sichuan::Dujiangyan Irrigation System": {
    image: "/images/destinations/optimized/wiki-sichuan-dujiangyan-irrigation-system.jpg",
    caption: { en: "Dujiangyan Irrigation System", zh: "都江堰水利工程" },
    overview: {
      en: "Dujiangyan is a living water-control system on the Min River, centered on Yuzui, Feishayan and Baopingkou. Its value lies in how ancient engineering still distributes water and shapes the Chengdu Plain.",
      zh: "都江堰的核心内容包括岷江上的鱼嘴、飞沙堰、宝瓶口。它的核心价值在于仍在发挥作用的无坝引水工程，以及这套水利系统如何塑造成都平原的农业与城市基础。"
    },
    experience: {
      en: "A good visit follows the water logic step by step, using viewpoints and bridges to explain diversion, sediment control and flood management before adding temple or old-town time.",
      zh: "合适的游览应顺着水流逻辑走，先看分水、排沙和控水方式，再把安澜索桥、二王庙和灌县古城等空间串联起来。重点是看懂工程原理，而不是只看一个江景。"
    }
  },
  "Sichuan::Danba Tibetan Villages": {
    image: "/images/destinations/sichuan-danba-tibetan-villages-real.jpg",
    caption: { en: "Danba Tibetan villages in western Sichuan", zh: "川西丹巴藏寨" },
    overview: {
      en: "Danba Tibetan villages are known for hillside Tibetan homes, stone watchtowers, terraced fields and valley settlements in western Sichuan. The image should be village architecture in a mountain setting, not a map.",
      zh: "丹巴藏寨的核心内容包括川西山谷里的藏式民居、碉楼、层层田地和坡地村落格局。这里要呈现的重点是村寨和河谷地形关系，而是房屋如何依山分布、碉楼如何标记村寨空间，以及藏寨与河谷地形的关系。"
    },
    experience: {
      en: "A good visit should keep a respectful village pace, choose viewpoints for architecture and fields, and explain watchtowers, household life and valley geography together.",
      zh: "合适的游览应放慢节奏，选择能看清民居、碉楼和田地关系的视角，尊重居民生活。讲解重点应放在藏寨建筑、碉楼功能、川西山谷环境和当地日常如何结合。"
    }
  },
  "Sichuan::Ya'an Mengding Tea Mountain": {
    image: "/images/experience-mengding-tea.jpg",
    caption: { en: "Mengding Mountain tea fields near Ya'an", zh: "雅安蒙顶山茶园" },
    overview: {
      en: "Mengding Tea Mountain should be introduced through Ya'an's humid tea hills, early Sichuan tea history, terraced tea gardens and green-tea making traditions. The page needs tea fields and mountain atmosphere, not a regional map.",
      zh: "雅安蒙顶山的核心内容包括湿润山地、茶园梯田、川茶早期历史和绿茶制作传统。这里的核心不是一张区域地图，而是蒙顶山作为川茶名山，如何把山地气候、茶树生长、采茶制茶和品饮习惯连在一起。"
    },
    experience: {
      en: "A good visit should be paced around tea season, field walking, maker explanation and tasting, with enough time to understand how mountain moisture shapes the cup.",
      zh: "合适的体验应从茶季、茶园步行、制茶讲解和品饮安排。重点是看茶山环境、采摘与制作步骤，再理解蒙顶山茶为什么和雅安潮湿山地、川茶历史联系紧密。"
    }
  },
  "Sichuan::Chengdu Market Cooking": {
    image: "/images/experience-chengdu-market.jpg",
    caption: { en: "Chengdu neighborhood market ingredients", zh: "成都社区菜市场食材" },
    overview: {
      en: "Chengdu market cooking should begin in a neighborhood market: vegetables, chilies, doubanjiang, tofu, fresh noodles, aromatics and the everyday buying habits behind Sichuan home cooking.",
      zh: "成都市场与家常菜适合从社区菜市场开始：时令蔬菜、辣椒、豆瓣、豆腐、鲜面、香料和摊主与顾客的日常交流，才是川味家常菜的入口。"
    },
    experience: {
      en: "A good experience links shopping to the dishes cooked later, explaining seasonings, cutting, heat control and the difference between restaurant Sichuan food and family-table flavors.",
      zh: "合适的体验应把买菜、认调料、备菜、下锅和围桌吃饭连起来，讲清豆瓣、花椒、辣椒、姜蒜等如何进入家常菜。重点不是远看成都城市景观，而是理解川菜如何从市场走到家庭餐桌。"
    }
  },
  "Ningxia::Shapotou": {
    image: "/images/destinations/optimized/wiki-ningxia-shapotou.jpg",
    caption: { en: "Shapotou, Yellow River and Tengger Desert", zh: "沙坡头黄河与腾格里沙漠" },
    overview: {
      en: "Shapotou should be introduced through the meeting of the Yellow River and the Tengger Desert: dunes, river bends, desert-control history and the sharp contrast between water and sand.",
      zh: "沙坡头的核心内容包括黄河与腾格里沙漠的交汇。这里的辨识度来自沙丘、黄河弯道、治沙工程、羊皮筏子记忆和水沙相邻的强烈反差，不是普通沙漠景点。"
    },
    experience: {
      en: "A good visit should time the desert light, river views and activity choices carefully, leaving space to explain sand-control ecology and Yellow River geography.",
      zh: "合适的游览应根据光线安排沙丘和黄河视角，活动项目不宜排得过满。讲解重点应放在黄河如何穿过干旱地带、治沙如何改变这里，以及沙漠与河流为什么能形成这样的景观。"
    }
  },
  "Ningxia::Western Xia Tombs": {
    image: "/images/destinations/optimized/wiki-ningxia-western-xia-tombs.jpg",
    caption: { en: "Western Xia Tombs below the Helan Mountains", zh: "贺兰山下的西夏陵" },
    overview: {
      en: "Western Xia Tombs are the royal mausoleum landscape of the Tangut Western Xia state, set below the Helan Mountains with earthen tomb mounds, archaeological remains and a strong desert-edge atmosphere.",
      zh: "西夏陵要放在贺兰山下的王陵格局里理解。夯土陵台、陪葬遗迹、荒漠边缘的开阔环境和党项西夏历史共同构成这里的现场感。"
    },
    experience: {
      en: "A good visit should connect the tomb forms, museum context and Helan Mountain backdrop, so the site reads as a lost dynasty's capital-region memory.",
      zh: "合适的游览应把陵台形制、博物馆信息和贺兰山背景连起来看，讲清西夏为什么在宁夏留下这样的王陵群，而不是只把它当成几座土丘。"
    }
  },
  "Ningxia::Helan Mountain Rock Art": {
    image: "/images/destinations/optimized/wiki-ningxia-helan-mountain-rock-art.jpg",
    caption: { en: "Helan Mountain rock art", zh: "贺兰山岩画" },
    overview: {
      en: "Helan Mountain Rock Art records hunting, animals, faces, ritual symbols and steppe-edge life along the mountain valleys. It is a place to read ancient frontier imagery in the landscape itself.",
      zh: "贺兰山岩画的核心内容包括山谷岩面上的人面、动物、狩猎、祭祀符号和农牧交界生活。这里要呈现的不是普通山景，而是古代人群如何把生活、信仰和环境刻在岩石上。"
    },
    experience: {
      en: "A good route should slow down at selected panels, explain motifs and protect the fragile site, while connecting the carvings with Helan Mountain's corridor position.",
      zh: "合适的游览应在重点岩画前慢看，讲清图像含义、年代层次和保护边界，再把这些刻痕放回贺兰山通道和北方草原边缘的历史中。"
    }
  },
  "Ningxia::Zhenbeibao Western Studios": {
    image: "/images/destinations/ningxia-zhenbeibao-western-studios-clean.png",
    caption: { en: "Zhenbeibao Western Studios, Yinchuan", zh: "银川镇北堡西部影城" },
    overview: {
      en: "Zhenbeibao Western Studios should be shown through earthen fort walls, film sets, northwest light and the memory of Chinese cinema shot in desert-edge landscapes.",
      zh: "镇北堡西部影城的核心内容包括土堡墙体、影视布景、西北荒漠光线和中国电影记忆。它不是西夏陵，也不是普通古城，而是把旧堡寨空间改造成电影场景和宁夏文化符号的地方。"
    },
    experience: {
      en: "A good visit should identify the set spaces, explain why the ruined-fort texture works on screen and leave time for light, courtyards and film references.",
      zh: "合适的游览应看清不同片场、土墙质感、院落动线和电影取景记忆，说明为什么这种粗粝的西北空间适合影像表达，而不是只把它当作拍照街区。"
    }
  },
  "Ningxia::Qingtongxia 108 Stupas": {
    image: "/images/destinations/optimized/wiki-ningxia-qingtongxia-108-stupas.jpg",
    caption: { en: "Qingtongxia 108 Stupas", zh: "青铜峡一百零八塔" },
    overview: {
      en: "Qingtongxia 108 Stupas form a distinctive Buddhist stupa group beside the Yellow River, combining religious forms, river-corridor geography and Ningxia's historical passageways.",
      zh: "青铜峡一百零八塔的核心内容包括黄河岸边的佛塔群形制。塔群排列、宗教象征、河谷通道和宁夏作为交通走廊的历史叠在一起，形成这里独特的现场。"
    },
    experience: {
      en: "A good visit should compare the stupa arrangement with the river setting, keeping a respectful pace and explaining Buddhist symbolism without turning it into a quick roadside stop.",
      zh: "合适的游览应把塔群排列、黄河视角和佛教象征连起来看，节奏保持安静，既看建筑形制，也理解它为什么出现在这条黄河通道旁。"
    }
  },
  "Ningxia::Yellow River Grand Canyon": {
    image: "/images/destinations/optimized/wiki-ningxia-yellow-river-grand-canyon.jpg",
    caption: { en: "Yellow River Grand Canyon, Ningxia", zh: "宁夏黄河大峡谷" },
    overview: {
      en: "Ningxia's Yellow River Grand Canyon is about river cuts through dry northern terrain, cliffs, reservoirs, old crossings and the visual scale of the Yellow River corridor.",
      zh: "宁夏黄河大峡谷的核心内容包括干旱北方地貌中的河流切割。峡谷崖壁、库区水面、古渡口记忆和黄河走廊的尺度，是这里区别于普通河景的关键。"
    },
    experience: {
      en: "A good route should choose river viewpoints by light and weather, connect canyon landforms with crossings and irrigation history, and avoid reducing the stop to a single panorama.",
      zh: "合适的路线应根据光线选择观河视角，把峡谷地貌、渡口、灌溉和黄河通道历史串起来。重点是看懂河流如何塑造宁夏，而不是只拍一张全景照。"
    }
  },
  "Ningxia::Ningxia Winery Route": {
    image: "/images/destinations/ningxia-winery-route-corrected.png",
    caption: { en: "Helan Mountain east foothill wineries", zh: "贺兰山东麓酒庄与葡萄园" },
    overview: {
      en: "The Ningxia winery route belongs to the east foothills of Helan Mountain, where vineyards, winery architecture, dry climate, irrigation and desert light shape one of China's most important wine regions.",
      zh: "宁夏酒庄路线要放在贺兰山东麓来看：葡萄园、酒庄建筑、干旱气候、灌溉系统和沙漠光线共同塑造了中国重要葡萄酒产区。"
    },
    experience: {
      en: "A good route should connect vineyard landscape, cellar visits, tasting rhythm and mountain-desert geography, with transport planned so tasting stays comfortable and responsible.",
      zh: "合适的路线应把葡萄园景观、酒窖参观、品鉴节奏和贺兰山地理背景连起来，同时安排好车辆和停留时间。重点是理解宁夏葡萄酒为什么来自这片山麓与荒漠之间的土地。"
    }
  },
  "Ningxia::Shuidonggou": {
    image: "/images/destinations/optimized/wiki-ningxia-shuidonggou.jpg",
    caption: { en: "Shuidonggou archaeological and frontier site", zh: "水洞沟遗址与边塞遗存" },
    overview: {
      en: "Shuidonggou combines Paleolithic archaeological remains with Ming frontier defense traces, showing both early human activity and later borderland military geography in eastern Ningxia.",
      zh: "水洞沟要把旧石器遗址和明代边塞防御遗存放在一起看。这里既有早期人类活动的考古线索，也有长城、城堡和峡谷地形构成的边防空间。"
    },
    experience: {
      en: "A good visit should separate the archaeological layer from the frontier-defense layer, then connect both to the valley landscape and Ningxia's corridor position.",
      zh: "合适的游览应先分清史前考古层和边塞防御层，再把两者放回水洞沟的峡谷地貌与宁夏交通通道中理解，而不是把它看成单一遗址。"
    }
  },
  "Ningxia::Wuzhong Morning Tea": {
    image: "/images/destinations/ningxia-wuzhong-morning-tea-corrected.png",
    caption: { en: "Wuzhong morning tea table", zh: "吴忠早茶餐桌" },
    overview: {
      en: "Wuzhong morning tea is a Hui food culture built from tea, beef, noodles, pastries, side dishes and a social breakfast rhythm along the Yellow River.",
      zh: "吴忠早茶的核心内容包括回族饮食、牛肉、面点、茶、凉菜小吃和清晨社交节奏。这里不是普通早餐，而是吴忠人把吃饭、会客和一天开始放在同一张餐桌上的地方文化。"
    },
    experience: {
      en: "A good visit should go early, order with local guidance and explain halal customs, beef-and-noodle habits, tea service and the relaxed pace of morning conversation.",
      zh: "合适的体验应安排在早晨，由本地人带着点菜，讲清清真饮食礼貌、牛肉与面点搭配、茶水和小菜节奏。重点是进入吴忠早茶的日常氛围，而不是只拍一桌食物。"
    }
  },
  "Hunan::Dongjiang Lake": {
    image: "/images/destinations/optimized/wiki-hunan-dongjiang-lake.jpg",
    caption: { en: "Dongjiang Lake, Chenzhou", zh: "郴州东江湖" },
    overview: {
      en: "Dongjiang Lake is best introduced through the morning mist over Xiaodongjiang, the reservoir water, boat routes and the green mountain scenery of southern Hunan. Its character comes from water vapor, light and quiet lake-valley views, not from a generic mountain-and-water label.",
      zh: "东江湖适合从小东江清晨雾气、水库湖面、行船视角和湘南山地一起写。这里最有辨识度的是水汽升起时的湖面层次、两岸青山和安静的湖谷气氛。"
    },
    experience: {
      en: "A good visit should start early for mist and soft light, then connect the lake viewpoints, short boat or riverside sections and Chenzhou's southern Hunan landscape context.",
      zh: "合适的游览应尽量安排清晨，看雾气、逆光和湖面变化，再串联观景点、短程船行或沿水步行。讲解重点应放在小东江为什么会形成雾漫景象、东江湖水域如何塑造郴州山水，而不是只拍一张湖面照片。"
    }
  },
  "Hunan::Zhangjiajie National Forest Park": {
    image: "/images/destinations/optimized/wiki-hunan-zhangjiajie-national-forest-park.jpg",
    caption: { en: "Zhangjiajie National Forest Park", zh: "张家界国家森林公园" },
    overview: {
      en: "Zhangjiajie National Forest Park is defined by sandstone pillars, deep valleys, forested trails and cliff viewpoints. The landscape feels vertical, with peaks rising like stone towers out of the canyon.",
      zh: "张家界国家森林公园的核心内容包括砂岩峰林、峡谷、森林步道和悬崖观景台。这里最有辨识度的是一根根石柱从谷地拔起的垂直感，以及云雾、植被和峰墙形成的层次。"
    },
    experience: {
      en: "A good route should choose viewpoints by weather and crowd level, balance cableways with walking, and avoid trying to cover every platform in one rush.",
      zh: "游览要根据天气和人流选择观景台，把索道、电梯和步行段搭配好。重点是留时间看峰林变化，而不是把所有平台赶成清单。"
    }
  },
  "Hunan::Fenghuang Ancient Town": {
    image: "/images/destinations/optimized/wiki-hunan-fenghuang-ancient-town.jpg",
    caption: { en: "Fenghuang Ancient Town", zh: "凤凰古城" },
    overview: {
      en: "Fenghuang Ancient Town is shaped by the Tuo River, stilt houses, stone lanes, bridges and Miao-Tujia cultural surroundings. Its strongest scenes come from river life and evening lights.",
      zh: "凤凰古城适合从沱江、吊脚楼、石板巷、桥和苗土文化背景一起看。河岸生活、临水建筑和夜晚灯影，是它区别于普通古镇的地方。"
    },
    experience: {
      en: "A good visit should walk both riverside and back lanes, compare day and night atmosphere, and keep space for local culture beyond the busiest photo spots.",
      zh: "游览不要只沿江拍照，应把河边、背街小巷和白天夜晚的气氛放在一起看，也要为当地民俗和日常生活留出位置。"
    }
  },
  "Hunan::Changsha Night Food": {
    image: "/images/experience-changsha-food.jpg",
    caption: { en: "Changsha night food", zh: "长沙夜食" },
    overview: {
      en: "Changsha night food is about rice noodles, barbecue, spicy snacks, tea drinks and the city's late-night street energy. The experience is loud, direct and strongly local.",
      zh: "长沙夜食的核心内容包括米粉、烧烤、香辣小吃、茶饮和深夜街头气氛。它是夜晚社交、街头气氛和地方口味的组合，而是长沙人把夜晚、社交和鲜辣口味放在一起的城市节奏。"
    },
    experience: {
      en: "A good route should mix classic snacks with reliable neighborhood stops and explain Hunan spice, ordering rhythm and late-night social habits.",
      zh: "路线应把经典小吃和可靠街区店铺搭配起来，讲清湖南辣味、点单节奏和长沙人的夜间社交方式。"
    }
  },
  "Hunan::Yuelu Academy": {
    image: "/images/destinations/hunan-yuelu-academy-clean.png",
    caption: { en: "Yuelu Academy, Changsha", zh: "长沙岳麓书院" },
    overview: {
      en: "Yuelu Academy is a mountain academy landscape tied to classical education, Hunan scholarship, courtyards, lecture halls and the wooded paths of Yuelu Mountain.",
      zh: "岳麓书院要放在岳麓山脚下来看：院落、讲堂、碑刻、古树和湖湘学术传统连在一起，形成中国古代书院空间和长沙文脉的重要现场。"
    },
    experience: {
      en: "A good visit should follow the academy axis slowly, read plaques and courtyards, then connect the site with Yuelu Mountain and Hunan intellectual history.",
      zh: "游览应顺着书院轴线慢慢走，看匾额、院落和讲堂，再把岳麓山环境与湖湘学术传统联系起来。"
    }
  },
  "Hunan::Orange Isle": {
    image: "/images/destinations/optimized/wiki-hunan-orange-isle.jpg",
    caption: { en: "Orange Isle, Changsha", zh: "长沙橘子洲" },
    overview: {
      en: "Orange Isle is a long island in the Xiang River, known for riverside walking, Changsha skyline views, public lawns and modern Chinese historical symbolism.",
      zh: "橘子洲是湘江中的长洲岛，适合从江心步道、两岸城市视野、公共草地和近现代历史象征一起看。它呈现的是长沙与湘江关系最直接的城市空间。"
    },
    experience: {
      en: "A good visit should choose a cooler time, walk selected sections rather than the whole island, and connect river views with Changsha's urban rhythm.",
      zh: "游览适合选择清晨或傍晚，挑重点路段步行，不必硬走完整个洲岛。重点是看湘江、城市天际线和长沙日常休闲如何连在一起。"
    }
  },
  "Hunan::Dehang Miao Village": {
    image: "/images/destinations/optimized/wiki-hunan-dehang-miao-village.jpg",
    caption: { en: "Dehang Miao Village", zh: "德夯苗寨" },
    overview: {
      en: "Dehang Miao Village sits in a mountain-valley landscape where Miao homes, festivals, paths, streams and surrounding cliffs shape the village experience.",
      zh: "德夯苗寨适合从山谷地貌、苗族民居、溪流、节庆习俗和周边峭壁一起看。这里的村寨生活和自然峡谷不是分开的，而是共同构成湘西山地的日常。"
    },
    experience: {
      en: "A good visit should keep a slow village pace, connect homes and paths with valley scenery, and treat performances or festivals as cultural context rather than a quick show.",
      zh: "游览应放慢脚步，把寨路、民居、溪流和峡谷视野串起来。若遇到节庆或表演，也要放回苗族生活背景中理解。"
    }
  },
  "Hunan::Shaoshan": {
    image: "/images/destinations/optimized/wiki-hunan-shaoshan.jpg",
    caption: { en: "Shaoshan, Hunan", zh: "湖南韶山" },
    overview: {
      en: "Shaoshan is tied to modern Chinese history and rural Hunan landscapes: family homes, memorial spaces, village roads and the political memory around Mao Zedong's birthplace.",
      zh: "韶山适合从近现代中国历史和湖南乡村环境一起看。故居、纪念空间、村路、田地和毛泽东出生地的政治记忆，共同构成这里的参观核心。"
    },
    experience: {
      en: "A good visit should keep historical context clear, move respectfully through memorial spaces and also notice the rural setting around them.",
      zh: "游览应保持庄重，讲清历史背景和纪念空间的关系，同时留意周边乡村地貌，同时留意周边乡村地貌。"
    }
  },
  "Hunan::Yueyang Tower": {
    image: "/images/destinations/optimized/wiki-hunan-yueyang-tower.jpg",
    caption: { en: "Yueyang Tower and Dongting Lake", zh: "岳阳楼与洞庭湖" },
    overview: {
      en: "Yueyang Tower is inseparable from Dongting Lake views and classical literary memory. Its meaning comes from tower architecture, lake expanse and the cultural echo of the Yueyang Tower essay.",
      zh: "岳阳楼要和洞庭湖视野一起看。楼阁建筑、湖面开阔感、城墙空间和《岳阳楼记》的文学记忆，构成了它区别于普通楼阁景点的核心。"
    },
    experience: {
      en: "A good visit should read the tower from both architecture and text, then spend time on lake views and the surrounding old-city context.",
      zh: "游览应同时看建筑和文本，讲清范仲淹文章如何改变这座楼的文化意义，再留时间看洞庭湖和周边老城空间。"
    }
  },
  "Henan::Yellow River Scenic Area Zhengzhou": {
    image: "/images/destinations/henan-yellow-river-scenic-area-zhengzhou-corrected.png",
    caption: { en: "Yellow River Scenic Area, Zhengzhou", zh: "郑州黄河风景名胜区" },
    overview: {
      en: "Zhengzhou Yellow River Scenic Area is about the Yellow River at the edge of the Central Plains: river terraces, loess landforms, flood-control memory, the Yan and Huang Emperors sculpture and the cultural idea of the river as a Chinese origin landscape.",
      zh: "郑州黄河风景区的重点在中原边缘的黄河：黄河河岸、黄土地貌、花园口水患记忆、炎黄二帝塑像和“母亲河”文化共同构成这里。它不是航空或军事展品，也不是普通山水公园，而是郑州理解黄河与中原文明关系的重要地点。"
    },
    experience: {
      en: "The route should connect the river-view platforms, loess slopes, the Yan-Huang monument and nearby river-history context, with timing chosen for clearer light and enough space to understand the scale of the river plain.",
      zh: "游览建议把观河平台、黄土坡地、炎黄二帝塑像和黄河历史背景串起来，根据天气和光线安排停留。重点是看河道、地形和中原文化脉络，而不是只拍一个孤立的景点。"
    }
  },
  "Shandong::Jinan Springs": {
    image: "/images/destinations/shandong-jinan-springs-corrected.png",
    caption: { en: "Baotu Spring and Jinan's spring water", zh: "趵突泉与济南泉水" },
    overview: {
      en: "Jinan Springs should be introduced through Baotu Spring, Black Tiger Spring, the old moat, Daming Lake and the spring-fed rhythm that gives Jinan its identity as the City of Springs.",
      zh: "济南泉水适合从趵突泉、黑虎泉、护城河、大明湖和老城水系一起看。泉眼、池水、柳树、茶摊和市民取水休闲的日常，构成了济南“泉城”最有辨识度的生活气质。"
    },
    experience: {
      en: "A good route follows the water: start with Baotu Spring or Black Tiger Spring, walk along the moat and old lanes, then connect the springs with Daming Lake, local tea, small eateries and Jinan's slower old-city pace.",
      zh: "合适的游览应顺着水走：从趵突泉或黑虎泉开始，沿护城河和老街巷慢慢看，再把泉水、大明湖、茶摊、小吃和济南老城节奏串起来，而不是只看一个普通城市景观。"
    }
  },
  "Zhejiang::Zhoushan Fishing Coast": {
    image: "/images/destinations/zhejiang-zhoushan-fishing-coast-corrected.png",
    caption: { en: "Zhoushan island coast and fishing life", zh: "舟山海岛海岸与渔港生活" },
    overview: {
      en: "Zhoushan Fishing Coast is best read through island harbors, fishing boats, seafood markets, old port streets and East China Sea island life around places such as Shenjiamen and the outer islands.",
      zh: "舟山渔港海岸适合从群岛、渔船、码头、海鲜市场和东海岛民生活一起看。沈家门一带的渔港气息、出海与靠岸节奏、海鲜交易和岛城街巷，构成这里鲜活的地方感。"
    },
    experience: {
      en: "A good visit follows harbor timing: watch boats, walk port streets, pair a seafood meal with market context and leave time for weather, tide and ferry connections between island viewpoints.",
      zh: "合适的路线应顺着渔港节奏安排：看船只停靠、走老港街巷、把海鲜餐与市场背景连起来，并根据潮汐、天气和轮渡时间安排海岸观景。这样看到的是舟山的渔港生活，而不是一张不相干的图。"
    }
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
    image: realImages.iliNalati,
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
    image: "/images/destinations/heilongjiang-yabuli.jpg",
    caption: { en: "Yabuli winter mountain area", zh: "黑龙江亚布力冬季山地" },
    overview: {
      en: "Yabuli is a winter mountain destination southeast of Harbin, known for snow sports, forested slopes and the wider northeast China winter-travel atmosphere.",
      zh: "亚布力是哈尔滨东南方向的冬季山地目的地，重点是冰雪运动、林区山坡和东北冬季旅行氛围。"
    },
    experience: {
      en: "The route is best understood through snow season timing, clothing preparation, mountain views and a realistic pace for winter temperatures.",
      zh: "行程应从雪季时间、防寒准备、山地视野和冬季气温下的合理节奏来安排。"
    }
  },
  "Wuzhishan Rainforest": {
    image: "/images/experience-jingmai-tea-forest-real.png",
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
    image: "/images/about-me-beach-group.jpg",
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
      zh: "潭门应呈现为海南东海岸仍在运转的渔港社区，渔船、海鲜处理和港口日常是这里的核心。"
    },
    experience: {
      en: "The visit is best understood through harbor rhythm, seafood selection and fishing-family life rather than only taking a panorama of the port.",
      zh: "体验应关注港口节奏、海鲜挑选和渔家生活，而不是只拍一张港口全景。"
    }
  },
  "Hainan Family Kitchen": {
    image: "/images/about-me-dinner-table.jpg",
    caption: { en: "Hainan family-style meal", zh: "海南家庭式餐桌" },
    overview: {
      en: "A Hainan family-kitchen experience should center on island ingredients, seafood, coconut, local sauces and the relaxed rhythm of eating together.",
      zh: "海南家庭厨房体验应从岛屿食材、海鲜、椰子、本地酱料和围桌用餐的轻松节奏展开。"
    },
    experience: {
      en: "The meal should explain ingredients, home-style preparation and how Hainan's climate and sea shape everyday food.",
      zh: "体验应讲清食材、家常做法，以及海南气候和海洋如何影响当地日常饮食。"
    }
  }
};

const auditedDestinationSpecificText: Record<string, MediaText> = {
  "Shanxi::Wutai Mountain": {
    image: "/images/destinations/shanxi-wutai-mountain-clean.png",
    caption: { en: "Wutai Mountain temples", zh: "五台山寺院群" },
    overview: {
      en: "Wutai Mountain should be introduced through Taihuai's monastery cluster, Manjusri belief, mountain terrain and pilgrimage routes. Its identity is the connection between Buddhist practice and the cool highland landscape, not a single pagoda or gate.",
      zh: "五台山适合从台怀镇寺院群、文殊信仰、山地地形和朝台路线一起理解。它的重点是佛教实践与清凉山地景观如何结合，而不是只看一座白塔或单个山门。"
    },
    experience: {
      en: "A good visit should plan temple order, transport and walking distance carefully, leaving time for etiquette, architecture and the rhythm of worship.",
      zh: "游览应安排好寺院顺序、交通和步行距离，留出时间看礼仪、建筑和香火节奏，重点是留时间看礼仪、建筑和香火节奏。"
    }
  },
  "Shanghai::Former French Concession": {
    image: "/images/destinations/shanghai-former-french-concession-clean.png",
    caption: { en: "Former French Concession street", zh: "上海原法租界街区" },
    overview: {
      en: "The Former French Concession is best read through plane-tree streets, lane houses, old villas, small shops and today's neighborhood life. It is a walkable urban fabric, not a map label.",
      zh: "上海原法租界要从梧桐街道、里弄住宅、老洋房、小店和今天的社区生活一起看。它是可以步行读懂的街区肌理，不是一张区域地图。"
    },
    experience: {
      en: "A good route compares street scale, building details, cafes, residential lanes and quiet side roads, with context on Shanghai's modern urban history.",
      zh: "合适的路线应比较街道尺度、建筑细节、咖啡小店、居民弄堂和安静支路，再补充上海近代城市背景。"
    }
  },
  "Hubei::Three Gorges Hubei Section": {
    image: "/images/destinations/hubei-three-gorges-xiling-real.png",
    caption: { en: "Xiling Gorge and the Hubei Three Gorges section", zh: "西陵峡与湖北三峡段" },
    overview: {
      en: "The Hubei section of the Three Gorges should be read through Xiling Gorge, Yangtze River bends, cliff walls, shipping lanes, bridge views and the river towns around Yichang. Its character is a working river gorge, not a lake park or a generic mountain canyon.",
      zh: "湖北三峡段的辨识度在西陵峡、长江弯道、两岸峭壁、船运航道、桥梁视角和宜昌周边江边城镇。它是真实的长江峡谷与航运景观，不是东湖式湖景，也不是普通山谷。"
    },
    experience: {
      en: "A good route should plan viewpoints by river visibility, boat movement and weather, then connect gorge scenery with Three Gorges Dam context, old river towns and the changing relationship between water level and cliffs.",
      zh: "合适的游览应根据能见度、船只动态和天气安排观景点，再把峡谷景观、三峡大坝背景、老江镇和水位变化对峭壁景观的影响串起来讲。"
    }
  },
  "Hubei::Wuhan Breakfast Streets": {
    image: "/images/destinations/hubei-wuhan-breakfast-streets-real.jpg",
    caption: { en: "Wuhan breakfast table", zh: "武汉过早小吃" },
    overview: {
      en: "Wuhan breakfast streets are about re gan mian, doupi, mianwo, rice wine, steamed snacks and the speed of eating before work. The page should show breakfast food and neighborhood stalls, not a skyline or river view.",
      zh: "武汉过早街区的重点在热干面、豆皮、面窝、米酒、汤包和上班前快速吃早饭的城市节奏。这里要呈现的不是天际线或江景，而是早点铺、排队、端碗站吃和街巷里的烟火气。"
    },
    experience: {
      en: "A good visit should start early, compare several classic snacks in one neighborhood, explain ordering rhythm and local names, and leave time to see how breakfast connects markets, commuting and daily Wuhan life.",
      zh: "合适的路线应清早开始，在同一片街区比较几种经典早点，讲清点单节奏和本地叫法，也要看过早如何连接菜场、通勤和武汉人的日常生活。"
    }
  },
  "Anhui::Huangshan": {
    image: "/images/destinations/anhui-huangshan-clean.png",
    caption: { en: "Huangshan granite peaks", zh: "黄山峰林与松" },
    overview: {
      en: "Huangshan is defined by granite peaks, pines, cloud seas, sunrise light and mountain trails. The experience should follow weather, visibility and walking energy rather than only chasing one famous viewpoint.",
      zh: "黄山的辨识度来自花岗岩峰林、黄山松、云海、日出光线和山路视角。游览要根据天气、能见度和体力安排，而不是只赶一个有名观景台。"
    },
    experience: {
      en: "A good plan balances cable cars, short walks, ridge viewpoints and quieter sections, with flexibility for rain, mist or winter snow.",
      zh: "合适的安排应平衡索道、短步道、山脊观景和较安静路段，并为雨雾或冬雪变化留出弹性。"
    }
  },
  "Anhui::Jiuhua Mountain": {
    image: "/images/destinations/anhui-jiuhua-mountain-clean.png",
    caption: { en: "Jiuhua Mountain temple route", zh: "九华山寺院路线" },
    overview: {
      en: "Jiuhua Mountain should connect Buddhist temples, mountain villages, incense life and the Ksitigarbha pilgrimage tradition. It is a living religious mountain, not just an ornate gate or archway.",
      zh: "九华山要把佛教寺院、山中聚落、香火生活和地藏信仰朝山传统连起来看。它是仍在延续的宗教名山，不只是一个牌坊或山门。"
    },
    experience: {
      en: "A good visit should keep a respectful pace, choose temple clusters by time and explain how mountain routes, ritual etiquette and local village life fit together.",
      zh: "游览应保持尊重和节奏，按时间选择寺院片区，讲清山路、礼仪和山村生活如何共同组成九华山。"
    }
  },
  "Anhui::Xuancheng Xuan Paper Workshop": {
    image: "/images/destinations/anhui-xuancheng-xuan-paper-workshop-clean.png",
    caption: { en: "Xuan paper making in Xuancheng", zh: "宣城宣纸制作" },
    overview: {
      en: "Xuancheng Xuan Paper Workshop should focus on the making process: bark and straw preparation, pulp, sheet forming, drying and the link with calligraphy, painting and scholar tools.",
      zh: "宣城宣纸工坊的重点在制作现场：青檀皮和稻草处理、纸浆、捞纸、晒纸，以及它与书画和文房用具的关系。"
    },
    experience: {
      en: "A good visit follows the workshop steps slowly, watching hands, tools, water and timing instead of treating the paper as only a finished souvenir.",
      zh: "合适的体验应顺着工序慢慢看手法、工具、水和时间判断，而不是只把宣纸当成成品纪念品。"
    }
  },
  "Jiangxi::Sanqing Mountain": {
    image: "/images/destinations/jiangxi-sanqing-mountain-clean.png",
    caption: { en: "Sanqing Mountain paths", zh: "三清山栈道与峰林" },
    overview: {
      en: "Sanqing Mountain is about granite peaks, cloud and mist, cliff paths and Daoist mountain imagery. Its scenery needs a real mountain photo and should never be represented by a map.",
      zh: "三清山的核心内容包括花岗岩峰林、云雾、山间栈道和道教山水意象。它需要真实山景图，需要呈现真实山景和步道现场。"
    },
    experience: {
      en: "A good route plans cable cars and cliff paths by weather and energy, leaving time for changing mist and quieter viewpoints.",
      zh: "路线应根据天气和体力安排索道与栈道，留时间看云雾变化和相对安静的观景点。"
    }
  },
  "Guizhou::Fanjing Mountain": {
    image: "/images/destinations/guizhou-fanjing-mountain-clean.png",
    caption: { en: "Fanjing Mountain peak", zh: "梵净山红云金顶" },
    overview: {
      en: "Fanjing Mountain is defined by isolated peaks, Red Cloud Golden Summit, mist, Buddhist sites and eastern Guizhou biodiversity. The image and copy should show mountain atmosphere, not a regional map.",
      zh: "梵净山的核心是孤峰、红云金顶、云雾、佛教遗迹和黔东山地生态。图片和简介都应呈现山地现场，而不是区域地图。"
    },
    experience: {
      en: "A good visit needs flexibility for weather, queues and visibility, with enough time to understand why this mountain is both ecological and spiritual.",
      zh: "游览要给天气、排队和能见度留弹性，同时讲清它为什么兼具生态价值和宗教意义。"
    }
  },
  "Hong Kong::Lantau Island": {
    image: "/images/destinations/hong-kong-lantau-island-clean.png",
    caption: { en: "Tian Tan Buddha, Lantau Island", zh: "大屿山天坛大佛" },
    overview: {
      en: "Lantau Island should connect the Tian Tan Buddha, Ngong Ping, hill trails, beaches, Tai O village and ferry or cable-car transport. It is an island route, not an administrative map.",
      zh: "大屿山要把天坛大佛、昂坪、山地步道、海滩、大澳村落和轮渡或缆车交通连起来看。它是一条离岛路线，不是一张行政地图。"
    },
    experience: {
      en: "A good plan chooses between Buddha, village, coast and trail time, keeping transfers realistic and weather in mind.",
      zh: "合适的安排应在大佛、村落、海岸和步道之间取舍，注意交通时间和天气。"
    }
  },
  "Hainan::Boao Town": {
    image: "/images/destinations/hainan-boao-town-clean.png",
    caption: { en: "Boao coastline and town", zh: "博鳌海岸与小镇" },
    overview: {
      en: "Boao Town should show Qionghai's coast-town character: Jade Belt Beach, the Wanquan River mouth, seaside streets and a slower small-town rhythm.",
      zh: "博鳌小镇要呈现琼海海岸小镇气质：玉带滩、万泉河口、海岸街区和相对舒缓的小镇节奏。"
    },
    experience: {
      en: "A good route links the beach, river-sea viewpoints and town streets, leaving time for seafood, coffee or a coastal walk.",
      zh: "合适路线应把海滩、河海交汇视角和小镇街区串起来，留出吃海鲜、喝咖啡或海边散步的时间。"
    }
  },
  "Shanghai::Shanghai Museum": {
    image: "/images/destinations/shanghai-shanghai-museum-clean.png",
    caption: { en: "Shanghai Museum at People's Square", zh: "人民广场上海博物馆" },
    overview: {
      en: "Shanghai Museum should be introduced as a major Chinese art museum at People's Square, known for bronzes, ceramics, calligraphy, painting, jade and furniture collections rather than as a generic Shanghai street scene.",
      zh: "上海博物馆要放在人民广场与中国艺术收藏的背景里介绍：青铜器、陶瓷、书画、玉器和家具是重点，不应再用普通街景或外滩图片代替。"
    },
    experience: {
      en: "A good visit should choose galleries by interest and time, connect objects with dynastic history and leave space for slower looking instead of rushing every floor.",
      zh: "游览应按兴趣和时间选择展厅，把器物、朝代背景和审美线索讲清楚，留出慢慢看重点展品的时间，而不是匆忙扫完整栋楼。"
    }
  },
  "Shanghai::Yu Garden and Old City": {
    image: "/images/destinations/shanghai-yu-garden-old-city-clean.png",
    caption: { en: "Yu Garden and old city pond", zh: "豫园与老城厢水景" },
    overview: {
      en: "Yu Garden and the Old City should connect classical garden design, ponds, pavilions, zigzag bridges, bazaar streets and old Shanghai commercial life.",
      zh: "豫园与老城厢要把江南园林、池水亭台、九曲桥、城隍庙商街和上海老城商业生活连起来看，不能再用古画代替实景。"
    },
    experience: {
      en: "A good route separates quiet garden details from the busy bazaar, then explains how temple fair commerce and old-city lanes shaped this part of Shanghai.",
      zh: "合适的路线要区分园内细节和园外商街，再解释庙会商业、老城巷道和上海城市记忆如何在这里重叠。"
    }
  },
  "Anhui::Chengkan Village": {
    image: "/images/destinations/anhui-chengkan-village-clean.png",
    caption: { en: "Chengkan ancestral architecture", zh: "呈坎古村祠堂建筑" },
    overview: {
      en: "Chengkan Village is a Huizhou settlement of ancestral halls, lanes, ponds, white walls and water systems. The page should show village architecture, not a stone inscription close-up.",
      zh: "呈坎古村的重点在徽派民居、祠堂、巷道、水塘和村落水系，页面应呈现村落建筑实景，而不是石刻或题字特写。"
    },
    experience: {
      en: "A good walk should read the village layout slowly, linking halls, homes, ponds and clan history with the everyday use of public space.",
      zh: "游览适合慢走，沿祠堂、民居、水塘和巷道理解村落格局，把宗族历史和今天的公共空间使用放在一起看。"
    }
  },
  "Hubei::Shennongjia Forest": {
    image: "/images/destinations/hubei-shennongjia-forest-clean.png",
    caption: { en: "Shennongjia mountain forest", zh: "神农架山地森林" },
    overview: {
      en: "Shennongjia Forest should focus on mountain forest, biodiversity, changing weather, highland roads and central China's protected natural landscape.",
      zh: "神农架森林的重点是山地森林、生物多样性、气候变化、高山道路和华中自然保护地景观，不应只用村镇道路或普通街景表达。"
    },
    experience: {
      en: "A good route should plan viewpoints, forest walks and transfer time by weather and visibility, keeping the pace flexible for mountain conditions.",
      zh: "路线要根据天气和能见度安排观景点、森林步道和车程时间，给山地路况与天气变化留出弹性。"
    }
  },
  "Chongqing::Ciqikou Old Town": {
    image: "/images/destinations/chongqing-ciqikou-old-town-clean.png",
    caption: { en: "Ciqikou old town lanes", zh: "磁器口古镇街巷" },
    overview: {
      en: "Ciqikou Old Town should show Chongqing's riverside old-town lanes, teahouses, snack stalls, steep streets and old dock memory, not an unrelated coastal or aerial scene.",
      zh: "磁器口古镇要呈现重庆江边古镇的街巷、茶馆、小吃、坡地街道和老码头记忆，不能再用无关的海岸或航拍图。"
    },
    experience: {
      en: "A good visit should avoid only chasing the busiest storefronts; it should connect lanes, river context, old shops and Chongqing snack culture.",
      zh: "游览应避开只挤在最热闹的店铺前拍照，而要把巷道、江边位置、老店和重庆小吃文化串起来。"
    }
  },
  "Inner Mongolia::Arxan National Forest": {
    image: "/images/destinations/inner-mongolia-arxan-national-forest-clean.jpg",
    caption: { en: "Arxan forest and lake scenery", zh: "阿尔山森林湖泊景观" },
    overview: {
      en: "Arxan National Forest is about volcanic landforms, forest lakes, autumn color, mineral springs and cool borderland mountain scenery.",
      zh: "阿尔山国家森林公园要看火山地貌、森林湖泊、秋色、温泉和边境山地风景，不能用黑白旧照或资料图代替。"
    },
    experience: {
      en: "A good plan should choose lake and forest stops by season and driving distance, leaving time for light, weather and quieter paths.",
      zh: "行程应按季节、车程和体力选择湖泊与森林停留点，给光线、天气和安静步道留出时间。"
    }
  },
  "Shandong::Zibo Barbecue Streets": {
    image: "/images/destinations/shandong-zibo-barbecue-streets-clean.png",
    caption: { en: "Zibo-style barbecue grill", zh: "淄博小炉烧烤" },
    overview: {
      en: "Zibo Barbecue Streets should focus on small grills, skewers, wheat wraps, scallions, sauces and the shared table rhythm that made the food culture famous.",
      zh: "淄博烧烤街区的吸引力在小炉、肉串、小饼、葱段、蘸料和围桌分享的吃法，不能用一栋建筑或展馆图来代替。"
    },
    experience: {
      en: "A good food route should explain how to wrap, season and pace the meal, then connect it with local night dining and hospitality.",
      zh: "合适的美食路线要讲清怎么卷饼、怎么蘸料、怎么控制节奏，再把它和当地夜间饮食与待客方式联系起来。"
    }
  },
  "Henan::Chenjiagou Taiji Village": {
    image: "/images/destinations/henan-chenjiagou-taiji-village-clean.png",
    caption: { en: "Chenjiagou Taiji village", zh: "陈家沟太极村" },
    overview: {
      en: "Chenjiagou Taiji Village should be introduced through Chen-style Taijiquan lineage, training spaces, village squares, museums and the living practice of martial arts.",
      zh: "陈家沟太极村要从陈式太极拳传承、练拳空间、村中广场、太极博物馆和仍在延续的习练传统来介绍，不能再用老照片拼图。"
    },
    experience: {
      en: "A good visit should include practice context, lineage stories and village space, with enough time to watch or join a basic movement session.",
      zh: "游览应包含习练场景、传承故事和村落空间，有条件时可观看或体验基础动作，而不是只看静态展板。"
    }
  },
  "Jiangxi::Poyang Lake": {
    image: "/images/destinations/jiangxi-poyang-lake-clean.png",
    caption: { en: "Poyang Lake wetland", zh: "鄱阳湖湿地" },
    overview: {
      en: "Poyang Lake should show China's largest freshwater lake through wetlands, seasonal water levels, bird habitat, fishing villages and open lake scenery, not a satellite map.",
      zh: "鄱阳湖要从湿地、水位季节变化、候鸟栖息地、渔村和开阔湖面来呈现，不能再用卫星图当主图。"
    },
    experience: {
      en: "A good route should match the season: winter birds, changing wetlands, lakeside villages and viewing points all need different timing.",
      zh: "路线要按季节安排：冬季看候鸟，丰水和枯水看湿地变化，湖边村落和观景点也需要不同时间。"
    }
  },
  "Fujian::Xiapu Mudflats": {
    image: "/images/destinations/fujian-xiapu-mudflats-clean.png",
    caption: { en: "Xiapu mudflats at sunset", zh: "霞浦滩涂日落" },
    overview: {
      en: "Xiapu Mudflats are defined by tides, fishing frames, seaweed poles, boats, reflected light and the coastal work rhythm of eastern Fujian.",
      zh: "霞浦滩涂的重点是潮汐、渔排、紫菜杆、渔船、倒影光线和闽东海岸劳作节奏，不应使用拼图或行政示意图。"
    },
    experience: {
      en: "A good visit depends on tide tables, sunrise or sunset light and the right viewpoint, so timing matters more than checking many stops.",
      zh: "游览高度依赖潮汐表、日出日落光线和机位选择，时间判断比堆很多景点更重要。"
    }
  },
  "Guangxi::Yangshuo Countryside": {
    image: "/images/destinations/guangxi-yangshuo-countryside-clean.png",
    caption: { en: "Yangshuo karst countryside", zh: "阳朔喀斯特乡村" },
    overview: {
      en: "Yangshuo Countryside should show karst peaks, riverside villages, fields, small roads and farmhouse life, not an old black-and-white archive image.",
      zh: "阳朔乡村要呈现喀斯特峰林、河岸村落、田地、小路和农家生活，不能再用黑白旧照。"
    },
    experience: {
      en: "A good day balances walking, cycling or short transfers with farm food and river scenery, keeping the pace relaxed.",
      zh: "一日安排可结合步行、骑行或短途车程，配合农家饭和河岸风景，节奏要放松。"
    }
  },
  "Guangxi::Beihai Old Street": {
    image: "/images/destinations/guangxi-beihai-old-street-clean.png",
    caption: { en: "Beihai Old Street arcade buildings", zh: "北海老街骑楼建筑" },
    overview: {
      en: "Beihai Old Street should focus on arcade buildings, trading history, old shopfronts, seafood-city life and the Gulf of Tonkin port atmosphere.",
      zh: "北海老街要看骑楼建筑、商贸历史、老店铺、海鲜城市生活和北部湾港口气息，不能再用带日期或图库水印的装饰图。"
    },
    experience: {
      en: "A good walk compares facade details, shaded arcades, snack stops and nearby port history rather than treating the street as only a photo backdrop.",
      zh: "游览适合看立面细节、骑楼阴影、小吃停留和近代港口历史，而不是只把老街当拍照背景。"
    }
  },
  "Guangdong::Shiwan Ceramic Studio": {
    image: "/images/destinations/guangdong-shiwan-ceramic-studio-clean.png",
    caption: { en: "Shiwan ceramic workshop street", zh: "石湾陶艺工坊空间" },
    overview: {
      en: "Shiwan Ceramic Studio should show Foshan's ceramic-making setting: kiln memory, clay objects, workshop streets and Lingnan folk craft, not only a single isolated object.",
      zh: "石湾陶艺工坊要呈现佛山陶艺的制作空间：窑火记忆、陶坯器物、工坊街区和岭南民间审美，不能只放一个孤立陶塑。"
    },
    experience: {
      en: "A good visit should follow materials, shaping, firing and display spaces, then explain why Shiwan ceramics look so different from porcelain centers.",
      zh: "合适的体验应看材料、塑形、烧制和展示空间，再讲清石湾陶塑为什么不同于瓷器产地。"
    }
  },
  "Qinghai::Menyuan Rapeseed Fields": {
    image: "/images/destinations/qinghai-menyuan-rapeseed-fields-clean.png",
    caption: { en: "Menyuan rapeseed fields", zh: "门源油菜花田" },
    overview: {
      en: "Menyuan Rapeseed Fields should show Qinghai's highland flower fields with mountain backdrops, village belts and broad summer color.",
      zh: "门源油菜花田要呈现青海高原花海、山地背景、村落带和夏季大色块，而不是用其他省份的花田替代。"
    },
    experience: {
      en: "A good visit should match bloom period, weather and light, leaving time for wide views instead of rushing through one platform.",
      zh: "游览要配合花期、天气和光线，给开阔视野留时间，而不是只赶一个观景台。"
    }
  }
};

const priorityDestinationSpecificText: Record<string, MediaText> = {
  "Zhejiang::Longjing Village": {
    image: "/images/experience-longjing-fields.jpg",
    caption: { en: "Longjing tea fields near Hangzhou", zh: "杭州龙井茶园" },
    overview: {
      en: "Longjing Village should be introduced through tea terraces, Dragon Well green tea, hand pan-firing, growers' courtyards and the hills between West Lake and Meijiawu. Tea planting, picking, firing and tasting together shape the local rhythm of this part of Hangzhou.",
      zh: "龙井村要从茶园坡地、龙井茶、手工炒制、茶农院落和西湖到梅家坞一带的山路来介绍。种茶、采茶、炒茶和品茶共同构成这一带杭州山村的本地节奏。"
    },
    experience: {
      en: "A good visit should leave time for a tea-field walk, a maker's explanation and tasting by aroma, leaf shape and firing style.",
      zh: "合适的体验应留出茶园步行、茶农讲解和围绕香气、叶形、炒制火候的品饮时间。"
    }
  },
  "Zhejiang::Wuzhen Water Town": {
    image: "/images/destinations/optimized/wiki-zhejiang-wuzhen-water-town.jpg",
    caption: { en: "Wuzhen canals and waterside houses", zh: "乌镇河道与临水民居" },
    overview: {
      en: "Wuzhen should be read through Jiangnan canal streets, stone bridges, waterside houses, blue calico, old workshops and evening lights along the river. The route should carry visitors between lanes, bridges, workshops and water movement.",
      zh: "乌镇要从江南河道街巷、石桥、临水民居、蓝印花布、老作坊和傍晚沿河灯火来介绍。路线应带着游客在巷弄、石桥、作坊和水路动线之间慢慢展开。"
    },
    experience: {
      en: "A good route should compare daytime workshops with quieter evening canal scenes, leaving time for bridges, covered waterside walks and small museums.",
      zh: "合适的游览应比较白天作坊与傍晚河道的不同气氛，给石桥、临水廊道和小型展馆留出停留时间。"
    }
  },
  "Zhejiang::Putuo Mountain": {
    image: "/images/destinations/zhejiang-putuo-mountain-corrected.png",
    caption: { en: "Putuo Mountain and the South Sea Guanyin", zh: "普陀山与南海观音" },
    overview: {
      en: "Putuo Mountain should be introduced as Guanyin's island pilgrimage site: Puji Temple, Fayu Temple, Huiji Temple, Zizhulin, the South Sea Guanyin statue, ferry arrival and sea-facing paths all belong in the story. The visit is a coastal pilgrimage route with temple halls, sea wind and mountain paths woven together.",
      zh: "普陀山要作为观音道场海岛来介绍：普济寺、法雨寺、慧济寺、紫竹林、南海观音像、轮渡上岛和面海步道都应进入叙述。整条路线把寺院殿堂、海风、山路和朝拜节奏连在一起。"
    },
    experience: {
      en: "A good visit should plan the ferry, temple order, walking distance and incense etiquette together, while leaving quiet time for the sea views between halls and paths.",
      zh: "合适的游览应把轮渡、寺院顺序、步行距离和敬香礼仪一起安排，并给殿堂之间的海景、山路和安静停留留出时间。"
    }
  },
  "Zhejiang::Xitang Ancient Town": {
    image: "/images/destinations/optimized/wiki-zhejiang-xitang-ancient-town.jpg",
    caption: { en: "Xitang covered corridors and canals", zh: "西塘廊棚与河道" },
    overview: {
      en: "Xitang Ancient Town is defined by covered riverside corridors, stone bridges, narrow lanes, canals and night water-town life. Its appeal is the slow movement between sheltered walkways, river bends and small shops.",
      zh: "西塘古镇要从临河廊棚、石桥、窄巷、河道和夜间水乡生活来介绍。它的重点是人在廊棚、河湾和小店之间慢慢移动的感受。"
    },
    experience: {
      en: "A good route should include both daytime lane details and evening reflections, with enough time under the covered corridors when crowds and lights change.",
      zh: "合适的路线应兼顾白天巷弄细节和夜间水面倒影，在廊棚下留出时间，观察人流、灯光和河道气氛的变化。"
    }
  },
  "Zhejiang::Ningbo Tianyi Pavilion": {
    image: "/images/destinations/optimized/wiki-zhejiang-ningbo-tianyi-pavilion.jpg",
    caption: { en: "Tianyi Pavilion library garden", zh: "宁波天一阁藏书楼" },
    overview: {
      en: "Tianyi Pavilion should be introduced as a Ming-dynasty private library and garden complex in Ningbo, with book-collecting culture, fire-prevention layout, courtyards, ponds, carved details and port-city scholarship.",
      zh: "天一阁要作为宁波明代私家藏书楼和园林院落来介绍，重点包括藏书文化、防火格局、院落水池、木石细节和港口城市的学术传统。"
    },
    experience: {
      en: "A good visit should slow down through the library courtyards, explain why books, water, walls and family scholarship mattered, and connect the site with Ningbo's local literati history.",
      zh: "合适的游览应在藏书楼院落里慢下来，讲清书籍、水池、墙院和家族学术为什么重要，并把天一阁放进宁波本地文脉中理解。"
    }
  },
  "Zhejiang::Nanxun Ancient Town": {
    image: "/images/destinations/optimized/wiki-zhejiang-nanxun-ancient-town.jpg",
    caption: { en: "Nanxun canals and merchant mansions", zh: "南浔河道与商宅" },
    overview: {
      en: "Nanxun Ancient Town should be read through silk-merchant mansions, canals, gardens, old libraries and Chinese-Western architectural details. The focus is merchant wealth, refined household space and cultural taste along the water.",
      zh: "南浔古镇要从丝商宅第、河道、园林、藏书楼和中西合璧建筑细节来介绍。重点是水边商人家族的财富、审美、藏书传统和生活空间。"
    },
    experience: {
      en: "A good route should link Xiaolianzhuang, Jiaye Library, mansion interiors and canal walks, so visitors understand why Nanxun differs from other Jiangnan towns.",
      zh: "合适的路线应串联小莲庄、嘉业堂藏书楼、商宅内部和河道步行，让人明白南浔为什么不同于普通江南古镇。"
    }
  },
  "Zhejiang::Zhoushan Fishing Coast": {
    image: "/images/destinations/zhejiang-zhoushan-fishing-coast-corrected.png",
    caption: { en: "Zhoushan fishing harbor and island coast", zh: "舟山渔港与海岛海岸" },
    overview: {
      en: "Zhoushan Fishing Coast should be introduced through island harbors, fishing boats, seafood markets, East China Sea weather, temples and working dock life. The coast here belongs to a living fishing archipelago.",
      zh: "舟山渔港海岸要从海岛港口、渔船、海鲜市场、东海天气、寺庙和码头作业生活来介绍。这里的海岸属于仍在运转的渔业群岛日常。"
    },
    experience: {
      en: "A good visit should connect harbor timing, seafood stalls, island roads and sea views, while respecting working docks and weather changes.",
      zh: "合适的游览应把港口时间、海鲜摊档、海岛道路和海景串起来，同时注意码头作业边界和海上天气变化。"
    }
  },
  "Zhejiang::Shaoxing Old City": {
    image: "/images/destinations/zhejiang-shaoxing-old-city-corrected.png",
    caption: { en: "Shaoxing Old City canals", zh: "绍兴老城河道" },
    overview: {
      en: "Shaoxing Old City should be introduced through its black-awning boats, canals, stone bridges, yellow rice wine shops, Lu Xun's neighborhood memory and old waterside houses. Shaoxing's lanes, river steps, wine culture and literary memory still sit inside the old city.",
      zh: "绍兴老城要从乌篷船、河道、石桥、黄酒铺、鲁迅故里记忆和临水老屋来介绍。绍兴的巷弄、河埠头、黄酒生活和文学记忆仍然留在老城里。"
    },
    experience: {
      en: "A good walk should slow down along the canals, compare bridges and waterside lanes, leave time for Lu Xun Native Place and yellow-rice-wine context, and read the city through everyday water life rather than only taking a canal photo.",
      zh: "合适的游览应沿河道慢走，比较古桥、河埠头和临水街巷，留出鲁迅故里与黄酒文化的讲解时间，把绍兴看成一座仍有水城日常的老城，而不是只拍一张河道照片。"
    }
  },
  "Zhejiang::West Lake": {
    image: "/images/destinations/optimized/wiki-zhejiang-west-lake.jpg",
    caption: { en: "West Lake, Hangzhou", zh: "杭州西湖" },
    overview: {
      en: "West Lake should be introduced through Hangzhou's lake surface, Su Causeway, Bai Causeway, Broken Bridge, Three Pools Mirroring the Moon, Leifeng Pagoda sightlines, lakeside walking, temple gardens and poetry-and-painting tradition. These causeways, bridges, islands, towers and shorelines together form Hangzhou's classic cultural landscape.",
      zh: "西湖要从杭州湖面、苏堤、白堤、断桥、三潭印月、雷峰塔视线、湖滨步行、寺院园林和诗画传统来介绍。这些堤、桥、岛、塔和岸线共同构成杭州西湖的经典文化景观。"
    },
    experience: {
      en: "A good visit should choose one or two walking sections instead of rushing around the whole lake, then connect lakeside views with garden stops, temple context, boat viewpoints, tea time and nearby neighborhood life.",
      zh: "合适的游览不应匆忙绕完整个湖，而应选择一到两段步行线，把湖面视野、园林停留、寺院背景、船上视角、茶歇和周边街区时间连起来。"
    }
  },
  "Liaoning::Liaoyang White Pagoda": {
    image: "/images/destinations/optimized/wiki-liaoning-liaoyang-white-pagoda.jpg",
    caption: { en: "Liaoyang White Pagoda at Guangyou Temple", zh: "辽阳广佑寺白塔" },
    overview: {
      en: "Liaoyang White Pagoda should be introduced as the brick Liao-dynasty pagoda at Guangyou Temple and a key marker of Liaoyang's old regional-center history. The focus is its dense-eave tower form, brick carving details, temple setting and position in the old city, not only a generic pagoda photo.",
      zh: "辽阳白塔要作为广佑寺白塔和辽阳古城核心地标来介绍：它的重点是辽代密檐式砖塔形制、塔身砖雕细节、寺院环境和老城位置，而不是只看一座普通塔。"
    },
    experience: {
      en: "A good visit should look from both distance and close range: first read the tower's height and old-city axis, then slow down for the base, niches, brick courses and the relationship between Guangyou Temple, White Pagoda Park and Liaoyang's urban memory.",
      zh: "合适的游览应先远看塔身比例和老城中轴，再近看塔基、佛龛、砖层与塔身细节，并把广佑寺、白塔公园和辽阳城市记忆联系起来。"
    }
  },
  "Guangdong::Shiwan Ceramic Studio": {
    image: "/images/destinations/guangdong-shiwan-ceramic-workshop-real.jpg",
    caption: { en: "Shiwan kiln and ceramic workshop street", zh: "石湾窑址与陶艺工坊" },
    overview: {
      en: "Shiwan Ceramic Studio should be understood through Foshan's kiln memory, clay shaping, ceramic figures, workshop streets and Lingnan folk craft. The page should show a making environment or kiln setting, not a single isolated museum object.",
      zh: "石湾陶艺工坊的重点在佛山石湾的窑火记忆、泥塑造型、陶塑人物、工坊街区和岭南民间工艺。页面应呈现制作空间或窑址环境，而不是单独一件博物馆器物。"
    },
    experience: {
      en: "A good visit should follow clay, shaping, firing, glazing and display spaces, then explain why Shiwan's expressive ceramic figures differ from porcelain-centered ceramic towns.",
      zh: "合适的体验应沿着泥料、塑形、烧制、釉色和展示空间展开，再讲清石湾陶塑为什么不同于以瓷器为中心的陶瓷产地。"
    }
  },
  "Guangdong::Xiqiao Mountain": {
    image: "/images/destinations/guangdong-xiqiao-mountain-guanyin-real.png",
    caption: { en: "Nanhai Guanyin on Xiqiao Mountain", zh: "西樵山南海观音" },
    overview: {
      en: "Xiqiao Mountain should be introduced through its Foshan setting, Lingnan mountain scenery, ancient volcanic landforms, temples, forest paths and the Nanhai Guanyin statue. Its page should show the mountain and Buddhist landscape, not a generic city panorama.",
      zh: "西樵山的重点在佛山南海的岭南山水、古火山地貌、寺院空间、林间步道和南海观音。页面重点应是山体、佛教空间和景区动线，不是普通城市俯瞰。"
    },
    experience: {
      en: "A good visit should connect the Guanyin plaza, mountain trails, viewpoints, old quarry or volcanic features and nearby Lingnan village context, with enough time for walking rather than only taking a distant skyline photo.",
      zh: "合适的游览应把观音广场、山间步道、观景点、古采石或火山遗迹和周边岭南村镇背景串起来，给步行与讲解留出时间，而不是只看远处城市天际线。"
    }
  },
  "Guangdong::Liwan Food Market": {
    image: "/images/destinations/guangdong-liwan-food-market-real.jpg",
    caption: { en: "Liwan neighborhood fresh market", zh: "荔湾街坊食材市场" },
    overview: {
      en: "Liwan Food Market should be read through neighborhood shopping, fresh Cantonese ingredients, seafood tanks, soup ingredients, roast meats, preserved goods and vendor conversations. It is a lived market scene, not a Pearl River night skyline.",
      zh: "荔湾食材市场的重点在街坊采购、粤菜鲜活食材、海鲜水产、老火汤料、烧味腊味、干货腌制品和摊主交流。它是日常市场现场，重点是街坊市场内部的采购和交流。"
    },
    experience: {
      en: "A good walk should slow down at stalls, read seasonal produce and seafood choices, and explain why Cantonese cooking values freshness, clear flavors, slow soup and the original taste of ingredients.",
      zh: "合适的游览应在摊位前慢下来，看季节蔬果、鲜活海鲜、汤料组合和街坊购买习惯，讲清广府菜为什么重视鲜、清、慢火汤和食材本味。"
    }
  },
  "Jiangsu::Suzhou Silk Embroidery": {
    image: "/images/experience-suzhou-embroidery.jpg",
    caption: { en: "Suzhou embroidery workshop", zh: "苏州刺绣工坊" },
    overview: {
      en: "Suzhou Silk Embroidery should show the working table: silk threads, needles, color gradation, stretched fabric and the maker's hand control. The page should feel like a craft studio, not a display cabinet of finished screens.",
      zh: "苏州丝绣工坊应呈现真正的制作现场：丝线、针法、色阶、绷架和绣娘手上的控制。这里要呈现的不是成品屏风陈列，而是苏绣怎样一针一线形成江南细腻审美。"
    },
    experience: {
      en: "A good visit should pause at stitching details, compare thread thickness and color transitions, and explain why patience, light and hand rhythm matter to Suzhou embroidery.",
      zh: "合适的体验应停在针脚细节前，比较丝线粗细、色彩过渡和绣面层次，再讲清耐心、光线和手上节奏为什么决定苏绣的质感。"
    }
  },
  "Jiangsu::Huaiyang Cuisine Kitchen": {
    image: "/images/destinations/jiangsu-huaiyang-cuisine-kitchen-real.png",
    caption: { en: "Huaiyang cuisine banquet table", zh: "淮扬菜宴席与厨房" },
    overview: {
      en: "Huaiyang Cuisine Kitchen should focus on Jiangsu's refined cooking language: precise knife work, gentle seasoning, river fish and shrimp, dried tofu threads, clear soups and banquet pacing. It should not be represented by one random heavy dish.",
      zh: "淮扬菜厨房应呈现江苏精致烹饪的现场：刀工、清鲜调味、河鲜虾蟹、干丝、清汤和宴席节奏。它不应只用一盘厚重菜肴来代表。"
    },
    experience: {
      en: "A good visit should read the kitchen through ingredients, cutting technique, stock and soup, plating restraint and the rhythm of a Yangzhou or Huai'an meal, so the cuisine feels specific rather than generic Chinese food.",
      zh: "合适的体验应从食材、切配刀工、高汤与汤羹、摆盘克制和扬州或淮安宴席节奏进入，让淮扬菜呈现自己的清雅与细致。"
    }
  },
  "Hubei::Shennongjia Forest": {
    image: "/images/destinations/hubei-shennongjia-virgin-forest-real.png",
    caption: { en: "Shennongjia primeval forest", zh: "神农架原始森林" },
    overview: {
      en: "Shennongjia Forest should be understood through primeval forest, Shennong Peak, Dajiuhu wetlands, rare wildlife and changing mountain weather. Its identity is central China's protected mountain ecosystem, not a village street or ordinary road.",
      zh: "神农架森林的重点在原始林区、神农顶、大九湖、高山湿地、珍稀动植物和多变山地气候。这里的重点是华中山地保护地生态，重点是保护地生态和山地气候。"
    },
    experience: {
      en: "A good route should plan Shennong Peak, Dajiuhu or Golden Monkey Ridge around weather, altitude and park transport, with context on forest vertical zones, snub-nosed monkey protection and alpine wetland ecology.",
      zh: "合适的游览应根据天气、海拔和景区交通安排神农顶、大九湖或金猴岭等点位，讲清森林垂直带谱、金丝猴保护和高山湿地生态。"
    }
  }
};

function naturalFallbackText(item: ProvinceRecommendation, provinceName: string | undefined, image: string, fallbackImage?: string): MediaText {
  const place = provinceName ? `${item.name}, ${provinceName}` : item.name;
  const placeZh = item.nameZh || item.name;
  const focus = item.focus;
  const focusZh = item.focusZh || item.focus;
  const enText: Record<RecommendationKind, { overview: string; experience: string }> = {
    heritage: {
      overview: `${place} is best read through ${focus}. The visit should name the actual lanes, bridges, courtyards, monuments or old-town spaces that shape the site, so the story feels anchored in this place.`,
      experience: `A good route should slow down at the details that make ${item.name} recognizable, then connect those details with local memory, daily use and the wider city context.`
    },
    nature: {
      overview: `${place} is about ${focus}. The route should follow the site's own terrain, light, season and walking conditions, so the scenery is explained through what is really there.`,
      experience: `A good visit should choose viewpoints and walking sections that show why ${item.name} is distinct, leaving enough time for weather, scale and quiet observation.`
    },
    food: {
      overview: `${place} should be explained through ${focus}: what people buy, cook, order, share and talk about there. The page should feel like a real local food scene, not a single representative dish.`,
      experience: `A good food walk should compare several stalls or kitchens, explain ordering habits and connect taste with neighborhood rhythm.`
    },
    village: {
      overview: `${place} is strongest when read through ${focus}. Homes, lanes, waterways, courtyards and public spaces should be treated as lived places with their own rhythm.`,
      experience: `A good visit should slow down inside the settlement and explain how architecture, daily use, work and local memory still fit together.`
    },
    craft: {
      overview: `${place} should focus on ${focus}, following materials, tools, makers and workshop process. The craft needs a real making context rather than an isolated souvenir or museum object.`,
      experience: `A good visit should watch how the work is made, then connect technique with local history, materials and the people who keep it alive.`
    },
    spiritual: {
      overview: `${place} should be introduced through ${focus}, with attention to worship routes, temple layout, ritual etiquette and the living use of the site.`,
      experience: `A good visit should keep a quiet pace, explain what visitors are seeing, and avoid treating ${item.name} as only a photo stop.`
    },
    city: {
      overview: `${place} should be read through ${focus}. Streets, buildings, transport, shops and ordinary routines need to appear together, so the place feels lived-in rather than like a distant skyline.`,
      experience: `A good city walk should compare blocks, storefronts and street details on the ground, then explain how local life works here.`
    },
    road: {
      overview: `${place} is defined by ${focus}. Movement, stops, transport rhythm and changing views are the main experience.`,
      experience: `A good route should plan pauses, meals, transfers and viewpoints together, making the journey itself part of the story.`
    },
    market: {
      overview: `${place} should be explained through ${focus}: stalls, goods, vendors, prices, shopping habits and neighborhood exchange.`,
      experience: `A good market walk should slow down at specific stalls and explain what local people buy, when they come and how the market connects to daily cooking.`
    },
    tea: {
      overview: `${place} should connect ${focus} with fields or forests, picking season, processing, brewing and local hospitality.`,
      experience: `A good tea visit should move from landscape to craft to tasting, so ${item.name} feels like a real tea experience rather than a scenic stop.`
    },
    coast: {
      overview: `${place} should connect ${focus} with shore scenery, harbor work, seafood, old streets and the daily rhythm of coastal life.`,
      experience: `A good coastal route should combine waterfront time with town life, harbor rhythm and food context.`
    }
  };
  const zhText: Record<RecommendationKind, { overview: string; experience: string }> = {
    heritage: {
      overview: `${placeZh}的历史价值要落到${focusZh}对应的现场：核心建筑或遗存在哪里，入口、院落、碑刻、展陈、街区或城墙怎样组织参观动线，它和周边城市或村落是什么关系。`,
      experience: `游览时应在最能代表${placeZh}的细节前停下来，把建筑形制、人物记忆、地方生活和今天的使用方式讲清楚。`
    },
    nature: {
      overview: `${placeZh}的看点来自${focusZh}在现场形成的地貌层次：山体或水面怎样展开，季节、光线、水量、海拔和步行条件怎样改变观看效果。`,
      experience: `游览应选择能说明${placeZh}特点的观景点、步道或水边停留，给天气变化、空间尺度和安静观察留出时间。`
    },
    food: {
      overview: `${placeZh}的吸引力要写到${focusZh}背后的真实饮食现场：食材从哪里来，摊位或厨房怎样运转，当地人怎么点、怎么吃、什么时候来。`,
      experience: `美食路线应比较几个摊位、店铺或厨房停留点，讲清火候、调味、点单习惯和街区节奏。`
    },
    village: {
      overview: `${placeZh}不是静态布景，它的内容在${focusZh}和仍被使用的生活空间里：民居、巷道、水系、院落、田地、祠堂或公共空间各自承担日常功能。`,
      experience: `游览应在聚落或古镇里慢下来，解释建筑、日常使用方式、地方产业和家庭记忆如何连在一起。`
    },
    craft: {
      overview: `${placeZh}的重点是${focusZh}背后的制作现场：材料、工具、手艺人、工序顺序和判断标准都要出现，工艺才不会变成单纯成品展示。`,
      experience: `体验应看清工序和手上动作，再把技法、材料、地方历史和仍在做这门手艺的人联系起来。`
    },
    spiritual: {
      overview: `${placeZh}的核心不只是建筑外观，而是${focusZh}与参拜动线、殿堂格局、礼仪方式和今天仍在延续的信仰生活。`,
      experience: `游览应保持安静节奏，讲清殿堂顺序、仪式含义、地方习惯和游客需要遵守的礼貌。`
    },
    city: {
      overview: `${placeZh}要写成一个地面城市现场：${focusZh}如何体现在街区、建筑、交通、店铺、人流和普通日常里。`,
      experience: `城市漫步应在地面比较街巷、店招、建筑立面和生活细节，说明当地人如何使用这里。`
    },
    road: {
      overview: `${placeZh}的内容在移动过程中形成：${focusZh}会通过道路、船线、索道、停靠点、交通节奏和沿途视野逐步出现。`,
      experience: `路线应把停留、用餐、接驳、返程和观景点一起安排，让行程本身成为${placeZh}的内容。`
    },
    market: {
      overview: `${placeZh}的现场感来自${focusZh}和市场运转本身：摊位分区、货品来源、摊主交流、价格习惯、采购时间和街坊关系都要写进去。`,
      experience: `市场漫步应在具体摊位前慢下来，说明本地人买什么、什么时候来，以及市场如何连接日常饮食。`
    },
    tea: {
      overview: `${placeZh}的茶味来自${focusZh}，也来自茶园或茶林环境、采摘季节、制作流程、冲泡品鉴和待客习惯。`,
      experience: `茶体验应从景观走到工艺，再进入品鉴，说明山场、手法和杯中风味之间的关系。`
    },
    coast: {
      overview: `${placeZh}的海岸气质来自${focusZh}，也来自潮水、港口生活、海鲜处理、老街空间和当地人的日常节奏。`,
      experience: `海岸路线应结合潮水时间、滨水步行、小镇生活、港口节奏和饮食背景。`
    }
  };
  return {
    image,
    fallbackImage,
    caption: { en: place, zh: placeZh },
    overview: { en: enText[item.kind].overview, zh: zhText[item.kind].overview },
    experience: { en: enText[item.kind].experience, zh: zhText[item.kind].experience }
  };
}

function focusedFallbackText(item: ProvinceRecommendation, provinceName: string | undefined, image: string, fallbackImage?: string): MediaText {
  return naturalFallbackText(item, provinceName, image, fallbackImage);
}

function localized(lang: Lang, value: Localized) {
  if (lang === "zh-CN") return value.zh;
  if (lang === "zh-TW") return toTraditionalChinese(value.zh);
  return value.en;
}

function strengthenMediaText(media: MediaText, item: ProvinceRecommendation): MediaText {
  const placeZh = item.nameZh || item.name;
  const focusZh = item.focusZh || item.focus;
  const reviewedSpecificZh: Record<string, { overview: string; experience: string }> = {
    "婺源村落": {
      overview: "婺源村落的重点不是把白墙黑瓦当成背景，而是看徽派民居、溪流巷道、祠堂水口、田埂花期和晒秋场景怎样组成仍在使用的乡村生活。",
      experience: "游览应从村口、水系和巷道慢慢进入，停在祠堂、民居立面、田埂和晒秋场景前，讲清村落如何被居住、耕作、祭祖和季节活动继续使用。"
    },
    "青岛老城": {
      overview: "青岛老城要从圣弥厄尔教堂、总督府旧址、江苏路和广西路一带的德式街区、红瓦坡屋顶以及通向海边的街道关系看起。它不是现代海湾天际线，而是山海之间的老城尺度、近代建筑遗存和本地日常生活叠在一起的城市记忆。",
      experience: "游览应把教堂、老街坡道、德式立面、栈桥或海边转场和街区小店串起来，看红瓦建筑怎样顺着山势、街道和海岸展开。"
    },
    "布达拉宫": {
      overview: "布达拉宫矗立在拉萨红山上，白宫与红宫层层叠起，把宫堡建筑、佛殿空间、旧拉萨政治记忆和高原城市天际线压在同一个视野里。",
      experience: "参观要提前确认预约时段，按高原体力慢慢上行，把楼梯动线、壁画、佛殿、宫殿功能和回望拉萨城的视角串起来。"
    }
  };
  const zhAdditions: Record<RecommendationKind, string> = {
    heritage: `游览时要具体看${focusZh}落在哪些空间、遗存、动线和城市关系里。`,
    nature: `游览时要把${focusZh}放到地形、水系、季节、光线和实际步道中看。`,
    food: `体验时要看${focusZh}背后的食材、火候、点单方式和当地人的吃法。`,
    village: `游览时要把${focusZh}放回民居、巷道、水系、公共空间和仍在发生的日常生活里。`,
    craft: `体验时要看${focusZh}如何通过材料、工具、手上动作和制作判断呈现出来。`,
    spiritual: `参观时要把${focusZh}和礼仪动线、殿堂格局、信众使用方式一起看。`,
    city: `漫步时要把${focusZh}放到街面、店铺、交通、人流和普通日常里看。`,
    road: `行程要把${focusZh}落实到移动过程、停靠点、路况或运营时间里。`,
    market: `市场体验要看${focusZh}背后的摊位分区、货品来源、摊主交流和采购时间。`,
    tea: `茶体验要把${focusZh}连接到茶园环境、采摘季节、制作流程和杯中风味。`,
    coast: `海岸路线要把${focusZh}放到潮汐、码头、海鲜、老街和当地生活节奏里。`
  };
  const enAdditions: Record<RecommendationKind, string> = {
    heritage: `The visit should point to the actual spaces, remains, routes and city context that carry ${item.focus}.`,
    nature: `The route should place ${item.focus} in terrain, water, season, light and real walking conditions.`,
    food: `The experience should connect ${item.focus} with ingredients, heat, ordering habits and local eating rhythm.`,
    village: `The visit should place ${item.focus} back into homes, lanes, water systems, public spaces and everyday use.`,
    craft: `The experience should show how ${item.focus} appears through materials, tools, hand movement and maker judgment.`,
    spiritual: `The visit should connect ${item.focus} with ritual routes, hall layout and living worship practice.`,
    city: `The walk should place ${item.focus} at street level through shops, transport, people and daily routines.`,
    road: `The route should make ${item.focus} visible through movement, stops, access and timing.`,
    market: `The market walk should connect ${item.focus} with stall sections, goods, vendors and buying times.`,
    tea: `The tea visit should connect ${item.focus} with fields, season, processing and the cup.`,
    coast: `The coastal route should place ${item.focus} in tides, harbor work, seafood, old streets and local rhythm.`
  };
  const normalizeZh = (value: string) => value
    .replace(/适合通过/g, "需要围绕")
    .replace(/适合围绕/g, "需要围绕")
    .replace(/适合从/g, "重点看")
    .replace(/要从/g, "重点看")
    .replace(/应从/g, "应写清")
    .replace(/来理解/g, "")
    .replace(/来介绍/g, "")
    .replace(new RegExp("打" + "卡", "g"), "快速拍照");
  const reviewedOverviewByKind: Record<RecommendationKind, string> = {
    heritage: `${placeZh}要把${focusZh}落到真实参观现场：入口、院落、碑刻、展陈、街区或城墙怎样组织动线，它和周边城市或村落是什么关系。`,
    nature: `${placeZh}的辨识度来自${focusZh}。山体、水面、植被、季节和光线会直接改变观感，说明时要落到真实可见的地貌和动线。`,
    food: `${placeZh}要写到${focusZh}背后的具体食材、摊位或厨房、点单方式、口味层次和当地人日常怎么吃。`,
    village: `${placeZh}需要把${focusZh}放回真实聚落现场：民居沿什么水系和巷道展开，田地、院落、祠堂或公共空间今天如何被使用。`,
    craft: `${placeZh}要写出${focusZh}背后的制作现场：材料从哪里来，工具怎么用，手艺人怎样判断火候、针法、泥性、纹样或色阶。`,
    spiritual: `${placeZh}的核心不只是建筑外观，而是${focusZh}与参拜动线、殿堂格局、礼仪方式和今天仍在延续的信仰生活。`,
    city: `${placeZh}的城市性体现在${focusZh}。街区、建筑、交通、店铺和普通日常要同时出现，页面才会像真实的地面现场。`,
    road: `${placeZh}的重点在${focusZh}带来的移动过程、停靠点、交通节奏和沿途变化，移动本身就是体验的一部分。`,
    market: `${placeZh}的现场感来自${focusZh}。摊位、货品、摊主、价格、采购习惯和街坊交流都要写进页面。`,
    tea: `${placeZh}要把${focusZh}与茶园或茶林环境、采摘季节、制作流程、冲泡方式和待客习惯连起来。`,
    coast: `${placeZh}的海岸气质来自${focusZh}，也来自港口生活、海鲜处理、老街空间和当地人的日常节奏。`
  };
  const reviewedExperienceByKind: Record<RecommendationKind, string> = {
    heritage: `游览时应停在最能代表${placeZh}的几个可见细节前，把建筑形制、人物故事、城市位置和今天的使用方式讲清楚。`,
    nature: `游览应挑选能说明${placeZh}特点的观景点、步道或水边停留，给天气变化、空间尺度和安静观察留出时间。`,
    food: `美食路线应选择几个真实停留点，比较做法、火候、调味和街区节奏，让${placeZh}不只是菜名或市场名。`,
    village: `游览要在村落内部慢下来，看建筑如何被使用，地方产业、家庭记忆、农事节奏和日常生活如何连在一起。`,
    craft: `体验要看见工序和手上动作，再把技法、材料、地方审美和仍在做这门手艺的人联系起来。`,
    spiritual: `游览应保持安静节奏，讲清殿堂顺序、仪式含义、地方习惯和游客需要遵守的礼貌。`,
    city: `城市漫步应比较街巷、店招、建筑立面和生活细节，说明当地人如何使用${placeZh}。`,
    road: `路线应把乘坐或行车时段、接驳方式、观景停留和前后街区一起安排，让移动本身成为体验的一部分。`,
    market: `市场漫步应在具体摊位前慢下来，说明本地人买什么、什么时候来，以及市场如何连接日常饮食。`,
    tea: `茶体验应从景观走到工艺，再进入品鉴，说明山场、手法和杯中风味之间的关系。`,
    coast: `海岸路线应结合潮水时间、小镇生活、港口节奏和饮食背景，让海景和生活现场同时成立。`
  };
  const templatePattern = /适合通过|需要围绕.*理解|这里的重点不是|根据季节、天气、光线和体力|而不是只/;
  const normalizedOverviewZh = normalizeZh(media.overview.zh);
  const normalizedExperienceZh = normalizeZh(media.experience.zh);
  const hasReviewedSpecificZh = Boolean(reviewedSpecificZh[placeZh]);
  const overviewZh = reviewedSpecificZh[placeZh]?.overview ?? (templatePattern.test(normalizedOverviewZh) ? reviewedOverviewByKind[item.kind] : normalizedOverviewZh);
  const experienceZh = reviewedSpecificZh[placeZh]?.experience ?? (templatePattern.test(normalizedExperienceZh) ? reviewedExperienceByKind[item.kind] : normalizedExperienceZh);
  return {
    ...media,
    overview: {
      en: media.overview.en.length < 150 ? `${media.overview.en} ${enAdditions[item.kind]}` : media.overview.en,
      zh: !hasReviewedSpecificZh && overviewZh.length < 90 ? `${overviewZh}${overviewZh.endsWith("。") ? "" : "。"}${zhAdditions[item.kind]}` : overviewZh
    },
    experience: {
      en: media.experience.en.length < 130 ? `${media.experience.en} ${enAdditions[item.kind]}` : media.experience.en,
      zh: !hasReviewedSpecificZh && experienceZh.length < 70 ? `${experienceZh}${experienceZh.endsWith("。") ? "" : "。"}${zhAdditions[item.kind]}` : experienceZh
    },
    caption: {
      en: media.caption.en,
      zh: media.caption.zh || placeZh
    }
  };
}

function cleanRecommendationText(item: ProvinceRecommendation, provinceName?: string): MediaText {
  const kind = genericByKind[item.kind];
  const provinceFallback = provinceName ? provinceFallbackImages[provinceName] : undefined;
  const prioritySpecific = provinceName ? priorityDestinationSpecificText[`${provinceName}::${item.name}`] : undefined;
  if (prioritySpecific) return strengthenMediaText(prioritySpecific, item);
  const exactImage = safeDestinationImage(provinceName, item);
  return strengthenMediaText(getAuditedDestinationMedia(
    item,
    provinceName,
    exactImage ?? verifiedRecommendationImages[item.name] ?? provinceFallback?.[item.kind] ?? provinceFallback?.default ?? kind.image,
    kind.fallbackImage
  ), item);
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
