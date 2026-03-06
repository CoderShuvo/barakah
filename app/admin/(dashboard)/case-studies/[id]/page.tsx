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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  X,
  Star,
  Tag,
  BarChart2,
} from "lucide-react";
import { createCaseStudy, updateCaseStudy } from "@/server/actions";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { CaseStudy } from "@/types";

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
  "Media & Entertainment",
  "Other",
];

const SERVICE_TAG_OPTIONS = [
  "Branding & Identity",
  "Digital Marketing",
  "Paid Media",
  "Performance Marketing",
  "SEO",
  "Social Media",
  "Content Strategy",
  "Ethical Marketing",
  "Web Design",
  "Email Marketing",
  "Analytics",
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface Metric {
  label: string;
  value: string;
}

interface FormData {
  title: string;
  slug: string;
  client: string;
  industry: string;
  custom_industry: string;
  challenge: string;
  solution: string;
  results: string;
  cover_image: string;
  gallery: string[];
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
  const [slugManual, setSlugManual] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Service tags as array
  const [serviceTags, setServiceTags] = useState<string[]>([]);
  const [serviceTagInput, setServiceTagInput] = useState("");

  // Stat callouts (metrics)
  const [metrics, setMetrics] = useState<Metric[]>([]);

  // Gallery URLs
  const [galleryInput, setGalleryInput] = useState("");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    client: "",
    industry: "",
    custom_industry: "",
    challenge: "",
    solution: "",
    results: "",
    cover_image: "",
    gallery: [],
    testimonial: "",
    testimonial_author: "",
    published: false,
    featured: false,
  });

  useEffect(() => {
    if (!isNew) fetchCaseStudy();
  }, [id]);

  async function fetchCaseStudy() {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      toast.error("Failed to load case study");
      router.push("/admin/case-studies");
      return;
    }
    const cs = data as CaseStudy;
    const isPreset = INDUSTRIES.includes(cs.industry || "");

    setFormData({
      title: cs.title || "",
      slug: cs.slug || "",
      client: cs.client || "",
      industry: isPreset ? cs.industry || "" : "Other",
      custom_industry: isPreset ? "" : cs.industry || "",
      challenge: cs.challenge || "",
      solution: cs.solution || "",
      results: cs.results || "",
      cover_image: cs.cover_image || "",
      gallery: cs.gallery || [],
      testimonial: cs.testimonial || "",
      testimonial_author: cs.testimonial_author || "",
      published: cs.published || false,
      featured: cs.featured || false,
    });

    setServiceTags(cs.service_tags || []);
    setGalleryInput((cs.gallery || []).join("\n"));

    // Parse metrics from object to array
    const metricsObj = cs.metrics || {};
    setMetrics(
      Object.entries(metricsObj).map(([label, value]) => ({
        label,
        value: String(value),
      })),
    );

    setSlugManual(true);
    setLoading(false);
  }

  function handleTitleChange(title: string) {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugManual ? prev.slug : slugify(title),
    }));
  }

  function handleGalleryChange(val: string) {
    setGalleryInput(val);
    const urls = val
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, gallery: urls }));
  }

  function addServiceTag(tag: string) {
    const t = tag.trim();
    if (!t || serviceTags.includes(t)) return;
    setServiceTags((prev) => [...prev, t]);
    setServiceTagInput("");
  }

  function removeServiceTag(tag: string) {
    setServiceTags((prev) => prev.filter((t) => t !== tag));
  }

  // Metrics management
  function addMetric() {
    setMetrics((prev) => [...prev, { label: "", value: "" }]);
  }

  function updateMetric(index: number, field: "label" | "value", val: string) {
    setMetrics((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: val } : m)),
    );
  }

  function removeMetric(index: number) {
    setMetrics((prev) => prev.filter((_, i) => i !== index));
  }

  function metricsToJSON(): string {
    const obj: Record<string, string> = {};
    metrics.forEach(({ label, value }) => {
      if (label.trim()) obj[label.trim()] = value.trim();
    });
    return JSON.stringify(obj);
  }

  const resolvedIndustry =
    formData.industry === "Other" && formData.custom_industry
      ? formData.custom_industry
      : formData.industry;

  async function handleSubmit(e: React.FormEvent, publishNow?: boolean) {
    e.preventDefault();
    setSaving(true);
    setFieldErrors({});

    const publishedFlag =
      publishNow !== undefined ? publishNow : formData.published;

    const csData = {
      title: formData.title,
      slug: formData.slug || slugify(formData.title),
      client: formData.client,
      industry: resolvedIndustry,
      challenge: formData.challenge,
      solution: formData.solution,
      results: formData.results,
      cover_image: formData.cover_image,
      gallery: formData.gallery,
      testimonial: formData.testimonial,
      testimonial_author: formData.testimonial_author,
      published: publishedFlag,
      featured: formData.featured,
      service_tags: serviceTags,
      metrics: metricsToJSON(),
    };

    try {
      let result;
      if (isNew) {
        result = await createCaseStudy(csData as any);
      } else {
        result = await updateCaseStudy(id, csData as any);
      }

      if (result.success) {
        toast.success(
          isNew
            ? publishNow
              ? "Case study published!"
              : "Saved as draft"
            : publishNow
              ? "Published!"
              : "Changes saved",
        );
        router.push("/admin/case-studies");
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
      console.error("Error saving case study:", err);
      toast.error("An unexpected error occurred");
    }
    setSaving(false);
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
          <Link href="/admin/case-studies">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            {isNew ? "New Case Study" : "Edit Case Study"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isNew
              ? "Create a new client success story"
              : `Editing: ${formData.title}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={saving}
            onClick={(e) => handleSubmit(e as any, false)}
          >
            Save Draft
          </Button>
          <Button
            disabled={saving}
            onClick={(e) => handleSubmit(e as any, true)}
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Publish
          </Button>
        </div>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* ——— Left main ——— */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. 75% Revenue Growth for Acme Corp"
                    required
                  />
                  {fieldErrors.title && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.title[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">
                    URL Slug *
                    <span className="text-muted-foreground font-normal ml-1 text-xs">
                      (auto-generated)
                    </span>
                  </Label>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground text-sm shrink-0">
                      /case-studies/
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
                      placeholder="acme-corp-revenue-growth"
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
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name *</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        client: e.target.value,
                      }))
                    }
                    placeholder="e.g. Acme Corporation"
                    required
                  />
                  {fieldErrors.client && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.client[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Industry / Category *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, industry: v }))
                    }
                  >
                    <SelectTrigger>
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
                  {formData.industry === "Other" && (
                    <Input
                      value={formData.custom_industry}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          custom_industry: e.target.value,
                        }))
                      }
                      placeholder="Type custom industry name"
                      className="mt-2"
                    />
                  )}
                  {fieldErrors.industry && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.industry[0]}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Story */}
          <Card>
            <CardHeader>
              <CardTitle>The Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="challenge">The Challenge *</Label>
                <Textarea
                  id="challenge"
                  value={formData.challenge}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      challenge: e.target.value,
                    }))
                  }
                  placeholder="What problem was the client facing? What obstacles stood in their way?"
                  rows={5}
                />
                {fieldErrors.challenge && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.challenge[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Our Solution *</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      solution: e.target.value,
                    }))
                  }
                  placeholder="What strategies and tactics did you deploy? How did you solve it?"
                  rows={5}
                />
                {fieldErrors.solution && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.solution[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="results">Results *</Label>
                <Textarea
                  id="results"
                  value={formData.results}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      results: e.target.value,
                    }))
                  }
                  placeholder="Describe the qualitative outcomes and the story of transformation…"
                  rows={5}
                />
                {fieldErrors.results && (
                  <p className="text-xs text-destructive">
                    {fieldErrors.results[0]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stat Callouts / Metrics */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" />
                    Results & Metrics
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add stat callouts like "+75% YoY Revenue" to display
                    prominently on the case study page
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMetric}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Stat
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {metrics.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                  <BarChart2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No stats added yet.</p>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="mt-1"
                    onClick={addMetric}
                  >
                    Add your first stat callout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <Input
                          value={metric.value}
                          onChange={(e) =>
                            updateMetric(i, "value", e.target.value)
                          }
                          placeholder="+75% YoY"
                          className="font-bold text-lg text-primary"
                        />
                        <Input
                          value={metric.label}
                          onChange={(e) =>
                            updateMetric(i, "label", e.target.value)
                          }
                          placeholder="Revenue Growth"
                          className="text-muted-foreground"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMetric(i)}
                        className="shrink-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {/* Preview */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                      Preview
                    </p>
                    <div
                      className={`grid gap-4 ${metrics.length <= 2 ? "grid-cols-2" : "grid-cols-3"}`}
                    >
                      {metrics
                        .filter((m) => m.value || m.label)
                        .map((m, i) => (
                          <div
                            key={i}
                            className="text-center rounded-xl bg-muted/50 p-4"
                          >
                            <div className="text-2xl font-black text-primary">
                              {m.value || "—"}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {m.label || "Label"}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Testimonial */}
          <Card>
            <CardHeader>
              <CardTitle>Client Testimonial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testimonial">Quote</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testimonial: e.target.value,
                    }))
                  }
                  placeholder="What did the client say about the results?"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial_author">Author</Label>
                <Input
                  id="testimonial_author"
                  value={formData.testimonial_author}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      testimonial_author: e.target.value,
                    }))
                  }
                  placeholder="e.g. Jane Doe, CEO · Acme Corp"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ——— Right sidebar ——— */}
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
                    setFormData((prev) => ({ ...prev, published: v }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="featured"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Star className="h-4 w-4 text-amber-500" />
                  Featured
                </Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(v) =>
                    setFormData((prev) => ({ ...prev, featured: v }))
                  }
                />
              </div>
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

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="cover_image">Image URL</Label>
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
              {formData.cover_image && (
                <div className="relative overflow-hidden rounded-lg aspect-video bg-muted">
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
            </CardContent>
          </Card>

          {/* Service Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Service Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {SERVICE_TAG_OPTIONS.map((tag) => {
                  const active = serviceTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        active ? removeServiceTag(tag) : addServiceTag(tag)
                      }
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border text-muted-foreground hover:border-primary hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              {/* Custom tag input */}
              <div className="flex gap-2">
                <Input
                  value={serviceTagInput}
                  onChange={(e) => setServiceTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addServiceTag(serviceTagInput);
                    }
                  }}
                  placeholder="Custom service tag…"
                  className="text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => addServiceTag(serviceTagInput)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {/* Selected */}
              {serviceTags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {serviceTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer gap-1 pr-1"
                      onClick={() => removeServiceTag(tag)}
                    >
                      {tag}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="gallery">Image URLs (one per line)</Label>
              <Textarea
                id="gallery"
                value={galleryInput}
                onChange={(e) => handleGalleryChange(e.target.value)}
                placeholder={
                  "https://example.com/img1.jpg\nhttps://example.com/img2.jpg"
                }
                rows={5}
                className="font-mono text-xs"
              />
              <p className="text-xs text-muted-foreground">One URL per line</p>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
