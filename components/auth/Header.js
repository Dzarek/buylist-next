import { useGlobalContext } from "../context";
import { FaUserCircle, FaUserMinus } from "react-icons/fa";
import styled from "styled-components";

const Header = () => {
  const { logout, name } = useGlobalContext();
  return (
    <Wrapper>
      <span>
        <FaUserCircle /> {name}
      </span>
      <FaUserMinus className="iconOut" onClick={logout} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0vh;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  color: white;
  padding: 10px 20px;
  @media screen and (max-width: 800px) {
    left: 50%;
    transform: translateX(-50%);
  }
  span {
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      margin-right: 10px;
      font-size: 1.3rem;
    }
  }
  .iconOut {
    font-size: 1.8rem;
  }
`;

export default Header;
