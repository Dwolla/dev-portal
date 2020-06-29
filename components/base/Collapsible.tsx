/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/** @jsx jsx */
import { useState } from "react";
import ReactCollapsible from "react-collapsible";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import classnames from "classnames";
import plusIcon from "../../assets/images/component-icons/plus-circle-icon.svg";
import minusIcon from "../../assets/images/component-icons/minus-circle-icon.svg";
import { GREY_2, WHITE_PRIMARY, PARAGRAPH_TEXT } from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { BOX_SHADOW_7, BOX_SHADOW_4 } from "../shadowDepths";

// Styles

const CollapsibleWrapper = styled.div`
  :focus {
    outline: none;
    box-shadow: ${BOX_SHADOW_7};
  }

  /* Main container element for react-collapsible https://www.npmjs.com/package/react-collapsible#collapsible */
  .Collapsible {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid ${GREY_2};
    border-radius: 5px;
    background-color: ${WHITE_PRIMARY};
    font-family: ${POPPINS};
    font-size: 18px;
    line-height: 27px;
    :hover {
      box-shadow: ${BOX_SHADOW_4};
    }
  }
`;

const StyledTrigger = styled.div`
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  cursor: pointer;
`;

const ImageStyles = css`
  margin-left: 28px;
  width: 24px;
`;

const InnerContentWrapper = styled.div`
  margin: 0px 70px 25px 30px;
  * {
    margin: unset;
  }
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  font-size: 16px;
  letter-spacing: 0;
  line-height: 28px;

  &.visuallyhidden {
    transition-delay: 200ms;
    visibility: hidden;
  }
`;

// Prop types
type Props = { triggerText: string; children: any };

// Collapsible component
function Collapsible({ triggerText, children }: Props) {
  const [active, setActive] = useState(false);

  // Main content when collapsible is closed
  const closedTrigger = (
    <StyledTrigger>
      {triggerText}
      <img css={ImageStyles} src={plusIcon} alt="Open collapsible content" />
    </StyledTrigger>
  );

  // Main content when collapsible is open
  const openTrigger = (
    <StyledTrigger>
      {triggerText}
      <img css={ImageStyles} src={minusIcon} alt="Close collapsible content" />
    </StyledTrigger>
  );

  const transitionTime = 200;

  // Sets active state on collapsible
  function handleActive() {
    setActive(!active);
  }

  // Handle "Enter" key to open/close collapsible
  function handleKeyDown(e) {
    if (e.key === "Enter") handleActive();
  }

  return (
    <CollapsibleWrapper
      tabIndex={0}
      onKeyDown={(keyPress) => handleKeyDown(keyPress)}
      onClick={() => handleActive()}
    >
      <ReactCollapsible
        trigger={closedTrigger}
        triggerWhenOpen={openTrigger}
        transitionTime={transitionTime}
        open={active}
      >
        <InnerContentWrapper
          className={classnames({
            visuallyhidden: !active,
          })}
        >
          {children}
        </InnerContentWrapper>
      </ReactCollapsible>
    </CollapsibleWrapper>
  );
}

export default Collapsible;
