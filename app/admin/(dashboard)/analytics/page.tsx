"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  getAnalyticsData,
  type AnalyticsMetric,
  type TimeSeriesData,
  type TopItem,
} from "@/server/analytics-actions";
import {
  Loader2,
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Globe2,
  Smartphone,
  Monitor,
  Tablet,
  CalendarDays,
  RefreshCw,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const COLORS = ["#E76F3D", "#3F1200", "#5c4033", "#8B4513", "#D2691E"];

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    const result = await getAnalyticsData();
    setData(result);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">
          Fetching Vercel Analytics...
        </p>
      </div>
    );
  }

  const {
    metrics,
    timeSeries,
    topPages,
    topReferrers,
    topDevices,
    topCounties,
  } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Analytics
            </h1>
            <Badge
              variant="outline"
              className="text-[10px] bg-primary/5 text-primary border-primary/20"
            >
              Vercel Analytics
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Monitor your site's performance and visitor Engagement
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden md:flex"
          >
            <Link href="https://vercel.com/dashboard" target="_blank">
              Full Vercel Dashboard <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={refreshing}
            className="hidden md:flex"
          >
            {refreshing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-lg border text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Last 14 days</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Leads (Real Data)"
          value={metrics.leads.value}
          change={metrics.leads.change}
          icon={<Users className="h-4 w-4 text-primary" />}
        />
        <StatCard
          title="Conversion Rate"
          value={metrics.conversion.value}
          change={metrics.conversion.change}
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
        />
        <StatCard
          title="Visitors"
          value={metrics.visitors.value}
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Pageviews"
          value={metrics.pageviews.value}
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Main Chart */}
      <Card className="col-span-4 border-none shadow-sm ring-1 ring-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-8">
          <div>
            <CardTitle>Conversion & Lead Flow</CardTitle>
            <CardDescription>
              Visualizing real lead submissions over the last 14 days
            </CardDescription>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>Real Leads</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E76F3D" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#E76F3D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.1}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #eee",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#E76F3D"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorLeads)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Lead Interests</CardTitle>
                <CardDescription>
                  Service interest areas from real submissions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {topPages.map((page: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-medium truncate">
                      <span className="text-muted-foreground text-[10px] w-4">
                        {idx + 1}
                      </span>
                      <span className="truncate">{page.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {page.count.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-[11px] w-10 text-right">
                        {page.percentage}%
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={page.percentage}
                    className="h-1 bg-primary/10"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Sources</CardTitle>
            <CardDescription>Where your leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topReferrers.map((source: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between group cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                      {source.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{source.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {source.percentage}% of traffic
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold">
                      {source.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographical Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe2 className="h-5 w-5 text-primary" />
                  Geographical Breakdown
                </CardTitle>
                <CardDescription>
                  Active visitors by country and region
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              {topCounties.map((country: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{country.name}</span>
                    </div>
                    <span className="font-semibold">
                      {country.count.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={country.percentage}
                    className="h-1.5 bg-primary/10"
                  />
                </div>
              ))}
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topCounties}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {topCounties.map((_: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Countries</span>
                <span className="text-xl font-bold">{topCounties.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Device Distribution
            </CardTitle>
            <CardDescription>Devices used to access your site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-4">
            <div className="flex items-end justify-around h-32">
              {topDevices.map((device: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 h-full justify-end"
                >
                  <MotionBar
                    height={`${device.percentage}%`}
                    className={idx === 0 ? "bg-primary" : "bg-primary/30"}
                  />
                  <div className="flex flex-col items-center">
                    {device.name === "Mobile" && (
                      <Smartphone className="h-4 w-4" />
                    )}
                    {device.name === "Desktop" && (
                      <Monitor className="h-4 w-4" />
                    )}
                    {device.name === "Tablet" && <Tablet className="h-4 w-4" />}
                    <span className="text-[10px] font-bold mt-1">
                      {device.percentage}%
                    </span>
                    <span className="text-[8px] uppercase tracking-tighter text-muted-foreground">
                      {device.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-8 border-t">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          Powered by Vercel Analytics — Last updated{" "}
          {new Date(data.lastUpdated).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, isNegative = false }: any) {
  const positive = change > 0;

  return (
    <Card className="border-none shadow-sm ring-1 ring-border/50 hover:bg-muted/5 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1 text-xs">
          <div
            className={`flex items-center gap-0.5 ${positive ? (isNegative ? "text-red-500" : "text-green-500") : isNegative ? "text-green-500" : "text-red-500"}`}
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span className="font-semibold">{Math.abs(change)}%</span>
          </div>
          <span className="text-muted-foreground ml-1.5 font-medium">
            vs last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function MotionBar({
  height,
  className,
}: {
  height: string;
  className: string;
}) {
  return (
    <div
      className={`w-8 rounded-t-md transition-all duration-1000 ease-out ${className}`}
      style={{ height }}
    />
  );
}
