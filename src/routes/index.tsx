import { createFileRoute } from "@tanstack/react-router";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeelSeenStrip } from "@/components/landing/FeelSeenStrip";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { DayInLifeSection } from "@/components/landing/DayInLifeSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { ProUnlockSection } from "@/components/landing/ProUnlockSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LinkupOrganiser — Booking app for Caribbean nail techs & stylists" },
      { name: "description", content: "Stop losing clients in your DMs. LinkupOrganiser is the booking brain for nail techs and hair stylists across Jamaica and the Caribbean. One link, one schedule, one calm day." },
      { property: "og:title", content: "LinkupOrganiser — Booking app for Caribbean nail techs & stylists" },
      { property: "og:description", content: "One booking link for nail techs, stylists, and beauty pros across Jamaica and the Caribbean. Auto reminders, deposits, and a calm phone." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <FeelSeenStrip />
      <BeforeAfterSection />
      <BenefitsSection />
      <DayInLifeSection />
      <TestimonialsSection />
      <PricingSection />
      <ProUnlockSection />
      <FAQSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}
