export interface FrontMatter {
  guide?: FrontMatterGuide;
  meta?: FrontMatterMeta;
  og?: FrontMatterOpenGraph;
  __resourcePath?: string;
}

export interface FrontMatterGuide {
  step?: number;
}

export interface FrontMatterOpenGraphImage {
  /**
   * Required, filename of the image.
   */
  filename?: string;

  /**
   * Optional, the height of the image.
   */
  height?: string;

  /**
   * Optional, the width of the image.
   */
  width?: string;
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
   * Optional, includes nested image metadata, such as URL, height, and width.
   * @see {@link https://ogp.me/#structured Structured Properties - Open Graph}
   */
  image?: FrontMatterOpenGraphImage;

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
