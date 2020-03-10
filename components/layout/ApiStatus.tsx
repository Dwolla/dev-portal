import styled from "@emotion/styled";
import useSWR from "swr";
import fetcher from "../../modules/fetcher";
import { ALERT_BAR_SUCCESS_GREEN, GREY_5, GREY_2 } from "../colors";

const STATUS_PAGE_SUMMARY_URL =
  "https://tnynfs0nwlgr.statuspage.io/api/v2/summary.json";

const ContainerLink = styled.a`
  background: rgba(255, 255, 255, 0.98);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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

  &.indicator-none {
    background: ${ALERT_BAR_SUCCESS_GREEN};
  }
`;

export default function ApiStatus() {
  const status = useSWR(STATUS_PAGE_SUMMARY_URL, fetcher).data?.status;

  return (
    <ContainerLink href="https://status.dwolla.com" target="_blank">
      <StatusIcon className={`indicator-${status?.indicator}`} />

      {status?.description}
    </ContainerLink>
  );
}
