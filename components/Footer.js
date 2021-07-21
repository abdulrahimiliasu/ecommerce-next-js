import styled from "styled-components";
import Link from "next/link";

export default function Footer() {
  return (
    <Wrapper>
      <Section>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/">
          <a>About</a>
        </Link>
      </Section>
      <Section>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/">
          <a>About</a>
        </Link>
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: flex-end;
`;

const Section = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: auto;
`;
