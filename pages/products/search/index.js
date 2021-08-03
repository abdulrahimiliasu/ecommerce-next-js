import Head from "next/head";
import ContentSection from "../../../components/sections/ContentSection";
import styled from "styled-components";
import FilterBox from "../../../components/forms/FilterBox";
import React from "react";
import Sticky from "react-stickynode";
import { graphCmsClient } from "../../../model/graphcms-config";

export default function Filter({ result, queries }) {
  let { name, price_low, price_high, category, order } = queries;

  return (
    <Wrapper>
      <Head>
        <title>Search</title>
        <meta name="description" content="A simple Next JS App." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper>
        <FilterWrapper>
          <Sticky enabled={true} top={0} bottomBoundary={0}>
            <FilterBox
              values={{
                vname: name,
                vprice_low: price_low,
                vprice_high: price_high,
                vcategory: category,
              }}
            />
          </Sticky>
        </FilterWrapper>
        <Content>
          {result.products.length === 0 ? (
            <Empty>
              <h1>No Result Found</h1>
            </Empty>
          ) : (
            <ContentSection entries={result} />
          )}
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  @media only screen and (max-width: 600px) {
    grid-template-columns: auto;
  }
`;
const FilterWrapper = styled.div`
  width: 250px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const Content = styled.div``;
const Empty = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const getServerSideProps = async (context) => {
  let queries = context.query;
  let { name, price_low, price_high, category, order } = queries;
  price_low = price_low === "" ? 0 : parseInt(price_low);
  price_high = price_high === "" ? 100000 : parseInt(price_high);
  const query = `{
    products(where: {price_gt: ${price_low}, price_lt: ${price_high}, name_contains: "${name}", categories_every: {name_contains: "${category}"}}, orderBy: ${order}) {
      id
      images {
        size
        url
        width
        height
      }
      name
      price
      slug
      categories {
        name
      }
    }
  }`;

  let result = await graphCmsClient.request(query);
  return {
    props: { result, queries },
  };
};
