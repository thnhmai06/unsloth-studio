import type { Meta, StoryObj } from "@storybook/react";
import { DataEdge as Component } from './data-edge';

const meta: Meta = {
  title: "Auto/features/recipe-studio/components/rf-ui/data-edge",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
