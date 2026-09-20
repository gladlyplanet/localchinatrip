import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Meet Your Local China Guide | Local China Trip",
  description: "Meet the local guide behind thoughtful private China journeys focused on everyday life, regional food, culture and flexible pacing.",
  path: "/about",
  image: "/images/about-me-dinner-table.jpg",
});

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
