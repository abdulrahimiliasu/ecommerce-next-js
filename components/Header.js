import styled from "styled-components";
import MenuButton from "./buttons/MenuButton";
import Link from "next/link";

export default function Header() {
  return (
    <Wrapper>
      <Logo>
        <Link href="/">
          <a>
            <h2>Accessorys</h2>
          </a>
        </Link>
      </Logo>
      <Menu>
        <MenuButton link="/" title="Home" />
        <MenuButton link="/" title="About" />
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 15px 10px;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div``;
const Menu = styled.div`
  display: flex;
`;
