import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  return <OnboardingFlow onComplete={() => navigate({ to: "/app/today" })} />;
}
