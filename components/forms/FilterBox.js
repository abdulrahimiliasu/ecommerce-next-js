import styled from "styled-components";
import React from "react";
import TextField from "../TextField";
import SecondaryButton from "../buttons/SecondaryButton";
import useInput from "../hooks/useInput";
import ComboBox from "../ComboBox";

export default function FilterBox(props) {
  let { vname, vprice_low, vprice_high, vcategory, vcolor } = props.values;
  const name = useInput(vname);
  const price_low = useInput(vprice_low);
  const price_high = useInput(vprice_high);
  const category = useInput(vcategory);
  const color = useInput(vcolor);

  return (
    <Wrapper direction={props.direction}>
      <TextWrapper direction={props.direction}>
        <TextFieldFilter placeholder="Name" hook={name} />
        <TextFieldFilter
          placeholder="Price: low"
          width="150px"
          hook={price_low}
        />
        <TextFieldFilter
          placeholder="Price: high"
          width="150px"
          hook={price_high}
        />
        <ComboBox
          options={["Any", "Red", "Blue", "Green"]}
          hook={color}
          width="100px"
          title="Colors"
        />
        <ComboBox
          options={["Any", "Case", "Headphones", "Chargers"]}
          hook={category}
          width="100px"
          title="Categories"
        />
      </TextWrapper>
      <ButtonWrapper>
        <SecondaryButton
          color="#FF6D00"
          width="200px"
          link={`/products/search/[filter]`}
          as={`/products/search/name=${name.value}&price_low=${price_low.value}&price_high=${price_high.value}&category=${category.value}&color=${color.value}`}
          title="Search"
        />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #2541b2;
  display: flex;
  justify-content: space-around;
  padding: 30px;
  flex-wrap: wrap;
  height: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: ${(props) => (props.direction ? "row" : "column")};
`;

const ButtonWrapper = styled.div`
  padding: 10px;
`;

const TextFieldFilter = styled.input`
  background: white;
  border-radius: 10px;
  padding: 10px 20px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  border: 1px solid gray;
  width: ${(props) => (props.width ? props.width : "200px")};
  height: 50px;
  @media only screen and (max-width: 600px) {
    height: 35px;
    width: 100%;
  }
  font-size: 15px;
  :focus {
    border: 5px solid #ffab40;
  }
`;
