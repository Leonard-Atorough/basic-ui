import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Alert>;
export default meta;

type Story = StoryObj<typeof Alert>;

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Alert severity="info" description="This is an info alert." />
      <Alert severity="success" description="This is a success alert." />
      <Alert severity="warning" description="This is a warning alert." />
      <Alert severity="error" description="This is an error alert." />
    </div>
  ),
};
