import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export function UpgradeScreen() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-2">
        <h1 className="text-lg font-semibold text-foreground">Upgrade to Pro</h1>
        <p className="text-sm text-muted-foreground mt-1">Let clients book you online.</p>
      </div>

      <div className="px-5 py-6 space-y-4">
        {/* Annual */}
        <div className="rounded-xl border border-primary/30 bg-accent/30 p-5">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-sm font-semibold text-foreground">Annual</h3>
            <span className="text-[10px] font-semibold text-primary bg-accent px-2 py-0.5 rounded-full">Save 20%</span>
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-2xl font-bold text-foreground">4,800</span>
            <span className="text-sm text-muted-foreground">JMD/year</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">400 JMD/month billed annually</p>
          <Button className="w-full" size="lg">
            Start 14-day free trial
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Monthly */}
        <div className="rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Monthly</h3>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-2xl font-bold text-foreground">500</span>
            <span className="text-sm text-muted-foreground">JMD/month</span>
          </div>
          <Button variant="outline" className="w-full" size="lg">
            Start 14-day free trial
          </Button>
        </div>
      </div>

      <div className="px-5 pb-8">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">What's included</h3>
        <ul className="space-y-2">
          {["Customer self-booking", "Booking page & link", "Advanced reminders", "Analytics", "14-day free trial", "Cancel anytime"].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground">
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
