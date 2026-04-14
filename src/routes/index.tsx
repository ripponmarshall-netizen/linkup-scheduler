import { createFileRoute } from "@tanstack/react-router";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LinkupOrganiser — One place for all your appointments" },
      { name: "description", content: "Personal scheduling assistant for solo business owners in Jamaica and the Caribbean. Manage appointments, send reminders, and accept bookings online." },
      { property: "og:title", content: "LinkupOrganiser — One place for all your appointments" },
      { property: "og:description", content: "Personal scheduling assistant for solo business owners in Jamaica and the Caribbean." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}
