import type { Meta, StoryObj } from "@storybook/react";
import { HyperparametersStep as Component } from './hyperparameters-step';

const meta: Meta = {
  title: "Features/Onboarding/Steps/HyperparametersStep",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
