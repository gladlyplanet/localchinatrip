"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { getSiteCopy } from "@/lib/site-copy";

const localFriendCopy: Record<Lang, string[]> = {
  en: [
    "I'm not a traditional tour guide. I'm more like a local friend in China.",
    "My goal is to help you experience the real China: not only famous attractions, but also local markets, old neighborhoods, family-style restaurants, small towns, daily life, and real cultural moments.",
    "China is big, diverse, and full of different customs. With a local companion, your trip can be easier, safer, and more meaningful.",
    "For me, travel is not only about seeing places. It is about meeting people, sharing cultures, and making life more interesting."
  ],
  "zh-CN": [
    "我不是传统意义上的导游，更像是你在中国的一位本地朋友。",
    "我的目标是帮助你体验真实的中国：不只是著名景点，也包括本地市场、老街区、家常餐馆、小城镇、日常生活和真实的文化时刻。",
    "中国很大，也很多元，每个地方都有不同习俗。有一个本地人陪同，你的旅行会更轻松、更安全，也更有意义。",
    "对我来说，旅行不只是看风景，也是认识人、分享文化，并让生活变得更有意思。"
  ],
  "zh-TW": [
    "我不是傳統意義上的導遊，更像是你在中國的一位在地朋友。",
    "我的目標是幫助你體驗真實的中國：不只是著名景點，也包括在地市場、老街區、家常餐館、小城鎮、日常生活和真實的文化時刻。",
    "中國很大，也很多元，每個地方都有不同習俗。有一位在地人陪同，你的旅行會更輕鬆、更安全，也更有意義。",
    "對我來說，旅行不只是看風景，也是認識人、分享文化，並讓生活變得更有意思。"
  ],
  es: [
    "No soy un guía turístico tradicional. Soy más como un amigo local en China.",
    "Mi objetivo es ayudarte a vivir la China real: no solo atracciones famosas, sino también mercados locales, barrios antiguos, restaurantes familiares, pueblos pequeños, vida diaria y momentos culturales auténticos.",
    "China es grande, diversa y llena de costumbres distintas. Con un acompañante local, tu viaje puede ser más fácil, seguro y significativo.",
    "Para mí, viajar no es solo ver lugares. Es conocer personas, compartir culturas y hacer la vida más interesante."
  ],
  pt: [
    "Não sou um guia turístico tradicional. Sou mais como um amigo local na China.",
    "Meu objetivo é ajudar você a viver a China real: não apenas atrações famosas, mas também mercados locais, bairros antigos, restaurantes familiares, pequenas cidades, vida cotidiana e momentos culturais autênticos.",
    "A China é grande, diversa e cheia de costumes diferentes. Com um acompanhante local, sua viagem pode ser mais fácil, segura e significativa.",
    "Para mim, viajar não é apenas ver lugares. É conhecer pessoas, compartilhar culturas e tornar a vida mais interessante."
  ],
  ar: [
    "أنا لست مرشدا سياحيا تقليديا. أنا أقرب إلى صديق محلي لك في الصين.",
    "هدفي هو مساعدتك على تجربة الصين الحقيقية: ليس فقط المعالم الشهيرة، بل أيضا الأسواق المحلية والأحياء القديمة والمطاعم العائلية والبلدات الصغيرة والحياة اليومية.",
    "الصين كبيرة ومتنوعة ومليئة بعادات مختلفة. مع مرافق محلي يمكن أن تكون رحلتك أسهل وأكثر أمانا ومعنى.",
    "بالنسبة لي، السفر لا يعني فقط رؤية الأماكن. إنه لقاء الناس ومشاركة الثقافات وجعل الحياة أكثر إثارة للاهتمام."
  ]
};

const aboutPhotos = [
  { src: "/images/about-me-dinner-table.jpg", alt: "Sharing dinner with foreign guests in China" },
  { src: "/images/about-me-beach-group.jpg", alt: "Beach moment with foreign guests in China" },
  { src: "/images/about-me-boat-seafood.jpg", alt: "Boat seafood experience with guests" },
  { src: "/images/about-me-restaurant-selfie.jpg", alt: "Restaurant selfie with a guest" }
];

const photoCaptions: Record<Lang, string[]> = {
  en: ["Family-style dinners", "Easy local days", "Real local experiences", "Local friend in China"],
  "zh-CN": ["家常餐桌", "轻松的本地时光", "真实的本地体验", "在中国的本地朋友"],
  "zh-TW": ["家常餐桌", "輕鬆的在地時光", "真實的在地體驗", "在中國的在地朋友"],
  es: ["Comidas familiares", "Días locales tranquilos", "Experiencias locales reales", "Un amigo local en China"],
  pt: ["Refeições em estilo familiar", "Dias locais tranquilos", "Experiências locais reais", "Um amigo local na China"],
  ar: ["وجبات عائلية", "أيام محلية هادئة", "تجارب محلية حقيقية", "صديق محلي في الصين"]
};

export default function AboutPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).about;
  const localFriend = localFriendCopy[lang] ?? localFriendCopy.en;
  const captions = photoCaptions[lang] ?? photoCaptions.en;

  return (
    <>
      <Header />
      <main className="bg-ink pt-[124px] text-bone xl:pt-20" dir={dir}>
        <section className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p>
              <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1>

              <article className="mt-8 rounded-lg border border-white/10 bg-charcoal p-6 shadow-card sm:p-8">
                <div className="space-y-5">
                  <p className="text-lg leading-8 text-mist">{t.body1}</p>
                  <p className="text-lg leading-8 text-mist">{t.body2}</p>
                  {localFriend.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-8 text-bone/85">{paragraph}</p>
                  ))}
                </div>
              </article>

              <Link href="/contact" className="mt-8 inline-flex h-12 items-center rounded-full bg-bone px-7 text-sm font-medium text-ink transition hover:bg-gold">{t.cta}</Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {aboutPhotos.map((photo, index) => (
                <figure key={photo.src} className="overflow-hidden rounded-lg border border-white/10 bg-charcoal shadow-card">
                  <div className="relative aspect-[4/3]">
                    <Image src={photo.src} alt={photo.alt} fill priority={index === 0} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                  </div>
                  <figcaption className="px-4 py-3 text-xs font-medium leading-5 text-bone/70 sm:text-sm">{captions[index]}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y hairline bg-charcoal px-5 py-16 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            {t.pillars.map(([title, body]) => (
              <div key={title} className="border-s hairline ps-6">
                <h2 className="font-serif text-3xl">{title}</h2>
                <p className="mt-4 leading-7 text-mist">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
