import styled from "styled-components";

export default function FormButton(props) {
  return (
    <Wrapper>
      <Button type={props.type} onClick={props.onClick}>
        {props.title}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Button = styled.button`
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background-color: black;
  width: 300px;
  border: black;
  :focus {
    outline: none;
  }
`;
