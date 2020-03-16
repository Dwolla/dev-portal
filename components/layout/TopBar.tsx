import styled from "@emotion/styled";
import { GREY_2 } from "../colors";

const Container = styled.div`
  display: flex;
  height: 68px;
  align-items: center;
  padding: 20px;
  position: sticky;
  top: 0;
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
