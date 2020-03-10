import pages from "./pages.import";

const RESOURCE_PATH_TO_ID_REGEX = /(\/?index)?\.mdx$/;

const resourcePathToId = resourcePath =>
  `/${resourcePath.replace(RESOURCE_PATH_TO_ID_REGEX, "")}`;

const ALL_PAGES: Page[] = pages
  .map(p => {
    const { __resourcePath: resourcePath, ...rest } = p;
    return {
      id: resourcePathToId(resourcePath),
      ...rest,
    };
  })
  .reduce(
    (pagesWithGroups: Page[], thisPage: Page, _: number, pages: Page[]) => {
      if (thisPage.group)
        return [
          ...pagesWithGroups,
          { ...thisPage, group: { id: thisPage.id, ...thisPage.group } },
        ];

      const thisPageGroupId = thisPage.id
        .split("/")
        .slice(0, -1)
        .join("/");

      const groupPage = pages.find(p => p.id === thisPageGroupId);

      return [
        ...pagesWithGroups,
        groupPage?.group
          ? { ...thisPage, group: { id: groupPage.id, ...groupPage.group } }
          : thisPage,
      ];
    },
    []
  );

type PageGroup = {
  id: string;
};

export type Page = {
  id: string;
  group?: PageGroup;
};

const Pages = {
  all(): Page[] {
    return ALL_PAGES;
  },

  under(path: string): Page[] {
    const normalizedPath = `/${path.replace(/^\//, "").replace(/\/$/, "")}/`;
    return ALL_PAGES.filter(p => p.id.startsWith(normalizedPath));
  },
};

export default Pages;
