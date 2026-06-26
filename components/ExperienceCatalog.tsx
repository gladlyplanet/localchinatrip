"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { experiences, getExperienceCopy } from "@/lib/experiences";
import { getSiteCopy } from "@/lib/site-copy";

export function ExperienceCatalog({ compact = false, slugs }: { compact?: boolean; slugs?: string[] }) {
  const { lang } = useLanguage();
  const ui = getSiteCopy(lang).experiences;
  const selected = slugs ? experiences.filter((item) => slugs.includes(item.slug)) : experiences;
  const items = compact ? selected.slice(0, 4) : selected;

  return (
    <div className={`grid gap-5 ${compact ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
      {items.map((item) => {
        const text = getExperienceCopy(lang, item.slug);
        return (
          <Link key={item.slug} href={`/experiences/${item.slug}`} className="group overflow-hidden rounded-lg border hairline bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
            <div className="relative h-48 overflow-hidden">
              <Image src={item.image} alt={text.title} fill sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-md bg-ink/80 px-3 py-1 text-xs font-semibold text-cream">{item.duration}</span>
            </div>
            <div className="p-4">
              <h3 className="font-serif text-xl font-semibold leading-7 text-ink">{text.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-mist">{text.intro}</p>
              <p className="mt-3 text-xs font-semibold text-moss">{item.locations.length} {ui.locations}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-ink">{ui.view} <span className="ms-2 text-moss">→</span></span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
