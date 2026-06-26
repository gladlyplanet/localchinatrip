"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getExperienceLocationEnrichment } from "@/lib/content-enrichment";
import { getExperience, getExperienceCopy, getExperienceLocationCopy } from "@/lib/experiences";
import { getSiteCopy } from "@/lib/site-copy";

export function ExperienceDetail({ slug }: { slug: string }) {
  const { lang, dir } = useLanguage();
  const item = getExperience(slug);
  if (!item) return null;

  const text = getExperienceCopy(lang, slug);
  const ui = getSiteCopy(lang).experiences;

  return (
    <>
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20" dir={dir}>
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image src={item.image} alt={text.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-7xl items-end px-5 pb-14 sm:px-8">
            <div className="max-w-3xl text-cream">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{ui.eyebrow}</p>
              <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-7xl">{text.title}</h1>
              <p className="mt-5 text-lg leading-8 text-cream/85">{text.intro}</p>
              <p className="mt-3 text-sm font-semibold text-gold">{item.locations.length} {ui.locations}</p>
            </div>
          </div>
        </section>

        <section className="paper-texture px-5 py-16 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="font-serif text-3xl font-semibold">{ui.about}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-mist">{text.description}</p>

              <h3 className="mt-9 text-sm font-semibold uppercase tracking-[0.16em] text-gold">{ui.highlights}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {text.highlights.map((feature) => (
                  <div key={feature} className="rounded-lg border hairline bg-white p-4 text-sm font-semibold">{feature}</div>
                ))}
              </div>

              <div className="mt-12 border-t hairline pt-10">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{ui.chooseLocation}</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold">{ui.locationTitle}</h2>
                <p className="mt-3 max-w-2xl leading-7 text-mist">{ui.locationIntro}</p>

                <div className="mt-7 space-y-3">
                  {item.locations.map((location, index) => {
                    const locationText = getExperienceLocationCopy(lang, location);
                    const enrichment = getExperienceLocationEnrichment(lang, location);

                    return (
                      <details key={location.slug} className="group overflow-hidden rounded-lg border hairline bg-white open:shadow-card">
                        <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:hidden">
                          <span className="flex min-w-0 items-center gap-4">
                            <span className="font-serif text-lg text-gold">{String(index + 1).padStart(2, "0")}</span>
                            <span>
                              <strong className="block font-serif text-xl leading-7">{locationText.name}</strong>
                              <span className="text-sm text-mist">{locationText.region}</span>
                            </span>
                          </span>
                          <span className="text-2xl text-moss transition group-open:rotate-45" aria-hidden="true">+</span>
                        </summary>

                        <div className="border-t hairline px-5 py-6 sm:px-16">
                          <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
                            <figure className="overflow-hidden rounded-lg border hairline bg-cream">
                              <div className="aspect-[4/3]">
                                <img
                                  src={enrichment.image}
                                  alt={enrichment.caption}
                                  loading="eager"
                                  data-fallback={enrichment.fallbackImage ?? ""}
                                  onError={(event) => {
                                    const image = event.currentTarget;
                                    const fallback = image.dataset.fallback;
                                    if (fallback && image.src !== fallback) image.src = fallback;
                                  }}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <figcaption className="px-4 py-3 text-xs leading-5 text-mist">{enrichment.caption}</figcaption>
                            </figure>

                            <div>
                              <h3 className="font-serif text-2xl font-semibold">{locationText.project}</h3>
                              <p className="mt-3 max-w-2xl leading-7 text-mist">{enrichment.overview}</p>
                              <p className="mt-3 max-w-2xl leading-7 text-mist">{enrichment.experience}</p>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-5">
                            <Link href={`/destinations/${location.provinceSlug}`} className="text-sm font-semibold text-moss hover:text-ink">{ui.destination} →</Link>
                            <Link href="/contact" className="text-sm font-semibold text-ink hover:text-moss">{ui.plan} →</Link>
                          </div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-lg bg-white p-6 shadow-card">
              <p className="text-sm text-mist">{ui.duration}</p>
              <p className="mt-1 text-xl font-semibold">{item.duration}</p>
              <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-moss px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink">{ui.plan}</Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
