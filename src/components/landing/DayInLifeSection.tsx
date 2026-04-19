const moments = [
  { time: "7:00 AM", text: "You open the app. Six clients today, two deposits already paid overnight while you slept." },
  { time: "10:30 AM", text: "A client tries to book your 2 PM. It's taken, so the app offers her Thursday instead. You didn't lift a finger." },
  { time: "1:45 PM", text: "Your 2 PM gets an auto reminder: \"Pull up in 15.\" She walks in on time." },
  { time: "6:00 PM", text: "Last client done. Your app shows you made more this week than last — and nobody no-showed." },
];

export function DayInLifeSection() {
  return (
    <section className="px-5 py-16 bg-secondary/40">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-10">
          A day in your life on LinkupOrganiser
        </h2>
        <ol className="relative border-l border-border ml-3 space-y-6">
          {moments.map((m, i) => (
            <li
              key={i}
              className="pl-5 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
              <p className="text-xs font-semibold text-primary tracking-wide">{m.time}</p>
              <p className="text-sm text-foreground/90 mt-1 leading-relaxed">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
