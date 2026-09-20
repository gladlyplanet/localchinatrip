import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProvinceDetail } from "@/components/ProvinceDetail";
import { StructuredData } from "@/components/StructuredData";
import { destinationImages } from "@/lib/generated-destination-media";
import { getProvince, provinces } from "@/lib/provinces";
import { getProvinceRecommendations } from "@/lib/province-recommendations";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return provinces.map((province) => ({ slug: province.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const province = getProvince(slug);
  if (!province) return {};
  const firstRecommendation = getProvinceRecommendations(slug)[0];
  const image = firstRecommendation ? destinationImages[`${province.name}::${firstRecommendation.name}`] : undefined;
  return createMetadata({
    title: `${province.name} Private Tours & Local Experiences | Local China Trip`,
    description: `${province.intro} Plan a private ${province.name} route around your interests and pace.`,
    path: `/destinations/${province.slug}`,
    image,
  });
}

export default async function ProvincePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const province = getProvince(slug);
  if (!province) notFound();
  return (
    <>
      <StructuredData data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Destinations", path: "/destinations" },
        { name: province.name, path: `/destinations/${province.slug}` },
      ])} />
      <ProvinceDetail province={province} />
    </>
  );
}
