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

export const metadata: Metadata = {
  title: "Performance Marketing & Paid Media",
  description:
    "Our performance marketing focuses on intentional growth, not short-term spikes. We design paid media and search strategies that prioritize relevance, efficiency, and measurable impact.",
};

export default function PerformanceMarketingPage() {
  return (
    <main>
      <PerformanceHero />
      <GrowthParadox />
      <PerformancePhilosophy />
      <SustainableGrowthEngine />
      {/* <PerformanceTools /> */}
      <BrandsSection />
      <ProofOfPerformanceSection />
      <FinalCTASection buttonLabel="Grow with Barakah" />
    </main>
  );
}
