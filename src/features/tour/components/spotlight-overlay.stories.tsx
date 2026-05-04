import type { Meta, StoryObj } from "@storybook/react";
import { SpotlightOverlay as Component } from './spotlight-overlay';

const meta: Meta = {
  title: "Features/Tour/SpotlightOverlay",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rect: { x: 100, y: 100, w: 200, h: 50 },
    vw: 1024,
    vh: 768,
    maskId: "storybook-mask",
  },
};
