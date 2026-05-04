import type { Meta, StoryObj } from "@storybook/react";
import {
  HoverCard as Component,
  HoverCardContent,
  HoverCardTrigger,
} from "./hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta: Meta = {
  title: "UI/HoverCard",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Component>
      <HoverCardTrigger asChild>
        <button className="underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground transition-colors">
          @unsloth
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/unslothai.png" />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@unsloth</h4>
            <p className="text-sm">
              The fastest way to train and fine-tune LLMs.
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Joined January 2024
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </Component>
  ),
};
