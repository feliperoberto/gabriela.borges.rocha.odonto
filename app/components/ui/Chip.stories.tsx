import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "UI/Chip",
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Value: Story = {
  args: { variant: "value", children: "acolhimento" },
};

export const ProcedureUnselected: Story = {
  args: { variant: "procedure", selected: false, children: "Prevenção" },
};

export const ProcedureSelected: Story = {
  args: { variant: "procedure", selected: true, children: "Prevenção" },
};

export const CityUnselected: Story = {
  args: { variant: "city", selected: false, children: "Todas" },
};

export const CitySelected: Story = {
  args: { variant: "city", selected: true, children: "Todas" },
};

export const InteractiveProcedureToggle: Story = {
  render: function InteractiveChip() {
    const [selected, setSelected] = useState(false);
    return (
      <Chip variant="procedure" selected={selected} onClick={() => setSelected((s) => !s)}>
        Clareamento
      </Chip>
    );
  },
};
