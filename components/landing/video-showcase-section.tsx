"use client";

import Image from "next/image";
import { FinalCTASection } from "./final-cta-section";

export function VideoShowcaseSection() {
  return (
    <section className="relative  pt-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3F1200] mb-4 font-lato">
            Grow Your Business, Build Your Legacy.
          </h2>
          <p className="text-lg text-[#5c4033] max-w-3xl mx-auto font-lato">
            Discover how ROI²™ positions you to win loyal customers, achieve
            brand dominance, and build a legacy that lasts.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/BSwmYkntc70"
            title="YouTube video"
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <FinalCTASection />
    </section>
  );
}
