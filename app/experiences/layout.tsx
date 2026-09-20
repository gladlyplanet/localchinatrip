import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Local China Experiences & Private Day Tours | Local China Trip",
  description: "Choose private local experiences built around food, markets, villages, living crafts, culture, wellness and unhurried time in China.",
  path: "/experiences",
  image: "/images/experience-chengdu-market.jpg",
});

export default function ExperiencesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
