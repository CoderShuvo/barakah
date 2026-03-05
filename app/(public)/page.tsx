import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://barakahagency.com"),
  title:
    "Barakah Agency: Full-Service Ethical Marketing Agency for the Modern World",
  description:
    "Empower change with Barakah Agency: The world’s first ethical marketing agency that amplifies your impact to shape a brighter future.",
  openGraph: {
    title:
      "Barakah Agency: Full-Service Ethical Marketing Agency for the Modern World",
    description:
      "Empower change with Barakah Agency: The world’s first ethical marketing agency that amplifies your impact to shape a brighter future.",
    url: "https://barakahagency.com",
    siteName: "Barakah Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/fetured-barakah.jpg",
        width: 1200,
        height: 630,
        alt: "Barakah Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Barakah Agency: Full-Service Ethical Marketing Agency for the Modern World",
    description:
      "Empower change with Barakah Agency: The world’s first ethical marketing agency that amplifies your impact to shape a brighter future.",
    images: ["/assets/fetured-barakah.jpg"],
  },
};

import {
  Hero,
  FeaturedCaseStudies,
  FeaturedBlogs,
  CTASection,
} from "@/components/landing";
import { WhyBarakah } from "@/components/landing/why-barakah";
import { ServicesShowcase } from "@/components/landing/services-showcase";
import { BarakahMethodSection } from "@/components/landing/barakah-method-section";
import { BarakahEcosystemSection } from "@/components/landing/barakah-ecosystem-section";
import { ProofOfPerformanceSection } from "@/components/landing/proof-of-performance-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { BrandsSection } from "@/components/landing/brands-section";
import { VideoShowcaseSection } from "@/components/landing/video-showcase-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";

function CaseStudiesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="aspect-[4/3] rounded-xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

function BlogsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg bg-muted animate-pulse h-80" />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyBarakah />
      <ServicesShowcase />
      <BarakahMethodSection />
      <BarakahEcosystemSection />
      <ProofOfPerformanceSection />
      <TestimonialsSection />
      <BrandsSection />
      <VideoShowcaseSection />

      {/* <Suspense fallback={<CaseStudiesSkeleton />}>
        <FeaturedCaseStudies />
      </Suspense>
      <Suspense fallback={<BlogsSkeleton />}>
        <FeaturedBlogs />
      </Suspense> */}
      {/* <CTASection /> */}
    </>
  );
}
