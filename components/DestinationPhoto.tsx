"use client";

import { useEffect, useMemo, useState } from "react";

type DestinationPhotoProps = {
  name: string;
  province: string;
  caption: string;
  fallbackImage: string;
};

const wikiTitleAliases: Record<string, string> = {
  "Stone Forest Kunming": "Stone Forest",
  "Kashgar Old City": "Kashgar",
  "Tianshan Tianchi": "Tianchi (Xinjiang)",
  "Turpan Grape Valley": "Grape Valley",
  "Karakoram Highway": "Karakoram Highway",
  "Kanas Lake": "Kanas Lake",
  "Kuqa Grand Canyon": "Tianshan Grand Canyon",
  "Potala Palace": "Potala Palace",
  "Jokhang Temple": "Jokhang",
  "Yamdrok Lake": "Yamdrok Lake",
  "Namtso Lake": "Namtso",
  "Tashilhunpo Monastery": "Tashilhunpo Monastery",
  "Basum Lake": "Basum Lake",
  "Mogao Caves": "Mogao Caves",
  "Jiayuguan Pass": "Jiayuguan Pass",
  "Zhangye Danxia": "Zhangye National Geopark",
  "Maijishan Grottoes": "Maijishan Grottoes",
  "Labrang Monastery": "Labrang Monastery",
  "Mingsha Mountain and Crescent Spring": "Crescent Lake (Dunhuang)",
  "Bingling Temple Grottoes": "Bingling Temple",
  "Hulunbuir Grassland": "Hulunbuir",
  "Kubuqi Desert": "Kubuqi Desert",
  "Arxan National Forest": "Arxan National Forest Park",
  "Erguna Wetland": "Ergun Wetland",
  "Manzhouli": "Manzhouli",
  "Shapotou": "Shapotou District",
  "Western Xia Tombs": "Western Xia mausoleums",
  "Helan Mountain Rock Art": "Helan Mountains",
  "Harbin Ice and Snow World": "Harbin International Ice and Snow Sculpture Festival",
  "Saint Sophia Cathedral": "Saint Sophia Cathedral, Harbin",
  "Central Street Harbin": "Zhongyang Street",
  "Wudalianchi": "Wudalianchi",
  "Yabuli Ski Area": "Yabuli Ski Resort",
  "Changbai Mountain": "Paektu Mountain",
  "Jilin Rime Island": "Jilin City",
  "Yanji Food Streets": "Yanji",
  "Changchun Puppet Palace": "Museum of the Imperial Palace of Manchukuo",
  "Shenyang Imperial Palace": "Mukden Palace",
  "Dalian Binhai Road": "Dalian",
  "Panjin Red Beach": "Red Beach (Panjin)",
  "Benxi Water Cave": "Benxi Water Caves",
  "Dandong Yalu River": "Yalu River",
  "Forbidden City": "Forbidden City",
  "Mutianyu Great Wall": "Mutianyu",
  "Temple of Heaven": "Temple of Heaven",
  "Summer Palace": "Summer Palace",
  "Lama Temple": "Yonghe Temple",
  "Panjiayuan Market": "Panjiayuan",
  "Five Great Avenues": "Five Great Avenues",
  "Haihe River Night Walk": "Hai River",
  "Chengde Mountain Resort": "Chengde Mountain Resort",
  "Shanhaiguan Pass": "Shanhai Pass",
  "Baiyangdian Wetland": "Baiyang Lake",
  "Pingyao Ancient City": "Pingyao",
  "Yungang Grottoes": "Yungang Grottoes",
  "Hanging Temple": "Hanging Temple",
  "Wutai Mountain": "Mount Wutai",
  "Qiao Family Courtyard": "Qiao Family Compound",
  "Hukou Waterfall Shanxi Side": "Hukou Waterfall",
  "Terracotta Army": "Terracotta Army",
  "Xi'an City Wall": "Fortifications of Xi'an",
  "Big Wild Goose Pagoda": "Giant Wild Goose Pagoda",
  "Mount Hua": "Mount Hua",
  "Mount Tai": "Mount Tai",
  "Qufu Confucius Sites": "Temple and Cemetery of Confucius and the Kong Family Mansion in Qufu",
  "Qingdao Old Town": "Qingdao",
  "Laoshan": "Mount Lao",
  "Jinan Springs": "Baotu Spring",
  "Longmen Grottoes": "Longmen Grottoes",
  "Shaolin Temple": "Shaolin Monastery",
  "Kaifeng Old City": "Kaifeng",
  "Yinxu Anyang": "Yinxu",
  "Guoliang Village": "Guoliang, Henan",
  "Suzhou Classical Gardens": "Classical Gardens of Suzhou",
  "Nanjing City Wall": "City Wall of Nanjing",
  "Zhouzhuang Water Town": "Zhouzhuang",
  "Yangzhou Slender West Lake": "Slender West Lake",
  "The Bund": "The Bund",
  "Former French Concession": "Shanghai French Concession",
  "Shanghai Museum": "Shanghai Museum",
  "Yu Garden and Old City": "Yu Garden",
  "Hongcun": "Hongcun",
  "Huangshan": "Huangshan",
  "Xidi": "Xidi",
  "Jiuhua Mountain": "Mount Jiuhua",
  "Yellow Crane Tower": "Yellow Crane Tower",
  "Wudang Mountains": "Wudang Mountains",
  "Enshi Grand Canyon": "Enshi Grand Canyon",
  "Shennongjia Forest": "Shennongjia",
  "Chengdu Panda Base": "Chengdu Research Base of Giant Panda Breeding",
  "Jiuzhaigou Valley": "Jiuzhaigou",
  "Mount Emei": "Mount Emei",
  "Leshan Giant Buddha": "Leshan Giant Buddha",
  "Dujiangyan Irrigation System": "Dujiangyan",
  "Hongya Cave": "Hongya Cave",
  "Wulong Karst": "Wulong Karst",
  "Yangtze Cableway": "Yangtze River Cableway",
  "Ciqikou Old Town": "Ciqikou",
  "Dazu Rock Carvings": "Dazu Rock Carvings",
  "West Lake": "West Lake",
  "Longjing Village": "Longjing tea",
  "Wuzhen Water Town": "Wuzhen",
  "Putuo Mountain": "Mount Putuo",
  "Shaoxing Old City": "Shaoxing",
  "Jingdezhen Porcelain Workshops": "Jingdezhen",
  "Wuyuan Villages": "Wuyuan County, Jiangxi",
  "Mount Lushan": "Mount Lu",
  "Tengwang Pavilion": "Tengwang Pavilion",
  "Sanqing Mountain": "Mount Sanqing",
  "Poyang Lake": "Poyang Lake",
  "Zhangjiajie National Forest Park": "Zhangjiajie National Forest Park",
  "Fenghuang Ancient Town": "Fenghuang County",
  "Yuelu Academy": "Yuelu Academy",
  "Orange Isle": "Orange Isle",
  "Yueyang Tower": "Yueyang Tower",
  "Fujian Tulou": "Fujian tulou",
  "Wuyi Mountains": "Wuyi Mountains",
  "Quanzhou Maritime Heritage": "Quanzhou",
  "Xiamen Gulangyu": "Gulangyu",
  "Fuzhou Three Lanes Seven Alleys": "Three Lanes and Seven Alleys",
  "Xiapu Mudflats": "Xiapu County",
  "Huangguoshu Waterfall": "Huangguoshu Waterfall",
  "Xijiang Miao Village": "Xijiang, Guizhou",
  "Libo Xiaoqikong": "Libo County",
  "Zhaoxing Dong Village": "Zhaoxing",
  "Fanjing Mountain": "Fanjingshan",
  "Dali Old Town and Erhai": "Dali City",
  "Lijiang Old Town": "Old Town of Lijiang",
  "Shangri-La Dukezong": "Dukezong",
  "Yuanyang Rice Terraces": "Yuanyang County, Yunnan",
  "Jingmai Mountain Tea Forest": "Jingmai Mountain",
  "Shaxi Ancient Town": "Shaxi, Yunnan",
  "Li River": "Li River",
  "Longji Rice Terraces": "Longsheng Rice Terrace",
  "Detian Waterfall": "Detian Falls",
  "Yangshuo Countryside": "Yangshuo County",
  "Beihai Old Street": "Beihai",
  "Guangzhou Old City": "Guangzhou",
  "Kaiping Diaolou": "Kaiping Diaolou",
  "Chaozhou Old Town": "Chaozhou",
  "Chen Clan Ancestral Hall": "Chen Clan Ancestral Hall",
  "Foshan Ancestral Temple": "Foshan Ancestral Temple",
  "Victoria Peak": "Victoria Peak",
  "Lantau Island": "Lantau Island",
  "Temple Street Night Market": "Temple Street, Hong Kong",
  "Star Ferry": "Star Ferry",
  "Tai O Fishing Village": "Tai O",
  "Historic Centre of Macau": "Historic Centre of Macau",
  "Ruins of St Pauls": "Ruins of Saint Paul's",
  "Taipa Village": "Taipa",
  "A-Ma Temple": "A-Ma Temple",
  "Sanya Coast": "Sanya",
  "Wuzhishan Rainforest": "Wuzhi Mountain",
  "Tanmen Fishing Port": "Tanmen",
  "Yalong Bay Tropical Forest": "Yalong Bay",
  "Boao Town": "Bo'ao",
  "Haikou Qilou Old Street": "Haikou"
};

