import type { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Private China Tours & Custom Itineraries | Local China Trip",
  description: "Plan a private China journey around your interests, with custom itineraries, local experiences and practical support throughout the trip.",
  path: "/",
});

export default function Home() {
  return <HomeContent />;
}
