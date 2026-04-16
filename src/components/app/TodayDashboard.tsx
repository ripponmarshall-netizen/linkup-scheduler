import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, X } from "lucide-react";
import { useState } from "react";

const sampleAppointments = [
  { id: 1, time: "9:00 AM", client: "Marcus Brown", service: "Fade + Lineup", status: "completed" as const },
  { id: 2, time: "10:00 AM", client: "Andre Williams", service: "Full Cut", status: "confirmed" as const },
  { id: 3, time: "11:00 AM", client: "— Free —", service: "", status: "free" as const },
  { id: 4, time: "12:00 PM", client: "Keisha Taylor", service: "Braids Retouch", status: "confirmed" as const },
  { id: 5, time: "2:00 PM", client: "Dwayne Carter", service: "Full Cut + Beard", status: "upcoming" as const },
  { id: 6, time: "3:00 PM", client: "— Free —", service: "", status: "free" as const },
  { id: 7, time: "4:00 PM", client: "Tanya Mitchell", service: "Lineup", status: "upcoming" as const },
];

export function TodayDashboard() {
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-JM", { weekday: "long", day: "numeric", month: "long" });
  const actual = appointments.filter(a => a.status !== "free");
  const nextAppt = appointments.find(a => a.status === "upcoming" || a.status === "confirmed");

  const markCompleted = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "completed" as const } : a));
  };

  const selected = appointments.find(a => a.id === selectedId);

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="px-5 pt-8 pb-2 animate-fade-up">
        <p className="text-xs text-muted-foreground tracking-wide">Today</p>
        <h1 className="text-lg font-semibold text-foreground mt-0.5">{dateStr}</h1>
      </div>

      {/* Summary strip */}
      <div className="px-5 py-3 animate-fade-up" style={{ animationDelay: "50ms" }}>
        <p className="text-sm text-muted-foreground">
          {actual.length} appointments{nextAppt ? ` · Next at ${nextAppt.time}` : ""}
        </p>
      </div>

      {/* Add button */}
      <div className="px-5 mb-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <Button size="default" className="gap-2 transition-all duration-200 active:scale-[0.97]">
          <Plus className="w-4 h-4" />
          Add appointment
        </Button>
      </div>

      {/* Schedule */}
      <div className="px-5 mb-8">
        <div className="space-y-px">
          {appointments.map((appt, idx) => (
            <button
              key={appt.id}
              onClick={() => appt.status !== "free" && setSelectedId(appt.id)}
              className={`w-full flex items-center justify-between py-3.5 -mx-2 px-2 rounded-lg text-left transition-all duration-200 animate-fade-up ${
                selectedId === appt.id ? "bg-accent/50" : "hover:bg-secondary/50"
              } ${
                appt.status === "free" ? "opacity-35 cursor-default" : appt.status === "completed" ? "opacity-50" : "cursor-pointer active:scale-[0.99]"
              }`}
              style={{ animationDelay: `${150 + idx * 40}ms` }}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-xs text-muted-foreground w-16 shrink-0 tabular-nums">{appt.time}</span>
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
                <button onClick={(e) => markCompleted(appt.id, e)} className="p-1.5 shrink-0 transition-all duration-150 active:scale-90">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors duration-150" />
                </button>
              )}
              {appt.status === "completed" && (
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom sheet */}
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
              <button onClick={() => setSelectedId(null)} className="p-1 transition-all duration-150 active:scale-90">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selected.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selected.time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-medium capitalize">{selected.status}</span></div>
            </div>
            <div className="mt-5 flex gap-2">
              <button className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium transition-all duration-200 active:scale-[0.97]">Reschedule</button>
              <button className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium transition-all duration-200 active:scale-[0.97]">Edit</button>
              <button className="flex-1 h-10 rounded-lg text-destructive text-sm font-medium transition-all duration-200 active:scale-[0.97]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
