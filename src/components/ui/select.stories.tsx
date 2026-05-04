import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <div className="min-h-40 flex items-start justify-center p-6">
      <Select defaultValue="model-1">
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="model-1">Qwen 2.5 7B</SelectItem>
          <SelectItem value="model-2">Llama 3.1 8B</SelectItem>
          <SelectItem value="model-3">Gemma 2 9B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className="min-h-60 flex items-start justify-center p-6">
      <Select>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="min-h-40 flex items-start justify-center p-6">
      <Select defaultValue="1">
        <SelectTrigger size="sm" className="w-32">
          <SelectValue placeholder="Page size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">10 per page</SelectItem>
          <SelectItem value="2">20 per page</SelectItem>
          <SelectItem value="3">50 per page</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
