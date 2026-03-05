import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import Link from "next/link";
import { cookies } from "next/headers";

import { getUserProfile, getAuthorizedSupabase } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUserProfile();
  const authorized = await getAuthorizedSupabase("editor"); // Basic access for dashboard

  if (!profile || !authorized) {
    redirect("/barakah-login");
  }

  // Role check for specific sections could happen in sub-layouts or page components
  const user = {
    email: profile.email,
    role: profile.role,
  } as any;

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar role={user.role} />
      <div className="lg:pl-64">
        <AdminHeader user={user} />
        <main className="p-6 lg:p-8 min-h-[calc(100vh-120px)]">{children}</main>
        <footer className="border-t py-6 px-8 text-center text-sm text-muted-foreground bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
            <p>
              &copy; {new Date().getFullYear()} Barakah Agency Admin. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Website
              </Link>
              <Link
                href="/admin/support"
                className="hover:text-primary transition-colors"
              >
                Support
              </Link>
              <Link
                href="/admin/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
