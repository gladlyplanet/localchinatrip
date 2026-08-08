import type { Lang } from "@/components/LanguageProvider";
import { toTraditionalChinese } from "@/lib/chinese-text";
import type { CityId } from "@/lib/travel-planning-routes";

type EditorialText = { en: string; zh: string };

export type RouteEditorial = {
  daySpans: number[];
  summary: EditorialText;
  why: EditorialText;
};

const routeEditorial: Record<string, RouteEditorial> = {
  "beijing-3": {
    daySpans: [3],
    summary: {
      en: "Three city days link the Forbidden City and central axis with hutong neighborhoods, public parks and present-day Beijing, without squeezing in a distant day trip.",
      zh: "三天集中看北京城内：从故宫与中轴线进入皇家城市格局，再走胡同、社区公园和当代街区，不把有限时间消耗在远距离往返上。"
    },
    why: {
      en: "Day 1 follows the imperial center, day 2 slows down in hutongs and neighborhood life, and day 3 balances the Temple of Heaven or Summer Palace with a contemporary district.",
      zh: "第 1 天看故宫、中轴线与景山，第 2 天走胡同、社区和老北京饮食，第 3 天在天坛或颐和园与当代街区之间选择，三天各有清楚主题。"
    }
  },
  "chengdu-3": {
    daySpans: [3],
    summary: {
      en: "A slow Chengdu introduction built around an early panda visit, teahouse culture, neighborhood food and the relaxed street rhythm that defines the city.",
      zh: "这是一条慢节奏成都入门路线：清晨看大熊猫，白天在茶馆、老街和社区市场之间停留，晚上用川菜与小吃认识这座城市。"
    },
    why: {
      en: "The panda base is placed early, while the remaining time is kept flexible for People's Park, local markets, Sichuan food and an optional opera evening.",
      zh: "大熊猫基地安排在动物更活跃的清晨；人民公园茶馆、社区市场、川菜体验和川剧夜场分开放置，避免一天堆太多项目。"
    }
  },
  "shanghai-3": {
    daySpans: [3],
    summary: {
      en: "Three contrasting Shanghai days move from the Bund and old city to lilong lanes, neighborhood food and the contemporary riverfront.",
      zh: "三天用三个层次理解上海：外滩与老城的历史城市、里弄与社区饮食的日常生活，以及浦东或西岸的当代城市面貌。"
    },
    why: {
      en: "Each day stays within one part of the city, reducing cross-town travel and leaving evening time for the riverfront, food streets or a neighborhood walk.",
      zh: "每天集中在一个片区，减少跨城折返；外滩夜景、街区晚餐和沿江散步都保留机动时间，不把上海做成赶景点清单。"
    }
  },
  "xian-3": {
    daySpans: [3],
    summary: {
      en: "Xi'an is split between the walled city, the Terracotta Army and a final day for museums, temples and Shaanxi food traditions.",
      zh: "三天分别对应西安城墙内的城市生活、兵马俑与秦代历史，以及博物馆、寺塔和陕西面食，不把所有历史遗址挤在同一天。"
    },
    why: {
      en: "The Terracotta Army receives its own day, while the old city and museum day remain walkable and can be adjusted around ticket availability.",
      zh: "兵马俑单独占一天；城墙、清真寺与回坊安排在同一区域，博物馆和大雁塔则按预约时段调整，路线更顺也更容易执行。"
    }
  },
  "beijing-wall-5": {
    daySpans: [3, 2],
    summary: {
      en: "Five days combine Beijing's imperial center and hutong life with a full Great Wall outing and enough recovery time after the mountain walk.",
      zh: "五天把北京城内的故宫、中轴线、胡同与社区生活，同一次完整的长城山地体验连接起来，并为登城后的休息留出余量。"
    },
    why: {
      en: "Three city days establish the historical context; the Great Wall section is then chosen by fitness, weather and crowd preference rather than by a fixed package.",
      zh: "前三天先理解北京城市格局，长城则按体力、天气和人流选择慕田峪或更安静的段落；最后不安排高强度跨城移动。"
    }
  },
  "shanghai-suzhou-5": {
    daySpans: [2, 3],
    summary: {
      en: "A short high-speed-rail route contrasts Shanghai's port-city layers with Suzhou gardens, canals and living craft traditions.",
      zh: "用高铁连接上海与苏州：先看港口城市、里弄和现代街区，再把三天留给园林、运河街巷与苏作手艺。"
    },
    why: {
      en: "Two compact Shanghai days and three slower Suzhou days avoid repeated hotel changes and make room for a garden visit at a quieter hour.",
      zh: "上海两天集中游览，苏州连续住三天，避免当天往返；园林可安排在开门早段，并给运河老街、博物馆或手工作坊留出选择。"
    }
  },
  "chengdu-dujiangyan-5": {
    daySpans: [3, 2],
    summary: {
      en: "Chengdu's pandas, teahouses and food lead into Dujiangyan's working irrigation landscape and an optional Qingcheng Mountain day.",
      zh: "前三天认识成都的大熊猫、茶馆与饮食，后两天转入都江堰仍在运行的水利系统，并可按体力加入青城山。"
    },
    why: {
      en: "The short rail or private-car transfer keeps the route easy, while two nights near Dujiangyan allow the irrigation system to be seen beyond a rushed day trip.",
      zh: "成都到都江堰转场短，适合高铁或用车；当地住两晚后，鱼嘴、飞沙堰、宝瓶口和古城可以按水系顺序看，而不是匆忙打卡。"
    }
  },
  "guilin-yangshuo-5": {
    daySpans: [2, 3],
    summary: {
      en: "The route begins with Guilin's river city and then slows down among Yangshuo's karst peaks, Yulong River paths and working villages.",
      zh: "前两天看桂林的江城与喀斯特入口，后三天住进阳朔，把漓江或遇龙河、田野小路、村落与地方饮食连成一条慢路线。"
    },
    why: {
      en: "Yangshuo receives more time because weather, river conditions and countryside light matter; boat, cycling and walking options remain interchangeable.",
      zh: "阳朔多留一天，是为了按天气、水位和光线选择游船、骑行或步行；桂林到阳朔的转场本身也作为漓江景观的一部分。"
    }
  },
  "jiangnan-7": {
    daySpans: [2, 2, 3],
    summary: {
      en: "Seven days compare Shanghai's urban energy, Suzhou's garden-and-canal culture and Hangzhou's West Lake and tea landscapes by short rail transfers.",
      zh: "七天用短途高铁串联上海、苏州和杭州：从大都市街区，转入园林与运河，再以西湖、寺院和龙井茶山收尾。"
    },
    why: {
      en: "The route moves in one direction and gives Hangzhou the longest stay, so West Lake and a tea-village day are not compressed into a single visit.",
      zh: "路线由上海向西南单向移动，不走回头路；杭州留三天，西湖城市景观和龙井茶村可以分开体验，也能应对江南多雨天气。"
    }
  },
  "west-sichuan-7": {
    daySpans: [1, 1, 2, 3],
    summary: {
      en: "A private-road loop climbs from Chengdu and Dujiangyan to Danba villages and Mount Siguniang, combining long valley drives with slower mountain days.",
      zh: "这是一条需要用车的川西环线：成都出发，经都江堰进入丹巴藏寨，再到四姑娘山，长距离峡谷车程与高海拔慢游必须交替安排。"
    },
    why: {
      en: "Driving days are shown honestly, Danba receives a full village day, and Mount Siguniang is given time for altitude adjustment before a valley walk.",
      zh: "行程明确保留转场日：丹巴至少住两晚，四姑娘山先适应海拔再进双桥沟或长坪沟；雨雪、道路和身体反应都可能改变当天计划。"
    }
  },
  "yunnan-villages-7": {
    daySpans: [2, 2, 3],
    summary: {
      en: "Dali, Shaxi and Lijiang form a Tea Horse Road journey through Bai and Naxi towns, village lanes, markets and mountain scenery.",
      zh: "七天沿滇西北茶马古道脉络连接大理、沙溪与丽江，把白族和纳西族城镇、村落巷道、集市与山地景观放在同一条线上。"
    },
    why: {
      en: "Two nights in Shaxi prevent it becoming a roadside photo stop, while Lijiang time includes Baisha or nearby villages beyond the crowded old town center.",
      zh: "沙溪住两晚，才能看到寺登街之外的村落与周边；丽江三天不只逛大研古城，还应加入白沙、束河或近郊村落。"
    }
  },
  "hexi-7": {
    daySpans: [1, 2, 1, 3],
    summary: {
      en: "A fast but workable Hexi Corridor route follows rail west from Lanzhou to Zhangye, Jiayuguan and Dunhuang, ending with the Mogao Caves and desert landscape.",
      zh: "这是一条节奏较快但可执行的河西走廊线：从兰州乘铁路向西，经张掖、嘉峪关到敦煌，最后把莫高窟与沙漠景观分开安排。"
    },
    why: {
      en: "Lanzhou and Jiayuguan are concise stops; Zhangye gets a full landscape day and Dunhuang gets three days for reservations, desert light and departure logistics.",
      zh: "兰州和嘉峪关各作为一天停留，张掖完整看丹霞，敦煌保留三天，以适应莫高窟预约、鸣沙山光线和离境交通。"
    }
  },
  "guizhou-7": {
    daySpans: [3, 4],
    summary: {
      en: "Kaili and Zhaoxing anchor a slower Guizhou journey through Miao and Dong communities, wooden architecture, markets, rice fields and village walking routes.",
      zh: "以凯里和肇兴为两个住宿基地，慢慢进入苗族、侗族村寨的木构建筑、集市、稻田和步行路线，而不是每天更换一个表演型景区。"
    },
    why: {
      en: "The route uses Kaili for nearby village visits, then high-speed rail or private transfer to Congjiang for several nights around Zhaoxing and Tang'an.",
      zh: "凯里三天辐射周边村寨，之后经高铁或用车到从江，再住肇兴并安排堂安徒步；减少频繁搬运行李，也更容易避开团队高峰。"
    }
  },
  "northeast-winter-7": {
    daySpans: [4, 3],
    summary: {
      en: "Four winter days in Harbin combine historic streets, northeastern food and ice architecture before three days of snow and skiing around Yabuli.",
      zh: "先在哈尔滨住四天，看历史街区、东北饮食、冰雪建筑和城市冬季生活，再用三天前往亚布力体验滑雪与林海雪景。"
    },
    why: {
      en: "Ice attractions are weather-dependent and better separated from city walks; Yabuli includes transfer and recovery time instead of promising three full ski days.",
      zh: "冰雪项目受温度、开放时间影响，不与长距离城市步行硬挤在同一天；亚布力三天包含往返转场和体力恢复，不虚写成三整天滑雪。"
    }
  },
  "ili-7": {
    daySpans: [1, 2, 2, 2],
    summary: {
      en: "A seven-day private-road journey crosses the Ili Valley from Yining to Sayram Lake, Tekes and Nalati, with grassland scenery balanced against real driving time.",
      zh: "七天用车从伊宁出发，经赛里木湖、特克斯到那拉提，把湖泊、河谷、草原和哈萨克生活串联起来，同时如实计算长距离车程。"
    },
    why: {
      en: "The named bases make the route readable: one arrival day in Yining, two days each around Sayram, Tekes and Nalati, with seasonal road conditions shaping the final order.",
      zh: "路线明确到实际住宿点：伊宁 1 天，赛里木湖、特克斯和那拉提各 2 天；花期、降雪、景区区间车和公路情况会决定最终先后。"
    }
  },
  "central-7": {
    daySpans: [2, 2, 3],
    summary: {
      en: "Wuhan, Changsha and Jingdezhen create a seven-day city-food-craft route: Yangtze neighborhoods, Hunan flavors and a final deep dive into living porcelain culture.",
      zh: "七天把武汉的长江城市生活、长沙的湖南饮食与夜间街区、景德镇仍在生产中的陶瓷手艺连接起来，主题是城市、味道与手作。"
    },
    why: {
      en: "Two urban stops keep the first half energetic, then three nights in Jingdezhen allow time for museums, Taoxichuan or sculpture-factory markets and a working studio.",
      zh: "武汉、长沙各住两晚，之后给景德镇三晚，才能把陶瓷博物馆、陶溪川或雕塑瓷厂市集和真实工作室分开看，而不是只看一件瓷器。"
    }
  },
  "yunnan-10": {
    daySpans: [1, 2, 2, 2, 3],
    summary: {
      en: "Ten days climb gradually from Kunming through Dali, Shaxi and Lijiang to Shangri-La, following changing landscapes and cultures along the Tea Horse Road.",
      zh: "十天从昆明逐步升高，经大理、沙溪、丽江到香格里拉，沿茶马古道观察气候、地貌与民族文化的变化，避免突然直上高海拔。"
    },
    why: {
      en: "The northbound order supports gradual altitude gain; Shaxi receives two nights and Shangri-La three days for acclimatization, monastery visits and weather flexibility.",
      zh: "由南向北有利于逐步适应海拔；沙溪住两晚，香格里拉留三天，把适应、松赞林寺与周边自然分开，并预留天气变化空间。"
    }
  },
  "south-coast-10": {
    daySpans: [2, 1, 2, 2, 3],
    summary: {
      en: "A ten-day rail journey follows the South China coast from Guangzhou and Foshan to Chaozhou, Xiamen and Quanzhou through food, ancestral halls and maritime heritage.",
      zh: "十天沿华南海岸由广州、佛山向东到潮州、厦门和泉州，用高铁连接粤菜、宗祠街区、潮汕生活与海上丝路遗产。"
    },
    why: {
      en: "The route moves east without backtracking; Quanzhou receives three days because its temples, historic port landscape and neighborhoods are spread across several areas.",
      zh: "路线一路向东不折返；佛山作为广州近程延伸，潮州和厦门各两天，泉州留三天，因为寺庙、古港遗址和街区分布较散。"
    }
  },
  "qinghai-gansu-10": {
    daySpans: [2, 2, 2, 4],
    summary: {
      en: "From Xining and Qinghai Lake, the route descends into the Hexi Corridor at Zhangye and ends with four measured days around Dunhuang's caves and desert.",
      zh: "从西宁与青海湖的高原环境出发，经张掖进入河西走廊，最后在敦煌留四天，把洞窟、沙漠、交通和休息分开安排。"
    },
    why: {
      en: "Two nights near each plateau stop help manage altitude and road time; Dunhuang receives the longest stay because cave reservations and desert conditions require flexibility.",
      zh: "西宁与青海湖各两天，用于适应海拔和公路转场；敦煌停留最长，以应对莫高窟预约、炎热或风沙天气及较远的进出交通。"
    }
  },
  "classic-15": {
    daySpans: [4, 3, 4, 4],
    summary: {
      en: "A first-time China route links Beijing's imperial center, Xi'an's ancient capital, Chengdu's food and pandas, and Shanghai's layered modern city.",
      zh: "适合第一次来中国：北京看皇家城市与胡同，西安看古都与秦汉遗产，成都进入川菜、茶馆和熊猫生活，上海收束到现代都市。"
    },
    why: {
      en: "Four substantial bases and three major transfers keep the itinerary readable. High-speed rail works for Beijing-Xi'an; later legs can be chosen by time and budget.",
      zh: "全程只设四个主要住宿城市和三次跨区转场；北京到西安适合高铁，西安到成都可高铁，成都到上海则按时间与预算选择航班或铁路。"
    }
  },
  "history-north-15": {
    daySpans: [4, 2, 2, 3, 4],
    summary: {
      en: "Fifteen days move west in historical order from Beijing to Datong, Pingyao, Luoyang and Xi'an, comparing capitals, cave temples, walled towns and Buddhist art.",
      zh: "十五天由北京向西，经大同、平遥、洛阳到西安，依次看都城格局、石窟佛教、晋商古城与多朝古都，不再从西安折返洛阳。"
    },
    why: {
      en: "The corrected order removes backtracking. Datong and Pingyao are concise two-night stops, while Luoyang and Xi'an receive enough time for sites outside their city centers.",
      zh: "调整后的顺序消除了回头路；大同和平遥各两晚，洛阳三天用于龙门石窟与古都遗址，西安四天容纳兵马俑、城内历史和离境安排。"
    }
  },
  "food-coast-15": {
    daySpans: [3, 3, 3, 3, 3],
    summary: {
      en: "A slower food-led journey from Guangzhou and Foshan to Chaozhou, Xiamen and Quanzhou uses markets, family restaurants and craft neighborhoods to explain southern coastal culture.",
      zh: "这不是十日路线的加长版，而是一条慢速饮食线：广州、佛山、潮州、厦门和泉州各住三天，从市场、家庭餐馆、厨艺与手工街区理解华南。"
    },
    why: {
      en: "Three nights per base create space for morning markets, a cooking or producer visit, and one unhurried neighborhood day rather than repeating landmark sightseeing.",
      zh: "每个住宿点三晚，分别容纳早市与采购、一次厨艺或生产者拜访，以及一天街区与地方餐馆；重点是吃法和生活，不重复十日线的景点清单。"
    }
  },
  "grand-china-21": {
    daySpans: [4, 3, 4, 3, 4, 3],
    summary: {
      en: "Three weeks connect Beijing, Xi'an, Chengdu, Guilin, Shanghai and Hangzhou, balancing major landmarks with pandas, karst landscapes, food and local neighborhoods.",
      zh: "三周串联北京、西安、成都、桂林、上海和杭州，在代表性历史城市之间加入熊猫、川菜、喀斯特山水、江南街区和西湖生活。"
    },
    why: {
      en: "No city is reduced to a one-night stop. The route alternates history-heavy sections with slower food, nature and neighborhood days, using flights only where they save meaningful time.",
      zh: "没有城市只住一晚；历史密集段与饮食、自然和街区慢日交替安排，跨区距离较长时才用航班，上海到杭州则用短途高铁。"
    }
  },
  "silk-road-21": {
    daySpans: [3, 2, 2, 3, 2, 3, 6],
    summary: {
      en: "A 21-day Silk Road journey runs west from Xi'an through Lanzhou, Zhangye and Dunhuang, then crosses Xinjiang from Turpan and Urumqi to Kashgar.",
      zh: "二十一天从西安沿丝路向西，经兰州、张掖、敦煌进入新疆，再由吐鲁番、乌鲁木齐到喀什，观察绿洲、宗教、贸易与地貌的变化。"
    },
    why: {
      en: "Rail suits the eastern corridor; Xinjiang requires longer transfers and usually a flight to Kashgar. Six final days allow time for the old city, markets and an optional Pamir outing.",
      zh: "河西走廊段以铁路为主，新疆段距离更长，乌鲁木齐到喀什通常用航班；喀什留六天，才能兼顾古城、巴扎和可选的帕米尔高原用车日。"
    }
  }
};

