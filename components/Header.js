import styled from "styled-components";
import MenuButton from "./buttons/MenuButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import { firebaseInstance } from "../model/firebase-config";
import Image from "next/dist/client/image";
import { useRouter } from "next/dist/client/router";
import useTranslation from "next-translate/useTranslation";

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const { locales, asPath } = useRouter();
  let { t } = useTranslation();

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
            <ContentWrapper>
              <Image src="/favicon.png" width={90} height={50} alt="logo" />
              <h2>accessorys</h2>
            </ContentWrapper>
          </a>
        </Link>
      </Logo>
      <Menu>
        {locales.map((locale, index) => (
          <MenuButton
            key={index}
            link={asPath}
            locale={locale}
            title={locale}
          />
        ))}
        {currentUser ? (
          <ContentWrapper>
            <MenuButton link="/account" title={t("forms:account")} />
          </ContentWrapper>
        ) : (
          <ContentWrapper>
            <MenuButton link="/signin" title={t("forms:signin")} />
            <MenuButton link="/signup" title={t("forms:signup")} />
          </ContentWrapper>
        )}
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 15px 10px;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

const Logo = styled.div``;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentWrapper = styled.div`
  display: flex;
`;
