import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Lock,
  CalendarDays,
  CalendarRange,
  TrendingUp,
  TrendingDown,
  Scissors,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Brush,
  Download,
  FileText,
} from "lucide-react";
import jsPDF from "jspdf";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type MonthData = {
  revenue: number;
  prevRevenue: number;
  weekCount: number;
  monthCount: number;
  busiestDay: string;
  weekly: { day: string; count: number }[];
  topServices: { name: string; count: number; price: number; icon: typeof Scissors; tint: string; iconColor: string }[];
};

const MONTHS: { label: string; data: MonthData }[] = [
  {
    label: "April 2026",
    data: {
      revenue: 142500,
      prevRevenue: 128000,
      weekCount: 23,
      monthCount: 87,
      busiestDay: "Tuesday",
      weekly: [
        { day: "Mon", count: 5 },
        { day: "Tue", count: 7 },
        { day: "Wed", count: 4 },
        { day: "Thu", count: 3 },
        { day: "Fri", count: 6 },
        { day: "Sat", count: 2 },
        { day: "Sun", count: 0 },
      ],
      topServices: [
        { name: "Fade", count: 34, price: 2000, icon: Scissors, tint: "bg-tint-violet", iconColor: "text-primary" },
        { name: "Beard trim", count: 26, price: 1200, icon: Brush, tint: "bg-tint-blue", iconColor: "text-primary" },
        { name: "Line up", count: 18, price: 800, icon: Sparkles, tint: "bg-tint-amber", iconColor: "text-warning" },
      ],
    },
  },
  {
    label: "March 2026",
    data: {
      revenue: 128000,
      prevRevenue: 119500,
      weekCount: 21,
      monthCount: 79,
      busiestDay: "Saturday",
      weekly: [
        { day: "Mon", count: 4 },
        { day: "Tue", count: 5 },
        { day: "Wed", count: 3 },
        { day: "Thu", count: 4 },
        { day: "Fri", count: 5 },
        { day: "Sat", count: 6 },
        { day: "Sun", count: 1 },
      ],
      topServices: [
        { name: "Fade", count: 30, price: 2000, icon: Scissors, tint: "bg-tint-violet", iconColor: "text-primary" },
        { name: "Beard trim", count: 22, price: 1200, icon: Brush, tint: "bg-tint-blue", iconColor: "text-primary" },
        { name: "Line up", count: 15, price: 800, icon: Sparkles, tint: "bg-tint-amber", iconColor: "text-warning" },
      ],
    },
  },
  {
    label: "February 2026",
    data: {
      revenue: 119500,
      prevRevenue: 124000,
      weekCount: 19,
      monthCount: 72,
      busiestDay: "Friday",
      weekly: [
        { day: "Mon", count: 3 },
        { day: "Tue", count: 4 },
        { day: "Wed", count: 3 },
        { day: "Thu", count: 4 },
        { day: "Fri", count: 6 },
        { day: "Sat", count: 5 },
        { day: "Sun", count: 0 },
      ],
      topServices: [
        { name: "Fade", count: 27, price: 2000, icon: Scissors, tint: "bg-tint-violet", iconColor: "text-primary" },
        { name: "Line up", count: 19, price: 800, icon: Sparkles, tint: "bg-tint-amber", iconColor: "text-warning" },
        { name: "Beard trim", count: 16, price: 1200, icon: Brush, tint: "bg-tint-blue", iconColor: "text-primary" },
      ],
    },
  },
];

