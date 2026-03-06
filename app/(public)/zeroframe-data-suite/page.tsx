import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, Shield, Zap } from "lucide-react";
import { PageHeader } from "@/components/global";
import { Section, SectionHeader } from "@/components/global";
import { Button } from "@/components/ui/button";

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "zeroframe-data-suite",
    fallbackTitle: "ZeroFrame™ | Sales & Marketing Automation | Barakah",
    fallbackDescription:
      "All-in-one CRM and automation platform. Streamline lead capture, email marketing, and workflows with clarity, compliance, and intent.",
    fallbackImage: "https://barakahagency.com/barakah-featured-image.png",
  });
}

const principles = [
  {
    icon: Eye,
    title: "Fresh Perspective",
    description:
      "We approach every brand with zero preconceptions, seeing it exactly as your audience does.",
  },
  {
    icon: Sparkles,
    title: "Clarity First",
    description:
      "Stripping away complexity to reveal the core essence that makes your brand unique.",
  },
  {
    icon: Shield,
    title: "Honest Assessment",
    description:
      "Providing candid feedback and insights that help you improve, not just what you want to hear.",
  },
  {
    icon: Zap,
    title: "Actionable Insights",
    description:
      "Turning observations into concrete strategies that drive real results.",
  },
];

import { ZeroFrameHero } from "@/components/zero-frame/zero-frame-hero";
import { ZeroFrameIntelligence } from "@/components/zero-frame/zero-frame-intelligence";
import { AttributionReporting } from "@/components/zero-frame/attribution-reporting";
import { TargetingScoring } from "@/components/zero-frame/targeting-scoring";
import { ZeroFramePersonafied } from "@/components/zero-frame/zero-frame-personafied";
import { MultiChannelAttribution } from "@/components/zero-frame/multi-channel-attribution";
import { ZeroFrameFinalCTA } from "@/components/zero-frame/zero-frame-final-cta";

export default function ZeroFramePage() {
  return (
    <>
      <ZeroFrameHero />

      <ZeroFrameIntelligence />
      <AttributionReporting />
      <TargetingScoring />
      <ZeroFramePersonafied />
      {/* <MultiChannelAttribution /> */}
      <ZeroFrameFinalCTA />
    </>
  );
}
