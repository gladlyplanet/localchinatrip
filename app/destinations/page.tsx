"use client";

import { ChinaMap } from "@/components/ChinaMap";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getProvinceName, provinces } from "@/lib/provinces";
import { getSiteCopy } from "@/lib/site-copy";

export default function DestinationsPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).destinations;
  return <><Header /><main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-44 text-ink sm:px-8 xl:pt-36" dir={dir}><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">{t.eyebrow}</p><h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-tight sm:text-7xl">{t.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-mist">{t.intro}</p><div className="mt-10"><ChinaMap /></div><div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">{provinces.map((p) => <a key={p.slug} href={`/destinations/${p.slug}`} className="rounded-md border hairline bg-white p-3 text-center text-sm font-semibold transition hover:border-moss hover:text-moss">{getProvinceName(p.slug, lang)}</a>)}</div></div></main><Footer /></>;
}
