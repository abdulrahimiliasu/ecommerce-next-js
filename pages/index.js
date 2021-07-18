import Head from "next/head";
import ContentSection from "../components/sections/ContentSection";
import { fetchEntries } from "../data/Content";
import styled from "styled-components";
import FilterBox from "../components/forms/FilterBox";

export default function Home({ result }) {
  // console.log(result);
  return (
    <Wrapper>
      <Head>
        <title>Accessorys</title>
        <meta name="description" content="An Accessories Ecommerce Site." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentWrapper>
        <FilterBox direction={"1"} />
        <ContentSection entries={result} />
      </ContentWrapper>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const result = await fetchEntries({ content_type: "accessories" });
  // const result = res.map((item) => ({`content`:{item.fields},{}));
  return {
    props: { result },
  };
};

const Wrapper = styled.div``;
const ContentWrapper = styled.div``;
