import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import infoIcon from "../../../assets/images/component-icons/info-icon.svg";
import warningIcon from "../../../assets/images/component-icons/warning-icon.svg";
import announcementIcon from "../../../assets/images/component-icons/announcement-icon.svg";
import { ReactComponent as CloseIcon } from "../../../assets/images/component-icons/close.svg";

import {
  GREY_1,
  GREY_2,
  API_STATUS_BAR_YELLOW,
  PARAGRAPH_TEXT,
  ANNOUNCEMENT_BACKGROUND_BLUE,
  ANNOUNCEMENT_ICON_BLUE,
  ANNOUNCEMENT_TEXT_BLUE,
} from "../colors";
import { ROBOTO } from "../typography";

const StyledAlertBar = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  &.info {
    border: 1px solid ${GREY_2};
    border-radius: 5px;
    background-color: ${GREY_1};
  }
  &.warning {
    border: 1px solid ${API_STATUS_BAR_YELLOW};
    border-radius: 5px;
  }
  &.announcement {
    background-color: ${ANNOUNCEMENT_BACKGROUND_BLUE};
    border-radius: 5px;
    * {
      justify-content: space-around;
      color: ${ANNOUNCEMENT_TEXT_BLUE};
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 143%;
      letter-spacing: 0.17px;
    }
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  height: 24px;
  width: 24px;
`;

const TextWrapper = styled.div`
  flex-grow: 2;
  padding-left: 13px;
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  font-size: 15px;
  font-weight: 500;
  line-height: 25px;
`;

const StyledCloseIcon = styled.div`
  margin-left: 10px;
  cursor: pointer;
  svg {
    * {
      fill: ${ANNOUNCEMENT_TEXT_BLUE};
    }
  }

  :hover,
  :focus {
    svg {
      * {
        fill: ${ANNOUNCEMENT_ICON_BLUE};
      }
    }
  }

  :focus {
    outline: none;
  }
`;

type Props = {
  variation: "warning" | "info" | "announcement";
  isClosable?: boolean;
  children: any;
};

function AlertBar({ variation, isClosable, children }: Props) {
  const [showAlert, setShowAlert] = useState(false);

  /* On component mount, it will check the variation of the component. If it is an info or warning,
  then showalert is set to TRUE, and the component is displayed. If it is an announcement,
  then it will check if cookie exists. If it does, the AlertBar is not displayed. */
  useEffect(() => {
    if (variation === "info" || variation === "warning") {
      setShowAlert(true);
    } else if (document.cookie.indexOf("dwolla_announcement_cookie") === -1) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  });

  /* Hides Alertbar and sets "dwolla_announcement_cookie" cookie when the announcement alertbar
  is closed by mouseclick of keyboard enter key.
  max-age=31536000 means the cookie will expire in a year.
  Change max-age value as needed. */
  const hideAlert = () => {
    setShowAlert(false);
    document.cookie = "dwolla_announcement_cookie=1; max-age=31536000";
  };
  function onKeydown(e) {
    if (e.key === "Enter") hideAlert();
  }

  // Set icon based on variation selected
  let icon;
  switch (variation) {
    case "warning":
      icon = warningIcon;
      break;
    case "info":
      icon = infoIcon;
      break;
    case "announcement":
      icon = announcementIcon;
      break;
    default:
      break;
  }

  return (
    // Render component as long as close button isn't clicked
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {showAlert && (
        <StyledAlertBar className={variation}>
          <ImageWrapper>
            <img src={icon} alt={variation} />
          </ImageWrapper>
          <TextWrapper>{children}</TextWrapper>
          {isClosable && (
            <StyledCloseIcon
              tabIndex={0}
              onClick={hideAlert}
              onKeyDown={(keyPress) => onKeydown(keyPress)}
            >
              <CloseIcon width={16} />
            </StyledCloseIcon>
          )}
        </StyledAlertBar>
      )}
    </>
  );
}

export default AlertBar;
