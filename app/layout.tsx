import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LanguageProvider, type Lang } from "@/components/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Private China Journeys | Bespoke Travel With a Local Insider",
  description:
    "High-end private travel in China for foreign travelers, guided by a local insider with 40 years of life in China."
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const saved = cookieStore.get("local-china-lang")?.value as Lang | undefined;
  const validLanguages: Lang[] = ["en", "zh-CN", "zh-TW", "es", "pt", "ar"];
  const initialLang = saved && validLanguages.includes(saved) ? saved : "en";
  const dir = initialLang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={initialLang} dir={dir} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
