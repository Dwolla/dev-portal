import React from "react";
import renderer from "react-test-renderer";
import SecondaryNavBar from "../SecondaryNavBar";
import { SelectMuiOption } from "../../base/SelectMui";
import { ReactComponent as DwollaConnectColorIcon } from "../../../../assets/images/product-icons-and-heroes/dwolla-connect-icon-48x48.svg";
import { ReactComponent as DwollaBalanceColorIcon } from "../../../../assets/images/product-icons-and-heroes/dwolla-balance-icon-48x48.svg";

// const mockPath = "/";
// jest.mock("next/router", () => ({
//   useRouter() {
//     return {
//       route: mockPath,
//       pathname: mockPath,
//       query: "",
//       asPath: mockPath,
//     };
//   },
// }));

const useRouter = jest.spyOn(require("next/router"), "useRouter");

useRouter.mockImplementation(() => ({
  push: jest.fn(),
}));

const PRODUCT_OPTIONS: SelectMuiOption[] = [
  { value: "connect", label: "Dwolla Connect", icon: DwollaConnectColorIcon },
  { value: "balance", label: "Dwolla Balance", icon: DwollaBalanceColorIcon },
];

const NAV_ITEMS: SelectMuiOption[] = [
  {
    value: "platformOverview",
    label: "Platform Overview",
    href: (selectedProduct) => `/docs/${selectedProduct}`, // Dynamic href, changes based on selectedProduct Context
  },
  {
    value: "apiReference",
    label: "API Reference",
    href: (selectedProduct) => `/docs/${selectedProduct}/api-reference`, // Dynamic href, changes based on selectedProduct Context
  },
  {
    value: "codeSamples",
    label: "Code Samples",
    href: () => "/code-samples", // Static href, unchanged
  },
  {
    value: "dropIns",
    label: "Drop Ins",
    href: () => "/docs/drop-in-components", // Static href, unchanged
  },
  {
    value: "sdks",
    label: "SDKs",
    href: () => "/sdks-tools", // Static href, unchanged
  },
  {
    value: "changelog",
    label: "Changelog",
    href: () => "/changelog", // Static href, unchanged
  },
];

const mockSelectedSecondaryNavItem = NAV_ITEMS[0];
const mockSelectedProduct = PRODUCT_OPTIONS[0];

const mockSetSelectedSecondaryNavItem = jest.fn();
const mockSetSelectedProduct = jest.fn();

test("SecondaryNavBar snapshot", () => {
  const tree = renderer
    .create(
      <SecondaryNavBar
        navItems={NAV_ITEMS}
        selectedSecondaryNavItem={mockSelectedSecondaryNavItem}
        setSelectedSecondaryNavItem={mockSetSelectedSecondaryNavItem}
        productOptions={PRODUCT_OPTIONS}
        selectedProduct={mockSelectedProduct}
        setSelectedProduct={mockSetSelectedProduct}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
