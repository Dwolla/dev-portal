import React from "react";
import styled from "@emotion/styled";
import Tooltip from "./tooltip/Tooltip";
import { GREY_2, WHITE_PRIMARY } from "../colors";
import { ReactComponent as DownloadIcon } from "../../assets/images/component-icons/download-icon.svg";

const Container = styled.div`
  box-sizing: border-box;
  border: 1px solid ${GREY_2};
  background-color: ${WHITE_PRIMARY};
`;

const DownloadDiv = styled.div`
  height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid ${GREY_2};
`;

const DownloadIconWrapper = styled.div`
  float: right;
  margin: 12px 12px 12px auto;
`;

const ImageDiv = styled.div`
  padding: 12px 13px;
`;

type Props = {
  children: string;
  // downloadFileName is used when the downloaded image must have a specific filename.
  // Example - 'test-document-upload-success.png'
  downloadFileName?: string;
  tooltipText: string;
};

function ImageDownload({ children, downloadFileName, tooltipText }: Props) {
  return (
    <Container>
      <DownloadDiv>
        <DownloadIconWrapper>
          <Tooltip text={tooltipText} hasArrow position="bottom" distance={11}>
            <a href={children} download={downloadFileName || ""}>
              <DownloadIcon />
            </a>
          </Tooltip>
        </DownloadIconWrapper>
      </DownloadDiv>
      <ImageDiv>
        <img src={children} alt="" />
      </ImageDiv>
    </Container>
  );
}

export default ImageDownload;
