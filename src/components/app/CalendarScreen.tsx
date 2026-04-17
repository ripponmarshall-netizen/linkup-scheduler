import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const startWeekday = 2;
  const events = sampleEvents[String(selectedDay)] || [];

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-4 animate-fade-up">
        <div className="flex items-center justify-between">
          <button className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors duration-150 active:scale-95">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground">{month}</h1>
          <button className="p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors duration-150 active:scale-95">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      <div className="px-5 grid grid-cols-7 gap-0.5 mb-1">
        {weekDays.map(d => (
          <div key={d} className="text-center text-[10px] text-muted-foreground py-1">{d}</div>
        ))}
      </div>

      <div className="px-5 grid grid-cols-7 gap-0.5 mb-6">
        {Array.from({ length: startWeekday }).map((_, i) => <div key={`e-${i}`} />)}
        {daysInMonth.map(day => {
          const hasEvents = sampleEvents[String(day)];
          const isSelected = day === selectedDay;
          const isToday = day === 14;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all duration-200 ${
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold shadow-md animate-pop-in"
                  : isToday
                    ? "text-primary font-semibold ring-1 ring-primary/30"
                    : "text-foreground hover:bg-secondary hover:scale-[1.05] active:scale-95"
              }`}
            >
              {day}
              {hasEvents && !isSelected && <div className="w-1 h-1 rounded-full bg-primary mt-0.5 transition-all duration-200" />}
            </button>
          );
        })}
      </div>

      <div className="px-5 mb-8">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          {selectedDay === 14 ? "Today" : `April ${selectedDay}`}
        </h2>
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center animate-fade-in">No appointments.</p>
        ) : (
          <div className="divide-y divide-border/40">
            {events.map((e, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="text-xs text-muted-foreground w-16 shrink-0 tabular-nums">{e.time}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
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
