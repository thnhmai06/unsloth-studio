import type { Meta, StoryObj } from "@storybook/react";
import { MermaidError as Component } from './mermaid-error';

const meta: Meta<typeof Component> = {
  title: "components/markdown/MermaidError",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: "Parse error on line 2: ... Expected one of 'graph', 'sequenceDiagram' ...",
    chart: "graph TD\nA -> B\n// invalid comment style",
    retry: () => console.log("Retry clicked"),
  },
};
