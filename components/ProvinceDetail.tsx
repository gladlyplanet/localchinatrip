"use client";

import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { useLanguage } from "@/components/LanguageProvider";
import { getProvinceName, type Province } from "@/lib/provinces";
import { getProvinceRecommendations, getRecommendationCopy, recommendationSlug } from "@/lib/province-recommendations";
import { getSiteCopy } from "@/lib/site-copy";

export function ProvinceDetail({ province }: { province: Province }) {
  const { lang, dir } = useLanguage();
  const t = getSiteCopy(lang).destinations;
  const name = getProvinceName(province.slug, lang);
  const recommendations = getProvinceRecommendations(province.slug);
  const intro = lang === "en" ? province.intro
    : lang === "zh-CN" ? `${name}拥有鲜明的自然景观、历史文化与地方生活，适合按照私人节奏深入探索。`
    : lang === "zh-TW" ? `${name}擁有鮮明的自然景觀、歷史文化與地方生活，適合按照私人節奏深入探索。`
    : lang === "es" ? `${name} combina paisajes, cultura, historia y vida local para explorar con calma.`
    : lang === "pt" ? `${name} reúne paisagens, cultura, história e vida local para explorar com calma.`
    : `${name} تجمع بين الطبيعة والثقافة والتاريخ والحياة المحلية.`;
  return <><Header /><main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-44 text-ink sm:px-8 xl:pt-36" dir={dir}><div className="mx-auto max-w-6xl"><Link href="/destinations" className="text-sm font-semibold text-moss">← {t.back}</Link><div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{t.destination}</p><h1 className="mt-4 font-serif text-6xl font-semibold sm:text-8xl">{name}</h1><p className="mt-6 max-w-3xl text-xl leading-9 text-mist">{intro}</p></div><aside className="rounded-lg bg-moss p-7 text-cream shadow-card"><p className="font-serif text-3xl">{t.provinceCta}</p><Link href="/contact" className="mt-6 inline-flex rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink">{t.plan}</Link></aside></div><section className="mt-16"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{t.recommendationEyebrow}</p><h2 className="mt-3 font-serif text-4xl font-semibold">{t.famous}</h2><p className="mt-4 max-w-2xl leading-7 text-mist">{t.recommendationIntro}</p><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{recommendations.map((item, i) => { const itemCopy = getRecommendationCopy(lang, item); return <Link key={item.name} href={`/destinations/${province.slug}/${recommendationSlug(item)}`} className="group flex min-h-64 flex-col rounded-lg border hairline bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1"><span className="text-sm font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-4 font-serif text-3xl font-semibold leading-9">{itemCopy.name}</h3><p className="mt-3 text-sm font-semibold text-moss">{itemCopy.project}</p><p className="mt-4 line-clamp-3 leading-7 text-mist">{itemCopy.description}</p><span className="mt-auto pt-6 text-sm font-semibold text-ink">{t.discover} →</span></Link>; })}</div></section></div></main><Footer /></>;
}
