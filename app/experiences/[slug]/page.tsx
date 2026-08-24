import { notFound } from "next/navigation";
import { ExperienceDetail } from "@/components/ExperienceDetail";
import { experienceThemes, getExperienceTheme } from "@/lib/experience-themes";

export function generateStaticParams() {
  return experienceThemes.map((item) => ({ slug: item.slug }));
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getExperienceTheme(slug)) notFound();
  return <ExperienceDetail slug={slug} />;
}
