import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RevealGroup } from "./RevealGroup";

const meta: Meta<typeof RevealGroup> = {
  title: "UI/RevealGroup",
  component: RevealGroup,
};

export default meta;
type Story = StoryObj<typeof RevealGroup>;

export const Default: Story = {
  args: {
    children: (
      <p style={{ font: "500 20px sans-serif", color: "#592A19" }}>
        Revealed on scroll (visible immediately here since it starts in view).
      </p>
    ),
  },
};
