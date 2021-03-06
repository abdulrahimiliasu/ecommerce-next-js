import styled from "styled-components";
import Link from "next/link";

export default function Footer() {
  return (
    <Wrapper>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/account">
        <a>Account</a>
      </Link>
      <Link href="/signin">
        <a>Sign In</a>
      </Link>
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: black;
  padding: 15px;
  color: white;
  height: 100px;
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: flex-start;
  gap: 20px;
`;
