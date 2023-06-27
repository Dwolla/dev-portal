import React, { useState } from "react";
import styled from "@emotion/styled";
import { PURPLE_023, WHITE_PRIMARY } from "../colors";

// Styles
const Container = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: 1.3px solid ${PURPLE_023};
  border-radius: 15px;
  background-color: ${WHITE_PRIMARY};
`;

const StyledTabList = styled.ul`
  height: 100%;
  list-style-type: none;
  padding: unset;
  margin: unset;
  border-radius: 5px;
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  /* Tab Bar will scroll on smaller screens */
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  > :nth-of-type(1) {
    padding-left: 40px;
  }
  > :nth-last-of-type(1) {
    padding-right: 40px;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  flex-grow: 1;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Props
type TabProps = {
  label: string;
  icon: string;
  iconActive: string;
  href: string;
};

type Props = {
  tabs: TabProps[];
};

function LogoLinks({ tabs }: Props) {
  const [hoverTab, setHoverTab] = useState(null);
  const [focusTab, setFocusTab] = useState(null);

  return (
    <Container>
      <StyledTabList>
        {tabs.map((tab, index) => (
          <StyledLink
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            href={tab.href}
            rel="noopener noreferrer"
            target="_blank"
            onMouseEnter={() => setHoverTab(tab)}
            onMouseLeave={() => setHoverTab(null)}
            onFocus={() => setFocusTab(tab)}
            onBlur={() => setFocusTab(null)}
          >
            <li>
              <img
                src={
                  tab === hoverTab || tab === focusTab
                    ? tab.iconActive
                    : tab.icon
                }
                alt={tab.label}
              />
            </li>
          </StyledLink>
        ))}
      </StyledTabList>
    </Container>
  );
}

export default LogoLinks;
