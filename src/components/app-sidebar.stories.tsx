import type { Meta, StoryObj } from "@storybook/react";
import { AppSidebar as Component } from './app-sidebar';

const meta: Meta<typeof Component> = {
  title: "components/AppSidebar",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
