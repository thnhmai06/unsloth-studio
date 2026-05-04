import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Assistant UI/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "outline",
        "secondary",
        "muted",
        "ghost",
        "info",
        "warning",
        "success",
        "destructive",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Beta",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Completed",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "New Feature",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Low Memory",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Error",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "v1.2.3",
  },
};
