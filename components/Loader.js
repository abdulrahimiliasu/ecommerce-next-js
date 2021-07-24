import React from "react";
import { useSpring, animated } from "@react-spring/web";
import styled from "styled-components";

export default function Loader() {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  });

  return (
    <Wrapper>
      <animated.div
        style={{
          width: 80,
          height: 80,
          backgroundColor: "#000000",
          borderRadius: 16,
          ...styles,
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1000px;
`;
