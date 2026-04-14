import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const sampleEvents: Record<string, { time: string; client: string; service: string }[]> = {
  "14": [
    { time: "9:00 AM", client: "Marcus Brown", service: "Fade + Lineup" },
    { time: "10:00 AM", client: "Andre Williams", service: "Full Cut" },
    { time: "12:00 PM", client: "Keisha Taylor", service: "Braids Retouch" },
    { time: "2:00 PM", client: "Dwayne Carter", service: "Full Cut + Beard" },
    { time: "4:00 PM", client: "Tanya Mitchell", service: "Lineup" },
  ],
  "15": [
    { time: "9:30 AM", client: "Ryan Thompson", service: "Fade" },
    { time: "11:00 AM", client: "Michelle Lewis", service: "Braids" },
  ],
  "16": [
    { time: "10:00 AM", client: "Jason Clarke", service: "Full Cut" },
  ],
};

export function CalendarScreen() {
  const [selectedDay, setSelectedDay] = useState(14);
  const month = "April 2026";

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const startWeekday = 2; // April 2026 starts on Wednesday (index 2)

  const events = sampleEvents[String(selectedDay)] || [];

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-lg hover:bg-secondary"><ChevronLeft className="w-5 h-5 text-foreground" /></button>
          <h1 className="text-lg font-bold text-foreground">{month}</h1>
          <button className="p-2 rounded-lg hover:bg-secondary"><ChevronRight className="w-5 h-5 text-foreground" /></button>
        </div>
      </div>

      {/* Week header */}
      <div className="px-4 grid grid-cols-7 gap-1 mb-1">
        {weekDays.map(d => (
          <div key={d} className="text-center text-[10px] font-medium text-muted-foreground py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="px-4 grid grid-cols-7 gap-1 mb-6">
        {Array.from({ length: startWeekday }).map((_, i) => <div key={`e-${i}`} />)}
        {daysInMonth.map(day => {
          const hasEvents = sampleEvents[String(day)];
          const isSelected = day === selectedDay;
          const isToday = day === 14;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all ${
                isSelected ? "bg-primary text-primary-foreground" : isToday ? "bg-accent text-primary" : "text-foreground hover:bg-secondary"
              }`}
            >
              {day}
              {hasEvents && !isSelected && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
            </button>
          );
        })}
      </div>

      {/* Events for selected day */}
      <div className="px-4 mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-3">
          {selectedDay === 14 ? "Today" : `April ${selectedDay}`}
        </h2>
        {events.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-muted-foreground">No appointments this day.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {events.map((e, i) => (
              <div key={i} className="bg-card rounded-xl border border-border px-4 py-3 flex items-center gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground w-16">{e.time}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{e.client}</p>
                  <p className="text-xs text-muted-foreground truncate">{e.service}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
