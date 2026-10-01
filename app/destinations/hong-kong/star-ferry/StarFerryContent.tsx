"use client";

import Link from "next/link";
import { AttractionDetail } from "@/components/AttractionDetail";
import { DestinationPhoto } from "@/components/DestinationPhoto";
import { useLanguage } from "@/components/LanguageProvider";
import { Header, Footer } from "@/components/SiteChrome";
import { getRecommendationEnrichment } from "@/lib/content-enrichment";
import { starFerryContent as content } from "@/lib/destinations/star-ferry";
import type { ProvinceRecommendation } from "@/lib/province-recommendations";
import type { Province } from "@/lib/provinces";
import { getSiteCopy } from "@/lib/site-copy";

export function StarFerryContent({ province, attraction }: { province: Province; attraction: ProvinceRecommendation }) {
  const { lang } = useLanguage();
  // Keep the five existing translated bodies on their original renderer.
  if (lang !== "en") return <AttractionDetail province={province} attraction={attraction} />;
  const enrichment = getRecommendationEnrichment("en", attraction, province.name);

  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-32 text-ink sm:px-8 lg:pt-36">
        <article className="mx-auto max-w-7xl">
          <Link href="/destinations/hong-kong" className="inline-flex items-center text-sm font-semibold text-moss">
            <span aria-hidden="true" className="mr-2">{"<-"}</span>Hong Kong
          </Link>
          <section className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div className="min-w-0">
              <div className="flex items-center gap-3 text-gold">
                <span className="h-px w-7 bg-gold" />
                <p className="text-sm font-semibold tracking-[0.22em]">Place and experience details</p>
              </div>
              <h1 className="mt-7 break-words font-serif text-5xl font-semibold leading-none [overflow-wrap:anywhere] sm:text-7xl lg:text-8xl">Star Ferry</h1>
              <p className="mt-7 text-lg font-semibold text-moss">{content.subtitle}</p>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">{content.intro}</p>
            </div>
            <figure className="overflow-hidden rounded-lg border hairline bg-white shadow-card">
              <div className="relative aspect-[16/10]">
                <DestinationPhoto caption={enrichment.caption} fallbackImage={enrichment.image} />
              </div>
              <figcaption className="px-5 py-5 text-sm leading-6 text-mist">
                <strong className="block text-ink">Hong Kong</strong>{enrichment.caption}
              </figcaption>
            </figure>
          </section>
          <div className="mt-12 max-w-4xl space-y-10">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-mist sm:text-lg">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.heading === "Make the ferry a link in a walking day" && (
                    <p>
                      For the island side, the <Link href="/destinations/hong-kong/central-mid-levels-walk" className="font-semibold text-moss underline underline-offset-4">Central Mid-Levels Walk</Link> continues the day away from the waterfront. If you are staying on the Kowloon side into the evening, <Link href="/destinations/hong-kong/temple-street-night-market" className="font-semibold text-moss underline underline-offset-4">Temple Street Night Market</Link> is a separate onward stop, not part of the ferry terminal area.
                    </p>
                  )}
                </div>
              </section>
            ))}
            <p data-source-note="true" className="text-sm leading-7 text-mist">
              Official references: <a href="https://www.starferry.com.hk/en/service" target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">Star Ferry services and passenger notices</a>, <a href="https://www.starferry.com.hk/en/theCompany" target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">the operator&apos;s history</a> and <a href="https://www.td.gov.hk/en/transport_in_hong_kong/public_transport/ferries/service_details/index.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">Transport Department ferry details</a>. Check current arrangements before traveling.
            </p>
          </div>
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">{getSiteCopy("en").destinations.plan}</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
