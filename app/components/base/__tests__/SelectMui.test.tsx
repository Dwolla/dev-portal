import renderer from "react-test-renderer";
import SelectMui, { SelectMuiOption } from "../SelectMui";
import { ReactComponent as DwollaConnectColorIcon } from "../../../../assets/images/product-icons-and-heroes/dwolla-connect-icon-48x48.svg";
import { ReactComponent as DwollaBalanceColorIcon } from "../../../../assets/images/product-icons-and-heroes/dwolla-balance-icon-48x48.svg";

const options: Array<SelectMuiOption> = [
  { value: "javascript", label: "JavaScript" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "python", label: "Python" },
  { value: "raw", label: "Raw" },
  { value: "connect", label: "Dwolla Connect", icon: DwollaConnectColorIcon },
  { value: "balance", label: "Dwolla Balance", icon: DwollaBalanceColorIcon },
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
