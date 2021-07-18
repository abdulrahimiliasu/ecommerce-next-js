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
  display: flex;
`;

const Text = styled.p`
  color: gray;
  padding-right: 5px;
`;

const Combo = styled.select`
  background: white;
  border-radius: 30px;
  padding: 10px 20px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  border: 1px solid gray;
  width: ${(props) => (props.width ? props.width : "200px")};
  font-size: 15px;
`;
