/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";
import groupby from "lodash.groupby";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import sortBy from "lodash.sortby";
import uniqBy from "lodash.uniqby";
import { TopBarProps as MobileItemProps } from "./TopBar";
import {
  GREY_054,
  LAYOUT_BORDER,
  PURPLE_004,
  PURPLE_008,
  PURPLE_012,
  PURPLE_054,
  PURPLE_075,
  PURPLE_087,
  PURPLE_100,
  WHITE_PRIMARY,
} from "../colors";
import { ROBOTO } from "../typography";
import { breakDown, breakUp } from "../breakpoints";
import { slideInFromLeft, slideInFromRight } from "../keyframes";
import { ReactComponent as BackIcon } from "../../../assets/images/component-icons/side-nav/back-nav-icon.svg";
import { ReactComponent as RightIcon } from "../../../assets/images/component-icons/side-nav/caret-right-nav-icon.svg";
import { ReactComponent as NewTabIcon } from "../../../assets/images/component-icons/open-in-new-tab-icon.svg";
import { ReactComponent as CaretUpIcon } from "../../../assets/images/component-icons/caret-up.svg";
import { ReactComponent as CaretDownIcon } from "../../../assets/images/component-icons/caret-down.svg";

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
      isSection?: false;
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
const getSubCategory = (d) => (d.group ? d.group.subCategory : d.subCategory);

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
  return sortBy(categories, (category) => {
    const categoryObject = categoryOrder.find((item) => item.name === category);
    return categoryObject ? categoryObject.priority : Infinity;
  });
};

const sortSubCategories = (
  sectionHref: string,
  category: string,
  subCategories: string[]
): string[] | undefined => {
  const categoryOrder = Section.categories(sectionHref);
  const categoryObject = categoryOrder.find((item) => item.name === category);

  if (categoryObject && categoryObject.subCategories.length > 0) {
    const sortedSubCategories = categoryObject.subCategories.filter(
      (subCategory) => subCategories.includes(subCategory)
    );
    return sortedSubCategories.length > 0 ? sortedSubCategories : undefined;
  }

  return undefined;
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
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 34px;

  svg {
    * {
      fill: ${GREY_054};
    }
  }
`;

const SectionCaretWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;

  svg {
    * {
      fill: ${PURPLE_054};
    }
  }

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
          height: 48px;
          padding: 8px 16px;
          margin-left: 3px;
          align-items: center;
          justify-content: flex-start;
          font-family: ${ROBOTO};
          font-weight: 400;
          font-size: 16px;
          letter-spacing: 0.15px;
          line-height: 24px;
          color: ${PURPLE_087};
          text-decoration: none;

          &:hover,
          &:focus {
            background: ${PURPLE_004};
            outline: none;
          }

          &.active {
            margin-left: unset;
            background: ${PURPLE_008};
            border-left: 3px solid ${PURPLE_100};
          }
        `}
      >
        <SectionIconWrap>
          {!isExternal ? (
            <IconSvg className="section-icon" width={22} height={22} />
          ) : (
            <NewTabIcon className="section-icon" width={15} height={15} />
          )}
        </SectionIconWrap>

        {text}

        {isSection && (
          <SectionCaretWrap>
            <RightIcon width={18} height={18} />
          </SectionCaretWrap>
        )}
      </a>
    </Link>
  );
}

const CategoriesWrap = styled.ul`
  margin: 10px 24px 0 16px;
  padding: 0;
`;

const Category = styled.li`
  list-style-type: none;
`;

const CategoryHeading = styled.div`
  text-transform: uppercase;
  color: ${PURPLE_075};
  margin: 10px 10px 10px 0;
  font-family: ${ROBOTO};
  font-size: 12px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 1px;
  text-align: left;
`;

const CategoryContent = styled.div`
  margin-left: 8px;
`;

const SubCategoryHeading = styled.div`
  width: 288px;
  margin: 10px 10px 10px -8px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: 0.17px;
  color: ${PURPLE_087};
`;

