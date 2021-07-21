import Head from "next/head";
import ContentSection from "../../../components/sections/ContentSection";
import { fetchEntries } from "../../../data/Content";
import styled from "styled-components";
import FilterBox from "../../../components/forms/FilterBox";
import React from "react";

export default function Filter({ result, field_values, is_empty }) {
  return (
    <Wrapper>
      <Head>
        <title>Search</title>
        <meta name="description" content="A simple Next JS App." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper>
        <FilterWrapper>
          <FilterBox
            values={{
              vname: field_values.name,
              vprice_low: field_values.price_low,
              vprice_high: field_values.price_high,
              vcategory: field_values.category,
              vcolor: field_values.color,
            }}
          />
        </FilterWrapper>
        <Content>
          {is_empty ? (
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
const ContentWrapper = styled.div``;

const FilterWrapper = styled.div`
  position: fixed;
  width: 250px;
`;

const Content = styled.div`
  margin-left: 250px;
  position: relative;
  overflow: auto;
  z-index: 1;
`;

const Empty = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

function filterQueries(queries, content_type) {
  let filter = {};
  queries.map((item) => {
    const cat = item.split("=")[0];
    const val = item.split("=")[1];
    if (val !== "" && val !== "Any") {
      if (cat !== "price_low" && cat !== "price_high") {
        filter[`fields.${cat}[in]`] = val;
      } else if (cat == "price_low") {
        filter[`fields.price[gt]`] = val;
      } else if (cat == "price_high") {
        filter[`fields.price[lt]`] = val;
      }
    }
  });
  filter["content_type"] = content_type;
  return filter;
}

function getValuesFrom(queries) {
  let obj = {};
  queries.map((item) => {
    obj[item.split("=")[0]] = item.split("=")[1];
  });
  return obj;
}

export const getServerSideProps = async (context) => {
  let queries = context.params.filter.split("&");
  let field_values = getValuesFrom(queries);
  let filter = filterQueries(queries, "accessories");
  const result = await fetchEntries(filter);
  let is_empty = result.length == 0 ? true : false;
  return {
    props: { result, field_values, is_empty },
  };
};
