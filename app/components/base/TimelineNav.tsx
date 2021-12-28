import React, { useState } from "react";
import styled from "@emotion/styled";
import { ReactComponent as CheckMarkIcon } from "../../../assets/images/component-icons/check-mark.svg";
import { GREY_3, CODE_BLOCK_ORANGE, PURPLE_DARK } from "../colors";

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
  border: 1px solid ${GREY_3};
  color: ${GREY_3};
  border-radius: 50%;
  margin-top: 14px;
  margin-left: 7px;
  margin-right: 7px;
  margin-bottom: 9px;
  z-index: 10;
  &.active {
    border-color: ${CODE_BLOCK_ORANGE};
    color: ${CODE_BLOCK_ORANGE};
  }
  &.completed {
    border-color: ${CODE_BLOCK_ORANGE};
    color: ${CODE_BLOCK_ORANGE};
  }
`;

const StyledText = styled.div`
  font-family: Poppins;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  width: 105px;
  color: ${GREY_3};
  &.active {
    color: ${PURPLE_DARK};
  }
  &.completed {
    color: ${PURPLE_DARK};
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
    border: 1px solid ${GREY_3};
    width: 80%;
    top: 25px;
    margin-left: 10%;
    left: -50%;
    z-index: 2;
  }
  &:after {
    position: absolute;
    content: "";
    border: 1px solid ${GREY_3};
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
    //border-color: ${CODE_BLOCK_ORANGE};
  }
  &.completed {
    //border-color: ${CODE_BLOCK_ORANGE};
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
      <StyledStep className={status} key={step}>
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
