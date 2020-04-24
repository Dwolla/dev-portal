/** @jsx jsx */
import ReactCollapsible from "react-collapsible";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import plusIcon from "../../public/images/plus-circle-icon.svg";
import minusIcon from "../../public/images/minus-circle-icon.svg";
import { GREY_2, WHITE_PRIMARY } from "../colors";
import { POPPINS } from "../typography";
import { BOX_SHADOW_7 } from "../shadowDepths";

// Styles
const CollapsibleWrapper = styled.div`
  /* Main container element for react-collapsible https://www.npmjs.com/package/react-collapsible#collapsible */
  .Collapsible {
    padding: 26px 30px;
    box-sizing: border-box;
    width: 100%;
    border: 1px solid ${GREY_2};
    border-radius: 5px;
    background-color: ${WHITE_PRIMARY};
    font-family: ${POPPINS};
    font-size: 18px;
    line-height: 27px;
    cursor: pointer;
    :hover {
      box-shadow: ${BOX_SHADOW_7};
    }
  }
  /* Content element for react-collapsible https://www.npmjs.com/package/react-collapsible#collapsible__contentinner */
  .Collapsible__contentInner {
    margin-top: 24px;
    padding-right: 40px;
    > * {
      margin: unset;
    }
  }
`;

const StyledTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const ImageStyles = css`
  margin-left: 28px;
`;

// Prop types
type Props = { triggerText: string; children: any };

// Collapsible component
function Collapsible({ triggerText, children }: Props) {
  // Main content when collapsible is closed
  const closedTrigger = (
    <StyledTrigger>
      {triggerText}
      <img css={ImageStyles} src={plusIcon} alt="Collapsible closed icon" />
    </StyledTrigger>
  );

  // Main content when collapsible is open
  const openTrigger = (
    <StyledTrigger>
      {triggerText}
      <img css={ImageStyles} src={minusIcon} alt="Collapsible open icon" />
    </StyledTrigger>
  );

  const transitionTime = 200;

  return (
    <CollapsibleWrapper>
      <ReactCollapsible
        trigger={closedTrigger}
        triggerWhenOpen={openTrigger}
        transitionTime={transitionTime}
      >
        {children}
      </ReactCollapsible>
    </CollapsibleWrapper>
  );
}

export default Collapsible;
