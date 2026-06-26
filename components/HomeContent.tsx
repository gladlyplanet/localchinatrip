"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { ExperienceCatalog } from "@/components/ExperienceCatalog";
import { experiences, getExperienceCopy } from "@/lib/experiences";
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
            <div className="max-w-3xl text-cream">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{t.eyebrow}</p>
              <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] sm:text-7xl lg:text-8xl">{t.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-cream/85 sm:text-xl">{t.intro}</p>
              <Link href="/experiences" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream transition hover:bg-cream hover:text-ink">{t.explore}</Link>
            </div>
          </div>
        </section>

        <section id="local-life" className="paper-texture scroll-mt-32 px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-semibold sm:text-5xl">{t.localLife}</h2>
              <p className="mt-4 text-lg leading-8 text-mist">{t.localLifeIntro}</p>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">
              {experiences.map((item) => {
                const copy = getExperienceCopy(lang, item.slug);
                return (
                  <Link key={item.slug} href={`/experiences/${item.slug}`} className="group text-center">
                    <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border-2 border-white shadow-card">
                      <Image src={item.image} alt={copy.title} fill sizes="160px" className="object-cover transition duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold leading-5">{copy.title}</h3>
                    <p className="mt-1 text-[11px] leading-4 text-mist">{item.locations.length} {getSiteCopy(lang).experiences.locations}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="paper-texture border-t hairline px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-[1220px]">
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="font-serif text-4xl font-semibold">{t.featured}</h2>
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
