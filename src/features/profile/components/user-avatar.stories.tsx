import type { Meta, StoryObj } from "@storybook/react";
import { UserAvatar as Component } from './user-avatar';

const meta: Meta = {
  title: "Auto/features/profile/components/user-avatar",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    name: "Preview",
    imageUrl: "Preview",
    size: undefined
  },
};
