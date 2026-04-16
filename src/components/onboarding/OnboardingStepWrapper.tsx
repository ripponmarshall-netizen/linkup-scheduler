import { type ReactNode } from "react";

interface OnboardingStepWrapperProps {
  children: ReactNode;
  direction: 1 | -1;
}

export function OnboardingStepWrapper({ children, direction }: OnboardingStepWrapperProps) {
  return (
    <div className="animate-fade-up">
      {children}
    </div>
  );
}
