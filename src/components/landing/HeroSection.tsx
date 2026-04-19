import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="px-5 pt-20 pb-16 md:py-28 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.15] animate-fade-up">
        Stop losing clients in your DMs.
      </h1>

      <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md mx-auto animate-fade-up" style={{ animationDelay: "80ms" }}>
        LinkupOrganiser is the booking brain for nail techs and hair stylists across Jamaica and the Caribbean. One link, one schedule, one calm day — no more scrolling through 50 "Hi hun, you have space Saturday?" messages.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "160ms" }}>
        <Button asChild variant="hero" size="lg" className="transition-all duration-200 active:scale-[0.97]">
          <Link to="/onboarding">
            Set up my booking link
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant="heroOutline" size="lg" className="transition-all duration-200 active:scale-[0.97]">
          <Link to="/onboarding">
            Try Pro free for 14 days
          </Link>
        </Button>
      </div>

      <p className="mt-4 text-xs text-muted-foreground animate-fade-up" style={{ animationDelay: "240ms" }}>
        No card. No downloads. Works right from your phone.
      </p>
    </section>
  );
}
