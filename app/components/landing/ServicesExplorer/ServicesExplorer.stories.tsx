import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ServicesExplorer } from "./ServicesExplorer";

const procedures = [
  { slug: "prevencao", nome: "Prevenção", desc: "Acompanhamento contínuo para evitar cáries." },
  { slug: "clareamento", nome: "Clareamento", desc: "Dentes visivelmente mais claros." },
  { slug: "urgencia", nome: "Urgência", desc: "Alívio rápido para dor de dente." },
];

const meta: Meta<typeof ServicesExplorer> = {
  title: "Landing/ServicesExplorer",
  component: ServicesExplorer,
  args: { procedures },
};

export default meta;
type Story = StoryObj<typeof ServicesExplorer>;

export const Default: Story = {};
