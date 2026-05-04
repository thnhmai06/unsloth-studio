import type { Meta, StoryObj } from "@storybook/react";
import { ProfilePersonalizationPanel as Component } from './profile-personalization-panel';

const meta: Meta = {
  title: "Auto/features/profile/components/profile-personalization-panel",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
