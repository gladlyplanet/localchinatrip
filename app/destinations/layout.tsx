import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "China Destinations & Private Local Tours | Local China Trip",
  description: "Explore China's regions, cities and local experiences, then connect the places that fit your interests into a practical private itinerary.",
  path: "/destinations",
});

export default function DestinationsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
