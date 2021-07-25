import styled from "styled-components";
import MenuButton from "./buttons/MenuButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import { firebaseInstance } from "../model/firebase/Firebase";

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (firebaseInstance) {
      firebaseInstance.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setCurrentUser(authUser);
        } else {
          setCurrentUser(null);
        }
      });
    }
  }, []);

  return (
    <Wrapper>
      <Logo>
        <Link href="/">
          <a>
            <h2>accessorys</h2>
          </a>
        </Link>
      </Logo>
      <Menu>
        {currentUser ? (
          <ContentWrapper>
            <MenuButton link="/account" title="Account" />
          </ContentWrapper>
        ) : (
          <ContentWrapper>
            <MenuButton link="/signin" title="Sign In" />
            <MenuButton link="/signup" title="Sign Up" />
          </ContentWrapper>
        )}
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #03256c;
  display: flex;
  padding: 15px 10px;
  align-items: center;
  color: white;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  z-index: 2;
`;

const Logo = styled.div`
  padding: 0px 10px;
`;
const Menu = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;
