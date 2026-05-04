// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import type { Meta, StoryObj } from "@storybook/react";
import { KeyRevealCard as Component } from './key-reveal-card';

const meta: Meta<typeof Component> = {
  title: "Features/Settings/KeyRevealCard",
  component: Component,
  argTypes: {
    onDone: { action: "done" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rawKey: "sk-unsloth-abcd1234efgh5678ijkl9012mnop3456",
  },
};
