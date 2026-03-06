import type { Metadata } from "next";
import {
  BrandingHero,
  BrandingProblem,
  BrandingLegacy,
  BrandingMethod,
  BrandingServices,
} from "@/components/branding";
import {
  ProofOfPerformanceSection,
  FinalCTASection,
} from "@/components/landing";

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "branding-identity",
    fallbackTitle: "Brand Identity Design That Builds Trust | Barakah Agency",
    fallbackDescription:
      "Cohesive, culturally aware brand identities built to last. Logos, visual systems, and guidelines that define how your brand shows up.",
    fallbackImage: "https://barakahagency.com/barakah-featured-image.png",
  });
}

export default function BrandingPage() {
  return (
    <main>
      <BrandingHero />
      <BrandingProblem />
      <BrandingLegacy />
      <BrandingMethod />
      <BrandingServices />
      <ProofOfPerformanceSection />
      <FinalCTASection buttonLabel="Grow with Barakah" />
    </main>
  );
}
