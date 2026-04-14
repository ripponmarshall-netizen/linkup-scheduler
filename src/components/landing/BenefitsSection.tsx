import { CalendarCheck, MessageSquare, Globe } from "lucide-react";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Stay organised every day",
    description: "See your full schedule at a glance. Know who's coming, when you're free, and what's next — all from your phone.",
  },
  {
    icon: MessageSquare,
    title: "Spend less time on back-and-forth",
    description: "Set reminders, reschedule with a tap, and keep notes on each client so nothing slips through.",
  },
  {
    icon: Globe,
    title: "Accept bookings online when you're ready",
    description: "Upgrade to Pro and share a booking link with your clients. They pick a time, you confirm — simple.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="px-4 py-16 md:py-20 bg-secondary/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Built for how you work</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Whether you're a barber, stylist, or tutor — manage your appointments without the hassle.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
