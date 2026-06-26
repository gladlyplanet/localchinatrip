import type { Lang } from "@/components/LanguageProvider";

export type RecommendationKind = "heritage" | "nature" | "food" | "village" | "craft" | "spiritual" | "city" | "road" | "market" | "tea" | "coast";

export type ProvinceRecommendation = {
  name: string;
  nameZh: string;
  kind: RecommendationKind;
};

const parse = (rows: string[]): ProvinceRecommendation[] => rows.map((row) => {
  const [name, nameZh, kind] = row.split("|");
  return { name, nameZh, kind: kind as RecommendationKind };
});

export const provinceRecommendations: Record<string, ProvinceRecommendation[]> = {
  xinjiang: parse(["Kashgar Old City|喀什古城|heritage","Tianshan Tianchi|天山天池|nature","Turpan Grape Valley|吐鲁番葡萄沟|village","Nalati Grassland|那拉提草原|nature","Karakoram Highway|喀喇昆仑公路|road","Kanas Lake|喀纳斯湖|nature","Hotan Bazaar|和田巴扎|market","Kuqa Grand Canyon|库车大峡谷|nature","Yining Kazanqi|伊宁喀赞其|city"]),
  tibet: parse(["Potala Palace|布达拉宫|heritage","Jokhang Temple|大昭寺|spiritual","Yamdrok Lake|羊卓雍措|nature","Namtso Lake|纳木措|nature","Tashilhunpo Monastery|扎什伦布寺|spiritual","Ganden Monastery|甘丹寺|spiritual","Basum Lake|巴松措|nature","Yarlung Valley|雅砻河谷|heritage","Lhasa Barkhor|拉萨八廓街|city"]),
  qinghai: parse(["Qinghai Lake|青海湖|nature","Chaka Salt Lake|茶卡盐湖|nature","Kumbum Monastery|塔尔寺|spiritual","Qilian Grassland|祁连草原|nature","Dongguan Mosque|西宁东关清真大寺|spiritual","Guide Yellow River|贵德黄河|nature","Hoh Xil View Route|可可西里观景路线|road","Tongren Thangka Studios|同仁唐卡工坊|craft","Menyuan Rapeseed Fields|门源油菜花田|nature"]),
  gansu: parse(["Mogao Caves|莫高窟|heritage","Jiayuguan Pass|嘉峪关|heritage","Zhangye Danxia|张掖丹霞|nature","Maijishan Grottoes|麦积山石窟|heritage","Labrang Monastery|拉卜楞寺|spiritual","Mingsha Mountain|鸣沙山月牙泉|nature","Bingling Temple Grottoes|炳灵寺石窟|heritage","Dunhuang Night Market|敦煌夜市|food","Hexi Corridor Road|河西走廊公路|road"]),
  "inner-mongolia": parse(["Hulunbuir Grassland|呼伦贝尔草原|nature","Kubuqi Desert|库布齐沙漠|nature","Hohhot Old City|呼和浩特旧城|city","Xilamuren Grassland|希拉穆仁草原|village","Arxan National Forest|阿尔山国家森林|nature","Genghis Khan Mausoleum|成吉思汗陵|heritage","Erguna Wetland|额尔古纳湿地|nature","Manzhouli|满洲里|city","Wudangzhao Monastery|五当召|spiritual"]),
  ningxia: parse(["Shapotou|沙坡头|nature","Western Xia Tombs|西夏陵|heritage","Helan Mountain Rock Art|贺兰山岩画|heritage","Zhenbeibao Western Studios|镇北堡西部影城|heritage","Qingtongxia 108 Stupas|青铜峡一百零八塔|spiritual","Yellow River Grand Canyon|黄河大峡谷|nature","Ningxia Winery Route|宁夏酒庄路线|road","Shuidonggou|水洞沟|heritage","Wuzhong Morning Tea|吴忠早茶|food"]),
  heilongjiang: parse(["Harbin Ice and Snow World|哈尔滨冰雪大世界|city","Saint Sophia Cathedral|圣索菲亚教堂|heritage","Wudalianchi|五大连池|nature","China Snow Town|中国雪乡|village","Beiji Village, Mohe|漠河北极村|village","Yabuli|亚布力|nature","Jingpo Lake|镜泊湖|nature","Central Street, Harbin|哈尔滨中央大街|city","Zhalong Wetland|扎龙湿地|nature"]),
  jilin: parse(["Changbai Mountain|长白山|nature","Jilin Rime Island|吉林雾凇岛|nature","Yanji Food Streets|延吉美食街区|food","Chagan Lake|查干湖|village","Koguryo Sites, Ji'an|集安高句丽遗址|heritage","Changchun Film Studio|长春电影制片厂|heritage","Puppet Emperor's Palace|伪满皇宫博物院|heritage","Songhua Lake|松花湖|nature","Fangchuan Border Village|防川边境村|village"]),
  liaoning: parse(["Shenyang Imperial Palace|沈阳故宫|heritage","Dalian Coastal Road|大连滨海路|coast","Panjin Red Beach|盘锦红海滩|nature","Benxi Water Cave|本溪水洞|nature","Lushun Historic District|旅顺历史街区|heritage","Qianshan Mountain|千山|nature","Dandong Yalu River|丹东鸭绿江|city","Xingcheng Ancient Town|兴城古城|heritage","Jinzhou Barbecue|锦州烧烤|food"]),
  beijing: parse(["Forbidden City|故宫|heritage","Mutianyu Great Wall|慕田峪长城|heritage","Temple of Heaven|天坛|heritage","Summer Palace|颐和园|heritage","Hutong Family Kitchen|胡同家庭厨房|food","Lama Temple|雍和宫|spiritual","798 Art District|798艺术区|city","Panjiayuan Market|潘家园市场|market","Fragrant Hills|香山|nature"]),
  tianjin: parse(["Five Great Avenues|五大道|heritage","Ancient Culture Street|古文化街|market","Haihe River|海河|city","Italian Style Town|意式风情区|heritage","Porcelain House|瓷房子|heritage","Huangyaguan Great Wall|黄崖关长城|heritage","Yangliuqing New Year Prints|杨柳青年画工坊|craft","Tianjin Breakfast Walk|天津早点体验|food","National Maritime Museum|国家海洋博物馆|heritage"]),
  hebei: parse(["Chengde Mountain Resort|承德避暑山庄|heritage","Shanhaiguan|山海关|heritage","Baiyangdian|白洋淀|nature","Jinshanling Great Wall|金山岭长城|heritage","Xiangtangshan Grottoes|响堂山石窟|heritage","Zhengding Ancient City|正定古城|heritage","Yesanpo|野三坡|nature","Cangyan Mountain|苍岩山|nature","Nuanquan Ancient Town|暖泉古镇|village"]),
  shanxi: parse(["Pingyao Ancient City|平遥古城|heritage","Yungang Grottoes|云冈石窟|heritage","Hanging Temple|悬空寺|heritage","Mount Wutai|五台山|spiritual","Qiao Family Compound|乔家大院|heritage","Yingxian Wooden Pagoda|应县木塔|heritage","Hukou Waterfall|壶口瀑布山西段|nature","Mianshan Mountain|绵山|nature","Datong Noodle Workshop|大同面食体验|food"]),
  shaanxi: parse(["Terracotta Army|兵马俑|heritage","Xi'an City Wall|西安城墙|heritage","Muslim Quarter|回民街及周边老巷|food","Shaanxi History Museum|陕西历史博物馆|heritage","Mount Hua|华山|nature","Famen Temple|法门寺|spiritual","Hukou Waterfall|壶口瀑布陕西段|nature","Hanyangling Museum|汉阳陵博物馆|heritage","Yuanjia Village|袁家村|village"]),
  shandong: parse(["Mount Tai|泰山|nature","Qufu Confucius Sites|曲阜三孔|heritage","Qingdao Old Town|青岛老城|city","Penglai Pavilion|蓬莱阁|heritage","Baotu Spring|趵突泉|nature","Laoshan Mountain|崂山|nature","Weifang Kite Workshop|潍坊风筝工坊|craft","Zhoucun Ancient Town|周村古商城|heritage","Yantai Coast and Wineries|烟台海岸与酒庄|coast"]),
  henan: parse(["Longmen Grottoes|龙门石窟|heritage","Shaolin Temple|少林寺|spiritual","Kaifeng Old City|开封古城|heritage","Yinxu, Anyang|安阳殷墟|heritage","Luoyang Old Town|洛阳老城|city","Guoliang Village|郭亮村|village","Yuntai Mountain|云台山|nature","Henan Museum|河南博物院|heritage","Kaifeng Night Market|开封夜市|food"]),
  jiangsu: parse(["Suzhou Classical Gardens|苏州古典园林|heritage","Nanjing City Wall|南京城墙|heritage","Zhouzhuang Water Town|周庄古镇|village","Grand Canal, Yangzhou|扬州大运河|heritage","Suzhou Embroidery Studio|苏绣工坊|craft","Yixing Pottery Workshop|宜兴紫砂工坊|craft","Ming Xiaoling Mausoleum|明孝陵|heritage","Tongli Water Town|同里古镇|village","Huaiyang Cuisine Kitchen|淮扬菜体验|food"]),
  shanghai: parse(["The Bund|外滩|heritage","Former French Concession|原法租界街区|city","Shanghai Museum|上海博物馆|heritage","Yuyuan Garden|豫园|heritage","Longhua Temple|龙华寺|spiritual","Zhujiajiao Water Town|朱家角古镇|village","West Bund Art District|西岸艺术区|city","Caoyang Community Market|曹杨社区市场|market","Shanghai Breakfast Walk|上海早餐漫步|food"]),
  anhui: parse(["Hongcun|宏村|village","Huangshan|黄山|nature","Xidi|西递|village","Chengkan Village|呈坎|village","Jiuhua Mountain|九华山|spiritual","Tunxi Old Street|屯溪老街|market","Shexian Ancient City|歙县古城|heritage","Xuanzhi Paper Workshop|宣纸制作工坊|craft","Huizhou Family Kitchen|徽州家庭厨房|food"]),
  hubei: parse(["Yellow Crane Tower|黄鹤楼|heritage","Wudang Mountains|武当山|spiritual","Three Gorges|长江三峡|nature","Hubei Provincial Museum|湖北省博物馆|heritage","East Lake, Wuhan|武汉东湖|nature","Enshi Grand Canyon|恩施大峡谷|nature","Shennongjia|神农架|nature","Tujia Village, Enshi|恩施土家村寨|village","Wuhan Breakfast Walk|武汉过早体验|food"]),
  sichuan: parse(["Chengdu Teahouse|成都老茶馆|city","Jiuzhaigou|九寨沟|nature","Mount Emei|峨眉山|spiritual","Giant Panda Base|大熊猫繁育研究基地|nature","Leshan Giant Buddha|乐山大佛|heritage","Dujiangyan|都江堰|heritage","Danba Tibetan Villages|丹巴藏寨|village","Sanxingdui Museum|三星堆博物馆|heritage","Sichuan Family Kitchen|川味家庭厨房|food"]),
  chongqing: parse(["Hongya Cave|洪崖洞|city","Wulong Karst|武隆喀斯特|nature","Yangtze Cableway|长江索道|city","Dazu Rock Carvings|大足石刻|heritage","Ciqikou Ancient Town|磁器口古镇|heritage","Three Gorges Museum|三峡博物馆|heritage","Liziba and Mountain City Walk|李子坝与山城步道|city","Youyang Taohuayuan|酉阳桃花源|nature","Chongqing Hotpot Kitchen|重庆火锅体验|food"]),
  zhejiang: parse(["West Lake|西湖|heritage","Longjing Village|龙井村|tea","Wuzhen|乌镇|village","Lingyin Temple|灵隐寺|spiritual","Nanxun Ancient Town|南浔古镇|village","Putuo Mountain|普陀山|spiritual","Moganshan|莫干山|nature","Shanglin Lake Celadon Site|上林湖越窑遗址|craft","Shaoxing Rice Wine Workshop|绍兴黄酒体验|food"]),
  jiangxi: parse(["Jingdezhen|景德镇|craft","Wuyuan Villages|婺源村落|village","Mount Lushan|庐山|nature","Sanqing Mountain|三清山|nature","Tengwang Pavilion|滕王阁|heritage","Longhu Mountain|龙虎山|spiritual","Yaoli Ancient Town|瑶里古镇|village","Jinggangshan|井冈山|heritage","Porcelain Market and Studio|陶瓷市场与工坊|market"]),
  hunan: parse(["Zhangjiajie|张家界|nature","Fenghuang Ancient Town|凤凰古城|heritage","Changsha Night Food|长沙夜食体验|food","Yuelu Academy|岳麓书院|heritage","Furong Town|芙蓉镇|village","Shaoshan|韶山|heritage","Dongting Lake|洞庭湖|nature","Dehang Miao Village|德夯苗寨|village","Hunan Embroidery Studio|湘绣工坊|craft"]),
  fujian: parse(["Fujian Tulou|福建土楼|village","Wuyi Mountains|武夷山|tea","Quanzhou Old City|泉州古城|heritage","Gulangyu|鼓浪屿|heritage","Xiapu Mudflats|霞浦滩涂|coast","Taimu Mountain|太姥山|nature","Anxi Tea Villages|安溪茶村|tea","Meizhou Island|湄洲岛|spiritual","Quanzhou Puppet Workshop|泉州木偶工坊|craft"]),
  guizhou: parse(["Huangguoshu Waterfall|黄果树瀑布|nature","Xijiang Miao Village|西江千户苗寨|village","Libo Karst|荔波喀斯特|nature","Zhaoxing Dong Village|肇兴侗寨|village","Qingyan Ancient Town|青岩古镇|heritage","Fanjing Mountain|梵净山|nature","Kaili Ethnic Museum|凯里民族博物馆|heritage","Miao Embroidery Workshop|苗绣工坊|craft","Maotai Town|茅台镇|food"]),
  yunnan: parse(["Dali Old Town and Erhai|大理古城与洱海|heritage","Lijiang Old Town|丽江古城|heritage","Shangri-La|香格里拉|nature","Yuanyang Rice Terraces|元阳梯田|village","Jingmai Mountain Tea Forest|景迈山古茶林|tea","Stone Forest|石林|nature","Shaxi Ancient Town|沙溪古镇|village","Pudacuo|普达措|nature","Kunming Zhuanxin Market|昆明篆新市场|market"]),
  guangxi: parse(["Li River|漓江|nature","Longji Rice Terraces|龙脊梯田|village","Detian Waterfall|德天瀑布|nature","Yangshuo Countryside|阳朔乡村|village","Weizhou Island|涠洲岛|coast","Chengyang Wind and Rain Bridge|程阳风雨桥|heritage","Huangyao Ancient Town|黄姚古镇|village","Mingshi Countryside|明仕田园|nature","Liuzhou Snail Noodle Kitchen|柳州螺蛳粉体验|food"]),
  guangdong: parse(["Guangzhou Old City|广州老城|city","Kaiping Diaolou|开平碉楼|heritage","Chaozhou Old City|潮州古城|heritage","Danxia Mountain|丹霞山|nature","Foshan Ancestral Temple|佛山祖庙|heritage","Shiwan Ceramic Studio|石湾陶艺工坊|craft","Nan'ao Island|南澳岛|coast","Liwan Food Market|荔湾街坊市场|market","Cantonese Family Kitchen|广府家庭厨房|food"]),
  "hong-kong": parse(["Victoria Peak|太平山顶|city","Lantau Island|大屿山|nature","Temple Street|庙街|market","Star Ferry and Victoria Harbour|天星小轮与维多利亚港|city","Sai Kung Geopark|西贡地质公园|nature","Tai O Fishing Village|大澳渔村|village","Man Mo Temple|文武庙|spiritual","Central Heritage Walk|中环历史漫步|heritage","Sham Shui Po Food Walk|深水埗美食漫步|food"]),
  macau: parse(["Historic Centre of Macau|澳门历史城区|heritage","Ruins of St. Paul's|大三巴牌坊|heritage","Taipa Village|氹仔村|village","A-Ma Temple|妈阁庙|spiritual","Coloane Village|路环村|village","Mandarin's House|郑家大屋|heritage","Guia Fortress|东望洋炮台|heritage","Red Market|红街市|market","Macanese Food Workshop|澳门土生菜体验|food"]),
  hainan: parse(["Sanya Coast|三亚海岸|coast","Wuzhishan Rainforest|五指山雨林|nature","Bo'ao|博鳌|coast","Wenchang Coconut Villages|文昌椰林村落|village","Haikou Qilou Old Street|海口骑楼老街|heritage","Dongpo Academy|东坡书院|heritage","Yalong Bay Tropical Forest|亚龙湾热带森林|nature","Tanmen Fishing Port|潭门渔港|village","Hainan Family Kitchen|海南家庭厨房|food"]),
};

