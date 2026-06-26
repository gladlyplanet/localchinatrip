"use client";

import { ExperienceCatalog } from "@/components/ExperienceCatalog";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getSiteCopy } from "@/lib/site-copy";

export default function ExperiencesPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).experiences;
  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-44 text-ink sm:px-8 xl:pt-36" dir={dir}>
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">{t.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-tight sm:text-7xl">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">{t.intro}</p>
          <div className="mt-12"><ExperienceCatalog /></div>
        </div>
      </main>
      <Footer />
    </>
  );
}
