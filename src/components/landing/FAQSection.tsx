import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Who is LinkupOrganiser for?", a: "Solo service providers like barbers, hairstylists, nail techs, tutors, and beauty professionals who manage their own appointments." },
  { q: "Is it really free?", a: "Yes. The free plan includes your daily agenda, manual appointment entry, basic reminders, rescheduling, and client notes — no credit card required." },
  { q: "What does Pro add?", a: "Pro gives you a booking page so clients can book online, advanced reminders, and analytics to track your busiest days and most popular services." },
  { q: "Can I try Pro before paying?", a: "Absolutely. Pro comes with a 14-day free trial. No commitment, cancel anytime." },
  { q: "Does this work on my phone?", a: "Yes. LinkupOrganiser is built mobile-first. Use it right from your phone browser — no app store download needed." },
  { q: "Can I use this for a team or multiple staff?", a: "LinkupOrganiser is designed for solo businesses — one owner, one calendar. It's simple by design." },
];

export function FAQSection() {
  return (
    <section id="faq" className="px-4 py-16 md:py-20 max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
