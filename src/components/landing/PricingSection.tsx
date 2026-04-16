import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="px-5 py-16 max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">Simple pricing</h2>
      <p className="text-sm text-muted-foreground text-center mb-10">Start free. Upgrade when you're ready.</p>

      <div className="space-y-4">
        {/* Free */}
        <div className="rounded-xl border border-border p-5 transition-all duration-200 hover:shadow-sm">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-base font-semibold text-foreground">Free</h3>
            <span className="text-sm text-muted-foreground">0 JMD</span>
          </div>
          <ul className="space-y-1.5 mb-4">
            {["Daily agenda", "Manual appointment entry", "Basic reminders", "Quick rescheduling", "Client notes"].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full transition-all duration-200 active:scale-[0.98]">
            <Link to="/onboarding">Start free</Link>
          </Button>
        </div>

        {/* Pro */}
        <div className="rounded-xl border border-primary/25 bg-accent/20 p-5 transition-all duration-200 hover:shadow-sm">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-base font-semibold text-foreground">Pro</h3>
            <span className="text-sm font-semibold text-foreground">500 JMD/mo</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Or 4,800 JMD/year — save 20% (400 JMD/mo billed annually)
          </p>
          <ul className="space-y-1.5 mb-4">
            {["Everything in Free", "Customer self-booking", "Booking page & link", "Advanced reminders", "Analytics", "14-day free trial"].map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Button asChild variant="hero" className="w-full transition-all duration-200 active:scale-[0.98]">
            <Link to="/onboarding">Try Pro free for 14 days</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
