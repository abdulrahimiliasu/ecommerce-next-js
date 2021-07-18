import Head from "next/head";
import ContentSection from "../../components/sections/ContentSection";
import { fetchEntries } from "../../data/Content";
import styled from "styled-components";
import FilterBox from "../../components/forms/FilterBox";
import React from "react";

export default function Filter({ result }) {
  return (
    <Wrapper>
      <Head>
        <title>Simple Next</title>
        <meta name="description" content="A simple Next JS App." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper>
        <React.Fragment>
          <FilterBox />
          <ContentSection entries={result} />
        </React.Fragment>
      </ContentWrapper>
    </Wrapper>
  );
}

export const getServerSideProps = async (context) => {
  let queries = context.params.filter.split("&");
  let prices = queries[1].split("_");
  const result = await fetchEntries({
    "fields.name[nin]": queries[0],
    "fields.category[in]": queries[2],
    "fields.color[nin]": queries[3],
    content_type: "accessories",
  });
  // const result = res.map((item) => ({`content`:{item.fields},{}));
  return {
    props: { result },
  };
};

const Wrapper = styled.div``;
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
`;
