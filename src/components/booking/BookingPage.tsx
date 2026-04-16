import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft } from "lucide-react";

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
      <div className="px-5 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="p-1">
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-base font-semibold text-foreground">Marcus Cuts</h1>
            <p className="text-xs text-muted-foreground">Book an appointment</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 py-4">
        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-0.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        {step === 0 && (
          <div>
            <h2 className="text-sm font-medium text-foreground mb-4">Select a service</h2>
            <div className="space-y-px">
              {services.map(s => (
                <button
                  key={s.name}
                  onClick={() => { setSelectedService(s.name); setStep(1); }}
                  className="w-full flex items-center justify-between py-3.5 text-left hover:bg-secondary/50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.duration}</p>
                  </div>
                  <span className="text-sm text-foreground">{s.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-sm font-medium text-foreground mb-4">Pick a date</h2>
            <div className="flex gap-2 mb-6">
              {[14, 15, 16, 17, 18].map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`flex-1 py-3 rounded-lg text-center transition-colors ${
                    selectedDate === day ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  <span className="text-base font-semibold block">{day}</span>
                  <span className="text-[10px]">Apr</span>
                </button>
              ))}
            </div>

            {selectedDate && (
              <>
                <h2 className="text-sm font-medium text-foreground mb-3">Available times</h2>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => { setSelectedSlot(slot); setStep(2); }}
                      className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                        selectedSlot === slot ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
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
            <h2 className="text-sm font-medium text-foreground mb-4">Confirm booking</h2>
            <div className="space-y-2.5 text-sm mb-6">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{selectedService}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">April {selectedDate}, 2026</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selectedSlot}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-medium">{services.find(s => s.name === selectedService)?.price}</span></div>
            </div>
            <Button className="w-full" size="lg" onClick={() => setStep(3)}>
              Confirm booking
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Confirmed</h2>
            <p className="text-sm text-muted-foreground">{selectedService} · April {selectedDate} at {selectedSlot}</p>
          </div>
        )}
      </div>

      <div className="px-5 py-6 text-center">
        <p className="text-[10px] text-muted-foreground">
          Powered by Linkup<span className="text-primary">Organiser</span>
        </p>
      </div>
    </div>
  );
}
