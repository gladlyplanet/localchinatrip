import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceDetail } from "@/components/ExperienceDetail";
import { StructuredData } from "@/components/StructuredData";
import { experienceThemes, getExperienceTheme } from "@/lib/experience-themes";
import { breadcrumbSchema, createMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return experienceThemes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperienceTheme(slug);
  if (!experience) return {};
  return createMetadata({
    title: `${experience.en.title} in China | Local China Trip`,
    description: experience.en.intro,
    path: `/experiences/${experience.slug}`,
    image: experience.hero,
  });
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = getExperienceTheme(slug);
  if (!experience) notFound();
  const path = `/experiences/${experience.slug}`;
  return (
    <>
      <StructuredData data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/experiences" },
          { name: experience.en.title, path },
        ]),
        serviceSchema({ name: experience.en.title, description: experience.en.intro, path }),
      ]} />
      <ExperienceDetail slug={slug} />
    </>
  );
}
