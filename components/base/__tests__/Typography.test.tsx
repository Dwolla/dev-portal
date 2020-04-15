import renderer from "react-test-renderer";
import {
  H1,
  OrderedList,
  H2,
  H3,
  H4,
  H5,
  Paragraph,
  UnorderedList,
} from "../Typography";

test("headings", () => {
  const tree = renderer
    .create(
      <>
        <H1 id="my-h1" className="my-class">
          H1 Heading
        </H1>
        <H2 id="my-h2" className="my-class">
          H2 Heading
        </H2>
        <H3 id="my-h3" className="my-class">
          H3 Heading
        </H3>
        <H4 id="my-h4" className="my-class">
          H4 Heading
        </H4>
        <H5 id="my-h5" className="my-class">
          H5 Heading
        </H5>
      </>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("headings (dark)", () => {
  const tree = renderer
    .create(
      <>
        <H1 id="my-h1" className="my-class" isDark>
          H1 Heading
        </H1>
        <H2 id="my-h2" className="my-class" isDark>
          H2 Heading
        </H2>
        <H3 id="my-h3" className="my-class" isDark>
          H3 Heading
        </H3>
        <H4 id="my-h4" className="my-class" isDark>
          H4 Heading
        </H4>
        <H5 id="my-h5" className="my-class" isDark>
          H5 Heading
        </H5>
      </>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Paragraph", () => {
  const tree = renderer
    .create(
      <Paragraph id="my-p" className="my-class">
        Paragraph
      </Paragraph>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Paragraph (dark)", () => {
  const tree = renderer
    .create(
      <Paragraph id="my-p" className="my-class" isDark>
        Paragraph (dark)
      </Paragraph>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("OrderedList", () => {
  const tree = renderer
    .create(
      <OrderedList id="my-list" className="my-class">
        <li>Ordered list text goes here</li>
        <li>Ordered list text goes here</li>
        <li>Ordered list text goes here</li>
      </OrderedList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("OrderedList (dark)", () => {
  const tree = renderer
    .create(
      <OrderedList id="my-list" className="my-class" isDark>
        <li>Ordered list text goes here</li>
        <li>Ordered list text goes here</li>
        <li>Ordered list text goes here</li>
      </OrderedList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("UnorderedList", () => {
  const tree = renderer
    .create(
      <UnorderedList id="my-list" className="my-class">
        <li>Unordered list text goes here</li>
        <li>Unordered list text goes here</li>
        <li>Unordered list text goes here</li>
      </UnorderedList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("UnorderedList (dark)", () => {
  const tree = renderer
    .create(
      <UnorderedList id="my-list" className="my-class" isDark>
        <li>Unordered list text goes here</li>
        <li>Unordered list text goes here</li>
        <li>Unordered list text goes here</li>
      </UnorderedList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
