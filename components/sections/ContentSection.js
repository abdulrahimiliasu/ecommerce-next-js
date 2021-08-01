import styled from "styled-components";
import ProductCard from "../ProductCard";

export default function ContentSection(props) {
  return props.entries.lenght == 0 ? (
    <h1>No Result Found</h1>
  ) : (
    <Wrapper>
      <ContentWrapper>
        {props.entries.products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            category={item.categories[0].name}
            thumb_src={item.images[0].url}
            thumb_w={item.images[0].width}
            thumb_h={item.images[0].height}
          />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  @media (prefers-color-scheme: dark) {
    background-color: #757575;
  }
  border-radius: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 20px;
`;
