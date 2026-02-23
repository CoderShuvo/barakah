"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BlogHero() {
  const manifesto = `Growth is built on trust. Central to this approach is ROI, our belief that true success must account for both relevance and responsibility. Performance without responsibility is fragile, and impact without accountability is unsustainable. By holding these two dimensions together, we help you build growth systems that are measurable, ethical, and resilient over time. At Barakah Agency, strategy always comes before shortcuts or surface-level metrics. Instead, we focus on strong foundations, and connected systems that allow for long-term alignment or credibility. Our approach respects people and principles, drawing from principles of faith, wisdom, and stewardship. We don't just optimize for clicks or deals, but for practical standards that shape our world. We believe that growth is not just about revenue, but about the quality of the impact created along the way.`;

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-12">
      {/* Background Manifesto Text */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none ">
        <Image src="/assets/Words.png" alt="Blog Hero" fill />
      </div>

      {/* Main Heading */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] font-bold text-[#3D1A10] leading-none tracking-tight mt-[40vh]"
        >
          Ethical Marketing Blog
        </motion.h1>
      </div>
    </section>
  );
}
