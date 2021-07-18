import styled from "styled-components";

export default function Footer() {
  return (
    <Wrapper>
      <footer>Build with Next JS 2021.</footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: 100px;
  padding: 10px;
`;
