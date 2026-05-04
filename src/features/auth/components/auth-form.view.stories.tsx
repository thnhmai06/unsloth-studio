import type { Meta, StoryObj } from "@storybook/react";
import { AuthFormView as Component, MOCK_AUTH_FORM_VIEW_PROPS } from './auth-form.view';

const meta: Meta<typeof Component> = {
  title: "Features/Auth/AuthFormView",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: MOCK_AUTH_FORM_VIEW_PROPS,
};

export const ChangePassword: Story = {
  args: {
    ...MOCK_AUTH_FORM_VIEW_PROPS,
    mode: "change-password",
    title: "Change Password",
    subtitle: "Create a new secure password.",
    submitLabel: "Update Password",
  },
};

export const Loading: Story = {
  args: {
    ...MOCK_AUTH_FORM_VIEW_PROPS,
    loading: true,
  },
};

export const Error: Story = {
  args: {
    ...MOCK_AUTH_FORM_VIEW_PROPS,
    error: "Invalid password. Please try again.",
  },
};
