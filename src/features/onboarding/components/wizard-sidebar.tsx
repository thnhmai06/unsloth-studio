// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { STEPS } from "@/config/training";
import { markOnboardingDone } from "@/features/auth";
import { useTrainingConfigStore } from "@/features/training";
import { WizardStepItem } from "./wizard-step-item";
import { WizardSidebarView } from "./wizard-sidebar.view";

export function WizardSidebar({ returnTo }: { returnTo: string }) {
  const currentStep = useTrainingConfigStore((s) => s.currentStep);
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const handleSkip = () => {
    markOnboardingDone();
    window.location.assign(returnTo);
  };

  return (
    <WizardSidebarView
      progress={progress}
      currentStep={currentStep}
      totalSteps={STEPS.length}
      onSkip={handleSkip}
      stepItems={STEPS.map((step) => (
        <WizardStepItem key={step.number} step={step} />
      ))}
    />
  );
}
