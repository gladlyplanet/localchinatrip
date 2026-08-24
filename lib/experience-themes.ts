import type { Lang } from "@/components/LanguageProvider";
import { toTraditionalChinese } from "@/lib/chinese-text";

export type ExperienceThemeCategory = "daily" | "food" | "craft" | "culture" | "wellness" | "journey";

type ThemeLanguageCopy = {
  title: string;
  intro: string;
  overview: [string, string];
  moments: [string, string][];
  flow: [string, string][];
  captions: string[];
};

export type ExperienceTheme = {
  slug: string;
  category: ExperienceThemeCategory;
  duration: string;
  hero: string;
  gallery: string[];
  featured?: boolean;
  en: ThemeLanguageCopy;
  zh: ThemeLanguageCopy;
};

const theme = (
  slug: string,
  category: ExperienceThemeCategory,
  duration: string,
  hero: string,
  gallery: string[],
  en: ThemeLanguageCopy,
  zh: ThemeLanguageCopy,
  featured = false
): ExperienceTheme => ({ slug, category, duration, hero, gallery, en, zh, featured });

export const experienceThemes: ExperienceTheme[] = [
  theme("village-life", "daily", "5-7 h", "/images/experience-hongcun.jpg", [
    "/images/experience-yuanyang-terraces.jpg",
    "/images/experience-longji-terraces.jpg",
    "/images/experience-beiji-village-real.jpg",
    "/images/experience-dali-shaxi-real.jpg"
  ], {
    title: "Rural Life and Seasonal Villages",
    intro: "Slow down inside a village day shaped by fields, courtyards, water and the season.",
    overview: [
      "This is not a staged folk show. It is a carefully paced visit to a living community, with time to read the landscape, understand how homes are organized and notice the work that keeps the village running.",
      "The day can lean toward farming, architecture, food or family life. We keep groups small, enter private spaces only by invitation and adapt every visit to the community's daily rhythm."
    ],
    moments: [["Read the landscape", "See how fields, water, paths and homes form one working system."], ["Meet everyday life", "Observe seasonal work, household routines and the social use of shared spaces."], ["Share a local table", "Taste simple regional food and understand where its ingredients come from."]],
    flow: [["Arrive gently", "Begin with an orientation walk instead of rushing into photographs."], ["Walk with context", "Follow lanes, water systems and public spaces with a local explanation."], ["Join one activity", "Take part in an appropriate seasonal task, craft or kitchen moment."], ["Pause and reflect", "End over tea or a meal, leaving space for questions and conversation."]],
    captions: ["Terraced fields reveal the season's work", "Village paths connect homes and farmland", "Daily life changes with climate and latitude", "Courtyards hold family and community memory"]
  }, {
    title: "乡村生活与四季村落",
    intro: "走进由田野、院落、水系和季节共同塑造的真实村落日常。",
    overview: [
      "这不是摆拍式的民俗表演，而是在仍然生活着的村落里慢慢展开的一天。先读懂地形、田地和水系，再理解民居如何组织、村民怎样使用公共空间，以及季节如何改变每天的劳动。",
      "体验可以偏向农事、建筑、饮食或家庭生活。全程控制人数，只在获得邀请时进入私人空间，并根据村落当天真实发生的事情调整节奏。"
    ],
    moments: [["读懂乡土空间", "看田地、水系、道路与民居如何组成一套仍在运行的生活系统。"], ["观察真实日常", "理解季节农事、家庭分工和村落公共空间的使用方式。"], ["共享地方餐桌", "品尝朴素的本地食物，认识食材从土地到餐桌的过程。"]],
    flow: [["从容抵达", "先做环境介绍和步行热身，不急着打卡拍照。"], ["带着背景漫步", "沿村巷、水渠与公共空间，理解建筑和生活之间的关系。"], ["参与一项日常", "按季节加入合适的农事、手作或厨房活动。"], ["围坐交流", "以茶或一顿家常饭收尾，留出充分提问与交谈时间。"]],
    captions: ["梯田记录着季节与劳动", "村巷连接民居和田野", "气候与纬度改变村落日常", "院落承载家庭与社区记忆"]
  }, true),

  theme("night-food-tour", "food", "3-5 h", "/images/experience-xian-night.jpg", [
    "/images/experience-changsha-food.jpg",
    "/images/experience-kaifeng-night-market-real.jpg",
    "/images/experience-guangzhou-xihua-snacks-real.jpg",
    "/images/experience-chengdu-food.jpg"
  ], {
    title: "Night Food and Street Flavor",
    intro: "Taste the city after dark through trusted stalls, small shops and neighborhood stories.",
    overview: ["A good night-food walk is more than a list of famous dishes. We compare textures, cooking methods and regional seasoning while moving between places that local residents actually use.", "Portions are planned for sharing, spice and dietary needs are discussed in advance, and the route balances busy street energy with quieter places to sit and talk."],
    moments: [["Taste with a sequence", "Move from light bites to richer dishes so every flavor has room."], ["Watch the cooking", "See grills, steamers, woks and dough work at close range."], ["Understand the street", "Connect food with migration, work schedules and neighborhood history."]],
    flow: [["Set preferences", "Confirm allergies, spice tolerance and must-try foods."], ["Begin with orientation", "Read the street and learn how to choose a reliable stall."], ["Taste and compare", "Share several small portions across different cooking styles."], ["Finish unhurried", "End with tea, dessert or a calm late-night conversation."]],
    captions: ["Night streets are part of the meal", "Small portions make comparison possible", "Long-running stalls preserve local techniques", "A shared table keeps the evening social"]
  }, {
    title: "夜市美食与街头风味",
    intro: "跟着本地人的夜间节奏，在可靠摊档、小店和街区故事之间品尝一座城市。",
    overview: ["好的夜食体验不只是把所谓名小吃逐项吃一遍，而是按照口味由浅入深，比较不同火候、质地和调味方式，也观察当地人真正怎样点单、搭配和分享。", "每次品尝以小份共享为主，提前确认过敏、忌口和辣度，并在热闹街头与安静坐席之间留出喘息，让味觉和故事都能被记住。"],
    moments: [["按顺序品尝", "从清淡小食到浓郁主味，让每一种味道都有辨识度。"], ["近距离看制作", "观察炭火、蒸笼、铁锅和面点手艺如何决定口感。"], ["理解街区背景", "把食物与迁徙、作息、商业传统和街坊关系联系起来。"]],
    flow: [["确认口味", "提前沟通过敏、忌口、辣度与最想尝试的类别。"], ["认识街区", "先看摊位结构，学习判断一家店为何值得停留。"], ["边走边比较", "跨几种制作方式共享小份，避免过早吃饱。"], ["慢慢收尾", "以茶、甜品或一次安静夜谈结束，不赶时间。"]],
    captions: ["夜色与街巷本身就是体验的一部分", "小份共享更适合比较风味", "老摊档保存着地方技法", "围桌而坐让夜晚回到人与人的交流"]
  }, true),

  theme("local-market-walk", "food", "3-4 h", "/images/experience-chengdu-market.jpg", [
    "/images/experience-kunming-zhuanxin-market.jpg",
    "/images/experience-liwan-fresh-market-stalls-real.jpg",
    "/images/experience-shanghai-wet-market.jpg",
    "/images/experience-guangzhou-market.jpg"
  ], {
    title: "Local Market and Daily Pantry",
    intro: "Read daily life through seasonal produce, familiar vendors and the way families shop.",
    overview: ["Markets reveal climate, migration and household habits more clearly than a souvenir street. We identify unfamiliar ingredients, compare regional pantry staples and observe how regular customers make decisions.", "The route is conversational rather than performative. Tastings are chosen for freshness and context, and a cooking add-on can turn what we learn in the market into a shared meal."],
    moments: [["Decode ingredients", "Learn what is seasonal, how it is prepared and what locals value."], ["Meet the vendors", "Understand specialties through people who handle them every day."], ["Follow the pantry", "Connect fresh produce, preserved foods and ready-made dishes to home cooking."]],
    flow: [["Start before the rush", "Enter when the market is active but still easy to navigate."], ["Build an ingredient map", "Group what you see by season, cooking method and household use."], ["Taste selectively", "Choose a few foods that explain the market rather than sampling at random."], ["Continue to the table", "Optionally cook or eat nearby using ingredients discussed on the walk."]],
    captions: ["Seasonal produce sets the rhythm", "Vendors are the market's living knowledge", "Prepared foods reveal everyday schedules", "Fresh and preserved ingredients share one pantry"]
  }, {
    title: "本地市场与家庭食材",
    intro: "从时令蔬果、熟悉的摊主和家庭采购方式，读懂最真实的城市日常。",
    overview: ["菜市场比观光商业街更直接地呈现气候、人口流动和家庭习惯。体验会辨认陌生食材，比较地方厨房常用的调味与保存方式，也观察熟客怎样挑选、询价和搭配。", "路线以交流和理解为主，不安排表演式互动。试吃只选择真正新鲜且有背景的食物，也可以增加烹饪环节，把市场里认识的食材变成一顿共享餐。"],
    moments: [["认识时令食材", "了解它何时最好、怎样处理以及本地人看重什么。"], ["与摊主交流", "通过每天接触食材的人，理解产地、等级与吃法。"], ["看懂家庭厨房", "把鲜食、腌制品和熟食与普通家庭的一日三餐联系起来。"]],
    flow: [["避开最拥挤时段", "在市场活跃但仍适合观察和交流的时间进入。"], ["建立食材地图", "按季节、烹饪方式和家庭用途整理所见。"], ["有选择地试吃", "只挑能说明当地饮食特点的食物，不无目的扫摊。"], ["从市场到餐桌", "可继续到附近厨房或小店，把认识转化成一顿饭。"]],
    captions: ["时令食材决定市场的节奏", "摊主是市场里的活知识", "熟食反映普通人的作息", "鲜食与保存食物组成一间家庭厨房"]
  }, true),

  theme("craft-and-culture", "craft", "3-5 h", "/images/experience-suzhou-craft.jpg", [
    "/images/experience-jingdezhen-porcelain.jpg",
    "/images/experience-miao-craft.jpg",
    "/images/experience-quanzhou-puppet.jpg",
    "/images/experience-shiwan-ceramics.jpg"
  ], {
    title: "Living Craft and Maker Studios",
    intro: "Enter a working studio and understand a tradition through materials, tools and practiced hands.",
    overview: ["The focus is the living process, not a sales showroom. A maker introduces the material, demonstrates the difficult stages and explains how apprenticeship, design and local demand keep the craft changing.", "Hands-on work is kept realistic: a small step done carefully is more meaningful than pretending to master a complex tradition in an hour."],
    moments: [["Handle the material", "Feel the difference between raw material, prepared components and finished work."], ["Watch skilled decisions", "Notice the small judgments that cannot be learned from a display label."], ["Make one honest piece", "Try a suitable step with guidance and understand why it takes years to master."]],
    flow: [["Meet the maker", "Begin with their working life and the role of the studio today."], ["Read tools and materials", "Understand preparation before watching the main technique."], ["Observe a demonstration", "Slow down at the stages where experience matters most."], ["Try and discuss", "Complete a modest hands-on task, then talk about use, value and change."]],
    captions: ["A working studio reveals the whole process", "Materials behave differently in practiced hands", "Traditional design continues to evolve", "A small hands-on step makes the skill tangible"]
  }, {
    title: "活态手艺与真实工坊",
    intro: "走进仍在工作的工坊，从材料、工具和手艺人的双手理解一门传统。",
    overview: ["重点不是参观售卖展厅，而是看一件作品真正怎样产生。手艺人会介绍材料，演示最需要判断的环节，也会谈到学徒训练、当代设计和本地需求怎样让传统继续变化。", "动手部分坚持真实尺度：认真完成一个合适的小步骤，比在一小时里假装学会一整套复杂技艺更有意义。"],
    moments: [["触摸真实材料", "比较原料、半成品和完成作品在质感与状态上的差异。"], ["观察经验判断", "看清展柜标签无法解释的力度、时间和手感。"], ["完成一个小作品", "在指导下尝试合适步骤，理解熟练为何需要多年积累。"]],
    flow: [["认识手艺人", "从他的工作日常和今天的工坊角色开始。"], ["读懂工具材料", "先理解准备工序，再观看核心技法。"], ["慢看制作演示", "在最依赖经验的环节停下来仔细观察。"], ["动手并交流", "完成一项适度练习，再讨论使用、价值与当代变化。"]],
    captions: ["真实工坊能看到完整过程", "材料在熟练双手中呈现不同状态", "传统设计仍在持续变化", "一次适度动手让技艺变得可感知"]
  }, true),

  theme("local-family-cooking", "food", "4-5 h", "/images/experience-chengdu-cooking.jpg", [
    "/images/experience-beijing-dumplings.jpg",
    "/images/experience-yangshuo-farm-food.jpg",
    "/images/experience-suzhou-cuisine.jpg",
    "/images/experience-xian-noodles.jpg"
  ], {
    title: "Family Kitchen and Shared Table",
    intro: "Cook the food people actually eat at home, then sit down and share the table.",
    overview: ["This experience begins with household choices: what is fresh, what fits the season and how several dishes become one balanced meal. The host demonstrates techniques in a normal kitchen rather than turning dinner into a performance.", "Recipes can be adapted for dietary needs, but the cultural logic of the meal stays visible through ingredients, timing, shared plates and table conversation."],
    moments: [["Shop like a household", "Choose ingredients for a complete meal, not a single showcase dish."], ["Cook side by side", "Prepare several everyday dishes and learn how timing brings them together."], ["Share the table", "Eat at a relaxed pace and talk about family habits, seasons and taste."]],
    flow: [["Plan the menu", "Agree on preferences and build a balanced set of dishes."], ["Gather ingredients", "Visit a nearby market or review the day's prepared ingredients."], ["Cook together", "Divide practical tasks and learn the key techniques hands-on."], ["Eat without a clock", "Share the meal, tea and conversation as a household would."]],
    captions: ["Everyday cooking begins with practical choices", "Hands-on preparation makes techniques memorable", "Several dishes are timed as one meal", "The shared table is the heart of the experience"]
  }, {
    title: "家庭厨房与共享餐桌",
    intro: "一起做当地家庭真正会吃的饭，再围坐下来共享餐桌。",
    overview: ["体验从家庭式判断开始：今天什么新鲜、什么适合季节、几道菜怎样组成一顿平衡的饭。主人在普通厨房里示范真实做法，而不是把家常晚餐变成表演。", "菜单可以根据忌口调整，但会保留当地餐桌的逻辑，包括食材选择、出菜顺序、共享方式和用餐中的交流。"],
    moments: [["像家庭一样买菜", "为一整顿饭选择食材，而不是只做一道展示菜。"], ["并肩完成烹饪", "准备几道家常菜，理解时间与火候怎样彼此配合。"], ["真正坐下吃饭", "放慢速度，聊家庭习惯、季节变化和地方口味。"]],
    flow: [["一起定菜单", "确认偏好和忌口，组合一桌平衡的菜。"], ["准备当日食材", "走访附近市场，或逐项认识主人已经备好的材料。"], ["分工动手制作", "共同完成实际步骤，把关键技巧真正做一遍。"], ["不看时间用餐", "像普通家庭一样共享饭菜、茶与交谈。"]],
    captions: ["家常菜从实际选择开始", "亲手准备让技巧被记住", "多道菜要作为一顿饭统筹时间", "共享餐桌是体验真正的中心"]
  }),

  theme("tea-village-experience", "craft", "5-7 h", "/images/experience-longjing-tea.jpg", [
    "/images/experience-longjing-fields.jpg",
    "/images/experience-wuyi-tea.jpg",
    "/images/experience-anxi-tea-garden.jpg",
    "/images/experience-jingmai-tea-forest-real.png"
  ], {
    title: "Tea Landscape and Seasonal Craft",
    intro: "Walk the growing landscape, meet the maker and taste how season and craft shape the cup.",
    overview: ["Tea makes sense when field, weather, cultivar and processing are seen together. The visit follows the leaf from its growing environment through key making stages before a guided comparative tasting.", "Picking and production depend on season and weather, so the day is never advertised as a guaranteed performance. When a process is not active, deeper tasting and maker conversation replace it."],
    moments: [["Walk the growing land", "Read slope, shade, soil and surrounding vegetation before tasting."], ["Follow the leaf", "Understand which processing decisions shape aroma, texture and finish."], ["Taste comparatively", "Compare several teas with clear guidance instead of collecting labels."]],
    flow: [["Begin outdoors", "Orient to the landscape and the current stage of the season."], ["Meet the producer", "Discuss harvest, processing and the realities of tea work."], ["Observe or try a step", "Join a suitable part of picking or making when conditions allow."], ["Taste slowly", "Compare cups and learn a simple method you can use again."]],
    captions: ["Tea begins with terrain and climate", "The season changes what can be observed", "Making choices shape aroma and texture", "Comparative tasting turns flavor into understanding"]
  }, {
    title: "茶山风土与季节制茶",
    intro: "走进茶树生长的环境，认识制茶人，品尝季节和工艺怎样共同塑造一杯茶。",
    overview: ["只有把茶园、天气、品种和制作放在一起，茶才真正容易理解。体验从茶树生长环境开始，跟随鲜叶经过关键工序，最后用有引导的对比品饮建立味觉认识。", "采摘和生产高度依赖季节与天气，因此不会把某个工序包装成每天都有的表演。遇到非生产时段，会用更深入的品饮和制茶人交流替代。"],
    moments: [["先走进生长环境", "在品茶前看坡向、遮阴、土壤与周边植被。"], ["跟着鲜叶看工艺", "理解哪些制作判断决定香气、口感与回味。"], ["通过对比来品茶", "在清晰引导下比较不同茶样，而不是只记名称。"]],
    flow: [["从户外开始", "认识茶园环境与当下所处的季节阶段。"], ["与制茶人交流", "了解采摘、制作以及茶叶劳动真实的一面。"], ["观察或参与一步", "条件合适时加入采摘或制作中的适度环节。"], ["慢慢对比品饮", "建立一套以后也能继续使用的简单品茶方法。"]],
    captions: ["茶首先来自地形和气候", "季节决定当天能看到什么", "制作判断塑造香气与口感", "对比品饮把味道变成理解"]
  }),

  theme("private-ride", "journey", "1-8 days", "/images/experience-guilin-ride.jpg", [
    "/images/experience-ili-nalati-real.jpg",
    "/images/experience-qinghai-gansu-road.jpg",
    "/images/experience-western-sichuan-danba-real.jpg",
    "/images/experience-wuhan-river.jpg"
  ], {
    title: "Scenic Private Road Journey",
    intro: "Use the road as part of the experience, with a private vehicle and stops that respond to the day.",
    overview: ["A private road journey is designed around distance, light, weather and the energy of the travelers. Viewpoints are only one part of it; small towns, food stops and unscheduled pauses often become the most memorable moments.", "Driving time is stated honestly, high-altitude or remote sections receive extra planning, and the route can be shortened when the day calls for more rest."],
    moments: [["Travel at a human pace", "Balance driving with meaningful stops and proper rest."], ["Respond to conditions", "Adjust for weather, light, traffic and local events."], ["Connect the in-between", "Give context to landscapes and communities between major sights."]],
    flow: [["Design the route", "Match distance and road conditions to the group."], ["Set a daily rhythm", "Choose a clear core with optional stops around it."], ["Travel flexibly", "Use real-time conditions to protect comfort and experience."], ["Review each evening", "Adjust the next day instead of following a rigid script."]],
    captions: ["The road is part of the story", "Flexible stops protect the quality of the day", "Remote landscapes need realistic planning", "A private vehicle allows the route to breathe"]
  }, {
    title: "山水之间的私人公路旅行",
    intro: "把公路本身变成体验的一部分，用私人车辆和灵活停靠回应每天真实的情况。",
    overview: ["私人公路旅行要围绕距离、光线、天气和同行者体力来设计。观景台只是其中一部分，小城午餐、路边停留和临时发现往往才是最难忘的片段。", "所有驾驶时间都会如实说明，高海拔或偏远路段会增加安全与休息规划；如果当天更适合放慢，路线也可以主动缩短。"],
    moments: [["以人的节奏赶路", "在行车、有效停留与充分休息之间取得平衡。"], ["根据现场调整", "顺应天气、光线、交通与地方活动，而不是硬走计划。"], ["看懂沿途空间", "不只关注终点，也理解主要景点之间的风景与社区。"]],
    flow: [["先设计合理路线", "让距离和道路条件适合同行者，而不是只追求覆盖面。"], ["建立每天主线", "保留一个清晰重点，再围绕它设置可选停靠。"], ["途中灵活判断", "用实时情况保护舒适度和体验质量。"], ["每天晚上复盘", "根据当天状态调整第二天，而不是死守脚本。"]],
    captions: ["公路本身就是旅程故事", "灵活停靠保护一天的体验质量", "偏远风景需要现实的时间规划", "私人车辆让路线保有呼吸感"]
  }),

  theme("custom-day", "journey", "Flexible", "/images/experience-beijing-hutong.jpg", [
    "/images/experience-shanghai-lanes.jpg",
    "/images/experience-guangzhou-old-city.jpg",
    "/images/experience-wuhan-east-lake-real.jpg",
    "/images/experience-west-lake.jpg"
  ], {
    title: "A Local Day Built Around You",
    intro: "Start with your interests and energy, then shape one coherent day rather than a checklist.",
    overview: ["A custom local day can combine food, neighborhoods, history, design, nature or conversation, but it still needs a clear thread. We select fewer stops and explain why they belong together.", "The day is planned after a short conversation about mobility, curiosity, dietary needs and preferred pace. One or two alternatives remain available for weather and mood."],
    moments: [["Begin with your questions", "Use genuine interests rather than a standard city highlights list."], ["Build one clear story", "Connect places so the day feels coherent instead of fragmented."], ["Keep room to change", "Leave enough time for discoveries, rest and real conversation."]],
    flow: [["Have a short conversation", "Share interests, limits and what you do not want."], ["Receive a simple outline", "Review the day's core idea, rhythm and practical choices."], ["Explore with flexibility", "Follow the plan while responding to what feels meaningful."], ["Carry the context forward", "End with recommendations for the rest of the journey."]],
    captions: ["Neighborhood scale makes a city understandable", "Old and new can be read in one day", "Waterfronts and parks create breathing space", "The route follows curiosity, not a checklist"]
  }, {
    title: "完全围绕你设计的本地一日",
    intro: "从你的兴趣和体力出发，设计一条完整清晰的一日线，而不是景点清单。",
    overview: ["定制一日可以组合饮食、街区、历史、设计、自然或人与人的交流，但仍然需要一条明确主线。我们会减少无意义的停靠，并说明这些内容为什么适合放在一起。", "路线在一次简短沟通后设计，提前了解步行能力、好奇方向、饮食需求和理想节奏，同时保留一两个天气或状态变化时的替代选择。"],
    moments: [["从你的问题开始", "不用标准城市必看清单，而是从真正好奇的事情出发。"], ["建立一天的主线", "让不同内容彼此连接，不把时间切成零散打卡。"], ["为变化留下空间", "给临时发现、休息和真实交流保留足够时间。"]],
    flow: [["先做一次简短沟通", "说清兴趣、限制，以及明确不想要的旅行方式。"], ["收到清晰的一日框架", "核对主题、节奏和关键实际安排。"], ["按现场灵活展开", "沿着计划前进，但把时间留给真正有意义的发现。"], ["把理解带到后续旅程", "结束时给出适合继续探索的个人化建议。"]],
    captions: ["以街区尺度认识一座城市", "一天里也能读懂传统与当代", "水岸和公园为行程留出呼吸", "路线跟随好奇心而不是清单"]
  }),

  theme("morning-park-life", "daily", "2-3 h", "/images/destinations/henan-chenjiagou-taiji-village-clean.png", [
    "/images/travel-planning/featured/wellness-taiji.jpg",
    "/images/experience-wuhan-east-lake-real.jpg",
    "/images/destinations/optimized/wiki-beijing-temple-of-heaven.jpg",
    "/images/destinations/shandong-weifang-kite-culture-corrected.png"
  ], {
    title: "Morning Park and Community Life",
    intro: "See a Chinese city wake up through exercise, music, conversation and breakfast nearby.",
    overview: ["Public parks are shared living rooms in the early morning. Walking, stretching, tai chi, dance, music and quiet conversation reveal how people care for health and community in ordinary life.", "Participation is respectful and optional. We first observe, explain etiquette and only join when the group is genuinely welcoming."],
    moments: [["Watch the city wake", "Notice how different ages share the same public space."], ["Join with respect", "Try a simple movement or game only when invited."], ["Continue to breakfast", "Connect morning exercise with the food and routines that follow."]],
    flow: [["Meet early", "Arrive while local routines are active and the air is cooler."], ["Walk and observe", "Identify different activities without interrupting them."], ["Join one moment", "Participate briefly with clear etiquette and local guidance."], ["Share breakfast", "Finish in a nearby everyday breakfast shop."]],
    captions: ["Morning movement is part of everyday health", "Shared parks bring generations together", "Quiet observation comes before participation", "Breakfast completes the city's morning rhythm"]
  }, {
    title: "晨间公园与社区生活",
    intro: "从锻炼、音乐、交谈和一顿附近早餐，看一座中国城市怎样醒来。",
    overview: ["清晨的公共公园像一间共享客厅。散步、拉伸、太极、舞蹈、音乐和闲谈，呈现普通人怎样照顾健康，也维系社区关系。", "是否参与完全尊重现场。我们会先观察、讲清礼貌边界，只有在对方真诚欢迎时才短暂加入。"],
    moments: [["看城市慢慢醒来", "观察不同年龄的人怎样共享同一片公共空间。"], ["有分寸地加入", "只在获得邀请时体验简单动作或社区活动。"], ["接上本地早餐", "把晨练与随后发生的饮食和生活节奏连接起来。"]],
    flow: [["在清晨见面", "选择本地活动最丰富、天气也较舒适的时段抵达。"], ["边走边观察", "辨认不同活动，同时避免打断参与者。"], ["加入一个片段", "在本地引导下短暂参与并注意礼貌。"], ["以街坊早餐收尾", "走进附近日常早餐店，完成城市晨间节奏。"]],
    captions: ["晨间运动是日常健康的一部分", "公共公园让不同世代相遇", "参与之前先安静观察", "一顿早餐完成城市的清晨节奏"]
  }, true),

  theme("breakfast-culture", "food", "2-4 h", "/images/destinations/hubei-wuhan-breakfast-streets-real.jpg", [
    "/images/destinations/beijing-breakfast-walk-corrected.png",
    "/images/destinations/ningxia-wuzhong-morning-tea-corrected.png",
    "/images/experience-xian-noodles.jpg",
    "/images/destinations/guangxi-nanning-morning-market-clean.png"
  ], {
    title: "Chinese Breakfast Culture",
    intro: "Begin early and taste the foods that power workdays, family routines and regional identity.",
    overview: ["Breakfast changes dramatically across China: steamed, fried, soupy, wheat-based, rice-based, quick or leisurely. The experience compares several small portions and explains who eats them, when and why.", "We visit places in their normal working rhythm, learn ordering habits and avoid turning a busy breakfast counter into a photo set."],
    moments: [["Compare staples", "Taste how grain, climate and local work shape the first meal."], ["Learn the ordering rhythm", "See how regulars choose, combine and eat efficiently."], ["Notice social habits", "Understand why some breakfasts are solitary and others highly communal."]],
    flow: [["Start with something light", "Wake the palate before richer or spicier foods."], ["Move between styles", "Compare textures, grains and preparation methods."], ["Pause for a seated meal", "Slow down at one stop with more cultural context."], ["Finish with a local drink", "End with tea, soy milk or another regional morning drink."]],
    captions: ["Breakfast counters move at the pace of work", "Regional staples reflect climate and grain", "Small portions allow real comparison", "Morning drinks carry their own local rituals"]
  }, {
    title: "中国早餐文化",
    intro: "起得早一点，从支撑工作、家庭作息和地方认同的早餐开始认识中国。",
    overview: ["中国早餐的差异非常大：有蒸、有炸、有汤；有面食、有米食；有几分钟吃完的，也有慢慢坐下喝茶的。体验以多个小份进行比较，并说明谁在吃、什么时候吃、为什么这样搭配。", "我们进入店铺正常工作的节奏，学习真实点单方式，也避免把繁忙的早餐档口变成拍照布景。"],
    moments: [["比较不同主食", "从谷物、气候和劳动习惯理解一天的第一顿饭。"], ["学会本地点单节奏", "观察熟客怎样选择、组合和高效用餐。"], ["理解早餐社交", "看有些早餐为何快速独食，有些又高度依赖围桌交流。"]],
    flow: [["从清淡味道开始", "先唤醒味觉，再进入更浓郁或辛辣的食物。"], ["跨几种类型比较", "对照不同谷物、质地和制作方式。"], ["安排一次坐席停留", "在其中一站慢下来，补充更完整的饮食背景。"], ["以地方晨饮收尾", "用茶、豆浆或当地常见饮品结束。"]],
    captions: ["早餐档口跟着上班节奏运转", "地方主食反映气候与物产", "小份品尝才适合认真比较", "晨间饮品也有自己的地方礼法"]
  }, true),

  theme("old-neighborhood-life", "daily", "3-5 h", "/images/destinations/fujian-fuzhou-three-lanes-seven-alleys-real.jpg", [
    "/images/experience-shanghai-lanes.jpg",
    "/images/experience-guangzhou-qilou-street-real.jpg",
    "/images/experience-beijing-hutong.jpg",
    "/images/destinations/hainan-haikou-qilou-old-street-corrected.png"
  ], {
    title: "Old Neighborhoods and Living Streets",
    intro: "Read a city at walking speed through lanes, courtyards, shopfronts and daily routines.",
    overview: ["An old neighborhood is valuable because people still use it, not because every wall is ancient. We look at housing, drainage, shade, commerce and public space together to understand how the district works.", "The route avoids treating residents as scenery. Photography follows local etiquette, while food stops and conversations remain natural parts of the walk."],
    moments: [["Read the street pattern", "See how lanes, gates and courtyards organize movement and privacy."], ["Notice ordinary adaptation", "Observe how old structures support contemporary work and family life."], ["Follow neighborhood commerce", "Understand the role of tiny shops, services and food counters."]],
    flow: [["Start at the edge", "Understand how the neighborhood meets the modern city."], ["Move inward slowly", "Shift from public streets to more intimate lanes with care."], ["Pause at useful places", "Use shops, markets and public spaces to explain daily life."], ["End with a wider view", "Connect what you saw to the city's history and current change."]],
    captions: ["Lanes organize both movement and privacy", "Shopfronts keep old districts useful", "Architecture changes through everyday use", "Respect for residents shapes the walk"]
  }, {
    title: "老街区与仍在发生的生活",
    intro: "以步行速度穿过巷道、院落、街边小店和普通日常，读懂一座城市。",
    overview: ["老街区的价值不在于每一面墙都古老，而在于人们仍然怎样使用它。体验会把住宅、排水、遮阴、商业和公共空间放在一起，看清整个街区如何运作。", "路线不会把居民当成风景。拍摄遵守本地礼貌，饮食停留和偶遇交流也保持自然，不刻意制造场面。"],
    moments: [["读懂街巷结构", "看巷道、门楼和院落怎样安排流动与隐私。"], ["观察日常改造", "理解旧建筑如何继续容纳当代工作和家庭生活。"], ["跟随街坊商业", "认识小店、便民服务和食物档口对社区的意义。"]],
    flow: [["从街区边缘进入", "先理解老街区与现代城市怎样连接。"], ["逐步走入内部", "从公共街道慢慢进入更亲密的巷道空间。"], ["在有用的地方停留", "用商店、市场与公共空间解释普通日常。"], ["回到城市全貌", "把所见与城市历史和今天的变化联系起来。"]],
    captions: ["巷道同时组织流动与隐私", "街边小店让老街区继续有用", "建筑在日常使用中不断变化", "尊重居民决定这次步行的方式"]
  }, true),

  theme("fishing-harbor-life", "daily", "4-6 h", "/images/destinations/hainan-tanmen-fishing-port-corrected.png", [
    "/images/destinations/corrected/zhoushan-fishing-coast.png",
    "/images/destinations/optimized/wiki-hong-kong-tai-o-fishing-village.jpg",
    "/images/about-me-boat-seafood.jpg",
    "/images/destinations/jilin-chagan-lake-winter-fishing-corrected.png"
  ], {
    title: "Fishing Harbor and Coastal Life",
    intro: "Follow the working waterfront from boats and nets to auction, kitchen and family table.",
    overview: ["A harbor experience follows labor rather than scenery alone. Tide, weather, landing time and season determine what can be seen, so the day is built around real activity instead of a fixed performance.", "We keep a safe distance from work areas, explain seafood handling and local ecology, and choose meals according to the actual catch rather than a preset menu."],
    moments: [["Read a working harbor", "Understand boats, nets, ice, repair and the timing of landings."], ["Follow the catch", "See how seafood moves from water to sorting, sale and kitchen."], ["Talk about the coast", "Connect livelihoods with weather, conservation and changing communities."]],
    flow: [["Check conditions", "Confirm tide, weather and landing activity before departure."], ["Walk the waterfront", "Observe work zones from safe, respectful positions."], ["Visit the market or kitchen", "Follow what is genuinely available that day."], ["Eat by the season", "Share a simple meal chosen from the current catch."]],
    captions: ["Working harbors follow tide and weather", "The catch moves through many skilled hands", "Boats and repair yards reveal the labor behind seafood", "A seasonal table begins with what arrived today"]
  }, {
    title: "渔港、海岸与渔家生活",
    intro: "从渔船、渔网和靠岸作业，一路跟到交易、厨房与渔家餐桌。",
    overview: ["渔港体验要跟随劳动，而不只是看海。潮汐、天气、靠岸时间和季节决定当天能看到什么，因此路线围绕真实作业安排，不制造固定表演。", "在工作区保持安全和尊重，讲清海鲜处理、地方生态与渔业变化；用餐也根据当天真实渔获选择，而不是提前套一张固定菜单。"],
    moments: [["看懂工作中的港口", "认识船只、渔网、冰鲜、维修和靠岸时间的关系。"], ["跟随一条渔获链", "观察海鲜怎样从水面进入分拣、交易和厨房。"], ["谈海岸生活变化", "把生计与天气、生态保护和社区变化联系起来。"]],
    flow: [["先核对现场条件", "出发前确认潮汐、天气和当天靠岸情况。"], ["沿工作岸线观察", "在安全且不打扰作业的位置了解港口。"], ["进入市场或厨房", "只跟随当天真正出现的渔获与处理过程。"], ["按季节共享一餐", "根据当天上岸的食材安排一顿朴素海味。"]],
    captions: ["工作港口跟随潮汐与天气", "一份渔获要经过许多熟练双手", "船只与维修场呈现海鲜背后的劳动", "季节餐桌从今天真正靠岸的食材开始"]
  }),

  theme("seasonal-festivals", "culture", "Half-full day", "/images/destinations/shandong-weifang-kite-culture-corrected.png", [
    "/images/destinations/optimized/wiki-tianjin-yangliuqing-new-year-painting.jpg",
    "/images/destinations/fujian-meizhou-mazu-temple-clean.png",
    "/images/destinations/optimized/wiki-jiangsu-nanjing-confucius-temple-area.jpg",
    "/images/experience-kaifeng-night-market.jpg"
  ], {
    title: "Seasonal Festivals and Community Traditions",
    intro: "Understand a festival through preparation, belief, food and community participation.",
    overview: ["Festivals are living social occasions, not daily attractions. The most meaningful visit may include preparation, family food, temple etiquette, craft making or the quiet period before a public event.", "Dates and access are confirmed case by case. We explain what is sacred, what is public and when photography should stop, allowing visitors to participate without taking over the occasion."],
    moments: [["See the preparation", "Understand the work and anticipation before the public moment."], ["Learn the meaning", "Connect symbols, food and ritual to community memory."], ["Participate appropriately", "Join public activities while respecting worship and family space."]],
    flow: [["Confirm the calendar", "Verify the real local date and current form of the event."], ["Learn etiquette first", "Know clothing, movement and photography boundaries."], ["Follow the community rhythm", "Observe preparation and public activity without forcing a schedule."], ["Share a seasonal taste", "Use food or craft to continue the story in a quieter setting."]],
    captions: ["Festivals begin long before the public event", "Objects and images carry seasonal meaning", "Public celebration grows from community practice", "Food is often part of ritual and reunion"]
  }, {
    title: "时令节庆与社区传统",
    intro: "从准备、信仰、食物和社区参与理解一个真正的地方节庆。",
    overview: ["节庆是仍在发生的社会生活，不是每天营业的景点。最有意义的部分可能是节前准备、家庭食物、庙宇礼仪、手工作品，或大型活动开始前安静而忙碌的时段。", "日期与进入方式必须逐次确认。我们会讲清哪些属于信仰、哪些对公众开放、什么时候应该停止拍摄，让来访者参与但不占据节庆。"],
    moments: [["看见节前准备", "理解公共活动出现之前的劳动、期待和家庭分工。"], ["读懂节庆含义", "把图案、食物与礼仪和社区记忆联系起来。"], ["以合适方式参与", "在尊重祭祀与家庭空间的前提下加入公共活动。"]],
    flow: [["先核实真实日历", "确认当地实际日期以及这一年活动的具体形式。"], ["提前理解礼仪", "清楚服装、行走路线和拍摄边界。"], ["跟随社区节奏", "观察准备和公共活动，不用游客时间表强行切割。"], ["以时令味道延续", "在更安静的环境里用食物或手作继续理解节庆。"]],
    captions: ["节庆从公共活动开始前就已发生", "器物与图案承载季节含义", "公开庆典来自长期社区实践", "食物常常连接礼仪与团聚"]
  }),

  theme("wellness-and-slow-living", "wellness", "Half-full day", "/images/travel-planning/featured/wellness-medical-assessment.jpg", [
    "/images/travel-planning/featured/wellness-taiji.jpg",
    "/images/destinations/guangxi-bama-longevity-villages-clean.png",
    "/images/travel-planning/featured/wellness-hainan-food.jpg",
    "/images/destinations/optimized/wiki-sichuan-chengdu-teahouses.jpg"
  ], {
    title: "Wellness, Balance and Slow Living",
    intro: "Explore everyday Chinese approaches to movement, rest, food and seasonal balance.",
    overview: ["This is a cultural wellness experience, not a promise of medical treatment. Depending on interest, the day can combine gentle movement, tea, seasonal food, a traditional wellness consultation or time in nature.", "Any medical or therapeutic service is delivered only by an appropriate licensed provider. Pace, mobility and health considerations are discussed before the program is confirmed."],
    moments: [["Move gently", "Try accessible breathing, stretching or slow movement with guidance."], ["Eat with the season", "Understand balance through ordinary ingredients and cooking choices."], ["Create room to rest", "Use tea, nature and a quieter schedule as part of the experience."]],
    flow: [["Discuss your needs", "Separate cultural curiosity from any genuine health concern."], ["Begin with light movement", "Choose an accessible practice suited to the group."], ["Add food or consultation", "Select an appropriate cultural or professional module."], ["Protect unstructured time", "Leave space to rest rather than filling every hour."]],
    captions: ["Professional services require appropriate providers", "Gentle movement can be culturally informative", "Seasonal food is part of daily balance", "Tea and quiet time slow the rhythm of travel"]
  }, {
    title: "中式康养、平衡与慢生活",
    intro: "从运动、休息、饮食和顺应季节，理解中国日常生活里的康养观念。",
    overview: ["这是文化康养体验，不承诺医疗效果。根据兴趣，一天可以组合舒缓运动、茶事、时令饮食、传统康养咨询或自然环境中的安静时间。", "任何医疗或治疗性服务只由具备相应资质的专业人员提供。正式确认前会沟通节奏、行动能力和需要注意的健康状况。"],
    moments: [["温和地活动身体", "在指导下体验容易参与的呼吸、拉伸或慢运动。"], ["按照季节吃饭", "从普通食材和烹饪选择理解日常平衡。"], ["真正留出休息", "把茶、自然与较慢日程本身视为体验的一部分。"]],
    flow: [["先沟通真实需求", "区分文化好奇与确实需要专业处理的健康问题。"], ["从轻柔活动开始", "选择适合同行者状态的可参与练习。"], ["组合饮食或咨询", "按需要加入合适的文化模块或专业服务。"], ["保护没有安排的时间", "主动留白休息，而不是把每小时都填满。"]],
    captions: ["专业服务必须由合适资质人员提供", "舒缓运动也是理解文化的入口", "时令饮食构成日常平衡", "茶与安静时间让旅行慢下来"]
  }, true),

  theme("ethnic-community-culture", "culture", "Full day", "/images/destinations/hainan-binglanggu-li-miao-culture-corrected.png", [
    "/images/destinations/optimized/wiki-guizhou-xijiang-miao-village.jpg",
    "/images/destinations/optimized/wiki-guizhou-zhaoxing-dong-village.jpg",
    "/images/experience-miao-craft.jpg",
    "/images/experience-western-sichuan-danba-real.jpg"
  ], {
    title: "Ethnic Communities and Living Heritage",
    intro: "Meet China's cultural diversity through language, homes, craft, food and contemporary community life.",
    overview: ["The experience avoids reducing a community to costumes or performances. We look at language, architecture, farming, belief, craft and the choices younger generations are making today.", "Visits are arranged with local partners, photography is permission-based and purchasing is transparent. The aim is respectful exchange, not collecting exotic images."],
    moments: [["Listen before labeling", "Learn how people describe their own identity and community."], ["Read homes and land", "Connect architecture and farming to climate, family and belief."], ["Meet living makers", "Understand craft as skill, income and cultural memory."]],
    flow: [["Prepare cultural context", "Begin with history, vocabulary and respectful expectations."], ["Enter through daily space", "Walk homes, fields or public areas without staging encounters."], ["Focus on one tradition", "Spend real time with a craft, meal, song or building practice."], ["Exchange and support", "Ask questions carefully and purchase directly when appropriate."]],
    captions: ["Community identity is larger than costume", "Architecture responds to climate and family life", "Craft carries both memory and income", "Respectful exchange begins with permission"]
  }, {
    title: "多民族社区与活态文化",
    intro: "从语言、民居、手艺、饮食和当代社区生活，理解中国丰富的文化多样性。",
    overview: ["体验避免把一个社区简化成服饰或表演。我们会把语言、建筑、农耕、信仰、手艺，以及年轻一代今天正在做的选择放在一起理解。", "走访通过当地合作伙伴安排，拍摄必须先获得同意，消费与购买保持透明。目标是有分寸的交流，而不是收集猎奇画面。"],
    moments: [["先倾听再定义", "了解当地人怎样描述自己的身份与社区。"], ["读懂民居与土地", "把建筑和农耕与气候、家庭和信仰联系起来。"], ["认识仍在工作的手艺人", "理解手艺同时也是技能、收入和文化记忆。"]],
    flow: [["提前建立文化背景", "从历史、称谓和彼此尊重的预期开始。"], ["从日常空间进入", "走过民居、田地或公共区域，不制造表演式偶遇。"], ["深入一项传统", "真正花时间理解手艺、饮食、歌唱或建造方式。"], ["交流并合理支持", "谨慎提问，在合适时直接支持当地生产者。"]],
    captions: ["社区身份远不止一套服饰", "建筑回应气候与家庭生活", "手艺同时承载记忆和收入", "有分寸的交流从获得同意开始"]
  }),

  theme("architecture-walk", "culture", "3-5 h", "/images/destinations/optimized/wiki-guangdong-kaiping-diaolou.jpg", [
    "/images/destinations/optimized/wiki-shanghai-shikumen-lanes.jpg",
    "/images/destinations/optimized/wiki-shanxi-qiao-family-courtyard.jpg",
    "/images/destinations/optimized/wiki-guangdong-foshan-ancestral-temple.jpg",
    "/images/destinations/optimized/wiki-shandong-qingdao-old-town.jpg"
  ], {
    title: "Architecture, Streets and Urban Memory",
    intro: "Learn to read buildings as evidence of climate, trade, family life and social change.",
    overview: ["This is architecture at street level, without requiring specialist knowledge. Facades, courtyards, arcades, materials and street proportions become clues to how people lived and how the city changed.", "The route balances landmark structures with ordinary buildings. Old and contemporary layers are compared so preservation is discussed as a living urban question, not nostalgia alone."],
    moments: [["Read a facade", "Use material, openings and decoration to identify function and influence."], ["Understand the plan", "See how courtyards, lanes and thresholds organize social life."], ["Compare urban layers", "Notice repair, reuse, demolition and new construction side by side."]],
    flow: [["Set the historical frame", "Begin with a simple map of time, trade and city growth."], ["Study one building closely", "Learn a repeatable way to observe architecture."], ["Walk the surrounding fabric", "Compare landmark and everyday structures."], ["Discuss change", "End with current questions of use, memory and preservation."]],
    captions: ["Buildings record exchange and migration", "Courtyards organize family and social life", "Public architecture expresses community values", "Old streets continue to absorb new uses"]
  }, {
    title: "建筑、街道与城市记忆",
    intro: "把建筑当作气候、商贸、家庭生活和社会变化留下的证据来阅读。",
    overview: ["这是街道尺度的建筑体验，不要求专业知识。立面、院落、骑楼、材料与街道比例都会成为线索，帮助理解过去的人怎样生活，城市又怎样一步步改变。", "路线同时关注代表建筑与普通民居，并把传统与当代层次放在一起比较，让保护成为正在发生的城市问题，而不是只有怀旧。"],
    moments: [["学会读一面立面", "从材料、开口和装饰判断功能与外来影响。"], ["理解空间布局", "看院落、巷道和门槛怎样组织社会生活。"], ["比较城市不同层次", "同时观察修缮、再利用、拆除和新建。"]],
    flow: [["先建立历史框架", "用简单时间线理解商贸和城市扩展。"], ["细看一栋建筑", "学会一套以后也能使用的观察方法。"], ["走入周边街区", "比较代表建筑与普通结构。"], ["讨论今天的变化", "以使用、记忆与保护的现实问题收尾。"]],
    captions: ["建筑记录交流与人口迁徙", "院落组织家庭和社会生活", "公共建筑表达社区价值", "老街道仍在吸收新的使用方式"]
  }),

  theme("local-sports-and-play", "wellness", "2-4 h", "/images/travel-planning/featured/wellness-taiji.jpg", [
    "/images/destinations/henan-chenjiagou-taiji-village-clean.png",
    "/images/destinations/shandong-weifang-kite-culture-corrected.png",
    "/images/experience-wuhan-east-lake-real.jpg",
    "/images/destinations/optimized/wiki-hong-kong-dragon-back-trail.jpg"
  ], {
    title: "Local Sports, Movement and Play",
    intro: "Join everyday movement through tai chi, walking, cycling, kites or neighborhood games.",
    overview: ["Movement offers an easy way to meet people without forcing conversation. The exact activity is chosen for the group's ability, the weather and what local residents genuinely practice in that place.", "This is participation, not a competitive class. Equipment and safety are confirmed in advance, and observation remains a valid choice at every stage."],
    moments: [["Learn the local rhythm", "Understand when, where and why people gather to move."], ["Try an accessible skill", "Practice one simple technique with patient guidance."], ["Share public space", "Experience how movement creates informal community."]],
    flow: [["Check comfort and ability", "Choose an activity that suits the whole group."], ["Watch a demonstration", "Understand safety, etiquette and basic form."], ["Practice in short rounds", "Build confidence without turning the experience into a test."], ["Cool down together", "Finish with tea, a walk or local conversation."]],
    captions: ["Slow movement makes participation accessible", "Outdoor play links skill with local landscape", "Public exercise builds informal community", "Routes are adapted to comfort and weather"]
  }, {
    title: "本地运动、身体与游戏",
    intro: "通过太极、步行、骑行、风筝或街坊游戏，加入中国人的日常运动。",
    overview: ["身体活动让人与人自然相遇，不必强行制造对话。具体项目根据同行者能力、当天天气和当地居民真正进行的活动来选择。", "这是轻松参与，而不是竞技课程。器材和安全会提前确认，任何阶段都可以只观察、不勉强加入。"],
    moments: [["理解本地运动节奏", "认识人们为什么在特定时间和空间聚集活动。"], ["尝试一个容易上手的技巧", "在耐心引导下练习一项简单动作。"], ["体验共享公共空间", "看运动怎样自然形成松散而真实的社区。"]],
    flow: [["先确认舒适度与能力", "选择全组都能安全参与的活动。"], ["观看清楚示范", "先理解安全、礼貌与基础动作。"], ["分成短轮次练习", "逐步建立信心，不把体验变成考试。"], ["一起放松收尾", "用茶、散步或本地交流结束。"]],
    captions: ["慢运动让更多人容易参与", "户外游戏把技巧与地方环境相连", "公共锻炼形成自然社区", "路线根据舒适度和天气调整"]
  })
];

