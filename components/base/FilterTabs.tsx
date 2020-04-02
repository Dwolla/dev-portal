import React from "react";
import Dropdown from "react-dropdown";
import styled from "@emotion/styled";
import arrowDown from "../../public/images/arrow-down-icon.svg";
import arrowUp from "../../public/images/arrow-up-icon.svg";
import { GREY_4, WHITE_PRIMARY, PURPLE_DARK, ORANGE_PRIMARY } from "../colors";
import { POPPINS } from "../typography";
import { minWidth, maxWidth, BREAKPOINT_MOBILE } from "../breakpoints";

type Props = {
  tabs: string[];
  filter: string;
  setFilter: Function;
};

export default function Tabs({ tabs, filter, setFilter }: Props) {
  // Initializing options array for Dropdown component derived from react-dropdown
  const options = [{ value: "ALL", label: "ALL", className: "option" }];

  tabs.map((item) =>
    options.push({
      value: item,
      label: item,
      className: "option",
    })
  );

  const defaultOption = !filter ? options[0] : filter;

  return (
    <div>
      <TabsContainerStyle>
        <TabStyle
          className={`tab ${filter === null ? "is-active" : ""}`}
          onClick={setFilter(null)}
        >
          ALL
        </TabStyle>
        {tabs.map((tab) => (
          <TabStyle
            className={`tab ${filter === tab ? "is-active" : ""}`}
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
          options={options}
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

const TabStyle = styled.div`
  height: 25px;
  color: ${GREY_4};
  font-family: ${POPPINS};
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  justify-self: center;
  padding: 0px;
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
  padding: 5px;
  @media (${minWidth(BREAKPOINT_MOBILE)}) {
    display: none;
  }

  /* Customer styles that are passed as props to react-dropdown component */
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
