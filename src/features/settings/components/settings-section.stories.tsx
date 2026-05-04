// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import type { Meta, StoryObj } from "@storybook/react";
import { SettingsSection as Component } from './settings-section';
import { SettingsRow } from "./settings-row";
import { Switch } from "@/components/ui/switch";

const meta: Meta<typeof Component> = {
  title: "Features/Settings/SettingsSection",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Appearance",
    description: "Customize how the studio looks on your screen.",
    children: (
      <>
        <SettingsRow label="Dark Mode" description="Use a dark theme for the interface.">
          <Switch />
        </SettingsRow>
        <SettingsRow label="Reduce Motion" description="Minimize animations across the app.">
          <Switch />
        </SettingsRow>
      </>
    ),
  },
};
