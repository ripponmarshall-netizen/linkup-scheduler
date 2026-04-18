import { Link, useLocation } from "@tanstack/react-router";
import { CalendarDays, Calendar, ClipboardList, Users, BarChart3, Settings } from "lucide-react";

const navItems = [
  { to: "/app/today" as const, icon: CalendarDays, label: "Today" },
  { to: "/app/calendar" as const, icon: Calendar, label: "Calendar" },
  { to: "/app/appointments" as const, icon: ClipboardList, label: "Bookings" },
  { to: "/app/clients" as const, icon: Users, label: "Clients" },
  { to: "/app/analytics" as const, icon: BarChart3, label: "Analytics" },
  { to: "/app/settings" as const, icon: Settings, label: "Settings" },
];

export function AppBottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/50 safe-bottom z-50">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 transition-all duration-200 ${isActive ? "scale-110 animate-tab-bounce" : "opacity-60"}`} />
              <span className={`text-[10px] font-medium transition-all duration-200 ${isActive ? "opacity-100" : "opacity-70"}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
