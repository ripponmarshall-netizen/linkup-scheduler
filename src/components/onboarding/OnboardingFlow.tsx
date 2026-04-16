import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const businessTypes = [
  "Barber", "Hairstylist", "Nail technician", "Makeup artist",
  "Tutor", "Personal trainer", "Massage therapist", "Other",
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const durations = ["15 min", "30 min", "45 min", "1 hour", "1.5 hours", "2 hours"];

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    email: "",
    password: "",
    businessType: "",
    businessName: "",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] as string[],
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    duration: "30 min",
    reminders: true,
  });

  const totalSteps = 7;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else onComplete();
  };
  const back = () => { if (step > 0) setStep(step - 1); };

  const toggleDay = (day: string) => {
    setData(d => ({
      ...d,
      workingDays: d.workingDays.includes(day)
        ? d.workingDays.filter(x => x !== day)
        : [...d.workingDays, day],
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-5 py-4 flex items-center justify-between">
        <Link to="/" className="text-base font-bold text-foreground tracking-tight">
          Linkup<span className="text-primary">Organiser</span>
        </Link>
        <span className="text-xs text-muted-foreground">{step + 1}/{totalSteps}</span>
      </div>

      <div className="px-5">
        <div className="h-0.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-sm">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Create your account</h1>
                <p className="text-sm text-muted-foreground mt-1">Get started in under 2 minutes.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Email</label>
                  <input type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Password</label>
                  <input type="password" value={data.password} onChange={e => setData(d => ({ ...d, password: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Create a password" />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">What type of business?</h1>
                <p className="text-sm text-muted-foreground mt-1">Helps us set things up for you.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {businessTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setData(d => ({ ...d, businessType: type }))}
                    className={`h-11 rounded-lg text-sm font-medium transition-colors ${data.businessType === type ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Business name</h1>
                <p className="text-sm text-muted-foreground mt-1">Appears on your booking page.</p>
              </div>
              <input type="text" value={data.businessName} onChange={e => setData(d => ({ ...d, businessName: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Marcus Cuts" />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Working days & hours</h1>
                <p className="text-sm text-muted-foreground mt-1">Select the days you're available.</p>
              </div>
              <div className="flex gap-1.5">
                {daysOfWeek.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`flex-1 h-10 rounded-lg text-xs font-medium transition-colors ${data.workingDays.includes(day) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">Start</label>
                  <select value={data.startTime} onChange={e => setData(d => ({ ...d, startTime: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm">
                    {["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">End</label>
                  <select value={data.endTime} onChange={e => setData(d => ({ ...d, endTime: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm">
                    {["3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Default appointment length</h1>
                <p className="text-sm text-muted-foreground mt-1">You can change this later.</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {durations.map(dur => (
                  <button
                    key={dur}
                    onClick={() => setData(d => ({ ...d, duration: dur }))}
                    className={`h-11 rounded-lg text-sm font-medium transition-colors ${data.duration === dur ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Reminders</h1>
                <p className="text-sm text-muted-foreground mt-1">Get notified before each appointment.</p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setData(d => ({ ...d, reminders: true }))}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${data.reminders ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}
                >
                  <p className="text-sm font-medium">Send me reminders</p>
                  <p className="text-xs opacity-70 mt-0.5">1 hour before each appointment</p>
                </button>
                <button
                  onClick={() => setData(d => ({ ...d, reminders: false }))}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${!data.reminders ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}
                >
                  <p className="text-sm font-medium">No reminders</p>
                  <p className="text-xs opacity-70 mt-0.5">Turn on later in Settings</p>
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">You're all set</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {data.businessName ? `${data.businessName} is` : "Your account is"} ready.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-4 flex items-center gap-3 safe-bottom">
        {step > 0 && (
          <Button variant="ghost" size="lg" onClick={back} className="shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        <Button className="flex-1" size="lg" onClick={next}>
          {step === 6 ? "Go to your schedule" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
