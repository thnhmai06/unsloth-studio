// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { STEPS } from "@/config/training";
import { useTrainingConfigStore } from "@/features/training";
import type { StepNumber } from "@/types/training";
import { DatasetStep } from "./steps/dataset-step";
import { HyperparametersStep } from "./steps/hyperparameters-step";
import { ModelSelectionStep } from "./steps/model-selection-step";
import { ModelTypeStep } from "./steps/model-type-step";
import { SummaryStep } from "./steps/summary-step";
import { WizardContentView } from "./wizard-content.view";

const STEP_COMPONENTS = {
  1: ModelTypeStep,
  2: ModelSelectionStep,
  3: DatasetStep,
  4: HyperparametersStep,
  5: SummaryStep,
} as const;

const STEP_MASCOTS: Record<StepNumber, string> = {
  1: "/Sloth emojis/large sloth wave.png",
  2: "/Sloth emojis/sloth magnify final.png",
  3: "/Sloth emojis/sloth huglove large.png",
  4: "/Sloth emojis/large sloth glasses.png",
  5: "/Sloth emojis/large sloth yay.png",
};

export function WizardContent() {
  const currentStep = useTrainingConfigStore((s) => s.currentStep);
  const stepConfig = STEPS[currentStep - 1];
  const StepComponent = STEP_COMPONENTS[currentStep];
  const mascotSrc = STEP_MASCOTS[currentStep];

  return (
    <WizardContentView
      title={stepConfig.title}
      description={stepConfig.description}
      mascotSrc={mascotSrc}
      currentStep={currentStep}
      totalSteps={STEPS.length}
      stepComponent={<StepComponent />}
    />
  );
}
