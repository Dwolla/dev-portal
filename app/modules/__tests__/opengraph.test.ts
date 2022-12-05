import { useRouter } from "next/router";
import type { FrontMatter, OpenGraphType } from "../../../layouts/types";
import OpenGraph, { BASE_URI, RELATIVE_OG_IMAGES } from "../opengraph";

const MOCKED_ROUTER_PATH = "/my/site/path";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: MOCKED_ROUTER_PATH,
    };
  },
}));

describe("Open Graph", () => {
  describe("get", () => {
    test("Should return property if defined", () => {
      const type: OpenGraphType = "article";
      const frontmatter: FrontMatter = { og: { type } };
      const openGraph = OpenGraph(frontmatter);
      expect(openGraph.get("type")).toEqual(type);
    });

    test("Should return undefined if no property defined", () => {
      const openGraph = OpenGraph({});
      expect(openGraph.get("type")).toBeUndefined();
    });
  });

  describe("getDescriptionOrMetaDefault", () => {
    test("Should return description if defined", () => {
      const description = "my og description";
      const frontMatter: FrontMatter = { og: { description } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getDescriptionOrMetaDefault()).toEqual(description);
    });

    test("Should fallback to meta description if not defined", () => {
      const description = "my meta description";
      const frontMatter: FrontMatter = { meta: { description } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getDescriptionOrMetaDefault()).toEqual(description);
    });
  });

  describe("getImageHeight", () => {
    test("Should return image height if defined", () => {
      const height = "720";
      const frontMatter: FrontMatter = { og: { image: { height } } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageHeight()).toEqual(height);
    });

    test("Should return undefined if image height not defined", () => {
      const frontMatter: FrontMatter = { og: { image: {} } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageHeight()).toBeUndefined();
    });
  });

  describe("getImageMime", () => {
    test("Should return MIME type if image filename specified and lookup succeeded", () => {
      const filename = "test-image.png";
      const frontMatter: FrontMatter = { og: { image: { filename } } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageMime()).toEqual("image/png");
    });

    test("Should return undefined if image filename not specified", () => {
      const frontMatter: FrontMatter = { og: { image: {} } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageMime()).toBeUndefined();
    });

    test("Should return undefined if MIME image filename specified but lookup failed", () => {
      const filename = "test-image.null";
      const frontMatter: FrontMatter = { og: { image: { filename } } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageMime()).toBeUndefined();
    });
  });

  describe("getImageUrl", () => {
    test("Should return full image URL if image filename specified", () => {
      const filename = "test-image.png";
      const fullUrl = `${BASE_URI}/${RELATIVE_OG_IMAGES}/${filename}`;
      const frontMatter: FrontMatter = { og: { image: { filename } } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageUrl()).toEqual(fullUrl);
    });

    test("Should return undefined if image filename not specified", () => {
      const frontMatter: FrontMatter = { og: { image: {} } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageUrl()).toBeUndefined();
    });
  });

  describe("getImageWidth", () => {
    test("Should return image width if defined", () => {
      const width = "1920";
      const frontMatter: FrontMatter = { og: { image: { width } } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageWidth()).toEqual(width);
    });

    test("Should return undefined if image width not defined", () => {
      const frontMatter: FrontMatter = { og: { image: {} } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getImageWidth()).toBeUndefined();
    });
  });

  describe("getSiteNameOrElse", () => {
    test("Should return site name if defined", () => {
      const siteName = "good site name";
      const frontMatter: FrontMatter = { og: { siteName } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getSiteNameOrElse("default site")).toEqual(siteName);
    });

    test("Should fallback to specified if site name not defined", () => {
      const fallbackSiteName = "default site name";
      const frontMatter: FrontMatter = { og: {} };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getSiteNameOrElse(fallbackSiteName)).toEqual(
        fallbackSiteName
      );
    });
  });

  describe("getTitleOrMetaDefault", () => {
    test("Should return title if defined", () => {
      const title = "my og title";
      const frontMatter: FrontMatter = { og: { title } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getTitleOrMetaDefault()).toEqual(title);
    });

    test("Should fallback to meta title if not defined", () => {
      const title = "my meta title";
      const frontMatter: FrontMatter = { meta: { title } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getTitleOrMetaDefault()).toEqual(title);
    });
  });

  describe("getUrlOrCanonicalDefault", () => {
    test("Should return full absolute URL if relative URL specified", () => {
      const relativeUrl = "/other/test/path";
      const absoluteUrl = `${BASE_URI}${relativeUrl}`;
      const frontMatter: FrontMatter = { og: { url: relativeUrl } };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getUrlOrCanonicalDefault(useRouter())).toEqual(
        absoluteUrl
      );
    });

    test("Should return canonical default if URL not specified", () => {
      const absoluteUrl = `${BASE_URI}${MOCKED_ROUTER_PATH}`;
      const frontMatter: FrontMatter = { og: {} };
      const openGraph = OpenGraph(frontMatter);
      expect(openGraph.getUrlOrCanonicalDefault(useRouter())).toEqual(
        absoluteUrl
      );
    });
  });
});
