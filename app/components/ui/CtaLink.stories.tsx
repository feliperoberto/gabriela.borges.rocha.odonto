import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CtaLink } from "./CtaLink";
import { PhoneIcon, WhatsAppIcon } from "./Icon";

const meta: Meta<typeof CtaLink> = {
  title: "UI/CtaLink",
  component: CtaLink,
  args: { href: "#" },
};

export default meta;
type Story = StoryObj<typeof CtaLink>;

export const Outline: Story = {
  args: { variant: "outline", children: "Agendar consulta" },
};

export const WhatsApp: Story = {
  args: {
    variant: "whatsapp",
    external: true,
    icon: <WhatsAppIcon />,
    children: "Agendar pelo WhatsApp",
  },
};

export const Solid: Story = {
  args: {
    variant: "solid",
    icon: <PhoneIcon />,
    children: "(12) 9 8318-5513",
  },
};
