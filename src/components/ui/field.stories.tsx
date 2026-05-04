import type { Meta, StoryObj } from "@storybook/react";
import {
  Field as Component,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./field";
import { Input } from "./input";

const meta: Meta = {
  title: "UI/Field",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Component>
      <FieldLabel>Email address</FieldLabel>
      <FieldContent>
        <Input type="email" placeholder="Email" />
        <FieldDescription>
          We'll never share your email with anyone else.
        </FieldDescription>
      </FieldContent>
    </Component>
  ),
};

export const WithError: Story = {
  render: () => (
    <Component>
      <FieldLabel>Password</FieldLabel>
      <FieldContent>
        <Input type="password" placeholder="Password" />
        <FieldError errors={[{ message: "Password is too short" }]} />
      </FieldContent>
    </Component>
  ),
};
