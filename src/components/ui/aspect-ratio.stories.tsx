import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio as Component } from './aspect-ratio';

const meta: Meta = {
  title: "Auto/components/ui/aspect-ratio",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
