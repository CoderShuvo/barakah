"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Section } from "@/components/global";

const industries = [
  {
    title: " eCommerce & Consumer Brands",
    subtitle: "Scaling With Integrity",
    description:
      "We help product-led brands grow profitably through precision targeting, lifecycle strategy, and high-converting creative — without sacrificing brand equity.",
    image: "/assets/be1.jpg",
  },
  {
    title: "Healthcare & Wellness",
    subtitle: "Trust-Centered Growth",
    description:
      "For organizations operating in regulated, sensitive industries, we design marketing systems that prioritize credibility, compliance, and long-term patient relationships.",
    image: "/assets/be2.jpg",
  },
  {
    title: "B2B, SaaS & Specialized Services",
    subtitle: "High-Intent Demand Generation",
    description:
      "From engineering firms to SaaS platforms, we build measurable acquisition systems that attract decision-makers, shorten sales cycles, and compound authority over time.",
    image: "/assets/be3.jpg",
  },
];

export function BarakahExperienceIndustries() {
  return (
    <Section className="bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div className="space-y-4">
              <span className="text-2xl md:text-4xl font-medium text-[#3F1200]">
                Industries Barakah Serves
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#3F1200] font-lato tracking-wide">
                Built for Focused, High-Trust Sectors
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-[#3F1200] lg:text-lg text-gray-500 max-w-5xl leading-relaxed"
              >
                We partner with organizations where reputation, trust, and
                long-term relationships matter — from high-growth eCommerce
                brands to B2B innovators and mission-driven institutions.
              </motion.p>
            </div>

            <div className="flex gap-4">
              <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-[#E76F3D]/10 hover:bg-[#E76F3D] hover:text-white border-none text-[#E76F3D]" />
              <CarouselNext className="static translate-y-0 h-14 w-14 bg-[#E76F3D] hover:bg-[#d46235] text-white border-none" />
            </div>
          </div>

          <CarouselContent className="-ml-6">
            {industries.map((industry, index) => (
              <CarouselItem
                key={index}
                className="pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-[600px] w-full rounded-[2.5rem] overflow-hidden"
                >
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E76F3D] via-[#E76F3D]/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 text-white">
                    <div className="space-y-4">
                      <h3 className="text-2xl lg:text-3xl font-black">
                        {industry.title}
                      </h3>
                      <p className="text-sm lg:text-base font-bold text-white/90">
                        {industry.subtitle}
                      </p>
                      <p className="text-xs lg:text-sm leading-relaxed text-white/80 line-clamp-4">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
}
