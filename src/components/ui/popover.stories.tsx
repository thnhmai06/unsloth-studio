import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div className="flex h-40 items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium">Width</span>
              <span className="col-span-2 text-sm text-muted-foreground italic">100%</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="text-sm font-medium">Height</span>
              <span className="col-span-2 text-sm text-muted-foreground italic">Auto</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const ManualOpen: Story = {
  render: () => (
    <div className="flex h-40 items-center justify-center">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">Always Open on Load</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <PopoverHeader>
            <PopoverTitle>Notice</PopoverTitle>
            <PopoverDescription>
              This popover is open by default for preview.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
