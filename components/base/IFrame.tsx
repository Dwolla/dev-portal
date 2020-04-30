import styled from "@emotion/styled";
import IframeResizer from "iframe-resizer-react";
import { GREY_11 } from "../colors";

const IFrameWrap = styled.div`
  width: 100%;
  padding: 30px;
  background-color: ${GREY_11};
`;

type Props = {
  src: string;
};

const IFrame = ({ src }: Props) => {
  return (
    <IFrameWrap>
      <IframeResizer
        src={src}
        style={{ width: "1px", minWidth: "100%", border: 0 }}
      />
    </IFrameWrap>
  );
};

export default IFrame;
