"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/assets/2.png",
    alt: "Branding Work 1",
    rotate: -12,
    x: "-100%",
    y: "15%",
    zIndex: 10,
  },
  {
    src: "/assets/1.png",
    alt: "Branding Work 2",
    rotate: -6,
    x: "-50%",
    y: "5%",
    zIndex: 20,
  },
  {
    src: "/assets/3.png",
    alt: "Branding Work 3",
    rotate: 0,
    x: "0%",
    y: "0%",
    zIndex: 30,
    isCenter: true,
  },
  {
    src: "/assets/5.png",
    alt: "Branding Work 4",
    rotate: 6,
    x: "50%",
    y: "5%",
    zIndex: 20,
  },
  {
    src: "/assets/4.png",
    alt: "Branding Work 5",
    rotate: 12,
    x: "100%",
    y: "15%",
    zIndex: 10,
  },
];

export function BrandingHero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#FFFCF9] pt-32 pb-40">
      {/* Background Radial Pattern */}
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

      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#E76F3D]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl sm:text-7xl lg:text-[100px] font-bold text-[#3D1A10] text-center leading-[0.95] tracking-[-0.03em] max-w-7xl mb-12"
        >
          Our Branding & Identity Services Help You Build a Brand that Outlasts
          the Moment
        </motion.h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-32"
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

        <div className="relative w-full  max-w-7xl mx-auto h-[300px] md:h-[400px] flex justify-center items-end animate-fade-in-up opacity-0 [animation-fill-mode:forwards] [animation-delay:1000ms]">
          {/* Card 1 (Left-most) */}
          <div className="absolute bottom-0 left-[1%] bottom-[20%] md:left-[1%] w-[160px] md:w-[460px] h-[260px] md:h-[360px] aspect-[3/4]  shadow-2xl -rotate-12 z-10 border-4 border-white transform hover:-translate-y-4 transition-transform duration-500 origin-bottom-right">
            <div className="w-full h-full bg-slate-200 overflow-hidden relative">
              <img
                src="/assets/1.png"
                alt="Work 1"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="absolute  left-[15%] md:left-[15%] w-[160px] md:w-[450px] h-[260px] md:h-[360px] aspect-[3/4]  shadow-2xl -rotate-6 z-20 border-4 border-white transform hover:-translate-y-4 transition-transform duration-500 origin-bottom">
            <div className="w-full h-full bg-slate-200  overflow-hidden relative">
              <img
                src="/assets/2.png"
                alt="Work 2"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Card 3 (Center) */}
          <div className="absolute bottom-12 w-[280px] md:w-[460] aspect-video md:aspect-[4/3] shadow-2xl z-30 border-4 border-white transform hover:-translate-y-4 transition-transform duration-500">
            <div className="w-full h-full bg-white  overflow-hidden relative flex items-center justify-center p-2">
              {/* Placeholder for "Synco" or branding */}
              <img
                src="/assets/3.png"
                alt="Work 3"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="absolute bottom-8 right-[15%] md:right-[15%] w-[160px] md:w-[460px] h-[260px] md:h-[360px] aspect-[3/4]  shadow-2xl rotate-6 z-20 border-4 border-white transform hover:-translate-y-4 transition-transform duration-500 origin-bottom">
            <div className="w-full h-full bg-slate-200  overflow-hidden relative">
              <img
                src="/assets/4.png"
                alt="Work 4"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Card 5 (Right-most) */}
          <div className="absolute bottom-[20%] right-[1%] md:right-[1%] w-[160px] md:w-[460px] h-[260px] md:h-[360px] aspect-[3/4]  shadow-2xl rotate-12 z-10 border-4 border-white transform hover:-translate-y-4 transition-transform duration-500 origin-bottom-left">
            <div className="w-full h-full bg-slate-200   overflow-hidden relative">
              <img
                src="/assets/5.png"
                alt="Work 5"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="absolute bottom-[-50px] left-0 right-0 text-center">
          <p className="text-20PX text-[#3F1200] font-bold">
            Brand Impact, Powered by The Barakah <br /> Method and Mesghali
            Studio
          </p>
        </div>
      </div>
    </section>
  );
}
