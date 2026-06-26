import { notFound } from "next/navigation";
import { AttractionDetail } from "@/components/AttractionDetail";
import { getProvince, provinces } from "@/lib/provinces";
import { getProvinceRecommendation, getProvinceRecommendations, recommendationSlug } from "@/lib/province-recommendations";

export function generateStaticParams() {
  return provinces.flatMap((province) => getProvinceRecommendations(province.slug).map((attraction) => ({ slug: province.slug, attraction: recommendationSlug(attraction) })));
}

export default async function AttractionPage({ params }: { params: Promise<{ slug: string; attraction: string }> }) {
  const { slug, attraction: itemSlug } = await params;
  const province = getProvince(slug);
  const attraction = getProvinceRecommendation(slug, itemSlug);
  if (!province || !attraction) notFound();
  return <AttractionDetail province={province} attraction={attraction} />;
}
