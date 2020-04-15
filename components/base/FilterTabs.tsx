import React from "react";
import Dropdown from "react-dropdown";
import styled from "@emotion/styled";
import arrowDown from "../../public/images/arrow-down-icon.svg";
import arrowUp from "../../public/images/arrow-up-icon.svg";
import { GREY_4, WHITE_PRIMARY, PURPLE_DARK, ORANGE_PRIMARY } from "../colors";
import { POPPINS } from "../typography";
import { minWidth, maxWidth, BREAKPOINT_MOBILE } from "../breakpoints";
import classnames from "../../modules/classnames";

type Props = {
  tabs: string[];
  filter: string;
  setFilter: Function;
};

export default function FilterTabs({ tabs, filter, setFilter }: Props) {
  const dropdownOptions = [
    { value: "ALL", label: "ALL", className: "option" },
    ...tabs.map((item) => ({
      value: item,
      label: item,
      className: "option",
    })),
  ];
  const defaultOption = filter || dropdownOptions[0];

  return (
    <div>
      <TabsContainerStyle>
        <TabStyle
          className={classnames("tab", { "is-active": filter === null })}
          onClick={() => setFilter(null)}
        >
          ALL
        </TabStyle>

        {tabs.map((tab) => (
          <TabStyle
            className={classnames("tab", { "is-active": filter === tab })}
            key={tab}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </TabStyle>
        ))}
      </TabsContainerStyle>

      <Drop>
        <Dropdown
          controlClassName="customControlClass"
          menuClassName="customMenuClass"
          placeholderClassName="customPlaceHolderClass"
          arrowOpen={<span className="arrowOpenClass" />}
          arrowClosed={<span className="arrowClosedClass" />}
          options={dropdownOptions}
          value={defaultOption}
          onChange={(e) => setFilter(e.label)}
        />
      </Drop>
    </div>
  );
}

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

const Drop = styled.div`
  padding: 10px;
  @media (${minWidth(BREAKPOINT_MOBILE)}) {
    display: none;
  }

  /* Custom styles that are passed as props to react-dropdown component */
  .customControlClass {
    display: flex;
    justify-content: space-between;
  }
  .customControlClass,
  .customMenuClass {
    background-color: ${PURPLE_DARK};
    color: ${GREY_4};
    font-family: ${POPPINS};
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
  }

  .customPlaceHolderClass {
    color: ${WHITE_PRIMARY};
  }

  .option {
    color: inherit;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .option:hover {
    background-color: inherit;
    color: ${WHITE_PRIMARY};
  }

  .option.is-selected {
    background-color: inherit;
    color: ${WHITE_PRIMARY};
  }

  .arrowOpenClass,
  .arrowClosedClass {
    display: block;
    content: " ";
    padding: 10px;
    width: auto;
  }

  .arrowOpenClass {
    background: url(${arrowUp}) no-repeat center;
  }

  .arrowClosedClass {
    background: url(${arrowDown}) no-repeat center;
  }
`;
