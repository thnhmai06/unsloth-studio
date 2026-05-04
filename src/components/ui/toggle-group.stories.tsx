import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup as Component, ToggleGroupItem } from "./toggle-group";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const meta: Meta = {
  title: "UI/ToggleGroup",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Component type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <HugeiconsIcon icon={TextBoldIcon} className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <HugeiconsIcon icon={TextItalicIcon} className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <HugeiconsIcon icon={TextUnderlineIcon} className="size-4" />
      </ToggleGroupItem>
    </Component>
  ),
};
