import React from "react";
import styled from "@emotion/styled";
import Select from "./select/Select";
import {
  GREY_1,
  GREY_2,
  GREY_4,
  GREY_6,
  GREY_8,
  WHITE_PRIMARY,
  ORANGE_PRIMARY,
} from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { breakUp, breakDown } from "../breakpoints";
import classnames from "../../modules/classnames";
import { slugify } from "../../modules/helpers";

// Styles
const TabsContainerStyle = styled.ul`
  margin: unset;
  padding: unset;
  list-style-type: none;
  justify-content: center;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 30px;

  @media (${breakDown("xs")}) {
    display: none;
  }

  &.sidebar {
    justify-content: left;
    display: block;
  }
`;

export const TabStyle = styled.li`
  height: 25px;
  color: ${GREY_4};
  font-family: ${POPPINS};
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  justify-self: center;
  padding-bottom: 30px;
  cursor: pointer;

  :hover {
    color: ${GREY_2};
  }

  :focus {
    outline: none;
    color: ${WHITE_PRIMARY};
  }

  &.is-active {
    color: ${WHITE_PRIMARY};
    border-bottom: 3px solid ${ORANGE_PRIMARY};
  }

  &.sidebar {
    padding: 9px 0 11px 17px;
    height: 38px;
    min-width: 147px;
    color: ${GREY_6};
    background-color: ${WHITE_PRIMARY};
    font-family: ${ROBOTO};
    font-size: 14px;
    font-weight: unset;
    letter-spacing: 0;
    line-height: 19px;
    justify-self: left;
    box-sizing: border-box;
    border: 1px solid ${GREY_2};
    border-bottom: none;

    :last-child {
      border-bottom: 1px solid ${GREY_2};
    }

    :focus,
    :hover {
      color: ${GREY_8};
      padding-left: 16px;
      border-left: 2px solid ${GREY_6};
      background-color: ${GREY_1};
    }

    &.is-active {
      color: ${GREY_8};
      border-left: 2px solid ${ORANGE_PRIMARY};
      padding-left: 16px;
    }
  }
`;

// Tabs are replaced with Select dropdown on mobile
const SelectWrapper = styled.div`
  padding-bottom: 10px;

  @media (${breakUp("sm")}) {
    display: none;
  }

  &.sidebar {
    display: none;
  }
`;

type Tab = string | { value: string; label: string };
type Props = {
  tabs: Array<Tab>;
  filter: Tab | null;
  setFilter: Function;
  variant?: "default" | "sidebar";
};

export default function FilterTabs({
  tabs,
  filter,
  setFilter,
  variant,
}: Props) {
  const formattedTabs = tabs.map((tab) =>
    typeof tab === "string" ? { value: slugify(tab), label: tab } : tab
  );

  const formattedFilter =
    typeof filter === "string" || filter === null
      ? formattedTabs.find((tab) => tab.value === filter)
      : filter;

  function onKeydown(e, tab) {
    if (e.key === "Enter") setFilter(tab);
  }

  return (
    <>
      <TabsContainerStyle className={variant}>
        {formattedTabs.map((tab) => (
          <TabStyle
            tabIndex={0}
            className={classnames(variant, {
              "is-active":
                JSON.stringify(formattedFilter) === JSON.stringify(tab),
            })}
            key={tab.value}
            onClick={() => {
              setFilter(tab);
            }}
            onKeyDown={(keyPress) => onKeydown(keyPress, tab)}
          >
            {tab.label}
          </TabStyle>
        ))}
      </TabsContainerStyle>

      <SelectWrapper className={variant}>
        <Select
          options={formattedTabs}
          selectedValue={formattedFilter}
          setSelectedValue={setFilter}
          autoWidth
        />
      </SelectWrapper>
    </>
  );
}
