import type { Meta, StoryObj } from "@storybook/react";
import { SparklesText as Component } from './sparkles-text';

const meta: Meta = {
  title: "Auto/components/ui/sparkles-text",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    children: "Preview"
  },
};
