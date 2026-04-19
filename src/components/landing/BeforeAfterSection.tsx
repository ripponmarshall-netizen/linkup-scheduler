import { X, Check } from "lucide-react";

const without = [
  "30 unread DMs asking \"you have space?\"",
  "Two clients showing up at the same time",
  "Deposits you had to chase (or lost)",
  "No-shows that kill your whole day",
  "Forgetting if Tasha wanted ombre or French",
  "Phone buzzing all night with booking questions",
];

const withApp = [
  "One booking link in your bio — they pick, you approve",
  "Your day laid out clean from morning to last client",
  "Auto deposit reminders so you get paid before they sit down",
  "Automatic reminders = fewer no-shows",
  "Client notes: style, allergies, last visit, tip habits",
  "Peace. Your phone can rest.",
];

export function BeforeAfterSection() {
  return (
    <section className="px-5 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-10">
          What it costs when your bookings live in your DMs
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Without */}
          <div className="rounded-xl border border-border bg-card p-5 animate-fade-up">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Without LinkupOrganiser
            </h3>
            <ul className="space-y-2.5">
              {without.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With */}
          <div className="rounded-xl border border-primary/25 bg-accent/20 p-5 animate-fade-up" style={{ animationDelay: "80ms" }}>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              With LinkupOrganiser
            </h3>
            <ul className="space-y-2.5">
              {withApp.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-base md:text-lg font-medium text-foreground mt-10 max-w-xl mx-auto leading-relaxed">
          Every missed booking is money walking past your chair.
          <span className="block text-primary mt-1">LinkupOrganiser keeps it in the seat.</span>
        </p>
      </div>
    </section>
  );
}
