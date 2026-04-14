import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="px-4 py-16 md:py-20 bg-primary/5">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ready to get organised?</h2>
        <p className="mt-3 text-muted-foreground">
          Set up your schedule in under 2 minutes. No credit card, no commitment.
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
      </div>
    </section>
  );
}
