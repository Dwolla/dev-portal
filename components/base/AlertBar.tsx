import React from "react";
import styled from "@emotion/styled";
import infoIcon from "../../assets/images/component-icons/info-icon.svg";
import warningIcon from "../../assets/images/component-icons/warning-icon.svg";
import {
  GREY_1,
  GREY_2,
  API_STATUS_BAR_YELLOW,
  PARAGRAPH_TEXT,
} from "../colors";
import { ROBOTO } from "../typography";

const StyledAlertBar = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  &.info {
    border: 1px solid ${GREY_2};
    border-radius: 5px;
    background-color: ${GREY_1};
  }
  &.warning {
    border: 1px solid ${API_STATUS_BAR_YELLOW};
    border-radius: 5px;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  height: 24px;
  width: 24px;
`;

const TextWrapper = styled.div`
  padding-left: 13px;
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  font-size: 15px;
  font-weight: 500;
  line-height: 25px;
`;

type Props = { variation: "warning" | "info"; children: string };

function AlertBar({ variation, children }: Props) {
  return (
    <StyledAlertBar className={variation}>
      <ImageWrapper>
        {variation === "info" ? (
          <img src={infoIcon} alt="Info" />
        ) : (
          <img src={warningIcon} alt="Warning" />
        )}
      </ImageWrapper>
      <TextWrapper>{children}</TextWrapper>
    </StyledAlertBar>
  );
}

export default AlertBar;
