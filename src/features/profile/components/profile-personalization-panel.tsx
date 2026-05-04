// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { getAuthToken } from "@/features/auth";
import { toastError, toastSuccess } from "@/shared/toast";
import { useMemo, useRef, useState } from "react";
import { decodeJwtSubject } from "../utils/jwt-subject";
import { resizeImageFileToDataUrl } from "../utils/resize-image-file";
import { useUserProfileStore } from "../stores/user-profile-store";
import { ProfilePersonalizationPanelView } from "./profile-personalization-panel.view";

const PROFILE_STORAGE_KEY = "unsloth_user_profile";

function readPersistedProfile(): { displayName: string; avatarDataUrl: string | null } | null {
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;

    const maybeState = "state" in parsed ? (parsed as { state?: unknown }).state : parsed;
    if (!maybeState || typeof maybeState !== "object") return null;
    const state = maybeState as { displayName?: unknown; avatarDataUrl?: unknown };

    return {
      displayName: typeof state.displayName === "string" ? state.displayName : "",
      avatarDataUrl: typeof state.avatarDataUrl === "string" ? state.avatarDataUrl : null,
    };
  } catch {
    return null;
  }
}

export function ProfilePersonalizationPanel() {
  const displayName = useUserProfileStore((s) => s.displayName);
  const avatarDataUrl = useUserProfileStore((s) => s.avatarDataUrl);
  const setDisplayName = useUserProfileStore((s) => s.setDisplayName);
  const setAvatarDataUrl = useUserProfileStore((s) => s.setAvatarDataUrl);

  const [imageError, setImageError] = useState<string | null>(null);
  const [draftName, setDraftName] = useState(displayName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sessionSub = decodeJwtSubject(getAuthToken()) ?? "";
  const previewName = draftName.trim() || sessionSub || "Unsloth";
  const hasNameChanges = useMemo(
    () => draftName.trim() !== displayName.trim(),
    [draftName, displayName],
  );

  const saveName = () => {
    const trimmed = draftName.trim();
    if (trimmed !== draftName) setDraftName(trimmed);
    if (trimmed !== displayName) {
      setDisplayName(trimmed);
      const persisted = readPersistedProfile();
      if (persisted && persisted.displayName === trimmed) {
        toastSuccess("Profile name saved");
      } else {
        toastError(
          "Could not persist profile name",
          "Name updated for this session, but may not persist after reload.",
        );
      }
    }
  };

  const onPickFile = async (file: File | undefined) => {
    if (!file) return;
    setImageError(null);
    try {
      const dataUrl = await resizeImageFileToDataUrl(file);
      setAvatarDataUrl(dataUrl);
      const persisted = readPersistedProfile();
      if (persisted && persisted.avatarDataUrl === dataUrl) {
        toastSuccess("Profile photo updated");
      } else {
        toastError(
          "Could not persist profile photo",
          "Photo updated for this session, but may not persist after reload.",
        );
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not use this image.";
      setImageError(message);
      toastError("Could not update profile photo", message);
    }
  };

  return (
    <ProfilePersonalizationPanelView
      previewName={previewName}
      avatarDataUrl={avatarDataUrl}
      draftName={draftName}
      onDraftNameChange={setDraftName}
      onSaveName={saveName}
      hasNameChanges={hasNameChanges}
      onPickFile={onPickFile}
      imageError={imageError}
      fileInputRef={fileInputRef}
      sessionSub={sessionSub}
    />
  );
}
