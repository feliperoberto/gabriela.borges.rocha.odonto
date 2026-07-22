import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EmailIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from "./Icon";

function IconRow() {
  return (
    <div style={{ display: "flex", gap: 16, color: "#592A19" }}>
      <WhatsAppIcon />
      <PhoneIcon />
      <InstagramIcon />
      <EmailIcon />
    </div>
  );
}

const meta: Meta<typeof IconRow> = {
  title: "UI/Icon",
  component: IconRow,
};

export default meta;
type Story = StoryObj<typeof IconRow>;

export const AllIcons: Story = {};
