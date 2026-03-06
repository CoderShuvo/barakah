"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Loader2,
  Eye,
  X,
  Calendar,
  Tag,
  Plus,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImagePicker } from "@/components/admin/image-picker";
import { createBlog, updateBlog } from "@/server/actions";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { Blog } from "@/types";

const PRESET_CATEGORIES = [
  "Ethical Marketing",
  "Branding",
  "Performance Marketing",
  "Case Studies",
  "Industry Insights",
  "Tips & Guides",
  "Strategy",
  "Frameworks",
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Local datetime string to ISO
function localToISO(localStr: string): string | null {
  if (!localStr) return null;
  return new Date(localStr).toISOString();
}

// ISO to local datetime-local input value
function isoToLocal(isoStr: string | null): string {
  if (!isoStr) return "";
  const d = new Date(isoStr);
  // Format: YYYY-MM-DDTHH:mm
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  custom_category: string;
  author_name: string;
  published: boolean;
  scheduled_publish_at: string; // local datetime string
  meta_title: string;
  meta_description: string;
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
  const [slugManual, setSlugManual] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Tags managed as array
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    category: "",
    custom_category: "",
    author_name: "",
    published: false,
    scheduled_publish_at: "",
    meta_title: "",
    meta_description: "",
  });

  useEffect(() => {
    if (!isNew) fetchBlog();
  }, [id]);

  async function fetchBlog() {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      toast.error("Failed to load blog post");
      router.push("/admin/blogs");
      return;
    }

    const blog = data as Blog;
    const isPreset = PRESET_CATEGORIES.includes(blog.category || "");

    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      cover_image: blog.cover_image || "",
      category: isPreset ? blog.category || "" : "custom",
      custom_category: isPreset ? "" : blog.category || "",
      author_name: blog.author_name || "",
      published: blog.published || false,
      scheduled_publish_at: isoToLocal(blog.scheduled_publish_at),
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || "",
    });
    setTags(blog.tags || []);
    setSlugManual(true); // Don't auto-override existing slug
    setLoading(false);
  }

  function handleTitleChange(title: string) {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugManual ? prev.slug : slugify(title),
    }));
  }

  function addTag(raw: string) {
    const tag = raw.trim().toLowerCase();
    if (!tag) return;
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
  }

  const resolvedCategory =
    formData.category === "custom"
      ? formData.custom_category
      : formData.category;

  async function handleSubmit(e: React.FormEvent, publishNow?: boolean) {
    e.preventDefault();
    setSaving(true);
    setFieldErrors({});

    const publishedFlag =
      publishNow !== undefined ? publishNow : formData.published;
    const scheduledAt =
      !publishedFlag && formData.scheduled_publish_at
        ? localToISO(formData.scheduled_publish_at)
        : publishedFlag
          ? null
          : null;

    const blogData = {
      title: formData.title,
      slug: formData.slug || slugify(formData.title),
      excerpt: formData.excerpt,
      content: formData.content,
      cover_image: formData.cover_image,
      category: resolvedCategory,
      author_name: formData.author_name,
      tags: tags.join(", "),
      published: publishedFlag,
      scheduled_publish_at: scheduledAt,
      meta_title: formData.meta_title,
      meta_description: formData.meta_description,
    };

    try {
      let result;
      if (isNew) {
        result = await createBlog(blogData as any);
      } else {
        result = await updateBlog(id, blogData as any);
      }

      if (result.success) {
        toast.success(
          isNew
            ? publishNow
              ? "Post published!"
              : "Post saved as draft"
            : publishNow
              ? "Post published!"
              : "Changes saved",
        );
        router.push("/admin/blogs");
      } else {
        if (typeof result.error === "object" && !(result.error as any)?.code) {
          setFieldErrors(result.error as Record<string, string[]>);
          toast.error("Please fix the validation errors");
        } else {
          toast.error(
            typeof result.error === "string"
              ? result.error
              : (result.error as any)?.message || "Failed to save",
          );
        }
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      toast.error("An unexpected error occurred");
    }
    setSaving(false);
  }

  function openPreview() {
    // Save to localStorage so preview page can read it
    localStorage.setItem(
      "blog_preview",
      JSON.stringify({
        ...formData,
        category: resolvedCategory,
        tags,
        id,
      }),
    );
    window.open(`/admin/blogs/preview`, "_blank");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/blogs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            {isNew ? "New Blog Post" : "Edit Blog Post"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isNew
              ? "Write and publish a new article"
              : `Editing: ${formData.title}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={openPreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={(e) => handleSubmit(e as any, false)}
          >
            Save Draft
          </Button>
          <Button
            type="button"
            disabled={saving}
            onClick={(e) => handleSubmit(e as any, true)}
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Publish Now
          </Button>
        </div>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* ——— Left: Main content ——— */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Write an engaging title…"
                  className="text-lg font-semibold"
                  required
                />
                {fieldErrors.title && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.title[0]}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">
                  URL Slug *
                  <span className="text-muted-foreground font-normal ml-2 text-xs">
                    (auto-generated from title, editable)
                  </span>
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm shrink-0">
                    /blog/
                  </span>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => {
                      setSlugManual(true);
                      setFormData((prev) => ({
                        ...prev,
                        slug: e.target.value,
                      }));
                    }}
                    placeholder="my-blog-post-slug"
                    className="font-mono text-sm"
                    required
                  />
                </div>
                {fieldErrors.slug && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.slug[0]}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt / Summary *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      excerpt: e.target.value,
                    }))
                  }
                  placeholder="A short description shown in listing pages and social previews…"
                  rows={3}
                />
                {fieldErrors.excerpt && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.excerpt[0]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Rich Text Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                content={formData.content}
                onChange={(content) =>
                  setFormData((prev) => ({ ...prev, content }))
                }
                placeholder="Write your article here. Use the toolbar to format headings, lists, links and embed images…"
              />
              {fieldErrors.content && (
                <p className="text-xs text-destructive mt-2">
                  {fieldErrors.content[0]}
                </p>
              )}
            </CardContent>
          </Card>

          {/* SEO Card */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Meta Data</CardTitle>
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
                  placeholder="Defaults to post title if empty"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.meta_title.length}/60
                </p>
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
                  placeholder="Defaults to excerpt if empty"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.meta_description.length}/160
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ——— Right: Sidebar ——— */}
        <div className="space-y-6">
          {/* Publish */}
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="published" className="cursor-pointer">
                  Published
                </Label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(v) =>
                    setFormData((prev) => ({
                      ...prev,
                      published: v,
                      scheduled_publish_at: v ? "" : prev.scheduled_publish_at,
                    }))
                  }
                />
              </div>

              {!formData.published && (
                <div className="space-y-2">
                  <Label htmlFor="schedule" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Publishing
                  </Label>
                  <Input
                    id="schedule"
                    type="datetime-local"
                    value={formData.scheduled_publish_at}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        scheduled_publish_at: e.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank to keep as draft. Set a future date to
                    auto-publish.
                  </p>
                </div>
              )}

              <Separator />

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  className="w-full"
                  disabled={saving}
                  onClick={(e) => handleSubmit(e as any, true)}
                >
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Publish Now
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={saving}
                  onClick={(e) => handleSubmit(e as any, false)}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Featured Image */}
              <div className="space-y-2">
                <Label htmlFor="cover_image">Featured Image URL</Label>
                <ImagePicker
                  id="cover_image"
                  url={formData.cover_image}
                  onUrlChange={(url: string) =>
                    setFormData((p) => ({ ...p, cover_image: url }))
                  }
                />
                {formData.cover_image && (
                  <div className="relative overflow-hidden rounded-md aspect-video mt-2 bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.cover_image}
                      alt="Cover preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
                {fieldErrors.cover_image && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.cover_image[0]}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, category: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESET_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">+ Custom category…</SelectItem>
                  </SelectContent>
                </Select>
                {formData.category === "custom" && (
                  <Input
                    value={formData.custom_category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        custom_category: e.target.value,
                      }))
                    }
                    placeholder="Type custom category name"
                    className="mt-2"
                  />
                )}
                {fieldErrors.category && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.category[0]}
                  </p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author_name">Author</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      author_name: e.target.value,
                    }))
                  }
                  placeholder="e.g. Ziad Itani"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Tags
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="marketing, branding…"
                    className="text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => addTag(tagInput)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Press Enter or comma to add
                </p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer gap-1 pr-1"
                        onClick={() => removeTag(tag)}
                      >
                        {tag}
                        <X className="h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
