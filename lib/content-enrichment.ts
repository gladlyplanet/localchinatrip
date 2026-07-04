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
  "Stone Forest Kunming": "/images/destinations/yunnan-stone-forest.jpg",
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
  "Hainan Family Kitchen": "/images/about-me-dinner-table.jpg",
  "Danba Tibetan Villages": realImages.westernSichuanDanba,
  "Jiuzhaigou Valley": realImages.westernSichuanDanba,
  "Li River": "/images/destinations/guangxi-li-river-local.jpg",
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
    caption: { en: "Kuqa red canyon landscape", zh: "搴撹溅绾㈣壊宄¤胺鍦拌矊" },
    overview: { en: "Kuqa Grand Canyon is about dry red-rock valleys, narrow passages and the desert edge of southern Xinjiang, not a generic mountain view.", zh: "搴撹溅澶у场璋峰簲鍥寸粫鍗楃枂绾㈣壊宄¤胺銆佸共鏃卞北浣撱€佺嫮绐勮胺閬撳拰澶╁北鍗楅簱鍦拌矊鏉ョ悊瑙ｏ紝鑰屼笉鏄櫘閫氬北鏅€? },
    experience: { en: "A good route should follow light, walking safety and canyon sections, while explaining how wind, water and desert climate shaped the rock walls.", zh: "娓歌搴旀牴鎹厜绾裤€佹琛屽畨鍏ㄥ拰宄¤胺娈佃惤瀹夋帓锛岃娓呴銆佹按鍜屽共鏃辨皵鍊欏浣曞閫犵孩鑹插博澹併€? }
  },
  "Kanas Lake": {
    image: realImages.iliNalati,
    caption: { en: "Kanas Lake, Altay, Xinjiang", zh: "鏂扮枂闃垮嫆娉板杸绾虫柉婀? },
    overview: { en: "Kanas Lake sits in the Altai Mountains of northern Xinjiang, where glacier-fed water, forested slopes and Tuva-Kazakh settlement create a distinct borderland landscape.", zh: "鍠€绾虫柉婀栦綅浜庢柊鐤嗗寳閮ㄩ樋灏旀嘲灞变腑锛屽啺宸濇按銆佹．鏋楀北鍧″拰鍥剧摝銆佸搱钀ㄥ厠绛夎竟鍦扮敓娲诲叡鍚屾瀯鎴愯繖閲岀殑鏍稿績姘旇川銆? },
    experience: { en: "The visit should combine lake viewpoints, village context and seasonal color, with time to understand how people live with forest, pasture and long winters.", zh: "娓歌搴旂粨鍚堟箹鏅鏅偣銆佹潙钀借儗鏅拰瀛ｈ妭鑹插僵锛屽苟鐣欏嚭鏃堕棿鐞嗚В褰撳湴浜哄浣曚笌妫灄銆佺墽鍦哄拰婕暱鍐鍏卞銆? }
  },
  "Yabuli": {
    image: "/images/destinations/heilongjiang-yabuli.jpg",
    caption: { en: "Yabuli winter mountain area", zh: "浜氬竷鍔涘啲瀛ｅ北鍦? },
    overview: { en: "Yabuli is known for Heilongjiang winter sports, snow-covered mountain terrain and ski facilities southeast of Harbin.", zh: "浜氬竷鍔涘簲鍥寸粫榛戦緳姹熷啲瀛ｈ繍鍔ㄣ€佸搱灏旀花涓滃崡鏂瑰悜鐨勯洩灞卞湴褰㈠拰婊戦洩璁炬柦鏉ヤ粙缁嶃€? },
    experience: { en: "The route should focus on snow season, mountain views, winter clothing preparation and the wider northeast winter-travel atmosphere.", zh: "浣撻獙搴旇仛鐒﹂洩瀛ｃ€佸北鍦拌閲庛€侀槻瀵掑噯澶囷紝浠ュ強涓滃寳鍐鏃呰鐨勬暣浣撴皼鍥淬€? }
  },
  "Wuzhishan Rainforest": {
    image: "/images/experience-jingmai-tea-forest-real.png",
    caption: { en: "Wuzhi Mountain, central Hainan", zh: "娴峰崡涓儴浜旀寚灞? },
    overview: { en: "Wuzhishan represents Hainan's central mountain rainforest, with humid valleys, tropical vegetation and Li ethnic cultural surroundings.", zh: "浜旀寚灞遍洦鏋椾唬琛ㄦ捣鍗椾腑閮ㄥ北鍦伴洦鏋楋紝閲嶇偣鏄箍娑﹀北璋枫€佺儹甯︽琚拰榛庢棌鏂囧寲鐜銆? },
    experience: { en: "A suitable visit should be slower and nature-focused, pairing rainforest walking with local mountain-village context instead of beach-style sightseeing.", zh: "鍚堥€傜殑浣撻獙搴旀斁鎱㈣妭濂忥紝鎶婇洦鏋楁琛屼笌灞卞湴鏉戣惤鑳屾櫙缁撳悎璧锋潵锛岃€屼笉鏄寜娴锋花鏅偣鏂瑰紡娴忚銆? }
  },
  "Yalong Bay Tropical Forest": {
    image: "/images/experience-guilin-ride.jpg",
    caption: { en: "Tropical forest viewpoint above Yalong Bay", zh: "浜氶緳婀句笂鏂圭殑鐑甫妫灄瑙嗛噹" },
    overview: { en: "Yalong Bay Tropical Forest should be introduced as a forested hill and viewpoint area above Sanya's coast, linking sea views with tropical vegetation.", zh: "浜氶緳婀剧儹甯︽．鏋楀簲浣滀负涓変簹娴峰哺涓婃柟鐨勫北鍦版．鏋楀拰瑙傛櫙鍖哄煙浠嬬粛锛屾妸娴锋櫙銆佸北璺拰鐑甫妞嶈鑱旂郴璧锋潵銆? },
    experience: { en: "The route should balance viewpoints, shaded walking, heat management and quieter stops away from the busiest photo platforms.", zh: "璺嚎搴斿钩琛¤鏅偣銆佹灄鑽閬撱€侀槻鏆戣妭濂忥紝骞堕伩寮€杩囧害鎷ユ尋鐨勬媿鐓у钩鍙般€? }
  },
  "Tanmen Fishing Port": {
    image: "/images/about-me-boat-seafood.jpg",
    caption: { en: "Hainan fishing and seafood experience", zh: "娴峰崡娓旇埞涓庢捣椴滀綋楠? },
    overview: { en: "Tanmen is best understood as a working fishing-port community on Hainan's east coast, where boats, seafood and harbor routines shape local life.", zh: "娼棬娓旀腐搴斾綔涓烘捣鍗椾笢娴峰哺浠嶅湪杩愯浆鐨勬笖娓ぞ鍖烘潵鐞嗚В锛屾笖鑸广€佹捣椴滃拰娓彛鏃ュ父鏄牳蹇冦€? },
    experience: { en: "The visit should focus on harbor rhythm, seafood handling and fishing-family life rather than only taking a harbor panorama photo.", zh: "浣撻獙搴斿叧娉ㄦ腐鍙ｈ妭濂忋€佹捣椴滃鐞嗗拰娓斿鐢熸椿锛岃€屼笉鍙槸鎷嶄竴寮犳腐鍙ｅ叏鏅€? }
  },
  "Hainan Family Kitchen": {
    image: "/images/about-me-dinner-table.jpg",
    caption: { en: "Shared local meal in China", zh: "鏈湴瀹跺涵寮忛妗? },
    overview: { en: "A Hainan family-kitchen experience should center on tropical island ingredients, seafood, coconut, local sauces and the relaxed rhythm of eating together.", zh: "娴峰崡瀹跺涵鍘ㄦ埧搴斿洿缁曠儹甯﹀矝灞块鏉愩€佹捣椴溿€佹ぐ瀛愩€佹湰鍦伴叡鏂欏拰杞绘澗鐨勫洿妗岀敤椁愯妭濂忓睍寮€銆? },
    experience: { en: "The meal should explain ingredients, home-style preparation and how Hainan's climate and sea shape everyday food.", zh: "浣撻獙搴旇娓呴鏉愩€佸甯稿仛娉曪紝浠ュ強娴峰崡姘斿€欏拰娴锋磱濡備綍褰卞搷鏃ュ父楗銆? }
  }
};

function fallbackRecommendationText(item: ProvinceRecommendation, provinceName?: string): MediaText {
  const place = provinceName ? `${item.name}, ${provinceName}` : item.name;
  const placeZh = item.nameZh;
  const kind = genericByKind[item.kind];
  const actionByKind: Record<RecommendationKind, Localized> = {
    heritage: { en: `Use ${place} to read local history through architecture, streets, objects and the people who still live around the site.`, zh: `${placeZh}閫傚悎浠庡缓绛戙€佽宸枫€侀仐瀛樺拰鍛ㄨ竟鐢熸椿璇绘噦褰撳湴鍘嗗彶锛岃€屼笉鏄彧鍋滅暀鍦ㄦ墦鍗°€俙 },
    nature: { en: `${place} should be introduced through its specific terrain, season, weather and the way local life adapts to that landscape.`, zh: `${placeZh}搴旂粨鍚堝叿浣撳湴璨屻€佸鑺傚ぉ姘斿拰褰撳湴鐢熸椿濡備綍閫傚簲鑷劧鐜鏉ヤ粙缁嶃€俙 },
    food: { en: `${place} is a food stop where ingredients, local habits and table culture matter more than simply eating one famous dish.`, zh: `${placeZh}搴斿洿缁曢鏉愩€佸悆娉曞拰鍦版柟椁愭涔犳儻灞曞紑锛岃€屼笉鏄彧浠嬬粛涓€閬撳悕鑿溿€俙 },
    village: { en: `${place} is best experienced as a living community shaped by homes, lanes, work, food and family memory.`, zh: `${placeZh}搴斾綔涓轰粛鍦ㄧ敓娲荤殑绀惧尯鏉ョ悊瑙ｏ紝閲嶇偣鏄皯灞呫€佸贩閬撱€佸姵浣溿€侀ギ椋熷拰瀹舵棌璁板繂銆俙 },
    craft: { en: `${place} should focus on makers, materials, tools and the local aesthetic behind the craft.`, zh: `${placeZh}搴旇仛鐒︽墜鑹轰汉銆佹潗鏂欍€佸伐鍏峰拰鑳屽悗鐨勫湴鏂瑰缇庛€俙 },
    spiritual: { en: `${place} needs respectful pacing, with context on belief, ritual space, architecture and living practice.`, zh: `${placeZh}闇€瑕佷互灏婇噸鐨勮妭濂忓弬瑙傦紝璁叉竻淇′话銆佷华寮忕┖闂淬€佸缓绛戝拰鐜板疄鐢熸椿銆俙 },
    city: { en: `${place} is best understood through streets, neighborhoods, transport, food and ordinary daily routines.`, zh: `${placeZh}鏈€閫傚悎浠庤閬撱€佺ぞ鍖恒€佷氦閫氥€侀ギ椋熷拰鏃ュ父鑺傚涓悊瑙ｃ€俙 },
    road: { en: `${place} works as a private scenic route, with the transfer itself becoming part of the landscape experience.`, zh: `${placeZh}閫傚悎浣滀负绉佷汉椋庢櫙璺嚎锛岃璺€旀湰韬篃鎴愪负浣撻獙鐨勪竴閮ㄥ垎銆俙 },
    market: { en: `${place} should show vendors, ingredients, household routines and the direct conversations of daily shopping.`, zh: `${placeZh}搴斿憟鐜版憡涓汇€侀鏉愩€佸搴噰璐拰鏃ュ父浜ゆ祦锛岃€屼笉鏄彧鐪嬪競鍦哄瑙傘€俙 },
    tea: { en: `${place} should connect tea fields, growers, processing, tasting and the landscape that shapes the cup.`, zh: `${placeZh}搴旀妸鑼跺洯銆佽尪鍐溿€佸埗浣溿€佸搧閴村拰灞卞湴椋庡湡鑱旂郴璧锋潵銆俙 },
    coast: { en: `${place} should link sea views with harbor life, fishing communities, temples, trade and local food.`, zh: `${placeZh}搴旀妸娴锋櫙銆佹腐鍙ｇ敓娲汇€佹笖鏉戙€佸簷瀹囥€佽锤鏄撳拰鍦版柟楗鑱旂郴璧锋潵銆俙 }
  };

  return {
    image: kind.image,
    caption: { en: place, zh: placeZh },
    overview: actionByKind[item.kind],
    experience: { en: `The route should be paced around your energy and the best local timing, with explanation tied directly to ${item.name}.`, zh: `璺嚎搴旀牴鎹綋鍔涘拰褰撳湴鏈€鍚堥€傜殑鏃堕棿瀹夋帓锛岃瑙ｅ唴瀹圭洿鎺ュ洿缁?{placeZh}灞曞紑銆俙 }
  };
}

const commons = (file: string) => `/images/${encodeURIComponent(file)}`;

const recommendationMedia: Record<string, Partial<MediaText>> = {
  Hongcun: {
    image: "/images/experience-hongcun.jpg",
    caption: { en: "Hongcun, Yi County, Anhui", zh: "瀹夊窘榛熷幙瀹忔潙" },
    overview: {
      en: "Hongcun is a Huizhou village in Yi County, near Huangshan. Its preserved waterways, white walls and courtyard houses make it one of the clearest places to understand traditional Anhui village planning.",
      zh: "瀹忔潙浣嶄簬瀹夊窘榛熷幙銆侀潬杩戦粍灞憋紝鏄吀鍨嬪窘宸炲彜鏉戣惤銆傛按绯汇€佺櫧澧欓粵鐡﹀拰浼犵粺闄㈣惤淇濆瓨瀹屾暣锛岄€傚悎浜嗚В寰藉窞鏉戣惤瑙勫垝涓庣敓娲绘柟寮忋€?
    },
    experience: {
      en: "The visit works best as a slow village walk: trace the water system, read ancestral halls and homes, then connect the architecture to family life, trade and farming rhythms.",
      zh: "杩欓噷閫傚悎鐢ㄦ參鑺傚鏉戣惤婕浣撻獙锛氭部姘寸郴琛岃蛋锛岃繘鍏ョ鍫傚拰姘戝眳锛屾妸寤虹瓚銆佸鏃忕敓娲汇€佸晢璐稿巻鍙插拰涔℃潙鏃ュ父鑱旂郴璧锋潵銆?
    }
  },
  Huangshan: {
    image: "/images/experience-guilin-ride.jpg",
    caption: { en: "Huangshan, Anhui", zh: "瀹夊窘榛勫北" },
    overview: {
      en: "Huangshan is known for granite peaks, pine trees, hot springs, winter snow and cloud-sea views. It is also a major subject in Chinese painting and landscape imagination.",
      zh: "榛勫北浠ヨ姳宀楀博宄版灄銆侀粍灞辨澗銆佹俯娉夈€佸啲闆拰浜戞捣闂诲悕锛屼篃鏄腑鍥藉北姘寸敾鍜屼紶缁熷缇庝腑鏋佸叿浠ｈ〃鎬х殑鏅銆?
    },
    experience: {
      en: "A private day can be paced around weather and walking ability, choosing viewpoints, cableways and quieter paths so the mountain is experienced rather than rushed.",
      zh: "绉佷汉琛岀▼鍙牴鎹ぉ姘斿拰浣撳姏璋冩暣锛岄€夋嫨瑙傛櫙鐐广€佺储閬撳拰杈冨畨闈欑殑姝ラ亾锛岃榛勫北鎴愪负鐪熸鐨勬櫙瑙備綋楠岋紝鑰屼笉鏄刀璺墦鍗°€?
    }
  },
  "Longjing Village": {
    image: "/images/experience-longjing-tea.jpg",
    caption: { en: "Longjing tea country, Hangzhou", zh: "鏉窞榫欎簳鑼跺尯" },
    overview: {
      en: "Longjing is the tea-growing area in Hangzhou associated with Dragon Well green tea, tea villages, plantations and tea houses around West Lake.",
      zh: "榫欎簳鏄澀宸炶タ婀栧懆杈归噸瑕佽尪鍖猴紝涓庨緳浜曠豢鑼躲€佽尪鏉戙€佽尪鍥拰鑼堕鏂囧寲绱у瘑鐩稿叧銆?
    },
    experience: {
      en: "The experience should include a tea-field walk, a grower conversation and a tasting that explains picking, pan-firing and seasonal differences.",
      zh: "浣撻獙閲嶇偣鍖呮嫭鑼跺洯姝ヨ銆佷笌鑼跺啘浜ゆ祦锛屼互鍙婇€氳繃鍝侀壌鐞嗚В閲囨憳銆佺倰鍒跺拰涓嶅悓瀛ｈ妭鑼跺彾鐨勫樊寮傘€?
    }
  },
  "Kashgar Old City": {
    image: "/images/experience-beijing-hutong.jpg",
    caption: { en: "Kashgar Old City, Xinjiang", zh: "鏂扮枂鍠€浠€鍙ゅ煄" },
    overview: {
      en: "Kashgar is an oasis city on the old Silk Road. The old city area, bazaars and mosque surroundings are central to understanding Uyghur urban life and trade culture.",
      zh: "鍠€浠€鏄彜涓濈桓涔嬭矾涓婄殑缁挎床鍩庡競锛屽彜鍩庛€佸反鎵庡拰娓呯湡瀵哄懆杈硅鍖烘槸鐞嗚В缁村惥灏斿煄甯傜敓娲讳笌鍟嗚锤鏂囧寲鐨勯噸瑕佸叆鍙ｃ€?
    },
    experience: {
      en: "A good visit connects lanes, workshops, bread ovens and market life, with careful local context rather than a surface-level photo stop.",
      zh: "濂界殑娓歌搴旀妸琛楀贩銆佹墜宸ラ摵銆侀鍧戝拰甯傚満鐢熸椿涓茶仈璧锋潵锛岄厤鍚堟湰鍦拌儗鏅瑙ｏ紝鑰屼笉鏄彧鍋滅暀鍦ㄦ媿鐓с€?
    }
  },
  "Forbidden City": {
    image: "/images/real-hero-hongcun.jpg",
    caption: { en: "Forbidden City, Beijing", zh: "鍖椾含鏁呭" },
    overview: {
      en: "The Forbidden City was the ceremonial and political center of imperial Beijing. Its axis, halls and courtyards are best understood through hierarchy, ritual and daily palace function.",
      zh: "鏁呭鏇炬槸鍖椾含鐨囧煄鐨勭ぜ鍒朵笌鏀挎不涓績銆傜悊瑙ｈ繖閲岃浠庝腑杞寸嚎銆佸娈跨瓑绾с€佺ぜ浠埗搴﹀拰瀹环鏃ュ父鍔熻兘鍏ユ墜銆?
    },
    experience: {
      en: "The route can focus on quieter side courtyards, symbolic details and the contrast between imperial scale and human-scale palace life.",
      zh: "璺嚎鍙伩寮€鍗曠函鎷ユ尋鐨勪腑杞存墦鍗★紝鍔犲叆渚ч櫌銆佸缓绛戠粏鑺傚拰瀹环鐢熸椿灞傞潰鐨勮瑙ｃ€?
    }
  },
  "West Lake": {
    image: "/images/real-hero-hongcun.jpg",
    caption: { en: "West Lake, Hangzhou", zh: "鏉窞瑗挎箹" },
    overview: {
      en: "West Lake is Hangzhou's classic cultural landscape, shaped by causeways, gardens, temples, water views and centuries of poetry and painting.",
      zh: "瑗挎箹鏄澀宸炴渶鍏蜂唬琛ㄦ€х殑鏂囧寲鏅锛岀敱鍫ゅ哺銆佸洯鏋椼€佸闄€佹按鏅拰闀挎湡璇楃敾浼犵粺鍏卞悓濉戦€犮€?
    },
    experience: {
      en: "A private route should balance the lake, nearby neighborhoods and tea country, avoiding the busiest sections when possible.",
      zh: "绉佷汉璺嚎搴旀妸婀栨櫙銆佸懆杈硅鍖哄拰鑼跺尯缁撳悎璧锋潵锛屽苟灏介噺閬垮紑鏈€鎷ユ尋鐨勫姩绾裤€?
    }
  }
};

const locationMedia: Record<string, MediaText> = {
  hongcun: { image: "/images/experience-hongcun.jpg", caption: { en: "Hongcun, Anhui", zh: "瀹夊窘瀹忔潙" }, overview: { en: "Hongcun is a Huizhou village known for waterways, ancestral halls and white-walled courtyard homes.", zh: "瀹忔潙浠ユ按绯汇€佺鍫傚拰鐧藉榛涚摝鐨勫窘娲鹃櫌钀介椈鍚嶃€? }, experience: { en: "The village-life visit focuses on lanes, family halls, water planning and how Huizhou households organized daily life.", zh: "鏉戣惤浣撻獙閲嶇偣鏀惧湪琛楀贩銆佸畻鏃忕鍫傘€佹按绯昏鍒掑拰寰藉窞浜哄鐨勬棩甯哥粨鏋勩€? } },
  "beiji-village": { image: realImages.beijiVillage, caption: { en: "Far-north village life", zh: "涓浗鍖楁柟杈瑰鏉戣惤鐢熸椿" }, overview: { en: "Beiji Village near Mohe represents China's far north, with forest climate, border culture and strong seasonal contrast.", zh: "婕犳渤鍖楁瀬鏉戜唬琛ㄤ腑鍥芥瀬鍖楀湴鍖猴紝妫灄姘斿€欍€佽竟澧冩枃鍖栧拰寮虹儓瀛ｈ妭鍙樺寲鏄牳蹇冪壒鐐广€? }, experience: { en: "The experience should emphasize local homes, northern food, winter and summer rhythms, and life along the Heilong River.", zh: "浣撻獙搴斿洿缁曞綋鍦颁汉瀹躲€佷笢鍖楅ギ椋熴€佸啲澶忚妭濂忓拰榛戦緳姹熸部宀哥敓娲诲睍寮€銆? } },
  guoliang: { image: realImages.guoliangVillage, caption: { en: "Taihang cliff village", zh: "澶灞辨偓宕栨潙钀? }, overview: { en: "Guoliang is associated with Taihang stone houses and the cliff road carved through the mountain.", zh: "閮寒鏉戜笌澶灞辩煶澶存皯灞呭拰浜哄伐寮€鍑跨殑鎸傚鍏矾鐩稿叧銆? }, experience: { en: "The visit should explain mountain survival, stone architecture and why the cliff road changed village mobility.", zh: "浣撻獙閲嶇偣鏄北鍦扮敓娲汇€佺煶澶村缓绛戯紝浠ュ強鎸傚鍏矾濡備綍鏀瑰彉鏉戣惤浜ら€氥€? } },
  azheke: { image: realImages.yuanyangTerraces, caption: { en: "Hani terrace village", zh: "鍝堝凹姊敯鏉戣惤" }, overview: { en: "Azheke sits within the Yuanyang Hani rice terrace landscape, where forests, water channels and villages form one system.", zh: "闃胯€呯浣嶄簬鍏冮槼鍝堝凹姊敯鏅涓紝妫灄銆佹按娓犮€佹潙钀藉拰姊敯鏋勬垚瀹屾暣绯荤粺銆? }, experience: { en: "The day should connect mushroom-shaped houses, terrace farming, irrigation and Hani community life.", zh: "浣撻獙搴斾覆鑱旇槕鑿囨埧銆佹鐢板啘鑰曘€佹按鍒╃郴缁熷拰鍝堝凹绀惧尯鐢熸椿銆? } },
  pingan: { image: realImages.longjiTerraces, caption: { en: "Longji rice terraces", zh: "榫欒剨姊敯" }, overview: { en: "Ping'an Village is part of the Longji terrace area, shaped by Zhuang mountain farming and layered rice fields.", zh: "骞冲畨瀵ㄥ睘浜庨緳鑴婃鐢板尯鍩燂紝鐢卞．鏃忓北鍦板啘鑰曞拰灞傚彔绋荤敯濉戦€犮€? }, experience: { en: "The route should pair terrace viewpoints with village lanes, seasonal farming and local mountain meals.", zh: "璺嚎搴旂粨鍚堟鐢拌鏅€佹潙瀵ㄨ宸枫€佸鑺傚啘浜嬪拰灞卞湴楗彍銆? } },

  "xian-muslim-quarter": { image: "/images/experience-xian-night.jpg", caption: { en: "Xi'an night food lanes", zh: "瑗垮畨澶滈棿缇庨琛楀贩" }, overview: { en: "Xi'an's Muslim Quarter reflects Silk Road history and northwest food culture through breads, noodles, grilled meat and sweets.", zh: "瑗垮畨鍥炴皯琛楀強鍛ㄨ竟閫氳繃棣嶃€侀潰椋熴€佺儰鑲夊拰鐢滈鍛堢幇涓濊矾鍘嗗彶涓庤タ鍖楅ギ椋熴€? }, experience: { en: "This night route compares trusted stalls and explains how Hui food traditions became part of Xi'an daily life.", zh: "澶滈璺嚎搴旀瘮杈冨彲闈犲皬搴椾笌鎽婁綅锛岃娓呭洖鏃忛ギ椋熶紶缁熷浣曡瀺鍏ヨタ瀹夌敓娲汇€? } },
  "chengdu-kuixinglou": { image: realImages.chengduFood, caption: { en: "Chengdu evening food", zh: "鎴愰兘澶滈棿灏忓悆" }, overview: { en: "Kuixinglou and nearby Chengdu food streets are good for skewers, noodles, wontons and informal Sichuan snacks.", zh: "濂庢槦妤间竴甯﹂€傚悎浣撻獙涓蹭覆銆侀潰椋熴€佹妱鎵嬪拰鎴愰兘琛楀ご灏忓悆銆? }, experience: { en: "The tasting should balance spice, sauces, teahouse-style ease and neighborhood stories instead of only eating hot dishes.", zh: "浣撻獙瑕佹妸楹昏荆銆佽樃鏂欍€佹垚閮芥澗寮涙劅鍜岃鍖烘晠浜嬬粨鍚堣捣鏉ワ紝鑰屼笉鍙槸鍚冭荆銆? } },
  "changsha-dongguashan": { image: realImages.changshaFood, caption: { en: "Changsha late-night food", zh: "闀挎矙娣卞椋熷爞" }, overview: { en: "Dongguashan is associated with Changsha's late-night eating culture, grilled snacks and bold Hunan flavors.", zh: "鍐摐灞变唬琛ㄩ暱娌欏瀹垫枃鍖栥€佺儳鐑ゅ皬鍚冨拰椴滆荆鐩存帴鐨勬箹鍗楀懗閬撱€? }, experience: { en: "The route should explain Hunan spice, rice noodles, grilled snacks and how locals socialize after dark.", zh: "璺嚎搴旇娓呮箹鍗楄荆鍛炽€佺背绮夈€佺儳鐑ゅ皬鍚冿紝浠ュ強闀挎矙浜虹殑澶滈棿绀句氦鏂瑰紡銆? } },
  "kaifeng-drum-tower": { image: realImages.kaifengNightMarket, caption: { en: "Kaifeng old-capital night market", zh: "寮€灏佸彜閮藉甯? }, overview: { en: "Kaifeng night markets connect Henan snacks with an old capital's urban food tradition.", zh: "寮€灏佸甯傛妸娌冲崡灏忓悆鍜屽彜閮藉煄甯傞ギ椋熶紶缁熻繛鎺ヨ捣鏉ャ€? }, experience: { en: "The experience should link dishes to Song-dynasty city memory, market routines and local snack culture.", zh: "浣撻獙搴旀妸灏忓悆銆佸畫閮借蹇嗐€佸甯傜З搴忓拰鏈湴楗鏂囧寲鑱旂郴璧锋潵銆? } },
  "guangzhou-xihua": { image: realImages.guangzhouFood, caption: { en: "Guangzhou Xihua Road snack shops", zh: "骞垮窞瑗垮崕璺鍧婂皬鍚? }, overview: { en: "Xihua Road is a useful window into Cantonese comfort food, breakfast items, desserts and neighborhood shops.", zh: "瑗垮崕璺€傚悎浜嗚В骞垮簻鏃ュ父灏忓悆銆佹棭鑼剁偣蹇冦€佺硸姘村拰琛楀潑鑰佸簵銆? }, experience: { en: "The tasting should be gentle and varied, moving from rice rolls and noodles to soups, desserts and local shop culture.", zh: "鍝佸皾搴旇交鏉惧鏍凤紝浠庤偁绮夈€侀潰椋熷埌姹ゆ按銆佺硸姘村拰琛楀潑搴楁枃鍖栥€? } },

  "kunming-zhuanxin": { image: realImages.kunmingZhuanxinMarket, caption: { en: "Kunming wet market ingredients", zh: "鏄嗘槑鑿滃競鍦洪鏉? }, overview: { en: "Zhuanxin Market is known for Yunnan mushrooms, herbs, flowers, pickles and plateau ingredients.", zh: "绡嗘柊甯傚満浠ヤ簯鍗楄弻鑿囥€侀鑽夈€侀矞鑺便€佽厡鑿滃拰楂樺師椋熸潗瑙侀暱銆? }, experience: { en: "The walk should decode unfamiliar ingredients and explain how Yunnan diversity appears in daily cooking.", zh: "甯傚満婕搴旇В閲婇檶鐢熼鏉愶紝骞惰鏄庝簯鍗楀鍏冮鍛冲浣曡繘鍏ユ棩甯搁妗屻€? } },
  "chengdu-neighborhood": { image: "/images/experience-chengdu-market.jpg", caption: { en: "Chengdu neighborhood market", zh: "鎴愰兘绀惧尯鑿滃競鍦? }, overview: { en: "A Chengdu neighborhood market reveals the pantry behind Sichuan cooking: doubanjiang, chilies, noodles and greens.", zh: "鎴愰兘绀惧尯鑿滃競鑳界湅鍒板窛鑿滃帹鎴垮熀纭€锛氳眴鐡ｃ€佽荆妞掋€侀矞闈㈠拰鏃朵护钄彍銆? }, experience: { en: "The experience should connect ingredients to dishes guests later recognize at a Sichuan table.", zh: "浣撻獙搴旀妸椋熸潗鍜屼箣鍚庨妗屼笂鐨勫窛鍛宠彍鍝佸搴旇捣鏉ャ€? } },
  "kashgar-bazaar": { image: realImages.kashgarBazaar, caption: { en: "Kashgar bazaar", zh: "鍠€浠€宸存墡" }, overview: { en: "Kashgar bazaars carry oasis trade culture through spices, breads, dried fruit, textiles and craft stalls.", zh: "鍠€浠€宸存墡閫氳繃棣欐枡銆侀銆佸共鏋溿€佺粐鐗╁拰鎵嬪伐鎽婁綅鍛堢幇缁挎床鍟嗚锤鏂囧寲銆? }, experience: { en: "The market walk should focus on Silk Road exchange, vendor life and Uyghur food traditions.", zh: "甯傚満浣撻獙搴旇仛鐒︿笣璺氦娴併€佹憡涓荤敓娲诲拰缁村惥灏旈ギ椋熶紶缁熴€? } },
  "shanghai-caoyang": { image: realImages.shanghaiWetMarket, caption: { en: "Shanghai community market", zh: "涓婃捣绀惧尯甯傚満" }, overview: { en: "Caoyang-style community markets show ordinary Shanghai life through produce, freshwater foods and prepared dishes.", zh: "涓婃捣绀惧尯甯傚満閫氳繃钄彍銆佹渤椴滃拰鐔熼鍛堢幇鍩庡競鏃ュ父鐢熸椿銆? }, experience: { en: "The visit should read local shopping habits, seasonal foods and how old neighborhoods still function.", zh: "浣撻獙搴旇瀵熸湰鍦伴噰璐範鎯€佸鑺傞鏉愬拰鑰佺ぞ鍖虹殑杩愯浆鏂瑰紡銆? } },
  "guangzhou-liwan": { image: realImages.guangzhouFreshMarket, caption: { en: "Liwan fresh seafood and market stalls", zh: "鑽旀咕椴滄椿椋熸潗鎽婁綅" }, overview: { en: "Liwan markets show Cantonese freshness, roast meats, soups, seafood and preserved foods through everyday shopping.", zh: "鑽旀咕甯傚満閫氳繃椴滄椿娴烽矞銆佺儳鍛炽€佹堡鏂欍€佽厡鍒跺搧鍜岃鍧婇噰璐憟鐜板箍搴滈ギ椋熴€? }, experience: { en: "The route should explain why Cantonese cooking values freshness, light seasoning, slow soup and the original taste of ingredients.", zh: "璺嚎搴旇娓呭箍搴滆彍涓轰綍閲嶈椴溿€佹竻銆佹參鐏堡鍜岄鏉愭湰鍛炽€? } },

  "suzhou-embroidery": { image: realImages.suzhouEmbroidery, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Suzhou embroidery craft", zh: "鑻忓窞鍒虹唬宸ヨ壓" }, overview: { en: "Suzhou embroidery is known for fine silk threads, delicate color transitions and patient hand technique.", zh: "鑻忕唬浠ョ粏涓濈嚎銆佸井濡欒壊闃跺拰鑰愬績鎵嬪伐閽堟硶钁楃О銆? }, experience: { en: "The workshop should focus on needle technique, silk materials and how Jiangnan aesthetics appear in craft.", zh: "宸ュ潑浣撻獙搴斿洿缁曢拡娉曘€佷笣绾挎潗鏂欏拰姹熷崡瀹＄編濡備綍浣撶幇鍦ㄦ墜鑹轰腑銆? } },
  "jingdezhen-ceramics": { image: realImages.jingdezhenPorcelain, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Jingdezhen porcelain studio", zh: "鏅痉闀囩摲鍣ㄥ伐鍧? }, overview: { en: "Jingdezhen is China's historic porcelain center, with studios for forming, glazing, painting and firing.", zh: "鏅痉闀囨槸涓浗鍘嗗彶鐡烽兘锛屽伐鍧婃兜鐩栨媺鍧€佹柦閲夈€佺粯鍒跺拰鐑ф垚銆? }, experience: { en: "The session should compare clay, glaze, kiln and hand-painting rather than treating ceramics as a souvenir stop.", zh: "浣撻獙搴旀瘮杈冩偿鏂欍€侀噳鑹层€佺獞鐏拰鎵嬬粯锛岃€屼笉鏄妸鐡峰櫒褰撴櫘閫氱邯蹇靛搧銆? } },
  "kaili-miao": { image: realImages.miaoCraft, caption: { en: "Miao textile and silver craft", zh: "鑻楁棌缁囩唬涓庨摱楗? }, overview: { en: "Kaili and nearby Miao villages are associated with embroidery, indigo dye, weaving and silver ornaments.", zh: "鍑噷鍙婂懆杈硅嫍瀵ㄤ笌鍒虹唬銆佽摑鏌撱€佺粐閫犲拰閾堕グ宸ヨ壓鐩稿叧銆? }, experience: { en: "The visit should explain how patterns, silver and textiles carry identity, family memory and festival meaning.", zh: "浣撻獙搴旇鏄庣汗鏍枫€侀摱楗板拰缁囩墿濡備綍鎵胯浇韬唤銆佸鏃忚蹇嗗拰鑺傚簡鎰忎箟銆? } },
  "quanzhou-puppets": { image: realImages.quanzhouPuppets, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Quanzhou puppet tradition", zh: "娉夊窞鏈ㄥ伓浼犵粺" }, overview: { en: "Quanzhou puppet craft sits inside a maritime Silk Road city with layered religious and performance traditions.", zh: "娉夊窞鏈ㄥ伓宸ヨ壓澶勫湪娴蜂笣鍩庡競銆佸鍏冧俊浠板拰琛ㄦ紨浼犵粺鐨勮儗鏅腑銆? }, experience: { en: "The experience should connect carving, manipulation and local opera with Quanzhou's port-city culture.", zh: "浣撻獙搴旀妸闆曞埢銆佹搷鍋躲€佸湴鏂规垙鍜屾硥宸炴腐鍙ｆ枃鍖栬仈绯昏捣鏉ャ€? } },
  "shiwan-ceramics": { image: realImages.shiwanCeramics, fallbackImage: "/images/experience-suzhou-craft.jpg", caption: { en: "Shiwan ceramic sculpture", zh: "鐭虫咕闄跺" }, overview: { en: "Shiwan in Foshan is known for expressive Lingnan ceramic sculpture and kiln traditions.", zh: "浣涘北鐭虫咕浠ュ瘜鏈夎〃鐜板姏鐨勫箔鍗楅櫠濉戝拰绐戠伀浼犵粺闂诲悕銆? }, experience: { en: "The workshop should highlight sculptural expression, clay handling and Lingnan folk aesthetics.", zh: "宸ュ潑浣撻獙搴旂獊鍑洪€犲瀷琛ㄧ幇銆佹偿濉戞墜鎰熷拰宀崡姘戦棿瀹＄編銆? } },

  "chengdu-family": { image: "/images/experience-chengdu-cooking.jpg", caption: { en: "Home-style Sichuan cooking", zh: "宸濆懗瀹跺涵鍘ㄦ埧" }, overview: { en: "Chengdu home cooking depends on fermented sauces, fresh aromatics, balanced seasoning and relaxed table culture.", zh: "鎴愰兘瀹跺涵鑿滀緷闈犺眴鐡ｃ€侀鏂欍€佸鍚堣皟鍛冲拰杞绘澗鐨勯妗屾皼鍥淬€? }, experience: { en: "Shop with the host, prepare daily dishes and sit down to understand Sichuan hospitality around the family table.", zh: "鍜屼富浜轰拱鑿溿€佸仛瀹跺父鑿滐紝鍐嶅洿妗岀敤椁愶紝鐞嗚В鍥涘窛瀹跺涵寰呭鏂瑰紡銆? } },
  "beijing-hutong-family": { image: realImages.beijingDumplings, fallbackImage: "/images/experience-chengdu-cooking.jpg", caption: { en: "Beijing hutong dumpling kitchen", zh: "鍖椾含鑳″悓鍖呴ズ瀛愪綋楠? }, overview: { en: "A hutong kitchen connects courtyard life with northern staples such as dumplings, noodles and seasonal vegetables.", zh: "鑳″悓鍘ㄦ埧鎶婇櫌钀界敓娲讳笌楗哄瓙銆侀潰椋熷拰鍖楁柟鏃朵护鑿滆仈绯昏捣鏉ャ€? }, experience: { en: "The activity should include folding dumplings, hearing courtyard stories and understanding old Beijing family rhythms.", zh: "浣撻獙搴斿寘鍚寘楗哄瓙銆佸惉闄㈣惤鏁呬簨鍜岀悊瑙ｈ€佸寳浜搴妭濂忋€? } },
  "yangshuo-farmhouse": { image: realImages.yangshuoFarmFood, fallbackImage: "/images/experience-chengdu-cooking.jpg", caption: { en: "Yangshuo farmhouse food", zh: "闃虫湐鍐滃楗? }, overview: { en: "Yangshuo farmhouse cooking is shaped by karst countryside, seasonal vegetables and simple rural techniques.", zh: "闃虫湐鍐滃鑿滅敱鍠€鏂壒鐢板洯銆佹椂浠よ敩鑿滃拰鏈寸礌涔℃潙鍋氭硶濉戦€犮€? }, experience: { en: "Cook with local produce, compare farmhouse flavors and connect the meal to the surrounding village landscape.", zh: "鐢ㄦ湰鍦伴鏉愬仛楗紝姣旇緝鍐滃椋庡懗锛屽苟鎶婇妗屽拰鍛ㄨ竟涔℃潙鏅鑱旂郴璧锋潵銆? } },
  "suzhou-family": { image: realImages.suzhouCuisine, fallbackImage: "/images/experience-chengdu-cooking.jpg", caption: { en: "Suzhou seasonal cuisine", zh: "鑻忓窞鏃朵护瀹跺父鑿? }, overview: { en: "Suzhou home cooking tends toward seasonal, delicate flavors built around river-and-lake ingredients.", zh: "鑻忓窞瀹跺父鑿滃亸閲嶆椂浠ゃ€佺粏鑵诲拰娌虫箹椴滃懗銆? }, experience: { en: "The kitchen experience should explain Jiangnan sweetness, freshness and careful presentation.", zh: "鍘ㄦ埧浣撻獙搴旇娓呮睙鍗楄彍鐨勬竻椴溿€佸井鐢滃拰缁嗚嚧鍛堢幇銆? } },
  "xian-family": { image: realImages.xianFoodTable, fallbackImage: "/images/experience-chengdu-cooking.jpg", caption: { en: "Xi'an northwest wheat-food table", zh: "瑗垮畨瑗垮寳闈㈤椁愭" }, overview: { en: "Xi'an family cooking is built around wheat foods, hand-shaped noodles, dumplings and bold northwest seasoning.", zh: "瑗垮畨瀹跺涵楗浠ュ皬楹﹂潰椋熴€佹墜宸ラ潰銆侀ズ瀛愬拰瑗垮寳椋庡懗涓哄熀纭€銆? }, experience: { en: "Guests should learn hand techniques, taste noodle textures and understand why wheat defines the region's table.", zh: "浣撻獙搴斿涔犳墜宸ユ妧娉曘€佹瘮杈冮潰椋熷彛鎰燂紝骞剁悊瑙ｅ皬楹﹀浣曞畾涔夊綋鍦伴妗屻€? } },

  longjing: { image: realImages.longjingFields, caption: { en: "Longjing tea fields near Hangzhou", zh: "鏉窞榫欎簳鑼跺洯" }, overview: { en: "Longjing tea country links West Lake scenery with village tea gardens and pan-fired green tea craft.", zh: "榫欎簳鑼跺尯鎶婅タ婀栭鏅€佽尪鏉戠敓娲诲拰鐐掗潚缁胯尪宸ヨ壓杩炴帴鍦ㄤ竴璧枫€? }, experience: { en: "The day should include field walking, tea-maker context and tasting by aroma, leaf shape and firing style.", zh: "浣撻獙搴斿寘鍚尪鍥琛屻€佸埗鑼惰瑙ｏ紝浠ュ強鍥寸粫棣欐皵銆佸彾褰㈠拰鐐掑埗鐨勫搧閴淬€? } },
  wuyi: { image: realImages.wuyiTea, caption: { en: "Wuyi rock tea landscape", zh: "姝﹀し宀╄尪灞卞満" }, overview: { en: "Wuyi tea grows in a dramatic cliff-and-river landscape associated with rock tea and roasting craft.", zh: "姝﹀し鑼剁敓闀垮湪涓归湠宀╁涓庢邯娴佷箣闂达紝涓庡博鑼跺拰鐒欑伀宸ヨ壓鐩稿叧銆? }, experience: { en: "The visit should explain mountain terrain, roasting levels and why rock tea tastes mineral and layered.", zh: "浣撻獙搴旇鏄庡北鍦恒€佺剻鐏▼搴︼紝浠ュ強宀╄尪涓轰綍鏈夊博闊靛拰灞傛銆? } },
  anxi: { image: realImages.anxiTeaGarden, caption: { en: "Anxi Tieguanyin tea villages", zh: "瀹夋邯閾佽闊宠尪鏉? }, overview: { en: "Anxi is closely linked to Tieguanyin oolong, family tea gardens and complex processing stages.", zh: "瀹夋邯涓庨搧瑙傞煶涔岄緳鑼躲€佸搴尪鍥拰澶嶆潅鍒惰尪宸ュ簭绱у瘑鐩稿叧銆? }, experience: { en: "The experience should focus on shaking, oxidation, roasting and how aroma is built step by step.", zh: "浣撻獙搴旇仛鐒︽憞闈掋€佸彂閰点€佺剻鐏紝浠ュ強棣欐皵濡備綍涓€姝ユ褰㈡垚銆? } },
  jingmai: { image: realImages.jingmaiTeaForest, caption: { en: "Jingmai ancient tea forest", zh: "鏅繄灞卞彜鑼舵灄" }, overview: { en: "Jingmai Mountain is known for ancient tea forests where tea, villages and belief systems developed together.", zh: "鏅繄灞变互鍙よ尪鏋楄憲绉帮紝鑼舵爲銆佹潙瀵ㄥ拰淇′话绯荤粺闀挎湡鍏辩敓銆? }, experience: { en: "The route should connect old tea trees, village life and the cultural landscape of tea cultivation.", zh: "璺嚎搴旇繛鎺ュ彜鑼舵爲銆佹潙瀵ㄧ敓娲诲拰鑼跺彾绉嶆褰㈡垚鐨勬枃鍖栨櫙瑙傘€? } },
  mengding: { image: realImages.mengdingTea, caption: { en: "Mengding Mountain tea heritage", zh: "钂欓《灞辫尪鏂囧寲" }, overview: { en: "Mengding Mountain near Ya'an is associated with historic green-tea culture and mountain tea gardens.", zh: "闆呭畨钂欓《灞变笌鍘嗗彶鎮犱箙鐨勭豢鑼舵枃鍖栧拰灞卞湴鑼跺洯鐩稿叧銆? }, experience: { en: "The day should compare heritage stories, green-tea making and quiet mountain tea rituals.", zh: "浣撻獙搴旀瘮杈冭尪鍙叉晠浜嬨€佺豢鑼跺埗浣滃拰灞变腑鑼剁ぜ銆? } },

  "guilin-yangshuo": { image: "/images/experience-guilin-ride.jpg", caption: { en: "Guilin to Yangshuo karst road", zh: "妗傛灄鑷抽槼鏈斿杸鏂壒鍏矾" }, overview: { en: "The Guilin-Yangshuo route is defined by rivers, limestone peaks, villages and flexible scenic stops.", zh: "妗傛灄鑷抽槼鏈旇矾绾夸互娌虫祦銆佸嘲鏋椼€佹潙钀藉拰鐏垫椿瑙傛櫙鐐逛负鏍稿績銆? }, experience: { en: "A private ride can stop for viewpoints, village lanes and riverside pauses instead of following a fixed group route.", zh: "绉佷汉鐢ㄨ溅鍙仠闈犺鏅偣銆佹潙宸峰拰娌宠竟锛岃€屼笉蹇呰窡闅忓浐瀹氬洟闃熻矾绾裤€? } },
  "dali-lijiang": { image: realImages.daliShaxi, caption: { en: "Northwest Yunnan road route", zh: "婊囪タ鍖楀叕璺矾绾? }, overview: { en: "Dali, Shaxi and Lijiang connect old towns, Bai and Naxi culture, mountain roads and village stays.", zh: "澶х悊銆佹矙婧拰涓芥睙涓茶仈鍙ゅ煄銆佺櫧鏃忎笌绾宠タ鏂囧寲銆佸北鍦板叕璺拰鏉戣惤鍋滅暀銆? }, experience: { en: "The ride should slow down for old towns, mountain views, local meals and minority-cultural context.", zh: "璺嚎搴斾负鍙ら晣銆佸北鏅€佹湰鍦伴椋熷拰姘戞棌鏂囧寲鑳屾櫙鐣欏嚭鏃堕棿銆? } },
  "western-sichuan": { image: realImages.westernSichuanDanba, caption: { en: "Western Sichuan mountain road", zh: "宸濊タ灞卞湴鍏矾" }, overview: { en: "Kangding and Danba routes move from Chengdu into Tibetan and Qiang mountain communities.", zh: "搴峰畾涓庝腹宸磋矾绾夸粠鎴愰兘杩涘叆钘忕緦灞卞湴绀惧尯銆? }, experience: { en: "The journey should account for altitude, weather, valley scenery and respectful village stops.", zh: "琛岀▼搴旇€冭檻娴锋嫈銆佸ぉ姘斻€佸场璋烽鏅拰灏婇噸褰撳湴鐨勬潙钀藉仠闈犮€? } },
  ili: { image: realImages.iliNalati, caption: { en: "Ili grassland journey", zh: "浼婄妬鑽夊師鍏矾" }, overview: { en: "Ili combines grasslands, valleys, small towns and seasonal flower landscapes across western Xinjiang.", zh: "浼婄妬缁撳悎鑽夊師銆佹渤璋枫€佸皬鍩庡拰鏂扮枂瑗块儴瀛ｈ妭鑺辨捣鏅銆? }, experience: { en: "The route should be multi-day, flexible and paced around weather, grassland light and local Kazakh life.", zh: "璺嚎閫傚悎澶氭棩鐏垫椿瀹夋帓锛屽洿缁曞ぉ姘斻€佽崏鍘熷厜绾垮拰鍝堣惃鍏嬫棌鐢熸椿鑺傚灞曞紑銆? } },
  "qinghai-gansu": { image: realImages.qinghaiZhangye, caption: { en: "Qinghai-Gansu plateau route", zh: "闈掔敇楂樺師璺嚎" }, overview: { en: "Qinghai Lake to Zhangye connects plateau lake scenery, open roads and the Hexi Corridor.", zh: "闈掓捣婀栬嚦寮犳帠杩炴帴楂樺師婀栨硦銆佸紑闃斿叕璺拰娌宠タ璧板粖銆? }, experience: { en: "The drive should manage altitude and distance while adding scenic, food and Silk Road stops.", zh: "琛岀▼搴斿吋椤炬捣鎷斿拰璺濈锛屽悓鏃跺姞鍏ラ鏅€侀ギ椋熷拰涓濊矾鍋滈潬銆? } },

  "beijing-day": { image: "/images/experience-beijing-hutong.jpg", caption: { en: "Beijing hutong neighborhoods", zh: "鍖椾含鑳″悓琛楀尯" }, overview: { en: "A Beijing custom day can connect hutongs, imperial history, neighborhood food and contemporary local life.", zh: "鍖椾含瀹氬埗涓€鏃ュ彲杩炴帴鑳″悓銆佺殗瀹跺巻鍙层€佽鍖洪ギ椋熷拰褰撲唬鐢熸椿銆? }, experience: { en: "The day should choose fewer stops with better context, based on interest, energy and traffic.", zh: "琛岀▼搴旀寜鍏磋叮銆佷綋鍔涘拰浜ら€氶€夋嫨灏戣€屾繁鍏ョ殑鍦扮偣銆? } },
  "shanghai-day": { image: realImages.shanghaiLanes, caption: { en: "Shanghai lanes and waterfront", zh: "涓婃捣閲屽紕涓庢花姘寸┖闂? }, overview: { en: "A Shanghai day can move between old lanes, design streets, neighborhood food and the waterfront.", zh: "涓婃捣涓€鏃ュ彲涓茶仈鑰侀噷寮勩€佽璁¤鍖恒€佺ぞ鍖洪ギ椋熷拰婊ㄦ按绌洪棿銆? }, experience: { en: "The route should compare historic concessions, local neighborhoods and the city's contemporary rhythm.", zh: "璺嚎搴旀瘮杈冨巻鍙茬鐣屻€佹櫘閫氱ぞ鍖哄拰褰撲唬涓婃捣鑺傚銆? } },
  "hangzhou-day": { image: realImages.westLake, caption: { en: "Hangzhou West Lake and tea village", zh: "鏉窞瑗挎箹涓庤尪鏉? }, overview: { en: "Hangzhou works best when West Lake scenery is paired with tea villages and quieter local neighborhoods.", zh: "鏉窞鏈€閫傚悎鎶婅タ婀栨櫙瑙傘€佽尪鏉戝拰瀹夐潤鏈湴琛楀尯缁撳悎璧锋潵銆? }, experience: { en: "The custom day should avoid only circling the lake and include tea, gardens and slow neighborhood time.", zh: "瀹氬埗涓€鏃ヤ笉搴斿彧缁曟箹锛屽簲鍔犲叆鑼躲€佸洯鏋楀拰鎱㈣妭濂忚鍖烘椂闂淬€? } },
  "guangzhou-day": { image: realImages.guangzhouOldCity, caption: { en: "Guangzhou old city and food", zh: "骞垮窞鑰佸煄涓庡箍搴滈ギ椋? }, overview: { en: "Guangzhou's old city is read through arcades, ancestral halls, markets, tea and Cantonese food.", zh: "骞垮窞鑰佸煄鍙€氳繃楠戞ゼ銆佺鍫傘€佸競鍦恒€佽尪妤煎拰骞垮簻楗鏉ョ悊瑙ｃ€? }, experience: { en: "The route should connect architecture, markets and food so Cantonese culture feels practical and alive.", zh: "璺嚎搴旀妸寤虹瓚銆佸競鍦哄拰楗杩炴帴璧锋潵锛岃骞垮簻鏂囧寲鐪熷疄鍙劅銆? } },
  "wuhan-day": { image: realImages.wuhanEastLake, caption: { en: "Wuhan river city day", zh: "姝︽眽姹熷煄涓€鏃? }, overview: { en: "Wuhan combines the Yangtze riverfront, East Lake, old streets, breakfast culture and direct local energy.", zh: "姝︽眽缁撳悎闀挎睙姹熷哺銆佷笢婀栥€佽€佽銆佽繃鏃╂枃鍖栧拰椴滄槑鍩庡競鎬ф牸銆? }, experience: { en: "A custom day should include breakfast, river views, lake time and neighborhood stories.", zh: "瀹氬埗涓€鏃ュ簲鍖呭惈杩囨棭銆佹睙鏅€佷笢婀栨椂闂村拰琛楀尯鏁呬簨銆? } }
};

const genericByKind: Record<RecommendationKind, MediaText> = {
  heritage: {
    image: kindImages.heritage,
    caption: { en: "Historic architecture and local context", zh: "鍘嗗彶寤虹瓚涓庢湰鍦拌儗鏅? },
    overview: { en: "This site is best read through its architecture, historical layers and the people who shaped the surrounding city or village.", zh: "杩欎釜鍦扮偣閫傚悎浠庡缓绛戙€佸巻鍙插眰娆″拰鍛ㄨ竟鍩庡競鎴栨潙钀界殑浜烘枃鍏崇郴鏉ョ悊瑙ｃ€? },
    experience: { en: "The visit should connect visible details with larger historical context, leaving time for slower observation rather than only taking photos.", zh: "娓歌搴旀妸鍙缁嗚妭涓庢洿澶х殑鍘嗗彶鑳屾櫙杩炴帴璧锋潵锛岀暀鍑鸿瀵熸椂闂达紝鑰屼笉鍙槸鎷嶇収銆? }
  },
  nature: {
    image: kindImages.nature,
    caption: { en: "Chinese landscape route", zh: "涓浗鑷劧鏅璺嚎" },
    overview: { en: "The value of this place is in its landscape form, seasonal light and how local life adapts to the terrain.", zh: "杩欓噷鐨勪环鍊煎湪浜庡湴璨屻€佸鑺傚厜绾匡紝浠ュ強褰撳湴鐢熸椿濡備綍閫傚簲鑷劧鐜銆? },
    experience: { en: "The route should be paced around weather, walking ability and the best viewpoints of the day.", zh: "璺嚎搴旀牴鎹ぉ姘斻€佷綋鍔涘拰褰撳ぉ鏈€鍚堥€傜殑瑙傛櫙鐐瑰畨鎺掋€? }
  },
  food: {
    image: kindImages.food,
    caption: { en: "Local food culture", zh: "鍦版柟楗鏂囧寲" },
    overview: { en: "Food here is a practical way to understand migration, climate, ingredients and local social life.", zh: "楗鏄悊瑙ｅ綋鍦拌縼寰欍€佹皵鍊欍€侀鏉愬拰绀句細鐢熸椿鐨勭洿鎺ユ柟寮忋€? },
    experience: { en: "The experience should compare dishes, ingredients and eating customs, not just move from one snack to another.", zh: "浣撻獙搴旀瘮杈冭彍鍝併€侀鏉愬拰鍚冩硶涔犳儻锛岃€屼笉鏄畝鍗曡繛缁悆灏忓悆銆? }
  },
  village: {
    image: kindImages.village,
    caption: { en: "Village life and traditional houses", zh: "鏉戣惤鐢熸椿涓庝紶缁熸皯灞? },
    overview: { en: "This place is strongest when approached as a living community shaped by homes, fields, water and family memory.", zh: "杩欓噷搴斾綔涓虹敱姘戝眳銆佺敯鍦般€佹按绯诲拰瀹舵棌璁板繂濉戦€犵殑鐢熸椿绀惧尯鏉ョ悊瑙ｃ€? },
    experience: { en: "A slower walk can connect houses, lanes, food and local routines into one coherent village story.", zh: "鎱㈣鍙互鎶婃皯灞呫€佸贩閬撱€侀ギ椋熷拰鏃ュ父鑺傚杩炴帴鎴愬畬鏁寸殑鏉戣惤鏁呬簨銆? }
  },
  craft: {
    image: kindImages.craft,
    caption: { en: "Traditional Chinese craft", zh: "涓浗浼犵粺鎵嬪伐鑹? },
    overview: { en: "The craft value lies in materials, hand skills, local aesthetics and the workshop knowledge passed between makers.", zh: "鎵嬪伐鑹虹殑浠峰€煎湪浜庢潗鏂欍€佹墜涓婂姛澶€佸湴鏂瑰缇庡拰宸ュ潑浼犳壙銆? },
    experience: { en: "A good session combines demonstration, conversation and a simple hands-on element where conditions allow.", zh: "濂界殑浣撻獙搴斿寘鎷紨绀恒€佷氦娴侊紝骞跺湪鏉′欢鍏佽鏃跺姞鍏ョ畝鍗曞姩鎵嬬幆鑺傘€? }
  },
  spiritual: {
    image: kindImages.spiritual,
    caption: { en: "Sacred culture and architecture", zh: "瀹楁暀鏂囧寲涓庡缓绛? },
    overview: { en: "This place should be visited with respect for belief, ritual space, architecture and living practice.", zh: "杩欓噷搴斾互灏婇噸淇′话銆佷华寮忕┖闂淬€佸缓绛戝拰褰撲唬瀹炶返鐨勬柟寮忓弬瑙傘€? },
    experience: { en: "The guide should explain etiquette, symbolism and historical context before entering sensitive spaces.", zh: "杩涘叆鐩稿叧绌洪棿鍓嶏紝搴斿厛璁叉竻绀间华銆佽薄寰佸拰鍘嗗彶鑳屾櫙銆? }
  },
  city: {
    image: kindImages.city,
    caption: { en: "Local city walk", zh: "鏈湴鍩庡競婕" },
    overview: { en: "The city is best understood through streets, neighborhoods, transport, food and the small routines of daily life.", zh: "鍩庡競鏈€濂戒粠琛楅亾銆佺ぞ鍖恒€佷氦閫氥€侀ギ椋熷拰鏃ュ父缁嗚妭涓悊瑙ｃ€? },
    experience: { en: "The route should mix landmarks with ordinary places so the city feels lived-in, not staged.", zh: "璺嚎搴旀妸鍦版爣鍜屾櫘閫氱敓娲诲満鏅粨鍚堣捣鏉ワ紝璁╁煄甯傛樉寰楃湡瀹炶€屼笉鏄鍖呰銆? }
  },
  road: {
    image: kindImages.road,
    caption: { en: "Private scenic road journey", zh: "绉佷汉椋庢櫙鍏矾鏃呰" },
    overview: { en: "This route is about the changing landscape between places, with flexible stops that make the transfer part of the journey.", zh: "杩欑被璺嚎閲嶇偣鍦ㄥ湴鐐逛箣闂村彉鍖栫殑椋庢櫙锛屼互鍙婅浜ら€氭湰韬垚涓烘梾琛岀殑涓€閮ㄥ垎銆? },
    experience: { en: "Private transport allows better timing, rest stops and short detours when weather or interest changes.", zh: "绉佷汉浜ら€氬彲浠ユ牴鎹ぉ姘斻€佷綋鍔涘拰鍏磋叮鐏垫椿璋冩暣鍋滈潬涓庣粫琛屻€? }
  },
  market: {
    image: kindImages.market,
    caption: { en: "Local market life", zh: "鏈湴甯傚満鐢熸椿" },
    overview: { en: "Markets reveal daily cooking, household routines, regional ingredients and direct local conversations.", zh: "甯傚満鑳界洿鎺ュ憟鐜版棩甯哥児楗€佸搴噰璐€佸湴鏂归鏉愬拰鏈湴浜ゆ祦銆? },
    experience: { en: "The walk should introduce vendors, ingredients and how those foods appear later on the table.", zh: "甯傚満浣撻獙搴斾粙缁嶆憡涓汇€侀鏉愶紝浠ュ強杩欎簺椋熸潗濡備綍鍑虹幇鍦ㄩ妗屼笂銆? }
  },
  tea: {
    image: kindImages.tea,
    caption: { en: "Tea landscape and village culture", zh: "鑼跺北涓庤尪鏉戞枃鍖? },
    overview: { en: "Tea places combine landscape, cultivar, craft, tasting and the daily life of growers.", zh: "鑼跺尯鎶婂北鍦恒€佸搧绉嶃€佸伐鑹恒€佸搧閴村拰鑼跺啘鏃ュ父杩炴帴鍦ㄤ竴璧枫€? },
    experience: { en: "The visit should include walking, maker context and tasting, so the tea is understood from field to cup.", zh: "浣撻獙搴斿寘鍚琛屻€佸埗鑼惰儗鏅拰鍝侀壌锛岃涓€鏉尪浠庤尪鍥埌鑼舵澂閮借兘琚悊瑙ｃ€? }
  },
  coast: {
    image: kindImages.coast,
    caption: { en: "Coastal life and harbor culture", zh: "娴峰哺鐢熸椿涓庢腐鍙ｆ枃鍖? },
    overview: { en: "Coastal destinations are shaped by sea routes, fishing communities, temples, trade and regional food.", zh: "娴峰哺鐩殑鍦扮敱娴疯矾銆佹笖鏉戙€佸簷瀹囥€佽锤鏄撳拰鍦版柟楗鍏卞悓濉戦€犮€? },
    experience: { en: "A good route links scenery with harbor life and food culture, not only beach views.", zh: "濂界殑璺嚎搴旀妸椋庢櫙銆佹腐鍙ｇ敓娲诲拰楗鏂囧寲缁撳悎锛岃€屼笉鍙槸鐪嬫捣銆? }
  }
};

const curatedRecommendationMedia: Record<string, MediaText> = {
  "Kuqa Grand Canyon": {
    image: "/images/destination-kuqa-grand-canyon-real.jpg",
    caption: { en: "Kuqa Grand Canyon, Xinjiang", zh: "鏂扮枂搴撹溅澶у场璋? },
    overview: {
      en: "Kuqa Grand Canyon sits north of Kuqa at the southern foot of the Tianshan range. Its red sandstone walls, narrow passages and dry southern Xinjiang light make it a canyon landscape, not a generic mountain stop.",
      zh: "搴撹溅澶у场璋蜂綅浜庡簱杞︿互鍖椼€佸ぉ灞卞崡楹撲竴甯︼紝閲嶇偣鏄孩鑹茬爞宀╁场璋枫€佺嫮绐勮胺閬撳拰鍗楃枂骞叉棻鍏夌嚎褰㈡垚鐨勫湴璨屽眰娆★紝涓嶆槸鏅€氬北鏅€?
    },
    experience: {
      en: "The visit should be arranged around canyon light, walking safety and the best open sections, with context on wind-water erosion and Silk Road geography around Kuqa.",
      zh: "娓歌搴旀牴鎹场璋峰厜绾裤€佹琛屽畨鍏ㄥ拰寮€鏀捐矾娈靛畨鎺掞紝璁叉竻椋庤殌姘磋殌濡備綍濉戦€犵孩鑹插博澹侊紝浠ュ強搴撹溅鍦ㄤ笣璺崡鐤嗙嚎璺腑鐨勪綅缃€?
    }
  },
  "Kanas Lake": {
    image: realImages.iliNalati,
    caption: { en: "Kanas Lake, Altay, Xinjiang", zh: "鏂扮枂闃垮嫆娉板杸绾虫柉婀? },
    overview: {
      en: "Kanas Lake belongs to the Altai mountain landscape of northern Xinjiang, where glacier-fed water, forested slopes and Tuva-Kazakh settlement create a very different feeling from desert Xinjiang.",
      zh: "鍠€绾虫柉婀栧睘浜庢柊鐤嗗寳閮ㄩ樋灏旀嘲灞卞湴鏅锛屽啺宸濊ˉ缁欑殑婀栨按銆佹．鏋楀北鍧″拰鍥剧摝銆佸搱钀ㄥ厠绛夎竟鍦扮敓娲诲叡鍚屽舰鎴愯繖閲岀殑姘旇川銆?
    },
    experience: {
      en: "A good visit combines lake viewpoints, village context and seasonal color, with time to understand forest, pasture and long-winter life around the lake.",
      zh: "浣撻獙搴旂粨鍚堟箹鏅鏅偣銆佹潙钀借儗鏅拰瀛ｈ妭鑹插僵锛屽苟鐣欏嚭鏃堕棿鐞嗚В婀栧尯鍛ㄨ竟妫灄銆佺墽鍦轰笌婕暱鍐涓嬬殑鐢熸椿鏂瑰紡銆?
    }
  },
  "Yabuli": {
    image: "/images/destinations/heilongjiang-yabuli.jpg",
    caption: { en: "Yabuli winter mountain area", zh: "榛戦緳姹熶簹甯冨姏鍐灞卞湴" },
    overview: {
      en: "Yabuli is a winter mountain destination southeast of Harbin, known for snow sports, forested slopes and the wider northeast China winter-travel atmosphere.",
      zh: "浜氬竷鍔涙槸鍝堝皵婊ㄤ笢鍗楁柟鍚戠殑鍐灞卞湴鐩殑鍦帮紝閲嶇偣鏄啺闆繍鍔ㄣ€佹灄鍖哄北鍧″拰涓滃寳鍐鏃呰姘涘洿銆?
    },
    experience: {
      en: "The route should focus on snow season timing, clothing preparation, mountain views and a realistic pace for winter temperatures.",
      zh: "琛岀▼搴斿洿缁曢洩瀛ｆ椂闂淬€侀槻瀵掑噯澶囥€佸北鍦拌閲庡拰鍐姘旀俯涓嬬殑鍚堢悊鑺傚鏉ュ畨鎺掋€?
    }
  },
  "Wuzhishan Rainforest": {
    image: "/images/experience-jingmai-tea-forest-real.png",
    caption: { en: "Wuzhishan, central Hainan", zh: "娴峰崡涓儴浜旀寚灞? },
    overview: {
      en: "Wuzhishan represents Hainan's central mountain rainforest, with humid valleys, tropical vegetation and Li ethnic cultural surroundings away from the beach-resort side of the island.",
      zh: "浜旀寚灞变唬琛ㄦ捣鍗椾腑閮ㄥ北鍦伴洦鏋楋紝閲嶇偣鏄箍娑﹀北璋枫€佺儹甯︽琚拰榛庢棌鏂囧寲鐜锛屽拰娴锋花搴﹀亣鍨嬫捣鍗楀畬鍏ㄤ笉鍚屻€?
    },
    experience: {
      en: "A suitable visit should be slower and nature-focused, pairing rainforest walking with mountain-village context and local climate awareness.",
      zh: "鍚堥€傜殑浣撻獙搴旀斁鎱㈣妭濂忥紝鎶婇洦鏋楁琛屻€佸北鍦版潙钀借儗鏅拰褰撳湴姘斿€欑壒鐐圭粨鍚堣捣鏉ャ€?
    }
  },
  "Yalong Bay Tropical Forest": {
    image: "/images/about-me-beach-group.jpg",
    caption: { en: "Yalong Bay Tropical Forest, Sanya", zh: "涓変簹浜氶緳婀剧儹甯︽．鏋? },
    overview: {
      en: "Yalong Bay Tropical Forest is a forested hill and viewpoint area above Sanya's coast, linking sea views, tropical vegetation and short mountain walks.",
      zh: "浜氶緳婀剧儹甯︽．鏋楁槸涓変簹娴峰哺涓婃柟鐨勫北鍦版．鏋楀拰瑙傛櫙鍖哄煙锛屾牳蹇冩槸娴锋櫙銆佺儹甯︽琚拰杞婚噺灞卞湴姝ヨ銆?
    },
    experience: {
      en: "The route should balance viewpoints, shaded walking, heat management and quieter pauses away from the busiest photo platforms.",
      zh: "璺嚎搴斿钩琛¤鏅偣銆佹灄鑽閬撱€侀槻鏆戣妭濂忥紝骞堕伩寮€杩囧害鎷ユ尋鐨勬媿鐓у钩鍙般€?
    }
  },
  "Tanmen Fishing Port": {
    image: "/images/about-me-boat-seafood.jpg",
    caption: { en: "Tanmen fishing and seafood life", zh: "娼棬娓旀腐涓庢捣椴滅敓娲? },
    overview: {
      en: "Tanmen is best understood as a working fishing-port community on Hainan's east coast, where boats, seafood handling and harbor routines shape daily life.",
      zh: "娼棬搴斾綔涓烘捣鍗椾笢娴峰哺浠嶅湪杩愯浆鐨勬笖娓ぞ鍖烘潵鐞嗚В锛屾笖鑸广€佹捣椴滃鐞嗗拰娓彛鏃ュ父鏄繖閲岀殑鏍稿績銆?
    },
    experience: {
      en: "The visit should focus on harbor rhythm, seafood selection and fishing-family life rather than only taking a panorama of the port.",
      zh: "浣撻獙搴斿叧娉ㄦ腐鍙ｈ妭濂忋€佹捣椴滄寫閫夊拰娓斿鐢熸椿锛岃€屼笉鏄彧鎷嶄竴寮犳腐鍙ｅ叏鏅€?
    }
  },
  "Hainan Family Kitchen": {
    image: "/images/about-me-dinner-table.jpg",
    caption: { en: "Hainan family-style meal", zh: "娴峰崡瀹跺涵寮忛妗? },
    overview: {
      en: "A Hainan family-kitchen experience should center on island ingredients, seafood, coconut, local sauces and the relaxed rhythm of eating together.",
      zh: "娴峰崡瀹跺涵鍘ㄦ埧浣撻獙搴斿洿缁曞矝灞块鏉愩€佹捣椴溿€佹ぐ瀛愩€佹湰鍦伴叡鏂欏拰鍥存鐢ㄩ鐨勮交鏉捐妭濂忓睍寮€銆?
    },
    experience: {
      en: "The meal should explain ingredients, home-style preparation and how Hainan's climate and sea shape everyday food.",
      zh: "浣撻獙搴旇娓呴鏉愩€佸甯稿仛娉曪紝浠ュ強娴峰崡姘斿€欏拰娴锋磱濡備綍褰卞搷褰撳湴鏃ュ父楗銆?
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
  const provinceFallback = provinceName ? provinceFallbackImages[provinceName] : undefined;
  const kindContext: Record<RecommendationKind, Localized> = {
    heritage: {
      en: `${item.name} is best read through its buildings, preserved spaces and the historical layers still visible on site.`,
      zh: `${item.nameZh}鏈€閫傚悎浠庡缓绛戙€侀仐瀛樼┖闂村拰鐜板満浠嶈兘鐪嬪埌鐨勫巻鍙插眰娆℃潵鐞嗚В銆俙
    },
    nature: {
      en: `${item.name} should be arranged around season, light, terrain and a realistic pace for the landscape.`,
      zh: `${item.nameZh}搴旂粨鍚堝鑺傘€佸厜绾裤€佸湴褰㈠拰閫傚悎褰撳湴鏅鐨勬父瑙堣妭濂忔潵瀹夋帓銆俙
    },
    food: {
      en: `${item.name} is a food stop where ingredients, local habits and table culture matter as much as taste.`,
      zh: `${item.nameZh}涓嶅彧鏄悆鍛抽亾锛屼篃瑕佺悊瑙ｉ鏉愩€佸悆娉曞拰褰撳湴椁愭涔犳儻銆俙
    },
    village: {
      en: `${item.name} works best as a slow visit to homes, lanes, fields, family memory and daily routines.`,
      zh: `${item.nameZh}閫傚悎鎱㈡參鐪嬫皯灞呫€佽宸枫€佺敯鍦般€佸鏃忚蹇嗗拰鐪熷疄鏃ュ父銆俙
    },
    craft: {
      en: `${item.name} should focus on makers, materials, tools and the local aesthetic behind the craft.`,
      zh: `${item.nameZh}搴旇仛鐒︽墜鑹轰汉銆佹潗鏂欍€佸伐鍏峰拰鑳屽悗鐨勫湴鏂瑰缇庛€俙
    },
    spiritual: {
      en: `${item.name} needs a respectful visit with context on belief, ritual space and living practice.`,
      zh: `${item.nameZh}闇€瑕佷互灏婇噸鐨勬柟寮忓弬璁匡紝骞剁悊瑙ｄ俊浠般€佷华寮忕┖闂村拰鐜板疄鐢熸椿銆俙
    },
    city: {
      en: `${item.name} is best understood through streets, neighborhoods, transport, food and ordinary local routines.`,
      zh: `${item.nameZh}閫傚悎浠庤閬撱€佺ぞ鍖恒€佷氦閫氥€侀ギ椋熷拰鏅€氫汉鐨勬棩甯歌妭濂忎腑鐞嗚В銆俙
    },
    road: {
      en: `${item.name} works as a private route where the journey itself becomes part of the destination.`,
      zh: `${item.nameZh}閫傚悎浣滀负绉佷汉璺嚎锛岃璺€旀湰韬篃鎴愪负鐩殑鍦颁綋楠岀殑涓€閮ㄥ垎銆俙
    },
    market: {
      en: `${item.name} shows vendors, ingredients, household routines and the direct conversations of daily shopping.`,
      zh: `${item.nameZh}鑳界湅鍒版憡涓汇€侀鏉愩€佸搴噰璐拰鐪熷疄鐨勬棩甯镐氦娴併€俙
    },
    tea: {
      en: `${item.name} connects tea fields, growers, processing, tasting and the landscape that shapes the cup.`,
      zh: `${item.nameZh}搴旀妸鑼跺洯銆佽尪鍐溿€佸埗浣溿€佸搧閴村拰灞卞湴椋庡湡鑱旂郴璧锋潵銆俙
    },
    coast: {
      en: `${item.name} should connect sea views with harbor life, fishing communities, trade and local food.`,
      zh: `${item.nameZh}搴旀妸娴锋櫙銆佹腐鍙ｇ敓娲汇€佹笖鏉戙€佽锤鏄撳拰鍦版柟楗鑱旂郴璧锋潵銆俙
    }
  };
  return {
    image: verifiedRecommendationImages[item.name] ?? provinceFallback?.[item.kind] ?? provinceFallback?.default ?? kind.image,
    fallbackImage: kind.fallbackImage,
    caption: { en: place, zh: placeZh },
    overview: {
      en: `${place} is recommended for ${item.focus}. ${kindContext[item.kind].en}`,
      zh: `${placeZh}閫傚悎鍥寸粫${item.focusZh}鏉ョ悊瑙ｃ€?{kindContext[item.kind].zh}`
    },
    experience: {
      en: `A private visit should connect the route, timing, photo stops and explanation directly to ${item.name}. The goal is to make the place understandable through local context, not just to stop for a quick picture.`,
      zh: `绉佷汉娓歌搴旀妸璺嚎銆佹椂闂淬€佹媿鐓у仠鐣欏拰璁茶В閮界洿鎺ュ洿缁?{placeZh}灞曞紑銆傞噸鐐规槸閫氳繃鏈湴鑳屾櫙鐞嗚В杩欎釜鍦版柟锛岃€屼笉鏄櫘閫氭墦鍗°€俙
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
    caption: { en: `${location.name}, ${location.region}`, zh: `${location.nameZh}锛?{location.regionZh}` },
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
