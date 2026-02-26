"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function BarakahExperienceHero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#FFF5F0] pt-32 pb-20">
      {/* Background Radial Glow & Concentric Circles */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/assets/hero-bg.png"
          alt="Background"
          fill
          className="object-fit object-top opacity-40 mix-blend-multiply"
          priority
          quality={100}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mx-auto space-y-8"
        >
          {/* Subheading */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-2xl md:text-4xl font-medium text-[#5C4033] tracking-tight"
          >
            The Barakah Ecosystem
          </motion.span>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-9xl font-bold text-[#3F1200] leading-[1.1] tracking-tighter font-lato"
          >
            Where Specialized Expertise
            <br />
            Meets a Shared Standard
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-4xl text-[#3F1200] w-full mx-auto leading-relaxed"
          >
            The Barakah Ecosystem brings together industry-specific brands under
            one guiding ethos. This ecosystem model allows us to deliver focused
            solutions without compromising on ethics, quality, or long-term
            impact.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-4"
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
                  <g filter="url(#filter0_d_1666_721)">
                    <circle cx="24" cy="20" r="20" fill="#F8FAFC" />
                    <path
                      d="M19.8333 24.1665L28.1666 15.8332M28.1666 15.8332H19.8333M28.1666 15.8332V24.1665"
                      stroke="black"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1666_721"
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
                        result="effect1_dropShadow_1666_721"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1666_721"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
