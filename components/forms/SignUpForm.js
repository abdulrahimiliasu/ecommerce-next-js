import React from "react";
import styled from "styled-components";
import TextField from "../TextField";
import useInput from "../hooks/useInput";
import cogoToast from "cogo-toast";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import {
  firebaseInstance,
  addUserProfileInfo,
} from "../../model/firebase/Firebase";
import FormButton from "../buttons/FormButton";
import { useState } from "react";
import ReactLoading from "react-loading";

export default function SignUpForm() {
  const email = useInput("");
  const password = useInput("");
  const router = useRouter();
  const [signingUp, setSigningUp] = useState(false);

  const sendEmailVerification = () => {
    firebaseInstance
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        cogoToast.success(
          "Successfully created account please verify your email to continue",
          {
            position: "top-left",
          }
        );
      });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (email.value == "" || password.value == "") {
      cogoToast.error("Email or Password Cannot be Empty");
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
      <Title>Sign Up</Title>
      <TextField placeholder="Email" type="email" hook={email} width="300px" />
      <TextField
        placeholder="Password"
        type="password"
        hook={password}
        width="300px"
      />
      <Link href="/signin">
        <a>
          <Text>Already have an account ?</Text>
        </a>
      </Link>
      <FormButton
        type="submit"
        title={signingUp ? "Creating Account ..." : "Create account"}
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
