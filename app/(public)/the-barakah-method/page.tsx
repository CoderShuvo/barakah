import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "the-barakah-method",
    fallbackTitle: "The Barakah Method | Values-Led Growth Framework",
    fallbackDescription:
      "An 8-stage framework blending ethical strategy, cultural insight, and data-led marketing to build brands that grow with purpose and endure.",
    fallbackImage: "/assets/featured-barakah.jpg",
  });
}

import { MethodHero } from "@/components/method/method-hero";
import { ImpactSlider } from "@/components/method/impact-slider";
import { MethodLegacy } from "@/components/method/method-legacy";
import { MethodSolutions } from "@/components/method/method-solutions";
import { MethodSteps } from "@/components/method/method-steps";
import { MethodAgency } from "@/components/method/method-agency";
import { FinalCTASection } from "@/components/landing/final-cta-section";

export default function BarakahMethodPage() {
  return (
    <>
      <MethodHero />
      {/* <ImpactSlider /> */}
      <MethodLegacy />
      <MethodSolutions />
      <MethodSteps />
      <MethodAgency />
      <FinalCTASection />
    </>
  );
}
