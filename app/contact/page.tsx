"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { getSiteCopy } from "@/lib/site-copy";

const contactFields: Record<Lang, { travelDates: string; people: string }> = {
  en: { travelDates: "Travel dates", people: "Number of people" },
  "zh-CN": { travelDates: "旅行日期", people: "人数" },
  "zh-TW": { travelDates: "旅行日期", people: "人數" },
  es: { travelDates: "Fechas de viaje", people: "Número de personas" },
  pt: { travelDates: "Datas da viagem", people: "Número de pessoas" },
  ar: { travelDates: "تواريخ السفر", people: "عدد الأشخاص" }
};

const statusCopy: Record<Lang, Record<string, string>> = {
  en: {
    missing: "Please complete the required fields and send again.",
    "email-not-configured": "The mail service is not configured yet. Please email ly13845267281@sina.com directly.",
    "email-failed": "The message could not be sent. Please email ly13845267281@sina.com directly."
  },
  "zh-CN": {
    missing: "请先填写必填信息，再重新发送。",
    "email-not-configured": "邮件服务还没有配置好，请直接发送到 ly13845267281@sina.com。",
    "email-failed": "邮件没有发送成功，请直接发送到 ly13845267281@sina.com。"
  },
  "zh-TW": {
    missing: "請先填寫必填資訊，再重新送出。",
    "email-not-configured": "郵件服務尚未設定好，請直接寄到 ly13845267281@sina.com。",
    "email-failed": "郵件沒有成功送出，請直接寄到 ly13845267281@sina.com。"
  },
  es: {
    missing: "Completa los campos obligatorios y envía de nuevo.",
    "email-not-configured": "El servicio de correo no está configurado. Escribe directamente a ly13845267281@sina.com.",
    "email-failed": "No se pudo enviar el mensaje. Escribe directamente a ly13845267281@sina.com."
  },
  pt: {
    missing: "Preencha os campos obrigatórios e envie novamente.",
    "email-not-configured": "O serviço de e-mail ainda não está configurado. Escreva diretamente para ly13845267281@sina.com.",
    "email-failed": "A mensagem não foi enviada. Escreva diretamente para ly13845267281@sina.com."
  },
  ar: {
    missing: "يرجى إكمال الحقول المطلوبة ثم الإرسال مرة أخرى.",
    "email-not-configured": "خدمة البريد غير مهيأة بعد. يرجى المراسلة مباشرة على ly13845267281@sina.com.",
    "email-failed": "تعذر إرسال الرسالة. يرجى المراسلة مباشرة على ly13845267281@sina.com."
  }
};

export default function ContactPage() {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).contact;
  const fields = contactFields[lang] ?? contactFields.en;
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(new URLSearchParams(window.location.search).get("status") ?? "");
  }, []);

  const statusMessage = (statusCopy[lang] ?? statusCopy.en)[status];

  return (
    <>
      <Header />
      <main className="bg-ink pt-[124px] text-bone xl:pt-20" dir={dir}>
        <section className="grid min-h-[calc(100vh-124px)] lg:grid-cols-[0.92fr_1.08fr] xl:min-h-[calc(100vh-80px)]">
          <div className="relative min-h-[42vh] lg:min-h-0"><Image src="/images/real-night-market.jpg" alt={t.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" /></div>
          <div className="flex items-center px-5 py-14 sm:px-8 lg:px-16"><div className="w-full max-w-xl"><p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p><h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1><p className="mt-7 text-lg leading-8 text-mist">{t.intro}</p>
            {statusMessage ? <p className="mt-8 rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-6 text-bone">{statusMessage}</p> : null}
            <form className="mt-10 grid gap-4" action="/api/contact" method="post">
              <input type="hidden" name="form_type" value="Travel enquiry" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={t.name} aria-label={t.name} name="name" required />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={t.email} type="email" aria-label={t.email} name="email" required />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={fields.travelDates} aria-label={fields.travelDates} name="travel_dates" required />
              <input className="h-14 rounded-md border hairline bg-bone/5 px-4 text-bone outline-none focus:border-gold" placeholder={fields.people} type="number" min="1" aria-label={fields.people} name="number_of_people" required />
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
