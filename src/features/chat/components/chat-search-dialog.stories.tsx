import type { Meta, StoryObj } from "@storybook/react";
import { ChatSearchDialog as Component } from './chat-search-dialog';
import { useChatSearchStore } from "../stores/chat-search-store";
import { useEffect } from "react";

const meta: Meta<typeof Component> = {
  title: "features/chat/ChatSearchDialog",
  component: Component,
  decorators: [
    (Story) => {
      useEffect(() => {
        useChatSearchStore.getState().open();
      }, []);
      return <Story />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
