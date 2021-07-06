import styled from "@emotion/styled";
import { breakDown } from "../breakpoints";
import hero from "../../../assets/images/content-images/hero-image.png";

export const StyledHero = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: right;
  position: relative;
  width: 100%;

  @media (${breakDown("sm")}) {
    display: none;
  }

  @media (${breakDown("xs")}) {
    display: none;
  }
`;

function Hero() {
  return (
    <>
      <StyledHero>
        <img src={hero} alt="hero-banner" />
      </StyledHero>
    </>
  );
}

export default Hero;
