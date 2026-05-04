import type { Meta, StoryObj } from "@storybook/react";
import { MethodPicker as Component } from './method-picker';

const meta: Meta<typeof Component> = {
  title: "Features/Export/MethodPicker",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Merged: Story = {
  args: {
    value: "merged",
    onChange: () => {}
  },
};

export const LoRA: Story = {
  args: {
    value: "lora",
    onChange: () => {}
  },
};

export const GGUF: Story = {
  args: {
    value: "gguf",
    onChange: () => {}
  },
};

export const Disabled: Story = {
  args: {
    value: "merged",
    onChange: () => {},
    disabledMethods: ["gguf"],
    disabledReason: "GGUF export requires a base model that supports it."
  },
};
