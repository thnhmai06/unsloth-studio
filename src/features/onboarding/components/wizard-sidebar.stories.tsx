import type { Meta, StoryObj } from "@storybook/react";
import { WizardSidebar as Component } from './wizard-sidebar';
import { useTrainingConfigStore } from "@/features/training";
import { useEffect } from "react";

const SetStepDecorator = (step: number) => (Story: any) => {
  const setStep = useTrainingConfigStore((s) => s.setStep);
  useEffect(() => {
    setStep(step as any);
  }, [setStep]);
  return <Story />;
};

const meta: Meta<typeof Component> = {
  title: "Features/Onboarding/WizardSidebar",
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  args: {
    returnTo: "/chat"
  },
  decorators: [SetStepDecorator(1)],
};

export const Step3: Story = {
  args: {
    returnTo: "/chat"
  },
  decorators: [SetStepDecorator(3)],
};
