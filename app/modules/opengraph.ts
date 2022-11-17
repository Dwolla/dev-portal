import { NextRouter } from "next/router";
import { FrontMatter } from "../../layouts/types";

const getCanonicalUrl = (router: NextRouter) => (relativePath?: string) =>
  `${
    `https://developers.dwolla.com${
      router.asPath === "/" ? "" : router.asPath
    }`.split(/[#?]/)[0]
  }/${relativePath ?? ""}`;

const getOrElse = <T>(tryVal: T, defaultVal: T): T => tryVal || defaultVal;

const getUrlOrDefault = (frontMatter: FrontMatter, router: NextRouter) =>
  frontMatter.og && frontMatter.og.url
    ? `https://developers.dwolla.com${frontMatter.og.url}`
    : getCanonicalUrl(router)();

const OpenGraph = (frontMatter: FrontMatter) => ({
  get: (key: string) => frontMatter.og?.[key],
  getDescriptionOrMetaDefault: () =>
    getOrElse(frontMatter.og?.description, frontMatter.meta?.description),
  getSiteNameOrElse: (defaultVal: string) =>
    getOrElse(frontMatter.og?.siteName, defaultVal),
  getTitleOrMetaDefault: () =>
    getOrElse(frontMatter.og?.title, frontMatter.meta?.title),
  getUrlOrCanonicalDefault: (router: NextRouter) =>
    getUrlOrDefault(frontMatter, router),
});

export default OpenGraph;
