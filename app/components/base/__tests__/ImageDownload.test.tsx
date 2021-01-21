import renderer from "react-test-renderer";
import ImageDownload from "../ImageDownload";
import imageFail from "../../../assets/images/content-images/test-document-upload-fail.png";
import imageSuccess from "../../../assets/images/content-images/test-document-upload-success.png";

// Creating a mock to bypass react-tippy breaking the test
jest.mock("react-tippy", () => ({
  Tooltip: jest.fn(({ children }) => <div>{children}</div>),
}));

test("ImageDownload - without filename", () => {
  const tree = renderer
    .create(<ImageDownload tooltipText="Download">{imageFail}</ImageDownload>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("ImageDownload - with filename", () => {
  const tree = renderer
    .create(
      <ImageDownload
        downloadFileName="test-document-upload-success"
        tooltipText="Download"
      >
        {imageSuccess}
      </ImageDownload>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
