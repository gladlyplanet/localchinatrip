"use client";

import Link from "next/link";
import { DestinationPhoto } from "@/components/DestinationPhoto";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { getRecommendationEnrichment } from "@/lib/content-enrichment";
import { getProvinceName, type Province } from "@/lib/provinces";
import { getRecommendationCopy, type ProvinceRecommendation, type RecommendationKind } from "@/lib/province-recommendations";
import { getSiteCopy } from "@/lib/site-copy";

type LocalText = {
  en: string;
  zh: string;
};

type DetailContent = {
  eyebrow: LocalText;
  subtitle: LocalText;
  intro: LocalText;
  facts: Array<{ title: LocalText; value: LocalText; icon: IconName }>;
  adviceLead: LocalText;
  advice: Array<{ title: LocalText; body: LocalText; icon: IconName }>;
  guide: Array<{ title: LocalText; body: LocalText; icon: IconName }>;
};

type IconName = "leaf" | "clock" | "people" | "star" | "camera" | "shoe" | "mountain" | "hat" | "route" | "book" | "car";

const zh = (value: string) => value;

const kindContent: Record<RecommendationKind, Omit<DetailContent, "intro">> = {
  heritage: {
    eyebrow: { en: "Place and experience details", zh: zh("地点与体验详情") },
    subtitle: { en: "Historic layers · Architecture · Local memory", zh: zh("历史层次 · 建筑空间 · 城市记忆") },
    facts: [
      { icon: "leaf", title: { en: "Best season", zh: zh("适合季节") }, value: { en: "Spring and autumn for mild walking weather", zh: zh("春秋舒适，适合慢走与拍照") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Half day or a relaxed full day", zh: zh("半日到一日，节奏放缓") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "History, architecture and photography lovers", zh: zh("历史 / 建筑 / 摄影爱好者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Old city, stories, local context", zh: zh("古城肌理 · 历史讲解 · 在地视角") } }
    ],
    adviceLead: { en: "Read the place slowly through scale, details and the city around it.", zh: zh("顺着历史空间慢慢看，让建筑、街巷与城市关系变得清楚。") },
    advice: [
      { icon: "camera", title: { en: "Best light", zh: zh("最佳观看时段") }, body: { en: "Morning or late afternoon light gives old walls, courtyards and stone details more texture.", zh: zh("清晨或傍晚光线柔和，墙体、院落和石刻细节更有层次。") } },
      { icon: "shoe", title: { en: "Walk and observe", zh: zh("步行与观察结合") }, body: { en: "Keep the route walkable, with pauses for inscriptions, gates, streets and views.", zh: zh("沿步行路线慢慢展开，在城门、碑刻、街巷和视野点停留。") } },
      { icon: "mountain", title: { en: "Context first", zh: zh("历史背景先行") }, body: { en: "A short background briefing makes the visible remains easier to understand.", zh: zh("先理解时代背景，再看现场遗存，会比单纯拍照更有收获。") } },
      { icon: "hat", title: { en: "Stay unhurried", zh: zh("留出从容时间") }, body: { en: "Leave extra time for quiet corners and unexpected street scenes nearby.", zh: zh("给周边街区和安静角落留时间，常能看到更真实的城市气息。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Route by layers", zh: zh("按历史层次游览") }, body: { en: "Connect major structures with nearby streets and living neighborhoods.", zh: zh("把主体遗存、周边街巷和今天的生活空间连成一条线。") } },
      { icon: "book", title: { en: "Local interpretation", zh: zh("在地文化讲解") }, body: { en: "Use stories, maps and details to explain why the place matters.", zh: zh("通过故事、地图和细节说明这个地点为什么重要。") } },
      { icon: "car", title: { en: "Flexible transfer", zh: zh("灵活交通安排") }, body: { en: "Add private transfers when entrances or viewpoints are far apart.", zh: zh("入口、观景点分散时，可安排包车或接驳，行程更轻松。") } }
    ]
  },
  nature: {
    eyebrow: { en: "Landscape and experience details", zh: zh("山水与体验详情") },
    subtitle: { en: "Seasonal scenery · Light · Slow travel", zh: zh("季节风景 · 光线节奏 · 慢旅行") },
    facts: [
      { icon: "leaf", title: { en: "Best season", zh: zh("适合季节") }, value: { en: "Choose by flowers, water, snow or clear skies", zh: zh("按花期、水量、雪景或晴朗天气选择") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Half day to full day with scenic pauses", zh: zh("半日到一日，预留观景停留") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Families, photographers and nature lovers", zh: zh("家庭 / 摄影爱好者 / 自然爱好者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Light, terrain, timing, quiet views", zh: zh("光线 · 地形 · 节奏 · 安静观景") } }
    ],
    adviceLead: { en: "Let the landscape set the rhythm instead of rushing between viewpoints.", zh: zh("让山水本身决定节奏，不要为了赶景点错过真正舒服的观看方式。") },
    advice: [
      { icon: "camera", title: { en: "Best light", zh: zh("最佳观看时段") }, body: { en: "Early morning and late afternoon usually bring softer light and richer color.", zh: zh("清晨或傍晚光线更柔和，层次、色彩和照片效果通常更好。") } },
      { icon: "shoe", title: { en: "Walk gently", zh: zh("步行与观察结合") }, body: { en: "Combine short walks with viewpoints so the route stays comfortable.", zh: zh("把短步行和观景点结合起来，既能深入，也不会太赶。") } },
      { icon: "mountain", title: { en: "Feel the terrain", zh: zh("山水田园体验") }, body: { en: "Notice villages, fields, water, ridges and how people live with the land.", zh: zh("在村落、田地、水系和山脊之间，看自然如何影响当地生活。") } },
      { icon: "hat", title: { en: "Travel mood", zh: zh("带上好心情") }, body: { en: "Weather may change the plan; leave space for slower moments.", zh: zh("关注天气和体力，行程留白，享受慢旅行的自由与从容。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Travel by rhythm", zh: zh("按节奏游览") }, body: { en: "Plan around season, light and energy so the day stays relaxed.", zh: zh("根据季节、体力与兴趣定制行程，舒缓不赶路。") } },
      { icon: "book", title: { en: "Landscape context", zh: zh("自然与人文讲解") }, body: { en: "Understand how climate, terrain and local life shape the scenery.", zh: zh("了解地形、气候和当地生活如何共同塑造风景。") } },
      { icon: "car", title: { en: "Private transport", zh: zh("灵活交通安排") }, body: { en: "Use private transport for scattered viewpoints and weather changes.", zh: zh("提供包车或接驳服务，行程更自由，出行更安心。") } }
    ]
  },
  food: {
    eyebrow: { en: "Food and local life details", zh: zh("饮食与本地生活详情") },
    subtitle: { en: "Ingredients · Street flavor · Table culture", zh: zh("地方食材 · 街巷味道 · 餐桌文化") },
    facts: [
      { icon: "leaf", title: { en: "Best time", zh: zh("适合时段") }, value: { en: "Morning markets, lunch or evening streets", zh: zh("早市、午餐或夜间街巷最合适") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Two to four hours, with tasting stops", zh: zh("2-4小时，边走边尝") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Food lovers and curious travelers", zh: zh("美食爱好者 / 好奇型旅行者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Markets, ingredients, local habits", zh: zh("市场 · 食材 · 本地吃法") } }
    ],
    adviceLead: { en: "Taste is only the beginning; ingredients and habits make the place memorable.", zh: zh("味道只是开始，真正值得看的是食材、做法和当地人的日常吃法。") },
    advice: [
      { icon: "camera", title: { en: "Start local", zh: zh("从本地场景开始") }, body: { en: "Begin with a market, old shop or neighborhood street before sitting down.", zh: zh("先看市场、老店或社区街巷，再坐下来吃，会更有理解。") } },
      { icon: "shoe", title: { en: "Walk between bites", zh: zh("边走边尝") }, body: { en: "Keep portions small and leave room for several textures and flavors.", zh: zh("少量多样地品尝，给不同口味、做法和小店留空间。") } },
      { icon: "mountain", title: { en: "Know the ingredients", zh: zh("理解食材") }, body: { en: "Ask what is seasonal, local and prepared differently here.", zh: zh("了解哪些食材当季、哪些做法属于本地，体验会更有层次。") } },
      { icon: "hat", title: { en: "Eat comfortably", zh: zh("吃得舒服") }, body: { en: "Adjust spice, pace and hygiene comfort to your group.", zh: zh("根据口味、辣度和卫生习惯调整路线，吃得安心。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Taste by route", zh: zh("按味道线路游览") }, body: { en: "Connect markets, old shops and seated meals in one easy route.", zh: zh("把市场、老店和正餐串成一条轻松的味觉路线。") } },
      { icon: "book", title: { en: "Food culture", zh: zh("饮食文化讲解") }, body: { en: "Learn why people eat this way and how the flavors developed.", zh: zh("讲清当地为什么这样吃，以及味型如何形成。") } },
      { icon: "car", title: { en: "Easy transfer", zh: zh("灵活交通安排") }, body: { en: "Use short transfers when the best stops are not walkable.", zh: zh("好吃的地方分散时，用短途车程连接，少走冤枉路。") } }
    ]
  },
  village: {
    eyebrow: { en: "Village and local life details", zh: zh("村落与本地生活详情") },
    subtitle: { en: "Homes · Lanes · Everyday rhythm", zh: zh("民居街巷 · 日常节奏 · 慢行体验") },
    facts: [
      { icon: "leaf", title: { en: "Best season", zh: zh("适合季节") }, value: { en: "Spring, autumn or festival periods", zh: zh("春秋舒适，也可结合节庆") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Slow half day or overnight stay", zh: zh("慢半日或住一晚更好") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Families, culture lovers and slow travelers", zh: zh("家庭 / 文化爱好者 / 慢旅行者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Homes, lanes, fields, daily life", zh: zh("民居 · 巷道 · 田地 · 日常") } }
    ],
    adviceLead: { en: "Move slowly and respectfully; the village is a lived place, not a stage.", zh: zh("放慢脚步、保持分寸，把村落当作真实生活空间来理解。") },
    advice: [
      { icon: "camera", title: { en: "Soft light", zh: zh("温柔光线") }, body: { en: "Morning and late afternoon make lanes and homes feel calmer.", zh: zh("清晨和傍晚适合看巷道、民居和生活细节。") } },
      { icon: "shoe", title: { en: "Walk quietly", zh: zh("安静步行") }, body: { en: "Use narrow lanes and small pauses instead of rushing through.", zh: zh("沿小路慢走，给院落、门窗和公共空间留观察时间。") } },
      { icon: "mountain", title: { en: "Read the setting", zh: zh("看懂环境") }, body: { en: "Notice water, fields, hills and how homes are placed.", zh: zh("看水系、田地、山势和民居位置，理解村落为什么这样形成。") } },
      { icon: "hat", title: { en: "Respect privacy", zh: zh("尊重生活") }, body: { en: "Ask before photographing people, homes or private courtyards.", zh: zh("拍人、拍院落和私人空间前先征得同意。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Slow route", zh: zh("慢行路线") }, body: { en: "Plan a relaxed loop through lanes, fields and viewpoints.", zh: zh("串联巷道、田地和观景点，路线舒缓不催促。") } },
      { icon: "book", title: { en: "Local stories", zh: zh("本地故事讲解") }, body: { en: "Use family, architecture and landscape stories to explain daily life.", zh: zh("通过家族、建筑和山水故事理解当地日常。") } },
      { icon: "car", title: { en: "Easy arrival", zh: zh("轻松抵达") }, body: { en: "Arrange transfers when villages sit far from city centers.", zh: zh("村落离城区较远时，包车接送更省心。") } }
    ]
  },
  craft: {
    eyebrow: { en: "Craft and maker details", zh: zh("手作与工艺详情") },
    subtitle: { en: "Materials · Process · Local aesthetics", zh: zh("材料工序 · 匠人经验 · 地方审美") },
    facts: [
      { icon: "leaf", title: { en: "Best time", zh: zh("适合时段") }, value: { en: "Workshop hours, with advance booking", zh: zh("工作室开放时段，建议提前预约") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Two to three hours for close looking", zh: zh("2-3小时，适合细看") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Design, craft and culture lovers", zh: zh("设计 / 手作 / 文化爱好者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Makers, tools, materials, details", zh: zh("匠人 · 工具 · 材料 · 细节") } }
    ],
    adviceLead: { en: "The value is in process and detail, not just the finished object.", zh: zh("重点不是只看成品，而是看材料、工序和匠人的判断。") },
    advice: [
      { icon: "camera", title: { en: "Look closely", zh: zh("细看工序") }, body: { en: "Watch hands, tools, textures and small corrections.", zh: zh("观察手、工具、纹理和每一次细微调整。") } },
      { icon: "shoe", title: { en: "Leave time", zh: zh("预留时间") }, body: { en: "Avoid a rushed stop; craft needs patience to understand.", zh: zh("不要匆匆停留，手作需要时间才能看懂。") } },
      { icon: "mountain", title: { en: "Know the source", zh: zh("理解材料来源") }, body: { en: "Ask where materials come from and why they suit this place.", zh: zh("了解材料从哪里来，为什么适合当地工艺。") } },
      { icon: "hat", title: { en: "Respect makers", zh: zh("尊重匠人") }, body: { en: "Ask before filming and keep a calm workshop rhythm.", zh: zh("拍摄前先询问，保持安静，尊重工作室节奏。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Process route", zh: zh("按工序游览") }, body: { en: "Follow material, making, finishing and display in order.", zh: zh("按材料、制作、修整和成品展示的顺序看。") } },
      { icon: "book", title: { en: "Craft explanation", zh: zh("工艺讲解") }, body: { en: "Explain tools, symbols, local style and how to judge quality.", zh: zh("讲清工具、纹样、地方风格和好坏判断。") } },
      { icon: "car", title: { en: "Workshop transfer", zh: zh("工作室接驳") }, body: { en: "Arrange transport when workshops sit outside tourist streets.", zh: zh("工作室不在景区主街时，可安排接送更高效。") } }
    ]
  },
  spiritual: {
    eyebrow: { en: "Temple and belief details", zh: zh("信仰空间与体验详情") },
    subtitle: { en: "Ritual · Architecture · Respectful visit", zh: zh("礼仪传统 · 建筑空间 · 尊重参观") },
    facts: [
      { icon: "leaf", title: { en: "Best time", zh: zh("适合时段") }, value: { en: "Morning or quiet non-peak hours", zh: zh("清晨或非高峰时段更安静") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Slow visit with quiet pauses", zh: zh("慢节奏，留出安静停留") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Culture, architecture and belief studies", zh: zh("文化 / 建筑 / 信仰兴趣者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Etiquette, ritual, living faith", zh: zh("礼仪 · 香火 · 信仰生活") } }
    ],
    adviceLead: { en: "Visit with quiet attention and clear etiquette.", zh: zh("以安静、有分寸的方式参观，先理解礼仪，再进入空间。") },
    advice: [
      { icon: "camera", title: { en: "Photo boundaries", zh: zh("拍照边界") }, body: { en: "Some halls, rituals and people should not be photographed.", zh: zh("部分殿堂、仪式和人物不适合拍摄，应先确认。") } },
      { icon: "shoe", title: { en: "Follow the route", zh: zh("顺着动线") }, body: { en: "Move with the natural worship and visitor route.", zh: zh("顺着参拜和游览动线，不打扰现场秩序。") } },
      { icon: "mountain", title: { en: "Read the space", zh: zh("读懂空间") }, body: { en: "Notice gates, courtyards, halls, incense and mountain setting.", zh: zh("看山门、院落、殿堂、香火与环境如何组织起来。") } },
      { icon: "hat", title: { en: "Stay respectful", zh: zh("保持尊重") }, body: { en: "Dress and speak appropriately for a living sacred place.", zh: zh("注意衣着和说话音量，把这里当作真实信仰空间。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Respectful route", zh: zh("尊重动线游览") }, body: { en: "Use a route that follows local etiquette and avoids disruption.", zh: zh("按照礼仪和现场秩序安排路线。") } },
      { icon: "book", title: { en: "Belief context", zh: zh("信仰文化讲解") }, body: { en: "Explain ritual, architecture and living practice clearly.", zh: zh("讲清仪式、建筑和现实信仰生活。") } },
      { icon: "car", title: { en: "Comfortable timing", zh: zh("舒适时间安排") }, body: { en: "Choose quieter hours and suitable transfers.", zh: zh("选择较安静的时段，并安排合适交通。") } }
    ]
  },
  city: {
    eyebrow: { en: "Urban and neighborhood details", zh: zh("城市街区与体验详情") },
    subtitle: { en: "Streets · Architecture · Daily life", zh: zh("街道建筑 · 本地日常 · 城市节奏") },
    facts: [
      { icon: "leaf", title: { en: "Best time", zh: zh("适合时段") }, value: { en: "Morning life or evening lights", zh: zh("早晨看日常，傍晚看灯火") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Two hours to half day", zh: zh("2小时到半日，轻松串联") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "First-time visitors and urban walkers", zh: zh("初访者 / 城市漫步爱好者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Neighborhoods, food, transit, views", zh: zh("街区 · 饮食 · 交通 · 城市视角") } }
    ],
    adviceLead: { en: "Understand the city as a living rhythm, not a list of landmarks.", zh: zh("把城市当作一条有节奏的生活线，而不是一串孤立景点。") },
    advice: [
      { icon: "camera", title: { en: "Time the light", zh: zh("选择光线") }, body: { en: "Morning gives daily life; evening gives atmosphere and skyline.", zh: zh("早晨适合看日常，傍晚适合看氛围和天际线。") } },
      { icon: "shoe", title: { en: "Walk and transfer", zh: zh("步行与交通结合") }, body: { en: "Mix walking with short rides so the route stays comfortable.", zh: zh("步行配合短途车程，既深入街区，也不消耗太多体力。") } },
      { icon: "mountain", title: { en: "Read neighborhoods", zh: zh("读懂街区") }, body: { en: "Look at storefronts, housing, transit and public spaces.", zh: zh("看店铺、住宅、交通和公共空间如何构成城市日常。") } },
      { icon: "hat", title: { en: "Leave room", zh: zh("留出弹性") }, body: { en: "Good city walks need room for snacks, shops and small surprises.", zh: zh("城市漫步要给小吃、店铺和临时发现留空间。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Neighborhood route", zh: zh("街区路线") }, body: { en: "Connect old streets, viewpoints, food stops and transit.", zh: zh("串联老街、观景点、小吃和交通体验。") } },
      { icon: "book", title: { en: "Urban context", zh: zh("城市文化讲解") }, body: { en: "Explain how history and daily life overlap in the streets.", zh: zh("讲清历史和日常生活如何在街道中叠加。") } },
      { icon: "car", title: { en: "Flexible movement", zh: zh("灵活交通安排") }, body: { en: "Use transfers when neighborhoods are spread out.", zh: zh("街区分散时，灵活接驳让行程更顺。") } }
    ]
  },
  road: {
    eyebrow: { en: "Route and scenery details", zh: zh("路线与风景详情") },
    subtitle: { en: "Scenic drive · Stops · Flexible pace", zh: zh("风景车程 · 沿途停留 · 灵活节奏") },
    facts: [
      { icon: "leaf", title: { en: "Best season", zh: zh("适合季节") }, value: { en: "Clear weather and stable road conditions", zh: zh("天气稳定、路况清晰时最佳") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Full day or multi-day private route", zh: zh("一日或多日私人路线") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Scenery lovers and flexible travelers", zh: zh("风景爱好者 / 喜欢自由节奏的人") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Viewpoints, villages, meals, timing", zh: zh("观景点 · 村镇 · 餐食 · 时间控制") } }
    ],
    adviceLead: { en: "On a road route, the journey itself is part of the destination.", zh: zh("路线型目的地里，路途本身就是体验的一部分。") },
    advice: [
      { icon: "camera", title: { en: "View stops", zh: zh("观景停留") }, body: { en: "Plan safe pull-offs and viewpoints instead of stopping randomly.", zh: zh("提前安排安全停车点和观景点，不随意路边停留。") } },
      { icon: "shoe", title: { en: "Short walks", zh: zh("短步行") }, body: { en: "Add short walks so the day is not only spent in the car.", zh: zh("加入短步行，避免整天只在车上看风景。") } },
      { icon: "mountain", title: { en: "Weather aware", zh: zh("关注天气") }, body: { en: "Weather, altitude and road work can change the best plan.", zh: zh("天气、海拔和路况会影响节奏，要留调整空间。") } },
      { icon: "hat", title: { en: "Rest well", zh: zh("休息充足") }, body: { en: "Keep meals, restrooms and breaks in the route plan.", zh: zh("把用餐、洗手间和休息点一起规划进去。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Custom route", zh: zh("定制路线") }, body: { en: "Balance scenery, rest stops, food and arrival time.", zh: zh("平衡风景、休息、餐食和抵达时间。") } },
      { icon: "book", title: { en: "Route context", zh: zh("沿途讲解") }, body: { en: "Explain geography, villages and local life along the way.", zh: zh("讲解沿途地理、村镇和生活方式。") } },
      { icon: "car", title: { en: "Private car", zh: zh("私人用车") }, body: { en: "Use a comfortable vehicle and flexible timing.", zh: zh("使用舒适车辆，时间安排更自由。") } }
    ]
  },
  market: {
    eyebrow: { en: "Market and daily life details", zh: zh("市场与日常生活详情") },
    subtitle: { en: "Vendors · Ingredients · Real conversations", zh: zh("摊主食材 · 日常采购 · 真实交流") },
    facts: [
      { icon: "leaf", title: { en: "Best time", zh: zh("适合时段") }, value: { en: "Morning is usually most lively", zh: zh("清晨到上午通常最热闹") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "One to three hours", zh: zh("1-3小时，边看边聊") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Food, culture and photo lovers", zh: zh("美食 / 文化 / 摄影爱好者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Produce, vendors, daily shopping", zh: zh("食材 · 摊主 · 本地采购") } }
    ],
    adviceLead: { en: "Markets show the city at its most direct and everyday.", zh: zh("市场是理解一座城市最直接、最日常的入口。") },
    advice: [
      { icon: "camera", title: { en: "Ask before photos", zh: zh("拍照先询问") }, body: { en: "Many vendors are friendly, but permission matters.", zh: zh("很多摊主很友好，但拍照前先询问更礼貌。") } },
      { icon: "shoe", title: { en: "Follow the flow", zh: zh("顺着市场动线") }, body: { en: "Move with the shopping rhythm instead of blocking stalls.", zh: zh("顺着采购动线慢慢看，不挡摊位和通道。") } },
      { icon: "mountain", title: { en: "Seasonal foods", zh: zh("看季节食材") }, body: { en: "Ask what is local, seasonal and cooked at home.", zh: zh("了解哪些食材当季、哪些常在家里做。") } },
      { icon: "hat", title: { en: "Stay flexible", zh: zh("保持弹性") }, body: { en: "The best moments are often small conversations.", zh: zh("最好的体验常来自和摊主、顾客的小交流。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Market route", zh: zh("市场路线") }, body: { en: "Connect produce, cooked food, snacks and neighborhood streets.", zh: zh("串联生鲜、熟食、小吃和周边街区。") } },
      { icon: "book", title: { en: "Food explanation", zh: zh("食材讲解") }, body: { en: "Understand what locals buy and how they cook it.", zh: zh("讲清当地人买什么、怎么做、为什么这样吃。") } },
      { icon: "car", title: { en: "Easy logistics", zh: zh("轻松接驳") }, body: { en: "Use short transfers if the market is outside the main route.", zh: zh("市场不在主路线时，可用短途接驳节省体力。") } }
    ]
  },
  tea: {
    eyebrow: { en: "Tea and mountain details", zh: zh("茶山与体验详情") },
    subtitle: { en: "Fields · Processing · Tasting", zh: zh("茶园风土 · 制作过程 · 品饮体验") },
    facts: [
      { icon: "leaf", title: { en: "Best season", zh: zh("适合季节") }, value: { en: "Tea harvest seasons are most vivid", zh: zh("采茶季最有现场感") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Half day with tasting time", zh: zh("半日体验，留出品饮时间") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Tea, nature and culture lovers", zh: zh("茶文化 / 自然 / 慢旅行爱好者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Fields, makers, aroma, tasting", zh: zh("茶园 · 茶农 · 香气 · 品鉴") } }
    ],
    adviceLead: { en: "Tea is best understood from the field to the cup.", zh: zh("茶最好从茶园看到杯中，才真正理解风土。") },
    advice: [
      { icon: "camera", title: { en: "Field light", zh: zh("茶园光线") }, body: { en: "Soft light makes terraces, leaves and mist easier to photograph.", zh: zh("柔和光线下，茶垄、叶片和山间雾气更好看。") } },
      { icon: "shoe", title: { en: "Walk the fields", zh: zh("走进茶园") }, body: { en: "A short walk among fields adds context before tasting.", zh: zh("先在茶园里走一段，再品茶，会更容易理解味道。") } },
      { icon: "mountain", title: { en: "Know the process", zh: zh("理解制作") }, body: { en: "Processing steps explain why aroma and texture differ.", zh: zh("看懂制作步骤，才能理解香气和口感差异。") } },
      { icon: "hat", title: { en: "Taste slowly", zh: zh("慢慢品饮") }, body: { en: "Leave quiet time for tasting instead of rushing away.", zh: zh("给品饮留安静时间，不要刚坐下就赶下一站。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Tea route", zh: zh("茶山路线") }, body: { en: "Connect fields, workshop and tasting table.", zh: zh("串联茶园、制作空间和品饮环节。") } },
      { icon: "book", title: { en: "Tea culture", zh: zh("茶文化讲解") }, body: { en: "Explain season, craft, brewing and local hospitality.", zh: zh("讲清季节、工艺、冲泡和待客习惯。") } },
      { icon: "car", title: { en: "Mountain transfer", zh: zh("山地交通") }, body: { en: "Use flexible transfers for mountain roads and scattered villages.", zh: zh("茶山道路分散，灵活交通会更轻松。") } }
    ]
  },
  coast: {
    eyebrow: { en: "Coast and harbor details", zh: zh("海岸与港口详情") },
    subtitle: { en: "Sea views · Harbor life · Local food", zh: zh("海岸风景 · 港口生活 · 地方海味") },
    facts: [
      { icon: "leaf", title: { en: "Best season", zh: zh("适合季节") }, value: { en: "Clear weather and comfortable sea breeze", zh: zh("天气晴朗、海风舒适时最佳") } },
      { icon: "clock", title: { en: "Pace", zh: zh("游览节奏") }, value: { en: "Half day with meal or sunset", zh: zh("半日游，可结合用餐或日落") } },
      { icon: "people", title: { en: "Good for", zh: zh("适合人群") }, value: { en: "Families, seafood lovers and slow travelers", zh: zh("家庭 / 海鲜爱好者 / 慢旅行者") } },
      { icon: "star", title: { en: "Keywords", zh: zh("体验关键词") }, value: { en: "Harbor, fishing, old streets, sea breeze", zh: zh("港口 · 渔船 · 老街 · 海风") } }
    ],
    adviceLead: { en: "The coast is strongest when scenery and working harbor life are seen together.", zh: zh("海岸最动人的地方，是风景和真实港口生活一起出现。") },
    advice: [
      { icon: "camera", title: { en: "Sun and tide", zh: zh("看光线和潮汐") }, body: { en: "Light, tide and harbor work change the mood quickly.", zh: zh("光线、潮汐和码头作业会很快改变现场氛围。") } },
      { icon: "shoe", title: { en: "Walk the harbor", zh: zh("走近港口") }, body: { en: "Combine viewpoints with old streets, boats and markets.", zh: zh("把观景点、老街、渔船和市场结合起来看。") } },
      { icon: "mountain", title: { en: "Taste local", zh: zh("品尝本地海味") }, body: { en: "Seafood is best understood through season and local cooking.", zh: zh("海鲜要结合季节和当地做法，才不只是吃一顿饭。") } },
      { icon: "hat", title: { en: "Stay relaxed", zh: zh("保持轻松") }, body: { en: "Leave time for wind, weather and a slow meal.", zh: zh("给海风、天气和一顿慢餐留出时间。") } }
    ],
    guide: [
      { icon: "route", title: { en: "Coastal route", zh: zh("海岸路线") }, body: { en: "Connect viewpoints, harbor streets and food stops.", zh: zh("串联观景点、港口街巷和用餐停留。") } },
      { icon: "book", title: { en: "Harbor context", zh: zh("港口生活讲解") }, body: { en: "Explain fishing work, trade and local food habits.", zh: zh("讲清渔业、贸易和本地饮食习惯。") } },
      { icon: "car", title: { en: "Flexible transfer", zh: zh("灵活交通安排") }, body: { en: "Use a car when beaches, villages and ports are far apart.", zh: zh("海滩、村镇和港口分散时，包车更方便。") } }
    ]
  }
};

function localize(lang: Lang, value: LocalText) {
  return lang === "zh-CN" || lang === "zh-TW" ? value.zh : value.en;
}

function createIntro(lang: Lang, attraction: ProvinceRecommendation, enrichmentOverview: string) {
  if (lang === "zh-CN" || lang === "zh-TW") return enrichmentOverview;
  return enrichmentOverview;
}

function Icon({ name }: { name: IconName }) {
  const common = "h-6 w-6";
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (name === "people") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M16 12a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" />
        <path d="M3.5 19c.6-3.2 2.2-5 4.5-5s3.9 1.8 4.5 5" />
        <path d="M13 18.5c.5-2.4 1.7-3.7 3.3-3.7 1.8 0 3 1.4 3.4 3.7" />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      </svg>
    );
  }
  if (name === "camera") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 8h3l1.5-2h5L16 8h3v10H5V8Z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    );
  }
  if (name === "shoe") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 14c4.5.2 7.3-2.2 8-7l5 6c1.4 1.6.5 4-1.7 4H6.5C5.6 17 5 16.3 5 15.4V14Z" />
        <path d="M11 11.5 14 14" />
      </svg>
    );
  }
  if (name === "mountain") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m3 18 6.5-11 4 6 2-3 5.5 8H3Z" />
      </svg>
    );
  }
  if (name === "hat") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 15c2 1 12 1 14 0" />
        <path d="M8 14c.4-4 2-6 4-6s3.6 2 4 6" />
        <path d="M3 17c4 2 14 2 18 0" />
      </svg>
    );
  }
  if (name === "route") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 5h.1" />
        <path d="M18 19h.1" />
        <path d="M7 5c7 0 10 2 10 5s-3 5-10 5c-2 0-3 1-3 2s1 2 3 2h10" />
      </svg>
    );
  }
  if (name === "book") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 5.5c2.5 0 4.5.5 7 2v11c-2.5-1.5-4.5-2-7-2v-11Z" />
        <path d="M19 5.5c-2.5 0-4.5.5-7 2v11c2.5-1.5 4.5-2 7-2v-11Z" />
      </svg>
    );
  }
  if (name === "car") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 14h14l-1.5-4.5h-11L5 14Z" />
        <path d="M5 14v4h2" />
        <path d="M19 14v4h-2" />
        <circle cx="8" cy="17" r="1.4" />
        <circle cx="16" cy="17" r="1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12c5.5 0 7-5 7-8 4.5 3 6.8 7.6 3.8 12.1C13.1 20.2 7.2 20 5 15.8V12Z" />
      <path d="M5 12c3.8.4 6.5 2.1 8 5" />
    </svg>
  );
}

export function AttractionDetail({ province, attraction }: { province: Province; attraction: ProvinceRecommendation }) {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).destinations;
  const provinceLabel = getProvinceName(province.slug, lang);
  const itemCopy = getRecommendationCopy(lang, attraction);
  const enrichment = getRecommendationEnrichment(lang, attraction, province.name);
  const content = kindContent[attraction.kind];
  const intro = createIntro(lang, attraction, enrichment.overview);

  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-32 text-ink sm:px-8 lg:pt-36" dir={dir}>
        <article className="mx-auto max-w-7xl">
          <Link href={`/destinations/${province.slug}`} className="inline-flex items-center text-sm font-semibold text-moss">
            <span aria-hidden="true" className="mr-2">{"<-"}</span>
            {provinceLabel}
          </Link>

          <section className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3 text-gold">
                <span className="h-px w-7 bg-gold" />
                <p className="text-sm font-semibold tracking-[0.22em]">{localize(lang, content.eyebrow)}</p>
              </div>
              <h1 className="mt-7 font-serif text-5xl font-semibold leading-none sm:text-7xl lg:text-8xl">{itemCopy.name}</h1>
              <div className="mt-7 flex items-center gap-4 text-lg font-semibold text-moss">
                <span className="h-px w-10 bg-gold" />
                <span>{localize(lang, content.subtitle)}</span>
              </div>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">{intro}</p>

              <div className="mt-9 grid overflow-hidden rounded-lg border hairline bg-white/82 shadow-card sm:grid-cols-2 xl:grid-cols-4">
                {content.facts.map((fact) => (
                  <div key={localize(lang, fact.title)} className="min-h-[128px] border-b hairline p-5 sm:border-r xl:border-b-0">
                    <div className="flex items-center gap-3 text-moss">
                      <Icon name={fact.icon} />
                      <p className="font-semibold">{localize(lang, fact.title)}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-mist">{localize(lang, fact.value)}</p>
                  </div>
                ))}
              </div>
            </div>

            <figure className="overflow-hidden rounded-lg border hairline bg-white shadow-card">
              <div className="relative aspect-[16/10]">
                <DestinationPhoto caption={enrichment.caption} fallbackImage={enrichment.image} />
              </div>
              <figcaption className="flex gap-3 px-5 py-5 text-sm leading-6 text-mist">
                <span className="mt-0.5 text-moss"><Icon name="leaf" /></span>
                <span>
                  <strong className="block text-ink">{provinceLabel}</strong>
                  {enrichment.caption}
                </span>
              </figcaption>
            </figure>
          </section>

          <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.8fr]">
            <div className="rounded-lg border hairline bg-white/92 p-7 shadow-card sm:p-8">
              <div className="flex items-start gap-4">
                <span className="text-moss"><Icon name="star" /></span>
                <div>
                  <h2 className="font-serif text-3xl font-semibold">{lang === "zh-CN" || lang === "zh-TW" ? zh("游览建议") : "Travel Notes"}</h2>
                  <p className="mt-2 text-base leading-7 text-mist">{localize(lang, content.adviceLead)}</p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-4">
                {content.advice.map((item) => (
                  <div key={localize(lang, item.title)} className="border-t hairline pt-5 md:border-l md:border-t-0 md:pl-5">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-moss/10 text-moss">
                      <Icon name={item.icon} />
                    </div>
                    <h3 className="font-semibold text-ink">{localize(lang, item.title)}</h3>
                    <p className="mt-3 text-sm leading-7 text-mist">{localize(lang, item.body)}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-lg border hairline bg-white/92 p-7 shadow-card sm:p-8">
              <div className="flex items-start gap-4">
                <span className="text-moss"><Icon name="people" /></span>
                <div>
                  <h2 className="font-serif text-3xl font-semibold">{lang === "zh-CN" || lang === "zh-TW" ? zh("导览方式") : "How to Visit"}</h2>
                  <p className="mt-2 text-base leading-7 text-mist">
                    {lang === "zh-CN" || lang === "zh-TW" ? zh("根据您的需求，选择合适的陪同与服务方式。") : "Choose the guiding style and service level that fit your group."}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {content.guide.map((item) => (
                  <div key={localize(lang, item.title)} className="flex gap-4 rounded-lg border hairline p-4">
                    <span className="text-moss"><Icon name={item.icon} /></span>
                    <div>
                      <h3 className="font-semibold">{localize(lang, item.title)}</h3>
                      <p className="mt-1 text-sm leading-6 text-mist">{localize(lang, item.body)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">{t.plan}</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
