import renderer from "react-test-renderer";
import Image from "../Image";

test("Image", () => {
  const tree = renderer
    .create(<Image src="image-src" alt="image-alt" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Image no border", () => {
  const tree = renderer
    .create(<Image src="image-src" alt="image-alt" noborder />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Image with expand", () => {
  const tree = renderer
    .create(<Image src="image-src" alt="image-alt" expand />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
