import type { Lang } from "@/components/LanguageProvider";

export type RecommendationKind = "heritage" | "nature" | "food" | "village" | "craft" | "spiritual" | "city" | "road" | "market" | "tea" | "coast";

export type ProvinceRecommendation = {
  name: string;
  nameZh: string;
  kind: RecommendationKind;
  focus: string;
  focusZh: string;
};

const spot = (name: string, nameZh: string, kind: RecommendationKind, focus: string, focusZh: string): ProvinceRecommendation => ({
  name,
  nameZh,
  kind,
  focus,
  focusZh
});

export const provinceRecommendations: Record<string, ProvinceRecommendation[]> = {
  xinjiang: [
    spot("Kashgar Old City","喀什古城","heritage","Uyghur lanes, workshops, tea houses and Silk Road bazaar life","维吾尔族街巷、手工作坊、茶馆和丝路巴扎生活"),
    spot("Tianshan Tianchi","天山天池","nature","an alpine lake below Bogda Peak with spruce forests and mountain views","博格达峰下的高山湖泊、云杉林和天山视野"),
    spot("Turpan Grape Valley","吐鲁番葡萄沟","village","oasis vineyards, grape drying houses, courtyards and karez irrigation culture","绿洲葡萄园、晾房、庭院和坎儿井灌溉文化"),
    spot("Nalati Grassland","那拉提草原","nature","Ili valley grassland scenery and Kazakh pastoral life","伊犁河谷草原风景和哈萨克牧区生活"),
    spot("Karakoram Highway","喀喇昆仑公路","road","Pamir plateau roads, snow peaks, Tajik villages and frontier landscapes","帕米尔高原公路、雪峰、塔吉克村落和边境地貌"),
    spot("Kanas Lake","喀纳斯湖","nature","Altai forests, glacier-fed lake water, Tuva villages and northern seasons","阿尔泰森林、冰川湖水、图瓦村落和北疆季节色彩"),
    spot("Hotan Bazaar","和田巴扎","market","jade, carpets, naan bread, spices and southern Xinjiang market routines","玉石、地毯、馕、香料和南疆市集日常"),
    spot("Kuqa Grand Canyon","库车大峡谷","nature","red sandstone canyon walls shaped by wind, water and dry southern Xinjiang light","风、水和南疆干旱光线塑造的红色砂岩峡谷"),
    spot("Yining Kazanqi","伊宁喀赞其","city","colorful homes, courtyards, food and multicultural Ili street life","彩色民居、庭院、饮食和伊犁多民族街区生活")
  ],
  tibet: [
    spot("Potala Palace","布达拉宫","heritage","palace architecture, Buddhist history and the political memory of old Lhasa","宫堡建筑、藏传佛教历史和拉萨政治记忆"),
    spot("Jokhang Temple","大昭寺","spiritual","pilgrimage etiquette, devotional circuits and Barkhor old-city life","朝圣礼仪、转经路线和八廓街旧城生活"),
    spot("Yamdrok Lake","羊卓雍措","nature","turquoise highland lake views set among pasture and mountain roads","牧场与山路之间的高原蓝色湖泊景观"),
    spot("Namtso Lake","纳木措","nature","vast sky, prayer flags, nomadic land and high-altitude lake scenery","天空、经幡、牧区和高海拔湖泊景象"),
    spot("Tashilhunpo Monastery","扎什伦布寺","spiritual","Gelugpa monastery halls, murals and Shigatse pilgrimage culture","格鲁派寺院殿堂、壁画和日喀则朝圣文化"),
    spot("Ganden Monastery","甘丹寺","spiritual","a major monastery above the valley with mountain views and monastic context","山谷上方的重要寺院、山地视野和僧院背景"),
    spot("Basum Lake","巴松措","nature","Nyingchi forests, lake scenery and the softer landscape of eastern Tibet","林芝森林湖泊和藏东更湿润柔和的景观"),
    spot("Yarlung Valley","雅砻河谷","heritage","early Tibetan civilization, river settlements and royal history","早期吐蕃文明、河谷聚落和王室历史"),
    spot("Lhasa Barkhor","拉萨八廓街","city","trade, faith and old-city walking around Jokhang Temple","围绕大昭寺展开的贸易、信仰和老城步行")
  ],
  qinghai: [
    spot("Qinghai Lake","青海湖","nature","China's largest inland saltwater lake with grassland and birdlife","中国最大内陆咸水湖、草原和候鸟景观"),
    spot("Chaka Salt Lake","茶卡盐湖","nature","salt-flat reflections, open plateau sky and salt-industry scenery","盐湖倒影、开阔高原天空和盐业景观"),
    spot("Kumbum Monastery","塔尔寺","spiritual","butter sculptures, murals, thangkas and Tibetan Buddhist courtyards","酥油花、壁画、唐卡和藏传佛教院落"),
    spot("Qilian Grassland","祁连草原","nature","alpine meadows below the Qilian Mountains with flowers and snow peaks","祁连山下的高山草甸、花海和雪峰"),
    spot("Dongguan Mosque","西宁东关清真大寺","spiritual","Hui Muslim architecture, prayer life and neighborhood food","回族清真寺建筑、礼拜生活和周边饮食"),
    spot("Guide Yellow River","贵德黄河","nature","clear Yellow River water, Danxia hills and plateau farming towns","清澈黄河水、丹霞山体和高原农镇"),
    spot("Hoh Xil View Route","可可西里观景路线","road","open plateau landscapes, distant wildlife and careful altitude pacing","开阔高原、远观野生动物和谨慎的海拔节奏"),
    spot("Tongren Thangka Studios","同仁唐卡工作室","craft","Regong art, mineral pigments, line work and Buddhist visual tradition","热贡艺术、矿物颜料、线描和佛教视觉传统"),
    spot("Menyuan Rapeseed Fields","门源油菜花田","nature","summer flower fields backed by Qilian Mountain scenery","祁连山背景下的夏季油菜花田")
  ],
  gansu: [
    spot("Mogao Caves","莫高窟","heritage","Dunhuang Buddhist murals, cave sculpture and Silk Road patronage","敦煌佛教壁画、洞窟造像和丝路供养传统"),
    spot("Jiayuguan Pass","嘉峪关","heritage","the western Ming Great Wall fortress at the Hexi Corridor edge","河西走廊西端的明代长城关城"),
    spot("Zhangye Danxia","张掖丹霞","nature","layered red landforms formed by uplift, erosion and northwest light","抬升、侵蚀和西北光线塑造的彩色丘陵"),
    spot("Maijishan Grottoes","麦积山石窟","heritage","cliffside Buddhist sculpture and cave art in Tianshui forests","天水林地山崖中的佛教造像和石窟艺术"),
    spot("Labrang Monastery","拉卜楞寺","spiritual","Xiahe monastery corridors and Amdo Tibetan cultural context","夏河寺院转经长廊和安多藏区文化"),
    spot("Mingsha Mountain and Crescent Spring","鸣沙山月牙泉","nature","Dunhuang dunes, wind, oasis water and desert sunset light","敦煌沙丘、风、绿洲泉水和沙漠日落"),
    spot("Bingling Temple Grottoes","炳灵寺石窟","heritage","Yellow River canyon grottoes linking Buddhist art and river landscape","黄河峡谷中的佛教石窟和河流景观"),
    spot("Dunhuang Night Market","敦煌夜市","food","northwest noodles, grilled foods, dried fruit and Silk Road market atmosphere","西北面食、烧烤、干果和丝路夜市气氛"),
    spot("Hexi Corridor Road","河西走廊公路","road","oasis towns, Great Wall ruins, caves and desert scenery on one private route","绿洲城镇、长城遗址、石窟和荒漠景观串联路线")
  ],
  "inner-mongolia": [
    spot("Hulunbuir Grassland","呼伦贝尔草原","nature","summer grassland, wetlands, rivers and Mongolian pastoral culture","夏季草原、湿地、河流和蒙古族牧区生活"),
    spot("Kubuqi Desert","库布齐沙漠","nature","dunes near the Yellow River bend and sand-control ecology","黄河几字弯附近的沙丘和治沙生态"),
    spot("Hohhot Old City","呼和浩特旧城","city","Dazhao Temple, old streets, dairy foods and Mongolian-Hui culture","大召寺、旧街区、奶食和蒙回文化"),
    spot("Xilamuren Grassland","希拉穆仁草原","village","grassland near Hohhot with attention to seasonality and pastoral context","呼和浩特周边草原的季节性和牧区背景"),
    spot("Arxan National Forest","阿尔山国家森林公园","nature","volcanic landforms, forests, lakes and hot-spring country","火山地貌、森林、湖泊和温泉地带"),
    spot("Genghis Khan Mausoleum","成吉思汗陵","heritage","ceremonial memory, Mongolian ritual and steppe identity","蒙古族历史记忆、祭祀礼仪和草原身份"),
    spot("Erguna Wetland","额尔古纳湿地","nature","river wetlands, birch forests and northern borderland scenery","河流湿地、白桦林和北方边境地貌"),
    spot("Manzhouli","满洲里","city","China-Russia trade, railway history and mixed border architecture","中俄贸易、铁路历史和边境建筑风格"),
    spot("Wudangzhao Monastery","五当召","spiritual","Tibetan Buddhist monastery culture in Baotou and Inner Mongolia","包头地区藏传佛教寺院文化")
  ],
  ningxia: [
    spot("Shapotou","沙坡头","nature","where the Yellow River meets Tengger Desert dunes","黄河与腾格里沙漠交汇的沙丘和河流景观"),
    spot("Western Xia Tombs","西夏陵","heritage","Tangut royal tombs below the Helan Mountains","贺兰山下的党项西夏王陵遗址"),
    spot("Helan Mountain Rock Art","贺兰山岩画","heritage","ancient carvings of hunting, ritual and steppe-edge life","记录狩猎、祭祀和农牧交界生活的古代岩画"),
    spot("Zhenbeibao Western Studios","镇北堡西部影城","heritage","northwest ruins transformed into Chinese cinema memory","西北堡寨废墟与中国电影记忆"),
    spot("Qingtongxia 108 Stupas","青铜峡一百零八塔","spiritual","Buddhist stupa forms beside the Yellow River","黄河岸边的佛塔群形制和宁夏历史通道"),
    spot("Yellow River Grand Canyon","黄河大峡谷","nature","canyon river scenery in arid northern landscapes","干旱北方地貌中的黄河峡谷景观"),
    spot("Ningxia Winery Route","宁夏酒庄路线","road","Helan Mountain wineries, vineyard villages and desert light","贺兰山东麓酒庄、葡萄园村落和沙漠光线"),
    spot("Shuidonggou","水洞沟","heritage","Paleolithic sites and frontier defensive remains","旧石器遗址和边塞防御遗存"),
    spot("Wuzhong Morning Tea","吴忠早茶","food","Hui morning tea culture with beef, noodles and local breakfast rhythm","牛肉、面点、茶和回族早茶节奏")
  ],
  heilongjiang: [
    spot("Harbin Ice and Snow World","哈尔滨冰雪大世界","nature","large winter ice architecture, night lighting and northern festival atmosphere","大型冰雪建筑、夜间灯光和北方冬季节庆"),
    spot("Saint Sophia Cathedral","圣索菲亚教堂","heritage","Russian-influenced architecture and Harbin urban history","俄式建筑遗产和哈尔滨城市历史"),
    spot("Central Street Harbin","哈尔滨中央大街","city","stone-paved streets, old shops and northeastern city life","石板街、老商店和东北城市生活"),
    spot("Wudalianchi","五大连池","nature","volcanic lakes, lava landscapes and mineral-spring culture","火山湖、熔岩地貌和矿泉文化"),
    spot("Beiji Village Mohe","漠河北极村","village","China's far-north village life, winter light and borderland climate","中国北端村落生活、冬季光线和边境气候"),
    spot("Zhalong Wetland","扎龙湿地","nature","reed wetlands and red-crowned crane habitat","芦苇湿地和丹顶鹤栖息地"),
    spot("Yabuli Ski Area","亚布力滑雪区","nature","Heilongjiang winter sports and snow-covered mountain terrain","黑龙江冬季运动和雪山地形"),
    spot("Volga Manor","伏尔加庄园","heritage","Russian-style wooden buildings and Harbin cultural memory","俄式木建筑和哈尔滨文化记忆"),
    spot("Daqing Petroleum Memory","大庆石油记忆","city","industrial history, worker culture and northeast modernization","工业历史、工人文化和东北现代化记忆")
  ],
  jilin: [
    spot("Changbai Mountain","长白山","nature","volcanic Tianchi lake, alpine forests and border mountain scenery","火山天池、高山森林和边境山地景观"),
    spot("Jilin Rime Island","吉林雾凇岛","nature","winter rime on riverside trees along the Songhua River","松花江畔树木上的冬季雾凇"),
    spot("Yanji Food Streets","延吉饮食街区","food","Korean-Chinese noodles, barbecue, markets and cafe culture","朝鲜族冷面、烤肉、市场和咖啡街区"),
    spot("Koguryo Heritage Ji'an","集安高句丽遗址","heritage","ancient tombs, fortress remains and northeast frontier history","古墓、山城遗址和东北边疆历史"),
    spot("Chagan Lake Winter Fishing","查干湖冬捕","village","winter lake fishing customs and seasonal northeast community life","冬季湖面捕鱼习俗和东北季节生活"),
    spot("Changchun Puppet Palace","长春伪满皇宫","heritage","modern northeast history and Manchukuo political memory","近代东北历史和伪满政治记忆"),
    spot("Songhua Lake","松花湖","nature","forested reservoir scenery and Jilin outdoor routes","森林水库景观和吉林户外路线"),
    spot("Jingyuetan Forest","净月潭森林","nature","urban forest, lake trails and Changchun leisure life","城市森林、湖畔步道和长春休闲生活"),
    spot("Hunchun Border View","珲春边境眺望","road","Tumen River border geography and multi-country frontier context","图们江边境地理和多国交界背景")
  ],
  liaoning: [
    spot("Shenyang Imperial Palace","沈阳故宫","heritage","early Qing palace architecture and Manchu political history","清初宫殿建筑和满族政治历史"),
    spot("Zhang Family Mansion","张氏帅府","heritage","Republican-era northeast politics and courtyard architecture","民国东北政治和大院建筑"),
    spot("Dalian Binhai Road","大连滨海路","coast","coastal cliffs, sea views and urban seaside culture","海岸山崖、海景和城市滨海生活"),
    spot("Panjin Red Beach","盘锦红海滩","nature","seasonal seepweed wetlands and Liaohe delta ecology","季节性碱蓬湿地和辽河三角洲生态"),
    spot("Benxi Water Cave","本溪水洞","nature","karst cave river scenery in eastern Liaoning","辽东喀斯特地下河洞穴景观"),
    spot("Dandong Yalu River","丹东鸭绿江","city","border river views and modern northeast frontier memory","边境江景和东北近现代边疆记忆"),
    spot("Xingcheng Ancient City","兴城古城","heritage","Ming coastal defense walls and old-city life","明代海防城墙和古城生活"),
    spot("Liaoyang White Pagoda","辽阳白塔","spiritual","Liao-Jin Buddhist pagoda and old regional center","辽金佛塔和辽阳古城中心"),
    spot("Jinzhou Guta Night Food","锦州古塔夜食","food","barbecue, local snacks and northeastern evening street life","烧烤、小吃和东北夜间街头生活")
  ],
  beijing: [
    spot("Forbidden City","故宫","heritage","imperial axis, palace hierarchy and Ming-Qing court life","皇城中轴线、宫殿等级和明清宫廷生活"),
    spot("Mutianyu Great Wall","慕田峪长城","heritage","mountain ridges, watchtowers and Great Wall defense history","山脊、敌楼和长城防御历史"),
    spot("Temple of Heaven","天坛","heritage","ritual architecture and morning neighborhood activity","祭天建筑和清晨本地生活"),
    spot("Hutong Family Visit","胡同家庭拜访","village","courtyard homes, alley life and local family routines","四合院、胡同街巷和本地家庭日常"),
    spot("Summer Palace","颐和园","heritage","imperial gardens, Kunming Lake and Qing leisure culture","皇家园林、昆明湖和清代休闲文化"),
    spot("Lama Temple","雍和宫","spiritual","Tibetan Buddhist practice inside Beijing's imperial-city context","北京皇城背景中的藏传佛教空间"),
    spot("798 Art District","798艺术区","city","factory buildings, contemporary art and urban reuse","工厂建筑、当代艺术和城市更新"),
    spot("Panjiayuan Market","潘家园市场","market","antiques, folk objects and weekend market culture","古玩、民间物件和周末市场文化"),
    spot("Beijing Breakfast Walk","北京早点漫步","food","soy milk, jianbing, baozi and neighborhood morning rhythm","豆浆、煎饼、包子和社区早晨节奏")
  ],
  tianjin: [
    spot("Five Great Avenues","五大道","heritage","treaty-port villas, street trees and layered urban history","租界别墅、街树和多层城市历史"),
    spot("Ancient Culture Street","古文化街","market","folk crafts, snacks, old shops and Tianjin temple fair atmosphere","民间工艺、小吃、老字号和天津庙会气氛"),
    spot("Haihe River Night Walk","海河夜游","city","bridges, riverfront lights and modern Tianjin skyline","桥梁、河岸灯光和天津现代天际线"),
    spot("Porcelain House","瓷房子","heritage","decorative porcelain reuse and eccentric urban architecture","瓷片装饰再利用和城市奇观建筑"),
    spot("Tianjin Eye Area","天津之眼周边","city","riverside leisure, bridges and local evening walks","河岸休闲、桥梁和本地夜间散步"),
    spot("Yangliuqing New Year Painting","杨柳青年画","craft","woodblock printing, folk imagery and New Year customs","木版套印、民间图像和年俗"),
    spot("Italian Style Area","意式风情区","heritage","European streets adapted into Tianjin leisure districts","欧式街区在天津城市生活中的再利用"),
    spot("Tianjin Snack Trail","天津小吃路线","food","goubuli buns, mahua, jianbing and northern breakfast habits","狗不理、麻花、煎饼和北方早点习惯"),
    spot("Dule Temple Jizhou","蓟州独乐寺","spiritual","ancient timber architecture and Buddhist sculpture outside the city","城外古代木构建筑和佛教造像")
  ],
  hebei: [
    spot("Chengde Mountain Resort","承德避暑山庄","heritage","Qing imperial gardens and frontier political symbolism","清代皇家园林和边疆政治象征"),
    spot("Shanhaiguan Pass","山海关","heritage","Great Wall gateway where mountains meet the sea","山海之间的长城关口"),
    spot("Baiyangdian Wetland","白洋淀","nature","reed lakes, boats and North China wetland villages","芦苇湖泊、船行体验和华北水乡村落"),
    spot("Mulan Weichang","木兰围场","nature","grassland, forest and Qing imperial hunting landscape","草原、森林和清代皇家围猎景观"),
    spot("Zhaozhou Bridge","赵州桥","heritage","ancient stone arch engineering and Sui dynasty craftsmanship","古代石拱桥工程和隋代工艺"),
    spot("Zhengding Ancient City","正定古城","heritage","temples, pagodas and northern old-city layout","寺庙、古塔和北方古城格局"),
    spot("Xibaipo","西柏坡","heritage","modern revolutionary history in a Taihang foothill village","太行山前村落中的近现代革命历史"),
    spot("Beidaihe Coast","北戴河海滨","coast","seaside villas, beaches and summer resort history","海滨别墅、沙滩和避暑传统"),
    spot("Cangzhou Martial Arts","沧州武术文化","craft","northern martial arts lineages and folk training culture","北方武术传承和民间训练文化")
  ],
  shanxi: [
    spot("Pingyao Ancient City","平遥古城","heritage","Ming-Qing merchant streets, city walls and banking history","明清商帮街巷、城墙和票号历史"),
    spot("Yungang Grottoes","云冈石窟","heritage","Northern Wei Buddhist sculpture and cave architecture","北魏佛教造像和石窟建筑"),
    spot("Hanging Temple","悬空寺","spiritual","a cliff-built temple combining Buddhist, Daoist and Confucian elements","融合佛道儒元素的悬崖寺庙"),
    spot("Wutai Mountain","五台山","spiritual","major Buddhist pilgrimage mountain and monastery culture","重要佛教朝圣名山和寺院文化"),
    spot("Qiao Family Courtyard","乔家大院","heritage","Jin merchant family architecture and courtyard order","晋商家族建筑和大院秩序"),
    spot("Hukou Waterfall Shanxi Side","壶口瀑布山西侧","nature","Yellow River power where water narrows through a rocky gorge","黄河在峡谷收束处形成的奔腾水势"),
    spot("Datong Ancient City","大同古城","city","frontier capital history, walls and northern food","边地都城历史、城墙和北方饮食"),
    spot("Fenyang Fenjiu Culture","汾阳汾酒文化","food","sorghum spirit heritage and Shanxi table customs","高粱酒传统和山西宴席习俗"),
    spot("Mianshan","绵山","nature","cliff paths, temples and Jie Zitui cultural memory","悬崖栈道、寺庙和介子推文化记忆")
  ],
  shaanxi: [
    spot("Terracotta Army","秦始皇兵马俑","heritage","Qin imperial power, burial archaeology and ancient military formation","秦代帝国力量、陵墓考古和古代军阵"),
    spot("Xi'an City Wall","西安城墙","heritage","complete urban fortification and old-city views","完整古城防御体系和城内外视野"),
    spot("Muslim Quarter Xi'an","西安回民街","food","mosques, night food, breads, noodles and Hui community life","清真寺、夜食、面点和回族社区生活"),
    spot("Big Wild Goose Pagoda","大雁塔","spiritual","Tang Buddhist learning, pagoda architecture and Chang'an memory","唐代佛教译经、塔式建筑和长安记忆"),
    spot("Huaqing Palace","华清宫","heritage","Tang imperial hot springs and Lishan historical stories","唐代皇家温泉和骊山历史故事"),
    spot("Mount Hua","华山","nature","granite peaks, cliff paths and Daoist mountain culture","花岗岩山峰、险道和道教名山文化"),
    spot("Yan'an Cave Dwellings","延安窑洞","village","loess plateau homes and modern revolutionary history","黄土高原民居和近现代革命历史"),
    spot("Hanzhong Rapeseed Fields","汉中油菜花田","nature","spring fields, basin villages and Qinling scenery","春季田野、盆地村落和秦岭景观"),
    spot("Famen Temple","法门寺","spiritual","Buddhist relic culture and Tang-era religious memory","佛教舍利文化和唐代宗教记忆")
  ],
  shandong: [
    spot("Mount Tai","泰山","spiritual","sacred mountain pilgrimage, inscriptions and imperial ceremony","名山朝拜、摩崖题刻和帝王封禅传统"),
    spot("Qufu Confucius Sites","曲阜三孔","heritage","Confucius Temple, Mansion and Cemetery in their hometown context","孔庙、孔府、孔林与儒家故里背景"),
    spot("Qingdao Old Town","青岛老城","coast","red-roof architecture, coastlines and German-era urban memory","红瓦建筑、海岸线和德式城市记忆"),
    spot("Laoshan","崂山","nature","coastal mountains, Daoist temples and sea-facing trails","滨海山地、道教宫观和面海步道"),
    spot("Jinan Springs","济南泉水","city","spring pools, old lanes and everyday city life","泉池、老街巷和城市日常"),
    spot("Weifang Kite Culture","潍坊风筝文化","craft","kite making, folk images and spring festival traditions","风筝制作、民间图像和春季民俗"),
    spot("Yantai Penglai Pavilion","蓬莱阁","heritage","sea legends, coastal forts and northern maritime culture","海上仙山传说、海防遗存和北方海洋文化"),
    spot("Zibo Barbecue Streets","淄博烧烤街区","food","small grills, wheat wraps and local night dining habits","小炉烧烤、小饼卷食和本地夜间饮食"),
    spot("Rongcheng Swan Lake","荣成天鹅湖","nature","wintering swans and Jiaodong coastal wetlands","越冬天鹅和胶东海岸湿地")
  ],
  henan: [
    spot("Longmen Grottoes","龙门石窟","heritage","Buddhist cave art beside the Yi River in Luoyang","洛阳伊河两岸的佛教石窟艺术"),
    spot("Shaolin Temple","少林寺","spiritual","Chan Buddhism, martial heritage and Songshan mountain setting","禅宗、武术传统和嵩山山地环境"),
    spot("Kaifeng Old City","开封老城","city","Song dynasty memory, night markets and Yellow River plain life","宋代记忆、夜市和黄河平原城市生活"),
    spot("Luoyang Peony Season","洛阳牡丹季","nature","spring flowers, old capital gardens and seasonal city culture","春季花事、古都园林和季节城市文化"),
    spot("Yinxu Anyang","安阳殷墟","heritage","oracle bones, Shang archaeology and early Chinese state history","甲骨文、商代考古和早期国家历史"),
    spot("Guoliang Village","郭亮村","village","cliff road, Taihang stone houses and mountain village resilience","挂壁公路、太行石屋和山村生活"),
    spot("Chenjiagou Taiji Village","陈家沟太极村","craft","Taijiquan lineage, village training and local martial culture","太极拳传承、村落训练和地方武术文化"),
    spot("Zhengzhou Museum and Market","郑州博物馆与市集","city","central plains history connected with modern city food streets","中原历史与现代城市饮食街区"),
    spot("Yellow River Scenic Area Zhengzhou","郑州黄河风景区","nature","river terraces, loess landscape and Yellow River culture","河岸台地、黄土地貌和黄河文化")
  ],
  jiangsu: [
    spot("Suzhou Classical Gardens","苏州古典园林","heritage","garden design, rocks, water, windows and scholar aesthetics","园林布局、叠石理水、漏窗和文人审美"),
    spot("Nanjing City Wall","南京城墙","heritage","Ming capital fortifications and views across the old city","明代都城城防和老城视野"),
    spot("Zhouzhuang Water Town","周庄水乡","village","canals, stone bridges and Jiangnan water-town life","河道、石桥和江南水乡生活"),
    spot("Nanjing Confucius Temple Area","南京夫子庙秦淮河","city","Qinhuai riverfront lights, old shops and literary memory","秦淮河灯火、老店和文学记忆"),
    spot("Yangzhou Slender West Lake","扬州瘦西湖","heritage","garden lake scenery and salt-merchant culture","园林湖景和盐商文化"),
    spot("Suzhou Silk Embroidery","苏州丝绣工坊","craft","fine silk stitching, color gradation and Jiangnan handwork","丝线针法、色阶变化和江南手工艺"),
    spot("Yixing Zisha Teapot Studio","宜兴紫砂工作室","craft","purple clay teapots, kiln traditions and tea utensils","紫砂壶、窑火传统和茶器文化"),
    spot("Huaiyang Cuisine Kitchen","淮扬菜厨房","food","knife skills, clear flavors and refined Jiangsu cooking","刀工、清鲜味型和江苏精致烹饪"),
    spot("Grand Canal Suzhou Section","苏州运河段","road","canal transport history, old bridges and riverside neighborhoods","运河交通历史、古桥和河岸街区")
  ],
  shanghai: [
    spot("The Bund","外滩","heritage","historic waterfront banks, trade history and skyline contrast","历史金融建筑、口岸贸易和天际线对照"),
    spot("Former French Concession","原法租界","city","plane-tree streets, lane houses and neighborhood cafes","梧桐街道、里弄住宅和社区咖啡馆"),
    spot("Shanghai Museum","上海博物馆","heritage","Chinese bronzes, ceramics, painting and calligraphy collections","青铜器、陶瓷、书画和中国艺术收藏"),
    spot("Yu Garden and Old City","豫园与老城厢","heritage","classical garden details and old Shanghai commercial streets","古典园林细节和上海老城商业街区"),
    spot("Shikumen Lanes","石库门里弄","city","lane-house architecture and everyday neighborhood history","里弄建筑和普通社区历史"),
    spot("M50 Art District","M50艺术区","city","converted industrial spaces and contemporary studios","工业空间改造和当代艺术工作室"),
    spot("Caoyang Community Market","曹杨社区市场","market","fresh ingredients and residential shopping routines","新鲜食材和居民采购日常"),
    spot("Huangpu River Ferry","黄浦江轮渡","road","working river crossings and city views from the water","日常过江交通和水上城市视角"),
    spot("Shanghai Breakfast Trail","上海早点路线","food","shengjian, scallion noodles, rice rolls and morning street rhythm","生煎、葱油面、粢饭团和清晨街头节奏")
  ],
  anhui: [
    spot("Hongcun","宏村","village","Huizhou waterways, white walls and ancestral-hall village order","徽州水系、白墙黛瓦和宗族村落秩序"),
    spot("Huangshan","黄山","nature","granite peaks, pine trees, cloud seas and mountain walking routes","花岗岩峰林、松树、云海和山地步道"),
    spot("Xidi","西递","village","merchant residences, lanes and Huizhou family culture","徽商民居、街巷和徽州家族文化"),
    spot("Tunxi Old Street","屯溪老街","market","Huizhou shops, inkstones, tea and old trade atmosphere","徽州商铺、砚台、茶叶和老商贸气氛"),
    spot("Chengkan Village","呈坎古村","village","Huizhou fengshui layout, ancestral halls and pond systems","徽州风水格局、祠堂和水塘系统"),
    spot("Jiuhua Mountain","九华山","spiritual","Buddhist pilgrimage mountain and temple routes","佛教朝圣名山和寺院路线"),
    spot("Shexian Ancient City","歙县古城","heritage","Huizhou prefecture history, memorial archways and old lanes","徽州府历史、牌坊和古街巷"),
    spot("Xuancheng Xuan Paper Workshop","宣城宣纸工坊","craft","paper making, brushes, ink culture and scholar tools","造纸、毛笔、墨文化和文房用具"),
    spot("Taiping Lake","太平湖","nature","clear reservoir water and Huangshan foothill landscapes","清澈水库和黄山山麓景观")
  ],
  hubei: [
    spot("Yellow Crane Tower","黄鹤楼","heritage","Yangtze river views, poetry memory and Wuhan landmark culture","长江视野、诗词记忆和武汉地标文化"),
    spot("Wudang Mountains","武当山","spiritual","Daoist temples, mountain palaces and martial heritage","道教宫观、山地建筑和武当武术传统"),
    spot("Three Gorges Hubei Section","湖北三峡段","nature","Yangtze gorge scenery, cliffs and river towns","长江峡谷、峭壁和江边城镇"),
    spot("Wuhan Breakfast Streets","武汉过早街区","food","hot dry noodles, doupi, mianwo and morning food culture","热干面、豆皮、面窝和过早文化"),
    spot("East Lake Wuhan","武汉东湖","nature","urban lake shores, greenways and local leisure life","城市湖岸、绿道和本地休闲生活"),
    spot("Hubei Provincial Museum","湖北省博物馆","heritage","Chu culture, Marquis Yi bells and regional archaeology","楚文化、曾侯乙编钟和区域考古"),
    spot("Enshi Grand Canyon","恩施大峡谷","nature","karst cliffs, canyons and Tujia mountain scenery","喀斯特峭壁、峡谷和土家山地景观"),
    spot("Jingzhou Ancient City","荆州古城","heritage","city walls, Three Kingdoms memory and Yangtze plain history","城墙、三国记忆和长江平原历史"),
    spot("Shennongjia Forest","神农架森林","nature","primeval forest, mountain roads and central China biodiversity","原始森林、山地公路和华中生物多样性")
  ],
  sichuan: [
    spot("Chengdu Teahouses","成都茶馆","city","slow tea culture, mahjong, parks and everyday neighborhood life","慢茶馆、麻将、公园和社区日常"),
    spot("Chengdu Panda Base","成都大熊猫基地","nature","giant panda conservation and bamboo-forest viewing routes","大熊猫保护和竹林参观路线"),
    spot("Jiuzhaigou Valley","九寨沟","nature","colored alpine lakes, waterfalls and forested Tibetan valleys","彩色高山湖泊、瀑布和藏区森林山谷"),
    spot("Mount Emei","峨眉山","spiritual","Buddhist temples, mountain trails and sunrise viewpoints","佛教寺院、山路和日出观景点"),
    spot("Leshan Giant Buddha","乐山大佛","heritage","Tang dynasty river-cliff carving and Minjiang confluence","唐代临江造像和岷江汇流"),
    spot("Dujiangyan Irrigation System","都江堰","heritage","ancient water engineering and Chengdu Plain agriculture","古代水利工程和成都平原农业"),
    spot("Danba Tibetan Villages","丹巴藏寨","village","stone watchtowers, Tibetan homes and western Sichuan valleys","碉楼、藏式民居和川西山谷"),
    spot("Ya'an Mengding Tea Mountain","雅安蒙顶山","tea","early tea culture, humid hills and Sichuan tea traditions","早期茶文化、湿润山地和四川茶传统"),
    spot("Chengdu Market Cooking","成都市场与家常菜","food","wet markets, Sichuan seasonings and home-style cooking","菜市场、川味调料和家常烹饪")
  ],
  chongqing: [
    spot("Hongya Cave","洪崖洞","city","layered riverside architecture and night views of the mountain city","层叠江岸建筑和山城夜景"),
    spot("Wulong Karst","武隆喀斯特","nature","natural bridges, sinkholes and limestone valleys","天生桥、天坑和石灰岩山谷"),
    spot("Yangtze Cableway","长江索道","city","cross-river transport and vertical city views","过江交通和立体山城视角"),
    spot("Ciqikou Old Town","磁器口古镇","heritage","riverside lanes, old docks and Chongqing snacks","江边巷道、老码头和重庆小吃"),
    spot("Chongqing Hotpot Kitchen","重庆火锅厨房","food","mala broth, market ingredients and communal table culture","麻辣锅底、市场食材和围桌文化"),
    spot("Dazu Rock Carvings","大足石刻","heritage","Song dynasty Buddhist and Daoist cliff carvings","宋代佛道石刻和崖壁造像"),
    spot("Liziba Light Rail","李子坝轻轨","city","rail passing through dense hillside urban space","轻轨穿楼和高密度山城空间"),
    spot("Fengdu Ghost City","丰都鬼城","spiritual","folk afterlife beliefs and temple complexes by the Yangtze","民间阴间信仰和长江边庙宇群"),
    spot("Jiefangbei Night Walk","解放碑夜间漫步","city","commercial lights, street food and downtown Chongqing rhythm","商业灯光、街头饮食和重庆市中心节奏")
  ],
  zhejiang: [
    spot("West Lake","西湖","heritage","Hangzhou causeways, gardens, temples and poetry-shaped lake scenery","杭州堤岸、园林、寺院和诗画湖景"),
    spot("Longjing Village","龙井村","tea","tea fields, growers, pan-firing and Dragon Well tasting","茶园、茶农、炒制和龙井品鉴"),
    spot("Wuzhen Water Town","乌镇","village","canals, stone bridges and Jiangnan water-town architecture","河道、石桥和江南水乡建筑"),
    spot("Putuo Mountain","普陀山","spiritual","Guanyin pilgrimage island, temples and sea-facing paths","观音道场海岛、寺院和面海步道"),
    spot("Xitang Ancient Town","西塘古镇","village","covered corridors, canals and evening water-town life","廊棚、河道和夜间水乡生活"),
    spot("Shaoxing Old City","绍兴老城","heritage","canals, yellow rice wine, Lu Xun memory and bridges","河道、黄酒、鲁迅记忆和古桥"),
    spot("Ningbo Tianyi Pavilion","宁波天一阁","heritage","historic library culture and port-city scholarship","古代藏书楼文化和港口城市学术传统"),
    spot("Nanxun Ancient Town","南浔古镇","village","merchant mansions, canals and blended Chinese-Western details","商宅、河道和中西合璧细节"),
    spot("Zhoushan Fishing Coast","舟山渔港海岸","coast","island harbors, seafood and East China Sea fishing life","海岛港口、海鲜和东海渔业生活")
  ],
  jiangxi: [
    spot("Jingdezhen Porcelain Workshops","景德镇瓷器工坊","craft","kilns, clay, glazing and China's porcelain capital","窑火、泥料、釉色和中国瓷都工艺"),
    spot("Wuyuan Villages","婺源村落","village","white-walled villages, fields and seasonal countryside","白墙村落、田野和季节乡村"),
    spot("Mount Lushan","庐山","nature","mountain villas, waterfalls and cultural summer retreat history","山地别墅、瀑布和避暑文化历史"),
    spot("Tengwang Pavilion","滕王阁","heritage","riverfront literary landmark and Nanchang city memory","江岸文学地标和南昌城市记忆"),
    spot("Sanqing Mountain","三清山","nature","granite peaks, cloud views and Daoist mountain imagery","花岗岩峰林、云海和道教山水意象"),
    spot("Jinggangshan","井冈山","heritage","mountain revolutionary history and red-tourism landscape","山地革命历史和红色旅游景观"),
    spot("Poyang Lake","鄱阳湖","nature","China's largest freshwater lake and winter bird habitat","中国最大淡水湖和冬季候鸟栖息地"),
    spot("Ganzhou Old City Wall","赣州古城墙","heritage","Song dynasty walls, river junctions and Hakka routes","宋代城墙、江河交汇和客家路线"),
    spot("Lushan Cloud Tea","庐山云雾茶","tea","mountain tea fields, misty climate and Jiangxi tea tasting","山地茶园、云雾气候和江西茶品鉴")
  ],
  hunan: [
    spot("Zhangjiajie National Forest Park","张家界国家森林公园","nature","sandstone pillars, forest trails and dramatic canyon views","砂岩峰林、森林步道和峡谷视野"),
    spot("Fenghuang Ancient Town","凤凰古城","village","Tuo River stilt houses, Miao-Tujia culture and night lights","沱江吊脚楼、苗土文化和夜景"),
    spot("Changsha Night Food","长沙夜食","food","rice noodles, barbecue, spicy snacks and late-night street culture","米粉、烧烤、香辣小吃和深夜街头文化"),
    spot("Yuelu Academy","岳麓书院","heritage","classical education, Hunan scholarship and mountain campus paths","古代教育、湖湘学术和山地书院空间"),
    spot("Orange Isle","橘子洲","city","Xiang River island walks and Changsha urban views","湘江洲岛步行和长沙城市视野"),
    spot("Dehang Miao Village","德夯苗寨","village","Miao village life, mountain valleys and festival customs","苗寨生活、山谷地貌和节庆习俗"),
    spot("Dongjiang Lake","东江湖","nature","misty lake mornings and southern Hunan mountain water scenery","雾漫湖面和湘南山水景观"),
    spot("Shaoshan","韶山","heritage","modern Chinese history and rural Hunan setting","近现代中国历史和湖南乡村环境"),
    spot("Yueyang Tower","岳阳楼","heritage","Dongting Lake views and classical literary memory","洞庭湖视野和古典文学记忆")
  ],
  fujian: [
    spot("Fujian Tulou","福建土楼","village","Hakka communal earthen buildings and clan living systems","客家大型土楼和宗族居住系统"),
    spot("Wuyi Mountains","武夷山","tea","rock tea, Danxia cliffs and Nine Bend River scenery","岩茶、丹霞崖壁和九曲溪山水"),
    spot("Quanzhou Maritime Heritage","泉州海丝遗产","heritage","temples, mosques, trade history and Maritime Silk Road layers","寺庙、清真寺、贸易历史和海丝层次"),
    spot("Xiamen Gulangyu","厦门鼓浪屿","coast","island villas, music memory and treaty-port history","海岛别墅、音乐记忆和通商口岸历史"),
    spot("Fuzhou Three Lanes Seven Alleys","福州三坊七巷","heritage","scholar residences, lanes and Fujian urban culture","士人宅第、街巷和福建城市文化"),
    spot("Anxi Tea Villages","安溪茶村","tea","Tieguanyin tea gardens, processing and tasting etiquette","铁观音茶园、制茶和品饮礼仪"),
    spot("Meizhou Mazu Temple","湄洲妈祖祖庙","spiritual","Mazu sea worship and coastal Fujian belief culture","妈祖海神信仰和福建海岸民俗"),
    spot("Xiapu Mudflats","霞浦滩涂","coast","tidal flats, fishing frames and coastal light","潮汐滩涂、渔排和海岸光线"),
    spot("Quanzhou Puppet Workshop","泉州木偶工坊","craft","string puppetry, carving and Minnan performance tradition","提线木偶、雕刻和闽南表演传统")
  ],
  guizhou: [
    spot("Huangguoshu Waterfall","黄果树瀑布","nature","large waterfall system, karst cliffs and river mist","大型瀑布群、喀斯特崖壁和水雾"),
    spot("Xijiang Miao Village","西江千户苗寨","village","wooden houses, Miao customs and terraced mountain life","木楼、苗族习俗和梯田山地生活"),
    spot("Libo Xiaoqikong","荔波小七孔","nature","emerald rivers, forested limestone and bridges","碧绿河流、森林石灰岩和古桥"),
    spot("Zhaoxing Dong Village","肇兴侗寨","village","drum towers, wind-rain bridges and Dong singing culture","鼓楼、风雨桥和侗族大歌文化"),
    spot("Qingyan Ancient Town","青岩古镇","heritage","stone lanes, fortress history and Guizhou snacks","石板街巷、城防历史和贵州小吃"),
    spot("Fanjing Mountain","梵净山","nature","isolated peaks, Buddhist sites and biodiversity","孤峰、佛教遗迹和生物多样性"),
    spot("Kaili Market","凯里市集","market","minority textiles, sour soup ingredients and local trade","民族织物、酸汤食材和本地交易"),
    spot("Miao Embroidery Workshop","苗绣工坊","craft","embroidery symbols, silver ornaments and village handwork","苗绣纹样、银饰和村落手工艺"),
    spot("Maotai Town","茅台镇","food","sauce-aroma liquor, river-valley climate and brewing culture","酱香白酒、河谷气候和酿造文化")
  ],
  yunnan: [
    spot("Dali Old Town and Erhai","大理古城与洱海","village","Bai culture, lakeside villages and Cangshan-Erhai scenery","白族文化、湖畔村落和苍山洱海景观"),
    spot("Lijiang Old Town","丽江古城","heritage","Naxi canals, old lanes and Jade Dragon Snow Mountain setting","纳西水系、古巷和玉龙雪山背景"),
    spot("Shangri-La Dukezong","香格里拉独克宗","spiritual","Tibetan old-town life, prayer wheels and highland culture","藏式古城生活、转经筒和高原文化"),
    spot("Yuanyang Rice Terraces","元阳梯田","nature","Hani terraced fields, sunrise water mirrors and village agriculture","哈尼梯田、日出水面和村寨农耕"),
    spot("Jingmai Mountain Tea Forest","景迈山古茶林","tea","ancient tea forests, Bulang-Dai villages and tea ecology","古茶林、布朗傣族村寨和茶生态"),
    spot("Stone Forest Kunming","昆明石林","nature","karst stone formations and Yi cultural context","喀斯特石林地貌和彝族文化背景"),
    spot("Shaxi Ancient Town","沙溪古镇","village","Tea Horse Road market, temples and quiet Bai village life","茶马古道集市、寺庙和安静白族村落"),
    spot("Xishuangbanna Dai Villages","西双版纳傣族村寨","village","tropical villages, Buddhist temples and Dai food culture","热带村寨、南传佛教寺庙和傣味饮食"),
    spot("Kunming Zhuanxin Market","昆明篆新市场","market","Yunnan mushrooms, flowers, snacks and daily shopping culture","云南菌子、鲜花、小吃和日常采购文化")
  ],
  guangxi: [
    spot("Li River","漓江","nature","Guilin-Yangshuo karst peaks, river boats and ink-painting scenery","桂林阳朔喀斯特峰林、江船和山水画意"),
    spot("Longji Rice Terraces","龙脊梯田","nature","mountain terraces, Zhuang-Yao villages and seasonal field patterns","山地梯田、壮瑶村寨和季节田纹"),
    spot("Detian Waterfall","德天瀑布","nature","wide transnational waterfall on the China-Vietnam border","中越边境宽阔跨国瀑布"),
    spot("Yangshuo Countryside","阳朔乡村","village","karst villages, riverside roads and farm-table meals","喀斯特村落、河岸小路和农家餐"),
    spot("Chengyang Wind and Rain Bridge","程阳风雨桥","heritage","Dong wooden bridge architecture and village public space","侗族木桥建筑和村寨公共空间"),
    spot("Nanning Morning Market","南宁早市","market","subtropical produce, rice noodles and Zhuang everyday life","亚热带食材、米粉和壮乡日常"),
    spot("Beihai Old Street","北海老街","coast","arcaded trading streets and Gulf of Tonkin seafood culture","骑楼商贸街和北部湾海鲜文化"),
    spot("Bama Longevity Villages","巴马长寿村落","village","karst rivers, rural life and local wellness customs","喀斯特河流、乡村生活和地方养生习俗"),
    spot("Guilin Rice Noodle Trail","桂林米粉路线","food","rice noodles, brine, toppings and local breakfast rhythm","米粉、卤水、配菜和本地早餐节奏")
  ],
  guangdong: [
    spot("Guangzhou Old City","广州老城","city","arcades, clan halls, markets and Cantonese daily life","骑楼、祠堂、市场和广府日常"),
    spot("Kaiping Diaolou","开平碉楼","village","overseas Chinese village towers and hybrid architecture","侨乡碉楼和中西合璧村落建筑"),
    spot("Chaozhou Old Town","潮州古城","heritage","temples, old streets, gongfu tea and Teochew craft","寺庙、老街、工夫茶和潮州工艺"),
    spot("Liwan Food Market","荔湾食材市场","market","Cantonese ingredients, seafood, soups and neighborhood shopping","粤菜食材、海鲜、老火汤和社区采购"),
    spot("Chen Clan Ancestral Hall","陈家祠","heritage","Lingnan carving, clan culture and decorative architecture","岭南雕刻、宗族文化和装饰建筑"),
    spot("Foshan Ancestral Temple","佛山祖庙","spiritual","martial arts memory, Cantonese opera and temple culture","武术记忆、粤剧和庙宇文化"),
    spot("Shiwan Ceramic Studio","石湾陶艺工坊","craft","ceramic figures, kilns and Foshan folk craft","陶塑、窑火和佛山民间工艺"),
    spot("Xiqiao Mountain","西樵山","nature","Lingnan mountain scenery and Buddhist sites near Foshan","佛山附近岭南山水和佛教空间"),
    spot("Shenzhen Urban Villages","深圳城中村","city","rapid urbanization, migrant life and contemporary southern China","快速城市化、移民生活和当代南方中国")
  ],
  "hong-kong": [
    spot("Victoria Peak","太平山顶","city","harbor skyline, hillside roads and Hong Kong island geography","维港天际线、山坡道路和港岛地理"),
    spot("Lantau Island","大屿山","nature","villages, trails, beaches and the Tian Tan Buddha","村落、步道、海滩和天坛大佛"),
    spot("Temple Street Night Market","庙街夜市","market","street food, fortune tellers and Kowloon evening culture","街头小吃、算命摊和九龙夜间文化"),
    spot("Star Ferry","天星小轮","road","working harbor transport and classic skyline views","日常渡海交通和经典天际线视角"),
    spot("Tai O Fishing Village","大澳渔村","village","stilt houses, dried seafood and boat community memory","棚屋、海味和水上社区记忆"),
    spot("Man Mo Temple","文武庙","spiritual","incense, scholar-warrior worship and Sheung Wan old streets","香火、文武信仰和上环老街"),
    spot("Mong Kok Markets","旺角市场","market","dense street commerce, flowers, sneakers and local snacks","密集街头商业、花市、球鞋和本地小吃"),
    spot("Dragon Back Trail","龙脊步道","nature","coastal hiking, ridge views and urban-nature contrast","海岸徒步、山脊视野和城市自然对照"),
    spot("Central Mid-Levels Walk","中环半山步行","city","escalators, colonial streets and layered hillside neighborhoods","扶梯、殖民时期街道和半山社区层次")
  ],
  macau: [
    spot("Historic Centre of Macau","澳门历史城区","heritage","Chinese-Portuguese streets, squares, churches and temples","中葡街区、广场、教堂和庙宇"),
    spot("Ruins of St Pauls","大三巴牌坊","heritage","church facade, missionary history and Macau landmark memory","教堂立面、传教历史和澳门地标记忆"),
    spot("Taipa Village","氹仔旧城区","food","Macanese food, old lanes and Portuguese-Chinese neighborhood life","土生葡菜、老巷和中葡社区生活"),
    spot("A-Ma Temple","妈阁庙","spiritual","sea worship, incense culture and Macau harbor origins","海神信仰、香火文化和澳门港口起源"),
    spot("Senado Square","议事亭前地","city","Portuguese paving, civic architecture and old commercial streets","葡式地砖、市政建筑和老商业街"),
    spot("Coloane Village","路环村","village","quiet lanes, coastal chapels and fishing-village memory","安静街巷、海边教堂和渔村记忆"),
    spot("Red Market Macau","红街市","market","fresh produce, seafood and Macau residents' daily shopping","新鲜食材、海鲜和澳门居民日常采购"),
    spot("Guia Fortress","东望洋炮台","heritage","fortress, lighthouse and Macau maritime defense history","炮台、灯塔和澳门海防历史"),
    spot("Macanese Bakery Trail","澳门饼店路线","food","egg tarts, almond cookies and Macanese sweet traditions","蛋挞、杏仁饼和澳门甜点传统")
  ],
  hainan: [
    spot("Sanya Coast","三亚海岸","coast","tropical beaches, warm water and island resort scenery","热带海滩、温暖海水和岛屿度假景观"),
    spot("Wuzhishan Rainforest","五指山雨林","nature","central Hainan rainforest, humid valleys and Li cultural context","海南中部雨林、湿润山谷和黎族文化背景"),
    spot("Tanmen Fishing Port","潭门渔港","coast","working fishing boats, seafood routines and east-coast harbor life","渔船、海鲜处理和海南东海岸港口生活"),
    spot("Yalong Bay Tropical Forest","亚龙湾热带森林","nature","coastal hill forest, sea-view platforms and tropical vegetation","滨海山地森林、海景平台和热带植被"),
    spot("Boao Town","博鳌小镇","coast","river-sea meeting point, quiet streets and island conference-town history","河海交汇、安静街道和会议小镇历史"),
    spot("Haikou Qilou Old Street","海口骑楼老街","heritage","arcaded streets, overseas Chinese trade and Hainanese snacks","骑楼街、侨乡商贸和海南小吃"),
    spot("Dongpo Academy Danzhou","儋州东坡书院","heritage","Su Dongpo exile memory and Hainan literary history","苏东坡贬谪记忆和海南文学历史"),
    spot("Hainan Family Kitchen","海南家庭厨房","food","seafood, coconut, tropical vegetables and relaxed home dining","海鲜、椰子、热带蔬菜和家庭餐桌"),
    spot("Binglanggu Li and Miao Culture","槟榔谷黎苗文化","village","Li-Miao textile traditions, village forms and island ethnic culture","黎苗织锦、村寨形态和岛屿民族文化")
  ]
};

