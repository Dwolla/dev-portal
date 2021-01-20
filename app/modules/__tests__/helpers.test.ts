import { createElement } from "react";
import { childrenToString, slugify } from "../helpers";

describe("childrenToString", () => {
  test("string child", () => {
    const children = "hello";

    expect(childrenToString(children)).toBe(children);
  });

  test("array of children", () => {
    const children = [
      "hello ",
      createElement("code", { children: "world" }),
      "!",
    ];

    expect(childrenToString(children)).toBe("hello world!");
  });
});

describe("slugify", () => {
  test("string with bad formatting", () => {
    const normalString = "Hello, World!!!";
    const expectedSlug = "hello-world";

    expect(slugify(normalString)).toBe(expectedSlug);
  });
});
