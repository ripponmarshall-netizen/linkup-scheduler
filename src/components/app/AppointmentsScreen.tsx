import { useState } from "react";
import { X } from "lucide-react";

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
  { label: "Upcoming", value: "upcoming" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<AppointmentStatus | "all">("upcoming");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = activeTab === "all" ? allAppointments : allAppointments.filter(a => a.status === activeTab);
  const selected = allAppointments.find(a => a.id === selectedId);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-lg font-semibold text-foreground">Appointments</h1>
      </div>

      <div className="px-5 flex gap-1 mb-5">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeTab === tab.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-5 mb-8">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No appointments.</p>
        ) : (
          <div className="space-y-px">
            {filtered.map(appt => (
              <button
                key={appt.id}
                onClick={() => setSelectedId(appt.id)}
                className="w-full flex items-center justify-between py-3 text-left hover:bg-secondary/50 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{appt.client}</p>
                  <p className="text-xs text-muted-foreground">{appt.service}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-xs text-muted-foreground">{appt.date}</p>
                  <p className="text-xs text-muted-foreground">{appt.time}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/15 flex items-end justify-center" onClick={() => setSelectedId(null)}>
          <div className="bg-card w-full max-w-lg rounded-t-2xl p-5 safe-bottom" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-foreground">Details</h2>
              <button onClick={() => setSelectedId(null)} className="p-1">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Client</span><span className="font-medium">{selected.client}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selected.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{selected.date}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selected.time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`font-medium ${selected.status === "cancelled" ? "text-destructive" : ""}`}>{selected.status}</span></div>
              {selected.notes && <div className="pt-1"><p className="text-xs text-muted-foreground">{selected.notes}</p></div>}
            </div>
            <div className="mt-5 flex gap-2">
              <button className="flex-1 h-9 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">Reschedule</button>
              <button className="flex-1 h-9 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">Edit</button>
              <button className="flex-1 h-9 rounded-lg text-destructive text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
