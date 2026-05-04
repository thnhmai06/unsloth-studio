import type { Meta, StoryObj } from "@storybook/react";
import { ModelSelectionStep as Component } from './model-selection-step';

const meta: Meta = {
  title: "Features/Onboarding/Steps/ModelSelectionStep",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