const international: Record<Exclude<Lang, "en" | "zh-CN" | "zh-TW">, Record<string, [string, string, string]>> = {
  es: {
    "village-life": ["Vida rural y pueblos estacionales", "Entra en un día de pueblo marcado por los campos, los patios, el agua y la estación.", "Una visita respetuosa a una comunidad viva para comprender paisaje, vivienda, trabajo estacional y mesa familiar, sin convertir la vida cotidiana en espectáculo."],
    "night-food-tour": ["Comida nocturna y sabor callejero", "Prueba la ciudad de noche entre puestos fiables, pequeños locales e historias del barrio.", "Las degustaciones siguen una secuencia de sabores y porciones compartidas, con contexto sobre ingredientes, técnicas y costumbres locales."],
    "local-market-walk": ["Mercado local y despensa cotidiana", "Lee la vida diaria a través del producto de temporada, los vendedores y la compra familiar.", "Aprende a reconocer ingredientes, hábitos domésticos y especialidades regionales en un mercado que funciona para sus vecinos."],
    "craft-and-culture": ["Artesanía viva y talleres", "Entra en un taller real y comprende la tradición a través de materiales, herramientas y manos expertas.", "Observa el proceso completo, conversa con el artesano y realiza un paso sencillo sin presentar una técnica compleja como una actividad superficial."],
    "local-family-cooking": ["Cocina familiar y mesa compartida", "Cocina lo que una familia realmente come y comparte después la mesa.", "El menú nace de la estación y de una comida equilibrada: comprar, preparar varios platos y conversar alrededor de una mesa cotidiana."],
    "tea-village-experience": ["Paisaje del té y oficio estacional", "Camina por el paisaje de cultivo, conoce al productor y prueba cómo la estación transforma la taza.", "Relaciona terreno, clima, variedad y elaboración mediante un paseo, una demostración posible y una cata comparativa."],
    "private-ride": ["Viaje panorámico privado por carretera", "Haz que la carretera forme parte de la experiencia con vehículo privado y paradas flexibles.", "La ruta equilibra distancia, luz, clima y descanso; las pequeñas paradas reciben tanta atención como los grandes paisajes."],
    "custom-day": ["Un día local diseñado para ti", "Parte de tus intereses y energía para crear un día coherente, no una lista.", "Combinamos menos paradas con una historia clara y alternativas realistas para el clima, el ritmo y los descubrimientos espontáneos."],
    "morning-park-life": ["Parque matinal y vida comunitaria", "Mira cómo despierta la ciudad entre ejercicio, música, conversación y desayuno.", "Observa primero la etiqueta del parque, participa solo cuando sea apropiado y termina con un desayuno cotidiano del vecindario."],
    "breakfast-culture": ["Cultura del desayuno chino", "Empieza temprano con los alimentos que sostienen el trabajo y las rutinas familiares.", "Compara pequeñas porciones, cereales, texturas y formas de pedir para entender por qué el primer alimento del día cambia tanto entre regiones."],
    "old-neighborhood-life": ["Barrios antiguos y calles vivas", "Lee la ciudad a pie entre callejones, patios, tiendas y rutinas diarias.", "Vivienda, sombra, drenaje, comercio y espacio público explican cómo un barrio histórico sigue funcionando para sus residentes."],
    "fishing-harbor-life": ["Puerto pesquero y vida costera", "Sigue el frente marítimo de trabajo desde las barcas y redes hasta la cocina.", "La marea, el clima y la captura real deciden el día; se observan las labores con distancia segura y se come según la temporada."],
    "seasonal-festivals": ["Fiestas estacionales y tradiciones comunitarias", "Comprende una fiesta a través de su preparación, creencias, comida y comunidad.", "Confirmamos fechas reales y límites de acceso para participar con respeto en una ocasión viva, no en una atracción diaria."],
    "wellness-and-slow-living": ["Bienestar, equilibrio y vida pausada", "Explora ideas cotidianas chinas sobre movimiento, descanso, comida y estación.", "Es una experiencia cultural, no una promesa médica; cualquier servicio profesional se realiza únicamente con proveedores cualificados."],
    "ethnic-community-culture": ["Comunidades étnicas y patrimonio vivo", "Conoce la diversidad cultural a través de lengua, vivienda, artesanía, comida y vida actual.", "La visita evita reducir una comunidad a trajes o espectáculos y se basa en permiso, colaboración local e intercambio respetuoso."],
    "architecture-walk": ["Arquitectura, calles y memoria urbana", "Lee los edificios como pruebas del clima, el comercio, la familia y el cambio social.", "Fachadas, patios, materiales y proporciones urbanas permiten comprender la ciudad sin requerir conocimientos especializados."],
    "local-sports-and-play": ["Deporte local, movimiento y juego", "Participa en movimientos cotidianos, caminatas, cometas o juegos de barrio.", "La actividad se adapta a capacidad y clima, con seguridad, demostración paciente y libertad para observar en cualquier momento."]
  },
  pt: {},
  ar: {}
};

