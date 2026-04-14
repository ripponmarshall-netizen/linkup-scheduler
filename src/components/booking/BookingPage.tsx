import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Calendar, Clock } from "lucide-react";

const services = [
  { name: "Fade + Lineup", duration: "30 min", price: "1,500 JMD" },
  { name: "Full Cut", duration: "45 min", price: "2,000 JMD" },
  { name: "Full Cut + Beard", duration: "1 hour", price: "2,500 JMD" },
  { name: "Lineup Only", duration: "15 min", price: "800 JMD" },
  { name: "Braids", duration: "2 hours", price: "4,000 JMD" },
];

const availableSlots = ["9:00 AM", "9:30 AM", "10:30 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

export function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="p-1 rounded-lg hover:bg-secondary">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold text-foreground">Marcus Cuts</h1>
            <p className="text-xs text-muted-foreground">Book an appointment</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-6">
          {["Service", "Date & Time", "Confirm"].map((label, i) => (
            <div key={i} className="flex-1">
              <div className={`h-1 rounded-full mb-1 ${i <= step ? "bg-primary" : "bg-muted"}`} />
              <p className={`text-[10px] ${i <= step ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</p>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">Select a service</h2>
            <div className="space-y-2">
              {services.map(s => (
                <button
                  key={s.name}
                  onClick={() => { setSelectedService(s.name); setStep(1); }}
                  className={`w-full bg-card rounded-xl border px-4 py-3.5 text-left transition-all hover:shadow-sm ${
                    selectedService === s.name ? "border-primary" : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.duration}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{s.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">Pick a date</h2>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {[14, 15, 16, 17, 18].map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all ${
                    selectedDate === day ? "border-primary bg-accent" : "border-border bg-card"
                  }`}
                >
                  <span className="text-lg font-bold text-foreground">{day}</span>
                  <span className="text-[10px] text-muted-foreground">Apr</span>
                </button>
              ))}
            </div>

            {selectedDate && (
              <>
                <h2 className="text-base font-semibold text-foreground mb-3">Available times</h2>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => { setSelectedSlot(slot); setStep(2); }}
                      className={`h-10 rounded-lg border text-sm font-medium transition-all ${
                        selectedSlot === slot ? "border-primary bg-accent text-primary" : "border-border bg-card text-foreground hover:bg-secondary"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="bg-card rounded-xl border border-border p-5 mb-6">
              <h2 className="text-base font-semibold text-foreground mb-4">Confirm your booking</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium text-foreground">{selectedService}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">April {selectedDate}, 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium text-foreground">{selectedSlot}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium text-foreground">{services.find(s => s.name === selectedService)?.price}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => setStep(3)}
            >
              <Check className="w-4 h-4" />
              Confirm booking
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Booking confirmed</h2>
            <p className="text-sm text-muted-foreground mb-1">{selectedService} with Marcus Cuts</p>
            <p className="text-sm text-muted-foreground">April {selectedDate}, 2026 at {selectedSlot}</p>
            <p className="text-xs text-muted-foreground mt-6">You'll receive a confirmation reminder before your appointment.</p>
          </div>
        )}
      </div>

      <div className="px-4 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by <span className="font-medium text-foreground">Linkup<span className="text-primary">Organiser</span></span>
        </p>
      </div>
    </div>
  );
}
