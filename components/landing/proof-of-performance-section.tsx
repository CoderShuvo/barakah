"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

const caseStudies = [
  {
    id: 1,
    title: "DAYS OF EID",
    logo: "/assets/pop1.svg",
    logoColor: "#d4a574",
    tags: ["Digital Marketing", "Web Development"],
    description:
      "Days of Eid is a seasonal Muslim home décor brand specializing in Ramadan and Eid collections. The brand had reached a ceiling in the U.S. market and needed to unlock new customer acquisition without eroding profitability. We rebuilt their paid media strategy with refined audience targeting, high-converting creative, and disciplined performance optimization.",
    metrics: [
      { label: "Year-over-Year Revenue Growth", value: "+75%" },
      { label: "ROAS", value: "6–10x " },
    ],
    bgColor: "from-orange-200 to-orange-300",
  },
  {
    id: 2,
    title: "Fadwa Masala",
    logo: "/assets/pop2.svg",
    logoColor: "#b8449d",
    tags: ["eCommerce Marketing Strategy", "Paid Media"],
    description:
      "Fadwa Masala was a bootstrapped startup looking to establish a foundation for scalable eCommerce growth.Through a combination of strategic branding, paid social campaigns, and growth-focused marketing initiatives, we created a performance engine that drove both revenue and community impact. Within the first 90 days, the brand not only achieved positive ROI but also delivered measurable results in sales, customer acquisition, and audience growth.",
    metrics: [
      { label: "Purchases", value: "272" },
      { label: "ROAS achieved within first 90 days", value: "30-50%" },
    ],
    bgColor: "from-orange-200 to-orange-300",
  },
  {
    id: 3,
    title: "Halal Expo",
    logo: "/assets/pop3.svg",
    logoSubtext: "6TH US International",
    logoColor: "#5a7ba8",
    tags: ["Event Marketing Strategy", "Paid Media"],
    description:
      "We partnered with Halal Expo to drive registrations and qualified interest for their Annual Halal Expo & Summit 2025. Through a focused Meta and Google paid media strategy — executed with disciplined budget allocation — we significantly increased high-intent leads while maintaining strong efficiency. Our performance-driven approach amplified visibility, improved targeting precision, and delivered measurable ROI in a competitive event marketing landscape.",
    metrics: [
      { label: "Increase in Qualified Leads", value: "300% " },
      { label: "Return on Ad Spend (ROAS)", value: "7–8x" },
    ],
    bgColor: "from-orange-200 to-orange-300",
  },
  {
    id: 4,
    title: "Ten Peaks Shuttle & Tours",
    logo: "/assets/pop4.svg",
    logoColor: "#2563eb",

    tags: ["Tourism Marketing Strategy", "Paid Media"],
    description:
      "Ten Peaks Shuttle & Tours provides seasonal tourism experiences across Alberta, Canada. We partnered with them to scale both their Summer and Winter campaigns through creative strategy and precision paid media execution. By aligning compelling visual storytelling with high-intent audience targeting, we helped maximize seasonal demand and drive efficient revenue growth across peak travel periods.",
    metrics: [
      { label: "ROAS", value: "6x" },
      { label: "increase in sales YoY", value: "30-50%" },
    ],
    bgColor: "from-orange-200 to-orange-300",
  },
];

export function ProofOfPerformanceSection() {
  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-4">
          <p className="text-sm font-semibold text-[#3F1200] mb-2 font-lato">
            • Our Works •
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3F1200] mb-16 font-lato">
            Stories of Purposeful Growth
          </h2>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-6 max-w-7xl mx-auto">
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              initial="initial"
              whileHover="expanded"
              className="bg-white  overflow-hidden  hover:shadow-2xl transition-shadow duration-500 cursor-pointer border-b pb-4 border-black-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[200px] p-6 md:p-10">
                {/* Left Column - Info */}
                <div className="md:pr-10 flex flex-col justify-center relative z-10 ">
                  <div className="w-full">
                    <h3 className="text-3xl font-bold text-[#3F1200] mb-6 font-lato">
                      {study.title}
                    </h3>

                    {/* Initial State Tags */}
                    <motion.div
                      variants={{
                        initial: {
                          opacity: 1,
                          height: "auto",
                          marginBottom: 0,
                        },
                        expanded: { opacity: 0, height: 0, marginBottom: 0 },
                      }}
                      className="flex flex-wrap gap-2 overflow-hidden"
                    >
                      {study.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 border border-[#3F1200]/20 rounded-full text-[10px] uppercase tracking-wider font-bold text-[#3F1200] font-lato"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    {/* Expanded Content */}
                    <motion.div
                      variants={{
                        initial: { opacity: 0, height: 0, marginTop: 0 },
                        expanded: { opacity: 1, height: "auto", marginTop: 24 },
                      }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-base text-[#5c4033] leading-relaxed mb-8 font-lato text-justify">
                        {study.description}
                      </p>

                      {/* Metrics */}
                      {study.metrics.length > 0 && (
                        <div className="flex gap-10 mb-8 p-6  rounded-2xl">
                          {study.metrics.map((metric, idx) => (
                            <div key={idx}>
                              <div className="text-4xl md:text-6xl lg:text-[84px] font-bold italic text-[#3F1200] font-lato">
                                {metric.value}
                              </div>
                              <div className="text-[10px] uppercase  tracking-widest text-[#5c4033] font-lato font-bold mt-1">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {study.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[#3F1200] rounded-full text-[10px] font-bold text-white font-lato uppercase tracking-tighter"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Right Column - Logo */}
                <div
                  className={`relative overflow-hidden rounded-3xl bg-cover bg-center  p-12 flex items-center justify-center min-h-[200px]`}
                  style={{ backgroundImage: `url(${study.logo})` }}
                >
                  <motion.div
                    variants={{
                      initial: { scale: 1, rotate: 0 },
                      expanded: { scale: 1.1, rotate: -2 },
                    }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="text-center relative z-10"
                  >
                    {/* {study.logo && (
                      <Image
                        src={study.logo}
                        alt={study.logoSubtext || study.title}
                        width={300}
                        height={300}
                        className="mb-4"
                      />
                    )} */}
                  </motion.div>

                  {/* Subtle Overlay Pattern */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%">
                      <pattern
                        id="pattern"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#pattern)" />
                    </svg>
                  </div>

                  {/* View Case Study Hover Button */}
                  {/* <motion.div
                    variants={{
                      initial: { y: "150%" },
                      expanded: { y: "0%" },
                    }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    className="absolute bottom-6 left-6 right-6 h-[72px] rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-between px-8 z-30 shadow-2xl border border-white/10"
                  >
                    <span className="text-white font-lato font-bold text-xl tracking-tight">
                      View Case Study
                    </span>
                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                      <ArrowRight className="text-[#f59e5f] h-6 w-6 stroke-[3px]" />
                    </div>
                  </motion.div> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
