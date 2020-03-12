import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import classnames from "classnames";
import groupby from "lodash.groupby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Page } from "../../modules/pages"; // eslint-disable-line no-unused-vars
import { ORANGE_PRIMARY, GREY_6, GREY_2 } from "../colors";

// proptypes

export interface SideNavLinkProps {
  href: string;
  iconSrc: string;
  isSection: boolean;
  text: string;
}

interface SideNavProps {
  links: SideNavLinkProps[];
  pages: Page[];
}

// reducer

interface State {
  toggledGroups: {};
  mostRecentSectionHref: string;
}

const getInitialState = (pathname: string): State => {
  const pathnameGroup = pathname
    .split("/")
    .slice(0, -1)
    .join("/");
  return {
    toggledGroups: { [pathnameGroup]: true },
    mostRecentSectionHref: null,
  };
};

const toggleGroup = (groupId: string) => ({
  type: "groupToggled",
  payload: { groupId },
});

const setMostRecentSectionHref = (href: string) => ({
  type: "mostRecentSectionHrefSet",
  payload: { href },
});

type Action =
  | ReturnType<typeof toggleGroup>
  | ReturnType<typeof setMostRecentSectionHref>;

// eslint-disable-next-line consistent-return
const reducer = (state: State, action: Action): State => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "groupToggled":
      return {
        ...state,
        toggledGroups: {
          ...state.toggledGroups,
          [(action as ReturnType<typeof toggleGroup>).payload.groupId]: !state
            .toggledGroups[
            (action as ReturnType<typeof toggleGroup>).payload.groupId
          ],
        },
      };
    case "mostRecentSectionHrefSet":
      return {
        ...state,
        mostRecentSectionHref: (action as ReturnType<
          typeof setMostRecentSectionHref
        >).payload.href,
      };
  }
};

// helpers

const bySection = (section: string) => (d) =>
  section && d.id.indexOf(`${section}/`) === 0;

const getCategory = (d) => (d.group ? d.group.category : d.category);

const isSelectedSection = (pathname: string) => (l: SideNavLinkProps) =>
  l.isSection && (pathname === l.href || pathname.startsWith(`${l.href}/`));

const hrefIs = (lastSelectedSectionHref: string) => (l: SideNavLinkProps) =>
  l.href === lastSelectedSectionHref;

const keys = (o: Record<string, {}>): string[] => {
  const sorted = Object.keys(o).sort();
  return sorted.indexOf("null") >= 0 || sorted.indexOf(null) >= 0
    ? [null, ...sorted.filter((s) => s !== "null" && s !== null)]
    : sorted;
};

const byDocGroup = (g: string) => (d: Page) =>
  (!d.group && g === null) || (d.group && d.group.id === g);

const groupTitle = (docs, group) =>
  docs.find((d) => d.group && d.group.id === group).group.title;

const groupsFrom = (categoryDocs: Page[]) => [
  ...(new Set(categoryDocs.map((d) => (d.group ? d.group.id : null))) as Set<
    string
  >),
];

// components

const Container = styled.div`
  height: 100%;
`;

const Slide = styled.div`
  display: flex;
  width: 200%;
  height: 100%;
  transform: translate3d(0, 0, 0);
  transition: transform ease 0.4s;

  &.selectedSection {
    transform: translate3d(-50%, 0, 0);
  }
`;

const SlidePane = styled.div`
  flex: 1 1 auto;
  height: 100%;
  width: 50%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const StickyTop = styled.div`
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.98);
  z-index: 9;
`;

const CategoriesNav = styled.ul`
  margin: 10px 10px 0 24px;
  padding: 0;
  border-left: 1px solid ${GREY_2};
  z-index: 8;
`;

const CategoryItem = styled.li`
  list-style-type: none;
`;

const CategoryHeading = styled.div`
  text-transform: uppercase;
  font-family: Poppins;
  font-weight: 600;
  color: #354153;
  font-size: 11px;
  margin: 20px 10px 10px;
`;

const groupToggleDocLinkStyles = css`
  margin: 6px 0;
  font-size: 14px;
  line-height: 140%;
  font-family: Roboto;
  color: #52627b;
  padding: 4px 0 4px 10px;

  &:hover {
    color: ${ORANGE_PRIMARY};
  }
`;

const GroupToggle = styled.div`
  ${groupToggleDocLinkStyles}
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  > .caret {
    margin-right: 10px;
  }
