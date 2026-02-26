"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhyBarakah() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - "WHY BARAKAH" with Tooltip */}
          <div className="lg:col-span-3 relative">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#3F1200] tracking-tight font-lato uppercase cursor-pointer relative inline-block"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              WHY BARAKAH
            </h2>

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute top-full left-0 mt-6 w-96 transform -translate-x-4 z-50 animate-fade-in">
                {/* Triangle Pointer */}
                <div className="absolute -top-3 left-12 w-6 h-6 bg-[#FCFBF7] border-l border-t border-[#e5e5e5] rotate-45 z-0" />

                <div className="relative bg-[#FCFBF7] border border-[#e5e5e5] rounded-[24px] shadow-2xl p-8 z-10 overflow-hidden">
                  <h3 className="text-4xl font-bold text-[#3F1200] mb-2 font-lato">
                    Barakah
                  </h3>
                  <p className="text-[20px] text-[#5c4033] font-lato mb-4">
                    [bar·a·kah] — بركة
                  </p>

                  {/* Dashed Line */}
                  <div className="w-full border-t border-dashed border-[#d1d1d1] mb-6" />

                  <p className="text-[18px] text-[#3F1200] leading-relaxed font-lato">
                    <span className="font-bold text-[#3F1200]">
                      A blessing.
                    </span>{" "}
                    A force of goodness. Where a little goes far. Where meaning
                    outweighs metrics.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-9">
            <h3
              className="
    font-lato
    text-[#3F1200]
    font-normal
    text-3xl md:text-5xl lg:text-[56px] xl:text-[64px]
    leading-tight xl:leading-[84px]
    tracking-[-0.03em]
    mb-8
  "
            >
              <span className="text-[#E76F3D] italic font-bold">Growth</span>{" "}
              That Multiplies What Matters
              <br />
              Not Just{" "}
              <span className="text-[#E76F3D] italic font-bold">Revenue</span>,
              But Real
              <span className="text-[#E76F3D] italic font-bold">
                {" "}
                Resonance
              </span>
              <br />A Strategy That Delivers{" "}
              <span className="text-[#E76F3D] italic font-bold">ROI²™</span>.
              <br />
              <span
                className="
      font-normal
      text-2xl md:text-4xl lg:text-5xl xl:text-[56px]
      leading-tight xl:leading-[84px]
      tracking-[-0.03em]
      text-[#3F1200]
    "
              >
                Return on Investment × Return on Impact
              </span>
              <br />
              <span
                className="
      font-normal
      text-2xl md:text-4xl lg:text-5xl xl:text-[56px]
      leading-tight xl:leading-[84px]
      tracking-[-0.03em]
      text-[#3F1200]
    "
              >
                That's What We Call
                <span className="text-[#E76F3D] italic font-bold">
                  {" "}
                  Barakah
                </span>
              </span>
            </h3>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20 animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:800ms] w-full max-w-md sm:max-w-none">
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
                <Link href="/why-barakah">
                  Why Choose Barakah
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

              <Button
                asChild
                className="
    bg-[#00A7C7]
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
                <Link href="/why-barakah#team">
                  Meet the Team
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
