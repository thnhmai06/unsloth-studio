import type { Meta, StoryObj } from "@storybook/react";
import { WizardStepItem as Component } from './wizard-step-item';
import { STEPS } from "@/config/training";
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
  title: "Features/Onboarding/WizardStepItem",
  component: Component,
  decorators: [
    (Story) => (
      <div className="w-64 p-4 bg-muted/30">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Current: Story = {
  args: {
    step: STEPS[1],
  },
  decorators: [SetStepDecorator(2)],
};

export const Upcoming: Story = {
  args: {
    step: STEPS[2],
  },
  decorators: [SetStepDecorator(1)],
};

export const Completed: Story = {
  args: {
    step: STEPS[0],
  },
  decorators: [SetStepDecorator(2)],
};
