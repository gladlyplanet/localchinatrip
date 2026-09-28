"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { breadcrumbSchema } from "@/lib/seo";
import { getSiteCopy } from "@/lib/site-copy";

type AboutDetails = {
  storyTitle: string;
  story: string[];
  photosTitle: string;
  captions: string[];
  closing: string;
  brandLine: string;
  ctaBody: string;
};

const aboutDetails: Record<Lang, AboutDetails> = {
  en: {
    storyTitle: "Local experience, shaped around you",
    story: [
      "Our team brings experience in itinerary planning, local coordination, transport, hosting and cross-cultural communication.",
      "From route design, transport connections, reservations and payments to local experiences and changes along the way, we want traveling in China to feel simpler, smoother and less stressful.",
      "We do not copy the same itinerary for everyone. Each journey is adjusted around the traveler's interests, age, pace and preferred way of traveling.",
      "Some guests come for history or food; others are drawn to technology, tea culture, traditional crafts or simply want to see how an ordinary day unfolds in China."
    ],
    photosTitle: "Real guests. Real moments in China.",
    captions: [
      "At the places people come to China to see — with more context, more conversation and a more personal pace.",
      "A shared meal can say as much about a place as any landmark.",
      "Some of the best travel moments happen around a local table.",
      "Unhurried days leave room for the places and conversations that happen naturally.",
      "Travel becomes more meaningful when it leads to real connection.",
      "Local life can begin with a boat ride, a market visit or a meal close to its source.",
      "From private travel to international visits, local hosting makes unfamiliar places easier to navigate.",
      "Small, everyday encounters often become the memories people carry home."
    ],
    closing: "We like to bring classic sights and local life into the same journey. A morning might begin at a world-famous monument; the afternoon might lead to an ordinary neighbourhood, a cup of tea, a market or a place that was never in the original plan.",
    brandLine: "Tourist China is interesting. Local China is what stays with you.",
    ctaBody: "We are not trying to help you ‘see all of China.’ We want to help you genuinely step into one part of it — and see a China that feels more real, more natural and more personal."
  },
  "zh-CN": {
    storyTitle: "在细节里理解中国",
    story: [
      "我们熟悉的不只是中国的地标，也包括人们真实的生活方式——早市、社区餐馆、老街、本地手艺、地方饮食与日常节奏。",
      "中国辽阔，每个地区都有自己的节奏。适合北京的方式，到了苏州、成都、西安或一座小城，可能完全不同。我们的优势，是理解这些差异，并把它们连接成一段从容而完整的旅程。",
      "著名景点依然重要，但它们只是体验的一部分。我们也会寻找早餐街、安静的园林、家常餐馆、本地市场、手工作坊，以及标准行程往往忽略的慢时刻。"
    ],
    photosTitle: "真实客人，真实的中国时刻。",
    captions: [
      "在大家专程来到中国的地方，以更多背景、更多交流和更私人从容的节奏去体验。",
      "一顿共享的饭，也能像一座地标一样讲述一个地方。",
      "许多最好的旅行时刻，都发生在一张本地餐桌旁。",
      "从容的日子，会为自然发生的地方与交谈留出空间。",
      "当旅行带来真实连接，它也会变得更有意义。",
      "本地生活，可以从一次乘船、逛市场，或一顿贴近食材来源的饭开始。",
      "从私人旅行到国际来访，本地接待让陌生的地方更容易了解和适应。",
      "细小而日常的相遇，往往会成为旅客带回家的记忆。"
    ],
    closing: "游客眼中的中国令人兴奋，但真正留在记忆里的，往往更私人：一顿共享的饭、一段社区散步、一次交谈、一个安静的地方，或是对脚下这片土地多了一点理解。",
    brandLine: "观光中国很有趣，生活里的中国才让人难忘。",
    ctaBody: "告诉我们你想怎样体验中国，我们会帮助你设计一段更私人、更本地，也更有意义的旅程。"
  },
  "zh-TW": {
    storyTitle: "在細節裡理解中國",
    story: [
      "我們熟悉的不只是中國的地標，也包括人們真實的生活方式——早市、社區餐館、老街、在地手藝、地方飲食與日常節奏。",
      "中國遼闊，每個地區都有自己的節奏。適合北京的方式，到了蘇州、成都、西安或一座小城，可能完全不同。我們的優勢，是理解這些差異，並把它們連接成一段從容而完整的旅程。",
      "著名景點依然重要，但它們只是體驗的一部分。我們也會尋找早餐街、安靜的園林、家常餐館、在地市場、手工作坊，以及標準行程往往忽略的慢時刻。"
    ],
    photosTitle: "真實旅客，真實的中國時刻。",
    captions: [
      "在大家專程來到中國的地方，以更多背景、更多交流和更私人從容的節奏去體驗。",
      "一頓共享的飯，也能像一座地標一樣講述一個地方。",
      "許多最好的旅行時刻，都發生在一張在地餐桌旁。",
      "從容的日子，會為自然發生的地方與交談留出空間。",
      "當旅行帶來真實連結，它也會變得更有意義。",
      "在地生活，可以從一次乘船、逛市場，或一頓貼近食材來源的飯開始。",
      "從私人旅行到國際來訪，在地接待讓陌生的地方更容易了解和適應。",
      "細小而日常的相遇，往往會成為旅客帶回家的記憶。"
    ],
    closing: "旅客眼中的中國令人興奮，但真正留在記憶裡的，往往更私人：一頓共享的飯、一段社區散步、一次交談、一個安靜的地方，或是對腳下這片土地多了一點理解。",
    brandLine: "觀光中國很有趣，生活裡的中國才讓人難忘。",
    ctaBody: "告訴我們你想怎樣體驗中國，我們會幫助你設計一段更私人、更在地，也更有意義的旅程。"
  },
  es: {
    storyTitle: "China está en los detalles",
    story: [
      "Conocemos China no solo por sus monumentos, sino por la vida de cada día: mercados matinales, restaurantes de barrio, calles antiguas, artesanía, cocinas regionales y rutinas cotidianas.",
      "China es inmensa y cada región tiene su propio ritmo. Lo que funciona en Pekín puede ser muy distinto en Suzhou, Chengdu, Xi'an o una ciudad pequeña. Entender esas diferencias nos permite crear un viaje conectado, no apresurado.",
      "Los lugares famosos importan, pero son solo una parte. También buscamos la calle de desayunos, el jardín tranquilo, el restaurante familiar, el mercado local, el taller activo y los momentos pausados que rara vez aparecen en un itinerario estándar."
    ],
    photosTitle: "Viajeros reales. Momentos reales en China.",
    captions: [
      "En los lugares que atraen a los viajeros a China, con más contexto, conversación y un ritmo más personal.",
      "Una comida compartida puede contar tanto sobre un lugar como cualquier monumento.",
      "Algunos de los mejores momentos ocurren alrededor de una mesa local.",
      "Los días sin prisa dejan espacio para lugares y conversaciones que surgen de forma natural.",
      "Viajar cobra más sentido cuando crea conexiones reales.",
      "La vida local puede comenzar con un paseo en barco, una visita al mercado o una comida cerca de su origen.",
      "Desde viajes privados hasta visitas internacionales, la acogida local facilita orientarse en lugares desconocidos.",
      "Los encuentros pequeños y cotidianos suelen convertirse en los recuerdos que regresan a casa."
    ],
    closing: "La China turística puede ser emocionante. Sin embargo, lo que suele permanecer es algo más personal: una comida compartida, un paseo por el barrio, una conversación, un lugar tranquilo o la sensación de comprender un poco mejor dónde estás.",
    brandLine: "La China turística es interesante. La China local es la que permanece contigo.",
    ctaBody: "Cuéntanos cómo quieres vivir China y te ayudaremos a dar forma a un viaje más personal, local y significativo."
  },
  pt: {
    storyTitle: "A China está nos detalhes",
    story: [
      "Conhecemos a China não só por seus monumentos, mas pela forma como as pessoas vivem: mercados matinais, restaurantes de bairro, ruas antigas, artesanato, culinárias regionais e rotinas cotidianas.",
      "A China é imensa e cada região tem seu próprio ritmo. O que funciona em Pequim pode ser muito diferente em Suzhou, Chengdu, Xi'an ou numa cidade menor. Entender essas diferenças nos permite criar uma viagem conectada, e não apressada.",
      "Os lugares famosos continuam importantes, mas são apenas uma parte. Também procuramos a rua do café da manhã, o jardim tranquilo, o restaurante familiar, o mercado local, o ateliê em atividade e os momentos lentos que raramente entram num roteiro padrão."
    ],
    photosTitle: "Viajantes reais. Momentos reais na China.",
    captions: [
      "Nos lugares que atraem viajantes à China, com mais contexto, conversa e um ritmo mais pessoal.",
      "Uma refeição compartilhada pode contar tanto sobre um lugar quanto qualquer monumento.",
      "Alguns dos melhores momentos acontecem ao redor de uma mesa local.",
      "Dias sem pressa deixam espaço para lugares e conversas que surgem naturalmente.",
      "A viagem ganha mais sentido quando cria conexões reais.",
      "A vida local pode começar com um passeio de barco, uma visita ao mercado ou uma refeição perto de sua origem.",
      "De viagens privadas a visitas internacionais, a hospitalidade local facilita conhecer lugares desconhecidos.",
      "Pequenos encontros do dia a dia costumam se tornar as lembranças levadas para casa."
    ],
    closing: "A China turística pode ser empolgante. Mas o que costuma permanecer é algo mais pessoal: uma refeição compartilhada, um passeio pelo bairro, uma conversa, um lugar tranquilo ou a sensação de compreender um pouco melhor onde você está.",
    brandLine: "A China turística é interessante. A China local é a que permanece com você.",
    ctaBody: "Conte-nos como você quer viver a China e ajudaremos a criar uma viagem mais pessoal, local e significativa."
  },
  ar: {
    storyTitle: "الصين في تفاصيلها",
    story: [
      "نعرف الصين ليس من معالمها فقط، بل من طريقة عيش الناس فيها: أسواق الصباح ومطاعم الأحياء والشوارع القديمة والحرف المحلية والأطعمة الإقليمية وتفاصيل الحياة اليومية.",
      "الصين شاسعة ولكل منطقة إيقاعها. ما يناسب بكين قد يختلف تماما في سوتشو أو تشنغدو أو شيآن أو بلدة صغيرة. فهم هذه الفروق يساعدنا على صنع رحلة مترابطة وغير متعجلة.",
      "تبقى المعالم الشهيرة مهمة، لكنها جزء واحد من التجربة. نبحث أيضا عن شارع الإفطار والحديقة الهادئة والمطعم العائلي والسوق المحلي وورشة العمل واللحظات البطيئة التي لا تظهر عادة في البرامج التقليدية."
    ],
    photosTitle: "ضيوف حقيقيون. لحظات حقيقية في الصين.",
    captions: [
      "في الأماكن التي يأتي الناس إلى الصين لرؤيتها، مع سياق وحوار أكثر وإيقاع أكثر خصوصية.",
      "يمكن لوجبة مشتركة أن تحكي عن المكان بقدر ما يحكي أي معلم شهير.",
      "بعض أجمل لحظات السفر تحدث حول مائدة محلية.",
      "تترك الأيام الهادئة مساحة للأماكن والحوارات التي تحدث بصورة طبيعية.",
      "يصبح السفر أكثر معنى عندما يصنع تواصلا حقيقيا.",
      "قد تبدأ الحياة المحلية برحلة قارب أو زيارة سوق أو وجبة قريبة من مصدرها.",
      "من السفر الخاص إلى الزيارات الدولية، تجعل الاستضافة المحلية الأماكن غير المألوفة أسهل في التعامل معها.",
      "غالبا ما تصبح اللقاءات اليومية الصغيرة هي الذكريات التي يحملها المسافر إلى بيته."
    ],
    closing: "قد تكون الصين السياحية مثيرة، لكن ما يبقى في الذاكرة غالبا أكثر خصوصية: وجبة مشتركة أو نزهة في حي أو محادثة أو مكان هادئ أو شعور بأنك فهمت المكان بصورة أعمق قليلا.",
    brandLine: "الصين السياحية ممتعة. أما الصين المحلية فهي التي تبقى معك.",
    ctaBody: "أخبرونا كيف تريدون تجربة الصين، وسنساعدكم في تصميم رحلة أكثر خصوصية ومحلية ومعنى."
  }
};

