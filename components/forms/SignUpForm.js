import React, { useState } from "react";
import styled from "styled-components";
import TextField from "../TextField";
import useInput from "../hooks/useInput";
import cogoToast from "cogo-toast";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import {
  firebaseInstance,
  addUserProfileInfo,
} from "../../model/firebase-config";
import FormButton from "../buttons/FormButton";
import ReactLoading from "react-loading";
import useTranslation from "next-translate/useTranslation";

export default function SignUpForm() {
  const email = useInput("");
  const password = useInput("");
  const router = useRouter();
  const [signingUp, setSigningUp] = useState(false);
  let { t } = useTranslation();

  const sendEmailVerification = () => {
    firebaseInstance
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        cogoToast.success(t("forms:successcreateaccount"), {
          position: "top-left",
        });
      });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (email.value == "" || password.value == "") {
      cogoToast.error(t("forms:empty"));
    } else {
      setSigningUp(true);
      try {
        if (firebaseInstance) {
          await firebaseInstance
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredentials) => {
              addUserProfileInfo(userCredentials.user.uid);
              sendEmailVerification();
              router.push("/account");
            });
        }
      } catch (error) {
        cogoToast.error(error.message, { position: "top-left" });
        setSigningUp(false);
      }
    }
  };

  return (
    <FormWrapper onSubmit={submitForm}>
      <Title>{t("forms:signup")}</Title>
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
      <Link href="/signin">
        <a>
          <Text>{t("forms:alreadyhaveaccount")}</Text>
        </a>
      </Link>
      <FormButton
        type="submit"
        title={signingUp ? "Creating Account ..." : t("forms:createaccount")}
      />
      <Center>
        {signingUp ? <ReactLoading color="black" type="bars" /> : <></>}
      </Center>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: grid;
  justify-content: center;
  gap: 20px;
  padding-bottom: 50px;
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

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: rgb(0, 112, 243);
  font-size: 10px;
`;
