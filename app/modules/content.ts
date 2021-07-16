import fs from "fs";
import util from "util";
import path from "path";
import matter from "gray-matter";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const getContents = async (
  rootDir: string,
  _dirsToWalk: string[] = null,
  _contents: Contents = null
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
          const { content: body, data: head } = matter(contents);
          return {
            id: i.slice(rootDir.length), // TODO
            body: body || "",
            head: head || {},
          };
        })
    ),
  ];

  const contents: Content[] =
    _contents === null ? newContents : [..._contents, ...newContents];

  return getContents(rootDir, dirs, contents);
};

export const buildContentModule = (contentDir: string) => {
  return {
    async list() {
      return getContents(path.resolve(process.cwd(), contentDir));
    },
  };
};

export default buildContentModule("content");
