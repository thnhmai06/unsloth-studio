// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { SectionCard } from "@/components/section-card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactElement, ReactNode } from "react";
import { ContextUsageBar } from "./components/context-usage-bar";

export interface ChatPageViewProps {
  view: "single" | "compare";
  onToggleSettings: () => void;
  headerContent: ReactNode;
  mainContent: ReactNode;
  composerContent: ReactNode;
  guidedTour?: ReactNode;
  contextUsageBarProps?: {
    used: number;
    total: number;
    cached?: number;
    promptTokens?: number;
    completionTokens?: number;
  };
}

export function ChatPageView({
  view,
  onToggleSettings,
  headerContent,
  mainContent,
  composerContent,
  guidedTour,
  contextUsageBarProps,
}: ChatPageViewProps): ReactElement {
  const isCompare = view === "compare";

  return (
    <div className="relative flex h-[calc(100dvh-var(--studio-titlebar-height,0px))] w-full flex-col overflow-hidden bg-background">
      {guidedTour}

      {/* Main Header / Model Selector Bar */}
      <header className="z-20 flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {headerContent}
        </div>

        <div className="flex items-center gap-2">
          {contextUsageBarProps && (
            <div className="hidden items-center gap-3 md:flex">
              <ContextUsageBar {...contextUsageBarProps} />
            </div>
          )}

          <div className="mx-1 h-4 w-px bg-border/60" />

          <Tooltip>
            <TooltipTrigger asChild={true}>
              <Button
                variant="ghost"
                size="icon-sm"
                className="size-9 rounded-full hover:bg-muted"
                onClick={onToggleSettings}
              >
                <HugeiconsIcon icon={Settings05Icon} className="size-[1.125rem]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              Chat Settings
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          className={`flex min-h-0 flex-1 flex-col ${
            isCompare ? "md:flex-row" : ""
          } overflow-hidden`}
        >
          {mainContent}
        </div>

        {/* Shared Composer (Absolute bottom or relative flex) */}
        <div className="z-10 w-full border-t bg-background/95 px-4 pb-6 pt-3 backdrop-blur-md sm:px-6">
          <div className="mx-auto max-w-4xl">
            {composerContent}
          </div>
        </div>
      </main>
    </div>
  );
}
