import type { Meta, StoryObj } from "@storybook/react";
import { UsageExamples as Component } from './usage-examples';

const meta: Meta = {
  title: "Auto/features/settings/components/usage-examples",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
