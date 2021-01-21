import Pages from "../pages";

jest.mock("../pages.import");

test("all", () => {
  expect(Pages.all()).toMatchSnapshot();
});

test("under", () => {
  const naked = Pages.under("docs");
  const leading = Pages.under("/docs");
  const trailing = Pages.under("docs/");
  const both = Pages.under("/docs/");

  expect(naked).toEqual(leading);
  expect(naked).toEqual(trailing);
  expect(naked).toEqual(both);
  expect(naked).toMatchSnapshot();
});
