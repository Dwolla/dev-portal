import styled from "@emotion/styled";
import {
  maxWidth,
  BREAKPOINT_DESKTOP,
  BREAKPOINT_IPAD,
  BREAKPOINT_MOBILE,
} from "../breakpoints";

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CardWrapper = styled.div`
  width: 25%;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 30px;
  @media (${maxWidth(BREAKPOINT_DESKTOP)}) {
    width: 33.3%;
  }
  @media (${maxWidth(BREAKPOINT_IPAD)}) {
    width: 50%;
  }
  @media (${maxWidth(BREAKPOINT_MOBILE)}) {
    width: 100%;
  }
`;
type Props = {
  children: JSX.Element[];
};
export default function CardGrid({ children }: Props) {
  return (
    <StyledGrid>
      {children.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CardWrapper key={index}>{item}</CardWrapper>
      ))}
    </StyledGrid>
  );
}
