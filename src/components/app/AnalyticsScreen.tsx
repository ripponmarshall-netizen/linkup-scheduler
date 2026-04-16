import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export function AnalyticsScreen() {
  const [isPro, setIsPro] = useState(false);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Analytics</h1>
          <button
            onClick={() => setIsPro(!isPro)}
            className="text-xs text-primary font-medium"
          >
            {isPro ? "View as Free" : "View as Pro"}
          </button>
        </div>
      </div>

      {!isPro ? (
        <div className="px-5">
          <div className="py-16 text-center">
            <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground mb-1">Unlock Analytics</h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
              See your busiest days, top services, and more with Pro.
            </p>
            <Button asChild size="default">
              <Link to="/app/upgrade">Upgrade to Pro</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-5 space-y-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "23", label: "This week" },
              { value: "87", label: "This month" },
              { value: "Tuesday", label: "Busiest day" },
              { value: "Fade", label: "Top service" },
            ].map((stat, i) => (
              <div key={i} className="py-2">
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">This week</h3>
            <div className="flex items-end gap-2 h-24">
              {[
                { day: "M", count: 5 },
                { day: "T", count: 7 },
                { day: "W", count: 4 },
                { day: "T", count: 3 },
                { day: "F", count: 4 },
                { day: "S", count: 0 },
                { day: "S", count: 0 },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary rounded"
                    style={{ height: `${Math.max(d.count * 12, 2)}px` }}
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