export function AnalyticsScreen() {
  const [isPro, setIsPro] = useState(false);
  const [monthIdx, setMonthIdx] = useState(0);

  const month = MONTHS[monthIdx];
  const { revenue: currentRevenue, prevRevenue: previousRevenue, weekCount, monthCount, busiestDay, weekly: chartData, topServices } = month.data;
  const topServiceName = topServices[0]?.name ?? "—";
  const totalTopServices = topServices.reduce((sum, s) => sum + s.count, 0);

  const stats = [
    { value: String(weekCount), label: "This week", icon: CalendarDays, tint: "bg-tint-blue", iconColor: "text-primary" },
    { value: String(monthCount), label: "This month", icon: CalendarRange, tint: "bg-accent/60", iconColor: "text-primary" },
    { value: busiestDay, label: "Busiest day", icon: TrendingUp, tint: "bg-tint-amber", iconColor: "text-warning" },
    { value: topServiceName, label: "Top service", icon: Scissors, tint: "bg-tint-violet", iconColor: "text-primary" },
  ];

  const revenueDelta = currentRevenue - previousRevenue;
  const revenuePct = ((revenueDelta / previousRevenue) * 100).toFixed(1);
  const isUp = revenueDelta >= 0;

  const weeklyTotal = chartData.reduce((sum, d) => sum + d.count, 0);

  const formatJMD = (n: number) =>
    new Intl.NumberFormat("en-JM", { style: "currency", currency: "JMD", maximumFractionDigits: 0 }).format(n);

  const topServicesRevenue = topServices.reduce((sum, s) => sum + s.count * s.price, 0);

  const handleExport = () => {
    const lines: string[] = [];
    lines.push(`LinkupOrganiser Analytics — ${month.label}`);
    lines.push("");
    lines.push("Summary");
    lines.push("Metric,Value");
    lines.push(`Revenue (JMD),${currentRevenue}`);
    lines.push(`Previous month revenue (JMD),${previousRevenue}`);
    lines.push(`Change (%),${revenuePct}`);
    lines.push(`Bookings this week,${weekCount}`);
    lines.push(`Bookings this month,${monthCount}`);
    lines.push(`Busiest day,${busiestDay}`);
    lines.push("");
    lines.push("Top services");
    lines.push("Service,Bookings,Price (JMD),Revenue (JMD)");
    topServices.forEach((s) => {
      lines.push(`${s.name},${s.count},${s.price},${s.count * s.price}`);
    });
    lines.push("");
    lines.push("Weekly bookings");
    lines.push("Day,Bookings");
    chartData.forEach((d) => lines.push(`${d.day},${d.count}`));

    const csv = lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkup-analytics-${month.label.toLowerCase().replace(/\s+/g, "-")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-4 animate-fade-up">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Analytics</h1>
          <div className="flex items-center gap-3">
            {isPro && (
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 text-xs text-foreground font-medium px-2.5 py-1.5 rounded-lg border border-border/60 bg-card transition-all duration-150 hover:bg-accent/60 active:scale-95"
                aria-label="Export CSV"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            )}
            <button
              onClick={() => setIsPro(!isPro)}
              className="text-xs text-primary font-medium transition-opacity duration-150 hover:opacity-80"
            >
              {isPro ? "View as Free" : "View as Pro"}
            </button>
          </div>
        </div>
      </div>

      {!isPro ? (
        <div className="px-5 animate-fade-up" style={{ animationDelay: "50ms" }}>
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">Unlock Analytics</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto leading-relaxed">
              See your busiest days, top services, and revenue trends with Pro.
            </p>
            <Button asChild size="default" className="transition-all duration-200 active:scale-[0.97]">
              <Link to="/app/upgrade">Try Pro free for 14 days</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-5 space-y-8 mb-8">
          {/* Month selector */}
          <div
            className="flex items-center justify-between rounded-xl border border-border/60 bg-card px-2 py-1.5 animate-fade-up"
            style={{ animationDelay: "20ms" }}
          >
            <button
              onClick={() => setMonthIdx((i) => Math.min(i + 1, MONTHS.length - 1))}
              disabled={monthIdx >= MONTHS.length - 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground transition-all duration-150 hover:bg-accent/60 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span key={month.label} className="text-sm font-medium text-foreground tabular-nums animate-fade-up">
              {month.label}
            </span>
            <button
              onClick={() => setMonthIdx((i) => Math.max(i - 1, 0))}
              disabled={monthIdx === 0}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground transition-all duration-150 hover:bg-accent/60 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Monthly revenue card */}
          <div
            key={`rev-${monthIdx}`}
            className="p-4 rounded-xl border border-border/60 bg-card animate-pop-in"
            style={{ animationDelay: "40ms" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-tint-violet flex items-center justify-center">
                  <DollarSign className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Revenue
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-foreground tabular-nums">{formatJMD(currentRevenue)}</p>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                  isUp
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{isUp ? "+" : ""}{revenuePct}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {isUp ? "+" : "−"}{formatJMD(Math.abs(revenueDelta))} vs previous month
            </p>
          </div>

          {/* Stat grid */}
          <div key={`stats-${monthIdx}`} className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border border-border/50 ${stat.tint} animate-pop-in transition-transform duration-200 hover:scale-[1.02]`}
                  style={{ animationDelay: `${100 + i * 70}ms` }}
                >
                  <Icon className={`w-3.5 h-3.5 ${stat.iconColor} mb-2`} />
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Top services */}
          <div key={`top-${monthIdx}`} className="animate-fade-up" style={{ animationDelay: "350ms" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Top services
              </h3>
              <span className="text-xs text-muted-foreground tabular-nums">{formatJMD(topServicesRevenue)}</span>
            </div>
            <div className="rounded-xl border border-border/60 bg-card divide-y divide-border/40 overflow-hidden">
              {topServices.map((s, i) => {
                const Icon = s.icon;
                const revenue = s.count * s.price;
                const pct = topServicesRevenue > 0 ? (revenue / topServicesRevenue) * 100 : 0;
                return (
                  <div
                    key={s.name}
                    className="px-3.5 py-3 animate-fade-up"
                    style={{ animationDelay: `${380 + i * 80}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${s.tint} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 ${s.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-foreground truncate">{s.name}</span>
                          <span className="text-sm font-semibold text-foreground tabular-nums shrink-0">
                            {formatJMD(revenue)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {s.count} bookings · {formatJMD(s.price)}
                          </span>
                          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                            {pct.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden ml-11">
                      <div
                        className="h-full bg-primary/80 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly bookings line chart */}
          <div key={`chart-${monthIdx}`} className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Weekly bookings
              </h3>
              <span className="text-xs text-muted-foreground tabular-nums">{weeklyTotal} total</span>
            </div>
            <div className="h-40 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 12, left: 12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lineFade" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis hide domain={[0, "dataMax + 2"]} />
                  <Tooltip
                    cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "0.5rem",
                      fontSize: "12px",
                      padding: "6px 10px",
                    }}
                    labelStyle={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                    formatter={(value) => [`${value} bookings`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="url(#lineFade)"
                    strokeWidth={2.5}
                    dot={{ fill: "var(--primary)", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={900}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
