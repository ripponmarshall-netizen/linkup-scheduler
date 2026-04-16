import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";

import { OnboardingStepWrapper } from "./OnboardingStepWrapper";
import { OtpInput } from "./OtpInput";

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
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    emailCode: "",
    phone: "",
    phoneCode: "",
    password: "",
    businessType: "",
    businessName: "",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] as string[],
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    duration: "30 min",
    reminders: true,
  });

  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneVerifying, setPhoneVerifying] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [codeSent, setCodeSent] = useState<"email" | "phone" | null>(null);

  const totalSteps = 12;
  const progress = ((step + 1) / totalSteps) * 100;

  const next = () => {
    setDirection(1);
    if (step < totalSteps - 1) setStep(step + 1);
    else onComplete();
  };
  const back = () => {
    setDirection(-1);
    if (step > 0) setStep(step - 1);
  };

  const toggleDay = (day: string) => {
    setData(d => ({
      ...d,
      workingDays: d.workingDays.includes(day)
        ? d.workingDays.filter(x => x !== day)
        : [...d.workingDays, day],
    }));
  };

  const simulateVerify = useCallback((type: "email" | "phone") => {
    const code = type === "email" ? data.emailCode : data.phoneCode;
    const setVerifying = type === "email" ? setEmailVerifying : setPhoneVerifying;
    const setVerified = type === "email" ? setEmailVerified : setPhoneVerified;
    const setError = type === "email" ? setEmailError : setPhoneError;

    setVerifying(true);
    setError(false);
    setTimeout(() => {
      setVerifying(false);
      if (code === "123456") {
        setVerified(true);
        setTimeout(() => next(), 600);
      } else {
        setError(true);
      }
    }, 1200);
  }, [data.emailCode, data.phoneCode, step]);

  const sendCode = (type: "email" | "phone") => {
    setCodeSent(type);
    setTimeout(() => setCodeSent(null), 3000);
  };

  const canContinue = () => {
    switch (step) {
      case 0: return true; // welcome
      case 1: return data.fullName.trim().length > 0;
      case 2: return data.email.includes("@");
      case 3: return data.emailCode.length === 6;
      case 4: return data.phone.length >= 7;
      case 5: return data.phoneCode.length === 6;
      case 6: return data.businessType.length > 0;
      case 7: return data.businessName.trim().length > 0;
      case 8: return data.workingDays.length > 0;
      case 9: return true;
      case 10: return true;
      case 11: return true;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <Link to="/" className="text-base font-bold text-foreground tracking-tight">
          Linkup<span className="text-primary">Organiser</span>
        </Link>
        <span className="text-xs text-muted-foreground tabular-nums">{step + 1}/{totalSteps}</span>
      </div>

      {/* Progress bar */}
      <div className="px-5">
        <div className="h-0.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div className="w-full max-w-sm">
          {/* Step 0: Welcome */}
          <OnboardingStepWrapper key={step} direction={direction}>
            {step === 0 && (
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                  Welcome to LinkupOrganiser
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Set up your scheduling assistant in under 2 minutes.
                </p>
              </div>
            )}

            {/* Step 1: Full name */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">What's your name?</h1>
                  <p className="text-sm text-muted-foreground mt-1">This appears on your profile.</p>
                </div>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={e => setData(d => ({ ...d, fullName: e.target.value }))}
                  className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Full name"
                  autoFocus
                />
              </div>
            )}

            {/* Step 2: Email */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Your email address</h1>
                  <p className="text-sm text-muted-foreground mt-1">We'll send a verification code.</p>
                </div>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData(d => ({ ...d, email: e.target.value }))}
                  className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="you@example.com"
                  autoFocus
                />
              </div>
            )}

            {/* Step 3: Email OTP */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Verify your email</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter the 6-digit code sent to {data.email || "your email"}
                  </p>
                </div>
                {emailVerified ? (
                  <div className="flex flex-col items-center py-4 animate-check">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm text-primary mt-3 font-medium">Email verified</p>
                  </div>
                ) : (
                  <>
                    <OtpInput
                      value={data.emailCode}
                      onChange={v => { setData(d => ({ ...d, emailCode: v })); setEmailError(false); }}
                      error={emailError}
                    />
                    {emailError && (
                      <p className="text-xs text-destructive text-center animate-shake">
                        Incorrect code. Please try again.
                      </p>
                    )}
                    <div className="text-center">
                      <button
                        onClick={() => sendCode("email")}
                        className="text-xs text-primary font-medium transition-opacity hover:opacity-80"
                      >
                        {codeSent === "email" ? "Code sent ✓" : "Resend code"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 4: Phone */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Your phone number</h1>
                  <p className="text-sm text-muted-foreground mt-1">We'll send a verification code via SMS.</p>
                </div>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
                  className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="+1 876 555 0100"
                  autoFocus
                />
              </div>
            )}

            {/* Step 5: Phone OTP */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Verify your phone</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter the 6-digit code sent to {data.phone || "your phone"}
                  </p>
                </div>
                {phoneVerified ? (
                  <div className="flex flex-col items-center py-4 animate-check">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm text-primary mt-3 font-medium">Phone verified</p>
                  </div>
                ) : (
                  <>
                    <OtpInput
                      value={data.phoneCode}
                      onChange={v => { setData(d => ({ ...d, phoneCode: v })); setPhoneError(false); }}
                      error={phoneError}
                    />
                    {phoneError && (
                      <p className="text-xs text-destructive text-center animate-shake">
                        Incorrect code. Please try again.
                      </p>
                    )}
                    <div className="text-center">
                      <button
                        onClick={() => sendCode("phone")}
                        className="text-xs text-primary font-medium transition-opacity hover:opacity-80"
                      >
                        {codeSent === "phone" ? "Code sent ✓" : "Resend code"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 6: Business type */}
            {step === 6 && (
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
                      className={`h-12 rounded-lg text-sm font-medium transition-all duration-200 ${
                        data.businessType === type
                          ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                          : "bg-secondary text-foreground hover:bg-muted active:scale-[0.98]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Business name */}
            {step === 7 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Business name</h1>
                  <p className="text-sm text-muted-foreground mt-1">Appears on your booking page.</p>
                </div>
                <input
                  type="text"
                  value={data.businessName}
                  onChange={e => setData(d => ({ ...d, businessName: e.target.value }))}
                  className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="e.g. Marcus Cuts"
                  autoFocus
                />
              </div>
            )}

            {/* Step 8: Working days & hours */}
            {step === 8 && (
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
                      className={`flex-1 h-11 rounded-lg text-xs font-medium transition-all duration-200 ${
                        data.workingDays.includes(day)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-secondary text-muted-foreground active:scale-[0.95]"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Start</label>
                    <select
                      value={data.startTime}
                      onChange={e => setData(d => ({ ...d, startTime: e.target.value }))}
                      className="w-full h-12 rounded-lg border border-input bg-card px-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">End</label>
                    <select
                      value={data.endTime}
                      onChange={e => setData(d => ({ ...d, endTime: e.target.value }))}
                      className="w-full h-12 rounded-lg border border-input bg-card px-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {["3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: Duration */}
            {step === 9 && (
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
                      className={`h-12 rounded-lg text-sm font-medium transition-all duration-200 ${
                        data.duration === dur
                          ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                          : "bg-secondary text-foreground hover:bg-muted active:scale-[0.98]"
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 10: Reminders */}
            {step === 10 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Reminders</h1>
                  <p className="text-sm text-muted-foreground mt-1">Get notified before each appointment.</p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setData(d => ({ ...d, reminders: true }))}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                      data.reminders
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-foreground active:scale-[0.98]"
                    }`}
                  >
                    <p className="text-sm font-medium">Send me reminders</p>
                    <p className="text-xs opacity-70 mt-0.5">1 hour before each appointment</p>
                  </button>
                  <button
                    onClick={() => setData(d => ({ ...d, reminders: false }))}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                      !data.reminders
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-foreground active:scale-[0.98]"
                    }`}
                  >
                    <p className="text-sm font-medium">No reminders</p>
                    <p className="text-xs opacity-70 mt-0.5">Turn on later in Settings</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 11: Complete */}
            {step === 11 && (
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto animate-check">
                  <Check className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">You're all set</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {data.businessName ? `${data.businessName} is` : "Your account is"} ready.
                  </p>
                </div>
              </div>
            )}
          </OnboardingStepWrapper>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 flex items-center gap-3 safe-bottom">
        {step > 0 && (
          <Button variant="ghost" size="lg" onClick={back} className="shrink-0 transition-all duration-200 active:scale-95">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        {step === 3 && !emailVerified ? (
          <Button
            className="flex-1 transition-all duration-200 active:scale-[0.98]"
            size="lg"
            disabled={!canContinue() || emailVerifying}
            onClick={() => simulateVerify("email")}
          >
            {emailVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify email"}
          </Button>
        ) : step === 5 && !phoneVerified ? (
          <Button
            className="flex-1 transition-all duration-200 active:scale-[0.98]"
            size="lg"
            disabled={!canContinue() || phoneVerifying}
            onClick={() => simulateVerify("phone")}
          >
            {phoneVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify phone"}
          </Button>
        ) : (
          <Button
            className="flex-1 transition-all duration-200 active:scale-[0.98]"
            size="lg"
            onClick={next}
            disabled={!canContinue()}
          >
            {step === 11 ? "Go to your schedule" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