international.pt = Object.fromEntries(Object.entries(international.es).map(([slug, value]) => [slug, [
  value[0].replace("Vida rural y pueblos estacionales", "Vida rural e vilas sazonais").replace("Comida nocturna y sabor callejero", "Comida noturna e sabores de rua").replace("Mercado local y despensa cotidiana", "Mercado local e despensa cotidiana").replace("Artesanía viva y talleres", "Artesanato vivo e oficinas").replace("Cocina familiar y mesa compartida", "Cozinha familiar e mesa compartilhada").replace("Paisaje del té y oficio estacional", "Paisagem do chá e ofício sazonal").replace("Viaje panorámico privado por carretera", "Viagem panorâmica privada").replace("Un día local diseñado para ti", "Um dia local feito para você").replace("Parque matinal y vida comunitaria", "Parque matinal e vida comunitária").replace("Cultura del desayuno chino", "Cultura do café da manhã chinês").replace("Barrios antiguos y calles vivas", "Bairros antigos e ruas vivas").replace("Puerto pesquero y vida costera", "Porto pesqueiro e vida costeira").replace("Fiestas estacionales y tradiciones comunitarias", "Festas sazonais e tradições comunitárias").replace("Bienestar, equilibrio y vida pausada", "Bem-estar, equilíbrio e vida tranquila").replace("Comunidades étnicas y patrimonio vivo", "Comunidades étnicas e patrimônio vivo").replace("Arquitectura, calles y memoria urbana", "Arquitetura, ruas e memória urbana").replace("Deporte local, movimiento y juego", "Esporte local, movimento e brincadeira"),
  "Uma experiência privada, cuidadosa e flexível, construída em torno da vida local e do ritmo real do dia.",
  "O conteúdo combina observação, contexto e participação adequada, sem transformar a vida cotidiana em espetáculo."
]])) as Record<string, [string, string, string]>;

