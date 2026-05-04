// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { STEPS } from "@/config/training";
import { markOnboardingDone } from "@/features/auth";
import { useTrainingConfigStore } from "@/features/training";
import { useShallow } from "zustand/react/shallow";
import { WizardFooterView } from "./wizard-footer.view";

export function WizardFooter({
  returnTo,
  onBackToSplash,
}: {
  returnTo: string;
  onBackToSplash: () => void;
}) {
  const { currentStep, prevStep, nextStep, canProceed } = useTrainingConfigStore(
    useShallow((s) => ({
      currentStep: s.currentStep,
      prevStep: s.prevStep,
      nextStep: s.nextStep,
      canProceed: s.canProceed(),
    })),
  );
  const isFirst = currentStep === 1;
  const isLast = currentStep === STEPS.length;

  const handleFinish = () => {
    markOnboardingDone();
    window.location.assign(returnTo);
  };

  const handleSkip = () => {
    markOnboardingDone();
    window.location.assign(returnTo);
  };

  const handleContinue = () => {
    if (currentStep === 1 && sessionStorage.getItem("unsloth_chat_only") === "1") {
      sessionStorage.removeItem("unsloth_chat_only");
      markOnboardingDone();
      window.location.assign("/chat");
    } else {
      nextStep();
    }
  };

  return (
    <WizardFooterView
      isFirst={isFirst}
      isLast={isLast}
      canProceed={canProceed}
      onBack={isFirst ? onBackToSplash : prevStep}
      onSkip={handleSkip}
      onContinue={handleContinue}
      onFinish={handleFinish}
    />
  );
}
