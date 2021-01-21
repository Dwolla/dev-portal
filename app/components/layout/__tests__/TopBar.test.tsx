import renderer from "react-test-renderer";
import TopBar from "../TopBar";

const mockPath = "/changelog";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: mockPath,
      pathname: mockPath,
      query: "",
      asPath: mockPath,
    };
  },
}));

test("TopBar", () => {
  const tree = renderer
    .create(
      <TopBar
        button={{
          text: "Get API Keys",
          link: {
            href: "https://accounts-sandbox.dwolla.com/login",
            external: true,
          },
        }}
        links={[
          { text: "API Docs", href: "https://docs.dwolla.com", external: true },
          { text: "Changelog", href: "/changelog" },
          { text: "Manually Active", href: "/manually-active", active: true },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
