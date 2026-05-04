// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import type { Meta, StoryObj } from "@storybook/react";
import { ApiKeyRow as Component } from './api-key-row';

const meta: Meta<typeof Component> = {
  title: "Features/Settings/ApiKeyRow",
  component: Component,
  argTypes: {
    onRevoke: { action: "revoked" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiKey: {
      id: 1,
      name: "Production Key",
      key_prefix: "abcd",
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
      last_used_at: new Date(Date.now() - 3600000).toISOString(),
      expires_at: null,
      is_active: true,
    },
  },
};

export const ExpiringSoon: Story = {
  args: {
    apiKey: {
      id: 2,
      name: "Development Key",
      key_prefix: "xyzw",
      created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
      last_used_at: new Date(Date.now() - 86400000).toISOString(),
      expires_at: new Date(Date.now() + 2 * 86400000).toISOString(),
      is_active: true,
    },
  },
};
