import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Quote, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/global";
import { Section } from "@/components/global";
import { Button } from "@/components/ui/button";
import { getCaseStudyBySlug, getCaseStudies } from "@/server/queries";
import { CaseStudyCard } from "@/components/case-study/case-study-card";

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return constructMetadata({
    type: "case_studies",
    slug,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const { data: relatedCaseStudies } = await getCaseStudies({
    published: true,
    industry: caseStudy.industry,
    pageSize: 3,
  });

  const filteredRelated = relatedCaseStudies
    .filter((cs) => cs.id !== caseStudy.id)
    .slice(0, 2);

  const metrics = caseStudy.metrics as Record<string, string> | null;

  return (
    <>
      {/* Header */}
      <div className="pt-24 lg:pt-32 pb-8 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: caseStudy.title },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              {caseStudy.industry}
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance">
              {caseStudy.title}
            </h1>
            <p className="text-lg text-muted-foreground">{caseStudy.client}</p>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {caseStudy.cover_image && (
        <div className="container mx-auto px-4 lg:px-8 -mt-0">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-muted">
            <Image
              src={caseStudy.cover_image || "/placeholder.svg"}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Metrics */}
      {metrics && Object.keys(metrics).length > 0 && (
        <Section className="bg-primary text-primary-foreground py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key}>
                <div className="font-serif text-3xl lg:text-4xl font-bold mb-1">
                  {value}
                </div>
                <p className="text-sm text-primary-foreground/80">{key}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Content */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Challenge */}
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
              The Challenge
            </h2>
            <div
              className="prose prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: caseStudy.challenge }}
            />
          </div>

          {/* Solution */}
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Our Solution
            </h2>
            <div
              className="prose prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: caseStudy.solution }}
            />
          </div>

          {/* Results */}
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-4">
              The Results
            </h2>
            <div
              className="prose prose-lg max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: caseStudy.results }}
            />
          </div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <div className="bg-muted/50 rounded-2xl p-8 lg:p-10">
              <Quote className="h-10 w-10 text-primary/30 mb-4" />
              <blockquote className="font-serif text-xl lg:text-2xl text-foreground mb-6 italic">
                "{caseStudy.testimonial}"
              </blockquote>
              {caseStudy.testimonial_author && (
                <p className="text-muted-foreground font-medium">
                  {caseStudy.testimonial_author}
                </p>
              )}
            </div>
          )}

          {/* Gallery */}
          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${caseStudy.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-muted/30">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how we can help your brand grow with integrity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/case-studies">
                <ArrowLeft className="mr-2 h-5 w-5" />
                View All Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Related Case Studies */}
      {filteredRelated.length > 0 && (
        <Section>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground text-center mb-8">
            More Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {filteredRelated.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
