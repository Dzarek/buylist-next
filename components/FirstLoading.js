import styled from "styled-components";

const FirstLoading = () => {
  return (
    <Wrapper>
      <img src="/images/logoCart.png" alt="" />
      <h2>Wczytywanie...</h2>
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
    animation: imgRotate 2.5s linear 1;
    /* transform-origin: top center; */
    @media screen and (min-width: 801px) {
      width: 200px;
    }
  }
  @keyframes imgRotate {
    0% {
      transform: translateX(-100vw);
    }
    100% {
      transform: translateX(100vw);
    }
  }
  h2 {
    margin-top: 7vh;
    color: var(--clr-primary-2);
    /* color: #fff; */
    font-size: 1.5rem;
  }
`;

export default FirstLoading;
