import Head from "next/head";
import ContentSection from "../components/sections/ContentSection";
import styled from "styled-components";
import FilterBox from "../components/forms/FilterBox";
import { graphCmsClient } from "../model/graphcms-config";
import useTranslation from "next-translate/useTranslation";

export default function Home({ result }) {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <Head>
        <title>Accessorys</title>
        <meta name="description" content="An Accessories Ecommerce Site." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Heading>
        <h1>
          {t("common:Heading")} <br />
        </h1>
      </Heading>
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

export const getServerSideProps = async () => {
  const result = await graphCmsClient.request(query);
  return {
    props: { result },
  };
};

const Wrapper = styled.div``;
const ContentWrapper = styled.div`
  background-color: white;
  @media (prefers-color-scheme: dark) {
    background-color: #212121;
  }
`;
const Heading = styled.div`
  padding: 20px;
`;
