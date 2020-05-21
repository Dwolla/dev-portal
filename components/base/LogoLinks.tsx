/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
// import Link from "next/link";
import { Tab, Tabs, TabList } from "react-tabs";
import { css, Global } from "@emotion/core";
import styled from "@emotion/styled";
import { WHITE_PRIMARY } from "../colors";

// Styles

const StyledIcon = styled.img`
  /* max-height: 90px; */
`;

// const StyledLink = styled.a`
//   text-decoration: none;
// `;

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

function FooterCTA({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <>
      <Global
        styles={css`
          .container {
            height: 120px;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #eaedf3;
            border-radius: 5px;
            background-color: ${WHITE_PRIMARY};
          }
          .tab-list {
            height: 100%;
            %border-radius: 5px;
            margin: unset;
            padding: unset;
            list-style: none;
            display: flex;
            align-content: stretch;
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
          }
          .react-tabs__tab--selected {
            background-color: inherit;
          }
        `}
      ></Global>
      <Tabs
        className="container"
        onSelect={(index) => setActiveTab(tabs[index])}
      >
        <TabList className="tab-list">
          {tabs.map((tab, index) => (
            // <Link href={tab.href} key={`${tab.label}-${tab.href}`}>
            // <a>
            <Tab className="tab" key={index}>
              <StyledIcon
                src={tab === activeTab ? tab.iconActive : tab.icon}
                onMouseEnter={() => setActiveTab(tab)}
                alt={tab.label}
              />
            </Tab>
            // </a>
            // </Link>
          ))}
        </TabList>
      </Tabs>
    </>
  );
}

export default FooterCTA;
