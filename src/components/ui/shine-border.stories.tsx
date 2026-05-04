import type { Meta, StoryObj } from "@storybook/react";
import { ShineBorder as Component } from './shine-border';

const meta: Meta = {
  title: "Auto/components/ui/shine-border",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
