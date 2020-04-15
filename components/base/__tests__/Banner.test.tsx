import renderer from "react-test-renderer";
import Banner from "../Banner";

test("Banner", () => {
  const tree = renderer
    .create(
      <Banner
        topic="Comprehensive API documentation for developers and businesses."
        description="Step-by-step instructions to get you set up in the Dwolla API"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("with Button", () => {
  const tree = renderer
    .create(
      <Banner
        topic="Comprehensive API documentation for developers and businesses."
        description="Step-by-step instructions to get you set up in the Dwolla API"
        button={{ text: "Discover the Possibilities" }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
