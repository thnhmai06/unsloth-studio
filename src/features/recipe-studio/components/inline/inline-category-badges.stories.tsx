import type { Meta, StoryObj } from "@storybook/react";
import { InlineCategoryBadges as Component } from './inline-category-badges';

const meta: Meta = {
  title: "Features/RecipeStudio/Inlines/CategoryBadges",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    values: ["Unsloth", "LLM", "Optimization", "Fine-tuning", "VRAM"],
  },
};

export const Empty: Story = {
  args: {
    values: [],
  },
};
