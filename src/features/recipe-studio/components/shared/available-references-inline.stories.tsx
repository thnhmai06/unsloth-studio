import type { Meta, StoryObj } from "@storybook/react";
import { AvailableReferencesInline as Component } from './available-references-inline';

const meta: Meta = {
  title: "Features/RecipeStudio/Shared/AvailableReferencesInline",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entries: [
      { source: "seed", name: "input_ids" },
      { source: "seed", name: "attention_mask" },
      { source: "node", name: "output_0" },
      { source: "node", name: "output_1" },
      { source: "node", name: "labels" },
      { source: "node", name: "loss" },
      { source: "node", name: "logits" },
    ],
  },
};
