import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Private Car Travel in China | Local China Trip",
  description: "Plan flexible private car days in China for countryside routes, regional journeys and places that are easier to reach with a local driver.",
  path: "/private-car",
  image: "/images/l6-ride.jpg",
});

export default function PrivateCarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
