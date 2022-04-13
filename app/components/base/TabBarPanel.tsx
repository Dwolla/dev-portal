/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import classnames from "../../modules/classnames";
import { GREY_1, GREY_2, WHITE_PRIMARY, PARAGRAPH_TEXT } from "../colors";
import { ROBOTO } from "../typography";

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
  const [hoverTab, setHoverTab] = useState(null);

  return (
    <>
      <Global
        styles={css`
          .container {
            background-color: ${WHITE_PRIMARY};
          }
          .tab-list {
            margin: unset;
            padding: unset;
            background-color: ${GREY_1};
            list-style: none;
            box-sizing: border-box;
            border-radius: 5px 5px 0 0;
            border-color: ${GREY_2};
            border-style: solid;
            border-width: 1px 1px 0 1px;
            display: flex;
            flex-wrap: nowrap;
            /* Tab Bar will scroll on smaller screens */
            overflow-x: auto;
            &::-webkit-scrollbar {
              display: none;
            }
          }
          .tab {
            flex-grow: 1;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 5px 5px 0 0;
            border: 1px solid ${GREY_1};
            border-bottom: 1px solid ${GREY_2};
            &.is-active {
              cursor: default;
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
          }
        `}
      ></Global>
      <Tabs
        onSelect={(index) => setActiveTab(tabs[index])}
        className="container"
      >
        <TabList className="tab-list">
          {tabs.map((tab, index) => (
            <Tab
              className={classnames(`tab`, {
                "is-active": tab === activeTab,
              })}
              key={index}
              onMouseEnter={() => setHoverTab(tab)}
              onMouseLeave={() => setHoverTab(null)}
            >
              <StyledIcon
                src={
                  tab === activeTab || tab === hoverTab
                    ? tab.iconActive
                    : tab.icon
                }
                alt={tab.label}
              />
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <ContentContainer>{tab.content}</ContentContainer>
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
}

export default TabBarPanel;
