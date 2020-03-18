import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  GREY_2,
  GREY_5,
  GREY_6,
  HEADLINE_TEXT,
  ORANGE_PRIMARY,
} from "./colors";

const Group = styled.div`
  width: 235px;
  position: sticky;
  top: 0;
  color: ${GREY_6};
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  line-height: 19px;
  cursor: pointer;
`;

const Heading = styled.div`
  height: 16px;
  color: ${GREY_5};
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.79px;
  line-height: 17px;
  margin: 0px 0px 7px 1px;
  cursor: text;
`;

const Item = styled.a`
  display: flex;
  width: 221px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-decoration: none;
  box-sizing: border-box;
  border-left: 1px solid ${GREY_2};
  &.tab-1,
  &.tab-2 {
    padding-left: 15px;
  }
  &.tab-3 {
    padding-left: 30px;
  }
  &.tab-4 {
    padding-left: 45px;
  }
  :hover {
    color: ${HEADLINE_TEXT};
  }
  &.active {
    border-left: 1px solid ${ORANGE_PRIMARY};
    color: ${HEADLINE_TEXT};
  }
`;

const TopOfPage = styled.div`
  margin-top: 7px;
  :hover {
    color: ${HEADLINE_TEXT};
  }
`;

type Props = { headers: Record<string, string>[] };

function RightStickyNav(props: Props) {
  const [activeItem, setActiveItem] = useState(null);

  const handleClickActiveItem = (e) => {
    const newActiveItem = e;
    setActiveItem(newActiveItem);
  };

  return (
    <Group>
      <Heading>ON THIS PAGE</Heading>
      {props.headers.map((item) => (
        <Item
          key={item.key}
          className={`tab-${item.level} ${
            activeItem === item.key ? "active" : ""
          }`}
          onClick={() => handleClickActiveItem(item.key)}
        >
          {item.text}
        </Item>
      ))}
      <TopOfPage onClick={() => handleClickActiveItem(null)}>
        Top of Page
      </TopOfPage>
    </Group>
  );
}

export default RightStickyNav;
