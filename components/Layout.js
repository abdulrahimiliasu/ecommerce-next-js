import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  @media (prefers-color-scheme: dark) {
    background-color: #212121;
    color: white;
  }
`;
const ContentWrapper = styled.div``;
