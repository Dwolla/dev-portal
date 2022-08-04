import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import classnames from "../../modules/classnames";
import ConditionalWrapper from "../util/ConditionalWrapper";
import Badge from "./Badge";
import { ReactComponent as NewTabIcon } from "../../../assets/images/component-icons/open-in-new-tab-icon.svg";
import {
  GREY_2,
  GREY_4,
  HEADLINE_TEXT,
  PARAGRAPH_TEXT,
  WHITE_PRIMARY,
} from "../colors";
import { BOX_SHADOW_4 } from "../shadowDepths";
import { POPPINS, ROBOTO } from "../typography";
import { breakDown } from "../breakpoints";

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

  &.flex {
    display: flex;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
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

const LanguageBadgeStyle = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const LinkIconStyle = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  svg {
    g {
      fill: ${GREY_4};
    }
  }
`;

const StyledFlexDiv = styled.div`
  padding: 0 30px;
`;

const TopicStyle = styled.div`
  color: ${HEADLINE_TEXT};
  font-family: ${POPPINS};
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 15px;
  &.center {
    margin: 11px auto;
  }
  &.flex {
    margin-top: unset;
  }
  &.hasIcon {
    margin-top: 30px;
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

export type LanguageProp =
  | "css"
  | "handlebars"
  | "html"
  | "java"
  | "javascript"
  | "kotlin"
  | "php"
  | "python"
  | "ruby"
  | "shell"
  | "typescript";

type Props = {
  link?: { href?: string; external?: boolean };
  centerAlign?: boolean;
  isFlex?: boolean;
  icon?: string;
  badge?: string;
  topic: string;
  description: string;
  languages?: Array<LanguageProp>;
};

function CoreCard({
  description,
  badge,
  centerAlign,
  isFlex,
  icon,
  link,
  topic,
  languages,
}: Props) {
  return (
    <CardStyle
      className={classnames({ center: centerAlign }, { flex: isFlex })}
    >
      {icon && (
        <StyledIcon
          src={icon}
          alt=""
          className={classnames({ center: centerAlign })}
        />
      )}

      {badge && (
        <BadgeStyle>
          <Badge text={badge} />
        </BadgeStyle>
      )}

      {link && link.external && (
        <LinkIconStyle>
          <NewTabIcon width={13} />
        </LinkIconStyle>
      )}
      <ConditionalWrapper
        condition={isFlex}
        wrapper={(children) => <StyledFlexDiv>{children}</StyledFlexDiv>}
      >
        <TopicStyle
          className={classnames(
            { center: centerAlign },
            { flex: isFlex },
            { hasIcon: icon }
          )}
        >
          {topic}
        </TopicStyle>

        <DescriptionStyle className={classnames({ center: centerAlign })}>
          {description}
          {languages && (
            <LanguageBadgeStyle>
              {languages.map((lang) => (
                <Badge key={lang} text={lang} variant="orange" />
              ))}
            </LanguageBadgeStyle>
          )}
        </DescriptionStyle>
      </ConditionalWrapper>
    </CardStyle>
  );
}

function Card({ link, ...rest }: Props) {
  return link && link.href ? (
    <Link href={link.href} passHref>
      <StyledLink
        target={link.external ? "_blank" : undefined}
        rel={link.external && "noopener noreferrer"}
      >
        <CoreCard link={link} {...rest} />
      </StyledLink>
    </Link>
  ) : (
    <CoreCard link={link} {...rest} />
  );
}

export default Card;
