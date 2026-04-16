import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="px-5 py-16">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Ready to get organised?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Set up in under 2 minutes. No credit card needed.
        </p>
        <Button asChild variant="hero" size="lg" className="mt-6">
          <Link to="/onboarding">
            Start free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
