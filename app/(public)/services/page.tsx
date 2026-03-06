import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import ServicesPageClient from "./services-page-client";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "services",
    fallbackTitle: "Ethical Marketing Services: Branding, Paid Media & SEO",
    fallbackDescription:
      "Branding, paid media, web design, CRO, SEO and more — built for purpose-driven brands that want long-term equity and measurable ROI.",
    fallbackImage: "/assets/featured-barakah.jpg",
  });
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}
