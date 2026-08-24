"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  experienceThemes,
  experienceUi,
  getExperienceDuration,
  getExperienceThemeCopy,
  type ExperienceThemeCategory
} from "@/lib/experience-themes";

const categories: ExperienceThemeCategory[] = ["daily", "food", "craft", "culture", "wellness", "journey"];

export function ExperienceCatalog({ compact = false, slugs }: { compact?: boolean; slugs?: string[] }) {
  const { lang } = useLanguage();
  const ui = experienceUi[lang];
  const [active, setActive] = useState<ExperienceThemeCategory | "all">("all");
  const selected = useMemo(() => {
    const source = slugs ? experienceThemes.filter((item) => slugs.includes(item.slug)) : experienceThemes;
    const filtered = active === "all" || compact ? source : source.filter((item) => item.category === active);
    return compact ? filtered.filter((item) => item.featured).slice(0, 4) : filtered;
  }, [active, compact, slugs]);

  return (
    <div>
      {!compact && (
        <div className="no-scrollbar -mx-5 mb-9 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" aria-label={ui.all}>
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${active === "all" ? "border-moss bg-moss text-cream" : "hairline bg-white text-ink hover:border-moss"}`}
          >
            {ui.all}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${active === category ? "border-moss bg-moss text-cream" : "hairline bg-white text-ink hover:border-moss"}`}
            >
              {ui.filters[category]}
            </button>
          ))}
        </div>
      )}

      <div className={`grid gap-x-5 gap-y-8 ${compact ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-3"}`}>
        {selected.map((item, index) => {
          const text = getExperienceThemeCopy(lang, item);
          return (
            <Link
              key={item.slug}
              href={`/experiences/${item.slug}`}
              className="group min-w-0 overflow-hidden rounded-lg border hairline bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className={`relative overflow-hidden ${compact ? "h-48" : "aspect-[4/3]"}`}>
                <Image
                  src={item.hero}
                  alt={text.title}
                  fill
                  priority={index < 3}
                  sizes={compact ? "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/65 to-transparent" />
                <span className="absolute left-3 top-3 rounded-md bg-ink/80 px-3 py-1 text-xs font-semibold text-cream">{getExperienceDuration(lang, item.duration)}</span>
                <span className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-[0.12em] text-cream">{ui.filters[item.category]}</span>
              </div>
              <div className="flex min-h-[220px] flex-col p-5">
                <h3 className="safe-wrap font-serif text-2xl font-semibold leading-8 text-ink">{text.title}</h3>
                <p className="safe-wrap mt-3 text-sm leading-6 text-mist">{text.intro}</p>
                <span className="safe-wrap mt-auto inline-flex pt-6 text-sm font-semibold leading-5 text-moss">
                  {ui.explore}<span className="ms-2 shrink-0">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
