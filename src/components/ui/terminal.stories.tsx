import type { Meta, StoryObj } from "@storybook/react";
import {
  AnimatedSpan,
  Terminal as Component,
  TypingAnimation,
} from "./terminal";

const meta: Meta = {
  title: "UI/Terminal",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Component>
      <TypingAnimation>$ npx unsloth-studio init</TypingAnimation>
      <AnimatedSpan delay={1500} className="text-green-500">
        ✔ Preflight checks passed.
      </AnimatedSpan>
      <AnimatedSpan delay={2000} className="text-green-500">
        ✔ Dependencies installed.
      </AnimatedSpan>
      <AnimatedSpan delay={2500} className="text-green-500">
        ✔ Config file created.
      </AnimatedSpan>
      <AnimatedSpan delay={3000} className="text-blue-500">
        ℹ Starting development server...
      </AnimatedSpan>
      <TypingAnimation delay={3500}>
        $ unsloth-studio dev --port 3000
      </TypingAnimation>
      <AnimatedSpan delay={4000} className="text-green-500">
        ✔ Ready! Server running at http://localhost:3000
      </AnimatedSpan>
    </Component>
  ),
};
