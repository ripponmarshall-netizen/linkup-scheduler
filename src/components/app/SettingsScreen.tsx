import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Briefcase, Bell, CreditCard, HelpCircle, LogOut, Scissors } from "lucide-react";

const settingsSections = [
  {
    title: "Business",
    items: [
      { icon: Briefcase, label: "Business name", value: "Marcus Cuts", to: null },
      { icon: Clock, label: "Working hours", value: "Mon–Fri, 9 AM – 5 PM", to: null },
      { icon: Scissors, label: "Services", value: "5 services", to: null },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Reminder settings", value: "1 hour before", to: null },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: CreditCard, label: "Subscription & billing", value: "Free plan", to: "/app/upgrade" as const },
      { icon: HelpCircle, label: "Support", value: "", to: null },
    ],
  },
];

export function SettingsScreen() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="px-4 space-y-6 mb-8">
        {settingsSections.map((section, i) => (
          <div key={i}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{section.title}</h2>
            <div className="bg-card rounded-xl border border-border divide-y divide-border overflow-hidden">
              {section.items.map((item, j) => {
                const content = (
                  <div className="flex items-center justify-between px-4 py-3.5 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
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
        ))}

        <button
          onClick={() => navigate({ to: "/" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors"
        >
          <LogOut className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">Sign out</span>
        </button>
      </div>
    </div>
  );
}
