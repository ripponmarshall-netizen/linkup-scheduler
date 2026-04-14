import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-foreground tracking-tight">
          Linkup<span className="text-primary">Organiser</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
          <Button asChild size="default">
            <Link to="/onboarding">Start free</Link>
          </Button>
        </nav>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <a href="#benefits" className="block text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>Benefits</a>
          <a href="#features" className="block text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#pricing" className="block text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#faq" className="block text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>FAQ</a>
          <Link to="/login" className="block text-sm text-muted-foreground" onClick={() => setMenuOpen(false)}>Log in</Link>
          <Button asChild className="w-full">
            <Link to="/onboarding">Start free</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
