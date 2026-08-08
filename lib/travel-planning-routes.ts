import type { Lang } from "@/components/LanguageProvider";
import { toTraditionalChinese } from "@/lib/chinese-text";

export type FilterMode = "duration" | "region" | "interest";
export type Region = "north" | "east" | "south" | "central" | "southwest" | "northwest" | "northeast";
export type Interest = "history" | "food" | "nature" | "village" | "craft" | "city" | "firstTrip";
export type Season = "allYear" | "springAutumn" | "summerAutumn" | "winter";
export type Pace = "easy" | "balanced" | "active";

export const cityNames = {
  beijing: ["Beijing", "北京", "بكين"],
  greatWall: ["Great Wall", "长城", "سور الصين العظيم"],
  chengdu: ["Chengdu", "成都", "تشنغدو"],
  dujiangyan: ["Dujiangyan", "都江堰", "دوجيانغيان"],
  shanghai: ["Shanghai", "上海", "شنغهاي"],
  suzhou: ["Suzhou", "苏州", "سوتشو"],
  hangzhou: ["Hangzhou", "杭州", "هانغتشو"],
  xian: ["Xi'an", "西安", "شيآن"],
  guangzhou: ["Guangzhou", "广州", "قوانغتشو"],
  foshan: ["Foshan", "佛山", "فوشان"],
  guilin: ["Guilin", "桂林", "قويلين"],
  yangshuo: ["Yangshuo", "阳朔", "يانغشو"],
  quanzhou: ["Quanzhou", "泉州", "تشيوانتشو"],
  xiamen: ["Xiamen", "厦门", "شيامن"],
  danba: ["Danba", "丹巴", "دانبا"],
  siguniang: ["Mount Siguniang", "四姑娘山", "جبل سيقونيانغ"],
  dali: ["Dali", "大理", "دالي"],
  shaxi: ["Shaxi", "沙溪", "شاشي"],
  lijiang: ["Lijiang", "丽江", "ليجيانغ"],
  kunming: ["Kunming", "昆明", "كونمينغ"],
  shangrila: ["Shangri-La", "香格里拉", "شانغريلا"],
  lanzhou: ["Lanzhou", "兰州", "لانتشو"],
  zhangye: ["Zhangye", "张掖", "تشانغيه"],
  jiayuguan: ["Jiayuguan", "嘉峪关", "جيايوغوان"],
  dunhuang: ["Dunhuang", "敦煌", "دونهوانغ"],
  kaili: ["Kaili", "凯里", "كايلي"],
  zhaoxing: ["Zhaoxing", "肇兴", "تشاوشينغ"],
  harbin: ["Harbin", "哈尔滨", "هاربين"],
  yabuli: ["Yabuli", "亚布力", "يابولي"],
  ili: ["Ili", "伊犁", "إيلي"],
  yining: ["Yining", "伊宁", "يينينغ"],
  sayramLake: ["Sayram Lake", "赛里木湖", "بحيرة سايرام"],
  tekes: ["Tekes", "特克斯", "تيكيس"],
  nalati: ["Nalati", "那拉提", "نالاتي"],
  wuhan: ["Wuhan", "武汉", "ووهان"],
  changsha: ["Changsha", "长沙", "تشانغشا"],
  jingdezhen: ["Jingdezhen", "景德镇", "جينغدتشن"],
  xining: ["Xining", "西宁", "شينينغ"],
  qinghaiLake: ["Qinghai Lake", "青海湖", "بحيرة تشينغهاي"],
  chaozhou: ["Chaozhou", "潮州", "تشانغتشو"],
  datong: ["Datong", "大同", "داتونغ"],
  pingyao: ["Pingyao", "平遥", "بينغياو"],
  luoyang: ["Luoyang", "洛阳", "لويانغ"],
  turpan: ["Turpan", "吐鲁番", "توربان"],
  urumqi: ["Urumqi", "乌鲁木齐", "أورومتشي"],
  kashgar: ["Kashgar", "喀什", "كاشغر"]
} as const;

export type CityId = keyof typeof cityNames;

export type TravelRoute = {
  id: string;
  duration: 3 | 5 | 7 | 10 | 15 | 21;
  region: Region;
  interests: Interest[];
  season: Season;
  pace: Pace;
  stops: CityId[];
  image: string;
};

const image = (id: string) => `/images/travel-planning/${id}.jpg`;