function usableImage(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && !/alamy|shutterstock|watermark/i.test(value);
}

async function getWikipediaImage(title: string) {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
  if (!response.ok) return null;
  const data = await response.json();
  return usableImage(data?.originalimage?.source) ? data.originalimage.source
    : usableImage(data?.thumbnail?.source) ? data.thumbnail.source
    : null;
}

async function getCommonsImage(query: string) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "8",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "1100",
    format: "json",
    origin: "*"
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`);
  if (!response.ok) return null;
  const data = await response.json();
  const pages = Object.values(data?.query?.pages ?? {}) as Array<{ title?: string; imageinfo?: Array<{ thumburl?: string; url?: string }> }>;
  const page = pages.find((item) => {
    const title = item.title ?? "";
    return !/map|logo|icon|diagram|svg|locator|seal|flag/i.test(title) && usableImage(item.imageinfo?.[0]?.thumburl ?? item.imageinfo?.[0]?.url);
  });
  return page ? page.imageinfo?.[0]?.thumburl ?? page.imageinfo?.[0]?.url ?? null : null;
}

export function DestinationPhoto({ name, province, caption, fallbackImage }: DestinationPhotoProps) {
  const [src, setSrc] = useState(fallbackImage);
  const query = useMemo(() => `${name} ${province} China`, [name, province]);

  useEffect(() => {
    let active = true;
    const title = wikiTitleAliases[name] ?? name;
    async function load() {
      try {
        const image = await getWikipediaImage(title) ?? await getCommonsImage(query);
        if (active && image) setSrc(image);
      } catch {
        if (active) setSrc(fallbackImage);
      }
    }
    load();
    return () => { active = false; };
  }, [fallbackImage, name, query]);

  return <img src={src} alt={caption} className="h-full w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />;
}
