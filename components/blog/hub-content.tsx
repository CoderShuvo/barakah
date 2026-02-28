"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NewsletterPopup } from "./newsletter-popup";

/**
 * Sidebar: Author Bio Card
 */
export function AuthorBio() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#E76F3D]/20">
          <Image
            src="/assets/ziad.png"
            alt="Ziad Itani"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-xs font-bold text-[#5c4033]/40 uppercase tracking-widest block">
            Written By
          </span>
          <h3 className="text-2xl font-black text-[#3F1200]">Ziad Itani</h3>
        </div>
      </div>
      <p className="text-[#5c4033] leading-relaxed text-sm lg:text-base">
        Ziad Itani is the Founder, Head of Growth at Barakah Agency. A visionary
        in ethical marketing, Ziad champions integrity-driven growth strategies
        and innovative solutions. When he's not helping clients succeed, he
        enjoys spending quality time with family and friends, exploring the
        great outdoors, and delving into thought-provoking books.
      </p>
    </div>
  );
}

/**
 * Sidebar: Newsletter Card
 */
export function NewsletterSidebarCard() {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div className="bg-[#FFF5F2] border border-[#FFE2D9] rounded-[2rem] p-8 space-y-6 relative overflow-hidden group">
      <div className="relative z-10 space-y-4">
        <div className="w-16 h-16 relative">
          {/* Floating Envelope Icon/Graphic */}
          <div className="absolute inset-0 bg-white rounded-2xl shadow-sm border border-[#FFE2D9] flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform duration-500">
            <Mail className="w-8 h-8 text-[#E76F3D]" />
          </div>
        </div>
        <h3 className="text-2xl font-black text-[#3F1200] leading-tight">
          Join Our Ethical <br /> Marketing Newsletter
        </h3>
        <p className="text-[#5c4033] text-sm leading-relaxed">
          Get the latest ethical marketing ideas, strategies, and best practices
          delivered to your inbox every other week.
        </p>
        <Button
          onClick={() => setIsPopupOpen(true)}
          className=" bg-[#E76F3D]
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
    transition-all"
        >
          <span className="font-bold">Sign Up</span>
          <div className="bg-white rounded-full p-1 group-hover/btn:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4 text-[#E76F3D]" />
          </div>
        </Button>
      </div>
      {/* Soft Background decorative element */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E76F3D]/5 rounded-full blur-2xl" />

      <NewsletterPopup isOpen={isPopupOpen} onOpenChange={setIsPopupOpen} />
    </div>
  );
}

/**
 * Main Content: Table of Contents
 */
