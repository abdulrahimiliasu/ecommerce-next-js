import styled from "styled-components";
import { useEffect, useState } from "react";
import { firebaseInstance } from "../model/firebase-config";
import ProfileForm from "../components/forms/ProfileForm";
import Link from "next/link";
import cogoToast from "cogo-toast";
import ReactLoading from "react-loading";
import useTranslation from "next-translate/useTranslation";

export default function Account() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  let { t } = useTranslation();

  useEffect(() => {
    if (firebaseInstance) {
      firebaseInstance.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setCurrentUser(authUser);
          try {
            const db = firebaseInstance.firestore();
            var userRef = db.collection(`users`).doc(authUser.uid);

            userRef.get().then((doc) => {
              doc.exists
                ? setUserData(doc.data())
                : cogoToast.error("Could not retrive user data");
            });
          } catch (error) {
            cogoToast.error(error.message);
          }
        } else {
          setCurrentUser(null);
        }
      });
    }
  }, []);

  return (
    <Wrapper>
      {currentUser ? (
        <div>
          {userData == null ? (
            <Empty>
              <ReactLoading type="bubbles" color="black" />
            </Empty>
          ) : (
            <ContentWrapper>
              {currentUser.emailVerified ? (
                <></>
              ) : (
                <Warn>
                  <p>{t("forms:accountnotverified")}</p>
                </Warn>
              )}

              <ProfileForm
                data={userData}
                email={currentUser.email}
                user_id={currentUser.uid}
              />
            </ContentWrapper>
          )}
        </div>
      ) : (
        <Empty>
          <Link href="/signin">
            <a>
              <h2>{t("forms:signinfirst")}</h2>
            </a>
          </Link>
        </Empty>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Warn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
`;

const Empty = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
