import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible as Component,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

const meta: Meta = {
  title: "UI/Collapsible",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Component {...args} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <button className="rounded-md p-1 hover:bg-accent">
            <span className="sr-only">Toggle</span>
            Open
          </button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Component>
  ),
};
