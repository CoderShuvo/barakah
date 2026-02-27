"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/global";
import Image from "next/image";

const steps = [
  {
    id: "01",
    title: "Soul Forensic",
    description:
      "A deep audit of your current assets, stakeholder interviews, and a forensic look at your market's 'unmet needs.' We find the gap where your conviction meets a commercial void.",
    image: "/assets/step1-soul-forensic.png",
  },
  {
    id: "02",
    title: "Visual Incarnation",
    description:
      "Translating your brand's essence into a cohesive visual system. This isn't just about aesthetics; it's about creating a visual language that communicates your legacy before a single word is read.",
    image: "/assets/step2-visual-incarnation.png",
  },
  {
    id: "03",
    title: "Strategic Alignment",
    description:
      "Ensuring every touchpoint—from your internal culture to your external marketing—is perfectly synchronized with your core mission and long-term goals.",
    image: "/assets/step3-strategic-alignment.png",
  },
  {
    id: "04",
    title: "System Architecture",
    description:
      "Designing the scalable systems and frameworks that allow your brand to grow without losing its soul. We build technical foundations for enduring impact.",
    image: "/assets/step4-system-architecture.png",
  },
  {
    id: "05",
    title: "Behavioral Identity",
    description:
      "Defining how your brand acts, speaks, and responds in the world. We move beyond visual identity to create a brand that lives its values through every action.",
    image: "/assets/step5-behavioral-identity.png",
  },
  {
    id: "06",
    title: "Legacy stewardship",
    description:
      "Continuous optimization and monitoring to ensure your brand remains relevant and impactful for generations. We help you manage your most valuable asset.",
    image: "/assets/step6-legacy-stewardship.png",
  },
];

export function BrandingMethod() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Section className="bg-[#FFFCF9] py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#3D1A10]/50 font-medium uppercase tracking-[0.3em] mb-6 text-sm"
          >
            • How We Work With You •
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-bold text-[#3D1A10] leading-tight"
          >
            To Build Sustainable, <br /> Legacy-Aligned Growth
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Vertical Navigation */}
          <div className="lg:col-span-1 border-l border-[#3D1A10]/10 flex flex-col gap-6 pl-6 relative">
            {/* Dynamic Indicator */}
            <motion.div
              className="absolute left-[-1.5px] w-[3px] bg-[#E76F3D] rounded-full"
              initial={false}
              animate={{
                top: `${activeStep * (100 / steps.length)}%`,
                height: `${(100 / steps.length) * 0.4}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`text-left group transition-all duration-300 flex items-center gap-4`}
              >
                <div
                  className={`h-[2px] w-6 transition-all duration-300 ${activeStep === index ? "bg-[#E76F3D] w-12" : "bg-[#3D1A10]/10"}`}
                />
                <span
                  className={`text-lg font-bold tracking-tighter font-mono transition-all duration-300 ${
                    activeStep === index
                      ? "text-[#3D1A10] scale-125"
                      : "text-[#3D1A10]/20"
                  }`}
                >
                  // {step.id}
                </span>
              </button>
            ))}
          </div>

          {/* Content & Image */}
          <div className="lg:col-span-11 grid lg:grid-cols-11 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-4 flex flex-col justify-end h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  <h3 className="text-4xl lg:text-5xl font-bold text-[#3D1A10]">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-xl text-[#3D1A10]/60 leading-relaxed font-medium">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Main Image */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-2xl border border-[#3D1A10]/5"
                >
                  <Image
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D1A10]/10 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
