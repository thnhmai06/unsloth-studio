import type { Meta, StoryObj } from "@storybook/react";
import { DatasetStep as Component } from './dataset-step';

const meta: Meta = {
  title: "Features/Onboarding/Steps/DatasetStep",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
