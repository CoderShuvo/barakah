"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTASection({
  buttonLabel = "Grow with Barakah",
}: {
  buttonLabel?: string;
}) {
  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden bg-background min-h-[80vh]"
      style={{
        backgroundImage: "url('/assets/cta-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#3F1200] mb-6  mt-10 font-lato leading-tight">
            Your <span className="italic">Growth</span> Deserves Intention
            <br />
            Let's Build It the <span className="italic">Right Way</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-[#5c4033] mb-10 max-w-3xl mx-auto font-lato leading-relaxed">
            Growth is not something you rush into. It is something you design
            with clarity, trust, and purpose. Work with a team that aligns
            strategy, ethics, and performance into a system built to last.
          </p>

          {/* CTA Button */}
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
        </div>
      </div>
    </section>
  );
}
