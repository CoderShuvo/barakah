"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Search,
} from "lucide-react";
import type { CaseStudy } from "@/types";
import {
  getCaseStudiesAdmin,
  updateCaseStudy,
  deleteCaseStudy,
} from "@/server/actions";
import { toast } from "sonner";

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  async function fetchCaseStudies() {
    setLoading(true);
    const result = await getCaseStudiesAdmin();
    if (result.error) {
      toast.error("Failed to load case studies");
    } else {
      setCaseStudies(result.data as CaseStudy[]);
    }
    setLoading(false);
  }

  async function togglePublish(cs: CaseStudy) {
    const result = await updateCaseStudy(cs.id, {
      ...cs,
      service_tags: cs.service_tags || undefined,
      metrics: JSON.stringify(cs.metrics || {}),
      published: !cs.published,
    } as any);
    if (!result.success) {
      toast.error("Failed to update status");
    } else {
      toast.success(cs.published ? "Unpublished" : "Published");
      fetchCaseStudies();
    }
  }

  async function toggleFeatured(cs: CaseStudy) {
    const result = await updateCaseStudy(cs.id, {
      ...cs,
      service_tags: cs.service_tags || undefined,
      metrics: JSON.stringify(cs.metrics || {}),
      featured: !cs.featured,
    } as any);
    if (!result.success) {
      toast.error("Failed to update featured status");
    } else {
      toast.success(
        cs.featured ? "Removed from featured" : "Added to featured",
      );
      fetchCaseStudies();
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteCaseStudy(id);
    if (!result.success) {
      toast.error("Failed to delete case study");
    } else {
      toast.success("Case study deleted");
      fetchCaseStudies();
    }
  }

  const filtered = caseStudies.filter(
    (cs) =>
      !search ||
      cs.title.toLowerCase().includes(search.toLowerCase()) ||
      cs.client.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Case Studies</h1>
          <p className="text-muted-foreground">
            Showcase your client success stories
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/case-studies/new">
            <Plus className="mr-2 h-4 w-4" />
            New Case Study
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle>All Case Studies ({caseStudies.length})</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or client…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              {search
                ? `No case studies found for "${search}".`
                : "No case studies yet. Create your first one!"}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((cs) => (
                  <TableRow key={cs.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {cs.featured && (
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                        )}
                        <span className="max-w-[180px] truncate">
                          {cs.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {cs.client}
                    </TableCell>
                    <TableCell>
                      {cs.industry ? (
                        <Badge variant="secondary">{cs.industry}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[160px]">
                        {cs.service_tags && cs.service_tags.length > 0 ? (
                          cs.service_tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            —
                          </span>
                        )}
                        {cs.service_tags && cs.service_tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{cs.service_tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={cs.published ? "default" : "outline"}>
                        {cs.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(cs.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Toggle Featured */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFeatured(cs)}
                          title={
                            cs.featured
                              ? "Remove from featured"
                              : "Mark as featured"
                          }
                        >
                          {cs.featured ? (
                            <StarOff className="h-4 w-4" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </Button>
                        {/* Toggle Publish */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => togglePublish(cs)}
                          title={cs.published ? "Unpublish" : "Publish"}
                        >
                          {cs.published ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          title="Edit"
                        >
                          <Link href={`/admin/case-studies/${cs.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        {/* Delete */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" title="Delete">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Case Study
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to permanently delete
                                &quot;{cs.title}&quot;? This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(cs.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
