const features = [
  { label: "Today view", desc: "Your daily agenda at a glance" },
  { label: "Reminders", desc: "Never miss an appointment" },
  { label: "Quick reschedule", desc: "Move appointments with a tap" },
  { label: "Self-booking", desc: "Let clients pick a time online", pro: true },
  { label: "Analytics", desc: "Track your busiest days", pro: true },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-5 py-16 bg-secondary/40">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-10">
          Everything you need, nothing you don't
        </h2>
        <div className="space-y-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start justify-between py-2.5 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {f.label}
                  {f.pro && (
                    <span className="ml-2 text-[10px] font-semibold text-primary bg-accent px-1.5 py-0.5 rounded transition-colors duration-200">
                      PRO
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
