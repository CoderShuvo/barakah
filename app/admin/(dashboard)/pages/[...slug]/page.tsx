"use client";

import { use } from "react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { getPageAdmin, updatePageAdmin } from "@/server/page-actions";
import { toast } from "sonner";
import type { PageContent } from "@/types";

const AVAILABLE_SECTIONS = [
  { id: "hero", label: "Hero Section" },
  { id: "content", label: "Main Content Block" },
  { id: "cta", label: "Call to Action Block" },
];

export default function PageEditorPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.join("/");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<PageContent>>({
    hero_headline: "",
    hero_subheadline: "",
    content: "",
    cta_text: "",
    cta_link: "",
    featured_image: "",
    meta_title: "",
    meta_description: "",
    visible_sections: ["hero", "content", "cta"],
    published: true,
  });

  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    fetchPage();
  }, [slug]);

  async function fetchPage() {
    const result = await getPageAdmin(slug);

    if (result.error || !result.data) {
      console.error("Error fetching page:", result.error);
      toast.error("Failed to load page content.");
      router.push("/admin/pages");
    } else {
      const data = result.data;
      setPageTitle(data.title);
      setFormData({
        hero_headline: data.hero_headline || "",
        hero_subheadline: data.hero_subheadline || "",
        content: data.content || "",
        cta_text: data.cta_text || "",
        cta_link: data.cta_link || "",
        featured_image: data.featured_image || "",
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        visible_sections: Array.isArray(data.visible_sections)
          ? data.visible_sections
          : ["hero", "content", "cta"],
        published: data.published ?? true,
      });
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const result = await updatePageAdmin(slug, formData);
      if (result.success) {
        toast.success("Page content updated successfully");
        router.push("/admin/pages");
      } else {
        toast.error(result.error || "Failed to update page");
      }
    } catch (err) {
      console.error("Error saving page:", err);
      toast.error("An unexpected error occurred");
    }
    setSaving(false);
  }

  const toggleSection = (sectionId: string, isChecked: boolean) => {
    setFormData((prev) => {
      const current = prev.visible_sections || [];
      const newSections = isChecked
        ? [...current, sectionId]
        : current.filter((id: string) => id !== sectionId);
      return { ...prev, visible_sections: newSections };
    });
  };

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
          <Link href="/admin/pages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Edit Page Content
          </h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            Editing: {pageTitle} (/{slug === "home" ? "" : slug})
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_headline">Headline</Label>
                  <Input
                    id="hero_headline"
                    value={formData.hero_headline || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hero_headline: e.target.value,
                      }))
                    }
                    placeholder="Enter main headline"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_subheadline">Subheadline</Label>
                  <Textarea
                    id="hero_subheadline"
                    value={formData.hero_subheadline || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hero_subheadline: e.target.value,
                      }))
                    }
                    placeholder="Enter subheadline or short description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Block (Rich Text)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <RichTextEditor
                    content={
                      typeof formData.content === "string"
                        ? formData.content
                        : ""
                    }
                    onChange={(content) =>
                      setFormData((prev) => ({ ...prev, content }))
                    }
                    placeholder="Write section content here..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Call To Action (CTA)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cta_text">Button Text</Label>
                    <Input
                      id="cta_text"
                      value={formData.cta_text || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          cta_text: e.target.value,
                        }))
                      }
                      placeholder="e.g. Work With Us"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cta_link">Button Link</Label>
                    <Input
                      id="cta_link"
                      value={formData.cta_link || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          cta_link: e.target.value,
                        }))
                      }
                      placeholder="e.g. /contact"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visibility settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b">
                  <Label htmlFor="published" className="font-bold">
                    Full Page Published
                  </Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, published: checked }))
                    }
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-muted-foreground font-semibold">
                    Toggles (Show/Hide block)
                  </Label>
                  {AVAILABLE_SECTIONS.map((section) => (
                    <div
                      key={section.id}
                      className="flex items-center justify-between"
                    >
                      <Label
                        htmlFor={`section-${section.id}`}
                        className="cursor-pointer"
                      >
                        {section.label}
                      </Label>
                      <Switch
                        id={`section-${section.id}`}
                        checked={(formData.visible_sections || []).includes(
                          section.id,
                        )}
                        onCheckedChange={(checked) =>
                          toggleSection(section.id, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button type="submit" className="w-full mt-4" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media & Meta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    value={formData.featured_image || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        featured_image: e.target.value,
                      }))
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for preview and OG image.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Meta Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title || ""}
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
                    value={formData.meta_description || ""}
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
