import renderer from "react-test-renderer";
import Image from "../Image";

test("Image", () => {
  const tree = renderer
    .create(<Image src="image-src" alt="image-alt" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
