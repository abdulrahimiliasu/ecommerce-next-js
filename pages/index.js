import Head from "next/head";
import ContentSection from "../components/sections/ContentSection";
import styled from "styled-components";
import FilterBox from "../components/forms/FilterBox";
import { graphCmsClient } from "../model/graphcms/GraphCMS";

export default function Home({ result }) {
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

const query = `{
  products {
    id
    name
    price
    images {
      size
      url
      width
      height
    }
    categories {
      name
    }
  }
}
`;

export const getStaticProps = async () => {
  const result = await graphCmsClient.request(query);
  return {
    props: { result },
  };
};

const Wrapper = styled.div``;
const ContentWrapper = styled.div``;
