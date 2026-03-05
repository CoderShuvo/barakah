"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  Settings,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Case Studies", href: "/admin/case-studies", icon: FolderKanban },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  role: "admin" | "editor";
}

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();

  const filteredNavigation = navigation.filter((item) => {
    if (role === "editor") {
      // Editor cannot see Leads, Analytics, or Settings
      const restricted = ["Leads", "Analytics", "Settings"];
      return !restricted.includes(item.name);
    }
    return true;
  });

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Link
            href="/admin"
            className="font-serif text-xl font-bold text-foreground"
          >
            <span className="text-primary">Barakah</span> Admin
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-1">
            {filteredNavigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* View Site Link */}
          <div className="mt-auto pt-4 border-t border-border">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              View Site
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
