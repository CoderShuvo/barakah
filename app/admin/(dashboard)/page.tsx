import Link from "next/link";
import {
  FileText,
  FolderKanban,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const { getAuthorizedSupabase } = await import("@/lib/supabase/server");
  const supabase =
    (await getAuthorizedSupabase("admin")) || (await createClient());

  const [blogsResult, caseStudiesResult, leadsResult] = await Promise.all([
    supabase.from("blogs").select("id", { count: "exact", head: true }),
    supabase.from("case_studies").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  return {
    blogs: blogsResult.count || 0,
    caseStudies: caseStudiesResult.count || 0,
    newLeads: leadsResult.count || 0,
  };
}

async function getRecentLeads() {
  const { getAuthorizedSupabase } = await import("@/lib/supabase/server");
  const supabase =
    (await getAuthorizedSupabase("admin")) || (await createClient());
  const { data } = await supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return data || [];
}

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const recentLeads = await getRecentLeads();

  const statCards = [
    {
      title: "Total Blogs",
      value: stats.blogs,
      icon: FileText,
      href: "/admin/blogs",
    },
    {
      title: "Case Studies",
      value: stats.caseStudies,
      icon: FolderKanban,
      href: "/admin/case-studies",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: Users,
      href: "/admin/leads",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Barakah Agency admin dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <Link
                href={stat.href}
                className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2"
              >
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/admin/blogs/new">New Blog Post</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/case-studies/new">New Case Study</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads yet.</p>
            ) : (
              <ul className="space-y-3">
                {recentLeads.slice(0, 3).map((lead) => (
                  <li
                    key={lead.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {lead.email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === "new"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {recentLeads.length > 0 && (
              <Button asChild variant="ghost" className="w-full mt-4">
                <Link href="/admin/leads">View All Leads</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