export const travelRoutes: TravelRoute[] = [
  { id: "beijing-3", duration: 3, region: "north", interests: ["history", "city", "firstTrip"], season: "springAutumn", pace: "balanced", stops: ["beijing"], image: image("beijing-3") },
  { id: "chengdu-3", duration: 3, region: "southwest", interests: ["food", "city"], season: "allYear", pace: "easy", stops: ["chengdu"], image: image("chengdu-3") },
  { id: "shanghai-3", duration: 3, region: "east", interests: ["city", "food", "firstTrip"], season: "allYear", pace: "balanced", stops: ["shanghai"], image: image("shanghai-3") },
  { id: "xian-3", duration: 3, region: "northwest", interests: ["history", "food"], season: "springAutumn", pace: "balanced", stops: ["xian"], image: image("xian-3") },
  { id: "beijing-wall-5", duration: 5, region: "north", interests: ["history", "firstTrip", "city"], season: "springAutumn", pace: "balanced", stops: ["beijing", "greatWall"], image: image("beijing-wall-5") },
  { id: "shanghai-suzhou-5", duration: 5, region: "east", interests: ["city", "history", "craft"], season: "springAutumn", pace: "easy", stops: ["shanghai", "suzhou"], image: image("shanghai-suzhou-5") },
  { id: "chengdu-dujiangyan-5", duration: 5, region: "southwest", interests: ["food", "history", "nature"], season: "allYear", pace: "easy", stops: ["chengdu", "dujiangyan"], image: image("chengdu-dujiangyan-5") },
  { id: "guilin-yangshuo-5", duration: 5, region: "south", interests: ["nature", "village", "food"], season: "springAutumn", pace: "easy", stops: ["guilin", "yangshuo"], image: image("guilin-yangshuo-5") },
  { id: "jiangnan-7", duration: 7, region: "east", interests: ["history", "craft", "city"], season: "springAutumn", pace: "easy", stops: ["shanghai", "suzhou", "hangzhou"], image: image("jiangnan-7") },
  { id: "west-sichuan-7", duration: 7, region: "southwest", interests: ["nature", "village", "food"], season: "summerAutumn", pace: "active", stops: ["chengdu", "dujiangyan", "danba", "siguniang"], image: image("west-sichuan-7") },
  { id: "yunnan-villages-7", duration: 7, region: "southwest", interests: ["village", "craft", "nature"], season: "allYear", pace: "easy", stops: ["dali", "shaxi", "lijiang"], image: image("yunnan-villages-7") },
  { id: "hexi-7", duration: 7, region: "northwest", interests: ["history", "nature"], season: "summerAutumn", pace: "balanced", stops: ["lanzhou", "zhangye", "jiayuguan", "dunhuang"], image: image("hexi-7") },
  { id: "guizhou-7", duration: 7, region: "southwest", interests: ["village", "craft", "nature"], season: "springAutumn", pace: "balanced", stops: ["kaili", "zhaoxing"], image: image("guizhou-7") },
  { id: "northeast-winter-7", duration: 7, region: "northeast", interests: ["nature", "city"], season: "winter", pace: "balanced", stops: ["harbin", "yabuli"], image: image("northeast-winter-7") },
  { id: "ili-7", duration: 7, region: "northwest", interests: ["nature", "village"], season: "summerAutumn", pace: "active", stops: ["yining", "sayramLake", "tekes", "nalati"], image: image("ili-7") },
  { id: "central-7", duration: 7, region: "central", interests: ["food", "city", "craft"], season: "springAutumn", pace: "balanced", stops: ["wuhan", "changsha", "jingdezhen"], image: image("central-7") },
  { id: "yunnan-10", duration: 10, region: "southwest", interests: ["village", "nature", "craft"], season: "allYear", pace: "balanced", stops: ["kunming", "dali", "shaxi", "lijiang", "shangrila"], image: image("yunnan-10") },
  { id: "south-coast-10", duration: 10, region: "south", interests: ["food", "history", "craft"], season: "allYear", pace: "balanced", stops: ["guangzhou", "foshan", "chaozhou", "xiamen", "quanzhou"], image: image("south-coast-10") },
  { id: "qinghai-gansu-10", duration: 10, region: "northwest", interests: ["nature", "history"], season: "summerAutumn", pace: "active", stops: ["xining", "qinghaiLake", "zhangye", "dunhuang"], image: image("qinghai-gansu-10") },
  { id: "classic-15", duration: 15, region: "north", interests: ["firstTrip", "history", "food", "city"], season: "springAutumn", pace: "balanced", stops: ["beijing", "xian", "chengdu", "shanghai"], image: image("classic-15") },
  { id: "history-north-15", duration: 15, region: "north", interests: ["history", "craft"], season: "springAutumn", pace: "balanced", stops: ["beijing", "datong", "pingyao", "luoyang", "xian"], image: image("history-north-15") },
  { id: "food-coast-15", duration: 15, region: "south", interests: ["food", "city", "craft"], season: "allYear", pace: "easy", stops: ["guangzhou", "foshan", "chaozhou", "xiamen", "quanzhou"], image: image("food-coast-15") },
  { id: "grand-china-21", duration: 21, region: "east", interests: ["firstTrip", "history", "food", "nature"], season: "springAutumn", pace: "balanced", stops: ["beijing", "xian", "chengdu", "guilin", "shanghai", "hangzhou"], image: image("grand-china-21") },
  { id: "silk-road-21", duration: 21, region: "northwest", interests: ["history", "nature", "village"], season: "summerAutumn", pace: "active", stops: ["xian", "lanzhou", "zhangye", "dunhuang", "turpan", "urumqi", "kashgar"], image: image("silk-road-21") }
];

export const durations = [3, 5, 7, 10, 15, 21] as const;
export const regions: Region[] = ["north", "east", "south", "central", "southwest", "northwest", "northeast"];
export const interests: Interest[] = ["history", "food", "nature", "village", "craft", "city", "firstTrip"];

export function getCityName(city: CityId, lang: Lang) {
  const [en, zh, ar] = cityNames[city];
  if (lang === "zh-CN") return zh;
  if (lang === "zh-TW") return toTraditionalChinese(zh);
  if (lang === "ar") return ar;
  return en;
}

export function getRouteName(route: TravelRoute, lang: Lang, dayUnit: string) {
  const first = getCityName(route.stops[0], lang);
  const last = getCityName(route.stops[route.stops.length - 1], lang);
  const place = first === last ? first : `${first} — ${last}`;
  return `${place} · ${route.duration} ${dayUnit}`;
}

export function getRouteFlow(route: TravelRoute, lang: Lang) {
  return route.stops.map((city) => getCityName(city, lang)).join(" — ");
}
