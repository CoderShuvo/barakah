import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/global";
import { Section } from "@/components/global";
import { CaseStudyGrid } from "@/components/case-study/case-study-card";
import { CustomPagination } from "@/components/custom-pagination";
import { getCaseStudies } from "@/server/queries";

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "case-studies",
  });
}

interface CaseStudiesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

async function CaseStudiesList({ page }: { page: number }) {
  const { data: caseStudies, totalPages } = await getCaseStudies({
    page,
    pageSize: 9,
    published: true,
  });

  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          No case studies found. Check back soon for new success stories!
        </p>
      </div>
    );
  }

  return (
    <>
      <CaseStudyGrid caseStudies={caseStudies} />

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/case-studies"
          />
        </div>
      )}
    </>
  );
}

function CaseStudiesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="aspect-[4/3] rounded-xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

import { CaseStudiesHero } from "@/components/case-study/case-studies-hero";
import { ProofOfPerformanceSection } from "@/components/landing/proof-of-performance-section";
import { CaseOutcomeExample } from "@/components/case-study/case-outcome-example";
import { BrandsSection } from "@/components/landing/brands-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";

export default async function CaseStudiesPage({
  searchParams,
}: CaseStudiesPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <>
      <CaseStudiesHero />
      <ProofOfPerformanceSection />
      <BrandsSection />
      <CaseOutcomeExample />
      <FinalCTASection buttonLabel="Book a Free Consultation" />
    </>
  );
}
