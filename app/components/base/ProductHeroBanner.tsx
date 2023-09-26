import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import { POPPINS, ROBOTO } from "../typography";
import { BALANCE_HERO_GRADIENT, CONNECT_HERO_GRADIENT } from "../colors";
import { breakDown } from "../breakpoints";
import { BALANCE_ICON_SHADOW, CONNECT_ICON_SHADOW } from "../shadowDepths";

// Define type for the Product variant options
type ProductVariant = "Balance" | "Connect";

// Styled Banner component
const StyledBanner = styled.div<{ variant: ProductVariant }>`
  width: 100%;
  padding: 3em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border-radius: 16px;
  background: ${(props) => {
    if (props.variant === "Balance") {
      return BALANCE_HERO_GRADIENT;
    } if (props.variant === "Connect") {
      return CONNECT_HERO_GRADIENT;
    }
    return "transparent";
  }}; // Set background based on variant
`;

const BannerContentWrap = styled.div`
  max-width: 525px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  > *:last-child {
    margin-bottom: 0;
  }
`;

const StyledTopic = styled.div`
  color: white;
  font-family: ${POPPINS};
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 123.5%;
  margin-bottom: 32px;
  letter-spacing: 0.25px;

  @media (${breakDown("sm")}) {
    font-size: 30px;
  }

  @media (${breakDown("xs")}) {
    font-size: 22px;
  }
`;

const StyledDescription = styled.div`
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 175%;
  letter-spacing: 0.15px;
  margin-bottom: 24px;
  color: white;

  @media (${breakDown("sm")}) {
    font-size: 12px;
  }
`;

const ButtonsWrap = styled.div`
  display: block;

  a {
    margin: 10px;
  }
`;

const HeroGraphicStyle = styled.div<{ variant: ProductVariant }>`
  svg {
    filter: drop-shadow(
      ${(props) => {
        if (props.variant === "Balance") {
          return BALANCE_ICON_SHADOW;
        } if (props.variant === "Connect") {
          return CONNECT_ICON_SHADOW;
        }
        return "none";
      }}
    ); // Set SVG filter based on variant
  }
`;

type LinkProp = { text: string; href: string };

type Props = {
  variant: ProductVariant;
  HeroGraphic?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  topic: string;
  description: string;
  links?: Array<LinkProp>;
};

function ProductHeroBanner({
  variant,
  HeroGraphic,
  topic,
  description,
  links,
}: Props) {
  return (
    <StyledBanner variant={variant}>
      <BannerContentWrap>
        <StyledTopic>{topic}</StyledTopic>
        <StyledDescription>{description}</StyledDescription>
        {links && (
          <ButtonsWrap>
            {links.map((link) => (
              <Button
                key={link.text}
                href={link.href}
                variant="outlined"
                color="white"
              >
                {link.text}
              </Button>
            ))}
          </ButtonsWrap>
        )}
      </BannerContentWrap>
      <HeroGraphicStyle variant={variant}>
        <HeroGraphic height="10em" width="10em" />
      </HeroGraphicStyle>
    </StyledBanner>
  );
}

export default ProductHeroBanner;
