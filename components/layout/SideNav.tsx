import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";
import groupby from "lodash.groupby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import sortBy from "lodash.sortby";
import uniqBy from "lodash.uniqby";
import {
  TopBarProps as MobileItemProps, // eslint-disable-line no-unused-vars
  TopBarLinkProps as MobileLinkProps, // eslint-disable-line no-unused-vars
} from "./TopBar";
import Button from "../base/Button";
import {
  ORANGE_PRIMARY,
  WHITE_PRIMARY,
  GREY_1,
  GREY_2,
  GREY_6,
} from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { breakUp, breakDown } from "../breakpoints";
import { ReactComponent as BackIcon } from "../../assets/images/component-icons/side-nav/back-nav-icon.svg";
import { ReactComponent as RightIcon } from "../../assets/images/component-icons/side-nav/caret-right-nav-icon.svg";
import caretUp from "../../assets/images/component-icons/caret-up.svg";
import caretDown from "../../assets/images/component-icons/caret-down.svg";
import openInNewTabIcon from "../../assets/images/component-icons/open-in-new-tab-icon.svg";
import Section from "../../modules/section";

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
  mobileItems: MobileItemProps;
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
  (!d.group && typeof g === "undefined") || (d.group && d.group.id === g);

const groupsFrom = (categoryDocs: Page[]): PageGroup[] =>
  uniqBy(
    categoryDocs.map((c) => c.group),
    (g) => g?.id
  );

const byGuideStep = (a, b) =>
  a.guide && b.guide ? a.guide.step - b.guide.step : 0;

const sortCategories = (sectionHref: string, categories: string[]) => {
  const categoryOrder = Section.categories(sectionHref);
  return sortBy(categories, (c) => categoryOrder.indexOf(c));
};

const sortByWeight = (items) => sortBy(items, (i) => i?.weight);

// components
const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Slide = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  width: 200%;
  transform: translate3d(0, 0, 0);
  transition: transform ease 0.4s;

  &.slidIn {
    transform: translate3d(-50%, 0, 0);
  }
`;

const SlidePane = styled.div`
  align-self: stretch;
  flex: 1 1 auto;
  width: 50%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const SectionWrap = styled.div`
  @media (${breakDown("md")}) {
    padding-top: 17px;
  }
`;

const StickySectionWrap = styled.div`
  position: sticky;
  top: 0;
  background-color: ${WHITE_PRIMARY};
  z-index: 9;

  @media (${breakDown("md")}) {
    padding-top: 17px;
  }
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

          &:hover,
          &:focus {
            background-color: ${GREY_1};
            outline: none;
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

  &:hover,
  &:focus {
    border-left: 1px solid ${GREY_6};
    background-color: ${GREY_1};
    outline: none;
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
      <GroupToggle
        tabIndex={0}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyPress={(e) =>
          e.key === "Enter" ? setIsExpanded(!isExpanded) : false
        } // eslint-disable-line react/jsx-curly-newline
      >
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

const MobileWrap = styled.div`
  margin-top: 17px;
  padding-top: 17px;
  border-top: 1px solid ${GREY_2};

  @media (${breakUp("lg")}) {
    display: none;
  }

  /* Hides MobileWrap contents when Sidebar is toggled and a Section is active. Not tabbable when not in view. */
  &.visuallyhidden {
    visibility: hidden;
  }
`;

const MobileLink = ({ href, external, text, active }: MobileLinkProps) => {
  return (
    <Link href={href} passHref>
      <a
        target={external && "_blank"}
        className={classnames({ active })}
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
          }

          .icon {
            margin-left: 15px;
            width: 13px;
            height: 13px;
          }
        `}
      >
        <span className="text">{text}</span>

        {external && (
          <img className="icon" src={openInNewTabIcon} alt="Open in new tab" />
        )}
      </a>
    </Link>
  );
};

const MobileButtonWrap = styled.div`
  padding: 17px 20px;
`;

const MobileItems = ({ links, button }: MobileItemProps) => {
  const { pathname } = useRouter();

  return (
    <>
      {links.map((l) => (
        <MobileLink
          key={l.href}
          {...l}
          active={l.active || l.href === pathname}
        />
      ))}

      <MobileButtonWrap>
        <Button {...button} size="block" variant="primary" />
      </MobileButtonWrap>
    </>
  );
};

const SideNav = ({ sectionLinks, pages, mobileItems }: SideNavProps) => {
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
          {!(activeSection && activeSection.isSection) && (
            <SectionWrap>
              {sectionLinks.map((l) => (
                <SectionLink
                  key={l.href}
                  isActive={l.href === pathname}
                  linkProps={l}
                />
              ))}
            </SectionWrap>
          )}

          <MobileWrap
            className={classnames({
              visuallyhidden: activeSection && activeSection.isSection,
            })}
          >
            <MobileItems {...mobileItems} />
          </MobileWrap>
        </SlidePane>

        <SlidePane key={activeSection?.href} id="body-scroll-lock-side-nav">
          {activeSection && activeSection.isSection && (
            <>
              <StickySectionWrap>
                <SectionLink
                  linkProps={{
                    href: "/",
                    IconSvg: BackIcon,
                    isSection: false,
                    text: "Back",
                  }}
                  isActive={false}
                />

                <SectionLink
                  linkProps={{ ...activeSection, isSection: false }}
                  isActive
                />
              </StickySectionWrap>

              <CategoriesWrap>
                {sortCategories(activeSection.href, keys(categories)).map(
                  (c) => {
                    const categoryDocs = categories[c];
                    const groups = groupsFrom(categoryDocs);

                    return (
                      <Category key={c}>
                        {c !== "undefined" && (
                          <CategoryHeading>{c}</CategoryHeading>
                        )}

                        {sortByWeight(groups).map((g?: PageGroup) => {
                          const docs = categoryDocs.filter(byDocGroup(g?.id));
                          const ungroupedGroup = typeof g === "undefined";

                          return (
                            <div key={g?.id}>
                              {ungroupedGroup ? (
                                sortByWeight(docs).map((d: Page) => (
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
                                <DocGroup title={g?.title} docs={docs} />
                              )}
                            </div>
                          );
                        })}
                      </Category>
                    );
                  }
                )}
              </CategoriesWrap>

              <MobileWrap>
                <MobileItems {...mobileItems} />
              </MobileWrap>
            </>
          )}
        </SlidePane>
      </Slide>
    </Container>
  );
};

export default SideNav;
