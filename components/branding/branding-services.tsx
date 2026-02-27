"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/global";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Brand Strategy & Positioning",
    description:
      "We take the time to understand your context before recommending solutions. By grounding every engagement in clear objectives, constraints, and priorities, we ensure strategy is intentional and aligned — not reactive or rushed.",
    process: "Audit → Extraction → White-space → Manifesto",
    image: "/assets/tai1.png",
  },
  {
    id: "02",
    title: "Logo Design & Visual Identity",
    description:
      "We take the time to understand your context before recommending solutions. By grounding every engagement in clear objectives, constraints, and priorities, we ensure strategy is intentional and aligned — not reactive or rushed.",
    process: "Concept → Refinement → Art Direction → Identity Suite",
    image: "/assets/tai2.png",
  },
  {
    id: "03",
    title: "Brand Messaging & Voice",
    description:
      "We take the time to understand your context before recommending solutions. By grounding every engagement in clear objectives, constraints, and priorities, we ensure strategy is intentional and aligned — not reactive or rushed.",
    process: "Linguistics → Persona → Frameworks → Source Code",
    image: "/assets/tai3.png",
  },
  {
    id: "04",
    title: "Brand Guidelines & Design Systems",
    description:
      "We take the time to understand your context before recommending solutions. By grounding every engagement in clear objectives, constraints, and priorities, we ensure strategy is intentional and aligned — not reactive or rushed.",
    process: "Blueprints → Documentation → Asset Hub → Governance",
    image: "/assets/tai4.png",
  },
];

export function BrandingServices() {
  return (
    <Section className="bg-[#FFFCF9] py-32">
      <div className="container mx-auto px-4">
        {/* Header content */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#3D1A10]/50 font-medium uppercase tracking-[0.3em] mb-6 text-sm"
          >
            • Branding Services •
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-bold text-[#3D1A10] leading-tight"
          >
            The Architecture of Identity
          </motion.h2>
        </div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="py-16 first:pt-0 border-t border-[#3D1A10]/10 last:border-b"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-8 relative group">
                {/* Number Section */}
                <div className="lg:col-span-2">
                  <span className="text-3xl lg:text-5xl font-lato text-[#3D1A10] font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    [ {service.id} ]
                  </span>
                </div>

                {/* Main Content Section */}
                <div className="lg:col-span-6 space-y-8">
                  <h3 className="text-3xl lg:text-5xl font-regular font-lato text-[#3D1A10]group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-[#3D1A10]/60 leading-relaxed font-medium max-w-2xl">
                    {service.description}
                  </p>
                  <p className="text-lg lg:text-xl font-bold text-[#3D1A10] tracking-tight pt-4">
                    {service.process}
                  </p>
                </div>

                {/* Image Section */}
                <div className="lg:col-span-4 self-center lg:pl-12">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-[#3D1A10]/5 group-hover:scale-105 transition-transform duration-700">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D1A10]/10 to-transparent" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
