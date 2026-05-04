// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { Button } from "@/components/ui/button";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactElement } from "react";

export interface WizardFooterViewProps {
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
  onBack: () => void;
  onSkip: () => void;
  onContinue: () => void;
  onFinish: () => void;
}

export const MOCK_WIZARD_FOOTER_VIEW_PROPS: WizardFooterViewProps = {
  isFirst: true,
  isLast: false,
  canProceed: true,
  onBack: () => {},
  onSkip: () => {},
  onContinue: () => {},
  onFinish: () => {},
};

export function WizardFooterView({
  isFirst,
  isLast,
  canProceed,
  onBack,
  onSkip,
  onContinue,
  onFinish,
}: WizardFooterViewProps): ReactElement {
  return (
    <footer>
      <div className="flex items-center justify-between p-6">
        <Button
          variant="outline"
          className="px-4 !pl-4"
          onClick={onBack}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} data-icon="inline-start" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          {!isLast && (
            <Button
              variant="outline"
              className="px-4"
              onClick={onSkip}
            >
              Skip
            </Button>
          )}
          {isLast ? (
            <Button
              onClick={onFinish}
              disabled={!canProceed}
              className="px-4 !pr-4"
            >
              Finish onboarding
              <HugeiconsIcon icon={ArrowRight02Icon} data-icon="inline-end" />
            </Button>
          ) : (
            <Button
              onClick={onContinue}
              className="px-4 !pl-4"
              disabled={!canProceed}
            >
              Continue
              <HugeiconsIcon icon={ArrowRight02Icon} data-icon="inline-end" />
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}
