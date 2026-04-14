import { useState } from "react";
import { Clock, MoreVertical, X } from "lucide-react";

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

const tabs: { label: string; value: AppointmentStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<AppointmentStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = activeTab === "all" ? allAppointments : allAppointments.filter(a => a.status === activeTab);
  const selected = allAppointments.find(a => a.id === selectedId);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Appointments</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 mb-4 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 space-y-2 mb-8">
        {filtered.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">No appointments found.</p>
          </div>
        ) : (
          filtered.map(appt => (
            <button
              key={appt.id}
              onClick={() => setSelectedId(appt.id)}
              className="w-full bg-card rounded-xl border border-border px-4 py-3 text-left hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{appt.client}</p>
                  <p className="text-xs text-muted-foreground">{appt.service}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-xs text-muted-foreground">{appt.date}</p>
                  <p className="text-xs text-muted-foreground">{appt.time}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  appt.status === "upcoming" ? "bg-accent text-primary" :
                  appt.status === "completed" ? "bg-muted text-muted-foreground" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                </span>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Detail sheet */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/20 flex items-end justify-center" onClick={() => setSelectedId(null)}>
          <div className="bg-card w-full max-w-lg rounded-t-2xl border-t border-border p-6 safe-bottom" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Appointment details</h2>
              <button onClick={() => setSelectedId(null)} className="p-1 rounded-lg hover:bg-secondary">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Client</span>
                <span className="text-sm font-medium text-foreground">{selected.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Service</span>
                <span className="text-sm font-medium text-foreground">{selected.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="text-sm font-medium text-foreground">{selected.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="text-sm font-medium text-foreground">{selected.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={`text-sm font-medium ${selected.status === "cancelled" ? "text-destructive" : "text-foreground"}`}>{selected.status}</span>
              </div>
              {selected.notes && (
                <div>
                  <span className="text-sm text-muted-foreground">Notes</span>
                  <p className="text-sm text-foreground mt-1">{selected.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">Reschedule</button>
              <button className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">Edit</button>
              <button className="flex-1 h-10 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
