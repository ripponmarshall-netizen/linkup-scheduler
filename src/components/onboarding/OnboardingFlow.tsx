import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Briefcase, Clock, Bell, Calendar } from "lucide-react";

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
      <div className="px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold text-foreground">
          Linkup<span className="text-primary">Organiser</span>
        </Link>
        <span className="text-xs text-muted-foreground">{step + 1} of {totalSteps}</span>
      </div>

      {/* Progress bar */}
      <div className="px-4">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
                <p className="text-sm text-muted-foreground mt-1">Get started in under 2 minutes.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                  <input type="password" value={data.password} onChange={e => setData(d => ({ ...d, password: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Create a password" />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">What type of business?</h1>
                <p className="text-sm text-muted-foreground mt-1">This helps us set up your account.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {businessTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setData(d => ({ ...d, businessType: type }))}
                    className={`h-12 rounded-lg border text-sm font-medium transition-all ${data.businessType === type ? "border-primary bg-accent text-primary" : "border-border bg-card text-foreground hover:bg-secondary"}`}
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
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Your business name</h1>
                <p className="text-sm text-muted-foreground mt-1">This will appear on your booking page.</p>
              </div>
              <input type="text" value={data.businessName} onChange={e => setData(d => ({ ...d, businessName: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Marcus Cuts" />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Your working days</h1>
                <p className="text-sm text-muted-foreground mt-1">Select the days you're available.</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {daysOfWeek.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-12 h-12 rounded-lg border text-sm font-medium transition-all ${data.workingDays.includes(day) ? "border-primary bg-accent text-primary" : "border-border bg-card text-muted-foreground"}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Start time</label>
                  <select value={data.startTime} onChange={e => setData(d => ({ ...d, startTime: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    {["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">End time</label>
                  <select value={data.endTime} onChange={e => setData(d => ({ ...d, endTime: e.target.value }))} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    {["3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Default appointment length</h1>
                <p className="text-sm text-muted-foreground mt-1">You can change this for individual appointments later.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {durations.map(dur => (
                  <button
                    key={dur}
                    onClick={() => setData(d => ({ ...d, duration: dur }))}
                    className={`h-12 rounded-lg border text-sm font-medium transition-all ${data.duration === dur ? "border-primary bg-accent text-primary" : "border-border bg-card text-foreground hover:bg-secondary"}`}
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
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Reminder preferences</h1>
                <p className="text-sm text-muted-foreground mt-1">Get notified before each appointment.</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setData(d => ({ ...d, reminders: true }))}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${data.reminders ? "border-primary bg-accent" : "border-border bg-card"}`}
                >
                  <p className="text-sm font-medium text-foreground">Send me reminders</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Get a reminder 1 hour before each appointment</p>
                </button>
                <button
                  onClick={() => setData(d => ({ ...d, reminders: false }))}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${!data.reminders ? "border-primary bg-accent" : "border-border bg-card"}`}
                >
                  <p className="text-sm font-medium text-foreground">No reminders for now</p>
                  <p className="text-xs text-muted-foreground mt-0.5">You can turn them on later in Settings</p>
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">You're all set</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  {data.businessName ? `${data.businessName} is` : "Your account is"} ready to go. Let's see your schedule.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-4 py-4 border-t border-border flex items-center gap-3 safe-bottom">
        {step > 0 && (
          <Button variant="ghost" size="lg" onClick={back} className="shrink-0">
            <ArrowLeft className="w-4 h-4" />
            Back
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
