// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import {
  type NodeProps,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { type ReactElement, memo, useEffect, useMemo } from "react";
import { useNodeConnectionStatus } from "../hooks/use-node-connection-status";
import { useRecipeStudioStore } from "../stores/recipe-studio";
import type {
  NodeConfig,
  RecipeNode as RecipeGraphNodeType,
} from "../types";
import { RecipeNodeView } from "./recipe-graph-node.view";

function getConfigSummary(config: NodeConfig | undefined): string {
  if (!config) {
    return "Open settings";
  }

  if (config.kind === "sampler") {
    if (config.sampler_type === "category") {
      const count = config.values?.length ?? 0;
      return `${count} options`;
    }
    if (config.sampler_type === "subcategory") {
      if (config.subcategory_parent?.trim()) {
        return `Based on ${config.subcategory_parent}`;
      }
      return "Choose the main field";
    }
    if (config.sampler_type === "datetime") {
      const start = config.datetime_start?.trim() || "?";
      const end = config.datetime_end?.trim() || "?";
      return `${start} -> ${end}`;
    }
    if (config.sampler_type === "timedelta") {
      if (config.reference_column_name?.trim()) {
        return `From ${config.reference_column_name}`;
      }
      return "Choose a date field";
    }
    if (
      config.sampler_type === "person" ||
      config.sampler_type === "person_from_faker"
    ) {
      const locale = config.person_locale?.trim() || "any locale";
      const city = config.person_city?.trim();
      if (city) {
        return `${locale} · ${city}`;
      }
      return locale;
    }
    return "Open settings";
  }

  if (config.kind === "llm") {
    if (config.llm_type === "structured") {
      return "Set the response format in settings";
    }
    if (config.llm_type === "judge") {
      const scoreCount = config.scores?.length ?? 0;
      return `${scoreCount} criteria`;
    }
    if (config.tool_alias?.trim()) {
      return `Tools: ${config.tool_alias.trim()}`;
    }
    return "Add your prompt in settings";
  }

  if (config.kind === "tool_config") {
    const providerCount = config.mcp_providers.length;
    const allowCount =
      config.allow_tools?.filter((value) => value.trim()).length ?? 0;
    const providerLabel =
      providerCount === 1 ? "1 server" : `${providerCount} servers`;
    if (allowCount === 0) {
      return `${providerLabel} · all tools allowed`;
    }
    return `${providerLabel} · ${allowCount} selected tools`;
  }

  if (config.kind === "validator") {
    const target = config.target_columns[0]?.trim();
    if (target) {
      return `Checks ${target}`;
    }
    return "Choose code to check";
  }

  if (config.kind === "seed") {
    const seedSourceType = config.seed_source_type ?? "hf";
    if (seedSourceType === "hf" && config.hf_repo_id.trim()) {
      return config.hf_repo_id.trim();
    }
    if (seedSourceType === "local" && config.local_file_name?.trim()) {
      return config.local_file_name.trim();
    }
    if (
      seedSourceType === "unstructured" &&
      config.unstructured_file_names?.length
    ) {
      const count = config.unstructured_file_names.length;
      return `${count} file${count !== 1 ? "s" : ""} uploaded`;
    }
    if (config.hf_path.trim()) {
      return config.hf_path.trim();
    }
    if (seedSourceType === "hf") {
      return "Choose a dataset";
    }
    if (seedSourceType === "local") {
      return "Upload a table file";
    }
    return "Upload a document";
  }

  if (config.kind === "markdown_note") {
    if (config.markdown.trim()) {
      return "Note preview";
    }
    return "Add note text";
  }

  return "Open settings";
}

function RecipeGraphNodeBase({
  id,
  data,
  selected,
}: NodeProps<RecipeGraphNodeType>): ReactElement {
  const layoutDirection = data.layoutDirection ?? "LR";
  const config = useRecipeStudioStore((state) => state.configs[id]);
  const openConfig = useRecipeStudioStore((state) => state.openConfig);
  const updateConfig = useRecipeStudioStore((state) => state.updateConfig);
  const allConfigs = useRecipeStudioStore((state) => state.configs);
  const localProviderNames = useMemo(() => {
    const names = new Set<string>();
    for (const cfg of Object.values(allConfigs)) {
      if (cfg.kind === "model_provider" && cfg.is_local === true) {
        names.add(cfg.name);
      }
    }
    return names;
  }, [allConfigs]);
  const llmAuxVisible = useRecipeStudioStore(
    (state) => state.llmAuxVisibility[id] ?? false,
  );
  const setLlmAuxVisibility = useRecipeStudioStore(
    (state) => state.setLlmAuxVisibility,
  );
  const updateNodeInternals = useUpdateNodeInternals();
  const connectionStatus = useNodeConnectionStatus(id, config);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, layoutDirection, config, updateNodeInternals]);

  const summary = getConfigSummary(config);

  return (
    <RecipeNodeView
      id={id}
      data={data}
      selected={selected}
      config={config}
      summary={summary}
      localProviderNames={localProviderNames}
      llmAuxVisible={llmAuxVisible}
      connectionStatus={connectionStatus}
      onOpenConfig={() => openConfig(id)}
      onUpdateConfig={(patch) => updateConfig(id, patch)}
      onToggleLlmAux={() => setLlmAuxVisibility(id, !llmAuxVisible)}
    />
  );
}

export const RecipeNode = memo(RecipeGraphNodeBase);
