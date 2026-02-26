"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const frameworkSteps = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Uncover What Matters — And Where It Can Take You",
    description:
      "We begin by listening deeply — to your goals, your gaps, and your guiding values. This clarity forms the foundation of an ROI²™ journey rooted in both strategy and sincerity.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "02",
    title: "Strategy",
    subtitle: "Crafting ROI²™-Driven Strategy",
    description:
      "We begin by listening deeply — to your goals, your gaps, and your guiding values. This clarity forms the foundation of an ROI²™ journey rooted in both strategy and sincerity.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "03",
    title: "Positioning",
    subtitle: "Positioning You With Purpose",
    description:
      "We begin by listening deeply — to your goals, your gaps, and your guiding values. This clarity forms the foundation of an ROI²™ journey rooted in both strategy and sincerity.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "04",
    title: "Creative Development",
    subtitle: "Designing Creative That Converts With Conscience",
    description:
      "We begin by listening deeply — to your goals, your gaps, and your guiding values. This clarity forms the foundation of an ROI²™ journey rooted in both strategy and sincerity.",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "05",
    title: "Digital Activation",
    subtitle: "Activating Digital Channels for Impact & Income",
    description:
      "We begin by listening deeply — to your goals, your gaps, and your guiding values. This clarity forms the foundation of an ROI²™ journey rooted in both strategy and sincerity.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "06",
    title: "Optimization",
    subtitle: "Optimizing for Dual Returns",
    description:
      "We begin by listening deeply — to your goals, your gaps, and your guiding values. This clarity forms the foundation of an ROI²™ journey rooted in both strategy and sincerity.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "07",
    title: "Growth",
    subtitle: "Sustainable Growth That Returns ROI²™",
    description:
      "With your brand activated, we focus on scaling what works — optimizing campaigns, expanding reach, and building systems that generate consistent returns.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "08",
    title: "Legacy",
    subtitle: "Optimizing for Dual Returns",
    description:
      "We begin by listening deeply — to your goals, your gaps, and your guiding values. This clarity forms the foundation of an ROI²™ journey rooted in both strategy and sincerity.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
];

export function MethodSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section ref={containerRef} className="py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-32 w-full mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg font-normal text-black mb-4 block font-lato"
          >
            • The Barakah Method •
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-[#3F1200] font-lato leading-tight"
          >
            A Values-Led Framework for Sustainable
            <br />
            Growth and Lasting Impact
          </motion.h2>
        </div>

        {/* Steps Container */}
        <div className="relative w-full mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 lg:left-8 top-0 bottom-0 w-[10px] bg-[#FFC3AA]/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#FFC3AA] origin-top"
              style={{ scaleY: smoothProgress, height: "100%" }}
            />
          </div>

          {/* Steps List */}
          <div className="lg:pl-32 pl-12">
            {frameworkSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 items-start border-b border-[#3F1200]/10 py-20 last:border-b-0"
              >
                {/* Content Area */}
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:gap-12">
                  <div className="flex items-start shrink-0">
                    <div className=" flex items-center justify-center w-12 h-12 text-[#3F1200] font-bold text-2xl font-lato">
                      ({step.number})
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-6xl font-black text-[#3F1200] font-lato uppercase">
                      {step.title}
                    </h3>
                    <p className="text-xl md:text-2xl font-bold text-[#3F1200]/80 font-lato">
                      {step.subtitle}
                    </p>
                    <p className="text-lg text-[#5C4033] leading-relaxed max-w-xl font-lato">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Image Area */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="relative h-[292px] rounded-[2rem] overflow-hidden shadow-2xl"
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
