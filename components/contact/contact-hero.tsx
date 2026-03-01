"use client";

import React from "react";
import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <div className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-2">
        <div className="w-full">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-bold text-[#E76F3D] block mb-4"
          >
            Ready to grow with Barakah?
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#3F1200] font-lato mb-6 tracking-tight"
          >
            Discover the Barakah Agency Difference
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base lg:text-lg text-gray-500 max-w-3xl leading-relaxed"
          >
            Experience a personalized consultation. Get answers to your specific
            questions and learn how our ethical marketing services can transform
            your brand.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
