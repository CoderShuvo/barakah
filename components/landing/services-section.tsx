import Link from "next/link";
import {
  ArrowRight,
  Palette,
  BarChart3,
  Target,
  Megaphone,
  Globe,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/global";

const services = [
  {
    icon: Palette,
    title: "Branding",
    description:
      "Build a powerful, authentic brand identity that resonates with your audience and reflects your values.",
    href: "/services/branding-identity",
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    description:
      "Data-driven campaigns across paid channels that maximize ROI while maintaining ethical standards.",
    href: "/services/performance-marketing",
  },
  {
    icon: Target,
    title: "Strategy Consulting",
    description:
      "Strategic guidance to align your marketing efforts with your business goals and ethical principles.",
    href: "/services#strategy",
  },
  {
    icon: Megaphone,
    title: "Content Marketing",
    description:
      "Compelling content that educates, inspires, and drives engagement with your target audience.",
    href: "/services#content",
  },
  {
    icon: Globe,
    title: "Digital Presence",
    description:
      "Website design and development that creates meaningful connections and drives conversions.",
    href: "/services#digital",
  },
  {
    icon: Sparkles,
    title: "The Barakah Method",
    description:
      "Our proprietary approach combining ethical principles with modern marketing excellence.",
    href: "/the-barakah-method",
  },
];

export function ServicesSection() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        subtitle="Our Services"
        title="Comprehensive Marketing Solutions"
        description="From brand strategy to performance marketing, we offer a full suite of services designed to help ethical businesses thrive."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group p-6 lg:p-8 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {service.description}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
