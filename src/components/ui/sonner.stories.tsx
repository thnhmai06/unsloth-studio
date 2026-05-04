import type { Meta, StoryObj } from "@storybook/react";
import { Toaster as Component } from "./sonner";
import { toast } from "sonner";
import { Button } from "./button";

const meta: Meta = {
  title: "UI/Sonner",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Component />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Success! Data saved.")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Error! Something went wrong.")}
        >
          Error
        </Button>
      </div>
    </div>
  ),
};
