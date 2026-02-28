"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function EthicalMarketingHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-white pt-32 pb-20 px-4">
      {/* Background Mandala Graphic */}
      <div
        className="absolute
               w-full h-full
               
                pointer-events-none"
      >
        <Image
          src="/assets/etical-marketing-bg.svg" // change to your image path
          alt="Decorative background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto  relative z-10">
        <div className="w-full space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xl md:text-2xl font-bold text-[#3F1200]"
          >
            Ethical Marketing Hub
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[3.5rem] md:text-[6rem] lg:text-[120px] font-black text-[#3F1200] leading-[1] tracking-normal"
          >
            What Is Ethical Marketing? The Basics Every Marketer Needs To Know
          </motion.h1>
        </div>
      </div>

      {/* Gradient Overlay for soft transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
