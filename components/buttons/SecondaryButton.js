import styled from "styled-components";
import Link from "next/link";

export default function SecondaryButton(props) {
  return (
    <Link href={props.link} as={props.as}>
      <Wrapper width={props.width} color={props.color}>
        {props.title}
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  color: white;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  transition: 0.5s ease-out;
  background-color: ${(props) => (props.color ? props.color : "#2541B2")};
  box-shadow: rgba(0, 118, 255, 0.39) 0px 2px 6px 0px;
  width: ${(props) => (props.width ? props.width : "100%")};
  :hover {
    background-color: ${(props) => (props.color ? "#FFAB40" : "#03256c")};
    box-shadow: rgba(0, 118, 255, 0.23) 0px 6px 20px;
  }
`;
