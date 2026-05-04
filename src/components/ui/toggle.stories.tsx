import type { Meta, StoryObj } from "@storybook/react";
import { Toggle as Component } from './toggle';

const meta: Meta = {
  title: "Auto/components/ui/toggle",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
