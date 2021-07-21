import styled from "styled-components";
import { fetchEntry } from "../../data/Content";
import Gallery from "react-grid-gallery";

export default function Product({ result, images }) {
  return (
    <Wrapper>
      <DetailsWrapper>
        <div>
          <h1>{result.name}</h1>
          <h2>Price: {result.price} HUF</h2>
          <h3>Category: {result.category}</h3>
          <p>Company: {result.company}</p>
          <p>Color: {result.color}</p>
        </div>
      </DetailsWrapper>
      <Content>
        <ContentWrapper>
          <Gallery images={images} />
        </ContentWrapper>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const DetailsWrapper = styled.div`
  position: fixed;
  width: 350px;
  height: 100vh;
  padding: 20px;
  border-radius: 20px;
`;

const ContentWrapper = styled.div`
  height: 100vh;
  background-color: #f0f0f0;
`;
const Content = styled.div`
  margin-left: 350px;
  width: auto;
  position: relative;
  overflow: auto;
  z-index: 1;
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
