import type { Meta, StoryObj } from "@storybook/react";
import { ChatPageView } from "./chat-page.view";
import React from "react";

const meta: Meta<typeof ChatPageView> = {
  title: "Organisms/Chat/ChatPage",
  component: ChatPageView,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    view: {
      control: "radio",
      options: ["single", "compare"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatPageView>;

export const SingleView: Story = {
  args: {
    view: "single",
    sidebarOpen: true,
    onToggleSettings: () => {},
    headerContent: (
      <div className="flex items-center gap-2">
        <span className="font-semibold">Llama-3-8B-Instruct</span>
        <span className="text-xs text-muted-foreground">Local Model</span>
      </div>
    ),
    mainContent: (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        Thread Content Area
      </div>
    ),
    composerContent: (
      <div className="h-20 w-full rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
        Composer Placeholder
      </div>
    ),
  },
};

export const CompareView: Story = {
  args: {
    ...SingleView.args,
    view: "compare",
    mainContent: (
      <>
        <div className="flex flex-1 items-center justify-center border-r text-muted-foreground">
          Model A (Base)
        </div>
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          Model B (LoRA)
        </div>
      </>
    ),
  },
};