const aboutPhotos = [
  {
    src: "/images/about-me-dinner-table.jpg",
    alt: "Guests and a local host sharing dinner around a round table in China",
    objectPosition: "42% 48%"
  },
  {
    src: "/images/about/great-wall-guests.jpg",
    alt: "A guest meeting a local host on the Great Wall of China",
    objectPosition: "50% 38%"
  },
  {
    src: "/images/about/indoor-five-person-visit.jpg",
    alt: "International guests and local hosts during a visit in China",
    objectPosition: "50% 50%"
  },
  {
    src: "/images/about-me-beach-group.jpg",
    alt: "Guests and a local host enjoying an unhurried day by the coast in China",
    objectPosition: "50% 42%"
  },
  {
    src: "/images/about-me-boat-seafood.jpg",
    alt: "A family and local host discovering seafood by boat in China",
    objectPosition: "50% 38%"
  },
  {
    src: "/images/about/restaurant-group.png",
    alt: "An international guest and local hosts after a meal in China",
    objectPosition: "50% 45%"
  },
  {
    src: "/images/about/international-reception.jpg",
    alt: "International visitors and local hosts at a formal reception in China",
    objectPosition: "50% 52%"
  },
  {
    src: "/images/about-me-restaurant-selfie.jpg",
    alt: "A guest and local host sharing an everyday restaurant moment in China",
    objectPosition: "50% 45%"
  }
];

