import React from "react";
import styled from "styled-components";

export default function ComboBox(props) {
  return (
    <Wrapper>
      <Text>{props.title}</Text>
      <Combo
        placeholder={props.placeholder}
        {...props.hook}
        type={props.type}
        width={props.width}
      >
        {props.options.map((ops, index) => (
          <option key={index} value={ops}>
            {ops}
          </option>
        ))}
      </Combo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
`;

const Text = styled.p`
  color: white;
`;

const Combo = styled.select`
  background: white;
  height: 50px;
  @media only screen and (max-width: 600px) {
    height: 35px;
    width: 100px;
  }
  width: ${(props) => (props.width ? props.width : "200px")};
  font-size: 15px;
`;
