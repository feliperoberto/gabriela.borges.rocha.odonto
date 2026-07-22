import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ChapterToday } from "./ChapterToday";

const meta: Meta<typeof ChapterToday> = {
  title: "Landing/ChapterToday",
  component: ChapterToday,
};

export default meta;
type Story = StoryObj<typeof ChapterToday>;

export const Default: Story = {};
