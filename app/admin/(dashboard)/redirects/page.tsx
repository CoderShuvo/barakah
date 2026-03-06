"use client";

import { useState, useEffect } from "react";
import {
  getRedirects,
  createRedirect,
  updateRedirect,
  deleteRedirect,
} from "@/server/redirect-actions";
import type { Redirect } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, ArrowRight, Trash2, Edit } from "lucide-react";

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    permanent: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await getRedirects();
    if (!error && data) {
      setRedirects(data as Redirect[]);
    } else {
      toast.error("Failed to load redirects");
    }
    setLoading(false);
  }

  function handleOpenNew() {
    setEditId(null);
    setFormData({ source: "/", destination: "/", permanent: true });
    setOpen(true);
  }

  function handleOpenEdit(r: Redirect) {
    setEditId(r.id);
    setFormData({
      source: r.source,
      destination: r.destination,
      permanent: r.permanent,
    });
    setOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    if (editId) {
      const res = await updateRedirect(editId, formData);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Redirect updated");
        setOpen(false);
        fetchData();
      }
    } else {
      const res = await createRedirect(formData);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Redirect created");
        setOpen(false);
        fetchData();
      }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this redirect rule?")) return;
    const res = await deleteRedirect(id);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Redirect deleted");
      fetchData();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Redirects Manager
          </h1>
          <p className="text-muted-foreground">
            Manage your 301 and 302 URL redirects safely.
          </p>
        </div>
        <Button onClick={handleOpenNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Redirect
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Redirect" : "Create Redirect"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Source Path</Label>
              <Input
                value={formData.source}
                onChange={(e) =>
                  setFormData({ ...formData, source: e.target.value })
                }
                placeholder="/old-page"
              />
              <p className="text-[10px] text-muted-foreground">
                Must start with a forward slash (/).
              </p>
            </div>
            <div className="space-y-2">
              <Label>Destination Path or URL</Label>
              <Input
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                placeholder="/new-page or https://..."
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label>Redirect Type</Label>
                <p className="text-[10px] text-muted-foreground">
                  {formData.permanent
                    ? "301 Permanent (SEO Friendly)"
                    : "302 Temporary"}
                </p>
              </div>
              <Switch
                checked={formData.permanent}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, permanent: checked })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
              Redirect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : redirects.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-card text-muted-foreground">
          <ArrowRight className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No redirects found.</p>
          <Button variant="link" onClick={handleOpenNew}>
            Create your first redirect
          </Button>
        </div>
      ) : (
        <div className="bg-card border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Path</TableHead>
                <TableHead className="w-10 text-center"></TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {redirects.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-sm">
                    {r.source}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {r.destination}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${r.permanent ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}
                    >
                      {r.permanent ? "301 Permanent" : "302 Temporary"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(r)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(r.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
