import styled from "@emotion/styled";
import { breakDown } from "../breakpoints";

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -15px;

  &.center {
    justify-content: center;
  }
`;

const CardWrapper = styled.div`
  width: ${({ minCardWidth }: { minCardWidth: number }) => minCardWidth}%;
  padding: 15px;
  @media (${breakDown("xl")}) {
    width: ${({ minCardWidth }: { minCardWidth: number }) =>
      minCardWidth > 33.3 ? minCardWidth : 33.3}%;
  }
  @media (${breakDown("lg")}) {
    width: ${({ minCardWidth }: { minCardWidth: number }) =>
      minCardWidth > 50 ? minCardWidth : 50}%;
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
  variant?: "default" | "center";
  maxColumns?: 1 | 2 | 3 | 4;
};

export default function CardGrid({ children, variant, maxColumns = 4 }: Props) {
  return (
    <StyledGrid className={variant}>
      {children.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CardWrapper key={index} minCardWidth={100 / maxColumns}>
          {item}
        </CardWrapper>
      ))}
    </StyledGrid>
  );
}
