import sections from "./section.import";

const Section = {
  categories: (sectionHref: string) => {
    const s = sections.meta.findIndex(
      ({ absolutePath }) =>
        sectionHref ===
        (absolutePath
          .replace(/^.*?pages/, "")
          .replace(/\/_section.json$/, "") || "/")
    );

    return sections.sections[s]?.categories || [];
  },
};

export default Section;
