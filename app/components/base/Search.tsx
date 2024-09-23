import React from "react";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import {
  PURPLE_023,
  PURPLE_054,
  PURPLE_090,
  PURPLE_100,
  WHITE_PRIMARY,
} from "../colors";
import { ReactComponent as AskAiIcon } from "../../../assets/images/component-icons/ask-ai-icon.svg";

const SearchWrapper = styled.div`
  position: relative;
  background-color: ${WHITE_PRIMARY};
  border: 1px solid ${PURPLE_023};
  border-radius: 4px;
  margin-left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    border-color: ${PURPLE_100};
  }
`;

const SearchIconWrapper = styled.div`
  padding: 0 10px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AskAiIconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const StyledSearchText = styled.div`
  color: ${PURPLE_054};
  margin-right: 3em;
  flex-grow: 2;

  .MuiInputBase-input {
    border-radius: 5px;
    width: 100%;
  }
`;

const BootstrapTooltip = styled(
  ({ className, children, ...props }: TooltipProps) => (
    <Tooltip
      {...props}
      arrow
      classes={{ popper: className }}
      children={children}
    />
  )
)`
  & .${tooltipClasses.arrow} {
    color: ${PURPLE_090};
  }

  & .${tooltipClasses.tooltip} {
    background-color: ${PURPLE_090};
  }
`;

function Search() {
  return (
    <SearchWrapper
      //Kapa.ai uses id "search-ai-button" to bind the widget to the corresponding element
      id="search-ai-button"
      tabIndex={0}
      role="button"
      aria-label="ask ai or search with cmd + k"
    >
      <SearchIconWrapper>
        <SearchIcon sx={{ color: PURPLE_054 }} />
      </SearchIconWrapper>
      <StyledSearchText>Ask AI or search...</StyledSearchText>
      <BootstrapTooltip title="Ask AI">
        <AskAiIconWrapper>
          <AskAiIcon width={33} />
        </AskAiIconWrapper>
      </BootstrapTooltip>
    </SearchWrapper>
  );
}

export default Search;
