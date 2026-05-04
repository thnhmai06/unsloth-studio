// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { SectionCard } from "@/components/section-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ChartAverageIcon,
  DashboardSpeed01Icon,
  Notebook01Icon,
  RamMemoryIcon,
  StopIcon,
  TemperatureIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { type ReactElement, type ReactNode } from "react";
import { ChartSettingsSheet } from "./charts/chart-settings-sheet";

export interface ConfigGroup {
  section: string;
  rows: [string, string | number | null | undefined][];
}

export interface ProgressSectionViewProps {
  data: {
    message: string | null;
    phase: string;
    currentEpoch: number;
    currentStep: number;
    totalSteps: number;
    progressPercent: number;
    error: string | null;
    modelName: string;
    trainingMethod: string;
    elapsedSeconds: number | null;
    etaSeconds: number | null;
    currentNumTokens: number | null;
    isTrainingRunning: boolean;
    loss: number | null;
    lr: number | null;
    gradNorm: number | null;
    stepsPerSecond: number | null;
  };
  pct: number;
  isHistorical: boolean;
  configItems: ConfigGroup[];
  stopDialogOpen: boolean;
  onOpenStopDialog: (open: boolean) => void;
  stopRequested: boolean;
  showHalfwayHint: boolean;
  showCompletedHint: boolean;
  onCompareInChat: () => Promise<void>;
  onRequestStop: (saveCheckpoint: boolean) => Promise<void>;
  gpuStats?: {
    utilization: number | null;
    temperature: number | null;
    vramUsed: number | null;
    vramTotal: number | null;
    vramPct: number | null;
    powerDraw: number | null;
    powerLimit: number | null;
    powerPct: number | null;
  };
}