export default function AboutPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).about;
  const details = aboutDetails[lang] ?? aboutDetails.en;

  return (
    <>
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <Header />
      <main className="bg-ink pt-[124px] text-bone xl:pt-20" dir={dir}>
        <section className="px-5 pb-10 pt-16 sm:px-8 lg:pb-12 lg:pt-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-12">
            <article className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p>
                <h1 className="safe-wrap mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1>

                <div className="space-y-4">
                  <p className="mt-8 text-xl leading-8 text-bone sm:text-2xl sm:leading-9">{t.body1}</p>
                  <p className="text-lg leading-8 text-bone/70">{t.body2}</p>
                </div>

                <div className="mt-9">
                  <h2 className="font-serif text-3xl sm:text-4xl">{details.storyTitle}</h2>
                  <div className="mt-5 space-y-4">
                    {details.story.map((paragraph) => (
                      <p key={paragraph} className="text-lg leading-8 text-bone/85">{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-9 space-y-5">
                  <p className="text-lg leading-8 text-bone/75">{details.closing}</p>
                  <p className="font-serif text-3xl leading-tight text-bone sm:text-4xl">{details.brandLine}</p>
                  <p className="text-lg leading-8 text-bone/85">{details.ctaBody}</p>
                </div>
            </article>

            <div className="grid min-w-0 grid-cols-2 gap-3 self-start sm:gap-4 lg:h-full lg:grid-rows-4 lg:self-stretch">
              {aboutPhotos.map((photo, index) => (
                <figure key={photo.src} className="relative aspect-square min-w-0 overflow-hidden rounded-lg bg-charcoal shadow-card lg:aspect-auto lg:min-h-0">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    priority={index < 2}
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 46vw"
                    className="object-cover"
                    style={{ objectPosition: photo.objectPosition }}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t hairline bg-charcoal px-5 py-10 sm:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl text-center">
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-bone px-7 py-3 text-sm font-semibold text-ink transition hover:bg-gold">{t.cta}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
