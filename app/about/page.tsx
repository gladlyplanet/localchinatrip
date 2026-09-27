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
    storyTitle: "China in the details",
    story: [
      "We know China not only through its landmarks, but through the way people actually live — morning markets, neighbourhood restaurants, old streets, local crafts, regional food and everyday routines.",
      "China is vast, and every region has its own rhythm. What feels right in Beijing can be very different from what works in Suzhou, Chengdu, Xi'an or a smaller town. Our strength is understanding those differences and turning them into a journey that feels connected rather than rushed.",
      "Famous places still matter, but they are only one part of the experience. We also look for the breakfast street, the quiet garden, the family-run restaurant, the local market, the working studio and the slower moments that rarely make it into a standard itinerary."
    ],
    photosTitle: "Real guests. Real moments in China.",
    captions: [
      "At the places people come to China to see — with more context, more conversation and a more personal pace.",
      "Some of the best travel moments happen around a local table.",
      "Travel becomes more meaningful when it leads to real connection.",
      "From private travel to international visits, local hosting makes unfamiliar places easier to navigate."
    ],
    closing: "Tourist China can be exciting. But the part that stays with most travelers is often something more personal: a shared meal, a neighbourhood walk, a conversation, a quieter place, or the feeling of understanding where you are a little more deeply.",
    brandLine: "Tourist China is interesting. Local China is what stays with you.",
    ctaBody: "Tell us how you want to experience China, and we will help shape a journey that feels more personal, more local and more meaningful."
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
      "许多最好的旅行时刻，都发生在一张本地餐桌旁。",
      "当旅行带来真实连接，它也会变得更有意义。",
      "从私人旅行到国际来访，本地接待让陌生的地方更容易了解和适应。"
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
      "許多最好的旅行時刻，都發生在一張在地餐桌旁。",
      "當旅行帶來真實連結，它也會變得更有意義。",
      "從私人旅行到國際來訪，在地接待讓陌生的地方更容易了解和適應。"
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
      "Algunos de los mejores momentos ocurren alrededor de una mesa local.",
      "Viajar cobra más sentido cuando crea conexiones reales.",
      "Desde viajes privados hasta visitas internacionales, la acogida local facilita orientarse en lugares desconocidos."
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
      "Alguns dos melhores momentos acontecem ao redor de uma mesa local.",
      "A viagem ganha mais sentido quando cria conexões reais.",
      "De viagens privadas a visitas internacionais, a hospitalidade local facilita conhecer lugares desconhecidos."
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
      "بعض أجمل لحظات السفر تحدث حول مائدة محلية.",
      "يصبح السفر أكثر معنى عندما يصنع تواصلا حقيقيا.",
      "من السفر الخاص إلى الزيارات الدولية، تجعل الاستضافة المحلية الأماكن غير المألوفة أسهل في التعامل معها."
    ],
    closing: "قد تكون الصين السياحية مثيرة، لكن ما يبقى في الذاكرة غالبا أكثر خصوصية: وجبة مشتركة أو نزهة في حي أو محادثة أو مكان هادئ أو شعور بأنك فهمت المكان بصورة أعمق قليلا.",
    brandLine: "الصين السياحية ممتعة. أما الصين المحلية فهي التي تبقى معك.",
    ctaBody: "أخبرونا كيف تريدون تجربة الصين، وسنساعدكم في تصميم رحلة أكثر خصوصية ومحلية ومعنى."
  }
};

const aboutPhotos = [
  { src: "/images/about/great-wall-guests.jpg", alt: "A guest meeting a local host on the Great Wall of China" },
  { src: "/images/about/local-restaurant-selfie.jpg", alt: "Guests sharing a relaxed meal at a local restaurant in China" },
  { src: "/images/about/restaurant-group.png", alt: "An international guest and local hosts after a meal in China" },
  { src: "/images/about/international-reception.jpg", alt: "International visitors and local hosts at a formal reception in China" }
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
        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p>
            <h1 className="safe-wrap mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1>
            <div className="mt-8 max-w-4xl space-y-5">
              <p className="text-xl leading-9 text-bone sm:text-2xl">{t.body1}</p>
              <p className="text-lg leading-8 text-bone/70">{t.body2}</p>
            </div>
          </div>
        </section>

        <section className="border-y hairline bg-charcoal px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <article className="rounded-lg border border-white/10 bg-ink/35 p-6 shadow-card sm:p-8">
              <h2 className="font-serif text-3xl sm:text-4xl">{details.storyTitle}</h2>
              <div className="mt-6 space-y-5">
                {details.story.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-8 text-bone/85">{paragraph}</p>
                ))}
              </div>
            </article>

            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">{details.photosTitle}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-[1.05fr_0.95fr] sm:items-start">
                <figure className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-ink/35 shadow-card">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={aboutPhotos[0].src}
                      alt={aboutPhotos[0].alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 53vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-sm leading-6 text-bone/75">{details.captions[0]}</figcaption>
                </figure>

                <div className="grid min-w-0 gap-4">
                  {aboutPhotos.slice(1).map((photo, index) => (
                    <figure key={photo.src} className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-ink/35 shadow-card">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 47vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="px-4 py-3 text-sm leading-6 text-bone/75">{details.captions[index + 1]}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.pillars.map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-charcoal p-6 shadow-card">
                <h2 className="font-serif text-2xl">{title}</h2>
                <p className="mt-4 leading-7 text-bone/70">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t hairline bg-charcoal px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-lg leading-8 text-bone/70">{details.closing}</p>
              <p className="mt-6 font-serif text-3xl leading-tight text-bone sm:text-4xl">{details.brandLine}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-ink/35 p-6 shadow-card sm:p-8">
              <p className="text-lg leading-8 text-bone/85">{details.ctaBody}</p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-bone px-7 py-3 text-sm font-semibold text-ink transition hover:bg-gold">{t.cta}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
