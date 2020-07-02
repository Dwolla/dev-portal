import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Banner from "../base/Banner";
import FilterTabs from "../base/FilterTabs";
import CardGrid from "../base/CardGrid";
import Card from "../base/Card";
import { slugify } from "../../modules/helpers";
import { contentIcons } from "../../modules/images.import";
import { breakDown } from "../breakpoints";

const BannerWrap = styled.div`
  margin: -20px -40px 40px -40px;

  @media (${breakDown("sm")}) {
    margin: -20px -20px 20px -20px;
  }
`;

const CardGridWrap = styled.div`
  margin-bottom: 20px;
`;

type CardType = {
  topic: string;
  description: string;
  icon: string;
  category?: string;
  href: string;
};
type Props = {
  unfilteredCards: Array<CardType>;
  bannerProps: {
    icon: string;
    topic: string;
    description: string;
  };
};

const IndexPageGrid = ({ unfilteredCards, bannerProps }: Props) => {
  const router = useRouter();
  const filters: any = [
    { value: null, label: "All" },
    ...new Set(
      unfilteredCards
        .filter((card) => !!card.category)
        .map((card) => card.category)
    ),
  ];
  const filteredCards = unfilteredCards.filter(
    (card) =>
      !router.query.filter || router.query.filter === slugify(card.category)
  );

  const setFilter = (selectedFilter) => {
    if (selectedFilter.value) {
      router.push({
        pathname: router.pathname,
        query: { filter: selectedFilter.value },
      });
    } else {
      router.push(router.pathname);
    }
  };

  return (
    <>
      <BannerWrap className="mdx-style-override">
        <Banner
          {...bannerProps}
          filterTabs={
            filters.length > 1 ? (
              <FilterTabs
                tabs={filters}
                filter={
                  router.query.filter ? router.query.filter.toString() : null
                }
                setFilter={setFilter}
              />
            ) : null
          }
        />
      </BannerWrap>

      <CardGridWrap>
        <CardGrid>
          {filteredCards.map((card) => (
            <Card
              {...card}
              badge={card.category}
              icon={contentIcons[card.icon].default}
              link={{ href: card.href }}
              key={`${card.topic}-${card.href}`}
            />
          ))}
        </CardGrid>
      </CardGridWrap>
    </>
  );
};

export default IndexPageGrid;
