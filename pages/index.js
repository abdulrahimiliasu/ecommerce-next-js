import Head from "next/head";
import ContentSection from "../components/sections/ContentSection";
import { fetchEntries } from "../model/contentful/Contentful";
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <ContentWrapper>
        <FilterBox
          direction={"1"}
          values={{
            vname: "",
            vprice_low: "",
            vprice_high: "",
            vcategory: "",
            vcolor: "",
          }}
        />
        <ContentSection entries={result} />
      </ContentWrapper>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const result = await fetchEntries({ content_type: "accessories" });
  return {
    props: { result },
  };
};

const Wrapper = styled.div``;
const ContentWrapper = styled.div``;
