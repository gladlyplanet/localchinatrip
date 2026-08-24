"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { ExperienceCatalog } from "@/components/ExperienceCatalog";
import { experienceThemes, getExperienceDuration, getExperienceThemeCopy } from "@/lib/experience-themes";
import { getSiteCopy } from "@/lib/site-copy";

export function HomeContent() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).home;

  return (
    <>
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20" dir={dir}>
        <section className="relative min-h-[calc(100vh-124px)] overflow-hidden xl:min-h-[calc(100vh-80px)]">
          <Image src="/images/real-hero-hongcun.jpg" alt="Traditional village life in China" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-124px)] max-w-[1680px] items-end px-5 pb-16 sm:px-8 lg:px-24 xl:min-h-[calc(100vh-80px)]">
            <div className="min-w-0 max-w-3xl text-cream">
              <p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.eyebrow}</p>
              <h1 className="safe-wrap mt-5 font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl xl:text-8xl">{t.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/85 sm:text-xl">{t.intro}</p>
              <Link href="/experiences" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream transition hover:bg-cream hover:text-ink">{t.explore}</Link>
            </div>
          </div>
        </section>

        <section id="local-life" className="paper-texture scroll-mt-32 px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-2xl">
              <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">{t.localLife}</h2>
              <p className="mt-4 text-lg leading-8 text-mist">{t.localLifeIntro}</p>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">
              {experienceThemes.filter((item) => item.featured).slice(0, 8).map((item) => {
                const copy = getExperienceThemeCopy(lang, item);
                return (
                  <Link key={item.slug} href={`/experiences/${item.slug}`} className="group text-center">
                    <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border-2 border-white shadow-card">
                      <Image src={item.hero} alt={copy.title} fill sizes="160px" className="object-cover transition duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="safe-wrap mt-3 text-sm font-semibold leading-5">{copy.title}</h3>
                    <p className="mt-1 text-[11px] leading-4 text-mist">{getExperienceDuration(lang, item.duration)}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="paper-texture border-t hairline px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-[1220px]">
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-4xl">{t.featured}</h2>
              <Link href="/experiences" className="hidden text-sm font-semibold text-moss sm:block">{t.viewAll} →</Link>
            </div>
            <ExperienceCatalog compact />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
