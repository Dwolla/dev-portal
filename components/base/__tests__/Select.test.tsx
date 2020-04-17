import renderer from "react-test-renderer";
import Select from "../select/Select";

const options = [
  { value: "javascript", label: "JAVASCRIPT" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "RUBY" },
  { value: "python", label: "PYTHON" },
  { value: "raw", label: "RAW" },
];
const selectedValue = { value: "javascript", label: "JAVASCRIPT" };
const setSelectedValue = () => {};

test("Default Select", () => {
  const tree = renderer
    .create(
      <Select
        options={options}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("AutoWidth Select", () => {
  const tree = renderer
    .create(
      <Select
        options={options}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        autoWidth
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Code Block Select", () => {
  const tree = renderer
    .create(
      <Select
        options={options}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        variant="code"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("AutoWidth Code Block Select", () => {
  const tree = renderer
    .create(
      <Select
        options={options}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        variant="code"
        autoWidth
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
