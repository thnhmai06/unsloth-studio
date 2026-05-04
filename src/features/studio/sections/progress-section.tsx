// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { OPTIMIZER_OPTIONS } from "@/config/training";
import { setTrainingCompareHandoff } from "@/features/chat";
import {
  useTrainingActions,
  useTrainingConfigStore,
  useTrainingRuntimeStore,
} from "@/features/training";
import type { TrainingViewData } from "@/features/training";
import { useGpuUtilization } from "@/hooks";
import { useNavigate } from "@tanstack/react-router";
import { type ReactElement, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { ProgressSectionView, type ConfigGroup } from "./progress-section.view";

interface ProgressSectionProps {
  data: TrainingViewData;
  isHistorical?: boolean;
  configOverride?: {
    epochs?: number;
    batchSize?: number;
    learningRate?: string;
    maxSteps?: number;
    contextLength?: number;
    warmupSteps?: number;
    optimizerType?: string;
    loraRank?: number;
    loraAlpha?: number;
    loraDropout?: number;
    loraVariant?: string;
  };
}

function configRow(
  label: string,
  value: string | number | null | undefined,
): [string, string | number | null | undefined] {
  return [label, value];
}

function lastValue(points: { value: number }[]): number | null {
  if (points.length === 0) return null;
  const v = points[points.length - 1]?.value;
  return v != null && Number.isFinite(v) ? v : null;
}

function getDisplayMetric(
  isTrainingRunning: boolean,
  currentValue: number | null,
  history: { value: number }[],
): number | null {
  if (isTrainingRunning) {
    return currentValue != null ? currentValue : null;
  }
  return lastValue(history) ?? (currentValue != null ? currentValue : null);
}

export function ProgressSection({
  data,
  isHistorical = false,
  configOverride,
}: ProgressSectionProps): ReactElement {
  const navigate = useNavigate();
  const { stopTrainingRun } = useTrainingActions();
  const gpu = useGpuUtilization(data.isTrainingRunning);

  const config = useTrainingConfigStore(
    useShallow((state) => ({
      epochs: state.epochs,
      batchSize: state.batchSize,
      learningRate: state.learningRate,
      maxSteps: state.maxSteps,
      contextLength: state.contextLength,
      warmupSteps: state.warmupSteps,
      optimizerType: state.optimizerType,
      loraRank: state.loraRank,
      loraAlpha: state.loraAlpha,
      loraDropout: state.loraDropout,
      loraVariant: state.loraVariant,
    })),
  );

  const [stopDialogOpen, setStopDialogOpen] = useState(false);
  const [stopRequestedLocal, setStopRequestedLocal] = useState(false);

  const stopRequested = data.isTrainingRunning && stopRequestedLocal;

  const pct =
    data.totalSteps > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round((data.currentStep / data.totalSteps) * 100),
          ),
        )
      : Math.round(data.progressPercent);

  const elapsed = data.elapsedSeconds;
  const derivedEta =
    elapsed != null && pct > 0
      ? Math.round((elapsed * (100 - pct)) / Math.max(pct, 1))
      : null;
  const eta = data.etaSeconds ?? derivedEta;

  const stepsPerSecond =
    elapsed != null && elapsed > 0 ? data.currentStep / elapsed : null;
  const showHalfwayHint =
    data.phase === "training" && pct >= 50 && pct < 100;
  const showCompletedHint = data.phase === "completed";

  const handleCompareInChat = async () => {
    setTrainingCompareHandoff(data.modelName);
    await navigate({ to: "/chat" });
  };

  const handleRequestStop = async (saveCheckpoint: boolean) => {
    setStopRequestedLocal(true);
    setStopDialogOpen(false);
    useTrainingRuntimeStore.getState().setStopRequested(true);
    try {
      const ok = await stopTrainingRun(saveCheckpoint);
      if (!ok) {
        setStopRequestedLocal(false);
      }
    } catch {
      setStopRequestedLocal(false);
    }
  };

  const stoppedLoss = getDisplayMetric(
    data.isTrainingRunning,
    data.currentLoss,
    data.lossHistory,
  );
  const stoppedLr = getDisplayMetric(
    data.isTrainingRunning,
    data.currentLearningRate,
    data.lrHistory,
  );
  const stoppedGradNorm = data.isTrainingRunning
    ? data.currentGradNorm
    : (lastValue(data.gradNormHistory) ?? data.currentGradNorm);

  const cfgEpochs = isHistorical ? configOverride?.epochs : config.epochs;
  const cfgBatchSize = isHistorical ? configOverride?.batchSize : config.batchSize;
  const cfgLearningRate = isHistorical ? configOverride?.learningRate : config.learningRate;
  const cfgMaxSteps = isHistorical ? configOverride?.maxSteps : config.maxSteps;
  const cfgContextLength = isHistorical ? configOverride?.contextLength : config.contextLength;
  const cfgWarmupSteps = isHistorical ? configOverride?.warmupSteps : config.warmupSteps;
  const cfgOptimizerType = isHistorical ? configOverride?.optimizerType : config.optimizerType;
  const cfgLoraRank = isHistorical ? configOverride?.loraRank : config.loraRank;
  const cfgLoraAlpha = isHistorical ? configOverride?.loraAlpha : config.loraAlpha;
  const cfgLoraDropout = isHistorical ? configOverride?.loraDropout : config.loraDropout;
  const cfgLoraVariant = isHistorical ? configOverride?.loraVariant : config.loraVariant;

  const optimizerLabel =
    OPTIMIZER_OPTIONS.find((o) => o.value === cfgOptimizerType)?.label ??
    cfgOptimizerType;

  const configItems: ConfigGroup[] = [
    {
      section: "Hyperparams",
      rows: [
        configRow("Epochs", cfgEpochs),
        configRow("Batch size", cfgBatchSize),
        configRow("Learning rate", cfgLearningRate),
        configRow("Optimizer", optimizerLabel),
        configRow("Max steps", cfgMaxSteps),
        configRow("Context length", cfgContextLength),
        configRow("Warmup steps", cfgWarmupSteps),
      ],
    },
    ...(data.trainingMethod !== "full"
      ? [
          {
            section: "LoRA",
            rows: [
              configRow("Rank", cfgLoraRank),
              configRow("Alpha", cfgLoraAlpha),
              configRow("Dropout", cfgLoraDropout),
              configRow("Variant", cfgLoraVariant),
            ],
          },
        ]
      : []),
  ];

  return (
    <ProgressSectionView
      data={{
        message: data.message,
        phase: data.phase,
        currentEpoch: data.currentEpoch,
        currentStep: data.currentStep,
        totalSteps: data.totalSteps,
        progressPercent: data.progressPercent,
        error: data.error,
        modelName: data.modelName,
        trainingMethod: data.trainingMethod,
        elapsedSeconds: elapsed,
        etaSeconds: eta,
        currentNumTokens: data.currentNumTokens,
        isTrainingRunning: data.isTrainingRunning,
        loss: stoppedLoss,
        lr: stoppedLr,
        gradNorm: stoppedGradNorm,
        stepsPerSecond: stepsPerSecond,
      }}
      pct={pct}
      isHistorical={isHistorical}
      configItems={configItems}
      stopDialogOpen={stopDialogOpen}
      onOpenStopDialog={setStopDialogOpen}
      stopRequested={stopRequested}
      showHalfwayHint={showHalfwayHint}
      showCompletedHint={showCompletedHint}
      onCompareInChat={handleCompareInChat}
      onRequestStop={handleRequestStop}
      gpuStats={isHistorical ? undefined : {
        utilization: gpu.gpu_utilization_pct,
        temperature: gpu.temperature_c,
        vramUsed: gpu.vram_used_gb,
        vramTotal: gpu.vram_total_gb,
        vramPct: gpu.vram_utilization_pct,
        powerDraw: gpu.power_draw_w,
        powerLimit: gpu.power_limit_w,
        powerPct: gpu.power_utilization_pct,
      }}
    />
  );
}
