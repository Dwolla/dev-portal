import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
// import { styled } from '@mui/material/styles';
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";
import groupby from "lodash.groupby";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import sortBy from "lodash.sortby";
import uniqBy from "lodash.uniqby";
import {
  TopBarProps as MobileItemProps, // eslint-disable-line no-unused-vars
} from "./TopBar";
// import Button from "../base/Button";
import {
  ORANGE_PRIMARY,
  WHITE_PRIMARY,
  GREY_2,
  PURPLE_PRIMARY,
  LAYOUT_BORDER,
  GREY_HOVER,
  VERTICAL_GRADIENT,
} from "../colors";
import { POPPINS, ROBOTO } from "../typography";
import { breakUp, breakDown } from "../breakpoints";
import { slideInFromLeft, slideInFromRight } from "../keyframes";
import { ReactComponent as BackIcon } from "../../../assets/images/component-icons/side-nav/back-nav-icon.svg";
import { ReactComponent as RightIcon } from "../../../assets/images/component-icons/side-nav/caret-right-nav-icon.svg";
import { ReactComponent as NewTabIcon } from "../../../assets/images/component-icons/open-in-new-tab-icon.svg";
import caretUp from "../../../assets/images/component-icons/caret-up.svg";
import caretDown from "../../../assets/images/component-icons/caret-down.svg";
import Section from "../../modules/section";

// proptypes
interface CommonSideNavLinkProps {
  href: string;
  text: string;
}

// Conditional Props:
// External links - If isExternal is set to true, then IconSvg & isSection props cannot be set
// Internal links - If isExternal is set to false, then IconSvg & isSection props are required
type ConditionalSideNavLinkProps =
  | {
      isExternal: false;
      IconSvg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
      isSection: boolean;
    }
  | {
      isExternal: true;
      IconSvg?: never;
      isSection?: never;
    };

// Combined type of common and conditional props
export type SideNavLinkProps = CommonSideNavLinkProps &
  ConditionalSideNavLinkProps;

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
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Slide = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`;

const SlidePane = styled.div`
  align-self: stretch;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;

  &.left {
    animation: ${slideInFromLeft} 400ms ease;
  }

  &.right {
    animation: ${slideInFromRight} 400ms ease;
  }
`;

const SectionWrap = styled.div`
  @media (${breakDown("md")}) {
    padding-top: 17px;
  }
`;

const ExternalSectionWrap = styled.div`
  border-top: 1px solid ${LAYOUT_BORDER};
`;

const StickySectionWrap = styled.div`
  position: sticky;
  top: 0;
  background-color: ${WHITE_PRIMARY};

  @media (${breakDown("md")}) {
    padding-top: 17px;
  }
`;

const SectionIconWrap = styled.div`
  width: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  svg {
    * {
      fill: ${PURPLE_PRIMARY};
    }
  }
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

function SectionLink({ linkProps, isActive }: SectionLinkProps) {
  const { href, IconSvg, isSection, text, isExternal } = linkProps;

  return (
    <Link href={href} passHref>
      <a
        target={isExternal ? "_blank" : undefined}
        className={classnames({ active: isActive })}
        css={css`
          display: flex;
          height: 53px;
          padding: 0 15px;
          margin-left: 3px;
          align-items: center;
          justify-content: flex-start;
          font-family: ${ROBOTO};
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: ${PURPLE_PRIMARY};
          text-decoration: none;

          &:hover,
          &:focus {
            margin-left: unset;
            background: linear-gradient(${GREY_HOVER}, ${GREY_HOVER})
                padding-box,
              linear-gradient(${VERTICAL_GRADIENT}) border-box;
            border-left: 3px solid transparent;
            outline: none;
          }

          &.active {
            margin-left: unset;
            background: linear-gradient(${GREY_HOVER}, ${GREY_HOVER})
                padding-box,
              linear-gradient(${VERTICAL_GRADIENT}) border-box;
            border-left: 3px solid transparent;
          }
        `}
      >
        <SectionIconWrap>
          {!isExternal ? (
            <IconSvg className="section-icon" width={17} height={17} />
          ) : (
            <NewTabIcon className="section-icon" width={15} height={15} />
          )}
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
}

const CategoriesWrap = styled.ul`
  margin: 10px 0 0 34px;
  padding: 0;
  border-left: 1px solid ${GREY_2};
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
  color: ${PURPLE_PRIMARY};
  padding: 4px 20px 4px 10px;
  border-left: 1px solid transparent;
  margin-left: -1px;

  &:hover,
  &:focus {
    outline: none;
    margin-left: -1px;
    background-color: ${GREY_HOVER};
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
            background: linear-gradient(${GREY_HOVER}, ${GREY_HOVER})
                padding-box,
              linear-gradient(${VERTICAL_GRADIENT}) border-box;
            border-left: 1px solid transparent;
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

type DocGroupProps = {
  title: string;
  docs: Page[];
};

function DocGroup({ title, docs }: DocGroupProps) {
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
}

const MobileWrap = styled.div`
  margin-top: 17px;
  padding-top: 17px;
  border-top: 1px solid ${LAYOUT_BORDER};

  @media (${breakUp("lg")}) {
    display: none;
  }
`;

const MobileButtonWrap = styled.div`
  padding: 17px 20px;
`;

function MobileItems({ button }: MobileItemProps) {
  return (
    <MobileButtonWrap>
      <Button
        variant="contained"
        href={button.link.href}
        target={button.link.external ? "_blank" : undefined}
        color="secondary"
        size="medium"
        fullWidth
      >
        {button.text}
      </Button>
    </MobileButtonWrap>
  );
}

function SideNav({ sectionLinks, pages, mobileItems }: SideNavProps) {
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
      <Slide>
        <SlidePane
          id="body-scroll-lock-side-nav"
          className={
            !(activeSection && activeSection.isSection) ? "left" : "right"
          }
        >
          {!(activeSection && activeSection.isSection) ? (
            <>
              <SectionWrap>
                {/* Filter sectionLinks based on the 'isExternal' prop so that only internal links
              are passed to the SectionLink component*/}
                {sectionLinks
                  .filter((l) => !l.isExternal)
                  .map((l) => (
                    <SectionLink
                      key={l.href}
                      isActive={l.href === pathname}
                      linkProps={l}
                    />
                  ))}
              </SectionWrap>
              <ExternalSectionWrap>
                {/* Filter sectionLinks based on the 'isExternal' prop so that only external links
             are passed to the SectionLink component */}
                {sectionLinks
                  .filter((el) => el.isExternal)
                  .map((el) => (
                    <SectionLink
                      key={el.href}
                      isActive={el.href === pathname}
                      linkProps={el}
                    />
                  ))}
              </ExternalSectionWrap>
            </>
          ) : (
            <>
              <StickySectionWrap>
                <SectionLink
                  linkProps={{
                    href: "/",
                    IconSvg: BackIcon,
                    isSection: false,
                    text: "Back",
                    isExternal: false,
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
            </>
          )}

          <MobileWrap>
            <MobileItems {...mobileItems} />
          </MobileWrap>
        </SlidePane>
      </Slide>
    </Container>
  );
}

export default SideNav;
