import { StructuredData } from "@/components/StructuredData";
import { destinationImages } from "@/lib/generated-destination-media";
import { getProvince } from "@/lib/provinces";
import { getProvinceRecommendation } from "@/lib/province-recommendations";
import { breadcrumbSchema, createMetadata } from "@/lib/seo";
import { QingtongxiaStupasContent } from "./QingtongxiaStupasContent";

const province = getProvince("ningxia")!;
const attraction = getProvinceRecommendation("ningxia", "qingtongxia-108-stupas")!;
const path = "/destinations/ningxia/qingtongxia-108-stupas";

export const metadata = createMetadata({
  title: "Qingtongxia 108 Stupas in Ningxia | Local China Trip",
  description: `Explore ${attraction.name} in ${province.name}, focused on ${attraction.focus}.`,
  path,
  image: destinationImages[`${province.name}::${attraction.name}`],
});

export default function QingtongxiaStupasPage() {
  return (
    <>
      <StructuredData data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: province.name, path: "/destinations/ningxia" },
          { name: attraction.name, path },
        ]),
      ]} />
      <QingtongxiaStupasContent province={province} attraction={attraction} />
    </>
  );
}