const arabicTitles: Record<string, string> = {
  "village-life": "الحياة الريفية والقرى الموسمية",
  "night-food-tour": "طعام الليل ونكهات الشارع",
  "local-market-walk": "السوق المحلي ومؤونة البيت اليومية",
  "craft-and-culture": "الحرف الحية وورش الصناع",
  "local-family-cooking": "مطبخ العائلة والمائدة المشتركة",
  "tea-village-experience": "مناظر الشاي وحرفته الموسمية",
  "private-ride": "رحلة طريق خاصة بين المناظر الطبيعية",
  "custom-day": "يوم محلي مصمم حولك",
  "morning-park-life": "حديقة الصباح وحياة المجتمع",
  "breakfast-culture": "ثقافة الإفطار الصيني",
  "old-neighborhood-life": "الأحياء القديمة والشوارع الحية",
  "fishing-harbor-life": "ميناء الصيد والحياة الساحلية",
  "seasonal-festivals": "المهرجانات الموسمية وتقاليد المجتمع",
  "wellness-and-slow-living": "العافية والتوازن والحياة الهادئة",
  "ethnic-community-culture": "المجتمعات العرقية والتراث الحي",
  "architecture-walk": "العمارة والشوارع وذاكرة المدينة",
  "local-sports-and-play": "الرياضة المحلية والحركة واللعب"
};

