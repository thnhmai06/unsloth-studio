// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import type { ReactElement } from "react";
import { UserAvatar } from "./user-avatar";

export interface ProfilePersonalizationPanelViewProps {
  previewName: string;
  avatarDataUrl: string | null;
  draftName: string;
  onDraftNameChange: (value: string) => void;
  onSaveName: () => void;
  hasNameChanges: boolean;
  onPickFile: (file: File | undefined) => void;
  imageError: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  sessionSub: string;
}

export const MOCK_PROFILE_PERSONALIZATION_PANEL_PROPS: ProfilePersonalizationPanelViewProps = {
  previewName: "Unsloth",
  avatarDataUrl: null,
  draftName: "Unsloth",
  onDraftNameChange: () => {},
  onSaveName: () => {},
  hasNameChanges: false,
  onPickFile: () => {},
  imageError: null,
  fileInputRef: { current: null },
  sessionSub: "user@unsloth.ai",
};

export function ProfilePersonalizationPanelView({
  previewName,
  avatarDataUrl,
  draftName,
  onDraftNameChange,
  onSaveName,
  hasNameChanges,
  onPickFile,
  imageError,
  fileInputRef,
  sessionSub,
}: ProfilePersonalizationPanelViewProps): ReactElement {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-6 rounded-2xl border border-border/70 bg-muted/10 px-8 py-7">
      <div className="relative">
        <UserAvatar
          name={previewName}
          imageUrl={avatarDataUrl}
          size="lg"
          className="size-[124px] text-[3.15rem]"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={(e) => {
            onPickFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute right-0 bottom-0 -translate-x-[15.625%] -translate-y-[15.625%] flex size-8 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Change profile picture"
        >
          <Camera className="size-3.5" strokeWidth={2} />
        </button>
      </div>

      <div className="flex w-full max-w-[560px] flex-col gap-2">
        <Label htmlFor="profile-display-name" className="text-xs font-medium text-muted-foreground">
          Display name
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="profile-display-name"
            type="text"
            value={draftName}
            onChange={(e) => onDraftNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSaveName();
              }
            }}
            autoComplete="off"
            placeholder={sessionSub || "Unsloth"}
            className="h-10 min-w-0 flex-1 rounded-lg text-sm"
          />
          <Button type="button" size="sm" className="h-10 px-5" onClick={onSaveName} disabled={!hasNameChanges}>
            Save
          </Button>
        </div>
      </div>

      {imageError ? (
        <p className="w-full text-xs text-destructive" role="alert">
          {imageError}
        </p>
      ) : null}
    </div>
  );
}
