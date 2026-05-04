import type { Meta, StoryObj } from "@storybook/react";
import { WizardLayout as Component } from './wizard-layout';

const meta: Meta<typeof Component> = {
  title: "Features/Onboarding/WizardLayout",
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