const kindCopy: Record<RecommendationKind, { en: string; zh: string }> = {
  heritage:{ en:"Heritage and history visit", zh:"历史文化游览" },
  nature:{ en:"Natural landscape experience", zh:"自然景观体验" },
  food:{ en:"Local food experience", zh:"地方饮食体验" },
  village:{ en:"Village and local life experience", zh:"村落与本地生活体验" },
  craft:{ en:"Traditional craft experience", zh:"传统手工艺体验" },
  spiritual:{ en:"Sacred culture visit", zh:"宗教与精神文化参访" },
  city:{ en:"Local city walk", zh:"本地城市漫步" },
  road:{ en:"Private scenic route", zh:"私人风景路线" },
  market:{ en:"Local market walk", zh:"本地市场体验" },
  tea:{ en:"Tea landscape experience", zh:"茶山与茶文化体验" },
  coast:{ en:"Coastal life journey", zh:"海岸生活体验" }
};

const localizedKind: Record<Exclude<Lang, "en" | "zh-CN" | "zh-TW">, { project: string; description: string }> = {
  es: { project: "Experiencia local seleccionada", description: "Una visita privada para comprender este lugar a traves de su paisaje, cultura y vida cotidiana." },
  pt: { project: "Experiencia local selecionada", description: "Uma visita privada para compreender este lugar por meio da paisagem, da cultura e da vida cotidiana." },
  ar: { project: "تجربة محلية مختارة", description: "زيارة خاصة لفهم هذا المكان من خلال المناظر والثقافة والحياة اليومية." }
};

const twMap: Record<string, string> = {};

function traditionalize(value: string) {
  return [...value].map((character) => twMap[character] ?? character).join("");
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
  const project = kindCopy[item.kind];
  if (lang === "en") return { name: item.name, project: project.en, description: `Explore ${item.focus} at ${item.name}.` };
  if (lang === "zh-CN") return { name: item.nameZh, project: project.zh, description: `${item.nameZh}适合体验${item.focusZh}。` };
  if (lang === "zh-TW") return { name: traditionalize(item.nameZh), project: traditionalize(project.zh), description: traditionalize(`${item.nameZh}适合体验${item.focusZh}。`) };
  const text = localizedKind[lang];
  return { name: item.name, project: text.project, description: text.description };
}
