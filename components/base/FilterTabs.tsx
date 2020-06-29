import React from "react";
import styled from "@emotion/styled";
import Select from "./select/Select";
import { GREY_2, GREY_4, WHITE_PRIMARY, ORANGE_PRIMARY } from "../colors";
import { POPPINS } from "../typography";
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

  &.is-active {
    color: ${WHITE_PRIMARY};
    border-bottom: 3px solid ${ORANGE_PRIMARY};
  }

  :focus {
    outline: none;
    color: ${WHITE_PRIMARY};
  }
`;

// Tabs are replaced with Select dropdown on mobile
const SelectWrapper = styled.div`
  width: 150px;
  padding-bottom: 10px;
  @media (${breakUp("sm")}) {
    display: none;
  }
`;

type Tab = string | { value: string; label: string };
type Props = {
  tabs: Array<Tab>;
  filter: Tab | null;
  setFilter: Function;
};

export default function FilterTabs({ tabs, filter, setFilter }: Props) {
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
    <div>
      <TabsContainerStyle>
        {formattedTabs.map((tab) => (
          <TabStyle
            tabIndex={0}
            className={classnames("tab", {
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

      <SelectWrapper>
        <Select
          options={formattedTabs}
          selectedValue={formattedFilter}
          setSelectedValue={setFilter}
        />
      </SelectWrapper>
    </div>
  );
}
