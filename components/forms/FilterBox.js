import styled from "styled-components";
import React from "react";
import TextField from "../TextField";
import SecondaryButton from "../buttons/SecondaryButton";
import useInput from "../hooks/useInput";
import ComboBox from "../ComboBox";

export default function FilterBox(props) {
  const name = useInput("");
  const price_low = useInput("");
  const price_high = useInput("");
  const category = useInput("Cases");
  const color = useInput("Red");

  return (
    <Wrapper>
      <TextWrapper direction={props.direction}>
        <TextField placeholder="Name" hook={name} />
        <TextField placeholder="Price: low" width="150px" hook={price_low} />
        <TextField placeholder="Price: high" width="150px" hook={price_high} />
        <ComboBox
          options={["Red", "Blue", "Green"]}
          hook={color}
          width="100px"
          title="Colors"
        />
        <ComboBox
          options={["Case", "Headphones", "Chargers"]}
          hook={category}
          width="100px"
          title="Categories"
        />
      </TextWrapper>
      <ButtonWrapper>
        <SecondaryButton
          width="200px"
          link={`/items/[filter]`}
          as={`/items/${name.value}&${price_low.value}_${price_high.value}&${category.value}&${color.value}`}
          title="Search"
        />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 30px;
  flex-wrap: wrap;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: ${(props) => (props.direction ? "row" : "column")};
`;

const ButtonWrapper = styled.div``;
