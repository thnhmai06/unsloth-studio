import type { Meta, StoryObj } from "@storybook/react";
import { SectionCard as Component } from './section-card';
import { DatabaseIcon } from "lucide-react";

const meta: Meta<typeof Component> = {
  title: "components/SectionCard",
  component: Component,
  argTypes: {
    accent: {
      control: "select",
      options: ["emerald", "indigo", "orange", "blue"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <DatabaseIcon className="size-4" />,
    title: "Dataset Configuration",
    description: "Configure your dataset source and preprocessing steps.",
    children: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">Source Path</span>
          <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">./data/train.jsonl</code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">Validation Split</span>
          <span className="text-xs text-muted-foreground">10%</span>
        </div>
      </div>
    ),
  },
};

export const Featured: Story = {
  args: {
    ...Default.args,
    featured: true,
    badge: "Recommended",
  },
};

export const Indigo: Story = {
  args: {
    ...Default.args,
    accent: "indigo",
    title: "Model Architecture",
    description: "Select and tune the base model architecture.",
  },
};
