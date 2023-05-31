import { Box, Button, styled, Typography } from "@mui/material";
import {
  type SvgIconComponent,
  ThumbDownOffAltOutlined,
  ThumbUpOffAltOutlined,
} from "@mui/icons-material";
import merge from "lodash.merge";
import { Link } from "./Typography";

const FeedbackButton = styled(Button, { name: "FeedbackButton" })(() => ({
  color: "rgba(0, 0, 0, 0.50)",
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
    color: "rgba(106, 114, 130, 1)",
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
        onClick={approvalButton.onClick}
        startIcon={<approvalButton.icon />}
      >
        {approvalButton.text}
      </FeedbackButton>
      <FeedbackButton
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
