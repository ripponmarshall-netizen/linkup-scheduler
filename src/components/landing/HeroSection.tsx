import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-5 pt-20 pb-16 md:py-28 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.15]">
        One place for all your appointments.
      </h1>

      <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
        A simple scheduling assistant for barbers, stylists, tutors, and solo service providers across the Caribbean.
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

      <p className="mt-4 text-xs text-muted-foreground">
        No credit card required.
      </p>
    </section>
  );
}
