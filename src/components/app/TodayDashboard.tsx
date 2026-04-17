import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, X, Scissors, Sparkles, Brush, User, Coffee } from "lucide-react";
import { useState } from "react";

type ApptStatus = "completed" | "confirmed" | "upcoming" | "free";

const sampleAppointments: { id: number; time: string; client: string; service: string; status: ApptStatus }[] = [
  { id: 1, time: "9:00 AM", client: "Marcus Brown", service: "Fade + Lineup", status: "completed" },
  { id: 2, time: "10:00 AM", client: "Andre Williams", service: "Full Cut", status: "confirmed" },
  { id: 3, time: "11:00 AM", client: "— Free —", service: "", status: "free" },
  { id: 4, time: "12:00 PM", client: "Keisha Taylor", service: "Braids Retouch", status: "confirmed" },
  { id: 5, time: "2:00 PM", client: "Dwayne Carter", service: "Full Cut + Beard", status: "upcoming" },
  { id: 6, time: "3:00 PM", client: "— Free —", service: "", status: "free" },
  { id: 7, time: "4:00 PM", client: "Tanya Mitchell", service: "Lineup", status: "upcoming" },
];

function serviceIcon(service: string) {
  const s = service.toLowerCase();
  if (!s) return Coffee;
  if (s.includes("braid")) return Sparkles;
  if (s.includes("beard") || s.includes("lineup")) return Brush;
  if (s.includes("cut") || s.includes("fade")) return Scissors;
  return User;
}

const statusTint: Record<ApptStatus, string> = {
  completed: "bg-success",
  confirmed: "bg-primary",
  upcoming: "bg-tint-blue",
  free: "bg-muted",
};

export function TodayDashboard() {
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-JM", { weekday: "long", day: "numeric", month: "long" });
  const actual = appointments.filter(a => a.status !== "free");
  const nextAppt = appointments.find(a => a.status === "upcoming" || a.status === "confirmed");

  const markCompleted = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "completed" } : a));
  };

  const selected = appointments.find(a => a.id === selectedId);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-2 animate-fade-up">
        <p className="text-xs text-muted-foreground tracking-wide">Today</p>
        <h1 className="text-lg font-semibold text-foreground mt-0.5">{dateStr}</h1>
      </div>

      <div className="px-5 py-3 animate-fade-up" style={{ animationDelay: "50ms" }}>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">{actual.length}</span> appointments
          {nextAppt && <> · Next at <span className="text-foreground font-medium">{nextAppt.time}</span></>}
        </p>
      </div>

      <div className="px-5 mb-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <Button size="default" className="gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.96] shadow-sm">
          <Plus className="w-4 h-4" />
          Add appointment
        </Button>
      </div>

      <div className="px-5 mb-8">
        <div className="divide-y divide-border/40">
          {appointments.map((appt, idx) => {
            const Icon = serviceIcon(appt.service);
            const isInactive = appt.status === "free" || appt.status === "completed";
            return (
              <button
                key={appt.id}
                onClick={() => appt.status !== "free" && setSelectedId(appt.id)}
                className={`w-full flex items-center justify-between py-3.5 -mx-2 px-2 text-left transition-all duration-200 animate-fade-up ${
                  selectedId === appt.id ? "bg-accent/60 rounded-lg" : "hover:bg-secondary/40 rounded-lg"
                } ${
                  appt.status === "free" ? "opacity-40 cursor-default" :
                  appt.status === "completed" ? "opacity-55" :
                  "cursor-pointer active:scale-[0.99]"
                }`}
                style={{ animationDelay: `${150 + idx * 40}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col items-center gap-1 w-14 shrink-0">
                    <span className="text-[11px] text-muted-foreground tabular-nums">{appt.time}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusTint[appt.status]}`} />
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    appt.status === "free" ? "bg-muted/40" : "bg-accent/60"
                  }`}>
                    <Icon className={`w-3.5 h-3.5 ${appt.status === "free" ? "text-muted-foreground" : "text-primary"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      appt.status === "free" ? "text-muted-foreground italic" :
                      appt.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
                    }`}>
                      {appt.client}
                    </p>
                    {appt.service && <p className="text-xs text-muted-foreground truncate">{appt.service}</p>}
                  </div>
                </div>
                {(appt.status === "confirmed" || appt.status === "upcoming") && (
                  <button onClick={(e) => markCompleted(appt.id, e)} className="p-1.5 shrink-0 transition-all duration-150 hover:scale-110 active:scale-90">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors duration-150" />
                  </button>
                )}
                {appt.status === "completed" && !isInactive ? null : appt.status === "completed" && (
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 animate-check" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-foreground/10 backdrop-blur-[2px] flex items-end justify-center animate-fade-in"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="bg-card w-full max-w-lg rounded-t-2xl p-5 safe-bottom shadow-lg animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-8 h-1 rounded-full bg-muted mx-auto mb-4" />
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-foreground">{selected.client}</h2>
              <button onClick={() => setSelectedId(null)} className="p-1 transition-all duration-150 hover:rotate-90 active:scale-90">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selected.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selected.time}</span></div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1.5 font-medium capitalize">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusTint[selected.status]}`} />
                  {selected.status}
                </span>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <button className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium transition-all duration-200 hover:bg-secondary/80 active:scale-[0.96]">Reschedule</button>
              <button className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium transition-all duration-200 hover:bg-secondary/80 active:scale-[0.96]">Edit</button>
              <button className="flex-1 h-10 rounded-lg text-destructive text-sm font-medium transition-all duration-200 hover:bg-destructive/10 active:scale-[0.96]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
