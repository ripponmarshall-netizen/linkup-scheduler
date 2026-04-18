import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, Link2, Lock, Copy, Check } from "lucide-react";

type AppointmentStatus = "upcoming" | "completed" | "cancelled";

const allAppointments = [
  { id: 1, client: "Marcus Brown", service: "Fade + Lineup", date: "14 Apr", time: "9:00 AM", status: "completed" as AppointmentStatus, notes: "Regular client, skin fade." },
  { id: 2, client: "Andre Williams", service: "Full Cut", date: "14 Apr", time: "10:00 AM", status: "completed" as AppointmentStatus, notes: "" },
  { id: 3, client: "Keisha Taylor", service: "Braids Retouch", date: "14 Apr", time: "12:00 PM", status: "upcoming" as AppointmentStatus, notes: "Medium box braids" },
  { id: 4, client: "Dwayne Carter", service: "Full Cut + Beard", date: "14 Apr", time: "2:00 PM", status: "upcoming" as AppointmentStatus, notes: "" },
  { id: 5, client: "Tanya Mitchell", service: "Lineup", date: "14 Apr", time: "4:00 PM", status: "upcoming" as AppointmentStatus, notes: "First time client" },
  { id: 6, client: "Ryan Thompson", service: "Fade", date: "15 Apr", time: "9:30 AM", status: "upcoming" as AppointmentStatus, notes: "" },
  { id: 7, client: "Michelle Lewis", service: "Braids", date: "15 Apr", time: "11:00 AM", status: "upcoming" as AppointmentStatus, notes: "" },
  { id: 8, client: "Jason Clarke", service: "Full Cut", date: "13 Apr", time: "10:00 AM", status: "cancelled" as AppointmentStatus, notes: "Client cancelled morning of" },
];

const tabs: { label: string; value: AppointmentStatus }[] = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<AppointmentStatus>("upcoming");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = allAppointments.filter(a => a.status === activeTab);
  const selected = allAppointments.find(a => a.id === selectedId);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-4 animate-fade-up">
        <h1 className="text-lg font-semibold text-foreground">Appointments</h1>
      </div>

      <div className="px-5 flex gap-1 mb-5">
        {tabs.map(tab => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm animate-tab-bounce"
                  : "text-muted-foreground hover:bg-secondary hover:scale-[1.03] active:scale-[0.97]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="px-5 mb-8">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center animate-fade-in">No appointments.</p>
        ) : (
          <div className="divide-y divide-border/40">
            {filtered.map((appt, idx) => {
              const dotColor =
                appt.status === "completed" ? "bg-success" :
                appt.status === "cancelled" ? "bg-destructive/70" :
                "bg-primary";
              return (
                <button
                  key={appt.id}
                  onClick={() => setSelectedId(appt.id)}
                  className={`w-full flex items-center justify-between py-3.5 text-left -mx-2 px-2 rounded-lg transition-all duration-200 animate-fade-up active:scale-[0.99] ${
                    selectedId === appt.id ? "bg-accent/60" : "hover:bg-secondary/40"
                  }`}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{appt.client}</p>
                      <p className="text-xs text-muted-foreground">{appt.service}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-xs text-foreground font-medium">{appt.date}</p>
                    <p className="text-xs text-muted-foreground">{appt.time}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/10 backdrop-blur-[2px] flex items-end justify-center animate-fade-in" onClick={() => setSelectedId(null)}>
          <div className="bg-card w-full max-w-lg rounded-t-2xl p-5 safe-bottom shadow-lg animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-8 h-1 rounded-full bg-muted mx-auto mb-4" />
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-foreground">{selected.client}</h2>
              <button onClick={() => setSelectedId(null)} className="p-1 transition-all duration-150 active:scale-90">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selected.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{selected.date}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selected.time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`font-medium capitalize ${selected.status === "cancelled" ? "text-destructive" : ""}`}>{selected.status}</span></div>
              {selected.notes && <div className="pt-1"><p className="text-xs text-muted-foreground">{selected.notes}</p></div>}
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
