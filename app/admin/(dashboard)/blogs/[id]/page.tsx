"use client";

import React from "react";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { createBlog, updateBlog } from "@/server/actions";
import { toast } from "sonner";

const CATEGORIES = [
  "Ethical Marketing",
  "Branding",
  "Performance Marketing",
  "Case Studies",
  "Industry Insights",
  "Tips & Guides",
];

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author_name: string;
  tags: string; // This will be overridden by tagsInput (string) in handleSubmit
  meta_title: string;
  meta_description: string;
  published: boolean;
}

export default function BlogEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const supabase = createClient();
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    category: "",
    author_name: "",
    tags: "",
    meta_title: "",
    meta_description: "",
    published: false,
  });
  const [tagsInput, setTagsInput] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!isNew) {
      fetchBlog();
    }
  }, [id, isNew]);

  async function fetchBlog() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching blog:", error);
      router.push("/admin/blogs");
    } else if (data) {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        cover_image: data.cover_image || "",
        category: data.category || "",
        author_name: data.author_name || "",
        tags: data.tags?.join(", ") || "",
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        published: data.published || false,
      });
      setTagsInput((data.tags || []).join(", "));
    }
    setLoading(false);
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(title: string) {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  }

  function handleTagsChange(value: string) {
    setTagsInput(value);
    setFormData((prev) => ({ ...prev, tags: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFieldErrors({});

    const blogData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      tags: tagsInput,
    };

    try {
      if (isNew) {
        const result = await createBlog(blogData);
        if (result.success) {
          toast.success("Blog post created successfully");
          router.push("/admin/blogs");
        } else {
          // If it's a validation error (object with arrays of strings)
          if (typeof result.error === "object" && !(result.error as any).code) {
            setFieldErrors(result.error as Record<string, string[]>);
            toast.error("Please fix the errors in the form");
          } else {
            // It's a server/database error (string or error object)
            toast.error(
              typeof result.error === "string"
                ? result.error
                : (result.error as any)?.message || "Failed to create blog",
            );
          }
        }
      } else {
        const result = await updateBlog(id, blogData);
        if (result.success) {
          toast.success("Blog post updated successfully");
          router.push("/admin/blogs");
        } else {
          if (typeof result.error === "object" && !(result.error as any).code) {
            setFieldErrors(result.error as Record<string, string[]>);
            toast.error("Please fix the errors in the form");
          } else {
            toast.error(
              typeof result.error === "string"
                ? result.error
                : (result.error as any)?.message || "Failed to update blog",
            );
          }
        }
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      toast.error("An unexpected error occurred");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/blogs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isNew ? "New Blog Post" : "Edit Blog Post"}
          </h1>
          <p className="text-muted-foreground">
            {isNew ? "Create a new blog post" : "Update your blog post"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog title"
                    required
                  />
                  {fieldErrors.title && (
                    <p className="text-sm font-medium text-destructive">
                      {fieldErrors.title[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="blog-post-slug"
                    required
                  />
                  {fieldErrors.slug && (
                    <p className="text-sm font-medium text-destructive">
                      {fieldErrors.slug[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        excerpt: e.target.value,
                      }))
                    }
                    placeholder="Brief description of the post"
                    rows={3}
                  />
                  {fieldErrors.excerpt && (
                    <p className="text-sm font-medium text-destructive">
                      {fieldErrors.excerpt[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) =>
                      setFormData((prev) => ({ ...prev, content }))
                    }
                    placeholder="Write your blog content here..."
                  />
                  {fieldErrors.content && (
                    <p className="text-sm font-medium text-destructive">
                      {fieldErrors.content[0]}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, published: checked }))
                    }
                  />
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isNew ? "Create Post" : "Update Post"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cover_image">Cover Image URL</Label>
                  <Input
                    id="cover_image"
                    value={formData.cover_image}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cover_image: e.target.value,
                      }))
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                  {fieldErrors.cover_image && (
                    <p className="text-sm font-medium text-destructive">
                      {fieldErrors.cover_image[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.category && (
                    <p className="text-sm font-medium text-destructive">
                      {fieldErrors.category[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author_name">Author Name</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        author_name: e.target.value,
                      }))
                    }
                    placeholder="Enter author name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="marketing, branding, tips"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate tags with commas
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        meta_title: e.target.value,
                      }))
                    }
                    placeholder="SEO title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        meta_description: e.target.value,
                      }))
                    }
                    placeholder="SEO description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
