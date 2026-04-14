import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Calendar className="w-4 h-4" />
          Built for solo businesses
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
          One place for all your appointments.
        </h1>

        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Stay organised, manage your schedule, and let clients book you online. Built for barbers, stylists, tutors, and solo service providers across Jamaica and the Caribbean.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/onboarding">
              Start free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="heroOutline" size="lg">
            <Link to="/onboarding">
              Try Pro free for 14 days
            </Link>
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required. Set up in under 2 minutes.
        </p>
      </div>

      {/* Mini app preview */}
      <div className="mt-16 max-w-sm mx-auto">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground">Today</p>
              <p className="text-sm font-semibold text-foreground">Wednesday, 14 April</p>
            </div>
            <div className="bg-accent rounded-full px-3 py-1">
              <p className="text-xs font-medium text-accent-foreground">4 appointments</p>
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { time: "9:00 AM", name: "Marcus Brown", service: "Fade + Lineup", status: "confirmed" },
              { time: "10:30 AM", name: "Andre Williams", service: "Full Cut", status: "confirmed" },
              { time: "12:00 PM", name: "— Free gap —", service: "", status: "free" },
              { time: "1:00 PM", name: "Keisha Taylor", service: "Braids", status: "upcoming" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${item.status === "free" ? "bg-muted/50 border border-dashed border-border" : "bg-secondary"}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground w-16 shrink-0">{item.time}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate ${item.status === "free" ? "text-muted-foreground italic" : "text-foreground"}`}>{item.name}</p>
                  {item.service && <p className="text-xs text-muted-foreground truncate">{item.service}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
