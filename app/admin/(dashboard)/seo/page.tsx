"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getSiteSettings,
  updateSiteSettings,
  updateItemSEO,
} from "@/server/seo-actions";
import { getPagesAdmin } from "@/server/page-actions";
import { getBlogsAdmin, getCaseStudiesAdmin } from "@/server/actions";
import { ImagePicker } from "@/components/admin/image-picker";
import { toast } from "sonner";
import Link from "next/link";
import {
  Loader2,
  Save,
  Globe,
  Search,
  Layout,
  FileText,
  Briefcase,
  Settings2,
  ExternalLink,
  BarChart3,
  FileCode,
} from "lucide-react";
import type { SiteSettings, PageContent, Blog, CaseStudy } from "@/types";

export default function SEOManagementPage() {
  const [loading, setLoading] = useState(true);
  const [savingGlobal, setSavingGlobal] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<SiteSettings | null>(
    null,
  );

  // Per-page state
  const [pages, setPages] = useState<PageContent[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [settingsRes, pagesRes, blogsRes, csRes] = await Promise.all([
        getSiteSettings(),
        getPagesAdmin(),
        getBlogsAdmin({ page: 1, pageSize: 100 }),
        getCaseStudiesAdmin(),
      ]);

      setGlobalSettings(settingsRes.data);
      setPages(pagesRes.data as PageContent[]);
      setBlogs(blogsRes.data as Blog[]);
      setCaseStudies(csRes.data as CaseStudy[]);
    } catch (err) {
      toast.error("Failed to load SEO data");
    }
    setLoading(false);
  }

  async function handleGlobalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!globalSettings) return;
    setSavingGlobal(true);
    const result = await updateSiteSettings(globalSettings);
    if (result.success) {
      toast.success("Global SEO settings updated");
    } else {
      toast.error("Failed to update global settings");
    }
    setSavingGlobal(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">SEO Management</h1>
        <p className="text-muted-foreground">
          Manage global site optimization and per-page meta data
        </p>
      </div>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="global">Global Settings</TabsTrigger>
          <TabsTrigger value="pages">Per-Page SEO</TabsTrigger>
        </TabsList>

        {/* Global Settings */}
        <TabsContent value="global" className="space-y-6 mt-6">
          <form onSubmit={handleGlobalSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analytics & Verification
                    </CardTitle>
                    <CardDescription>
                      Integrate Google tools for tracking and indexing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ga_id">Google Analytics ID (GA4)</Label>
                      <Input
                        id="ga_id"
                        placeholder="G-XXXXXXXXXX"
                        value={globalSettings?.google_analytics_id || ""}
                        onChange={(e) =>
                          setGlobalSettings((prev) =>
                            prev
                              ? { ...prev, google_analytics_id: e.target.value }
                              : null,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gsc_id">
                        Google Search Console Verification ID
                      </Label>
                      <Input
                        id="gsc_id"
                        placeholder="Verification token"
                        value={globalSettings?.google_search_console_id || ""}
                        onChange={(e) =>
                          setGlobalSettings((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  google_search_console_id: e.target.value,
                                }
                              : null,
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCode className="h-5 w-5" />
                      Robots.txt
                    </CardTitle>
                    <CardDescription>
                      Control how search engines crawl your site
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="robots">Robots.txt Content</Label>
                      <Textarea
                        id="robots"
                        className="font-mono text-sm h-[120px]"
                        value={globalSettings?.robots_txt || ""}
                        onChange={(e) =>
                          setGlobalSettings((prev) =>
                            prev
                              ? { ...prev, robots_txt: e.target.value }
                              : null,
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Default OpenGraph
                    </CardTitle>
                    <CardDescription>
                      Site-wide sharing defaults
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="site_name">Site Name</Label>
                      <Input
                        id="site_name"
                        value={globalSettings?.site_name || ""}
                        onChange={(e) =>
                          setGlobalSettings((prev) =>
                            prev
                              ? { ...prev, site_name: e.target.value }
                              : null,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="og_image">Default OG Image URL</Label>
                      <ImagePicker
                        id="og_image"
                        url={globalSettings?.default_og_image || ""}
                        onUrlChange={(url: string) =>
                          setGlobalSettings((prev) =>
                            prev ? { ...prev, default_og_image: url } : null,
                          )
                        }
                      />
                    </div>
                    {globalSettings?.default_og_image && (
                      <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                        <img
                          src={globalSettings.default_og_image}
                          alt="OG Preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-end pt-4">
                  <Button type="submit" size="lg" disabled={savingGlobal}>
                    {savingGlobal ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Global Settings
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </TabsContent>

        {/* Per-Page SEO */}
        <TabsContent value="pages" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Page SEO Dashboard</CardTitle>
                <CardDescription>
                  Optimize individual pages, blogs, and case studies
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter pages..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                {/* Unified Item List */}
                <SEOItemList
                  search={search}
                  pages={pages}
                  blogs={blogs}
                  caseStudies={caseStudies}
                  refresh={fetchData}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SEOItemList({
  search,
  pages,
  blogs,
  caseStudies,
  refresh,
}: {
  search: string;
  pages: PageContent[];
  blogs: Blog[];
  caseStudies: CaseStudy[];
  refresh: () => void;
}) {
  const combined = useMemo(() => {
    const p = pages.map((x) => ({
      ...x,
      type: "pages" as const,
      icon: <Layout className="h-4 w-4" />,
    }));
    const b = blogs.map((x) => ({
      ...x,
      type: "blogs" as const,
      icon: <FileText className="h-4 w-4" />,
    }));
    const c = caseStudies.map((x) => ({
      ...x,
      type: "case_studies" as const,
      icon: <Briefcase className="h-4 w-4" />,
    }));
    const all = [...p, ...b, ...c];
    if (!search) return all;
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.slug.toLowerCase().includes(search.toLowerCase()),
    );
  }, [pages, blogs, caseStudies, search]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[2fr,1fr,120px] bg-muted/50 py-3 px-4 text-sm font-semibold border-b">
        <div>Page Title & Slug</div>
        <div>SEO Status</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="divide-y overflow-y-auto max-h-[600px]">
        {combined.map((item) => (
          <SEOItemRow
            key={`${item.type}-${item.id}`}
            item={item}
            refresh={refresh}
          />
        ))}
        {combined.length === 0 && (
          <div className="py-12 text-center text-muted-foreground italic">
            No items found
          </div>
        )}
      </div>
    </div>
  );
}

function SEOItemRow({ item, refresh }: { item: any; refresh: () => void }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    meta_title: item.meta_title || "",
    meta_description: item.meta_description || "",
    og_title: item.og_title || "",
    og_description: item.og_description || "",
    og_image: item.og_image || "",
    canonical_url: item.canonical_url || "",
    no_index: item.no_index || false,
  });

  // Basic SEO score calculation
  const hasMetaTitle = !!data.meta_title;
  const hasMetaDesc = !!data.meta_description;
  const metaTitleLen = data.meta_title?.length || 0;
  const metaDescLen = data.meta_description?.length || 0;

  const isTitleGood = metaTitleLen >= 30 && metaTitleLen <= 65;
  const isDescGood = metaDescLen >= 120 && metaDescLen <= 165;

  async function handleSave() {
    setSaving(true);
    const result = await updateItemSEO(
      item.type,
      item.type === "pages" ? item.slug : item.id,
      data,
    );
    if (result.success) {
      toast.success(`SEO updated for ${item.title}`);
      setOpen(false);
      refresh();
    } else {
      toast.error("Failed to update SEO");
    }
    setSaving(false);
  }

  return (
    <div className="grid grid-cols-[2fr,1fr,120px] py-4 px-4 items-center bg-background hover:bg-muted/30 transition-colors">
      <div className="space-y-1">
        <div className="flex items-center gap-2 font-medium">
          {item.icon}
          {item.title}
          {item.no_index && (
            <Badge variant="destructive" className="h-5 text-[10px]">
              No-Index
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground font-mono flex items-center gap-1">
          /
          {item.type === "pages" && item.slug === "home"
            ? ""
            : item.type.replace("_", "-") + "/" + item.slug}
          <Link
            href={
              item.type === "pages"
                ? `/${item.slug === "home" ? "" : item.slug}`
                : `/${item.type.replace("_", "-")}/${item.slug}`
            }
            target="_blank"
          >
            <ExternalLink className="h-3 w-3 hover:text-primary cursor-pointer ml-1" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge
          variant={
            hasMetaTitle ? (isTitleGood ? "default" : "secondary") : "outline"
          }
          className="text-[10px]"
        >
          Title {hasMetaTitle ? (isTitleGood ? "✓" : "!") : "✗"}
        </Badge>
        <Badge
          variant={
            hasMetaDesc ? (isDescGood ? "default" : "secondary") : "outline"
          }
          className="text-[10px]"
        >
          Desc {hasMetaDesc ? (isDescGood ? "✓" : "!") : "✗"}
        </Badge>
      </div>

      <div className="text-right">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              Edit SEO
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                SEO: {item.title}
              </DialogTitle>
              <DialogDescription>
                Optimize how this page appears in search results and social
                shares
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Google Preview */}
              <div className="bg-[#f8f9fa] border rounded-lg p-4 space-y-1">
                <div className="text-[12px] text-[#202124] font-arial mb-1">
                  /{item.slug}
                </div>
                <div className="text-[20px] text-[#1a0dab] font-arial hover:underline cursor-pointer leading-tight">
                  {data.meta_title || item.title}
                </div>
                <div className="text-[14px] text-[#4d5156] font-arial line-clamp-2">
                  {data.meta_description ||
                    "Add a meta description to see how it appears in search results..."}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex justify-between">
                      Meta Title
                      <span
                        className={`text-[10px] ${isTitleGood ? "text-green-500" : "text-amber-500"}`}
                      >
                        {metaTitleLen} / 60
                      </span>
                    </Label>
                    <Input
                      value={data.meta_title}
                      onChange={(e) =>
                        setData({ ...data, meta_title: e.target.value })
                      }
                      placeholder="Better than page title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex justify-between">
                      Meta Description
                      <span
                        className={`text-[10px] ${isDescGood ? "text-green-500" : "text-amber-500"}`}
                      >
                        {metaDescLen} / 160
                      </span>
                    </Label>
                    <Textarea
                      value={data.meta_description}
                      onChange={(e) =>
                        setData({ ...data, meta_description: e.target.value })
                      }
                      rows={3}
                      placeholder="Compelling call to action for searchers"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Canonical URL</Label>
                    <Input
                      value={data.canonical_url}
                      onChange={(e) =>
                        setData({ ...data, canonical_url: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>OpenGraph Title</Label>
                    <Input
                      value={data.og_title}
                      onChange={(e) =>
                        setData({ ...data, og_title: e.target.value })
                      }
                      placeholder="Title for Facebook/X"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OG Image URL</Label>
                    <ImagePicker
                      url={data.og_image}
                      onUrlChange={(url: string) =>
                        setData({ ...data, og_image: url })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label>Search Engine Indexing</Label>
                      <p className="text-[10px] text-muted-foreground">
                        Disable if this is a private or draft page
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium">
                        {data.no_index ? "Blocked" : "Indexable"}
                      </span>
                      <Switch
                        checked={!data.no_index}
                        onCheckedChange={(checked) =>
                          setData({ ...data, no_index: !checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Item SEO
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
