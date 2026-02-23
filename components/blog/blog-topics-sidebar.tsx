"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogTopicsSidebarProps {
  categories: string[];
  currentCategory?: string;
}

export function BlogTopicsSidebar({
  categories,
  currentCategory,
}: BlogTopicsSidebarProps) {
  return (
    <aside className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-[#3F1200]">
          Blog Topics
        </h3>
        <nav className="flex flex-col gap-4">
          <Link
            href="/blog"
            className={cn(
              "text-lg font-medium transition-colors hover:text-[#E76F3D]",
              !currentCategory ? "text-[#E76F3D] font-bold" : "text-[#5c4033]",
            )}
          >
            All Topics
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog?category=${category}`}
              className={cn(
                "text-lg font-normal transition-colors hover:text-[#E76F3D]",
                currentCategory === category
                  ? "text-[#5c4033] font-bold"
                  : "text-[#5c4033]",
              )}
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
