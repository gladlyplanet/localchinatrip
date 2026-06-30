"use client";

import Link from "next/link";
import { languageOptions, useLanguage, type Lang } from "@/components/LanguageProvider";
import { getSiteCopy } from "@/lib/site-copy";

const navHrefs = ["/experiences", "/private-car", "/#local-life", "/destinations", "/about", "/contact"];

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@WusorCHINAexp", color: "bg-[#ff0000] text-white" },
  { label: "TikTok", href: "https://www.tiktok.com/@wusorchinaexp", color: "bg-black text-white" },
  { label: "X", href: "https://x.com/gladlyplanet", color: "bg-black text-white" },
  { label: "小红书", href: "https://xhslink.com/m/3JFB2pFdEvd", color: "bg-[#ff2442] text-white" },
  { label: "Instagram", href: "https://www.instagram.com/wusorchinaexp?igsh=MWg5NzBuaWZjbzR6Mg%3D%3D&utm_source=qr", color: "instagram-brand text-white" }
];

function SocialLogo({ name }: { name: string }) {
  if (name === "YouTube") return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path fill="currentColor" d="M23 7.1a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5S5 4.5 3.1 5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.9A3 3 0 0 0 3.1 19c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.7 15.3V8.7L15.5 12l-5.8 3.3Z"/></svg>;
  if (name === "TikTok") return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path fill="currentColor" d="M15.2 3c.4 2.2 1.7 3.5 3.8 3.8v3a8 8 0 0 1-3.8-1.1v6.2a5.9 5.9 0 1 1-5.1-5.8v3.1a2.9 2.9 0 1 0 2 2.7V3h3.1Z"/></svg>;
  if (name === "X") return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.8-6.3L6.7 22H3.6l7.1-8.2L3 2h6.3l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.4 4H6.6l11.2 15.9Z"/></svg>;
  if (name === "Instagram") return <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>;
  return <span className="text-[10px] font-black leading-none">小红书</span>;
}

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <select value={lang} onChange={(event) => setLang(event.target.value as Lang)} className="h-10 w-[106px] rounded-full border hairline bg-cream px-3 text-sm font-semibold text-ink outline-none transition-colors focus:border-moss sm:w-auto" aria-label="Select language">
      {languageOptions.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
    </select>
  );
}

export function Header() {
  const { lang, dir } = useLanguage();
  const text = getSiteCopy(lang);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-cream/95 backdrop-blur-xl" dir={dir}>
      <nav className="mx-auto flex h-20 max-w-[1680px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-24">
        <Link href="/" className="min-w-0 leading-none text-ink">
          <span className="script-title block text-2xl font-semibold sm:text-4xl">Local China</span>
          <span className="mt-1 hidden text-[11px] tracking-[0.08em] text-mist sm:block">{text.tagline}</span>
        </Link>
        <div className="hidden items-center gap-7 text-[15px] font-medium text-ink xl:flex">
          {text.nav.map((label, index) => <Link key={navHrefs[index]} href={navHrefs[index]} className="whitespace-nowrap transition-colors hover:text-moss">{label}</Link>)}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link href="/contact" className="hidden rounded-full bg-moss px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink sm:inline-flex">{text.plan}</Link>
          <LanguageSwitcher />
        </div>
      </nav>
      <div className="no-scrollbar flex h-11 items-center gap-5 overflow-x-auto border-t hairline px-4 text-sm font-medium xl:hidden">
        {text.nav.map((label, index) => <Link key={navHrefs[index]} href={navHrefs[index]} className="shrink-0">{label}</Link>)}
      </div>
    </header>
  );
}

export function Footer() {
  const { lang, dir } = useLanguage();
  const text = getSiteCopy(lang);
  return (
    <footer className="border-t hairline bg-cream px-5 py-10 sm:px-8" dir={dir}>
      <div className="mx-auto max-w-[1680px]">
        <div className="flex flex-col gap-6 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <p>{text.footer}</p>
          <div className="flex flex-wrap gap-5">{text.nav.map((label, index) => <Link key={navHrefs[index]} href={navHrefs[index]} className="hover:text-ink">{label}</Link>)}</div>
        </div>
        <div className="mt-8 grid gap-6 border-t hairline pt-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-col gap-3 text-sm text-mist sm:flex-row sm:gap-6">
            <a href="mailto:ly13845267281@sina.com" className="inline-flex items-center gap-2 hover:text-moss"><span aria-hidden="true">✉</span>{text.email}: ly13845267281@sina.com</a>
            <a href="https://wa.me/8618871477084" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#25D366]"><span className="font-bold text-[#25D366]" aria-hidden="true">◉</span>{text.whatsapp}: +86 188 7147 7084</a>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label} className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 shadow-sm transition-transform hover:-translate-y-0.5 ${social.color}`}><SocialLogo name={social.label} /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
