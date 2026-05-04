// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { SectionCard } from "@/components/section-card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Archive04Icon,
  ChartAverageIcon,
  CleanIcon,
  CloudUploadIcon,
  Rocket01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import type { ReactElement } from "react";

export interface TrainingSectionViewProps {
  isStarting: boolean;
  startError: string | null;
  isLoadingModel: boolean;
  isCheckingDataset: boolean;
  isModelSelected: boolean;
  isIncompatible: boolean;
  incompatibilityMessage: string | null;
  configValidationOk: boolean;
  configValidationMessage: string | null;
  hasMessage: boolean;
  chartData: Array<{ step: number; loss: number }>;
  chartConfig: ChartConfig;
  onStartTraining: () => void;
  onUploadClick: () => void;
  onSaveConfig: () => void;
  onResetConfig: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TrainingSectionView({
  isStarting,
  startError,
  isLoadingModel,
  isCheckingDataset,
  isModelSelected,
  isIncompatible,
  incompatibilityMessage,
  configValidationOk,
  configValidationMessage,
  hasMessage,
  chartData,
  chartConfig,
  onStartTraining,
  onUploadClick,
  onSaveConfig,
  onResetConfig,
  fileInputRef,
  onFileChange,
}: TrainingSectionViewProps): ReactElement {
  return (
    <div data-tour="studio-training" className="min-w-0">
      <SectionCard
        icon={<HugeiconsIcon icon={ChartAverageIcon} className="size-5" />}
        title="Training"
        description="Monitor and control training"
        accent="blue"
        className={hasMessage ? "min-h-studio-config-column" : "h-studio-config-column"}
      >
        <div className="flex flex-col gap-4">
        {/* Loss chart */}
        <div className="relative">
          <ChartContainer
            config={chartConfig}
            className="h-[180px] w-full relative right-8 blur"
          >
            <LineChart data={chartData} accessibilityLayer={true}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="step"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={10}
              />
              <Line
                type="monotone"
                dataKey="loss"
                stroke="var(--color-loss)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <HugeiconsIcon
              icon={ChartAverageIcon}
              className="size-5 text-muted-foreground/50"
            />
            <p className="text-sm font-medium text-muted-foreground">
              No training data yet
            </p>
            <p className="text-xs text-muted-foreground/60">
              Start training to see loss progress
            </p>
          </div>
        </div>

        {/* Start/Stop */}
        <Button
          data-tour="studio-start"
          className="w-full cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
          onClick={onStartTraining}
          disabled={isStarting || isIncompatible || isCheckingDataset || isLoadingModel || !configValidationOk}
        >
          <HugeiconsIcon icon={Rocket01Icon} className="size-4" />
          {isStarting ? "Starting..." : isLoadingModel ? "Loading model..." : isCheckingDataset ? "Checking dataset..." : "Start Training"}
        </Button>
        {startError && (
          <p className="text-xs text-red-500 leading-relaxed">{startError}</p>
        )}
        {isIncompatible && incompatibilityMessage && (
          <p className="text-xs text-red-500 leading-relaxed">
            {incompatibilityMessage}
          </p>
        )}
        {!configValidationOk && configValidationMessage && !isIncompatible && (
          <p className="text-xs text-red-500 leading-relaxed">{configValidationMessage}</p>
        )}

        {/* Upload / Save / Reset */}
        <p className="text-xs text-muted-foreground">Training Config</p>
        <div className="grid grid-cols-3 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={onUploadClick}
              >
                <HugeiconsIcon icon={CloudUploadIcon} className="size-3.5" />
                Upload
              </Button>
            </TooltipTrigger>
            <TooltipContent>Load a saved YAML config</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                data-tour="studio-save"
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={onSaveConfig}
              >
                <HugeiconsIcon icon={Archive04Icon} className="size-3.5" />
                Save
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download current config as YAML</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={onResetConfig}
                disabled={!isModelSelected}
              >
                <HugeiconsIcon icon={CleanIcon} className="size-3.5" />
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset to model defaults</TooltipContent>
          </Tooltip>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".yaml,.yml"
          className="hidden"
          onChange={onFileChange}
        />
        </div>
      </SectionCard>
    </div>
  );
}
