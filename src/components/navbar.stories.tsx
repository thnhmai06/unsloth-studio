import type { Meta, StoryObj } from "@storybook/react";
import { Navbar as Component } from './navbar';

const meta: Meta<typeof Component> = {
  title: "components/Navbar",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
