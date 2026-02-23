"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FinalCTASection } from "../landing/final-cta-section";

const faqItems = [
  {
    question: "Who do you work with?",
    answer:
      "We work with purpose driven organizations that care about how they grow, including brands, non profits, and mission led teams that care about how they grow, including brands, non profits, and mission led teams.",
  },
  {
    question: "Is Barakah Agency the right fit?",
    answer:
      "If you prioritize ethical growth, long-term legacy, and values-aligned strategy over quick shortcuts, then yes. We partner with brands that are ready to lead with integrity.",
  },
  {
    question: "What makes your approach different?",
    answer:
      "Our approach is grounded in the Barakah Method — a unique synthesis of ethical principles and high-performance marketing that ensures growth honors purpose, people, and planet.",
  },
  {
    question: "What does ethical growth mean?",
    answer:
      "Ethical growth means building a sustainable business that thrives without compromising on responsibility, transparency, or the well-being of the communities it serves.",
  },
];

export function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="pt-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#3F1200]/40 mb-4 block"
          >
            • FAQ •
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-[#3F1200] font-lato"
          >
            Things You May Be Wondering
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto border-t border-[#3F1200]/10">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b border-[#3F1200]/10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-8 flex items-center justify-between text-left group"
                >
                  <h3
                    className={cn(
                      "text-2xl md:text-3xl font-bold transition-colors duration-300",
                      isOpen
                        ? "text-[#E76F3D]"
                        : "text-[#3F1200] group-hover:text-[#E76F3D]",
                    )}
                  >
                    {item.question}
                  </h3>
                  <div
                    className={cn(
                      "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300",
                      isOpen
                        ? "bg-[#E76F3D] text-white rotate-180"
                        : "bg-[#FBD3C1]/30 text-[#3F1200]",
                    )}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="pb-8 pr-12">
                        <p className="text-lg md:text-xl text-[#5C4033] leading-relaxed">
                          {item.answer}
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
      <FinalCTASection />
    </section>
  );
}
