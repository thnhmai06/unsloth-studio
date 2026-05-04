import type { Meta, StoryObj } from "@storybook/react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "./combobox";
import * as React from "react";

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState("");

    return (
      <div className="flex h-64 items-start justify-center p-4">
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxInput placeholder="Search framework..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              <ComboboxGroup>
                <ComboboxLabel>Frameworks</ComboboxLabel>
                {frameworks.map((framework) => (
                  <ComboboxItem key={framework.value} value={framework.value}>
                    {framework.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    );
  },
};

export const Open: Story = {
  render: () => (
    <div className="flex h-64 items-start justify-center p-4">
      <Combobox defaultOpen>
        <ComboboxInput placeholder="Search framework..." />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Frameworks</ComboboxLabel>
              {frameworks.map((framework) => (
                <ComboboxItem key={framework.value} value={framework.value}>
                  {framework.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
};
