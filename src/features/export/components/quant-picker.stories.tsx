import type { Meta, StoryObj } from "@storybook/react";
import { QuantPicker as Component } from './quant-picker';

const meta: Meta<typeof Component> = {
  title: "Features/Export/QuantPicker",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: [],
    onChange: () => {}
  },
};

export const Selected: Story = {
  args: {
    value: ["q4_k_m", "q8_0"],
    onChange: () => {}
  },
};
