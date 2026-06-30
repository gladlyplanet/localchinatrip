"use client";

import Image from "next/image";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getSiteCopy } from "@/lib/site-copy";

export default function ContactPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).contact;
  return (
    <>
      <Header />
      <main className="bg-ink pt-[124px] text-bone xl:pt-20" dir={dir}>
        <section className="grid min-h-[calc(100vh-124px)] lg:grid-cols-[0.92fr_1.08fr] xl:min-h-[calc(100vh-80px)]">
          <div className="relative min-h-[42vh] lg:min-h-0"><Image src="/images/real-night-market.jpg" alt={t.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" /></div>
          <div className="flex items-center px-5 py-14 sm:px-8 lg:px-16"><div className="w-full max-w-xl"><p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p><h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1><p className="mt-7 text-lg leading-8 text-mist">{t.intro}</p>
            <form className="mt-10 grid gap-4" action="https://formsubmit.co/ly13845267281@sina.com" method="post">
              <input type="hidden" name="_subject" value="New Local China travel enquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://www.localchinatrip.com/thank-you" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={t.name} aria-label={t.name} name="name" required />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={t.email} type="email" aria-label={t.email} name="email" required />
              <textarea className="min-h-36 rounded-md border hairline bg-bone/5 px-4 py-4 text-bone outline-none focus:border-gold" placeholder={t.message} aria-label={t.message} name="message" required />
              <button type="submit" className="mt-2 h-12 rounded-full bg-bone px-7 text-sm font-medium text-ink transition hover:bg-gold">{t.send}</button>
            </form>
            <p className="mt-6 text-sm text-mist">{t.direct} <a className="text-bone" href="mailto:ly13845267281@sina.com">ly13845267281@sina.com</a></p>
          </div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
