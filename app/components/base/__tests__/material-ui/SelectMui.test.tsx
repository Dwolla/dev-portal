import renderer from "react-test-renderer";
import SelectMui, { SelectMuiOption } from "../../SelectMui";

const options: Array<SelectMuiOption> = [
  { value: "javascript", label: "JavaScript" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "python", label: "Python" },
  { value: "raw", label: "Raw" },
];
const selectedValue = options[0];
const setSelectedValue = jest.fn();

describe("SelectMui", () => {
  test("Default", () => {
    const tree = renderer
      .create(
        <SelectMui
          label="Select Language"
          onChange={setSelectedValue}
          options={options}
          value={selectedValue}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
