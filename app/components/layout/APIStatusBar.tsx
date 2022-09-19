import styled from "@emotion/styled";
import {
  API_STATUS_BAR_GREEN,
  GREY_2,
  GREY_5,
  API_STATUS_BAR_BLUE,
  API_STATUS_BAR_YELLOW,
  API_STATUS_BAR_ORANGE,
  API_STATUS_BAR_RED,
} from "../colors";

const ContainerLink = styled.a`
  background: rgba(255, 255, 255, 0.98);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: Poppins;
  color: ${GREY_5};
  border-top: 1px solid ${GREY_2};
  height: 60px;
  padding: 6px 20px;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusIcon = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-right: 12px;

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
