"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface PreviewData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author_name: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
}

export default function BlogPreviewPage() {
  const [data, setData] = useState<PreviewData | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("blog_preview");
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {}
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-500">No preview data found.</p>
          <Link href="/admin/blogs" className="text-primary underline text-sm">
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Preview Banner */}
      <div className="sticky top-0 z-50 bg-amber-500 text-white text-center py-2 text-sm font-semibold flex items-center justify-center gap-4">
        <span>⚠ PREVIEW MODE — This post is not yet published</span>
        <Link
          href={
            data.id !== "new" ? `/admin/blogs/${data.id}` : "/admin/blogs/new"
          }
          className="underline font-bold flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to editor
        </Link>
      </div>

      {/* Cover Image */}
      {data.cover_image && (
        <div className="container mx-auto px-4 lg:px-8 pt-12">
          <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.cover_image}
              alt={data.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <header className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFF5F2] text-[#E76F3D] border border-[#FFE2D9] text-sm font-bold">
                {data.category || "Uncategorized"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#3F1200] leading-[1.1] tracking-tight">
                {data.title || "Untitled Post"}
              </h1>
              <div className="flex items-center gap-4 text-sm text-[#5c4033]/60 font-medium">
                <span>by {data.author_name || "Author"}</span>
                <span>·</span>
                <span>{formatDate(new Date().toISOString())}</span>
              </div>
              {data.excerpt && (
                <p className="text-xl text-[#5c4033]/80 leading-relaxed border-l-4 border-[#E76F3D] pl-5 italic">
                  {data.excerpt}
                </p>
              )}
            </header>

            {data.content ? (
              <div
                className="prose prose-lg max-w-none prose-headings:text-[#3F1200] prose-headings:font-black prose-p:text-[#5c4033] prose-p:leading-relaxed prose-img:rounded-3xl prose-img:shadow-xl prose-strong:text-[#3F1200] prose-blockquote:border-[#E76F3D] prose-blockquote:bg-[#FFF5F2]/50 prose-blockquote:rounded-2xl prose-blockquote:p-6"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            ) : (
              <div className="py-16 text-center text-gray-400 italic">
                No content written yet.
              </div>
            )}

            {/* Tags */}
            {data.tags.length > 0 && (
              <div className="pt-8 border-t flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#FFF5F2] text-[#E76F3D] text-sm font-medium border border-[#FFE2D9]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar hint */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 rounded-2xl bg-gray-50 p-6 text-sm text-gray-500">
              <p className="font-semibold text-gray-700 mb-2">SEO Preview</p>
              <p>
                <strong>Title:</strong> {data.meta_title || data.title}
              </p>
              <p className="mt-1">
                <strong>Description:</strong>{" "}
                {data.meta_description || data.excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
