// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { useReducedMotion } from "motion/react";
import { useSettingsDialogStore, type SettingsTab } from "./stores/settings-dialog-store";
import { AboutTab } from "./tabs/about-tab";
import { ApiKeysTab } from "./tabs/api-keys-tab";
import { AppearanceTab } from "./tabs/appearance-tab";
import { ChatTab } from "./tabs/chat-tab";
import { GeneralTab } from "./tabs/general-tab";
import { ProfileTab } from "./tabs/profile-tab";
import { SettingsDialogView } from "./settings-dialog.view";

function renderTab(tab: SettingsTab) {
  switch (tab) {
    case "general":
      return <GeneralTab />;
    case "profile":
      return <ProfileTab />;
    case "appearance":
      return <AppearanceTab />;
    case "chat":
      return <ChatTab />;
    case "api-keys":
      return <ApiKeysTab />;
    case "about":
      return <AboutTab />;
  }
}

export function SettingsDialog() {
  const open = useSettingsDialogStore((s) => s.open);
  const activeTab = useSettingsDialogStore((s) => s.activeTab);
  const setActiveTab = useSettingsDialogStore((s) => s.setActiveTab);
  const closeDialog = useSettingsDialogStore((s) => s.closeDialog);
  const reduced = useReducedMotion();

  return (
    <SettingsDialogView
      open={open}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onClose={closeDialog}
      reducedMotion={Boolean(reduced)}
      activeTabContent={renderTab(activeTab)}
    />
  );
}
