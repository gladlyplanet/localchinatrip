"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getSiteCopy } from "@/lib/site-copy";

const serviceImages = [
  "/images/experience-hongcun.jpg",
  "/images/experience-suzhou-craft.jpg",
  "/images/experience-guilin-ride.jpg",
  "/images/experience-chengdu-market.jpg"
];

export default function ServicesPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).services;
  return (
    <>
      <Header />
      <main className="bg-ink pt-[124px] text-bone xl:pt-20" dir={dir}>
        <section className="relative min-h-[68vh] overflow-hidden">
          <Image src="/images/experience-guilin-ride.jpg" alt={t.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-7xl items-end px-5 pb-16 sm:px-8"><div className="max-w-3xl"><p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p><h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1><p className="mt-7 text-lg leading-8 text-bone/80">{t.intro}</p></div></div>
        </section>
        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
            {t.groups.map(([title, body], index) => (
              <article key={title} className="overflow-hidden rounded-lg border hairline border-bone/15 bg-charcoal shadow-soft">
                <div className="relative h-64">
                  <Image src={serviceImages[index]} alt={title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                </div>
                <div className="p-8 sm:p-10">
                  <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
                  <p className="mt-5 leading-8 text-mist">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-bone px-5 py-20 text-ink sm:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><h2 className="font-serif text-4xl leading-tight sm:text-6xl">{t.consultTitle}</h2><div><p className="text-lg leading-8 text-ink/70">{t.consultBody}</p><Link href="/contact" className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-bone">{t.cta}</Link></div></div></section>
      </main>
      <Footer />
    </>
  );
}
