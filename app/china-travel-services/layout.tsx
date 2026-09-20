import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Private China Travel Services | Local China Trip",
  description: "Explore private China trip planning, local experiences, flexible transport and practical support shaped around your route and travel style.",
  path: "/china-travel-services",
  image: "/images/experience-guilin-ride.jpg",
});

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
