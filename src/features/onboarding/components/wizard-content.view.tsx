// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import type { ReactElement, ReactNode } from "react";

export interface WizardContentViewProps {
  title: string;
  description: string;
  mascotSrc: string;
  currentStep: number;
  totalSteps: number;
  stepComponent: ReactNode;
}

export const MOCK_WIZARD_CONTENT_VIEW_PROPS: WizardContentViewProps = {
  title: "Choose your path",
  description: "Select the model type you want to train.",
  mascotSrc: "/Sloth emojis/large sloth wave.png",
  currentStep: 1,
  totalSteps: 5,
  stepComponent: <div>Step Component Placeholder</div>,
};

export function WizardContentView({
  title,
  description,
  mascotSrc,
  currentStep,
  totalSteps,
  stepComponent,
}: WizardContentViewProps): ReactElement {
  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <header className="flex flex-wrap items-start gap-3 p-4 pb-3 sm:p-6 sm:pb-4">
        <img src={mascotSrc} alt="Unsloth mascot" className="size-12 sm:size-14" />
        <div className="flex flex-col min-w-0">
          <h1 className="text-lg font-semibold sm:text-xl">{title}</h1>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <p className="ml-auto hidden shrink-0 text-xs text-muted-foreground uppercase tracking-wider md:block">
          Step {currentStep} of {totalSteps}
        </p>
      </header>
      <div className="flex-1 p-4 pt-1.5 sm:p-6 sm:pt-2">
        {stepComponent}
      </div>
    </main>
  );
}
