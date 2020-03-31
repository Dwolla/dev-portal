import * as breakpoints from "../breakpoints";

test("breakpoints", () => {
  expect(breakpoints).toMatchSnapshot();
});
