import styled from "@emotion/styled";
import { breakDown } from "../breakpoints";

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
`;
const CardWrapper = styled.div`
  width: 25%;
  padding: 15px;
  @media (${breakDown("xl")}) {
    width: 33.3%;
  }
  @media (${breakDown("sm")}) {
    width: 50%;
  }
  @media (${breakDown("xs")}) {
    width: 100%;
  }

  a:hover {
    text-decoration: none;
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
