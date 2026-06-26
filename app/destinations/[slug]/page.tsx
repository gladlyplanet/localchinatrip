import { notFound } from "next/navigation";
import { ProvinceDetail } from "@/components/ProvinceDetail";
import { getProvince, provinces } from "@/lib/provinces";

export function generateStaticParams() {
  return provinces.map((province) => ({ slug: province.slug }));
}

export default async function ProvincePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const province = getProvince(slug);
  if (!province) notFound();
  return <ProvinceDetail province={province} />;
}
