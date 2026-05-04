import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayoutView as Component } from './dashboard-layout.view';

const meta: Meta = {
  title: "UI/Layout/DashboardLayoutView",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebar: (
      <div className="w-64 border-r bg-muted/30 p-4">
        <div className="font-bold">Sidebar Mock</div>
        <nav className="mt-4 space-y-2">
          <div className="h-8 rounded bg-muted/50" />
          <div className="h-8 rounded bg-muted/50" />
          <div className="h-8 rounded bg-muted/50" />
        </nav>
      </div>
    ),
    header: (
      <header className="flex h-16 items-center border-b px-6">
        <div className="font-semibold">Header Mock</div>
      </header>
    ),
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Content Area</h1>
        <p className="mt-2 text-muted-foreground">
          This is where the main content of the page goes.
        </p>
      </div>
    ),
  },
};
