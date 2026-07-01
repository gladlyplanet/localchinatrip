"use client";

import Link from "next/link";
import { DestinationPhoto } from "@/components/DestinationPhoto";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getRecommendationEnrichment } from "@/lib/content-enrichment";
import { getProvinceName, type Province } from "@/lib/provinces";
import { getRecommendationCopy, type ProvinceRecommendation } from "@/lib/province-recommendations";
import { getSiteCopy } from "@/lib/site-copy";

export function AttractionDetail({ province, attraction }: { province: Province; attraction: ProvinceRecommendation }) {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).destinations;
  const name = getProvinceName(province.slug, lang);
  const itemCopy = getRecommendationCopy(lang, attraction);
  const enrichment = getRecommendationEnrichment(lang, attraction, province.name);

  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-44 text-ink sm:px-8 xl:pt-36" dir={dir}>
        <article className="mx-auto max-w-6xl">
          <Link href={`/destinations/${province.slug}`} className="text-sm font-semibold text-moss">← {name}</Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{t.attractionAbout}</p>
              <h1 className="mt-4 font-serif text-5xl font-semibold sm:text-7xl">{itemCopy.name}</h1>
              <p className="mt-6 text-lg font-semibold text-moss">{enrichment.caption}</p>
              <p className="mt-7 text-xl leading-9 text-mist">{enrichment.overview}</p>
            </div>

            <figure className="overflow-hidden rounded-lg border hairline bg-white shadow-card">
              <div className="relative aspect-[4/3]">
                <DestinationPhoto name={attraction.name} province={province.name} caption={enrichment.caption} fallbackImage={enrichment.image} />
              </div>
              <figcaption className="px-5 py-4 text-sm text-mist">{enrichment.caption}</figcaption>
            </figure>
          </div>

          <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-lg border hairline bg-white p-7 shadow-card">
              <h2 className="font-serif text-3xl font-semibold">{itemCopy.name}</h2>
              <p className="mt-4 text-lg leading-8 text-mist">{enrichment.experience}</p>
            </div>
            <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {t.attractionIdeas.map((idea) => (
                <div key={idea} className="rounded-lg border hairline bg-white p-5 font-semibold shadow-card">{idea}</div>
              ))}
            </aside>
          </section>

          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">{t.plan}</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
