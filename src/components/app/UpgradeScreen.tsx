import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export function UpgradeScreen() {
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-2 animate-fade-up">
        <h1 className="text-lg font-semibold text-foreground">Upgrade to Pro</h1>
        <p className="text-sm text-muted-foreground mt-1">Let clients book you online.</p>
      </div>

      {/* Billing toggle */}
      <div className="px-5 py-5 animate-fade-up" style={{ animationDelay: "50ms" }}>
        <div className="flex bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setBilling("annual")}
            className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
              billing === "annual"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Annual
            <span className="ml-1.5 text-[10px] text-primary font-semibold">Save 20%</span>
          </button>
          <button
            onClick={() => setBilling("monthly")}
            className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
              billing === "monthly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Price display */}
      <div className="px-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <div className="rounded-xl border border-primary/20 bg-accent/20 p-5">
          {billing === "annual" ? (
            <>
              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="text-3xl font-bold text-foreground tracking-tight">4,800</span>
                <span className="text-sm text-muted-foreground">JMD/year</span>
              </div>
              <p className="text-xs text-muted-foreground mb-5">400 JMD/month billed annually</p>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="text-3xl font-bold text-foreground tracking-tight">500</span>
                <span className="text-sm text-muted-foreground">JMD/month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-5">Billed monthly</p>
            </>
          )}
          <Button className="w-full transition-all duration-200 active:scale-[0.98]" size="lg">
            Start 14-day free trial
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="px-5 py-6 animate-fade-up" style={{ animationDelay: "150ms" }}>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">What's included</h3>
        <ul className="space-y-2.5">
          {["Customer self-booking", "Booking page & link", "Advanced reminders", "Analytics", "14-day free trial", "Cancel anytime"].map((item, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-foreground">
              <Check className="w-3.5 h-3.5 text-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button asChild variant="link" className="px-0 text-xs">
            <Link to="/booking">Preview booking page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
