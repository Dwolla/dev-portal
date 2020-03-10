"use strict";

const matter = require("gray-matter");
const stringifyObject = require("stringify-object");
const mdx = require("@mdx-js/mdx");
const { process } = require("babel-jest");
const path = require("path");
const cwd = require("process").cwd();

function parseFrontMatter(src, filename) {
  const { content, data } = matter(src);

  return `export const frontMatter = ${stringifyObject({
    ...data,
    __resourcePath: filename.replace(path.join(cwd, "pages/"), ""),
  })};
${content}`;
}

function createTransformer(src, ...rest) {
  const withFrontMatter = parseFrontMatter(src, ...rest);
  const jsx = mdx.sync(withFrontMatter);
  const toTransform = `import {mdx} from '@mdx-js/react';${jsx}`;
  return process(toTransform, ...rest).code;
}

module.exports = {
  process: createTransformer,
};