international.ar = Object.fromEntries(experienceThemes.map((item) => [item.slug, [
  arabicTitles[item.slug],
  "تجربة خاصة هادئة تركز على الحياة المحلية والسياق الحقيقي وإيقاع مريح.",
  "يجمع البرنامج بين الملاحظة والشرح والمشاركة المناسبة، مع احترام الناس والمكان والظروف الفعلية لذلك اليوم."
]])) as Record<string, [string, string, string]>;

const categoryExperience: Record<Lang, Record<ExperienceThemeCategory, [string, string][]>> = {
  en: {
    daily: [["Observe with context", "Understand how ordinary spaces and routines actually work."], ["Meet people respectfully", "Conversation is natural, permission-based and never staged."], ["Follow the day's rhythm", "Timing responds to work, weather and local life."]],
    food: [["Taste in context", "Connect flavor with ingredients, season and household habits."], ["Watch real preparation", "Learn from cooks, vendors and working counters."], ["Share, compare and talk", "Small portions leave room for understanding."]],
    craft: [["Read materials", "Understand preparation before the finished object."], ["Watch practiced hands", "See the decisions that take years to learn."], ["Try one honest step", "Participate at a realistic and respectful level."]],
    culture: [["Build the background", "Start with clear history and contemporary context."], ["Read the real setting", "Connect buildings, objects and people."], ["Participate with care", "Respect belief, privacy and community boundaries."]],
    wellness: [["Move comfortably", "Choose an accessible level suited to the group."], ["Understand daily balance", "Connect movement, food, rest and season."], ["Keep room to breathe", "A slower schedule is part of the experience."]],
    journey: [["Design a clear thread", "Choose fewer, better connected experiences."], ["Travel at a human pace", "Balance movement, stops and rest."], ["Stay flexible", "Respond to weather, energy and discovery."]]
  },
  "zh-CN": {} as Record<ExperienceThemeCategory, [string, string][]>,
  "zh-TW": {} as Record<ExperienceThemeCategory, [string, string][]>,
  es: {} as Record<ExperienceThemeCategory, [string, string][]>,
  pt: {} as Record<ExperienceThemeCategory, [string, string][]>,
  ar: {} as Record<ExperienceThemeCategory, [string, string][]>
};

