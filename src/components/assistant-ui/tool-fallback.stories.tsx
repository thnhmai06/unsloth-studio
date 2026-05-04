import type { Meta, StoryObj } from "@storybook/react";
import { ToolFallback as Component } from './tool-fallback';

const meta: Meta = {
  title: "Assistant UI/Tool Fallback",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    toolName: "custom_tool",
    argsText: '{"param": "value"}',
    result: { status: "success", data: [1, 2, 3] },
    status: { type: "complete" },
  },
};

export const Running: Story = {
  args: {
    toolName: "long_running_task",
    argsText: '{"input": "large_file.txt"}',
    status: { type: "running" },
  },
};

export const Error: Story = {
  args: {
    toolName: "failing_tool",
    argsText: '{"action": "delete_all"}',
    status: { 
      type: "incomplete",
      reason: "error",
      error: "Permission denied: user does not have required scope."
    },
  },
};

export const Cancelled: Story = {
  args: {
    toolName: "expensive_computation",
    argsText: '{"iterations": 1000000}',
    status: { 
      type: "incomplete",
      reason: "cancelled"
    },
  },
};
