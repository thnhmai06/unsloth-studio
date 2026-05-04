import type { Meta, StoryObj } from "@storybook/react";
import { ShimmerButton as Component } from './shimmer-button';

const meta: Meta = {
  title: "Auto/components/ui/shimmer-button",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    children: "Preview"
  },
};
