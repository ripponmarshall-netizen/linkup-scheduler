import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="px-5 py-16">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Your chair is ready. Is your schedule?</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Spend 2 minutes setting up now, and by tomorrow morning your clients will be booking themselves while you sleep.
        </p>
        <Button asChild variant="hero" size="lg" className="mt-6">
          <Link to="/onboarding">
            Set up my booking link
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Built in the Caribbean, for Caribbean hustlers. Your data stays yours.
        </p>
      </div>
    </section>
  );
}
