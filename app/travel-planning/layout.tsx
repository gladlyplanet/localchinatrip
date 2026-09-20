import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Custom China Itineraries & Private Trip Planning | Local China Trip",
  description: "Compare thoughtfully paced China itinerary ideas, then adapt the cities, timing, interests and travel rhythm around your own trip.",
  path: "/travel-planning",
  image: "/images/travel-planning/classic-15.jpg",
});

export default function TravelPlanningLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
