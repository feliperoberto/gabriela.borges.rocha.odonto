import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SiteHeader } from "./SiteHeader";

const meta: Meta<typeof SiteHeader> = {
  title: "Landing/SiteHeader",
  component: SiteHeader,
  args: {
    profile: {
      nome: "Dra. Gabriela Borges Rocha",
      cro: "CRO-SP 176648",
      tel: "+5512983185513",
      telDisplay: "(12) 9 8318-5513",
      email: "dra.gabrielaborgesrocha@gmail.com",
      instagram: "dra.gabiborges.odonto",
      cities: ["São José dos Campos", "Mogi das Cruzes"],
      whatsapp: {
        phone: "5512983185513",
        defaultMessage: "Olá, Dra. Gabriela! Gostaria de agendar uma avaliação.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {};
