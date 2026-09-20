import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Plan Your Private China Trip | Local China Trip",
  description: "Share your dates, group size, destinations, interests and preferred pace to start planning a private, custom journey through China.",
  path: "/contact",
  image: "/images/real-night-market.jpg",
});

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
