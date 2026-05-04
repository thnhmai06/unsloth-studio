// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import {
  parseYamlConfig,
  serializeConfigToYaml,
  useTrainingActions,
  useTrainingConfigStore,
  validateTrainingConfig,
} from "@/features/training";
import { useRef } from "react";
import { toast } from "sonner";
import { TrainingSectionView } from "./training-section.view";

export function TrainingSection() {
  const store = useTrainingConfigStore();
  const { isStarting, startError, startTrainingRun } = useTrainingActions();
  const isLoadingModel = store.isLoadingModelDefaults || store.isCheckingVision;
  const isModelCapabilitiesSettled = !!store.selectedModel && !isLoadingModel;
  const isIncompatible =
    isModelCapabilitiesSettled &&
    ((!store.isVisionModel && store.isDatasetImage === true) ||
      (!store.isAudioModel && store.isDatasetAudio === true));
  const configValidation = validateTrainingConfig(store);
  const hasMessage = !!(startError || isIncompatible || (!configValidation.ok && configValidation.message));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const config = parseYamlConfig(reader.result as string);
        store.applyConfigPatch(config);
        toast.success("Config loaded", { description: file.name });
      } catch (err) {
        toast.error("Failed to load config", {
          description:
            err instanceof Error ? err.message : "Invalid YAML file",
        });
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
    };
    reader.readAsText(file);
  };

  const handleSaveConfig = () => {
    const yamlStr = serializeConfigToYaml(store, store.isVisionModel);
    const blob = new Blob([yamlStr], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const model = (store.selectedModel ?? "model").split("/").pop();
    const method = store.trainingMethod ?? "qlora";
    const dataset = (store.dataset ?? "dataset").split("/").pop();
    const timestamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
    a.download = `${model}_${method}_${dataset}_${timestamp}.yaml`;

    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetConfig = () => {
    store.resetToModelDefaults();
    toast.success("Parameters reset to model defaults");
  };

  const incompatibilityMessage = isIncompatible
    ? (!store.isAudioModel && store.isDatasetAudio === true
      ? "This model does not support audio. Switch to an audio-capable model or choose a non-audio dataset."
      : "Text model is not compatible with a multimodal dataset. Switch to a vision model or choose a text-only dataset.")
    : null;

  return (
    <TrainingSectionView
      isStarting={isStarting}
      startError={startError}
      isLoadingModel={isLoadingModel}
      isCheckingDataset={store.isCheckingDataset}
      isModelSelected={!!store.selectedModel}
      isIncompatible={isIncompatible}
      incompatibilityMessage={incompatibilityMessage}
      configValidationOk={configValidation.ok}
      configValidationMessage={configValidation.message}
      hasMessage={hasMessage}
      chartData={[]}
      chartConfig={{
        loss: { label: "Loss", color: "#3b82f6" },
      }}
      onStartTraining={() => void startTrainingRun()}
      onUploadClick={() => fileInputRef.current?.click()}
      onSaveConfig={handleSaveConfig}
      onResetConfig={handleResetConfig}
      fileInputRef={fileInputRef}
      onFileChange={handleFileUpload}
    />
  );
}
