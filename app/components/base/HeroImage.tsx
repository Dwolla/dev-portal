import styled from "@emotion/styled";
import { breakDown } from "../breakpoints";

export const StyledHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  position: relative;
  width: 100%;

  @media (${breakDown("sm")}) {
    display: none;
  }
`;

type ImageProps = {
  src: string;
  alt: string;
};

type Props = {
  heroImage: ImageProps;
};

function Hero({ heroImage }: Props) {
  return (
    <StyledHero>
      <img src={heroImage.src} alt={heroImage.alt} />
    </StyledHero>
  );
}

export default Hero;
