import styled from "styled-components";
import Link from "next/link";

export default function MenuButton(props) {
  return (
    <Link href={props.link} as={props.as}>
      <MenuItem title={props.title} width={props.width}>
        {props.title}
      </MenuItem>
    </Link>
  );
}

const MenuItem = styled.div`
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  transition: 0.5s ease-out;
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : "100%")};
  :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;
