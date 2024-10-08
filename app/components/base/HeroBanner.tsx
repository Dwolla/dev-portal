import styled from "@emotion/styled";
import React from "react";
import Search from "../base/Search";
import { POPPINS, ROBOTO } from "../typography";
import { WHITE_070, WHITE_PRIMARY } from "../colors";
import { breakDown } from "../breakpoints";

// Styled Banner component
const StyledBanner = styled.div`
  height: 412px;
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BannerContentWrap = styled.div`
  max-width: 525px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > *:last-child {
    margin-bottom: 0;
  }
`;

const StyledTopic = styled.div`
  color: ${WHITE_PRIMARY};
  font-family: ${POPPINS};
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 123.5%;
  text-align: center;
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
  font-weight: 300;
  font-size: 16px;
  line-height: 175%;
  letter-spacing: 0.15px;
  text-align: center;
  margin-bottom: 24px;
  color: ${WHITE_070};

  @media (${breakDown("sm")}) {
    font-size: 12px;
  }
`;

const SearchWrapper = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: middle;
`;

type ImageProps = {
  src: string;
  alt: string;
};

type Props = {
  heroImage: ImageProps;
  topic: string;
  description: string;
  searchBar?: boolean;
};

function HeroBanner({ heroImage, topic, description, searchBar }: Props) {
  return (
    <StyledBanner
      style={{
        backgroundImage: `url(${heroImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BannerContentWrap>
        <StyledTopic>{topic}</StyledTopic>
        <StyledDescription>{description}</StyledDescription>
        {searchBar && (
          <SearchWrapper>
            <Search />
          </SearchWrapper>
        )}
      </BannerContentWrap>
    </StyledBanner>
  );
}

export default HeroBanner;
