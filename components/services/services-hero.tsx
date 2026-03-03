"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function ServicesHero() {
  return (
    <section className="relative container mx-auto min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-[#FFFCF9] ">
      {/* Background Image */}
      <div className="absolute inset-0 hidden md:block z-0 select-none">
        <Image
          src="/assets/hero-bg.png"
          alt="Barakah Agency Services Hero Background"
          fill
          className="object-cover object-center opacity-40 mix-blend-multiply"
          priority
          quality={100}
        />
      </div>

      {/* Soft Overlay to blend if needed */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFFCF9]/80 z-0 pointer-events-none" />

      <div className="w-full mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left Content - 40% */}
          <div className="w-full lg:w-[50%] text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl lg:text-[84px] font-bold text-[#3D1A10] leading-[1.1] mb-6 lg:mb-8 tracking-[-0.03em] text-balance"
            >
              Ethical Marketing Services for a
              <br className="hidden lg:block" />
              <span className="text-[#3D1A10]">Modern Economy.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg lg:text-2xl text-[#3D1A10]/70 leading-relaxed max-w-xl mb-10 lg:mb-12 text-pretty font-medium mx-auto lg:mx-0"
            >
              Moving beyond extractive marketing to build high-performance
              systems that honor your values and your bottom line.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex justify-center lg:justify-start"
            >
              <Button
                asChild
                className="
    bg-[#E76F3D]
    text-white
    font-bold
    text-base sm:text-lg
    rounded-[56px]
    w-full sm:w-auto
    px-[16px] sm:px-[20px]
    py-[6px]
    h-[48px] sm:h-[52px]

    inline-flex
    items-center
    justify-center
    gap-[10px]

    shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]

    hover:bg-[#d46235]
    transition-all
  "
              >
                <Link href="/contact">
                  Grow with Barakah
                  <div className="h-7 w-7 sm:h-8 sm:w-8 bg-white rounded-full flex items-center justify-center ">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.10744 9.99986H15.8926M15.8926 9.99986L10 4.1073M15.8926 9.99986L10 15.8924"
                        stroke="black"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Visual Element - 60% */}
          <div className="w-full lg:w-[50%] relative h-[400px] lg:h-[600px] flex items-center justify-center overflow-hidden">
            {/* White side gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FFFCF9] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FFFCF9] to-transparent z-10 pointer-events-none" />

            <div className="w-full">
              <MarqueeColumn
                speed={40}
                images={["/assets/s1.png", "/assets/s2.png", "/assets/s3.png"]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-components for the slider
interface MarqueeColumnProps {
  images: string[];
  speed: number;
  reverse?: boolean;
}

function MarqueeColumn({ images, speed, reverse = false }: MarqueeColumnProps) {
  // Duplicate images for infinite loop
  const displayImages = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-10 sm:gap-12"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed * 2,
            ease: "linear",
          },
        }}
      >
        {displayImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative w-[250px] sm:w-[320px] md:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl group border-4 border-white/50"
          >
            <Image
              src={src}
              alt="Case study"
              fill
              sizes="(max-width: 768px) 320px, 450px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority={i < 3}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
