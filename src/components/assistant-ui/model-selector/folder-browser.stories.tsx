import type { Meta, StoryObj } from "@storybook/react";
import { FolderBrowser as Component } from './folder-browser';

const meta: Meta = {
  title: "Assistant UI/Model Selector/Folder Browser",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    initialPath: "/home/user/models",
    onOpenChange: () => {},
    onSelect: (path: string) => console.log("Selected:", path),
    children: <button className="rounded-md border p-2">Open Folder Browser</button>
  },
};
