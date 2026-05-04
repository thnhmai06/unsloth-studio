import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/components/ui/scroll-area",
  component: ScrollArea,
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: (args) => (
    <ScrollArea {...args} className="h-72 w-48 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i, a) => (
          <div key={i}>
            <div className="text-sm">v1.2.0-beta.{a.length - i}</div>
            <div className="bg-border my-2 h-px" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
