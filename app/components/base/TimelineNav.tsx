import styled from "@emotion/styled";
import { ReactComponent as CheckMarkIcon } from "../../../assets/images/component-icons/check-mark.svg";
import {
  GREY_3,
  CODE_BLOCK_ORANGE,
  PURPLE_DARK,
  ORANGE_PRIMARY,
  PURPLE_PRIMARY,
} from "../colors";
import { ROBOTO } from "../typography";

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  cursor: pointer;
`;

const StyledStepNum = styled.div`
  width: 25px;
  height: 25px;
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${GREY_3};
  color: ${PURPLE_PRIMARY};
  border-radius: 50%;
  margin: 14px 7px 9px;
  &.active {
    border-color: ${ORANGE_PRIMARY};
    color: ${ORANGE_PRIMARY};
  }
  &.completed {
    border-color: ${ORANGE_PRIMARY};
    color: ${ORANGE_PRIMARY};
  }
`;

const StyledText = styled.div`
  font-family: ${ROBOTO};
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  width: 105px;
  color: ${PURPLE_PRIMARY};
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
  flex: 1;
  &:after {
    position: absolute;
    content: "";
    border: 1px solid ${GREY_3};
    width: 77%;
    top: 25px;
    left: 62%;
  }
  &:last-child {
    &:after {
      content: none;
    }
  }
`;

const createElements = (steps, active, setActive) => {
  const onClick = (e) => {
    if (e.target.id) setActive(parseInt(e.target.id, 10));
  };
  const elements = steps.map((step, idx) => {
    let status = null;
    let num = null;
    if (idx === active) {
      status = "active";
      num = idx;
    } else if (idx < active) {
      status = "completed";
      num = (
        <CheckMarkIcon
          id={idx}
          width={14}
          height={10}
          stroke={CODE_BLOCK_ORANGE}
        />
      );
    } else {
      num = idx;
    }
    return (
      <StyledStep className={status} key={step}>
        <StyledStepNum
          className={status}
          onClick={idx !== 0 ? onClick : undefined}
          id={idx}
        >
          {num}
        </StyledStepNum>
        <StyledText className={status}>{step}</StyledText>
      </StyledStep>
    );
  });
  return elements;
};

type Props = {
  totalSteps: Array<string>;
  active: number;
  setActive: Function;
};

function TimelineNav({ totalSteps, active, setActive }: Props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledDiv>{createElements(totalSteps, active, setActive)}</StyledDiv>
    </div>
  );
}

export default TimelineNav;