categoryExperience.es = {
  daily: [["Observar con contexto", "Comprende cómo funcionan los espacios y rutinas cotidianas."], ["Encuentros respetuosos", "La conversación es natural y nunca preparada."], ["Seguir el ritmo local", "El horario responde al trabajo, clima y vida real."]],
  food: [["Probar con contexto", "Relaciona sabor, ingredientes, estación y hábitos."], ["Ver la preparación real", "Aprende de cocineros, vendedores y puestos activos."], ["Compartir y comparar", "Porciones pequeñas dejan espacio para comprender."]],
  craft: [["Leer los materiales", "Comprende la preparación antes del objeto final."], ["Observar manos expertas", "Ve decisiones que requieren años de práctica."], ["Probar un paso real", "Participa a un nivel honesto y respetuoso."]],
  culture: [["Crear contexto", "Empieza con historia clara y realidad actual."], ["Leer el escenario", "Conecta edificios, objetos y personas."], ["Participar con cuidado", "Respeta creencias, privacidad y límites comunitarios."]],
  wellness: [["Moverse con comodidad", "Elige un nivel accesible para el grupo."], ["Comprender el equilibrio", "Relaciona movimiento, comida, descanso y estación."], ["Dejar espacio", "Un horario más lento forma parte de la experiencia."]],
  journey: [["Diseñar un hilo claro", "Elige menos experiencias y mejor conectadas."], ["Viajar a ritmo humano", "Equilibra movimiento, paradas y descanso."], ["Mantener flexibilidad", "Responde al clima, energía y descubrimientos."]]
};
categoryExperience.pt = {
  daily: [["Observar com contexto", "Entenda como espaços e rotinas realmente funcionam."], ["Encontrar com respeito", "A conversa é natural e nunca encenada."], ["Seguir o ritmo local", "O horário responde ao trabalho, clima e vida real."]],
  food: [["Provar com contexto", "Ligue sabor, ingredientes, estação e hábitos."], ["Ver o preparo real", "Aprenda com cozinheiros, vendedores e bancas ativas."], ["Compartilhar e comparar", "Pequenas porções deixam espaço para compreender."]],
  craft: [["Conhecer os materiais", "Entenda o preparo antes da peça final."], ["Observar mãos experientes", "Veja decisões que levam anos para aprender."], ["Experimentar uma etapa", "Participe em um nível honesto e respeitoso."]],
  culture: [["Criar contexto", "Comece com história clara e realidade atual."], ["Ler o cenário", "Conecte edifícios, objetos e pessoas."], ["Participar com cuidado", "Respeite crença, privacidade e limites comunitários."]],
  wellness: [["Mover-se com conforto", "Escolha um nível acessível para o grupo."], ["Entender o equilíbrio", "Conecte movimento, comida, descanso e estação."], ["Deixar espaço", "Um ritmo mais lento faz parte da experiência."]],
  journey: [["Criar um fio claro", "Escolha menos experiências e melhor conectadas."], ["Viajar em ritmo humano", "Equilibre deslocamento, paradas e descanso."], ["Manter flexibilidade", "Responda ao clima, energia e descobertas."]]
};
categoryExperience.ar = {
  daily: [["الملاحظة مع سياق", "افهم كيف تعمل الأماكن والعادات اليومية."], ["لقاءات باحترام", "الحوار طبيعي وغير مصطنع."], ["اتباع الإيقاع المحلي", "يتكيف الوقت مع العمل والطقس والحياة الفعلية."]],
  food: [["التذوق مع فهم", "اربط النكهة بالمكونات والموسم والعادات."], ["مشاهدة التحضير الحقيقي", "تعلم من الطهاة والباعة وأماكن العمل."], ["المشاركة والمقارنة", "الحصص الصغيرة تترك مساحة للفهم."]],
  craft: [["فهم المواد", "تعرف على التحضير قبل القطعة النهائية."], ["مشاهدة الأيدي الخبيرة", "لاحظ قرارات تحتاج سنوات من الخبرة."], ["تجربة خطوة حقيقية", "شارك بمستوى واقعي ومحترم."]],
  culture: [["بناء الخلفية", "ابدأ بتاريخ واضح وسياق معاصر."], ["قراءة المكان", "اربط المباني والأشياء والناس."], ["المشاركة بعناية", "احترم المعتقد والخصوصية وحدود المجتمع."]],
  wellness: [["حركة مريحة", "اختر مستوى مناسبًا للمجموعة."], ["فهم التوازن اليومي", "اربط الحركة والطعام والراحة والموسم."], ["ترك مساحة للراحة", "الإيقاع الهادئ جزء من التجربة."]],
  journey: [["تصميم فكرة واضحة", "اختر تجارب أقل وأكثر ترابطًا."], ["السفر بإيقاع إنساني", "وازن بين الحركة والتوقف والراحة."], ["الحفاظ على المرونة", "استجب للطقس والطاقة والاكتشاف."]]
};
categoryExperience["zh-CN"] = {
  daily: [["带着背景观察", "理解普通空间和日常习惯怎样真实运行。"], ["有分寸地交流", "所有对话自然发生，并尊重对方意愿。"], ["跟随当天节奏", "时间根据劳动、天气与本地生活调整。"]],
  food: [["在背景中品尝", "把味道与食材、季节和家庭习惯联系起来。"], ["观看真实制作", "向厨师、摊主和正在工作的档口学习。"], ["共享、比较、交流", "小份品尝为真正理解留出空间。"]],
  craft: [["认识材料", "在看成品之前先理解准备过程。"], ["观察熟练双手", "看清需要多年经验才能形成的判断。"], ["尝试真实一步", "以合理而尊重的方式参与。"]],
  culture: [["建立背景", "从清晰历史和当代现实开始。"], ["读懂现场", "把建筑、器物与人连接起来。"], ["谨慎参与", "尊重信仰、隐私与社区边界。"]],
  wellness: [["舒适地活动", "选择适合同行者的参与程度。"], ["理解日常平衡", "把运动、饮食、休息与季节联系起来。"], ["为身体留白", "较慢的日程本身就是体验。"]],
  journey: [["设计清晰主线", "选择更少但连接更好的内容。"], ["按人的节奏移动", "平衡行走、停留和休息。"], ["保持灵活", "顺应天气、体力与临时发现。"]]
} as Record<ExperienceThemeCategory, [string, string][]>;
categoryExperience["zh-TW"] = Object.fromEntries(Object.entries(categoryExperience["zh-CN"]).map(([key, rows]) => [key, rows.map(([title, body]) => [toTraditionalChinese(title), toTraditionalChinese(body)])])) as Record<ExperienceThemeCategory, [string, string][]>;

