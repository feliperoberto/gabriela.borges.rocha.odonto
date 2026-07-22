import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Landing/Hero",
  component: Hero,
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
type Story = StoryObj<typeof Hero>;

export const Default: Story = {};
