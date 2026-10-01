import { StructuredData } from "@/components/StructuredData";
import { destinationImages } from "@/lib/generated-destination-media";
import { getProvince } from "@/lib/provinces";
import { getProvinceRecommendation } from "@/lib/province-recommendations";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { HuangpuRiverFerryContent } from "./HuangpuRiverFerryContent";

const province = getProvince("shanghai")!;
const attraction = getProvinceRecommendation("shanghai", "huangpu-river-ferry")!;
const path = "/destinations/shanghai/huangpu-river-ferry";

export const metadata = createMetadata({
  title: `${attraction.name} in ${province.name} | Local China Trip`,
  description: `Explore ${attraction.name} in ${province.name}, focused on ${attraction.focus}.`,
  path,
  image: destinationImages[`${province.name}::${attraction.name}`],
});

export default function HuangpuRiverFerryPage() {
  return (
    <>
      <StructuredData data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: province.name, path: "/destinations/shanghai" },
          { name: attraction.name, path },
        ]),
      ]} />
      <HuangpuRiverFerryContent province={province} attraction={attraction} />
    </>
  );
}
