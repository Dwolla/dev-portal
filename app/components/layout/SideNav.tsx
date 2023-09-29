/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { Button, FormControl } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";
import groupby from "lodash.groupby";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import sortBy from "lodash.sortby";
import uniqBy from "lodash.uniqby";
import { TopBarProps as MobileItemProps } from "./TopBar";
import SelectMui, { SelectMuiOption } from "../base/SelectMui";
import {
  GREY_054,
  GREY_2,
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
import { Z_SIDENAV_STICKY_SECTION_WRAP } from "../zIndexes";
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
      isSection: boolean; // If true, then the link is a section link which slides out a subnav
      productSelector?: boolean; // If true, then the ProductSelector dropdown will be shown
      // in the subnav
    }
  | {
      isExternal: true;
      IconSvg?: never;
      isSection?: false;
      productSelector?: false;
    };

// Combined type of common and conditional props
// export type SideNavLinkProps = CommonSideNavLinkProps &
//   ConditionalSideNavLinkProps;
export type SideNavLinkProps = CommonSideNavLinkProps &
  ConditionalSideNavLinkProps & {
    stickyReferenceLinks?: SideNavLinkProps[];
  };

interface SideNavProps {
  sectionLinks: SideNavLinkProps[];
  pages: Page[];
  mobileItems: MobileItemProps;
  productSelectorOptions: Array<SelectMuiOption>;
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
) => {
  // Sort sectionLinks in descending order of the href length. This way, the function will
  // first check for the exact match and then check for subpath matches.
  const sortedSectionLinks = [...sectionLinks].sort(
    (a, b) => b.href.length - a.href.length
  );
  return sortedSectionLinks.find(
    (section) =>
      pathname === section.href || pathname.startsWith(`${section.href}/`)
  );
};

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
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
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
  z-index: ${Z_SIDENAV_STICKY_SECTION_WRAP}; // This ensures that this div is displayed above the
  // ProductSelector drop-down which uses MUI's Select component which also uses a z-index. In other
  // words, this prevents the Product Selector from overlapping with this div when scrolling.

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
  isStickyReference?: boolean; // If true, the link will be styled as a sticky reference link
  // at the bottom of the sideNav (used for the 'docs' type sections)
  newTab?: boolean; // If true, the link will open in a new tab
};

function SectionLink({
  linkProps,
  isActive,
  isStickyReference,
  newTab,
}: SectionLinkProps) {
  const { href, IconSvg, isSection, text, isExternal } = linkProps;

  return (
    <Link href={href} passHref>
      <a
        target={isExternal || newTab ? "_blank" : undefined}
        className={classnames({
          active: isActive,
          stickyReference: isStickyReference,
        })}
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

          &.stickyReference {
            border-top: 1px solid ${GREY_2};
            background: ${WHITE_PRIMARY};
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
  margin: 10px 24px 20px 16px;
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
  font-size: 14px;
  font-weight: 500;
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
  font-family: ${ROBOTO};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: 0.17px;
  color: ${PURPLE_075};
`;

const StickyReferencesWrap = styled.div`
  position: sticky;
  bottom: 0;
  margin-top: auto;
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

function SideNav({
  sectionLinks,
  pages,
  mobileItems,
  productSelectorOptions,
}: SideNavProps) {
  const { pathname } = useRouter();
  const [activeSection, setActiveSection] = useState(
    findSelectedSection(sectionLinks, pathname)
  );
  const [selectedProduct, setSelectedProduct] = useState(
    productSelectorOptions[0]
  ); // Initialize with the default product

  // Filter pages based on the selected product if productSelector exists
  const filteredPages =
    activeSection && activeSection.productSelector
      ? pages.filter((page) => page.product === selectedProduct.value)
      : pages;

  useEffect(() => {
    setActiveSection(findSelectedSection(sectionLinks, pathname));
  }, [pathname]);

  const categories = activeSection
    ? groupby(getPagesInSection(filteredPages, activeSection), getCategory)
    : {};

  const subCategories = activeSection
    ? groupby(getPagesInSection(filteredPages, activeSection), getSubCategory)
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
                    href: "/docs",
                    IconSvg: BackIcon,
                    isSection: false,
                    text: "All Docs",
                    isExternal: false,
                  }}
                  isActive={false}
                />

                <SectionLink
                  linkProps={{ ...activeSection, isSection: false }}
                  isActive
                />
              </StickySectionWrap>

              {/*Display Product Selector drop-down if it is set to 'true' for the active section*/}
              {activeSection.productSelector && (
                <FormControl sx={{ m: 2, minWidth: 200 }} size="small">
                  <SelectMui
                    label="Select Product"
                    onChange={(value) => setSelectedProduct(value)}
                    options={productSelectorOptions}
                    value={selectedProduct}
                  />
                </FormControl>
              )}

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

              <StickyReferencesWrap>
                {/* Only display links
                when activeSection has a stickyReferenceLinks object */}
                {activeSection.stickyReferenceLinks &&
                  activeSection.stickyReferenceLinks.map((l) => (
                    <SectionLink
                      key={l.href}
                      isActive={l.href === pathname}
                      linkProps={l}
                      isStickyReference
                      newTab
                    />
                  ))}
              </StickyReferencesWrap>
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
