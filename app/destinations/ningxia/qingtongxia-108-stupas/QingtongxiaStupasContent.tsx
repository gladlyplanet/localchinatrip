"use client";

import Link from "next/link";
import { AttractionDetail } from "@/components/AttractionDetail";
import { DestinationPhoto } from "@/components/DestinationPhoto";
import { useLanguage } from "@/components/LanguageProvider";
import { Header, Footer } from "@/components/SiteChrome";
import { getRecommendationEnrichment } from "@/lib/content-enrichment";
import { qingtongxiaStupasContent as content } from "@/lib/destinations/qingtongxia-108-stupas";
import type { ProvinceRecommendation } from "@/lib/province-recommendations";
import type { Province } from "@/lib/provinces";
import { getSiteCopy } from "@/lib/site-copy";

export function QingtongxiaStupasContent({ province, attraction }: { province: Province; attraction: ProvinceRecommendation }) {
  const { lang } = useLanguage();
  // Keep the five existing translated bodies on their original renderer.
  if (lang !== "en") return <AttractionDetail province={province} attraction={attraction} />;
  const enrichment = getRecommendationEnrichment("en", attraction, province.name);

  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-32 text-ink sm:px-8 lg:pt-36">
        <article className="mx-auto max-w-7xl">
          <Link href="/destinations/ningxia" className="inline-flex items-center text-sm font-semibold text-moss">
            <span aria-hidden="true" className="mr-2">{"<-"}</span>Ningxia
          </Link>
          <section className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div className="min-w-0">
              <div className="flex items-center gap-3 text-gold">
                <span className="h-px w-7 bg-gold" />
                <p className="text-sm font-semibold tracking-[0.22em]">Place and experience details</p>
              </div>
              <h1 className="mt-7 break-words font-serif text-5xl font-semibold leading-none [overflow-wrap:anywhere] sm:text-7xl lg:text-8xl">Qingtongxia 108 Stupas</h1>
              <p className="mt-7 text-lg font-semibold text-moss">{content.subtitle}</p>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-mist">{content.intro}</p>
            </div>
            <figure className="overflow-hidden rounded-lg border hairline bg-white shadow-card">
              <div className="relative aspect-[16/10]">
                <DestinationPhoto caption={enrichment.caption} fallbackImage={enrichment.image} />
              </div>
              <figcaption className="px-5 py-5 text-sm leading-6 text-mist">
                <strong className="block text-ink">Ningxia</strong>{enrichment.caption}
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
            <p className="text-base leading-8 text-mist sm:text-lg">
              For the wider landscape, explore the <Link href="/destinations/ningxia/yellow-river-grand-canyon" className="font-semibold text-moss underline underline-offset-4">Yellow River Grand Canyon</Link>. If your journey also takes you into Wuzhong, <Link href="/destinations/ningxia/wuzhong-morning-tea" className="font-semibold text-moss underline underline-offset-4">Wuzhong morning tea</Link> brings a different, everyday dimension to the trip.
            </p>
            <p className="text-sm leading-7 text-mist">
              Historical references: <a href="https://www.qtx.gov.cn/zjqtx/yygx/202209/t20220914_3771023.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">Qingtongxia&apos;s official stupa profile</a> and <a href="https://www.cnr.cn/2008zt/cl/xxwh/20080831/t20080831_505087311.html" target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">an archaeology report published by CNR</a>. Check current visitor arrangements separately before traveling.
            </p>
          </div>
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">{getSiteCopy("en").destinations.plan}</Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
