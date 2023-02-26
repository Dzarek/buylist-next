import styled from "styled-components";

const FirstLoading = () => {
  return (
    <Wrapper>
      <img src="/images/logo.png" alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  img {
    width: 35%;
    animation: imgRotate 0.8s linear infinite alternate;
    transform-origin: top center;
    @media screen and (min-width: 801px) {
      width: 200px;
    }
  }
  @keyframes imgRotate {
    0% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(10deg);
    }
  }
`;

export default FirstLoading;
