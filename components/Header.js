import styled from "styled-components";
import MenuButton from "./buttons/MenuButton";

export default function Header() {
  return (
    <Wrapper>
      <MenuButton link="/" title="Home" />
      <MenuButton link="/" title="About" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  background-color: black;
  padding: 15px 10px;
`;