const groupToggleDocLinkStyles = css`
  font-size: 14px;
  line-height: 140%;
  font-family: ${ROBOTO};
  color: ${PURPLE_075};
  padding: 10px 20px 10px 24px;
  margin-left: -2px;
  border-left: 1.5px solid ${PURPLE_012};

  &:hover,
  &:focus {
    outline: none;
    margin-left: -2px;
    background-color: ${PURPLE_004};
  }
  }
`;

const GroupToggle = styled.div`
  ${groupToggleDocLinkStyles};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &.expanded {
    color: ${PURPLE_087};
    font-weight: 500;
  }
`;

const GroupCaretWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  margin-left: 20px;

  svg {
    * {
      fill: ${PURPLE_054};
    }
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
          ${groupToggleDocLinkStyles};
          display: block;
          text-decoration: none;
          padding: 10px 10px 10px 24px;

          &.active {
            background: ${PURPLE_008};
            border-left: 1.5px solid ${PURPLE_100};
            color: ${PURPLE_087};
          }

          &.grouped {
            margin-left: 24px;
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
        className={classnames({ expanded: isExpanded })}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyPress={(e) =>
          e.key === "Enter" ? setIsExpanded(!isExpanded) : false
        } // eslint-disable-line react/jsx-curly-newline
      >
        {title}

        {isExpanded ? (
          <GroupCaretWrap>
            <CaretUpIcon width={20} height={20} />
          </GroupCaretWrap>
        ) : (
          <GroupCaretWrap>
            <CaretDownIcon width={20} height={20} />
          </GroupCaretWrap>
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

  const subCategories = activeSection
    ? groupby(getPagesInSection(pages, activeSection), getSubCategory)
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
                  (c, index) => {
                    const categoryDocs = categories[c];
                    const groups = groupsFrom(categoryDocs);

                    return (
                      <Category key={index}>
                        {c !== "undefined" && (
                          <CategoryHeading key={c}>{c}</CategoryHeading>
                        )}

                        <CategoryContent key={c + index}>
                          {sortSubCategories(
                            activeSection.href,
                            c,
                            keys(subCategories)
                          ) === undefined
                            ? sortByWeight(groups).map((g?: PageGroup) => {
                                const docs = categoryDocs.filter(
                                  byDocGroup(g?.id)
                                );
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
                                      <DocGroup
                                        key={g?.title}
                                        title={g?.title}
                                        docs={docs}
                                      />
                                    )}
                                  </div>
                                );
                              })
                            : sortSubCategories(
                                activeSection.href,
                                c,
                                keys(subCategories)
                              )?.map((sc, scIndex) => {
                                const subCategoryDocs = subCategories[sc];
                                const sGroups = groupsFrom(subCategoryDocs);

                                return (
                                  <React.Fragment key={scIndex}>
                                    {sc !== "undefined" && (
                                      <React.Fragment key={sc + scIndex}>
                                        <SubCategoryHeading key={sc}>
                                          {sc}
                                        </SubCategoryHeading>
                                        {sortByWeight(sGroups).map(
                                          (g?: PageGroup) => {
                                            const docs = subCategoryDocs.filter(
                                              byDocGroup(g?.id)
                                            );
                                            const ungroupedGroup =
                                              typeof g === "undefined";

                                            return (
                                              <div key={g?.id}>
                                                {ungroupedGroup ? (
                                                  sortByWeight(docs).map(
                                                    (d: Page) => (
                                                      <DocLink
                                                        key={d.id}
                                                        grouped={false}
                                                        href={d.id}
                                                        active={
                                                          d.id === pathname
                                                        }
                                                      >
                                                        {d.title}
                                                      </DocLink>
                                                    )
                                                  )
                                                ) : (
                                                  <DocGroup
                                                    title={g?.title}
                                                    docs={docs}
                                                  />
                                                )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </React.Fragment>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                        </CategoryContent>
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
