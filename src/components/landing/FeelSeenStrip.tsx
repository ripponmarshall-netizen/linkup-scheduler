const items = [
  { emoji: "💅", label: "Nail techs", sub: "home studio, salon, or mobile" },
  { emoji: "✂️", label: "Hair stylists", sub: "& loctitians" },
  { emoji: "💁🏽‍♀️", label: "Lash, braid", sub: "& beauty pros" },
];

export function FeelSeenStrip() {
  return (
    <section className="px-5 py-12 bg-secondary/40">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {items.map((it, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-3xl mb-2" aria-hidden>{it.emoji}</div>
              <p className="text-sm font-semibold text-foreground leading-tight">{it.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{it.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-md mx-auto leading-relaxed">
          If your clients book you on WhatsApp and Instagram, this was built for you.
        </p>
      </div>
    </section>
  );
}
