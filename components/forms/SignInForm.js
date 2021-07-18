import React from "react"
import styled from "styled-components"
import TextField from "../TextField"
import useInput from "../hooks/useInput"

const SignInForm = () => {
  const email = useInput("")
  const password = useInput("")

  const submitForm = event => {
    event.preventDefault()
    console.log("email", email.value)
    console.log("password", password.value)
  }

  return (
    <FormWrapper onSubmit={submitForm}>
      <Title>Sign in</Title>
      <TextField placeholder="Email" hook={email} />
      <TextField placeholder="Password" type="password" hook={password} />
      <Button type="submit">Sign in</Button>
    </FormWrapper>
  )
}

export default SignInForm

const FormWrapper = styled.form`
  display: grid;
  justify-content: center;
  gap: 20px;
  padding-bottom: 50px;
`

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: black;
  text-align: center;
`

const Button = styled.button`
  background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
  padding: 12px 0;
  width: 200px;
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  font-family: Segoe UI, sans-serif;
  cursor: pointer;
  :focus {
    outline: none;
  }
`
