import styled from "styled-components";
import { useState } from "react";
import { jedzenie } from "../data";

const FirstLoading = () => {
  const imagesArray = jedzenie.map((item) => item.src);
  const [randomImg, setRandomImg] = useState(
    imagesArray[Math.floor(Math.random() * imagesArray.length)]
  );
  const [randomImg2, setRandomImg2] = useState(
    imagesArray[Math.floor(Math.random() * imagesArray.length)]
  );
  const [randomImg3, setRandomImg3] = useState(
    imagesArray[Math.floor(Math.random() * imagesArray.length)]
  );
  if (
    randomImg2 === randomImg ||
    randomImg3 === randomImg ||
    randomImg2 === randomImg3
  ) {
    setRandomImg(imagesArray[Math.floor(Math.random() * imagesArray.length)]);
    setRandomImg2(imagesArray[Math.floor(Math.random() * imagesArray.length)]);
  }

  return (
    <Wrapper>
      <img src={randomImg} alt="" className="fallingImg f1" />
      <img src={randomImg2} alt="" className="fallingImg f2" />
      <img src={randomImg3} alt="" className="fallingImg f3" />
      <img src="/logo192.png" alt="" className="bigLogo" />
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
  position: relative;
  .bigLogo {
    margin-top: 20vh;
    width: 50%;
    @media screen and (min-width: 801px) {
      width: 200px;
    }
  }
  .fallingImg {
    width: 17%;
    object-fit: cover;
    animation: falling 1s linear 1 forwards;
    position: absolute;
    top: 5vh;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    @media screen and (min-width: 801px) {
      display: none;
    }
  }
  .f2 {
    animation-delay: 1s;
  }
  .f3 {
    animation-delay: 2s;
  }

  @keyframes falling {
    0% {
      transform: translateY(5vh) translateX(-50%);
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    100% {
      transform: translateY(40vh) translateX(-50%);
      opacity: 0;
    }
  }

  h2 {
    margin-top: 7vh;
    color: #222;
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

export default FirstLoading;
