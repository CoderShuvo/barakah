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
