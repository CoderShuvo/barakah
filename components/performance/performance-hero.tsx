"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function PerformanceHero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#FFFCF9] pb-40">
      {/* Decorative Background Pattern (Mandala-like) */}

      <div className="w-full   mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl lg:text-[90px] font-bold text-[#3D1A10] leading-[0.95] tracking-[-0.03em] mb-10"
            >
              Performance <br />
              Marketing That <br />
              Respects the Person.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl lg:text-3xl text-[#3D1A10]/70 leading-relaxed max-w-xl mb-12 font-medium"
            >
              We’ve replaced aggressive tactics with high-integrity growth
              systems. Scale your reach without compromising your reputation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="h-16 px-10 bg-[#E76F3D] hover:bg-[#D46235] text-white rounded-full text-xl font-bold shadow-2xl shadow-orange-500/20 group transition-all hover:scale-105"
              >
                <Link href="/contact" className="flex items-center gap-4">
                  Grow with Barakah
                  <div className="bg-white rounded-full p-2 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-6 w-6 text-[#E76F3D]" />
                  </div>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Visual (Speedometer) */}
          <div className="relative w-full h-screen overflow-hidden  hidden lg:block ">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src="/assets/pheroright.png"
                alt="Performance"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
