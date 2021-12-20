import React from "react";
import styled from "@emotion/styled";

const styledCompleted = {
  color: "red",
  display: "flex",
  flexDirection: "column",
  margin: "1em 2em",
};

const styledActive = {
  color: "blue",
  display: "flex",
  flexDirection: "column",
  margin: "1em 2em",
};

const styledIncomplete = {
  color: "green",
  display: "flex",
  flexDirection: "column",
  margin: "1em 2em",
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const createElements = (steps, activeStep) => {
  const elements = steps.map((step, idx) => {
    if (idx + 1 < activeStep) {
      return (
        <div style={styledCompleted}>
          <h1>{`${idx + 1}`}</h1>
          <h2>{step}</h2>
        </div>
      );
    } if (idx + 1 === activeStep) {
      return (
        <div style={styledActive}>
          {" "}
          <h1>{`${idx + 1}`}</h1>
          <h2>{step}</h2>
        </div>
      );
    }
    return (
      <div style={styledIncomplete}>
        {" "}
        <h1>{`${idx + 1}`}</h1>
        <h2>{step}</h2>
      </div>
    );
  });
  console.log(activeStep);
  return elements;
};

type Props = { totalSteps: Array<string>; activeStep: number };

function TimelineNav({ totalSteps, activeStep }: Props) {
  return <StyledDiv>{createElements(totalSteps, activeStep)}</StyledDiv>;
}

export default TimelineNav;
