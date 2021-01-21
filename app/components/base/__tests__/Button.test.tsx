import renderer from "react-test-renderer";
import Button from "../Button";

test("Button", () => {
  const tree = renderer
    .create(<Button text="Button" size="standard" variant="primary" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Link Button", () => {
  const tree = renderer
    .create(
      <Button
        text="Button"
        size="standard"
        variant="primary"
        link={{ href: "https://www.dwolla.com", external: true }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
