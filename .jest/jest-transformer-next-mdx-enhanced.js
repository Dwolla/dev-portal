/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable strict */

"use strict";

const matter = require("gray-matter");
const stringifyObject = require("stringify-object");
const mdx = require("@mdx-js/mdx");
const babelJest = require("babel-jest");
const path = require("path");
const cwd = require("process").cwd();
const fs = require("fs");

const stringifiedBabelOptions = fs.readFileSync(
  path.resolve(__dirname, "..", "babel.config.json"),
  "utf-8"
);
const babelOptions = JSON.parse(stringifiedBabelOptions);

function parseFrontMatter(src, filename) {
  const { content, data } = matter(src);

  return `export const frontMatter = ${stringifyObject({
    ...data,
    __resourcePath: filename.replace(path.join(cwd, "pages/"), ""),
  })};\n
${content}`;
}

module.exports = {
  process: (src, ...rest) => {
    const withFrontMatter = parseFrontMatter(src, ...rest);
    const jsx = mdx.sync(withFrontMatter);
    const toTransform = `import { mdx } from "@mdx-js/react";${jsx}`;
    return babelJest
      .createTransformer(babelOptions)
      .process(toTransform, ...rest);
  },
};