export const experienceUi: Record<Lang, {
  eyebrow: string; title: string; intro: string; all: string; filters: Record<ExperienceThemeCategory, string>;
  explore: string; duration: string; story: string; moments: string; flow: string; gallery: string;
  practical: string; private: string; flexible: string; respectful: string; plan: string; related: string; back: string;
}> = {
  en: { eyebrow: "Local experiences, designed with care", title: "Choose how you want to meet China.", intro: "Browse food, neighborhood, craft, culture, wellness and road experiences. Every theme can be adapted to your pace and woven into a longer journey.", all: "All experiences", filters: { daily: "Daily life", food: "Food", craft: "Craft & tea", culture: "Culture", wellness: "Wellness & play", journey: "Private journeys" }, explore: "Explore the experience", duration: "Typical duration", story: "What this experience is really about", moments: "What you will experience", flow: "How the experience unfolds", gallery: "Inside the experience", practical: "Designed around real life", private: "Private, small group", flexible: "Flexible to the day", respectful: "Respectful local access", plan: "Plan this experience", related: "More ways into local life", back: "All experiences" },
  "zh-CN": { eyebrow: "认真设计的本地体验", title: "选择你想怎样认识中国。", intro: "从饮食、街区、手艺、文化、康养到公路旅行，每个主题都可以按你的节奏调整，也可以组合进更长的旅行计划。", all: "全部体验", filters: { daily: "日常生活", food: "地方饮食", craft: "手艺与茶", culture: "文化与建筑", wellness: "康养与运动", journey: "私人旅程" }, explore: "查看体验内容", duration: "参考时长", story: "这个体验真正要理解什么", moments: "你会经历什么", flow: "体验怎样展开", gallery: "体验中的真实场景", practical: "围绕真实生活来设计", private: "私人小团", flexible: "根据当天灵活调整", respectful: "尊重当地人与空间", plan: "沟通并设计这个体验", related: "更多认识本地生活的方式", back: "返回全部体验" },
  "zh-TW": {} as never,
  es: { eyebrow: "Experiencias locales diseñadas con cuidado", title: "Elige cómo quieres conocer China.", intro: "Comida, barrios, artesanía, cultura, bienestar y carretera: cada tema se adapta a tu ritmo y puede formar parte de un viaje más largo.", all: "Todas", filters: { daily: "Vida cotidiana", food: "Comida", craft: "Artesanía y té", culture: "Cultura", wellness: "Bienestar", journey: "Viajes privados" }, explore: "Ver la experiencia", duration: "Duración habitual", story: "De qué trata realmente", moments: "Lo que vivirás", flow: "Cómo se desarrolla", gallery: "Dentro de la experiencia", practical: "Diseñada alrededor de la vida real", private: "Privada, grupo pequeño", flexible: "Flexible según el día", respectful: "Acceso local respetuoso", plan: "Planear esta experiencia", related: "Más formas de conocer la vida local", back: "Todas las experiencias" },
  pt: { eyebrow: "Experiências locais pensadas com cuidado", title: "Escolha como você quer conhecer a China.", intro: "Comida, bairros, artesanato, cultura, bem-estar e estrada: cada tema se adapta ao seu ritmo e pode integrar uma viagem maior.", all: "Todas", filters: { daily: "Vida cotidiana", food: "Comida", craft: "Artesanato e chá", culture: "Cultura", wellness: "Bem-estar", journey: "Viagens privadas" }, explore: "Ver experiência", duration: "Duração típica", story: "O que esta experiência realmente significa", moments: "O que você vai viver", flow: "Como a experiência acontece", gallery: "Dentro da experiência", practical: "Criada em torno da vida real", private: "Privada, grupo pequeno", flexible: "Flexível conforme o dia", respectful: "Acesso local respeitoso", plan: "Planejar esta experiência", related: "Mais formas de conhecer a vida local", back: "Todas as experiências" },
  ar: { eyebrow: "تجارب محلية مصممة بعناية", title: "اختر كيف تريد أن تتعرف إلى الصين.", intro: "الطعام والأحياء والحرف والثقافة والعافية والطرق: كل موضوع يتكيف مع إيقاعك ويمكن دمجه في رحلة أطول.", all: "كل التجارب", filters: { daily: "الحياة اليومية", food: "الطعام", craft: "الحرف والشاي", culture: "الثقافة", wellness: "العافية والحركة", journey: "رحلات خاصة" }, explore: "استكشف التجربة", duration: "المدة المعتادة", story: "المعنى الحقيقي للتجربة", moments: "ما ستعيشه", flow: "كيف تتطور التجربة", gallery: "داخل التجربة", practical: "مصممة حول الحياة الواقعية", private: "خاصة ومجموعة صغيرة", flexible: "مرنة حسب اليوم", respectful: "دخول محلي باحترام", plan: "خطط لهذه التجربة", related: "طرق أخرى لفهم الحياة المحلية", back: "كل التجارب" }
};

