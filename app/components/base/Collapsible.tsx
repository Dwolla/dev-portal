/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from "react";
import ReactCollapsible from "react-collapsible";
import styled from "@emotion/styled";
import classnames from "classnames";
import plusIcon from "../../../assets/images/component-icons/plus-circle-icon.svg";
import minusIcon from "../../../assets/images/component-icons/minus-circle-icon.svg";
import { ReactComponent as CaretRightIcon } from "../../../assets/images/component-icons/side-nav/caret-right-nav-icon.svg";
import {
  GREY_1,
  GREY_2,
  GREY_4,
  WHITE_PRIMARY,
  HEADLINE_TEXT,
  PARAGRAPH_TEXT,
} from "../colors";
import { ROBOTO } from "../typography";
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
    font-family: ${ROBOTO};
    font-size: 18px;
    line-height: 27px;
    :hover {
      box-shadow: ${BOX_SHADOW_4};
    }
  }
  &.webhook {
    .Collapsible {
      width: 100%;
      background-color: ${GREY_1};
      border: 1px solid ${GREY_4};
      border-radius: 8px;
      font-family: ${ROBOTO};
      font-size: 14px;
      line-height: 152.19%;
      letter-spacing: 0.02em;
    }
  }
`;

const StyledTrigger = styled.div`
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &.webhook {
    border-radius: 8px;
    padding: 14px 20px;
    font-family: ${ROBOTO};
    font-size: 14px;
    line-height: 152.19%;
    letter-spacing: 0.02em;
    color: ${HEADLINE_TEXT};
  }
`;

const StyledFlexDiv = styled.div`
  padding-left: 14px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledImage = styled.img`
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
  &.webhook {
    margin: 0px 12px 12px;
    color: unset;
    font-family: unset;
    font-size: unset;
    letter-spacing: unset;
    line-height: unset;
  }
`;

// Prop types
type Props = {
  triggerText: string;
  extraTrigger?: string;
  variant?: "default" | "webhook";
  children: any;
};

// Collapsible component
function Collapsible({ triggerText, extraTrigger, variant, children }: Props) {
  const [active, setActive] = useState(false);

  // Main content when collapsible is closed
  const closedTrigger =
    variant === "webhook" ? (
      <StyledTrigger className={variant}>
        <CaretRightIcon width={9} />
        <StyledFlexDiv>
          <div>{triggerText}</div> <div>{extraTrigger}</div>
        </StyledFlexDiv>
      </StyledTrigger>
    ) : (
      <StyledTrigger>
        {triggerText}
        <StyledImage src={plusIcon} alt="Open collapsible content" />
      </StyledTrigger>
    );

  // Main content when collapsible is open
  const openTrigger =
    variant === "webhook" ? (
      <StyledTrigger className={variant}>
        <CaretRightIcon
          width={9}
          transform="rotate(90)"
          style={{ transitionDuration: "0.2s" }}
        />
        <StyledFlexDiv>
          <div>{triggerText}</div> <div>{extraTrigger}</div>
        </StyledFlexDiv>
      </StyledTrigger>
    ) : (
      <StyledTrigger>
        {triggerText}
        <StyledImage src={minusIcon} alt="Close collapsible content" />
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
      className={variant}
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
            webhook: variant === "webhook",
          })}
        >
          {children}
        </InnerContentWrapper>
      </ReactCollapsible>
    </CollapsibleWrapper>
  );
}

export default Collapsible;
