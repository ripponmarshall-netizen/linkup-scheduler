import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, Globe, Bell, BarChart3, ArrowRight } from "lucide-react";

const proFeatures = [
  { icon: Globe, title: "Customer self-booking", desc: "Share a booking link so clients can pick a time online." },
  { icon: Bell, title: "Advanced reminders", desc: "Automated reminders to reduce no-shows." },
  { icon: BarChart3, title: "Analytics", desc: "Track your busiest days, top services, and more." },
];

export function UpgradeScreen() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Upgrade to Pro</h1>
        <p className="text-sm text-muted-foreground mt-1">Let clients book you online and grow your business.</p>
      </div>

      <div className="px-4 space-y-4 mb-6">
        {proFeatures.map((f, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="px-4 space-y-3 mb-6">
        <div className="bg-card rounded-xl border-2 border-primary p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-foreground">Annual</h3>
            <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Save 20%</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">4,800</span>
            <span className="text-sm text-muted-foreground">JMD / year</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Just 400 JMD/month billed annually</p>
          <Button className="w-full mt-4" size="lg">
            Start 14-day free trial
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-bold text-foreground mb-2">Monthly</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">500</span>
            <span className="text-sm text-muted-foreground">JMD / month</span>
          </div>
          <Button variant="outline" className="w-full mt-4" size="lg">
            Start 14-day free trial
          </Button>
        </div>
      </div>

      <div className="px-4 mb-8">
        <div className="bg-accent rounded-xl p-4">
          <h3 className="text-sm font-medium text-foreground mb-2">What's included in Pro</h3>
          <ul className="space-y-2">
            {["Customer self-booking", "Booking page & link", "Advanced reminders", "Analytics dashboard", "14-day free trial", "Cancel anytime"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-4 mb-6">
        <p className="text-xs text-muted-foreground text-center">
          Preview what your clients see:
        </p>
        <Button asChild variant="link" className="w-full mt-1">
          <Link to="/booking">View booking page preview</Link>
        </Button>
      </div>
    </div>
  );
}
