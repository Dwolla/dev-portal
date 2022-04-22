import * as React from "react";
import { storiesOf } from "@storybook/react";
import ImageDownload from "../../app/components/base/ImageDownload";
import imageFail from "../../assets/images/content-images/test-document-upload-fail.png";
import imageSuccess from "../../assets/images/content-images/test-document-upload-success.png";

storiesOf("base/ImageDownload", module)
  .add("default - without filename", () => (
    <ImageDownload tooltipText="Download">{imageFail}</ImageDownload>
  ))
  // downloadFilename is used when the downloaded image must maintain the same filename
  .add("with Filename", () => (
    <ImageDownload
      downloadFileName="test-document-upload-success"
      tooltipText="Download"
    >
      {imageSuccess}
    </ImageDownload>
  ));
