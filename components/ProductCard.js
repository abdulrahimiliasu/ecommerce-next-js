import * as React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard(props) {
  return (
    <Wrapper>
      <Link href={`/products/[id]`} as={`/products/${props.id}`}>
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
        </ContentWrapper>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
  @media (prefers-color-scheme: dark) {
    background-color: #424242;
  }
  border-radius: 20px;
  width: 250px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  line-height: 1;
  max-height: 500px;
  border: thin solid white;
  cursor: pointer;
  :hover {
    border: thin solid black;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
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
