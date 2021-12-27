import React, { useState } from "react";
import styled from "@emotion/styled";
import { ReactComponent as CheckMarkIcon } from "../../../assets/images/component-icons/check-mark.svg";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
`;

const StyledStepNum = styled.div`
  width: 25px;
  height: 25px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  display: flex;
  z-index: 5;
  align-items: center;
  justify-content: center;
  border: 1px solid #c9d3e0;
  color: #c9d3e0;
  border-radius: 50%;
  margin-top: 14px;
  margin-left: 7px;
  margin-right: 7px;
  margin-bottom: 9px;
  z-index: 10;
  &.active {
    border-color: #e37c53;
    color: #e37c53;
  }
  &.completed {
    border-color: #e37c53;
    color: #e37c53;
  }
`;

const StyledText = styled.div`
  font-family: Poppins;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  width: 105px;
  color: #c9d3e0;
  &.active {
    color: #2b2d37;
  }
  &.completed {
    color: #2b2d37;
  }
`;

const StyledStep = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  flex: 1;
  &:before {
    position: absolute;
    content: "";
    border: 1px solid #c9d3e0;
    width: 80%;
    top: 25px;
    margin-left: 10%;
    left: -50%;
    z-index: 2;
  }
  &:after {
    position: absolute;
    content: "";
    border: 1px solid #c9d3e0;
    width: 80%;
    top: 25px;
    margin-left: 10%;
    left: 50%;
    z-index: 3;
  }
  &:first-child {
    &:before {
      content: none;
    }
  }
  &:last-child {
    &:after {
      content: none;
    }
  }
  &.active {
    //border-color: #e37c53;
  }
  &.completed {
    //border-color: #e37c53;
  }
`;

const createElements = (steps) => {
  // setActiveStep
  const [active, setActive] = useState(1);

  const onClick = (e) => {
    setActive(parseInt(e.target.id, 10));
  };

  const elements = steps.map((step, idx) => {
    let status = null;
    let num = null;
    if (idx + 1 === active) {
      status = "active";
      num = idx + 1;
    } else if (idx + 1 < active) {
      status = "completed";
      num = (
        <CheckMarkIcon id={idx + 1} width={14} height={10} stroke="#e37c53" />
      );
    } else {
      num = idx + 1;
    }
    return (
      <StyledStep className={status}>
        <StyledStepNum className={status} onClick={onClick} id={num}>
          {num}
        </StyledStepNum>
        <StyledText className={status}>{step}</StyledText>
      </StyledStep>
    );
  });
  return elements;
};

type Props = { totalSteps: Array<string> }; // setActiveStep: number

function TimelineNav({ totalSteps }: Props) {
  // setActiveStep
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledDiv>{createElements(totalSteps)}</StyledDiv>
    </div>
  );
}

export default TimelineNav;
