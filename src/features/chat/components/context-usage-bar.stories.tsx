import type { Meta, StoryObj } from "@storybook/react";
import { ContextUsageBar as Component } from './context-usage-bar';

const meta: Meta<typeof Component> = {
  title: "features/chat/ContextUsageBar",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Low: Story = {
  args: {
    used: 1240,
    total: 32768,
    promptTokens: 1100,
    completionTokens: 140,
  },
};

export const Medium: Story = {
  args: {
    used: 22500,
    total: 32768,
    promptTokens: 20000,
    completionTokens: 2500,
    cached: 5000,
  },
};

export const High: Story = {
  args: {
    used: 31500,
    total: 32768,
    promptTokens: 30000,
    completionTokens: 1500,
  },
};

export const Full: Story = {
  args: {
    used: 32768,
    total: 32768,
    promptTokens: 32000,
    completionTokens: 768,
  },
};
