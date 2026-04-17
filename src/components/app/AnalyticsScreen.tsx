import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Lock, CalendarDays, CalendarRange, TrendingUp, Scissors } from "lucide-react";

export function AnalyticsScreen() {
  const [isPro, setIsPro] = useState(false);

  const stats = [
    { value: "23", label: "This week", icon: CalendarDays, tint: "bg-tint-blue text-foreground", iconColor: "text-primary" },
    { value: "87", label: "This month", icon: CalendarRange, tint: "bg-accent/60 text-foreground", iconColor: "text-primary" },
    { value: "Tuesday", label: "Busiest day", icon: TrendingUp, tint: "bg-tint-amber text-foreground", iconColor: "text-warning" },
    { value: "Fade", label: "Top service", icon: Scissors, tint: "bg-tint-violet text-foreground", iconColor: "text-primary" },
  ];

  const chartData = [
    { day: "M", count: 5 },
    { day: "T", count: 7 },
    { day: "W", count: 4 },
    { day: "T", count: 3 },
    { day: "F", count: 4 },
    { day: "S", count: 0 },
    { day: "S", count: 0 },
  ];

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
              See your busiest days, top services, and more with Pro.
            </p>
            <Button asChild size="default" className="transition-all duration-200 active:scale-[0.97]">
              <Link to="/app/upgrade">Try Pro free for 14 days</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-5 space-y-8 mb-8">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border border-border/50 ${stat.tint} animate-pop-in transition-transform duration-200 hover:scale-[1.02]`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <Icon className={`w-3.5 h-3.5 ${stat.iconColor} mb-2`} />
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "250ms" }}>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">This week</h3>
            <div className="flex items-end gap-2 h-24">
              {chartData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary/80 rounded transition-all duration-500 ease-out"
                    style={{
                      height: `${Math.max(d.count * 12, 2)}px`,
                      transitionDelay: `${300 + i * 60}ms`,
                    }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
