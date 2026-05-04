import type { Meta, StoryObj } from "@storybook/react";
import { DashboardLayout as Component } from './dashboard-layout';

const meta: Meta = {
  title: "UI/Layout/DashboardLayout",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome to your dashboard. This is the main content area.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-40 rounded-xl border bg-card p-4 shadow-sm">Card 1</div>
          <div className="h-40 rounded-xl border bg-card p-4 shadow-sm">Card 2</div>
          <div className="h-40 rounded-xl border bg-card p-4 shadow-sm">Card 3</div>
        </div>
      </div>
    ),
  },
};