export function TableOfContents() {
  const items = [
    { title: "What Is Ethical Marketing?", id: "what-is-ethical-marketing" },
    {
      title: "Understanding the Real Meaning of Ethical Marketing",
      id: "real-meaning",
    },
    {
      title: "What Are 4 Definitions of Ethical Marketing From Experts?",
      id: "expert-definitions",
    },
    { title: "Eight Ethical Marketing Core Concepts", id: "core-concepts" },
    {
      title: "Five Common Misconceptions About Ethical Marketing",
      id: "misconceptions",
    },
    { title: "What Is B2B Ethical Marketing?", id: "b2b-marketing" },
    { title: "What Is B2C Ethical Marketing?", id: "b2c-marketing" },
    {
      title: "What Is The Best Definition of Ethical Marketing?",
      id: "best-definition",
    },
    { title: "What Does Ethical Marketing Do?", id: "what-it-does" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-[#FFF5F2] border-l-4 border-[#E76F3D] px-6 py-4 rounded-r-xl">
        <h2 className="text-3xl font-black text-[#3F1200]">Table of Content</h2>
      </div>
      <ul className="space-y-4 pl-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4 group">
            <span className="font-black text-[#E76F3D] min-w-[24px]">
              {i + 1}.
            </span>
            <Link
              href={`#${item.id}`}
              className="font-bold text-[#3F1200] group-hover:text-[#E76F3D] transition-colors cursor-pointer"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Main Content: Starter Pack CTA
 */
export function StarterPackCTA() {
  return (
    <div className="bg-[#FFF5F2] border border-[#FFE2D9] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-sm">
      <div className="md:w-1/3 bg-[#E76F3D] p-8 flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center text-center p-6 shadow-2xl border-4 border-white/20">
          <span className="text-lg font-black text-[#3F1200] leading-tight mb-1">
            Ethical Marketing
          </span>
          <span className="text-sm font-bold text-[#E76F3D] uppercase tracking-tighter">
            Starter Pack
          </span>
          <div className="mt-2 w-8 h-1 bg-[#3F1200]/10 rounded-full" />
        </div>
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      <div className="flex-1 p-8 md:p-10 space-y-6 flex flex-col justify-center">
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-[#3F1200] leading-tight">
            Download Your Ethical Marketing Starter Pack Now
          </h3>
          <p className="text-[#5c4033] leading-relaxed">
            No signup required—just click the button below. Enjoyed this free
            resource? Consider joining our email list to stay updated on the
            latest in ethical marketing.
          </p>
        </div>
        <Link
          href="https://drive.google.com/uc?export=download&id=1SEpoEuPO3AkZvijK6zmQwlJ3Ty0xlEdS"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-[#E76F3D]
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
    transition-all"
          >
            <span className="text-lg font-bold">Download</span>
            <div className="bg-white rounded-full p-2 group-hover/btn:scale-110 transition-transform">
              <Download className="w-5 h-5 text-[#E76F3D]" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}

/**
 * Blue Border Content Box (for Definitions, 8Ps, etc)
 */
export function ContentBox({
  title,
  children,
  className,
  variant = "default",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "infographic";
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.5rem] p-8 md:p-12 border-2",
        variant === "default"
          ? "border-[#A5D8FF] bg-white"
          : "border-[#FFE2D9] bg-[#FFF5F2]",
        className,
      )}
    >
      {title && (
        <h3
          className={cn(
            "text-3xl md:text-4xl font-black mb-8",
            variant === "default" ? "text-[#00B4D8]" : "text-[#3F1200]",
          )}
        >
          {title}
        </h3>
      )}
      <div className="space-y-6">{children}</div>

      {/* Background design element like in Image 2 */}
      {variant === "default" && (
        <div className="absolute top-8 right-8 w-24 h-24 opacity-20 pointer-events-none text-[#00B4D8]">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
            <path d="M50 10 L50 90 M10 50 L90 50" />
          </svg>
        </div>
      )}
    </div>
  );
}

/**
 * Expert Quote Card
 */
export function ExpertQuote({
  number,
  quote,
  author,
  company,
}: {
  number: string;
  quote: string;
  author: string;
  company?: string;
}) {
  return (
    <div className="space-y-6">
      <h4 className="text-2xl font-black text-[#5c4033]">
        Definition #{number}
      </h4>
      <div className="bg-[#48CAE4] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        {/* Quote Mark Icon */}
        <div className="absolute top-8 left-8 opacity-20">
          <svg width="48" height="36" viewBox="0 0 48 36" fill="currentColor">
            <path d="M10.6667 36L0 25.3333V0H18.6667V18.6667H10.6667L10.6667 36ZM37.3333 36L26.6667 25.3333V0H45.3333V18.6667H37.3333V36Z" />
          </svg>
        </div>

        <div className="relative z-10 space-y-8 flex flex-col items-center text-center">
          <p className="text-xl md:text-2xl font-bold leading-relaxed max-w-3xl pt-8">
            "{quote}"
          </p>
          <div className="space-y-1">
            <p className="text-lg font-black">- {author}</p>
            {company && (
              <p className="text-sm font-bold text-white/80">{company}</p>
            )}
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

/**
 * Animated Marketing Flow Infographic (Image 2)
 */
export function EthicalMarketingInfographic() {
  const steps = [
    { title: "Positioning", color: "bg-[#1A1A1A]" },
    { title: "Market Research", color: "bg-[#1A1A1A]" },
    { title: "Physical Evidence", color: "bg-[#1A1A1A]" },
    { title: "Promotion", color: "bg-[#1A1A1A]" },
    { title: "Pricing Analysis", color: "bg-[#1A1A1A]" },
    { title: "Distribution", color: "bg-[#1A1A1A]" },
    { title: "Ethical Framework", color: "bg-[#1A1A1A]" },
    { title: "Faith-Led", color: "bg-[#1A1A1A]" },
  ];

  return (
    <div className="w-full min-h-[400px] lg:min-h-[800px] relative">
      <Image
        src="/assets/ethical-marketing-1.png"
        alt="Ethical Marketing Infographic"
        fill
        className="object-contain absolute"
      />
    </div>
  );
}

/**
 * Editorial Banner with Globe Wireframe (Image 7 & 8)
 */
export function EditorialBanner({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.5rem] p-8 md:p-12 border-2 border-[#A5D8FF] bg-white overflow-hidden shadow-sm",
        className,
      )}
    >
      <div className="relative z-10 lg:pr-48 space-y-4">
        <h3 className="text-3xl font-black text-[#00B4D8]">{title}</h3>
        <p className="text-[#5c4033] leading-relaxed max-w-2xl font-medium">
          {description}
        </p>
      </div>

      {/* Globe Wireframe SVG - Top Right */}
      <div className="absolute top-0 right-0 w-64 h-64 -translate-y-12 translate-x-12 opacity-50 pointer-events-none text-[#00B4D8]">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <circle cx="100" cy="100" r="80" />
          <ellipse cx="100" cy="100" rx="30" ry="80" />
          <ellipse cx="100" cy="100" rx="80" ry="30" />
          <line x1="20" y1="100" x2="180" y2="100" />
          <line x1="100" y1="20" x2="100" y2="180" />
          <path d="M45 45 Q 100 100 155 155" />
          <path d="M155 45 Q 100 100 45 155" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Concentric Infographic (Image 9)
 */
export function ConcentricInfographic() {
  const layers = [
    { title: "Ethical Marketing", color: "bg-[#FFF5F2]" },
    { title: "Ethical Marketing Strategies", color: "bg-[#E76F3D]" },
    { title: "Ethical Marketing Tactics", color: "bg-[#48CAE4]" },
    { title: "Ethical Marketing Channels", color: "bg-[#90E0EF]" },
    { title: "Ethical Marketing Content", color: "bg-black" },
    {
      title: "Ethical Marketing Collateral",
      color: "bg-white",
      textColor: "text-black",
    },
  ];

  return (
    <div className="w-full min-h-[400px] lg:min-h-[800px] relative">
      <Image
        src="/assets/ethical-marketing-2.png"
        alt="Ethical Marketing Infographic"
        fill
        className="object-contain absolute"
      />
    </div>
  );
}

/**
 * References Section Footer
 */
export function ReferencesList({ refs }: { refs: string[] }) {
  return (
    <div className="pt-16 border-t border-[#F0EBE8] mt-12 space-y-6">
      <h3 className="text-xl font-black text-[#3F1200]">References:</h3>
      <ol className="space-y-3 list-decimal pl-6 text-sm text-[#5c4033]/70 font-medium">
        {refs.map((ref, i) => (
          <li key={i}>{ref}</li>
        ))}
      </ol>
    </div>
  );
}
