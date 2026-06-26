"use client";

import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getSiteCopy } from "@/lib/site-copy";

export default function FaqPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).faq;
  return (
    <>
      <Header />
      <main className="min-h-screen bg-ink px-5 pb-24 pt-44 text-bone sm:px-8 xl:pt-36" dir={dir}>
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p>
          <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1>
          <p className="mt-7 text-lg leading-8 text-mist">{t.intro}</p>
          <div className="mt-12 divide-y hairline overflow-hidden rounded-lg border hairline bg-charcoal">{t.items.map(([question, answer]) => <details key={question} className="group p-6 open:bg-bone open:text-ink sm:p-8"><summary className="cursor-pointer list-none font-serif text-2xl group-open:text-ink sm:text-3xl">{question}</summary><p className="mt-5 leading-8 text-mist group-open:text-ink/75">{answer}</p></details>)}</div>
          <Link href="/contact" className="mt-10 inline-flex h-12 items-center rounded-full bg-bone px-7 text-sm font-medium text-ink">{t.cta}</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
