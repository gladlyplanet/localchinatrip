import { StructuredData } from "@/components/StructuredData";
import { destinationImages } from "@/lib/generated-destination-media";
import { getProvince } from "@/lib/provinces";
import { getProvinceRecommendation } from "@/lib/province-recommendations";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { TashilhunpoMonasteryContent } from "./TashilhunpoMonasteryContent";

const province = getProvince("tibet")!;
const attraction = getProvinceRecommendation("tibet", "tashilhunpo-monastery")!;
const path = "/destinations/tibet/tashilhunpo-monastery";

export const metadata = createMetadata({
  title: "Tashilhunpo Monastery in Shigatse | Local China Trip",
  description: `Explore ${attraction.name} in ${province.name}, focused on ${attraction.focus}.`,
  path,
  image: destinationImages[`${province.name}::${attraction.name}`],
});

export default function TashilhunpoMonasteryPage() {
  return (
    <>
      <StructuredData data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: province.name, path: "/destinations/tibet" },
          { name: attraction.name, path },
        ]),
      ]} />
      <TashilhunpoMonasteryContent province={province} attraction={attraction} />
    </>
  );
}
