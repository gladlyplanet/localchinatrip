export type Province = {
  slug: string;
  name: string;
  nameZh: string;
  nameTw: string;
  short: string;
  x: number;
  y: number;
  intro: string;
  introZh: string;
  attractions: { name: string; note: string }[];
};

export const provinces: Province[] = [
  { slug:"xinjiang",name:"Xinjiang",nameZh:"新疆",nameTw:"新疆",short:"新",x:10,y:31,intro:"Silk Road cities, desert horizons, high mountains, oases and Uyghur food culture.",introZh:"丝路古城、沙漠边缘、高山湖泊、绿洲生活和维吾尔族饮食文化交织在一起。",attractions:[{name:"Kashgar Old City",note:"Historic lanes and living Uyghur culture."},{name:"Tianshan Tianchi",note:"An alpine lake below Bogda Peak."},{name:"Turpan Grape Valley",note:"Oasis vineyards and Uyghur courtyards."}]},
  { slug:"tibet",name:"Tibet",nameZh:"西藏",nameTw:"西藏",short:"藏",x:19,y:57,intro:"High-altitude landscapes, monasteries, pilgrimage routes and Tibetan cultural heritage.",introZh:"高原湖泊、寺院、朝圣路线和藏族文化遗产构成西藏旅行的核心。",attractions:[{name:"Potala Palace",note:"Lhasa's iconic hilltop palace."},{name:"Jokhang Temple",note:"A sacred center of Tibetan Buddhism."},{name:"Yamdrok Lake",note:"Turquoise water across the plateau."}]},
  { slug:"qinghai",name:"Qinghai",nameZh:"青海",nameTw:"青海",short:"青",x:30,y:43,intro:"Plateau lakes, grasslands, monasteries, Amdo culture and wide-open driving routes.",introZh:"高原湖泊、草原、寺院、安多文化和开阔的公路路线是青海的重点。",attractions:[{name:"Qinghai Lake",note:"China's largest inland saltwater lake."},{name:"Chaka Salt Lake",note:"Reflective salt flats and open sky."},{name:"Kumbum Monastery",note:"A major Tibetan Buddhist monastery."}]},
  { slug:"gansu",name:"Gansu",nameZh:"甘肃",nameTw:"甘肅",short:"甘",x:37,y:37,intro:"A long Silk Road corridor of caves, deserts, Great Wall forts and frontier towns.",introZh:"甘肃是河西走廊和丝绸之路的重要段落，连接石窟、沙漠、关城和绿洲城镇。",attractions:[{name:"Mogao Caves",note:"Buddhist murals and sculpture near Dunhuang."},{name:"Jiayuguan Pass",note:"The western fortress of the Ming Great Wall."},{name:"Zhangye Danxia",note:"Layered rainbow-colored landforms."}]},
  { slug:"inner-mongolia",name:"Inner Mongolia",nameZh:"内蒙古",nameTw:"內蒙古",short:"蒙",x:49,y:20,intro:"Grasslands, deserts, forests, border cities and Mongolian pastoral culture.",introZh:"草原、沙漠、森林、边境城市和蒙古族牧区文化构成内蒙古的旅行层次。",attractions:[{name:"Hulunbuir Grassland",note:"Vast summer grasslands and wetlands."},{name:"Kubuqi Desert",note:"Dunes near the Yellow River bend."},{name:"Hohhot Old City",note:"Temples, dairy food and regional culture."}]},
  { slug:"ningxia",name:"Ningxia",nameZh:"宁夏",nameTw:"寧夏",short:"宁",x:42,y:39,intro:"Yellow River landscapes, desert edges, Helan Mountain vineyards and Hui culture.",introZh:"黄河、沙漠边缘、贺兰山东麓葡萄酒产区和回族生活是宁夏的特色。",attractions:[{name:"Shapotou",note:"The Yellow River meets Tengger Desert dunes."},{name:"Western Xia Tombs",note:"Royal tombs beneath the Helan Mountains."},{name:"Helan Mountain Rock Art",note:"Ancient carvings on the mountain front."}]},
  { slug:"heilongjiang",name:"Heilongjiang",nameZh:"黑龙江",nameTw:"黑龍江",short:"黑",x:80,y:12,intro:"Northern forests, ice culture, volcanic lakes and Russian-influenced cityscapes.",introZh:"森林、冰雪、火山湖和哈尔滨的俄式建筑共同塑造黑龙江的北方气质。",attractions:[{name:"Harbin Ice Festival",note:"Large-scale winter ice architecture."},{name:"Saint Sophia Cathedral",note:"A landmark of historic Harbin."},{name:"Wudalianchi",note:"Volcanic lakes and lava landscapes."}]},
  { slug:"jilin",name:"Jilin",nameZh:"吉林",nameTw:"吉林",short:"吉",x:77,y:23,intro:"Volcanic mountains, forests, winter scenery and Korean-Chinese culture.",introZh:"长白山、森林雪景、雾凇和延边朝鲜族文化是吉林的重要旅行主题。",attractions:[{name:"Changbai Mountain",note:"Volcanic Tianchi lake and alpine nature."},{name:"Jilin Rime",note:"Famous winter frost scenery."},{name:"Yanbian",note:"Korean-Chinese food and culture."}]},
  { slug:"liaoning",name:"Liaoning",nameZh:"辽宁",nameTw:"遼寧",short:"辽",x:72,y:29,intro:"Qing imperial heritage, coastal cities, industrial memory and northeastern food culture.",introZh:"辽宁兼具清代宫城遗产、海滨城市、工业记忆和东北饮食文化。",attractions:[{name:"Shenyang Imperial Palace",note:"Qing dynasty architecture and history."},{name:"Dalian Coast",note:"Seaside roads and urban views."},{name:"Panjin Red Beach",note:"Seasonal crimson wetlands."}]},
  { slug:"beijing",name:"Beijing",nameZh:"北京",nameTw:"北京",short:"京",x:62,y:31,intro:"Imperial landmarks, hutongs, contemporary culture and mountain sections of the Great Wall.",introZh:"北京既有皇城中轴线、胡同生活，也有长城山地景观和当代城市文化。",attractions:[{name:"Forbidden City",note:"The monumental center of imperial Beijing."},{name:"Mutianyu Great Wall",note:"Restored watchtowers along mountain ridges."},{name:"Temple of Heaven",note:"Ritual architecture and morning local life."}]},
  { slug:"tianjin",name:"Tianjin",nameZh:"天津",nameTw:"天津",short:"津",x:66,y:34,intro:"Treaty-port architecture, riverside streets, folk crafts and northern snacks.",introZh:"天津适合从租界建筑、海河街区、民间曲艺和北方小吃中理解。",attractions:[{name:"Five Great Avenues",note:"Historic European-style neighborhoods."},{name:"Ancient Culture Street",note:"Crafts, snacks and traditional shops."},{name:"Haihe River",note:"Evening walks and city bridges."}]},
  { slug:"hebei",name:"Hebei",nameZh:"河北",nameTw:"河北",short:"冀",x:60,y:37,intro:"Great Wall passes, imperial resorts, wetlands and mountain landscapes around Beijing.",introZh:"河北围绕北京展开，拥有长城关口、避暑山庄、湿地和山地景观。",attractions:[{name:"Chengde Mountain Resort",note:"Qing imperial gardens and temples."},{name:"Shanhaiguan",note:"Great Wall gateway by the sea."},{name:"Baiyangdian",note:"Lakes, reeds and wetland villages."}]},
  { slug:"shanxi",name:"Shanxi",nameZh:"山西",nameTw:"山西",short:"晋",x:55,y:40,intro:"Ancient walled towns, Buddhist cave art, wooden temples and merchant courtyards.",introZh:"山西以古城、石窟、木构寺庙和晋商大院展现中国北方历史。",attractions:[{name:"Pingyao Ancient City",note:"A preserved Ming-Qing merchant city."},{name:"Yungang Grottoes",note:"Monumental Buddhist cave sculpture."},{name:"Hanging Temple",note:"A cliff-built religious complex."}]},
  { slug:"shaanxi",name:"Shaanxi",nameZh:"陕西",nameTw:"陝西",short:"陕",x:48,y:47,intro:"Ancient capitals, Qin and Tang history, Silk Road beginnings and bold northwest flavors.",introZh:"陕西连接秦汉唐历史、丝路起点、关中平原和西北饮食风味。",attractions:[{name:"Terracotta Army",note:"The famous guardians of Qin Shi Huang."},{name:"Xi'an City Wall",note:"A complete historic urban fortification."},{name:"Muslim Quarter",note:"Night food, mosques and lively lanes."}]},
  { slug:"shandong",name:"Shandong",nameZh:"山东",nameTw:"山東",short:"鲁",x:66,y:43,intro:"Confucian heritage, sacred mountains, coastal cities and seafood culture.",introZh:"山东有儒家文化、泰山信仰、海滨城市和鲁菜海鲜传统。",attractions:[{name:"Mount Tai",note:"China's most storied sacred mountain."},{name:"Qufu",note:"Confucius Temple, Mansion and Cemetery."},{name:"Qingdao",note:"Coastal architecture and seafood culture."}]},
  { slug:"henan",name:"Henan",nameZh:"河南",nameTw:"河南",short:"豫",x:57,y:48,intro:"Ancient capitals, Buddhist heritage, Yellow River history and central plains culture.",introZh:"河南是中原文明核心，适合看古都、石窟、黄河和传统市井生活。",attractions:[{name:"Longmen Grottoes",note:"Buddhist cave art beside the Yi River."},{name:"Shaolin Temple",note:"Chan Buddhism and martial arts heritage."},{name:"Kaifeng",note:"Song dynasty history and night markets."}]},
  { slug:"jiangsu",name:"Jiangsu",nameZh:"江苏",nameTw:"江蘇",short:"苏",x:69,y:51,intro:"Classical gardens, canal towns, refined cuisine and historic Yangtze cities.",introZh:"江苏以古典园林、运河水乡、精致饮食和南京等历史城市见长。",attractions:[{name:"Suzhou Gardens",note:"Masterpieces of classical garden design."},{name:"Nanjing City Wall",note:"Ming history and city views."},{name:"Zhouzhuang",note:"Canals, stone bridges and water-town lanes."}]},
  { slug:"shanghai",name:"Shanghai",nameZh:"上海",nameTw:"上海",short:"沪",x:75,y:52,intro:"Art deco streets, historic lanes, museums, waterfront views and contemporary design.",introZh:"上海适合从外滩、老街区、博物馆、弄堂生活和当代设计中理解。",attractions:[{name:"The Bund",note:"Historic waterfront architecture."},{name:"Former French Concession",note:"Tree-lined streets and local neighborhoods."},{name:"Shanghai Museum",note:"Major collections of Chinese art."}]},
  { slug:"anhui",name:"Anhui",nameZh:"安徽",nameTw:"安徽",short:"皖",x:65,y:55,intro:"Huizhou villages, Huangshan peaks, ancestral halls and regional craft traditions.",introZh:"安徽的重点是徽州古村、黄山山水、宗族祠堂和地方手工艺。",attractions:[{name:"Hongcun",note:"White-walled Huizhou village and waterways."},{name:"Huangshan",note:"Granite peaks, pines and cloud seas."},{name:"Xidi",note:"Historic lanes and merchant residences."}]},
  { slug:"hubei",name:"Hubei",nameZh:"湖北",nameTw:"湖北",short:"鄂",x:56,y:57,intro:"Yangtze history, lakes, Taoist mountains, Wuhan food culture and river routes.",introZh:"湖北结合长江、湖泊、武当山、武汉饮食和中部城市生活。",attractions:[{name:"Yellow Crane Tower",note:"A landmark above the Yangtze in Wuhan."},{name:"Wudang Mountains",note:"Taoist temples and martial heritage."},{name:"Three Gorges",note:"Dramatic Yangtze river landscapes."}]},
  { slug:"sichuan",name:"Sichuan",nameZh:"四川",nameTw:"四川",short:"川",x:42,y:58,intro:"Sichuan cuisine, teahouses, pandas, sacred mountains and highland valleys.",introZh:"四川有川菜、茶馆、熊猫、佛教名山和川西高原山谷。",attractions:[{name:"Chengdu",note:"Teahouses, markets and local life."},{name:"Jiuzhaigou",note:"Colorful alpine lakes and forests."},{name:"Mount Emei",note:"Buddhist temples and mountain trails."}]},
  { slug:"chongqing",name:"Chongqing",nameZh:"重庆",nameTw:"重慶",short:"渝",x:48,y:61,intro:"Vertical city views, hotpot, river culture, wartime history and dramatic night scenes.",introZh:"重庆以山城地形、火锅、两江生活、抗战记忆和夜景闻名。",attractions:[{name:"Hongya Cave",note:"Layered riverside architecture at night."},{name:"Wulong Karst",note:"Natural bridges and limestone scenery."},{name:"Yangtze Cableway",note:"A classic view across the river city."}]},
  { slug:"zhejiang",name:"Zhejiang",nameZh:"浙江",nameTw:"浙江",short:"浙",x:71,y:59,intro:"Tea villages, water towns, Buddhist islands, coastal cities and elegant Hangzhou culture.",introZh:"浙江拥有西湖茶村、水乡古镇、佛教海岛、海港城市和江南生活。",attractions:[{name:"West Lake",note:"Gardens, causeways and lakeside history."},{name:"Longjing Village",note:"Tea fields and traditional tea culture."},{name:"Wuzhen",note:"Canals and historic Jiangnan architecture."}]},
  { slug:"jiangxi",name:"Jiangxi",nameZh:"江西",nameTw:"江西",short:"赣",x:62,y:63,intro:"Porcelain heritage, mountain villages, revolutionary history and rural landscapes.",introZh:"江西以景德镇瓷器、婺源村落、庐山山水和乡村景观见长。",attractions:[{name:"Jingdezhen",note:"China's historic porcelain capital."},{name:"Wuyuan",note:"Villages, fields and seasonal countryside."},{name:"Mount Lushan",note:"Mountain villas, waterfalls and trails."}]},
  { slug:"hunan",name:"Hunan",nameZh:"湖南",nameTw:"湖南",short:"湘",x:55,y:65,intro:"Sandstone peaks, spicy cuisine, ancient towns, riverside culture and revolutionary history.",introZh:"湖南有张家界砂岩峰林、湘菜、凤凰古城、长沙夜食和湘江文化。",attractions:[{name:"Zhangjiajie",note:"Towering sandstone pillars and glass bridges."},{name:"Fenghuang Ancient Town",note:"Stilt houses beside the Tuo River."},{name:"Changsha",note:"Night food and Hunan cultural sites."}]},
  { slug:"fujian",name:"Fujian",nameZh:"福建",nameTw:"福建",short:"闽",x:69,y:68,intro:"Tulou villages, tea mountains, temples, maritime trade history and a long coastline.",introZh:"福建连接土楼、武夷山茶、泉州海丝遗产、闽南寺庙和海岸生活。",attractions:[{name:"Fujian Tulou",note:"Large communal earthen residences."},{name:"Wuyi Mountains",note:"Tea culture, cliffs and river scenery."},{name:"Quanzhou",note:"Maritime Silk Road heritage."}]},
  { slug:"guizhou",name:"Guizhou",nameZh:"贵州",nameTw:"貴州",short:"黔",x:47,y:69,intro:"Minority villages, waterfalls, karst landscapes, sour-spicy food and festival traditions.",introZh:"贵州适合看苗侗村寨、瀑布、喀斯特山水、酸汤饮食和节日文化。",attractions:[{name:"Huangguoshu Waterfall",note:"One of Asia's largest waterfall systems."},{name:"Xijiang Miao Village",note:"Wooden houses and Miao culture."},{name:"Libo Karst",note:"Emerald rivers and forested limestone."}]},
  { slug:"yunnan",name:"Yunnan",nameZh:"云南",nameTw:"雲南",short:"云",x:36,y:73,intro:"Ancient towns, ethnic cultures, tea routes, highland lakes and extraordinary biodiversity.",introZh:"云南拥有古城、民族文化、茶马古道、高原湖泊和丰富的生物多样性。",attractions:[{name:"Dali",note:"Old town, villages and Erhai Lake."},{name:"Lijiang",note:"Naxi heritage and mountain scenery."},{name:"Shangri-La",note:"Tibetan culture and highland landscapes."}]},
  { slug:"guangxi",name:"Guangxi",nameZh:"广西",nameTw:"廣西",short:"桂",x:49,y:77,intro:"Karst mountains, rivers, rice terraces and Zhuang, Yao and Dong cultural landscapes.",introZh:"广西以桂林喀斯特山水、龙脊梯田、边境瀑布和壮瑶侗文化为特色。",attractions:[{name:"Li River",note:"Classic karst scenery between Guilin and Yangshuo."},{name:"Longji Rice Terraces",note:"Mountain farming landscapes."},{name:"Detian Waterfall",note:"A broad waterfall on the Vietnam border."}]},
  { slug:"guangdong",name:"Guangdong",nameZh:"广东",nameTw:"廣東",short:"粤",x:61,y:76,intro:"Cantonese food, trading ports, Lingnan architecture, villages and subtropical coastlines.",introZh:"广东适合从粤菜、商贸港口、岭南建筑、侨乡村落和海岸线理解。",attractions:[{name:"Guangzhou",note:"Cantonese food and maritime history."},{name:"Kaiping Diaolou",note:"Village towers blending global styles."},{name:"Chaozhou",note:"Temples, old streets and tea culture."}]},
  { slug:"hong-kong",name:"Hong Kong",nameZh:"香港",nameTw:"香港",short:"港",x:64,y:82,intro:"Harbor views, hiking trails, temples, street markets and layered urban culture.",introZh:"香港兼具维港天际线、山海徒步、庙宇、街市和多层次城市文化。",attractions:[{name:"Victoria Peak",note:"Panoramic harbor and skyline views."},{name:"Lantau",note:"Villages, trails and the Tian Tan Buddha."},{name:"Temple Street",note:"Evening market and local street life."}]},
  { slug:"macau",name:"Macau",nameZh:"澳门",nameTw:"澳門",short:"澳",x:59,y:83,intro:"Chinese and Portuguese heritage, historic streets, temples and distinctive food.",introZh:"澳门适合看中葡历史街区、庙宇、教堂、老街和土生葡人饮食。",attractions:[{name:"Historic Centre",note:"Churches, squares and Chinese temples."},{name:"Ruins of St. Paul's",note:"Macau's best-known historic facade."},{name:"Taipa Village",note:"Old lanes and Macanese food."}]},
  { slug:"hainan",name:"Hainan",nameZh:"海南",nameTw:"海南",short:"琼",x:54,y:91,intro:"Tropical beaches, rainforests, fishing villages, island cuisine and Li culture.",introZh:"海南不仅有海滩，也有热带雨林、渔港村落、岛屿饮食和黎族文化。",attractions:[{name:"Sanya Coast",note:"Beaches and warm-water escapes."},{name:"Wuzhishan",note:"Rainforest and central highlands."},{name:"Tanmen Fishing Port",note:"A working fishing community on the east coast."}]},
];

export function getProvince(slug: string) {
  return provinces.find((province) => province.slug === slug);
}

export function getProvinceName(slug: string, lang: string) {
  const province = getProvince(slug);
  if (!province) return slug;
  if (lang === "zh-CN") return province.nameZh;
  if (lang === "zh-TW") return province.nameTw;
  return province.name;
}

export function attractionSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getAttraction(provinceSlug: string, slug: string) {
  return getProvince(provinceSlug)?.attractions.find((item) => attractionSlug(item.name) === slug);
}

const relatedExperiences: Record<string, string[]> = {
  anhui:["village-life","craft-and-culture"],
  shaanxi:["night-food-tour","custom-day"],
  sichuan:["local-market-walk","local-family-cooking"],
  jiangsu:["craft-and-culture","custom-day"],
  zhejiang:["tea-village-experience","custom-day"],
  guangxi:["private-ride","custom-day"],
  beijing:["custom-day","private-ride"],
  hubei:["private-ride","custom-day"]
};

export function getRelatedExperienceSlugs(slug: string) {
  return relatedExperiences[slug] ?? ["custom-day", "private-ride"];
}
