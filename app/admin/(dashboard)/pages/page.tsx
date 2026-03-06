"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Eye, EyeOff } from "lucide-react";
import type { PageContent } from "@/types";
import { getPagesAdmin } from "@/server/page-actions";
import { toast } from "sonner";

export default function AdminPagesOverview() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    setLoading(true);
    const result = await getPagesAdmin();

    if (result.error) {
      console.error("Error fetching pages:", result.error);
      toast.error("Failed to fetch pages");
    } else {
      setPages(result.data as PageContent[]);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pages</h1>
          <p className="text-muted-foreground">
            Edit content on all live pages
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pages ({pages.length})</CardTitle>
          <CardDescription>
            Select a page to edit its static content, hero section, and
            metadata.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : pages.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No pages found. Make sure you have run the database migration.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium text-foreground">
                      {page.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      /{page.slug === "home" ? "" : page.slug}
                    </TableCell>
                    <TableCell>
                      <Badge variant={page.published ? "default" : "outline"}>
                        {page.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(page.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            href={`/${page.slug === "home" ? "" : page.slug}`}
                            target="_blank"
                            title="View Live Page"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          title="Edit Page Content"
                        >
                          <Link href={`/admin/pages/${page.slug}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
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
