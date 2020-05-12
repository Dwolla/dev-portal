import React, { useState } from "react";
import styled from "@emotion/styled";
import classnames from "../../modules/classnames";
import { GREY_1, GREY_2, WHITE_PRIMARY, PARAGRAPH_TEXT } from "../colors";
import { BOX_SHADOW_7 } from "../shadowDepths";
import { ROBOTO } from "../typography";

// Styles
const Container = styled.div`
  max-width: auto;
  border-radius: 5px;
  background-color: ${WHITE_PRIMARY};
  :hover {
    box-shadow: ${BOX_SHADOW_7};
  }
`;

const StyledTabBar = styled.div`
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
  border-color: ${GREY_2};
  border-style: solid;
  border-width: 1px 1px 0 1px;
  background-color: ${GREY_1};
  display: flex;
  flex-wrap: nowrap;
  /* Tab Bar will scroll on smaller screens */
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabStyle = styled.div`
  flex-grow: 1;
  padding: 15px 20px;
  border-radius: 5px 5px 0 0;
  border: 1px solid ${GREY_1};
  border-bottom: 1px solid ${GREY_2};
  display: flex;
  align-items: center;
  justify-content: center;
  &.active {
    background-color: ${WHITE_PRIMARY};
    border-color: ${GREY_2};
    border-style: solid;
    border-width: 0 1px 0 1px;
    border-radius: 5px 5px 0 0;
    padding-top: 16px;
    :nth-of-type(1) {
      border-left: unset;
      padding-left: 21px;
    }
    :nth-last-of-type(1) {
      border-right: unset;
      padding-right: 21px;
    }
  }
`;

const StyledIcon = styled.img`
  max-height: 36px;
`;

const ContentContainer = styled.div`
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid ${GREY_2};
  border-radius: 0 0 5px 5px;
  border-top: unset;
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  font-size: 16px;
  line-height: 28px;
`;

// Props
type TabProps = {
  label: string;
  icon: string;
  iconActive: string;
  content: any;
};

type Props = {
  tabs: TabProps[];
};

function TabBarPanel({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Container>
      <StyledTabBar>
        {tabs.map((tab) => (
          <TabStyle
            className={classnames({ active: tab === activeTab })}
            key={tab.label}
            onClick={() => {
              setActiveTab(tab);
            }}
          >
            <StyledIcon
              src={tab === activeTab ? tab.iconActive : tab.icon}
              alt={tab.label}
            />
          </TabStyle>
        ))}
      </StyledTabBar>
      <ContentContainer>{activeTab.content}</ContentContainer>
    </Container>
  );
}

export default TabBarPanel;
