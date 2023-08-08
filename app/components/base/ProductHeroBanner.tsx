import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";
import { POPPINS, ROBOTO } from "../typography";
import { BALANCE_HERO_GRADIENT } from "../colors";
import { breakDown } from "../breakpoints";
import { BALANCE_ICON_SHADOW } from "../shadowDepths";

// Styled Banner component
const StyledBanner = styled.div`
  width: 100%;
  padding: 3em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border-radius: 16px;
  background: ${BALANCE_HERO_GRADIENT};
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

const HeroGraphicStyle = styled.div`
  svg {
    filter: drop-shadow(${BALANCE_ICON_SHADOW});
  }
`;

type LinkProp = { text: string; href: string };

type Props = {
  HeroGraphic?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  topic: string;
  description: string;
  links?: Array<LinkProp>;
};

function ProductHeroBanner({ HeroGraphic, topic, description, links }: Props) {
  return (
    <StyledBanner>
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
      <HeroGraphicStyle>
        <HeroGraphic height="10em" width="10em" />
      </HeroGraphicStyle>
    </StyledBanner>
  );
}

export default ProductHeroBanner;
