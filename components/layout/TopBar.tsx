import styled from "@emotion/styled";
import { GREY_2 } from "../colors";

export const TOP_BAR_HEIGHT = 68;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: ${TOP_BAR_HEIGHT}px;
  padding: 20px;
  border-bottom: 1px solid ${GREY_2};
  background: rgba(255, 255, 255, 0.98);

  > * {
    margin: 0 20px;
  }
`;

interface TopBarProps {
  children: JSX.Element | JSX.Element[];
}

export default function TopBar({ children }: TopBarProps) {
  return <Container>{children}</Container>;
}