const cityEditorial: Partial<Record<CityId, EditorialText>> = {
  beijing: { en: "Use the imperial central axis, hutong neighborhoods and public parks to compare historic and present-day Beijing.", zh: "围绕皇家中轴线、胡同社区和公共公园，比较历史北京与当代城市生活。" },
  greatWall: { en: "Choose the wall section by fitness and crowd level, then allow a full mountain day for walking, viewpoints and transfers.", zh: "按体力和人流选择长城段落，并为登城、山脊步行、观景和往返交通保留完整一天。" },
  chengdu: { en: "Plan pandas early, then connect teahouses, markets, Sichuan food and neighborhood streets at a slower pace.", zh: "清晨看大熊猫，之后用较慢节奏连接茶馆、市场、川菜和社区街巷。" },
  dujiangyan: { en: "Follow the irrigation system from its headworks through channels and old-town spaces, with Qingcheng Mountain as an optional second day.", zh: "按水利系统从鱼嘴到渠道和古城空间顺序游览，第二天可按体力选择青城山。" },
  shanghai: { en: "Compare the Bund and old city with lilong lanes, neighborhood food and the contemporary riverfront.", zh: "把外滩与老城、里弄生活、社区饮食和当代滨江空间放在一起比较。" },
  suzhou: { en: "Spread classical gardens, canals, the museum and Suzhou craft traditions across quieter morning and afternoon visits.", zh: "把古典园林、运河街巷、博物馆和苏作手艺分到较安静的早晚时段。" },
  hangzhou: { en: "Separate West Lake walking from a tea-village or temple day so weather and seasonal light can guide the order.", zh: "把西湖步行与茶村或寺院日分开，让天气和季节光线决定先后顺序。" },
  xian: { en: "Give the Terracotta Army its own day and keep the city wall, mosque, food streets and museum appointments in logical clusters.", zh: "兵马俑单独安排一天，城墙、清真寺、饮食街区和博物馆则按区域与预约组合。" },
  guangzhou: { en: "Read Guangzhou through old arcades, riverside districts, morning markets and the structure of Cantonese meals.", zh: "从骑楼老街、珠江沿岸、早市和粤菜用餐结构进入广州。" },
  foshan: { en: "Use ancestral halls, lion-dance traditions, ceramics and nearby Shunde food culture to give the stop a clear purpose.", zh: "以祖庙、醒狮、陶艺和顺德饮食为主线，让佛山停留具有清楚主题。" },
  guilin: { en: "Use Guilin as the river-city gateway, with karst viewpoints and a measured transition toward Yangshuo.", zh: "把桂林作为喀斯特江城入口，并把前往阳朔的转场本身纳入山水体验。" },
  yangshuo: { en: "Slow down for the Yulong River, village lanes, field paths and weather-dependent cycling, walking or boat time.", zh: "围绕遇龙河、村巷和田野小路慢游，骑行、步行或水上活动按天气调整。" },
  quanzhou: { en: "Connect temples, old port history, lane food and maritime trade across the historic center and nearby coastal sites.", zh: "连接寺庙、古港历史、巷弄饮食和海上贸易，并兼顾古城与近郊遗址。" },
  xiamen: { en: "Balance island architecture and waterfront walks with market food and the everyday neighborhoods beyond the headline sights.", zh: "在岛屿建筑、滨海步行和市场饮食之间平衡，并进入主要景点之外的日常社区。" },
  danba: { en: "Stay long enough to walk between stone towers, Tibetan villages and cultivated slopes rather than viewing them from the road.", zh: "至少留出一整天步行连接碉楼、藏寨和耕作山坡，而不是只在公路边拍照。" },
  siguniang: { en: "Allow altitude adjustment before choosing Shuangqiao or Changping Valley according to fitness and weather.", zh: "先适应海拔，再按体力和天气选择双桥沟或长坪沟，不同时堆叠两条高强度路线。" },
  dali: { en: "Look beyond the old town to Erhai villages, Bai architecture, markets and the working landscape around the lake.", zh: "不只停留大理古城，还要看洱海村落、白族建筑、集市和湖边生产生活。" },
  shaxi: { en: "Use two nights for Sideng market square, village lanes, nearby temples and the quieter Tea Horse Road landscape.", zh: "用两晚看寺登街、村落巷道、周边寺院和更安静的茶马古道环境。" },
  lijiang: { en: "Pair Lijiang Old Town with Baisha or Shuhe, Naxi culture and nearby mountain-and-village scenery.", zh: "把丽江古城与白沙或束河、纳西文化及近郊山村景观组合起来。" },
  kunming: { en: "Use Kunming as a gentle arrival day for markets, lakeside parks and Yunnan food before moving north.", zh: "把昆明作为温和的抵达日，用市场、湖边公园和云南饮食为北上行程做准备。" },
  shangrila: { en: "Build in altitude time before Songzanlin Monastery, old-town lanes and weather-dependent plateau landscapes.", zh: "先留出高原适应时间，再看松赞林寺、古城巷道和受天气影响的高原景观。" },
  lanzhou: { en: "Use the Yellow River, noodle culture and a concise city walk to introduce the northwest before continuing west.", zh: "用黄河城市空间、牛肉面文化和一段紧凑步行进入西北，再继续向西。" },
  zhangye: { en: "Reserve changing light for the Danxia landform and keep city or temple visits separate from the long landscape day.", zh: "为丹霞地貌保留合适光线，把城市或寺院参观与长时间自然景观日分开。" },
  jiayuguan: { en: "Treat the fortress as a Silk Road threshold, linking walls, desert-edge geography and corridor transport.", zh: "把嘉峪关城看作丝路关口，连接城墙、防御空间、戈壁地理和走廊交通。" },
  dunhuang: { en: "Separate Mogao Cave reservations from Mingsha Mountain, the night market and desert-edge sites.", zh: "把莫高窟预约日与鸣沙山、夜市和戈壁遗址分开，避免天气或票务打乱全程。" },
  kaili: { en: "Use Kaili as a base for carefully chosen Miao communities, markets and textile traditions rather than a performance checklist.", zh: "以凯里为基地选择合适的苗族村寨、集市和织染传统，不做表演项目清单。" },
  zhaoxing: { en: "Stay within the Dong village landscape for drum towers, wind-and-rain bridges, rice fields and the Tang'an walking route.", zh: "住进侗寨环境，看鼓楼、风雨桥、稻田，并用堂安步行线理解村落与地形。" },
  harbin: { en: "Separate historic streets and northeastern food from ice-and-snow attractions whose opening depends on winter conditions.", zh: "把历史街区与东北饮食同受气温影响的冰雪项目分开安排。" },
  yabuli: { en: "Include transfer, equipment and recovery time around skiing or snow activities instead of counting every day as a full slope day.", zh: "把转场、装备和体力恢复计入亚布力停留，不把每一天都写成完整滑雪日。" },
  yining: { en: "Use Yining for arrival, supplies, local food and an introduction to the Ili Valley before the long road journey.", zh: "在伊宁完成抵达、补给和地方饮食，并先理解伊犁河谷，再开始长距离用车。" },
  sayramLake: { en: "Allow a full circuit and changing lake light, with wind and seasonal road conditions shaping the exact stops.", zh: "为环湖与不同时段光线留足时间，具体停靠点按风力和季节道路情况调整。" },
  tekes: { en: "Base here for Kalajun grassland or nearby valleys, balancing long scenic drives with town and local-life time.", zh: "以特克斯为基地前往喀拉峻或周边河谷，并在长途观景车程之外保留城镇生活时间。" },
  ili: { en: "Treat Ili as a region, not a single stop, and name the actual overnight bases before confirming the route.", zh: "伊犁是一个区域而非单一景点，确认路线前必须写清实际住宿地。" },
  nalati: { en: "Use two days for different grassland sectors and local roads, adjusting for shuttle systems, weather and seasonal crowds.", zh: "用两天分开看不同草原区域和地方公路，并按区间车、天气与季节客流调整。" },
  wuhan: { en: "Connect the Yangtze riverfront, historic concessions, breakfast culture and ordinary neighborhoods on both sides of the river.", zh: "连接长江两岸、历史街区、过早饮食和普通社区，呈现武汉真实城市尺度。" },
  changsha: { en: "Balance Hunan food and evening street life with Yuelu Mountain, the Xiang River and a slower daytime neighborhood route.", zh: "把湘菜与夜间街区同岳麓山、湘江和白天的社区步行平衡起来。" },
  jingdezhen: { en: "Move from ceramic history to working studios, Taoxichuan or sculpture-factory markets and hands-on making.", zh: "从陶瓷历史进入真实工作室、陶溪川或雕塑瓷厂市集，并加入可理解工序的手作体验。" },
  xining: { en: "Use Xining for altitude adjustment, plateau food and a measured start before driving toward Qinghai Lake.", zh: "在西宁适应海拔、认识高原饮食，再以较缓节奏前往青海湖。" },
  qinghaiLake: { en: "Plan lake stops around distance, wind, altitude and seasonal landscape rather than promising one fixed viewpoint.", zh: "按距离、风力、海拔和季节景观规划环湖停靠，不承诺单一固定观景点。" },
  chaozhou: { en: "Use ancestral halls, old lanes, tea culture and Teochew food to understand a living regional culture.", zh: "用宗祠、老巷、工夫茶和潮州饮食理解仍在延续的地方文化。" },
  datong: { en: "Give the Yungang Grottoes and historic city separate time, with optional temple visits chosen by distance.", zh: "云冈石窟与古城分开安排，悬空寺或周边寺院则按距离和体力选择。" },
  pingyao: { en: "Walk the walls, banks, courtyards and lanes as one preserved commercial city rather than isolated ticketed sights.", zh: "把城墙、票号、院落和巷道看作一座完整的晋商城市，而非分散收费景点。" },
  luoyang: { en: "Separate the Longmen Grottoes from the old capital's museums and city remains, leaving time for cross-city travel.", zh: "龙门石窟单独安排，博物馆与古都遗址另设一天，并计入跨城交通。" },
  turpan: { en: "Plan oasis villages, ancient cities and vineyard landscapes around heat, distance and early or late light.", zh: "围绕高温、距离和早晚光线安排绿洲村落、古城遗址与葡萄园景观。" },
  urumqi: { en: "Use Urumqi as a transport and museum base, not as a substitute for the wider landscapes of Xinjiang.", zh: "把乌鲁木齐作为交通与博物馆基地，不用城市停留替代新疆更广阔的地貌。" },
  kashgar: { en: "Leave several days for the old city, livestock or neighborhood markets, local food and an optional Pamir road journey.", zh: "为喀什古城、牲畜或社区巴扎、地方饮食和可选的帕米尔用车路线保留数天。" }
};

