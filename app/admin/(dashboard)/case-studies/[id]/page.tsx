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
import { createCaseStudy, updateCaseStudy } from "@/server/actions";
import { toast } from "sonner";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Education",
  "Real Estate",
  "Food & Beverage",
  "Fashion",
  "Non-profit",
  "Other",
];

interface CaseStudyFormData {
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  cover_image: string;
  gallery: string[];
  metrics: Record<string, string>;
  testimonial: string;
  testimonial_author: string;
  published: boolean;
  featured: boolean;
}

export default function CaseStudyEditorPage({
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
  const [formData, setFormData] = useState<CaseStudyFormData>({
    title: "",
    slug: "",
    client: "",
    industry: "",
    challenge: "",
    solution: "",
    results: "",
    cover_image: "",
    gallery: [],
    metrics: {},
    testimonial: "",
    testimonial_author: "",
    published: false,
    featured: false,
  });
  const [metricsInput, setMetricsInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetchCaseStudy();
    }
  }, [id, isNew]);

  async function fetchCaseStudy() {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching case study:", error);
      router.push("/admin/case-studies");
    } else if (data) {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        client: data.client || "",
        industry: data.industry || "",
        challenge: data.challenge || "",
        solution: data.solution || "",
        results: data.results || "",
        cover_image: data.cover_image || "",
        gallery: data.gallery || [],
        metrics: data.metrics || {},
        testimonial: data.testimonial || "",
        testimonial_author: data.testimonial_author || "",
        published: data.published || false,
        featured: data.featured || false,
      });
      setGalleryInput((data.gallery || []).join("\n"));
      setMetricsInput(
        Object.entries(data.metrics || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n"),
      );
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

  function handleMetricsChange(value: string) {
    setMetricsInput(value);
    const metrics: Record<string, string> = {};
    value.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length) {
        metrics[key.trim()] = valueParts.join(":").trim();
      }
    });
    setFormData((prev) => ({ ...prev, metrics }));
  }

  function handleGalleryChange(value: string) {
    setGalleryInput(value);
    const gallery = value
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, gallery }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const caseStudyData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
    };

    try {
      if (isNew) {
        const result = await createCaseStudy(caseStudyData as any);
        if (result.success) {
          toast.success("Case study created successfully");
          router.push("/admin/case-studies");
        } else {
          toast.error(
            typeof result.error === "string"
              ? result.error
              : (result.error as any)?.message || "Failed to create case study",
          );
        }
      } else {
        const result = await updateCaseStudy(id, caseStudyData as any);
        if (result.success) {
          toast.success("Case study updated successfully");
          router.push("/admin/case-studies");
        } else {
          toast.error(
            typeof result.error === "string"
              ? result.error
              : (result.error as any)?.message || "Failed to update case study",
          );
        }
      }
    } catch (err) {
      console.error("Error saving case study:", err);
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
          <Link href="/admin/case-studies">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isNew ? "New Case Study" : "Edit Case Study"}
          </h1>
          <p className="text-muted-foreground">
            {isNew ? "Create a new case study" : "Update your case study"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Case study title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }))
                      }
                      placeholder="case-study-slug"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client Name</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          client: e.target.value,
                        }))
                      }
                      placeholder="Client company name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, industry: value }))
                      }
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="challenge">The Challenge</Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        challenge: e.target.value,
                      }))
                    }
                    placeholder="Describe the client's challenge..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">Our Solution</Label>
                  <Textarea
                    id="solution"
                    value={formData.solution}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        solution: e.target.value,
                      }))
                    }
                    placeholder="Describe the solution implemented..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="results">Results</Label>
                  <Textarea
                    id="results"
                    value={formData.results}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        results: e.target.value,
                      }))
                    }
                    placeholder="Describe the results achieved..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Testimonial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testimonial">Client Testimonial</Label>
                  <Textarea
                    id="testimonial"
                    value={formData.testimonial}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        testimonial: e.target.value,
                      }))
                    }
                    placeholder="What did the client say about working with you?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testimonial_author">Testimonial Author</Label>
                  <Input
                    id="testimonial_author"
                    value={formData.testimonial_author}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        testimonial_author: e.target.value,
                      }))
                    }
                    placeholder="John Doe, CEO of Company"
                  />
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, featured: checked }))
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
                      {isNew ? "Create" : "Update"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gallery">Gallery Images</Label>
                  <Textarea
                    id="gallery"
                    value={galleryInput}
                    onChange={(e) => handleGalleryChange(e.target.value)}
                    placeholder="One URL per line"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="metrics">Key Metrics</Label>
                  <Textarea
                    id="metrics"
                    value={metricsInput}
                    onChange={(e) => handleMetricsChange(e.target.value)}
                    placeholder="Revenue Growth: 150%&#10;Leads Generated: 500&#10;ROI: 300%"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: Metric Name: Value (one per line)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
