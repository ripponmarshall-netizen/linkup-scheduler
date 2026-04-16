import { useState } from "react";
import { Search, X } from "lucide-react";

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
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-lg font-semibold text-foreground mb-4">Clients</h1>
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

      <div className="px-5 mb-8">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No clients found.</p>
        ) : (
          <div className="space-y-px">
            {filtered.map(client => (
              <button
                key={client.id}
                onClick={() => setSelectedId(client.id)}
                className="w-full flex items-center justify-between py-3 text-left hover:bg-secondary/50 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.visits} visits</p>
                </div>
                <span className="text-xs text-muted-foreground">{client.lastVisit}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/15 flex items-end justify-center" onClick={() => setSelectedId(null)}>
          <div className="bg-card w-full max-w-lg rounded-t-2xl p-5 safe-bottom" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">{selected.name}</h2>
              <button onClick={() => setSelectedId(null)} className="p-1">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium">{selected.phone}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Visits</span><span className="font-medium">{selected.visits}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last visit</span><span className="font-medium">{selected.lastVisit}</span></div>
              {selected.notes && <div className="pt-2"><p className="text-xs text-muted-foreground leading-relaxed">{selected.notes}</p></div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
