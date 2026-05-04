// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  listLocalModels,
  type LocalModelInfo,
  useTrainingConfigStore,
} from "@/features/training";
import {
  useDebouncedValue,
  useHfModelSearch,
  useHfTokenValidation,
} from "@/hooks";
import {
  AlertCircleIcon,
  FolderSearchIcon,
  InformationCircleIcon,
  Key01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { collapseAnim } from "./anim";
import type { ModelCheckpoints } from "./api/export-api";
import {
  cleanupExport,
  exportBase,
  exportGGUF,
  exportLoRA,
  exportMerged,
  fetchCheckpoints,
  loadCheckpoint,
} from "./api/export-api";
import {
  type ExportMethod,
  getEstimatedSize,
} from "./constants";
import { GuidedTour, useGuidedTourController } from "@/features/tour";
import { exportTourSteps } from "./tour";
import { ExportPageView } from "./export-page.view";

const SEARCH_INPUT_REASONS = new Set(["input-change", "input-paste", "input-clear"]);

export function ExportPage() {
  const { hfToken, setHfToken } = useTrainingConfigStore(
    useShallow((s) => ({
      hfToken: s.hfToken,
      setHfToken: s.setHfToken,
    })),
  );

  const [models, setModels] = useState<ModelCheckpoints[]>([]);
  const [loadingCheckpoints, setLoadingCheckpoints] = useState(true);
  const [checkpointError, setCheckpointError] = useState<string | null>(null);

  const [selectedModelIdx, setSelectedModelIdx] = useState<string | null>(null);
  const [checkpoint, setCheckpoint] = useState<string | null>(null);
  const [sourceMode, setSourceMode] = useState<"checkpoint" | "model">(
    "checkpoint",
  );
  const [modelSource, setModelSource] = useState<"hf" | "local">("hf");
  const [hfExportTrustRemoteCode, setHfExportTrustRemoteCode] =
    useState(true);
  const [modelInput, setModelInput] = useState("");
  const [selectedSourceModel, setSelectedSourceModel] = useState<string | null>(
    null,
  );
  const [localModelInput, setLocalModelInput] = useState("");
  const [localModels, setLocalModels] = useState<LocalModelInfo[]>([]);
  const [isLoadingLocalModels, setIsLoadingLocalModels] = useState(true);
  const [localModelsError, setLocalModelsError] = useState<string | null>(null);
  const debouncedModelQuery = useDebouncedValue(modelInput);
  const debouncedHfToken = useDebouncedValue(hfToken, 500);

  const [exportMethod, setExportMethod] = useState<ExportMethod | null>(null);
  const [quantLevels, setQuantLevels] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [destination, setDestination] = useState<"local" | "hub">("local");
  const [hfUsername, setHfUsername] = useState("");
  const [modelName, setModelName] = useState("");
  const [privateRepo, setPrivateRepo] = useState(false);

  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportOutputPath, setExportOutputPath] = useState<string | null>(null);

  const hfComboboxAnchorRef = useRef<HTMLDivElement>(null);
  const localComboboxAnchorRef = useRef<HTMLDivElement>(null);
  const selectingHfModelRef = useRef(false);
  const hfModelInputRef = useRef("");
  const localModelInputRef = useRef("");

  const tour = useGuidedTourController({
    id: "export",
    steps: exportTourSteps,
  });

  useEffect(() => {
    let cancelled = false;
    setLoadingCheckpoints(true);
    setCheckpointError(null);
    fetchCheckpoints()
      .then((data) => {
        if (!cancelled) {
          setModels(data.models);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setCheckpointError(
            err instanceof Error ? err.message : "Failed to load checkpoints",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingCheckpoints(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void listLocalModels(controller.signal)
      .then((models) => {
        if (controller.signal.aborted) return;
        setLocalModels(models);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setLocalModelsError(
          error instanceof Error ? error.message : "Failed to load local models",
        );
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setIsLoadingLocalModels(false);
      });
    return () => controller.abort();
  }, []);

  const selectedModelData = useMemo(
    () =>
      selectedModelIdx != null
        ? models.find((m) => m.name === selectedModelIdx) ?? null
        : null,
    [models, selectedModelIdx],
  );

  const checkpointsForModel = useMemo(
    () => selectedModelData?.checkpoints ?? [],
    [selectedModelData],
  );

  const { data: hfResults, isLoading: searchingHf } = useHfModelSearch(
    debouncedModelQuery,
    debouncedHfToken,
  );

  const { validation: hfTokenValidation } = useHfTokenValidation(
    debouncedHfToken,
  );

  useEffect(() => {
    if (hfTokenValidation?.username) {
      setHfUsername(hfTokenValidation.username);
    }
  }, [hfTokenValidation]);

  const filteredLocalModels = useMemo(() => {
    const query = localModelInput.trim().toLowerCase();
    if (!query) return localModels;
    return localModels.filter((m) => m.id.toLowerCase().includes(query));
  }, [localModels, localModelInput]);

  const sourceReady =
    sourceMode === "checkpoint"
      ? !!(selectedModelIdx && checkpoint)
      : !!selectedSourceModel;

  const destinationReady =
    destination === "local"
      ? true
      : !!(hfUsername && modelName && hfTokenValidation?.ok);

  const isExportDisabled =
    !sourceReady || !exportMethod || !destinationReady || exporting;

  const handleStartExport = async () => {
    if (isExportDisabled) return;

    setExporting(true);
    setExportError(null);
    setExportSuccess(false);
    setExportOutputPath(null);
    setDialogOpen(true);

    try {
      if (sourceMode === "checkpoint") {
        if (!selectedModelIdx || !checkpoint) return;
        await loadCheckpoint(selectedModelIdx, checkpoint);
      }

      const commonArgs = {
        destination,
        hfToken,
        repoId: `${hfUsername}/${modelName}`,
        private: privateRepo,
      };

      let result;
      if (sourceMode === "model") {
        if (!selectedSourceModel) return;
        result = await exportBase(selectedSourceModel, {
          ...commonArgs,
          method: exportMethod,
          quantization: quantLevels,
          trust_remote_code: hfExportTrustRemoteCode,
        });
      } else {
        if (exportMethod === "lora") {
          result = await exportLoRA(commonArgs);
        } else if (exportMethod === "merged") {
          result = await exportMerged(commonArgs);
        } else if (exportMethod === "gguf") {
          result = await exportGGUF({
            ...commonArgs,
            quantization: quantLevels,
          });
        }
      }

      setExportSuccess(true);
      if (result && "path" in result && typeof result.path === "string") {
        setExportOutputPath(result.path);
      }
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  };

  const handleCleanup = useCallback(async () => {
    try {
      await cleanupExport();
    } catch {
      // ignore
    }
  }, []);

  const handleCloseSuccess = () => {
    setDialogOpen(false);
    setExportSuccess(false);
    setExportOutputPath(null);
  };

  const renderSourceSelection = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Source Type
        </label>
        <div className="flex gap-2">
          <Button
            variant={sourceMode === "checkpoint" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSourceMode("checkpoint")}
            className="flex-1"
          >
            Fine-tuned Checkpoint
          </Button>
          <Button
            variant={sourceMode === "model" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSourceMode("model")}
            className="flex-1"
          >
            Base Model
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {sourceMode === "checkpoint" ? (
          <motion.div
            key="checkpoint"
            {...collapseAnim}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Training Run
                </label>
                <Select
                  value={selectedModelIdx ?? ""}
                  onValueChange={(val) => {
                    setSelectedModelIdx(val);
                    setCheckpoint(null);
                  }}
                  disabled={loadingCheckpoints}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue
                      placeholder={
                        loadingCheckpoints
                          ? "Loading runs..."
                          : "Select a run"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m.name} value={m.name}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {checkpointError && (
                  <p className="flex items-center gap-1.5 text-[11px] text-destructive">
                    <HugeiconsIcon icon={AlertCircleIcon} className="size-3" />
                    {checkpointError}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Checkpoint
                </label>
                <Select
                  value={checkpoint ?? ""}
                  onValueChange={setCheckpoint}
                  disabled={!selectedModelIdx || loadingCheckpoints}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select checkpoint" />
                  </SelectTrigger>
                  <SelectContent>
                    {checkpointsForModel.map((cp) => (
                      <SelectItem key={cp} value={cp}>
                        {cp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="model"
            {...collapseAnim}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Model Provider
              </label>
              <div className="flex gap-2">
                <Button
                  variant={modelSource === "hf" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setModelSource("hf")}
                  className="flex-1"
                >
                  Hugging Face
                </Button>
                <Button
                  variant={modelSource === "local" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setModelSource("local")}
                  className="flex-1"
                >
                  Local Storage
                </Button>
              </div>
            </div>

            {modelSource === "hf" ? (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-medium text-muted-foreground">
                  Hugging Face Repository
                </label>
                <Combobox
                  value={selectedSourceModel ?? ""}
                  onValueChange={(val) => setSelectedSourceModel(val)}
                >
                  <div
                    ref={hfComboboxAnchorRef}
                    className="relative flex w-full flex-col gap-2"
                  >
                    <div className="relative">
                      <ComboboxInput
                        asChild
                        onBlur={() => {
                          selectingHfModelRef.current = false;
                        }}
                      >
                        <InputGroup>
                          <InputGroupAddon>
                            <HugeiconsIcon
                              icon={Search01Icon}
                              className="size-4 text-muted-foreground"
                            />
                          </InputGroupAddon>
                          <InputGroupInput
                            placeholder="search-org/model-name"
                            value={modelInput}
                            onChange={(e) => setModelInput(e.target.value)}
                            onFocus={() => {
                              selectingHfModelRef.current = true;
                            }}
                            className="h-10 font-mono text-sm"
                          />
                          {searchingHf && (
                            <InputGroupAddon className="absolute right-0 border-none bg-transparent">
                              <Spinner className="size-3.5" />
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                      </ComboboxInput>
                    </div>

                    <ComboboxContent
                      anchor={hfComboboxAnchorRef.current}
                      className="w-[var(--radix-combobox-trigger-width)]"
                    >
                      <ComboboxList>
                        {!searchingHf && hfResults?.length === 0 && (
                          <ComboboxEmpty>No models found</ComboboxEmpty>
                        )}
                        {hfResults?.map((m) => (
                          <ComboboxItem key={m.id} value={m.id}>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-xs">
                                {m.id}
                              </span>
                              {m.downloads != null && (
                                <span className="text-[10px] text-muted-foreground">
                                  {m.downloads.toLocaleString()} downloads
                                </span>
                              )}
                            </div>
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </div>
                </Combobox>
                <div className="flex items-center gap-2">
                  <Switch
                    id="trust-remote-code"
                    checked={hfExportTrustRemoteCode}
                    onCheckedChange={setHfExportTrustRemoteCode}
                  />
                  <label
                    htmlFor="trust-remote-code"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Trust remote code
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-muted-foreground hover:text-foreground">
                        <HugeiconsIcon icon={InformationCircleIcon} className="size-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Required for models with custom architectures like DeepSeek or GRIN.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <label className="text-xs font-medium text-muted-foreground">
                  Select Local Model
                </label>
                <Combobox
                  value={selectedSourceModel ?? ""}
                  onValueChange={(val) => setSelectedSourceModel(val)}
                >
                  <div
                    ref={localComboboxAnchorRef}
                    className="relative flex w-full flex-col gap-2"
                  >
                    <ComboboxInput asChild>
                      <InputGroup>
                        <InputGroupAddon>
                          <HugeiconsIcon
                            icon={FolderSearchIcon}
                            className="size-4 text-muted-foreground"
                          />
                        </InputGroupAddon>
                        <InputGroupInput
                          placeholder="Search local models..."
                          value={localModelInput}
                          onChange={(e) => setLocalModelInput(e.target.value)}
                          className="h-10 font-mono text-sm"
                        />
                        {isLoadingLocalModels && (
                          <InputGroupAddon className="absolute right-0 border-none bg-transparent">
                            <Spinner className="size-3.5" />
                          </InputGroupAddon>
                        )}
                      </InputGroup>
                    </ComboboxInput>

                    <ComboboxContent
                      anchor={localComboboxAnchorRef.current}
                      className="w-[var(--radix-combobox-trigger-width)]"
                    >
                      <ComboboxList>
                        {!isLoadingLocalModels &&
                          filteredLocalModels.length === 0 && (
                            <ComboboxEmpty>No local models found</ComboboxEmpty>
                          )}
                        {filteredLocalModels.map((m) => (
                          <ComboboxItem key={m.id} value={m.id}>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-xs">
                                {m.id}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                {m.path}
                              </span>
                            </div>
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </div>
                </Combobox>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderDestinationSelection = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Output Location
        </label>
        <div className="flex gap-2">
          <Button
            variant={destination === "local" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setDestination("local")}
            className="flex-1"
          >
            Local Storage
          </Button>
          <Button
            variant={destination === "hub" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setDestination("hub")}
            className="flex-1"
          >
            Hugging Face Hub
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {destination === "local" ? (
          <motion.div
            key="local"
            {...collapseAnim}
            className="rounded-2xl border border-border/50 bg-muted/10 p-4"
          >
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HugeiconsIcon icon={FolderSearchIcon} className="size-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-semibold">Local Inference</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  The model will be exported to your local Unsloth Studio
                  storage. You can then use it with Ollama, LM Studio, or
                  llama.cpp.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hub"
            {...collapseAnim}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-muted/10 p-4">
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <HugeiconsIcon icon={Key01Icon} className="size-5" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h4 className="text-sm font-semibold">Hub Authentication</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    A write-access token is required to create repositories and
                    push models.
                  </p>
                  <div className="mt-2 flex flex-col gap-2">
                    <InputGroup>
                      <InputGroupAddon>HF Token</InputGroupAddon>
                      <InputGroupInput
                        type="password"
                        placeholder="hf_..."
                        value={hfToken ?? ""}
                        onChange={(e) => setHfToken(e.target.value)}
                        className="h-9 font-mono text-xs"
                      />
                    </InputGroup>
                    {hfToken && hfTokenValidation && (
                      <p
                        className={cn(
                          "flex items-center gap-1.5 text-[11px] font-medium",
                          hfTokenValidation.ok
                            ? "text-emerald-500"
                            : "text-destructive",
                        )}
                      >
                        <HugeiconsIcon
                          icon={
                            hfTokenValidation.ok
                              ? InformationCircleIcon
                              : AlertCircleIcon
                          }
                          className="size-3"
                        />
                        {hfTokenValidation.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Namespace
                </label>
                <InputGroup>
                  <InputGroupInput
                    value={hfUsername}
                    onChange={(e) => setHfUsername(e.target.value)}
                    placeholder="username"
                    className="h-10 text-sm"
                    disabled={!hfTokenValidation?.ok}
                  />
                </InputGroup>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Repository Name
                </label>
                <InputGroup>
                  <InputGroupInput
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="my-fine-tuned-model"
                    className="h-10 text-sm"
                    disabled={!hfTokenValidation?.ok}
                  />
                </InputGroup>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="private-repo"
                checked={privateRepo}
                onCheckedChange={setPrivateRepo}
                disabled={!hfTokenValidation?.ok}
              />
              <label
                htmlFor="private-repo"
                className="text-xs font-medium text-muted-foreground"
              >
                Private repository
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <ExportPageView
      sourceSelection={renderSourceSelection()}
      exportMethod={exportMethod}
      onMethodChange={setExportMethod}
      quantLevels={quantLevels}
      onQuantLevelsChange={setQuantLevels}
      destinationSelection={renderDestinationSelection()}
      isExportDisabled={isExportDisabled}
      onStartExport={handleStartExport}
      dialogOpen={dialogOpen}
      onDialogOpenChange={setDialogOpen}
      exporting={exporting}
      exportError={exportError}
      exportSuccess={exportSuccess}
      exportOutputPath={exportOutputPath}
      onCleanupExport={handleCleanup}
      onCloseSuccess={handleCloseSuccess}
      guidedTour={
        <GuidedTour
          {...tour}
          className="pointer-events-none fixed inset-0 z-50 size-full"
        />
      }
    />
  );
}
