import type { Meta, StoryObj } from "@storybook/react";
import { RecipeNodeView as Component } from './recipe-graph-node.view';

const meta: Meta = {
  title: "Auto/features/recipe-studio/components/recipe-graph-node.view",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    id: "Preview",
    data: undefined,
    selected: true,
    config: undefined,
    summary: "Preview",
    localProviderNames: "Preview",
    llmAuxVisible: true,
    isDisconnected: true,
    missingDataInput: true
  },
};
