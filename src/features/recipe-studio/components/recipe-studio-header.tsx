// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { type ReactElement, useState } from "react";
import type { RecipeStudioView } from "../execution-types";
import type { GraphWarning } from "../utils/graph-warnings";
import { RecipeStudioHeaderView, type StatusTone } from "./recipe-studio-header.view";

type RecipeStudioHeaderProps = {
  activeView: RecipeStudioView;
  saveLoading: boolean;
  saveTone: StatusTone;
  savedAtLabel: string;
  workflowName: string;
  warnings?: GraphWarning[];
  supportsEasyMode?: boolean;
  onWorkflowNameChange: (value: string) => void;
  onViewChange: (view: RecipeStudioView) => void;
  onSaveRecipe: () => void;
};

export function RecipeStudioHeader({
  activeView,
  saveLoading,
  saveTone,
  savedAtLabel,
  workflowName,
  warnings = [],
  supportsEasyMode = false,
  onWorkflowNameChange,
  onViewChange,
  onSaveRecipe,
}: RecipeStudioHeaderProps): ReactElement {
  const [editingWorkflowName, setEditingWorkflowName] = useState(false);

  function handleWorkflowNameSubmit(): void {
    if (workflowName.trim().length === 0) {
      onWorkflowNameChange("Untitled recipe");
    }
    setEditingWorkflowName(false);
  }

  function handleWorkflowNameCancel(): void {
    setEditingWorkflowName(false);
  }

  return (
    <RecipeStudioHeaderView
      activeView={activeView}
      saveLoading={saveLoading}
      saveTone={saveTone}
      savedAtLabel={savedAtLabel}
      workflowName={workflowName}
      warnings={warnings}
      supportsEasyMode={supportsEasyMode}
      editingWorkflowName={editingWorkflowName}
      onSetEditingWorkflowName={setEditingWorkflowName}
      onWorkflowNameChange={onWorkflowNameChange}
      onWorkflowNameSubmit={handleWorkflowNameSubmit}
      onWorkflowNameCancel={handleWorkflowNameCancel}
      onViewChange={onViewChange}
      onSaveRecipe={onSaveRecipe}
    />
  );
}