experienceUi["zh-TW"] = JSON.parse(JSON.stringify(experienceUi["zh-CN"]), (_key, value) => typeof value === "string" ? toTraditionalChinese(value) : value);

export function getExperienceTheme(slug: string) {
  return experienceThemes.find((item) => item.slug === slug);
}

export function getExperienceDuration(lang: Lang, duration: string) {
  if (lang === "en") return duration;
  const hourMatch = duration.match(/^(\d+)-(\d+) h$/);
  if (hourMatch) {
    const range = `${hourMatch[1]}-${hourMatch[2]}`;
    if (lang === "zh-CN") return `${range}小时`;
    if (lang === "zh-TW") return `${range}小時`;
    if (lang === "es") return `${range} h`;
    if (lang === "pt") return `${range} h`;
    return `${range} ساعات`;
  }
  const values: Record<string, Record<Exclude<Lang, "en">, string>> = {
    "1-8 days": { "zh-CN": "1-8天", "zh-TW": "1-8天", es: "1-8 días", pt: "1-8 dias", ar: "1-8 أيام" },
    Flexible: { "zh-CN": "灵活安排", "zh-TW": "彈性安排", es: "Flexible", pt: "Flexível", ar: "مرن" },
    "Half-full day": { "zh-CN": "半日至一日", "zh-TW": "半日至一日", es: "Medio día o día completo", pt: "Meio dia ou dia inteiro", ar: "نصف يوم أو يوم كامل" },
    "Full day": { "zh-CN": "一日", "zh-TW": "一日", es: "Día completo", pt: "Dia inteiro", ar: "يوم كامل" }
  };
  return values[duration]?.[lang] ?? duration;
}

export function getExperienceThemeCopy(lang: Lang, item: ExperienceTheme): ThemeLanguageCopy {
  if (lang === "en") return item.en;
  if (lang === "zh-CN") return item.zh;
  if (lang === "zh-TW") {
    return JSON.parse(JSON.stringify(item.zh), (_key, value) => typeof value === "string" ? toTraditionalChinese(value) : value);
  }
  const [title, intro, overview] = international[lang][item.slug];
  const moments = categoryExperience[lang][item.category];
  const flowLabels: Record<Exclude<Lang, "en" | "zh-CN" | "zh-TW">, string[]> = {
    es: ["Preparar", "Observar", "Participar", "Reflexionar"],
    pt: ["Preparar", "Observar", "Participar", "Refletir"],
    ar: ["التحضير", "الملاحظة", "المشاركة", "التأمل"]
  };
  const flowBodies: Record<Exclude<Lang, "en" | "zh-CN" | "zh-TW">, string[]> = {
    es: ["Acordamos ritmo, intereses y límites antes de empezar.", "Primero entendemos el lugar y su contexto real.", "Nos unimos solo de una forma apropiada para las personas y el momento.", "Terminamos con tiempo para preguntas y recomendaciones personales."],
    pt: ["Combinamos ritmo, interesses e limites antes de começar.", "Primeiro entendemos o lugar e seu contexto real.", "Participamos apenas de forma adequada às pessoas e ao momento.", "Terminamos com tempo para perguntas e recomendações pessoais."],
    ar: ["نتفق على الإيقاع والاهتمامات والحدود قبل البداية.", "نفهم المكان وسياقه الحقيقي أولًا.", "نشارك فقط بالطريقة المناسبة للناس واللحظة.", "ننهي بوقت للأسئلة والتوصيات الشخصية."]
  };
  return {
    title,
    intro,
    overview: [overview, intro],
    moments,
    flow: flowLabels[lang].map((label, index) => [label, flowBodies[lang][index]] as [string, string]),
    captions: Array.from({ length: item.gallery.length }, () => title)
  };
}
