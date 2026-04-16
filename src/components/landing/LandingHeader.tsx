import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link to="/" className="text-base font-bold text-foreground tracking-tight">
          Linkup<span className="text-primary">Organiser</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            Log in
          </Link>
          <Button asChild size="sm" className="transition-all duration-200 active:scale-[0.97]">
            <Link to="/onboarding">Start free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
