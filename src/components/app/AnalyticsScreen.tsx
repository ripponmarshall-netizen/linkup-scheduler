import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Lock, CalendarDays, CalendarRange, TrendingUp, TrendingDown, Scissors, DollarSign } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function AnalyticsScreen() {
  const [isPro, setIsPro] = useState(false);

  const stats = [
    { value: "23", label: "This week", icon: CalendarDays, tint: "bg-tint-blue", iconColor: "text-primary" },
    { value: "87", label: "This month", icon: CalendarRange, tint: "bg-accent/60", iconColor: "text-primary" },
    { value: "Tuesday", label: "Busiest day", icon: TrendingUp, tint: "bg-tint-amber", iconColor: "text-warning" },
    { value: "Fade", label: "Top service", icon: Scissors, tint: "bg-tint-violet", iconColor: "text-primary" },
  ];

  // Monthly revenue data
  const currentRevenue = 142500;
  const previousRevenue = 128000;
  const revenueDelta = currentRevenue - previousRevenue;
  const revenuePct = ((revenueDelta / previousRevenue) * 100).toFixed(1);
  const isUp = revenueDelta >= 0;

  const chartData = [
    { day: "Mon", count: 5 },
    { day: "Tue", count: 7 },
    { day: "Wed", count: 4 },
    { day: "Thu", count: 3 },
    { day: "Fri", count: 6 },
    { day: "Sat", count: 2 },
    { day: "Sun", count: 0 },
  ];

  const formatJMD = (n: number) =>
    new Intl.NumberFormat("en-JM", { style: "currency", currency: "JMD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-4 animate-fade-up">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Analytics</h1>
          <button
            onClick={() => setIsPro(!isPro)}
            className="text-xs text-primary font-medium transition-opacity duration-150 hover:opacity-80"
          >
            {isPro ? "View as Free" : "View as Pro"}
          </button>
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
          {/* Monthly revenue card */}
          <div
            className="p-4 rounded-xl border border-border/60 bg-card animate-pop-in"
            style={{ animationDelay: "40ms" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-tint-violet flex items-center justify-center">
                  <DollarSign className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Revenue this month
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
              {isUp ? "+" : "−"}{formatJMD(Math.abs(revenueDelta))} vs last month
            </p>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 gap-3">
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

          {/* Weekly bookings line chart */}
          <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Weekly bookings
              </h3>
              <span className="text-xs text-muted-foreground tabular-nums">27 total</span>
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
