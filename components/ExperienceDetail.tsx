"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { experienceThemes, experienceUi, getExperienceDuration, getExperienceTheme, getExperienceThemeCopy } from "@/lib/experience-themes";

export function ExperienceDetail({ slug }: { slug: string }) {
  const { lang, dir } = useLanguage();
  const item = getExperienceTheme(slug);
  if (!item) return null;

  const text = getExperienceThemeCopy(lang, item);
  const ui = experienceUi[lang];
  const related = experienceThemes.filter((candidate) => candidate.slug !== item.slug && candidate.category === item.category).slice(0, 3);

  return (
    <>
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20" dir={dir}>
        <section className="relative min-h-[680px] overflow-hidden sm:min-h-[720px] lg:min-h-[calc(100vh-80px)]">
          <Image src={item.hero} alt={text.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
          <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-end px-5 pb-12 sm:min-h-[720px] sm:px-8 sm:pb-16 lg:min-h-[calc(100vh-80px)]">
            <div className="min-w-0 max-w-4xl text-cream">
              <Link href="/experiences" className="inline-flex text-sm font-semibold text-cream/80 transition hover:text-gold">← {ui.back}</Link>
              <p className="safe-wrap mt-8 text-sm font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{ui.filters[item.category]}</p>
              <h1 className="safe-wrap mt-4 font-serif text-5xl font-semibold leading-[1.03] sm:text-7xl lg:text-8xl">{text.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-cream/90 sm:text-xl sm:leading-9">{text.intro}</p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream/25 pt-5 text-sm font-semibold text-cream/85">
                <span>{ui.duration}: {getExperienceDuration(lang, item.duration)}</span>
                <span>{ui.private}</span>
                <span>{ui.flexible}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="paper-texture border-b hairline px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{ui.story}</p>
              <h2 className="safe-wrap mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{text.title}</h2>
            </div>
            <div className="max-w-3xl space-y-6 text-lg leading-9 text-mist">
              {text.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{ui.gallery}</p>
                <h2 className="safe-wrap mt-3 font-serif text-4xl font-semibold sm:text-5xl">{ui.moments}</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-mist">{ui.respectful} · {ui.flexible}</p>
            </div>

            <div className="mt-10 grid auto-rows-[220px] gap-4 sm:auto-rows-[280px] sm:grid-cols-2 lg:grid-cols-12">
              {item.gallery.map((image, index) => (
                <figure
                  key={image}
                  className={`group relative overflow-hidden rounded-lg ${index === 0 ? "sm:row-span-2 lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-5"}`}
                >
                  <Image src={image} alt={text.captions[index] ?? text.title} fill sizes="(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-4 pt-16">
                    <figcaption className="text-sm font-medium leading-6 text-cream">{text.captions[index] ?? text.title}</figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="paper-texture px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{ui.moments}</p>
            <div className="mt-5 grid border-y hairline md:grid-cols-3">
              {text.moments.map(([title, body], index) => (
                <article key={title} className={`min-w-0 py-8 md:px-8 ${index > 0 ? "border-t hairline md:border-l md:border-t-0" : ""}`}>
                  <span className="font-serif text-2xl text-gold">0{index + 1}</span>
                  <h3 className="safe-wrap mt-5 font-serif text-2xl font-semibold leading-8">{title}</h3>
                  <p className="mt-3 leading-7 text-mist">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink px-5 py-16 text-cream sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{ui.flow}</p>
              <h2 className="safe-wrap mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">{ui.practical}</h2>
            </div>
            <ol className="border-t border-cream/20">
              {text.flow.map(([title, body], index) => (
                <li key={`${title}-${index}`} className="grid gap-3 border-b border-cream/20 py-6 sm:grid-cols-[58px_0.75fr_1.25fr] sm:items-start">
                  <span className="font-serif text-xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="safe-wrap font-serif text-xl font-semibold leading-7">{title}</h3>
                  <p className="leading-7 text-cream/70">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg bg-moss text-cream lg:grid-cols-[1fr_0.9fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{ui.private} · {ui.flexible}</p>
              <h2 className="safe-wrap mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">{text.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/80">{text.intro}</p>
              <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-cream px-7 py-3 text-sm font-semibold text-ink transition hover:bg-gold">{ui.plan} →</Link>
            </div>
            <div className="relative min-h-[320px] lg:min-h-full">
              <Image src={item.gallery[0]} alt={text.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t hairline px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-7xl">
              <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{ui.related}</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {related.map((candidate) => {
                  const candidateText = getExperienceThemeCopy(lang, candidate);
                  return (
                    <Link key={candidate.slug} href={`/experiences/${candidate.slug}`} className="group overflow-hidden rounded-lg border hairline bg-white">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={candidate.hero} alt={candidateText.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                      </div>
                      <div className="p-5">
                        <h3 className="safe-wrap font-serif text-xl font-semibold leading-7">{candidateText.title}</h3>
                        <span className="mt-3 inline-flex text-sm font-semibold text-moss">{ui.explore} →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
