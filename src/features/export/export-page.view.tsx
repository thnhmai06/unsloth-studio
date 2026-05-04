// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { SectionCard } from "@/components/section-card";
import { Button } from "@/components/ui/button";
import {
  InformationCircleIcon,
  PackageIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactElement, ReactNode } from "react";
import { ExportDialog } from "./components/export-dialog";
import { MethodPicker } from "./components/method-picker";
import { QuantPicker } from "./components/quant-picker";
import type { ExportMethod } from "./constants";

export interface ExportPageViewProps {
  sourceSelection: ReactNode;
  exportMethod: ExportMethod | null;
  onMethodChange: (method: ExportMethod | null) => void;
  quantLevels: string[];
  onQuantLevelsChange: (levels: string[]) => void;
  destinationSelection: ReactNode;
  isExportDisabled: boolean;
  onStartExport: () => void;
  dialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  exporting: boolean;
  exportError: string | null;
  exportSuccess: boolean;
  exportOutputPath: string | null;
  onCleanupExport: () => void;
  onCloseSuccess: () => void;
  guidedTour?: ReactNode;
}

export function ExportPageView({
  sourceSelection,
  exportMethod,
  onMethodChange,
  quantLevels,
  onQuantLevelsChange,
  destinationSelection,
  isExportDisabled,
  onStartExport,
  dialogOpen,
  onDialogOpenChange,
  exporting,
  exportError,
  exportSuccess,
  exportOutputPath,
  onCleanupExport,
  onCloseSuccess,
  guidedTour,
}: ExportPageViewProps): ReactElement {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8">
      {guidedTour}
      <header className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Export Model</h1>
        <p className="text-muted-foreground">
          Prepare your fine-tuned model for deployment or sharing.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <SectionCard
            icon={<HugeiconsIcon icon={PackageIcon} className="size-5" />}
            title="1. Select Source"
            description="Choose a checkpoint or base model to export"
            accent="blue"
          >
            {sourceSelection}
          </SectionCard>

          <SectionCard
            icon={<HugeiconsIcon icon={InformationCircleIcon} className="size-5" />}
            title="2. Choose Format"
            description="Select the output format for your model"
            accent="purple"
          >
            <MethodPicker value={exportMethod} onChange={onMethodChange} />

            {exportMethod === "gguf" && (
              <div className="mt-8">
                <QuantPicker
                  value={quantLevels}
                  onChange={onQuantLevelsChange}
                />
              </div>
            )}
          </SectionCard>

          <SectionCard
            icon={<HugeiconsIcon icon={InformationCircleIcon} className="size-5" />}
            title="3. Destination"
            description="Where should the exported model be saved?"
            accent="emerald"
          >
            {destinationSelection}
          </SectionCard>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              size="lg"
              className="px-8"
              disabled={isExportDisabled}
              onClick={onStartExport}
            >
              Start Export
            </Button>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-8 flex flex-col gap-6">
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-6">
              <h3 className="text-sm font-semibold">Quick Guide</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    1
                  </span>
                  Pick a checkpoint from a training run, or a base model from
                  your local storage or Hugging Face.
                </li>
                <li className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    2
                  </span>
                  GGUF is recommended for local inference (llama.cpp, Ollama).
                  Merged is best for other libraries.
                </li>
                <li className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    3
                  </span>
                  Push directly to the Hub to share your model with the
                  community.
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <ExportDialog
        open={dialogOpen}
        onOpenChange={onDialogOpenChange}
        exporting={exporting}
        error={exportError}
        success={exportSuccess}
        outputPath={exportOutputPath}
        onCleanup={onCleanupExport}
        onCloseSuccess={onCloseSuccess}
      />
    </div>
  );
}