export function ProgressSectionView({
  data,
  pct,
  isHistorical,
  configItems,
  stopDialogOpen,
  onOpenStopDialog,
  stopRequested,
  showHalfwayHint,
  showCompletedHint,
  onCompareInChat,
  onRequestStop,
  gpuStats,
}: ProgressSectionViewProps): ReactElement {
  const phaseLabel: Record<string, string> = {
    idle: "Idle",
    starting: "Starting",
    training: "Training",
    completed: "Completed",
    error: "Error",
  };

  const phaseColors: Record<string, string> = {
    idle: "bg-muted text-muted-foreground",
    starting: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    training: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <SectionCard
      icon={<HugeiconsIcon icon={ChartAverageIcon} className="size-5" />}
      title="Training Progress"
      description={data.message || "Live training metrics"}
      accent="emerald"
      className="shadow-border border border-border/60 bg-card/90 ring-0 backdrop-blur-sm"
      headerAction={
        <div className="flex items-center gap-2">
          <ConfigPopoverButton configItems={configItems} />
          {!isHistorical && (
            <>
              <ChartSettingsSheet />
              <AlertDialog open={stopDialogOpen} onOpenChange={onOpenStopDialog}>
                <Button
                  data-tour="studio-training-stop"
                  variant="destructive"
                  size="sm"
                  className={cn(
                    "h-8 rounded-full px-3.5 text-xs shadow-sm",
                    stopRequested ? "cursor-not-allowed opacity-60" : "cursor-pointer",
                  )}
                  onClick={() => onOpenStopDialog(true)}
                  disabled={!data.isTrainingRunning || stopRequested}
                >
                  <HugeiconsIcon icon={StopIcon} className="size-3" />
                  {stopRequested ? "Stopping…" : "Stop"}
                </Button>
                <AlertDialogContent overlayClassName="bg-background/40 supports-backdrop-filter:backdrop-blur-[1px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Stop Training</AlertDialogTitle>
                    <AlertDialogDescription>
                      Choose how you want to stop the current training run.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Continue Training</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => onRequestStop(false)}
                    >
                      Cancel Training
                    </AlertDialogAction>
                    <AlertDialogAction onClick={() => onRequestStop(true)}>
                      Stop and Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${phaseColors[data.phase]}`}
            >
              {phaseLabel[data.phase] || data.phase}
            </span>
            <span className="text-[10px] tabular-nums text-muted-foreground">
              Epoch {data.currentEpoch.toFixed(2)}
            </span>
            <span className="rounded-full border border-border/60 px-2.5 py-1 text-[10px] font-medium tabular-nums text-muted-foreground">
              {pct}% complete
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                Step {data.currentStep} / {data.totalSteps || "--"}
              </span>
              <span>{pct}%</span>
            </div>
            <Progress value={pct} className="h-2 bg-foreground/[0.05]" />
          </div>

          {!isHistorical && (
            <MilestoneCallout
              showCompletedHint={showCompletedHint}
              showHalfwayHint={showHalfwayHint}
              onCompareInChat={onCompareInChat}
            />
          )}

          {data.error && (
            <p className="rounded-2xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-red-500 leading-relaxed">
              {data.error}
            </p>
          )}

          <div className="grid gap-x-4 gap-y-3 pt-1 sm:grid-cols-2 xl:grid-cols-5">
            <MetricStat
              label="Loss"
              valueClassName="text-2xl font-bold tracking-tight"
            >
              {data.loss != null ? data.loss.toFixed(4) : "--"}
            </MetricStat>
            <MetricStat label="LR">{data.lr != null ? data.lr.toExponential(2) : "--"}</MetricStat>
            <MetricStat label="Grad Norm">
              {data.gradNorm != null ? data.gradNorm.toFixed(3) : "--"}
            </MetricStat>
            <MetricStat label="Model" valueClassName="truncate">
              {data.modelName || "--"}
            </MetricStat>
            <MetricStat label="Method">
              {data.trainingMethod === "qlora" ? "QLoRA" : data.trainingMethod === "lora" ? "LoRA" : "Full"}
            </MetricStat>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>Elapsed: {formatDuration(data.elapsedSeconds)}</span>
            {!isHistorical && <span>ETA: {formatDuration(data.etaSeconds)}</span>}
            <span>
              {data.stepsPerSecond == null
                ? "-- steps/s"
                : `${data.stepsPerSecond.toFixed(2)} steps/s`}
            </span>
            {data.currentNumTokens != null && (
              <span>Tokens: {data.currentNumTokens}</span>
            )}
          </div>
        </div>

        {!isHistorical && gpuStats && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">
                GPU Monitor
              </p>
              <span className="text-[11px] text-muted-foreground">Live</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <GpuStat
                label="Utilization"
                icon={<HugeiconsIcon icon={DashboardSpeed01Icon} className="size-3.5" />}
                value={gpuStats.utilization != null ? `${gpuStats.utilization}%` : "--"}
                pct={gpuStats.utilization ?? 0}
              />
              <GpuStat
                label="Temperature"
                icon={<HugeiconsIcon icon={TemperatureIcon} className="size-3.5" />}
                value={gpuStats.temperature != null ? `${gpuStats.temperature}°C` : "--"}
                pct={gpuStats.temperature ?? 0}
                max={100}
              />
              <GpuStat
                label="VRAM"
                icon={<HugeiconsIcon icon={RamMemoryIcon} className="size-3.5" />}
                value={
                  gpuStats.vramUsed != null && gpuStats.vramTotal != null
                    ? `${gpuStats.vramUsed} / ${gpuStats.vramTotal} GB`
                    : "--"
                }
                pct={gpuStats.vramPct ?? 0}
              />
              <GpuStat
                label="Power"
                icon={<HugeiconsIcon icon={ZapIcon} className="size-3.5" />}
                value={
                  gpuStats.powerDraw != null
                    ? gpuStats.powerLimit != null
                      ? `${gpuStats.powerDraw} / ${gpuStats.powerLimit} W`
                      : `${gpuStats.powerDraw} W`
                    : "--"
                }
                pct={gpuStats.powerPct ?? 0}
              />
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

function ConfigPopoverButton({
  configItems,
}: {
  configItems: ConfigGroup[];
}): ReactElement {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Open training config"
        >
          <HugeiconsIcon icon={Notebook01Icon} className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold">Training Config</p>
          {configItems.map((group) => (
            <div key={group.section} className="flex flex-col gap-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.section}
              </p>
              {group.rows.map(([label, value]) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium tabular-nums">
                    {value == null || value === "" ? "--" : String(value)}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MilestoneCallout({
  showCompletedHint,
  showHalfwayHint,
  onCompareInChat,
}: {
  showCompletedHint: boolean;
  showHalfwayHint: boolean;
  onCompareInChat: () => Promise<void>;
}): ReactElement | null {
  if (!(showHalfwayHint || showCompletedHint)) {
    return null;
  }

  return (
    <div className="corner-squircle rounded-2xl border border-border/60 bg-muted/30 px-3 py-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {!showCompletedHint && (
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Milestone
            </p>
          )}
          <p
            className={cn(
              "text-xs text-foreground/85",
              !showCompletedHint && "mt-1",
            )}
          >
            {showCompletedHint
              ? "Training done. Next step: compare base vs fine-tuned outputs."
              : "Halfway done. Training is past 50%."}
          </p>
        </div>
        {!showCompletedHint && (
          <span className="rounded-full border border-border/60 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            50%+
          </span>
        )}
      </div>
      {showCompletedHint && (
        <div className="mt-2 flex flex-wrap gap-2">
          <Button size="xs" onClick={onCompareInChat}>
            Compare in Chat
          </Button>
          <Button asChild={true} size="xs" variant="outline">
            <Link to="/export">Export Model</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function MetricStat({
  label,
  children,
  valueClassName,
}: {
  label: string;
  children: ReactNode;
  valueClassName?: string;
}): ReactElement {
  return (
    <div className="min-w-0">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p
        className={`mt-1 text-base font-semibold tabular-nums ${valueClassName ?? ""}`}
      >
        {children}
      </p>
    </div>
  );
}

function GpuStat({
  label,
  icon,
  value,
  pct,
  max,
}: {
  label: string;
  icon: ReactNode;
  value: string;
  pct: number;
  max?: number;
}): ReactElement {
  const clamped = Math.max(0, Math.min(pct, max ?? 100));
  let barColor = "bg-red-500";
  if (clamped < 60) {
    barColor = "bg-emerald-500";
  } else if (clamped < 95) {
    barColor = "bg-amber-500";
  }

  return (
    <div className="corner-squircle flex flex-col gap-2 rounded-2xl border border-border/50 bg-background/60 p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          {label}
        </span>
        <span className="font-medium tabular-nums">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/80">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-300`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

function formatDuration(seconds: number | null): string {
  if (seconds == null || seconds < 0) return "--:--";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}
