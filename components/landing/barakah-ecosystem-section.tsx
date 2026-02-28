"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function BarakahEcosystemSection() {
  const pathname = usePathname();
  const isEcosystemPage = pathname === "/the-barakah-ecosystem";

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3F1200] mb-8 font-lato">
            The Barakah Ecosystem
          </h2>
        </div>

        {/* Two-column intro */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 w-full px-14 mx-auto ">
          <div className="col-span-1">
            <h3 className="text-2xl md:text-3xl font-bold text-[#3F1200] font-lato">
              Specialized Brands, Built
              <br />
              for Distinct Industries
            </h3>
          </div>
          <div className="col-span-2">
            <p className="text-xl md:text-2xl text-[#5c4033] leading-relaxed font-lato">
              We help purpose-driven e-commerce brands grow with clarity and
              conscience. Our approach blends ethical performance strategy,
              intentional community-building, and culturally aware creative to
              build lasting customer relationships.
            </p>
          </div>
        </div>

        {/* Brand Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {/* Card 1 */}
          <div className="relative w-full md:w-[48%] lg:w-[30%] h-[700px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all m-2">
            <Image
              src="/assets/11.png"
              alt="JIRA E-Commerce Marketing"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Image
                src="/assets/lira.png"
                alt="JIRA Logo"
                height={139}
                width={300}
                className="object-contain mb-3"
              />
              <p className="text-lg leading-relaxed opacity-90 font-lato">
                We help purpose-driven e-commerce brands grow with clarity and
                conscience. Our approach blends ethical performance strategy,
                intentional community-building, and culturally aware creative to
                build lasting customer relationships.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <Link
            href="https://engineering.marketing/"
            target="_blank"
            className="relative w-full md:w-[48%] lg:w-[30%] h-[700px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all m-2"
          >
            <div>
              <Image
                src="/assets/22.jpg"
                alt="Engineering Marketing Agency"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Image
                  src="/assets/tema.png"
                  alt="Engineering Logo"
                  height={70}
                  width={300}
                  className="object-contain mb-3"
                />
                <p className="text-lg leading-relaxed opacity-90 font-lato">
                  We support engineering firms and industrial innovators in
                  translating complex ideas into compelling narratives. From
                  technical content to strategic campaigns, we help teams grow
                  with credibility, clarity, and long-term trust.
                </p>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            href="https://healthcaredigital.marketing/"
            target="_blank"
            className="relative w-full md:w-[48%] lg:w-[30%] h-[700px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all m-2"
          >
            <Image
              src="/assets/33.jpg"
              alt="Health Digital"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Image
                src="/assets/hdigital.png"
                alt="Engineering Logo"
                height={110}
                width={193}
                className="object-contain mb-3"
              />
              <p className="text-lg  leading-relaxed opacity-90 font-lato">
                We partner with health-focused organizations to build ethical,
                human-centered digital strategies. Whether you’re navigating
                patient education, growth, or advocacy, our approach centers on
                clarity, care, and culturally respectful communication.
              </p>
            </div>
          </Link>

          {/* Card 4 */}
          <Link
            href="https://zeroframe.io/"
            target="_blank"
            className="relative w-full md:w-[48%] lg:w-[30%] h-[700px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all m-2"
          >
            <Image
              src="/assets/44.png"
              alt="ZeroFrame Automation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold font-lato mb-2">
                ZeroFrame™ Sales & Marketing Automation
              </h3>
              <p className="text-lg  leading-relaxed opacity-90 font-lato">
                ZeroFrame is an all-in-one sales and automation platform built
                on Go HighLevel — tailored for all industries we serve. It
                streamlines lead capture, email marketing, CRM, and client
                workflows into one intentional system, helping you grow with
                structure, clarity, and efficiency.
              </p>
            </div>
          </Link>

          {/* Card 5 */}
          <Link
            href="https://nubayin.studio/"
            target="_blank"
            className="relative w-full md:w-[48%] lg:w-[30%] h-[700px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all m-2"
          >
            <Image
              src="/assets/55.jpg"
              alt="NUBAYIN Studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Image
                src="/assets/nubayin.png"
                alt="NUBAYIN Logo"
                height={90}
                width={251}
                className="object-contain mb-3"
              />
              <p className="text-lg leading-relaxed opacity-90 font-lato">
                NUBAYIN is a storytelling and entertainment studio creating
                media rooted in spiritual imagination, cultural wisdom, and
                liberated futures. Through film, audio, and immersive
                experiences, NUBAYIN challenges narratives, celebrates beauty,
                and reclaims joy through a decolonial lens.
              </p>
            </div>
          </Link>
        </div>

        {/* CTA Button */}
        <div className="text-center">
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
            <Link
              href={
                isEcosystemPage ? "/case-studies" : "/the-barakah-ecosystem"
              }
            >
              {isEcosystemPage
                ? "Explore Our Case Studies"
                : "Explore The Barakah Ecosystem"}
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
