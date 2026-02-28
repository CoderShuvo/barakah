"use client";

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Palette,
  BarChart3,
  Target,
  Megaphone,
  Globe,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/global";
import { Button } from "@/components/ui/button";
import { ServicesHero } from "@/components/services/services-hero";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import {
  MandalaIcon,
  MandalaIconText,
} from "@/components/services/mandala-icons";
import { FinalCTASection } from "@/components/landing/final-cta-section";

const services = [
  {
    id: "branding",
    subtitle: "Build a Brand People Trust",
    title: "Branding & Identity",
    description:
      "We create brand identities that are clear, cohesive, and enduring. From logos and visual systems to brand guidelines, we help define how your brand looks, feels, and shows up across every touchpoint.",
    image: "/assets/1.png",
    icon: MandalaIcon,
  },
  {
    id: "performance-marketing",
    subtitle: "Growth Backed by Strategy and Data",
    title: "Performance Marketing & Paid Media",
    description:
      "Our performance marketing focuses on intentional growth, not short-term spikes. We design paid media and search strategies that prioritize relevance, efficiency, and measurable impact.",
    image: "/assets/sercard1.png",
    icon: MandalaIcon,
  },
  {
    id: "digital",
    subtitle: "Experiences Designed to Convert",
    title: "Website Design & Development",
    description:
      "We design and build websites that balance form and function. Every experience is rooted in UX clarity, thoughtful UI, and performance — ensuring your site supports both users and business goals.",
    image: "/assets/sercard3.png",
    icon: MandalaIcon,
  },
  {
    id: "social-media",
    subtitle: "Consistent Presence. Meaningful Engagement.",
    title: "Social Media Marketing",
    description:
      "We help brands show up with purpose across social platforms. From strategy to execution, we focus on content and campaigns that build trust, relevance, and long-term audience relationships.",
    image: "/assets/sercard2.png",
    icon: MandalaIcon,
  },
  {
    id: "seo-sem",
    subtitle: "Visibility That Compounds Over Time",
    title: "SEO / SEM",
    description:
      "Our SEO and SEM services improve discoverability through strategic optimization, search intent alignment, and content support — helping brands earn attention where it matters most.",
    image: "/assets/sercard4.png",
    icon: MandalaIcon,
  },
  {
    id: "cro",
    subtitle: "Turn Traffic Into Action",
    title: "CRO",
    description:
      "We analyze user behavior and refine experiences to improve conversion. Through testing, insights, and iteration, we help brands make every interaction more effective and intentional.",
    image: "/assets/sercard5.png",
    icon: MandalaIcon,
  },
];

type Service = (typeof services)[0];

const brandingPileImages = [
  { src: "/assets/1.png", x: -100, y: -40, rotate: -15 },
  { src: "/assets/2.png", x: 100, y: -60, rotate: 15 },
  { src: "/assets/4.png", x: -80, y: 60, rotate: -10 },
  { src: "/assets/5.png", x: 90, y: 50, rotate: 12 },
  { src: "/assets/3.png", x: 0, y: 0, rotate: 0, isCenter: true },
];

