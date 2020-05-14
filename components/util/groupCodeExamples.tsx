/* eslint-disable react/no-array-index-key */
import { Children, cloneElement } from "react";

const getCodeBlock = (el) =>
  el.props.originalType === "pre" &&
  Children.only(el.props.children).props.originalType === "code"
    ? Children.only(el.props.children)
    : null;

export const getLanguage = (el) =>
  getCodeBlock(el).props.className?.replace("language-", "") || "plaintext";

export default function groupCodeExamples({
  into: Component,
  children,
}: {
  into: any;
  children: any;
}): JSX.Element {
  const grouped = Children.toArray(children).reduce(
    (acc: any, next: any, i) => {
      if (acc === null) {
        return [
          getCodeBlock(next) ? (
            <Component key={i}>{next}</Component>
          ) : (
            cloneElement(next, { key: i })
          ),
        ];
      }

      const [head, last] = [acc.slice(0, acc.length - 1), acc[acc.length - 1]];

      const tail =
        last.type === Component && getCodeBlock(next)
          ? [
              cloneElement(last, {
                children: [...Children.toArray(last.props.children), next],
              }),
            ]
          : [
              last,
              getCodeBlock(next) ? (
                <Component key={i}>{next}</Component>
              ) : (
                cloneElement(next, { key: i })
              ),
            ];

      return [...head, ...tail];
    },
    null
  );

  return grouped as JSX.Element;
}
