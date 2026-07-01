"use client";

import Image from "next/image";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getSiteCopy } from "@/lib/site-copy";

export default function ContactPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).contact;
  const contactFields = {
    en: { travelDates: "Travel dates", people: "Number of people" },
    "zh-CN": { travelDates: "旅行日期", people: "人数" },
    "zh-TW": { travelDates: "旅行日期", people: "人數" },
    es: { travelDates: "Fechas de viaje", people: "Número de personas" },
    pt: { travelDates: "Datas da viagem", people: "Número de pessoas" },
    ar: { travelDates: "تواريخ السفر", people: "عدد الأشخاص" }
  }[lang] ?? { travelDates: "Travel dates", people: "Number of people" };
  return (
    <>
      <Header />
      <main className="bg-ink pt-[124px] text-bone xl:pt-20" dir={dir}>
        <section className="grid min-h-[calc(100vh-124px)] lg:grid-cols-[0.92fr_1.08fr] xl:min-h-[calc(100vh-80px)]">
          <div className="relative min-h-[42vh] lg:min-h-0"><Image src="/images/real-night-market.jpg" alt={t.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" /></div>
          <div className="flex items-center px-5 py-14 sm:px-8 lg:px-16"><div className="w-full max-w-xl"><p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p><h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1><p className="mt-7 text-lg leading-8 text-mist">{t.intro}</p>
            <form className="mt-10 grid gap-4" action="/api/contact" method="post">
              <input type="hidden" name="form_type" value="Travel enquiry" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={t.name} aria-label={t.name} name="name" required />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={t.email} type="email" aria-label={t.email} name="email" required />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={contactFields.travelDates} aria-label={contactFields.travelDates} name="travel_dates" required />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={contactFields.people} type="number" min="1" aria-label={contactFields.people} name="number_of_people" required />
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
