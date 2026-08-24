"use client";

import Image from "next/image";
import { ExperienceCatalog } from "@/components/ExperienceCatalog";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { experienceUi } from "@/lib/experience-themes";

export default function ExperiencesPage() {
  const { lang, dir } = useLanguage();
  const t = experienceUi[lang];
  return (
    <>
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20" dir={dir}>
        <section className="paper-texture overflow-hidden border-b hairline px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="min-w-0">
              <p className="safe-wrap text-sm font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.eyebrow}</p>
              <h1 className="safe-wrap mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.06] sm:text-6xl lg:text-7xl">{t.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">{t.intro}</p>
              <div className="mt-8 grid max-w-2xl grid-cols-3 border-y hairline py-5 text-sm">
                <span className="pe-4 font-semibold text-moss">{t.private}</span>
                <span className="border-x hairline px-4 font-semibold text-moss">{t.flexible}</span>
                <span className="ps-4 font-semibold text-moss">{t.respectful}</span>
              </div>
            </div>
            <div className="grid h-[380px] grid-cols-[1.15fr_0.85fr] grid-rows-2 gap-3 sm:h-[470px]">
              <div className="relative row-span-2 overflow-hidden rounded-lg">
                <Image src="/images/experience-chengdu-market.jpg" alt={t.title} fill priority sizes="(min-width: 1024px) 38vw, 60vw" className="object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <Image src="/images/experience-suzhou-embroidery.jpg" alt={t.title} fill priority sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <Image src="/images/travel-planning/featured/wellness-taiji.jpg" alt={t.title} fill priority sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <ExperienceCatalog />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
