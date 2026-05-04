// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import {
  ModelLoadDescriptionView,
  ModelLoadInlineStatusView,
} from "./model-load-status.view";

type ModelLoadDescriptionProps = {
  title?: string | null;
  message?: string | null;
  progressPercent?: number | null;
  progressLabel?: string | null;
  onStop?: () => void;
};

export function ModelLoadDescription(props: ModelLoadDescriptionProps) {
  return <ModelLoadDescriptionView {...props} />;
}

type ModelLoadInlineStatusProps = {
  label: string;
  title: string;
  progressPercent?: number | null;
  progressLabel?: string | null;
  onStop?: () => void;
};

export function ModelLoadInlineStatus(props: ModelLoadInlineStatusProps) {
  return <ModelLoadInlineStatusView {...props} />;
}
