import React from "react";
import styled from "@emotion/styled";

import Badge from "./Badge";
import { ReactComponent as NewTabIcon } from "../../assets/images/component-icons/open-in-new-tab-icon.svg";
import {
  GREY_2,
  GREY_4,
  WHITE_PRIMARY,
  HEADLINE_TEXT,
  PARAGRAPH_TEXT,
} from "../colors";
import { BOX_SHADOW_4 } from "../shadowDepths";
import { ROBOTO, POPPINS } from "../typography";
import { breakDown } from "../breakpoints";

type Props = {
  link?: boolean;
  centerAlign?: boolean;
  icon: string;
  badge?: string;
  topic: string;
  description: string;
};

function Card({ description, badge, centerAlign, icon, link, topic }: Props) {
  return (
    <CardStyle className={centerAlign ? "center" : ""}>
      <StyledIcon src={icon} alt="" className={centerAlign ? "center" : ""} />

      {badge && (
        <BadgeStyle>
          <Badge text={badge} />
        </BadgeStyle>
      )}

      {link && (
        <LinkStyle>
          <NewTabIcon width={13} />
        </LinkStyle>
      )}

      <TopicStyle className={centerAlign ? "center" : ""}>{topic}</TopicStyle>

      <DescriptionStyle className={centerAlign ? "center" : ""}>
        {description}
      </DescriptionStyle>
    </CardStyle>
  );
}

const CardStyle = styled.div`
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid ${GREY_2};
  border-radius: 5px;
  background-color: ${WHITE_PRIMARY};
  position: relative;
  :hover {
    cursor: pointer;
    box-shadow: ${BOX_SHADOW_4};
  }

  &.center {
    max-width: none;
    height: auto;
    padding: 0 30px;
    position: relative;
    text-align: center;
    @media (${breakDown("xs")}) {
      width: 100%;
    }
  }
`;

const StyledIcon = styled.img`
  height: 48px;
  width: 48px;
  &.center {
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BadgeStyle = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
`;

const LinkStyle = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  svg {
    g {
      fill: ${GREY_4};
    }
  }
`;

const TopicStyle = styled.div`
  color: ${HEADLINE_TEXT};
  font-family: ${POPPINS};
  font-size: 18px;
  line-height: 26px;
  margin-top: 30px;
  margin-bottom: 15px;
  &.center {
    margin: 11px auto;
  }
`;

const DescriptionStyle = styled.div`
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  font-size: 15px;
  line-height: 25px;
  margin-top: 15px;
  &.center {
    margin: 11px auto 18px;
  }
`;

export default Card;
