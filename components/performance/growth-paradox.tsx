"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface SlideData {
  id: string;
  number: string;
  title: string;
  humanImpact: string;
  industryStandard: string;
  barakahInsight: string;
  image: string;
  imageCaption: string;
}

const slides: SlideData[] = [
  {
    id: "01",
    number: "01",
    title: "Volatile Acquisition Cycles",
    humanImpact:
      'This creates a "Treadmill Effect" where your business is only as healthy as your last campaign. It fosters a transactional relationship with customers who only value your price, not your brand.',
    industryStandard:
      "Most agencies optimize for the immediate click, utilizing aggressive discounting and high-frequency ad spend to manufacture artificial revenue spikes.",
    barakahInsight:
      'True growth (Barakah) is organic and compounding. If your marketing does not build "Gravity"—the ability to attract customers without paying for every single touchpoint—you are managing a decline, not a business.',
    image: "/assets/pm2.jpg",
    imageCaption: 'The "Sugar-High" Growth Mode',
  },
  {
    id: "02",
    number: "02",
    title: "Audience Burnout & Resistance",
    humanImpact:
      'When you optimize for algorithms, you lose the person. High "engagement" often translates to low "intent," leading to high churn rates and a "hollow" customer base.',
    industryStandard:
      "Success is traditionally measured by ROAS (Return on Ad Spend) and CPA (Cost Per Acquisition). These metrics look impressive on dashboards but often mask shrinking profit margins.",
    barakahInsight:
      'We prioritize "Return on Impact" alongside ROI. We look at Customer Lifetime Value (LTV) and brand resonance as the true North Star for high-performance growth.',
    image: "/assets/pm3.jpg",
    imageCaption: "The Attention Extraction Deficit",
  },
  {
    id: "03",
    number: "03",
    title: "Metric Obsession vs. Real Value",
    humanImpact:
      "Focusing solely on vanity metrics leads to a disconnect between marketing data and business reality. You might see clicks rising while profits are stagnant or falling.",
    industryStandard:
      "The industry is built on chasing attribution windows and click-through rates, often ignoring the qualitative health of the brand and long-term customer sentiment.",
    barakahInsight:
      'We focus on "Human-Centric Attribution." We measure success through meaningful conversions and brand loyalty, ensuring that every dollar spent contributes to long-term equity.',
    image: "/assets/pm4.jpg",
    imageCaption: 'The "Mirage" of Scale',
  },
  {
    id: "04",
    number: "04",
    title: "Algorithmic Fragility",
    humanImpact:
      'This creates "Platform Fragility." You are building your house on rented land, giving platforms direct access to your audience data and the ability to platform your own future.',
    industryStandard:
      'Businesses are increasingly dependent on the "Black Box" of platform algorithms. Meta (Facebook), Google, and Apple control reach with ever-changing rules.',
    barakahInsight:
      "We focus on First-Party Data Sovereignty. By building owned ecosystem (Email, SMS, Community), we ensure your growth is stable, predictable, and resilient against platform changes.",
    image: "/assets/pm5.jpg",
    imageCaption: 'The "Black Box" Dependency',
  },
];

export function GrowthParadox() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const calculateScrollRange = () => {
      if (containerRef.current) {
        setScrollRange(
          containerRef.current.scrollWidth - window.innerWidth + 200,
        ); // Add a small buffer for comfort
      }
    };

    calculateScrollRange();
    window.addEventListener("resize", calculateScrollRange);
    return () => window.removeEventListener("resize", calculateScrollRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section ref={sectionRef} className="relative h-[600vh] bg-[#FFFCF9]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E76F3D]/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E76F3D]/5 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 mb-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-[80px] font-bold text-[#3D1A10] leading-[0.9]"
            >
              The Growth <br /> Paradox
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl lg:text-3xl text-[#3D1A10]/70 leading-relaxed font-medium pt-4 max-w-xl"
            >
              Many brands chase growth at all costs. But optimizing for
              algorithms instead of people leads to erosion, not expansion. We
              help you grow in ways that are sustainable, ethical, and
              human-centered.
            </motion.p>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex whitespace-nowrap gap-12 lg:gap-24 relative z-10 pl-[5vw] lg:pl-[10vw]"
        >
          {/* Left Block: The Performance Problem */}
          <div className="flex-shrink-0 w-[85vw] lg:w-[450px]">
            <div className="flex flex-col h-full whitespace-normal">
              <h3 className="text-4xl lg:text-6xl font-bold text-[#3D1A10] mb-10 leading-tight">
                The Performance <br /> Problem
              </h3>
              <div className="relative aspect-[4/5] h-[300px] lg:h-[400px] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl group">
                <Image
                  src="/assets/pm1.png"
                  alt="Performance Problem"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D1A10]/60 via-transparent to-transparent opacity-60" />
              </div>
              <Button
                asChild
                className="w-fit h-16 px-10 bg-[#E76F3D] hover:bg-[#D46235] text-white rounded-full text-xl font-bold shadow-xl shadow-orange-500/20 group transition-all hover:scale-105"
              >
                <Link href="/contact" className="flex items-center gap-4">
                  Grow with Barakah
                  <div className="bg-white rounded-full p-2 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5 text-[#E76F3D]" />
                  </div>
                </Link>
              </Button>
            </div>
          </div>

          {/* Slides */}
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-[85vw] lg:w-[1000px] border-l border-[#3D1A10]/10 pl-12 lg:pl-24 whitespace-normal"
            >
              <div className="grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-24 items-start">
                {/* Slide Content */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[#E76F3D] font-mono text-2xl font-bold italic">
                      // {slide.number}
                    </span>
                    <h4 className="text-3xl lg:text-5xl font-bold text-[#3D1A10] leading-tight">
                      {slide.title}
                    </h4>
                  </div>

                  <div className="space-y-12">
                    <div>
                      <h5 className="text-xl font-bold text-[#3D1A10] mb-3">
                        The Human Impact
                      </h5>
                      <p className="text-lg text-[#3D1A10]/70 leading-relaxed font-medium">
                        {slide.humanImpact}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-xl font-bold text-[#3D1A10] mb-3">
                        The Industry Standard
                      </h5>
                      <p className="text-lg text-[#3D1A10]/70 leading-relaxed font-medium">
                        {slide.industryStandard}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slide Image Area */}
                <div className="space-y-8">
                  <div>
                    <span className="block text-sm font-bold text-[#3D1A10]/50 uppercase tracking-widest mb-4">
                      {slide.imageCaption}
                    </span>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="bg-[#3D1A10]/5 p-8 rounded-2xl border border-[#3D1A10]/10">
                    <h5 className="text-xl font-bold text-[#E76F3D] italic mb-3">
                      The Barakah Insight
                    </h5>
                    <p className="text-lg text-[#3D1A10] leading-relaxed font-medium">
                      {slide.barakahInsight}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="container mx-auto px-4 mt-20 hidden lg:block relative z-10">
          <div className="w-full h-px bg-[#3D1A10]/10 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#E76F3D]"
              style={{ scaleX: scrollYProgress, originX: 0 }}
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
