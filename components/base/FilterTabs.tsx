import React from "react";
import styled from "@emotion/styled";
import Select from "./select/Select";
import { GREY_4, WHITE_PRIMARY, ORANGE_PRIMARY } from "../colors";
import { POPPINS } from "../typography";
import { minWidth, maxWidth, BREAKPOINT_MOBILE } from "../breakpoints";
import classnames from "../../modules/classnames";

// Styles
const TabsContainerStyle = styled.div`
  justify-content: center;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 30px;
  @media (${maxWidth(BREAKPOINT_MOBILE)}) {
    display: none;
  }
`;

export const TabStyle = styled.div`
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
    color: ${WHITE_PRIMARY};
  }

  &.is-active {
    color: ${WHITE_PRIMARY};
    border-bottom: 3px solid ${ORANGE_PRIMARY};
  }
`;

// Tabs are replaced with Select dropdown on mobile
const SelectWrapper = styled.div`
  width: 150px;
  @media (${minWidth(BREAKPOINT_MOBILE)}) {
    display: none;
  }
`;

type Props = {
  tabs: any;
  filter: any;
  setFilter: any;
};

export default function FilterTabs({ tabs, filter, setFilter }: Props) {
  return (
    <div>
      <TabsContainerStyle>
        {tabs.map((tab) => (
          <TabStyle
            className={classnames("tab", {
              "is-active": filter === tab,
            })}
            key={tab.value}
            onClick={() => {
              setFilter(tab);
            }}
          >
            {tab.label}
          </TabStyle>
        ))}
      </TabsContainerStyle>

      <SelectWrapper>
        <Select
          options={tabs}
          selectedValue={filter}
          setSelectedValue={setFilter}
        />
      </SelectWrapper>
    </div>
  );
}
