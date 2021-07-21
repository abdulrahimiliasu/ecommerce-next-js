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
            src={"https:" + props.thumb_src}
            width={props.thumb_w}
            height={props.thumb_h}
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
    border: thin solid rgba(0, 118, 255, 0.9);
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
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