`;

interface DocLinkProps {
  active: boolean;
  children: string;
  grouped: boolean;
  href: string;
}

function DocLink(props: DocLinkProps) {
  return (
    <Link href={props.href} passHref>
      <a
        css={css`
          ${groupToggleDocLinkStyles}
          display: block;
          text-decoration: none;
          border-left: 1px solid transparent;
          transform: translateX(-1px);

          &:hover {
            text-decoration: underline;
            border-left: 1px solid ${ORANGE_PRIMARY};
          }

          &.active {
            font-weight: 500;
            border-left: 1px solid ${GREY_6};
            color: ${GREY_6};
            text-decoration: none;
          }

          &.grouped {
            padding-left: 30px;
          }
        `}
        className={classnames({ active: props.active, grouped: props.grouped })}
      >
        {props.children}
      </a>
    </Link>
  );
}

const SectionLinksWrapper = styled.div`
  padding: 0 20px;
`;

function SectionLink(props: SideNavLinkProps) {
  return (
    <Link href={props.href} passHref>
      <a
        css={css`
          display: flex;
          height: 30px;
          align-items: center;
          justify-content: flex-start;
          font-family: Poppins;
          font-size: 14px;
          color: ${GREY_6};
          text-decoration: none;

          > div {
            width: 17px;
            text-align: center;
            margin-right: 7px;
          }

          &:hover {
            color: ${ORANGE_PRIMARY};
            text-decoration: underline;
          }
        `}
      >
        <div>
          <img src={props.iconSrc} alt={props.text} />
        </div>

        {props.text}
      </a>
    </Link>
  );
}

export default function SideNav(props: SideNavProps) {
  const { pathname } = useRouter();

  const [state, dispatch] = useReducer(reducer, getInitialState(pathname));

  const selectedSection = props.links.find(isSelectedSection(pathname));

  const selectedSectionHref = selectedSection?.href;
  useEffect(() => {
    if (selectedSectionHref) {
      dispatch(setMostRecentSectionHref(selectedSectionHref));
    }
  }, [selectedSectionHref]);

  const mostRecentSection = props.links.find(
    hrefIs(state.mostRecentSectionHref)
  );

  const displayedSection = selectedSection || mostRecentSection;

  const sectionDocs = props.pages.filter(
    bySection(state.mostRecentSectionHref)
  );

  const groupedByCategory = groupby(sectionDocs, getCategory);

  return (
    <Container>
      <Slide className={classnames({ selectedSection })}>
        <SlidePane>
          <SectionLinksWrapper>
            {props.links.map((l) => (
              <SectionLink key={l.href} {...l} />
            ))}
          </SectionLinksWrapper>
        </SlidePane>

        <SlidePane key={displayedSection?.href}>
          <StickyTop>
            <SectionLinksWrapper>
              <SectionLink
                href="/"
                iconSrc="/images/home-icon.svg"
                isSection={false}
                text="Back Home"
              />

              {displayedSection && <SectionLink {...displayedSection} />}
            </SectionLinksWrapper>
          </StickyTop>

          <CategoriesNav>
            {keys(groupedByCategory).map((c) => {
              const categoryDocs = groupedByCategory[c];

              const groups = groupsFrom(categoryDocs);

              return (
                <CategoryItem key={c}>
                  {c && <CategoryHeading>{c}</CategoryHeading>}

                  {groups.map((g) => {
                    const docs = categoryDocs.filter(byDocGroup(g));

                    const ungroupedGroup = g === null;

                    const groupToggled = state.toggledGroups[g];

                    return (
                      <div key={g}>
                        {ungroupedGroup ? (
                          docs.map((d) => (
                            <DocLink
                              key={d.id}
                              grouped={false}
                              href={d.id}
                              active={d.id === pathname}
                            >
                              {d.title}
                            </DocLink>
                          ))
                        ) : (
                          <>
                            <GroupToggle
                              onClick={() => dispatch(toggleGroup(g))}
                            >
                              {groupTitle(categoryDocs, g)}
                            </GroupToggle>

                            {groupToggled &&
                              docs.map((d) => (
                                <DocLink
                                  key={d.id}
                                  grouped
                                  href={d.id}
                                  active={d.id === pathname}
                                >
                                  {d.title}
                                </DocLink>
                              ))}
                          </>
                        )}
                      </div>
                    );
                  })}
                </CategoryItem>
              );
            })}
          </CategoriesNav>
        </SlidePane>
      </Slide>
    </Container>
  );
}
