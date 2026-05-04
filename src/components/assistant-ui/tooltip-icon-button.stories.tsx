import type { Meta, StoryObj } from "@storybook/react";
import { TooltipIconButton as Component } from './tooltip-icon-button';
import { SettingsIcon } from "lucide-react";

const meta: Meta<typeof Component> = {
  title: "components/assistant-ui/TooltipIconButton",
  component: Component,
  argTypes: {
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tooltip: "Settings",
    children: <SettingsIcon className="size-4" />,
  },
};

export const Top: Story = {
  args: {
    tooltip: "Settings",
    side: "top",
    children: <SettingsIcon className="size-4" />,
  },
};
