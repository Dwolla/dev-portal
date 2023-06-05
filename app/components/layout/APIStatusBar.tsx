import styled from "@emotion/styled";
import {
  API_STATUS_BAR_BLUE,
  API_STATUS_BAR_GREEN,
  API_STATUS_BAR_ORANGE,
  API_STATUS_BAR_RED,
  API_STATUS_BAR_YELLOW,
  GREY_2,
  PURPLE_PRIMARY,
} from "../colors";

export const API_STATUS_BAR_HEIGHT = "48px";
const ContainerLink = styled.a`
  background: rgba(255, 255, 255, 0.98);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: Poppins;
  color: ${PURPLE_PRIMARY};
  border-top: 1px solid ${GREY_2};
  height: ${API_STATUS_BAR_HEIGHT};
  padding: 6px 20px;
  text-transform: uppercase;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const StatusIcon = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 36px;
  &.indicator- {
    &none {
      background: ${API_STATUS_BAR_GREEN};
    }
    &critical {
      background: ${API_STATUS_BAR_RED};
    }
    &major {
      background: ${API_STATUS_BAR_ORANGE};
    }
    &minor {
      background: ${API_STATUS_BAR_YELLOW};
    }
    &maintenance {
      background: ${API_STATUS_BAR_BLUE};
    }
  }
`;
export default function APIStatusBar({ apiStatus }: { apiStatus?: APIStatus }) {
  return (
    <ContainerLink href="https://status.dwolla.com" target="_blank">
      <StatusIcon className={`indicator-${apiStatus?.indicator}`} />
      {apiStatus?.description}
    </ContainerLink>
  );
}
