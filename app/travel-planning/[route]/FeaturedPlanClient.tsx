"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { getPlanText, type FeaturedPlan } from "@/lib/featured-travel-plans";

type UiCopy = {
  back: string;
  duration: string;
  nights: string;
  route: string;
  idealFor: string;
  season: string;
  pace: string;
  overviewEyebrow: string;
  overviewTitle: string;
  timelineEyebrow: string;
  timelineTitle: string;
  day: string;
  days: string;
  choicesEyebrow: string;
  choicesTitle: string;
  galleryEyebrow: string;
  galleryTitle: string;
  included: string;
  excluded: string;
  practical: string;
  disclaimer: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  cta: string;
};

const ui: Record<Lang, UiCopy> = {
  en: {
    back: "All travel plans", duration: "Duration", nights: "nights", route: "Route structure", idealFor: "Designed for", season: "Best timing", pace: "Travel rhythm",
    overviewEyebrow: "HOW THIS PLAN WORKS", overviewTitle: "A complete starting point, still built around you",
    timelineEyebrow: "DAY-BY-DAY RHYTHM", timelineTitle: "The journey in a clear, workable sequence", day: "Day", days: "Days",
    choicesEyebrow: "YOUR CHOICES", choicesTitle: "Keep the structure, change the emphasis",
    galleryEyebrow: "REAL SETTINGS", galleryTitle: "The places and experiences behind the plan",
    included: "What the plan can include", excluded: "Usually arranged separately", practical: "Before confirming", disclaimer: "Medical service boundary",
    ctaEyebrow: "BUILD YOUR VERSION", ctaTitle: "Use this plan as the beginning of a conversation.", ctaBody: "Share your dates, group size, interests and any practical needs. The first tailored proposal is free.", cta: "Discuss this plan"
  },
  "zh-CN": {
    back: "返回旅行计划", duration: "旅行天数", nights: "晚", route: "路线结构", idealFor: "适合人群", season: "推荐时间", pace: "旅行节奏",
    overviewEyebrow: "方案如何运作", overviewTitle: "内容已经完整，仍然围绕你重新调整",
    timelineEyebrow: "每日节奏", timelineTitle: "按照真实交通与体验顺序展开",
    day: "第", days: "第",
    choicesEyebrow: "可以选择的分支", choicesTitle: "保留合理结构，改变体验重点",
    galleryEyebrow: "真实场景", galleryTitle: "方案背后的地点与体验",
    included: "方案可以包含", excluded: "通常需要另行安排", practical: "确认之前", disclaimer: "医疗服务边界",
    ctaEyebrow: "形成你的版本", ctaTitle: "把这份方案作为我们沟通的起点。", ctaBody: "告诉我日期、人数、兴趣和实际需求，我会先免费准备一版针对你的方案。", cta: "从这份方案开始沟通"
  },
  "zh-TW": {
    back: "返回旅行計畫", duration: "旅行天數", nights: "晚", route: "路線結構", idealFor: "適合人群", season: "推薦時間", pace: "旅行節奏",
    overviewEyebrow: "方案如何運作", overviewTitle: "內容已經完整，仍然圍繞你重新調整",
    timelineEyebrow: "每日節奏", timelineTitle: "按照真實交通與體驗順序展開", day: "第", days: "第",
    choicesEyebrow: "可以選擇的分支", choicesTitle: "保留合理結構，改變體驗重點",
    galleryEyebrow: "真實場景", galleryTitle: "方案背後的地點與體驗",
    included: "方案可以包含", excluded: "通常需要另行安排", practical: "確認之前", disclaimer: "醫療服務邊界",
    ctaEyebrow: "形成你的版本", ctaTitle: "把這份方案作為我們溝通的起點。", ctaBody: "告訴我日期、人數、興趣和實際需求，我會先免費準備一版針對你的方案。", cta: "從這份方案開始溝通"
  },
  es: {
    back: "Todos los planes", duration: "Duración", nights: "noches", route: "Estructura", idealFor: "Pensado para", season: "Mejor momento", pace: "Ritmo",
    overviewEyebrow: "CÓMO FUNCIONA", overviewTitle: "Un punto de partida completo que se adapta a ti",
    timelineEyebrow: "RITMO DÍA A DÍA", timelineTitle: "La ruta en una secuencia clara y realizable", day: "Día", days: "Días",
    choicesEyebrow: "TUS ELECCIONES", choicesTitle: "Mantén la estructura y cambia el enfoque",
    galleryEyebrow: "LUGARES REALES", galleryTitle: "Los lugares y experiencias del plan",
    included: "Qué puede incluir", excluded: "Normalmente por separado", practical: "Antes de confirmar", disclaimer: "Límite del servicio médico",
    ctaEyebrow: "CREA TU VERSIÓN", ctaTitle: "Usa este plan para empezar la conversación.", ctaBody: "Comparte fechas, grupo, intereses y necesidades. La primera propuesta personalizada es gratuita.", cta: "Hablar de este plan"
  },
  pt: {
    back: "Todos os planos", duration: "Duração", nights: "noites", route: "Estrutura", idealFor: "Pensado para", season: "Melhor época", pace: "Ritmo",
    overviewEyebrow: "COMO FUNCIONA", overviewTitle: "Um ponto de partida completo que se adapta a você",
    timelineEyebrow: "RITMO DIA A DIA", timelineTitle: "O roteiro em uma sequência clara e possível", day: "Dia", days: "Dias",
    choicesEyebrow: "SUAS ESCOLHAS", choicesTitle: "Mantenha a estrutura e mude o foco",
    galleryEyebrow: "CENÁRIOS REAIS", galleryTitle: "Os lugares e experiências do plano",
    included: "O que pode incluir", excluded: "Normalmente à parte", practical: "Antes de confirmar", disclaimer: "Limite do serviço médico",
    ctaEyebrow: "CRIE SUA VERSÃO", ctaTitle: "Use este plano para começar a conversa.", ctaBody: "Compartilhe datas, grupo, interesses e necessidades. A primeira proposta personalizada é gratuita.", cta: "Conversar sobre este plano"
  },
  ar: {
    back: "كل خطط السفر", duration: "المدة", nights: "ليلة", route: "هيكل المسار", idealFor: "مناسب لـ", season: "الوقت الأفضل", pace: "إيقاع السفر",
    overviewEyebrow: "كيف تعمل الخطة", overviewTitle: "نقطة بداية متكاملة تبنى حولك",
    timelineEyebrow: "إيقاع الأيام", timelineTitle: "الرحلة في تسلسل واضح وقابل للتنفيذ", day: "اليوم", days: "الأيام",
    choicesEyebrow: "خياراتك", choicesTitle: "احتفظ بالهيكل وغيّر التركيز",
    galleryEyebrow: "أماكن حقيقية", galleryTitle: "الأماكن والتجارب خلف الخطة",
    included: "ما يمكن أن تتضمنه", excluded: "يرتب عادة بشكل منفصل", practical: "قبل التأكيد", disclaimer: "حدود الخدمة الطبية",
    ctaEyebrow: "ابن نسختك", ctaTitle: "استخدم هذه الخطة كبداية للحوار.", ctaBody: "أرسل التواريخ وحجم المجموعة والاهتمامات والاحتياجات. الاقتراح الأول المخصص مجاني.", cta: "ناقش هذه الخطة"
  }
};

