import styled from "styled-components";
import Link from "next/link";

export default function SecondaryButton(props) {
  return (
    <Link href={props.link} as={props.as}>
      <Wrapper width={props.width}>{props.title}</Wrapper>
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
  background-color: rgb(0, 112, 243);
  box-shadow: rgba(0, 118, 255, 0.39) 0px 2px 6px 0px;
  width: ${(props) => (props.width ? props.width : "100%")};
  :hover {
    background-color: rgba(0, 118, 255, 0.9);
    box-shadow: rgba(0, 118, 255, 0.23) 0px 6px 20px;
  }
`;
