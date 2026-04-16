import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, LogOut } from "lucide-react";

const settingsSections = [
  {
    title: "Business",
    items: [
      { label: "Business name", value: "Marcus Cuts", to: null },
      { label: "Working hours", value: "Mon–Fri, 9–5", to: null },
      { label: "Services", value: "5 services", to: null },
    ],
  },
  {
    title: "Preferences",
    items: [
      { label: "Reminders", value: "1 hour before", to: null },
    ],
  },
  {
    title: "Account",
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
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
      </div>

      <div className="px-5 space-y-6 mb-8">
        {settingsSections.map((section, i) => (
          <div key={i}>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{section.title}</h2>
            <div className="space-y-px">
              {section.items.map((item, j) => {
                const content = (
                  <div className="flex items-center justify-between py-3 hover:bg-secondary/50 -mx-2 px-2 rounded-lg transition-colors">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
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
          className="flex items-center gap-2 py-3 text-sm text-destructive"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
