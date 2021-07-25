import styled from "styled-components";
import { fetchEntry } from "../../data/Content";
import Gallery from "react-grid-gallery";
import Sticky from "react-stickynode";

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
            <h3>Category: {result.category}</h3>
            <p>Company: {result.company}</p>
            <p>Color: {result.color}</p>
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
      obj["src"] = `https:${picture.fields.file.url}`;
      obj["thumbnail"] = `https:${picture.fields.file.url}`;
      obj["thumbnailWidth"] = 300;
      obj["thumbnailHeight"] = 300;
    }
    IMAGES.push(obj);
  });
  return IMAGES;
}

export const getServerSideProps = async (context) => {
  let id = context.params.id;
  const result = await fetchEntry(id);
  const images = getImages(result.pictures);
  return {
    props: { result, images },
  };
};
