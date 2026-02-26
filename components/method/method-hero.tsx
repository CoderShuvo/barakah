"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ImpactSlider } from "./impact-slider";

export function MethodHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center pt-32 pb-20 overflow-hidden bg-[#FFF5F0]">
      {/* Background Decorative Circles */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <svg
          viewBox="0 0 1000 1000"
          className="w-[120%] h-[120%] text-[#E76F3D]/20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="500"
            cy="500"
            r="100"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="500"
            cy="500"
            r="200"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="500"
            cy="500"
            r="300"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="500"
            cy="500"
            r="400"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="500"
            cy="500"
            r="500"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 pl-10">
        <div className="w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-medium text-[#3F1200] mb-4"
          >
            A Strategic Framework Rooted in Ethics, Built for Longevity
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-[160px] font-black text-[#3F1200] leading-none mb-8 tracking-tighter font-lato"
          >
            The Barakah Method
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-4xl text-[#5C4033] leading-relaxed mb-10 w-full"
          >
            The Barakah Method is our proprietary framework that sustains your
            values-aligned brand growth. It blends cultural insight, ethical
            design, and data-led marketing to grow the legacy customers you
            deserve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="/contact"
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
              <span className="text-lg text-white">Grow with Barakah</span>

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
      </div>

      <ImpactSlider />
    </section>
  );
}
