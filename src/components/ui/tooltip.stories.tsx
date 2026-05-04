import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip as Component } from './tooltip';

const meta: Meta = {
  title: "Auto/components/ui/tooltip",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    children: "Preview"
  },
};
