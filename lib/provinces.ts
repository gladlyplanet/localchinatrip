export type Province = {
  slug: string;
  name: string;
  short: string;
  x: number;
  y: number;
  intro: string;
  attractions: { name: string; note: string }[];
};

export const provinces: Province[] = [
  { slug:"xinjiang",name:"Xinjiang",short:"新",x:10,y:31,intro:"Silk Road cities, desert horizons, high mountains, and Uyghur food culture.",attractions:[{name:"Kashgar Old City",note:"Historic lanes and living Uyghur culture."},{name:"Tianshan Tianchi",note:"An alpine lake below snow peaks."},{name:"Turpan",note:"Oases, vineyards, and ancient ruins."}]},
  { slug:"tibet",name:"Tibet",short:"藏",x:19,y:57,intro:"High-altitude landscapes, monasteries, and Tibetan cultural heritage.",attractions:[{name:"Potala Palace",note:"Lhasa's iconic hilltop palace."},{name:"Jokhang Temple",note:"A sacred center of Tibetan Buddhism."},{name:"Yamdrok Lake",note:"Turquoise water across the plateau."}]},
  { slug:"qinghai",name:"Qinghai",short:"青",x:30,y:43,intro:"Plateau lakes, grasslands, monasteries, and wide-open routes.",attractions:[{name:"Qinghai Lake",note:"China's largest inland saltwater lake."},{name:"Chaka Salt Lake",note:"Reflective salt flats and open sky."},{name:"Kumbum Monastery",note:"A major Tibetan Buddhist monastery."}]},
  { slug:"gansu",name:"Gansu",short:"甘",x:37,y:37,intro:"A long Silk Road corridor of caves, deserts, and frontier towns.",attractions:[{name:"Mogao Caves",note:"Buddhist murals and sculpture near Dunhuang."},{name:"Jiayuguan Pass",note:"The western fortress of the Ming Great Wall."},{name:"Zhangye Danxia",note:"Layered rainbow-colored mountains."}]},
  { slug:"inner-mongolia",name:"Inner Mongolia",short:"蒙",x:49,y:20,intro:"Grasslands, desert landscapes, and Mongolian pastoral culture.",attractions:[{name:"Hulunbuir Grassland",note:"Vast summer grasslands and wetlands."},{name:"Ordos Desert",note:"Dunes and desert experiences."},{name:"Hohhot",note:"Temples, museums, and regional cuisine."}]},
  { slug:"ningxia",name:"Ningxia",short:"宁",x:42,y:39,intro:"Yellow River landscapes, desert edges, vineyards, and Hui culture.",attractions:[{name:"Shapotou",note:"Yellow River meets the Tengger Desert."},{name:"Western Xia Tombs",note:"Royal remains beneath the Helan Mountains."},{name:"Helan Mountain",note:"Rock art and winery landscapes."}]},
  { slug:"heilongjiang",name:"Heilongjiang",short:"黑",x:80,y:12,intro:"Northern forests, ice culture, and Russian-influenced cityscapes.",attractions:[{name:"Harbin Ice Festival",note:"Large-scale winter ice architecture."},{name:"Saint Sophia Cathedral",note:"A landmark of historic Harbin."},{name:"Wudalianchi",note:"Volcanic lakes and lava landscapes."}]},
  { slug:"jilin",name:"Jilin",short:"吉",x:77,y:23,intro:"Volcanic mountains, forests, winter scenery, and Korean-Chinese culture.",attractions:[{name:"Changbai Mountain",note:"Volcanic Tianchi lake and alpine nature."},{name:"Jilin Rime",note:"Famous winter frost scenery."},{name:"Yanbian",note:"Korean-Chinese food and culture."}]},
  { slug:"liaoning",name:"Liaoning",short:"辽",x:72,y:29,intro:"Imperial heritage, coastal cities, and northeastern food culture.",attractions:[{name:"Shenyang Imperial Palace",note:"Qing dynasty architecture and history."},{name:"Dalian Coast",note:"Seaside roads and urban views."},{name:"Panjin Red Beach",note:"Seasonal crimson wetlands."}]},
  { slug:"beijing",name:"Beijing",short:"京",x:62,y:31,intro:"Imperial landmarks, hutongs, contemporary culture, and the Great Wall.",attractions:[{name:"Forbidden City",note:"The monumental center of imperial Beijing."},{name:"Great Wall",note:"Mountain ridges and restored watchtowers."},{name:"Temple of Heaven",note:"Ritual architecture and morning local life."}]},
  { slug:"tianjin",name:"Tianjin",short:"津",x:66,y:34,intro:"Treaty-port architecture, riverside streets, and northern snacks.",attractions:[{name:"Five Great Avenues",note:"Historic European-style neighborhoods."},{name:"Ancient Culture Street",note:"Crafts, snacks, and traditional shops."},{name:"Haihe River",note:"Evening walks and city bridges."}]},
  { slug:"hebei",name:"Hebei",short:"冀",x:60,y:37,intro:"Great Wall passes, imperial resorts, and mountain landscapes around Beijing.",attractions:[{name:"Chengde Mountain Resort",note:"Qing imperial gardens and temples."},{name:"Shanhaiguan",note:"Great Wall gateway by the sea."},{name:"Baiyangdian",note:"Lakes, reeds, and wetland villages."}]},
  { slug:"shanxi",name:"Shanxi",short:"晋",x:55,y:40,intro:"Ancient walled towns, cave art, and courtyard architecture.",attractions:[{name:"Pingyao Ancient City",note:"A preserved Ming-Qing merchant city."},{name:"Yungang Grottoes",note:"Monumental Buddhist cave sculpture."},{name:"Hanging Temple",note:"A cliff-built religious complex."}]},
  { slug:"shaanxi",name:"Shaanxi",short:"陕",x:48,y:47,intro:"China's ancient capital region, Silk Road history, and bold northwest flavors.",attractions:[{name:"Terracotta Army",note:"The famous guardians of Qin Shi Huang."},{name:"Xi'an City Wall",note:"A complete historic urban fortification."},{name:"Muslim Quarter",note:"Night food, mosques, and lively lanes."}]},
  { slug:"shandong",name:"Shandong",short:"鲁",x:66,y:43,intro:"Confucian heritage, sacred mountains, coastal cities, and seafood.",attractions:[{name:"Mount Tai",note:"China's most storied sacred mountain."},{name:"Qufu",note:"Confucius Temple, Mansion, and Cemetery."},{name:"Qingdao",note:"Coastal architecture and seafood culture."}]},
  { slug:"henan",name:"Henan",short:"豫",x:57,y:48,intro:"Ancient capitals, Buddhist heritage, and the heartland of Chinese civilization.",attractions:[{name:"Longmen Grottoes",note:"Buddhist cave art beside the Yi River."},{name:"Shaolin Temple",note:"Chan Buddhism and martial arts heritage."},{name:"Kaifeng",note:"Song dynasty history and night markets."}]},
  { slug:"jiangsu",name:"Jiangsu",short:"苏",x:69,y:51,intro:"Classical gardens, canal towns, refined cuisine, and historic cities.",attractions:[{name:"Suzhou Gardens",note:"Masterpieces of classical garden design."},{name:"Nanjing City Wall",note:"Ming history and city views."},{name:"Zhouzhuang",note:"Canals, stone bridges, and water-town lanes."}]},
  { slug:"shanghai",name:"Shanghai",short:"沪",x:75,y:52,intro:"Art deco streets, contemporary design, historic lanes, and waterfront energy.",attractions:[{name:"The Bund",note:"Historic waterfront architecture."},{name:"Former French Concession",note:"Tree-lined streets and local neighborhoods."},{name:"Shanghai Museum",note:"Major collections of Chinese art."}]},
  { slug:"anhui",name:"Anhui",short:"皖",x:65,y:55,intro:"Huizhou villages, yellow mountains, ancestral halls, and regional traditions.",attractions:[{name:"Hongcun",note:"White-walled Huizhou village and waterways."},{name:"Huangshan",note:"Granite peaks, pines, and cloud seas."},{name:"Xidi",note:"Historic lanes and merchant residences."}]},
  { slug:"hubei",name:"Hubei",short:"鄂",x:56,y:57,intro:"Yangtze history, lakes, mountain scenery, and lively Wuhan culture.",attractions:[{name:"Yellow Crane Tower",note:"A landmark above the Yangtze in Wuhan."},{name:"Wudang Mountains",note:"Taoist temples and martial heritage."},{name:"Three Gorges",note:"Dramatic Yangtze river landscapes."}]},
  { slug:"sichuan",name:"Sichuan",short:"川",x:42,y:58,intro:"Sichuan cuisine, teahouses, pandas, sacred mountains, and varied landscapes.",attractions:[{name:"Chengdu",note:"Teahouses, markets, and everyday local life."},{name:"Jiuzhaigou",note:"Colorful alpine lakes and forests."},{name:"Mount Emei",note:"Buddhist temples and mountain trails."}]},
  { slug:"chongqing",name:"Chongqing",short:"渝",x:48,y:61,intro:"Vertical city views, hotpot, river culture, and dramatic night scenes.",attractions:[{name:"Hongya Cave",note:"Layered riverside architecture at night."},{name:"Wulong Karst",note:"Natural bridges and limestone scenery."},{name:"Yangtze Cableway",note:"A classic view across the river city."}]},
  { slug:"zhejiang",name:"Zhejiang",short:"浙",x:71,y:59,intro:"Tea villages, water towns, Buddhist islands, and elegant Hangzhou culture.",attractions:[{name:"West Lake",note:"Gardens, causeways, and lakeside history."},{name:"Longjing Village",note:"Tea fields and traditional tea culture."},{name:"Wuzhen",note:"Canals and historic Jiangnan architecture."}]},
  { slug:"jiangxi",name:"Jiangxi",short:"赣",x:62,y:63,intro:"Porcelain heritage, mountain villages, and beautiful rural landscapes.",attractions:[{name:"Jingdezhen",note:"China's historic porcelain capital."},{name:"Wuyuan",note:"Villages, fields, and seasonal countryside."},{name:"Mount Lushan",note:"Mountain villas, waterfalls, and trails."}]},
  { slug:"hunan",name:"Hunan",short:"湘",x:55,y:65,intro:"Dramatic sandstone peaks, spicy cuisine, and historic riverside towns.",attractions:[{name:"Zhangjiajie",note:"Towering sandstone pillars and glass bridges."},{name:"Fenghuang Ancient Town",note:"Stilt houses beside the Tuo River."},{name:"Changsha",note:"Night food and Hunan cultural sites."}]},
  { slug:"fujian",name:"Fujian",short:"闽",x:69,y:68,intro:"Tulou villages, tea mountains, temple culture, and a long coastline.",attractions:[{name:"Fujian Tulou",note:"Large communal earthen residences."},{name:"Wuyi Mountains",note:"Tea culture, cliffs, and river scenery."},{name:"Quanzhou",note:"Maritime Silk Road heritage."}]},
  { slug:"guizhou",name:"Guizhou",short:"黔",x:47,y:69,intro:"Minority villages, waterfalls, karst landscapes, and festival traditions.",attractions:[{name:"Huangguoshu Waterfall",note:"One of Asia's largest waterfall systems."},{name:"Xijiang Miao Village",note:"Wooden houses and Miao culture."},{name:"Libo Karst",note:"Emerald rivers and forested limestone."}]},
  { slug:"yunnan",name:"Yunnan",short:"云",x:36,y:73,intro:"Ancient towns, mountain cultures, tea routes, and extraordinary biodiversity.",attractions:[{name:"Dali",note:"Old town, villages, and Erhai Lake."},{name:"Lijiang",note:"Naxi heritage and mountain scenery."},{name:"Shangri-La",note:"Tibetan culture and highland landscapes."}]},
  { slug:"guangxi",name:"Guangxi",short:"桂",x:49,y:77,intro:"Karst mountains, rivers, rice terraces, and diverse minority cultures.",attractions:[{name:"Li River",note:"Classic karst scenery between Guilin and Yangshuo."},{name:"Longji Rice Terraces",note:"Mountain farming landscapes."},{name:"Detian Waterfall",note:"A broad waterfall on the Vietnam border."}]},
  { slug:"guangdong",name:"Guangdong",short:"粤",x:61,y:76,intro:"Cantonese food, historic trading cities, villages, and subtropical coastlines.",attractions:[{name:"Guangzhou",note:"Cantonese food and maritime history."},{name:"Kaiping Diaolou",note:"Village towers blending global styles."},{name:"Chaozhou",note:"Temples, old streets, and tea culture."}]},
  { slug:"hong-kong",name:"Hong Kong",short:"港",x:64,y:82,intro:"Harbor views, hiking trails, temples, markets, and layered urban culture.",attractions:[{name:"Victoria Peak",note:"Panoramic harbor and skyline views."},{name:"Lantau",note:"Villages, trails, and the Tian Tan Buddha."},{name:"Temple Street",note:"Evening market and local street life."}]},
  { slug:"macau",name:"Macau",short:"澳",x:59,y:83,intro:"Chinese and Portuguese heritage, historic streets, temples, and distinctive food.",attractions:[{name:"Historic Centre",note:"Churches, squares, and Chinese temples."},{name:"Ruins of St. Paul's",note:"Macau's best-known historic facade."},{name:"Taipa Village",note:"Old lanes and Macanese food."}]},
  { slug:"hainan",name:"Hainan",short:"琼",x:54,y:91,intro:"Tropical beaches, rainforests, fishing villages, and island cuisine.",attractions:[{name:"Sanya Coast",note:"Beaches and warm-water escapes."},{name:"Wuzhishan",note:"Rainforest and central highlands."},{name:"Bo'ao",note:"Rivers, sea, and quiet town scenery."}]},
];

