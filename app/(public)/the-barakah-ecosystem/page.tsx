import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Handshake,
  Rocket,
  Award,
  Users,
  Clock,
} from "lucide-react";
import { BarakahExperienceHero } from "@/components/barakah-experience/barakah-experience-hero";
import { BarakahExperienceIndustries } from "@/components/barakah-experience/barakah-experience-industries";
import { ExperiencePrinciples } from "@/components/barakah-experience/experience-principles";
import { BarakahEcosystemSection } from "@/components/landing/barakah-ecosystem-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { Section, SectionHeader } from "@/components/global";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Barakah Experience",
  description:
    "What it's like to work with Barakah Agency - our process, values, and commitment to your success.",
};

const journey = [
  {
    icon: MessageSquare,
    title: "Discovery Call",
    description:
      "A no-pressure conversation to understand your goals, challenges, and vision for growth.",
    duration: "30 minutes",
  },
  {
    icon: Handshake,
    title: "Strategy Session",
    description:
      "Deep dive into your brand, market, and opportunities with our senior strategists.",
    duration: "2-3 hours",
  },
  {
    icon: Rocket,
    title: "Custom Proposal",
    description:
      "A tailored roadmap with clear deliverables, timelines, and investment options.",
    duration: "Within 1 week",
  },
  {
    icon: Award,
    title: "Kickoff & Execution",
    description:
      "Your dedicated team begins work with regular updates and collaborative reviews.",
    duration: "Ongoing",
  },
];

const commitments = [
  {
    title: "Transparent Communication",
    description:
      "Weekly updates, monthly reviews, and always-on access to your team.",
  },
  {
    title: "No Hidden Fees",
    description:
      "Clear pricing with everything included - no surprise charges.",
  },
  {
    title: "Results Guarantee",
    description: "If we don't deliver on our promises, we'll make it right.",
  },
  {
    title: "Long-term Partnership",
    description: "We're invested in your success, not just the next invoice.",
  },
];

const testimonials = [
  {
    quote:
      "Working with Barakah has been transformative. They truly understand what ethical marketing means.",
    author: "Sarah Ahmed",
    role: "CEO, Modest Fashion Co",
  },
  {
    quote:
      "Finally, an agency that delivers results without compromising our values. Highly recommended.",
    author: "Mohammed Ali",
    role: "Founder, Halal Ventures",
  },
];

export default function BarakahExperiencePage() {
  return (
    <>
      <BarakahExperienceHero />
      <BarakahExperienceIndustries />
      <ExperiencePrinciples />
      <BarakahEcosystemSection />
      <FinalCTASection buttonLabel="Book a Free Consultation" />
    </>
  );
}
