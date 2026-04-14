import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle2, ArrowRight, Bell, BarChart3 } from "lucide-react";
import { useState } from "react";

const sampleAppointments = [
  { id: 1, time: "9:00 AM", endTime: "9:30 AM", client: "Marcus Brown", service: "Fade + Lineup", status: "completed" as const },
  { id: 2, time: "10:00 AM", endTime: "10:45 AM", client: "Andre Williams", service: "Full Cut", status: "confirmed" as const },
  { id: 3, time: "11:00 AM", endTime: "11:30 AM", client: "— Free —", service: "", status: "free" as const },
  { id: 4, time: "12:00 PM", endTime: "12:30 PM", client: "Keisha Taylor", service: "Braids Retouch", status: "confirmed" as const },
  { id: 5, time: "2:00 PM", endTime: "2:45 PM", client: "Dwayne Carter", service: "Full Cut + Beard", status: "upcoming" as const },
  { id: 6, time: "3:00 PM", endTime: "4:00 PM", client: "— Free —", service: "", status: "free" as const },
  { id: 7, time: "4:00 PM", endTime: "4:30 PM", client: "Tanya Mitchell", service: "Lineup", status: "upcoming" as const },
];

export function TodayDashboard() {
  const [appointments, setAppointments] = useState(sampleAppointments);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-JM", { weekday: "long", day: "numeric", month: "long" });
  const actual = appointments.filter(a => a.status !== "free");
  const nextAppt = appointments.find(a => a.status === "upcoming" || a.status === "confirmed");
  const freeGaps = appointments.filter(a => a.status === "free");

  const markCompleted = (id: number) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "completed" as const } : a));
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-sm text-muted-foreground">Today</p>
            <h1 className="text-xl font-bold text-foreground">{dateStr}</h1>
          </div>
          <Link to="/app/analytics">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="px-4 grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{actual.length}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Appointments</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <p className="text-2xl font-bold text-primary">{nextAppt?.time || "—"}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Next up</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{freeGaps.length}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Free gaps</p>
        </div>
      </div>

      {/* Assistant prompts */}
      <div className="px-4 mb-6">
        <div className="bg-accent rounded-xl p-4 space-y-2">
          <p className="text-sm text-foreground font-medium">📋 You have {actual.length} appointments today.</p>
          {nextAppt && <p className="text-sm text-muted-foreground">Your next appointment is at {nextAppt.time} with {nextAppt.client}.</p>}
          {freeGaps.length > 0 && <p className="text-sm text-muted-foreground">You have a free gap from {freeGaps[0].time} to {freeGaps[0].endTime}.</p>}
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 mb-6 flex gap-3">
        <Button size="default" className="flex-1 gap-2">
          <Plus className="w-4 h-4" />
          Add appointment
        </Button>
        <Link to="/app/upgrade">
          <Button variant="outline" size="default" className="gap-2">
            <Bell className="w-4 h-4" />
            Upgrade
          </Button>
        </Link>
      </div>

      {/* Schedule timeline */}
      <div className="px-4 mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-3">Schedule</h2>
        <div className="space-y-2">
          {appointments.map(appt => (
            <div
              key={appt.id}
              className={`rounded-xl border px-4 py-3 transition-all ${
                appt.status === "free"
                  ? "border-dashed border-border bg-muted/30"
                  : appt.status === "completed"
                  ? "border-border bg-card opacity-60"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-0.5" />
                    <p className="text-xs text-muted-foreground">{appt.time}</p>
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${appt.status === "free" ? "text-muted-foreground italic" : appt.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {appt.client}
                    </p>
                    {appt.service && <p className="text-xs text-muted-foreground truncate">{appt.service}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {appt.status === "completed" && (
                    <span className="text-xs text-success font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Done
                    </span>
                  )}
                  {(appt.status === "confirmed" || appt.status === "upcoming") && (
                    <button onClick={() => markCompleted(appt.id)} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