function DayLabel({ days, lang, copy }: { days: string; lang: Lang; copy: UiCopy }) {
  const range = days.includes("–");
  if (lang === "zh-CN" || lang === "zh-TW") return <>{copy.day}{days}天</>;
  return <>{range ? copy.days : copy.day} {days}</>;
}

export function FeaturedPlanClient({ plan }: { plan: FeaturedPlan }) {
  const { lang, dir } = useLanguage();
  const t = ui[lang];
  const tx = (value: Parameters<typeof getPlanText>[0]) => getPlanText(value, lang);

  return (
    <>
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20" dir={dir}>
        <section className="relative min-h-[610px] overflow-hidden lg:min-h-[720px]">
          <Image src={plan.heroImage} alt={tx(plan.title)} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
          <div className="relative z-10 mx-auto flex min-h-[610px] max-w-[1680px] flex-col justify-between px-5 pb-14 pt-8 sm:px-8 lg:min-h-[720px] lg:px-24 lg:pb-20 lg:pt-12">
            <Link href="/travel-planning" className="inline-flex min-h-11 w-fit items-center text-sm font-semibold text-cream/90 transition hover:text-gold">
              <span className="me-2" aria-hidden="true">←</span>{t.back}
            </Link>
            <div className="min-w-0 max-w-5xl text-cream">
              <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{tx(plan.eyebrow)}</p>
              <h1 className="safe-wrap mt-5 max-w-5xl font-serif text-4xl font-semibold leading-[1.06] sm:text-6xl lg:text-7xl">{tx(plan.title)}</h1>
              <p className="safe-wrap mt-6 max-w-3xl text-lg leading-8 text-cream/90 sm:text-xl">{tx(plan.summary)}</p>
            </div>
          </div>
        </section>

        <section className="border-b hairline bg-white px-5 py-9 sm:px-8 lg:px-24">
          <div className="mx-auto grid max-w-[1488px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [t.duration, `${plan.duration} ${lang === "zh-CN" || lang === "zh-TW" ? "天" : "days"} · ${plan.nights} ${t.nights}`],
              [t.route, tx(plan.route)],
              [t.season, tx(plan.season)],
              [t.pace, tx(plan.pace)]
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 border-t border-gold/50 pt-4">
                <p className="safe-wrap text-xs font-semibold uppercase leading-5 text-mist">{label}</p>
                <p className="safe-wrap mt-2 font-serif text-xl leading-7">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="paper-texture px-5 py-16 sm:px-8 lg:px-24 lg:py-24">
          <div className="mx-auto grid max-w-[1488px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div className="min-w-0">
              <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.overviewEyebrow}</p>
              <h2 className="safe-wrap mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t.overviewTitle}</h2>
            </div>
            <div className="min-w-0">
              {plan.intro.map((paragraph) => <p key={paragraph.en} className="safe-wrap mb-5 text-lg leading-8 text-mist last:mb-0">{tx(paragraph)}</p>)}
              <div className="mt-8 border-s-2 border-gold ps-5">
                <p className="text-xs font-semibold uppercase text-mist">{t.idealFor}</p>
                <p className="safe-wrap mt-2 leading-7 text-moss">{tx(plan.idealFor)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y hairline bg-bone px-5 py-16 sm:px-8 lg:px-24 lg:py-24">
          <div className="mx-auto max-w-[1488px]">
            <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.timelineEyebrow}</p>
            <h2 className="safe-wrap mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t.timelineTitle}</h2>
            <ol className="mt-12 border-t hairline">
              {plan.timeline.map((item) => (
                <li key={`${item.days}-${item.title.en}`} className="grid gap-4 border-b hairline py-8 md:grid-cols-[120px_220px_1fr] md:gap-8">
                  <span className="safe-wrap text-sm font-semibold text-gold"><DayLabel days={item.days} lang={lang} copy={t} /></span>
                  <p className="safe-wrap font-semibold leading-6 text-moss">{tx(item.place)}</p>
                  <div className="min-w-0">
                    <h3 className="safe-wrap font-serif text-2xl font-semibold leading-tight">{tx(item.title)}</h3>
                    <p className="safe-wrap mt-3 max-w-3xl leading-7 text-mist">{tx(item.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 lg:px-24 lg:py-24">
          <div className="mx-auto max-w-[1488px]">
            <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.galleryEyebrow}</p>
            <h2 className="safe-wrap mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t.galleryTitle}</h2>
            <div className={`mt-10 grid gap-4 ${plan.gallery.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
              {plan.gallery.map((item, index) => (
                <figure key={item.src} className={`relative overflow-hidden rounded-md bg-bone ${plan.gallery.length === 3 && index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <div className={`relative ${plan.gallery.length === 3 && index === 0 ? "aspect-[4/3] md:h-full" : "aspect-[4/3]"}`}>
                    <Image src={item.src} alt={tx(item.alt)} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="safe-wrap absolute inset-x-0 bottom-0 bg-ink/75 px-4 py-3 text-xs font-semibold leading-5 text-cream">{tx(item.alt)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y hairline bg-cream px-5 py-16 sm:px-8 lg:px-24 lg:py-24">
          <div className="mx-auto max-w-[1488px]">
            <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.choicesEyebrow}</p>
            <h2 className="safe-wrap mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">{t.choicesTitle}</h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              {plan.choices.map((choice) => (
                <div key={choice.title.en} className="min-w-0 border-t border-gold/60 pt-6">
                  <h3 className="safe-wrap font-serif text-3xl font-semibold">{tx(choice.title)}</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">{tx(choice.intro)}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {choice.options.map((option) => (
                      <article key={option.title.en} className="min-w-0 rounded-md border hairline bg-white p-5 shadow-card">
                        <h4 className="safe-wrap font-semibold leading-6 text-moss">{tx(option.title)}</h4>
                        <p className="safe-wrap mt-3 text-sm leading-6 text-mist">{tx(option.body)}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 lg:px-24 lg:py-24">
          <div className="mx-auto grid max-w-[1488px] gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="min-w-0">
              <h2 className="safe-wrap font-serif text-3xl font-semibold">{t.included}</h2>
              <ul className="mt-6 border-t hairline">
                {plan.included.map((item, index) => <li key={item.en} className="grid grid-cols-[34px_1fr] gap-3 border-b hairline py-4"><span className="text-sm font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span><span className="safe-wrap leading-7 text-mist">{tx(item)}</span></li>)}
              </ul>
            </div>
            <div className="min-w-0">
              <h2 className="safe-wrap font-serif text-3xl font-semibold">{t.excluded}</h2>
              <ul className="mt-6 border-t hairline">
                {plan.excluded.map((item, index) => <li key={item.en} className="grid grid-cols-[34px_1fr] gap-3 border-b hairline py-4"><span className="text-sm font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span><span className="safe-wrap leading-7 text-mist">{tx(item)}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y hairline bg-bone px-5 py-14 sm:px-8 lg:px-24">
          <div className="mx-auto grid max-w-[1488px] gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
            <h2 className="safe-wrap font-serif text-3xl font-semibold">{t.practical}</h2>
            <div className="min-w-0 space-y-4">
              {plan.practical.map((item) => <p key={item.en} className="safe-wrap leading-7 text-mist">{tx(item)}</p>)}
              {plan.disclaimer ? (
                <div className="mt-7 border-s-2 border-gold bg-white p-5">
                  <h3 className="safe-wrap font-semibold text-moss">{t.disclaimer}</h3>
                  <p className="safe-wrap mt-2 text-sm leading-6 text-mist">{tx(plan.disclaimer)}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
          <div className="mx-auto grid max-w-[1488px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="min-w-0">
              <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.ctaEyebrow}</p>
              <h2 className="safe-wrap mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">{t.ctaTitle}</h2>
              <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-cream/75">{t.ctaBody}</p>
            </div>
            <Link href={`/contact?plan=${plan.id}`} className="safe-wrap inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-7 py-3 text-center text-sm font-semibold leading-5 text-ink transition hover:bg-gold">
              {t.cta}<span className="ms-2 shrink-0">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
