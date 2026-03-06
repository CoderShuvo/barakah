import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Heart, Zap } from "lucide-react";
import { PageHeader } from "@/components/global";
import { Section, SectionHeader } from "@/components/global";
import { Button } from "@/components/ui/button";

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "why-barakah",
    fallbackTitle: "Why Barakah? Ethical Growth Agency | Barakah Agency",
    fallbackDescription:
      "Meet the team behind Barakah Agency. Guided by five core principles, we build values-aligned strategies that earn trust and drive lasting growth.",
    fallbackImage: "https://barakahagency.com/barakah-featured-image.png",
  });
}

const values = [
  {
    icon: Heart,
    title: "Integrity First",
    description:
      "We believe in transparent, honest marketing that builds trust rather than manipulates.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description:
      "Our work aims to uplift communities and create positive social change.",
  },
  {
    icon: Zap,
    title: "Excellence",
    description:
      "We deliver exceptional results without compromising our ethical standards.",
  },
  {
    icon: Award,
    title: "Innovation",
    description:
      "We continuously evolve our methods while staying true to our core principles.",
  },
];

const team = [
  {
    name: "Ahmed Hassan",
    role: "Founder & CEO",
    image: "/team/ahmed.jpg",
  },
  {
    name: "Sarah Mitchell",
    role: "Creative Director",
    image: "/team/sarah.jpg",
  },
  {
    name: "Omar Rahman",
    role: "Head of Strategy",
    image: "/team/omar.jpg",
  },
  {
    name: "Fatima Khan",
    role: "Performance Lead",
    image: "/team/fatima.jpg",
  },
];

import { AboutHero } from "@/components/about/about-hero";
import { AboutEthos } from "@/components/about/about-ethos";
import { AboutPrinciples } from "@/components/about/about-principles";
import { AboutProcess } from "@/components/about/about-process";
import { AboutTeam } from "@/components/about/about-team";
import { AboutFAQ } from "@/components/about/about-faq";
import { FinalCTASection } from "@/components/landing";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutEthos />
      <AboutPrinciples />
      <AboutProcess />
      <AboutTeam />
      <AboutFAQ />
    </>
  );
}
