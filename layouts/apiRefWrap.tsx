import React, { useEffect } from "react";
import { TOP_BAR_HEIGHT } from "../components/layout/TopBar";

const Content = ({
  children,
  frontMatter,
}: {
  children: any;
  frontMatter: any;
}) => {
  useEffect(() => {
    const requestedSection = frontMatter.__resourcePath // eslint-disable-line no-underscore-dangle
      .split("api-reference/")
      .pop()
      .split(".mdx")[0];
    document.getElementById(requestedSection).scrollIntoView(true);
    window.scrollBy(0, -TOP_BAR_HEIGHT);
  }, []);

  return <>{children}</>;
};

export default (frontMatter) => {
  return ({ children: content }: { children: any }) => {
    return <Content frontMatter={frontMatter}>{content}</Content>;
  };
};
