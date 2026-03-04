"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/global";
import Image from "next/image";
import React, { useState } from "react";

const leftItems = [
  {
    title: '"Surface-Level" Trap',
    description:
      "You’ve invested in logos, colors, and campaigns — but skipped the deeper work. Without clarity on who you are and why you exist, execution becomes noise instead of signal.",
    active: true,
  },
  {
    title: 'The "Inconsistency" Tax',
    description:
      "Every disconnected message, visual, or voice quietly erodes trust. Over time, inconsistency becomes an invisible tax — paid in lower conversions, longer sales cycles, and diluted equity.",
  },
  {
    title: "Growth Without Gravity",
    description:
      "Momentum without meaning doesn’t compound. When growth isn’t anchored to a clear narrative, brands expand outward but never deepen — making loyalty fragile and differentiation temporary.",
  },
];

const tabContent = {
  "Surface-Level Trap": [
    {
      type: "image",
      src: "/assets/card-1-explainers-fatigue.png",
      alt: "Explainer's Fatigue",
    },
    {
      type: "image",
      src: "/assets/card-2-the-friction.png",
      alt: "The Friction",
    },
    {
      type: "image",
      src: "/assets/assets-b.png",
      alt: "Red Tree",
    },
    {
      type: "image",
      src: "/assets/assets-c.png",
      alt: "Woman with Flowers",
    },
    {
      type: "image",
      src: "/assets/card-4-trust-variable.png",
      alt: "Trust Variable",
    },
    {
      type: "image",
      src: "/assets/card-6-hollow-metric.png",
      alt: "Hollow Metric",
    },

    {
      type: "image",
      src: "/assets/assets-d.png",
      alt: "Rice Terraces",
    },
  ],
  'The "Inconsistency" Tax': [
    {
      type: "image",
      src: "/assets/inconsistency-1-disconnected-messages.png",
      alt: "Inconsistency 1",
    },
    {
      type: "image",
      src: "/assets/inconsistency-2-lower-conversions.png",
      alt: "Inconsistency 2",
    },
    {
      type: "image",
      src: "/assets/assets-b.png",
      alt: "Inconsistency 3",
    },
    {
      type: "image",
      src: "/assets/assets-c.png",
      alt: "Inconsistency 4",
    },
    {
      type: "image",
      src: "/assets/inconsistency-3-longer-sales-cycles.png",
      alt: "Inconsistency 5",
    },
    {
      type: "image",
      src: "/assets/inconsistency-4-diluted-equity.png",
      alt: "Inconsistency 6",
    },
    {
      type: "image",
      src: "/assets/assets-d.png",
      alt: "Inconsistency 7",
    },
  ],
  "Growth Without Gravity": [
    {
      type: "image",
      src: "/assets/gravity-1-fragile-loyalty.png",
      alt: "Growth 1",
    },
    {
      type: "image",
      src: "/assets/gravity-2-temporary-differentiation.png",
      alt: "Growth 2",
    },
    {
      type: "image",
      src: "/assets/assets-b.png",
      alt: "Growth 3",
    },
    {
      type: "image",
      src: "/assets/assets-c.png",
      alt: "Growth 4",
    },
    {
      type: "image",
      src: "/assets/gravity-3-no-compounding.png",
      alt: "Growth 5",
    },
    {
      type: "image",
      src: "/assets/gravity-4-outward-but-hollow.png",
      alt: "Growth 6",
    },
    {
      type: "image",
      src: "/assets/assets-d.png",
      alt: "Growth 7",
    },
  ],
};

export function BrandingProblem() {
  const [activeTab, setActiveTab] = useState(leftItems[0].title);
  const currentGrid =
    tabContent[activeTab as keyof typeof tabContent] ||
    tabContent["Surface-Level Trap"];

  return (
    <Section className="bg-[#FFFCF9] py-24">
      <div className="container mx-auto px-4">
        {/* Header content */}
        <div className="max-w-4xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-bold text-[#3D1A10] mb-8 leading-[1.1]"
          >
            Great products fail in <br /> weak stories.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl text-[#3D1A10]/70 leading-relaxed font-medium max-w-2xl"
          >
            High-growth founders often hit a ceiling when their business
            outgrows its narrative. You're operating at a Level 10 — but your
            brand is still communicating at a Level 2.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          {/* Left Column - Problem List */}
          <div className="space-y-8 lg:space-y-12 relative lg:sticky lg:top-32">
            {leftItems.map((item, index) => {
              const isActive = activeTab === item.title;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveTab(item.title)}
                  className={`flex gap-6 relative group cursor-pointer`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-[-16px] lg:left-[-24px] top-2 bottom-2 w-1 lg:w-1.5 bg-[#E76F3D] rounded-full"
                    />
                  )}
                  <div className="transition-transform duration-300 group-hover:translate-x-2">
                    <h3
                      className={`text-2xl lg:text-4xl font-bold mb-4 tracking-tight transition-colors duration-300 ${
                        isActive ? "text-[#3D1A10]" : "text-[#3D1A10]/40"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-lg lg:text-xl leading-relaxed max-w-lg font-medium transition-colors duration-300 ${
                        isActive ? "text-[#3D1A10]/60" : "text-[#3D1A10]/20"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-8"
            >
              <Button
                asChild
                className=" bg-[#E76F3D]
    text-white
    font-bold
    text-base sm:text-lg
    rounded-[56px]
    w-full sm:w-auto
    px-[16px] sm:px-[20px]
    py-[6px]
    h-[48px] sm:h-[52px]

    inline-flex
    items-center
    justify-center
    gap-[10px]

    shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]

    hover:bg-[#d46235]
    transition-all"
              >
                <a href="/contact" className="flex items-center gap-4">
                  Build with Barakah
                  <div className="bg-white rounded-full p-2 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-6 w-6 text-[#E76F3D]" />
                  </div>
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Staggered Grid */}
          <div className="grid grid-cols-2 gap-4 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="contents"
              >
                {/* Column 1 */}
                <div className="space-y-4">
                  {currentGrid[0] && (
                    <GridImage
                      item={currentGrid[0]}
                      className="aspect-square"
                    />
                  )}
                  {currentGrid[2] && (
                    <GridImage item={currentGrid[2]} className="aspect-[4/5]" />
                  )}
                  {currentGrid[4] && (
                    <GridImage
                      item={currentGrid[4]}
                      className="aspect-square"
                    />
                  )}
                </div>

                {/* Column 2 */}
                <div className="space-y-4 mt-4 md:mt-8 lg:mt-12">
                  {currentGrid[1] && (
                    <GridImage
                      item={currentGrid[1]}
                      className="aspect-square"
                    />
                  )}
                  {currentGrid[3] && (
                    <GridImage
                      item={currentGrid[3]}
                      className="aspect-square"
                    />
                  )}
                  {currentGrid[5] && (
                    <GridImage
                      item={currentGrid[5]}
                      className="aspect-square"
                    />
                  )}
                  {currentGrid[6] && (
                    <GridImage item={currentGrid[6]} className="aspect-[4/3]" />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}

function GridImage({ item, className }: { item: any; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl overflow-hidden shadow-xl ${className}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-110"
      />
    </motion.div>
  );
}
