import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/global";
import { Section } from "@/components/global";
import { getBlogBySlug, getBlogs } from "@/server/queries";
import { BlogDetailSidebar, NewsletterSection } from "@/components/blog";
import { formatDate } from "@/lib/utils";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  return constructMetadata({
    type: "blogs",
    slug,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  let blog = await getBlogBySlug(slug);

  // Mock data fallback for demonstration if blog not found in DB
  if (!blog) {
    const mockBlogs = [
      {
        id: "1",
        title: "Growth Beyond Metrics",
        description:
          "Barakah Agency was founded on the belief that growth is not neutral, and that every decision an organization makes sends a signal about what it values, how it treats people, and what kind of future it is working toward.",
        excerpt:
          "Barakah Agency was founded on the belief that growth is not neutral...",
        content: `
          <p>For years, growth has been measured through dashboards. Revenue curves, conversion rates, engagement percentages, and acquisition costs have become the dominant language of success. Metrics matter. They bring clarity, accountability, and direction. But when metrics become the only lens through which growth is evaluated, something essential is lost.</p>
          <p>At Barakah Agency, we believe growth is bigger than numbers. Not because numbers are unimportant, but because they are incomplete. True growth is not only what can be measured immediately, but what continues to compound over time. It is built through trust, clarity, responsibility, and intention. These are not soft ideas. They are durable assets that shape reputation, loyalty, and long-term performance.</p>
          <h2>The Limits of Metric-Only Growth</h2>
          <p>Metrics are designed to capture outcomes, not meaning. They tell us what happened, not why it mattered. When organizations focus exclusively on short-term indicators, growth can become fragile. Teams chase optimizations that inflate performance temporarily but erode trust quietly. Audiences are converted but not retained. Attention is captured but not respected.</p>
          <p>Over time, this approach creates diminishing returns. The cost of acquisition rises. Loyalty weakens. Brand equity becomes dependent on constant spending rather than genuine belief. Growth looks strong on paper but lacks resilience when conditions change.</p>
          <p>This is not a failure of analytics. It is a failure of perspective.</p>
          <img src="https://images.unsplash.com/photo-1478737270239-2fccd2c08ac5?auto=format&fit=crop&q=80&w=1200" alt="Studio" />
          <h2>Building Growth Systems</h2>
          <p>Sustainable growth behaves less like a campaign and more like a system. Systems create consistency. They reinforce behavior. They compound value gradually rather than dramatically. When growth is treated as a system, decisions are made with foresight rather than urgency.</p>
          <p>At Barakah Agency, we design growth systems that connect strategy, positioning, messaging, channels, and measurement into a coherent whole. Metrics still play a role, but they serve the system rather than dictate it. Performance is evaluated alongside trust, clarity, and long-term impact.</p>
          <p>Trust rarely appears on dashboards, yet it shapes nearly every outcome that follows. It influences how audiences interpret messages, how customers respond to mistakes, and how long relationships last. Trust lowers friction. It shortens decision cycles. It increases forgiveness and loyalty.</p>
          <p>Brands that invest in trust grow differently. Their marketing does not need to shout. Their offers do not need to overpromise. Their reputation carries weight because it has been earned through consistency and responsibility. Trust is built through alignment. When what a brand says, does, and measures all point in the same direction, growth becomes believable.</p>
        `,
        category: "Ethical Growth",
        slug: "growth-beyond-metrics-1",
        created_at: new Date().toISOString(),
        published: true,
        cover_image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
      },
      {
        id: "2",
        title: "Practical Strategy for the Long Term",
        description:
          "Moving beyond surface-level metrics to build foundations that last.",
        excerpt:
          "Moving beyond surface-level metrics to build foundations that last.",
        content: "<p>Detailed strategy content goes here...</p>",
        category: "Strategy",
        slug: "practical-strategy",
        created_at: new Date().toISOString(),
        published: true,
        cover_image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      },
      {
        id: "3",
        title: "Frameworks for Ethical Scaling",
        description:
          "How to maintain your principles while growing your reach.",
        excerpt: "How to maintain your principles while growing your reach.",
        content:
          "<p>Scaling with integrity is the core challenge for modern organizations. Discover how to build systems that scale your impact without compromising your ethics.</p>",
        category: "Frameworks",
        slug: "ethical-scaling",
        created_at: new Date().toISOString(),
        published: true,
        cover_image:
          "https://images.unsplash.com/photo-1454165833767-bb2d6f44888e?auto=format&fit=crop&q=80&w=1200",
      },
    ];
    blog = mockBlogs.find((b) => b.slug === slug) as any;
  }

  if (!blog) {
    notFound();
  }

  const { data: relatedBlogs } = await getBlogs({
    published: true,
    category: blog.category,
    pageSize: 4,
  });

  // Filter out current blog and limit to 3 for the sidebar
  const filteredRelated = relatedBlogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  return (
    <article className="bg-white">
      {/* Top Bar / Breadcrumbs */}
      <div className="pt-24 lg:pt-32 pb-6">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: blog.category, href: `/blog?category=${blog.category}` },
              { label: "You are here" },
            ]}
          />
        </div>
      </div>

      {/* Hero / Cover Image */}
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <div className="relative aspect-[21/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <Image
            src={blog.cover_image || "/placeholder-blog.jpg"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content Layout */}
      <Section className="py-0 lg:py-0 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-8">
            <header className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#3F1200] leading-[1.1] tracking-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm font-bold">
                <span className="px-4 py-1.5 rounded-full bg-[#FFF5F2] text-[#E76F3D] border border-[#FFE2D9]">
                  {blog.category}
                </span>
                <div className="flex items-center gap-2 text-[#5c4033]/60">
                  <span>by {blog.author_name || "Ziad Itani"}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E76F3D]/20" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none prose-headings:text-[#3F1200] prose-headings:font-black prose-p:text-[#5c4033] prose-p:leading-relaxed prose-img:rounded-3xl prose-img:shadow-xl prose-strong:text-[#3F1200] prose-blockquote:border-[#E76F3D] prose-blockquote:bg-[#FFF5F2]/50 prose-blockquote:rounded-2xl prose-blockquote:p-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BlogDetailSidebar relatedBlogs={filteredRelated} />
            </div>
          </div>
        </div>
      </Section>

      <NewsletterSection />
    </article>
  );
}
