import type { Meta, StoryObj } from "@storybook/react";
import { SummaryStep as Component } from './summary-step';

const meta: Meta = {
  title: "Features/Onboarding/Steps/SummaryStep",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
