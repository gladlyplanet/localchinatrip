"use client";

import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage, type Lang } from "@/components/LanguageProvider";

const copy: Record<Lang, { eyebrow: string; title: string; body: string; home: string; another: string }> = {
  en: {
    eyebrow: "Enquiry sent",
    title: "Thank you.",
    body: "Your message has been sent. I will reply by email or WhatsApp as soon as possible.",
    home: "Back to home",
    another: "Send another enquiry"
  },
  "zh-CN": {
    eyebrow: "咨询已发送",
    title: "谢谢。",
    body: "你的信息已经发送成功。我会尽快通过邮箱或 WhatsApp 回复你。",
    home: "返回首页",
    another: "再发送一条咨询"
  },
  "zh-TW": {
    eyebrow: "諮詢已送出",
    title: "謝謝。",
    body: "你的資訊已成功送出。我會盡快透過電子郵件或 WhatsApp 回覆你。",
    home: "返回首頁",
    another: "再送出一則諮詢"
  },
  es: {
    eyebrow: "Consulta enviada",
    title: "Gracias.",
    body: "Tu mensaje ha sido enviado. Te responderé por correo electrónico o WhatsApp lo antes posible.",
    home: "Volver al inicio",
    another: "Enviar otra consulta"
  },
  pt: {
    eyebrow: "Consulta enviada",
    title: "Obrigado.",
    body: "Sua mensagem foi enviada. Responderei por e-mail ou WhatsApp assim que possível.",
    home: "Voltar ao início",
    another: "Enviar outra consulta"
  },
  ar: {
    eyebrow: "تم إرسال الطلب",
    title: "شكراً لك.",
    body: "تم إرسال رسالتك. سأرد عليك عبر البريد الإلكتروني أو واتساب في أقرب وقت ممكن.",
    home: "العودة إلى الصفحة الرئيسية",
    another: "إرسال طلب آخر"
  }
};

export default function ThankYouPage() {
  const { lang, dir } = useLanguage();
  const text = copy[lang] ?? copy.en;

  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-44 text-ink sm:px-8 xl:pt-36" dir={dir}>
        <section className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{text.eyebrow}</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight sm:text-7xl">{text.title}</h1>
          <p className="mt-7 text-xl leading-9 text-mist">
            {text.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">
              {text.home}
            </Link>
            <Link href="/contact" className="inline-flex rounded-full border hairline px-7 py-3 text-sm font-semibold text-ink">
              {text.another}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
