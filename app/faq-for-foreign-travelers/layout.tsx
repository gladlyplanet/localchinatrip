import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "China Travel Questions for Foreign Visitors | Local China Trip",
  description: "Practical answers about private travel, local guides, trip planning, transport, food preferences and visiting China at a comfortable pace.",
  path: "/faq-for-foreign-travelers",
});

export default function FaqLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
