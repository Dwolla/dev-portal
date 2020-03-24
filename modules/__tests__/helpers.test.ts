import { createElement } from "react";
import { childrenToString } from "../helpers";

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