const routeLogistics: Record<string, EditorialText> = {
  "beijing-3": {
    en: "Arrive and depart through Beijing Capital or Daxing Airport. Because the two airports serve different sides of the city, keep the first and last half-days light until the flight and hotel are confirmed.",
    zh: "可经首都机场或大兴机场进出北京。两座机场位于城市不同方向，应在确认航班和酒店后再安排接送，抵达日与离开日前后半天不放跨城区景点。"
  },
  "chengdu-3": {
    en: "Confirm whether the flight uses Tianfu or Shuangliu Airport before fixing the first and last day. Tianfu is much farther from central Chengdu, so the panda base should never be placed directly after a late arrival.",
    zh: "先确认航班使用天府机场还是双流机场，再确定首末两天安排。天府机场距市中心更远，晚到航班后的第二天不宜直接赶大熊猫基地。"
  },
  "shanghai-3": {
    en: "Pudong Airport suits most international arrivals, while Hongqiao combines an airport with the main high-speed-rail hub. Choose the hotel and final-day district around the actual arrival and onward station.",
    zh: "多数国际航班经浦东机场，虹桥则把机场与主要高铁枢纽连在一起。酒店区域和最后一天活动应按实际进出机场或车站确定，避免横穿全城。"
  },
  "xian-3": {
    en: "Use Xi'an Xianyang Airport or Xi'an North railway station for arrival and departure. The Terracotta Army lies outside the city, so reserve it for a full middle day rather than an arrival or departure day.",
    zh: "可经西安咸阳机场或西安北站进出。兵马俑位于市区以外，应放在完整的中间一天，不与抵达或离开行程硬拼。"
  },
  "beijing-wall-5": {
    en: "Treat the Great Wall as a full-day return journey from Beijing by private car. Stay in Beijing on the final night unless a carefully chosen wall-side hotel and next-day transfer have already been confirmed.",
    zh: "长城按北京出发、当天往返的完整用车日安排。除非已经确认长城附近住宿与次日接送，否则最后一晚仍住北京，方便机场或高铁离开。"
  },
  "shanghai-suzhou-5": {
    en: "Arrive in Shanghai, then take a short high-speed train to Suzhou after the city stay. Depart from Suzhou North for an onward rail journey, or return to Hongqiao when the next flight or train is from Shanghai.",
    zh: "先抵达上海，完成市区停留后乘短途高铁到苏州。后续坐高铁可从苏州北站离开；若航班或下一程从上海出发，则预留时间返回虹桥。"
  },
  "chengdu-dujiangyan-5": {
    en: "Enter through Chengdu, then reach Dujiangyan by intercity rail or private car. Return to Chengdu on the final afternoon for a flight or train, or add a Chengdu night when departure is early.",
    zh: "经成都进入，之后乘城际铁路或用车前往都江堰。最后一天下午返回成都衔接航班或高铁；若次日早班出发，建议在成都增加一晚。"
  },
  "guilin-yangshuo-5": {
    en: "Arrive through Guilin, then continue to Yangshuo by Li River cruise or road transfer. For departure, allow roughly two hours back to Guilin airport or rail station, or use Yangshuo station only after checking its out-of-town transfer.",
    zh: "经桂林抵达，再乘漓江游船或用车前往阳朔。离开时预留约两小时返回桂林机场或车站；也可使用阳朔站，但要另算从县城到站的接驳时间。"
  },
  "jiangnan-7": {
    en: "Arrive in Shanghai and travel one way by high-speed rail through Suzhou to Hangzhou. Depart from Hangzhou Xiaoshan Airport or Hangzhou East station, avoiding an unnecessary return to Shanghai unless the international flight requires it.",
    zh: "经上海抵达后乘高铁单向前往苏州、杭州。可从杭州萧山机场或杭州东站离开；只有国际航班必须从上海出发时，才安排返回上海。"
  },
  "west-sichuan-7": {
    en: "This is a private-car mountain loop from Chengdu through Dujiangyan and Danba to Mount Siguniang. The final mountain day must include the four-to-five-hour return to Chengdu, or be followed by an extra Chengdu night before departure.",
    zh: "这是从成都出发，经都江堰、丹巴到四姑娘山的川西用车环线。最后一个山地日必须计入约四至五小时返回成都的车程，或在离开前额外增加一晚成都住宿。"
  },
  "yunnan-villages-7": {
    en: "Enter through Dali airport or railway station and travel north by private car through Shaxi to Lijiang. Depart from Lijiang airport or railway station, so the route does not need to backtrack to Dali.",
    zh: "经大理机场或车站进入，之后用车经沙溪向北到丽江。最后从丽江机场或车站离开，不需要折返回大理。"
  },
  "hexi-7": {
    en: "Arrive in Lanzhou and continue west by rail through Zhangye and Jiayuguan. Finish in Dunhuang and depart from Dunhuang airport or railway station rather than reversing the entire Hexi Corridor.",
    zh: "经兰州抵达后沿铁路向西，依次前往张掖、嘉峪关。行程在敦煌结束，可从敦煌机场或车站离开，不必沿河西走廊原路折返。"
  },
  "guizhou-7": {
    en: "Enter by Guiyang or Kaili South railway station and use Kaili as the first base. Continue to Zhaoxing through Congjiang, then depart from Congjiang high-speed-rail station instead of returning to Kaili.",
    zh: "可经贵阳或凯里南站进入，以凯里为首个基地。之后经从江前往肇兴，结束时从从江高铁站离开，不再折返回凯里。"
  },
  "northeast-winter-7": {
    en: "Arrive in Harbin, then travel to Yabuli by rail or private car. Unless the onward train from Yabuli West is practical, return to Harbin before the departure flight and leave a weather buffer in winter.",
    zh: "先抵达哈尔滨，再乘铁路或用车前往亚布力。除非亚布力西站能直接衔接下一程，否则应在航班前返回哈尔滨，并为冬季天气预留缓冲时间。"
  },
  "ili-7": {
    en: "Fly or take the train into Yining, then complete the valley route by private car. From Nalati, use Nalati Airport only when a suitable seasonal flight operates; otherwise allow a long road return to Yining.",
    zh: "乘航班或铁路抵达伊宁后，全程以用车完成河谷路线。结束于那拉提时，只有航季与班次合适才从那拉提机场离开，否则必须预留较长车程返回伊宁。"
  },
  "central-7": {
    en: "Arrive in Wuhan and continue by high-speed rail to Changsha and Jingdezhen. Depart from Jingdezhen airport or railway station, or connect through Nanchang or Hangzhou when the onward timetable is better.",
    zh: "经武汉抵达后乘高铁前往长沙、景德镇。结束时可从景德镇机场或车站离开；若班次更合适，也可经南昌或杭州衔接下一程。"
  },
  "yunnan-10": {
    en: "Enter through Kunming and travel north through Dali, Shaxi and Lijiang. Depart from Shangri-La airport when schedules work, or return by road to Lijiang for a wider choice of flights and trains.",
    zh: "经昆明进入，向北串联大理、沙溪、丽江。结束后可按班次从香格里拉机场离开；若选择较少，则用车返回丽江衔接更多航班或铁路。"
  },
  "south-coast-10": {
    en: "Enter through Guangzhou and move east by rail through Foshan, Chaozhou and Xiamen to Quanzhou. Depart from Quanzhou Jinjiang Airport, Xiamen Airport or a nearby high-speed-rail station according to the onward schedule.",
    zh: "经广州进入，沿铁路向东串联佛山、潮州、厦门和泉州。结束后按班次从泉州晋江机场、厦门机场或附近高铁站离开，不走回头路。"
  },
  "qinghai-gansu-10": {
    en: "Arrive in Xining, use a private car around Qinghai Lake, then connect by rail through Zhangye to Dunhuang. Finish at Dunhuang airport or railway station instead of returning across the plateau.",
    zh: "经西宁抵达，青海湖段使用当地用车，之后乘铁路经张掖前往敦煌。行程在敦煌机场或车站结束，不再横穿高原返回西宁。"
  },
  "classic-15": {
    en: "Use an open-jaw international plan: arrive in Beijing and depart from Shanghai. High-speed rail links Beijing, Xi'an and Chengdu; a flight from Chengdu to Shanghai saves a full travel day.",
    zh: "建议采用异地进出：北京入境、上海离境。北京—西安—成都使用高铁，成都到上海乘航班可节省一整天跨区移动时间。"
  },
  "history-north-15": {
    en: "Arrive in Beijing and move west by rail through Datong, Pingyao and Luoyang. Depart from Xi'an airport or railway station, keeping the entire historical route one-way with no backtracking.",
    zh: "经北京抵达后沿铁路向西，依次前往大同、平遥、洛阳。最后从西安机场或车站离开，整条历史路线单向推进，不走回头路。"
  },
  "food-coast-15": {
    en: "Enter through Guangzhou and continue east by rail to Foshan, Chaozhou, Xiamen and Quanzhou. Choose Quanzhou Jinjiang or Xiamen Airport for departure according to the international or domestic connection.",
    zh: "经广州进入，之后沿铁路向东前往佛山、潮州、厦门和泉州。离开时按国内或国际衔接选择泉州晋江机场或厦门机场。"
  },
  "grand-china-21": {
    en: "Use Beijing as the entry point and Hangzhou or Shanghai as the exit. Rail handles Beijing-Xi'an-Chengdu, flights save time on the southwest legs, and the final Hangzhou stop connects easily back to Shanghai if required.",
    zh: "建议北京入境，杭州或上海离境。北京—西安—成都以铁路为主，西南跨区段用航班节省时间；杭州结束后如有需要也能方便返回上海。"
  },
  "silk-road-21": {
    en: "Enter through Xi'an and travel west by rail across the Hexi Corridor, then use longer rail or air links across Xinjiang. Finish in Kashgar and fly out via Urumqi or another mainland hub rather than returning overland.",
    zh: "经西安进入，沿铁路向西穿过河西走廊，再以长途铁路或航班连接新疆各站。行程在喀什结束，经乌鲁木齐或其他内地枢纽转机离开，不再陆路折返。"
  }
};

