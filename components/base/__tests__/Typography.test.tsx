import renderer from "react-test-renderer";
import { H1, OrderedList } from "../Typography";

test("H1", () => {
  const tree = renderer.create(<H1 isDark>H1 Heading</H1>).toJSON();

  expect(tree).toMatchSnapshot();
});

test("OrderedList", () => {
  const tree = renderer
    .create(
      <OrderedList>
        {[
          { id: "1", text: "Ordered list text goes here" },
          { id: "2", text: "Ordered list text goes here" },
          { id: "3", text: "Ordered list text goes here" },
        ]}
      </OrderedList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
