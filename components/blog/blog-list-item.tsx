"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Blog } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogListItemProps {
  blog: Blog;
}

export function BlogListItem({ blog }: BlogListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative border-b border-[#F0EBE8] pb-12 mb-12 last:border-0 last:pb-0 last:mb-0"
    >
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center md:items-start text-[#3F1200]">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <Link href={`/blog/${blog.slug}`}>
            <h3 className="text-3xl md:text-4xl font-black transition-colors hover:text-[#E76F3D]">
              {blog.title}
            </h3>
          </Link>

          <p className="text-lg text-[#5c4033] leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm font-normal">
            <span className="px-4 py-1.5 rounded-lg bg-[#FFF5F2] text-[#3F1200] border border-[#FFE2D9]">
              {blog.category}
            </span>
            <span className="text-[#5c4033]/60">
              by {blog.author_name || "Ziad Itani"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E76F3D]/20" />
            <span className="text-[#5c4033]/60">
              {formatDate(blog.created_at)}
            </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[35%] aspect-[1.3] relative overflow-hidden rounded-3xl shadow-xl">
          <Link href={`/blog/${blog.slug}`} className="block w-full h-full">
            <Image
              src={blog.cover_image || "/placeholder-blog.jpg"}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
