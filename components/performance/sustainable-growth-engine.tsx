"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface StepData {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  factTitle: string;
  factContent: string;
  image: string;
}

const steps: StepData[] = [
  {
    id: "01",
    stepNumber: "// Step 01",
    title: "Infrastructure Audit",
    description:
      "We begin by sanitizing your data ecosystem. We audit tracking pixels, server-side events, and attribution models to ensure every dollar spent is measured with absolute transparency.",
    factTitle: "The Fact",
    factContent:
      "47% of businesses make strategic decisions based on flawed or 'dirty' data—we ensure your foundation is the source of truth.",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    stepNumber: "// Step 02",
    title: "Intent Mapping",
    description:
      "We move beyond basic demographics to profile consumer intent. By identifying the 'Why' behind the search or scroll, we ensure your ads reach people ready for a relationship, not just a click.",
    factTitle: "The Fact",
    factContent:
      "High-intent targeting typically yields a 3x higher conversion rate than traditional interest-based 'broad' targeting.",
    image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    stepNumber: "// Step 03",
    title: "Narrative-Led Acquisition",
    description:
      "We deploy 'Value-First' creative across social and search platforms. We use storytelling to solve problems for the user before we ever ask for a sale, which naturally lowers friction and acquisition costs.",
    factTitle: "The Fact",
    factContent:
      "Narrative-driven ads have been shown to increase brand recall by up to 22x compared to standard promotional formats.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    stepNumber: "// Step 04",
    title: "Conversion Experience",
    description:
      "We optimize your landing pages to ensure the 'Promise' of the ad matches the 'Experience' of the site. We remove friction points through behavioral analysis without using deceptive 'Dark Patterns'.",
    factTitle: "The Fact",
    factContent:
      "A 1 second delay in page load time can result in a 7% reduction in conversions; we prioritize speed as a high-performance feature.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "05",
    stepNumber: "// Step 05",
    title: "Relationship Nurture",
    description:
      "The first sale is just the beginning. We build sophisticated Email and SMS flows that educate, provide value, and delight, turning one-time buyers into long-term brand advocates.",
    factTitle: "The Fact",
    factContent:
      "Increasing customer retention by just 5% can increase company profits by 25% to 95%.",
    image:
      "https://images.unsplash.com/photo-1516339900600-af0b42816228?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "06",
    stepNumber: "// Step 06",
    title: "Impact Optimization",
    description:
      "We analyze performance through our ROF lens—measuring financial profit alongside brand sentiment. This allows for continuous refinement, ensuring growth that is both profitable and principled.",
    factTitle: "The Fact",
    factContent:
      "Brands that prioritize ethical transparency grow at twice the rate of those that focus solely on transactional volume.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  },
];

export function SustainableGrowthEngine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-[80px] font-bold text-[#3D1A10] leading-none"
          >
            The Sustainable <br /> Growth Engine
          </motion.h2>
        </div>

        {/* Horizontal Scroll Area */}
        <motion.div
          style={{ x }}
          className="flex whitespace-nowrap gap-12 lg:gap-24 px-[5vw] lg:px-[10vw]"
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex-shrink-0 w-[85vw] lg:w-[600px] whitespace-normal"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
                {/* Left Info */}
                <div>
                  <span className="block text-[#3D1A10]/50 font-mono font-bold mb-4">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#3D1A10] mb-6 relative inline-block">
                    {step.title}
                    <motion.div
                      className="absolute bottom-1 left-0 h-1 bg-blue-500/30"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </h3>
                  <p className="text-lg text-[#3D1A10]/70 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Right Fact Card */}
                <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100/50">
                  <span className="block text-[#E76F3D] font-bold italic mb-3">
                    {step.factTitle}
                  </span>
                  <p className="text-sm lg:text-base text-[#E76F3D]/80 leading-relaxed italic font-medium">
                    {step.factContent}
                  </p>
                </div>
              </div>

              {/* Step Image */}
              <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl group">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
