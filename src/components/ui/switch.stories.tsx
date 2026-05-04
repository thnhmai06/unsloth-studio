import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "UI/components/ui/switch",
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <label htmlFor="airplane-mode" className="text-sm font-medium leading-none">
        Airplane Mode
      </label>
    </div>
  ),
};
