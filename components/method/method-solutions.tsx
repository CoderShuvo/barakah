"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  {
    title: "Boost Your Revenue",
    description:
      "We design marketing systems that drive revenue responsibly without overreliance on spend, shortcuts, or guesswork.",
  },
  {
    title: "Strengthen Your Brand",
    description:
      "Build a brand that resonates with clarity and purpose, earning the long-term trust and loyalty of your ideal audience.",
  },
  {
    title: "Transform Your Digital Presence",
    description:
      "Elevate your online impact with ethical design and cutting-edge data insights that drive sustainable performance.",
  },
  {
    title: "Expand Your Time",
    description:
      "Simplify your marketing ecosystem and automate complexity so you can focus on the high-level strategy that matters most.",
  },
  {
    title: "Prudent Financial Management",
    description:
      "Optimize your marketing spend with a focus on accountability, transparency, and high-impact allocation.",
  },
  {
    title: "Bridging Knowledge Gaps",
    description:
      "Empower your team with the insights and frameworks needed to lead with integrity in a fast-evolving digital landscape.",
  },
];

export function MethodSolutions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Content area */}
          <div className="space-y-10">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-medium text-[#3F1200] mb-4"
              >
                With Purpose and Precision
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-black text-[#3F1200] leading-none mb-8 tracking-tighter font-lato"
              >
                Marketing That Works
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-[#5C4033] leading-relaxed w-full"
              >
                Every marketing decision should do more than generate revenue.
                It should build trust, deepen impact, and support long-term
                growth. That’s why our approach is rooted in responsibility.
                It's built to be deliberate, measurable, and aligned with
                purpose. At Barakah Agency, we help mission-driven teams scale
                sustainably by focusing on what matters most. Whether
                simplifying complexity or strengthening systems, we design
                strategies that compound over time. Through The Barakah Method,
                ROI²™ framework, and the Barakah Ecosystem, we work as true
                partners — helping you grow with clarity, trust, and intention.
              </motion.p>
            </div>

            {/* Showcase Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/9] h-[228px] w-full rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <Image
                src="/assets/marketingthatwork.jpg"
                alt="Marketing professional showcase"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/services"
                className="
    hidden sm:inline-flex items-center gap-3
    bg-[#E76F3D]
    text-black
    hover:bg-[#d46235]
    transition-all
    rounded-[56px]
    h-[52px]
    pl-[20px]
    pr-[6px]
    py-[6px]
    font-bold
    shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]
  "
              >
                <span className="text-lg text-white">
                  {" "}
                  Explore Our Solutions
                </span>

                <div
                  className="
                mt-1
      h-10 w-10
      flex items-center justify-center
    "
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_557_995)">
                      <circle cx="24" cy="20" r="20" fill="#F8FAFC" />
                      <path
                        d="M18.1074 19.9998H29.8926M29.8926 19.9998L24 14.1072M29.8926 19.9998L24 25.8924"
                        stroke="black"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_557_995"
                        x="0"
                        y="0"
                        width="48"
                        height="48"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_557_995"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_557_995"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Accordion list */}
          <div className="lg:pt-20">
            <div className="divide-y divide-[#3F1200]/10 border-t border-[#3F1200]/10">
              {solutions.map((solution, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div key={idx} className="overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full py-6 flex items-center justify-between text-left group transition-all duration-300"
                    >
                      <span
                        className={cn(
                          "text-2xl md:text-3xl font-bold transition-all duration-300",
                          isOpen ? "text-[#E76F3D]" : "text-[#3F1200]",
                        )}
                      >
                        {solution.title}
                      </span>
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border",
                          isOpen
                            ? "bg-[#E76F3D] text-white border-[#E76F3D]"
                            : "border-[#3F1200]/20 text-[#3F1200]",
                        )}
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <div className="pb-8 pr-12">
                            <p className="text-lg text-[#5C4033] leading-relaxed">
                              {solution.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
