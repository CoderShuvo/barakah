import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactRedesignForm } from "@/components/contact/contact-redesign-form";
import { ContactExpectations } from "@/components/contact/contact-expectations";
import { ContactQuoteSection } from "@/components/contact/contact-quote-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { Section } from "@/components/global";
import { getFormSettings } from "@/server/settings-actions";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Barakah Agency. Discover the difference of a personalized, ethical marketing consultation.",
};

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
