import { extname } from "path";
import type { NextRouter } from "next/router";
import type { FrontMatter } from "../../layouts/types";

export const BASE_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://developers.dwolla.com";

const MIME_TYPES = {
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
};

export const RELATIVE_OG_IMAGES = "assets/images/opengraph";

const getCurrentCanonicalUrl = (router: NextRouter): string =>
  BASE_URI + (router.asPath === "/" ? "" : router.asPath).split(/[#?]/)[0];

const getMimeType = (fileNameOrExt: string): string | undefined =>
  MIME_TYPES[extname(fileNameOrExt).substring(1, fileNameOrExt.length)];

const getOrElse = <T, D>(tryVal: T, defaultVal: D): T | D =>
  tryVal || defaultVal;

const stripSlashes = (str: string): string => str.replace(/^\/|\/$/g, "");

const OpenGraph = (frontMatter: FrontMatter) => ({
  get: (key: keyof FrontMatter["og"]): string =>
    frontMatter.og?.[key] as string,
  getDescriptionOrMetaDefault: (): string =>
    getOrElse(frontMatter.og?.description, frontMatter.meta?.description),
  getImageHeight: (): string | undefined => frontMatter.og?.image?.height,
  getImageMime: (): string | undefined =>
    (frontMatter.og?.image?.filename &&
      getMimeType(frontMatter.og.image.filename)) ||
    undefined,
  getImageUrl: (): string | undefined =>
    frontMatter.og?.image?.filename &&
    `${BASE_URI}/${RELATIVE_OG_IMAGES}/${stripSlashes(
      frontMatter.og.image.filename
    )}`,
  getImageWidth: (): string | undefined => frontMatter.og?.image?.width,
  getSiteNameOrElse: (defaultVal: string): string =>
    getOrElse(frontMatter.og?.siteName, defaultVal),
  getTitleOrMetaDefault: (): string =>
    getOrElse(frontMatter.og?.title, frontMatter.meta?.title),
  getUrlOrCanonicalDefault: (router: NextRouter): string =>
    frontMatter.og?.url
      ? `${BASE_URI}/${stripSlashes(frontMatter.og.url)}`
      : getCurrentCanonicalUrl(router),
});

export default OpenGraph;
