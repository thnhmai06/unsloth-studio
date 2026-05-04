import type { Meta, StoryObj } from "@storybook/react";
import { LayoutControls as Component } from './layout-controls';

const meta: Meta = {
  title: "Features/RecipeStudio/Controls/Layout",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LeftToRight: Story = {
  args: {
    direction: "LR",
    onLayout: () => {},
    onToggleDirection: () => {},
  },
};

export const TopToBottom: Story = {
  args: {
    direction: "TB",
    onLayout: () => {},
    onToggleDirection: () => {},
  },
};
