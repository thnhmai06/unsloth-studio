import type { Meta, StoryObj } from "@storybook/react";
import { AuthFormView, MOCK_AUTH_FORM_VIEW_PROPS } from "./auth-form.view";

const meta: Meta<typeof AuthFormView> = {
  title: "Organisms/Auth/AuthForm",
  component: AuthFormView,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["login", "change-password"],
    },
    loading: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AuthFormView>;

export const Login: Story = {
  args: {
    ...MOCK_AUTH_FORM_VIEW_PROPS,
    mode: "login",
  },
};

export const ChangePassword: Story = {
  args: {
    ...MOCK_AUTH_FORM_VIEW_PROPS,
    mode: "change-password",
    title: "Setup your account",
    subtitle: "Choose a new password",
    submitLabel: "Change password",
  },
};

export const Loading: Story = {
  args: {
    ...Login.args,
    loading: true,
  },
};

export const ErrorState: Story = {
  args: {
    ...Login.args,
    error: "Invalid password. Please try again.",
  },
};
