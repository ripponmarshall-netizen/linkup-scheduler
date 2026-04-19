const benefits = [
  {
    title: "Your day, sorted before you wake up",
    description: "See every client, every deposit, and every gap at a glance. No more flipping between WhatsApp, Notes, and your memory.",
  },
  {
    title: "Let the app do the chasing",
    description: "Automatic confirmations, reminders, and 'pull up in 30 mins' texts. You stop being a receptionist and get back to the art.",
  },
  {
    title: "One link does the booking for you",
    description: "Drop your LinkupOrganiser link in your IG bio. Clients pick their slot, pay a deposit, and you just approve. Done.",
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
