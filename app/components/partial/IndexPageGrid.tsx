import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Banner from "../base/Banner";
import FilterTabs from "../base/FilterTabs";
import CardGrid from "../base/CardGrid";
import Card, { LanguageProp } from "../base/Card";
import { slugify } from "../../modules/helpers";
import { contentIcons } from "../../modules/images.import";

const CardGridWrap = styled.div`
  margin-bottom: 20px;
`;

export type CardType = {
  topic: string;
  description: any;
  icon?: string;
  category?: string;
  href: string;
  external?: boolean;
  languages?: Array<LanguageProp>;
};
type Props = {
  unfilteredCards: Array<CardType>;
  bannerProps: {
    icon: string;
    topic: string;
    description: string;
  };
};

function IndexPageGrid({ unfilteredCards, bannerProps }: Props) {
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

      <CardGridWrap>
        <CardGrid>
          {filteredCards.map((card) => (
            <Card
              {...card}
              badge={card.category}
              icon={card.icon ? contentIcons[card.icon].default : null}
              links={[
                {
                  href: card.href,
                  text: "GitHub Repository",
                  external: card.external,
                },
              ]}
              key={`${card.topic}-${card.href}`}
              languages={card.languages}
            />
          ))}
        </CardGrid>
      </CardGridWrap>
    </>
  );
}

export default IndexPageGrid;
