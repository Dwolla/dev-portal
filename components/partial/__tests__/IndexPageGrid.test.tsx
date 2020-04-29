import renderer from "react-test-renderer";
import IndexPageGrid from "../IndexPageGrid";
import guidesIcon from "../../../assets/images/content-icons/guides-icon.svg";

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

test("IndexPageGrid", () => {
  const bannerProps = {
    icon: guidesIcon,
    topic: "Guides",
    description:
      "Step-by-step instructions to get you set up in the Dwolla API",
  };
  const guideCards = [
    {
      topic: "Send Money to your Users",
      description:
        "Send ACH transfers. Choose custom (Access API) onboarding or Transfer (OAuth) account creation.",
      icon: guidesIcon,
      category: "Get Building",
      href: "/docs/guides/send-money",
    },
    {
      topic: "Receive Money from your Users",
      description:
        "Accept ACH transfers. Covers both Access API and Transfer integrations.",
      icon: guidesIcon,
      category: "Get Building",
      href: "/docs/guides/receive-money",
    },
    {
      topic: "Transfer Money Between Users",
      description:
        "Facilitate ACH transfers between two distinct parties, e.g. for marketplace applications that connect buyers with sellers for bank to bank payments. Features Access API integration.",
      icon: guidesIcon,
      category: "Get Building",
      href: "/docs/guides/transfer-money-between-users/obtain-access-token",
    },
  ];

  const tree = renderer
    .create(
      <IndexPageGrid unfilteredCards={guideCards} bannerProps={bannerProps} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
