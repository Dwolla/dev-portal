/* eslint-disable import/prefer-default-export */
import { Children, ReactElement } from "react"; // eslint-disable-line no-unused-vars

export const childrenToString = (children) =>
  Children.toArray(children).reduce((acc, child: ReactElement | string) => {
    if (typeof child === "object") {
      return acc + child.props.children.toString();
    }
    return acc + child.toString();
  }, "");

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[-]+/g, "-")
    .replace(/[^\w-]+/g, "");
