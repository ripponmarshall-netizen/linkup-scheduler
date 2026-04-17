import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, LogOut, Briefcase, SlidersHorizontal, UserCircle2 } from "lucide-react";

const settingsSections = [
  {
    title: "Business",
    icon: Briefcase,
    iconBg: "bg-tint-blue",
    iconColor: "text-primary",
    items: [
      { label: "Business name", value: "Marcus Cuts", to: null },
      { label: "Working hours", value: "Mon–Fri, 9–5", to: null },
      { label: "Services", value: "5 services", to: null },
    ],
  },
  {
    title: "Preferences",
    icon: SlidersHorizontal,
    iconBg: "bg-tint-amber",
    iconColor: "text-warning",
    items: [
      { label: "Reminders", value: "1 hour before", to: null },
    ],
  },
  {
    title: "Account",
    icon: UserCircle2,
    iconBg: "bg-tint-violet",
    iconColor: "text-primary",
    items: [
      { label: "Subscription", value: "Free plan", to: "/app/upgrade" as const },
      { label: "Support", value: "", to: null },
    ],
  },
];

export function SettingsScreen() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-4 animate-fade-up">
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
      </div>

      <div className="px-5 space-y-6 mb-8">
        {settingsSections.map((section, i) => {
          const Icon = section.icon;
          return (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${section.iconBg}`}>
                  <Icon className={`w-3 h-3 ${section.iconColor}`} />
                </div>
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{section.title}</h2>
              </div>
              <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/40 overflow-hidden">
                {section.items.map((item, j) => {
                  const content = (
                    <div className="flex items-center justify-between py-3.5 px-3.5 hover:bg-secondary/40 transition-all duration-200 active:scale-[0.99]">
                      <span className="text-sm text-foreground">{item.label}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground transition-transform duration-150" />
                      </div>
                    </div>
                  );
                  return item.to ? (
                    <Link key={j} to={item.to}>{content}</Link>
                  ) : (
                    <div key={j} className="cursor-pointer">{content}</div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 py-3 text-sm text-destructive transition-all duration-150 hover:opacity-80 hover:translate-x-0.5 active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
