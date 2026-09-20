import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AttractionDetail } from "@/components/AttractionDetail";
import { StructuredData } from "@/components/StructuredData";
import { destinationImages } from "@/lib/generated-destination-media";
import { getProvince, provinces } from "@/lib/provinces";
import { getProvinceRecommendation, getProvinceRecommendations, recommendationSlug } from "@/lib/province-recommendations";
import { breadcrumbSchema, createMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return provinces.flatMap((province) => getProvinceRecommendations(province.slug).map((attraction) => ({ slug: province.slug, attraction: recommendationSlug(attraction) })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; attraction: string }> }): Promise<Metadata> {
  const { slug, attraction: itemSlug } = await params;
  const province = getProvince(slug);
  const attraction = getProvinceRecommendation(slug, itemSlug);
  if (!province || !attraction) return {};
  return createMetadata({
    title: `${attraction.name} Private Visit in ${province.name} | Local China Trip`,
    description: `Explore ${attraction.name} in ${province.name}, focused on ${attraction.focus}.`,
    path: `/destinations/${province.slug}/${itemSlug}`,
    image: destinationImages[`${province.name}::${attraction.name}`],
  });
}

export default async function AttractionPage({ params }: { params: Promise<{ slug: string; attraction: string }> }) {
  const { slug, attraction: itemSlug } = await params;
  const province = getProvince(slug);
  const attraction = getProvinceRecommendation(slug, itemSlug);
  if (!province || !attraction) notFound();
  const path = `/destinations/${province.slug}/${itemSlug}`;
  const description = `A private visit to ${attraction.name} in ${province.name}, with local context around ${attraction.focus}.`;
  return (
    <>
      <StructuredData data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: province.name, path: `/destinations/${province.slug}` },
          { name: attraction.name, path },
        ]),
        serviceSchema({ name: `${attraction.name} private visit`, description, path }),
      ]} />
      <AttractionDetail province={province} attraction={attraction} />
    </>
  );
}
