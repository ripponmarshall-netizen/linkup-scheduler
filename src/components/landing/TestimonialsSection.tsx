const testimonials = [
  {
    quote: "Mi used to lose like 3 clients a week to confusion. Now everybody book themselves.",
    name: "Keisha",
    role: "Nail tech, Portmore",
  },
  {
    quote: "The deposit link alone paid for the app ten times over.",
    name: "Renee",
    role: "Stylist, Kingston",
  },
  {
    quote: "Mi phone nuh ring off the hook no more. Mi can focus pon di client inna di chair.",
    name: "Tanesha",
    role: "Loctitian, Montego Bay",
  },
];

export function TestimonialsSection() {
  return (
    <section className="px-5 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-10">
          Real techs, real bookings
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-xl border border-border bg-card p-5 animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <blockquote className="text-sm text-foreground/90 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 pt-3 border-t border-border/60">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
