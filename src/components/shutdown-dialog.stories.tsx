import type { Meta, StoryObj } from "@storybook/react";
import { ShutdownDialog as Component } from './shutdown-dialog';

const meta: Meta<typeof Component> = {
  title: "components/ShutdownDialog",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
  },
};
