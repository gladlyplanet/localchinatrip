"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { useLanguage, type Lang } from "@/components/LanguageProvider";
import { breadcrumbSchema } from "@/lib/seo";
import { getSiteCopy } from "@/lib/site-copy";

type ContactFields = {
  whatsapp: string;
  travelDates: string;
  travelers: string;
  places: string;
  experience: string;
  pace: string;
  paceOptions: string[];
  budget: string;
  budgetOptions: string[];
  details: string;
};

const contactFields: Record<Lang, ContactFields> = {
  en: {
    whatsapp: "WhatsApp / phone (optional)",
    travelDates: "Travel dates or approximate dates",
    travelers: "Number of travelers",
    places: "Cities or places you are interested in",
    experience: "What kind of China would you like to experience?",
    pace: "Preferred travel pace",
    paceOptions: ["Not sure yet", "Relaxed", "Balanced", "Active"],
    budget: "Approximate budget per person (optional)",
    budgetOptions: ["Not sure yet", "Under US$1,500", "US$1,500–3,000", "US$3,000–5,000", "US$5,000+"],
    details: "Anything else I should know?",
  },
  "zh-CN": {
    whatsapp: "WhatsApp / 电话（选填）",
    travelDates: "旅行日期或大致时间",
    travelers: "旅行人数",
    places: "感兴趣的城市或地点",
    experience: "你希望体验怎样的中国？",
    pace: "偏好的旅行节奏",
    paceOptions: ["暂不确定", "轻松", "适中", "充实"],
    budget: "每人大致预算（选填）",
    budgetOptions: ["暂不确定", "低于 1,500 美元", "1,500–3,000 美元", "3,000–5,000 美元", "5,000 美元以上"],
    details: "还有什么需要提前了解？",
  },
  "zh-TW": {
    whatsapp: "WhatsApp / 電話（選填）",
    travelDates: "旅行日期或大致時間",
    travelers: "旅行人數",
    places: "感興趣的城市或地點",
    experience: "你希望體驗怎樣的中國？",
    pace: "偏好的旅行節奏",
    paceOptions: ["暫不確定", "輕鬆", "適中", "充實"],
    budget: "每人大致預算（選填）",
    budgetOptions: ["暫不確定", "低於 1,500 美元", "1,500–3,000 美元", "3,000–5,000 美元", "5,000 美元以上"],
    details: "還有什麼需要提前了解？",
  },
  es: {
    whatsapp: "WhatsApp / teléfono (opcional)",
    travelDates: "Fechas o periodo aproximado",
    travelers: "Número de viajeros",
    places: "Ciudades o lugares que te interesan",
    experience: "¿Qué tipo de China te gustaría vivir?",
    pace: "Ritmo de viaje preferido",
    paceOptions: ["Aún no lo sé", "Tranquilo", "Equilibrado", "Activo"],
    budget: "Presupuesto aproximado por persona (opcional)",
    budgetOptions: ["Aún no lo sé", "Menos de US$1.500", "US$1.500–3.000", "US$3.000–5.000", "US$5.000+"],
    details: "¿Hay algo más que deba saber?",
  },
  pt: {
    whatsapp: "WhatsApp / telefone (opcional)",
    travelDates: "Datas ou período aproximado",
    travelers: "Número de viajantes",
    places: "Cidades ou lugares de interesse",
    experience: "Que tipo de China gostaria de conhecer?",
    pace: "Ritmo de viagem preferido",
    paceOptions: ["Ainda não sei", "Tranquilo", "Equilibrado", "Ativo"],
    budget: "Orçamento aproximado por pessoa (opcional)",
    budgetOptions: ["Ainda não sei", "Menos de US$1.500", "US$1.500–3.000", "US$3.000–5.000", "US$5.000+"],
    details: "Há mais alguma coisa que devo saber?",
  },
  ar: {
    whatsapp: "واتساب / هاتف (اختياري)",
    travelDates: "تواريخ السفر أو الفترة التقريبية",
    travelers: "عدد المسافرين",
    places: "المدن أو الأماكن التي تهمك",
    experience: "ما نوع التجربة التي ترغب بها في الصين؟",
    pace: "إيقاع السفر المفضل",
    paceOptions: ["لست متأكدا بعد", "هادئ", "متوازن", "نشط"],
    budget: "الميزانية التقريبية للشخص (اختياري)",
    budgetOptions: ["لست متأكدا بعد", "أقل من 1,500 دولار", "1,500–3,000 دولار", "3,000–5,000 دولار", "5,000 دولار فأكثر"],
    details: "هل هناك شيء آخر ينبغي أن أعرفه؟",
  },
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
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <Header />
      <main className="bg-ink pt-[124px] text-bone xl:pt-20" dir={dir}>
        <section className="grid min-h-[calc(100vh-124px)] lg:grid-cols-[0.92fr_1.08fr] xl:min-h-[calc(100vh-80px)]">
          <div className="relative min-h-[42vh] lg:min-h-0"><Image src="/images/real-night-market.jpg" alt={t.title} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" /></div>
          <div className="flex items-center px-5 py-14 sm:px-8 lg:px-16"><div className="w-full max-w-xl"><p className="text-xs uppercase tracking-[0.24em] text-gold">{t.eyebrow}</p><h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">{t.title}</h1><p className="mt-7 text-lg leading-8 text-mist">{t.intro}</p>
            {statusMessage ? <p className="mt-8 rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-6 text-bone">{statusMessage}</p> : null}
            <form className="mt-10 grid gap-4 sm:grid-cols-2" action="/api/contact" method="post">
              <input type="hidden" name="form_type" value="Travel enquiry" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <label className="text-sm font-semibold text-bone">{t.name} *<input className="mt-2 h-14 w-full rounded-md border hairline bg-bone/5 px-4 font-normal text-bone outline-none focus:border-gold" name="name" autoComplete="name" required /></label>
              <label className="text-sm font-semibold text-bone">{t.email} *<input className="mt-2 h-14 w-full rounded-md border hairline bg-bone/5 px-4 font-normal text-bone outline-none focus:border-gold" type="email" name="email" autoComplete="email" required /></label>
              <label className="text-sm font-semibold text-bone">{fields.whatsapp}<input className="mt-2 h-14 w-full rounded-md border hairline bg-bone/5 px-4 font-normal text-bone outline-none focus:border-gold" name="whatsapp_phone" autoComplete="tel" /></label>
              <label className="text-sm font-semibold text-bone">{fields.travelDates}<input className="mt-2 h-14 w-full rounded-md border hairline bg-bone/5 px-4 font-normal text-bone outline-none focus:border-gold" name="travel_dates" placeholder="October 2026 or flexible" /></label>
              <label className="text-sm font-semibold text-bone">{fields.travelers}<input className="mt-2 h-14 w-full rounded-md border hairline bg-bone/5 px-4 font-normal text-bone outline-none focus:border-gold" type="number" min="1" name="number_of_travelers" /></label>
              <label className="text-sm font-semibold text-bone">{fields.pace}<select className="mt-2 h-14 w-full rounded-md border hairline bg-ink px-4 font-normal text-bone outline-none focus:border-gold" name="travel_pace">{fields.paceOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="text-sm font-semibold text-bone sm:col-span-2">{fields.places}<textarea className="mt-2 min-h-24 w-full rounded-md border hairline bg-bone/5 px-4 py-3 font-normal text-bone outline-none focus:border-gold" name="places" /></label>
              <label className="text-sm font-semibold text-bone sm:col-span-2">{fields.experience}<textarea className="mt-2 min-h-24 w-full rounded-md border hairline bg-bone/5 px-4 py-3 font-normal text-bone outline-none focus:border-gold" name="experience_interests" /></label>
              <label className="text-sm font-semibold text-bone sm:col-span-2">{fields.budget}<select className="mt-2 h-14 w-full rounded-md border hairline bg-ink px-4 font-normal text-bone outline-none focus:border-gold" name="budget">{fields.budgetOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <label className="text-sm font-semibold text-bone sm:col-span-2">{fields.details}<textarea className="mt-2 min-h-32 w-full rounded-md border hairline bg-bone/5 px-4 py-3 font-normal text-bone outline-none focus:border-gold" name="message" /></label>
              <button type="submit" className="mt-2 h-12 rounded-full bg-bone px-7 text-sm font-medium text-ink transition hover:bg-gold sm:col-span-2">{t.send}</button>
            </form>
            <p className="mt-6 text-sm text-mist">{t.direct} <a className="text-bone" href="mailto:ly13845267281@sina.com">ly13845267281@sina.com</a></p>
          </div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
