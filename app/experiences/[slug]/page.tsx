import { notFound } from "next/navigation";
import { ExperienceDetail } from "@/components/ExperienceDetail";
import { experiences, getExperience } from "@/lib/experiences";

export function generateStaticParams() {
  return experiences.map((item) => ({ slug: item.slug }));
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getExperience(slug)) notFound();
  return <ExperienceDetail slug={slug} />;
}
