import * as React from "react";
import styled from "styled-components";
import Image from "next/image";
import SecondaryButton from "./buttons/SecondaryButton";

export default function ProductCard(props) {
  return (
    <Wrapper>
      <ContentWrapper>
        <ImageWrapper>
          <Image
            src={props.thumb_src}
            width={props.thumb_w}
            height={props.thumb_h}
            alt="product image"
          />
        </ImageWrapper>
        <TextWrapper>
          <Title>{props.title}</Title>
          <SubTitle>{props.price} HUF</SubTitle>
          <Text>Category: {props.category}</Text>
        </TextWrapper>
        <SecondaryButton
          link={`/products/[id]`}
          as={`/products/${props.id}`}
          title={`See Details`}
        />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  width: 250px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  line-height: 1;
  max-height: 500px;
  border: thin solid white;
  :hover {
    border: thin solid #1768ac;
  }
`;

const ContentWrapper = styled.div`
  padding: 15px;
`;
const ImageWrapper = styled.div`
  display: flex;
  height: 200px;
  width: 200px;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  padding: 15px 0px;
  line-height: 0.5;
`;

const Title = styled.h3`
  color: black;
  font-weight: bold;
  font-size: 15px;
`;
const SubTitle = styled.h4`
  color: gray;
  font-size: 12px;
`;

const Text = styled.p`
  font-size: 10px;
`;
