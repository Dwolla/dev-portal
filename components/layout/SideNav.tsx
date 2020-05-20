import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";
import groupby from "lodash.groupby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import {
  ORANGE_PRIMARY,
  WHITE_PRIMARY,
  GREY_1,
  GREY_2,
  GREY_6,
} from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { breakDown } from "../breakpoints";
import { ReactComponent as BackIcon } from "../../assets/images/component-icons/side-nav/back-nav-icon.svg";
import { ReactComponent as RightIcon } from "../../assets/images/component-icons/side-nav/caret-right-nav-icon.svg";
import caretUp from "../../assets/images/component-icons/caret-up.svg";
import caretDown from "../../assets/images/component-icons/caret-down.svg";

// proptypes
export interface SideNavLinkProps {
  href: string;
  IconSvg: React.SFC<React.SVGProps<SVGSVGElement>>;
  isSection: boolean;
  text: string;
}

interface SideNavProps {
  sectionLinks: SideNavLinkProps[];
  pages: Page[];
}

// helpers
const bySection = (section: string) => (d) =>
  section && d.id.indexOf(`${section}/`) === 0;

const getPagesInSection = (pages: Page[], section: SideNavLinkProps) =>
  pages.filter(bySection(section.href));

const getCategory = (d) => (d.group ? d.group.category : d.category);

const findSelectedSection = (
  sectionLinks: SideNavLinkProps[],
  pathname: string
) =>
  sectionLinks.find(
    (section) =>
      pathname === section.href || pathname.startsWith(`${section.href}/`)
  );

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

const byGuideStep = (a, b) =>
  a.guide && b.guide ? a.guide.step - b.guide.step : 0;

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

  &.slidIn {
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

const SectionWrap = styled.div`
  position: sticky;
  top: 0;
  background-color: ${WHITE_PRIMARY};
  z-index: 9;
`;

const SectionIconWrap = styled.div`
  width: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 7px;
`;

const SectionCaretWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;

  @media (${breakDown("md")}) {
    display: none;
  }
`;

type SectionLinkProps = {
  linkProps: SideNavLinkProps;
  isActive: boolean;
};

const SectionLink = ({ linkProps, isActive }: SectionLinkProps) => {
  const { href, IconSvg, isSection, text } = linkProps;

  return (
    <Link href={href} passHref>
      <a
        className={classnames({ active: isActive })}
        css={css`
          display: flex;
          height: 30px;
          padding: 0 20px;
          align-items: center;
          justify-content: flex-start;
          font-family: ${POPPINS};
          font-size: 14px;
          color: ${GREY_6};
          text-decoration: none;

          &:hover {
            background-color: ${GREY_1};
          }

          &.active {
            font-weight: 500;
            color: ${ORANGE_PRIMARY};

            .section-icon {
              path {
                fill: ${ORANGE_PRIMARY};
              }
            }
          }
        `}
      >
        <SectionIconWrap>
          <IconSvg className="section-icon" width={17} height={17} />
        </SectionIconWrap>

        {text}

        {isSection && (
          <SectionCaretWrap>
            <RightIcon width={5} height={10} />
          </SectionCaretWrap>
        )}
      </a>
    </Link>
  );
};

const CategoriesWrap = styled.ul`
  margin: 10px 0 0 34px;
  padding: 0;
  border-left: 1px solid ${GREY_2};
  z-index: 8;
`;

const Category = styled.li`
  list-style-type: none;
`;

const CategoryHeading = styled.div`
  text-transform: uppercase;
  font-family: ${POPPINS};
  font-weight: 600;
  color: #354153;
  font-size: 11px;
  margin: 20px 10px 10px;
`;

const groupToggleDocLinkStyles = css`
  margin: 6px 0;
  font-size: 14px;
  line-height: 140%;
  font-family: ${ROBOTO};
  color: #52627b;
  padding: 4px 20px 4px 10px;
  border-left: 1px solid transparent;
  margin-left: -1px;

  &:hover {
    border-left: 1px solid ${GREY_6};
    background-color: ${GREY_1};
  }
`;

const GroupToggle = styled.div`
  ${groupToggleDocLinkStyles}
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const GroupCaret = styled.img`
  max-width: 7px;
`;

type DocGroupProps = {
  title: string;
  docs: Page[];
};

const DocGroup = ({ title, docs }: DocGroupProps) => {
  const { pathname } = useRouter();
  const [isExpanded, setIsExpanded] = useState(
    !!docs.find((d) => d.id === pathname)
  );
  useEffect(() => {
    setIsExpanded(docs.find((d) => d.id === pathname) ? true : isExpanded);
  }, [pathname]);

  return (
    <>
      <GroupToggle onClick={() => setIsExpanded(!isExpanded)}>
        {title}

        {isExpanded ? (
          <GroupCaret src={caretUp} alt="" />
        ) : (
          <GroupCaret src={caretDown} alt="" />
        )}
      </GroupToggle>

      {isExpanded &&
        docs.sort(byGuideStep).map((d) => (
          <DocLink key={d.id} grouped href={d.id} active={d.id === pathname}>
            {d.title}
          </DocLink>
        ))}
    </>
  );
};

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

          &.active {
            font-weight: 500;
            border-left: 1px solid ${ORANGE_PRIMARY};
            color: ${ORANGE_PRIMARY};
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

const SideNav = ({ sectionLinks, pages }: SideNavProps) => {
  const { pathname } = useRouter();
  const [activeSection, setActiveSection] = useState(
    findSelectedSection(sectionLinks, pathname)
  );
  useEffect(() => {
    setActiveSection(findSelectedSection(sectionLinks, pathname));
  }, [pathname]);

  const categories = activeSection
    ? groupby(getPagesInSection(pages, activeSection), getCategory)
    : {};

  return (
    <Container>
      <Slide
        className={classnames({
          slidIn: activeSection && activeSection.isSection,
        })}
      >
        <SlidePane>
          <SectionWrap>
            {sectionLinks.map((l) => (
              <SectionLink
                key={l.href}
                isActive={l.href === pathname}
                linkProps={l}
              />
            ))}
          </SectionWrap>
        </SlidePane>

        <SlidePane key={activeSection?.href}>
          <SectionWrap>
            <SectionLink
              linkProps={{
                href: "/",
                IconSvg: BackIcon,
                isSection: false,
                text: "Back",
              }}
              isActive={false}
            />

            {activeSection && (
              <SectionLink
                linkProps={{ ...activeSection, isSection: false }}
                isActive
              />
            )}
          </SectionWrap>

          <CategoriesWrap>
            {keys(categories).map((c) => {
              const categoryDocs = categories[c];
              const groups = groupsFrom(categoryDocs);

              return (
                <Category key={c}>
                  {c && <CategoryHeading>{c}</CategoryHeading>}

                  {groups.map((g) => {
                    const docs = categoryDocs.filter(byDocGroup(g));
                    const ungroupedGroup = g === null;

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
                          <DocGroup
                            title={groupTitle(categoryDocs, g)}
                            docs={docs}
                          />
                        )}
                      </div>
                    );
                  })}
                </Category>
              );
            })}
          </CategoriesWrap>
        </SlidePane>
      </Slide>
    </Container>
  );
};

export default SideNav;
