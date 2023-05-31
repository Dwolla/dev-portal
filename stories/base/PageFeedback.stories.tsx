import type { Meta, StoryObj } from "@storybook/react";
import merge from "lodash.merge";
import PageFeedback from "../../app/components/base/PageFeedback";

type Story = StoryObj<typeof PageFeedback>;

const meta: Meta<typeof PageFeedback> = {
  title: "base/PageFeedback",
  component: PageFeedback,
};

export const Default: Story = {};

export const WithOnClickCustomization: Story = {
  args: {
    approvalButton: {
      onClick: () => console.log("A modified approval onClick callback"),
    },
    disapprovalButton: {
      onClick: () => console.log("A modified disapproval onClick callback"),
    },
  },
};

export const WithTextCustomization: Story = {
  args: {
    approvalButton: {
      text: "Approve",
    },
    disapprovalButton: {
      text: "Disapprove",
    },
    innerText: "Do you approve of this message?",
  },
};

export const WithHiddenFeedbackLink: Story = merge(WithTextCustomization, {
  args: { feedbackLink: null },
});

export default meta;
