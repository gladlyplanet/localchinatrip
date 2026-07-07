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
      overview: `${placeZh}适合从${focusZh}进入。介绍时要扣住这个地点自己的核心空间、可见细节、历史背景和周边城市关系，让它不再像一段通用古迹说明。`,
      experience: `合适的游览应在最能代表这里的建筑、动线、展陈或景观点前慢下来，把看得见的细节和地方记忆串起来。`
    },
    nature: {
      overview: `${placeZh}的重点在${focusZh}。路线要跟着这里真实的地形、季节、天气、光线和步行条件走，让风景从现场本身展开。`,
      experience: `合适的游览应选择能说明这个地点特点的观景点和步行段，给尺度、天气变化和安静观察留出时间。`
    },
    food: {
      overview: `${placeZh}要从${focusZh}进入：看当地人买什么、怎么做、怎么点、怎么吃，以及摊主、店铺和街区之间的日常关系。`,
      experience: `合适的美食路线应比较几个真实停留点，讲清口味、做法、点单习惯和街区节奏，而不是只用一道菜概括。`
    },
    village: {
      overview: `${placeZh}适合通过${focusZh}慢慢展开。民居、巷道、水系、院落、田地和公共空间都应作为正在使用的生活现场来理解。`,
      experience: `合适的游览应在聚落或古镇内部慢下来，解释建筑、日常使用方式、地方产业和记忆如何连在一起。`
    },
    craft: {
      overview: `${placeZh}要顺着${focusZh}来看：材料、工具、手艺人、制作流程和展示空间都应进入介绍，让工艺回到真实制作环境里。`,
      experience: `合适的体验应看清工序，再把技法、材料、地方历史和仍在做这门手艺的人联系起来。`
    },
    spiritual: {
      overview: `${placeZh}要从${focusZh}理解，同时注意参拜动线、寺观格局、礼仪方式和这个空间今天仍然怎样被使用。`,
      experience: `合适的游览应保持安静节奏，讲清看到的殿堂、仪式、建筑和地方习惯。`
    },
    city: {
      overview: `${placeZh}要从${focusZh}切入。街区、建筑、交通、店铺和普通日常需要一起出现，才会像真实城市现场。`,
      experience: `合适的城市漫步应在地面比较街巷、店招、建筑和生活细节，说明当地人如何使用这里。`
    },
    road: {
      overview: `${placeZh}适合沿着${focusZh}组织。移动过程、停靠点、交通节奏和沿途变化本身就是体验。`,
      experience: `合适的路线应把乘坐或行车时段、换乘接驳、观景停留和前后街区一起安排，让移动本身成为这个地点的内容。`
    },
    market: {
      overview: `${placeZh}要从${focusZh}来讲：摊位、货品、摊主、价格、采购习惯和街坊交流都应进入介绍。`,
      experience: `合适的市场漫步应在具体摊位前慢下来，说明本地人买什么、什么时候来，以及市场如何连接日常饮食。`
    },
    tea: {
      overview: `${placeZh}要把${focusZh}与茶园或茶林环境、采摘季节、制作流程、冲泡品鉴和待客习惯连起来。`,
      experience: `合适的茶体验应从景观走到工艺，再进入品鉴，让这里成为真正的茶文化现场。`
    },
    coast: {
      overview: `${placeZh}要把${focusZh}与海岸风景、港口生活、海鲜、老街和地方节奏放在一起看。`,
      experience: `合适的海岸路线应结合潮水时间、小镇生活、港口节奏和饮食背景。`
    }
  };

  return {
    image: imageFor(item, provinceName, fallbackImage),
    fallbackImage: secondaryFallbackImage,
    caption: { en: place, zh: placeZh },
    overview: { en: en[item.kind].overview, zh: zh[item.kind].overview },
    experience: { en: en[item.kind].experience, zh: zh[item.kind].experience }
  };
}
