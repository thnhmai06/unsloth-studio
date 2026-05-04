import type { Meta, StoryObj } from "@storybook/react";
import { LightRays as Component } from './light-rays';

const meta: Meta = {
  title: "Auto/components/ui/light-rays",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
