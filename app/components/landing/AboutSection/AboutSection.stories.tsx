import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AboutSection } from "./AboutSection";

const meta: Meta<typeof AboutSection> = {
  title: "Landing/AboutSection",
  component: AboutSection,
};

export default meta;
type Story = StoryObj<typeof AboutSection>;

export const Default: Story = {};
