// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import type { Meta, StoryObj } from "@storybook/react";
import { CreateKeyForm as Component } from './create-key-form';

const meta: Meta<typeof Component> = {
  title: "Features/Settings/CreateKeyForm",
  component: Component,
  argTypes: {
    onCreated: { action: "created" },
    onError: { action: "error" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
