import styled from "styled-components";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [isLoginIn, setIsLoginIn] = useState(true);

  const { login, signup, name, setName } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLoginIn && !password2)) {
      setErrorLogin("Proszę uzupełnić pola logowania!");
      return;
    }
    if (!isLoginIn && password !== password2) {
      setErrorLogin("Wprowadzone hasła nie są zgodne!");
      return;
    }
    if (isLoginIn) {
      try {
        await login(email, password);
      } catch (err) {
        setErrorLogin("Nieprawidłowy email lub hasło!");
      }
      return;
    }
    await signup(email, password, name);
  };

  useEffect(() => {
    setErrorLogin("");
  }, [isLoginIn]);

  return (
    <Wrapper>
      <div className="container">
        <h2>{isLoginIn ? "Logowanie" : "Rejestracja"}</h2>
        {errorLogin && <h4 className="errorInfo">{errorLogin}</h4>}
        <form>
          {!isLoginIn && (
            <input
              type="text"
              placeholder="Nazwa"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          )}
          <input
            type="email"
            placeholder="Adres Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {!isLoginIn && (
            <input
              type="password"
              placeholder="Powtórz hasło"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              required
            />
          )}
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            {isLoginIn ? "zaloguj się" : "zarejestruj się"}
          </button>
        </form>
        <div className="loginAsk">
          {isLoginIn ? (
            <p>
              Nie masz jeszcze konta? <br />
              <span onClick={() => setIsLoginIn(false)}>
                Zarejestruj się!
              </span>{" "}
            </p>
          ) : (
            <p>
              Masz już konto? <br />
              <span onClick={() => setIsLoginIn(true)}>Zaloguj się!</span>
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.9);
  width: 100vw;
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 20px;
    width: 50vw;
    min-height: 60vh;
    @media screen and (max-width: 800px) {
      width: 100vw;
      min-height: 70vh;
    }
  }
  .errorInfo {
    font-size: 1rem;
    text-align: center;
    margin: 5vh auto 3vh;
    color: var(--clr-red-dark);
    font-weight: 500;
    text-transform: uppercase;
  }
  h2 {
    text-transform: uppercase;
    /* color: rgb(54, 102, 9); */
    color: var(--clr-primary-2);
    font-size: 1.5rem;
  }
  form {
    margin: 3vh auto 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    input {
      font-size: 0.9rem;
      width: 100%;
      margin: 1vh auto;
      padding: 10px 20px;
      border: 1px solid #111;
    }
    button {
      margin: 6vh auto 0vh;
      padding: 10px 30px;
      /* background: rgb(54, 102, 9); */
      background: var(--clr-primary-2);
      color: #fff;
      border-radius: 10px;
      border: none;
      font-size: 1rem;
    }
  }
  .loginAsk {
    p {
      color: #222;
      text-align: center;
      font-size: 1.1rem;
      margin-top: 2vh;
      span {
        color: var(--clr-primary-2);
        font-weight: 600;
        cursor: pointer;
        display: block;
        margin-top: 1vh;
      }
    }
  }
`;

export default Login;
