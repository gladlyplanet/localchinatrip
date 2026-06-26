"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";

export type Lang = "en" | "zh-CN" | "zh-TW" | "es" | "pt" | "ar";

export const languageOptions: { code: Lang; label: string; short: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "zh-CN", label: "简体中文", short: "简", dir: "ltr" },
  { code: "zh-TW", label: "繁體中文", short: "繁", dir: "ltr" },
  { code: "es", label: "Español", short: "ES", dir: "ltr" },
  { code: "pt", label: "Português", short: "PT", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" }
];

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function applyDocumentLanguage(lang: Lang) {
  const option = languageOptions.find((item) => item.code === lang) ?? languageOptions[0];
  document.documentElement.lang = option.code;
  document.documentElement.dir = option.dir;
  document.documentElement.dataset.language = option.code;
}

export function LanguageProvider({ children, initialLang = "en" }: { children: React.ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useLayoutEffect(() => {
    const saved = window.localStorage.getItem("local-china-lang") as Lang | null;
    const initial = saved && languageOptions.some((item) => item.code === saved) ? saved : initialLang;
    setLangState(initial);
    applyDocumentLanguage(initial);
  }, [initialLang]);

  const setLang = useCallback((nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem("local-china-lang", nextLang);
    document.cookie = `local-china-lang=${encodeURIComponent(nextLang)}; Max-Age=31536000; Path=/; SameSite=Lax`;
    applyDocumentLanguage(nextLang);
  }, []);

  const dir = languageOptions.find((option) => option.code === lang)?.dir ?? "ltr";
  const value = useMemo(() => ({ lang, dir, setLang }), [dir, lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
