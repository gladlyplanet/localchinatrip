import { StructuredData } from "@/components/StructuredData";
import { destinationImages } from "@/lib/generated-destination-media";
import { getProvince } from "@/lib/provinces";
import { getProvinceRecommendation } from "@/lib/province-recommendations";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { StarFerryContent } from "./StarFerryContent";

const province = getProvince("hong-kong")!;
const attraction = getProvinceRecommendation("hong-kong", "star-ferry")!;
const path = "/destinations/hong-kong/star-ferry";

export const metadata = createMetadata({
  title: "Star Ferry in Hong Kong | Local China Trip",
  description: `Explore ${attraction.name} in ${province.name}, focused on ${attraction.focus}.`,
  path,
  image: destinationImages[`${province.name}::${attraction.name}`],
});

export default function StarFerryPage() {
  return (
    <>
      <StructuredData data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: province.name, path: "/destinations/hong-kong" },
          { name: attraction.name, path },
        ]),
      ]} />
      <StarFerryContent province={province} attraction={attraction} />
    </>
  );
}