function ImagePile({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-[250px] lg:h-[300px] flex items-center justify-center">
      {brandingPileImages.map((img, idx) => (
        <motion.div
          key={idx}
          initial={false}
          animate={{
            x: isHovered ? img.x : 0,
            y: isHovered ? img.y : 0,
            rotate: isHovered ? img.rotate : 0,
            scale: isHovered ? 1.05 : 1,
            zIndex: img.isCenter ? 30 : 20 - idx,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 0.8,
          }}
          className={`absolute ${
            img.isCenter ? "w-64 lg:w-72" : "w-40 lg:w-48"
          } aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20`}
        >
          <Image
            src={img.src}
            alt="Branding work"
            fill
            sizes="(max-width: 768px) 30vw, 20vw"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const [isHovered, setIsHovered] = useState(false);
  const isBranding = service.id === "branding";
  const Icon = service.icon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-4 lg:py-6"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          animate={{
            height: isHovered ? "auto" : "auto",
          }}
          className={`relative overflow-hidden group cursor-pointer rounded-[32px] transition-colors duration-400 ease-in-out ${
            isHovered ? "bg-[#E76F3D]" : "bg-transparent"
          }`}
          initial={false}
        >
          {/* Subtle Background Icon (Mandala) */}
          {/* <div
            className={`absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 transition-opacity duration-700 pointer-events-none z-0 scale-[2] ${
              isHovered ? "opacity-10" : "opacity-0"
            }`}
          >
            <MandalaIcon className="text-white" />
          </div> */}

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[450px]">
              {/* Content Column */}
              <div className="w-full  lg:w-3/5 flex flex-col items-start text-left justify-center transition-all duration-500">
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -50,
                        height: 0,
                        marginBottom: 0,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        height: "180px",
                        marginBottom: "16px",
                      }}
                      exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-full relative overflow-visible"
                    >
                      <Icon className="relative -top-20 -left-20 h-full w-auto opacity-90" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex px-8 py-8 flex-col items-start transition-all duration-500">
                  <span
                    className={`block font-medium mb-1 lg:mb-2 tracking-tight transition-all duration-500 ${
                      isHovered
                        ? "text-[#3F1200] text-lg lg:text-xl"
                        : "text-[#3F1200]/60 text-xl lg:text-2xl"
                    }`}
                  >
                    {service.subtitle}
                  </span>

                  <motion.h2
                    animate={{
                      fontSize: isHovered ? "42px" : "84px",
                    }}
                    transition={{ duration: 0.5 }}
                    className={`font-bold mb-3 leading-[1] tracking-[-0.03em] transition-colors duration-400 hidden xl:block ${
                      isHovered ? "text-[#3F1200]" : "text-[#3F1200]"
                    }`}
                  >
                    {service.title}
                  </motion.h2>

                  <motion.h2
                    animate={{
                      fontSize: isHovered ? "32px" : "64px",
                    }}
                    transition={{ duration: 0.5 }}
                    className={`font-bold mb-3 leading-[1] tracking-[-0.03em] transition-colors duration-400 hidden lg:block xl:hidden ${
                      isHovered ? "text-[#3F1200]" : "text-[#3D1A10]"
                    }`}
                  >
                    {service.title}
                  </motion.h2>

                  <motion.h2
                    className={`text-4xl font-bold mb-3 leading-[1] tracking-[-0.03em] transition-colors duration-400 lg:hidden ${
                      isHovered ? "text-[#3F1200]" : "text-[#3D1A10]"
                    }`}
                  >
                    {service.title}
                  </motion.h2>

                  <motion.p
                    animate={{
                      fontSize: isHovered ? "16px" : "24px",
                      maxWidth: isHovered ? "500px" : "672px",
                    }}
                    transition={{ duration: 0.5 }}
                    className={`leading-relaxed font-medium transition-colors duration-400 ${
                      isHovered ? "text-[#3F1200]" : "text-[#3F1200]"
                    }`}
                  >
                    {service.description}
                  </motion.p>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 lg:mt-8"
                      >
                        <Button
                          asChild
                          variant="outline"
                          className="bg-white text-[#E76F3D] border-transparent hover:bg-white/90 rounded-full px-6 lg:px-8 py-4 lg:py-6 text-base lg:text-lg font-bold shadow-lg group/btn"
                        >
                          <Link
                            href="/contact"
                            className="flex items-center gap-2"
                          >
                            Request a Free Consultation
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Image Container */}
              <div className="w-full lg:w-2/5 flex justify-end relative h-[250px] lg:h-[350px]">
                {isBranding ? (
                  <ImagePile isHovered={isHovered} />
                ) : (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 200, rotate: 10 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: 200, rotate: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 80,
                          damping: 15,
                          mass: 0.8,
                        }}
                        className="absolute top-0 right-0 w-full h-full max-w-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider - visible when NOT hovered */}
        <div
          className={`border-b border-[#3D1A10]/10 mt-6 transition-opacity duration-400 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}

function ServiceList({ services }: { services: Service[] }) {
  return (
    <section className="py-0 relative">
      <div className="border-t border-[#3D1A10]/10" />
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
}

const benefits = [
  {
    title: "Clarity Before Action",
    description:
      "We don’t jump to solutions. We listen, analyze, and align — so every move is rooted in your mission, constraints, and goals.",
  },
  {
    title: "Strategy Built on Trust",
    description:
      "Our process centers trust and transparency. You’ll always know the “why” behind our recommendations — and how they serve your values.",
  },
  {
    title: "Ethical, Not Extractive",
    description:
      "Growth shouldn’t come at the cost of your integrity. We design systems that honor people, communities, and long-term outcomes.",
  },
  {
    title: "Systems that Scale With You",
    description:
      "We don’t do one-size-fits-all. Our strategies are designed to grow with your team — sustainable, adaptable, and clear.",
  },
  {
    title: "Legacy-Driven Results",
    description:
      "We prioritize depth over hype. Our work leaves a lasting impact on your brand, your audience, and the communities you serve.",
  },
];
export default function ServicesPage() {
  return (
    <div className="bg-[#FFFCF9]">
      <ServicesHero />

      {/* Services List */}
      <ServiceList services={services} />

      {/* Benefits Section */}
      <Section className="py-4 lg:py-4 pt-24 lg:pt-28">
        <div className="w-full mx-auto px-4">
          <h2 className="text-5xl lg:text-[84px] font-bold text-[#3D1A10] mb-24 leading-[1] tracking-[-0.03em]">
            Benefits of Working <br /> With Barakah
          </h2>

          <div className="space-y-0">
            <div className="border-t border-[#3D1A10]/10" />
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className="py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
                  <div className="flex items-center gap-8 md:gap-12 flex-1">
                    <div className="flex-shrink-0">
                      <MandalaIconText />
                    </div>
                    <h3 className="text-2xl lg:text-4xl font-bold text-[#3D1A10] tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                      {benefit.title}
                    </h3>
                  </div>
                  <div className="md:w-1/2">
                    <p className="text-lg lg:text-2xl text-[#3F1200] leading-relaxed font-poppins font-regular">
                      {benefit.description}
                    </p>
                  </div>
                </div>
                <div className="border-b border-[#3D1A10]/10" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <FinalCTASection />
    </div>
  );
}
