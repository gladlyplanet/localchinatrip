"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { WuhanNationwideMap } from "@/components/WuhanNationwideMap";
import { getSiteCopy } from "@/lib/site-copy";

const formCopy: Record<Lang, { name: string; email: string; notice: string }> = {
  en: {
    name: "Name",
    email: "Email",
    notice: "Vehicle images illustrate the service setup. Final vehicle details are confirmed before departure."
  },
  "zh-CN": {
    name: "姓名",
    email: "邮箱",
    notice: "车辆图片用于展示服务形式，最终车辆细节会在出发前确认。"
  },
  "zh-TW": {
    name: "姓名",
    email: "電子郵件",
    notice: "車輛圖片用於展示服務形式，最終車輛細節會在出發前確認。"
  },
  es: {
    name: "Nombre",
    email: "Correo",
    notice: "Las imágenes del vehículo ilustran el servicio. Los detalles finales se confirman antes de la salida."
  },
  pt: {
    name: "Nome",
    email: "E-mail",
    notice: "As imagens do veículo ilustram o serviço. Os detalhes finais são confirmados antes da partida."
  },
  ar: {
    name: "الاسم",
    email: "البريد الإلكتروني",
    notice: "صور السيارة توضح شكل الخدمة. يتم تأكيد التفاصيل النهائية قبل المغادرة."
  }
};

export default function PrivateCarPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).car;
  const formText = formCopy[lang] ?? formCopy.en;
  return (
    <>
      <Header />
      <main className="bg-[#0d0f0c] pt-[124px] text-white xl:pt-20" dir={dir}>
        <section className="relative min-h-[620px] overflow-hidden lg:min-h-[720px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,#3e4936_0,transparent_38%)]" />
          <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:min-h-[720px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="z-10 min-w-0"><p className="safe-wrap text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-gold">{t.eyebrow}</p><h1 className="safe-wrap mt-5 font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">{t.title}</h1><p className="safe-wrap mt-7 max-w-xl text-lg leading-8 text-white/70">{t.intro}</p><Link href="#customize" className="safe-wrap mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 text-center text-sm font-semibold leading-5 text-ink">{t.cta}</Link></div>
            <div className="relative min-h-[360px]"><Image src="/images/l6-profile.png" alt="New-energy private travel vehicle" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain" /></div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#151713] px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {[
              ["/images/l6-profile.png", t.exterior, t.exteriorBody, "contain"],
              ["/images/l6-interior.jpg", t.cabin, t.cabinBody, "cover"],
              ["/images/l6-ride.jpg", t.ride, t.rideBody, "cover"]
            ].map(([image, title, body, fit], index) => <article key={title} className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-black"><div className="relative aspect-[4/3] bg-[#eef0ee]"><Image src={image} alt={title} fill priority={index === 0} sizes="(min-width: 1024px) 33vw, 100vw" className={fit === "contain" ? "object-contain" : "object-cover"} /></div><div className="p-6"><h2 className="safe-wrap font-serif text-3xl leading-tight">{title}</h2><p className="safe-wrap mt-4 leading-7 text-white/65">{body}</p></div></article>)}
          </div>
        </section>

        <section id="nationwide-map" className="scroll-mt-24 px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div className="min-w-0"><p className="safe-wrap text-xs uppercase leading-5 tracking-[0.18em] text-gold">{t.eyebrow}</p><h2 className="safe-wrap mt-4 font-serif text-3xl leading-tight sm:text-5xl lg:text-6xl">{t.mapTitle}</h2><p className="safe-wrap mt-6 max-w-xl text-lg leading-8 text-white/65">{t.mapBody}</p></div><WuhanNationwideMap title={t.mapTitle} /></div>
        </section>

        <section id="customize" className="scroll-mt-28 bg-[#ece9e1] px-5 py-20 text-ink sm:px-8">
          <div className="mx-auto max-w-7xl"><h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{t.formTitle}</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{t.features.map(([title, body]) => <div key={title} className="min-w-0 border-s-2 border-moss ps-5"><h3 className="safe-wrap text-lg font-semibold">{title}</h3><p className="safe-wrap mt-3 text-sm leading-6 text-mist">{body}</p></div>)}</div>
            <form className="mt-12 grid gap-5 rounded-lg bg-white p-6 shadow-card md:grid-cols-2" action="/api/contact" method="post">
              <input type="hidden" name="form_type" value="Private car enquiry" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <label className="text-sm font-semibold">{formText.name}<input name="name" required className="mt-2 h-12 w-full rounded-md border hairline px-3 font-normal" /></label>
              <label className="text-sm font-semibold">{formText.email}<input name="email" type="email" required className="mt-2 h-12 w-full rounded-md border hairline px-3 font-normal" /></label>
              <label className="text-sm font-semibold">{t.days}<select name="days" className="mt-2 h-12 w-full rounded-md border hairline bg-white px-3 font-normal">{t.options.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="text-sm font-semibold">{t.destination}<input name="destination" className="mt-2 h-12 w-full rounded-md border hairline px-3 font-normal" /></label>
              <label className="text-sm font-semibold">{t.group}<input name="group" type="number" min="1" max="6" defaultValue="2" className="mt-2 h-12 w-full rounded-md border hairline px-3 font-normal" /></label>
              <label className="text-sm font-semibold">{t.needs}<input name="needs" className="mt-2 h-12 w-full rounded-md border hairline px-3 font-normal" /></label>
              <input type="hidden" name="message" value="Private car enquiry" />
              <button className="safe-wrap min-h-12 rounded-full bg-moss px-7 py-3 text-sm font-semibold leading-5 text-white md:col-span-2">{t.cta}</button>
              <p className="safe-wrap text-center text-sm leading-6 text-mist md:col-span-2">
                {lang === "zh-CN" ? "也可直接发送邮件至" : lang === "zh-TW" ? "也可直接寄信至" : lang === "es" ? "También puedes escribir directamente a" : lang === "pt" ? "Também pode escrever diretamente para" : lang === "ar" ? "يمكنك أيضا المراسلة مباشرة على" : "You can also email"}{" "}
                <a className="font-semibold text-moss underline-offset-4 hover:underline" href="mailto:ly13845267281@sina.com">ly13845267281@sina.com</a>
              </p>
            </form>
          </div>
        </section>
        <p className="bg-[#ece9e1] px-5 pb-8 text-center text-xs text-mist">{formText.notice}</p>
      </main>
      <Footer />
    </>
  );
}
