"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Eye,
  Trash2,
  Mail,
  Phone,
  Building2,
  Download,
  Search,
  Filter,
  Inbox,
  DollarSign,
  Globe,
  Briefcase,
  CalendarDays,
  User,
} from "lucide-react";
import type { ContactLead } from "@/types";
import { toast } from "sonner";

type LeadStatus = "new" | "contacted" | "qualified" | "closed";
type StatusAll = "all" | LeadStatus;

const STATUS_CONFIG: Record<
  LeadStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
    color: string;
  }
> = {
  new: { label: "New", variant: "default", color: "bg-blue-500" },
  contacted: {
    label: "Contacted",
    variant: "secondary",
    color: "bg-amber-500",
  },
  qualified: { label: "Qualified", variant: "outline", color: "bg-green-500" },
  closed: { label: "Closed", variant: "destructive", color: "bg-gray-400" },
};

// --- CSV Export helper ---
function exportToCSV(leads: ContactLead[]) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Company",
    "Service Interest",
    "Budget",
    "Source",
    "Status",
    "Message",
    "Date",
  ];
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.phone || "",
    l.company || "",
    l.service || "",
    l.budget || "",
    l.source || "",
    l.status,
    `"${(l.message || "").replace(/"/g, '""')}"`,
    new Date(l.created_at).toLocaleDateString(),
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Stat Card ---
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {color && (
            <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
          )}
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

// --- StatusBadge ---
function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

// --- Lead Detail Modal Content ---
function LeadDetailContent({ lead }: { lead: ContactLead }) {
  const fields = [
    { icon: <User className="h-4 w-4" />, label: "Name", value: lead.name },
    { icon: <Mail className="h-4 w-4" />, label: "Email", value: lead.email },
    { icon: <Phone className="h-4 w-4" />, label: "Phone", value: lead.phone },
    {
      icon: <Building2 className="h-4 w-4" />,
      label: "Company",
      value: lead.company,
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      label: "Service Interest",
      value: lead.service,
    },
    {
      icon: <DollarSign className="h-4 w-4" />,
      label: "Budget",
      value: lead.budget,
    },
    {
      icon: <Globe className="h-4 w-4" />,
      label: "Source",
      value: lead.source,
    },
    {
      icon: <CalendarDays className="h-4 w-4" />,
      label: "Submitted",
      value: new Date(lead.created_at).toLocaleString(),
    },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {fields.map(({ icon, label, value }) =>
          value ? (
            <div key={label} className="space-y-0.5">
              <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                {icon} {label}
              </div>
              <div className="text-sm font-medium">{value}</div>
            </div>
          ) : null,
        )}
      </div>
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-muted-foreground">
          Message
        </div>
        <div className="whitespace-pre-wrap rounded-lg bg-muted/60 p-4 text-sm leading-relaxed">
          {lead.message}
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusAll>("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all"); // all | today | week | month
  const [search, setSearch] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load leads");
    } else {
      setLeads((data || []) as ContactLead[]);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("contact_leads")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
      setLeads((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: status as LeadStatus } : l,
        ),
      );
    }
  }

  async function deleteLead(id: string) {
    const { error } = await supabase
      .from("contact_leads")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Failed to delete lead");
    } else {
      toast.success("Lead deleted");
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  }

  // Unique service types from data
  const serviceOptions = useMemo(() => {
    const all = leads.map((l) => l.service).filter(Boolean) as string[];
    return [...new Set(all)].sort();
  }, [leads]);

  // Filtered leads
  const filtered = useMemo(() => {
    const now = new Date();
    return leads.filter((l) => {
      // Status
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      // Service
      if (serviceFilter !== "all" && l.service !== serviceFilter) return false;
      // Date
      if (dateFilter !== "all") {
        const created = new Date(l.created_at);
        if (dateFilter === "today") {
          if (created.toDateString() !== now.toDateString()) return false;
        } else if (dateFilter === "week") {
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          if (created < weekAgo) return false;
        } else if (dateFilter === "month") {
          const monthAgo = new Date(now);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          if (created < monthAgo) return false;
        }
      }
      // Search
      if (search) {
        const q = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.company || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [leads, statusFilter, serviceFilter, dateFilter, search]);

  const stats = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      qualified: leads.filter((l) => l.status === "qualified").length,
      closed: leads.filter((l) => l.status === "closed").length,
    }),
    [leads],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Inbox className="h-7 w-7" />
            Leads
            {stats.new > 0 && (
              <Badge className="text-xs">{stats.new} new</Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Contact form submissions and inquiries
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => exportToCSV(filtered)}
          disabled={filtered.length === 0}
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV ({filtered.length})
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="New" value={stats.new} color="bg-blue-500" />
        <StatCard
          label="Contacted"
          value={stats.contacted}
          color="bg-amber-500"
        />
        <StatCard
          label="Qualified"
          value={stats.qualified}
          color="bg-green-500"
        />
        <StatCard label="Closed" value={stats.closed} color="bg-gray-400" />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search name, email or company…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v as StatusAll)}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Service */}
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {serviceOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset */}
            {(statusFilter !== "all" ||
              serviceFilter !== "all" ||
              dateFilter !== "all" ||
              search) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStatusFilter("all");
                  setServiceFilter("all");
                  setDateFilter("all");
                  setSearch("");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            {filtered.length} {filtered.length === 1 ? "Lead" : "Leads"}
            {(statusFilter !== "all" ||
              serviceFilter !== "all" ||
              dateFilter !== "all" ||
              search) && (
              <span className="text-muted-foreground font-normal text-sm ml-1">
                (filtered)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <Inbox className="h-10 w-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No leads found matching your filters.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="space-y-0.5">
                        <div className="font-medium">{lead.name}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {lead.phone}
                          </div>
                        )}
                        {lead.company && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Building2 className="h-3 w-3" />
                            {lead.company}
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      {lead.service ? (
                        <Badge
                          variant="secondary"
                          className="text-xs max-w-[120px] truncate"
                        >
                          {lead.service}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {lead.budget || "—"}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground max-w-[100px] truncate">
                      {lead.source || "—"}
                    </TableCell>

                    <TableCell>
                      <Select
                        value={lead.status}
                        onValueChange={(value) => updateStatus(lead.id, value)}
                      >
                        <SelectTrigger className="w-32 h-8">
                          <SelectValue>
                            <StatusBadge status={lead.status} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-blue-500" />
                              New
                            </span>
                          </SelectItem>
                          <SelectItem value="contacted">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-amber-500" />
                              Contacted
                            </span>
                          </SelectItem>
                          <SelectItem value="qualified">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-green-500" />
                              Qualified
                            </span>
                          </SelectItem>
                          <SelectItem value="closed">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-gray-400" />
                              Closed
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View Detail */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="View full details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Lead: {lead.name}</DialogTitle>
                              <DialogDescription>
                                Submitted{" "}
                                {new Date(lead.created_at).toLocaleString()}
                              </DialogDescription>
                            </DialogHeader>
                            <LeadDetailContent lead={lead} />
                          </DialogContent>
                        </Dialog>

                        {/* Reply via email */}
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Reply via email"
                          asChild
                        >
                          <a
                            href={`mailto:${lead.email}?subject=Re: Your Barakah Agency Inquiry`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
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
                              <AlertDialogTitle>Delete Lead</AlertDialogTitle>
                              <AlertDialogDescription>
                                Permanently delete the lead from{" "}
                                <strong>{lead.name}</strong>? This cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteLead(lead.id)}
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
