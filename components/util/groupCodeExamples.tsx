/* eslint-disable react/no-array-index-key */
import { Children, cloneElement } from "react";

const getLanguage = (el) =>
  el.props.originalType === "pre" &&
  (Children.toArray(el.props.children).find(
    (c: any) =>
      c.props.originalType === "code" &&
      c.props.className?.startsWith("language-")
  ) as any)?.props?.className?.replace("language-", "");

const containsCode = (el) => !!getLanguage(el);

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
          containsCode(next) ? (
            <Component key={i}>{next}</Component>
          ) : (
            cloneElement(next, { key: i })
          ),
        ];
      }

      const [head, last] = [acc.slice(0, acc.length - 1), acc[acc.length - 1]];

      const tail =
        last.type === Component && containsCode(next)
          ? [
              cloneElement(last, {
                children: [...Children.toArray(last.props.children), next],
              }),
            ]
          : [
              last,
              containsCode(next) ? (
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
