import React from "react";
import styled from "styled-components";
import getFirebase from "../../model/firebase/Firebase";
import useInput from "../hooks/useInput";
import cogoToast from "cogo-toast";
import TextField from "../TextField";
import { useRouter } from "next/dist/client/router";
import FormButton from "../buttons/FormButton";
import { useState } from "react";
import ReactLoading from "react-loading";

const SignInForm = () => {
  const firebaseInstance = getFirebase();
  const email = useInput("");
  const password = useInput("");
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);

  const forgotPassword = () => {
    firebaseInstance
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        cogoToast.success("Password reset email sent!");
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };

  const signIn = async (event) => {
    event.preventDefault();
    if (email.value === "" || password.value === "")
      cogoToast.error("Email or Password Cannot be empty!");
    else {
      setSigningIn(true);
      try {
        if (firebaseInstance) {
          await firebaseInstance
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then((authUser) => {
              if (authUser) {
                cogoToast.success("Successfully Logged In");
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
        <Title>Sign in</Title>
        <TextField
          placeholder="Email"
          type="email"
          hook={email}
          width="300px"
        />
        <TextField
          placeholder="Password"
          type="password"
          hook={password}
          width="300px"
        />
        <FormButton
          type="submit"
          title={signingIn ? "Signinig In" : "Sign in"}
        />
        <FormButton title="Forgot password" onClick={forgotPassword} />
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
