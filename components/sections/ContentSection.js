import styled from "styled-components";
import ProductCard from "../ProductCard";

export default function ContentSection(props) {
  return props.entries.lenght == 0 ? (
    <h1>No Result Found</h1>
  ) : (
    <Wrapper>
      <ContentWrapper>
        {props.entries.map((item) => (
          <ProductCard
            key={item.sys.id}
            id={item.sys.id}
            title={item.fields.name}
            price={item.fields.price}
            category={item.fields.category}
            thumb_src={item.fields.pictures[0].fields.file.url}
            thumb_w={item.fields.pictures[0].fields.file.details.image.width}
            thumb_h={item.fields.pictures[0].fields.file.details.image.height}
          />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 20px;
`;
