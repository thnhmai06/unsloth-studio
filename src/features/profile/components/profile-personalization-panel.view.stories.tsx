import type { Meta, StoryObj } from "@storybook/react";
import { ProfilePersonalizationPanelView as Component, MOCK_PROFILE_PERSONALIZATION_PANEL_PROPS } from './profile-personalization-panel.view';

const meta: Meta<typeof Component> = {
  title: "Features/Profile/ProfilePersonalizationPanelView",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: MOCK_PROFILE_PERSONALIZATION_PANEL_PROPS,
};

export const WithAvatar: Story = {
  args: {
    ...MOCK_PROFILE_PERSONALIZATION_PANEL_PROPS,
    avatarDataUrl: "https://github.com/shadcn.png",
  },
};

export const HasChanges: Story = {
  args: {
    ...MOCK_PROFILE_PERSONALIZATION_PANEL_PROPS,
    draftName: "New Sloth Name",
    hasNameChanges: true,
  },
};

export const WithError: Story = {
  args: {
    ...MOCK_PROFILE_PERSONALIZATION_PANEL_PROPS,
    imageError: "The image file is too large (max 2MB).",
  },
};
