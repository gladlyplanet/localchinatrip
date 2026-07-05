"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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

const storageKey = "local-china-lang";
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function isSupportedLang(value: string | null | undefined): value is Lang {
  return !!value && languageOptions.some((item) => item.code === value);
}

function applyDocumentLanguage(lang: Lang) {
  const option = languageOptions.find((item) => item.code === lang) ?? languageOptions[0];
  document.documentElement.lang = option.code;
  document.documentElement.dir = option.dir;
  document.documentElement.dataset.language = option.code;
}

export function LanguageProvider({ children, initialLang = "en" }: { children: React.ReactNode; initialLang?: Lang }) {
  const normalizedInitial = isSupportedLang(initialLang) ? initialLang : "en";
  const [lang, setLangState] = useState<Lang>(normalizedInitial);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const nextLang = isSupportedLang(saved) ? saved : normalizedInitial;
    setLangState(nextLang);
    applyDocumentLanguage(nextLang);
  }, [normalizedInitial]);

  const setLang = useCallback((nextLang: Lang) => {
    const safeLang = isSupportedLang(nextLang) ? nextLang : "en";
    setLangState(safeLang);
    window.localStorage.setItem(storageKey, safeLang);
    document.cookie = `${storageKey}=${encodeURIComponent(safeLang)}; Max-Age=31536000; Path=/; SameSite=Lax`;
    applyDocumentLanguage(safeLang);
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
