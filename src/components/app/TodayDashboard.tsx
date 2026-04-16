import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2 } from "lucide-react";
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
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-JM", { weekday: "long", day: "numeric", month: "long" });
  const actual = appointments.filter(a => a.status !== "free");
  const nextAppt = appointments.find(a => a.status === "upcoming" || a.status === "confirmed");

  const markCompleted = (id: number) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "completed" as const } : a));
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-2">
        <p className="text-xs text-muted-foreground">Today</p>
        <h1 className="text-lg font-semibold text-foreground mt-0.5">{dateStr}</h1>
      </div>

      {/* Compact summary */}
      <div className="px-5 py-3">
        <p className="text-sm text-muted-foreground">
          {actual.length} appointments{nextAppt ? ` · Next at ${nextAppt.time}` : ""}
        </p>
      </div>

      {/* Add button */}
      <div className="px-5 mb-5">
        <Button size="default" className="gap-2">
          <Plus className="w-4 h-4" />
          Add appointment
        </Button>
      </div>

      {/* Schedule */}
      <div className="px-5 mb-8">
        <div className="space-y-px">
          {appointments.map(appt => (
            <div
              key={appt.id}
              className={`flex items-center justify-between py-3 ${
                appt.status === "free" ? "opacity-40" : appt.status === "completed" ? "opacity-50" : ""
              }`}
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
                <button onClick={() => markCompleted(appt.id)} className="p-1.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                </button>
              )}
              {appt.status === "completed" && (
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
