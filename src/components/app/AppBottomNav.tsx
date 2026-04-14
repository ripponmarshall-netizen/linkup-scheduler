import { Link, useLocation } from "@tanstack/react-router";
import { CalendarDays, Calendar, ClipboardList, Users, Settings } from "lucide-react";

const navItems = [
  { to: "/app/today" as const, icon: CalendarDays, label: "Today" },
  { to: "/app/calendar" as const, icon: Calendar, label: "Calendar" },
  { to: "/app/appointments" as const, icon: ClipboardList, label: "Bookings" },
  { to: "/app/clients" as const, icon: Users, label: "Clients" },
  { to: "/app/settings" as const, icon: Settings, label: "Settings" },
];

export function AppBottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