export function getProvince(slug: string) { return provinces.find((province) => province.slug === slug); }

const chineseNames: Record<string, string> = {
  xinjiang:"新疆",tibet:"西藏",qinghai:"青海",gansu:"甘肃","inner-mongolia":"内蒙古",ningxia:"宁夏",heilongjiang:"黑龙江",jilin:"吉林",liaoning:"辽宁",beijing:"北京",tianjin:"天津",hebei:"河北",shanxi:"山西",shaanxi:"陕西",shandong:"山东",henan:"河南",jiangsu:"江苏",shanghai:"上海",anhui:"安徽",hubei:"湖北",sichuan:"四川",chongqing:"重庆",zhejiang:"浙江",jiangxi:"江西",hunan:"湖南",fujian:"福建",guizhou:"贵州",yunnan:"云南",guangxi:"广西",guangdong:"广东","hong-kong":"香港",macau:"澳门",hainan:"海南"
};

export function getProvinceName(slug: string, lang: string) {
  const province = getProvince(slug);
  if (!province) return slug;
  const simplified = chineseNames[slug] ?? province.name;
  if (lang === "zh-CN") return simplified;
  if (lang === "zh-TW") return [...simplified].map((character) => ({ "台":"臺", "湾":"灣", "内":"內", "宁":"寧", "龙":"龍", "辽":"遼", "陕":"陝", "东":"東", "苏":"蘇", "庆":"慶", "贵":"貴", "云":"雲", "广":"廣", "门":"門" }[character] ?? character)).join("");
  return province.name;
}

export function attractionSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getAttraction(provinceSlug: string, slug: string) {
  return getProvince(provinceSlug)?.attractions.find((item) => attractionSlug(item.name) === slug);
}

const relatedExperiences: Record<string, string[]> = {
  anhui:["village-life","craft-and-culture"],shaanxi:["night-food-tour","custom-day"],sichuan:["local-market-walk","local-family-cooking"],jiangsu:["craft-and-culture","custom-day"],zhejiang:["tea-village-experience","custom-day"],guangxi:["private-ride","custom-day"],beijing:["custom-day","private-ride"],hubei:["private-ride","custom-day"]
};

export function getRelatedExperienceSlugs(slug: string) {
  return relatedExperiences[slug] ?? ["custom-day", "private-ride"];
}
