import type { Meta, StoryObj } from "@storybook/react";
import { ModelTypeStep as Component } from './model-type-step';

const meta: Meta = {
  title: "Features/Onboarding/Steps/ModelTypeStep",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
