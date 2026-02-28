"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const principles = [
  {
    number: "01",
    title: "Faith",
    description:
      "Our work is rooted in spiritual values that prioritize truth, sincerity, and accountability to a higher purpose.",
    image: "/assets/a1.png",
  },
  {
    number: "02",
    title: "Life",
    description:
      "We honor the sanctity of life by ensuring our marketing promotes well-being and respects the human experience.",
    image: "/assets/a2.png",
  },
  {
    number: "03",
    title: "Family",
    description:
      "We believe in strengthening the bonds of family and community through marketing that honors domestic harmony.",
    image: "/assets/a3.png",
  },
  {
    number: "04",
    title: "Wisdom",
    description:
      "Guided by deep strategic insight and ethical knowledge, we navigate complex challenges with clarity and foresight.",
    image: "/assets/a4.png",
  },
  {
    number: "05",
    title: "Wealth",
    description:
      "We define prosperity not just by financial gain, but by the equitable and ethical distribution of value and blessings.",
    image: "/assets/a5.png",
  },
];

const placeholders = Array(Math.max(0, 3 - principles.length)).fill(null);

export function AboutPrinciples() {
  return (
    <section className="py-24 bg-white max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#3F1200]/40 mb-4 block"
          >
            Our Responsibility
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-5xl font-black text-[#3F1200] font-lato"
          >
            Five Principles That Guide
            <br />
            Our Responsibility
          </motion.h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, idx) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={cn(
                "group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer",
                idx < 3 ? "lg:col-span-1" : "",
              )}
            >
              {/* Background Image */}
              <Image
                src={principle.image}
                alt={`Barakah Agency Principle: ${principle.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover  transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00A3C4]/90 via-[#00A3C4]/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-1 transform transition-transform duration-500 group-hover:-translate-y-4">
                  <span className="text-xs md:text-sm font-bold text-[#00E5FF] tracking-widest">
                    {principle.number}
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
                    {principle.title}
                  </h3>
                </div>

                <div className="max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500 ease-in-out">
                  <p className="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* --- Placeholder grid items --- */}
          {placeholders.map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="aspect-[4/5] rounded-3xl bg-transparent"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
