import type { Meta, StoryObj } from "@storybook/react";
import { DashboardGrid as Component } from './dashboard-grid';

const meta: Meta = {
  title: "UI/Layout/DashboardGrid",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    children: (
      <>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 1</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 2</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 3</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 4</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 5</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 6</div>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    children: (
      <>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 1</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 2</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 3</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 4</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 5</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 6</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 7</div>
        <div className="h-32 rounded-lg bg-muted/50 p-4">Item 8</div>
      </>
    ),
  },
};
