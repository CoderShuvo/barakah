import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary-foreground)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground)/0.1)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Transform Your Marketing with Integrity?
          </h2>
          <p className="text-lg lg:text-xl text-primary-foreground/80 mb-10 leading-relaxed text-pretty">
            Join hundreds of purpose-driven brands who have discovered the power
            of ethical marketing. Let's build something meaningful together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base px-8 h-12"
            >
              <Link href="/contact">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-8 h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
            >
              <Link href="/the-barakah-method">Learn Our Method</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
