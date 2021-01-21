import renderer from "react-test-renderer";
import IndexPageGrid from "../IndexPageGrid";

const mockPath = "/docs/guide";
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
jest.mock("../../../modules/images.import");

test("IndexPageGrid", () => {
  const bannerProps = {
    icon: "guides-icon.svg",
    topic: "Guides",
    description:
      "Step-by-step instructions to get you set up in the Dwolla API",
  };
  const guideCards = [
    {
      topic: "Send Money to your Users",
      description:
        "Send ACH transfers. Choose custom (Access API) onboarding or Transfer (OAuth) account creation.",
      icon: "guides-icon.svg",
      category: "Get Building",
      href: "/guides/send-money",
    },
    {
      topic: "Receive Money from your Users",
      description:
        "Accept ACH transfers. Covers both Access API and Transfer integrations.",
      icon: "guides-icon.svg",
      category: "Get Building",
      href: "/guides/receive-money",
    },
    {
      topic: "Transfer Money Between Users",
      description:
        "Facilitate ACH transfers between two distinct parties, e.g. for marketplace applications that connect buyers with sellers for bank to bank payments. Features Access API integration.",
      icon: "guides-icon.svg",
      category: "Get Building",
      href: "/guides/transfer-money-between-users/obtain-access-token",
    },
  ];

  const tree = renderer
    .create(
      <IndexPageGrid unfilteredCards={guideCards} bannerProps={bannerProps} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
