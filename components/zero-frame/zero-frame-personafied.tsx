"use client";

import React from "react";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/global";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";

const personaItems = [
  {
    id: "personafied-1",
    title: "Where Clarity Begins",
    content:
      "We begin by deeply understanding your mission, values, and the impact you want to create. Every strategy is aligned with your ethical foundations, cultural context, and long-term vision, ensuring your marketing reflects what your brand truly stands for, not just what it sells.",
  },
  {
    id: "personafied-2",
    title: "Turning Data Into Understanding",
    content:
      "Our data-driven approach doesn't just stop at numbers. We analyze patterns and trends to provide deep insights into audience behavior and brand perception, turning raw data into meaningful intelligence that guides every decision.",
  },
  {
    id: "personafied-3",
    title: "From Insight to Responsible Action",
    content:
      "We translate insights into concrete, responsible marketing actions. Our framework ensures that every strategy is not only effective but also ethical and sustainable, creating long-term value for your brand and its community.",
  },
];

const floatingPersonas = [
  {
    name: "Budget-Smart Brian",
    percentage: "18.2%",
    color: "text-blue-500",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Eco-Friendly Elisa",
    percentage: "16.8%",
    color: "text-green-500",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Style-Lover Laura",
    percentage: "15.1%",
    color: "text-purple-500",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export function ZeroFramePersonafied() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Column: Persona Visual */}
        <div className="relative">
          {/* Main Persona Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 max-w-sm mx-auto relative z-10"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
                    alt="Practical Parent Paula"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-0.5 rounded-full shadow-md border border-gray-100">
                  <span className="text-xs font-bold text-[#E76F3D]">#1</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#3D2012] mb-1">
                Practical Parent Paula
              </h3>
              <p className="text-[#E76F3D] text-sm font-bold mb-4">
                18.2% of total customers
              </p>

              <p className="text-gray-500 text-xs leading-relaxed mb-8 px-4">
                Paula, a 32-year-old mom of two, shop... for affordable,
                comfortable shoes. She values clear filters, rev... deals to
                save time and i...
              </p>

              <div className="grid grid-cols-3 gap-4 w-full border-t border-gray-50 pt-6">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                    CLV
                  </p>
                  <p className="text-sm font-bold text-[#3D2012]">$1,420</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                    Cohort Size
                  </p>
                  <p className="text-sm font-bold text-[#3D2012]">2,120</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                    AOV
                  </p>
                  <p className="text-sm font-bold text-[#3D2012]">$135</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Personas */}
          <div className="absolute top-1/2 -right-12 lg:-right-24 -translate-y-1/2 space-y-4 hidden md:block">
            {floatingPersonas.map((persona, i) => (
              <motion.div
                key={persona.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-full py-2 pl-2 pr-4 shadow-lg border border-gray-50 flex items-center gap-3 min-w-[200px]"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={persona.avatar}
                    alt={persona.name}
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#3D2012]">
                    {persona.name}
                  </span>
                  <span className="text-[10px] font-medium text-blue-500">
                    {persona.percentage} of total customers
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View Details Button Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-[280px]"
          >
            <div className="bg-[#FFF5F0] rounded-full py-4 px-6 flex items-center justify-center gap-2 shadow-xl border border-[#E76F3D]/20 relative">
              <span className="text-sm font-bold text-[#3D2012]">
                View Persona Details
              </span>

              <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                <MousePointer2 className="text-[#3D2012]" size={20} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Content */}
        <div>
          <div className="mb-12">
            <h2 className="text-4xl lg:text-6xl font-black text-[#3D2012] font-lato mb-4">
              ZeroFrame™ Personafied
            </h2>
            <p className="text-lg font-bold text-[#3D2012] mb-6">
              Replace guesswork with <span className="italic">real data.</span>
            </p>
            <p className="text-gray-600 leading-relaxed">
              This module identifies website visitors using first-party data and
              tracks how they interact with pages, content, and offers. Using AI
              and verified U.S. consumer spending signals, every customer is
              enriched with accurate demographic and behavioral attributes—so
              your marketing becomes precise, personal, and high-converting.
              Teams gain visibility into anonymous traffic, understand visitor
              intent, and optimize experiences that drive conversions.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="personafied-1"
            className="w-full space-y-4"
          >
            {personaItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-gray-200 py-2 last:border-0"
              >
                <AccordionTrigger className="text-xl lg:text-2xl font-bold text-[#3D2012] hover:no-underline text-left py-4 focus:outline-none">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-[#6B6B6B] text-lg leading-relaxed pt-0 pb-6 pr-4">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
