export interface FrontMatter {
  guide?: FrontMatterGuide;
  meta?: FrontMatterMeta;
  og?: FrontMatterOpenGraph;
  __resourcePath?: string;
}

export interface FrontMatterGuide {
  step?: number;
}

export interface FrontMatterMeta {
  title?: string;
  description?: string;
}

/**
 * OpenGraph page front matter properties.
 * @see {@link https://ogp.me/ Open Graph}
 */
export interface FrontMatterOpenGraph {
  /**
   * Optional, tag is omitted if not supplied.
   * @see {@link https://ogp.me/#types Object Types - Open Graph}
   */
  type?: OpenGraphType;

  /**
   * Optional, defaults to meta title if not supplied.
   */
  title?: string;

  /**
   * Optional, defaults to meta description if not supplied.
   * If no meta description is present, tag is wholly omitted.
   */
  description?: string;

  /**
   * Optional, also generates if present:
   *  - og:image:type (MIME type)
   *  - og:image:height
   *  - og:image:width
   */
  image?: string;

  /**
   * Optional, defaults to current page canonical URL.
   */
  url?: string;

  /**
   * Optional, defaults to "Dwolla Developers."
   */
  siteName?: string;
}

export type OpenGraphType = "article";

export type Props<T = unknown> = {
  children: T;
  frontMatter: FrontMatter;
};
