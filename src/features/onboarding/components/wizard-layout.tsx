// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { Route as OnboardingRoute } from "@/app/routes/onboarding";
import { useEffect, useRef, useState } from "react";

import type { ConfettiRef } from "@/components/ui/confetti";
import { STEPS } from "@/config/training";
import { isOnboardingDone, markOnboardingDone } from "@/features/auth";
import { useTrainingConfigStore } from "@/features/training";
import { SplashScreen } from "./splash-screen";
import { WizardContent } from "./wizard-content";
import { WizardFooter } from "./wizard-footer";
import { WizardSidebar } from "./wizard-sidebar";
import { WizardLayoutView } from "./wizard-layout.view";

function sanitizeRedirectTarget(value: string | undefined): string {
  if (!value) return "/chat";
  if (!value.startsWith("/")) return "/chat";
  if (value.startsWith("//")) return "/chat";
  if (value.includes("\\")) return "/chat";
  return value;
}

export function WizardLayout() {
  const search = OnboardingRoute.useSearch();
  const [showSplash, setShowSplash] = useState(true);
  const currentStep = useTrainingConfigStore((s) => s.currentStep);
  const confettiRef = useRef<ConfettiRef>(null);
  const hasFiredRef = useRef(false);
  const isFinalStep = currentStep === STEPS.length;
  const returnTo = sanitizeRedirectTarget(search.redirectTo);
  const exitToReturnTo = () => window.location.assign(returnTo);

  const checkedRef = useRef(false);
  useEffect(() => {
    if (!checkedRef.current) {
      checkedRef.current = true;
      if (isOnboardingDone()) {
        exitToReturnTo();
      }
    }
  }, [returnTo]);

  useEffect(() => {
    if (isFinalStep && !hasFiredRef.current) {
      hasFiredRef.current = true;
      confettiRef.current?.fire({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#34b482", "#26ccff", "#a25afd", "#88ff5a"],
      });
      confettiRef.current?.fire({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#34b482", "#26ccff", "#a25afd", "#88ff5a"],
      });
    }
    if (!isFinalStep) {
      hasFiredRef.current = false;
    }
  }, [isFinalStep]);

  return (
    <WizardLayoutView
      showSplash={showSplash}
      confettiRef={confettiRef}
      splashComponent={
        <SplashScreen
          onStartOnboarding={() => setShowSplash(false)}
          onSkipOnboarding={() => {
            markOnboardingDone();
            exitToReturnTo();
          }}
        />
      }
      sidebarComponent={<WizardSidebar returnTo={returnTo} />}
      contentComponent={<WizardContent />}
      footerComponent={
        <WizardFooter
          returnTo={returnTo}
          onBackToSplash={() => setShowSplash(true)}
        />
      }
    />
  );
}
