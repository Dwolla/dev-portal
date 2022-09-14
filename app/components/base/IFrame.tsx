import React, { useEffect } from "react";
import styled from "@emotion/styled";
import IframeResizer from "iframe-resizer-react";
import { GREY_11 } from "../colors";

const IFrameWrap = styled.div`
  width: 100%;
  padding: 30px;
  background-color: ${GREY_11};
`;

function HubSpotForm({ hubSpotFormId }: { hubSpotFormId: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "//js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "7996980",
          formId: hubSpotFormId,
          target: `#hs-${hubSpotFormId}`,
        });
      }
    });
  }, []);

  return <IFrameWrap id={`hs-${hubSpotFormId}`}></IFrameWrap>;
}

type Props = {
  src?: string;
  hubSpotFormId?: string;
};

function IFrame({ src, hubSpotFormId }: Props) {
  return hubSpotFormId ? (
    <HubSpotForm hubSpotFormId={hubSpotFormId} />
  ) : (
    <IFrameWrap>
      <IframeResizer
        src={src}
        style={{ width: "1px", minWidth: "100%", border: 0 }}
      />
    </IFrameWrap>
  );
}

export default IFrame;
