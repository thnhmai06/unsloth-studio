// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import type { ReactElement } from "react";
import { SettingsRow } from "../components/settings-row";
import { SettingsSection } from "../components/settings-section";

export interface GeneralTabViewProps {
  hfToken: string;
  onHfTokenChange: (value: string) => void;
  onHfTokenBlur: () => void;
  showToken: boolean;
  onToggleShowToken: () => void;
  autoTitle: boolean;
  onAutoTitleChange: (value: boolean) => void;
  chatOnly: boolean;
  onStartOnboarding: () => void;
  confirmOpen: boolean;
  onSetConfirmOpen: (value: boolean) => void;
  onResetPrefs: () => void;
}

export const MOCK_GENERAL_TAB_PROPS: GeneralTabViewProps = {
  hfToken: "hf_mock_token_123",
  onHfTokenChange: () => {},
  onHfTokenBlur: () => {},
  showToken: false,
  onToggleShowToken: () => {},
  autoTitle: true,
  onAutoTitleChange: () => {},
  chatOnly: false,
  onStartOnboarding: () => {},
  confirmOpen: false,
  onSetConfirmOpen: () => {},
  onResetPrefs: () => {},
};

export function GeneralTabView({
  hfToken,
  onHfTokenChange,
  onHfTokenBlur,
  showToken,
  onToggleShowToken,
  autoTitle,
  onAutoTitleChange,
  chatOnly,
  onStartOnboarding,
  confirmOpen,
  onSetConfirmOpen,
  onResetPrefs,
}: GeneralTabViewProps): ReactElement {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold font-heading">General</h1>
        <p className="text-xs text-muted-foreground">
          Global preferences for Unsloth Studio.
        </p>
      </header>

      <SettingsSection title="Account">
        <SettingsRow
          label="Hugging Face token"
          description="Used to load gated models and push artifacts."
        >
          <div className="relative w-[260px]">
            <Input
              type={showToken ? "text" : "password"}
              placeholder="hf_…"
              value={hfToken}
              onChange={(e) => onHfTokenChange(e.target.value)}
              onBlur={onHfTokenBlur}
              className="h-8 w-full pr-8 font-mono text-xs"
            />
            <button
              type="button"
              onClick={onToggleShowToken}
              className="absolute right-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showToken ? "Hide token" : "Show token"}
              tabIndex={-1}
            >
              {showToken ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
            </button>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Chat defaults">
        <SettingsRow
          label="Auto-title new chats"
          description="Generate a short title from the first message."
        >
          <Switch checked={autoTitle} onCheckedChange={onAutoTitleChange} />
        </SettingsRow>
      </SettingsSection>

      {!chatOnly && (
        <SettingsSection title="Getting started">
          <SettingsRow
            label="Start onboarding"
            description="Open the setup wizard again without changing your account."
          >
            <Button
              variant="outline"
              size="sm"
              onClick={onStartOnboarding}
            >
              Start onboarding
            </Button>
          </SettingsRow>
        </SettingsSection>
      )}

      <SettingsSection title="Danger zone">
        <SettingsRow
          destructive
          label="Reset all local preferences"
          description="Clears theme, tokens, sidebar state, and presets. Chats and API keys are not affected."
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetConfirmOpen(true)}
            className="text-destructive hover:text-destructive hover:border-destructive/60"
          >
            Reset preferences
          </Button>
        </SettingsRow>
      </SettingsSection>

      <Dialog open={confirmOpen} onOpenChange={onSetConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reset all local preferences?</DialogTitle>
            <DialogDescription>
              This clears your theme, tokens, and stored settings, then reloads
              Studio. Chats and API keys are not affected.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onSetConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={onResetPrefs}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Reset and reload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
