"use client";

import React from "react";
import { motion } from "framer-motion";

const outcomes = [
  {
    value: "62%",
    title: "Increase in Website Engagement",
    description:
      "Measured through sustained performance, not short-term spikes.",
  },
  {
    value: "91%",
    title: "Increase in Revenue",
    description:
      "Measured through sustained performance, not short-term spikes.",
  },
  {
    value: "142+",
    title: "Increase in Website Engagement",
    description:
      "Measured through sustained performance, not short-term spikes.",
  },
  {
    value: "28%",
    title: "Increase in Average Order Value",
    description:
      "Measured through sustained performance, not short-term spikes.",
  },
];

export function CaseOutcomeExample() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold text-[#3F1200] font-lato"
            >
              Case Outcome Example
            </motion.h2>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-2xl text-[#3F1200] leading-relaxed"
            >
              <p>
                Before working with Barakah Agency, the organization was relying
                on fragmented efforts and short-term tactics that delivered
                inconsistent results. Growth lacked clarity, and performance was
                difficult to sustain.
              </p>
              <p>
                Through The Barakah Method, we designed an integrated strategy
                that aligned positioning, systems, and execution. The result was
                not just improved performance, but a foundation built for
                long-term, responsible growth.
              </p>
            </motion.div>

            {/* Metrics List */}
            <div className="border-t border-[#3F1200]/10">
              {outcomes.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 py-10 border-b border-[#3F1200]/10 items-center group"
                >
                  <div className="md:col-span-6 mb-4 md:mb-0">
                    <span className="text-5xl md:text-[80px] font-bold text-[#3F1200] tracking-tighter">
                      {item.value}
                    </span>
                  </div>
                  <div className="md:col-span-6 space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-[#3F1200]">
                      {item.title}
                    </h3>
                    <p className="text-[#5C4033] text-base md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
