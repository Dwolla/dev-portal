import React from "react";
import styled from "@emotion/styled";

import Badge from "./Badge";
import newTabIcon from "../public/images/open-in-new-tab-icon-light-grey.svg";
import {
  GREY_2,
  WHITE_PRIMARY,
  HEADLINE_TEXT,
  PARAGRAPH_TEXT,
} from "../colors";
import { BOX_SHADOW_4 } from "../shadowDepths";

const CardStyle = styled.div`
  height: 305px;
  width: 300px;
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
    /* height: 160px; */
    height: auto;
    width: 656px;
    padding: 0px;
    position: relative;
    text-align: center;
  }
`;

const IconStyle = styled.div`
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
`;

const TopicStyle = styled.div`
  color: ${HEADLINE_TEXT};
  font-family: "Poppins", sans-serif;
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
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  line-height: 25px;
  margin-top: 15px;
  &.center {
    margin: 11px auto 18px;
  }
`;

type Props = {
  link?: boolean;
  centerAlign?: boolean;
  icon: string;
  badge?: string;
  topic: string;
  description: string;
};

function Card(props: Props) {
  return (
    <CardStyle className={props.centerAlign ? "center" : ""}>
      <IconStyle className={props.centerAlign ? "center" : ""}>
        <img src={props.icon} alt="" />
      </IconStyle>
      {props.badge && (
        <BadgeStyle>
          <Badge text={props.badge} />
        </BadgeStyle>
      )}
      {props.link && (
        <LinkStyle>
          <img src={newTabIcon} alt="" />
        </LinkStyle>
      )}
      <TopicStyle className={props.centerAlign ? "center" : ""}>
        {props.topic}
      </TopicStyle>
      <DescriptionStyle className={props.centerAlign ? "center" : ""}>
        {props.description}
      </DescriptionStyle>
    </CardStyle>
  );
}

export default Card;
