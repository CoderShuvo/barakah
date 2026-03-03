"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const impactImages = [
  { src: "/assets/i1.png", alt: "Billboard showcase" },
  { src: "/assets/i2.png", alt: "Creative branding cards" },
  { src: "/assets/i4.png", alt: "Logistics branding showcase" },
  { src: "/assets/i3.png", alt: "Logo design showcase" },
  {
    src: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
    alt: "Strategic marketing",
  },
];

export function ImpactSlider() {
  return (
    <section className="py-20 w-full overflow-hidden">
      {/* Heading */}
      <div className="container mx-auto px-4 mb-12">
        <div className="border-t border-[#3F1200]/10 pt-8">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-medium text-[#3F1200]"
          >
            Brand Impact, Powered by The Barakah Method and Mesghali Studio
          </motion.h3>
        </div>
      </div>

      {/* Manual Scroll Container */}
      <div className="w-full overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth">
        <div className="flex gap-6 px-4 md:px-8 lg:px-[calc((100vw-1440px)/2)] w-max">
          {impactImages.map((image, idx) => (
            <div
              key={idx}
              className="relative w-[320px] sm:w-[380px] md:w-[400px]
                         h-[240px] sm:h-[280px] md:h-[300px]
                          overflow-hidden shadow-lg flex-shrink-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 320px, 400px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
