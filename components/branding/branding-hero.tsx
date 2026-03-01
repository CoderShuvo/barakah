"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

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
  const [isFanned, setIsFanned] = useState(false);
  const [manualToggle, setManualToggle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // If user has manually toggled, we respect that until they scroll back up significantly
    // or just let scroll override it after a certain distance.
    // For now, let's make scroll the primary driver.
    if (latest > 100) {
      if (!manualToggle) {
        setIsFanned(true);
      }
    } else {
      setIsFanned(false);
      setManualToggle(false);
    }
  });

  const handleCenterImageClick = () => {
    const newState = !isFanned;
    setIsFanned(newState);
    setManualToggle(true); // Mark that user manually changed it
  };
  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#FFFCF9] pt-32 pb-40"
    >
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

        <div className="relative w-full max-w-7xl mx-auto h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] flex justify-center items-end animate-fade-in-up opacity-0 [animation-fill-mode:forwards] [animation-delay:1000ms]">
          {/* Card 1 (Left-most) */}

          <Image
            src="/assets/1.png"
            alt="Branding Work 1"
            className={`absolute bottom-0 transition-all duration-700 ease-in-out
                     ${
                       !isFanned
                         ? "left-1/2 -translate-x-1/2 rotate-0 opacity-100 scale-95 z-[25]"
                         : "left-[2%] sm:left-[1%] bottom-[10%] sm:bottom-[15%] md:bottom-[20%] -rotate-12 opacity-100 scale-100 z-10"
                     }
                     w-[100px] sm:w-[140px] md:w-[280px] lg:w-[360px] xl:w-[460px] 
                     h-[150px] sm:h-[210px] md:h-[280px] lg:h-[320px] xl:h-[360px] 
                     bg-transparent transform hover:-translate-y-2 sm:hover:-translate-y-4 origin-bottom-right`}
            width={360}
            height={270}
            sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 280px, (max-width: 1280px) 360px, 460px"
            priority
          />

          {/* Card 2 */}

          <Image
            src="/assets/2.png"
            alt="Branding Work 2"
            className={`absolute transition-all duration-700 ease-in-out
                     ${
                       !isFanned
                         ? "left-1/2 -translate-x-1/2 rotate-0 opacity-100 scale-95 z-[26]"
                         : "left-[12%] sm:left-[15%] bottom-0 -rotate-6 opacity-100 scale-100 z-20"
                     }
                     w-[100px] sm:w-[140px] md:w-[280px] lg:w-[360px] xl:w-[450px] 
                     h-[150px] sm:h-[210px] md:h-[280px] lg:h-[320px] xl:h-[360px] 
                     bg-transparent transform hover:-translate-y-2 sm:hover:-translate-y-4 origin-bottom`}
            width={360}
            height={270}
            sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 280px, (max-width: 1280px) 360px, 450px"
            priority
          />

          {/* Card 3 (Center) - Clickable */}
          <div
            onClick={handleCenterImageClick}
            className={`absolute bottom-6 sm:bottom-8 md:bottom-12 transition-all duration-700 ease-in-out cursor-pointer
                     ${
                       !isFanned
                         ? "scale-100 shadow-2xl"
                         : "scale-110 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                     }
                     w-[180px] sm:w-[220px] md:w-[280px] lg:w-[340px] xl:w-[400px]
                     aspect-video md:aspect-[4/3] 
                     z-30 border-2 sm:border-4 border-white transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-105`}
          >
            <div className="w-full h-full bg-white overflow-hidden relative flex items-center justify-center p-1 sm:p-2">
              <Image
                src="/assets/3.png"
                alt="Branding Work 3"
                width={360}
                height={270}
                className="object-cover w-full h-full"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 280px, (max-width: 1280px) 340px, 400px"
                priority
              />
            </div>
          </div>

          {/* Card 4 */}

          <Image
            src="/assets/4.png"
            alt="Branding Work 4"
            className={`absolute transition-all duration-700 ease-in-out
                     ${
                       !isFanned
                         ? "left-1/2 -translate-x-1/2 rotate-0 opacity-100 scale-95 z-[26]"
                         : "bottom-0 right-[12%] sm:right-[15%] rotate-6 opacity-100 scale-100 z-20"
                     }
                     w-[100px] sm:w-[140px] md:w-[280px] lg:w-[360px] xl:w-[460px] 
                     h-[150px] sm:h-[210px] md:h-[280px] lg:h-[320px] xl:h-[360px] 
                    transform hover:-translate-y-2 sm:hover:-translate-y-4 origin-bottom`}
            width={360}
            height={270}
            sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 280px, (max-width: 1280px) 360px, 460px"
          />

          {/* Card 5 (Right-most) */}

          <Image
            src="/assets/5.png"
            alt="Branding Work 5"
            className={`absolute transition-all duration-700 ease-in-out
                     ${
                       !isFanned
                         ? "left-1/2 -translate-x-1/2 rotate-0 opacity-100 scale-95 z-[25]"
                         : "bottom-[10%] sm:bottom-[15%] md:bottom-[20%] right-[2%] sm:right-[1%] rotate-12 opacity-100 scale-100 z-10"
                     }
                     w-[100px] sm:w-[140px] md:w-[280px] lg:w-[360px] xl:w-[460px] 
                     h-[150px] sm:h-[210px] md:h-[280px] lg:h-[320px] xl:h-[360px] 
                    transform hover:-translate-y-2 sm:hover:-translate-y-4 origin-bottom-left`}
            width={360}
            height={270}
            sizes="(max-width: 640px) 100px, (max-width: 768px) 140px, (max-width: 1024px) 280px, (max-width: 1280px) 360px, 460px"
          />
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
