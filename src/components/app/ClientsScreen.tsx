import { useState } from "react";
import { Search, X, Phone, Clock } from "lucide-react";

const sampleClients = [
  { id: 1, name: "Marcus Brown", phone: "876-555-0101", lastVisit: "14 Apr 2026", visits: 12, notes: "Regular client. Prefers skin fade, always on time." },
  { id: 2, name: "Andre Williams", phone: "876-555-0102", lastVisit: "14 Apr 2026", visits: 8, notes: "" },
  { id: 3, name: "Keisha Taylor", phone: "876-555-0103", lastVisit: "12 Apr 2026", visits: 5, notes: "Medium box braids, shoulder length." },
  { id: 4, name: "Dwayne Carter", phone: "876-555-0104", lastVisit: "10 Apr 2026", visits: 3, notes: "First-time in March, likes full cut + beard." },
  { id: 5, name: "Tanya Mitchell", phone: "876-555-0105", lastVisit: "7 Apr 2026", visits: 1, notes: "New client, referred by Marcus." },
  { id: 6, name: "Ryan Thompson", phone: "876-555-0106", lastVisit: "5 Apr 2026", visits: 6, notes: "" },
  { id: 7, name: "Michelle Lewis", phone: "876-555-0107", lastVisit: "3 Apr 2026", visits: 4, notes: "Braids, usually 2-hour appointment." },
];

export function ClientsScreen() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = sampleClients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const selected = sampleClients.find(c => c.id === selectedId);

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground mb-4">Clients</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 rounded-lg border border-input bg-card pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Search clients..."
          />
        </div>
      </div>

      <div className="px-4 space-y-2 mb-8">
        {filtered.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">No clients found.</p>
          </div>
        ) : (
          filtered.map(client => (
            <button
              key={client.id}
              onClick={() => setSelectedId(client.id)}
              className="w-full bg-card rounded-xl border border-border px-4 py-3 text-left hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.visits} visits · Last: {client.lastVisit}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-primary">{client.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{selected.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">{selected.name}</h2>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" /> {selected.phone}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedId(null)} className="p-1 rounded-lg hover:bg-secondary">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total visits</span>
                <span className="text-sm font-medium text-foreground">{selected.visits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last visit</span>
                <span className="text-sm font-medium text-foreground">{selected.lastVisit}</span>
              </div>
              {selected.notes && (
                <div>
                  <span className="text-sm text-muted-foreground">Notes</span>
                  <p className="text-sm text-foreground mt-1">{selected.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Recent appointments
              </h3>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground flex justify-between py-1.5">
                  <span>Fade + Lineup</span><span>14 Apr · 9:00 AM</span>
                </div>
                <div className="text-xs text-muted-foreground flex justify-between py-1.5">
                  <span>Full Cut</span><span>7 Apr · 10:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
