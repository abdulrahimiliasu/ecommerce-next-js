import React from "react";
import styled from "styled-components";

export default function TextField(props) {
  return (
    <Input
      placeholder={props.placeholder}
      {...props.hook}
      type={props.type}
      width={props.width}
    />
  );
}

const Input = styled.input`
  background: white;
  border-radius: 30px;
  padding: 10px 20px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  border: 1px solid gray;
  width: ${(props) => (props.width ? props.width : "200px")};
  font-size: 15px;
  :focus {
    outline: none;
    border: thin solid #ffab40;
    /* border-radius: 30px;
    box-shadow: 0px 20px 40px rgba(31, 47, 71, 0.25),
      0px 1px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(250, 250, 250, 0.4); */
  }
`;