export function getRouteEditorial(routeId: string) {
  return routeEditorial[routeId];
}

export function getEditorialText(text: EditorialText, lang: Lang) {
  if (lang === "zh-TW") return toTraditionalChinese(text.zh);
  return lang === "zh-CN" ? text.zh : text.en;
}

export function getCityEditorial(city: CityId, lang: Lang) {
  const text = cityEditorial[city];
  return text ? getEditorialText(text, lang) : null;
}

export function getRouteLogistics(routeId: string, lang: Lang) {
  const text = routeLogistics[routeId];
  return text ? getEditorialText(text, lang) : null;
}

export type TransferMode =
  | "rail"
  | "privateCar"
  | "railOrCar"
  | "boatOrCar"
  | "railAndCar"
  | "carAndRail"
  | "flight"
  | "flightOrRail"
  | "overnightRailOrFlight";

const routeTransfers: Record<string, TransferMode[]> = {
  "beijing-3": [],
  "chengdu-3": [],
  "shanghai-3": [],
  "xian-3": [],
  "beijing-wall-5": ["privateCar"],
  "shanghai-suzhou-5": ["rail"],
  "chengdu-dujiangyan-5": ["railOrCar"],
  "guilin-yangshuo-5": ["boatOrCar"],
  "jiangnan-7": ["rail", "rail"],
  "west-sichuan-7": ["railOrCar", "privateCar", "privateCar"],
  "yunnan-villages-7": ["privateCar", "privateCar"],
  "hexi-7": ["rail", "rail", "railOrCar"],
  "guizhou-7": ["railAndCar"],
  "northeast-winter-7": ["railOrCar"],
  "ili-7": ["privateCar", "privateCar", "privateCar"],
  "central-7": ["rail", "rail"],
  "yunnan-10": ["rail", "privateCar", "privateCar", "rail"],
  "south-coast-10": ["railOrCar", "rail", "rail", "rail"],
  "qinghai-gansu-10": ["privateCar", "carAndRail", "rail"],
  "classic-15": ["rail", "rail", "flight"],
  "history-north-15": ["rail", "rail", "rail", "rail"],
  "food-coast-15": ["railOrCar", "rail", "rail", "rail"],
  "grand-china-21": ["rail", "rail", "flightOrRail", "flight", "rail"],
  "silk-road-21": ["rail", "rail", "railOrCar", "overnightRailOrFlight", "rail", "flightOrRail"]
};

export function getRouteTransfers(routeId: string) {
  return routeTransfers[routeId] ?? [];
}
