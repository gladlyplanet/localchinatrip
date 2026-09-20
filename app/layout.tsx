import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LanguageProvider, type Lang } from "@/components/LanguageProvider";
import { StructuredData } from "@/components/StructuredData";
import { createMetadata, organizationSchema, siteUrl, websiteSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...createMetadata({
    title: "Private China Tours & Custom Itineraries | Local China Trip",
    description: "Plan a private China journey around your interests, with custom itineraries, local experiences and practical support throughout the trip.",
    path: "/",
  }),
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
        <StructuredData data={[websiteSchema, organizationSchema]} />
        <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
