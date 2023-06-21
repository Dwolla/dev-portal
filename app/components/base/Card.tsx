import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import classnames from "../../modules/classnames";
import ConditionalWrapper from "../util/ConditionalWrapper";
import Badge from "./Badge";
import {
  PRODUCT_ICON_GRADIENT,
  PURPLE_023,
  PURPLE_075,
  PURPLE_087,
  WHITE_PRIMARY,
} from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { breakDown } from "../breakpoints";

const CardStyle = styled.div`
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  border: 1.3px solid ${PURPLE_023};
  border-radius: 15px;
  background-color: ${WHITE_PRIMARY};
  position: relative;

  &.horizontalCenter {
    max-width: none;
    height: auto;
    padding: 0 30px;
    position: relative;
    text-align: center;
    @media (${breakDown("xs")}) {
      width: 100%;
    }
  }

  &.flex {
    display: flex;
  }

  &.verticalCenter {
    display: grid;
    align-content: center;
  }
`;

const StyledIcon = styled.div`
  &.center {
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;
  }

  img {
    width: 35px;
    height: 35px;
  }

  &.productIcon {
    width: 40px;
    height: 40px;
    background: ${PRODUCT_ICON_GRADIENT};
    border-radius: 50%;
    display: flex;

    img {
      margin: auto;
      width: 25px;
      height: 25px;
    }
  }
`;

const BadgeStyle = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
`;

const LanguageBadgeStyle = styled.div`
  margin: 0px 0px 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledFlexDiv = styled.div`
  padding: 0 30px;
`;

export const ProductNameStyle = styled.div`
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 266%;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${PURPLE_075};
  margin: 16px 0;
`;

const TopicStyle = styled.div`
  color: ${PURPLE_087};
  font-family: ${POPPINS};
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 123.5%;
  letter-spacing: 0.25px;

  margin-bottom: 15px;

  &.center {
    margin: 11px auto;
  }
  &.flex {
    margin-top: unset;
  }
  &.hasIcon {
    margin-top: 22px;
  }
`;

const DescriptionStyle = styled.div`
  color: ${PURPLE_075};
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 175%;
  letter-spacing: 0.15px;

  margin-top: 16px;

  &.center {
    margin: 11px auto 18px;
  }
`;

const LinkTextStyle = styled.div`
  margin-top: 16px;
  display: inline-grid;
  justify-items: start;
`;

export type LanguageProp =
  | "CSS"
  | "handlebars"
  | "HTML"
  | "Java"
  | "JavaScript"
  | "kotlin"
  | "php"
  | "Python"
  | "ruby"
  | "shell"
  | "TypeScript";

type LinkProp = { text: string; href: string; external?: boolean };

type Props = {
  links?: Array<LinkProp>;
  horizontalCenterAlign?: boolean;
  verticalCenterAlign?: boolean;
  isFlex?: boolean;
  icon?: string;
  badge?: string;
  productName?: string;
  topic: string;
  description: string;
  languages?: Array<LanguageProp>;
};

function Card({
  description,
  badge,
  horizontalCenterAlign,
  verticalCenterAlign,
  isFlex,
  icon,
  links,
  productName,
  topic,
  languages,
}: Props) {
  return (
    <CardStyle
      className={classnames(
        { horizontalCenter: horizontalCenterAlign },
        { flex: isFlex },
        { verticalCenter: verticalCenterAlign }
      )}
    >
      {icon && (
        <StyledIcon
          className={classnames({
            center: horizontalCenterAlign,
            productIcon: productName,
          })}
        >
          <img src={icon} alt="" />
        </StyledIcon>
      )}

      {badge && (
        <BadgeStyle>
          <Badge text={badge} />
        </BadgeStyle>
      )}

      <ConditionalWrapper
        condition={isFlex}
        wrapper={(children) => <StyledFlexDiv>{children}</StyledFlexDiv>}
      >
        {productName && <ProductNameStyle>{productName}</ProductNameStyle>}

        {languages && (
          <LanguageBadgeStyle>
            {languages.map((lang) => (
              <Badge key={lang} text={lang} variant="default" />
            ))}
          </LanguageBadgeStyle>
        )}

        <TopicStyle
          className={classnames(
            { center: horizontalCenterAlign },
            { flex: isFlex },
            { hasIcon: icon && !productName },
            { hasProductName: productName }
          )}
        >
          {topic}
        </TopicStyle>

        <DescriptionStyle
          className={classnames({ center: horizontalCenterAlign })}
        >
          {description}
        </DescriptionStyle>

        {links && (
          <LinkTextStyle>
            {links.map((link) => (
              <Button
                variant="text"
                color="secondary"
                endIcon={
                  link.external ? <OpenInNewIcon /> : <ArrowForwardIcon />
                }
              >
                {link.text}
              </Button>
            ))}
          </LinkTextStyle>
        )}
      </ConditionalWrapper>
    </CardStyle>
  );
}

export default Card;
