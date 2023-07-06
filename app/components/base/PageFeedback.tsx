import { Box, Button, styled, Typography } from "@mui/material";
import {
  type SvgIconComponent,
  ThumbDownOffAltOutlined,
  ThumbUpOffAltOutlined,
} from "@mui/icons-material";
import merge from "lodash.merge";
import { Link } from "./Typography";
import { PAGE_FEEDBACK_BUTTON, PAGE_FEEDBACK_INNER_TEXT } from "../colors";

const FeedbackButton = styled(Button, { name: "FeedbackButton" })(() => ({
  color: PAGE_FEEDBACK_BUTTON,
  textTransform: "none",
}));

const FeedbackContainer = styled(Box, { name: "FeedbackContainer" })(() => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  gap: "12px",
}));

const FeedbackInnerText = styled(Typography, { name: "FeedbackInnerText" })(
  () => ({
    color: PAGE_FEEDBACK_INNER_TEXT,
    fontWeight: 500,
  })
);

export interface PageFeedbackProps {
  approvalButton?: {
    icon?: SvgIconComponent;
    onClick?: () => void;
    text?: string;
  };
  disapprovalButton?: {
    icon?: SvgIconComponent;
    onClick?: () => void;
    text?: string;
  };
  feedbackLink?: {
    href?: string;
    text?: string;
  };
  innerText?: string;
}

const DEFAULT_PROPS: PageFeedbackProps = {
  approvalButton: {
    icon: ThumbUpOffAltOutlined,
    onClick: () => console.log("Approval was clicked"),
    text: "Yes",
  },
  disapprovalButton: {
    icon: ThumbDownOffAltOutlined,
    onClick: () => console.log("Disapproval was clicked"),
    text: "No",
  },
  feedbackLink: {
    href: "https://developers.dwolla.com/give-feedback",
    text: "Give feedback",
  },
  innerText: "Did this page help you?",
};

export default function PageFeedback(props: PageFeedbackProps) {
  const mergedProps = merge({}, DEFAULT_PROPS, props);
  const { approvalButton, disapprovalButton, feedbackLink, innerText } =
    mergedProps;

  return (
    <FeedbackContainer>
      <FeedbackInnerText>{innerText}</FeedbackInnerText>
      <FeedbackButton
        id="button-feedback-approval"
        onClick={approvalButton.onClick}
        startIcon={<approvalButton.icon />}
      >
        {approvalButton.text}
      </FeedbackButton>
      <FeedbackButton
        id="button-feedback-disapproval"
        onClick={disapprovalButton.onClick}
        startIcon={<disapprovalButton.icon />}
      >
        {disapprovalButton.text}
      </FeedbackButton>
      {feedbackLink && (
        <Link href={feedbackLink.href} text={feedbackLink.text} />
      )}
    </FeedbackContainer>
  );
}
