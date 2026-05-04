// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import type { Meta, StoryObj } from "@storybook/react";
import { SettingsRow as Component } from './settings-row';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const meta: Meta<typeof Component> = {
  title: "Features/Settings/SettingsRow",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithButton: Story = {
  args: {
    label: "Email Notifications",
    description: "Receive updates about your account activity.",
    children: <Button variant="outline" size="sm">Configure</Button>,
  },
};

export const WithSwitch: Story = {
  args: {
    label: "Public Profile",
    description: "Allow others to see your training progress.",
    children: <Switch />,
  },
};

export const Destructive: Story = {
  args: {
    label: "Delete Account",
    description: "Permanently delete your account and all associated data.",
    destructive: true,
    children: <Button variant="destructive" size="sm">Delete Account</Button>,
  },
};
