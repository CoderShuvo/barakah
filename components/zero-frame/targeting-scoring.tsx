"use client";

import React from "react";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/global";
import { motion } from "framer-motion";
import { Target, Fingerprint, Cpu, Infinity } from "lucide-react";

const avatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
];

export function TargetingScoring() {
  return (
    <Section className="bg-white">
      <h1 className="text-4xl text-center lg:text-7xl font-bold text-[#3D2012] hover:no-underline text-left py-4 focus:outline-none">
        ZeroFrame™ Targeting & Website Visitor Scoring
      </h1>
      <p className="text-[#6B6B6B] text-lg leading-relaxed max-w-5xl mx-auto pt-0 pb-6 pr-4 text-center">
        The Audience & Traffic Scoring module distills insights from over 120
        trusted data sources to map how your users discover, evaluate, and
        decide. This intelligence is deployed directly into Meta and TikTok —
        accelerating campaign performance without relying on slow native
        targeting models. The result: 30–40% lower CPAs and more intentional,
        efficient spend.
      </p>

      <div className="relative container mx-auto aspect-[16/9]">
        <Image
          src="/assets/zeroFrameTargeting.png"
          alt="Targeting Scoring"
          fill
          className="object-contain"
        />
      </div>
    </Section>
  );
}
