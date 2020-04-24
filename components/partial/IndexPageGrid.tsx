import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import Banner from "../base/Banner";
import FilterTabs from "../base/FilterTabs";
import CardGrid from "../base/CardGrid";
import Card from "../base/Card";
import { slugify } from "../../modules/helpers";

const BannerWrap = styled.div`
  margin: -20px -40px 40px -40px;
`;

const CardGridWrap = styled.div`
  margin-bottom: 20px;
`;

type CardType = {
  topic: string;
  description: string;
  icon: string;
  category: string;
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
    ...new Set(unfilteredCards.map((card) => card.category)),
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
      <BannerWrap>
        <Banner
          {...bannerProps}
          filterTabs={
            <FilterTabs
              tabs={filters}
              filter={
                router.query.filter ? router.query.filter.toString() : null
              }
              setFilter={setFilter}
            />
          }
        />
      </BannerWrap>

      <CardGridWrap>
        <CardGrid>
          {filteredCards.map((card) => (
            <Link href={card.href} key={`${card.topic}-${card.href}`}>
              <a>
                <Card {...card} badge={card.category} />
              </a>
            </Link>
          ))}
        </CardGrid>
      </CardGridWrap>
    </>
  );
};

export default IndexPageGrid;
