import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/global";
import {
  BlogHero,
  BlogTopicsSidebar,
  TrendingTopics,
  BlogListItem,
  BlogPagination,
  NewsletterSection,
} from "@/components/blog";
import { getBlogs, getBlogCategories } from "@/server/queries";

import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    type: "pages",
    slug: "blog",
    fallbackTitle: "Marketing Insights & Growth Strategy | Barakah Agency",
    fallbackDescription:
      "Actionable insights on ethical marketing, paid media, brand strategy, and growth systems — for founders who want to grow with purpose.",
    fallbackImage: "https://barakahagency.com/barakah-featured-image.png",
  });
}

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category;

  let { data: blogs, totalPages } = await getBlogs({
    page,
    pageSize: 5,
    published: true,
    category,
  });

  // Mock data fallback for UI showcase if DB is empty
  if (blogs.length === 0 && !category) {
    blogs = [
      {
        id: "1",
        title: "Growth Beyond Metrics",
        description:
          "Barakah Agency was founded on the belief that growth is not neutral, and that every decision an organization makes sends a signal about what it values, how it treats people, and what kind of future it is working toward.",
        category: "Ethical Growth",
        slug: "growth-beyond-metrics-1",
        created_at: new Date().toISOString(),
        published: true,
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "2",
        title: "Practical Strategy for the Long Term",
        description:
          "Moving beyond surface-level metrics to build foundations that last. Discover why ethical strategy is the most sustainable path to meaningful impact.",
        category: "Strategy",
        slug: "practical-strategy",
        created_at: new Date().toISOString(),
        published: true,
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "3",
        title: "Frameworks for Ethical Scaling",
        description:
          "How to maintain your principles while growing your reach. A deep dive into systems that balance performance and responsibility.",
        category: "Frameworks",
        slug: "ethical-scaling",
        created_at: new Date().toISOString(),
        published: true,
        image:
          "https://images.unsplash.com/photo-1454165833767-bb2d6f44888e?auto=format&fit=crop&q=80&w=800",
      },
    ] as any;
    totalPages = 5; // Force pagination to show for demo/mockup purposes
  }

  const categories = await getBlogCategories();
  const displayCategories =
    categories.length > 0
      ? categories
      : [
          "Ethical Growth",
          "Strategy",
          "Frameworks",
          "Systems",
          "Brand",
          "Performance",
        ];

  return (
    <>
      <BlogHero />

      <Section>
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#5c4033]/60 text-lg italic">
              No articles found. Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogTopicsSidebar
                categories={displayCategories}
                currentCategory={category}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <TrendingTopics
                categories={displayCategories}
                currentCategory={category}
              />

              <div className="space-y-4">
                {blogs.map((blog) => (
                  <BlogListItem key={blog.id} blog={blog} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-16 flex justify-center lg:justify-start">
                  <BlogPagination
                    currentPage={page}
                    totalPages={totalPages}
                    baseUrl="/blog"
                    searchParams={category ? { category } : undefined}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Section>

      <NewsletterSection />
    </>
  );
}
