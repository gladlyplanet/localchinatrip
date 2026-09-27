import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About Local China Trip | Private China Journeys",
  description: "Learn how Local China Trip creates thoughtful private journeys through local life, regional food, culture and flexible travel across China.",
  path: "/about",
  image: "/images/about/great-wall-guests.jpg",
});

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
