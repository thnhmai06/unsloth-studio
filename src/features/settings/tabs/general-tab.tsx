// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { usePlatformStore } from "@/config/env";
import { resetOnboardingDone } from "@/features/auth";
import { useChatRuntimeStore } from "@/features/chat/stores/chat-runtime-store";
import { useSettingsDialogStore } from "@/features/settings";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GeneralTabView } from "./general-tab.view";

const PREFS_KEYS: string[] = [
  "theme",
  "sidebar_pinned",
  "unsloth_sidebar_navigate_open",
  "unsloth_settings_active_tab",
  "unsloth_chat_auto_title",
  "unsloth_hf_token",
  "unsloth_auto_heal_tool_calls",
  "unsloth_max_tool_calls_per_message",
  "unsloth_tool_call_timeout",
  "unsloth_chat_inference_params",
  "unsloth_chat_collapsible_state",
  "unsloth_chat_custom_presets",
  "unsloth_chat_active_preset",
  "unsloth_chat_system_prompts",
  "unsloth_chat_system_prompts_migrated",
  "unsloth_training_config_v1",
  "unsloth_prev_max_steps",
  "unsloth_prev_save_steps",
  "unsloth_user_profile",
  "tour:studio:v1",
];

let resetInProgress = false;

function resetAllPrefs() {
  resetInProgress = true;
  for (const key of PREFS_KEYS) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
  window.location.reload();
}

export function GeneralTab() {
  const navigate = useNavigate();
  const closeSettings = useSettingsDialogStore((s) => s.closeDialog);
  const { pathname, searchStr } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      searchStr:
        "searchStr" in s.location
          ? (s.location as { searchStr?: string }).searchStr ?? ""
          : typeof window !== "undefined"
            ? window.location.search
            : "",
    }),
  });
  const hfToken = useChatRuntimeStore((s) => s.hfToken);
  const setHfToken = useChatRuntimeStore((s) => s.setHfToken);
  const autoTitle = useChatRuntimeStore((s) => s.autoTitle);
  const setAutoTitle = useChatRuntimeStore((s) => s.setAutoTitle);
  const chatOnly = usePlatformStore((s) => s.chatOnly);
  const redirectTo = `${pathname}${searchStr}`;

  const [draftToken, setDraftToken] = useState(hfToken ?? "");
  const [showToken, setShowToken] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const draftRef = useRef(draftToken);
  useEffect(() => {
    draftRef.current = draftToken;
  }, [draftToken]);

  useEffect(() => {
    return () => {
      if (resetInProgress) return;
      const trimmed = draftRef.current.trim();
      const current = useChatRuntimeStore.getState().hfToken;
      if (trimmed !== current) {
        useChatRuntimeStore.getState().setHfToken(trimmed);
      }
    };
  }, []);

  const commitToken = () => {
    const trimmed = draftToken.trim();
    if (trimmed !== draftToken) setDraftToken(trimmed);
    if (trimmed !== hfToken) setHfToken(trimmed);
  };

  const handleStartOnboarding = () => {
    resetOnboardingDone();
    closeSettings();
    navigate({ to: "/onboarding", search: { redirectTo } });
  };

  return (
    <GeneralTabView
      hfToken={draftToken}
      onHfTokenChange={setDraftToken}
      onHfTokenBlur={commitToken}
      showToken={showToken}
      onToggleShowToken={() => setShowToken((s) => !s)}
      autoTitle={autoTitle}
      onAutoTitleChange={setAutoTitle}
      chatOnly={chatOnly}
      onStartOnboarding={handleStartOnboarding}
      confirmOpen={confirmOpen}
      onSetConfirmOpen={setConfirmOpen}
      onResetPrefs={resetAllPrefs}
    />
  );
}
