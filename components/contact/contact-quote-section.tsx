"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function ContactQuoteSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Gradient with Grain Texture Overlay */}
          <div className="abosolute">
            <Image
              src="/assets/contactbg.svg"
              alt="Quote Top Sphere"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6-mini.png')]" />

          <div className="relative z-10 px-8 py-16 md:py-24 flex flex-col items-center text-center text-white">
            {/* Top Sphere Visual (Half-moon style) */}

            {/* Quote Container */}
            <div className="relative max-w-4xl mx-auto space-y-8">
              {/* Quote Marks */}
              <div className="absolute -left-4 md:-left-12 top-0 text-white/40 select-none">
                <svg
                  width="60"
                  height="48"
                  viewBox="0 0 60 48"
                  fill="currentColor"
                >
                  <path d="M0 48V20.4L10.8 0H26.4L18 20.4H28.8V48H0ZM31.2 48V20.4L42 0H57.6L49.2 20.4H60V48H31.2Z" />
                </svg>
              </div>
              <div className="absolute -right-4 md:-right-12 top-0 text-white/40 select-none scale-x-[-1]">
                <svg
                  width="60"
                  height="48"
                  viewBox="0 0 60 48"
                  fill="currentColor"
                >
                  <path d="M0 48V20.4L10.8 0H26.4L18 20.4H28.8V48H0ZM31.2 48V20.4L42 0H57.6L49.2 20.4H60V48H31.2Z" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black italic tracking-wide">
                "Rise Above the Noise" – It's More Than Just a Tagline
              </h2>

              {/* Quote Text */}
              <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed opacity-90 font-serif italic">
                "In the arena of marketing, our true opponent is indifference.
                Every campaign we launch and every strategy we devise is a jab
                at apathy and a hook for change, striving to leave the world a
                little better than we found it. At Barakah Agency, we don't just
                fight to win; we fight for a cause."
              </p>

              {/* Attribution */}
              <div className="pt-6">
                <p className="text-xl md:text-2xl font-black tracking-tight">
                  -Ziad Itani, Founder, Growth & Strategy
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
