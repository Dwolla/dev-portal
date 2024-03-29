import renderer from "react-test-renderer";
import AlertBar from "../AlertBar";

test("AlertBar - warning", () => {
  const tree = renderer
    .create(
      <AlertBar variation="warning">
        This is a warning! You need to gather <strong>new</strong> information
        if the Customer is placed into the <code>retry</code> status; simply
        passing the same information will result in the same insufficient
        scores.
      </AlertBar>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("AlertBar - info", () => {
  const tree = renderer
    .create(
      <AlertBar variation="info">
        Here is an info. The file must be either a .jpg, .jpeg, .png, or .pdf.
        Files must be no larger than 10MB in size.
      </AlertBar>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("AlertBar - announcement", () => {
  const tree = renderer
    .create(
      <AlertBar variation="announcement">This is an announcement.</AlertBar>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
