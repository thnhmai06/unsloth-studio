import type { Meta, StoryObj } from "@storybook/react";
import { ViewportControls as Component } from './viewport-controls';

const meta: Meta = {
  title: "Features/RecipeStudio/Controls/Viewport",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    interactive: true,
    onToggleInteractive: () => {},
  },
};

export const Locked: Story = {
  args: {
    interactive: false,
    onToggleInteractive: () => {},
  },
};
