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

export const metadata: Metadata = {
  title: "Branding & Identity",
  description:
    "We create brand identities that are clear, cohesive, and enduring. From logos and visual systems to brand guidelines, we help define how your brand looks, feels, and shows up across every touchpoint.",
};

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
