import styled from "styled-components";
import React, { useState } from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import useInput from "../hooks/useInput";
import Select from "react-select";
import { filterPrices, filterCategories, filterSortOptions } from "../../data";
import useSelect from "../hooks/useSelect";

export default function FilterBox(props) {
  let { vname, vprice_low, vprice_high, vcategory } = props.values;

  const name = useInput(vname);
  const sort = useSelect("name_ASC");
  const price_low = useSelect(vprice_low);
  const price_high = useSelect(vprice_high);
  const category = useSelect(vcategory);

  return (
    <Wrapper direction={props.direction}>
      <TextWrapper direction={props.direction}>
        <TextFieldFilter placeholder="Name" {...name} type="search" />
        <SelectWrapper>
          <Select
            options={filterPrices}
            placeholder="Price Low"
            isSearchable={true}
            {...price_low}
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            options={filterPrices}
            placeholder="Price High"
            isSearchable={true}
            {...price_high}
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            options={filterCategories}
            isSearchable={true}
            placeholder="Category"
            {...category}
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            options={filterSortOptions}
            isSearchable={true}
            placeholder="Sort"
            defaultValue="name_ASC"
            {...sort}
          />
        </SelectWrapper>
      </TextWrapper>
      <ButtonWrapper>
        <SecondaryButton
          color="#FF6D00"
          width="200px"
          link={`/products/search?name=${name.value}&price_low=${price_low.value}&price_high=${price_high.value}&category=${category.value}&order=${sort.value}`}
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
  @media only screen and (max-width: 1300px) {
    padding: 10px;
  }
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
