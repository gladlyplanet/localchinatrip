"use client";

import Link from "next/link";
import { AttractionDetail } from "@/components/AttractionDetail";
import { DestinationPhoto } from "@/components/DestinationPhoto";
import { useLanguage } from "@/components/LanguageProvider";
import { Header, Footer } from "@/components/SiteChrome";
import { getRecommendationEnrichment } from "@/lib/content-enrichment";
import { tashilhunpoMonasteryContent as content } from "@/lib/destinations/tashilhunpo-monastery";
import type { ProvinceRecommendation } from "@/lib/province-recommendations";
import type { Province } from "@/lib/provinces";
import { getSiteCopy } from "@/lib/site-copy";

export function TashilhunpoMonasteryContent({ province, attraction }: { province: Province; attraction: ProvinceRecommendation }) {
  const { lang } = useLanguage();
  // Keep the five existing translated bodies on their original renderer.
  if (lang !== "en") return <AttractionDetail province={province} attraction={attraction} />;
  const enrichment = getRecommendationEnrichment("en", attraction, province.name);

  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-32 text-ink sm:px-8 lg:pt-36">
        <article className="mx-auto max-w-7xl">
          <Link href="/destinations/tibet" className="inline-flex items-center text-sm font-semibold text-moss">
            <span aria-hidden="true" className="mr-2">{"<-"}</span>Tibet
          </Link>
          <section className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div className="min-w-0">
              <div className="flex items-center gap-3 text-gold">
                <span className="h-px w-7 bg-gold" />
                <p className="text-sm font-semibold tracking-[0.22em]">Place and experience details</p>
              </div>
              <h1 className="mt-7 break-words font-serif text-5xl font-semibold leading-none [overflow-wrap:anywhere] sm:text-7xl lg:text-8xl">Tashilhunpo Monastery</h1>
              <p className="mt-7 text-lg font-semibold text-moss">{content.subtitle}</p>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">{content.intro}</p>
            </div>
            <figure className="overflow-hidden rounded-lg border hairline bg-white shadow-card">
              <div className="relative aspect-[16/10]">
                <DestinationPhoto caption={enrichment.caption} fallbackImage={enrichment.image} />
              </div>
              <figcaption className="px-5 py-5 text-sm leading-6 text-mist">
                <strong className="block text-ink">Tibet</strong>{enrichment.caption}
              </figcaption>
            </figure>
          </section>
          <div className="mt-12 max-w-4xl space-y-10">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-mist sm:text-lg">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
            <p className="text-sm leading-7 text-mist">
              Background reference: <a href="https://sjfw.mct.gov.cn/site/dataservice/culdetails?curId=10&id=35087" target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">the Ministry of Culture and Tourism&apos;s monastery profile</a>. For visitor notices, consult <a href="https://wlt.xizang.gov.cn/xwzx_69/tzgg/" target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">Tibet&apos;s culture and tourism department</a> and confirm arrangements with the site before visiting.
            </p>
          </div>
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">{getSiteCopy("en").destinations.plan}</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
