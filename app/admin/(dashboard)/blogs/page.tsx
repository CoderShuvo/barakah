"use client";

import { useEffect, useState, useCallback } from "react";
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
  Clock,
  Search,
  ExternalLink,
} from "lucide-react";
import type { Blog } from "@/types";
import { getBlogsAdmin, updateBlog, deleteBlog } from "@/server/actions";
import { toast } from "sonner";

function getBlogStatus(blog: Blog) {
  if (blog.published) return "published";
  if (
    blog.scheduled_publish_at &&
    new Date(blog.scheduled_publish_at) > new Date()
  )
    return "scheduled";
  return "draft";
}

function StatusBadge({ blog }: { blog: Blog }) {
  const status = getBlogStatus(blog);
  if (status === "published") return <Badge>Published</Badge>;
  if (status === "scheduled")
    return (
      <Badge
        variant="outline"
        className="text-amber-600 border-amber-400 bg-amber-50"
      >
        <Clock className="h-3 w-3 mr-1" />
        Scheduled
      </Badge>
    );
  return <Badge variant="outline">Draft</Badge>;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    fetchBlogs();
  }, [page, debouncedSearch]);

  async function fetchBlogs() {
    setLoading(true);
    const result = await getBlogsAdmin({
      page,
      pageSize,
      search: debouncedSearch,
    });
    if (result.error) {
      toast.error("Failed to load blogs");
    } else {
      setBlogs(result.data as Blog[]);
      setTotalCount(result.count);
    }
    setLoading(false);
  }

  async function togglePublish(blog: Blog) {
    const status = getBlogStatus(blog);
    const nowPublished = status !== "published";
    const result = await updateBlog(blog.id, {
      ...blog,
      tags: (blog.tags || []).join(", "),
      scheduled_publish_at: nowPublished ? null : blog.scheduled_publish_at,
      published: nowPublished,
    } as any);

    if (!result.success) {
      toast.error("Failed to update status");
    } else {
      toast.success(nowPublished ? "Blog published!" : "Blog unpublished");
      fetchBlogs();
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteBlog(id);
    if (!result.success) {
      toast.error("Failed to delete blog");
    } else {
      toast.success("Blog deleted");
      fetchBlogs();
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blogs</h1>
          <p className="text-muted-foreground">
            Create, manage and publish blog posts
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <CardTitle>All Posts ({totalCount})</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
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
          ) : blogs.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              {search
                ? `No posts found for "${search}".`
                : "No blog posts yet. Create your first post!"}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => {
                  const status = getBlogStatus(blog);
                  return (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium max-w-[220px] truncate">
                        {blog.title}
                      </TableCell>
                      <TableCell>
                        {blog.category ? (
                          <Badge variant="secondary">{blog.category}</Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {blog.author_name || "—"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge blog={blog} />
                        {status === "scheduled" &&
                          blog.scheduled_publish_at && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(
                                blog.scheduled_publish_at,
                              ).toLocaleString()}
                            </p>
                          )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Preview */}
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Preview"
                            asChild
                          >
                            <Link href={`/admin/blogs/${blog.id}/preview`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          {/* Toggle Live */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => togglePublish(blog)}
                            title={
                              status === "published"
                                ? "Unpublish"
                                : "Publish Now"
                            }
                          >
                            {status === "published" ? (
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
                            <Link href={`/admin/blogs/${blog.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          {/* Delete */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to permanently delete
                                  &quot;{blog.title}&quot;? This cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(blog.id)}
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
                  );
                })}
              </TableBody>
            </Table>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages} &nbsp;·&nbsp; {totalCount} posts
                total
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
