import React from "react";
import styled from "styled-components";
import getFirebase from "../../model/firebase-config";
import useInput from "../hooks/useInput";
import cogoToast from "cogo-toast";
import TextField from "../TextField";
import { useRouter } from "next/dist/client/router";
import FormButton from "../buttons/FormButton";
import { useState } from "react";
import ReactLoading from "react-loading";
import useTranslation from "next-translate/useTranslation";

const SignInForm = () => {
  const firebaseInstance = getFirebase();
  const email = useInput("");
  const password = useInput("");
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  let { t } = useTranslation();

  const forgotPassword = () => {
    firebaseInstance
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        cogoToast.success(t("forms:passwordreset"));
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };

  const signIn = async (event) => {
    event.preventDefault();
    if (email.value === "" || password.value === "")
      cogoToast.error(t("forms:empty"));
    else {
      setSigningIn(true);
      try {
        if (firebaseInstance) {
          await firebaseInstance
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then((authUser) => {
              if (authUser) {
                cogoToast.success(t("forms:successlogin"));
                router.push("/account");
              }
            });
        }
      } catch (error) {
        cogoToast.error(error.message);
        setSigningIn(false);
      }
    }
  };

  return (
    <Wrapper>
      <FormWrapper onSubmit={signIn}>
        <Title>{t("forms:signin")}</Title>
        <TextField
          placeholder={t("forms:email")}
          type="email"
          hook={email}
          width="300px"
        />
        <TextField
          placeholder={t("forms:password")}
          type="password"
          hook={password}
          width="300px"
        />
        <FormButton
          type="submit"
          title={signingIn ? "Signinig In" : t("forms:signin")}
        />
        <FormButton
          title={t("forms:forgotpassword")}
          onClick={forgotPassword}
        />
        <Center>
          {signingIn ? <ReactLoading color="black" type="bars" /> : <></>}
        </Center>
      </FormWrapper>
    </Wrapper>
  );
};

export default SignInForm;

const Wrapper = styled.div`
  height: 100vh;
`;

const FormWrapper = styled.form`
  display: grid;
  justify-content: center;
  gap: 20px;
  padding-bottom: 50px;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
`;