const copy = {
  en: {
    heritage:["Heritage and History Walk","Explore architecture, objects and stories that reveal the site's historical importance."], nature:["Landscape and Nature Day","Experience the defining scenery with a route adapted to season, weather and walking ability."], food:["Local Food Experience","Taste representative local flavors and understand the ingredients and customs behind them."], village:["Village Life Experience","Walk through a living community and learn how landscape, homes and traditions shape daily life."], craft:["Traditional Craft Workshop","Meet local makers, understand the process and try a guided hands-on activity where available."], spiritual:["Sacred Culture Visit","Visit respectfully with context on belief, architecture and living religious practice."], city:["Local City Walk","Read the city through its streets, neighborhoods, architecture and everyday routines."], road:["Private Scenic Route","Travel by private vehicle with flexible stops at key landscapes and cultural sites."], market:["Local Market Walk","Meet vendors and discover regional ingredients, crafts and daily shopping culture."], tea:["Tea Landscape Experience","Walk tea country, meet growers and learn how local craft and landscape shape the cup."], coast:["Coastal Life Journey","Explore coastal scenery, harbor communities and the food culture shaped by the sea."]
  },
  "zh-CN": {
    heritage:["历史文化深度游","通过建筑、遗存与当地故事，理解这处地点的重要历史背景。"], nature:["自然景观体验","根据季节、天气与体力设计路线，深入体验当地最具代表性的自然风景。"], food:["地方饮食体验","品尝具有代表性的当地味道，并了解食材、做法与饮食习俗。"], village:["村落生活体验","走进仍在生活的社区，了解景观、民居与传统如何塑造当地日常。"], craft:["传统手工艺体验","拜访当地手艺人，了解制作流程，并在条件允许时参与简单的动手体验。"], spiritual:["宗教文化参访","以尊重的方式参访，并了解信仰、建筑与仍在延续的宗教生活。"], city:["本地城市漫步","从街道、社区、建筑与日常节奏中读懂这座城市。"], road:["私人风景公路体验","乘坐私人车辆灵活停靠，连接主要自然景观与文化地点。"], market:["本地市场体验","认识摊主，发现地方食材、手工艺与真实采购日常。"], tea:["茶山与茶文化体验","走进茶区、拜访茶农，了解风土与工艺如何共同塑造一杯茶。"], coast:["海岸生活体验","探索海岸风景、港口社区与由海洋塑造的地方饮食文化。"]
  }
} as const;

