import type { Meta, StoryObj } from "@storybook/react";
import { InternalsSync as Component } from './internals-sync';

const meta: Meta = {
  title: "Features/RecipeStudio/Graph/InternalsSync",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nodeIds: ["node-1", "node-2", "node-3"],
  },
};
