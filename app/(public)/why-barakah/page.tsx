import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Users, Heart, Zap } from "lucide-react";
import { PageHeader } from "@/components/global";
import { Section, SectionHeader } from "@/components/global";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  metadataBase: new URL("https://barakahagency.com"),
  title: "Team Up With an Innovative Ethical Marketing Agency | Barakah Agency",
  description:
    "A reliable ethical marketing agency should put you first. Learn how our ethos and innovative marketing tools fuel your performance.",
  openGraph: {
    title:
      "Team Up With an Innovative Ethical Marketing Agency | Barakah Agency",
    description:
      "A reliable ethical marketing agency should put you first. Learn how our ethos and innovative marketing tools fuel your performance.",
    url: "https://barakahagency.com/why-barakah",
    siteName: "Barakah Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/fetured-barakah.jpg",
        width: 1200,
        height: 630,
        alt: "Barakah Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Team Up With an Innovative Ethical Marketing Agency | Barakah Agency",
    description:
      "A reliable ethical marketing agency should put you first. Learn how our ethos and innovative marketing tools fuel your performance.",
    images: ["/assets/fetured-barakah.jpg"],
  },
};

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
