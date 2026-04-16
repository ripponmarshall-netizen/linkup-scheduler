import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Who is LinkupOrganiser for?", a: "Solo service providers like barbers, hairstylists, nail techs, tutors, and beauty professionals who manage their own appointments." },
  { q: "Is it really free?", a: "Yes. The free plan includes your daily agenda, manual appointment entry, basic reminders, rescheduling, and client notes — no credit card required." },
  { q: "What does Pro add?", a: "Pro gives you a booking page so clients can book online, advanced reminders, and analytics to track your busiest days and most popular services." },
  { q: "Can I try Pro before paying?", a: "Yes. Pro comes with a 14-day free trial. No commitment, cancel anytime." },
  { q: "Does this work on my phone?", a: "Yes. LinkupOrganiser is built mobile-first. Use it right from your phone browser." },
  { q: "Can I use this for a team?", a: "LinkupOrganiser is designed for solo businesses — one owner, one calendar. Simple by design." },
];

export function FAQSection() {
  return (
    <section id="faq" className="px-5 py-16 bg-secondary/40">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-8">Common questions</h2>
        <Accordion type="single" collapsible className="space-y-1">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border px-0">
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
