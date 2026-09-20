import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Enquiry Received | Local China Trip",
  description: "Confirmation that your Local China Trip enquiry was received.",
  path: "/thank-you",
  index: false,
});

export default function ThankYouLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
