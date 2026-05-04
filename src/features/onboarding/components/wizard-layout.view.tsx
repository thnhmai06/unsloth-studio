// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { Suspense, lazy } from "react";
import type { ReactNode } from "react";
import type { ConfettiRef } from "@/components/ui/confetti";

const Confetti = lazy(() =>
  import("@/components/ui/confetti").then((m) => ({ default: m.Confetti })),
);

export interface WizardLayoutViewProps {
  showSplash: boolean;
  splashComponent: ReactNode;
  sidebarComponent: ReactNode;
  contentComponent: ReactNode;
  footerComponent: ReactNode;
  confettiRef: React.RefObject<ConfettiRef | null>;
}

export function WizardLayoutView({
  showSplash,
  splashComponent,
  sidebarComponent,
  contentComponent,
  footerComponent,
  confettiRef,
}: WizardLayoutViewProps) {
  return (
    <div className="relative flex min-h-[calc(100dvh-var(--studio-titlebar-height,0px))] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/3 p-4 sm:p-6 md:p-8">
      {showSplash && splashComponent}
      <Suspense fallback={null}>
        <Confetti
          ref={confettiRef}
          manualstart={true}
          className="pointer-events-none fixed inset-0 z-50 size-full"
        />
      </Suspense>
      {!showSplash && (
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.165, 0.84, 0.44, 1],
          }}
        >
          <Card className="relative z-10 w-full !gap-0 !m-0 !p-0 flex min-h-[560px] flex-col overflow-hidden shadow-border ring-1 ring-border md:min-h-[620px] md:flex-row lg:h-[660px]">
            {sidebarComponent}
            <div className="flex-1 flex flex-col">
              {contentComponent}
              {footerComponent}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
