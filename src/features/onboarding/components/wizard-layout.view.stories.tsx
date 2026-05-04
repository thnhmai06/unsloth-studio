import type { Meta, StoryObj } from "@storybook/react";
import { WizardLayoutView as Component } from './wizard-layout.view';
import React from 'react';

const meta: Meta<typeof Component> = {
  title: "Features/Onboarding/WizardLayoutView",
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showSplash: false,
    splashComponent: <div className="p-8 bg-background border rounded-lg shadow-lg">Splash Screen</div>,
    sidebarComponent: <div className="w-64 bg-muted h-full p-6 border-r">Sidebar Content</div>,
    contentComponent: <div className="flex-1 p-8">Main Content Area</div>,
    footerComponent: <div className="p-4 border-t bg-muted/30">Footer Content</div>,
    confettiRef: { current: null }
  },
};

export const WithSplash: Story = {
  args: {
    ...Default.args,
    showSplash: true,
  },
};
