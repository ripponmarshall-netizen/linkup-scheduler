import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Lock, TrendingUp, Calendar, BarChart3, XCircle } from "lucide-react";

export function AnalyticsScreen() {
  const [isPro, setIsPro] = useState(false);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Analytics</h1>
          <button
            onClick={() => setIsPro(!isPro)}
            className="text-xs text-primary font-medium px-3 py-1 rounded-full bg-accent"
          >
            {isPro ? "View as Free" : "View as Pro"}
          </button>
        </div>
      </div>

      {!isPro ? (
        /* Free state — blurred preview with upgrade CTA */
        <div className="px-4">
          <div className="relative rounded-xl border border-border overflow-hidden">
            <div className="blur-sm pointer-events-none p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-2xl font-bold text-foreground">23</p>
                  <p className="text-xs text-muted-foreground">This week</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-2xl font-bold text-foreground">87</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-2xl font-bold text-foreground">Tue</p>
                  <p className="text-xs text-muted-foreground">Busiest day</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-2xl font-bold text-foreground">Fade</p>
                  <p className="text-xs text-muted-foreground">Top service</p>
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border h-40" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 rounded-xl">
              <Lock className="w-8 h-8 text-muted-foreground mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1">Unlock Analytics</h3>
              <p className="text-sm text-muted-foreground text-center mb-4 px-6">
                See your busiest days, top services, and more with Pro.
              </p>
              <Button asChild size="default">
                <Link to="/app/upgrade">Upgrade to Pro</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Pro state — active dashboard */
        <div className="px-4 space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "23", label: "This week", icon: Calendar },
              { value: "87", label: "This month", icon: TrendingUp },
              { value: "Tuesday", label: "Busiest day", icon: BarChart3 },
              { value: "Fade", label: "Top service", icon: BarChart3 },
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Appointments this week</h3>
            <div className="flex items-end gap-2 h-32">
              {[
                { day: "Mon", count: 5 },
                { day: "Tue", count: 7 },
                { day: "Wed", count: 4 },
                { day: "Thu", count: 3 },
                { day: "Fri", count: 4 },
                { day: "Sat", count: 0 },
                { day: "Sun", count: 0 },
              ].map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-primary/20 rounded-md relative" style={{ height: `${Math.max(d.count * 15, 4)}px` }}>
                    <div className="absolute inset-0 bg-primary rounded-md" style={{ height: "100%" }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="text-[10px] text-muted-foreground">Cancelled</span>
              </div>
              <p className="text-xl font-bold text-foreground">3</p>
              <p className="text-[10px] text-muted-foreground">this month</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-[10px] text-muted-foreground">Est. revenue</span>
              </div>
              <p className="text-xl font-bold text-foreground">$43,500</p>
              <p className="text-[10px] text-muted-foreground">JMD this month</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
