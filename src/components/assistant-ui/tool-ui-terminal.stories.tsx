import type { Meta, StoryObj } from "@storybook/react";
import { TerminalToolUI as Component } from './tool-ui-terminal';

const meta: Meta = {
  title: "Assistant UI/Terminal Tool UI",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    args: { command: "ls -R" },
    result: ".:\nREADME.md\npackage.json\nsrc\n\n./src:\napp\ncomponents\nfeatures\n\n./src/components:\nassistant-ui\nui",
    status: { type: "complete" }
  },
};

export const Running: Story = {
  args: {
    args: { command: "npm install" },
    status: { type: "running" }
  },
};

export const MultiLine: Story = {
  args: {
    args: { command: "git log -n 5 --oneline" },
    result: "a1b2c3d Initial commit\ne5f6g7h Add README\ni9j0k1l Fix bug in main.tsx\nm2n3o4p Update dependencies\nq5r6s7t Release v1.0.0",
    status: { type: "complete" }
  },
};
