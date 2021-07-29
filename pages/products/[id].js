import styled from "styled-components";
import Gallery from "react-grid-gallery";
import Sticky from "react-stickynode";
import { graphCmsClient } from "../../model/graphcms/GraphCMS";

export default function Product({ result, images }) {
  return (
    <Wrapper>
      <ContentWrapper>
        <Gallery images={images} />
      </ContentWrapper>
      <DetailsWrapper>
        <Sticky enabled={true} top={20} bottomBoundary={0}>
          <div>
            <h1>{result.name}</h1>
            <h2>Price: {result.price} HUF</h2>
            <h2>Categories:</h2>
            {result.categories.map((cat, idx) => (
              <h3 key={idx}>{cat.name}</h3>
            ))}
            <p>Desc: {result.description}</p>
          </div>
        </Sticky>
      </DetailsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 350px;
  @media only screen and (max-width: 600px) {
    grid-template-columns: auto;
  }
`;

const DetailsWrapper = styled.div`
  width: 350px;
  padding: 20px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  height: 100vh;
  background-color: #f0f0f0;
`;

function getImages(pictures) {
  const IMAGES = [];
  pictures.map((picture) => {
    const obj = {};
    {
      obj["src"] = picture.url;
      obj["thumbnail"] = picture.url;
      obj["thumbnailWidth"] = picture.width;
      obj["thumbnailHeight"] = picture.height;
    }
    IMAGES.push(obj);
  });
  return IMAGES;
}

export const getServerSideProps = async (context) => {
  let result = await graphCmsClient.request(` {
    product(where: {id:"${context.params.id}"}) {
      id
      images {
        url
        width
        height
      }
      name
      price
      categories {
        id
        name
      }
      description
    }
  }`);
  result = result.product;
  const images = getImages(result.images);
  return {
    props: { result, images },
  };
};