const localizedKind = {
  es: ["Experiencia local seleccionada","Una visita privada para comprender el paisaje, la cultura y la vida cotidiana del lugar, con contexto local y ritmo flexible."],
  pt: ["Experiência local selecionada","Uma visita privada para compreender a paisagem, a cultura e a vida cotidiana do local, com contexto local e ritmo flexível."],
  ar: ["تجربة محلية مختارة","زيارة خاصة لفهم طبيعة المكان وثقافته وحياته اليومية، مع سياق محلي وإيقاع مرن."]
} as const;

const traditionalMap: Record<string, string> = { "台":"臺","湾":"灣","龙":"龍","门":"門","东":"東","乡":"鄉","马":"馬","广":"廣","冈":"岡","长":"長","黄":"黃","兰":"蘭","宁":"寧","云":"雲","阳":"陽","丽":"麗","风":"風","桥":"橋","岛":"島","庙":"廟","宫":"宮","楼":"樓","阁":"閣","艺":"藝","画":"畫","场":"場","区":"區","县":"縣","旧":"舊","华":"華","历":"歷","体":"體","验":"驗","与":"與","览":"覽","观":"觀","传":"傳","统":"統","实":"實","处":"處","这":"這","为":"為","当":"當","节":"節","气":"氣","设":"設","线":"線","调":"調","并":"並","让":"讓","开":"開","还":"還","续":"續","觉":"覺","饮":"飲","间":"間","过":"過","进":"進","认":"認","识":"識","发":"發","现":"現","买":"買","卖":"賣","来":"來","简":"簡","参":"參","达":"達","类":"類","义":"義","业":"業","动":"動","应":"應","制":"製","习":"習","钟":"鐘","坛":"壇","墙":"牆","书":"書","馆":"館","织":"織","绣":"繡","沟":"溝","滩":"灘","盐":"鹽","峡":"峽","铁":"鐵","极":"極","兴":"興","滨":"濱","园":"園","镇":"鎮","赵":"趙","额":"額","齐":"齊","济":"濟","贝":"貝","宝":"寶","万":"萬","树":"樹","鱼":"魚","鲜":"鮮" };

function traditionalize(value: string) {
  return [...value].map((character) => traditionalMap[character] ?? character).join("");
}

export function recommendationSlug(item: ProvinceRecommendation) {
  return item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getProvinceRecommendations(provinceSlug: string) {
  return provinceRecommendations[provinceSlug] ?? [];
}

export function getProvinceRecommendation(provinceSlug: string, slug: string) {
  return getProvinceRecommendations(provinceSlug).find((item) => recommendationSlug(item) === slug);
}

export function getRecommendationCopy(lang: Lang, item: ProvinceRecommendation) {
  if (lang === "en") return { name: item.name, project: copy.en[item.kind][0], description: copy.en[item.kind][1] };
  if (lang === "zh-CN") return { name: item.nameZh, project: copy["zh-CN"][item.kind][0], description: copy["zh-CN"][item.kind][1] };
  if (lang === "zh-TW") return { name: traditionalize(item.nameZh), project: traditionalize(copy["zh-CN"][item.kind][0]), description: traditionalize(copy["zh-CN"][item.kind][1]) };
  const text = localizedKind[lang];
  return { name: item.name, project: text[0], description: text[1] };
}
