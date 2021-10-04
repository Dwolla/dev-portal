import fs from "fs";
import util from "util";
import path from "path";
import matter from "gray-matter";
import sortBy from "lodash.sortby";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const getContents = async (
  rootDir: string,
  _dirsToWalk: string[] = null,
  _contents: Content[] = null
) => {
  // if this is the first call, dirsToWalk is the root dir
  const dirsToWalk: string[] = _dirsToWalk === null ? [rootDir] : _dirsToWalk;

  // if no more directories to walk, return the contents
  if (dirsToWalk.length === 0) return _contents;

  // else read each dtw
  const inodes = await Promise.all(
    dirsToWalk.flatMap(async (dtw) => {
      // get the directory contents
      const dc = await readdir(dtw).catch(() => {
        // eslint-disable-next-line no-console
        console.error("readdir_error");
        return null;
      });
      // if there are contents to map through
      return dc?.map(
        (n) => `${dtw}${dtw[dtw.length - 1] === "/" ? "" : "/"}${n}`
      );
    })
  ).then((arr) => arr.flat().filter((s) => !!s));

  // determine what's a dir and what's content by checking extension for .mdx
  // ignore stuff like .yml files for now
  const [dirs, newContents] = [
    inodes.filter((i) => i.indexOf(".") <= 0),
    await Promise.all(
      inodes
        .filter((i) => i.indexOf(".mdx") > -1)
        .map(async (i) => {
          const contents = await readFile(i).then((f) => f.toString("utf-8"));
          const { content: rawBody, data: meta } = matter(contents);
          return {
            id: i.slice(rootDir.length),
            rawBody: rawBody || "",
            meta: meta || {},
          };
        })
    ),
  ];

  const contents: Content[] =
    _contents === null ? newContents : [..._contents, ...newContents];

  return getContents(rootDir, dirs, contents);
};

const inAPIReference = (c: Content) => c.id.indexOf("/api-reference") === 0;

const noUnderscores = (c: Content) => c.id.indexOf("_") === -1;

const stripFilenameFromId: any = (c) => ({
  ...c,
  id: c.id.replace(/(\/index)?\.mdx$/, ""),
});

const isApi = (c: Content) => c.id.split("/").length === 2;

const isSubsection = (c: Content) => c.id.split("/").length === 3;

const isMethod = (c: Content) => c.id.split("/").length === 4;

const toApiReference = (c: Content) => ({
  ...c,
  id: c.id.replace(/^\/api-reference/, ""),
});

export const buildContentModule = (contentDir: string) => {
  const contentPath = path.resolve(process.cwd(), contentDir);
  return {
    async list(): Promise<Content[]> {
      return getContents(contentPath);
    },

    async getApiReference(): Promise<APIReference> {
      // return Promise.resolve({ apis: [], subsections: {} });
      const allContent = await getContents(contentPath);

      const sortedApiReference = sortBy(
        allContent
          .map(stripFilenameFromId)
          .filter(inAPIReference)
          .filter(noUnderscores)
          .map(toApiReference),
        ["id"]
      );

      const subsections = sortedApiReference
        .filter(isSubsection)
        .reduce((acc, next) => {
          const id = next.id.split("/").slice(0, -1).join("/");
          const res = {
            ...acc,
            [id]: typeof acc[id] !== "undefined" ? [...acc[id], next] : [next],
          };
          return res;
        }, {});

      const methods = sortedApiReference
        .filter(isMethod)
        .reduce((acc, next) => {
          const id = next.id.split("/").slice(0, -1).join("/");
          const res = {
            ...acc,
            [id]: typeof acc[id] !== "undefined" ? [...acc[id], next] : [next],
          };
          return res;
        }, {});

      return {
        apis: sortedApiReference.filter(isApi),
        subsections,
        methods,
      };
    },
  };
};

export default buildContentModule("content");
