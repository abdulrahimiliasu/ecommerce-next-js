import styled from "styled-components";
import React, { useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import useInput from "../hooks/useInput";
import Select from "react-select";
import { filterPrices, filterCategories, customStyles } from "../../data";

export default function FilterBox(props) {
  let { vname, vprice_low, vprice_high, vcategory } = props.values;

  const name = useInput(vname);
  const [price_low, setPrice_Low] = useState(vprice_low);
  const [price_high, setPrice_High] = useState(vprice_high);
  const [category, setCategory] = useState(vcategory);

  const setPriceHigh = (obj) => {
    setPrice_High(obj.value);
    vprice_high = obj.value;
  };
  const setPriceLow = (obj) => {
    setPrice_Low(obj.value);
    vprice_low = obj.value;
  };
  const setCategories = (obj) => {
    setCategory(obj.value);
    vcategory = obj.value;
  };

  return (
    <Wrapper direction={props.direction}>
      <TextWrapper direction={props.direction}>
        <TextFieldFilter placeholder="Name" {...name} type="search" />
        <SelectWrapper>
          <Select
            options={filterPrices}
            placeholder="Price Low"
            isSearchable={true}
            onChange={setPriceLow}
            defaultValue=""
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            options={filterPrices}
            placeholder="Price High"
            isSearchable={true}
            styles={`width:200px;`}
            onChange={setPriceHigh}
            defaultValue=""
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            options={filterCategories}
            isSearchable={true}
            onChange={setCategories}
            placeholder="Category"
            defaultValue=""
          />
        </SelectWrapper>
      </TextWrapper>
      <ButtonWrapper>
        <SecondaryButton
          color="#FF6D00"
          width="200px"
          link={`/products/search?name=${name.value}&price_low=${price_low}&price_high=${price_high}&category=${category}`}
          title="Search"
        />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-around;
  padding: 30px;
  flex-wrap: wrap;
  height: 100%;
`;

const SelectWrapper = styled.div`
  width: 200px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
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
  border-radius: 5px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  border: 1px solid gray;
  width: ${(props) => (props.width ? props.width : "200px")};
  height: 40px;
  padding: 0px 10px;
  @media only screen and (max-width: 600px) {
    height: 40px;
    width: 100%;
  }
  font-size: 15px;
  :focus {
    outline: none;
    border: thin solid #ffab40;
  }
`;
