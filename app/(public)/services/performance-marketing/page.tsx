import type { Metadata } from "next";
import {
  PerformanceHero,
  GrowthParadox,
  PerformancePhilosophy,
  SustainableGrowthEngine,
  PerformanceTools,
} from "@/components/performance";
import {
  ProofOfPerformanceSection,
  FinalCTASection,
} from "@/components/landing";
import { BrandsSection } from "@/components/landing/brands-section";
import { ToolsSection } from "@/components/landing/tools-section";

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "performance-marketing",
    fallbackTitle: "Ethical Paid Media & Performance Marketing | Barakah",
    fallbackDescription:
      "Performance marketing and paid media focused on customer lifetime value and brand equity — not just clicks. Built to compound.",
    fallbackImage: "https://barakahagency.com/barakah-featured-image.png",
  });
}

export default function PerformanceMarketingPage() {
  return (
    <main>
      <PerformanceHero />
      <GrowthParadox />
      <PerformancePhilosophy />
      <SustainableGrowthEngine />
      {/* <PerformanceTools /> */}
      <ToolsSection />
      <ProofOfPerformanceSection />
      <FinalCTASection buttonLabel="Grow with Barakah" />
    </main>
  );
}
