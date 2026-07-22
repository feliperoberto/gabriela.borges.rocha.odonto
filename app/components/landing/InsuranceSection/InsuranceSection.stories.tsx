import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InsuranceSection } from "./InsuranceSection";

const meta: Meta<typeof InsuranceSection> = {
  title: "Landing/InsuranceSection",
  component: InsuranceSection,
  args: {
    insurances: [
      { nome: "Sempre Odonto", logo: "/images/logo-sempre-odonto.png", alt: "Convênio Sempre Odonto" },
      { nome: "Ideal Odonto", logo: "/images/logo-ideal-odonto.webp", alt: "Convênio Ideal Odonto" },
      { nome: "Odont", logo: "/images/logo-odont.svg", alt: "Convênio Odont" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof InsuranceSection>;

export const Default: Story = {};
