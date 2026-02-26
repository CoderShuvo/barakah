"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/global";

const principles = [
  {
    title: "Shared Vision",
    description:
      "A clear, long-term view of growth rooted in purpose, integrity, and meaningful impact. Every brand moves toward the same future, even when serving different industries.",
  },
  {
    title: "Shared Values",
    description:
      "Trust, responsibility, and cultural awareness guide how decisions are made. These values shape how we work with partners, audiences, and communities across the ecosystem.",
  },
  {
    title: "Shared Quality Standard",
    description:
      "Whether it's strategy, creative, or technology, every output meets a high bar of excellence. We don't just deliver; we deliver with intentionality and precision.",
  },
  {
    title: "Independent Focus, Connected Thinking",
    description:
      "Each brand is an expert in its field, but we think as one. This cross-pollination of ideas ensures that insights from one sector benefit others across the ecosystem.",
  },
  {
    title: "Result",
    description:
      "Growth that is not just fast, but sustainable and meaningful. We measure success by the long-term impact we create for our partners and the communities they serve.",
  },
];

export function ExperiencePrinciples() {
  return (
    <Section className="bg-white py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl md:text-4xl font-medium text-[#3F1200] block mb-4"
          >
            Many Brands, Shared Principles
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#3F1200] font-lato mb-6 tracking-tight"
          >
            One Ecosystem. One Standard.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[#3F1200] lg:text-lg text-gray-500 max-w-5xl leading-relaxed"
          >
            Every Barakah sub-brand is built to serve a specific industry, but
            all operate under the same shared method, foundations, and
            principles. This ensures focus without fragmentation, and
            specialization without inconsistency.
          </motion.p>
        </div>

        <div className="border-t border-gray-200">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 py-6 lg:py-6 border-b border-gray-200 gap-6 lg:gap-12"
            >
              <div className="lg:col-span-1">
                <h3 className="text-2xl lg:text-3xl font-black text-[#3F1200] font-lato">
                  {principle.title}
                </h3>
              </div>
              <div className="lg:col-span-1">
                <p className="text-base lg:text-lg text-black leading-relaxed lg:mt-1">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
