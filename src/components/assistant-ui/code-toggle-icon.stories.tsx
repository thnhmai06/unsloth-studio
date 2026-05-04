import type { Meta, StoryObj } from "@storybook/react";
import { CodeToggleIcon } from "./code-toggle-icon";

const meta: Meta<typeof CodeToggleIcon> = {
  title: "Assistant UI/CodeToggleIcon",
  component: CodeToggleIcon,
};

export default meta;

type Story = StoryObj<typeof CodeToggleIcon>;

export const Default: Story = {
  render: (args) => (
    <div className="p-4 bg-muted w-fit rounded-md">
      <CodeToggleIcon {...args} className="size-6" />
    </div>
  ),
};
