export function LandingFooter() {
  return (
    <footer className="px-4 py-8 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
          Linkup<span className="text-primary">Organiser</span>
        </p>
        <p>© {new Date().getFullYear()} LinkupOrganiser. All rights reserved.</p>
      </div>
    </footer>
  );
}
