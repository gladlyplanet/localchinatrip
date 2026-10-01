"use client";

import Link from "next/link";
import { AttractionDetail } from "@/components/AttractionDetail";
import { DestinationPhoto } from "@/components/DestinationPhoto";
import { useLanguage } from "@/components/LanguageProvider";
import { Header, Footer } from "@/components/SiteChrome";
import { getRecommendationEnrichment } from "@/lib/content-enrichment";
import { huangpuRiverFerryContent as content } from "@/lib/destinations/huangpu-river-ferry";
import type { ProvinceRecommendation } from "@/lib/province-recommendations";
import type { Province } from "@/lib/provinces";
import { getSiteCopy } from "@/lib/site-copy";

export function HuangpuRiverFerryContent({ province, attraction }: { province: Province; attraction: ProvinceRecommendation }) {
  const { lang } = useLanguage();
  // This English-only content update does not replace the existing translations.
  if (lang !== "en") return <AttractionDetail province={province} attraction={attraction} />;
  const enrichment = getRecommendationEnrichment("en", attraction, province.name);

  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-32 text-ink sm:px-8 lg:pt-36">
        <article className="mx-auto max-w-7xl">
          <Link href="/destinations/shanghai" className="inline-flex items-center text-sm font-semibold text-moss">
            <span aria-hidden="true" className="mr-2">{"<-"}</span>Shanghai
          </Link>
          <section className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div className="min-w-0">
              <div className="flex items-center gap-3 text-gold">
                <span className="h-px w-7 bg-gold" />
                <p className="text-sm font-semibold tracking-[0.22em]">Place and experience details</p>
              </div>
              <h1 className="mt-7 break-words font-serif text-5xl font-semibold leading-none [overflow-wrap:anywhere] sm:text-7xl lg:text-8xl">Huangpu River Ferry</h1>
              <p className="mt-7 text-lg font-semibold text-moss">{content.subtitle}</p>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">{content.intro}</p>
            </div>
            <figure className="overflow-hidden rounded-lg border hairline bg-white shadow-card">
              <div className="relative aspect-[16/10]">
                <DestinationPhoto caption={enrichment.caption} fallbackImage={enrichment.image} />
              </div>
              <figcaption className="px-5 py-5 text-sm leading-6 text-mist">
                <strong className="block text-ink">Shanghai</strong>{enrichment.caption}
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
                {section.heading === "Choose the piers before you set off" && (
                  <p className="mt-4 text-sm leading-7 text-mist">
                    Route reference: <a href="https://english.shanghai.gov.cn/en-Transportation/20250910/65267b72530645bdacc119d56380d363.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">Shanghai&apos;s official ferry information</a>. Check the operator&apos;s latest notices for your travel day.
                  </p>
                )}
                {section.heading === "Public ferry or sightseeing cruise?" && (
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {content.comparison.map((item) => (
                      <div key={item.heading} className="rounded-lg border hairline bg-white/82 p-5">
                        <h3 className="font-semibold text-ink">{item.heading}</h3>
                        <p className="mt-3 text-base leading-7 text-mist">{item.body}</p>
                      </div>
                    ))}
                  </div>
                )}
                {section.heading === "A small part of a Shanghai walking day" && (
                  <p className="mt-4 text-base leading-8 text-mist sm:text-lg">
                    Start with <Link href="/destinations/shanghai/the-bund" className="font-semibold text-moss underline underline-offset-4">the Bund</Link> if you want to build the day around the central riverfront. Our <Link href="/travel-planning/shanghai-3" className="font-semibold text-moss underline underline-offset-4">three-day Shanghai route</Link> offers a wider framework; a ferry crossing is an optional link within it, not a separate major attraction.
                  </p>
                )}
              </section>
            ))}
          </div>
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">{getSiteCopy("en").destinations.plan}</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
