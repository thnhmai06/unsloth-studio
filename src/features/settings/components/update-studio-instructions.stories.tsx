import type { Meta, StoryObj } from "@storybook/react";
import { UpdateStudioInstructions as Component } from './update-studio-instructions';

const meta: Meta = {
  title: "Auto/features/settings/components/update-studio-instructions",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
