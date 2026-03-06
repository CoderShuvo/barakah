import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactRedesignForm } from "@/components/contact/contact-redesign-form";
import { ContactExpectations } from "@/components/contact/contact-expectations";
import { ContactQuoteSection } from "@/components/contact/contact-quote-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { Section } from "@/components/global";
import { getFormSettings } from "@/server/settings-actions";

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "contact",
    fallbackTitle: "Grow with Barakah — Book Your Free Strategy Consultation",
    fallbackDescription:
      "Book a no-pressure strategy call with Barakah Agency. We align on your goals and values before recommending a single tactic.",
    fallbackImage: "/assets/featured-barakah.jpg",
  });
}

export default async function ContactPage() {
  const { data: formSettings } = await getFormSettings();

  return (
    <>
      <ContactHero />

      <Section containerClassName="max-w-7xl">
        <ContactRedesignForm settings={formSettings || undefined} />
      </Section>

      <ContactExpectations />

      <ContactQuoteSection />

      <FinalCTASection buttonLabel="Grow with Barakah" />
    </>
  );
}
