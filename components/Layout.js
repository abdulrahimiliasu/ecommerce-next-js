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
  overflow: hidden;
`;
const ContentWrapper = styled.div`
  margin: 10px 0px;
`;
