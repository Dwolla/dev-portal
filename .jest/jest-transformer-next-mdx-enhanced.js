/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable strict */

"use strict";

const matter = require("gray-matter");
const mdx = require("@mdx-js/mdx");
const { createTransformer } = require("babel-jest");
const path = require("path");
const cwd = require("process").cwd();
const fs = require("fs");

const stringifiedBabelOptions = fs.readFileSync(
  path.resolve(__dirname, "..", "babel.config.json"),
  "utf-8"
);
const babelOptions = JSON.parse(stringifiedBabelOptions);

async function parseFrontMatter(src, filename) {
  const { content, data } = matter(src);
  const { default: stringifyObject } = await import("stringify-object");

  return `export const frontMatter = ${stringifyObject({
    ...data,
    __resourcePath: filename.replace(path.join(cwd, "pages/"), ""),
  })};\n
${content}`;
}

module.exports = {
  process: async (src, ...rest) => {
    const withFrontMatter = parseFrontMatter(src, ...rest);
    const jsx = mdx.sync(withFrontMatter);
    const toTransform = `import { mdx } from "@mdx-js/react";${jsx}`;

    const output = await createTransformer(babelOptions).processAsync(
      toTransform,
      ...rest
    );
    console.log("Output: ", output);
    return output;
  },
};
