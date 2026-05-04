import type { Meta, StoryObj } from "@storybook/react";
import {
  InputGroup as Component,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const meta: Meta = {
  title: "UI/InputGroup",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <Component>
        <InputGroupAddon align="inline-start">
          <HugeiconsIcon icon={Search01Icon} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </Component>

      <Component>
        <InputGroupInput placeholder="Email" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="outline">Subscribe</InputGroupButton>
        </InputGroupAddon>
      </Component>

      <Component>
        <InputGroupAddon align="inline-start">
          <span className="text-xs font-mono">https://</span>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </Component>
    </div>
  ),
};
