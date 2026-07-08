import type { ProvinceRecommendation, RecommendationKind } from "@/lib/province-recommendations";
import { destinationImages } from "@/lib/generated-destination-media";

type Localized = {
  en: string;
  zh: string;
};

export type AuditedMediaText = {
  image: string;
  fallbackImage?: string;
  caption: Localized;
  overview: Localized;
  experience: Localized;
};

const fallbackByKind: Record<RecommendationKind, string> = {
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
  coast: "/images/about-me-boat-seafood.jpg"
};

function joinPlace(item: ProvinceRecommendation, provinceName?: string) {
  return provinceName ? `${item.name}, ${provinceName}` : item.name;
}

function imageFor(item: ProvinceRecommendation, provinceName: string | undefined, fallbackImage?: string) {
  const exact = provinceName ? destinationImages[`${provinceName}::${item.name}`] : undefined;
  return exact ?? fallbackImage ?? fallbackByKind[item.kind];
}

export function getAuditedDestinationMedia(
  item: ProvinceRecommendation,
  provinceName: string | undefined,
  fallbackImage?: string,
  secondaryFallbackImage?: string
): AuditedMediaText {
  const place = joinPlace(item, provinceName);
  const placeZh = item.nameZh || item.name;
  const focus = item.focus;
  const focusZh = item.focusZh || item.focus;

  const specificZh: Record<string, { overview: string; experience: string }> = {
    "布达拉宫": {
      overview: "布达拉宫矗立在拉萨红山上，白宫与红宫层层叠起，把宫堡建筑、佛殿空间、旧拉萨政治记忆和高原城市天际线压在同一个视野里。页面应写出它的高差、体量、殿堂层次和拉萨老城之间的关系。",
      experience: "参观要提前确认预约时段，按高原体力慢慢上行。进入后应把楼梯动线、壁画、佛殿、宫殿功能和回望拉萨城的视角串起来，重点是进入空间后的层次和动线。"
    },
    "婺源村落": {
      overview: "婺源村落的重点不是把白墙黑瓦当成背景，而是看徽派民居、溪流巷道、祠堂水口、田埂花期和晒秋场景怎样组成仍在使用的乡村生活。",
      experience: "游览应从村口、水系和巷道慢慢进入，停在祠堂、民居立面、田埂和晒秋场景前，讲清村落如何被居住、耕作、祭祖和季节活动继续使用。"
    }
  };

  const en: Record<RecommendationKind, { overview: string; experience: string }> = {
    heritage: {
      overview: `${place} is best introduced through ${focus}. The story should stay close to the visible site: its streets, courtyards, gates, halls, inscriptions, old routes and the city memory around them.`,
      experience: `A good visit should pause at the details that make ${item.name} recognizable, then connect those details with local history and present-day use.`
    },
    nature: {
      overview: `${place} is shaped by ${focus}. The route should explain the actual terrain, season, weather, light and walking conditions that make this landscape different.`,
      experience: `A good visit should choose viewpoints and walking sections carefully, leaving enough time for scale, weather changes and quiet observation.`
    },
    food: {
      overview: `${place} should be read through ${focus}: ingredients, vendors, kitchens, ordering habits and the way local people eat there.`,
      experience: `A good food walk should compare several real stops, explaining taste, preparation and neighborhood rhythm instead of reducing the place to one dish.`
    },
    village: {
      overview: `${place} is strongest when read through ${focus}. Homes, lanes, waterways, fields, courtyards and public spaces should feel like lived places, not scenery pasted behind a route.`,
      experience: `A good visit should slow down inside the settlement and explain how architecture, work, daily routines and local memory still fit together.`
    },
    craft: {
      overview: `${place} should be understood through ${focus}. Materials, tools, makers, workshop space and process all need to appear so the craft has a real local setting.`,
      experience: `A good visit should watch how the work is made and connect technique with local history, materials and the people who keep the craft alive.`
    },
    spiritual: {
      overview: `${place} should be introduced through ${focus}, with attention to ritual routes, temple layout, etiquette, worship practice and the living use of the site.`,
      experience: `A good visit should keep a quiet pace, explain what visitors are seeing and leave room for respect rather than treating the site as a quick photo stop.`
    },
    city: {
      overview: `${place} should be read through ${focus}. Streets, buildings, transport, shops and ordinary routines need to appear together so the place feels lived-in from ground level.`,
      experience: `A good city walk should compare blocks, storefronts and street details, then explain how local life works here today.`
    },
    road: {
      overview: `${place} is defined by ${focus}. Movement, stops, transport rhythm and changing views are part of the experience, not just the way to reach it.`,
      experience: `A good route should plan pauses, meals, transfers and viewpoints together, making the journey itself part of the story.`
    },
    market: {
      overview: `${place} should be explained through ${focus}: stalls, goods, vendors, prices, shopping habits and neighborhood exchange.`,
      experience: `A good market walk should slow down at specific stalls and explain what local people buy, when they come and how the market connects to daily cooking.`
    },
    tea: {
      overview: `${place} should connect ${focus} with fields or forests, picking season, processing, brewing and local hospitality.`,
      experience: `A good tea visit should move from landscape to craft to tasting, so ${item.name} feels like a complete tea experience rather than a scenic stop.`
    },
    coast: {
      overview: `${place} should connect ${focus} with shore scenery, harbor work, seafood, old streets and the daily rhythm of coastal life.`,
      experience: `A good coastal route should combine waterfront time with town life, harbor rhythm and food context.`
    }
  };

  const zh: Record<RecommendationKind, { overview: string; experience: string }> = {
    heritage: {
      overview: `${placeZh}的历史价值要落到${focusZh}对应的真实参观现场：核心建筑或遗存在哪里，入口、院落、碑刻、展陈、街区或城墙怎样组织动线，它和周边城市或村落是什么关系。`,
      experience: `行程应停在最能代表${placeZh}的几个可见细节前，把建筑形制、人物故事、城市位置和今天的使用方式讲清楚。`
    },
    nature: {
      overview: `${placeZh}的辨识度来自${focusZh}。山体、水面、植被、季节和光线会直接改变观感，说明时要落到这里真实可见的地貌和动线。`,
      experience: `行程应挑选能说明${placeZh}特点的观景点、步道或水边停留，给天气变化、空间尺度和安静观察留出时间。`
    },
    food: {
      overview: `${placeZh}的重点是${focusZh}。内容应写到具体食材、摊位或厨房、点单方式、口味层次和当地人日常怎么吃。`,
      experience: `美食路线应选择几个真实停留点，比较做法、火候、调味和街区节奏，让${placeZh}不只是菜名堆砌。`
    },
    village: {
      overview: `${placeZh}的现场由${focusZh}组成。民居、巷道、水系、院落、田地和公共空间都要作为仍在使用的生活环境来写。`,
      experience: `游览应在聚落或古镇内部慢下来，看建筑如何被使用，地方产业、家庭记忆和日常节奏如何连在一起。`
    },
    craft: {
      overview: `${placeZh}应写出${focusZh}背后的制作现场：材料从哪里来，工具怎么用，手艺人怎样判断火候、针法、泥性、纹样或色阶。`,
      experience: `体验应看见工序和手上动作，再把技法、材料、地方审美和仍在做这门手艺的人联系起来。`
    },
    spiritual: {
      overview: `${placeZh}的核心不只是建筑外观，而是${focusZh}与参拜动线、殿堂格局、礼仪方式和今天仍在延续的信仰生活。`,
      experience: `游览应保持安静节奏，讲清殿堂顺序、仪式含义、地方习惯和游客需要遵守的礼貌。`
    },
    city: {
      overview: `${placeZh}的城市性体现在${focusZh}。街区、建筑、交通、店铺和普通日常要同时出现，页面才会像真实的地面现场。`,
      experience: `城市漫步应比较街巷、店招、建筑立面和生活细节，说明当地人如何使用${placeZh}。`
    },
    road: {
      overview: `${placeZh}的内容不只在终点，而在${focusZh}带来的移动过程、停靠点、交通节奏和沿途变化。`,
      experience: `路线应把乘坐或行车时段、接驳方式、观景停留和前后街区一起安排，让移动本身成为体验的一部分。`
    },
    market: {
      overview: `${placeZh}的现场感来自${focusZh}。摊位、货品、摊主、价格、采购习惯和街坊交流都要写进页面。`,
      experience: `市场漫步应在具体摊位前慢下来，说明本地人买什么、什么时候来，以及市场如何连接日常饮食。`
    },
    tea: {
      overview: `${placeZh}的茶味来自${focusZh}，也来自茶园或茶林环境、采摘季节、制作流程、冲泡方式和待客习惯。`,
      experience: `茶体验应从景观走到工艺，再进入品鉴，说明山场、手法和杯中风味之间的关系。`
    },
    coast: {
      overview: `${placeZh}的海岸气质来自${focusZh}，也来自港口生活、海鲜处理、老街空间和当地人的日常节奏。`,
      experience: `海岸路线应结合潮水时间、小镇生活、港口节奏和饮食背景，让海景和生活现场同时成立。`
    }
  };

  return {
    image: imageFor(item, provinceName, fallbackImage),
    fallbackImage: secondaryFallbackImage,
    caption: { en: place, zh: placeZh },
    overview: { en: en[item.kind].overview, zh: specificZh[placeZh]?.overview ?? zh[item.kind].overview },
    experience: { en: en[item.kind].experience, zh: specificZh[placeZh]?.experience ?? zh[item.kind].experience }
  };
}
