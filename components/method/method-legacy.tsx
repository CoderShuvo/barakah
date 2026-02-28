"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function MethodLegacy() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="w-full mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-medium text-[#3F1200] mb-4"
          >
            Return on Investment. Return on Impact.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-[#3F1200] leading-[1.1] mb-10 tracking-tighter font-lato"
          >
            It's How We Build Your Brand's Legacy
          </motion.h2>

          <div className="w-full text-xl text-[#5C4033] leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              At Barakah Agency, growth isn't just about what you achieve today,
              but what continues to grow tomorrow. ROI²™ represents our belief
              that every marketing decision carries responsibility. Yes, it
              should convert; but it should also reflect your values, signal
              clarity, and earn lasting trust. When done right, strategy
              compounds: trust deepens, loyalty grows, revenue increases, and
              brands evolve into legacies.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4"
            >
              When performance is guided by purpose, revenue becomes sustainable
              rather than fragile. Customers stay longer, advocacy grows
              stronger, and trust deepens over time. The result is not just
              momentum, but durability.
            </motion.p>
          </div>
        </div>

        {/* Visual Showcase (Animated Diamond) */}
        <div className="container mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-transparent aspect-video  flex items-center justify-center"
          >
            <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/BSwmYkntc70"
                title="YouTube video"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Text Overlay */}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-start"
        >
          <Link
            href="/the-barakah-ecosystem"
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
              Explore The Barakah Ecosystem
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
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
    </section>
  );
}
