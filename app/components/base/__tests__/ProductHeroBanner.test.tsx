import renderer from "react-test-renderer";
import { ThemeProvider } from "@mui/material";
import ProductHeroBanner from "../ProductHeroBanner";
import { ReactComponent as HeroGraphic } from "../../../../assets/images/product-icons-and-heroes/dwolla-balance-icon-48x48.svg";
import theme from "../../../theme";

test("FooterCTA", () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <ProductHeroBanner
          HeroGraphic={HeroGraphic}
          topic="Dwolla Balance"
          description="Use Dwolla’s existing bank partnerships to connect your software to the banking infrastructure."
          links={[
            {
              text: "API reference",
              href: "/api-reference",
            },
            {
              text: "Code Samples",
              href: "/code-samples",
            },
            {
              text: "SDKs",
              href: "/sdks-tools",
            },
          ]}
        />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
