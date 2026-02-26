"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const impactImages = [
  {
    src: "/assets/i1.png",
    alt: "Billboard showcase",
  },
  {
    src: "/assets/i2.png",
    alt: "Creative branding cards",
  },
  {
    src: "/assets/i4.png",
    alt: "Logistics branding showcase",
  },
  {
    src: "/assets/i3.png",
    alt: "Logo design showcase",
  },
  {
    src: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
    alt: "Strategic marketing",
  },
];

export function ImpactSlider() {
  return (
    <section className="py-20 w-full overflow-hidden bg-none">
      {/* Heading inside container */}
      <div className="container mx-auto px-4 mb-12">
        <div className="border-t border-[#3F1200]/10 pt-8">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-medium text-[#3F1200]"
          >
            Brand Impact, Powered by the Barakah Method and Mesghali Studio
          </motion.h3>
        </div>
      </div>

      {/* Full Width Scrollable Slider */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 pl-4 md:pl-8 lg:pl-[calc((100vw-1440px)/2)] w-max">
          {impactImages.map((image, idx) => (
            <div
              key={idx}
              className="relative w-[400px] h-[300px] rounded-xl overflow-hidden shadow-lg flex-shrink-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
