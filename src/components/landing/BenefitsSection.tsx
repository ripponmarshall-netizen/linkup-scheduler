const benefits = [
  {
    title: "Stay organised every day",
    description: "See your full schedule at a glance. Know who's coming, when you're free, and what's next.",
  },
  {
    title: "Less back-and-forth",
    description: "Set reminders, reschedule with a tap, and keep notes on each client.",
  },
  {
    title: "Accept bookings online",
    description: "Upgrade to Pro and share a booking link. Clients pick a time, you confirm.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="px-5 py-16 max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-10">
        Built for how you work
      </h2>
      <div className="space-y-8">
        {benefits.map((b, i) => (
          <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <h3 className="text-base font-semibold text-foreground">{b.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
