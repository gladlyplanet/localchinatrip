"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { WuhanNationwideMap } from "@/components/WuhanNationwideMap";
import { getSiteCopy } from "@/lib/site-copy";

export default function PrivateCarPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).car;
  return (
    <>
      <Header />
      <main className="bg-[#0d0f0c] pt-[124px] text-white xl:pt-20" dir={dir}>
        <section className="relative min-h-[620px] overflow-hidden lg:min-h-[720px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,#3e4936_0,transparent_38%)]" />
          <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:min-h-[720px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="z-10"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{t.eyebrow}</p><h1 className="mt-5 font-serif text-5xl font-semibold leading-tight sm:text-7xl">{t.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-white/70">{t.intro}</p><Link href="#customize" className="mt-9 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink">{t.cta}</Link></div>
            <div className="relative min-h-[360px]"><Image src="/images/l6-profile.png" alt="New-energy private travel vehicle" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" /></div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#151713] px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {[
              ["/images/l6-profile.png", t.exterior, t.exteriorBody, "contain"],
              ["/images/l6-interior.jpg", t.cabin, t.cabinBody, "cover"],
              ["/images/l6-ride.jpg", t.ride, t.rideBody, "cover"]
            ].map(([image, title, body, fit]) => <article key={title} className="overflow-hidden rounded-lg border border-white/10 bg-black"><div className="relative aspect-[4/3] bg-[#eef0ee]"><Image src={image} alt={title} fill sizes="33vw" className={fit === "contain" ? "object-contain" : "object-cover"} /></div><div className="p-6"><h2 className="font-serif text-3xl">{title}</h2><p className="mt-4 leading-7 text-white/65">{body}</p></div></article>)}
          </div>
        </section>

        <section id="nationwide-map" className="scroll-mt-24 px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div><p className="text-xs uppercase tracking-[0.2em] text-gold">{t.eyebrow}</p><h2 className="mt-4 font-serif text-4xl sm:text-6xl">{t.mapTitle}</h2><p className="mt-6 max-w-xl text-lg leading-8 text-white/65">{t.mapBody}</p></div><WuhanNationwideMap title={t.mapTitle} /></div>
        </section>

        <section id="customize" className="scroll-mt-28 bg-[#ece9e1] px-5 py-20 text-ink sm:px-8">
          <div className="mx-auto max-w-7xl"><h2 className="font-serif text-4xl font-semibold sm:text-6xl">{t.formTitle}</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{t.features.map(([title, body]) => <div key={title} className="border-s-2 border-moss ps-5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-mist">{body}</p></div>)}</div>
            <form className="mt-12 grid gap-5 rounded-lg bg-white p-6 shadow-card md:grid-cols-2" action="https://formsubmit.co/ly13845267281@sina.com" method="post">
              <input type="hidden" name="_subject" value="New Local China private car enquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://www.localchinatrip.com/thank-you" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <label className="text-sm font-semibold">{t.days}<select name="days" className="mt-2 h-12 w-full rounded-md border hairline bg-white px-3 font-normal">{t.options.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="text-sm font-semibold">{t.destination}<input name="destination" className="mt-2 h-12 w-full rounded-md border hairline px-3 font-normal" /></label>
              <label className="text-sm font-semibold">{t.group}<input name="group" type="number" min="1" max="6" defaultValue="2" className="mt-2 h-12 w-full rounded-md border hairline px-3 font-normal" /></label>
              <label className="text-sm font-semibold">{t.needs}<input name="needs" className="mt-2 h-12 w-full rounded-md border hairline px-3 font-normal" /></label>
              <button className="h-12 rounded-full bg-moss px-7 text-sm font-semibold text-white md:col-span-2">{t.cta}</button>
            </form>
          </div>
        </section>
        <p className="bg-[#ece9e1] px-5 pb-8 text-center text-xs text-mist">Vehicle images illustrate the service setup. Final vehicle details are confirmed before departure.</p>
      </main>
      <Footer />
    </>
  );
}
