import { CalendarDays, Bell, RefreshCw, Globe, BarChart3 } from "lucide-react";

const features = [
  { icon: CalendarDays, label: "Today view", desc: "Your daily agenda at a glance" },
  { icon: Bell, label: "Reminders", desc: "Never miss an appointment" },
  { icon: RefreshCw, label: "Quick reschedule", desc: "Move appointments with a tap" },
  { icon: Globe, label: "Self-booking", desc: "Let clients pick a time online", pro: true },
  { icon: BarChart3, label: "Analytics", desc: "Track your busiest days", pro: true },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-16 md:py-20 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Everything you need, nothing you don't</h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Simple tools to run your appointment-based business from your phone.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {features.map((f, i) => (
          <div key={i} className="relative bg-card rounded-xl border border-border p-5 text-center shadow-sm hover:shadow-md transition-shadow">
            {f.pro && (
              <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">PRO</span>
            )}
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mx-auto mb-3">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">{f.label}</p>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
