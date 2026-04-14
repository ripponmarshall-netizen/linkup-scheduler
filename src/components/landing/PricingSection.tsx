import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "JMD / month",
    description: "Get started with the basics",
    features: [
      "Daily agenda",
      "Manual appointment entry",
      "Basic reminders",
      "Quick rescheduling",
      "Client notes",
      "One owner, one calendar",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "500",
    period: "JMD / month",
    description: "Grow with online bookings and analytics",
    features: [
      "Everything in Free",
      "Customer self-booking",
      "Booking page & booking link",
      "Advanced reminders",
      "Analytics dashboard",
      "14-day free trial",
    ],
    cta: "Try Pro free for 14 days",
    featured: true,
    annual: {
      price: "4,800",
      period: "JMD / year",
      savings: "Save 20% — just 400 JMD/month billed annually",
    },
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-16 md:py-20 bg-secondary/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Simple, honest pricing</h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`bg-card rounded-xl border p-6 shadow-sm ${plan.featured ? "border-primary ring-1 ring-primary/20" : "border-border"}`}>
              {plan.featured && (
                <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">Most popular</span>
              )}
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
              </div>
              {plan.annual && (
                <div className="mt-2 bg-accent rounded-lg px-3 py-2">
                  <p className="text-xs font-medium text-accent-foreground">{plan.annual.savings}</p>
                </div>
              )}
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full mt-6" variant={plan.featured ? "hero" : "outline"} size="lg">
                <Link to="/onboarding">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
