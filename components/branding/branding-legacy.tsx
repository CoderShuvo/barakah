"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/global";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Brand as Lived Experience",
    description:
      'We move beyond "Visual Identity" to "Behavioral Identity." We design how your brand speaks, acts, and resolves conflict.',
    highlight: "A brand isn't what you say; it's what you do.",
    centerImage: "/assets/b1.jpg",
    rightQuote:
      "When your brand becomes an experience rather than a logo, your customers become your strongest advocates.",
  },
  {
    id: 2,
    title: "Ethics as Competitive Advantage",
    description:
      "In a skeptical world, radical transparency and values-led decision-making create a 'moat' around your business that competitors cannot copy.",
    highlight: "Integrity is the ultimate differentiator.",
    centerImage: "/assets/b2.jpg",
    rightQuote:
      "We don't see ethics as a restriction, but as a filter that attracts the right audience and repels the wrong one.",
  },
  {
    id: 3,
    title: "Alignment Over Aesthetics",
    description:
      "True growth (Barakah) happens when your internal mission and your external expression are perfectly synchronized.",
    highlight: "Beauty is the byproduct of truth.",
    centerImage: "/assets/b3.jpg",
    rightQuote:
      "We prioritize 'Strategic Fit' over 'Creative Trends.' If a design is beautiful but doesn't align with your soul, it is a failure.",
  },
];

export function BrandingLegacy() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Section className="bg-[#FFFCF9] py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header content */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-bold text-[#3D1A10] mb-8 leading-[1.1]"
          >
            We don't build brands. <br /> We architect legacies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg lg:text-xl text-[#3D1A10]/60 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            In an era of disposable marketing, we choose the enduring. Our
            philosophy is rooted in the belief that when a brand honors its
            truth, it gains an unfair advantage in the marketplace.
          </motion.p>
        </div>

        <div className="relative min-h-[600px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column */}
              <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#3D1A10] mb-4">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-lg text-[#3D1A10]/70 leading-relaxed font-medium">
                    {slides[currentSlide].description}
                  </p>
                </div>

                <div className="bg-[#E76F3D] p-6 lg:p-8 rounded-xl text-white relative flex gap-4 items-start">
                  <div className="flex-shrink-0 pt-1">
                    <Quote className="h-6 w-6 opacity-40 rotate-180" />
                  </div>
                  <p className="text-xl lg:text-2xl font-bold leading-tight">
                    {slides[currentSlide].highlight}
                  </p>
                  <div className="absolute right-4 bottom-4">
                    <Quote className="h-6 w-6 opacity-40" />
                  </div>
                </div>

                {/* Progress Bar / Navigation */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pt-4">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-[#E76F3D] flex items-center justify-center font-bold text-[#E76F3D] bg-white cursor-pointer hover:bg-[#E76F3D]/10 transition-colors"
                      onClick={prevSlide}
                    >
                      {slides[currentSlide].id}
                    </div>
                    <div className="flex-grow h-[2px] bg-[#E76F3D]/20 relative">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-[#E76F3D]"
                        initial={{ width: "0%" }}
                        animate={{
                          width: `${(slides[currentSlide].id / slides.length) * 100}%`,
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <div
                      className="w-10 h-10 rounded-full border-2 border-[#E76F3D]/20 flex items-center justify-center font-bold text-[#3D1A10]/40 bg-white cursor-pointer hover:bg-[#E76F3D]/5 transition-colors"
                      onClick={nextSlide}
                    >
                      {slides.length}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-6 pl-2">
                    <button
                      onClick={prevSlide}
                      className="group flex items-center justify-center w-12 h-12 rounded-full border border-[#E76F3D]/20 hover:border-[#E76F3D] transition-all duration-300"
                    >
                      <ArrowLeft className="h-6 w-6 text-[#E76F3D] transition-transform group-hover:-translate-x-1" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="group flex items-center justify-center w-12 h-12 rounded-full border border-[#E76F3D]/20 hover:border-[#E76F3D] transition-all duration-300"
                    >
                      <ArrowRight className="h-6 w-6 text-[#E76F3D] transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Image */}
              <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
                <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group">
                  <Image
                    src={slides[currentSlide].centerImage}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 order-3">
                <p className="text-xl lg:text-4xl font-lato italic text-[#3D1A10] leading-tight lg:-ml-12 relative z-10">
                  {slides[currentSlide].rightQuote}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
