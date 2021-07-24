import styled from "styled-components";
import SignUpForm from "../components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <Wrapper>
      <SignUpForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
`;
